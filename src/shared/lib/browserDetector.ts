/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
/**
 * Chrome / Edge 109 이하 레거시 브라우저 감지기
 * - JS 모듈 로드 즉시 실행되어 document.documentElement 및 document.body에 'v109' 클래스를 주입합니다.
 * - navigator.userAgent 및 navigator.userAgentData(Client Hints)를 모두 검사하여 Chrome / Edge 버전 109 이하인 경우 적용합니다.
 * - Next.js 및 Storybook 하이드레이션 이후에도 'v109' 클래스가 유지되도록 관리합니다.
 */
if (typeof window !== 'undefined') {
  try {
    const getBrowserVersion = (): number | null => {
      // 1. Client Hints (navigator.userAgentData) 검사
      const nav = navigator as unknown as {
        userAgentData?: {
          brands?: Array<{ brand: string; version: string }>;
        };
      };
      if (nav.userAgentData?.brands) {
        for (const b of nav.userAgentData.brands) {
          if (!/Not/i.test(b.brand) && /(Chrome|Chromium|Edge|Microsoft Edge)/i.test(b.brand)) {
            const versionNum = parseInt(b.version.split('.')[0], 10);
            if (!isNaN(versionNum) && versionNum > 0) {
              return versionNum;
            }
          }
        }
      }

      // 2. User Agent 문자열 정밀 유연 검사
      const ua = navigator.userAgent;
      if (!ua) return null;

      // Chrome, Edg/Edge/EdgW/EdgA/EdgiOS, CriOS, Chromium 계열 버전 검사
      const matches = ua.matchAll(/(?:Chrome|Chromium|Edg(?:e|A|iOS|W)?|CriOS)[\/ ](\d+)/gi);
      for (const match of matches) {
        const ver = parseInt(match[1], 10);
        if (!isNaN(ver) && ver > 0) {
          return ver;
        }
      }

      return null;
    };

    const ver = getBrowserVersion();
    const versionClass = ver ? (ver <= 109 ? 'v109' : `v${ver}`) : null;
    console.log('[BrowserDetector] version:', ver, '| class:', versionClass, '| UA:', navigator.userAgent);

    if (versionClass) {
      const applyVersionClass = () => {
        if (document.documentElement && !document.documentElement.classList.contains(versionClass)) {
          document.documentElement.classList.add(versionClass);
        }
        if (document.body && !document.body.classList.contains(versionClass)) {
          document.body.classList.add(versionClass);
        }
      };

      // 즉시 적용
      applyVersionClass();

      // DOMContentLoaded & load 시점 재적용
      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', applyVersionClass);
      }
      window.addEventListener('load', applyVersionClass);

      // React / Next.js 하이드레이션 등으로 클래스가 제거/덮어씌워지는 경우 방지 (초기 3초간 300ms 주기 보장)
      const intervalId = setInterval(applyVersionClass, 300);
      setTimeout(() => clearInterval(intervalId), 3000);
    }
  } catch (e) {
    console.error('[BrowserDetector] Error:', e);
  }
}

export {};
