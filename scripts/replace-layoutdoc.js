const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../src/stories/page');

function processDir(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return;
  }
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processDir(filePath);
    } else if (file.endsWith('.stories.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('LayoutDoc')) {
        console.log(`Processing: ${filePath}`);
        // Replace import
        content = content.replace(
          /import\s+\{\s*LayoutDoc\s*\}\s+from\s+['"]@layout\/BaseLayout['"];?/g,
          "import { StorySite } from '@/shared/components/storybook/StoryWrap';"
        );
        // Replace JSX tags
        content = content.replace(/<LayoutDoc\b/g, '<StorySite');
        content = content.replace(/<\/LayoutDoc>/g, '</StorySite>');
        
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  }
}

processDir(targetDir);
console.log('Done!');
