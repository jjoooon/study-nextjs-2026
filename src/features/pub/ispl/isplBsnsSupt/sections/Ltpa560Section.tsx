/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useMemo } from 'react';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
import { Grow, Grid, Gcol } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { PageID } from '@features/PageID';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon, ResetIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import '@/shared/lib/agGridPub';

type Ltpa560RowType = 'detail' | 'summary' | 'productTotal';

type Ltpa560DummyDataRow = {
  id: number;
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
  field06Type?: boolean;
  field10Type?: boolean;
  subtotal?: boolean;
  productTotal?: boolean;
  rowType?: Ltpa560RowType;
};

type NumericSummaryTotals = {
  field04: number;
  field05: number;
  field06: number;
  field07: number;
  field08: number;
  field09: number;
  field10: number;
  field11: number;
};

const toNumber = (value: string | number): number => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  const normalized = value.replaceAll(',', '').trim();
  if (normalized.length === 0) {
    return 0;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const sumNumericFields = (rows: Ltpa560DummyDataRow[]): NumericSummaryTotals => {
  return rows.reduce<NumericSummaryTotals>(
    (acc, row) => {
      acc.field04 += toNumber(row.field04);
      acc.field05 += toNumber(row.field05);
      acc.field06 += toNumber(row.field06);
      acc.field07 += toNumber(row.field07);
      acc.field08 += toNumber(row.field08);
      acc.field09 += toNumber(row.field09);
      acc.field10 += toNumber(row.field10);
      acc.field11 += toNumber(row.field11);
      return acc;
    },
    {
      field04: 0,
      field05: 0,
      field06: 0,
      field07: 0,
      field08: 0,
      field09: 0,
      field10: 0,
      field11: 0,
    }
  );
};

/**
 * 원본 상세 행 목록을 받아 상품별로
 * [채널별 상세 행들 -> 채널 요약(1개 이상)] ... -> [상품 합계(1개)]
 * 구조로 자동 변환합니다.
 */
const buildLtpa560GridRows = (detailRows: Ltpa560DummyDataRow[]): Ltpa560DummyDataRow[] => {
  const productMap = new Map<string, Map<string, Ltpa560DummyDataRow[]>>();

  detailRows.forEach((row) => {
    const productKey = String(row.field01);
    const channelKey = String(row.field02);

    if (!productMap.has(productKey)) {
      productMap.set(productKey, new Map<string, Ltpa560DummyDataRow[]>());
    }
    const channelMap = productMap.get(productKey)!;
    if (!channelMap.has(channelKey)) {
      channelMap.set(channelKey, []);
    }
    channelMap.get(channelKey)!.push({
      ...row,
      subtotal: false,
      productTotal: false,
      rowType: 'detail',
    });
  });

  const result: Ltpa560DummyDataRow[] = [];
  let generatedId = 1000;

  productMap.forEach((channelMap, productName) => {
    const productDetailRows: Ltpa560DummyDataRow[] = [];

    channelMap.forEach((channelRows, channelName) => {
      result.push(...channelRows);
      productDetailRows.push(...channelRows);

      const channelSums = sumNumericFields(channelRows);
      const summaryLabel = `${channelName}요약`;
      result.push({
        id: generatedId++,
        field01: productName,
        field02: summaryLabel,
        field03: summaryLabel,
        ...channelSums,
        field12: '0%',
        subtotal: true,
        productTotal: false,
        rowType: 'summary',
      });
    });

    const productSums = sumNumericFields(productDetailRows);
    result.push({
      id: generatedId++,
      field01: productName,
      field02: '합계',
      field03: '합계',
      ...productSums,
      field12: '0%',
      subtotal: false,
      productTotal: true,
      rowType: 'productTotal',
    });
  });

  return result;
};

const Ltpa560DetailDummyData: Ltpa560DummyDataRow[] = [
  // 상품 1: 한화시그니처 여성 건강보험 4.0 (전속요약 + GA요약 + 합계)
  {
    id: 1,
    field01: '한화시그니처 여성 건강보험 4.0',
    field02: '전속',
    field03: '서울지역본부',
    field04: 2,
    field05: 21,
    field06: 0,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: '0%',
  },
  {
    id: 2,
    field01: '한화시그니처 여성 건강보험 4.0',
    field02: '전속',
    field03: '경인지역본부',
    field04: 2,
    field05: 21,
    field06: 0,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: '0%',
  },
  {
    id: 3,
    field01: '한화시그니처 여성 건강보험 4.0',
    field02: '전속',
    field03: '중부지역본부',
    field04: 2,
    field05: 21,
    field06: 0,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: '0%',
  },
  {
    id: 4,
    field01: '한화시그니처 여성 건강보험 4.0',
    field02: '전속',
    field03: '영남지역본부',
    field04: 2,
    field05: 21,
    field06: 0,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: '0%',
  },
  {
    id: 5,
    field01: '한화시그니처 여성 건강보험 4.0',
    field02: 'GA',
    field03: 'GA영업1본부',
    field04: 2,
    field05: 21,
    field06: 0,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: '0%',
    field06Type: true,
    field10Type: true,
  },
  {
    id: 6,
    field01: '한화시그니처 여성 건강보험 4.0',
    field02: 'GA',
    field03: 'GA영업2본부',
    field04: 2,
    field05: 21,
    field06: 0,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: '0%',
    field06Type: false,
    field10Type: false,
  },
  {
    id: 7,
    field01: '한화시그니처 여성 건강보험 4.0',
    field02: 'GA',
    field03: 'GA영업3본부',
    field04: 2,
    field05: 21,
    field06: 0,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: '0%',
    field06Type: false,
    field10Type: true,
  },
  // 상품 2: 한화실손의료보험(갱신형)2601 (전속요약 + GA요약 + 합계)
  {
    id: 8,
    field01: '한화실손의료보험(갱신형)2601',
    field02: '전속',
    field03: '서울지역본부',
    field04: 3,
    field05: 15,
    field06: 2,
    field07: 1,
    field08: 0,
    field09: 1,
    field10: 2,
    field11: 24,
    field12: '+2%',
  },
  {
    id: 9,
    field01: '한화실손의료보험(갱신형)2601',
    field02: '전속',
    field03: '영남지역본부',
    field04: 1,
    field05: 10,
    field06: 1,
    field07: 0,
    field08: 1,
    field09: 0,
    field10: 1,
    field11: 14,
    field12: '+1%',
  },
  {
    id: 10,
    field01: '한화실손의료보험(갱신형)2601',
    field02: 'GA',
    field03: 'GA영업1본부',
    field04: 4,
    field05: 18,
    field06: 3,
    field07: 2,
    field08: 1,
    field09: 1,
    field10: 2,
    field11: 31,
    field12: '+3%',
    field06Type: true,
    field10Type: true,
  },
  {
    id: 11,
    field01: '한화실손의료보험(갱신형)2601',
    field02: 'GA',
    field03: 'GA영업2본부',
    field04: 2,
    field05: 12,
    field06: 1,
    field07: 1,
    field08: 0,
    field09: 1,
    field10: 1,
    field11: 18,
    field12: '0%',
  },
];

const Ltpa560DummyData: Ltpa560DummyDataRow[] = buildLtpa560GridRows(Ltpa560DetailDummyData);

export default function Ltpa560Section() {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
  });

  const [rowData] = React.useState<Ltpa560DummyDataRow[]>(Ltpa560DummyData);

  // AgGrid Column
  // 2026-05-29 수정 cellClass 추가, width 수정
  // 2026-06-04 flex, minWidth 수정
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: (ColDef<Ltpa560DummyDataRow> | ColGroupDef<Ltpa560DummyDataRow>)[] = useMemo(
    () => [
      {
        headerName: '상품',
        flex: 10,
        minWidth: attributeColumnWidth(100),
        field: 'field01',
        cellClass: 'text-center [&>div]:whitespace-normal [&_span]:leading-normal',
        spanRows: true,
        autoHeight: true,
        colSpan: (params) => (params.node?.rowPinned === 'bottom' ? 3 : 1),
      },
      {
        headerName: '채널',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        field: 'field02',
        cellClass: 'text-center',
        spanRows: true,
        autoHeight: true,
        colSpan: (params) =>
          params.node?.rowPinned === 'bottom' ? 0 : params.data?.subtotal || params.data?.productTotal ? 2 : 1,
      },
      {
        headerName: '본부명',
        flex: 10,
        minWidth: attributeColumnWidth(90),
        field: 'field03',
        cellClass: 'text-center',
        autoHeight: true,
        colSpan: (params) =>
          params.node?.rowPinned === 'bottom' || params.data?.subtotal || params.data?.productTotal ? 0 : 1,
      },
      {
        headerName: '단순설계',
        flex: 1,
        autoHeight: true,
        minWidth: attributeColumnWidth(60),
        field: 'field04',
        cellClass: 'text-center',
      },
      {
        headerName: '설계중',
        flex: 1,
        autoHeight: true,
        minWidth: attributeColumnWidth(60),
        field: 'field05',
        cellClass: 'text-center',
      },
      {
        headerName: '설계완료',
        flex: 1,
        autoHeight: true,
        minWidth: attributeColumnWidth(60),
        field: 'field06',
        cellClass: 'text-center',
        cellRenderer: (params: ICellRendererParams<Ltpa560DummyDataRow>) =>
          params.data?.field06Type ? (
            <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
              {params.value}
            </Button>
          ) : (
            params.value
          ),
      },
      {
        headerName: '청약중',
        flex: 1,
        autoHeight: true,
        minWidth: attributeColumnWidth(60),
        field: 'field07',
        cellClass: 'text-center',
      },
      {
        headerName: '청약심사완료',
        flex: 1,
        autoHeight: true,
        minWidth: attributeColumnWidth(90),
        field: 'field08',
        cellClass: 'text-center',
      },
      {
        headerName: '청약완료',
        flex: 1,
        autoHeight: true,
        minWidth: attributeColumnWidth(60),
        field: 'field09',
        cellClass: 'text-center',
      },
      {
        headerName: '수납완료',
        flex: 1,
        autoHeight: true,
        minWidth: attributeColumnWidth(60),
        field: 'field10',
        cellClass: 'text-center',
      },
      {
        headerName: '총합계',
        flex: 1,
        autoHeight: true,
        minWidth: attributeColumnWidth(60),
        field: 'field11',
        cellClass: 'text-center truncate',
        cellRenderer: (params: ICellRendererParams<Ltpa560DummyDataRow>) =>
          params.data?.field10Type ? (
            <Button
              color="link"
              className="!text-[var(--color-text-danger)]"
              onClick={() => {}}
              only="default"
              size="lg"
              variant="text"
            >
              {params.value}
            </Button>
          ) : (
            params.value
          ),
      },
      {
        headerName: '증감율% (전일대비)',
        flex: 1,
        autoHeight: true,
        minWidth: attributeColumnWidth(76),
        field: 'field12',
        cellClass: 'text-center',
      },
    ],
    [attributeColumnWidth]
  );

  const gridRef = React.useRef<AgGridReact<Ltpa560DummyDataRow>>(null);

  const sumRow = React.useMemo<Ltpa560DummyDataRow[]>(() => {
    const detailOnlyRows = rowData.filter((row) => !row.subtotal && !row.productTotal);
    const totals = sumNumericFields(detailOnlyRows);

    return [
      {
        id: -1,
        field01: '총합계',
        field02: '',
        field03: '',
        field04: totals.field04,
        field05: totals.field05,
        field06: totals.field06,
        field07: totals.field07,
        field08: totals.field08,
        field09: totals.field09,
        field10: totals.field10,
        field11: totals.field11,
        field12: '',
      },
    ];
  }, [rowData]);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '실시간 설계현황',
            pageId: 'LTPA560',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_minmax(0,1fr)] h-full" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable
                variant={'head'}
                lineTop={false}
                caption="설계번호"
                cols={['w-[6rem]', 'w-auto ', 'w-[6rem]', 'w-auto', 'w-[6rem]', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'조직구분'} colSpan={3}>
                    <NativeSelect
                      aria-label="조직구분"
                      width={'auto'}
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                    >
                      {[
                        { value: 'selection0101', label: '채널1' },
                        { value: 'selection0102', label: '채널2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <NativeSelect
                      aria-label="본부"
                      width={'auto'}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                    >
                      {[
                        { value: 'selection0201', label: '본부1' },
                        { value: 'selection0202', label: '본부2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <NativeSelect
                      aria-label="지역단1구분"
                      width={'auto'}
                      value={form.type03}
                      onChange={(e) => setFormField('type03', e.target.value)}
                    >
                      {[
                        { value: 'selection0301', label: '지역단1' },
                        { value: 'selection0302', label: '지역단2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <NativeSelect
                      aria-label="지점구분"
                      width={'auto'}
                      value={form.type04}
                      onChange={(e) => setFormField('type04', e.target.value)}
                    >
                      {[
                        { value: 'selection0401', label: '지점1' },
                        { value: 'selection0402', label: '지점2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>

                  <FormCell title={'상품'}>
                    <Input aria-label="" width={120} value={'LA1301097'} required />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input
                      width={260}
                      aria-label=""
                      value={'한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601'}
                      readOnly
                    />
                  </FormCell>
                  <FormCell title={'설계일자'}>
                    <DatePickerInput
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      mode="single"
                      onChange={() => {}}
                      size="lg"
                      width="sm"
                    />
                  </FormCell>
                </FormRow>
              </FormTable>
              <Grow>
                <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                  조회
                </Button>
                <Button
                  color={'gray'}
                  only={'icon'}
                  size={'lg'}
                  variant={'outlined'}
                  onClick={() => {}}
                  aria-label="새로고침"
                >
                  <ResetIcon />
                </Button>
              </Grow>
            </Grow>
            <Gcol>
              <div className="ag-theme-alpine ltpa560-grid">
                <AgGridReact<Ltpa560DummyDataRow>
                  ref={gridRef}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowId={(params) => String(params.data.id)}
                  getRowClass={(params) => {
                    if (params.data?.productTotal) return 'ag-row-product-total';
                    if (params.data?.subtotal) return 'ag-row-subtotal';
                    return undefined;
                  }}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                    autoHeaderHeight: true,
                  }}
                  enableCellSpan={true}
                  pinnedBottomRowData={sumRow}
                />
              </div>
            </Gcol>
          </Grid>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
