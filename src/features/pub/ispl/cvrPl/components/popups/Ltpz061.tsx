/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type {
  ColDef,
  ColGroupDef,
  ICellEditorParams,
  ICellRendererParams,
  CellClassParams,
  EditableCallbackParams,
  SelectionChangedEvent,
} from 'ag-grid-enterprise'; // 2026-05-27 EditableCallbackParams, SelectionChangedEvent 추가
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useState } from 'react';
import * as React from 'react';
import { Grow, Typo, Gcol } from '@atoms'; // 2026-05-27 Grid 삭제
import { SearchIcon } from '@icons';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogClose,
  DialogFooterArea,
} from '@uiux/Dialog';
import { Input } from '@uiux/Input';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
import { createExpiryCellRenderer } from '@grid/CellRenderers';

type DummyDataType1 = {
  id: number;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  isRowSelected?: boolean;
};

type DummyDataType2 = {
  id: number;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  isRowSelected?: boolean;
};

const dummyData1: DummyDataType1[] = [
  {
    id: 1,
    isCheck: false,
    field01: '040',
    field02: '위, 십이지장',
    field03: '1년',
    field04: '1개월',
    field05: '',
    field06: '',
    field07: '',
  },
  {
    id: 2,
    isCheck: true,
    field01: '041',
    field02:
      '공장(빈창자), 회장(돌창자), 맹장(충수동기 포함)공장(빈창자), 회장(돌창자), 맹장(충수동기 포함)공장(빈창자), 회장(돌창자), 맹장(충수동기 포함)',
    field03: '',
    field04: '2개월',
    field05: '',
    field06: '',
    field07: '',
  },
  {
    id: 3,
    isCheck: true,
    field01: '042',
    field02: '소장(공장, 회장), 대장(맹장 포함)',
    field03: '',
    field04: '3개월',
    field05: '',
    field06: '',
    field07: '',
  },
  {
    id: 4,
    isCheck: true,
    field01: '043',
    field02: '직장',
    field03: '1년',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
  },
];

const dummyData2: DummyDataType2[] = [
  {
    id: 1,
    isCheck: false,
    field01: '040',
    field02: '담석증(K80)',
    field03: '2년',
    field04: '1개월',
    field05: '',
    field06: '',
    field07: '',
  },
  {
    id: 2,
    isCheck: true,
    field01: '041',
    field02: '요로결석증(N20, N21, N23)',
    field03: '1년',
    field04: '12개월',
    field05: '',
    field06: '',
    field07: '',
  },
  {
    id: 3,
    isCheck: true,
    field01: '042',
    field02:
      '골관절증 및 튜마토이드 관절염(M05, M06, M08, M15~M19)골관절증 및 튜마토이드 관절염(M05, M06, M08, M15~M19)',
    field03: '',
    field04: '4개월',
    field05: '',
    field06: '',
    field07: '',
  },
  {
    id: 4,
    isCheck: true,
    field01: '043',
    field02: '척추질환(M40, M41, M47, M50, M51, M54)',
    field03: '',
    field04: '4개월',
    field05: '',
    field06: '',
    field07: '',
  },
];

type ReasonCellEditorRef = {
  getValue: () => string;
};

const ReasonCellEditor = React.forwardRef<ReasonCellEditorRef, ICellEditorParams<DummyDataType1 | DummyDataType2>>(
  (props, ref) => {
    const initialValue = String(props.value ?? '');
    const [value, setValue] = React.useState<string>(initialValue);
    const valueRef = React.useRef<string>(initialValue);

    React.useImperativeHandle(
      ref,
      () => ({
        getValue: () => valueRef.current,
      }),
      []
    );

    return (
      <div className="flex h-full w-full items-center gap-1 px-1">
        <div className="flex min-w-0 basis-0 flex-1 items-center">
          <Input
            value={value}
            size="sm"
            autoFocus
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => {
              const nextValue = e.target.value;

              valueRef.current = nextValue;
              setValue(nextValue);
            }}
          />
        </div>
        <div className="flex h-full w-[2.5rem] shrink-0 items-center justify-center">
          <Button
            aria-label="검색"
            variant={'outlined'}
            only="icon"
            size={'md'}
            color={'gray-light'}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
        </div>
      </div>
    );
  }
);

ReasonCellEditor.displayName = 'ReasonCellEditor';

const reasonCellRenderer = <TData,>(params: ICellRendererParams<TData>) => {
  const value = params.value == null ? '' : String(params.value);

  return (
    <div className="flex h-full w-full items-center gap-1 px-1">
      <div className="flex min-w-0 basis-0 flex-1 items-center justify-start px-2 text-left text-[1.3rem] leading-[2.5rem]">
        <span className="block min-w-0 truncate">{value}</span>
      </div>
      <div className="flex h-full w-[2.5rem] shrink-0 items-center justify-center">
        <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
          <SearchIcon color={'var(--color-primary-50)'} />
        </Button>
      </div>
    </div>
  );
};

const getExpiryRenderer = createExpiryCellRenderer<DummyDataType1>;
const getExpiryRenderer2 = createExpiryCellRenderer<DummyDataType2>;

const Ltpz061 = () => {
  // 2026-05-27 isRowSelected 필드 추가: 선택된 행의 상태를 관리하기 위한 필드로, 체크박스 선택 시 해당 행이 선택되었는지 여부를 나타냄
  const [rowData1, setRowData1] = useState<DummyDataType1[]>(dummyData1);
  const [rowData2, setRowData2] = useState<DummyDataType2[]>(dummyData2);

  const handleSelectionChanged1 = useCallback((event: SelectionChangedEvent<DummyDataType1>) => {
    const selectedIds = new Set(event.api.getSelectedNodes().map((n) => n.data?.id));
    setRowData1((prev) => prev.map((row) => ({ ...row, isRowSelected: selectedIds.has(row.id) })));
  }, []);

  const handleSelectionChanged2 = useCallback((event: SelectionChangedEvent<DummyDataType2>) => {
    const selectedIds = new Set(event.api.getSelectedNodes().map((n) => n.data?.id));
    setRowData2((prev) => prev.map((row) => ({ ...row, isRowSelected: selectedIds.has(row.id) })));
  }, []);

  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: Array<ColDef<DummyDataType1> | ColGroupDef<DummyDataType1>> = React.useMemo(
    () => [
      {
        headerName: '분류',
        field: 'field01',
        flex: 1,
        autoHeight: true,
        minWidth: attributeColumnWidth(50),
        cellClass: 'text-center',
      },
      {
        headerName: '대상이 되는 부위',
        field: 'field02',
        wrapText: true,
        autoHeight: true,
        flex: 10,
        cellRenderer: (params: ICellRendererParams<DummyDataType1>) => {
          return (
            <div
              className="h-full w-full py-1.5 leading-[1.3] whitespace-normal"
              dangerouslySetInnerHTML={{ __html: String(params.data?.field02 ?? '') }}
            />
          );
        },
      },
      // 2026-05-27 select 전체 수정
      {
        headerName: '부담보기간',
        marryChildren: true,
        children: [
          {
            field: 'field03',
            flex: 1,
            minWidth: attributeColumnWidth(55),
            singleClickEdit: false,
            headerName: '',
            cellClass: (params: CellClassParams<DummyDataType1>) => {
              const base = 'text-center flex [&>div>span]:h-auto! !px-0 editable-cell';
              return params.data?.isRowSelected === true ? base : `${base} no-edited`;
            },
            editable: (params: EditableCallbackParams<DummyDataType1>) => {
              return params.data?.isRowSelected === true;
            },
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['0년', '1년', '2년', '3년', '4년', '5년', '전기간'] },
            cellRenderer: getExpiryRenderer('center'),
            autoHeight: true,
          },
          {
            field: 'field04',
            flex: 1,
            minWidth: attributeColumnWidth(65),
            editable: (params: EditableCallbackParams<DummyDataType1>) => params.data?.isRowSelected === true,
            singleClickEdit: false,
            headerName: '',
            cellRenderer: getExpiryRenderer('center'),
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: [
                '0개월',
                '1개월',
                '2개월',
                '3개월',
                '4개월',
                '5개월',
                '6개월',
                '7개월',
                '8개월',
                '9개월',
                '10개월',
                '11개월',
                '12개월',
              ],
            },
            cellClass: (params: CellClassParams<DummyDataType1>) => {
              const base = 'text-center flex [&>div>span]:h-auto! !px-0 editable-cell';
              return params.data?.isRowSelected === true ? base : `${base} no-edited`;
            },
            autoHeight: true,
          },
        ],
      },
      {
        headerName: '부담보사유',
        field: 'field05',
        flex: 5,
        cellClass: 'text-center',
        editable: true,
        cellEditor: ReasonCellEditor,
        autoHeight: true,
        cellRenderer: reasonCellRenderer,
      },
      {
        headerName: '수정',
        field: 'isCheck',
        flex: 1,
        minWidth: attributeColumnWidth(30),
        cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
        cellEditor: 'agCheckboxCellEditor', // ag-Grid 기본 체크박스 에디터 사용
        editable: true,
        autoHeight: true,
      },
    ],
    [attributeColumnWidth]
  );

  const columnDefs2: Array<ColDef<DummyDataType2> | ColGroupDef<DummyDataType2>> = React.useMemo(
    () => [
      {
        headerName: '분류',
        field: 'field01',
        flex: 1,
        autoHeight: true,
        minWidth: attributeColumnWidth(50),
        cellClass: 'text-center',
      },
      {
        headerName: '대상이 되는 질병',
        field: 'field02',
        wrapText: true,
        autoHeight: true,
        flex: 10,
        cellClass: 'flex! items-center! justify-start! word-break whitespace-normal',
        cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
          return (
            <div
              className="h-full w-full py-1.5 leading-[1.3] whitespace-normal"
              dangerouslySetInnerHTML={{ __html: String(params.data?.field02 ?? '') }}
            />
          );
        },
      },
      // 2026-05-27 select 전체 수정
      {
        headerName: '부담보기간',
        marryChildren: true,
        children: [
          {
            field: 'field03',
            flex: 1,
            minWidth: attributeColumnWidth(55),
            editable: (params: EditableCallbackParams<DummyDataType2>) => params.data?.isRowSelected === true,
            singleClickEdit: false,
            headerName: '',
            // cellRenderer: selectCellRenderer,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['0년', '1년', '2년', '3년', '4년', '5년', '전기간'] },
            cellClass: (params: CellClassParams<DummyDataType2>) => {
              const base = 'text-center flex [&>div>span]:h-auto! !px-0 editable-cell';
              return params.data?.isRowSelected === true ? base : `${base} no-edited`;
            },
            autoHeight: true,
            cellRenderer: getExpiryRenderer2('center'),
          },
          {
            field: 'field04',
            flex: 1,
            minWidth: attributeColumnWidth(65),
            editable: (params: EditableCallbackParams<DummyDataType2>) => params.data?.isRowSelected === true,
            singleClickEdit: false,
            headerName: '',
            cellRenderer: getExpiryRenderer2('center'),
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: [
                '0개월',
                '1개월',
                '2개월',
                '3개월',
                '4개월',
                '5개월',
                '6개월',
                '7개월',
                '8개월',
                '9개월',
                '10개월',
                '11개월',
                '12개월',
              ],
            },
            cellClass: (params: CellClassParams<DummyDataType2>) => {
              const base = 'text-center flex [&>div>span]:h-auto! !px-0 editable-cell';
              return params.data?.isRowSelected === true ? base : `${base} no-edited`;
            },
            autoHeight: true,
          },
        ],
      },
      {
        headerName: '부담보사유',
        field: 'field05',
        flex: 5,
        cellClass: 'text-center',
        editable: true,
        autoHeight: true,
        cellEditor: ReasonCellEditor,
        cellRenderer: reasonCellRenderer,
      },
      {
        headerName: '수정',
        field: 'isCheck',
        flex: 1,
        minWidth: attributeColumnWidth(30),
        cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
        cellEditor: 'agCheckboxCellEditor', // ag-Grid 기본 체크박스 에디터 사용
        editable: true,
        autoHeight: true,
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              특정부위부담보입력
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ061)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable variant="none" cols={['w-1', 'w-auto']}>
              <FormRow>
                <FormCell
                  title={'증권번호'}
                  tdClassName="grid grid-cols-[auto_auto_auto_1fr] items-center gap-1 w-full"
                >
                  <Input aria-label="" value={'LA2602093135558'} readOnly variant="info" />
                  <Input aria-label="" value={'한화 더 건강한 한아름종합보험 2601'} readOnly variant="info" />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          {/* 2026-05-27 Grid 삭제 */}
          <Gcol gap={3}>
            <TableFold variant={'accordion'}>
              <TableFoldHead title="특정부위" />
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={rowData1.length}>
                  <AgGridReact<DummyDataType1>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    columnDefs={columnDefs}
                    rowData={rowData1}
                    headerHeight={0}
                    groupHeaderHeight={32}
                    singleClickEdit={true}
                    defaultColDef={{
                      suppressMovable: true,
                    }}
                    rowSelection={{
                      mode: 'multiRow',
                      headerCheckbox: false,
                      checkboxes: true,
                      enableClickSelection: false,
                      enableSelectionWithoutKeys: true,
                    }}
                    selectionColumnDef={{
                      headerName: '선택',
                      width: 30,
                      cellClass: 'text-center editable-cell',
                    }}
                    onSelectionChanged={handleSelectionChanged1} // 2026-05-27 선택된 행의 상태를 업데이트하는 이벤트 핸들러 추가
                    domLayout="normal"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <TableFold variant={'accordion'}>
              <TableFoldHead title="특정질병" />
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    columnDefs={columnDefs2}
                    rowData={rowData2}
                    headerHeight={0}
                    groupHeaderHeight={32}
                    singleClickEdit={true}
                    defaultColDef={{
                      suppressMovable: true,
                    }}
                    rowSelection={{
                      mode: 'multiRow',
                      headerCheckbox: false,
                      checkboxes: true,
                      enableClickSelection: false,
                      enableSelectionWithoutKeys: true,
                    }}
                    selectionColumnDef={{
                      headerName: '선택',
                      width: 30,
                      cellClass: 'text-center editable-cell',
                    }}
                    onSelectionChanged={handleSelectionChanged2}
                    domLayout="normal"
                  />
                </div>
              </TableFoldBody>
            </TableFold>
          </Gcol>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz061;
