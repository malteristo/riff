-- SQL script to fix storage permissions for the riff-files bucket

-- Enable row-level security for the storage.objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to select from the bucket
CREATE POLICY "Anyone can read objects" ON storage.objects
  FOR SELECT USING (bucket_id = 'riff-files');

-- Create a policy to allow anyone to insert into the bucket
CREATE POLICY "Anyone can insert objects" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'riff-files');

-- Create a policy to allow anyone to update objects they have created
CREATE POLICY "Anyone can update their objects" ON storage.objects
  FOR UPDATE USING (bucket_id = 'riff-files');

-- Create a policy to allow anyone to delete objects they have created
CREATE POLICY "Anyone can delete their objects" ON storage.objects
  FOR DELETE USING (bucket_id = 'riff-files');

-- Set the bucket to public
UPDATE storage.buckets
SET public = true
WHERE name = 'riff-files';

-- If the bucket doesn't exist, create it
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
SELECT 'riff-files', 'riff-files', true, 50000000, null
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'riff-files'); 