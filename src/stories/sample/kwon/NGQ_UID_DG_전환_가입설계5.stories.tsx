import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent } from '@aggrid';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InfoBox } from '@common/InfoBox';
import { Input } from '@/shared/components/uiux/Input';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/고지유형별 보험료비교',
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
            <h2>LTPA430</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPA430P = () => {
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
      <Gcol className="w-full" variant='box-round'>
        <FormTable caption="설계번호" cols={["w-[14rem] min-w-[14rem]", 'w-auto'] } variant='none'>
          <FormRow>
            <FormCell title={'설계번호'}>
              <Input aria-label="" width={'10rem'} value={'LA26020945959594'} readOnly />
              <div className="separator">-</div>
              <Input aria-label="" width={'3rem'} value={'1'} readOnly />
              <Input aria-label="" width={'30rem'} value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
              <Input aria-label="" width={'10rem'} value={'1형(345간편고지형)'} readOnly />
            </FormCell>
          </FormRow>
        </FormTable>
      </Gcol>
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
export const LTPA430: Story = {
  render: () => <LTPA430P />,
}
