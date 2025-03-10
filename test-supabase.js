// Test script to verify Supabase integration
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://vxjzyhrqcnczdkvdsulz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4anp5aHJxY25jemRrdmRzdWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MDE4NzIsImV4cCI6MjA1NzE3Nzg3Mn0.jP1zgD-bgqI0ppVH88ukoAyIZRkAvS0yovU55iZnaW0'
);

// Test ID for the test scene
const TEST_SCENE_ID = 'test-scene-' + Date.now().toString();
const TEST_ROOM_KEY = 'test-key-' + Date.now().toString();

async function testSupabaseDatabase() {
  console.log('1. Testing Supabase Database Operations');
  console.log('---------------------------------------');
  
  // 1. Create a test scene
  console.log(`Creating test scene with ID: ${TEST_SCENE_ID}`);
  
  const testData = {
    id: TEST_SCENE_ID,
    scene_version: 1,
    iv: Array.from(new Uint8Array(16).fill(1)), // Simple test data
    ciphertext: Array.from(new Uint8Array(64).fill(2)), // Simple test data
  };
  
  const { data: insertData, error: insertError } = await supabase
    .from('scenes')
    .insert(testData)
    .select();
    
  console.log('Insert result:', insertError ? 'Error' : 'Success');
  if (insertError) console.error(insertError);
  
  // 2. Read the test scene
  console.log(`\nReading test scene with ID: ${TEST_SCENE_ID}`);
  
  const { data: readData, error: readError } = await supabase
    .from('scenes')
    .select('*')
    .eq('id', TEST_SCENE_ID)
    .single();
    
  console.log('Read result:', readError ? 'Error' : 'Success');
  console.log('Data found:', readData ? 'Yes' : 'No');
  if (readData) console.log('Scene version:', readData.scene_version);
  
  // 3. Update the test scene
  console.log('\nUpdating test scene');
  
  const { data: updateData, error: updateError } = await supabase
    .from('scenes')
    .update({ scene_version: 2 })
    .eq('id', TEST_SCENE_ID)
    .select();
    
  console.log('Update result:', updateError ? 'Error' : 'Success');
  
  // 4. Delete the test scene
  console.log('\nDeleting test scene');
  
  const { error: deleteError } = await supabase
    .from('scenes')
    .delete()
    .eq('id', TEST_SCENE_ID);
    
  console.log('Delete result:', deleteError ? 'Error' : 'Success');
  
  return !insertError && !readError && !updateError && !deleteError;
}

async function testSupabaseStorage() {
  console.log('\n2. Testing Supabase Storage Operations');
  console.log('---------------------------------------');
  
  // Create test data
  const testBuffer = new Uint8Array(16).fill(5);
  
  // 1. Upload a test file
  console.log('Uploading test file');
  
  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from('riff-files')
    .upload(`/test/${TEST_SCENE_ID}`, testBuffer, {
      contentType: 'application/octet-stream',
      upsert: true
    });
    
  console.log('Upload result:', uploadError ? 'Error' : 'Success');
  if (uploadError) console.error(uploadError);
  
  // 2. Check if file exists
  console.log('\nChecking if file exists');
  
  const { data: listData, error: listError } = await supabase
    .storage
    .from('riff-files')
    .list('test');
    
  console.log('List result:', listError ? 'Error' : 'Success');
  if (listData) {
    const fileExists = listData.some(file => file.name === TEST_SCENE_ID);
    console.log('File found:', fileExists);
  }
  
  // 3. Download the file
  console.log('\nDownloading test file');
  
  const { data: downloadData, error: downloadError } = await supabase
    .storage
    .from('riff-files')
    .download(`/test/${TEST_SCENE_ID}`);
    
  console.log('Download result:', downloadError ? 'Error' : 'Success');
  if (downloadData) {
    console.log('File size:', downloadData.size, 'bytes');
  }
  
  // 4. Delete the file
  console.log('\nDeleting test file');
  
  const { error: deleteError } = await supabase
    .storage
    .from('riff-files')
    .remove([`/test/${TEST_SCENE_ID}`]);
    
  console.log('Delete result:', deleteError ? 'Error' : 'Success');
  
  return !uploadError && !listError && !downloadError && !deleteError;
}

// Run the tests
async function runTests() {
  console.log('=== SUPABASE INTEGRATION TESTS ===\n');
  
  const dbSuccess = await testSupabaseDatabase();
  const storageSuccess = await testSupabaseStorage();
  
  console.log('\n=== TEST RESULTS ===');
  console.log('Database Tests:', dbSuccess ? 'PASSED' : 'FAILED');
  console.log('Storage Tests:', storageSuccess ? 'PASSED' : 'FAILED');
  console.log('Overall Result:', (dbSuccess && storageSuccess) ? 'PASSED' : 'FAILED');
}

runTests().catch(console.error);
