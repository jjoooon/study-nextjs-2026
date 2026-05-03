'use client';
// M1. 전체 수정
import type { ColDef, EditableCallbackParams, GridApi, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useCallback } from 'react';
import { createTooltipValueGetter } from '@/shared/components/agGridUtils';
import { LayoutFoot, LayoutHead } from '@/shared/components/layout';
import { LayoutTemplate } from '@/shared/components/layout/LayoutTemplate';
import {
  AgGridEmptyComponent,
  createFieldRenderer,
  DatePickerCellEditor,
  editableSelectCellRenderer,
  useAgGridInfiniteAppend,
} from '@aggrid';
import { Gcol, Grid, Grow } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { ResetIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  isNew: boolean;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: boolean;
  field09: string | number;
};
type DummyDataType2 = {
  id: number;
  isNew: boolean;
  isCheck: boolean;
  isField02InputVisible?: boolean;
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
    field01: '청약완료',
    field02: '',
    field03: '범용',
    field04: '적용사항 값',
    field05: '2025-01-30',
    field06: '2025-01-30',
    field07: '강한화',
    field08: true,
    field09: '비고 내용 비고내용',
  },
  {
    id: 2,
    isCheck: false,
    isNew: false,
    field01: '청약완료',
    field02: '',
    field03: '범용',
    field04: '',
    field05: '',
    field06: '',
    field07: '강한화',
    field08: false,
    field09: '',
  },
  {
    id: 3,
    isCheck: false,
    isNew: false,
    field01: '청약완료',
    field02: '',
    field03: '범용',
    field04: '',
    field05: '',
    field06: '',
    field07: '강한화',
    field08: false,
    field09: '',
  },
  {
    id: 4,
    isCheck: false,
    isNew: false,
    field01: '청약완료',
    field02: '',
    field03: '범용',
    field04: '',
    field05: '',
    field06: '',
    field07: '강한화',
    field08: false,
    field09: '',
  },
];
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    isNew: false,
    isCheck: false,
    isField02InputVisible: true,
    field01: '',
    field02: '3423554',
    field03: '문형보험대리문형보험대리점문형보험대리점점',
    field04: '2025-01-01',
    field05: '2025-01-30',
    field06: '',
    field07: '비고내용 비고내용비고내용비고내용',
    field08: '김한화',
  },
  {
    id: 2,
    isNew: false,
    isCheck: false,
    isField02InputVisible: true,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '김한화',
  },
  {
    id: 3,
    isNew: false,
    isCheck: false,
    isField02InputVisible: true,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '김한화',
  },
  {
    id: 4,
    isNew: false,
    isCheck: false,
    isField02InputVisible: true,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '김한화',
  },
  {
    id: 5,
    isNew: false,
    isCheck: false,
    isField02InputVisible: true,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '김한화',
  },
];

export default function Ltpa030Section() {
  // 새로 추가한 행만 편집 가능
  const isEditableNewRow = React.useCallback(
    (params: EditableCallbackParams<DummyDataType>) => params.data?.isNew === true,
    []
  );
  const isEditableNewRow2 = React.useCallback(
    (params: EditableCallbackParams<DummyDataType2>) => params.data?.isNew === true,
    []
  );

  const existingRowFieldRenderer2 = React.useMemo(
    () => createFieldRenderer<DummyDataType2>('field02', 'field03', 'row'),
    []
  );

  const expiryCellRenderer = useCallback(
    (align: 'left' | 'center' | 'right' = 'right') =>
      (params: ICellRendererParams<DummyDataType>) =>
        editableSelectCellRenderer<DummyDataType>({ ...params, align }),
    []
  );

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '체크단계',
      field: 'field01',
      width: 90,
      cellClass: 'text-center',
    },
    {
      headerName: '신계약프로세스',
      field: 'field02',
      width: 100,
      cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
      editable: isEditableNewRow,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '프로세스 값'] },
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          return expiryCellRenderer('center')(params);
        }
        // 신규
        return params.value;
      },
    },
    {
      headerName: '판매채널',
      field: 'field03',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '적용사항',
      field: 'field04',
      width: 100,
      cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
      editable: isEditableNewRow,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '적용사항 값'] },
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          return expiryCellRenderer('center')(params);
        }
        // 신규
        return params.value;
      },
    },
    {
      headerName: '적용시작일',
      field: 'field05',
      width: 130,
      cellClass: 'editable-cell text-center',
      autoHeight: true,
      editable: isEditableNewRow,
      cellEditor: DatePickerCellEditor,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) =>
        params.data?.field05 && String(params.data.field05).trim() !== '' ? String(params.data.field05) : '',
    },
    {
      headerName: '적용종료일',
      field: 'field06',
      width: 130,
      cellClass: 'editable-cell text-center',
      autoHeight: true,
      editable: isEditableNewRow,
      cellEditor: DatePickerCellEditor,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) =>
        params.data?.field06 && String(params.data.field06).trim() !== '' ? String(params.data.field06) : '',
    },
    {
      headerName: '입력자',
      field: 'field07',
      width: 90,
      cellClass: 'text-center',
    },
    {
      headerName: '삭제여부',
      field: 'field08',
      width: 70,
      editable: isEditableNewRow,
      cellClass: 'editable-cell',
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
    },
    {
      headerName: '비고',
      field: 'field09',
      flex: 1,
      editable: isEditableNewRow,
      cellClass: 'editable-cell',
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '구분',
      field: 'field01',
      width: 90,
      cellClass: (params) => (isEditableNewRow2(params) ? 'text-center editable-cell' : 'text-center'),
      autoHeight: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '취급직원', '사용인', '설계'] },
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
      width: 260,
      autoHeight: true,
      suppressNavigable: true,
      cellClass: 'editable-cell text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field03' }),
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        if (params.data?.isNew) {
          const isInputVisible = params.data.isField02InputVisible;
          const inputContainerId = `customer-input-${String(params.data.id)}`;

          return (
            <div className="flex h-full w-full items-center gap-1 px-1" id={inputContainerId}>
              <div className="min-w-0 flex-1">
                {isInputVisible ? (
                  <Input
                    aria-label="대상"
                    width={'full'}
                    size="sm"
                    value={String(params.data.field02 ?? '')}
                    onMouseDown={(event) => event.stopPropagation()}
                    onChange={(event) => {
                      params.node.setDataValue('field02', event.target.value);
                    }}
                  />
                ) : (
                  <div
                    className="h-8 w-full cursor-text"
                    onMouseDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                      event.stopPropagation();
                      setRowData2((prev) =>
                        prev.map((row) => (row.id === params.data?.id ? { ...row, isField02InputVisible: true } : row))
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

        return existingRowFieldRenderer2(params);
      },
    },
    {
      headerName: '적용시작일자',
      field: 'field04',
      width: 130,
      cellClass: 'editable-cell text-center',
      autoHeight: true,
      editable: isEditableNewRow2,
      cellEditor: DatePickerCellEditor,
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) =>
        params.data?.field04 && String(params.data.field04).trim() !== '' ? String(params.data.field04) : '',
    },
    {
      headerName: '적용종료일자',
      field: 'field05',
      width: 130,
      editable: isEditableNewRow2,
      cellClass: 'editable-cell text-center',
      autoHeight: true,
      cellEditor: DatePickerCellEditor,
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) =>
        params.data?.field05 && String(params.data.field05).trim() !== '' ? String(params.data.field05) : '',
    },
    {
      headerName: '상태',
      field: 'field06',
      width: 90,
      editable: isEditableNewRow2,
      cellClass: (params) => (isEditableNewRow2(params) ? 'text-center editable-cell' : 'text-center'),
      autoHeight: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '정상', '고객환불', '조치완료', '취소'] },
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          return expiryCellRenderer('center')(params);
        }
        // 신규
        return params.value;
      },
    },
    {
      headerName: '비고',
      field: 'field07',
      flex: 1,
      editable: isEditableNewRow2,
      cellClass: 'editable-cell',
    },
    {
      headerName: '등록자',
      field: 'field08',
      width: 80,
      cellClass: 'flex! items-center! justify-center!',
    },
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2, setRowData2] = React.useState<DummyDataType2[]>(DummyData2);

  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);
  const gridApiRef2 = React.useRef<GridApi<DummyDataType2> | null>(null);

  const pageSize = 4;
  const { loadedCount, totalCount, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: DummyData2,
    pageSize,
  });

  // 첫번째 agGrid 행삭제
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

  // 첫번째 agGrid 행추가
  const handleAddRow = React.useCallback(() => {
    setRowData((prev) => {
      const nextId = prev.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1;
      const newRow: DummyDataType = {
        id: nextId,
        isCheck: false,
        isNew: true,
        field01: '',
        field02: '',
        field03: '',
        field04: '',
        field05: '',
        field06: '',
        field07: '',
        field08: false,
        field09: '',
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

  // 두번째 agGrid 행삭제
  const handleDeleteRow2 = React.useCallback(() => {
    const gridApi = gridApiRef2.current;
    if (!gridApi) return;

    const selectedIds = new Set(
      gridApi
        .getSelectedNodes()
        .map((node) => node.data?.id)
        .filter((id) => id !== undefined)
    );
    if (selectedIds.size === 0) return;

    setRowData2((prev) => prev.filter((row) => !selectedIds.has(row.id)));
  }, [setRowData2]);

  // 두번째 agGrid 행추가
  const handleAddRow2 = React.useCallback(() => {
    setRowData2((prev) => {
      const nextId = prev.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1;
      const newRow: DummyDataType2 = {
        id: nextId,
        isNew: true,
        isCheck: false,
        field01: '',
        field02: '',
        isField02InputVisible: false,
        field03: '',
        field04: '',
        field05: '',
        field06: '',
        field07: '',
        field08: '',
      };
      return [...prev, newRow];
    });

    requestAnimationFrame(() => {
      const gridApi = gridApiRef2.current;

      if (!gridApi) {
        return;
      }

      const rowIndex = gridApi.getDisplayedRowCount() - 1;
      gridApi.ensureIndexVisible(rowIndex, 'bottom');
    });
  }, [setRowData2]);

  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '신계약기준관리', pageId: 'LTPA030' }} />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'}>
              <FormTable
                variant={'head'}
                lineTop={false}
                caption="장기신계약 조회 테이블"
                cols={['w-[8rem]', 'flex-1', 'w-[8rem]', 'flex-1', 'w-[8rem]', 'flex-1']}
              >
                <FormRow>
                  <FormCell title={'보종군'}>
                    <NativeSelect aria-label="항목 선택" width={100} required>
                      {[{ value: 'selection', label: '공통' }].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'적용사항'}>
                    <NativeSelect aria-label="적용사항 선택" width={180} required>
                      {[
                        { value: 'selection', label: '선택' },
                        { value: 'selection2', label: '모집자실명제준수 예외' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'적용대상'}>
                    <NativeSelect aria-label="적용대상 선택" width={180} required>
                      {[
                        { value: 'selection', label: '선택' },
                        { value: 'selection2', label: '모집자실명제준수 예외' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input aria-label="" width={100} value={'1234567'} readOnly />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={100} value={'김한화'} readOnly />
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
            <ResizablePanelGroup orientation="vertical" className="w-full h-full">
              <ResizablePanel defaultSize={30}>
                <TableFold className="h-full">
                  <TableFoldHead title="기본사항">
                    <Grow>
                      (<Checkbox>삭제건포함</Checkbox>)
                      <Button color="gray" variant="outlined" onClick={handleAddRow}>
                        행추가
                      </Button>
                      <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
                        행삭제
                      </Button>
                    </Grow>
                  </TableFoldHead>
                  <TableFoldBody>
                    <div className="ag-theme-alpine min-h-[18.4rem]">
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        enableCellSpan={true}
                        singleClickEdit={true}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowSelection={{
                          mode: 'multiRow',
                          headerCheckbox: false,
                          checkboxes: true,
                          enableClickSelection: false,
                        }}
                        selectionColumnDef={{
                          headerName: '√',
                          width: 30,
                        }}
                        // 행추가 된 rowCell
                        getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
                        onGridReady={(params) => {
                          gridApiRef.current = params.api;
                        }}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={70}>
                <TableFold className="h-full">
                  <TableFoldHead title="추가 등록사항(수납후스캔)">
                    <Grow>
                      <Button color="gray" variant="outlined" onClick={handleAddRow2}>
                        행추가
                      </Button>
                      <Button color="gray" variant="outlined" onClick={handleDeleteRow2}>
                        행삭제
                      </Button>
                    </Grow>
                  </TableFoldHead>
                  <TableFoldBody>
                    <Gcol>
                      <div className="ag-theme-alpine min-h-[18.4rem]">
                        <AgGridReact<DummyDataType2>
                          getRowId={(params) => String(params.data.id)}
                          rowData={rowData2}
                          columnDefs={columnDefs2}
                          domLayout="normal"
                          enableCellSpan={true}
                          singleClickEdit={true}
                          noRowsOverlayComponent={AgGridEmptyComponent}
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
                            width: 30,
                          }}
                          // 행추가 된 rowCell
                          getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
                          onGridReady={(params) => {
                            gridApiRef2.current = params.api;
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
              </ResizablePanel>
            </ResizablePanelGroup>
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
