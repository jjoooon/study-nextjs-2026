import {
  AllCommunityModule,
  CellSelectionModule,
  CellSpanModule,
  ClientSideRowModelModule,
  ModuleRegistry,
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
// 이 파일을 import하는 것만으로 모듈 등록이 보장됨

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
