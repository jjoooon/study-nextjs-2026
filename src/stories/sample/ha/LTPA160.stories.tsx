import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';

import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, CellSpanModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

ModuleRegistry.registerModules([AllCommunityModule, CellSpanModule]);


const meta: Meta = {
  title: 'Sample/Ha/전환_인수지침_심사_0323/LTPA160',
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
            <h2>가입설계 &gt; 계약사항 입력 &gt; 피보험자별누적조회 P4</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

const LTPA160 = () => {
  type DummyDataType = {
    id: number;
    accName: string;
    accRisk: string;
    accDesignAmt: string;
    accTotalAmt: string;
    upperAccName: string;
    upperAccRisk: string;
    upperDesignAmt: string;
    upperTotalAmt: string;
  };

  const DummyData: DummyDataType[] = [
    { 
      id: 1, 
      accName: '상해사망후유', 
      accRisk: '일반상해사망',                    
      accDesignAmt: '1,000,000', 
      accTotalAmt: '1,000,000', 
      upperAccName: '상해사망후유', 
      upperAccRisk: '일반상해사망',                    
      upperDesignAmt: '1,000,000', 
      upperTotalAmt: '1,000,000',
    },
    { 
      id: 2, 
      accName: '상해사망후유', 
      accRisk: '일반상해사망후유장애',                    
      accDesignAmt: '1,000,000', 
      accTotalAmt: '1,000,000', 
      upperAccName: '상해사망후유', 
      upperAccRisk: '일반상해사망후유장애',                    
      upperDesignAmt: '1,000,000', 
      upperTotalAmt: '1,000,000' 
    },
    { 
      id: 3, 
      accName: '상해사망후유', 
      accRisk: '교통상해사망',                    
      accDesignAmt: '1,000,000', 
      accTotalAmt: '1,000,000', 
      upperAccName: '상해사망후유', 
      upperAccRisk: '교통상해사망',                    
      upperDesignAmt: '1,000,000', 
      upperTotalAmt: '1,000,000' 
    },
    { 
      id: 4, 
      accName: '특정상해',    
      accRisk: '통합상해진단비(경증)(연1회한)',     
      accDesignAmt: '1,000,000', 
      accTotalAmt: '1,000,000', 
      upperAccName: '특정상해',    
      upperAccRisk: '통합상해진단비(경증)(연1회한)',                    
      upperDesignAmt: '1,000,000', 
      upperTotalAmt: '1,000,000' 
    },
    { 
      id: 5, 
      accName: '특정상해',    
      accRisk: '통합상해진단비(중증)(연1회한)',     
      accDesignAmt: '1,000,000', 
      accTotalAmt: '1,000,000', 
      upperAccName: '특정상해',    
      upperAccRisk: '통합상해진단비(중증)(연1회한)',                    
      upperDesignAmt: '1,000,000', 
      upperTotalAmt: '1,000,000' 
    },
    { 
      id: 6, 
      accName: '특정상해',    
      accRisk: '골절진단+통합상해진단(중등증)(합)', 
      accDesignAmt: '1,000,000', 
      accTotalAmt: '1,000,000', 
      upperAccName: '특정상해',    
      upperAccRisk: '골절진단+통합상해진단(중등증)(합)',                    
      upperDesignAmt: '1,000,000', 
      upperTotalAmt: '1,000,000' 
    },
  ];

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '누적명',
      field: 'accName',
      flex: 1,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      spanRows: true,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center bg-white!`,
    },
    {
      headerName: '누적위험명',
      field: 'accRisk',
      width: 250,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-center bg-white!`,
    },
    {
      headerName: '설계별 누적금액',
      field: 'accDesignAmt',
      flex: 1,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '전체누적금액',
      field: 'accTotalAmt',
      flex: 1,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '상위누적명',
      field: 'upperAccName',
      flex: 1,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      spanRows: true,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center bg-white!`,
    },
    {
      headerName: '누적위험명',
      field: 'upperAccRisk',
      width: 250,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-center bg-white!`,
    },
    {
      headerName: '설계별 누적금액',
      field: 'upperDesignAmt',
      flex: 1,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '전체누적금액',
      field: 'upperTotalAmt',
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
        <FormTable caption="피보험자의 위험별 누적 테이블" cols={['w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1',]}>
          <FormRow>
            <FormCell title={'상위누적명'}>
              전기공학 개발자 및 연구원
            </FormCell>
            <FormCell title={'급수/등급'}>
              2/B
            </FormCell>
            <FormCell title={'회사'}>
              전기공학 개발자 및 연구원
            </FormCell>
            <FormCell title={'직무'}>
              전기공학 개발자 및 연구원
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType>
            // getRowId 적용: id 필드를 고유 식별자로 사용
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: false }}
            enableCellSpan={true}
            // animateRows={true}
            // alwaysShowHorizontalScroll={true}
            // singleClickEdit={true}
          />
        </div>
      </Grow>
    </Gcol>
  );
};

type Story = StoryObj<typeof meta>;

export const Page4: Story = {
  render: () => <LTPA160/>,
};



// 피보험자누적위험조회 팝업
const LTPA160_P = () => {
  type DummyDataType = {
    id: number;
    accName: string;
    accRisk: string;
    accDesignAmt: string;
    accTotalAmt: string;
  };

  const DummyData: DummyDataType[] = [
    { 
      id: 1, 
      accName: '상해사망후유', 
      accRisk: '일반상해사망',                    
      accDesignAmt: '1,000,000', 
      accTotalAmt: '1,000,000', 
    },
    { 
      id: 2, accName: '상해사망후유', 
      accRisk: '일반상해사망후유장애',                    
      accDesignAmt: '1,000,000', 
      accTotalAmt: '1,000,000', 
    },
    { 
      id: 3, accName: '상해사망후유', 
      accRisk: '교통상해사망',                    
      accDesignAmt: '1,000,000', 
      accTotalAmt: '1,000,000', 
    },
    { 
      id: 4, accName: '특정상해',    
      accRisk: '통합상해진단비(경증)(연1회한)',     
      accDesignAmt: '1,000,000', 
      accTotalAmt: '1,000,000', 
    },
    { 
      id: 5, accName: '특정상해',    
      accRisk: '통합상해진단비(중증)(연1회한)',     
      accDesignAmt: '1,000,000', 
      accTotalAmt: '1,000,000', 
    },
    { 
      id: 6, accName: '특정상해',    
      accRisk: '골절진단+통합상해진단(중등증)(합)', 
      accDesignAmt: '1,000,000', 
      accTotalAmt: '1,000,000', 
    },
  ];

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '상위누적명',
      field: 'accName',
      flex: 1,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: false,
      spanRows: true,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center bg-white!`,
    },
    {
      headerName: '누적위험명',
      field: 'accRisk',
      width: 350,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: false,
      cellClass: `text-center flex items-center justify-center bg-white!`,
    },
    {
      headerName: '설계별 누적금액',
      field: 'accDesignAmt',
      flex: 1,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: false,
      cellClass: `text-right flex items-center justify-end bg-white!`,
    },
    {
      headerName: '전체누적금액',
      field: 'accTotalAmt',
      flex: 1,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: false,
      cellClass: `text-right flex items-center justify-end bg-white!`,
    },
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Gcol className="w-full gap-[1.2rem]">
      <Grow className="w-full">
        <FormTable caption="피보험자의 위험별 누적 테이블" cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]','min-w-[32.6rem] flex-1']}>
          <FormRow>
          <FormCell title={'상품명'}  colSpan={3}>
            한화 더 건강한 1040 종합건강보험
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'피보험자명'}>
            <NativeSelect
              onChange={() => {}}
              size="md"
              value=""
              width="full"
            >
              <NativeSelectOption value="김한화">
                김한화(890823-1******)
              </NativeSelectOption>
              <NativeSelectOption value="박한화">
                박한화(890823-1******)
              </NativeSelectOption>
              <NativeSelectOption value="최한화">
                최한화(890823-1******)
              </NativeSelectOption>
              <NativeSelectOption value="이한화">
                이한화(890823-1******)
              </NativeSelectOption>
            </NativeSelect>
          </FormCell>
          <FormCell title={'급수/등급'}>
            2/B
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'직업'} colSpan={3}>
            전기공학 개발자 및 연구원
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'회사'}>
            전기공학 개발자 및 연구원
          </FormCell>
          <FormCell title={'직무'}>
            전기공학 개발자 및 연구원
          </FormCell>
        </FormRow>
        </FormTable>
      </Grow>
      <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType>
            // getRowId 적용: id 필드를 고유 식별자로 사용
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: false }}
            enableCellSpan={true}
          />
        </div>
      </Grow>
    </Gcol>
  );
};

export const Page5: Story = {
  render: () => <LTPA160_P/>,
};