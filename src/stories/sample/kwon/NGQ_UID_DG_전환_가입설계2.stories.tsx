import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { ResetIcon, SearchIcon } from '@icons';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { createCellValueChangedHandler, AgGridEmptyComponent } from '@aggrid';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { useFormFields } from '@hooks/useFormFields';

ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/2_담보별피보험자명세관리',
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
            <h2>LTPA296</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPA296P = () => {
  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
  });
  
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
  };
  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: true, field01: 'Text', field02: '10명', field03: '남성', field04: '35세', field05: '31110', field06: '회사 사무직 종사자', field07: '1/A', field08: '', field09: '999,999,999', field10: '3명', },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '그룹명',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true      
    },
    {
      headerName: '인원',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true
    },
    {
      headerName: '성별',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center editable-cell px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['남자', '여자'] },
    },
    {
      headerName: '평균연령',
      flex: 1,
      field: 'field04',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true
    },
    {
      headerName: '직업코드',
      flex: 1,
      field: 'field05',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Grow className="w-full px-1" >
          <div className='flex-1'>31100</div>
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
            <SearchIcon />
          </Button>
        </Grow>
      ),

    },
    {
      headerName: '직업명',
      flex: 1,
      field: 'field06',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '급수',
      flex: 1,
      field: 'field07',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '운전용도',
      flex: 1,
      field: 'field08',
      cellClass: 'text-center editable-cell px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Text', 'Text'] },
    },
    {
      headerName: '보험료',
      flex: 1,
      field: 'field09',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '등록인원',
      flex: 1,
      field: 'field10',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
  ];
  
  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [errorRows, setErrorRows] = React.useState<number[]>(
    DummyData.filter(row => !row.isCheck).map(row => row.id)
  );
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>(['isCheck', 'field09'], setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );
    

  // dummy data
  type DummyDataType2 = {
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
    field12: string | number;
    field13: string | number;
    field14: string | number;
    field15: string | number;
    field16: string | number;
    field17: string | number;
    field18: string | number;
    field19: string | number;
    field20: string | number;
    field21: string | number;
  };
  const DummyData2: DummyDataType2[] = [
    { id: 1, isCheck: true, field01: 'Text', field02: '김한화', field03: '', field04: '', field05: '', field06: '부', field07: '', field08: '', field09: '', field10: '', field11: '', field12: '', field13: '', field14: '선택', field15: '선택', field16: '선택', field17: '선택', field18: '', field19: '', field20: '', field21: '',},
  ];

  // AgGrid Column 
  const columnDefs2: (ColDef<DummyDataType2> | ColGroupDef<DummyDataType2>)[] = [
    {
      headerName: '그룹명',
      width: 100,
      field: 'field01',
      cellClass: 'text-center editable-cell px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true, 
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Text', 'Text2'] },   
    },
    {
      headerName: '이름',
      width: 100,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => (
        <Grow className="w-full px-1" >
          <div className='flex-1'>김한화</div>
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
            <SearchIcon />
          </Button>
        </Grow>
      ),
    },
    {
      headerName: '주민등록번호',
      width: 170,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => (
        <Grow className="w-full px-1" >
          <Input aria-label="" width={'100%'} value={'910102-1*******'} required/>
        </Grow>
      ),
    },
    {
      headerName: '전화번호(휴대폰)',
      width: 170,
      field: 'field04',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => (
        <Grow className="w-full px-1" >
          <div className='border rounded-[0.6rem] p-[0.4rem] border-[var(--color-gray-20)]'>010</div>
          <div className='border rounded-[0.6rem] p-[0.4rem] border-[var(--color-gray-20)]'>1233</div>
          <div className='border rounded-[0.6rem] p-[0.4rem] border-[var(--color-gray-20)]'>5678</div>
        </Grow>
      ),
    },
    {
      headerName: '동의',
      width: 100,
      field: 'field05',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '관계',
      width: 100,
      field: 'field06',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['부', '모'] },   
    },
    {
      headerName: '연령',
      width: 100,
      field: 'field07',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '급수',
      width: 100,
      field: 'field08',
      cellClass: 'text-center editable-cell px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Text', 'Text'] },
    },
    {
      headerName: '보험료',
      width: 100,
      field: 'field09',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '직업',
      width: 100,
      field: 'field10',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => (
        <Grow className="w-full px-1" >
          <div className='flex-1'>1231234</div>
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
            <SearchIcon />
          </Button>
        </Grow>
      ),
    },
    {
      headerName: '직업명',
      width: 100,
      field: 'field11',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '업종',
      width: 100,
      field: 'field12',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '직무',
      width: 100,
      field: 'field13',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '운전형태',
      width: 100,
      field: 'field14',
      cellClass: 'text-center editable-cell px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true, 
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '선택2'] },
    },
    {
      headerName: '이륜차',
      width: 100,
      field: 'field15',
      cellClass: 'text-center editable-cell px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true, 
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '선택2'] },
    },
    {
      headerName: '병력여부',
      width: 100,
      field: 'field16',
      cellClass: 'text-center editable-cell px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true, 
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '선택2'] },
    },
    {
      headerName: '치아병력',
      width: 100,
      field: 'field17',
      cellClass: 'text-center editable-cell px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true, 
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '선택2'] },
    },
    {
      headerName: '알릴사항',
      width: 100,
      field: 'field18',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true, 
    },
    {
      headerName: '사망수익자',
      width: 100,
      field: 'field19',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true, 
    },
    {
      headerName: '사망외수익자',
      width: 100,
      field: 'field20',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true, 
    },
    {
      headerName: '보험료',
      width: 100,
      field: 'field21',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true, 
    },
  ];
  
  // rowSelection 사용시
  const [rowData2, setRowData2] = React.useState<DummyDataType2[]>(DummyData2);
  const [errorRows2, setErrorRows2] = React.useState<number[]>(
    DummyData2.filter(row => !row.isCheck).map(row => row.id)
  );
  const onCellValueChanged2 = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType2, number>(['isCheck', 'field09'], setRowData2, setErrorRows2, 'id'),
    [setRowData2, setErrorRows2]
  );
    



  return (
    <Gcol className="w-full" gap={4}>
      <Grow className='w-full' variant="box-round" placement={'bwe'}>
        <FormTable variant={'none'} caption="설계번호" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={'설계번호'}>
              <Input aria-label="" width={'20rem'} value={'대표담보명.text'} readOnly />
            </FormCell>
            <FormCell title={'발행후변경순번'}>
              <Input aria-label="" width={'20rem'} value={'Text'} readOnly />
            </FormCell>
            <FormCell title={'피보험자찾기'}>
              <NativeSelect
                aria-label="설계번호 선택"
                width="10rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
                readOnly
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '전체' },
                  { value: 'selection2', id: 'type01-2', label: '전체2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input aria-label="" width={'20rem'} value={'Text'} readOnly />
            </FormCell>
          </FormRow>
        </FormTable>  
        <Grow>
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
            <ResetIcon />
          </Button>  
          <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">
            조회
          </Button>
        </Grow>
      </Grow>
      <Gcol className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType>
            getRowId={params => String(params.data.id)}
            noRowsOverlayComponent={AgGridEmptyComponent}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ 
              sortable: false,
              resizable: false,
            }}

            // 에디터 시
            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}
            
            // 체크박스 시
            rowSelection={{
              mode: 'multiRow',
              headerCheckbox: true,
              checkboxes: true,
              enableClickSelection: true,
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
      </Gcol>
      <Gcol className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType2>
            getRowId={params => String(params.data.id)}
            noRowsOverlayComponent={AgGridEmptyComponent}
            rowData={rowData2}
            columnDefs={columnDefs2}
            defaultColDef={{ 
              sortable: false,
              resizable: false,
            }}

            // 에디터 시
            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged2}
            
            // 체크박스 시
            rowSelection={{
              mode: 'multiRow',
              headerCheckbox: true,
              checkboxes: true,
              enableClickSelection: true,
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
      </Gcol>  
    </Gcol>
  )
}
export const LTPA296: Story = {
  render: () => <LTPA296P />,
}
