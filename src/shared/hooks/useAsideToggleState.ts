'use client';

import { useState } from 'react';

/**
 * 페이지 셸의 aside 표시/확장 상태를 관리하는 공통 훅.
 *
 * 역할
 * - `isWidthExpanded`: 메인 영역 확장 여부(aside를 접는 상태) 관리
 * - `setIsWidthExpanded`: step 컴포넌트 등 하위에서 상태 제어
 * - `hideAside`: 레이아웃 컴포넌트에 바로 전달 가능한 파생 상태
 *
 * 사용 예
 * - `LayoutTemplateAsideToggle`의 `hideAside` props와 연동하여
 *   화면 공통 레이아웃의 aside 토글 동작을 일관되게 유지
 */
export function useAsideToggleState(initialState = false) {
  const [isWidthExpanded, setIsWidthExpanded] = useState(initialState);

  return {
    isWidthExpanded,
    setIsWidthExpanded,
    hideAside: isWidthExpanded,
  };
}
