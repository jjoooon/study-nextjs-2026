/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { CellSelectionOptions, ProcessCellForClipboard } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { defaultProcessCellForClipboard } from '@/shared/lib/agGridPub';
import { hanwhaStyleTheme } from '@/shared/styles/gridTheme';

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
