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

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA190',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계데이터조회 &gt; 장기신계약채널별기준관리 LTPA190</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA190Props = {
  isNoData?: boolean;
};

const LTPA190 = ({ isNoData = false }: LTPA190Props) => {

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
  };
  const DummyData: DummyDataType[] = [
    {
      id: 1,
      isCheck: false,
      field01: '청약완료',  
      field02: '',
      field03: '범용',             
      field04: '',
      field05: '',        
      field06: '',
      field07: '김한화',              
      field08: '',
      field09: '',
    },
    {
      id: 2,
      isCheck: false,
      field01: '',  
      field02: '',
      field03: '',             
      field04: '',
      field05: '',        
      field06: '',
      field07: '',              
      field08: '',
      field09: '',
    },
    {
      id: 3,
      isCheck: false,
      field01: '',  
      field02: '',
      field03: '',             
      field04: '',
      field05: '',        
      field06: '',
      field07: '',
      field08: '',      
      field09: '',
    },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '구분',
      field: 'field01',
      flex: 1,
      editable: true,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '신계약프로세스',
      field: 'field02',
      flex: 2,
      editable: true,
      cellClass: 'editable-cell text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '(개인영업-전속)청약서류출력제한', '(개인영업-교차)청약서류출력제한', '(전략영업)청약서류출력제한', '(개인영업-전속)휴대폰전자서명요청제한', '(개인영업-교차)휴대폰전자서명요청제한', '(전략영업-전속)휴대폰전자서명요청제한'] },
    },
    {
      headerName: '판매채널',
      field: 'field03',
      flex: 1,
      editable: true,
      cellClass: 'flex! items-center! justify-center!', 
    },
    {
      headerName: '적용사항',
      field: 'field04',
      flex: 1,
      editable: true,
      cellClass: 'editable-cell text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '선택2'] }, 
    },
    {
      headerName: '적용시작일',
      field: 'field05',
      flex: 1,
      editable: true, // 날짜 직접 입력 가능
      cellClass: 'text-center editable-cell',
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '적용종료일',
      field: 'field06',
      flex: 1,
      editable: true, // 날짜 직접 입력 가능
      cellClass: 'text-center editable-cell',
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '입력자',
      field: 'field07',
      flex: 0.7,
      cellClass: 'flex! items-center! justify-center!' 
    },
    {
      headerName: '삭제여부',
      field: 'isCheck',
      flex: 0.7,
      cellClass: 'editable-cell',
      cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
      cellEditor: 'agCheckboxCellEditor',     // ag-Grid 기본 체크박스 에디터 사용
      editable: true,
    },
    {
      headerName: '비고',
      field: 'field09',
      flex: 1.5,
      editable: true,
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
          caption="장기신계약 조회 테이블"
          cols={[
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'보종군'}>
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
            <FormCell title={'적용사항'}>
              <NativeSelect
                aria-label="적용사항 선택"
                width="23rem"
                value={form.type02}
                onChange={(e) => setFormField('type02', e.target.value)}
                required
              >
                {[
                  { value: 'selection', id: 'type02-1', label: '선택' },
                  { value: 'selection2', id: 'type02-2', label: '(개인영업-전속)청약서류출력제한' },
                  { value: 'selection3', id: 'type02-3', label: '(개인영업-교차)청약서류출력제한' },
                  { value: 'selection4', id: 'type02-4', label: '(전략영업)청약서류출력제한' },
                  { value: 'selection5', id: 'type02-5', label: '(개인영업-전속)휴대폰전자서명요청제한' },
                  { value: 'selection6', id: 'type02-6', label: '(개인영업-교차)휴대폰전자서명요청제한' },
                  { value: 'selection7', id: 'type02-7', label: '(전략영업-전속)휴대폰전자서명요청제한' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'조회일자'}>
              <DatePickerInput mode="range" onChange={() => {}} rangeValue={{ from: '2026-02', to: '2026-03' }} size="md" width="sm" required />
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

export const LTPA190Story: Story = {
  render: () => <LTPA190 />,
};

export const LTPA190NoData: Story = {
  render: () => <LTPA190 isNoData={true} />,
};