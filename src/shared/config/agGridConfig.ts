/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { FirstDataRenderedEvent, RowDataUpdatedEvent } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

import { autoAdjustAgGridRowHeights } from '@/shared/lib/agGridPub';

export { autoAdjustAgGridRowHeights };

/**
 * AG-Grid 전역 기본 설정
 * 프로젝트 전체의 AgGridReact 컴포넌트에 공통 defaultProps를 적용합니다.
 */
interface AgGridReactPropsWithDefault {
  suppressDragLeaveHidesColumns?: boolean;
  onFirstDataRendered?: (params: FirstDataRenderedEvent) => void;
  onRowDataUpdated?: (params: RowDataUpdatedEvent) => void;
  [key: string]: unknown;
}

const Component = AgGridReact as unknown as { defaultProps?: AgGridReactPropsWithDefault };

if (!Component.defaultProps) {
  Component.defaultProps = {};
}

// 헤더 셀 드래그 이동 시 밖으로 나가도 컬럼 숨김(삭제) 방지
Component.defaultProps.suppressDragLeaveHidesColumns = true;

// 1. onFirstDataRendered 전역 체이닝
const originalOnFirstDataRendered = Component.defaultProps.onFirstDataRendered;
Component.defaultProps.onFirstDataRendered = (params: FirstDataRenderedEvent) => {
  autoAdjustAgGridRowHeights(params.api);
  if (typeof originalOnFirstDataRendered === 'function') {
    originalOnFirstDataRendered(params);
  }
};

// 2. onRowDataUpdated 전역 체이닝
const originalOnRowDataUpdated = Component.defaultProps.onRowDataUpdated;
Component.defaultProps.onRowDataUpdated = (params: RowDataUpdatedEvent) => {
  autoAdjustAgGridRowHeights(params.api);
  if (typeof originalOnRowDataUpdated === 'function') {
    originalOnRowDataUpdated(params);
  }
};

// 3. document.fonts.ready 감지 시 폰트 로딩 완료 후 Window Resize 트리거 (AG Grid 자동 레이아웃 재계산 유도)
if (typeof window !== 'undefined' && document.fonts && typeof document.fonts.ready?.then === 'function') {
  document.fonts.ready
    .then(() => {
      window.dispatchEvent(new Event('resize'));
    })
    .catch(() => {
      // 폰트 로드 실패 시 예외 무시
    });
}
