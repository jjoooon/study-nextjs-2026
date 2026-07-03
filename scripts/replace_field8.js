const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../src/features/pub/ispl/cvrPl/data');

if (!fs.existsSync(targetDir)) {
  console.error(`Directory not found: ${targetDir}`);
  process.exit(1);
}

const files = fs.readdirSync(targetDir);

for (const file of files) {
  if (file.startsWith('ltpa35002') && file.endsWith('.ts')) {
    const filePath = path.join(targetDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. 타입 정의 변경
    content = content.replace(/field8\?\s*:\s*[^;\n]+/g, 'field8?: string[]');

    // 2. 값 선언 변경 (field8: '값' -> field8: ['값'])
    content = content.replace(/field8:\s*'([^']*)'/g, "field8: ['$1']");

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed: ${file}`);
  }
}

console.log('Done!');
