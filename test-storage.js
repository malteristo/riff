// Test script to verify Supabase storage access
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://vxjzyhrqcnczdkvdsulz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4anp5aHJxY25jemRrdmRzdWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MDE4NzIsImV4cCI6MjA1NzE3Nzg3Mn0.jP1zgD-bgqI0ppVH88ukoAyIZRkAvS0yovU55iZnaW0'
);

async function testStorage() {
  console.log('=== SUPABASE STORAGE TEST ===\n');
  
  // 1. List all buckets
  console.log('1. Listing all storage buckets:');
  
  try {
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets();
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
    } else {
      console.log('Buckets found:', buckets.length);
      buckets.forEach(bucket => {
        console.log(`- ${bucket.name} (${bucket.id})`);
      });
    }
  } catch (err) {
    console.error('Exception listing buckets:', err);
  }
  
  // 2. List files in riff-files bucket
  console.log('\n2. Listing files in riff-files bucket:');
  
  try {
    const { data: files, error: filesError } = await supabase
      .storage
      .from('riff-files')
      .list('', { limit: 100 });
    
    if (filesError) {
      console.error('Error listing files:', filesError);
    } else if (!files || files.length === 0) {
      console.log('No files found in the root of the bucket.');
    } else {
      console.log('Files found in root:', files.length);
      files.forEach(file => {
        console.log(`- ${file.name} (${file.id}) - ${file.metadata?.size || 'unknown'} bytes`);
      });
    }
    
    // Check for files in 'test' folder
    const { data: testFiles, error: testFilesError } = await supabase
      .storage
      .from('riff-files')
      .list('test', { limit: 100 });
    
    if (testFilesError) {
      console.error('Error listing test files:', testFilesError);
    } else if (!testFiles || testFiles.length === 0) {
      console.log('No files found in the test folder.');
    } else {
      console.log('\nFiles found in test folder:', testFiles.length);
      testFiles.forEach(file => {
        console.log(`- ${file.name} (${file.id}) - ${file.metadata?.size || 'unknown'} bytes`);
      });
    }
  } catch (err) {
    console.error('Exception listing files:', err);
  }
  
  // 3. Create permissions test file
  console.log('\n3. Testing permissions by creating a test file:');
  
  try {
    const testBuffer = new Uint8Array(16).fill(9);
    const testFileName = `permission-test-${Date.now()}.bin`;
    
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('riff-files')
      .upload(`test/${testFileName}`, testBuffer, {
        contentType: 'application/octet-stream',
        upsert: true
      });
      
    if (uploadError) {
      console.error('Error uploading test file:', uploadError);
    } else {
      console.log(`Test file uploaded successfully: ${testFileName}`);
      
      // Try to download the file
      const { data: downloadData, error: downloadError } = await supabase
        .storage
        .from('riff-files')
        .download(`test/${testFileName}`);
        
      if (downloadError) {
        console.error('Error downloading test file:', downloadError);
      } else {
        console.log(`Test file downloaded successfully, size: ${downloadData.size} bytes`);
        
        // Clean up by deleting the test file
        const { error: deleteError } = await supabase
          .storage
          .from('riff-files')
          .remove([`test/${testFileName}`]);
          
        if (deleteError) {
          console.error('Error deleting test file:', deleteError);
        } else {
          console.log(`Test file deleted successfully`);
        }
      }
    }
  } catch (err) {
    console.error('Exception testing permissions:', err);
  }
  
  console.log('\n=== TEST COMPLETE ===');
}

testStorage().catch(console.error); 