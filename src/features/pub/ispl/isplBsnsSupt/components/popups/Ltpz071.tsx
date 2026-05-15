/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import {
  AgGridEmptyComponent,
  createAddRowHandler,
  createDeleteSelectedRowsHandler,
  createSequentialRowReorderHandler,
  createTooltipValueGetter,
  getNextNumericRowId,
} from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { ZoomInIcon, ZoomOutIcon } from '@icons';
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
import type { ColDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';

type DummyData1Type = {
  id: number;
  field1: number;
  field2: string;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    field1: 1,
    field2: '1 담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명담보그룹명',
  },
  {
    id: 2,
    field1: 2,
    field2: '2 담보그룹',
  },
  {
    id: 3,
    field1: 3,
    field2: '3 담보그룹',
  },
  {
    id: 4,
    field1: 4,
    field2: '4 담보그룹',
  },
  {
    id: 5,
    field1: 5,
    field2: '5 담보그룹',
  },
  {
    id: 6,
    field1: 6,
    field2: '6 담보그룹',
  },
  {
    id: 7,
    field1: 7,
    field2: '7 담보그룹',
  },
];

const Ltpz071 = () => {
  const gridApiRef = React.useRef<GridApi<DummyData1Type> | null>(null);
  const [rowData, setRowData] = React.useState<DummyData1Type[]>(DummyData1);

  const handleAddRow = createAddRowHandler<DummyData1Type, number>(setRowData, {
    idKey: 'id',
    getNextId: getNextNumericRowId,
    createRow: (nextId) => ({
      id: nextId,
      field1: nextId,
      field2: '',
    }),
    insertAt: 'end',
    gridApiRef,
  });

  const handleDeleteRow = createDeleteSelectedRowsHandler<DummyData1Type>(setRowData, gridApiRef, {
    idKey: 'id',
  });

  const handleOrderChanged = createSequentialRowReorderHandler<DummyData1Type, number>(setRowData, {
    idKey: 'id',
    orderKey: 'field1',
    gridApiRef,
  });

  const columnDefs1: ColDef<DummyData1Type>[] = [
    {
      headerName: '순서',
      field: 'field1',
      width: 40,
      editable: true,
      cellClass: 'editable-cell text-center',
      cellEditor: 'agNumberCellEditor',
      sortable: false,
    },
    {
      headerName: '담보그룹명',
      field: 'field2',
      flex: 1,
      editable: true,
      cellClass: 'editable-cell',
      cellEditor: 'agTextCellEditor',
      tooltipValueGetter: createTooltipValueGetter<DummyData1Type>({ field: 'field2' }),
    },
  ];
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="sm">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              담보그룹관리
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr] gap-1">
          <Grow placement="ec" className="w-full">
            <Button variant={'outlined'} color={'gray'} onClick={handleAddRow}>
              행추가
              <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
            </Button>
            <Button variant={'outlined'} color={'gray'} onClick={handleDeleteRow}>
              행삭제
              <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
            </Button>
          </Grow>
          <div className="ag-theme-alpine min-h-[24.4rem]">
            <AgGridReact<DummyData1Type>
              onGridReady={(event) => {
                gridApiRef.current = event.api;
              }}
              noRowsOverlayComponent={AgGridEmptyComponent}
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs1}
              onCellValueChanged={handleOrderChanged}
              defaultColDef={{
                sortable: true,
                resizable: false,
              }}
              singleClickEdit={true}
              rowSelection={{
                mode: 'singleRow',
                checkboxes: true,
                enableClickSelection: false,
              }}
              selectionColumnDef={{
                headerName: '선택',
                width: 30,
                cellClass: 'editable-cell text-center',
              }}
              domLayout="normal"
              animateRows={false}
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
              tooltipHideDelay={3000}
            />
          </div>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button size={'xl'}>저장</Button>
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

export default Ltpz071;
