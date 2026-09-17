/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { CellValueChangedEvent, ColDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef, useState } from 'react';
import * as React from 'react';

import { useFormFields } from '@/shared/hooks/useFormFields';
import { AgGridEmptyComponent } from '@aggrid';
import { Grow } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { EssentialIcon, ZoomInIcon, ZoomOutIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';

import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import '@/shared/lib/agGridPub';

type DataType = {
  id: number;
  isNew?: boolean;
  isCheck?: boolean;
  field01: number;
  field02: string | number;
  field03: string | number;
};

const dummyData: DataType[] = [
  {
    id: 1,
    isCheck: false,
    isNew: false,
    field01: 1,
    field02: 'TEXT',
    field03: '',
  },
  {
    id: 2,
    isCheck: false,
    isNew: false,
    field01: 2,
    field02: 'TEXT2',
    field03: 'TEXT3',
  },
];

const columnDefs: ColDef<DataType>[] = [
  {
    headerName: '순번',
    field: 'field01',
    cellClass: 'text-center',
    flex: 1,
  },
  {
    headerName: '기본주소(소재지)',
    field: 'field02',
    flex: 10,
    cellClass: 'text-left editable-cell',
    editable: true,
  },
  {
    headerName: '호수상세정보',
    field: 'field03',
    flex: 3,
    cellClass: 'text-left editable-cell',
    editable: true,
  },
];

const Ltpz01606 = () => {
  const [form, setFormField] = useFormFields({
    type01605: '',
  });

  const [rowData, setRowData] = useState<DataType[]>(dummyData);
  const gridApiRef = useRef<GridApi<DataType> | null>(null);

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
    const newRow: DataType = {
      id: nextId,
      isCheck: false,
      isNew: true,
      field01: nextId,
      field02: '',
      field03: '',
    };

    setRowData((prev) => [...prev, newRow]);

    requestAnimationFrame(() => {
      const gridApi = gridApiRef.current;
      if (!gridApi) return;

      const rowIndex = gridApi.getDisplayedRowCount() - 1;
      gridApi.ensureIndexVisible(rowIndex, 'bottom');
    });
  }, [rowData]);

  const handleCellValueChanged = useCallback((params: CellValueChangedEvent<DataType>) => {
    const { data, colDef, newValue } = params;
    if (!colDef.field) return;
    setRowData((prev) =>
      prev.map((row) => (row.id === data.id ? { ...row, [colDef.field as string]: newValue } : row))
    );
  }, []);

  return (
    <>
      <TableFold>
        <TableFoldHead title={'급배수시설누출손해(실손,90일면책,거주세대,건물및가재)(갱신형)'} />
        <TableFoldBody className="gap-3">
          <FormTable cols={['w-[16rem]', 'w-[30rem]', 'w-[16rem]', 'w-[auto]']}>
            <FormRow>
              <FormCell
                title={
                  <Grow placement="ss">
                    소재지주소동일
                    <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default"></Checkbox>
                  </Grow>
                }
              ></FormCell>
              <FormCell
                title={
                  <Grow placement="sc">
                    보상한도/자기부담금
                    <EssentialIcon />
                  </Grow>
                }
              >
                <NativeSelect
                  aria-label="항목 선택"
                  width={260}
                  value={form.type01605}
                  onChange={(e) => setFormField('type01605', e.target.value)}
                  required
                >
                  {[
                    { value: 'selection', id: 'type01605-1', label: '200만원 한도, 100만원초가 10%공제' },
                    { value: 'selection2', id: 'type01605-2', label: '200만원 한도, 100만원초가 10%공제' },
                  ].map((option) => (
                    <NativeSelectOption key={option.id} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell
                title={
                  <Grow placement="sc">
                    준공연도(사용승인연도)
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input aria-label="" value={'2004'} width={60} required />
              </FormCell>
              <FormCell
                title={
                  <Grow placement="sc">
                    주택구분
                    <EssentialIcon />
                  </Grow>
                }
              >
                <NativeSelect
                  aria-label="항목 선택"
                  width={140}
                  value={form.type01605}
                  onChange={(e) => setFormField('type01605', e.target.value)}
                  required
                >
                  {[
                    { value: 'selection', id: 'type01605-1', label: '선택' },
                    { value: 'selection2', id: 'type01605-2', label: '연립(다세대)주택' },
                  ].map((option) => (
                    <NativeSelectOption key={option.id} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </FormCell>
            </FormRow>
          </FormTable>
          <FormTable cols={['w-[16rem]', 'w-[auto]']}>
            <FormRow>
              <FormCell
                title={
                  <Grow placement="sc">
                    가입세대수
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input aria-label="" value={''} width={120} required />
                가구
              </FormCell>
            </FormRow>
          </FormTable>
        </TableFoldBody>
      </TableFold>
      <TableFold className="grid-rows-[auto_1fr]">
        <TableFoldHead title={'가입세대'}>
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

        <TableFoldBody className="gap-2">
          <div className="ag-theme-alpine inner-scroll" data-rows={rowData.length}>
            <AgGridReact<DataType>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData}
              columnDefs={columnDefs}
              onCellValueChanged={handleCellValueChanged}
              defaultColDef={{ sortable: false }}
              enableCellSpan={true}
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
              singleClickEdit={true}
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
            />
          </div>
        </TableFoldBody>
      </TableFold>
    </>
  );
};

export default Ltpz01606;
