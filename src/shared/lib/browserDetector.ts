/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
/**
 * Chrome / Edge 109 레거시 브라우저 감지기
 * - JS 모듈 로드 즉시 실행되어 document.documentElement 및 document.body에 'v109' 클래스를 주입합니다.
 * - navigator.userAgent 및 navigator.userAgentData(Client Hints)를 모두 검사합니다.
 * - Next.js 및 Storybook 하이드레이션 이후에도 'v109' 클래스가 유지되도록 관리합니다.
 */
if (typeof window !== 'undefined') {
  try {
    const checkIs109 = (): boolean => {
      // 1. Client Hints (navigator.userAgentData) 검사
      const nav = navigator as unknown as {
        userAgentData?: {
          brands?: Array<{ brand: string; version: string }>;
        };
      };
      if (nav.userAgentData?.brands) {
        const has109Brand = nav.userAgentData.brands.some((b) => b.version === '109' || b.version.startsWith('109.'));
        if (has109Brand) return true;
      }

      // 2. User Agent 문자열 정밀 유연 검사
      const ua = navigator.userAgent;
      if (!ua) return false;

      // Chrome 109, Edg/Edge/EdgW/EdgA/EdgiOS 109 등 다양한 내부망/엔터프라이즈 패턴 매칭
      const is109Regex = /(?:Chrome|Edg(?:e|A|iOS|W)?|Version)[\/ ]109(?:\.|\b|\/|_)/i;
      if (is109Regex.test(ua)) return true;

      // 추가: UA 문자열에 '109.0.' 가 포함되어 있고 Chrome 또는 Edg 계열인 경우
      if (/109\.0\./.test(ua) && /(Chrome|Edg|Edge)/i.test(ua)) return true;

      return false;
    };

    const is109 = checkIs109();
    console.log('[BrowserDetector] is109:', is109, '| UA:', navigator.userAgent);

    if (is109) {
      const applyV109Class = () => {
        if (document.documentElement && !document.documentElement.classList.contains('v109')) {
          document.documentElement.classList.add('v109');
        }
        if (document.body && !document.body.classList.contains('v109')) {
          document.body.classList.add('v109');
        }
      };

      // 즉시 적용
      applyV109Class();

      // DOMContentLoaded & load 시점 재적용
      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', applyV109Class);
      }
      window.addEventListener('load', applyV109Class);

      // React / Next.js 하이드레이션 등으로 클래스가 제거/덮어씌워지는 경우 방지 (초기 3초간 300ms 주기 보장)
      const intervalId = setInterval(applyV109Class, 300);
      setTimeout(() => clearInterval(intervalId), 3000);
    }
  } catch (e) {
    console.error('[BrowserDetector] Error:', e);
  }
}

export {};
