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
import { RichSelectModule } from 'ag-grid-enterprise';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-enterprise';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import {
  createCellValueChangedHandler,
  useAgGridPagination,
  AgGridEmptyComponent,
  CustomGridLoadingOverlay,
} from '@aggrid';
import { Button } from '@uiux/Button';
import { TablePagination } from '@common/TablePagination';

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

const SampleRows: DummyDataType[] = [
  { id: 1, label: '홍길동', age: '30세' },
  { id: 2, label: '김철수', age: '45세' },
  { id: 3, label: '이영희', age: '28세' },
];

const meta: Meta<typeof AgGridReact<DummyDataType>> = {
  title: 'Components/Tables/AgGrid/NoData & Loading',
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
            <b>ag-Grid No Data(Empty) & Loading 오버레이 설정</b>
            <br />
            <ul>
              <li>
                <b>noRowsOverlayComponent</b>:<br />
                React 컴포넌트로 데이터가 없을 때 표시할 UI를 자유롭게 커스터마이즈할 수 있습니다.
                <br />
                <code>noRowsOverlayComponent={'{AgGridEmptyComponent}'}</code>처럼 사용합니다.
              </li>
              <li>
                <b>loading / loadingOverlayComponent</b>:<br />
                비동기 데이터 통신 중일 때 <code>loading={'{true}'}</code> 속성과 함께{' '}
                <code>loadingOverlayComponent={'{CustomGridLoadingOverlay}'}</code>를 설정하여 로딩 스피너 및 안내 문구를
                표시합니다.
                <br />
                <code>loadingOverlayComponentParams={`{{ loadingMessage: '데이터를 가져오는 중입니다...' }}`}</code>을 통해
                원하는 안내 문구를 전달할 수 있습니다.
              </li>
            </ul>
          </div>
          <Primary />

          <Markdown>
            {`
\`\`\`tsx
import { AgGridEmptyComponent, CustomGridLoadingOverlay } from '@aggrid';

// 1. 데이터 없음 (Empty) 설정
<div className="ag-theme-alpine">
  <AgGridReact<DummyDataType>
    rowData={[]}
    columnDefs={columnDefs}
    noRowsOverlayComponent={AgGridEmptyComponent} // 데이터 없을 때 표시할 컴포넌트
    ...
  />
</div>

// 2. 로딩 중 (Loading) 설정
<div className="ag-theme-alpine">
  <AgGridReact<DummyDataType>
    loading={true} // 로딩 상태 활성화
    loadingOverlayComponent={CustomGridLoadingOverlay} // 커스텀 로딩 오버레이
    loadingOverlayComponentParams={{ loadingMessage: '조회 중입니다...' }}
    rowData={rowData}
    columnDefs={columnDefs}
    ...
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
    const [rowData] = React.useState<DummyDataType[]>(DummyData);

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

export const Loading: StoryObj = {
  render: () => {
    return (
      <div style={{ height: '24rem' }}>
        <div className="ag-theme-alpine h-full">
          <AgGridReact<DummyDataType>
            loading={true}
            loadingOverlayComponent={CustomGridLoadingOverlay}
            loadingOverlayComponentParams={{ loadingMessage: '데이터를 가져오는 중입니다...' }}
            noRowsOverlayComponent={AgGridEmptyComponent}
            getRowId={(params) => String(params.data.id)}
            rowData={[]}
            columnDefs={columnDefs}
            domLayout="normal"
          />
        </div>
      </div>
    );
  },
};

export const InteractiveLoading: StoryObj = {
  render: () => {
    const [loading, setLoading] = React.useState(false);
    const [rowData, setRowData] = React.useState<DummyDataType[]>([]);

    const handleFetchData = () => {
      setLoading(true);
      setTimeout(() => {
        setRowData(SampleRows);
        setLoading(false);
      }, 1200);
    };

    const handleClearData = () => {
      setLoading(true);
      setTimeout(() => {
        setRowData([]);
        setLoading(false);
      }, 800);
    };

    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <Button size="sm" onClick={handleFetchData} disabled={loading}>
            데이터 조회 (로딩 후 채우기)
          </Button>
          <Button size="sm" variant="outlined" color="gray" onClick={handleClearData} disabled={loading}>
            데이터 초기화 (로딩 후 Empty)
          </Button>
          <Button size="sm" variant="outlined" color="primary" onClick={() => setLoading((prev) => !prev)}>
            로딩 상태 토글 ({loading ? 'ON' : 'OFF'})
          </Button>
        </div>

        <div className="ag-theme-alpine" style={{ height: '26rem' }}>
          <AgGridReact<DummyDataType>
            loading={loading}
            loadingOverlayComponent={CustomGridLoadingOverlay}
            loadingOverlayComponentParams={{ loadingMessage: '데이터를 불러오는 중입니다...' }}
            noRowsOverlayComponent={AgGridEmptyComponent}
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout="normal"
          />
        </div>
      </div>
    );
  },
};

