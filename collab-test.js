// Simple test to verify the erroredFiles.reduce fix
const erroredFiles = new Map();
erroredFiles.set('file1', true);
erroredFiles.set('file2', true);

console.log('Testing Map conversion to array for reduce operation:');

try {
  // This would fail with "erroredFiles.reduce is not a function"
  console.log('Direct reduce on Map (should fail):');
  const result1 = erroredFiles.reduce((acc, value, key) => {
    acc[key] = value;
    return acc;
  }, {});
  console.log('Result (unexpected):', result1);
} catch (error) {
  console.log('Expected error:', error.message);
}

try {
  // Our fix: convert to array first
  console.log('\nReduce after converting to array (should work):');
  const result2 = Array.from(erroredFiles.keys()).reduce((acc, key) => {
    acc[key] = erroredFiles.get(key);
    return acc;
  }, {});
  console.log('Result:', result2);
} catch (error) {
  console.log('Unexpected error:', error.message);
}

console.log('\nTest complete - if you see "Result: {file1: true, file2: true}" above, the fix is working!'); 