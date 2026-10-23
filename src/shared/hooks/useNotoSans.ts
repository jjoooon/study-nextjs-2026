/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ui-font-noto';

/**
 * 모든 iframe에 font-noto 클래스를 전파하는 헬퍼 함수
 */
const broadcastFontToIframes = (isNoto: boolean) => {
  if (typeof document === 'undefined') return;
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach((iframe) => {
    try {
      if (iframe.contentDocument) {
        if (isNoto) {
          iframe.contentDocument.documentElement.classList.add('font-noto');
          iframe.contentDocument.body?.classList.add('font-noto');
        } else {
          iframe.contentDocument.documentElement.classList.remove('font-noto');
          iframe.contentDocument.body?.classList.remove('font-noto');
        }
      }
    } catch {
      // cross-origin iframe 등 예외 무시
    }
  });
};

/**
 * DOM 및 로컬 스토리지에 노토산스 적용 여부를 반영하는 헬퍼 함수
 */
const applyNotoSansDOM = (active: boolean) => {
  if (typeof document === 'undefined') return;

  if (active) {
    document.documentElement.classList.add('font-noto');
    document.body?.classList.add('font-noto');
  } else {
    document.documentElement.classList.remove('font-noto');
    document.body?.classList.remove('font-noto');
  }

  broadcastFontToIframes(active);

  try {
    localStorage.setItem(STORAGE_KEY, active ? 'true' : 'false');
  } catch {
    // localStorage 접근 제한 환경 예외 무시
  }
};

/**
 * useNotoSans - 전역 노토산스 폰트 토글 커스텀 훅
 *
 * @description
 * 전체 화면의 폰트를 'Noto Sans KR'로 전환하거나 원래 폰트로 되돌리는 상태와 제어 함수를 제공합니다.
 * - LocalStorage에 설정을 저장하여 새로고침 시에도 사용자 선택 유지
 * - 화면 내 iframe(동일 출처)에도 폰트 클래스 전파
 */
export function useNotoSans() {
  const [isNotoSans, setIsNotoSans] = useState<boolean>(false);

  // 초기 마운트 시 localStorage 값 확인 및 초기 적용
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'true') {
        setIsNotoSans(true);
        applyNotoSansDOM(true);
      }
    } catch {
      // localStorage 접근 제한 시 무시
    }
  }, []);

  const toggleNotoSans = useCallback(() => {
    setIsNotoSans((prev) => {
      const next = !prev;
      applyNotoSansDOM(next);
      return next;
    });
  }, []);

  const setNotoSans = useCallback((active: boolean) => {
    setIsNotoSans(active);
    applyNotoSansDOM(active);
  }, []);

  return {
    isNotoSans,
    toggleNotoSans,
    setNotoSans,
  };
}

export default useNotoSans;
