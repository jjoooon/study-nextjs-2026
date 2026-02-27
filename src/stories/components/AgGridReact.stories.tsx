import type { Meta, StoryObj } from '@storybook/react';
import { Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks';
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
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { DUMMY_LTRA350_DATA } from '@/features/pub/proto/data/LTRA350Data';
import type { LTRA350DataType } from '@/features/pub/proto/data/LTRA350Data';
import { Badge, Button, Checkbox } from '@/shared/components/uiux';
import { Grow, Typo } from '@/shared/components/common';
import { StoryBox, StoryWrap } from '@/shared/components/storybook/StoryWrap';

ModuleRegistry.registerModules([AllCommunityModule]);

type GridRow = LTRA350DataType['mainBody']['agGridTable1'][number];

interface AgGridReactStoryProps {
  hideAside?: boolean;
  rowSelection?: 'single' | 'multiple';
}

const AgGridReactStoryComponent = (_props: AgGridReactStoryProps) => null;

const meta: Meta<AgGridReactStoryProps> = {
  title: 'Components/Proto/AgGridReact',
  component: AgGridReactStoryComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <Primary />
          <Stories includePrimary={false} />
        </>
      ),
      description: {
        component: `
AgGridReact 케이스는 LTRA350MainBody 내부의 AgGrid 설정을 기준으로 구성한 스토리이다.
컬럼 고정, 체크박스 선택, 편집 가능한 셀, 커스텀 셀 렌더러를 독립적으로 확인할 수 있다.

---

<br>
#### **기본 AgGridReact: Usage**
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
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    hideAside: {
      control: 'boolean',
      description: '담보명 컬럼 폭 전환용 플래그',
      table: { category: 'State' },
    },
    rowSelection: {
      control: 'select',
      options: ['single', 'multiple'],
      description: '행 선택 모드',
      table: { category: 'Behavior' },
    },
  },
  args: {
    hideAside: false,
    rowSelection: 'multiple',
  },
};

export default meta;
type Story = StoryObj<AgGridReactStoryProps>;

const productNameRenderer = (params: ICellRendererParams<GridRow>) => {
  return (
    <Grow placement="bwc">
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

const buildColumnDefs = (hideAside: boolean): ColDef<GridRow>[] => [
  {
    headerName: '',
    checkboxSelection: true,
    width: 30,
    cellClass: 'text-center p-0!',
    sortable: false,
    filter: false,
    pinned: 'left',
  },
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
    width: hideAside ? 510 : 390,
    cellClass: 'text-left',
    sortable: false,
    filter: false,
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

export const Default: Story = {
  render: (args) => {
    const rowData = DUMMY_LTRA350_DATA.mainBody.agGridTable1;
    const columnDefs = React.useMemo(() => buildColumnDefs(args.hideAside ?? false), [args.hideAside]);

    return (
      <StoryWrap>
        <StoryBox className="w-full h-[80vh]">
          <div className="h-full ag-theme-alpine" style={{ width: '100%', height: '100%' }}>
            <AgGridReact<GridRow>
              rowData={rowData}
              columnDefs={columnDefs}
              rowSelection={args.rowSelection}
              suppressRowClickSelection={true}
              singleClickEdit={true}
              tooltipShowDelay={0}
              tooltipHideDelay={9999}
              tooltipMouseTrack={true}
            />
          </div>
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const CompactWidth: Story = {
  args: {
    hideAside: true,
  },
};
