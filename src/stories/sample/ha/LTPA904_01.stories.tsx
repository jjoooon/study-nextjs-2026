import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { Input } from '@uiux/Input';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, CellSpanModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridEmptyComponent, useAgGridPagination } from '@/shared/components/agGridUtils';
import { useFormFields } from '@/shared/hooks/useFormFields';

ModuleRegistry.registerModules([AllCommunityModule, CellSpanModule]);


const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA904_02',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <br />
            <br />
            <h2>가입설계 &gt; 설계데이터조회 &gt; 납입예정리스트 LTPA904_02</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type LTPA904_02Props = {
  isNoData?: boolean;
};

const LTPA904_02 = ({ isNoData = false }: LTPA904_02Props) => {
  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
  };

  const DummyData: DummyDataType[] = [
    { 
      id: 1,
      field01: '', 
      field02: '',                    
      field03: '', 
      field04: '', 
    },
    { 
      id: 2,
      field01: '', 
      field02: '',                    
      field03: '', 
      field04: '', 
    },
    { 
      id: 3,
      field01: '', 
      field02: '',                    
      field03: '', 
      field04: '', 
    },
    
  ];

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '납입회차',
      field: 'field01',
      flex: 1,
      spanRows: false,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center bg-white!`,
    },
    {
      headerName: '납입_응당일',
      field: 'field02',
      flex: 1,
      cellClass: `text-center bg-white!`,
    },
    {
      headerName: '담보코드',
      field: 'field03',
      flex: 1,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '담보보험료',
      field: 'field04',
      flex: 1,
      cellClass: `text-right bg-white!`,
    },
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
    type07: '',
    type08: '',
    type09: '',
    type10: '',
    type11: '',
    type12: '',
    type13: '',
    type14: '',
  });
  
  // ag-Grid + TablePagination 연동 (공통 훅 사용)
  const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);
  const pageSize = 5;
  const {
    currentPage,
    totalPages,
    handleGridReady,
    handlePageChange
  } = useAgGridPagination(gridRef, pageSize);

  return (
    <Gcol className="w-full gap-[1.2rem]">
      {/* agGrid */}
      <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType>
            // getRowId 적용: id 필드를 고유 식별자로 사용
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            noRowsOverlayComponent={AgGridEmptyComponent}
            defaultColDef={{ 
              sortable: false, 
              resizable: false,
            }}
            enableCellSpan={true}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
          />
        </div>
      </Grow>
      <Grow className="w-full">
        <FormTable caption="예상만기환급금 테이블" cols={['w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1',]}>
          <FormRow>
            <FormCell title={'총예상납입보험료'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                after="원"
                commaAmount={true}
                width="full"
                value={form.type01} 
                onChange={e => setFormField('type01', e.target.value)}
              />
            </FormCell>
            <FormCell title={'중도환급금'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="원"
                commaAmount={true}
                value={form.type02} 
                onChange={e => setFormField('type02', e.target.value)}
              />
            </FormCell>
            <FormCell title={'예상만기환급금'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                value={form.type03}
                onChange={e => setFormField('type03', e.target.value)}
              />
              원
            </FormCell>
            <FormCell title={'예상만기환급율'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="%"
                value={form.type04}
                onChange={e => setFormField('type04', e.target.value)}
              />
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <Grow className="w-full">
        <FormTable caption="추천보험료 테이블" cols={['w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1',]}>
          <FormRow>
            <FormCell title={'추천보험료'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="원"
                commaAmount={true}
                value={form.type05}
                onChange={e => setFormField('type05', e.target.value)}
              />
            </FormCell>
            <FormCell title={'최소추천(출생후)'} colSpan={5}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="21.5rem"
                after="원"
                commaAmount={true}
                value={form.type06}
                onChange={e => setFormField('type06', e.target.value)}
              />
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'최소추천보험료'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="원"
                commaAmount={true}
                value={form.type07}
                onChange={e => setFormField('type07', e.target.value)}
              />
            </FormCell>
            <FormCell title={'최소예상만기환급율'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="%"
                value={form.type08}
                onChange={e => setFormField('type08', e.target.value)}
              />
            </FormCell>
            <FormCell title={'최대추천보험료'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="원"
                commaAmount={true}
                value={form.type09}
                onChange={e => setFormField('type09', e.target.value)}
              />
            </FormCell>
            <FormCell title={'최대예상만기환급율'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="%"
                value={form.type10}
                onChange={e => setFormField('type10', e.target.value)}
              />
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <Grow className="w-full">
        <FormTable caption="기타 테이블" cols={['w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1',]}>
          <FormRow>
            <FormCell title={'만기환급담보환급금'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="원"
                commaAmount={true}
                value={form.type11}
                onChange={e => setFormField('type11', e.target.value)}
              />
            </FormCell>
            <FormCell title={'적립보험료대체납입특약보험료'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="원"
                commaAmount={true}
                value={form.type12}
                onChange={e => setFormField('type12', e.target.value)}
              />
            </FormCell>
            <FormCell title={'실손의료비예상납입보험료'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="원"
                commaAmount={true}
                value={form.type13}
                onChange={e => setFormField('type13', e.target.value)}
              />
            </FormCell>
            <FormCell title={'만기유지보너스'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="원"
                commaAmount={true}
                value={form.type14}
                onChange={e => setFormField('type14', e.target.value)}
              />
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
    </Gcol>
    
  );
};

type Story = StoryObj<typeof meta>;

export const LTPA904Story: Story = {
  render: () => <LTPA904_02/>,
};

export const LTPA904_02NoData: Story = {
  render: () => <LTPA904_02 isNoData={true} />,
};

