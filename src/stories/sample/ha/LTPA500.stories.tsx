import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Input } from '@uiux/Input';
import { Button } from '@uiux/Button';
import { SearchIcon } from '@icons';
import { DatePickerInput } from '@common/DatePicker';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { useFormFields } from '@hooks/useFormFields';
import { useAgGridPagination } from '@aggrid';


ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA500',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계관리 &gt; 장기신계약가입설계결재정보 LTPA500</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA500Props = {
  isNoData?: boolean;
};

const LTPA500 = ({ isNoData = false }: LTPA500Props) => {

  // dummy data
  type DummyDataType = {
    id: number;
    isCheck: boolean;
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
  };
  const DummyData: DummyDataType[] = [
    {
      id: 1,
      isCheck: false,
      field01: '(전속)영업관리자승인계약',  
      field02: 'LA20148716422000',
      field03: 'LA260225322001',             
      field04: 'LA01581001_무배당 참 편한 건강한',
      field05: '김한화',        
      field06: '박한화',
      field07: '8094210',              
      field08: '신부산GA지점',              
      field09: '9,999,999',              
      field10: '',              
      field11: '',              
    },
    {
      id: 2,
      isCheck: false,
      field01: '(전속)영업관리자승인계약',  
      field02: 'LA20148716422000',
      field03: 'LA260225322001', 
      field04: 'LA01581001_무배당 참 편한 건강한',
      field05: '김한화', 
      field06: '박한화',
      field07: '8094210', 
      field08: '신부산GA지점',  
      field09: '9,999,999', 
      field10: '', 
      field11: '',   
    },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '업무구분',
      field: 'field01',
      width: 190,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '증권번호',
      field: 'field02',
      width: 160,
      cellClass: 'flex! items-center! justify-center!',

    },
    {
      headerName: '설계번호',
      field: 'field03',
      width: 150,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '상품명',
      field: 'field04',
      width: 200,
      cellClass: 'flex! items-center! justify-center!',
      cellRenderer: (params: ICellRendererParams<DummyDataType, string | number>) => (
        <span className="truncate block w-full" style={{ maxWidth: '100%' }} title={String(params.value ?? '')}>
          {params.value}
        </span>
      ),
    },
    {
      headerName: '계약자',
      field: 'field05',
      width: 100,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '모집자명',
      field: 'field06',
      width: 100,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '모집자코드',
      field: 'field07',
      width: 110,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '지점',
      field: 'field08',
      width: 130,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '보험료(원)',
      field: 'field09',
      width: 120,
      cellClass: 'flex! items-center! justify-end!' ,
      valueFormatter: 'numberValueFormatter',
    },
    {
      headerName: '사유',
      field: 'field10',
      flex: 1.2,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '승인',
      field: 'field11',
      width: 100,
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
    type04: '',
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
          caption="장기신계약가입설계결재정보 조회 테이블"
          cols={[
            'w-[9rem]', 'min-w-[12rem] flex-1',
            'w-[9rem]', 'min-w-[12rem] flex-1',
            'w-[9rem]', 'min-w-[12rem] flex-1',
            'w-[9rem]', 'min-w-[12rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'조회구분'}>
              <NativeSelect
                aria-label="조회구분 선택"
                width="10rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '담당기관' },
                  { value: 'selection2', id: 'type01-2', label: '담당기관1' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input aria-label="" 
                width={'9rem'} 
                value={form.type02 || '12345678'} 
                onChange={e => setFormField('type02', e.target.value)}
              />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button> 
              <Input aria-label="" width={'12rem'} value={'신부산GA지점'} readOnly />
            </FormCell>
            <FormCell title={'업무구분'}>
              <NativeSelect
                aria-label="업무구분 선택"
                width="16rem"
                value={form.type03}
                onChange={(e) => setFormField('type03', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type03-1', label: '전체' },
                  { value: 'selection2', id: 'type03-2', label: '유지율부실예상' },
                  { value: 'selection3', id: 'type03-3', label: '유의승환' },
                  { value: 'selection4', id: 'type03-4', label: '(전속)영업관리자승인계약' },
                ].map((option) => (
                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'승인여부'}>
              <NativeSelect
                aria-label="승인여부 선택"
                width="10rem"
                value={form.type04}
                onChange={(e) => setFormField('type04', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type04-1', label: '전체' },
                  { value: 'selection2', id: 'type04-2', label: '승인' },
                  { value: 'selection3', id: 'type04-3', label: '거절' },
                  { value: 'selection4', id: 'type04-4', label: '미결재' },
                ].map((option) => (
                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'승인'}>
              <DatePickerInput mode="range" onChange={() => {}} rangeValue={{ from: '2026-02', to: '2026-03' }} size="lg" width="sm" />
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
            defaultColDef={{ 
              sortable: false,
              resizable: true,
            }}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            suppressRowTransform={true}
            
            // 체크박스 시
            rowSelection={{
              mode: 'multiRow',
              headerCheckbox: true,
              checkboxes: true,
              enableClickSelection: false,
            }}
            selectionColumnDef={{
              headerName: '',
            }}
            onGridReady={params => {
              params.api.forEachNode(node => {
                if (node.data?.isCheck) {
                  node.setSelected(true);
                }
              });
            }}
          />
        </div>
      </Grow>
    </Gcol>
  );
};

type Story = StoryObj<typeof meta>;

export const LTPA500Story: Story = {
  render: () => <LTPA500 />,
};