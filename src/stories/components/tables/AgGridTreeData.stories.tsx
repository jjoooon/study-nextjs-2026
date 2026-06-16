/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
// [AgGrid treeData 기능 가이드]
//
// 1. 필수 import 및 모듈 등록:
// import { AgGridReact } from 'ag-grid-react';
// import { ModuleRegistry, AllCommunityModule } from 'ag-grid-enterprise';
// import { TreeDataModule } from 'ag-grid-enterprise';
// ModuleRegistry.registerModules([AllCommunityModule, TreeDataModule]);
//
// 2. treeData 옵션 활성화:
// <AgGridReact treeData={true} ... />
//
// 3. getDataPath: 각 row의 경로 배열 반환 함수 필요
// <AgGridReact getDataPath={row => row.filePath} ... />
//
// 4. autoGroupColumnDef: 트리 그룹 컬럼 정의
// <AgGridReact autoGroupColumnDef={{ headerName: '이름', field: 'name' }} ... />
//
// 5. groupDefaultExpanded: 트리 기본 확장 레벨 (-1: 전체 확장)
// <AgGridReact groupDefaultExpanded={-1} ... />
//
// 위 옵션을 조합하면 폴더/파일 트리 구조를 쉽게 구현할 수 있습니다.
//
// 예시 데이터와 컬럼 정의는 아래 코드 참고
//

import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Canvas,
  Source,
  Markdown,
  Unstyled,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-enterprise';
import { TreeDataModule } from 'ag-grid-enterprise';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { AgGridEmptyComponent } from '@aggrid';

ModuleRegistry.registerModules([AllCommunityModule, TreeDataModule]);

type DummyDataType = { id: number; desc: string; name: string; filePath: string[] };
const DummyData: DummyDataType[] = [
  { id: 1, desc: 'auw930445', name: '폴더A', filePath: ['폴더A'] },
  { id: 2, desc: 'auw3245445', name: '파일A-1', filePath: ['폴더A', '파일A-1'] },
  { id: 3, desc: 'auw2203445', name: '파일A-2', filePath: ['폴더A', '파일A-2'] },
  { id: 4, desc: 'auw1234', name: '폴더B', filePath: ['폴더B'] },
  { id: 6, desc: 'auw888888', name: '파일A-3', filePath: ['폴더A', '파일A-3'] },
  { id: 7, desc: 'auw777777', name: '파일A-4', filePath: ['폴더A', '파일A-4'] },
  { id: 8, desc: 'auw666666', name: '폴더C', filePath: ['폴더C'] },
  { id: 9, desc: 'auw555555', name: '파일C-1', filePath: ['폴더C', '파일C-1'] },
  { id: 10, desc: 'auw444444', name: '파일C-2', filePath: ['폴더C', '파일C-2'] },
];

const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '내용',
    field: 'desc',
    flex: 1,
  },
];

const meta: Meta<typeof AgGridReact<DummyDataType>> = {
  title: 'Components/Tables/AgGrid/TreeData',
  component: AgGridReact,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <br />
          <h2>Overview</h2>
          <div>
            <p>
              AgGrid의 <b>treeData</b> 옵션을 사용하면 폴더/파일 구조처럼 계층형 데이터를 시각화할 수 있습니다.
              <br />
              <b>getDataPath</b>로 각 row의 경로 배열을 지정하면 자동으로 트리 구조가 생성됩니다.
            </p>
          </div>
          <Primary />

          <Markdown>
            {`
\`\`\`tsx
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-enterprise';
import { TreeDataModule } from 'ag-grid-enterprise';
import type { ColDef } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([AllCommunityModule, TreeDataModule]);

type DummyDataType = { id: number; desc: string; name: string; filePath: string[] };
const treeData: DummyDataType[] = [
  { id: 1, desc: 'auw930445', name: '폴더A', filePath: ['폴더A'] },
  { id: 2, desc: 'auw3245445', name: '파일A-1', filePath: ['폴더A', '파일A-1'] },
  { id: 3, desc: 'auw2203445', name: '파일A-2', filePath: ['폴더A', '파일A-2'] },
  { id: 4, desc: 'auw1234', name: '폴더B', filePath: ['폴더B'] },
  { id: 5, desc: 'auw563356', name: '파일B-1', filePath: ['폴더B', '파일B-1'] },
];

const columnDefs: ColDef<DummyDataType>[] = [
  // 트리그룹에서는 첫번째 셀은 자동으로 그룹 렌더러가 적용되므로 name 필드 대신 desc 필드를 그룹 렌더러로 사용
  {
    headerName: '내용',
    field: 'desc',
    flex: 1,
    cellRenderer: 'agGroupCellRenderer',
  },
];

<div className="ag-theme-alpine aggrid-pagination-ko">
  <AgGridReact<DummyDataType>
    rowData={DummyData}
    columnDefs={columnDefs}
    
    treeData={true} // 트리 데이터 모드 활성화
    getDataPath={row => row.filePath} // 각 row의 경로 배열 반환 (트리 구조 생성 기준)
    groupDefaultExpanded={-1} // -1: 전체 트리 확장, 0: 닫힘
    autoGroupColumnDef={{ headerName: '이름', field: 'name' }} // 트리 그룹 컬럼 정의 (ex: 이름 컬럼)
    domLayout="autoHeight" // 그리드 높이 자동 조정
  />
</div>
\`\`\`
          `}
          </Markdown>
        </>
      ),
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div>
      <div className="ag-theme-alpine">
        <AgGridReact<DummyDataType>
          // 필수
          getRowId={(params) => String(params.data.id)} // 각 row의 고유 id 지정(React key 역할)
          rowData={DummyData} // 표시할 데이터 배열
          columnDefs={columnDefs} // 컬럼 정의
          noRowsOverlayComponent={AgGridEmptyComponent} // 데이터 없을 때 표시할 컴포넌트
          // 선택
          domLayout="autoHeight" // 높이 선택 normal, autoHeight, print
          treeData={true}
          getDataPath={(row) => row.filePath}
          groupDefaultExpanded={-1}
          autoGroupColumnDef={{
            headerName: '이름',
            field: 'name',
          }}
        />
      </div>
    </div>
  ),
};
