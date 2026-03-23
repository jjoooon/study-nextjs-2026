import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { SearchIcon } from '@icons';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { Checkbox } from '@uiux/Checkbox';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { createCellValueChangedHandler } from '@aggrid';

ModuleRegistry.registerModules([AllCommunityModule]);



const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_전환_0312',
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
            <h2>P6</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

const P6 = () => {
  type DummyDataType = {
    id: number;
    isCheck: boolean;
    seq: number;
    docName: string;
    printSeq: string;
    issueSeq: string;
    customerName: string;
    scanDateTime: string;
    scanProcessor: string;
    compare: string;
  };

  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: false, seq: 1, docName: '보험청약서', printSeq: 'P001', issueSeq: 'I001', customerName: '홍길동', scanDateTime: '2026-01-15 09:12:33', scanProcessor: '김처리', compare: '일치' },
    { id: 2, isCheck: false, seq: 2, docName: '개인정보동의서', printSeq: 'P002', issueSeq: 'I002', customerName: '이영희', scanDateTime: '2026-01-15 10:05:21', scanProcessor: '김처리', compare: '불일치' },
    { id: 3, isCheck: true, seq: 3, docName: '자필서명확인서', printSeq: 'P003', issueSeq: 'I003', customerName: '박철수', scanDateTime: '2026-01-16 11:30:00', scanProcessor: '이처리', compare: '일치' },
    { id: 4, isCheck: false, seq: 4, docName: '상품설명서', printSeq: 'P004', issueSeq: 'I004', customerName: '최지수', scanDateTime: '2026-01-16 14:22:45', scanProcessor: '이처리', compare: '일치' },
  ];

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '순번',
      field: 'seq',
      width: 70,
      cellClass: 'text-center',
    },
    {
      headerName: '문서명',
      field: 'docName',
      flex: 2,
    },
    {
      headerName: '출력순번',
      field: 'printSeq',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '발행순번',
      field: 'issueSeq',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '고객명',
      field: 'customerName',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '스캔일시',
      field: 'scanDateTime',
      flex: 1.5,
      cellClass: 'text-center',
    },
    {
      headerName: '스캔처리자',
      field: 'scanProcessor',
      width: 110,
      cellClass: 'text-center',
    },
    {
      headerName: '비교',
      field: 'compare',
      width: 80,
      cellClass: 'text-center',
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

  return (
    <Gcol className="w-full">
      <Grow placement='bwc' className="w-full" variant={'box'}>
        <FormTable variant={'none'} lineTop={false} caption="보험정보" cols={['w-[14rem] min-w-[14rem]', 'w-[20rem] min-w-[20rem]', 'w-[14rem] min-w-[14rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={'가입설계번호'}>
              <Input aria-label="" width={'10rem'} value={''} readOnly />
              <div className="separator">-</div>
              <Input aria-label="" width={'2rem'} value={''} readOnly />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            </FormCell>
            <FormCell title={'상품명'}>
              <Grow>
                <Input aria-label="" width={'30rem'} value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
                <Checkbox color="primary" errorMsg="선택은 필수입니다." errorPs="bl" onCheckedChange={() => {}} size="lg" variant="default">
                  단일
                </Checkbox>
              </Grow>
            </FormCell>
          </FormRow>
        </FormTable>
        <Grow>
          <Button aria-label="" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
          <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
            새로고침
          </Button>
        </Grow>
      </Grow>
      <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-[26rem]!">
          <AgGridReact<DummyDataType>
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: false }}
            animateRows={false}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}
            rowSelection={{
              mode: 'multiRow',
              headerCheckbox: true,
              checkboxes: true,
              enableClickSelection: false,
            }}
            rowClassRules={{}}
            onGridReady={params => {
              params.api.forEachNode(node => {
                if (node.data?.isCheck) {
                  node.setSelected(true);
                }
              });
            }}
          />
        </div>
      </Grow>
    </Gcol>
  );
};

type Story = StoryObj<typeof meta>;

export const Page6: Story = {
  render: () => <P6/>,
};


const P8 = () => {

};
