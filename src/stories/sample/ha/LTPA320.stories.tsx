import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Tooltip, TooltipTrigger, TooltipContent } from '@uiux/Tooltip';
import { Input } from '@uiux/Input';
import { Button } from '@uiux/Button';
import { SearchIcon } from '@icons';
import { DatePickerInput } from '@common/DatePicker';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { CellClassParams, CellStyle, ColDef, ColGroupDef, ICellRendererParams, RowSpanParams } from 'ag-grid-community';
import { useFormFields } from '@hooks/useFormFields';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0323/LTPA320',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계관리 &gt; 실손 재가입대상계약현황 P147</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

const LTPA320 = () => {
  interface DummyDataType {
    id: number;
    institution: React.ReactNode; // DetailLine[] 대신 ReactNode로 변경;
    institutionLines?: number;
    contractor: string;
    securitiesNum: string;
    productName01: string;
    premium: string;
    state: string;
    reJoinDate: string;
    reSubscriptionType: string;
    reEnrollmentOrder: string;
    designNumber: string;
    businessProcessing: string;
    productName02: string;
    totalPremium: string;
    note: string;
  }

  const DummyData: DummyDataType[] = [
    { 
      id: 1, 
      institution: '신부산GA지점<br/>/김현화', 
      institutionLines: 2,
      contractor: '심한화',                    
      securitiesNum: 'LA20233591906000', 
      productName01: '한화 더건강한 한한', 
      premium: '9,999,999', 
      state: 'TEXT',                    
      reJoinDate: 'YYYY--MM--dd', 
      reSubscriptionType: 'TEXT',
      reEnrollmentOrder: 'TEXT',
      designNumber: 'LA2508261588',
      businessProcessing: '설계생성',
      productName02: '한화 더건강한 한..',
      totalPremium: '9,999,999',
      note: '재가입미처리',
    },
  ];

  const columnDefs: Array<ColDef<DummyDataType> | ColGroupDef<DummyDataType>> = [
    {
      headerName: '선택',
      width: 40,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: false,
      checkboxSelection: true,
      headerCheckboxSelection: false,
      cellClass: 'text-center flex! items-center justify-center!',
    },
    {
      headerName: '순번',
      field: 'id',
      width: 50,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      spanRows: true,
      cellClass: 'text-center flex! items-center justify-center!',
    },
    {
      headerName: '취급기관/취급자(사용인)',
      field: 'institution',
      width: 130,
      wrapText: true,
      autoHeight: true,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
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
            dangerouslySetInnerHTML={{ __html: String(params.data?.institution ?? '') }}
          />
        );
      },
      cellClassRules: {
        'ag-row-odd': (params: CellClassParams<DummyDataType>) => {
          const rowIndex = params.node.rowIndex ?? -1;
          return rowIndex % 2 !== 0;
        },  
      },
    },
    {
      headerName: '계약자',
      field: 'contractor',
      width: 70,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex! items-center justify-center!',
    },
    {
      headerName: '증권번호',
      field: 'securitiesNum',
      width: 140,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex! items-center justify-center!',
    },
    {
      headerName: '상품명',
      field: 'productName01',
      width: 115,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'truncate text-center flex! items-center justify-center!',
    },
    {
      headerName: '합계보험료',
      field: 'premium',
      flex: 1,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex! items-center justify-center!',
    },
    {
      headerName: '계약상태',
      field: 'state',
      width: 70,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
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
          field: 'reJoinDate',
          width: 110,
          sortable: false, 
          filter: false, 
          suppressMovable: true, 
          resizable: true,
          cellClass: 'text-center flex! items-center justify-center!',
        },
        {
          headerName: '재가입유형',
          field: 'reSubscriptionType',
          width: 90,
          sortable: false, 
          filter: false, 
          suppressMovable: true, 
          resizable: true,
          cellClass: 'text-center flex! items-center justify-center!',
        },
        {
          headerName: '재가입순번',
          field: 'reEnrollmentOrder',
          width: 60,
          sortable: false, 
          filter: false, 
          suppressMovable: true, 
          resizable: true,
          cellClass: 'text-center flex! items-center justify-center!',
          headerComponent: () => (
          <div className="w-full h-full flex items-center justify-center text-center whitespace-normal leading-5">
            재가입<br />순번
          </div>
        ),
        },
        {
          headerName: '설계번호',
          field: 'designNumber',
          width: 110,
          sortable: false, 
          filter: false, 
          suppressMovable: true, 
          resizable: true,
          cellClass: 'text-center flex! items-center justify-center!',
        },
      ],
    },
    {
      headerName: '재가입후계약',
      children: [
        {
          headerName: '업무처리',
          field: 'businessProcessing',
          width: 100,
          sortable: false, 
          filter: false, 
          suppressMovable: true, 
          resizable: true,
          cellClass: 'text-center flex! items-center justify-center!',
        },
        {
          headerName: '증권번호',
          field: 'designNumber',
          width: 110,
          sortable: false, 
          filter: false, 
          suppressMovable: true, 
          resizable: true,
          cellClass: 'text-center flex! items-center justify-center!',
        },
        {
          headerName: '상품명',
          field: 'productName02',
          width: 105,
          sortable: false, 
          filter: false, 
          suppressMovable: true, 
          resizable: true,
          cellClass: 'truncate text-center flex! items-center justify-center!',
        },
        {
          headerName: '합계보험료',
          field: 'totalPremium',
          flex: 1,
          sortable: false, 
          filter: false, 
          suppressMovable: true, 
          resizable: true,
          cellClass: 'text-center flex! items-center justify-center!',
        },
        {
          headerName: '비고',
          field: 'note',
          width: 90,
          sortable: false, 
          filter: false, 
          suppressMovable: true, 
          resizable: true,
          cellClass: 'text-center flex! items-center justify-center!',
        },
      ]
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);




  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
  });
  
  return (
    <Gcol className="w-full gap-[1.2rem]">
      <Grow className="w-full" variant="box" placement={'bwe'}>
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
              <Input aria-label="" width={'8rem'} value={'12345678'} />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button> 
              <Input aria-label="" width={'12rem'} value={'신부산GA지점'} readOnly />
            </FormCell>
            <FormCell title={'재가입유형'}>
              <NativeSelect
                aria-label="모계약종류 선택"
                width="12rem"
                value={form.type02}
                onChange={(e) => setFormField('type02', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type02-1', label: '노후실손' },
                  { value: 'selection2', id: 'type02-2', label: '차도리CEO' },
                  { value: 'selection3', id: 'type02-3', label: '유병자실손' },
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
            defaultColDef={{ sortable: false }}
            headerHeight={52}
            groupHeaderHeight={40}
            animateRows={false}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            rowSelection={'multiple'}
            suppressRowTransform={true}
          />
        </div>
      </Grow>
    </Gcol>

  );
};

type Story = StoryObj<typeof meta>;

export const Page147: Story = {
  render: () => <LTPA320 />,
};