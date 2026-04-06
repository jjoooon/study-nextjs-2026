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
import { AgGridEmptyComponent, createCellValueChangedHandler, DatePickerCellEditor, useAgGridPagination } from '@/shared/components/agGridUtils';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon } from '@icons';
import { Input } from '@uiux/Input';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA360_03',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계관리 &gt; 상품판매준비프로세스 &gt; 사고담보코드요청 LTPA360_03</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA360_03Props = {
  isNoData?: boolean;
};

const LTPA360_03 = ({ isNoData = false }: LTPA360_03Props) => {

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
      field01: 'LAC8399197',  
      field02: '급여 메일리 영유아발달검사 이용률(연연)',
      field03: '99기타',             
      field04: '99기타',
      field05: 'LAC1208303',        
      field06: 'F552102',
      field07: '암 치료',              
      field08: '삭제(기 판매 위)',
      field09: '2025-09-11',
      field10: '',
      field11: '2025-10-13',              
    },
    {
      id: 2,
      isCheck: false,
      field01: 'LAC8399198',  
      field02: '급여 메일리 영유아발달검사 이용률(연연)',
      field03: '99기타',             
      field04: '99기타',
      field05: 'LAC1208303',        
      field06: 'F552102',
      field07: '암 치료',              
      field08: '삭제(기 판매 위)',
      field09: '2025-09-11',
      field10: '',
      field11: '2025-10-13',                          
    },
    {
      id: 3,
      isCheck: false,
      field01: 'LAC8399199',  
      field02: '급여 메일리 영유아발달검사 이용률(연연)',
      field03: '99기타',             
      field04: '99기타',
      field05: 'LAC1208303',        
      field06: 'F552102',
      field07: '암 치료',              
      field08: '삭제(기 판매 위)',
      field09: '2025-09-11',
      field10: '',
      field11: '2025-10-13',                 
    },
    {
      id: 4,
      isCheck: false,
      field01: 'LAC8399199',  
      field02: '급여 메일리 영유아발달검사 이용률(연연)',
      field03: '99기타',             
      field04: '99기타',
      field05: 'LAC1208303',        
      field06: 'F552102',
      field07: '암 치료',              
      field08: '삭제(기 판매 위)',
      field09: '2025-09-11',
      field10: '',
      field11: '2025-10-13',                 
    },
    {
      id: 5,
      isCheck: false,
      field01: '신규',  
      field02: '급여 메일리 영유아발달검사 이용률(연연)',
      field03: '99기타',             
      field04: '99기타',
      field05: 'LAC1208303',        
      field06: 'F552102',
      field07: '암 치료',              
      field08: '삭제(기 판매 위)',
      field09: '2025-09-11',
      field10: '',
      field11: '2025-10-13',                 
    },
  ];

  // AgGrid Column 
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '사고담보코드',
      field: 'field01',
      flex: 1,
      autoHeight: true,
      editable: true,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
    },
    {
      headerName: '사고담보명(100byte초과금지)',
      field: 'field02',
      flex: 1.8,
      editable: true,
      cellClass: 'truncate text-left'
    },
    {
      headerName: '대유형구분',
      field: 'field03',
      flex: 1,
      editable: true,
      cellClass: 'text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['99:기타', ''] },
    },
    {
      headerName: '보상구분',
      field: 'field04',
      flex: 1,
      editable: true,
      cellClass: 'flex! items-center! justify-center!' ,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['99:기타', ''] },
    },
    {
      headerName: '표준체사고코드',
      field: 'field05',
      flex: 1.2,
      editable: true,
      cellClass: 'flex! items-center! justify-center!' ,
    },
    {
      headerName: 'SI계수코드(대표)',
      field: 'field06',
      flex: 1.2,
      editable: true,
      cellClass: 'flex! items-center! justify-center!' ,
    },
    {
      headerName: 'SI계수정보',
      field: 'field07',
      flex: 1,
      editable: true,
      cellClass: 'flex! items-center! justify-center!' ,
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
      cellClass: 'flex! items-center! justify-center!' ,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['2025-09-11', ''] },
    },
    {
      headerName: '요청자',
      field: 'field10',
      flex: 1.5,
      editable: true,
      cellClass: 'text-center',
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
      editable: true,
      cellClass: 'flex! items-center! justify-center!',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['2025-10-13', ''] },
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
                  { value: 'selection3', id: 'type02-3', label: '판매취소' },
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
                  { value: 'selection', id: 'type03-1', label: '사고담보명' },
                  { value: 'selection2', id: 'type03-2', label: '사고담보코드' },
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
              <DatePickerInput mode="range" onChange={() => {}} rangeValue={{ from: '2026-02', to: '2026-03' }} size="lg" width="sm"  readOnly />
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

export const LTPA360_03Story: Story = {
  render: () => <LTPA360_03 />,
};

export const LTPA360_03NoData: Story = {
  render: () => <LTPA360_03 isNoData={true} />,
};