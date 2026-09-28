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
 * 시간 추측(setTimeout) 대신 ResizeObserver를 통해 AG Grid가 실제 행과 셀 텍스트를
 * DOM에 모두 불러와 그려낸 진짜 시점(Drawn Phase)을 정밀 감지하여
 * 셀 병합(spanRows) 크기와 autoHeight를 100% 완벽하게 재산정합니다.
 */
export const autoAdjustAgGridRowHeights = (
  api: FirstDataRenderedEvent['api'] | RowDataUpdatedEvent['api'] | null | undefined
) => {
  if (!api || typeof window === 'undefined') return;

  const apiObj = api as unknown as object;
  if (processedApis.has(apiObj)) return;

  const apiAny = api as unknown as { getGui?: () => HTMLElement };
  const gui =
    typeof apiAny.getGui === 'function'
      ? apiAny.getGui()
      : (document.querySelector('.ag-root-wrapper') as HTMLElement | null);
  const viewportEl =
    gui?.querySelector('.ag-body-viewport') || gui || (typeof document !== 'undefined' ? document.body : null);
  if (!viewportEl) return;

  // 브라우저가 AG Grid 셀과 텍스트를 DOM에 모두 그려내는 시점(Drawn Phase)을 정밀 관찰
  const observer = new ResizeObserver(() => {
    try {
      if (api.isDestroyed?.()) {
        observer.disconnect();
        return;
      }

      const rowCount = api.getDisplayedRowCount?.() ?? 0;
      if (rowCount === 0) return;

      const renderedNodes = api.getRenderedNodes?.() ?? [];
      if (renderedNodes.length === 0) return;

      // AG Grid가 다 불러와서 그려진 진짜 시점 포착! -> 1회 실행 후 관찰 종료
      processedApis.add(apiObj);
      observer.disconnect();

      const savedColumnState = api.getColumnState();
      const allColumns = api.getColumns();
      const targetColId = allColumns && allColumns.length > 0 ? allColumns[0].getColId() : null;

      if (targetColId) {
        // 그려진 직후 1차 정렬 트리거 (두 줄 이상 높이 반영)
        api.applyColumnState({
          state: [{ colId: targetColId, sort: 'asc' }],
          defaultState: { sort: null },
        });

        // 렌더링 한 틱 뒤 원래 정렬 상태로 100% 원복
        requestAnimationFrame(() => {
          try {
            if (!api.isDestroyed?.()) {
              api.applyColumnState({
                state: savedColumnState,
                applyOrder: true,
              });
              api.resetRowHeights();
              api.refreshCells({ force: true, suppressFlash: true });
            }
          } catch {
            // 무시
          }
        });
      } else {
        api.resetRowHeights();
        api.redrawRows();
      }
    } catch {
      observer.disconnect();
    }
  });

  observer.observe(viewportEl);
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
