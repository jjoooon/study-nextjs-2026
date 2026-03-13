import type { Meta, StoryObj } from '@storybook/react';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';
import * as React from 'react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type {
  ColDef,
  ICellRendererParams,
  EditableCallbackParams,
  ValueFormatterParams,
  ValueParserParams,
  CellClassParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { DUMMY_LNIPL020_DATA } from '@/features/pub/proto/data/LNIPL020Data';
import type { LNIPL020DataType } from '@/features/pub/proto/data/LNIPL020Data';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Grow } from '@atoms';

ModuleRegistry.registerModules([AllCommunityModule]);

type GridRow = LNIPL020DataType['mainBody']['agGridTable1'][number];

interface AgGridReactStoryProps {
  selectionMode?: 'singleRow' | 'multiRow';
  headerCheckbox?: boolean;
  checkboxes?: boolean;
  enableClickSelection?: boolean;
  showProductNameTooltip?: boolean;
}

const AgGridReactStoryComponent = (_props: AgGridReactStoryProps) => null;

const meta: Meta<AgGridReactStoryProps> = {
  title: 'Components/Tables/AgGridReact',
  component: AgGridReactStoryComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => {
        return (
          <>
            <Title /><br /><br />
            <h2>Overview</h2>
            <div>
              <p>
                AgGridReact 케이스는 LNIPL020MainBody 내부의 AgGrid 설정을 기준으로 구성된 스토리입니다.
                컬럼 고정, 체크박스 선택, 편집 가능한 셀, 커스텀 셀 렌더러를 독립적으로 확인할 수 있습니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>기본 사용 예시는 아래와 같습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { DUMMY_LNIPL020_DATA } from '@/features/pub/proto/data/LNIPL020Data';

const columnDefs: ColDef<LNIPL020GridRow>[] = useMemo(
  () => [
    {
      // [기본 식별/표시]
      headerName: string; // 컬럼 헤더에 표시될 이름(타이틀)
      field: string; // row 데이터의 key(필드명)
      hide?: boolean; // 컬럼 숨김 여부 (true/false)

      // [레이아웃/크기]
      width?: number; // 컬럼의 고정 너비(px)
      minWidth?: number; // 최소 너비(px)
      maxWidth?: number; // 최대 너비(px)
      flex?: number; // 남은 공간을 비율로 분배(반응형)
      resizable?: boolean; // 컬럼 너비 조절 가능 여부
      autoHeight?: boolean; // 셀 높이 자동 조정
      pinned?: 'left' | 'right'; // 컬럼 고정 위치

      // [정렬/필터/그룹]
      sortable?: boolean; // 정렬 기능 사용 여부
      filter?: boolean | string; // 필터 기능 사용 여부/타입
      rowGroup?: boolean; // 그룹핑 컬럼 여부
      aggFunc?: string | Function; // 집계 함수(합계, 평균 등)
      suppressMenu?: boolean; // 컬럼 메뉴(필터/정렬 등) 숨김
      suppressMovable?: boolean; // 컬럼 이동(드래그) 비활성화
      lockPosition?: 'left' | 'right'; // 컬럼 위치 고정(이동 불가)
      lockPinned?: boolean; // 고정 컬럼 해제 방지
      suppressSizeToFit?: boolean; // sizeToFit API 적용 제외

      // [스타일/클래스]
      cellClass?: string | string[] | ((params) => string); // 셀에 적용할 CSS 클래스
      headerClass?: string | string[] | ((params) => string); // 헤더에 적용할 CSS 클래스
      cellStyle?: object | ((params) => object); // 셀에 인라인 스타일 적용

      // [툴팁/렌더러/컴포넌트]
      tooltipValueGetter?: (params) => string; // 툴팁에 표시할 값 반환 함수
      headerComponent?: React.ComponentType<any>; // 커스텀 헤더 컴포넌트
      cellRenderer?: string | React.ComponentType<any> | ((params) => React.ReactNode); // 커스텀 셀 렌더러

      // [편집/입력]
      editable?: boolean | ((params) => boolean); // 셀 편집 가능 여부
      valueFormatter?: (params) => string; // 셀 값 포맷터(표시용)
      valueParser?: (params) => any; // 입력값 파서(저장용)
      cellEditor?: string | React.ComponentType<any>; // 커스텀 에디터 지정
      cellEditorParams?: object; // 에디터에 전달할 파라미터

      // [선택/체크박스]
      checkboxSelection?: boolean | ((params) => boolean); // 체크박스 표시 여부(행 선택용)

      // [기타]
      // ... 기타 ag-grid ColDef 속성들
    },
    ...
  ],
  []
)

<div className="ag-theme-alpine">
  <AgGridReact<LNIPL020GridRow>
    // [필수 데이터]
    key={gridKey} // React key, 주로 rowData 변경 시 강제 리렌더 용
    rowData={rowData} // 행 데이터 배열 (object[])
    columnDefs={columnDefs} // 컬럼 정의 배열 (ColDef[])

    // [행 선택 관련]
    rowSelection={{
      mode: 'multiRow' as const, // 'singleRow' | 'multiRow' - 선택 모드
      headerCheckbox: true,      // boolean - 헤더에 전체 선택 체크박스 표시
      checkboxes: true,          // boolean - 각 행에 체크박스 표시
      enableClickSelection: false, // boolean - 행 본문 클릭 시 선택 허용 여부
      isRowSelectable: (params) => !params.data?.locked, // (params) => boolean - 행 선택 가능 조건
    }}
    selectionColumnDef={{
      width: 40, // number - 선택 컬럼 너비(px)
      pinned: 'left', // 'left' | 'right' - 선택 컬럼 고정 위치
      cellClass: 'text-center p-0!', // string - 선택 컬럼 셀 클래스
      cellClassRules: {
        'pointer-events-none': params => !!params.data?.locked, // object - 조건부 클래스 적용
      },
    }}

    // [이벤트 핸들러]
    onGridReady={(params) => {
      params.api.forEachNode((node) => {
        if (node.data?.locked) node.setSelected(true);
      });
    }} // 그리드 초기화 시 실행
    // isRowSelectable={(node) => !node.data?.locked} // (deprecated) 행 선택 가능 조건

    // [UI/UX 옵션]
    suppressRowHoverHighlight={false} // boolean - 행 hover 시 하이라이트 비활성화
    onSelectionChanged={handleSelectionChanged} // function - 선택 변경 이벤트 핸들러
    singleClickEdit={true} // boolean - 한 번의 클릭으로 편집 활성화
    tooltipShowDelay={0} // number - 툴팁 표시 지연(ms)
    tooltipHideDelay={0} // number - 툴팁 숨김 지연(ms)
    tooltipMouseTrack={true} // boolean - 마우스 따라 툴팁 이동
    getRowClass={(params) => (params.data?.isHighlighted ? 'ag-row-highlighted' : '')} // (params) => string - 행에 동적 클래스 적용
  />
</div>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p><b>AgGridReact 주요 옵션</b></p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>rowData</td><td>object[]</td><td>행 데이터 배열</td></tr>
                <tr><td>columnDefs</td><td>ColDef[]</td><td>컬럼 정의 배열</td></tr>
                <tr><td>rowSelection</td><td>object</td><td>행 선택 옵션(아래 rowSelection 표 참조)</td></tr>
                <tr><td>selectionColumnDef</td><td>object</td><td>선택 컬럼 옵션(아래 selectionColumnDef 표 참조)</td></tr>
                <tr><td>onGridReady</td><td>function</td><td>그리드 초기화 이벤트</td></tr>
                <tr><td>onSelectionChanged</td><td>function</td><td>선택 변경 이벤트</td></tr>
                <tr><td>singleClickEdit</td><td>boolean</td><td>한 번의 클릭으로 편집 활성화</td></tr>
                <tr><td>suppressRowHoverHighlight</td><td>boolean</td><td>행 hover 하이라이트 비활성화</td></tr>
                <tr><td>tooltipShowDelay</td><td>number</td><td>툴팁 표시 지연(ms)</td></tr>
                <tr><td>tooltipHideDelay</td><td>number</td><td>툴팁 숨김 지연(ms)</td></tr>
                <tr><td>tooltipMouseTrack</td><td>boolean</td><td>마우스 따라 툴팁 이동</td></tr>
                <tr><td>getRowClass</td><td>function</td><td>행에 동적 클래스 적용</td></tr>
                <tr><td>key</td><td>string | number</td><td>React key, rowData 변경 시 리렌더 용</td></tr>
              </tbody>
            </table>

            <p><b>rowSelection 옵션</b></p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>mode</td><td>'singleRow' | 'multiRow'</td><td>선택 모드</td></tr>
                <tr><td>headerCheckbox</td><td>boolean</td><td>헤더 전체 선택 체크박스</td></tr>
                <tr><td>checkboxes</td><td>boolean</td><td>행 체크박스 표시</td></tr>
                <tr><td>enableClickSelection</td><td>boolean</td><td>행 클릭 선택 허용</td></tr>
                <tr><td>isRowSelectable</td><td>function</td><td>행 선택 가능 조건</td></tr>
              </tbody>
            </table>

            <p><b>selectionColumnDef 옵션</b></p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>width</td><td>number</td><td>선택 컬럼 너비(px)</td></tr>
                <tr><td>pinned</td><td>'left' | 'right'</td><td>선택 컬럼 고정 위치</td></tr>
                <tr><td>cellClass</td><td>string</td><td>선택 컬럼 셀 클래스</td></tr>
                <tr><td>cellClassRules</td><td>object</td><td>조건부 클래스 적용</td></tr>
              </tbody>
            </table>

            <p><b>ColDef(컬럼 정의) 주요 옵션</b></p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>headerName</td><td>string</td><td>컬럼 헤더에 표시될 이름</td></tr>
                <tr><td>field</td><td>string</td><td>row 데이터의 key(필드명)</td></tr>
                <tr><td>hide</td><td>boolean</td><td>컬럼 숨김 여부</td></tr>
                <tr><td>width</td><td>number</td><td>컬럼의 고정 너비(px)</td></tr>
                <tr><td>minWidth</td><td>number</td><td>최소 너비(px)</td></tr>
                <tr><td>maxWidth</td><td>number</td><td>최대 너비(px)</td></tr>
                <tr><td>flex</td><td>number</td><td>남은 공간을 비율로 분배</td></tr>
                <tr><td>resizable</td><td>boolean</td><td>컬럼 너비 조절 가능 여부</td></tr>
                <tr><td>autoHeight</td><td>boolean</td><td>셀 높이 자동 조정</td></tr>
                <tr><td>pinned</td><td>'left' | 'right'</td><td>컬럼 고정 위치</td></tr>
                <tr><td>sortable</td><td>boolean</td><td>정렬 기능 사용 여부</td></tr>
                <tr><td>filter</td><td>boolean | string</td><td>필터 기능 사용 여부/타입</td></tr>
                <tr><td>rowGroup</td><td>boolean</td><td>그룹핑 컬럼 여부</td></tr>
                <tr><td>aggFunc</td><td>string | Function</td><td>집계 함수(합계, 평균 등)</td></tr>
                <tr><td>suppressMenu</td><td>boolean</td><td>컬럼 메뉴(필터/정렬 등) 숨김</td></tr>
                <tr><td>suppressMovable</td><td>boolean</td><td>컬럼 이동(드래그) 비활성화</td></tr>
                <tr><td>lockPosition</td><td>'left' | 'right'</td><td>컬럼 위치 고정(이동 불가)</td></tr>
                <tr><td>lockPinned</td><td>boolean</td><td>고정 컬럼 해제 방지</td></tr>
                <tr><td>suppressSizeToFit</td><td>boolean</td><td>sizeToFit API 적용 제외</td></tr>
                <tr><td>cellClass</td><td>string | string[] | function</td><td>셀에 적용할 CSS 클래스</td></tr>
                <tr><td>headerClass</td><td>string | string[] | function</td><td>헤더에 적용할 CSS 클래스</td></tr>
                <tr><td>cellStyle</td><td>object | function</td><td>셀에 인라인 스타일 적용</td></tr>
                <tr><td>tooltipValueGetter</td><td>function</td><td>툴팁에 표시할 값 반환 함수</td></tr>
                <tr><td>headerComponent</td><td>React.ComponentType</td><td>커스텀 헤더 컴포넌트</td></tr>
                <tr><td>cellRenderer</td><td>string | React.ComponentType | function</td><td>커스텀 셀 렌더러</td></tr>
                <tr><td>editable</td><td>boolean | function</td><td>셀 편집 가능 여부</td></tr>
                <tr><td>valueFormatter</td><td>function</td><td>셀 값 포맷터(표시용)</td></tr>
                <tr><td>valueParser</td><td>function</td><td>입력값 파서(저장용)</td></tr>
                <tr><td>cellEditor</td><td>string | React.ComponentType</td><td>커스텀 에디터 지정</td></tr>
                <tr><td>cellEditorParams</td><td>object</td><td>에디터에 전달할 파라미터</td></tr>
                <tr><td>checkboxSelection</td><td>boolean | function</td><td>체크박스 표시 여부(행 선택용)</td></tr>
              </tbody>
            </table>
          </>
        );
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    selectionMode: {
      control: 'select',
      options: ['singleRow', 'multiRow'],
      description: '행 선택 모드',
      table: { category: 'Behavior' },
    },
    headerCheckbox: {
      control: 'boolean',
      description: '헤더 전체 선택 체크박스 표시',
      table: { category: 'Behavior' },
    },
    checkboxes: {
      control: 'boolean',
      description: '행 체크박스 표시',
      table: { category: 'Behavior' },
    },
    enableClickSelection: {
      control: 'boolean',
      description: '행 클릭 선택 허용',
      table: { category: 'Behavior' },
    },
    showProductNameTooltip: {
      control: 'boolean',
      description: '담보명 툴팁 표시 여부',
      table: { category: 'UI' },
    },
  },
  args: {
    selectionMode: 'multiRow',
    headerCheckbox: true,
    checkboxes: true,
    enableClickSelection: false,
    showProductNameTooltip: true,
  },
};

export default meta;
type Story = StoryObj<AgGridReactStoryProps>;

const productNameRenderer = (params: ICellRendererParams<GridRow>) => {
  return (
    <Grow placement="bwc" className="h-full">
      <p className="truncate w-full">{params.data?.productName}</p>
      {params.data?.badge && (
        <Grow className="gap-1 shrink-0">
          {params.data?.badge?.includes('독립') && <Badge color="green" className="w-[3rem]">독립</Badge>}
          {params.data?.badge?.includes('갱신') && <Badge color="blue" className="w-[3rem]">갱신</Badge>}
        </Grow>
      )}
    </Grow>
  );
};

const duplicateRenderer = (params: ICellRendererParams<GridRow>) => {
  return params.value ? (
    <Grow className="w-full h-full" placement="cc">
      <Button aria-label="고객 추가" variant="outlined" only="icon" size="sm" color="gray-light">
        +
      </Button>
    </Grow>
  ) : (
    ''
  );
};

const columnDefs: ColDef<GridRow>[] = [
  {
    headerName: '',
    field: 'id',
    cellClass: 'text-center p-0!',
    width: 30,
    sortable: false,
    filter: false,
    editable: false,
    pinned: 'left',
  },
  {
    headerName: '담보명',
    field: 'productName',
    width: 390,
    cellClass: 'text-left',
    sortable: false,
    filter: false,
    tooltipValueGetter: (params) => params.data?.productName ?? '',
    autoHeight: true,
    pinned: 'left',
    cellRenderer: productNameRenderer,
  },
  {
    headerName: '가입금액(만원)',
    field: 'coverageAmount',
    flex: 1.6,
    headerClass: 'px-0!',
    cellClass: () => 'text-right editable-cell',
    sortable: false,
    filter: false,
    editable: true,
    valueFormatter: (params: ValueFormatterParams<GridRow>) => (params.value ? params.value.toLocaleString() : ''),
    valueParser: (params: ValueParserParams<GridRow>) => Number(params.newValue),
  },
  {
    headerName: '보험료(만원)',
    field: 'premium',
    flex: 1.4,
    cellClass: 'text-right',
    headerClass: 'px-0!',
    sortable: false,
    filter: false,
    valueFormatter: (params: ValueFormatterParams<GridRow>) => (params.value ? params.value.toLocaleString() : ''),
  },
  {
    headerName: '가능금액(만원)',
    field: 'availableAmount',
    flex: 1.6,
    cellClass: 'text-right',
    headerClass: 'px-0!',
    sortable: false,
    filter: false,
    valueFormatter: (params: ValueFormatterParams<GridRow>) => (params.value ? params.value.toLocaleString() : ''),
  },
  {
    headerName: '만기',
    field: 'expiryPeriod',
    flex: 1,
    cellClass: 'text-center editable-cell',
    sortable: false,
    filter: false,
    editable: (params: EditableCallbackParams<GridRow>) => params.data?.canEditExpiry ?? false,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: { values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'] },
  },
  {
    headerName: '납기',
    field: 'paymentPeriod',
    flex: 1,
    cellClass: 'text-center',
    sortable: false,
    filter: false,
  },
  {
    headerName: '예상UW',
    field: 'expectedUwResult',
    headerClass: 'px-0!',
    flex: 1,
    cellClass: 'text-center',
    sortable: false,
    filter: false,
    cellStyle: (params: CellClassParams<GridRow>) => {
      const value = params.value as string;
      if (value === '인수') return { color: '#006FF2' };
      if (value === '거절' || value === '조건부인수') return { color: '#FB3F3F' };
      return undefined;
    },
  },
  {
    headerName: '중복',
    field: 'isDuplicate',
    width: 44,
    cellClass: 'text-center',
    sortable: false,
    filter: false,
    cellRenderer: duplicateRenderer,
  },
];

const renderGrid: Story['render'] = (args) => {
  const rowData = DUMMY_LNIPL020_DATA.mainBody.agGridTable1;
  return (
    <div className="p-5">
      <div className="w-full h-[40vh]! ag-theme-alpine">
        <AgGridReact<GridRow>
          rowData={rowData}
          columnDefs={columnDefs}

          rowSelection={{
            mode: (args.selectionMode ?? 'multiRow') as 'singleRow' | 'multiRow',
            headerCheckbox: args.headerCheckbox ?? true,
            checkboxes: args.checkboxes ?? true,
            enableClickSelection: args.enableClickSelection ?? false,
            isRowSelectable: (params) => !params.data?.locked,
          }}
          selectionColumnDef={{
            width: 40,
            pinned: 'left',
            cellClass: 'text-center p-0!',
            cellClassRules: {
              'pointer-events-none': params => !!params.data?.locked,
            },
          }}

          onGridReady={(params) => {
            params.api.forEachNode((node) => {
              if (node.data?.locked) node.setSelected(true);
            });
          }}
          // isRowSelectable={(node) => !node.data?.locked}

          suppressRowHoverHighlight={false}
          // onSelectionChanged={handleSelectionChanged}
          singleClickEdit={true} // 한 번의 클릭으로 편집 활성화
          tooltipShowDelay={args.showProductNameTooltip ? 0 : undefined}
          tooltipHideDelay={args.showProductNameTooltip ? 9999 : undefined}
          tooltipMouseTrack={args.showProductNameTooltip ? true : undefined}
          getRowClass={(params) => (params.data?.isHighlighted ? 'ag-row-highlighted' : '')}
        />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: renderGrid,
};