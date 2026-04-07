import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridEmptyComponent, createFieldRenderer } from '@aggrid';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Input } from '@uiux/Input';



ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/6_견종 검색',
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

const LTPA070P = () => {
  // dummy data
  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, field01: '웰시 코기 카디건', field02: 'Welsh Corgi Cardigan' },
    { id: 2, field01: '웰시 코기 펨브로크', field02: 'Welsh Corgi Pembroke' },
    { id: 3, field01: '부비에 데 아르덴', field02: 'Bouvier des Ardennes' },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '견종명',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,   
    },
    {
      headerName: '견종명(영문)',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
  ];
  
  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [breedSearch, setBreedSearch] = React.useState('');
  return(
    <Gcol>
      <Grow className="w-full" variant={'box'}>
        <FormTable variant={'none'} lineTop={false} caption="보험정보" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={'설계번호'}>
              LA24091283409812304
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>

      <Gcol className='w-full'>
        <FormTable caption="보험정보" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={'견종검색(한글명)'}>
              <Input aria-label="견종검색" width={'30rem'} value={breedSearch} onChange={(e) => setBreedSearch(e.target.value)} />
            </FormCell>
          </FormRow>
        </FormTable>
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
    </Gcol>    
  )
}
export const Ltpa070: Story = {
  render: () => <LTPA070P />,

}
