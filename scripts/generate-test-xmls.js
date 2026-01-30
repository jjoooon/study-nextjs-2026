const fs = require('fs');
const path = require('path');

// 현재 XML 파일 읽기
const baseXmlPath = path.join(__dirname, '../public/mocks/data/LA02866001__0_20260129.xml');
const baseXml = fs.readFileSync(baseXmlPath, 'utf-8');

// XML 파싱해서 반복할 전체 블록 찾기
const lines = baseXml.split('\n');
const header = lines.slice(0, 2).join('\n') + '\n'; // <?xml ... <GD ...>
const footer = '\n</GD>';

// 전체 XML 구조를 하나의 완전한 블록으로 추출
const middleSection = lines.slice(2, 75).join('\n'); // <GD> 태그 다음부터 </GD> 태그 직전까지 (line 75는 </GD>)

// 대용량 XML 생성 함수
function generateLargeXml(targetSizeMB) {
  const targetSizeBytes = targetSizeMB * 1024 * 1024;

  let content = header;
  let currentSize = Buffer.byteLength(content, 'utf8');

  // 목표 크기의 95%까지 채우기 (footer를 위해 조금 여유)
  const targetContentSize = Math.floor(targetSizeBytes * 0.95);

  // 반복 횟수 계산 (대략적인 크기 기준)
  const baseBlockSize = Buffer.byteLength(middleSection, 'utf8');
  const iterationsNeeded = Math.floor((targetContentSize - currentSize) / baseBlockSize);

  // 전체 블록을 반복해서 추가
  for (let i = 0; i < iterationsNeeded; i++) {
    content += '\n' + middleSection;
    currentSize = Buffer.byteLength(content, 'utf8');
  }

  // 부족한 크기를 PAD_DATA로 채우기
  currentSize = Buffer.byteLength(content, 'utf8');
  if (currentSize < targetContentSize) {
    const paddingNeeded = targetContentSize - currentSize;
    const chunkSize = 1024; // 1KB 청크
    const chunkCount = Math.floor(paddingNeeded / chunkSize);

    for (let i = 0; i < chunkCount; i++) {
      content += `\n    <PAD_DATA ID="${i}">${'X'.repeat(chunkSize - 100)}</PAD_DATA>`;
    }
  }

  content += footer;

  return content;
}

// 파일 생성
const sizes = [1, 3, 5];

sizes.forEach(sizeMB => {
  const fileName = `LA02866001__0_20260129_${sizeMB}MB.xml`;
  const filePath = path.join(__dirname, '../public/mocks/data', fileName);

  console.log(`Generating ${sizeMB}MB XML file...`);
  const content = generateLargeXml(sizeMB);
  fs.writeFileSync(filePath, content, 'utf8');

  const actualSize = Buffer.byteLength(content, 'utf8');
  const actualSizeMB = (actualSize / 1024 / 1024).toFixed(2);
  console.log(`✅ Created: ${fileName} (${actualSizeMB}MB)`);
});

console.log('\n✅ All test XML files generated successfully!');
