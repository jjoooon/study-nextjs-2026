import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, CellSpanModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Input } from '@uiux/Input';
import { Typo } from '@atoms';

ModuleRegistry.registerModules([AllCommunityModule, CellSpanModule]);

const meta: Meta = {
  title: 'Sample/Ha/NGQ_UID_DG_전환_가입설계_통합가입설계조회_0312',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <br />
          <h2>P5</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

type AccumulationRow = {
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

const rowData: AccumulationRow[] = [
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
    id: 2, accName: '상해사망후유', 
    accRisk: '일반상해사망후유장애',                    
    accDesignAmt: '1,000,000', 
    accTotalAmt: '1,000,000', 
    upperAccName: '상해사망후유', 
    upperAccRisk: '일반상해사망후유장애',                    
    upperDesignAmt: '1,000,000', 
    upperTotalAmt: '1,000,000' 
  },
  { 
    id: 3, accName: '상해사망후유', 
    accRisk: '교통상해사망',                    
    accDesignAmt: '1,000,000', 
    accTotalAmt: '1,000,000', 
    upperAccName: '상해사망후유', 
    upperAccRisk: '교통상해사망',                    
    upperDesignAmt: '1,000,000', 
    upperTotalAmt: '1,000,000' 
  },
  { 
    id: 4, accName: '특정상해',    
    accRisk: '통합상해진단비(경증)(연1회한)',     
    accDesignAmt: '1,000,000', 
    accTotalAmt: '1,000,000', 
    upperAccName: '특정상해',    
    upperAccRisk: '통합상해진단비(경증)(연1회한)',                    
    upperDesignAmt: '1,000,000', 
    upperTotalAmt: '1,000,000' 
  },
  { 
    id: 5, accName: '특정상해',    
    accRisk: '통합상해진단비(중증)(연1회한)',     
    accDesignAmt: '1,000,000', 
    accTotalAmt: '1,000,000', 
    upperAccName: '특정상해',    
    upperAccRisk: '통합상해진단비(중증)(연1회한)',                    
    upperDesignAmt: '1,000,000', 
    upperTotalAmt: '1,000,000' 
  },
  { 
    id: 6, accName: '특정상해',    
    accRisk: '골절진단+통합상해진단(중등증)(합)', 
    accDesignAmt: '1,000,000', 
    accTotalAmt: '1,000,000', 
    upperAccName: '특정상해',    
    upperAccRisk: '골절진단+통합상해진단(중등증)(합)',                    
    upperDesignAmt: '1,000,000', 
    upperTotalAmt: '1,000,000' 
  },
];

const columnDefs: ColDef<AccumulationRow>[] = [
  {
    headerName: '누적명',
    field: 'accName',
    flex: 1,
    sortable: false, 
    filter: false, 
    suppressMovable: true, 
    resizable: false,
    spanRows: true,
    cellClass: 'text-center flex items-center justify-center',
  },
  {
    headerName: '누적위험명',
    field: 'accRisk',
    width: 250,
    sortable: false, 
    filter: false, 
    suppressMovable: true, 
    resizable: false,
    cellClass: 'text-center flex items-center justify-center',
  },
  {
    headerName: '설계별 누적금액',
    field: 'accDesignAmt',
    flex: 1,
    sortable: false, 
    filter: false, 
    suppressMovable: true, 
    resizable: false,
    cellClass: 'text-right flex items-center justify-end',
  },
  {
    headerName: '전체누적금액',
    field: 'accTotalAmt',
    flex: 1,
    sortable: false, 
    filter: false, 
    suppressMovable: true, 
    resizable: false,
    cellClass: 'text-right flex items-center justify-end',
  },
  {
    headerName: '상위누적명',
    field: 'upperAccName',
    flex: 1,
    sortable: false, 
    filter: false, 
    suppressMovable: true, 
    resizable: false,
    spanRows: true,
    cellClass: 'text-center flex items-center justify-center',
  },
  {
    headerName: '누적위험명',
    field: 'upperAccRisk',
    width: 250,
    sortable: false, 
    filter: false, 
    suppressMovable: true, 
    resizable: false,
    cellClass: 'text-center flex items-center justify-center',
  },
  {
    headerName: '설계별 누적금액',
    field: 'upperDesignAmt',
    flex: 1,
    sortable: false, 
    filter: false, 
    suppressMovable: true, 
    resizable: false,
    cellClass: 'text-right flex items-center justify-end',
  },
  {
    headerName: '전체누적금액',
    field: 'upperTotalAmt',
    flex: 1,
    sortable: false, 
    filter: false, 
    suppressMovable: true, 
    resizable: false,
    cellClass: 'text-right flex items-center justify-end',
  },
];

const defaultColDef: ColDef<AccumulationRow> = {
  sortable: false,
  filter: false,
  resizable: false,
  suppressMovable: true,
  cellStyle: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--ag-background-color, white) !important',
  },
};

const AccumulationGrid = () => (
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
      <div
        className="ag-theme-alpine aggrid-pagination-ko w-full h-[26rem]!"
      >
        <AgGridReact<AccumulationRow>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableCellSpan={true}
        />
      </div>
    </Grow>
  </Gcol>
);

export const Page5: Story = {
  parameters: {
    docs: {
      source: {
        code: `
render: () => {
  const rowData: AccumulationRow[] = [
    { id: 1, accName: '상해사망후유', accRisk: '일반상해사망',                    accDesignAmt: '1,000,000', accTotalAmt: '1,000,000', upperAccName: '상해사망후유', upperAccRisk: '일반상해사망',                    upperDesignAmt: '1,000,000', upperTotalAmt: '1,000,000' },
    { id: 2, accName: '상해사망후유', accRisk: '일반상해사망후유장애',             accDesignAmt: '1,000,000', accTotalAmt: '1,000,000', upperAccName: '상해사망후유', upperAccRisk: '일반상해사망후유장애',             upperDesignAmt: '1,000,000', upperTotalAmt: '1,000,000' },
    { id: 3, accName: '상해사망후유', accRisk: '교통상해사망',                    accDesignAmt: '1,000,000', accTotalAmt: '1,000,000', upperAccName: '상해사망후유', upperAccRisk: '교통상해사망',                    upperDesignAmt: '1,000,000', upperTotalAmt: '1,000,000' },
    { id: 4, accName: '특정상해',    accRisk: '통합상해진단비(경증)(연1회한)',     accDesignAmt: '1,000,000', accTotalAmt: '1,000,000', upperAccName: '특정상해',    upperAccRisk: '통합상해진단비(경증)(연1회한)',     upperDesignAmt: '1,000,000', upperTotalAmt: '1,000,000' },
    { id: 5, accName: '특정상해',    accRisk: '통합상해진단비(중증)(연1회한)',     accDesignAmt: '1,000,000', accTotalAmt: '1,000,000', upperAccName: '특정상해',    upperAccRisk: '통합상해진단비(중증)(연1회한)',     upperDesignAmt: '1,000,000', upperTotalAmt: '1,000,000' },
    { id: 6, accName: '특정상해',    accRisk: '골절진단+통합상해진단(중등증)(합)', accDesignAmt: '1,000,000', accTotalAmt: '1,000,000', upperAccName: '특정상해',    upperAccRisk: '골절진단+통합상해진단(중등증)(합)', upperDesignAmt: '1,000,000', upperTotalAmt: '1,000,000' },
  ];
 
  const columnDefs: ColDef<AccumulationRow>[] = [
    { headerName: '누적명',          field: 'accName',        flex: 1,    sortable: false, filter: false, suppressMovable: true, resizable: false, spanRows: true, cellClass: 'text-center flex items-center justify-center' },
    { headerName: '누적위험명',      field: 'accRisk',        width: 250, sortable: false, filter: false, suppressMovable: true, resizable: false, cellClass: 'text-center flex items-center justify-center' },
    { headerName: '설계별 누적금액', field: 'accDesignAmt',   flex: 1,    sortable: false, filter: false, suppressMovable: true, resizable: false, cellClass: 'text-right flex items-center justify-end' },
    { headerName: '전체누적금액',    field: 'accTotalAmt',    flex: 1,    sortable: false, filter: false, suppressMovable: true, resizable: false, cellClass: 'text-right flex items-center justify-end' },
    { headerName: '상위누적명',      field: 'upperAccName',   flex: 1,    sortable: false, filter: false, suppressMovable: true, resizable: false, spanRows: true, cellClass: 'text-center flex items-center justify-center' },
    { headerName: '누적위험명',      field: 'upperAccRisk',   width: 250, sortable: false, filter: false, suppressMovable: true, resizable: false, cellClass: 'text-center flex items-center justify-center' },
    { headerName: '설계별 누적금액', field: 'upperDesignAmt', flex: 1,    sortable: false, filter: false, suppressMovable: true, resizable: false, cellClass: 'text-right flex items-center justify-end' },
    { headerName: '전체누적금액',    field: 'upperTotalAmt',  flex: 1,    sortable: false, filter: false, suppressMovable: true, resizable: false, cellClass: 'text-right flex items-center justify-end' },
  ];
 
  const defaultColDef: ColDef<AccumulationRow> = {
    sortable: false,
    filter: false,
    resizable: false,
    suppressMovable: true,
    cellStyle: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'var(--ag-background-color, white) !important',
    },
  };
 
  return (
    <Gcol className="w-full">
      <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-[26rem]!">
          <AgGridReact<AccumulationRow>
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableCellSpan={true}
          />
        </div>
      </Grow>
    </Gcol>
  );
}
`,
      },
    },
  },
  render: () => <AccumulationGrid />,
};