-- Setup script for Supabase database schema
-- This script creates the necessary tables and storage buckets for the Excalidraw app

-- Create scenes table to store encrypted scenes data
CREATE TABLE IF NOT EXISTS scenes (
  id TEXT PRIMARY KEY,
  scene_version INTEGER NOT NULL,
  iv INTEGER[] NOT NULL,
  ciphertext INTEGER[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add row-level security policies for scenes table
ALTER TABLE scenes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to select scenes
CREATE POLICY "Anyone can read scenes" ON scenes
  FOR SELECT USING (true);

-- Create policy to allow anyone to insert scenes
CREATE POLICY "Anyone can insert scenes" ON scenes
  FOR INSERT WITH CHECK (true);

-- Create policy to allow updates to scenes with same ID
CREATE POLICY "Anyone can update their scenes" ON scenes
  FOR UPDATE USING (true);

-- Create storage bucket for files
-- This needs to be done via the Supabase dashboard or using the API
-- The following is a placeholder for documentation purposes
/*
  STORAGE SETUP STEPS:
  1. Create a new bucket named 'excalidraw-files' with public access
  2. Configure the following CORS settings for the bucket:
     - Allowed Origins: * (or your specific domain)
     - Allowed Methods: GET, POST, PUT, DELETE, OPTIONS
     - Allowed Headers: *
     - Max Age: 86400
  3. Set up storage policies to allow read and write access
*/

-- Create a stored procedure to create the scenes table if it doesn't exist
-- This can be called from the application code to ensure the table exists
CREATE OR REPLACE FUNCTION create_scenes_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS scenes (
    id TEXT PRIMARY KEY,
    scene_version INTEGER NOT NULL,
    iv INTEGER[] NOT NULL,
    ciphertext INTEGER[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
  );
  
  -- Add row-level security policies if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'scenes' AND policyname = 'Anyone can read scenes'
  ) THEN
    CREATE POLICY "Anyone can read scenes" ON scenes FOR SELECT USING (true);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'scenes' AND policyname = 'Anyone can insert scenes'
  ) THEN
    CREATE POLICY "Anyone can insert scenes" ON scenes FOR INSERT WITH CHECK (true);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'scenes' AND policyname = 'Anyone can update their scenes'
  ) THEN
    CREATE POLICY "Anyone can update their scenes" ON scenes FOR UPDATE USING (true);
  END IF;
END;
$$ LANGUAGE plpgsql; 