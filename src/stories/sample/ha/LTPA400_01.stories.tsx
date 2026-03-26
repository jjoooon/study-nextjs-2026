import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Button } from '@uiux/Button';
import { SearchIcon } from '@icons';
import { DatePickerInput } from '@common/DatePicker';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { Popover, PopoverTrigger, PopoverContent } from '@uiux/Popover';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent, createCellValueChangedHandler, createFieldRenderer, useAgGridPagination } from '@aggrid';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';
import { useFormFields } from '@hooks/useFormFields';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA400_01',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계관리 &gt; 실손 재가입대상계약현황 LTPA400_01</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA400_01Props = {
  isNoData?: boolean;
};

const LTPA400_01 = ({ isNoData = false }: LTPA400_01Props) => {

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
    field13: string | number;
    field14: string | number;
    field15: string | number;
    field16: string | number;
    field17: string | number;
    field18: string | number;
    field19: string | number;
    field20: string | number;
    field21: string | number;
    field22: string | number;
    field23: string | number;
    field24: string | number;
  };
  const DummyData: DummyDataType[] = [
    {
      id: 1, 
      isCheck: true,
      field01: 'LA20233591906000',  field02: '한화 더건강한 한아름...',
      field03: '김한화',             field04: '김한화',
      field05: '신부산GA지점',        field06: '박한화',
      field07: 'TEXT',              field08: '9,999,999',
      field09: 'YYYY-MM-DD',        field10: 'TEXT',
      field11: 'LA250826291588',    field12: 'LA20233591906000',
      field13: 'TEXT',              field14: '9,999,999',
      field15: 'TEXT',              field16: 'YYYY-MM-DD',
      field17: 'TEXT',              field18: 'YYYY-MM-DD',
      field19: 'TEXT',              field20: 'YYYY-MM-DD',
      field21: 'TEXT',              field22: 'YYYY-MM-DD',
      field23: 'TEXT',              field24: 'YYYY-MM-DD',
    },
    {
      id: 2, 
      isCheck: true,
      field01: 'LA20233591906000', field02: '한화 더건강한 한아름...',
      field03: '김한화',            field04: '김한화',
      field05: '신부산GA지점',       field06: '박한화',
      field07: 'TEXT',             field08: '9,999,999',
      field09: 'YYYY-MM-DD',       field10: 'TEXT',
      field11: 'LA250826291588',   field12: 'LA20233591906000',
      field13: 'TEXT',             field14: '9,999,999',
      field15: 'TEXT',             field16: 'YYYY-MM-DD',
      field17: 'TEXT',             field18: 'YYYY-MM-DD',
      field19: 'TEXT',             field20: 'YYYY-MM-DD',
      field21: 'TEXT',             field22: 'YYYY-MM-DD',
      field23: 'TEXT',             field24: 'YYYY-MM-DD',
    },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    // ── 계약정보 ─────────────────────────────────────────────
    {
      headerName: '계약정보',
      children: [
        {
          headerName: '증권번호',
          children: [
            {
              headerName: '상품명',
              flex: 1.5,
              cellClass: 'truncate text-center px-0! ',
              cellRenderer: createFieldRenderer<DummyDataType>(
                <Popover>
                  <PopoverTrigger asChild>
                    <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
                      LA20233591906000
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent variant="default" closeButton={true} side="left">
                    <Gcol className="w-[11rem] [&>*]:w-full">
                      <Button variant={'outlined'} color={'coolgray'}>계약상세 1</Button>
                      <Button variant={'outlined'} color={'coolgray'}>메모장</Button>
                    </Gcol>
                  </PopoverContent>
                </Popover>,
              'field02')
            },    
          ],

        },
        {
          headerName: '계약자',
          children: [{
            headerName: '피보험자명',
            field: 'field03',
            flex: 1.1,
            cellClass: 'text-center px-0! ',
            cellRenderer: createFieldRenderer<DummyDataType>('field03', 'field04'),
          }],
        },
        {
          headerName: '취급지점',
          children: [{
            headerName: '취급자',
            flex: 1.2,
            cellClass: 'text-center px-0! ',
            cellRenderer: createFieldRenderer<DummyDataType>('field05', 'field06'),
          }],
        },
        {
          headerName: '완납여부',
          children: [{
            headerName: '1회보험료',
            flex: 1.1,
            cellClass: 'text-center px-0! ',
            cellRenderer: createFieldRenderer<DummyDataType>('field07', 'field08'),
          }],
        },
      ],
    },

    // ── 재가입정보 (재가입일, 처리상태 → rowSpan=2) ──────────
    {
      headerName: '재가입정보',
      children: [
        {
          headerName: '재가입일',
          field: 'field09',
          flex: 1.3,
          cellClass: 'text-center px-0! content-center!',
        },
        {
          headerName: '처리상태',
          field: 'field10',
          flex: 0.9,
          cellClass: 'text-center px-0! content-center! items-center!',
        },
      ],
    },

    // ── 재가입 신청(현재 판매 상품) ──────────────────────────
    {
      headerName: '재가입 신청(현재 판매 상품)',
      marryChildren: true,
      children: [
        {
          headerName: '설계번호',
          children: [{
            headerName: '재가입증권번호',
            flex: 1.5,
            cellClass: 'text-center px-0! ',
            cellRenderer: createFieldRenderer<DummyDataType>('field11', 'field12'),
          }],
        },
        {
          headerName: '설계상태',
          children: [{
            headerName: '1회보험료',
            flex: 1,
            cellClass: 'text-center px-0! ',
            cellRenderer: createFieldRenderer<DummyDataType>('field13', 'field14'),
          }],
        },
        {
          headerName: '1.발행',
          children: [{
            headerName: '처리기한',
            field: 'field10',
            flex: 1,
            cellClass: 'text-center px-0! ',
            cellRenderer: createFieldRenderer<DummyDataType>('field15', 'field16'),
          }],
        },
        {
          headerName: '2.스캔',
          children: [{
            headerName: '처리기한',
            field: 'field11',
            flex: 1,
            cellClass: 'text-center px-0! ',
            cellRenderer: createFieldRenderer<DummyDataType>('field15', 'field16'),
          }],
        },
        {
          headerName: '3.수납',
          children: [{
            headerName: '처리기한',
            field: 'field12',
            flex: 1,
            cellClass: 'text-center px-0! ',
            cellRenderer: createFieldRenderer<DummyDataType>('field17', 'field18'),
          }],
        },
      ],
    },

    // ── 재가입거절신청 ───────────────────────────────────────
    {
      headerName: '재가입거절신청',
      marryChildren: true,
      children: [
        {
          headerName: '1.발행',
          children: [{
            headerName: '처리기한',
            field: 'field13',
            flex: 1,
            cellClass: 'text-center px-0! ',
              cellRenderer: createFieldRenderer<DummyDataType>('field19', 'field20'),
          }],
        },
        {
          headerName: '2.스캔',
          children: [{
            headerName: '처리기한',
            field: 'field14',
            flex: 1,
            cellClass: 'text-center px-0! ',
              cellRenderer: createFieldRenderer<DummyDataType>('field21', 'field22'),
          }],
        },
      ],
    },
  ];
   
  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(isNoData ? [] : DummyData);
  const [errorRows, setErrorRows] = React.useState<number[]>(
    DummyData.filter(row => !row.isCheck).map(row => row.id)
  );
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

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
          caption="장기보험 가입설계 조회 테이블"
          cols={[
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'소속'}>
              <NativeSelect
                aria-label="소속 선택"
                width="12rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '소속1' },
                  { value: 'selection2', id: 'type01-2', label: '소속2' },
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
            <FormCell title={'모계약종류'}>
              <NativeSelect
                aria-label="모계약종류 선택"
                width="13.5rem"
                value={form.type02}
                onChange={(e) => setFormField('type02', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type02-1', label: '유병자실손' },
                  { value: 'selection2', id: 'type02-2', label: '유병자실손2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'완납여부'}>
              <RadioGroup width="full" className="gap-2">
                <RadioGroupItem color="primary" id="pay_all"  size="lg" value="all"  variant="default" checked={true}>
                  전체
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="pay_done" size="lg" value="done" variant="default">
                  완납
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="pay_not"  size="lg" value="not"  variant="default">
                  미완납
                </RadioGroupItem>
              </RadioGroup>
            </FormCell>
            <FormCell title={'스캔여부'}>
              <RadioGroup width="full" className="gap-2">
                <RadioGroupItem color="primary"
                 id="scan_all"  size="lg" value="all"  variant="default" checked={true}>
                  전체
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="scan_done" size="lg" value="done" variant="default">
                  완료
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="scan_not"  size="lg" value="not"  variant="default">
                  미완납
                </RadioGroupItem>
              </RadioGroup>
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'재계약도래'}>
              <DatePickerInput mode="range" onChange={() => {}} rangeValue={{ from: '2026-02', to: '2026-03' }} size="lg" width="sm" />
            </FormCell>
            <FormCell title={'처리상태'}>
              <NativeSelect
                aria-label="처리상태 선택"
                width="13.5rem"
                value={form.type03}
                onChange={(e) => setFormField('type03', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type03-1', label: '재가입거절완료' },
                  { value: 'selection2', id: 'type03-2', label: '재가입거절완료2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'발송여부'}>
              <RadioGroup width="full" className="gap-2">
                <RadioGroupItem color="primary" id="send_all"  size="lg" value="all"  variant="default" checked={true}>
                  전체
                  </RadioGroupItem>
                <RadioGroupItem color="primary" id="send_done" size="lg" value="done" variant="default">
                  발송
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="send_not"  size="lg" value="not"  variant="default">
                  미완납
                </RadioGroupItem>
              </RadioGroup>
            </FormCell>
            <FormCell title={'수납여부'}>
              <RadioGroup className="gap-2" width="full">
                <RadioGroupItem color="primary" id="receipt_all"  size="lg" value="all"  variant="default" checked={true}>
                  전체
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="receipt_done" size="lg" value="done" variant="default">
                  완납
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="receipt_not"  size="lg" value="not"  variant="default">
                  미완납
                </RadioGroupItem>
              </RadioGroup>
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
            'w-[14rem]', 'min-w-[14rem] flex-1',
            'w-[14rem]', 'min-w-[14rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'전체대상'}>
              10건
            </FormCell>
            <FormCell title={'신청가능'}>
              10건
            </FormCell>
            <FormCell title={'신계약전환중'}>
              10건
            </FormCell>
            <FormCell title={'신계약전환완료'}>
              10건
            </FormCell>
            <FormCell title={'재가입거절완료'}>
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
            noRowsOverlayComponent={AgGridEmptyComponent}
            defaultColDef={{ 
              sortable: false, 
              resizable: false,
            }}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}
            rowHeight={56}
            headerHeight={32}
            groupHeaderHeight={32}
            // suppressRowTransform={true}

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

}

type Story = StoryObj<typeof meta>;

export const LTPA400_01Story: Story = {
  render: () => <LTPA400_01 />,
};

export const LTPA400_01NoData: Story = {
  render: () => <LTPA400_01 isNoData={true} />,
};