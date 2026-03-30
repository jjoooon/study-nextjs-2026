import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Input } from '@uiux/Input';
import { AgGridEmptyComponent, createCellValueChangedHandler } from '@/shared/components/aggrid/aggridComponents';
import { AgGridReact } from 'ag-grid-react';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/12_화재대물배상책임부호선택',
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

const LTPZ046P   = () => {

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
      { id: 1, isCheck: false, field01: '', field02: '', field03: '', field04: '9,999,999,999', field05: '9,999,999,999' },
      { id: 2, isCheck: false, field01: '', field02: '', field03: '', field04: '9,999,999,999', field05: '9,999,999,999' },
      { id: 3, isCheck: false, field01: '', field02: '', field03: '', field04: '9,999,999,999', field05: '9,999,999,999' },
      { id: 4, isCheck: false, field01: '', field02: '', field03: '', field04: '9,999,999,999', field05: '9,999,999,999' },
      { id: 5, isCheck: false, field01: '', field02: '', field03: '', field04: '9,999,999,999', field05: '9,999,999,999' },
      { id: 6, isCheck: false, field01: '', field02: '', field03: '', field04: '9,999,999,999', field05: '9,999,999,999' },
    ];
  
    // AgGrid Column 
    const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
      {
        headerName: '부호',
        width: 80,
        field: 'field01',
        cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        autoHeight: true,   
      },
      {
        headerName: '구분',
        flex: 1,
        field: 'field02',
        cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        autoHeight: true,
      },
      {
        headerName: '급수',
        width: 150,
        field: 'field03',
        cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
        autoHeight: true,
      },
      {
        headerName: '목적물가입금액',
        flex: 1,
        field: 'field04',
        cellClass: 'text-right flex [&>div>span]:h-auto!',
        autoHeight: true,
      },
      {
        headerName: '가입금액',
        flex: 1,
        field: 'field05',
        cellClass: 'text-right flex [&>div>span]:h-auto!',
        autoHeight: true,
      },
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
      <Grow className='w-full' variant="box-round">
        <FormTable variant={'none'} caption="설계번호" cols={['w-[14rem] min-w-[14rem]']}>
          <FormRow>
            <FormCell title={'설계번호'}>
              <Grow gap={2}>
                <Typo variant={'body-sm'}>설계번호</Typo> 
                <Typo variant={'body-sm'}>설계번호의 상품명</Typo>
              </Grow>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <Grow className='w-full'>
        <div className="ag-theme-alpine aggrid-pagination-ko w-full">
          <AgGridReact<DummyDataType>
            rowData={rowData}
            columnDefs={columnDefs}
            noRowsOverlayComponent={AgGridEmptyComponent}
            defaultColDef={{ 
              sortable: false,
              resizable: false,
              autoHeight: true,
            }}
            animateRows={false}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}
            rowSelection={{
              mode: 'singleRow',
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
      </Grow>
      <Grow className='w-full'>
        <FormTable caption="담보" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={'담보명'}>
              <Input size="lg" value="" variant="default" width="18rem" readOnly/>
            </FormCell>
            <FormCell title={'담보명'}>
              <Input size="lg" value="0" variant="default" width="18rem" after="만원" commaAmount readOnly/>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
    </Gcol>    
  )
}
export const LTPZ046: Story = {
  render: () => <LTPZ046P />,

}
