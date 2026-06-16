/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Grid, Grow } from '@atoms';
import { SearchIcon, ResetIcon, FileExportIcon } from '@icons';
import { useAgGridInfiniteAppend, useDynamicColumnWidths } from '@aggrid';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { TableMore } from '@common/TablePagination';
import { PageID } from '@features/PageID';
import { LayoutHead } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { useFormFields } from '@hooks/useFormFields';

type Ltpa300DummyDataRow = {
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
  field13: string | number;
  field14: string | number;
};
const Ltpa300DummyData: Ltpa300DummyDataRow[] = [
  {
    id: 1,
    field01: '신부산GA지점',
    field02: '123456',
    field03: '김한화',
    field04: '123456',
    field05: '심한화',
    field06: 'LA20148716422000',
    field07: 'data',
    field08: '비활성(직원처리)',
    field09: '박한화',
    field10: '2026-03-01',
    field11: 'data',
    field12: 'data',
    field13: 'data',
    field14: 'data',
  },
  {
    id: 2,
    field01: '신부산GA지점',
    field02: '123456',
    field03: '김한화',
    field04: '123456',
    field05: '심한화',
    field06: 'LA20148716422000',
    field07: 'data',
    field08: '비활성(직원처리)',
    field09: '박한화',
    field10: '2026-03-01',
    field11: 'data',
    field12: 'data',
    field13: 'data',
    field14: 'data',
  },
  {
    id: 3,
    field01: '신부산GA지점',
    field02: '123456',
    field03: '김한화',
    field04: '123456',
    field05: '심한화',
    field06: 'LA20148716422000',
    field07: 'data',
    field08: '비활성(직원처리)',
    field09: '박한화',
    field10: '2026-03-01',
    field11: 'data',
    field12: 'data',
    field13: 'data',
    field14: 'data',
  },
  {
    id: 4,
    field01: '신부산GA지점',
    field02: '123456',
    field03: '김한화',
    field04: '123456',
    field05: '심한화',
    field06: 'LA20148716422000',
    field07: 'data',
    field08: '비활성(직원처리)',
    field09: '박한화',
    field10: '2026-03-01',
    field11: 'data',
    field12: 'data',
    field13: 'data',
    field14: 'data',
  },
  {
    id: 5,
    field01: '신부산GA지점',
    field02: '123456',
    field03: '김한화',
    field04: '123456',
    field05: '심한화',
    field06: 'LA20148716422000',
    field07: 'data',
    field08: '비활성(직원처리)',
    field09: '박한화',
    field10: '2026-03-01',
    field11: 'data',
    field12: 'data',
    field13: 'data',
    field14: 'data',
  },
  {
    id: 6,
    field01: '신부산GA지점',
    field02: '123456',
    field03: '김한화',
    field04: '123456',
    field05: '심한화',
    field06: 'LA20148716422000',
    field07: 'data',
    field08: '비활성(직원처리)',
    field09: '박한화',
    field10: '2026-03-01',
    field11: 'data',
    field12: 'data',
    field13: 'data',
    field14: 'data',
  },
  {
    id: 7,
    field01: '신부산GA지점',
    field02: '123456',
    field03: '김한화',
    field04: '123456',
    field05: '심한화',
    field06: 'LA20148716422000',
    field07: 'data',
    field08: '비활성(직원처리)',
    field09: '박한화',
    field10: '2026-03-01',
    field11: 'data',
    field12: 'data',
    field13: 'data',
    field14: 'data',
  },
];

export default function Ltpa300Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
  });
  // 2026-06-04 flex, minWidth 수정
  const columnDefs = React.useMemo<ColDef<Ltpa300DummyDataRow>[]>(
    () => [
      {
        headerName: '취급기관',
        field: 'field01',
        flex: 2,
        minWidth: attributeColumnWidth(120),
      },
      { headerName: '모집직원번호', field: 'field02', flex: 1, minWidth: attributeColumnWidth(90) },
      { headerName: '모집직원', field: 'field03', width: attributeColumnWidth(75) },
      { headerName: '사용인번호', field: 'field04', flex: 1, minWidth: attributeColumnWidth(90) },
      {
        headerName: '사용인',
        field: 'field05',
        width: attributeColumnWidth(75),
      },
      {
        headerName: '증권번호',
        field: 'field06',
        flex: 1,
        minWidth: attributeColumnWidth(130),
      },
      {
        headerName: '점검설계번호',
        field: 'field07',
        flex: 1,
        minWidth: attributeColumnWidth(90),
      },
      {
        headerName: '점검',
        field: 'field08',
        flex: 1,
        minWidth: attributeColumnWidth(110),
      },
      {
        headerName: '피보험자명',
        field: 'field09',
        width: attributeColumnWidth(75),
      },
      { headerName: '점검일자', field: 'field10', width: attributeColumnWidth(90) },
      {
        headerName: '점검순번',
        field: 'field11',
        flex: 1,
        minWidth: attributeColumnWidth(80),
      },
      {
        headerName: '사전예외사용여부',
        field: 'field12',
        flex: 1,
        minWidth: attributeColumnWidth(110),
      },
      {
        headerName: '점검방법',
        field: 'field13',
        flex: 1,
        minWidth: attributeColumnWidth(70),
      },
      {
        headerName: '한도초과건수',
        field: 'field14',
        flex: 1,
        minWidth: attributeColumnWidth(80),
      },
    ],
    [attributeColumnWidth]
  );
  const gridRef = React.useRef<AgGridReact<Ltpa300DummyDataRow>>(null);
  const pageSize = 4;
  const {
    loadedCount,
    totalCount,
    dataSource,
    handleLoadAll: handleLoadAllDefault,
    handleLoadNext: handleLoadNextDefault,
    handleLoadReset: handleLoadResetDefault,
  } = useAgGridInfiniteAppend({
    allRows: Ltpa300DummyData,
    pageSize,
  });

  const handleLoadNext = React.useCallback(() => {
    handleLoadNextDefault();
  }, [handleLoadNextDefault]);

  const handleLoadAll = React.useCallback(() => {
    handleLoadAllDefault();
  }, [handleLoadAllDefault]);

  const handleLoadReset = React.useCallback(() => {
    handleLoadResetDefault();
  }, [handleLoadResetDefault]);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '정액담보점검목록 조회',
            pageId: 'LTPA300',
          }}
        />
      </LayoutHead>

      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid-rows-[auto_1fr] gap-4 h-full">
            <Grow className="w-full" variant="box-round" placement={'bwe'}>
              <FormTable
                variant={'none'}
                lineTop={false}
                caption="정액담보점검목록 조회"
                cols={['w-[6rem]', 'w-[22rem]', 'w-[8rem]', 'w-[38rem]', 'w-[8rem]', 'w-[auto]']}
              >
                <FormRow>
                  <FormCell title={'점검일자'}>
                    <DatePickerInput
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      mode="range"
                      onChange={() => {}}
                      rangeValue={{ from: '2026-03-01', to: '2026-03-07' }}
                      size="lg"
                      required
                    />
                  </FormCell>
                  <FormCell title={'조직구분'}>
                    <NativeSelect
                      aria-label="설계조직 선택"
                      value={form.type01}
                      width={100}
                      required
                      onChange={(e) => setFormField('type01', e.target.value)}
                    >
                      {[
                        { value: '취급기관', id: 'type01-1', label: '취급기관' },
                        { value: '취급직원', id: 'type01-2', label: '취급직원' },
                        { value: '사용인', id: 'type01-3', label: '사용인' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input
                      aria-label="조직구분명 입력"
                      width={100}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                      required
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="조직구분명 입력" width={140} value={'신부산GA지점'} readOnly />
                  </FormCell>
                  {/* 2026-05-27 */}
                  <FormCell title={'점검방법'}>
                    <NativeSelect
                      aria-label="점검방법 선택"
                      value={form.type03}
                      width={140}
                      onChange={(e) => setFormField('type03', e.target.value)}
                    >
                      {[
                        { value: '전체', id: 'type03-1', label: '전체' },
                        { value: '배치', id: 'type03-2', label: '배치' },
                        { value: '온라인', id: 'type03-3', label: '온라인' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'증권번호'}>
                    <Input
                      aria-label="증권번호 입력"
                      width={140}
                      value={'LA20148716422000'}
                      onChange={(e) => setFormField('type04', e.target.value)}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </FormCell>
                  <FormCell title={'점검결과'}>
                    <NativeSelect
                      aria-label="점검방법 선택"
                      value={form.type05}
                      width={140}
                      onChange={(e) => setFormField('type05', e.target.value)}
                    >
                      {[
                        { value: '활성(전체)', id: 'type05-1', label: '활성(전체)' },
                        { value: '비활성(직원처리)', id: 'type05-2', label: '비활성(직원처리)' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'점검구분'}>
                    <NativeSelect
                      aria-label="점검구분 선택"
                      value={form.type06}
                      width={140}
                      onChange={(e) => setFormField('type06', e.target.value)}
                    >
                      {[
                        { value: '전체', id: 'type06-1', label: '전체' },
                        { value: '사후', id: 'type06-2', label: '사후' },
                        { value: '사전', id: 'type06-3', label: '사전' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
              </FormTable>

              <Grow>
                <Button id="btnRA" color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
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

            <TableFold>
              <TableFoldHead title="정액담보점검결과(피보험자별)">
                <Button color="success" variant="outlined" onClick={() => {}}>
                  엑셀내보내기
                  <FileExportIcon />
                </Button>
              </TableFoldHead>
              <TableFoldBody className="grid-rows-[1fr_auto] gap-1">
                <div className="ag-theme-alpine min-h-[18.4rem]">
                  <AgGridReact<Ltpa300DummyDataRow>
                    ref={gridRef}
                    // noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    columnDefs={columnDefs}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                      editable: false,
                      cellClass: 'text-center',
                    }}
                    domLayout="normal"
                    key={loadedCount}
                    rowModelType="infinite"
                    cacheBlockSize={pageSize}
                    maxBlocksInCache={2}
                    datasource={dataSource}
                  />
                </div>
                <TableMore
                  gridRef={gridRef}
                  loadedCount={loadedCount}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  onLoadAll={handleLoadAll}
                  onLoadNext={handleLoadNext}
                  onLoadReset={handleLoadReset}
                />
              </TableFoldBody>
            </TableFold>
          </Grid>
        }
      />
    </>
  );
}
