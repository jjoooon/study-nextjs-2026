import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Input } from '@uiux/Input';
import { Button } from '@uiux/Button';
import { SearchIcon } from '@icons';
import { DatePickerInput } from '@common/DatePicker';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { useFormFields } from '@hooks/useFormFields';
import { useAgGridPagination } from '@aggrid';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA320',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계관리 &gt; 실손 재가입대상계약현황 LTPA320</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA320Props = {
  isNoData?: boolean;
};

const LTPA320 = ({ isNoData = false }: LTPA320Props) => {

  // dummy data
  interface DummyDataType {
    id: number;
    isCheck: boolean;
    field01: React.ReactNode; // DetailLine[] 대신 ReactNode로 변경;
    field03: string | number;
    field04: string | number;
    field05: string | number;
    field02: string | number;
    field06: string | number;
    field07: string | number;
    field08: string | number;
    field09: string | number;
    field10: string | number;
    field11: string | number;
    field12: string | number;
    field13: string | number;
    field14: string | number;
    field15: string | number;
  }

  const DummyData: DummyDataType[] = [
    { 
      id: 1, 
      isCheck: false,
      field01: '신부산GA지점<br/>/김한화', 
      field02: '심한화',
      field03: 'LA20233591906000',                    
      field04: '한화 더건강한 한한..', 
      field05: '9,999,999', 
      field06: 'TEXT', 
      field07: 'YYYY--MM--dd',    
      field08: 'TEXT', 
      field09: 'TEXT',
      field10: 'LA2508261588',
      field11: '설계생성',
      field12: 'LA20233591906000',
      field13: '한화 더건강한 한..',
      field14: '9,999,999',
      field15: '재가입미처리',
    },
    { 
      id: 2, 
      isCheck: false,
      field01: '신부산GA지점<br/>/심한화', 
      field02: '심한화',
      field03: 'LA20233591906000',                    
      field04: '한화 더건강한 한한..', 
      field05: '9,999,999', 
      field06: 'TEXT', 
      field07: 'YYYY--MM--dd',                    
      field08: 'TEXT', 
      field09: 'TEXT',
      field10: 'LA2508261588',
      field11: '설계생성',
      field12: 'LA20233591906000',
      field13: '한화 더건강한 한..',
      field14: '9,999,999',
      field15: '재가입미처리',
    },
  ];

  const columnDefs: Array<ColDef<DummyDataType> | ColGroupDef<DummyDataType>> = [
    {
      headerName: '순번',
      field: 'id',
      width: 50,
      spanRows: true,
      cellClass: 'text-center flex! items-center justify-center!',
    },
    {
      headerName: '취급기관/취급자(사용인)',
      field: 'field01',
      width: 130,
      wrapText: true,
      autoHeight: true,
      headerComponent: () => (
        <div className="w-full h-full flex items-center justify-center text-center whitespace-normal leading-5">
          취급기관<br />취급자(사용인)
        </div>
      ),
      cellClass: 'text-center flex! items-center justify-center!',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        return (
          <div
            className="h-full w-full px-2 py-1 text-sm leading-5 break-words whitespace-normal"
            dangerouslySetInnerHTML={{ __html: String(params.data?.field01 ?? '') }}
          />
        );
      },
    },
    {
      headerName: '계약자',
      field: 'field02',
      width: 70,
      cellClass: 'text-center flex! items-center justify-center!',
    },
    {
      headerName: '증권번호',
      field: 'field03',
      width: 125,
      cellClass: 'text-center flex! items-center justify-center!',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Button
          color="link"
          onClick={() => {}}
          only="default"
          size="lg"
          variant="text"
          className="whitespace-nowrap"
        >
          {String(params.data?.field03 ?? '')}
        </Button>
      ),
    },
    {
      headerName: '상품명',
      field: 'field04',
      width: 115,
      cellClass: 'truncate text-center flex! items-center justify-center!',
    },
    {
      headerName: '합계보험료',
      field: 'field05',
      width: 85,
      cellClass: 'text-center flex! items-center justify-center!',
    },
    {
      headerName: '계약상태',
      field: 'field06',
      flex: 1,
      cellClass: 'text-center flex! items-center justify-center!',
      headerComponent: () => (
        <div className="w-full h-full flex items-center justify-center text-center whitespace-normal leading-5">
          계약<br />상태
        </div>
      ),
    },
    {
      headerName: '재가입정보',
      children: [
        {
          headerName: '재가입일',
          field: 'field07',
          width: 110,
          cellClass: 'text-center flex! items-center justify-center!',
        },
        {
          headerName: '재가입유형',
          field: 'field08',
          width: 80,
          cellClass: 'text-center flex! items-center justify-center!',
        },
        {
          headerName: '재가입순번',
          field: 'field09',
          width: 60,
          cellClass: 'text-center flex! items-center justify-center!',
          headerComponent: () => (
          <div className="w-full h-full flex items-center justify-center text-center whitespace-normal leading-5">
            재가입<br />순번
          </div>
        ),
        },
        {
          headerName: '설계번호',
          field: 'field10',
          width: 110,
          cellClass: 'text-center flex! items-center justify-center!',
        },
      ],
    },
    {
      headerName: '재가입후계약',
      children: [
        {
          headerName: '업무처리',
          field: 'field11',
          width: 70,
          cellClass: 'text-center flex! items-center justify-center!',
        },
        {
          headerName: '증권번호',
          field: 'field12',
          width: 125,
          cellClass: 'text-center flex! items-center justify-center!',
        },
        {
          headerName: '상품명',
          field: 'field13',
          width: 115,
          cellClass: 'truncate text-center flex! items-center justify-center!',
        },
        {
          headerName: '합계보험료',
          field: 'field14',
          width: 85,
          cellClass: 'text-center flex! items-center justify-end!',
          valueFormatter: 'numberValueFormatter',
        },
        {
          headerName: '비고',
          field: 'field15',
          width: 90,
          cellClass: 'text-center flex! items-center justify-center!',
        },
      ]
    },
  ];

  // rowSelection 사용시
  const [rowData] = React.useState<DummyDataType[]>(isNoData ? [] : DummyData);

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
  });
  
  // ag-Grid + TablePagination 연동 (공통 훅 사용)
  const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);
  const pageSize = 5;
  const {
    currentPage,
    totalPages,
    handleGridReady,
    handlePageChange
  } = useAgGridPagination(gridRef, pageSize);

  return (
    <Gcol className="w-full gap-[1.2rem]">
      <Grow className="w-full" variant="box-round" placement={'bwe'}>
        <FormTable variant={'none'}
          caption="실손 재가입대상계약현황 테이블"
          cols={[
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'조회구분'}>
              <NativeSelect
                aria-label="조회구분 선택"
                width="12rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '취급기관2' },
                  { value: 'selection2', id: 'type01-2', label: '취급기관2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input aria-label="" 
                width={'9rem'} 
                value={form.type02 || '12345678'} 
                onChange={e => setFormField('type02', e.target.value)}
              />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button> 
              <Input aria-label="" width={'12rem'} value={'신부산GA지점'} readOnly />
            </FormCell>
            <FormCell title={'재가입유형'}>
              <NativeSelect
                aria-label="모계약종류 선택"
                width="12rem"
                value={form.type03}
                onChange={(e) => setFormField('type03', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type03-1', label: '노후실손' },
                  { value: 'selection2', id: 'type03-2', label: '차도리CEO' },
                  { value: 'selection3', id: 'type03-3', label: '유병자실손' },
                ].map((option) => (
                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'재가입도래월'}>
              <DatePickerInput mode="range" onChange={() => {}} rangeValue={{ from: '2026-02', to: '2026-03' }} size="lg" width="sm" />
            </FormCell>
          </FormRow>
        </FormTable>
        <Grow>
          <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
            조회
          </Button>
          <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
            새로고침
          </Button>
        </Grow>
      </Grow>

      <Grow className="w-full">
        <FormTable
          caption="실손 재가입대상계약현황 테이블"
          cols={[
            'w-[14rem]', 'min-w-[14rem] flex-1',
            'w-[14rem]', 'min-w-[14rem] flex-1',
            'w-[14rem]', 'min-w-[14rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'조회건수'}>
              10건
            </FormCell>
            <FormCell title={'노후실손'}>
              10건
            </FormCell>
            <FormCell title={'차도리ECO'}>
              10건
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>

      <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ 
              sortable: false,
              resizable: true,
            }}
            headerHeight={52}
            groupHeaderHeight={40}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            suppressRowTransform={true}
            

            // 체크박스 시
            rowSelection={{
              mode: 'multiRow',
              headerCheckbox: false,
              checkboxes: true,
              enableClickSelection: false,
            }}
            selectionColumnDef={{
              headerName: '선택',
            }}
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

export const LTPA320Story: Story = {
  render: () => <LTPA320 />,
};

export const LTPA320NoData: Story = {
  render: () => <LTPA320 isNoData={true} />,
};