#!/usr/bin/env node

/**
 * Storybook to PDF 생성 스크립트
 * 스토리북의 모든 스토리를 PDF로 변환하여 저장
 * 
 * 사용법:
 *   node scripts/storybook-to-pdf.js
 * 
 * 또는 package.json에 추가:
 *   "export:pdf": "node scripts/storybook-to-pdf.js"
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// 설정
const STORYBOOK_URL = 'http://localhost:6006';
const OUTPUT_DIR = path.join(__dirname, '../storybook-pdfs');
const STORYBOOK_PORT = 6006;

// 출력 디렉토리 생성
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function getStoriesFromStorybook(page) {
  /**
   * 스토리북의 왼쪽 패널에서 모든 스토리 링크 추출
   */
  const stories = await page.evaluate(() => {
    const storyLinks = [];
    
    // Storybook의 내비게이션 항목 선택 (버전에 따라 다를 수 있음)
    const items = document.querySelectorAll('a[href*="path="]');
    
    items.forEach((item) => {
      const href = item.getAttribute('href');
      const text = item.textContent.trim();
      
      if (href && text && !text.includes('Docs')) {
        storyLinks.push({
          url: href,
          title: text.replace(/[/\\?*:|"<>]/g, '_'), // 파일명에 사용할 수 없는 문자 제거
          fullPath: href
        });
      }
    });
    
    return storyLinks;
  });

  return stories;
}

async function exportStoryToPDF(browser, storyUrl, storyTitle) {
  const page = await browser.newPage();
  
  try {
    const fullUrl = storyUrl.startsWith('http') 
      ? storyUrl 
      : `${STORYBOOK_URL}${storyUrl}`;
    
    console.log(`📖 스토리 로딩 중: ${storyTitle}`);
    console.log(`   URL: ${fullUrl}`);
    
    await page.goto(fullUrl, { waitUntil: 'networkidle' });
    
    // 스토리북 로딩 완료 대기
    await page.waitForTimeout(2000);
    
    // PDF 저장
    const pdfPath = path.join(OUTPUT_DIR, `${storyTitle}.pdf`);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm'
      },
      printBackground: true,
    });
    
    console.log(`✅ PDF 생성 완료: ${pdfPath}`);
    return true;
  } catch (error) {
    console.error(`❌ 오류 발생 [${storyTitle}]: ${error.message}`);
    return false;
  } finally {
    await page.close();
  }
}

async function checkStorybookRunning(browser) {
  /**
   * 스토리북 서버가 실행 중인지 확인
   */
  try {
    const page = await browser.newPage();
    await page.goto(STORYBOOK_URL, { waitUntil: 'domcontentloaded', timeout: 5000 });
    await page.close();
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  console.log('🚀 Storybook to PDF 변환 시작\n');
  console.log(`📍 Storybook URL: ${STORYBOOK_URL}`);
  console.log(`📁 출력 경로: ${OUTPUT_DIR}\n`);

  let browser;
  
  try {
    browser = await chromium.launch({ headless: true });
    
    // 스토리북 서버 확인
    console.log('🔍 스토리북 서버 연결 확인 중...');
    const isRunning = await checkStorybookRunning(browser);
    
    if (!isRunning) {
      console.error('\n❌ 스토리북 서버를 찾을 수 없습니다.');
      console.error(`   다음 명령어로 스토리북을 먼저 시작하세요:`);
      console.error(`   npm run storybook\n`);
      process.exit(1);
    }
    
    console.log('✅ 스토리북 서버 연결 성공\n');

    // 초기 페이지 로드
    const mainPage = await browser.newPage();
    await mainPage.goto(STORYBOOK_URL, { waitUntil: 'networkidle' });
    await mainPage.waitForTimeout(2000);

    // 단일 스토리 또는 모든 스토리 접근
    const iframeUrl = `${STORYBOOK_URL}/?path=/story/popup-ltpz010--default`;
    
    console.log('📋 스토리 목록 스캔 중...\n');
    
    // 스토리 목록 (수동 정의)
    const stories = [
      { url: '/?path=/story/popup-ltpz010--default', title: 'LTPZ010_동시가입설계상세' },
      { url: '/?path=/story/popup-ltpz011--default', title: 'LTPZ011_담보내용상세' },
      { url: '/?path=/story/popup-ltpz017--default', title: 'LTPZ017_나만의설계' },
      { url: '/?path=/story/popup-ltpz020--default', title: 'LTPZ020_설계복사' },
      { url: '/?path=/story/popup-ltpz021--default', title: 'LTPZ021_설계비교' },
    ];

    if (stories.length === 0) {
      console.warn('⚠️  스토리를 찾을 수 없습니다.');
      mainPage.close();
      browser.close();
      return;
    }

    mainPage.close();

    // 각 스토리 PDF 생성
    let successCount = 0;
    for (const story of stories) {
      const fullUrl = `${STORYBOOK_URL}${story.url}`;
      const success = await exportStoryToPDF(browser, fullUrl, story.title);
      if (success) successCount++;
    }

    console.log(`\n✨ 완료!`);
    console.log(`   성공: ${successCount}/${stories.length}`);
    console.log(`   저장 위치: ${OUTPUT_DIR}\n`);

  } catch (error) {
    console.error('❌ 오류 발생:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 실행
main().catch(console.error);
