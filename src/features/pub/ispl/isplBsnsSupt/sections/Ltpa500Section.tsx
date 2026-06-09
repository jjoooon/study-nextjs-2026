/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useAgGridInfiniteAppend, useDynamicColumnWidths } from '@aggrid';
import { Grid, Grow, Gcol } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';

import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { ResetIcon, SearchIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
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
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '(전속)영업관리자승인계약',
    field02: 'LA20148716422000',
    field03: 'LA20148716422001',
    field04: 'LA01581001_무배당 참 편한 건',
    field05: '김한화',
    field06: '박한화',
    field07: '8094210',
    field08: '신부산GA지점',
    field09: '999999999',
    field10: 'TEXT',
    field11: '선택',
  },
  {
    id: 2,
    field01: '(전속)영업관리자승인계약',
    field02: 'LA20148716422000',
    field03: 'LA20148716422001',
    field04: 'LA01581001_무배당 참 편한 건',
    field05: '김한화',
    field06: '박한화',
    field07: '8094210',
    field08: '신부산GA지점',
    field09: '999999999',
    field10: 'TEXT',
    field11: '선택',
  },
  {
    id: 3,
    field01: '(전속)영업관리자승인계약',
    field02: 'LA20148716422000',
    field03: 'LA20148716422001',
    field04: 'LA01581001_무배당 참 편한 건',
    field05: '김한화',
    field06: '박한화',
    field07: '8094210',
    field08: '신부산GA지점',
    field09: '999999999',
    field10: 'TEXT',
    field11: '선택',
  },
  {
    id: 4,
    field01: '(전속)영업관리자승인계약',
    field02: 'LA20148716422000',
    field03: 'LA20148716422001',
    field04: 'LA01581001_무배당 참 편한 건',
    field05: '김한화',
    field06: '박한화',
    field07: '8094210',
    field08: '신부산GA지점',
    field09: '999999999',
    field10: 'TEXT',
    field11: '선택',
  },
  {
    id: 5,
    field01: '(전속)영업관리자승인계약',
    field02: 'LA20148716422000',
    field03: 'LA20148716422001',
    field04: 'LA01581001_무배당 참 편한 건',
    field05: '김한화',
    field06: '박한화',
    field07: '8094210',
    field08: '신부산GA지점',
    field09: '999999999',
    field10: 'TEXT',
    field11: '선택',
  },
  {
    id: 6,
    field01: '(전속)영업관리자승인계약',
    field02: 'LA20148716422000',
    field03: 'LA20148716422001',
    field04: 'LA01581001_무배당 참 편한 건',
    field05: '김한화',
    field06: '박한화',
    field07: '8094210',
    field08: '신부산GA지점',
    field09: '999999999',
    field10: 'TEXT',
    field11: '선택',
  },
  {
    id: 7,
    field01: '(전속)영업관리자승인계약',
    field02: 'LA20148716422000',
    field03: 'LA20148716422001',
    field04: 'LA01581001_무배당 참 편한 건',
    field05: '김한화',
    field06: '박한화',
    field07: '8094210',
    field08: '신부산GA지점',
    field09: '999999999',
    field10: 'TEXT',
    field11: '선택',
  },
  {
    id: 8,
    field01: '(전속)영업관리자승인계약',
    field02: 'LA20148716422000',
    field03: 'LA20148716422001',
    field04: 'LA01581001_무배당 참 편한 건',
    field05: '김한화',
    field06: '박한화',
    field07: '8094210',
    field08: '신부산GA지점',
    field09: '999999999',
    field10: 'TEXT',
    field11: '선택',
  },
  {
    id: 9,
    field01: '(전속)영업관리자승인계약',
    field02: 'LA20148716422000',
    field03: 'LA20148716422001',
    field04: 'LA01581001_무배당 참 편한 건',
    field05: '김한화',
    field06: '박한화',
    field07: '8094210',
    field08: '신부산GA지점',
    field09: '999999999',
    field10: 'TEXT',
    field11: '선택',
  },
  {
    id: 10,
    field01: '(전속)영업관리자승인계약',
    field02: 'LA20148716422000',
    field03: 'LA20148716422001',
    field04: 'LA01581001_무배당 참 편한 건',
    field05: '김한화',
    field06: '박한화',
    field07: '8094210',
    field08: '신부산GA지점',
    field09: '999999999',
    field10: 'TEXT',
    field11: '선택',
  },
];

export default function Ltpa500Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const pageSize = 5;
  const { loadedCount, totalCount, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: DummyData,
    pageSize,
  });
  const visibleRows = React.useMemo(() => DummyData.slice(0, loadedCount), [loadedCount]);

  const selectCellRenderer = React.useCallback(<TData,>(params: ICellRendererParams<TData>) => {
    const value = params.value == null ? '' : String(params.value);

    return (
      <div className="flex h-full w-full items-center justify-between gap-1 px-1">
        <span className="block min-w-0 flex-1 truncate text-center leading-[2.5rem]">{value}</span>
        <span className="ag-icon ag-icon-small-down shrink-0" aria-hidden="true" />
      </div>
    );
  }, []);
  // AgGrid Column
  // 2026-05-29 수정 cellClass 수정
  // 2026-06-01 width, flex 수정 및 cellClass 수정
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '업무구분',
      field: 'field01',
      flex: 1,
      minWidth: attributeColumnWidth(160),
      cellClass: 'text-center',
    },
    {
      headerName: '증권번호',
      field: 'field02',
      width: attributeColumnWidth(120),
      cellClass: 'text-center',
    },
    {
      headerName: '설계번호',
      field: 'field03',
      width: attributeColumnWidth(120),
      cellClass: 'text-center',
    },
    {
      headerName: '상품명',
      field: 'field04',
      flex: 5,
      minWidth: attributeColumnWidth(230),
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
    },
    {
      headerName: '계약자',
      field: 'field05',
      width: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
    {
      headerName: '모집자명',
      field: 'field06',
      width: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
    {
      headerName: '모집자코드',
      field: 'field07',
      width: attributeColumnWidth(70),
      cellClass: 'text-center',
    },
    {
      headerName: '지점',
      field: 'field08',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      cellClass: 'text-center',
    },
    {
      headerName: '보험료(원)',
      field: 'field09',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter<DummyDataType>,
    },
    {
      headerName: '사유',
      field: 'field10',
      flex: 2,
      minWidth: attributeColumnWidth(120),
      cellClass: 'editable-cell text-left',
      editable: true,
      cellEditor: 'agInputCellEditor',
    },
    {
      headerName: '승인',
      field: 'field11',
      width: attributeColumnWidth(85),
      cellClass: 'editable-cell text-center',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '승인', '거절'] },
      cellRenderer: selectCellRenderer,
    },
  ];

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
  });

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '장기신계약가입설계결재정보',
            pageId: 'LTPA500',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr_auto] h-full" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable
                variant={'head'}
                caption="장기신계약가입설계결재정보 테이블"
                cols={['w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'조회구분'}>
                    <NativeSelect
                      aria-label="항목 선택"
                      width={108}
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                    >
                      {[
                        { value: 'selection1', id: 'type01-1', label: '담당기관' },
                        { value: 'selection2', id: 'type01-2', label: '설계번호' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    {form.type01 === 'selection2' ? (
                      <Input aria-label="" width={110} value={'12345678'} />
                    ) : (
                      <>
                        <Input aria-label="" width={90} value={'12345678'} />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="" width={120} value={'신부산GA지점'} readOnly />
                      </>
                    )}
                  </FormCell>
                  <FormCell title={'업무구분'}>
                    <NativeSelect
                      aria-label="업무구분 선택"
                      width={190}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type02-1', label: '전체' },
                        { value: 'selection1', id: 'type02-2', label: '유지율부실예상' },
                        { value: 'selection1', id: 'type02-2', label: '유의승환' },
                        { value: 'selection1', id: 'type02-2', label: '(전속)/영업관리자승인계약' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'승인여부'}>
                    <NativeSelect
                      aria-label="승인여부 선택"
                      width={110}
                      value={form.type03}
                      onChange={(e) => setFormField('type03', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type03-1', label: '전체' },
                        { value: 'selection1', id: 'type03-2', label: '승인' },
                        { value: 'selection2', id: 'type03-2', label: '거절' },
                        { value: 'selection3', id: 'type03-2', label: '미결재' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'설계일자'}>
                    <DatePickerInput
                      mode="range"
                      onChange={() => {}}
                      size="lg"
                      rangeValue={{ from: '2026-05-03', to: '2026-05-11' }}
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
            <TableFold>
              <TableFoldHead title="대상리스트"></TableFoldHead>
              <TableFoldBody>
                <Gcol className="w-full" gap={1}>
                  <div className="ag-theme-alpine">
                    <AgGridReact<DummyDataType>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={visibleRows}
                      columnDefs={columnDefs}
                      singleClickEdit={true}
                      domLayout="normal"
                      rowSelection={{
                        mode: 'multiRow',
                        checkboxes: true,
                        enableClickSelection: true,
                      }}
                      selectionColumnDef={{
                        width: 30,
                      }}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                  <TableMore
                    isAll={true}
                    loadedCount={loadedCount}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onLoadAll={handleLoadAll}
                    onLoadNext={handleLoadNext}
                  />
                </Gcol>
              </TableFoldBody>
            </TableFold>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem className="justify-end">
              <Grow gap={1}>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  저장
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
