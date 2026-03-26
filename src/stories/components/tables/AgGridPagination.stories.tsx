
import * as React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Canvas, Source, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { AgGridReact } from 'ag-grid-react';
import { RichSelectModule } from 'ag-grid-enterprise';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { createCellValueChangedHandler, useAgGridPagination, AgGridEmptyComponent } from '@aggrid';
import { TablePagination } from '@common/TablePagination';

ModuleRegistry.registerModules([AllCommunityModule, RichSelectModule]);

type DummyDataType = { id: number; label: string; age: string | number };
const DummyData: DummyDataType[] = [
  { id: 1, label: '사과', age: '60세' },
  { id: 2, label: '바나나', age: '80세' },
  { id: 3, label: '오렌지', age: '90세' },
  { id: 4, label: '포도', age: '' },
  { id: 5, label: '수박', age: 0 },
  { id: 6, label: '메론', age: 0 },
  { id: 7, label: '복숭아', age: 0 },
  { id: 8, label: '자두', age: 0 },
  { id: 9, label: '딸기', age: 0 },
  { id: 10, label: '사과', age: '60세' },
  { id: 11, label: '바나나', age: '80세' },
  { id: 12, label: '오렌지', age: '90세' },
  { id: 13, label: '포도', age: '' },
  { id: 14, label: '수박', age: 0 },
  { id: 15, label: '메론', age: 0 },
  { id: 16, label: '복숭아', age: 0 },
  { id: 17, label: '자두', age: 0 },
  { id: 18, label: '딸기', age: 0 },
];
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
  title: 'Components/Tables/AgGrid/Pagination',
  component: AgGridReact,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>Overview</h2>
          <div>
            <b>ag-Grid Pagination(페이징) 사용법</b><br/>
            <ul>
              <li>
                <b>pagination</b>: <code>true</code>로 설정하면 ag-Grid의 페이징 기능이 활성화됩니다.<br/>
                <b>paginationPageSize</b>: 한 페이지에 보여줄 행(row) 개수를 지정합니다.<br/>
                <b>suppressPaginationPanel</b>: <code>true</code>로 설정하면 ag-Grid의 기본 페이징 UI(하단 네비게이션)가 숨겨집니다.<br/>
                <b>TablePagination</b> 등 커스텀 페이징 UI와 연동할 때 suppressPaginationPanel을 true로 설정하고, 외부에서 페이지 이동을 ag-Grid API로 제어합니다.<br/>
                <b>onGridReady</b>와 <b>ref</b>를 활용해 ag-Grid API에 접근하여 페이지 이동, 현재 페이지/전체 페이지 등 상태를 동기화할 수 있습니다.<br/>
              </li>
            </ul>
            <b>권장 패턴:</b><br/>
            <p>
            ag-Grid의 기본 페이징 UI가 아닌, 디자인 시스템에 맞는 커스텀 TablePagination 컴포넌트를 사용하는 경우 suppressPaginationPanel을 true로 설정하고, 페이지 이동은 ag-Grid API(ref.current.paginationGoToPage 등)로 직접 제어합니다.<br/>
            공통 훅(useAgGridPagination)으로 연동하면 코드가 간결하고 일관성 있게 관리됩니다.
            </p>
          </div>
          <Primary />

          <Markdown>
            {`
\`\`\`tsx
import { useAgGridPagination } from '@aggrid';

// ag-Grid + TablePagination 연동 (공통 훅 사용)
const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);
const pageSize = 5;
const { currentPage, totalPages, handleGridReady, handlePageChange } = useAgGridPagination(gridRef, pageSize);

<div className="ag-theme-alpine">
  <AgGridReact<DummyDataType>
    // pagination 설정 (TablePagination과 연동)
    pagination={true} // ag-Grid의 페이징 기능 활성화
    paginationPageSize={pageSize} // 페이지당 행 수
    suppressPaginationPanel={true} // ag-Grid 기본 페이징 UI 숨김(커스텀 TablePagination만 노출)

    // 페이지네이션 연동을 위한 onGridReady 핸들러
    ref={gridRef} // ag-Grid API 접근용 ref
    onGridReady={handleGridReady} // ag-Grid 준비 완료 시 호출(초기 API 세팅, 페이지 정보 등)

    ...
  />
</div>
<TablePagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  itemsPerPage={pageSize}
/>
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
    const [errorRows, setErrorRows] = React.useState<number[]>(
      DummyData.filter(row => !row.age).map(row => row.id)
    );


    // ag-Grid + TablePagination 연동 (공통 훅 사용)
    const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);
    const pageSize = 5;
    const { currentPage, totalPages, handleGridReady, handlePageChange } = useAgGridPagination(gridRef, pageSize);

    return (
      <div style={{ width: '100%', height:'20rem', marginBottom: '6rem' }}>

        <div className="ag-theme-alpine">
          <AgGridReact<DummyDataType>
            // 필수
            getRowId={(params) => String(params.data.id)} // 각 row의 고유 id 지정(React key 역할)
            rowData={rowData} // 표시할 데이터 배열
            columnDefs={columnDefs} // 컬럼 정의

            // 선택
            domLayout="normal" // 높이 선택 normal, autoHeight, print

            // pagination 설정 (TablePagination과 연동)
            pagination={true} // ag-Grid의 페이징 기능 활성화
            paginationPageSize={pageSize} // 페이지당 행 수
            suppressPaginationPanel={true} // ag-Grid 기본 페이징 UI 숨김(커스텀 TablePagination만 노출)

            // 페이지네이션 연동을 위한 onGridReady 핸들러
            ref={gridRef} // ag-Grid API 접근용 ref
            onGridReady={handleGridReady} // ag-Grid 준비 완료 시 호출(초기 API 세팅, 페이지 정보 등)
          />
        </div>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={pageSize}
        />
      </div>
    );
  },
};