import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InfoBox } from '@common/InfoBox';
import { AgGridEmptyComponent, createCellValueChangedHandler } from '@aggrid';
import { AgGridReact } from 'ag-grid-react';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/14_화재대물배상책임부호선택',
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
            <h2>LTPZ046</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPZ049P   = () => {

  type DummyDataType = {
      id: number;
      isCheck: boolean;
      field01: string | number;
      field02: string | number;
      field03: string | number;
      field04: string | number;
      field05: string | number;
    };
  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: false, field01: '', field02: '', field03: '9,999,999,999', field04: '9,999,999,999', field05: '9,999,999,999' },
    { id: 2, isCheck: false, field01: '', field02: '', field03: '9,999,999,999', field04: '9,999,999,999', field05: '9,999,999,999' },
    { id: 3, isCheck: false, field01: '', field02: '', field03: '9,999,999,999', field04: '9,999,999,999', field05: '9,999,999,999' },
    { id: 4, isCheck: false, field01: '', field02: '', field03: '9,999,999,999', field04: '9,999,999,999', field05: '9,999,999,999' },
    { id: 5, isCheck: false, field01: '', field02: '', field03: '9,999,999,999', field04: '9,999,999,999', field05: '9,999,999,999' },
    { id: 6, isCheck: false, field01: '', field02: '', field03: '9,999,999,999', field04: '9,999,999,999', field05: '9,999,999,999' },
  ];
  
  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '할증담보',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      colSpan: (params: any) => params.data?.isSumRow ? 2 : 1,
      autoHeight: true,   
    },
    {
      headerName: '보험기간',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      colSpan: (params: any) => params.data?.isSumRow ? 0 : 1,
      autoHeight: true,
    },
    {
      headerName: '표준체보험료(원)',
      width: 150,
      field: 'field03',
      cellClass: 'text-right flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '할증보험료(원)',
      flex: 1,
      field: 'field04',
      cellClass: 'text-right flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '적용보험료(원)',
      flex: 1,
      field: 'field05',
      cellClass: 'text-right flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
  ];
    
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const sumRow = React.useMemo(() => {
    const parse = (v: string | number) => {
      if (typeof v === 'number') return v;
      if (!v) return 0;
      const n = Number(String(v).replace(/,/g, ''));
      return Number.isFinite(n) ? n : 0;
    };
    const total03 = rowData.reduce((s, r) => s + parse(r.field03), 0);
    const total04 = rowData.reduce((s, r) => s + parse(r.field04), 0);
    const total05 = rowData.reduce((s, r) => s + parse(r.field05), 0);
  return [{ id: -1, isSumRow: true, field01: '합계', field02: '', field03: total03.toLocaleString(), field04: total04.toLocaleString(), field05: total05.toLocaleString() }];
  }, [rowData]);
      
  

  return(
    <Gcol>
      <Grow className='w-full' variant="box-round">
        <FormTable variant={'none'} caption="설계번호" cols={['w-[14rem] min-w-[14rem]']}>
          <FormRow>
            <FormCell title={'설계번호'}>
              설계번호
            </FormCell>
            <FormCell title={'피보험자'}>
              김한화(900101-1234567)
            </FormCell>  
          </FormRow>
        </FormTable>
      </Grow>
      <Grow className='w-full'>
        <div className="ag-theme-alpine aggrid-pagination-ko w-full">
          <AgGridReact<DummyDataType>
            rowData={rowData}
            columnDefs={columnDefs}
            pinnedBottomRowData={sumRow}
            noRowsOverlayComponent={AgGridEmptyComponent}
            defaultColDef={{ 
              sortable: false,
              resizable: false,
              autoHeight: true,
            }}
            animateRows={false}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            domLayout="autoHeight" 
          />
        </div>
      </Grow>
      <InfoBox subTitle="할증보험료 계산시 발생할 수 있는 1원 미만의 할증보험료는 0원으로 표시되며, 갱신기 변동될 수 있습니다." variant="info" bg={false}>
      </InfoBox>
    </Gcol>    
  )
}
export const Ltpz049: Story = {
  render: () => <LTPZ049P />,

}
