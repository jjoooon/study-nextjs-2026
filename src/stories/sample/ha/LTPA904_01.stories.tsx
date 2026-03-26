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
  title: 'Sample/Ha/전환_인수지침_심사_0323/LTPA904_01',
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
            <h2>가입설계 &gt; 설계데이터조회 &gt; 추천보험료 P139</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

const LTPA904_01 = () => {
  type DummyDataType = {
    id: number;
    payment01: string | number;
    payment02: string | number;
    payment03: string | number;
    payment04: string | number;
    payment05: string | number;
    payment06: string | number;
    payment07: string | number;
    payment08: string | number;
    payment09: string | number;
    payment10: string | number;
    payment11: string | number;
    payment12: string | number;
    payment13: string | number;
    payment14: string | number;
    payment15: string | number;
    payment16: string | number;
    payment17: string | number;
    payment18: string | number;
    payment19: string | number;
    payment20: string | number;
    payment21: string | number;
    payment22: string | number;
    payment23: string | number;
    payment24: string | number;
    payment25: string | number;
    payment26: string | number;
    payment27: string | number;
    payment28: string | number;
    payment29: string | number;
    payment30: string | number;
    payment31: string | number;
    payment32: string | number;
    payment33: string | number;
    payment34: string | number;
    payment35: string | number;
    payment36: string | number;
    payment37: string | number;
    payment38: string | number;
  };

  const DummyData: DummyDataType[] = [
    { 
      id: 1,
      payment01: '', 
      payment02: '',                    
      payment03: '', 
      payment04: '', 
      payment05: '', 
      payment06: '', 
      payment07: '', 
      payment08: '', 
      payment09: '', 
      payment10: '', 
      payment11: '', 
      payment12: '', 
      payment13: '', 
      payment14: '', 
      payment15: '', 
      payment16: '', 
      payment17: '', 
      payment18: '', 
      payment19: '', 
      payment20: '', 
      payment21: '', 
      payment22: '', 
      payment23: '', 
      payment24: '', 
      payment25: '', 
      payment26: '', 
      payment27: '', 
      payment28: '', 
      payment29: '', 
      payment30: '', 
      payment31: '', 
      payment32: '', 
      payment33: '', 
      payment34: '', 
      payment35: '', 
      payment36: '', 
      payment37: '', 
      payment38: '', 
    },
    { 
      id: 2,
      payment01: '', 
      payment02: '',                    
      payment03: '', 
      payment04: '', 
      payment05: '', 
      payment06: '', 
      payment07: '', 
      payment08: '', 
      payment09: '', 
      payment10: '', 
      payment11: '', 
      payment12: '', 
      payment13: '', 
      payment14: '', 
      payment15: '', 
      payment16: '', 
      payment17: '', 
      payment18: '', 
      payment19: '', 
      payment20: '', 
      payment21: '', 
      payment22: '', 
      payment23: '', 
      payment24: '', 
      payment25: '', 
      payment26: '', 
      payment27: '', 
      payment28: '', 
      payment29: '', 
      payment30: '', 
      payment31: '', 
      payment32: '', 
      payment33: '', 
      payment34: '', 
      payment35: '', 
      payment36: '', 
      payment37: '', 
      payment38: '', 
    },
    { 
      id: 3,
      payment01: '', 
      payment02: '',                    
      payment03: '', 
      payment04: '', 
      payment05: '', 
      payment06: '', 
      payment07: '', 
      payment08: '', 
      payment09: '', 
      payment10: '', 
      payment11: '', 
      payment12: '', 
      payment13: '', 
      payment14: '', 
      payment15: '', 
      payment16: '', 
      payment17: '', 
      payment18: '', 
      payment19: '', 
      payment20: '', 
      payment21: '', 
      payment22: '', 
      payment23: '', 
      payment24: '', 
      payment25: '', 
      payment26: '', 
      payment27: '', 
      payment28: '', 
      payment29: '', 
      payment30: '', 
      payment31: '', 
      payment32: '', 
      payment33: '', 
      payment34: '', 
      payment35: '', 
      payment36: '', 
      payment37: '', 
      payment38: '', 
    },
    
  ];

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '납입회차',
      field: 'payment01',
      width: 120,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      spanRows: false,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center bg-white!`,
    },
    {
      headerName: '납입_응당일',
      field: 'payment02',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-center bg-white!`,
    },
    {
      headerName: '계약_영업보험료',
      field: 'payment03',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '계약_영업보험료_이전',
      field: 'payment04',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립보험료',
      field: 'payment05',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center bg-white!`,
    },
    {
      headerName: '적립보험료 이전',
      field: 'payment06',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-center bg-white!`,
    },
    {
      headerName: '계약_적용보험료',
      field: 'payment07',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '계약_적용보험료_이전',
      field: 'payment08',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '계약_할인_보험료',
      field: 'payment09',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '계약_할인_보험료_이전',
      field: 'payment10',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '담보_적용보험료_합계',
      field: 'payment11',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '담보_적용보험료_합계_이전',
      field: 'payment12',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '할인_적립_담보_보험료',
      field: 'payment13',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '할인_적립_담보_보험료_이전',
      field: 'payment14',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립순보험료',
      field: 'payment15',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립순보험료_이전',
      field: 'payment16',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립_계수_01',
      field: 'payment17',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립_계수_02',
      field: 'payment18',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립금',
      field: 'payment19',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '실손의료비예상납입보험료',
      field: 'payment20',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립보험료대체납입특약보험료',
      field: 'payment21',
      width: 200,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '신계약비초년도영업보험료비율[α1]',
      field: 'payment22',
      width: 220,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '신계약비초년도영업보험료비율[α2]',
      field: 'payment23',
      width: 220,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '신계약비가입금액비율[αs]',
      field: 'payment24',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '신계약비일정금액[αc]',
      field: 'payment25',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '손해조사비차감유지비율[β(a%)]',
      field: 'payment26',
      width: 200,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '손해조사비차감유지한도비율[β(b%)]',
      field: 'payment27',
      width: 230,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '완납전유지비년납한도금액[β(c)]',
      field: 'payment28',
      width: 200,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '완납전유지비일정금액[βc]',
      field: 'payment29',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '수금비영업보험료비율[β5]',
      field: 'payment30',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '손해조사비율[Ce(a%)]',
      field: 'payment31',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '손해조사비고정금액[Ce(c)]',
      field: 'payment32',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '회차_라운드_다운_여부',
      field: 'payment33',
      width: 180,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '중도인출금액적립액',
      field: 'payment34',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립대체보험료',
      field: 'payment35',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '준비금대체보험료',
      field: 'payment36',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '할인율납입',
      field: 'payment37',
      width: 150,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '할인율만기',
      field: 'payment38',
      width: 150,
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

export const Page139: Story = {
  render: () => <LTPA904_01/>,
};


