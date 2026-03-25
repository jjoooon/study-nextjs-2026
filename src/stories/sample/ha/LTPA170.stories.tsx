import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/Ha/전환_인수지침_심사_0323/LTPA170',
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
            <h2>가입설계 &gt; 계약사항 입력 &gt; 피보험자세부누적위험조회 P6</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

const LTPA170 = () => {
  type DummyDataType = {
    id: number;
    riskName: string;
    accAmount: string;
    securityName: string;
    planNumber: string;
    productName: string;
    insurancePeriod: string;
    insuranceTermination: string;
    lastMonth: string;
    designState: string;
  };

  const DummyData: DummyDataType[] = [
    { 
      id: 1, 
      riskName: '영구치상실위로금', 
      accAmount: '1,000,000',                    
      securityName: '보통약관(영구치상실발생금Ⅱ(상해및질병))', 
      planNumber: 'LA2602043 10787-1', 
      productName: '한화 하얀미소플러스치아보험Ⅱ 무배당..', 
      insurancePeriod: '2026-02-04',                    
      insuranceTermination: '2026-02-04', 
      lastMonth: '',
      designState: '청약중',
    },
    { 
      id: 2, 
      riskName: '치아보철치료비', 
      accAmount: '1,000,000',                    
      securityName: '보통약관(영구치보철치료비Ⅲ(무제한,틀니연간1개한))상...', 
      planNumber: 'LA2602043 10787-1', 
      productName: '한화 하얀미소플러스치아보험Ⅱ 무배당..', 
      insurancePeriod: '2026-02-04',                    
      insuranceTermination: '2026-02-04', 
      lastMonth: '',
      designState: '청약중',
    },
    { 
      id: 3, 
      riskName: '치아보존치료비', 
      accAmount: '1,000,000',                    
      securityName: '보통약관(특정치석제거(스케일링)치료비(연간1회한,급여))', 
      planNumber: 'LA2602043 10787-1', 
      productName: '한화 하얀미소플러스치아보험Ⅱ 무배당..', 
      insurancePeriod: '2026-02-04',                    
      insuranceTermination: '2026-02-04', 
      lastMonth: '',
      designState: '청약중',
    },
    { 
      id: 4, 
      riskName: '치수치료비', 
      accAmount: '1,000,000',                    
      securityName: '보통약관(주요치주질환(잇몸질환)치료비(급여))', 
      planNumber: 'LA2602043 10787-1', 
      productName: '한화 하얀미소플러스치아보험Ⅱ 무배당..', 
      insurancePeriod: '2026-02-04',                    
      insuranceTermination: '2026-02-04', 
      lastMonth: '',
      designState: '청약중',
    },
    { 
      id: 5, 
      riskName: '특정치석제거치료비', 
      accAmount: '1,000,000',                    
      securityName: '보통약관(영구치보철치료비Ⅲ(무제한,틀니연간1개한)(상..', 
      planNumber: 'LA2602043 10787-1', 
      productName: '한화 하얀미소플러스치아보험Ⅱ 무배당..', 
      insurancePeriod: '2026-02-04',                    
      insuranceTermination: '2026-02-04', 
      lastMonth: '',
      designState: '청약중',
    },
    { 
      id: 6, 
      riskName: '치아영상진단비', 
      accAmount: '1,000,000',                    
      securityName: '보통약관(특정치석제거(스케일링)치료비(연간1회한,급여))', 
      planNumber: 'LA2602043 10787-1', 
      productName: '한화 하얀미소플러스치아보험Ⅱ 무배당..', 
      insurancePeriod: '2026-02-04',                    
      insuranceTermination: '2026-02-04', 
      lastMonth: '',
      designState: '청약중',
    },
    { 
      id: 7, 
      riskName: '발치치료비', 
      accAmount: '1,000,000',                    
      securityName: '보통약관(주요치주질환(잇몸질환)치료비(급여))', 
      planNumber: 'LA2602043 10787-1', 
      productName: '한화 하얀미소플러스치아보험Ⅱ 무배당..', 
      insurancePeriod: '2026-02-04',                    
      insuranceTermination: '2026-02-04', 
      lastMonth: '',
      designState: '청약중',
    },
  ];

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '누적위험명',
      field: 'riskName',
      width: 190,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      spanRows: true,
      cellClass: 'flex items-center justify-start',
    },
    {
      headerName: '누적금액',
      field: 'accAmount',
      width: 120,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-right flex items-center justify-end',
    },
    {
      headerName: '담보명',
      field: 'securityName',
      flex: 2,
      // width: 345,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'truncate text-left flex items-center justify-start',
    },
    {
      headerName: '증권(설계)번호',
      field: 'planNumber',
      width: 160,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex items-center justify-center',
    },
    {
      headerName: '상품명',
      field: 'productName',
      width: 260,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'truncate text-center flex items-center justify-left',
    },
    {
      headerName: '보험시기',
      field: 'insurancePeriod',
      width: 110,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex items-center justify-center',
    },
    {
      headerName: '보험종기',
      field: 'insuranceTermination',
      width: 110,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex items-center justify-center',
    },
    {
      headerName: '최종월드',
      field: 'lastMonth',
      width: 110,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex items-center justify-center',
    },
    {
      headerName: '계약(설계)상태',
      field: 'designState',
      width: 110,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex items-center justify-center',
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);

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
            animateRows={false}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
          />
        </div>
      </Grow>
    </Gcol>
  );
};

type Story = StoryObj<typeof meta>;

export const Page6: Story = {
  render: () => <LTPA170/>,
};

