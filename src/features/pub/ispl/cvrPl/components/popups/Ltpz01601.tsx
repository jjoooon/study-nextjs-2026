/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import {
  AgGridEmptyComponent,
  createTooltipValueGetter,
  editableSelectCellRenderer,
  numberValueFormatter,
} from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';

import { Input } from '@uiux/Input';
import type { ColDef, EditableCallbackParams, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useCallback } from 'react';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isNew: boolean;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    isNew: false,
    field01: '선택',
    field02: '3대진단형3대진단형3대진단형3대진단형',
    field03: '2026-04-18',
    field04: 3000,
  },
  {
    id: 2,
    isCheck: false,
    isNew: false,
    field01: '선택',
    field02: '3대진단형',
    field03: '2026-03-22',
    field04: 3000,
  },
  {
    id: 3,
    isCheck: false,
    isNew: false,
    field01: '선택',
    field02: '3대진단형',
    field03: '2026-03-22',
    field04: 3000,
  },
];

const Ltpz01601 = () => {
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);

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
  }, []);

  // 첫번째 agGrid 행추가
  const handleAddRow = React.useCallback(() => {
    const nextId = rowData.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1;
    const newRow: DummyDataType = {
      id: nextId,
      isCheck: false,
      isNew: true,
      field01: '',
      field02: '',
      field03: '',
      field04: '',
    };

    setRowData((prev) => [...prev, newRow]);

    requestAnimationFrame(() => {
      const gridApi = gridApiRef.current;

      if (!gridApi) {
        return;
      }

      const rowIndex = gridApi.getDisplayedRowCount() - 1;
      gridApi.ensureIndexVisible(rowIndex, 'bottom');
      // gridApi.startEditingCell({ rowIndex, colKey: 'field02' });
    });
  }, [rowData]);

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

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '순번',
      field: 'id',
      width: 50,
      cellClass: 'text-center',
    },
    {
      headerName: '품명',
      field: 'field01',
      width: 180,
      cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
      cellEditor: 'agSelectCellEditor',
      editable: isEditableNewRow,
      cellEditorParams: { values: ['선택1', '선택2'] },
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          return expiryCellRenderer('center')(params);
        }
        return params.value;
      },
    },
    {
      headerName: '브랜드명',
      field: 'field02',
      flex: 1,
      cellClass: (params) => (isEditableNewRow(params) ? 'text-left editable-cell' : 'text-left'),
      editable: isEditableNewRow,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
    {
      headerName: '구입년월',
      field: 'field03',
      width: 120,
      cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
      editable: isEditableNewRow,
    },
    {
      headerName: '구입가격(만원)',
      field: 'field04',
      width: 130,
      cellClass: (params) => (isEditableNewRow(params) ? 'text-right editable-cell' : 'text-right'),
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
      editable: isEditableNewRow,
    },
  ];
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              설계담보상세정보등록
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ016)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="보험정보" cols={['w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={150} value={'LA26020945959594'} readOnly />
                  -
                  <Input aria-label="" width={30} value={'1'} readOnly />
                  <b>한화 더 건강한 한여름좋합 보험 2601</b>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <TableFold className="grid-rows-[auto_1fr]">
            <TableFoldHead title="골프용품손해(실손)">
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
                    headerName: '선택',
                    width: 30,
                  }}
                  getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
                  onGridReady={(params) => {
                    gridApiRef.current = params.api;
                  }}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </TableFoldBody>
          </TableFold>
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

export default Ltpz01601;
