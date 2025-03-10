## Milestone 2: Building the Canvas

### Objective

Implement the canvas feature in RIFF, allowing users to brainstorm by adding text and image elements, dragging and grouping them, and connecting them with lines. The canvas state will be persisted in Supabase, laying the groundwork for real-time collaboration in Milestone 3.

### Prerequisites

- **Milestone 1 Complete**: Next.js running locally, Supabase authentication set up, and users table populated.
- **Tech Stack**: Continue using Next.js with TypeScript, Supabase, and Zustand for state management. Introduce `react-konva` and `konva` for canvas rendering.

### Implementation Plan

#### 1. Set Up Database Tables in Supabase

Create tables to store canvas elements, groups, and connections, ensuring persistence and real-time capabilities.

- **SQL Script**: Create `sql/canvas-tables.sql` in your `sql/` directory.

  ```sql
  -- Canvas Elements Table
  CREATE TABLE canvas_elements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES sessions(id),
    type TEXT NOT NULL CHECK (type IN ('text', 'image')),
    x FLOAT NOT NULL,
    y FLOAT NOT NULL,
    width FLOAT,
    height FLOAT,
    content TEXT, -- Text content or image URL
    group_id UUID REFERENCES canvas_groups(id),
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- Canvas Groups Table
  CREATE TABLE canvas_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES sessions(id),
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- Canvas Connections Table
  CREATE TABLE canvas_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES sessions(id),
    from_element_id UUID REFERENCES canvas_elements(id),
    to_element_id UUID REFERENCES canvas_elements(id),
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- Sessions Table (if not already created)
  CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
  );
  ```

- **Execution**: Run this script in Supabase’s SQL editor to create the tables.
- **Row-Level Security (RLS)**: For the MVP, enable RLS with a simple policy allowing authenticated users full access. Refine later for specific permissions.

  ```sql
  ALTER TABLE canvas_elements ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Allow authenticated users" ON canvas_elements FOR ALL TO authenticated USING (auth.role() = 'authenticated');

  ALTER TABLE canvas_groups ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Allow authenticated users" ON canvas_groups FOR ALL TO authenticated USING (auth.role() = 'authenticated');

  ALTER TABLE canvas_connections ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Allow authenticated users" ON canvas_connections FOR ALL TO authenticated USING (auth.role() = 'authenticated');

  ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Allow authenticated users" ON sessions FOR ALL TO authenticated USING (auth.role() = 'authenticated');
  ```

#### 2. Install and Configure Konva.js

Integrate `react-konva` and `konva` into your Next.js project.

- **Install Packages**:
  ```bash
  npm install react-konva konva
  ```
- **Update Types**: Ensure TypeScript recognizes these libraries by installing their types if needed:
  ```bash
  npm install --save-dev @types/react-konva @types/konva
  ```

#### 3. Define Canvas Types

Create TypeScript interfaces for canvas entities to ensure type safety.

- **File**: `src/types/canvas.ts`

  ```ts
  export interface CanvasElement {
    id: string;
    type: 'text' | 'image';
    x: number;
    y: number;
    width?: number;
    height?: number;
    content?: string; // Text content or image URL
    groupId?: string;
  }

  export interface CanvasGroup {
    id: string;
  }

  export interface CanvasConnection {
    id: string;
    fromElementId: string;
    toElementId: string;
  }
  ```

#### 4. Create Canvas State Management with Zustand

Set up a store to manage canvas state, integrating with Supabase for persistence and real-time updates.

- **File**: `src/store/canvasStore.ts`

  ```ts
  import create from 'zustand';
  import { supabase } from '../services/supabase';
  import { CanvasElement, CanvasGroup, CanvasConnection } from '../types/canvas';

  interface CanvasState {
    elements: CanvasElement[];
    groups: CanvasGroup[];
    connections: CanvasConnection[];
    loadSession: (sessionId: string) => void;
    addElement: (element: Omit<CanvasElement, 'id'> & { sessionId: string }) => Promise<void>;
    updateElement: (id: string, updates: Partial<CanvasElement>) => Promise<void>;
  }

  export const useCanvasStore = create<CanvasState>(set => ({
    elements: [],
    groups: [],
    connections: [],
    loadSession: async (sessionId: string) => {
      // Fetch initial data
      const { data: elements } = await supabase
        .from('canvas_elements')
        .select('*')
        .eq('session_id', sessionId);
      const { data: groups } = await supabase
        .from('canvas_groups')
        .select('*')
        .eq('session_id', sessionId);
      const { data: connections } = await supabase
        .from('canvas_connections')
        .select('*')
        .eq('session_id', sessionId);
      set({ elements: elements || [], groups: groups || [], connections: connections || [] });

      // Real-time subscriptions
      supabase
        .from(`canvas_elements:session_id=eq.${sessionId}`)
        .on('INSERT', payload => {
          set(state => ({ elements: [...state.elements, payload.new] }));
        })
        .on('UPDATE', payload => {
          set(state => ({
            elements: state.elements.map(el => (el.id === payload.new.id ? payload.new : el)),
          }));
        })
        .on('DELETE', payload => {
          set(state => ({ elements: state.elements.filter(el => el.id !== payload.old.id) }));
        })
        .subscribe();

      supabase
        .from(`canvas_groups:session_id=eq.${sessionId}`)
        .on('INSERT', payload => {
          set(state => ({ groups: [...state.groups, payload.new] }));
        })
        .on('UPDATE', payload => {
          set(state => ({
            groups: state.groups.map(g => (g.id === payload.new.id ? payload.new : g)),
          }));
        })
        .on('DELETE', payload => {
          set(state => ({ groups: state.groups.filter(g => g.id !== payload.old.id) }));
        })
        .subscribe();

      supabase
        .from(`canvas_connections:session_id=eq.${sessionId}`)
        .on('INSERT', payload => {
          set(state => ({ connections: [...state.connections, payload.new] }));
        })
        .on('UPDATE', payload => {
          set(state => ({
            connections: state.connections.map(c => (c.id === payload.new.id ? payload.new : c)),
          }));
        })
        .on('DELETE', payload => {
          set(state => ({ connections: state.connections.filter(c => c.id !== payload.old.id) }));
        })
        .subscribe();
    },
    addElement: async element => {
      const { error } = await supabase.from('canvas_elements').insert([element]);
      if (error) console.error('Add element error:', error);
    },
    updateElement: async (id, updates) => {
      const { error } = await supabase.from('canvas_elements').update(updates).eq('id', id);
      if (error) console.error('Update element error:', error);
    },
  }));
  ```

#### 5. Create Canvas Page

Set up a dynamic route for canvas sessions.

- **File**: `src/app/canvas/[sessionId]/page.tsx`

  ```tsx
  import Canvas from '../../../components/Canvas';

  export default function CanvasPage({ params }: { params: { sessionId: string } }) {
    return <Canvas sessionId={params.sessionId} />;
  }
  ```

#### 6. Implement Canvas Component

Create the core canvas component with basic panning and zooming.

- **File**: `src/components/Canvas.tsx`

  ```tsx
  import { useEffect, useState } from 'react';
  import { Stage, Layer } from 'react-konva';
  import { useCanvasStore } from '../store/canvasStore';

  function Canvas({ sessionId }: { sessionId: string }) {
    const { loadSession } = useCanvasStore();
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      loadSession(sessionId);
    }, [sessionId, loadSession]);

    const handleWheel = (e: any) => {
      e.evt.preventDefault();
      const scaleBy = 1.1;
      const stage = e.target.getStage();
      const oldScale = stage.scaleX();
      const mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
      };
      const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
      setScale(newScale);
      setPosition({
        x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
        y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale,
      });
    };

    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
        draggable
        onWheel={handleWheel}
      >
        <Layer>{/* Elements, groups, and connections will be rendered here */}</Layer>
      </Stage>
    );
  }

  export default Canvas;
  ```

#### 7. Add Text Elements

Enable users to add and edit text elements.

- **Component**: `src/components/TextComponent.tsx`

  ```tsx
  import { useState } from 'react';
  import { Text } from 'react-konva';
  import { useCanvasStore } from '../store/canvasStore';

  function TextComponent({ id, text, x, y }: { id: string; text?: string; x: number; y: number }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(text || 'Double-click to edit');
    const updateElement = useCanvasStore(state => state.updateElement);

    const handleDoubleClick = () => setIsEditing(true);
    const handleBlur = () => {
      setIsEditing(false);
      updateElement(id, { content: value });
    };

    if (isEditing) {
      return (
        <foreignObject x={x} y={y} width={200} height={100}>
          <textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            style={{ width: '100%', height: '100%' }}
          />
        </foreignObject>
      );
    }

    return (
      <Text
        text={value}
        x={x}
        y={y}
        draggable
        onDblClick={handleDoubleClick}
        onDragEnd={e => updateElement(id, { x: e.target.x(), y: e.target.y() })}
      />
    );
  }

  export default TextComponent;
  ```

- **Update Canvas**: Add a button to create text elements and render them.

  ```tsx
  // In src/components/Canvas.tsx, add to imports:
  import TextComponent from './TextComponent';

  // Add state and function:
  const addElement = useCanvasStore((state) => state.addElement);
  const elements = useCanvasStore((state) => state.elements);

  const handleAddText = () => {
    addElement({
      sessionId,
      type: 'text',
      x: window.innerWidth / 2 / scale - position.x / scale,
      y: window.innerHeight / 2 / scale - position.y / scale,
    });
  };

  // Add to JSX:
  return (
    <>
      <button onClick={handleAddText} style={{ position: 'absolute', top: 10, left: 10 }}>
        Add Text
      </button>
      <Stage ...>
        <Layer>
          {elements.map((el) =>
            el.type === 'text' ? (
              <TextComponent key={el.id} id={el.id} text={el.content} x={el.x} y={el.y} />
            ) : null
          )}
        </Layer>
      </Stage>
    </>
  );
  ```

#### 8. Add Image Elements

Enable users to upload and display images.

- **Component**: `src/components/ImageComponent.tsx`

  ```tsx
  import { useEffect, useState } from 'react';
  import { Image as KonvaImage } from 'react-konva';
  import { supabase } from '../services/supabase';
  import { useCanvasStore } from '../store/canvasStore';

  function ImageComponent({ id, src, x, y }: { id: string; src?: string; x: number; y: number }) {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const updateElement = useCanvasStore(state => state.updateElement);

    useEffect(() => {
      if (src) {
        const img = new window.Image();
        img.src = src;
        img.onload = () => setImage(img);
      }
    }, [src]);

    return image ? (
      <KonvaImage
        image={image}
        x={x}
        y={y}
        width={100}
        height={100}
        draggable
        onDragEnd={e => updateElement(id, { x: e.target.x(), y: e.target.y() })}
      />
    ) : null;
  }

  export default ImageComponent;
  ```

- **Update Canvas**: Add image upload functionality.

  ```tsx
  // In src/components/Canvas.tsx, add to imports:
  import ImageComponent from './ImageComponent';

  // Add function:
  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`public/${Date.now()}-${file.name}`, file);
      if (error) {
        console.error('Image upload error:', error);
        return;
      }
      const { publicURL } = supabase.storage.from('images').getPublicUrl(data!.path);
      addElement({
        sessionId,
        type: 'image',
        x: window.innerWidth / 2 / scale - position.x / scale,
        y: window.innerHeight / 2 / scale - position.y / scale,
        content: publicURL,
      });
    }
  };

  // Add to JSX:
  return (
    <>
      <button onClick={handleAddText} style={{ position: 'absolute', top: 10, left: 10 }}>
        Add Text
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleAddImage}
        style={{ position: 'absolute', top: 40, left: 10 }}
      />
      <Stage ...>
        <Layer>
          {elements.map((el) =>
            el.type === 'text' ? (
              <TextComponent key={el.id} id={el.id} text={el.content} x={el.x} y={el.y} />
            ) : el.type === 'image' ? (
              <ImageComponent key={el.id} id={el.id} src={el.content} x={el.x} y={el.y} />
            ) : null
          )}
        </Layer>
      </Stage>
    </>
  );
  ```

- **Storage Setup**: Create an `images` bucket in Supabase Storage with public access for the MVP.

#### 9. Enable Grouping of Elements

Implement grouping using Konva Groups.

- **Update Canvas Store**: Add group-related actions.

  ```ts
  // In src/store/canvasStore.ts, add to CanvasState:
  addGroup: (sessionId: string, elementIds: string[]) => Promise<void>;

  // Add to create:
  addGroup: async (sessionId: string, elementIds: string[]) => {
    const { data, error } = await supabase.from('canvas_groups').insert([{ sessionId }]).single();
    if (error) {
      console.error('Add group error:', error);
      return;
    }
    const groupId = data.id;
    await supabase.from('canvas_elements').update({ group_id: groupId }).in('id', elementIds);
  },
  ```

- **Update Canvas**: Add selection and grouping logic.

  ```tsx
  // In src/components/Canvas.tsx, add to imports:
  import { Group, Line } from 'react-konva';

  // Add state:
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const groups = useCanvasStore((state) => state.groups);
  const connections = useCanvasStore((state) => state.connections);
  const addGroup = useCanvasStore((state) => state.addGroup);

  // Update rendering:
  const handleClick = (id: string, e: any) => {
    if (e.evt.shiftKey) {
      setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    } else {
      setSelectedIds([id]);
    }
  };

  const handleGroup = () => {
    if (selectedIds.length > 1) {
      addGroup(sessionId, selectedIds);
      setSelectedIds([]);
    }
  };

  return (
    <>
      <button onClick={handleAddText} style={{ position: 'absolute', top: 10, left: 10 }}>
        Add Text
      </button>
      <input type="file" accept="image/*" onChange={handleAddImage} style={{ position: 'absolute', top: 40, left: 10 }} />
      {selectedIds.length > 1 && (
        <button onClick={handleGroup} style={{ position: 'absolute', top: 70, left: 10 }}>
          Group
        </button>
      )}
      <Stage ...>
        <Layer>
          {groups.map((group) => (
            <Group key={group.id} draggable onDragEnd={(e) => {
              const dx = e.target.x();
              const dy = e.target.y();
              elements.filter((el) => el.groupId === group.id).forEach((el) =>
                updateElement(el.id, { x: el.x + dx, y: el.y + dy })
              );
              e.target.position({ x: 0, y: 0 }); // Reset group position
            }}>
              {elements.filter((el) => el.groupId === group.id).map((el) =>
                el.type === 'text' ? (
                  <TextComponent
                    key={el.id}
                    id={el.id}
                    text={el.content}
                    x={el.x}
                    y={el.y}
                    onClick={(e) => handleClick(el.id, e)}
                  />
                ) : (
                  <ImageComponent
                    key={el.id}
                    id={el.id}
                    src={el.content}
                    x={el.x}
                    y={el.y}
                    onClick={(e) => handleClick(el.id, e)}
                  />
                )
              )}
            </Group>
          ))}
          {elements.filter((el) => !el.groupId).map((el) =>
            el.type === 'text' ? (
              <TextComponent
                key={el.id}
                id={el.id}
                text={el.content}
                x={el.x}
                y={el.y}
                onClick={(e) => handleClick(el.id, e)}
              />
            ) : (
              <ImageComponent
                key={el.id}
                id={el.id}
                src={el.content}
                x={el.x}
                y={el.y}
                onClick={(e) => handleClick(el.id, e)}
              />
            )
          )}
          {connections.map((conn) => {
            const fromEl = elements.find((el) => el.id === conn.fromElementId);
            const toEl = elements.find((el) => el.id === conn.toElementId);
            if (fromEl && toEl) {
              return (
                <Line
                  key={conn.id}
                  points={[fromEl.x, fromEl.y, toEl.x, toEl.y]}
                  stroke="black"
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </>
  );
  ```

#### 10. Connect Elements with Lines

Enable users to connect elements.

- **Update Canvas Store**: Add connection action.

  ```ts
  // In src/store/canvasStore.ts, add to CanvasState:
  addConnection: (sessionId: string, fromElementId: string, toElementId: string) => Promise<void>;

  // Add to create:
  addConnection: async (sessionId: string, fromElementId: string, toElementId: string) => {
    const { error } = await supabase.from('canvas_connections').insert([{ sessionId, from_element_id: fromElementId, to_element_id: toElementId }]);
    if (error) console.error('Add connection error:', error);
  },
  ```

- **Update Canvas**: Add connection button.

  ```tsx
  // In src/components/Canvas.tsx, add:
  const addConnection = useCanvasStore(state => state.addConnection);

  const handleConnect = () => {
    if (selectedIds.length === 2) {
      addConnection(sessionId, selectedIds[0], selectedIds[1]);
      setSelectedIds([]);
    }
  };

  // Add to JSX:
  {
    selectedIds.length === 2 && (
      <button onClick={handleConnect} style={{ position: 'absolute', top: 100, left: 10 }}>
        Connect
      </button>
    );
  }
  ```

### Testing

- **Unit Tests**: Add tests in `tests/services/canvas.test.ts` to verify Supabase interactions.
- **Manual Testing**:
  - Add text and image elements, verify they appear and persist.
  - Drag elements, ensure positions update in Supabase.
  - Group elements, confirm they move together.
  - Connect elements, check lines render correctly.

### Deliverables

- Canvas page at `/canvas/[sessionId]`.
- Functional canvas with text, images, dragging, grouping, and connections.
- Database tables with real-time subscriptions.

### Next Steps

- Milestone 3: Enhance real-time collaboration with multiple users, refine UI with a toolbar, and add undo/redo functionality.
