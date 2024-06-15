const fs = require('fs');
const path = require('path');

function printDirectoryStructure(dir, prefix = '') {
  const files = fs.readdirSync(dir);

  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    const isLast = index === files.length - 1;
    const newPrefix = prefix + (isLast ? '└── ' : '├── ');

    console.log(prefix + newPrefix + file);

    if (fs.statSync(filePath).isDirectory()) {
      printDirectoryStructure(filePath, prefix + (isLast ? '    ' : '│   '));
    }
  });
}

const directoryToPrint = process.argv[2] || '.';
printDirectoryStructure(directoryToPrint);