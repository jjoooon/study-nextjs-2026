import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent, createCellValueChangedHandler } from '@/shared/components/agGridUtils';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InfoBox } from '@common/InfoBox';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/8_실손의료비 전환 계약 조회',
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
            <h2>LTPZ040</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPZ040P = () => {
 
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
      <Grow className="w-full" variant={'box'}>
        <FormTable variant={'none'} lineTop={false} caption="보험정보" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={'설계번호'}>
              LA24091283409812304
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>

      <Grow className="w-full" variant={'box'}>
        <FormTable caption="피보험자" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={'피보험자'}>
              김한화(91234-1234567)
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>

      <Gcol className='w-full'>
        <div className="ag-theme-alpine aggrid-pagination-ko w-full">
          <AgGridReact<DummyDataType>
            rowData={rowData}
            columnDefs={columnDefs}
            noRowsOverlayComponent={AgGridEmptyComponent}
            defaultColDef={{ sortable: false }}
            animateRows={false}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}
            rowSelection={{
              mode: 'multiRow',
              headerCheckbox: false,
              checkboxes: true,
              enableClickSelection: false,
            }}
            selectionColumnDef={{
              headerName: '선택',
            }}
            rowClassRules={{}}
            onGridReady={params => {
              params.api.forEachNode(node => {
                if (node.data?.isCheck) {
                  node.setSelected(true);
                }
              });
            }}
            domLayout="autoHeight" 
          />
        </div>
      </Gcol>
      <InfoBox
          bg
          items={[
            {
              text: '전화전 계약과 동일한 초건(담보, 가입금액 등)으로 전환용 계약 설계에 반영됩니다.'
            },
            {
              text: '전환전 계약에 「특정 신체부위 질병 보장제한부 인수 특별약관」, 「특별조건부 특별약관」 등이 부가되어 있을 경우, 전환용 계약에 전화전 계약의 조건과 동일하게 부가하여 효력을 갖을수 있습니다.'
            },
            {
              text: '전화전 계약의 해약일 또는 변경기준일자와 전환후 신계약 보험시기가 동일하여야 청약완료 가능합니다.',
              className: 'font-bold'
            },
            {
              text: '천환용 신계약 설계유효기간은 전화전 계약 의료비 담보의 보험종기까지입니다.',
              className: 'font-bold'
            }
          ]}
          variant="detail"
        />
    </Gcol>    
  )
}
export const LTPZ040: Story = {
  render: () => <LTPZ040P />,

}
