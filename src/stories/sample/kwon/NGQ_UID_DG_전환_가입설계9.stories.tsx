import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent, createCellValueChangedHandler } from '@aggrid';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InfoBox } from '@common/InfoBox';
import { Input } from '@uiux/Input';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/9_개인사업자 정보 등록',
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
            <h2>LTPZ041</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPZ041P = () => {
 
  // dummy data
  type DummyDataType = {
    id: number;
    isCheck: boolean;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
    field06: string | number;
    field07: string | number;
    field08: string | number;
    field09: string | number;
    field10: string | number;
    field11: string | number;
    field12: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: false, field01: '', field02: '', field03: '', field04: 'LA26234242342', field05: '김한화', field06: '', field07: '', field08: '2026-03-01', field09: '', field10: '', field11: '', field12: '' },
    { id: 2, isCheck: false, field01: '', field02: '', field03: '', field04: 'LA26234242342', field05: '김한화', field06: '', field07: '', field08: '2026-03-01', field09: '', field10: '', field11: '', field12: '' },
    { id: 3, isCheck: false, field01: '', field02: '', field03: '', field04: 'LA26234242342', field05: '김한화', field06: '', field07: '', field08: '2026-03-01', field09: '', field10: '', field11: '', field12: '' },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '상태',
      width: 80,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,   
    },
    {
      headerName: '증권번허',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '상품명',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '담보명',
      flex: 1,
      field: 'field04',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '가입금액(원)',
      flex: 1,
      field: 'field05',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '보험료',
      flex: 1,
      field: 'field06',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '담보코드',
      flex: 1,
      field: 'field07',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '보험시기',
      flex: 1,
      field: 'field08',
      cellClass: 'text-left px-1 flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '보험종기',
      flex: 1,
      field: 'field09',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '상태',
      flex: 1,
      field: 'field10',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '계약자',
      flex: 1,
      field: 'field11',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '취급기관',
      flex: 1,
      field: 'field12',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
  ];
  
   const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
    const [errorRows, setErrorRows] = React.useState<number[]>(
      DummyData.filter(row => !row.isCheck).map(row => row.id)
    );
  
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );
  
  return(
    <Gcol>
      <FormTable caption="사업자" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
        <FormRow>
          <FormCell title={'사업자명'}>
            <Input size="lg" value="김한화" variant="default" width="full" readOnly/>
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'사업자번호'}>
            <Input size="lg" value="123-45-67890" variant="default" width="full" readOnly/>
          </FormCell>
        </FormRow>
      </FormTable>

       <InfoBox
        subTitle="개인사업자정보는 계약자의 보조정보로 계약자는 대표자인 개인으로 함"
        variant="info"
        >
      </InfoBox>
      <InfoBox
        subTitle="계약자와 개인사업자의 대표자가 동일한 경우만 입력 가능(사업자등록증 스캔 필수)"
        variant="info"
        >
      </InfoBox>
    </Gcol>    
  )
}
export const Ltpz041: Story = {
  render: () => <LTPZ041P />,

}
