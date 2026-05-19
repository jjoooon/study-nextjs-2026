/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, numberValueFormatter, useAgGridInfiniteAppend } from '@aggrid';
import { Grid, Grow, Gcol } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';

import { TableMore } from '@common/TablePagination';
import { PageID } from '@features/PageID';
import { ResetIcon, SearchIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { MainBottom, MainBottomItem } from '@/shared/components/features/MainFoot';
import { useFormFields } from '@/shared/hooks/useFormFields';

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
  const pageSize = 5;
  const { loadedCount, totalCount, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: DummyData,
    pageSize,
  });
  const visibleRows = React.useMemo(() => DummyData.slice(0, loadedCount), [loadedCount]);

  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '업무구분',
      field: 'field01',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '증권번호',
      field: 'field02',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '설계번호',
      field: 'field03',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '상품명',
      field: 'field04',
      flex: 1.4,
      cellClass: 'text-center',
    },
    {
      headerName: '계약자',
      field: 'field05',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '모집자명',
      field: 'field06',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '모집자코드',
      field: 'field07',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '지점',
      field: 'field08',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '보험료(원)',
      field: 'field09',
      width: 120,
      cellClass: 'text-center',
      valueFormatter: numberValueFormatter<DummyDataType>,
    },
    {
      headerName: '사유',
      field: 'field10',
      flex: 1,
      cellClass: 'editable-cell text-center',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '선택1'] },
    },
    {
      headerName: '승인',
      field: 'field11',
      width: 80,
      cellClass: 'editable-cell text-center',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '선택1'] },
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
          <Grid className="grid-rows-[auto_1fr_auto]" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable
                variant={'none'}
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
                      <Input aria-label="" width={110} value={''} />
                    ) : (
                      <>
                        <Input aria-label="" width={90} value={''} />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="" width={120} value={'김한화'} readOnly />
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
                    <DatePickerInput mode="range" onChange={() => {}} size="lg" value="" />
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
            <TableFold className="grid-rows-[auto_1fr_auto]">
              <TableFoldHead title="대상리스트"></TableFoldHead>
              <TableFoldBody>
                <Gcol className="w-full" gap={1}>
                  <div className="ag-theme-alpine min-h-150">
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
                        width: 40,
                        cellClass: 'text-center editable-cell',
                      }}
                    />
                  </div>
                  <TableMore
                    isAll={false}
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
