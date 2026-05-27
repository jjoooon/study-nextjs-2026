/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

// M1. 팝업에서 화면으로 변경, 전체 수정

import {
  AgGridEmptyComponent,
  DatePickerCellEditor,
  useAgGridInfiniteAppend,
  editableSelectCellRenderer,
} from '@aggrid';
import { createTooltipValueGetter } from '@aggrid';
import { Grid, Grow, Gcol, Typo } from '@atoms';
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
import type { ColDef, EditableCallbackParams, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useCallback } from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  isCheck: boolean;
  isNew: boolean;
  isField01InputVisible: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    isNew: false,
    isField01InputVisible: true,
    field01: '취급직원',
    field02: '3448460',
    field03: '주식회사 마이디어',
    field04: '2026-03-01',
    field05: '9999-12-31',
    field06: '',
    field07: '',
    field08: '김한화',
  },
  {
    id: 2,
    isCheck: false,
    isNew: false,
    isField01InputVisible: true,
    field01: '취급직원',
    field02: '3448460',
    field03: '주식회사 마이디어',
    field04: '2026-03-01',
    field05: '9999-12-31',
    field06: '정상',
    field07: '대내-2507-8950-[서울GA[청약서 스캔권한 부여요청(주)]]',
    field08: '김한화',
  },
  {
    id: 3,
    isCheck: false,
    isNew: false,
    isField01InputVisible: true,
    field01: '취급직원',
    field02: '3448460',
    field03: '주식회사 마이디어',
    field04: '2026-03-01',
    field05: '9999-12-31',
    field06: '정상',
    field07: '대내-2507-8950-[서울GA[청약서 스캔권한 부여요청(주)]]',
    field08: '김한화',
  },
];

export default function Ltpa210Section() {
  const pageSize = 2;
  const { loadedCount, totalCount, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: DummyData,
    pageSize,
  });

  // 새로 추가한 행만 편집 가능
  const isEditableNewRow = React.useCallback(
    (params: EditableCallbackParams<DummyDataType>) => params.data?.isNew === true,
    []
  );

  const expiryCellRenderer = useCallback(
    (align: 'left' | 'center' | 'right' = 'right') =>
      (params: ICellRendererParams<DummyDataType>) =>
        editableSelectCellRenderer<DummyDataType>({ ...params, align }),
    []
  );

  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '구분',
      field: 'field01',
      width: 120,
      cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
      editable: isEditableNewRow,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '취급직원', ''] },
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          return expiryCellRenderer('center')(params);
        }
        // 신규
        return params.value;
      },
    },
    {
      headerName: '대상',
      field: 'field02',
      width: 160,
      suppressNavigable: true,
      cellClass: 'editable-cell text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field03' }),
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          const isInputVisible = params.data.isField01InputVisible;
          const inputContainerId = `customer-input-${String(params.data.id)}`;

          return (
            <div className="flex h-full w-full items-center gap-1 px-1" id={inputContainerId}>
              <div className="min-w-0 flex-1">
                {isInputVisible ? (
                  <Input
                    aria-label="고객명"
                    width={'full'}
                    size="sm"
                    value={String(params.data.field01 ?? '')}
                    onMouseDown={(event) => event.stopPropagation()}
                    onChange={(event) => {
                      params.node.setDataValue('field01', event.target.value);
                    }}
                  />
                ) : (
                  <div
                    className="h-8 w-full cursor-text"
                    onMouseDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                      event.stopPropagation();
                      setRowData((prev) =>
                        prev.map((row) => (row.id === params.data?.id ? { ...row, isField01InputVisible: true } : row))
                      );

                      requestAnimationFrame(() => {
                        const container = document.getElementById(inputContainerId);
                        const inputElement = container?.querySelector('input');

                        inputElement?.focus();
                      });
                    }}
                  />
                )}
              </div>
              <Button
                aria-label="검색"
                color={'gray-light'}
                variant={'outlined'}
                only="icon"
                size={'sm'}
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            </div>
          );
        }

        return <Typo>{String(params.data?.field01 ?? '')}</Typo>;
      },
    },
    {
      headerName: '적용시작일자',
      field: 'field04',
      width: 120,
      cellClass: 'flex! items-center! justify-center!',
      editable: isEditableNewRow,
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '적용종료일자',
      field: 'field05',
      width: 120,
      cellClass: 'flex! items-center! justify-center!',
      editable: isEditableNewRow,
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '상태',
      field: 'field06',
      width: 80,
      cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
      editable: isEditableNewRow,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '정상', ''] },
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          return expiryCellRenderer('center')(params);
        }
        // 신규
        return params.value;
      },
    },
    {
      headerName: '적용사유',
      field: 'field07',
      flex: 2,
      cellClass: 'flex! items-center! justify-center!',
      editable: isEditableNewRow,
      cellEditor: 'agInputCellEditor',
    },
    {
      headerName: '등록자',
      field: 'field08',
      width: 120,
      cellClass: 'flex! items-center! justify-center!',
    },
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
  });

  // agGrid 행삭제
  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);

  const handleDeleteRow = React.useCallback(() => {
    const gridApi = gridApiRef.current;
    if (!gridApi) return;

    const selectedIds = new Set(
      gridApi
        .getSelectedNodes()
        .map((node) => node.data?.id)
        .filter((id) => id !== undefined)
    );
    if (selectedIds.size === 0) return;

    setRowData((prev) => prev.filter((row) => !selectedIds.has(row.id)));
  }, [setRowData]);

  // agGrid 행추가
  const handleAddRow = React.useCallback(() => {
    setRowData((prev) => {
      const nextId = prev.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1;
      const newRow: DummyDataType = {
        id: nextId,
        isCheck: false,
        isNew: true,
        field01: '',
        field02: '',
        isField01InputVisible: false,
        field03: '',
        field04: '',
        field05: '',
        field06: '',
        field07: '',
        field08: '김한화',
      };
      return [...prev, newRow];
    });

    requestAnimationFrame(() => {
      const gridApi = gridApiRef.current;

      if (!gridApi) {
        return;
      }

      const rowIndex = gridApi.getDisplayedRowCount() - 1;
      gridApi.ensureIndexVisible(rowIndex, 'bottom');
    });
  }, [setRowData]);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '장기신계약가입설계관리정보',
            pageId: 'LTPA210',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr]" gap={3}>
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable
                variant={'head'}
                caption="장기보험 모집자 설계 조회 테이블"
                cols={['w-1', 'w-1', 'w-1', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'등록항목'}>
                    <NativeSelect
                      aria-label="항목 선택"
                      width={210}
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                      required
                    >
                      {[
                        { value: '선택', label: '선택' },
                        { value: '사용자가 IT기획팀', label: '사 용자가 IT기획팀' },
                        { value: '장기보험팀', label: '장기보험팀' },
                        { value: 'GA영업지원파트 이외인 경우', label: 'GA영업지원파트 이외인 경우' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'조직구분'}>
                    <NativeSelect
                      aria-label="조직구분 선택"
                      width={108}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                      required
                    >
                      {[
                        { value: '선택', label: '선택' },
                        { value: '취급기관', label: '취급기관' },
                        { value: '취급직원', label: '취급직원' },
                        { value: '사용인', label: '사용인' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input width={'11rem'} value={'1234567'} readOnly />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={120} value={'김한화'} readOnly />
                    <Grow className="ml-6">
                      <NativeSelect
                        aria-label="선택"
                        width={90}
                        value={form.type03}
                        onChange={(e) => setFormField('type03', e.target.value)}
                        required
                      >
                        {[
                          { value: '선택', label: '선택' },
                          { value: '항목2', label: '항목2' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <DatePickerInput mode="single" onChange={() => {}} value="" required />
                    </Grow>
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
              <TableFoldHead title="등록사항">
                <Grow>
                  <Button color="gray" variant="outlined" onClick={handleAddRow}>
                    행추가
                  </Button>
                  <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
                    행삭제
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <Gcol className="w-full" gap={1}>
                  <div className="ag-theme-alpine min-h-[18.4rem]">
                    <AgGridReact<DummyDataType>
                      // getRowId 적용: id 필드를 고유 식별자로 사용
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      enableCellSpan={true}
                      singleClickEdit={true}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: false,
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '√',
                        cellClass: 'text-center',
                        width: 30,
                      }}
                      // 행추가 된 rowCell
                      getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
                      onGridReady={(params) => {
                        gridApiRef.current = params.api;
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
