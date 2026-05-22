/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, useAgGridInfiniteAppend } from '@aggrid';
import { Grid, Grow, Gcol } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';

import { TableMore } from '@common/TablePagination';
import { PageID } from '@features/PageID';
import { ResetIcon, FileImportIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { MainBottom, MainBottomItem } from '@/shared/components/features/MainFoot';
import { useFormFields } from '@/shared/hooks/useFormFields';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  field01: number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
  field09: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: 8,
    field02: '로그구분1',
    field03: '-',
    field04: '2026-03-01',
    field05: '항목명1',
    field06: '항목명2',
    field07: '항목명3',
    field08: '항목명4',
    field09: '항목명5',
  },
  {
    id: 2,
    field01: 7,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
  },
  {
    id: 3,
    field01: 6,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
  },
  {
    id: 4,
    field01: 5,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
  },
  {
    id: 5,
    field01: 4,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
  },
  {
    id: 6,
    field01: 3,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
  },
  {
    id: 7,
    field01: 2,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
  },
  {
    id: 8,
    field01: 1,
    field02: '로그구분1',
    field03: 'Data',
    field04: '2026-03-01',
    field05: 'Data',
    field06: 'Data',
    field07: 'Data',
    field08: 'Data',
    field09: 'Data',
  },
  
];

export default function Ltpa460Section() {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  const pageSize = 5;
  const { loadedCount, totalCount, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: rowData,
    pageSize,
  });
  const visibleRows = React.useMemo(() => DummyData.slice(0, loadedCount), [loadedCount]);

  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '번호',
      field: 'field01',
      width: 60,
      cellClass: 'text-center',
      autoHeight: true,
      pinned: 'left',
    },
    {
      headerName: '로그구분',
      field: 'field02',
      width: 120,
      cellClass: 'text-left',
      autoHeight: true,
      pinned: 'left',
    },
    {
      headerName: '거래코드',
      field: 'field03',
      width: 120,
      cellClass: 'text-left',
      autoHeight: true,
      pinned: 'left',
    },
    {
      headerName: '시작일시',
      field: 'field04',
      width: 100,
      cellClass: 'text-center',
      pinned: 'left',
    },
    {
      headerName: 'KEY1',
      field: 'field05',
      flex: 1,
      autoHeight: true,
      cellClass: 'text-left',
    },
    {
      headerName: 'KEY2',
      field: 'field06',
      flex: 1,
      cellClass: 'text-left',
      autoHeight: true,
    },
    {
      headerName: 'KEY3',
      field: 'field07',
      flex: 1,
      cellClass: 'text-left',
      autoHeight: true,
    },
    {
      headerName: 'KEY4',
      field: 'field08',
      flex: 1,
      cellClass: 'text-left',
      autoHeight: true,
    },
    {
      headerName: 'KEY5',
      field: 'field09',
      flex: 1,
      cellClass: 'text-left',
      autoHeight: true,
    },
  ];

  // form event
  const [form, setFormField] = useFormFields({
    type01: 'selection1',
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
            pageName: '검증화면 조회',
            pageId: 'LTPA460',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr_auto]" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable
                variant={'none'}
                caption="검증화면 조회 테이블"
                cols={['w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'조회기간'}>
                    <DatePickerInput
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      mode="range"
                      onChange={() => {}}
                      rangeValue={{
                        from: '2026-03-01',
                        to: '2026-03-07',
                      }}
                      size="lg"
                      width="sm"
                    />
                  </FormCell>
                  <FormCell title={'검증업무구분'}>
                    <NativeSelect
                      aria-label="검증업무구분 선택"
                      width={108}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: '', label: '보험료' },
                        { value: 'selection1', id: 'type02-1', label: '추천보험료' },
                        { value: 'selection2', id: 'type02-2', label: '예상환급금' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'설계번호'}>
                    <Input aria-label="번호" width={150} value={''} />
                  </FormCell>
                  <FormCell title={'발행후변경순번'}>
                    <Input aria-label="번호" width={150} value={''} />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'로그구분'}>
                    <NativeSelect
                      aria-label="로그구분 선택"
                      width={108}
                      value={form.type03}
                      onChange={(e) => setFormField('type03', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: '', label: '선택' },
                        { value: 'selection1', id: 'type03-1', label: '선택2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'거개코드'}>
                    <NativeSelect
                      aria-label="거개코드 선택"
                      width={108}
                      value={form.type04}
                      onChange={(e) => setFormField('type04', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: '', label: '선택' },
                        { value: 'selection1', id: 'type04-1', label: '선택1' },
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
            <Gcol className="w-full grid-rows-[auto_1fr_auto]" gap={1}>
              <Grow className="w-full flex justify-end">
                <Button color="success" variant="outlined">
                  엑셀가져오기
                  <FileImportIcon />
                </Button>
              </Grow>
              <div className="ag-theme-alpine min-h-150">
                <AgGridReact<DummyDataType>
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={visibleRows}
                  columnDefs={columnDefs}
                  singleClickEdit={true}
                  domLayout="normal"
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
