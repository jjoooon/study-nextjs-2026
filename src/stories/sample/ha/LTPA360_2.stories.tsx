import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Button } from '@uiux/Button';
import { DatePickerInput } from '@common/DatePicker';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridEmptyComponent, createCellValueChangedHandler, DatePickerCellEditor, useAgGridPagination } from '@aggrid';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon } from '@icons';
import { Input } from '@uiux/Input';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA360_02',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계관리 &gt; 상품판매준비프로세스 &gt; 담보코드요청 LTPA360_02</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA360_02Props = {
  isNoData?: boolean;
};

const LTPA360_02 = ({ isNoData = false }: LTPA360_02Props) => {

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
      field01: 'CLA70772',  
      field02: '고열동반특정패혈증진단비',
      field03: '0',             
      field04: '90',
      field05: '',        
      field06: '세부담보 중 일부 면적',
      field07: '[담보]보험기간 중에 진단확정된 질병 또는 상해의 직접 결과로써 생활기능 또는 업무능력에 지장을 가져오면서 "고열"로 인하여 중환자실에 입원하여 치료를 받은 경우 보험가입금액 지급', 
      field08: '간편고지/독립/모담보',
      field09: '2026-03-17',
      field10: '박한화',
      field11: '2025-10-13',              
    },
    {
      id: 2,
      isCheck: false,
      field01: 'CLA70772',  
      field02: '고열동반특정패혈증진단비',
      field03: '0',             
      field04: '90',
      field05: '',        
      field06: '없음',
      field07: '[담보]보장개시일 이후에 약관에서 정한 "암(특정유사암포함)"으로 진단확정되고, 그 질병으로 입원 중에 "급여 암(특정유사암포함) 재활치료"를 받은 경우 또는 통원하여 "급여 암(특정유사암포함) 재활치료"를 받은 경우 보험가입금액 지급',              
      field08: '간편고지/독립',
      field09: '2026-03-17',
      field10: '',
      field11: '2025-10-13',                          
    },
    {
      id: 3,
      isCheck: false,
      field01: 'CLA70772',  
      field02: '고열동반특정패혈증진단비',
      field03: '0',             
      field04: '90',
      field05: '',        
      field06: '세부담보 중 일부 면적',
      field07: '',              
      field08: '',
      field09: '2026-03-17',
      field10: '',
      field11: '2025-10-13',                 
    },
    {
      id: 4,
      isCheck: false,
      field01: '신규',  
      field02: '',
      field03: '',             
      field04: '',
      field05: '',        
      field06: '',
      field07: '',              
      field08: '삭제(기 판매 위)',
      field09: '2026-03-17',
      field10: '',
      field11: '2025-10-13',                 
    },
  ];

  const defaultColDef: ColDef<DummyDataType> = {
    sortable: false,
    filter: false,
    resizable: false,
    suppressMovable: true,
    headerClass: 'ag-header-center',
  };

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '담보코드',
      field: 'field01',
      flex: 1,
      autoHeight: true,
      editable: true,
      cellClass: 'flex! items-center! justify-center! text-center!',
    },
    {
      headerName: '담보명',
      field: 'field02',
      flex: 2,
      editable: true,
      cellClass: 'truncate flex! items-center! justify-center! text-center!'
    },
    {
      headerName: '면책(일수)',
      field: 'field03',
      flex: 0.9,
      editable: true,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '감액(일수)',
      field: 'field04',
      flex: 0.9,
      editable: true,
      cellClass: 'flex! items-center! justify-center!' ,
    },
    {
      headerName: '감액(비율)',
      field: 'field05',
      flex: 0.9,
      editable: true,
      cellClass: 'flex! items-center! justify-center!' ,
    },
    {
      headerName: '면책감액기타',
      field: 'field06',
      flex: 1.2,
      editable: true,
      cellClass: 'flex! items-center! justify-center!' ,
    },
    {
      headerName: '보장내용',
      field: 'field07',
      flex: 1.5,
      editable: true,
      autoHeight: true,
      cellClass: 'flex! items-center! justify-center! break-all! whitespace-pre-line!',
    },
    {
      headerName: '비고',
      field: 'field08',
      flex: 1.2,
      editable: true,
      cellClass: 'truncate flex! items-center! justify-center!' ,
    },
    {
      headerName: '요청일자',
      field: 'field09',
      flex: 0.9,
      editable: true,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '요청자',
      field: 'field10',
      flex: 1.5,
      editable: true,
      cellClass: 'flex! items-center! justify-center! text-center!',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Grow className="w-full px-1" >
          <Input aria-label="" width={'100%'} value={'박한화'} readOnly />
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
            <SearchIcon />
          </Button>
        </Grow>
      ),
    },
    {
      headerName: '상품판매일자',
      field: 'field11',
      flex: 1,
      autoHeight: true,
      editable: true,
      cellClass: 'flex! items-center! justify-center!',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '2025-10-13', '2025-10-14'] },
    },
  ];
   
  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(isNoData ? [] : DummyData);
  const [errorRows, setErrorRows] = React.useState<number[]>(
    DummyData.filter(row => !row.isCheck).map(row => row.id)
  );
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '', 
    type04: '', 
    type05: '', 
    type06: '', 
    type07: '', 
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
          caption="사고담보코드 조회 테이블"
          cols={[
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'상품판매일자'}>
              <NativeSelect
                aria-label="상품판매일자 선택"
                width="12rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '2025-10-13' },
                  { value: 'selection2', id: 'type01-2', label: '2025-10-13' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'조회구분'}>
              <NativeSelect
                aria-label="조회구분 선택"
                width="17rem"
                value={form.type02}
                onChange={(e) => setFormField('type02', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type02-1', label: '선택' },
                  { value: 'selection2', id: 'type02-2', label: '신규' },
                  { value: 'selection3', id: 'type02-3', label: '제도성 일반' },
                  { value: 'selection4', id: 'type02-4', label: '담보일반' },
                  { value: 'selection5', id: 'type02-5', label: '모담 보' },
                  { value: 'selection6', id: 'type02-6', label: '독립특약' },
                  { value: 'selection6', id: 'type02-6', label: '판매취소' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'담보구분'}>
              <NativeSelect
                aria-label="담보구분 선택"
                width="15rem"
                value={form.type03}
                onChange={(e) => setFormField('type03', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type03-1', label: '담보코드' },
                  { value: 'selection2', id: 'type03-2', label: '담보명' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input
                aria-label=""
                width={'15rem'}
                value={form.type04 || 'CLA23429'}
                onChange={e => setFormField('type04', e.target.value)}
              />
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'요청자'}>
              <Input
                aria-label=""
                width={'10rem'}
                value={form.type05 || '12345678'}
                onChange={e => setFormField('type05', e.target.value)}
              />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
              <Input
                aria-label=""
                width={'15rem'}
                value={'신부산GA지점'}
                readOnly
              />
            </FormCell>
            <FormCell title={'요청일자'} colSpan={3}>
              <DatePickerInput mode="range" onChange={() => {}} rangeValue={{ from: '2026-02', to: '2026-03' }} size="lg" width="sm" readOnly />
              <NativeSelect
                aria-label="요청일자 선택"
                width="10rem"
                value={form.type02}
                onChange={(e) => setFormField('type02', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type02-1', label: '전체' },
                  { value: 'selection2', id: 'type02-2', label: '' },
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
            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}

            // 체크박스 시
            rowSelection={{
              mode: 'multiRow',
              headerCheckbox: true,
              checkboxes: true,
              enableClickSelection: false,
            }}
            selectionColumnDef={{
              headerName: 'checkbox',
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

}

type Story = StoryObj<typeof meta>;

export const LTPA360_02Story: Story = {
  render: () => <LTPA360_02 />,
};

export const LTPA360_02NoData: Story = {
  render: () => <LTPA360_02 isNoData={true} />,
};