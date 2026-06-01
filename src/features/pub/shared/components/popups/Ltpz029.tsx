/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import {
  AgGridEmptyComponent,
  createAddRowHandler,
  createDeleteSelectedRowsHandler,
  createSequentialRowReorderHandler,
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
import type { CellEditingStartedEvent, ColDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

type DummyDataType = {
  id: number;
  isChecked?: boolean;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
  field6: string | number;
  field7: number | undefined;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: true,
    field1: '공통(기본)1',
    field2: 'LTPZ001',
    field3: '설계매뉴얼',
    field4: '정상',
    field5: 'Y',
    field6: 'N',
    field7: 1,
  },
  {
    id: 2,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 2,
  },
  {
    id: 3,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 3,
  },
  {
    id: 4,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 4,
  },
  {
    id: 5,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 5,
  },
  {
    id: 6,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 6,
  },
  {
    id: 7,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 7,
  },
  {
    id: 8,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 8,
  },
  {
    id: 9,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 9,
  },
  {
    id: 10,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 10,
  },
  {
    id: 11,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 11,
  },
  {
    id: 12,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 12,
  },
  {
    id: 13,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 13,
  },
  {
    id: 14,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 14,
  },
  {
    id: 15,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 15,
  },
  {
    id: 16,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 16,
  },
  {
    id: 17,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 17,
  },
  {
    id: 18,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 18,
  },
  {
    id: 19,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 19,
  },
  {
    id: 20,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 20,
  },
  {
    id: 21,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 21,
  },
  {
    id: 22,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 22,
  },
  {
    id: 23,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 23,
  },
  {
    id: 24,
    isChecked: false,
    field1: '공통(기본)2',
    field2: 'LTPZ002',
    field3: '실손정액조회',
    field4: '해지',
    field5: 'N',
    field6: 'Y',
    field7: 24,
  },
];

const Ltpz029 = () => {
  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const handleAddRow = createAddRowHandler<DummyDataType, number>(setRowData, {
    idKey: 'id',
    getNextId: getNextNumericRowId,
    createRow: (nextId) => ({
      isChecked: false,
      id: nextId,
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: '',
      field7: undefined,
    }),
    insertAt: 'end',
    gridApiRef,
  });

  const handleDeleteRow = createDeleteSelectedRowsHandler<DummyDataType>(setRowData, gridApiRef, {
    idKey: 'id',
  });

  const handleOrderChanged = createSequentialRowReorderHandler<DummyDataType, number>(setRowData, {
    idKey: 'id',
    orderKey: 'id',
    gridApiRef,
  });

  const handleCellEditingStarted = React.useCallback((event: CellEditingStartedEvent<DummyDataType>) => {
    if (event.colDef.field === 'field3') {
      return;
    }

    window.requestAnimationFrame(() => {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLInputElement) {
        activeElement.style.textAlign = 'center';
      }
    });
  }, []);

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '번호',
      field: 'id',
      width: 40,
      cellClass: 'editable-center-input text-center',
      editable: true,
    },
    {
      headerName: '그룹',
      field: 'field1',
      width: 80,
      cellClass: 'editable-cell editable-center-input text-center',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['공통(기본)1', '공통(기본)2'] },
    },
    {
      headerName: '화면코드',
      field: 'field2',
      width: 70,
      cellClass: 'editable-cell editable-center-input text-center',
      editable: true,
    },
    {
      headerName: '바로가기명',
      field: 'field3',
      flex: 1,
      cellClass: 'editable-cell text-left',
      editable: true,
    },
    {
      headerName: '상태',
      field: 'field4',
      width: 50,
      editable: true,
      cellClass: 'editable-cell editable-center-input text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['정상', '해지'] },
    },
    {
      headerName: '기본값',
      field: 'field5',
      width: 50,
      editable: true,
      cellClass: 'editable-cell editable-center-input text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Y', 'N'] },
    },
    {
      headerName: '필수값',
      field: 'field6',
      width: 50,
      editable: true,
      cellClass: 'editable-cell editable-center-input text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Y', 'N'] },
    },
    {
      headerName: '화면표시순서',
      field: 'field7',
      width: 80,
      cellClass: 'editable-cell editable-center-input text-center',
      editable: true,
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              바로가기 설정관리
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ029)
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
          <div className="ag-theme-alpine min-h-[33rem]">
            <AgGridReact<DummyDataType>
              noRowsOverlayComponent={AgGridEmptyComponent}
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs}
              onCellValueChanged={handleOrderChanged}
              onCellEditingStarted={handleCellEditingStarted}
              defaultColDef={{
                sortable: true,
                resizable: true,
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
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                저장
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

export default Ltpz029;
