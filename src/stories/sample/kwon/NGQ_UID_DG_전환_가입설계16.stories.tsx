import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { InfoBox } from '@common/InfoBox';
import { AgGridEmptyComponent, createFieldRenderer } from '@aggrid';
import { AgGridReact } from 'ag-grid-react';
import { useTabs } from '@/shared/hooks/useTabs';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/16_고객 직업정보',
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
            <h2>LTPZ051</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPZ051P = () => {
  
  type LTPZ051Tab = { name: string; value: string; label: string };
  const DATA_TABS: LTPZ051Tab[] = [
    { name: '직업정보(상해급수)변경대상(d건)', value: 'basic', label: '직업정보(상해급수)변경대상(d건)' },
    { name: '이륜차부담보 변경대상(d건)', value: 'detail', label: '이륜차부담보 변경대상(d건)' },
  ];

  const { tabs, active, setActive } = useTabs(DATA_TABS);

  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
    field06: string | number;
    field07: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, field01: '-', field02: '-', field03: 'LA20234472050000', field04: '1급', field05: '회사원', field06: '1급', field07: '회사원'},
    { id: 2, field01: '-', field02: '-', field03: 'LA20234472050001', field04: '1급', field05: '회사원', field06: '1급', field07: '회사원'}
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '대상여부',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,   
    },
    {
      headerName: '증권번호',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '변경설계번호',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '변경전 직업정보',
      children: [
        {
          headerName: '상해급수',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: any) => <Typo className="whitespace-nowrap">{String(params.data?.field04 ?? '')}</Typo>,
        },
        {
          headerName: '직업',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: any) => <Typo className="whitespace-nowrap">{String(params.data?.field05 ?? '')}</Typo>,
        }
      ]
    },
    {
      headerName: '변경후 직업정보',
      children: [
        {
          headerName: '상해급수',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: any) => <Typo className="whitespace-nowrap">{String(params.data?.field06 ?? '')}</Typo>,
        },
        {
          headerName: '직업',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: any) => <Typo className="whitespace-nowrap">{String(params.data?.field07 ?? '')}</Typo>,
        }
      ]
    },
  ];
  
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  
    
  return (
    <Gcol>
      <Grow className='w-full' variant="box-round">
        <FormTable caption="부실유의계약 선별인수 확인서" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']} variant={'none'}>
          <FormRow>
            <FormCell title={'상품명'}>
              Text
            </FormCell>
            <FormCell title={'설계번호'}>
              LA123123123
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <InfoBox bg variant="info"
        subTitle="고객 직업정보(상해급수) 또는 이륜차부담보 가입여부가 불일치 할 경우 신계약 체결이 불가능합니다. 해당 신계약 청약완료 이전에 기계약의 직업변경 또는 이윤차부담보 변경 완료 필요. 또한, 신계약 청약서 발행 이전에 배서(청약중 이후) 진행 필요"
      />
      <TabPager
        data={tabs}
        active={active}
        setActive={setActive}
        getValue={(t) => t.value}
        renderTab={(t) => t.label ?? t.value}
        visibleCount={4}
        removable={false}
      >
        {active === 'basic' ? (
          <Gcol>
            <FormTable caption="직업 상세" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']} lineTop={false}>
              <FormRow>
                <FormCell title={'고객명'}>김한화</FormCell>
                <FormCell title={'직업정보'}>1급/회사원</FormCell>
              </FormRow>
            </FormTable>
            <div className="ag-theme-alpine aggrid-pagination-ko w-full">
              <AgGridReact<DummyDataType>
                rowData={rowData}
                columnDefs={columnDefs}
                noRowsOverlayComponent={AgGridEmptyComponent}
                defaultColDef={{ 
                  sortable: false,
                  resizable: false,
                }}
                animateRows={false}
                alwaysShowHorizontalScroll={true}
                rowClassRules={{}}
                domLayout="autoHeight" 
              />
            </div>
          </Gcol>
        ) : (
          <Gcol>
            <FormTable caption="직업 상세" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']} lineTop={false}>
              <FormRow>
                <FormCell title={'고객명'}>김한화2</FormCell>
                <FormCell title={'직업정보'}>1급/회사원2</FormCell>
              </FormRow>
            </FormTable>
            <div className="ag-theme-alpine aggrid-pagination-ko w-full">
              <AgGridReact<DummyDataType>
                rowData={rowData}
                columnDefs={columnDefs}
                noRowsOverlayComponent={AgGridEmptyComponent}
                defaultColDef={{ 
                  sortable: false,
                  resizable: false,
                }}
                animateRows={false}
                alwaysShowHorizontalScroll={true}
                rowClassRules={{}}
                domLayout="autoHeight" 
              />
            </div>
          </Gcol>
        )}
      </TabPager>
    </Gcol>
  );
};
export const LTPZ051: Story = {
  render: () => <LTPZ051P />,

}
