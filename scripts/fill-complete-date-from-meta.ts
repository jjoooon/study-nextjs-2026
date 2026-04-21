import fs from 'fs';
import path from 'path';

const metaPath = path.resolve(__dirname, '../src/stories/ialist-meta.json');
const dataPath = path.resolve(__dirname, '../src/stories/ialist.json');

const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

Object.entries(meta.data).forEach(([key, idList]) => {
  if (key.startsWith('e')) {
    const dateStr = key.slice(1); // "20260417"
    if (dateStr.length === 8) {
      const formatted = `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;
      (idList as string[]).forEach(id => {
        data.forEach((row: any) => {
          if (row.id === id) {
            row.date = formatted;
          }
        });
      });
    }
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('완료일 자동 입력 완료!');
