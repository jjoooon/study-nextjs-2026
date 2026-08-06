/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
/**
 * Chrome / Edge 109 레거시 브라우저 감지기
 * - JS 모듈 로드 즉시 실행되어 document.documentElement 및 document.body에 'v109' 클래스를 주입합니다.
 * - Next.js 및 Storybook 환경 모두에서 동작합니다.
 */
if (typeof window !== 'undefined') {
  try {
    const ua = navigator.userAgent;
    const is109 = /(Chrome|Edg(e|A|iOS)?)\/109\./i.test(ua);
    console.log('[BrowserDetector] is109:', is109, '| UA:', ua);

    if (is109) {
      document.documentElement.classList.add('v109');

      const applyBodyClass = () => {
        if (document.body && !document.body.classList.contains('v109')) {
          document.body.classList.add('v109');
        }
      };

      applyBodyClass();
      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', applyBodyClass);
      }
    }
  } catch (e) {
    console.error('[BrowserDetector] Error:', e);
  }
}

export {};
