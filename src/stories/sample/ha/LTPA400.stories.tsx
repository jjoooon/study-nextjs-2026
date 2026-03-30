import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Button } from '@uiux/Button';
import { SearchIcon } from '@icons';
import { DatePickerInput } from '@common/DatePicker';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent, createCellValueChangedHandler, createFieldRenderer, useAgGridPagination } from '@aggrid';
import { useFormFields } from '@hooks/useFormFields';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA400',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계데이터조회 &gt; 장기보험-가입설계요청 LTPA400</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA400Props = {
  isNoData?: boolean;
};

const LTPA400 = ({ isNoData = false }: LTPA400Props) => {

  // dummy data
  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
    field06: string | number;
    field07: string | number;
    field08: string | number;
    field09: string | number;
    field10: string | number;
    field11: string | number;
    field12: string | number;
  };
  const DummyData: DummyDataType[] = [
    {
      id: 1,
      field01: '',  
      field02: ' ',
      field03: '',             
      field04: '',
      field05: '',        
      field06: '',
      field07: '',              
      field08: '',
      field09: '',        
      field10: '',
      field11: '',    
      field12: '',
    },
    {
      id: 2,
      field01: '',  
      field02: ' ',
      field03: '',             
      field04: '',
      field05: '',        
      field06: '',
      field07: '',              
      field08: '',
      field09: '',        
      field10: '',
      field11: '',    
      field12: '',
    },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '설계접수번호',
      field: 'field01',
      flex: 1.2,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '지점',
      field: 'field02',
      flex: 1,
      cellClass: 'flex! items-center! justify-center!' 

    },
    {
      headerName: '대리점',
      field: 'field03',
      flex: 0.8,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '사용인',
      field: 'field04',
      flex: 0.8,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '상품',
      field: 'field05',
      flex: 1.5,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '고객명',
      field: 'field06',
      flex: 1,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '요청일시',
      field: 'field07',
      flex: 1,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '처리일시',
      field: 'field08',
      flex: 1,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '진행상태',
      field: 'field09',
      flex: 0.7,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '담당SM',
      field: 'field10',
      flex: 0.8,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '지원SM',
      field: 'field11',
      flex: 0.8,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '설계번호',
      field: 'field12',
      flex: 1.2,
      cellClass: 'flex! items-center! justify-center!' 
    },
  ];
   
  // rowSelection 사용시
  const [rowData] = React.useState<DummyDataType[]>(isNoData ? [] : DummyData);

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
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
      <Grow className="w-full" variant="box-round" placement={'bwe'}>
        <FormTable variant={'none'}
          caption="장기보험 설계요청 조회 테이블"
          cols={[
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'조회구분'}>
              <NativeSelect
                aria-label="조회구분 선택"
                width="12rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '지점1' },
                  { value: 'selection2', id: 'type01-2', label: '지점2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input aria-label="" 
                width={'15rem'} 
                value={form.type02 || '12345678'} 
                onChange={e => setFormField('type02', e.target.value)}
              />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button> 
              <Input aria-label="" width={'15rem'} value={'신부산지점GA지점'} readOnly />
            </FormCell>
            <FormCell title={'설계일자'}>
              <DatePickerInput mode="range" onChange={() => {}} rangeValue={{ from: '2026-02', to: '2026-03' }} size="lg" width="sm" />
            </FormCell>
            <FormCell title={'진행상태'}>
              <NativeSelect
                aria-label="진행상태 선택"
                width="12rem"
                value={form.type03}
                onChange={(e) => setFormField('type03', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type03-1', label: '전체' },
                  { value: 'selection2', id: 'type03-2', label: '진행중' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
          </FormRow>
        </FormTable>
        <Grow>
          <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
            조회
          </Button>
          <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
            새로고침
          </Button>
        </Grow>
      </Grow>

      <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            noRowsOverlayComponent={AgGridEmptyComponent}
            defaultColDef={{ 
              sortable: false, 
              resizable: true,
            }}
            alwaysShowHorizontalScroll={true}
          />
        </div>
      </Grow>
    </Gcol>
  );

}

type Story = StoryObj<typeof meta>;

export const LTPA400Story: Story = {
  render: () => <LTPA400 />,
};

export const LTPA400NoData: Story = {
  render: () => <LTPA400 isNoData={true} />,
};