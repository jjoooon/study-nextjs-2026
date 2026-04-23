import { AllCommunityModule, CellSpanModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community';
import { RichSelectModule } from 'ag-grid-enterprise';
import { TreeDataModule } from 'ag-grid-enterprise';
import { RowGroupingModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  AllCommunityModule,
  CellSpanModule,
  ClientSideRowModelModule,
  RowGroupingModule,
  RichSelectModule,
  TreeDataModule,
  // 필요시 엔터프라이즈 모듈 추가
]);
// 이 파일을 import하는 것만으로 모듈 등록이 보장됨
