/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { CellValueChangedEvent, ColDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef, useState } from 'react';
import * as React from 'react';

import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { EssentialIcon, ZoomInIcon, ZoomOutIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';

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
    cellClass: 'text-left',
  },
  {
    headerName: '호수상세정보',
    field: 'field03',
    flex: 3,
    cellClass: 'text-left editable-cell',
    editable: true,
  },
];

const Ltpz01604 = () => {
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
        <TableFoldHead title={'임대인배상책임(주택,화재제외)'} />
        <TableFoldBody>
          <FormTable cols={['w-[16rem]', 'w-[30rem]', 'w-[16rem]', 'w-[auto]']}>
            <FormRow>
              <FormCell
                title={
                  <Grow placement="sc">
                    임대가구수
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input aria-label="" value={''} width={120} required />
                가구
              </FormCell>
              <FormCell
                title={
                  <Grow placement="sc">
                    준공연도(사용승인연도)
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input aria-label="" value={''} width={120} required />
              </FormCell>
            </FormRow>
          </FormTable>
        </TableFoldBody>
      </TableFold>
      <TableFold className="grid-rows-[auto_1fr]">
        <TableFoldHead title={'임대주택'}>
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
          <Gcol variant={'box-info'} placement={'ss'} className="w-full">
            <Typo variant={'body-sm'} icon={'info'}>
              소유자가 임대해 준 주택(상기 소재지)의 호수 상세정보를 행추가 하여 입력하시기 바랍니다.{' '}
              <b>(한행에 한가구의 정보만 입력)</b>
            </Typo>
            <BulletList position="col">
              <BulletListItem size={'sm'} type={'dash'}>
                호수 상세정보 입력 예시
              </BulletListItem>
              <BulletListItem size={'sm'} type={'dash'}>
                기본주소(소재지) : XXX~~~ A동 101호, 호수 상세정보 : A동 101호
              </BulletListItem>
            </BulletList>
          </Gcol>
        </TableFoldBody>
      </TableFold>
    </>
  );
};

export default Ltpz01604;
