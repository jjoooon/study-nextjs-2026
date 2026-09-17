/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { CellValueChangedEvent, ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef, useState } from 'react';
import * as React from 'react';

import { format } from '@/shared/utils/formatUtils';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
import { Grow } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { EssentialIcon, ZoomInIcon, ZoomOutIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isNew: boolean;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    isNew: false,
    field01: '김철수',
    field02: '7701011',
  },
  {
    id: 2,
    isCheck: false,
    isNew: false,
    field01: '',
    field02: '',
  },
];

// 6자리-1자리 마스크 셀 에디터 (______-_)
const MaskedCellEditor = React.forwardRef((props: any, ref) => {
  const [value, setValue] = useState(props.value ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => ({
    getValue() {
      return value;
    },
  }));

  return (
    <Input
      ref={inputRef}
      value={value}
      formatter="######-#"
      charFilter="num"
      maxLength={8}
      isFocused
      onChange={(e) => setValue(e.target.value)}
      className="h-full w-full"
    />
  );
});
MaskedCellEditor.displayName = 'MaskedCellEditor';

// 6자리-1자리 마스크 셀 렌더러 (미입력 시 ______-_ 표시)
const maskedCellRenderer = (params: ICellRendererParams<DummyDataType>) => {
  const raw = params.value == null ? '' : String(params.value);
  if (!raw) {
    return <span className="text-[var(--color-gray-40)]">______-_</span>;
  }
  const formatted = format(raw, '######-#');
  if (formatted.endsWith('-')) {
    return <span>{formatted}_</span>;
  }
  return <span>{formatted}</span>;
};

const Ltpz01611 = () => {
  // 1. 약사명단 state & handlers
  const [rowData, setRowData] = useState<DummyDataType[]>(DummyData);
  const gridApiRef = useRef<GridApi<DummyDataType> | null>(null);

  const handleDeleteRow = useCallback(() => {
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

  const handleAddRow = useCallback(() => {
    const nextId = rowData.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1;
    const newRow: DummyDataType = {
      id: nextId,
      isCheck: false,
      isNew: true,
      field01: '',
      field02: '',
    };

    setRowData((prev) => [...prev, newRow]);

    requestAnimationFrame(() => {
      const gridApi = gridApiRef.current;
      if (!gridApi) return;

      const rowIndex = gridApi.getDisplayedRowCount() - 1;
      gridApi.ensureIndexVisible(rowIndex, 'bottom');
    });
  }, [rowData]);

  const handleGolfCellValueChanged = useCallback((params: CellValueChangedEvent<DummyDataType>) => {
    const { data, colDef, newValue } = params;
    if (!colDef.field) return;
    setRowData((prev) =>
      prev.map((row) => (row.id === data.id ? { ...row, [colDef.field as string]: newValue } : row))
    );
  }, []);

  const { attributeColumnWidth } = useDynamicColumnWidths();
  const ColumnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '순번',
      field: 'id',
      width: attributeColumnWidth(50),
      cellClass: 'text-center',
    },
    {
      headerName: '이름',
      field: 'field01',
      flex: 1,
      cellClass: 'text-center editable-cell',
      editable: true,
    },
    {
      headerName: '생년월일 및 성별코드',
      field: 'field02',
      flex: 1,
      cellClass: 'text-center editable-cell',
      editable: true,
      cellEditor: MaskedCellEditor,
      cellRenderer: maskedCellRenderer,
    },
  ];

  return (
    <>
      <TableFold>
        <TableFoldHead title="의약품등배상책임" />
        <TableFoldBody className="gap-2">
          <FormTable caption="설계번호" cols={['w-[12rem]', 'w-[auto]']}>
            <FormRow>
              <FormCell
                title={
                  <Grow placement="sc">
                    약사인원
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input width={100} />명
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell
                title={
                  <Grow placement="sc">
                    보상한도
                    <EssentialIcon />
                  </Grow>
                }
              >
                <NativeSelect aria-label="개시연령 선택" width={'auto'}>
                  {[{ value: 1, label: '대인 1인당 1천만원. 1사고당 5천만원' }].map((option, idx) => (
                    <NativeSelectOption key={idx} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </FormCell>
            </FormRow>
          </FormTable>
        </TableFoldBody>
      </TableFold>

      <TableFold className="grid-rows-[auto_1fr]">
        <TableFoldHead title="약사명단">
          <Grow>
            <Button color="gray" variant="outlined" onClick={handleAddRow}>
              행추가
              <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
            </Button>
            <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
              행삭제
              <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
            </Button>
          </Grow>
        </TableFoldHead>
        <TableFoldBody>
          <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={ColumnDefs}
              onCellValueChanged={handleGolfCellValueChanged}
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
                cellClass: 'editable-cell',
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
    </>
  );
};

export default Ltpz01611;
