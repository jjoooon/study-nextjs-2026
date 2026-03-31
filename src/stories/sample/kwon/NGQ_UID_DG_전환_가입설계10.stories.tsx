import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent, createCellValueChangedHandler } from '@aggrid';
import { Input } from '@/shared/components/uiux/Input';
import { ResetIcon, SearchIcon } from '@/shared/components/icons/CommonIcons';  
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { NativeSelect, NativeSelectOption } from '@/shared/components/uiux/NativeSelect';
import { Button } from '@/shared/components/uiux/Button';
import { useFormFields } from '@/shared/hooks/useFormFields';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/10_은행유자격자조회',
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
            <h2>LTPZ042</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPZ042P = () => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
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
  };
  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: false, field01: '123456', field02: '한화생명1', field03: '123', field04: '서울', field05: '123', field06: '김한화' },
    { id: 2, isCheck: false, field01: '123456', field02: '한화생명1', field03: '124', field04: '서울', field05: '123', field06: '김한화' },
    { id: 3, isCheck: false, field01: '123456', field02: '한화생명1', field03: '125', field04: '서울', field05: '123', field06: '김한화' },
    { id: 4, isCheck: false, field01: '123456', field02: '한화생명1', field03: '126', field04: '서울', field05: '123', field06: '김한화' },
    { id: 5, isCheck: false, field01: '123456', field02: '한화생명1', field03: '127', field04: '서울', field05: '123', field06: '김한화' },
    { id: 6, isCheck: false, field01: '123456', field02: '한화생명1', field03: '128', field04: '서울', field05: '123', field06: '김한화' },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '직원번호',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,   
    },
    {
      headerName: '직원명',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '지점번호',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '지점명',
      flex: 1,
      field: 'field04',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '유자격자번호',
      flex: 1,
      field: 'field05',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '유자격자명',
      flex: 1,
      field: 'field06',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    }
  ];
  
   const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
    const [errorRows, setErrorRows] = React.useState<number[]>(
      DummyData.filter(row => !row.isCheck).map(row => row.id)
    );
  
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );
  
  return(
    <Gcol>
      <Grow className='w-full' variant="box-round" placement={'bwe'}>
        <FormTable variant={'none'} caption="설계번호" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={'조회구분'}>
              <NativeSelect
                aria-label="조회구분 선택"
                width="10rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '유자격자' },
                  { value: 'selection2', id: 'type01-2', label: '직원번호' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'유자격자명'}>
              <Input aria-label="유자격자명 입력" width={'16rem'} value={form.type02} onChange={(e) => setFormField('type02', e.target.value)} />
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

      <Gcol className='w-full'>
        <div className="ag-theme-alpine aggrid-pagination-ko w-full">
          <AgGridReact<DummyDataType>
            rowData={rowData}
            columnDefs={columnDefs}
            noRowsOverlayComponent={AgGridEmptyComponent}
            defaultColDef={{ sortable: false }}
            animateRows={false}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}
            rowSelection={{
              mode: 'multiRow',
              checkboxes: true,
              enableClickSelection: false,
            }}
            selectionColumnDef={{
              headerName: '선택',
            }}
            rowClassRules={{}}
            onGridReady={params => {
              params.api.forEachNode(node => {
                if (node.data?.isCheck) {
                  node.setSelected(true);
                }
              });
            }}
            domLayout="autoHeight" 
          />
        </div>
      </Gcol>
    </Gcol>    
  )
}
export const LTPZ042: Story = {
  render: () => <LTPZ042P />,

}
