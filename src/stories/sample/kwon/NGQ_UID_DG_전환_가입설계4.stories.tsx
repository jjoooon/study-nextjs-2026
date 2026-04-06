import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Gcol, Grow } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent } from '@/shared/components/agGridUtils';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InfoBox } from '@common/InfoBox';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/4_청약불가 사전안내',
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
            <h2>LTPA390</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPA390P = () => {
  // dummy data
  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, field01: '', field02: '', field03: '',},
    { id: 2, field01: '', field02: '', field03: '',},
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: 'No',
      width: 80,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,   
    },
    {
      headerName: '피보험자',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '위배내용',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
  ];
  
  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  
  return (
    <Gcol className="w-full">
      <Grow className='w-full' variant="box-round">
        <FormTable variant='none' caption="설계번호" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={'설계번호'}>
              LA1212312312312
            </FormCell>
          </FormRow>
        </FormTable>  
      </Grow>
      <InfoBox title="아래 내용은 청약완료시까지 해소되지 않을경우 수납이 불가능합니다.(청양완료 불가)" variant="info" bg={false} />
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
        />
      </div>
    </Gcol>
  );
}
export const LTPA390: Story = {
  render: () => <LTPA390P />,
}