/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ import { createCellValueChangedHandler, useAgGridPagination, AgGridEmptyComponent } from '@aggrid';
import { TablePagination } from '@common/TablePagination';
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
import type { Meta, StoryObj } from '@storybook/react';
import { RichSelectModule } from 'ag-grid-enterprise';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-enterprise';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

ModuleRegistry.registerModules([AllCommunityModule, RichSelectModule]);

type DummyDataType = { id: number; label: string; age: string | number };
const DummyData: DummyDataType[] = [];
const columnDefs: ColDef<DummyDataType>[] = [
  {
    headerName: '이름',
    field: 'label',
    flex: 1,
    editable: false,
  },
  {
    headerName: '나이',
    field: 'age',
    flex: 1,
    cellClass: 'text-right',
    editable: false, // 나이 직접 입력 가능
  },
];

const meta: Meta<typeof AgGridReact<DummyDataType>> = {
  title: 'Components/Tables/AgGrid/NoData',
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
            <b>ag-Grid No Data(Empty) 오버레이 설정</b>
            <br />
            <ul>
              <li>
                <b>noRowsOverlayComponent</b>:<br />
                React 컴포넌트로 데이터가 없을 때 표시할 UI를 자유롭게 커스터마이즈할 수 있습니다.
                <br />
                <code>noRowsOverlayComponent={'{AgGridEmptyComponent}'}</code>처럼 사용합니다.
                <br />
                디자인 가이드에 맞는 컴포넌트를 만들어 연결하면 됩니다.
              </li>
            </ul>
          </div>
          <Primary />

          <Markdown>
            {`
\`\`\`tsx
import { AgGridEmptyComponent } from '@aggrid';

<div className="ag-theme-alpine">
  <AgGridReact<DummyDataType>
    // 필수
    ...
    noRowsOverlayComponent={AgGridEmptyComponent} // 데이터 없을 때 표시할 컴포넌트
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
  render: () => {
    const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

    // ag-Grid + TablePagination 연동 (공통 훅 사용)
    const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);
    const pageSize = 5;
    const { currentPage, totalPages, handleGridReady, handlePageChange } = useAgGridPagination(gridRef, pageSize);

    return (
      <div>
        <div className="ag-theme-alpine">
          <AgGridReact<DummyDataType>
            // 필수
            getRowId={(params) => String(params.data.id)} // 각 row의 고유 id 지정(React key 역할)
            rowData={rowData} // 표시할 데이터 배열
            columnDefs={columnDefs} // 컬럼 정의
            noRowsOverlayComponent={AgGridEmptyComponent} // 데이터 없을 때 표시할 컴포넌트
            // 선택
            domLayout="autoHeight" // 높이 선택 normal, autoHeight, print
            // pagination 설정 (TablePagination과 연동)
            pagination={true} // ag-Grid의 페이징 기능 활성화
            paginationPageSize={pageSize} // 페이지당 행 수
            suppressPaginationPanel={true} // ag-Grid 기본 페이징 UI 숨김(커스텀 TablePagination만 노출)
            // 페이지네이션 연동을 위한 onGridReady 핸들러
            ref={gridRef} // ag-Grid API 접근용 ref
            onGridReady={handleGridReady} // ag-Grid 준비 완료 시 호출(초기 API 세팅, 페이지 정보 등)
          />
        </div>
      </div>
    );
  },
};
