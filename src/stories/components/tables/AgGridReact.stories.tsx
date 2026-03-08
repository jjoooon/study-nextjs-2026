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
import { DUMMY_LTRA350_DATA } from '@/features/pub/proto/data/LTRA350Data';
import type { LTRA350DataType } from '@/features/pub/proto/data/LTRA350Data';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Grow } from '@atoms';

ModuleRegistry.registerModules([AllCommunityModule]);

type GridRow = LTRA350DataType['mainBody']['agGridTable1'][number];

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
                AgGridReact 케이스는 LTRA350MainBody 내부의 AgGrid 설정을 기준으로 구성된 스토리입니다.
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
import { DUMMY_LTRA350_DATA } from '@/features/pub/proto/data/LTRA350Data';

<AgGridReact
  rowData={DUMMY_LTRA350_DATA.mainBody.agGridTable1}
  columnDefs={columnDefs}
  rowSelection="multiple"
  singleClickEdit={true}
/>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>스토리에서 노출하는 주요 컨트롤입니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>selectionMode</td><td>'singleRow' | 'multiRow'</td><td>행 선택 모드</td></tr>
                <tr><td>headerCheckbox</td><td>boolean</td><td>헤더 전체 선택 체크박스</td></tr>
                <tr><td>checkboxes</td><td>boolean</td><td>행 체크박스 표시</td></tr>
                <tr><td>enableClickSelection</td><td>boolean</td><td>행 클릭 선택 허용</td></tr>
                <tr><td>showProductNameTooltip</td><td>boolean</td><td>담보명 툴팁 표시 여부</td></tr>
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
  const rowData = DUMMY_LTRA350_DATA.mainBody.agGridTable1;
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