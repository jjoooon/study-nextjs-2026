
import * as React from 'react';
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
  createSelectionChangedHandler 
} from '@/shared/components/aggrid/aggridComponents';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Grow } from '@atoms';

import { TestData } from './TestAgGridData';
import type { TestDataType } from './TestAgGridData';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, RowGroupingModule]);
ModuleRegistry.registerModules([TreeDataModule]);

type GridRow = TestDataType['data'][number];
// 합계 행 타입 확장
type GridRowWithSum = GridRow & { isSumRow?: boolean };

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
  title: 'Components/Tables/AgGridReactGrouping',
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
import { AgGridReact } from 'ag-grid-react';
\`\`\`
              `}
            </Markdown>
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
    cellRenderer: (params: ICellRendererParams<GridRow>) => (params.data as GridRowWithSum)?.isSumRow ? <b>합계</b> : params.value,
    colSpan: (params) => (params.data as GridRowWithSum)?.isSumRow ? 2 : 1,
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
    cellRenderer: (params: ICellRendererParams<GridRow>) => (params.data as GridRowWithSum)?.isSumRow ? null : productNameRenderer(params),
    colSpan: (params) => (params.data as GridRowWithSum)?.isSumRow ? 0 : 1,
  },
  {
    headerName: '가입금액(만원)',
    field: 'coverageAmount',
    flex: 1.6,
    headerClass: 'px-0!',
    cellClass: (params: CellClassParams<GridRow>) => (params.data as GridRowWithSum)?.isSumRow ? '' : 'text-right editable-cell',
    sortable: false,
    filter: false,
    editable: (params: EditableCallbackParams<GridRow>) => (params.data as GridRowWithSum)?.isSumRow ? false : true,
    valueFormatter: (params: ValueFormatterParams<GridRow>) => (params.value ? params.value.toLocaleString() : ''),
    valueParser: (params: ValueParserParams<GridRow>) => Number(params.newValue),
    cellRenderer: (params: ICellRendererParams<GridRow>) => (params.data as GridRowWithSum)?.isSumRow ? <b>합계2</b> : params.value,
    colSpan: (params) => (params.data as GridRowWithSum)?.isSumRow ? 4 : 1,
  },
  {
    headerName: '보험료(만원)',
    field: 'premium',
    flex: 1.4,
    cellClass: 'text-right',
    headerClass: 'px-0!',
    sortable: false,
    filter: false,
    cellClassRules: {
      'bg-[var(--color-primary-20)]!': (params) => {
        const rowIndex = params.node.rowIndex ?? -1;
        return rowIndex % 2 !== 0;
      }, // 0부터 시작하므로 홀수 인덱스가 짝수행
    },
    cellRenderer: (params: ICellRendererParams<GridRow>) =>
      (params.data as GridRowWithSum)?.isSumRow
        ? null
        : numberValueFormatter<GridRow>(params as unknown as ValueFormatterParams<GridRow>),
    colSpan: (params) => (params.data as GridRowWithSum)?.isSumRow ? 0 : 1,
  },
  {
    headerName: '가능금액(만원)',
    field: 'availableAmount',
    flex: 1.6,
    cellClass: 'text-right',
    headerClass: 'px-0!',
    sortable: false,
    filter: false,
    cellRenderer: (params: ICellRendererParams<GridRow>) =>
      (params.data as GridRowWithSum)?.isSumRow
        ? null
        : numberValueFormatter<GridRow>(params as unknown as ValueFormatterParams<GridRow>),
    colSpan: (params) => (params.data as GridRowWithSum)?.isSumRow ? 0 : 1,
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
    cellRenderer: (params: ICellRendererParams<GridRow>) => (params.data as GridRowWithSum)?.isSumRow ? null : expiryCellRenderer(params),
    colSpan: (params) => (params.data as GridRowWithSum)?.isSumRow ? 0 : 1,
  },
  {
    headerName: '납기',
    field: 'paymentPeriod',
    flex: 1,
    cellClass: 'text-center',
    sortable: false,
    filter: false,
    editable: (params: EditableCallbackParams<GridRow>) => params.data?.canEditExpiry ?? false,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['5년', '10년', '15년', '20년', '25년', '30년', '35년', '전기납'],
    },
    cellRenderer: (params: ICellRendererParams<GridRow>) => {
      const data = params.data as GridRowWithSum;
      if (data?.isSumRow) {
        // 합계 행: 가입금액 총합 콤마포맷
        if (!params.column || !params.colDef) return null;
        return <b>{numberValueFormatter<GridRow>({ ...params, value: data.coverageAmount, column: params.column, colDef: params.colDef })}</b>;
      }
      return expiryCellRenderer(params);
    },
    colSpan: (params) => (params.data as GridRowWithSum)?.isSumRow ? 3 : 1,
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
    cellRenderer: (params: ICellRendererParams<GridRow>) => (params.data as GridRowWithSum)?.isSumRow ? null : params.value,
    colSpan: (params) => (params.data as GridRowWithSum)?.isSumRow ? 0 : 1,
  },
  {
    headerName: '중복',
    field: 'isDuplicate',
    width: 44,
    cellClass: 'text-center',
    sortable: false,
    filter: false,
    cellRenderer: (params: ICellRendererParams<GridRow>) => (params.data as GridRowWithSum)?.isSumRow ? null : duplicateRenderer(params),
    colSpan: (params) => (params.data as GridRowWithSum)?.isSumRow ? 0 : 1,
  },
];

// 합계 행 생성 함수
function getSumRow(data: GridRow[]): GridRowWithSum {
  // GridRowWithSum의 모든 필수 필드를 명시적으로 채움
  return {
    id: -12, // number 타입, 실제 데이터와 겹치지 않는 값
    code: '', // 합계 행은 code 없음
    locked: false,
    isDuplicate: false,
    productName: '합계ㅇㅇㅇ',
    coverageAmount: data.reduce((sum, row) => sum + (row.coverageAmount ?? 0), 0),
    attribute: false,
    premium: data.reduce((sum, row) => sum + (row.premium ?? 0), 0),
    availableAmount: data.reduce((sum, row) => sum + (row.availableAmount ?? 0), 0),
    expiryPeriod: '',
    paymentPeriod: '',
    expectedUwResult: '',
    isHighlighted: false,
    canEditExpiry: false,
    badge: [],
    // 아래는 GridRow 타입에 따라 추가 필드가 있을 경우 기본값 처리
    filePath: [],
    isSumRow: true, // 커스텀 플래그(타입 확장 허용)
  };
}

const renderGrid: Story['render'] = (args) => {
  const [rowData, setRowData] = React.useState<GridRow[]>(TestData.data);
  const sumRow = React.useMemo(() => [getSumRow(rowData)], [rowData]);

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

  return (
    <div className="p-5">
      <div className="w-full h-[40vh]! ag-theme-alpine aggrid-pagination-ko">
        <AgGridReact<GridRow>
          rowData={rowData}
          columnDefs={columnDefs}
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
          pagination={args.pagination ?? true}
          paginationPageSize={args.paginationPageSize ?? 10}
          paginationPageSizeSelector={args.paginationPageSizeSelector ?? [10, 20, 50, 100]}
          suppressPaginationPanel={args.suppressPaginationPanel ?? false}
          localeText={AG_GRID_LOCALE_KO}
          paginationNumberFormatter={(params) => `${Number(params.value).toLocaleString('ko-KR')}`}
        />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: renderGrid,
};