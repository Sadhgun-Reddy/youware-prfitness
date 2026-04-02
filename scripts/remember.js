// Simple memory reader for the current project state
// Usage: node scripts/remember.js
const fs = require('fs');
const path = require('path');

const memoryFiles = [
  path.resolve(__dirname, '..', 'PROJECT_MEMORY.md'),
  path.resolve(__dirname, '..', 'PROCESS.md'),
];

memoryFiles.forEach((f) => {
  try {
    if (fs.existsSync(f)) {
      console.log('\n===== MEMORY FILE: ' + path.basename(f) + ' =====');
      const content = fs.readFileSync(f, 'utf8');
      // Print first 400 lines to keep output concise
      const lines = content.split('\n');
      const preview = lines.slice(0, 400).join('\n');
      console.log(preview);
    }
  } catch (err) {
    console.error('Error reading memory file', f, err);
  }
});
