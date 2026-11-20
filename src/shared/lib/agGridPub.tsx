'use client';

import {
  AllCommunityModule,
  CellSelectionModule,
  CellSpanModule,
  ClientSideRowModelModule,
  ClipboardModule,
  ModuleRegistry,
  provideGlobalGridOptions,
  type ProcessCellForExportParams,
} from 'ag-grid-enterprise';
import { RichSelectModule } from 'ag-grid-enterprise';
import { TreeDataModule } from 'ag-grid-enterprise';
import { RowGroupingModule } from 'ag-grid-enterprise';
import { hanwhaStyleTheme } from '@/shared/styles/gridTheme';

ModuleRegistry.registerModules([
  AllCommunityModule,
  CellSelectionModule,
  CellSpanModule,
  ClientSideRowModelModule,
  ClipboardModule,
  RowGroupingModule,
  RichSelectModule,
  TreeDataModule,
  // 필요시 엔터프라이즈 모듈 추가
]);

/**
 * 셀 복사(Ctrl+C) 시 병합(colSpan, spanRows 등)으로 인해 비어있는 셀에 원본 값을 꽉 채워서 복사하는 공용 핸들러
 */
export function defaultProcessCellForClipboard(params: ProcessCellForExportParams): unknown {
  const { value, node, column, api } = params;

  // 1. 이미 유효한 값이 있는 경우: 포맷팅 적용 후 반환
  if (value !== null && value !== undefined && value !== '') {
    if (typeof params.formatValue === 'function') {
      const formatted = params.formatValue(value);
      if (formatted !== null && formatted !== undefined) {
        return formatted;
      }
    }
    return value;
  }

  // 2. 가로 병합(colSpan) 또는 세로 병합(spanRows)으로 인해 값이 비어있는 경우 부모 값 탐색
  if (node && api && column) {
    try {
      // 2-1. 가로 병합(colSpan) 탐색: 동일 행의 이전 컬럼들 검사
      const displayedColumns = api.getAllDisplayedColumns?.() ?? [];
      const currentColIndex = displayedColumns.indexOf(column);

      if (currentColIndex > 0) {
        for (let i = currentColIndex - 1; i >= 0; i--) {
          const prevCol = displayedColumns[i];
          const colDef = prevCol.getColDef();
          let span = 1;
          if (typeof colDef.colSpan === 'function') {
            span = colDef.colSpan({
              node,
              data: node.data,
              colDef,
              column: prevCol,
              api,
              context: params.context,
            } as any);
          }
          if (span > currentColIndex - i) {
            const prevVal =
              api.getCellValue?.({ rowNode: node, colKey: prevCol, useFormatter: true }) ??
              node.getDataValue?.(prevCol);
            if (prevVal !== null && prevVal !== undefined && prevVal !== '') {
              return prevVal;
            }
          }
        }
      }

      // 2-2. 세로 병합(spanRows / rowSpan) 탐색: 상위 행 역방향 검사
      const rowIndex = node.rowIndex;
      if (rowIndex !== null && rowIndex !== undefined && rowIndex > 0) {
        for (let r = rowIndex - 1; r >= 0; r--) {
          const prevRowNode = api.getDisplayedRowAtIndex?.(r);
          if (!prevRowNode) break;
          const prevVal =
            api.getCellValue?.({ rowNode: prevRowNode, colKey: column, useFormatter: true }) ??
            prevRowNode.getDataValue?.(column);
          if (prevVal !== null && prevVal !== undefined && prevVal !== '') {
            return prevVal;
          }
        }
      }
    } catch {
      return value ?? '';
    }
  }

  return value ?? '';
}

// [전역 AG-Grid 설정] 애니메이션 비활성화, 셀 선택(Fill Handle) 및 클립보드 복사 처리
provideGlobalGridOptions({
  animateRows: false,
  suppressAnimationFrame: true,
  suppressColumnMoveAnimation: true,
  cellSelection: {
    handle: {
      mode: 'fill',
    },
  },
  processCellForClipboard: defaultProcessCellForClipboard,
});
// 이 파일을 import하는 것만으로 모듈 등록 및 전역 설정이 보장됨

// [전역 설정] 마우스가 AG Grid 셀 영역을 벗어나는 즉시 툴팁 DOM 요소 자동 삭제
if (typeof window !== 'undefined') {
  document.addEventListener(
    'mouseout',
    (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const targetCell = target?.closest('.ag-cell, .ag-header-cell');
      if (targetCell) {
        const related = e.relatedTarget as HTMLElement | null;
        const relatedCell = related?.closest('.ag-cell, .ag-header-cell');
        // 같은 셀 내부가 아닌 다른 셀로 이동하거나 셀 밖으로 나갈 때 기존 툴팁 즉시 파기
        if (targetCell !== relatedCell) {
          const tooltips = document.querySelectorAll(
            '.ag-tooltip, .ag-tooltip-custom, .ag-popup-child:has(.ag-tooltip)'
          );
          tooltips.forEach((el) => el.remove());
        }
      }
    },
    true
  );
}
