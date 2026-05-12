/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { AgGridEmptyComponent, useAgGridInfiniteAppend } from '@aggrid';
import { Grow, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon, ResetIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';

type Ltpa570DummyDataRow = {
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
};
const Ltpa570DummyData: Ltpa570DummyDataRow[] = [
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
    subtotal: false,
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
    subtotal: false,
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
    subtotal: false,
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
    subtotal: false,
  },
  {
    id: 5,
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
    subtotal: false,
  },
  {
    id: 6,
    field01: '한화시그니처 여성 건강보험 4.0',
    field02: '전속요약',
    field03: '전속요약',
    field04: 2,
    field05: 21,
    field06: 0,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: '0%',
    subtotal: true,
  },
  {
    id: 7,
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
    subtotal: false,
  },
  {
    id: 8,
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
    subtotal: false,
  },
  {
    id: 9,
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
    subtotal: false,
  },
  {
    id: 10,
    field01: '한화시그니처 여성 건강보험 4.0',
    field02: 'GA요약',
    field03: 'GA요약',
    field04: 2,
    field05: 21,
    field06: 0,
    field07: 0,
    field08: 0,
    field09: 0,
    field10: 1,
    field11: 24,
    field12: '0%',
    subtotal: true,
  },
];

export default function Ltpa570Section() {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
  });

  const [rowData] = React.useState<Ltpa570DummyDataRow[]>(Ltpa570DummyData);

  // AgGrid Column
  const columnDefs: (ColDef<Ltpa570DummyDataRow> | ColGroupDef<Ltpa570DummyDataRow>)[] = [
    {
      headerName: '상품',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center [&>div]:whitespace-normal',
      spanRows: true,
      autoHeight: true,
      colSpan: (params) => (params.node?.rowPinned === 'bottom' ? 3 : 1),
    },
    {
      headerName: '채널',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center',
      spanRows: true,
      autoHeight: true,
      colSpan: (params) => (params.node?.rowPinned === 'bottom' ? 0 : params.data?.subtotal ? 2 : 1),
    },
    {
      headerName: '본부명',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center',
      autoHeight: true,
      colSpan: (params) => (params.node?.rowPinned === 'bottom' || params.data?.subtotal ? 0 : 1),
    },
    {
      headerName: '단순설계',
      width: 80,
      field: 'field04',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '설계중',
      width: 80,
      field: 'field05',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '설계완료',
      width: 80,
      field: 'field06',
      cellClass: 'text-center',
      cellRenderer: (params: ICellRendererParams<Ltpa570DummyDataRow>) =>
        params.data?.field06Type ? (
          <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
            {params.value}
          </Button>
        ) : (
          params.value
        ),
      autoHeight: true,
    },
    {
      headerName: '청약중',
      width: 80,
      field: 'field07',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '청약심사완료',
      width: 80,
      field: 'field08',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '청약완료',
      flex: 1,
      field: 'field09',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '수납완료',
      flex: 1,
      field: 'field10',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '총합계',
      flex: 1,
      field: 'field11',
      cellClass: 'text-center truncate',
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<Ltpa570DummyDataRow>) =>
        params.data?.field10Type ? (
          <Button
            color="link"
            className="text-[var(--color-text-danger)]"
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
      headerComponent: () => (
        <Grow className="w-full justify-center leading-tight">
          증감율%
          <br />
          (전일대비)
        </Grow>
      ),
      flex: 1,
      field: 'field12',
      cellClass: 'text-center',
      autoHeight: true,
    },
  ];

  const pageSize = 2;
  const { loadedCount, totalCount, dataSource, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: Ltpa570DummyData,
    pageSize,
  });

  const sumRow = React.useMemo<Ltpa570DummyDataRow[]>(() => {
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

    const { currentTotal, planATotal, planBTotal, planCTotal, planDTotal, planETotal, planFTotal, planGTotal } =
      rowData.reduce(
        (acc, row) => {
          if (row.subtotal) {
            return acc;
          }

          acc.planATotal += toNumber(row.field04);
          acc.planBTotal += toNumber(row.field05);
          acc.planCTotal += toNumber(row.field06);
          acc.planDTotal += toNumber(row.field07);
          acc.planETotal += toNumber(row.field08);
          acc.planFTotal += toNumber(row.field09);
          acc.planGTotal += toNumber(row.field10);
          acc.currentTotal += toNumber(row.field11);

          return acc;
        },
        {
          currentTotal: 0,
          planATotal: 0,
          planBTotal: 0,
          planCTotal: 0,
          planDTotal: 0,
          planETotal: 0,
          planFTotal: 0,
          planGTotal: 0,
        }
      );

    return [
      {
        id: -1,
        field01: '총합계',
        field02: '',
        field03: '',
        field04: planATotal,
        field05: planBTotal,
        field06: planCTotal,
        field07: planDTotal,
        field08: planETotal,
        field09: planFTotal,
        field10: planGTotal,
        field11: currentTotal,
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
            pageId: 'LTPA570',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr_auto] h-full" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable
                variant={'none'}
                lineTop={false}
                caption="설계번호"
                cols={['w-[1rem]', 'w-[60rem] ', 'w-[1rem]', 'min-w-[4.8rem] w-auto']}
              >
                <FormRow>
                  <FormCell title={'조직구분'} tdClassName="grid grid-cols-[auto_auto_auto_auto]" colSpan={3}>
                    <NativeSelect
                      aria-label="조직구분"
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
                      aria-label="자점구분"
                      value={form.type04}
                      onChange={(e) => setFormField('type04', e.target.value)}
                    >
                      {[
                        { value: 'selection0401', label: '자점1' },
                        { value: 'selection0402', label: '자점2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'상품'} tdClassName="grid grid-cols-[auto_auto_1fr]">
                    <Input aria-label="" value={'LA1301097'} required />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input
                      aria-label=""
                      value={'한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601'}
                      readOnly
                    />
                  </FormCell>
                  <FormCell title={'설계일자'} tdClassName="grid grid-cols-[auto_auto]">
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
            <Grid className="grid-rows-[1fr]">
              <div className="ag-theme-alpine ltpa010-grid">
                <AgGridReact<Ltpa570DummyDataRow>
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowId={(params) => String(params.data.id)}
                  getRowClass={(params) => (params.data?.subtotal ? 'ag-row-subtotal' : undefined)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                    autoHeaderHeight: true,
                  }}
                  domLayout="autoHeight"
                  cacheBlockSize={pageSize}
                  maxBlocksInCache={2}
                  datasource={dataSource}
                  enableCellSpan={true}
                  pinnedBottomRowData={sumRow}
                />
              </div>
              <TableMore
                loadedCount={loadedCount}
                totalCount={totalCount}
                pageSize={pageSize}
                onLoadAll={handleLoadAll}
                onLoadNext={handleLoadNext}
              />
            </Grid>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1}>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  삭제설계 확인
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  출력물
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  완수수납
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  설계비교
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  알림톡발송
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  셀프고지
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  증권발송
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  계약자발송
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  이미지조회
                </Button>
              </Grow>
              <Grow gap={1}>
                <Button variant={'contained'} size={'xl'} color={'gray-light'}>
                  설계예외처리
                </Button>
                <Button variant={'contained'} size={'xl'} color={'gray-light'}>
                  저장
                </Button>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  설계삭제
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
