import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { createCellValueChangedHandler, AgGridEmptyComponent } from '@/shared/components/agGridUtils';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/3_가입설계도우미 알림톡발송',
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

const LTPA351P = () => {
  // dummy data
  type DummyDataType = {
    id: number;
    isCheck: boolean;
    field01: string | number;
    field02: string | number;
    field03: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: true, field01: '취급자', field02: '안손보', field03: '010-2345-6789',},
    { id: 2, isCheck: false, field01: '계약자', field02: '김한화', field03: '010-2345-6789',},
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '구분',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true      
    },
    {
      headerName: '성명',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true
    },
    {
      headerName: '휴대폰번호',
      flex: 1,
      field: 'field03',
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
export const LTPA351: Story = {
  render: () => <LTPA351P />,
}