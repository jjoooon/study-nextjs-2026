
import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { ModuleRegistry, AllCommunityModule, ClientSideRowModelModule } from 'ag-grid-community';
import { TreeDataModule } from 'ag-grid-enterprise';
import type {
  ColDef,
  ICellRendererParams,
  EditableCallbackParams,
  ValueFormatterParams,
  ValueParserParams,
  CellClassParams,
} from 'ag-grid-community';
import { RowGroupingModule } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

import { AG_GRID_LOCALE_KO } from '@/shared/constants/agGrid';
import { 
  amountUnitInputCellRenderer,
  editableSelectCellRenderer, 
  numberValueFormatter, 
  productNameTooltipValueGetter, 
  createSelectionChangedHandler,  
} from '@/shared/components/aggrid/aggridComponents';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Grow } from '@atoms';

import { TestData } from './TestAgGridData';
import type { TestDataType } from './TestAgGridData';
import { PlusIcon } from '@icons';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, RowGroupingModule]);
ModuleRegistry.registerModules([TreeDataModule]);

type GridRow = TestDataType['data'][number];
// 합계 행 타입 확장
type GridRowWithSum = GridRow & { isSumRow?: boolean };
type GridRowWithSum2 = {
  id: number;
  code: string;
  locked: boolean;
  productName: string;
  badge: string[];
  filePath: string[];
  isSumRow: true;
};

interface AgGridReactStoryProps {
  selectionMode?: 'singleRow' | 'multiRow';
  headerCheckbox?: boolean;
  checkboxes?: boolean;
  enableClickSelection?: boolean;
  showProductNameTooltip?: boolean;
  pagination?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[] | boolean;
  suppressPaginationPanel?: boolean;
}

const AgGridReactStoryComponent = (_props: AgGridReactStoryProps) => null;

const meta: Meta<AgGridReactStoryProps> = {
  title: 'Components/Tables/AgGrid/AgGridDefault',
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
                AgGridReact 케이스는 LniPl020MainBody 내부의 AgGrid 설정을 기준으로 구성된 스토리입니다.
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
import { LniPl020Step2Data } from '@/features/pub/proto/data/LniPl020Step2Data';

const columnDefs: ColDef<LniPl020GridRow>[] = useMemo(
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
  <AgGridReact<LniPl020GridRow>
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
    pagination: {
      control: 'boolean',
      description: '페이지네이션 사용 여부',
      table: { category: 'Pagination' },
    },
    paginationPageSize: {
      control: 'number',
      description: '페이지당 행 수',
      table: { category: 'Pagination' },
    },
    paginationPageSizeSelector: {
      control: 'object',
      description: '페이지 사이즈 선택 옵션 목록',
      table: { category: 'Pagination' },
    },
    suppressPaginationPanel: {
      control: 'boolean',
      description: '기본 페이지네이션 패널 숨김 여부',
      table: { category: 'Pagination' },
    },
  },
  args: {
    selectionMode: 'multiRow',
    headerCheckbox: true,
    checkboxes: true,
    enableClickSelection: false,
    showProductNameTooltip: true,
    pagination: true,
    paginationPageSize: 5,
    paginationPageSizeSelector: [5, 10, 20, 50, 100],
    suppressPaginationPanel: false,
  },
};

export default meta;
type Story = StoryObj<AgGridReactStoryProps>;



const renderGrid: Story['render'] = (args) => {
  const [rowData, setRowData] = React.useState<GridRow[]>(TestData.data);
  const sumRow = React.useMemo(() => [getSumRow(rowData)], [rowData]);
  const amountInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // 셀 값 변경 시 rowData 갱신
  const handleCellValueChanged = React.useCallback((params: any) => {
    if (!params.data || (params.data as GridRowWithSum)?.isSumRow) return;
    setRowData((prev) => {
      // id 기준으로 해당 row만 교체
      return prev.map((row) =>
        row.id === params.data.id ? { ...row, ...params.data } : row
      );
    });
  }, []);

  // 가입금액(만원) 셀 렌더러 (공통 컴포넌트 활용)
  const coverageAmountCellRenderer = (params: ICellRendererParams<GridRowWithSum>) => {
    if ((params.data as GridRowWithSum2)?.isSumRow) {
      // 합계 행: 값만 표시
      return <span>{params.value ? params.value.toLocaleString() : ''}</span>;
    }
    return amountUnitInputCellRenderer<GridRowWithSum>({ ...params, amountInputRefs: amountInputRefs.current });
  };

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
          <PlusIcon className="translate-px" />
        </Button>
      </Grow>
    ) : (
      ''
    );
  };


  const expiryCellRenderer = (params: ICellRendererParams<GridRow>) => editableSelectCellRenderer<GridRow>(params);

  const columnDefs: ColDef<GridRow>[] = [
    {
      headerName: '코드',
      field: 'code',
      cellClass: 'text-center p-0!',
      width: 50,
      sortable: false,
      suppressMovable: true,
      filter: false,
      editable: false,
      resizable: false,
      pinned: 'left',
      showRowGroup: true, // 트리 데이터에서 그룹핑 컬럼 지정
      hide: true, // 트리 데이터에서는 코드 컬럼 숨김
    },
  
    {
      headerName: '담보명',
      field: 'productName',
      width: 390,
      cellClass: 'text-left',
      cellRendererParams: {
        suppressCount: false,
        checkbox: true,
      },
      sortable: false,
      filter: false,
      suppressMovable: true,
      tooltipValueGetter: (params) => params.data?.productName ?? '',
      autoHeight: true,
      pinned: 'left',
    },
    {
      headerName: '가입금액(만원)',
      field: 'coverageAmount',
      flex: 1.6,
      headerClass: 'px-0!',
      cellClass: (params: CellClassParams<GridRow>) => (params.data as GridRowWithSum)?.isSumRow ? 'text-right' : 'text-right editable-cell [&_input]:text-right',
      sortable: false,
      filter: false,
      editable: (params: EditableCallbackParams<GridRow>) => !(params.data as GridRowWithSum)?.isSumRow,
      cellRenderer: coverageAmountCellRenderer,
    },
    {
      headerName: '보험료(만원)',
      field: 'premium',
      flex: 1.4,
      cellClass: 'text-right',
      headerClass: 'px-0!',
      sortable: false,
      filter: false,

    },
    {
      headerName: '가능금액(만원)',
      field: 'availableAmount',
      flex: 1.6,
      cellClass: 'text-right',
      headerClass: 'px-0!',
      sortable: false,
      filter: false,
      editable: (params: EditableCallbackParams<GridRow>) => !(params.data as GridRowWithSum)?.isSumRow,
      cellRenderer: numberValueFormatter,

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
      cellRenderer: (params: ICellRendererParams<GridRow>) => {
        if ((params.data as GridRowWithSum)?.isSumRow) {
          return <span>{params.value ?? ''}</span>;
        }
        return expiryCellRenderer(params);
      },
    },
    {
      headerName: '납기',
      field: 'paymentPeriod',
      flex: 1,
      cellClass: 'text-center editable-cell',
      sortable: false,
      filter: false,
      editable: (params: EditableCallbackParams<GridRow>) => params.data?.canEditExpiry ?? false,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['5년', '10년', '15년', '20년', '25년', '30년', '35년', '전기납'],
      },
      cellRenderer: (params: ICellRendererParams<GridRow>) => {
        if ((params.data as GridRowWithSum)?.isSumRow) {
          return <span>{params.value ?? ''}</span>;
        }
        return expiryCellRenderer(params);
      },
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

  // 합계 행 생성 함수
  function getSumRow(data: GridRow[]): GridRowWithSum2 {
    // GridRowWithSum의 모든 필수 필드를 명시적으로 채움
    return {
      id: -12, // number 타입, 실제 데이터와 겹치지 않는 값
      code: '', // 합계 행은 code 없음
      locked: false,
      productName: '합계ㅇㅇㅇ',
      badge: [],
      // 아래는 GridRow 타입에 따라 추가 필드가 있을 경우 기본값 처리
      filePath: [],
      isSumRow: true, // 커스텀 플래그(타입 확장 허용)
    };
  }

  return (
    <div className="p-5">
      <div className="ag-theme-alpine">
          <AgGridReact<GridRow>
            // getRowId 적용: id 필드를 고유 식별자로 사용
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout='autoHeight'
            // 합계
            pinnedBottomRowData={sumRow}

            // 트리구조 (그룹핑) 설정
            treeData={true}
            getDataPath={(data: GridRow) => data.filePath}
            autoGroupColumnDef={{
              headerName: '코드',
              field: 'code',
              width: 100,
              sortable: false,
              suppressMovable: true,
              filter: false,
              editable: false,
              resizable: false,
              pinned: 'left',
              cellRendererParams: {
                suppressCount: false,
                checkbox: true,
              },
            }}
            groupDefaultExpanded={-1}

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
            onCellValueChanged={handleCellValueChanged}
            onGridReady={(params) => {
              params.api.forEachNode((node) => {
                if (node.data?.locked) node.setSelected(true);
              });
            }}
            suppressRowHoverHighlight={false}
            singleClickEdit={true}
            tooltipShowDelay={args.showProductNameTooltip ? 0 : undefined}
            tooltipHideDelay={args.showProductNameTooltip ? 9999 : undefined}
            tooltipMouseTrack={args.showProductNameTooltip ? true : undefined}
            getRowClass={(params) => {
              if ((params.data as any)?.isSumRow) return 'ag-row-sum';
              return params.data?.isHighlighted ? 'ag-row-highlighted' : '';
            }}
           
          />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: renderGrid,
};