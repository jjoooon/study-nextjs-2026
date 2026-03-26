import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { Input } from '@uiux/Input';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, CellSpanModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule, CellSpanModule]);


const meta: Meta = {
  title: 'Sample/Ha/전환_인수지침_심사_0323/LTPA904_02',
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
            <h2>가입설계 &gt; 설계데이터조회 &gt; 추천보험료 P141</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

const LTPA904_02 = () => {
  type DummyDataType = {
    id: number;
    security01: string | number;
    security02: string | number;
    security03: string | number;
    security04: string | number;
  };

  const DummyData: DummyDataType[] = [
    { 
      id: 1,
      security01: '', 
      security02: '',                    
      security03: '', 
      security04: '', 
    },
    { 
      id: 2,
      security01: '', 
      security02: '',                    
      security03: '', 
      security04: '', 
    },
    { 
      id: 3,
      security01: '', 
      security02: '',                    
      security03: '', 
      security04: '', 
    },
    
  ];

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '납입회차',
      field: 'security01',
      flex: 1,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      spanRows: false,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center bg-white!`,
    },
    {
      headerName: '납입_응당일',
      field: 'security02',
      flex: 1,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-center bg-white!`,
    },
    {
      headerName: '계약_영업보험료',
      field: 'security03',
      flex: 1,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '계약_영업보험료_이전',
      field: 'security04',
      flex: 1,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Gcol className="w-full gap-[1.2rem]">
      <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType>
            // getRowId 적용: id 필드를 고유 식별자로 사용
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: false }}
            enableCellSpan={true}
            alwaysShowHorizontalScroll={true}
          />
        </div>
      </Grow>
      <Grow className="w-full">
        <FormTable caption="예상만기환급금 테이블" cols={['w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1',]}>
          <FormRow>
            <FormCell title={'총예상납입보험료'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
              />
              원
            </FormCell>
            <FormCell title={'중도환급금'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
              />
              원
            </FormCell>
            <FormCell title={'예상만기환급금'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
              />
              원
            </FormCell>
            <FormCell title={'예상만기환급율'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
              />
              %
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <Grow className="w-full">
        <FormTable caption="추천보험료 테이블" cols={['w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1',]}>
          <FormRow>
            <FormCell title={'추천보험료'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
              />
              원
            </FormCell>
            <FormCell title={'최소추천(출생후)'} colSpan={5}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="20.2rem"
              />
              원
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'최소추천보험료'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
              />
              원
            </FormCell>
            <FormCell title={'최소예상만기환급율'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
              />
              %
            </FormCell>
            <FormCell title={'최대추천보험료'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
              />
              원
            </FormCell>
            <FormCell title={'최대예상만기환급율'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
              />
              %
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <Grow className="w-full">
        <FormTable caption="기타 테이블" cols={['w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1',]}>
          <FormRow>
            <FormCell title={'만기환급담보환급금'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
              />
              원
            </FormCell>
            <FormCell title={'적립보험료대체납입특약보험료'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
              />
              원
            </FormCell>
            <FormCell title={'실손의료비예상납입보험료'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
              />
              원
            </FormCell>
            <FormCell title={'만기유지보너스'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
              />
              원
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
    </Gcol>
    
  );
};

type Story = StoryObj<typeof meta>;

export const Page141: Story = {
  render: () => <LTPA904_02/>,
};


