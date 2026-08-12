/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

export const isIframe = () => {
  try {
    return window !== window.top;
  } catch {
    return true;
  }
};

/**
 * 새 브라우저 창(또는 탭)을 열어 지정한 URL로 이동한다.
 * @param url - 열 페이지의 URL
 * @param target - 창 이름 또는 키워드 (`_blank` | `_self` | `_parent` | `_top`). 생략 시 브라우저 기본값(`_blank`)
 * @param features - 창 속성 문자열 (예: `"width=800,height=600,noopener,noreferrer"`)
 * @param onBlocked - 팝업이 차단된 경우 호출되는 콜백. 생략 시 콘솔 경고 출력
 * @returns 열린 창의 `WindowProxy`, 차단되었거나 실패한 경우 `null`
 */
export const openBrowser = (url: string, target?: string, features?: string, onBlocked?: () => void) => {
  const win = window.open(url, target, features);

  if (win === null) {
    if (onBlocked) {
      onBlocked();
    } else {
      console.warn(`[openBrowser] 팝업이 차단되었습니다: ${url}`);
    }
  }

  return win;
};
