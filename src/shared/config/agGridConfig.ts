/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { CellSelectionOptions, ProcessCellForClipboard } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { defaultProcessCellForClipboard } from '@/shared/lib/agGridPub';

/**
 * AG-Grid 전역 기본 설정
 * 프로젝트 전체의 AgGridReact 컴포넌트에 공통 defaultProps를 적용합니다.
 */
interface AgGridReactPropsWithDefault {
  theme?: unknown;
  suppressDragLeaveHidesColumns?: boolean;
  suppressGroupRowsSticky?: boolean;
  cellSelection?: boolean | CellSelectionOptions;
  processCellForClipboard?: ProcessCellForClipboard;
  tooltipShowMode?: 'whenTruncated' | 'always';
  defaultColDef?: Record<string, unknown>;
  [key: string]: unknown;
}

const Component = AgGridReact as unknown as { defaultProps?: AgGridReactPropsWithDefault };

if (!Component.defaultProps) {
  Component.defaultProps = {};
}

// 헤더 셀 드래그 이동 시 밖으로 나가도 컬럼 숨김(삭제) 방지
Component.defaultProps.suppressDragLeaveHidesColumns = true;

// 그룹/트리 행 스크롤 시 부모 행 상단 고정(Sticky) 방지 (일반 행처럼 스크롤)
Component.defaultProps.suppressGroupRowsSticky = true;

// 드래그 시 엑셀처럼 셀 영역 선택 및 fill 핸들(연속 채우기) 활성화
Component.defaultProps.cellSelection = {
  handle: {
    mode: 'fill',
  },
};

// 클립보드 복사(Ctrl+C) 시 병합된 빈칸에 부모 값을 꽉 채워서 엑셀에 전달
Component.defaultProps.processCellForClipboard = defaultProcessCellForClipboard;

/**
 * 전역 가로 스크롤 감지 (Chrome v109 호환 및 고성능)
 * 모든 .ag-theme-alpine 래퍼에 is-scroll-h 클래스를 정확히 자동 토글합니다.
 */
if (typeof window !== 'undefined') {
  const resizeObserverMap = new WeakMap<Element, ResizeObserver>();

  const updateHScrollClass = (scrollEl: Element) => {
    const alpineWrapper = scrollEl.closest('.ag-theme-alpine');
    if (!alpineWrapper) return;

    const htmlScrollEl = scrollEl as HTMLElement;
    const viewport =
      (scrollEl.querySelector('.ag-body-horizontal-scroll-viewport') as HTMLElement | null) || htmlScrollEl;

    // 1) 스크롤바 영역이 실제로 높이(> 0)를 가지고 보이고 있는지
    // 2) 내부 스크롤 가능한 너비(scrollWidth)가 보이는 영역(clientWidth)보다 큰지
    // 3) invisible 클래스가 없는지 모두 만족해야 실제 가로 스크롤이 활성화된 상태
    const isShowing =
      htmlScrollEl.offsetHeight > 0 &&
      viewport.scrollWidth > viewport.clientWidth &&
      !scrollEl.classList.contains('ag-scrollbar-invisible');

    alpineWrapper.classList.toggle('is-scroll-h', isShowing);

    // 스크롤바 및 뷰포트 크기 변화 실시간 감지 (컬럼 리사이즈, 창 리사이즈 등)
    if (!resizeObserverMap.has(scrollEl)) {
      const ro = new ResizeObserver(() => {
        const currentShowing =
          htmlScrollEl.offsetHeight > 0 &&
          viewport.scrollWidth > viewport.clientWidth &&
          !scrollEl.classList.contains('ag-scrollbar-invisible');
        alpineWrapper.classList.toggle('is-scroll-h', currentShowing);
      });
      ro.observe(scrollEl);
      if (viewport !== scrollEl) {
        ro.observe(viewport);
      }
      resizeObserverMap.set(scrollEl, ro);
    }
  };

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        const target = mutation.target as HTMLElement;
        if (target.classList.contains('ag-body-horizontal-scroll')) {
          updateHScrollClass(target);
        }
      } else if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.classList.contains('ag-body-horizontal-scroll')) {
              updateHScrollClass(node);
            } else {
              const scrollEls = node.querySelectorAll('.ag-body-horizontal-scroll');
              scrollEls.forEach(updateHScrollClass);
            }
          }
        });
      }
    }
  });

  const startObserver = () => {
    document.querySelectorAll('.ag-body-horizontal-scroll').forEach(updateHScrollClass);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserver);
  } else {
    startObserver();
  }
}
