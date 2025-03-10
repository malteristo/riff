/**
 * Supabase client configuration and utilities
 * 
 * This file replaces the Firebase integration with Supabase
 * for database and storage functionality.
 */

import { createClient } from '@supabase/supabase-js';
import type {
  ExcalidrawElement,
  FileId,
  OrderedExcalidrawElement,
} from "@excalidraw/excalidraw/element/types";
import { getSceneVersion } from "@excalidraw/excalidraw/element";
import type Portal from "../collab/Portal";
import { restoreElements } from "@excalidraw/excalidraw/data/restore";
import type {
  AppState,
  BinaryFileData,
  BinaryFileMetadata,
  DataURL,
} from "@excalidraw/excalidraw/types";
import { FILE_CACHE_MAX_AGE_SEC } from "../app_constants";
import { decompressData } from "@excalidraw/excalidraw/data/encode";
import {
  encryptData,
  decryptData,
} from "@excalidraw/excalidraw/data/encryption";
import { MIME_TYPES } from "@excalidraw/excalidraw/constants";
import type { SyncableExcalidrawElement } from ".";
import { getSyncableElements } from ".";
import type { RemoteExcalidrawElement } from "@excalidraw/excalidraw/data/reconcile";
import { reconcileElements } from "@excalidraw/excalidraw";
import type { Socket } from "socket.io-client";

// private
// -----------------------------------------------------------------------------

let SUPABASE_CONFIG: {
  supabaseUrl: string;
  supabaseKey: string;
};

try {
  SUPABASE_CONFIG = {
    supabaseUrl: import.meta.env.VITE_APP_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_APP_SUPABASE_ANON_KEY,
  };
} catch (error: any) {
  console.warn(
    `Error parsing Supabase config: ${error.message}`,
  );
  SUPABASE_CONFIG = {
    supabaseUrl: "",
    supabaseKey: "",
  };
}

// Initialize Supabase client
const supabase = createClient(
  SUPABASE_CONFIG.supabaseUrl,
  SUPABASE_CONFIG.supabaseKey
);

// Set up tables if they don't exist yet
const setupTables = async () => {
  // This would typically be done via migrations or Supabase dashboard
  // For this example, we'll check if tables exist and create them if needed
  try {
    // Check if scenes table exists
    const { error: checkError } = await supabase
      .from("scenes")
      .select("id")
      .limit(1);
    
    if (checkError) {
      // Create scenes table if it doesn't exist
      const { error: createError } = await supabase.rpc("create_scenes_table");
      if (createError) {
        console.error("Error creating scenes table:", createError);
      }
    }
  } catch (error) {
    console.error("Error setting up tables:", error);
  }
};

// Call setup on initialization
setupTables();

// -----------------------------------------------------------------------------

/**
 * Cache for storing scene versions to avoid unnecessary saves
 */
class SupabaseSceneVersionCache {
  private static cache = new WeakMap<Socket, number>();
  
  static get = (socket: Socket) => {
    return SupabaseSceneVersionCache.cache.get(socket);
  };
  
  static set = (
    socket: Socket,
    elements: readonly SyncableExcalidrawElement[],
  ) => {
    SupabaseSceneVersionCache.cache.set(socket, getSceneVersion(elements));
  };
}

/**
 * Check if scene is already saved to Supabase
 */
export const isSavedToSupabase = (
  portal: Portal,
  elements: readonly ExcalidrawElement[],
): boolean => {
  if (portal.socket && portal.roomId && portal.roomKey) {
    const sceneVersion = getSceneVersion(elements);
    return SupabaseSceneVersionCache.get(portal.socket) === sceneVersion;
  }
  // if no room exists, consider it saved
  return true;
};

/**
 * Encrypt elements for secure storage
 */
const encryptElements = async (
  key: string,
  elements: readonly ExcalidrawElement[],
): Promise<{ ciphertext: ArrayBuffer; iv: Uint8Array }> => {
  const json = JSON.stringify(elements);
  const encoded = new TextEncoder().encode(json);
  const { encryptedBuffer, iv } = await encryptData(key, encoded);

  return { ciphertext: encryptedBuffer, iv };
};

/**
 * Decrypt elements retrieved from storage
 */
const decryptElements = async (
  data: { iv: Uint8Array; ciphertext: Uint8Array },
  roomKey: string,
): Promise<readonly ExcalidrawElement[]> => {
  const decrypted = await decryptData(data.iv, data.ciphertext, roomKey);
  const decodedData = new TextDecoder("utf-8").decode(
    new Uint8Array(decrypted),
  );
  return JSON.parse(decodedData);
};

/**
 * Save elements to Supabase database
 */
export const saveToSupabase = async (
  portal: Portal,
  elements: readonly SyncableExcalidrawElement[],
  appState: AppState,
) => {
  const { roomId, roomKey, socket } = portal;
  if (
    !roomId ||
    !roomKey ||
    !socket ||
    isSavedToSupabase(portal, elements)
  ) {
    return null;
  }

  // Check if scene exists
  const { data: existingScene } = await supabase
    .from('scenes')
    .select('*')
    .eq('id', roomId)
    .single();

  if (!existingScene) {
    // Create new scene
    const { ciphertext, iv } = await encryptElements(roomKey, elements);
    
    const { data: storedScene, error } = await supabase
      .from('scenes')
      .insert({
        id: roomId,
        scene_version: getSceneVersion(elements),
        iv: Array.from(iv),
        ciphertext: Array.from(new Uint8Array(ciphertext)),
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error saving to Supabase:', error);
      return null;
    }

    SupabaseSceneVersionCache.set(socket, elements);
    return elements;
  } else {
    // Update existing scene
    const prevStoredElements = getSyncableElements(
      restoreElements(
        await decryptElements(
          {
            iv: new Uint8Array(existingScene.iv),
            ciphertext: new Uint8Array(existingScene.ciphertext),
          },
          roomKey
        ),
        null
      ),
    );
    
    const reconciledElements = getSyncableElements(
      reconcileElements(
        elements,
        prevStoredElements as OrderedExcalidrawElement[] as RemoteExcalidrawElement[],
        appState,
      ),
    );

    const { ciphertext, iv } = await encryptElements(roomKey, reconciledElements);
    
    const { data: storedScene, error } = await supabase
      .from('scenes')
      .update({
        scene_version: getSceneVersion(reconciledElements),
        iv: Array.from(iv),
        ciphertext: Array.from(new Uint8Array(ciphertext)),
      })
      .eq('id', roomId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating in Supabase:', error);
      return null;
    }

    SupabaseSceneVersionCache.set(socket, reconciledElements);
    return reconciledElements;
  }
};

/**
 * Load scene from Supabase database
 */
export const loadFromSupabase = async (
  roomId: string,
  roomKey: string,
  socket: Socket | null,
): Promise<readonly SyncableExcalidrawElement[] | null> => {
  try {
    // Validate inputs
    if (!roomId) {
      console.error("Cannot load from Supabase: roomId is empty");
      return null;
    }
    
    if (!roomKey) {
      console.error("Cannot load from Supabase: roomKey is empty");
      return null;
    }
    
    console.log(`Attempting to load scene with ID ${roomId} from Supabase`);
    
    const { data: storedScene, error } = await supabase
      .from("scenes")
      .select("*")
      .eq("id", roomId)
      .single();
    
    if (error) {
      console.error(`Error loading scene from Supabase: ${error.message}`, error);
      return null;
    }
    
    if (!storedScene) {
      console.log(`No scene found with ID ${roomId} in Supabase`);
      return null;
    }
    
    console.log(`Scene found with ID ${roomId}, version: ${storedScene.scene_version}`);
    
    try {
      // Validate encryption data
      if (!storedScene.iv || !storedScene.iv.length) {
        throw new Error("Invalid IV in stored scene");
      }
      
      if (!storedScene.ciphertext || !storedScene.ciphertext.length) {
        throw new Error("Invalid ciphertext in stored scene");
      }
      
      const elements = await decryptElements(
        {
          iv: new Uint8Array(storedScene.iv),
          ciphertext: new Uint8Array(storedScene.ciphertext),
        },
        roomKey
      );

      const restoredElements = restoreElements(elements, null);
      
      if (socket) {
        SupabaseSceneVersionCache.set(
          socket,
          getSyncableElements(restoredElements),
        );
      }
      
      console.log(`Successfully loaded scene with ${restoredElements.length} elements`);
      return getSyncableElements(restoredElements);
    } catch (decryptError: any) {
      console.error(`Error decrypting elements: ${decryptError.message}`, decryptError);
      return null;
    }
  } catch (error: any) {
    console.error(`Error loading from Supabase: ${error.message}`, error);
    return null;
  }
};

/**
 * Save files to Supabase storage
 */
export const saveFilesToSupabase = async ({
  prefix,
  files,
}: {
  prefix: string;
  files: { id: FileId; buffer: Uint8Array }[];
}) => {
  const savedFiles: FileId[] = [];
  const errorMessages: Record<string, string> = {};
  
  await Promise.all(
    files.map(async ({ id, buffer }) => {
      try {
        // Check if buffer is valid
        if (!buffer || buffer.length === 0) {
          throw new Error("Invalid buffer - empty or undefined");
        }
        
        // Log attempt to save file
        console.log(
          `Attempting to save file ${id} to Supabase at ${prefix}/${id}`,
        );

        const { error } = await supabase.storage
          .from("riff-files")
          .upload(`${prefix}/${id}`, buffer, {
            cacheControl: `${FILE_CACHE_MAX_AGE_SEC}`,
            contentType: MIME_TYPES.binary,
            upsert: true,
          });

        if (error) {
          erroredFiles.set(id, true);
          errorMessages[id] = error.message || "Unknown storage error";
          throw new Error(error.message);
        }
        
        console.log(`Successfully saved file ${id} to Supabase`);
        savedFiles.push(id);
      } catch (error: any) {
        const errorMessage = error.message || "Unknown error";
        console.error(`Error saving file ${id} to Supabase: ${errorMessage}`);
        if (!errorMessages[id]) {
          errorMessages[id] = errorMessage;
        }
      }
    }),
  );

  // Create a more detailed error map
  const erroredFiles = files
    .map(({ id }) => id)
    .filter((id) => !savedFiles.includes(id))
    .reduce((acc, id) => {
      acc.set(id, true);
      return acc;
    }, new Map<FileId, true>());
  
  // Log summary of operation
  console.log(
    `Supabase storage operation complete. Saved: ${savedFiles.length}, Errors: ${erroredFiles.size}`,
  );
  if (erroredFiles.size > 0) {
    console.error("Supabase storage errors:", errorMessages);
  }

  return { savedFiles, erroredFiles };
};

/**
 * Load files from Supabase storage
 */
export const loadFilesFromSupabase = async (
  prefix: string,
  decryptionKey: string,
  filesIds: readonly FileId[],
) => {
  const loadedFiles: BinaryFileData[] = [];
  const erroredFiles = new Map<FileId, true>();

  await Promise.all(
    [...new Set(filesIds)].map(async (id) => {
      try {
        const { data, error } = await supabase.storage
          .from("riff-files")
          .download(`${prefix}/${id}`);

        if (error) {
          throw new Error(`Error downloading file ${id}: ${error.message}`);
        }

        const arrayBuffer = await data.arrayBuffer();
        const { data: decompressedData, metadata } = await decompressData<BinaryFileMetadata>(
          new Uint8Array(arrayBuffer),
          {
            decryptionKey,
          },
        );

        const dataURL = new TextDecoder().decode(decompressedData) as DataURL;

        loadedFiles.push({
          mimeType: metadata.mimeType || MIME_TYPES.binary,
          id,
          dataURL,
          created: metadata?.created || Date.now(),
          lastRetrieved: metadata?.created || Date.now(),
        });
      } catch (error: any) {
        console.error(`Error loading file from Supabase: ${error.message}`);
        erroredFiles.set(id, true);
      }
    }),
  );

  return { loadedFiles, erroredFiles };
};

export default supabase; 