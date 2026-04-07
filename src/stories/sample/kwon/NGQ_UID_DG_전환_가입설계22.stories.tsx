import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { createCellValueChangedHandler, AgGridEmptyComponent } from '@aggrid';
import { FormCell, FormRow, FormTable } from '@common/FormTable';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/22_특정부위부담입력',
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
            <h2>LTPA061</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPA061P = () => {
  // dummy data
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
    { id: 1, isCheck: true, field01: '', field02: '', field03: '', field04: '', field05: ''},
    { id: 2, isCheck: false, field01: '', field02: '', field03: '', field04: '', field05: ''},
    { id: 3, isCheck: false, field01: '', field02: '', field03: '', field04: '', field05: ''},
    { id: 4, isCheck: false, field01: '', field02: '', field03: '', field04: '', field05: ''},
    { id: 5, isCheck: false, field01: '', field02: '', field03: '', field04: '', field05: ''},
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '분류',
      width: 100,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true      
    },
    {
      headerName: '대상이 되는 부위',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true
    },
    {
      headerName: '부담보기간',
      width: 100,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '부담보사유',
      flex: 1,
      field: 'field04',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '수정',
      width: 100,
      field: 'field05',
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
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );
    
  return (
    <Gcol className="w-full">
       <Grow className='w-full' variant="box-round">
        <FormTable variant={'none'} caption="증권번호" cols={['w-[14rem] min-w-[14rem]']}>
          <FormRow>
            <FormCell title={'증권번호'}>
              <Grow gap={2}>
                <Typo variant={'body-sm'}>LA230502908490238</Typo> 
                <Typo variant={'body-sm'}>한화 더 건강한 한아름종합보험2601</Typo>
              </Grow>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <div className="ag-theme-alpine aggrid-pagination-ko w-full">
        <AgGridReact<DummyDataType>
          getRowId={params => String(params.data.id)}
          noRowsOverlayComponent={AgGridEmptyComponent}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ 
            sortable: false,
            resizable: false,
          }}
          domLayout="autoHeight" 
          // 체크박스 시
          rowSelection={{
            mode: 'singleRow',
            checkboxes: true,
            enableClickSelection: true,
          }}
          selectionColumnDef={{
            headerName: '선택',
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
      <div className="ag-theme-alpine aggrid-pagination-ko w-full">
        <AgGridReact<DummyDataType>
          getRowId={params => String(params.data.id)}
          noRowsOverlayComponent={AgGridEmptyComponent}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ 
            sortable: false,
            resizable: false,
          }}
          domLayout="autoHeight" 
          // 체크박스 시
          rowSelection={{
            mode: 'singleRow',
            checkboxes: true,
            enableClickSelection: true,
          }}
          selectionColumnDef={{
            headerName: '선택',
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
  );
}
export const Ltpa061: Story = {
  render: () => <LTPA061P />,
}