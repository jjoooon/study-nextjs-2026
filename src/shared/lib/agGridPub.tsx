'use client';

import {
  AllCommunityModule,
  CellSelectionModule,
  CellSpanModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  provideGlobalGridOptions,
} from 'ag-grid-enterprise';
import { RichSelectModule } from 'ag-grid-enterprise';
import { TreeDataModule } from 'ag-grid-enterprise';
import { RowGroupingModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  AllCommunityModule,
  CellSelectionModule,
  CellSpanModule,
  ClientSideRowModelModule,
  RowGroupingModule,
  RichSelectModule,
  TreeDataModule,
  // 필요시 엔터프라이즈 모듈 추가
]);

import type { FirstDataRenderedEvent, RowDataUpdatedEvent } from 'ag-grid-enterprise';

// 이미 보정 처리된 그리드 API 인스턴스를 추적하여 중복 실행 방지
const processedApis = new WeakSet<object>();

/**
 * [내부망 셀 병합 / 다중행 높이 계산 시점 전역 자동 보정 유틸]
 * 실제 행 데이터가 렌더링된 시점(rowCount > 0)에 1회 실행되어
 * 컨텐츠 셀의 두 줄 이상 높이와 셀 병합(spanRows) 크기를 안정적으로 자동 재계산합니다.
 */
export const autoAdjustAgGridRowHeights = (
  api: FirstDataRenderedEvent['api'] | RowDataUpdatedEvent['api'] | null | undefined
) => {
  if (!api || typeof window === 'undefined') return;

  const safeAdjust = () => {
    try {
      if (!api || api.isDestroyed?.()) return;

      // 실제 행 데이터가 뿌려지지 않은 빈 상태인 경우 나중에 데이터가 바인딩될 때 처리하도록 리턴
      const rowCount = api.getDisplayedRowCount?.() ?? 0;
      if (rowCount === 0) return;

      // 데이터가 실제 렌더링된 그리드만 1회 처리되도록 추적 (스크롤 시 중복 실행 차단)
      const apiObj = api as unknown as object;
      if (processedApis.has(apiObj)) return;
      processedApis.add(apiObj);

      // 1. autoHeight 컨텐츠 셀의 두 줄 이상 변경된 개별 행 높이 수집
      api.resetRowHeights();
      // 2. 스크롤 튀김 없이 병합 셀(spanRows) DOM height 스타일 및 수직 위치 전체 재산정
      api.redrawRows();
      // 3. 셀 DOM 강제 갱신
      api.refreshCells({ force: true, suppressFlash: true });
    } catch {
      // 파기 시 예외 무시
    }
  };

  // 1차: 데이터 마운트 직후 (rAF 2회)
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => {
      requestAnimationFrame(safeAdjust);
    });
  } else {
    setTimeout(safeAdjust, 50);
  }

  // 2차: DOM 텍스트 줄바꿈(wrap) 확정 및 내부망 보안 프로그램 렌더링 지연 완료 시점(150ms) 병합 셀 높이 확정
  setTimeout(safeAdjust, 150);
};

// [전역 AG-Grid 설정] 애니메이션 비활성화 및 최초/데이터 갱신 렌더링 시 높이 자동 재계산
provideGlobalGridOptions({
  animateRows: false,
  suppressAnimationFrame: true,
  suppressColumnMoveAnimation: true,
  onFirstDataRendered: (params) => {
    autoAdjustAgGridRowHeights(params.api);
  },
  onRowDataUpdated: (params) => {
    autoAdjustAgGridRowHeights(params.api);
  },
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
