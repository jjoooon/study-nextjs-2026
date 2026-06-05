/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createAddRowHandler, createDeleteSelectedRowsHandler } from '@aggrid';
import { Grid, Grow, Gcol, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';

import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { ResetIcon, ZoomInIcon, ZoomOutIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  field01: string;
  field02: string;
  field03: string;
  field04: string;
  field05: string;
  field06: string;
  field07: string;
  field08: string;
  field09: string;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: 'LA260204310632',
    field02: 'LA00102001',
    field03: '한화 더 경증 간편건강보험(세만기형) 무배당2601',
    field04: '문서서명',
    field05: 'TM',
    field06: 'YYYY-MM-DD',
    field07: '수납완료',
    field08: '김한화화(4404732)',
    field09: '미발행',
  },
  {
    id: 2,
    field01: 'LA260204310632',
    field02: 'LA00102001',
    field03: '한화 더 경증 간편건강보험(세만기형) 무배당2601',
    field04: '문서서명',
    field05: 'TM',
    field06: 'YYYY-MM-DD',
    field07: 'TEXT',
    field08: '김한화(4404732)',
    field09: 'TEXT',
  },
  {
    id: 3,
    field01: 'LA260204310632',
    field02: 'LA00102001',
    field03: '한화 더 경증 간편건강보험(세만기형) 무배당2601',
    field04: '문서서명',
    field05: 'TM',
    field06: 'YYYY-MM-DD',
    field07: 'TEXT',
    field08: '김한화(4404732)',
    field09: 'TEXT',
  },
  {
    id: 4,
    field01: 'LA260204310632',
    field02: 'LA00102001',
    field03: '한화 더 경증 간편건강보험(세만기형) 무배당2601',
    field04: '문서서명',
    field05: 'TM',
    field06: 'YYYY-MM-DD',
    field07: 'TEXT',
    field08: '김한화(4404732)',
    field09: 'TEXT',
  },
];

export default function Ltpa340Section() {
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

  // 행추가, 삭제----------------------------------
  const handleAddRow = React.useMemo(
    () =>
      createAddRowHandler<DummyDataType, number>(setRowData, {
        idKey: 'id',
        getNextId: (rows) => {
          const maxId = rows.reduce((max, row) => Math.max(max, row.id), 0);
          return maxId + 1;
        },
        createRow: (nextId) => ({
          id: nextId,
          isCheck: true,
          field01: '',
          field02: '',
          field03: '',
          field04: '',
          field05: '',
          field06: '',
          field07: '',
          field08: '',
          field09: '',
        }),
        insertAt: 'end',
      }),
    [setRowData]
  );

  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);

  const handleDeleteButtonClick = React.useMemo(
    () =>
      createDeleteSelectedRowsHandler<DummyDataType>(setRowData, gridApiRef, {
        idKey: 'id',
      }),
    [setRowData, gridApiRef]
  );
  const selectCellRenderer = React.useCallback(<TData,>(params: ICellRendererParams<TData>) => {
    const value = params.value == null ? '' : String(params.value);
    const hasValue = value.trim().length > 0;

    if (hasValue) {
      return (
        <div className="flex h-full w-full items-center justify-center px-1">
          <span className="block min-w-0 flex-1 truncate text-center leading-[2.5rem]">{value}</span>
        </div>
      );
    }

    return (
      <div className="flex h-full w-full items-center justify-between gap-1 px-1">
        <span className="block min-w-0 flex-1" />
        <span className="ag-icon ag-icon-small-down shrink-0" aria-hidden="true" />
      </div>
    );
  }, []);
  //  ---------------------------------- 행추가 ,삭제

  // 2026-06-04 flex, minWidth 수정
  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '설계번호',
      field: 'field01',
      flex: 1,
      minWidth: 110,
      cellClass: 'editable-cell',
      editable: true,
    },
    {
      headerName: '상품코드',
      field: 'field02',
      flex: 1,
      minWidth: 90,
      cellClass: 'editable-cell',
      editable: true,
    },
    {
      headerName: '상품명',
      field: 'field03',
      flex: 6,
      minWidth: 250,
      cellClass: 'text-left',
    },
    {
      headerName: '출력물구분',
      field: 'field04',
      flex: 1,
      minWidth: 85,
      editable: true,
      cellClass: 'editable-cell',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['전체', '문서서명'] },
      cellRenderer: selectCellRenderer,
    },
    {
      headerName: '판매허용채널',
      field: 'field05',
      flex: 1,
      minWidth: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '보험시기',
      field: 'field06',
      flex: 1,
      minWidth: 90,
      cellClass: 'text-center',
    },
    {
      headerName: '설계상태',
      field: 'field07',
      flex: 1,
      minWidth: 70,
      cellClass: 'text-center',
    },
    {
      headerName: '설계자',
      field: 'field08',
      flex: 1,
      minWidth: 110,
      cellClass: 'text-center',
    },
    {
      headerName: '발행성공여부',
      field: 'field09',
      flex: 1,
      minWidth: 85,
      cellClass: 'text-center',
    },
  ];

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
  });

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '장기신계약발급물일괄생성',
            pageId: 'LTPA340',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr] h-full" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable
                variant={'none'}
                caption="장기신계약발급물일괄생성 테이블"
                cols={['w-1', 'w-1', 'w-1', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'등록일자'}>
                    <NativeSelect
                      aria-label="항목 선택"
                      width={108}
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                      required
                    >
                      {[
                        { value: 'selection1', id: 'type01-1', label: '전체' },
                        { value: 'selection2', id: 'type01-2', label: '보험시기' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <DatePickerInput mode="range" onChange={() => {}} size="lg" value="" required />
                  </FormCell>
                  <FormCell title={'검색조건'}>
                    <NativeSelect
                      aria-label="검색조건 선택"
                      width={108}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                      required
                    >
                      {[{ value: 'selection', id: 'type02-1', label: '상품코드' }].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input width={130} value={'LA260204310632'} maxLength={10} />
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
            <Gcol className="w-full grid-rows-[auto_1fr] h-full" gap={1}>
              <Grow className="w-full" placement="ec">
                <Grow>
                  <Typo>서명방법</Typo>
                  <NativeSelect aria-label="검색조건 선택" width={108} size={'md'}>
                    {[
                      { value: 'selection01', label: '전체' },
                      { value: 'selection02', label: '문서서명' },
                      { value: 'selection03', label: '전자서명' },
                    ].map((option) => (
                      <NativeSelectOption key={option.value} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </Grow>
                <Button variant={'outlined'} color={'secondary'} onClick={handleAddRow}>
                  행추가
                  <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
                </Button>
                <Button variant={'outlined'} color={'secondary'} onClick={handleDeleteButtonClick}>
                  행삭제
                  <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                </Button>
              </Grow>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType>
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData}
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
                  onGridReady={(params) => {
                    gridApiRef.current = params.api;
                  }}
                />
              </div>
            </Gcol>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem className="justify-end">
              <Grow gap={1}>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  상품설명서발행
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  청약서류발행
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  보험증권발행
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  보장상세발행
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  설계정보 일괄조회
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  신_상품설명서발행
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  전체발행
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
