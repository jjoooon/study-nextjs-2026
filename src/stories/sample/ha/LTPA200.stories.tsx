import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Button } from '@uiux/Button';
import { SearchIcon } from '@icons';
import { DatePickerInput } from '@common/DatePicker';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent, createCellValueChangedHandler, useAgGridPagination } from '@aggrid';
import { useFormFields } from '@hooks/useFormFields';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA200',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계데이터조회 &gt; 신계약스캔권한관리 LTPA200</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA200Props = {
  isNoData?: boolean;
};

const LTPA200 = ({ isNoData = false }: LTPA200Props) => {

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
  };
  const DummyData: DummyDataType[] = [
    {
      id: 1,
      isCheck: false,
      field01: '',  
      field02: '',
      field03: '2023-03-01',             
      field04: '9999-12-31',
      field05: '',        
      field06: '',
      field07: '',              
    },
    {
      id: 2,
      isCheck: false,
      field01: '',  
      field02: '',
      field03: '2023-03-01',             
      field04: '9999-12-31',
      field05: '',        
      field06: '',
      field07: '김한화',              
    },
    {
      id: 3,
      isCheck: false,
      field01: '',  
      field02: '',
      field03: '2023-03-01',             
      field04: '9999-12-31',
      field05: '',        
      field06: '',
      field07: '',              
    },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '구분',
      field: 'field01',
      flex: 1,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '대상',
      field: 'field02',
      flex: 2,
      cellClass: 'flex! items-center! justify-center!',

    },
    {
      headerName: '적용시작일자',
      field: 'field03',
      flex: 1,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '적용종료일자',
      field: 'field04',
      flex: 1,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '상태',
      field: 'field05',
      flex: 0.8,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '적용사유',
      field: 'field06',
      flex: 2,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '등록자',
      field: 'field07',
      flex: 0.7,
      cellClass: 'flex! items-center! justify-center!' 
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
          caption="장기보험 모집자 설계 조회 테이블"
          cols={[
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'등록항목'}>
              <NativeSelect
                aria-label="항목 선택"
                width="12rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
                required
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '장기보험' },
                  { value: 'selection2', id: 'type01-2', label: '장기보험2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'조직구분'}>
              <NativeSelect
                aria-label="조직구분 선택"
                width="12rem"
                value={form.type02}
                onChange={(e) => setFormField('type02', e.target.value)}
                required
              >
                {[
                  { value: 'selection', id: 'type02-1', label: '선택' },
                  { value: 'selection2', id: 'type02-2', label: '항목2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input
                aria-label=""
                width={'15rem'}
                value={form.type03}
                onChange={e => setFormField('type03', e.target.value)}
              />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button> 
              <Input aria-label="" 
                width={'15rem'} 
                value={'김한화'}
                readOnly
              />
              <Grow className="ml-[8rem]">
                <NativeSelect
                  aria-label="조직구분 선택"
                  width="12rem"
                  value={form.type04}
                  onChange={(e) => setFormField('type04', e.target.value)}
                >
                  {[
                    { value: 'selection', id: 'type04-1', label: '선택' },
                    { value: 'selection2', id: 'type04-2', label: '항목2' },
                  ].map((option) => (
                    <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                  ))}
                </NativeSelect>
                <DatePickerInput
                  errorMsg="입력은 필수입니다."
                  errorPs="bl"
                  mode="single"
                  onChange={() => {}}
                  size="lg"
                  value=""
                  width="sm"
                />
              </Grow>
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
              headerCheckbox: false,
              checkboxes: true,
              enableClickSelection: false,
            }}
            selectionColumnDef={{
              headerName: '√',
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

export const Ltpa200Story: Story = {
  render: () => <LTPA200 />,
};

export const Ltpa200NoData: Story = {
  render: () => <LTPA200 isNoData={true} />,
};