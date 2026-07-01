/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type {
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  GridApi,
  RowDragEndEvent,
  RowDragEnterEvent,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import * as React from 'react';
import {
  AgGridEmptyComponent,
  createAddRowHandler,
  createSequentialRowReorderHandler,
  useDynamicColumnWidths,
  getNextNumericRowId,
} from '@aggrid';
import { Grow, Typo } from '@atoms';
import { ConfirmDialog } from '@common/ConfirmDialog';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { ZoomInIcon, ZoomOutIcon, ArrowIcon } from '@icons';
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

import '@/shared/lib/agGridPub';

type DummyData1Type = {
  id: number;
  field0: number;
  field1: string;
  field2: string;
  cheked?: boolean;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    field0: 1,
    field1: '간병',
    field2: '간병인사용',
    cheked: true,
  },
  {
    id: 2,
    field0: 2,
    field1: '암주요',
    field2: '암주요치료(상급종합)',
    cheked: false,
  },
  {
    id: 3,
    field0: 2,
    field1: '암주요',
    field2: '암주요치료(종합병원)',
    cheked: false,
  },
  {
    id: 4,
    field0: 2,
    field1: '암주요',
    field2: '암주요치료(비급여)',
    cheked: false,
  },
  {
    id: 5,
    field0: 2,
    field1: '암주요',
    field2: '암주요치료(전이암)',
    cheked: false,
  },
  {
    id: 6,
    field0: 2,
    field1: '암주요',
    field2: '표적항암',
    cheked: false,
  },
  {
    id: 7,
    field0: 3,
    field1: '순환계치료비',
    field2: '요양병원제외',
    cheked: false,
  },
  {
    id: 8,
    field0: 3,
    field1: '순환계치료비',
    field2: '상급종합병원',
    cheked: false,
  },
  {
    id: 9,
    field0: 3,
    field1: '순환계치료비',
    field2: '주요순환계',
    cheked: false,
  },
  {
    id: 10,
    field0: 4,
    field1: '입원',
    field2: '1인실',
    cheked: false,
  },
  {
    id: 11,
    field0: 4,
    field1: '입원',
    field2: '2~3인실',
    cheked: false,
  },
  {
    id: 12,
    field0: 5,
    field1: '운전자',
    field2: '운전자비용',
    cheked: false,
  },
  {
    id: 13,
    field0: 6,
    field1: '여성',
    field2: '유/갑/생',
    cheked: false,
  },
  {
    id: 14,
    field0: 7,
    field1: '출산/난임',
    field2: '미혼자용',
    cheked: false,
  },
  {
    id: 15,
    field0: 7,
    field1: '출산/난임',
    field2: '기혼자용',
    cheked: false,
  },
];

const Ltpz640 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const gridApiRef = React.useRef<GridApi<DummyData1Type> | null>(null);
  const [rowData, setRowData] = React.useState<DummyData1Type[]>(DummyData1);
  const dragStartColumnRef = React.useRef<string | null>(null);

  const handleRowDragEnter = React.useCallback((event: RowDragEnterEvent<DummyData1Type>) => {
    const targetEl = event.event?.target as HTMLElement | null;
    const cellEl = targetEl?.closest('.ag-cell');
    const colId = cellEl?.getAttribute('col-id') || null;
    dragStartColumnRef.current = colId;
  }, []);

  const handleAddRow = createAddRowHandler<DummyData1Type, number>(setRowData, {
    idKey: 'id',
    getNextId: getNextNumericRowId,
    createRow: (nextId, rows, focusedRow) => ({
      id: nextId,
      field0: nextId,
      field1: focusedRow ? focusedRow.field1 : '',
      field2: '',
      cheked: false,
    }),
    insertAt: 'focused',
    gridApiRef,
  });

  const handleDeleteRow = React.useCallback(() => {
    setRowData((prev) => prev.filter((row) => !row.cheked));
  }, [setRowData]);

  const handleOrderChanged = createSequentialRowReorderHandler<DummyData1Type, number>(setRowData, {
    idKey: 'id',
    orderKey: 'field0',
    gridApiRef,
  });

  const handleCellValueChanged = React.useCallback(
    (event: CellValueChangedEvent<DummyData1Type>) => {
      if (event.colDef.field === 'field0') {
        handleOrderChanged(event);
        return;
      }

      if (event.colDef.field === 'cheked') {
        const changedId = event.data.id;
        const newChecked = Boolean(event.newValue);

        setRowData((prev) =>
          prev.map((row) => {
            if (row.id !== changedId) {
              return row;
            }

            return {
              ...row,
              cheked: newChecked,
            };
          })
        );
        return;
      }

      if (event.colDef.field !== 'field1') {
        return;
      }

      const oldValue = String(event.oldValue ?? '');
      const newValue = String(event.newValue ?? '');

      if (oldValue === newValue) {
        return;
      }

      setRowData((prev) =>
        prev.map((row) => {
          if (row.field1 !== oldValue) {
            return row;
          }

          return {
            ...row,
            field1: newValue,
          };
        })
      );
    },
    [handleOrderChanged, setRowData]
  );

  const handleRowDragEnd = React.useCallback(
    (event: RowDragEndEvent<DummyData1Type>) => {
      const draggedRowId = event.node.data?.id;
      const draggedField1 = String(event.node.data?.field1 ?? '');
      const overIndex = event.overIndex;

      const isGroupDrag = dragStartColumnRef.current === 'field1';

      if (draggedRowId === undefined || !draggedField1) {
        return;
      }

      const sourceIndex = rowData.findIndex((row) => row.id === draggedRowId);
      if (sourceIndex < 0) {
        return;
      }

      // 1. [담보그룹명 컬럼 드래그 - 개별 행 이동]
      if (!isGroupDrag) {
        const draggedRow = rowData[sourceIndex];
        const remainingRows = rowData.filter((row) => row.id !== draggedRowId);

        let insertIndex = remainingRows.length;
        if (overIndex !== undefined && overIndex >= 0) {
          insertIndex = Math.min(overIndex, remainingRows.length);
        }

        let overField1 = draggedField1;
        const overRow = overIndex !== undefined && overIndex >= 0 ? rowData[overIndex] : undefined;
        if (overRow) {
          overField1 = overRow.field1;
        }

        const updatedDraggedRow = {
          ...draggedRow,
          field1: overField1,
        };

        const nextRows = [
          ...remainingRows.slice(0, insertIndex),
          updatedDraggedRow,
          ...remainingRows.slice(insertIndex),
        ];

        setRowData(
          nextRows.map((row, index) => ({
            ...row,
            field0: index + 1,
          }))
        );
        return;
      }

      // 2. [패키지명 컬럼 드래그 - 그룹 전체 이동]
      let sourceStart = sourceIndex;
      let sourceEnd = sourceIndex;

      // 드래그한 패키지 그룹의 시작과 끝 범위 계산 (전체 rowData 기준)
      while (sourceStart > 0 && rowData[sourceStart - 1]?.field1 === draggedField1) {
        sourceStart -= 1;
      }
      while (sourceEnd < rowData.length - 1 && rowData[sourceEnd + 1]?.field1 === draggedField1) {
        sourceEnd += 1;
      }

      const sourceBlockRows = rowData.slice(sourceStart, sourceEnd + 1);
      const sourceBlockIdSet = new Set(sourceBlockRows.map((row) => row.id));
      const remainingRows = rowData.filter((row) => !sourceBlockIdSet.has(row.id));

      // 드롭 대상이 된 노드의 패키지명(field1) 구하기
      let overField1 = draggedField1;
      const overRow = overIndex !== undefined && overIndex >= 0 ? rowData[overIndex] : undefined;
      if (overRow && !sourceBlockIdSet.has(overRow.id)) {
        overField1 = overRow.field1;
      }

      // remainingRows 상에서 overField1 패키지 그룹의 시작과 끝 위치 인덱스 찾기
      const targetStart = remainingRows.findIndex((row) => row.field1 === overField1);
      let targetEnd = -1;
      for (let i = remainingRows.length - 1; i >= 0; i -= 1) {
        if (remainingRows[i]?.field1 === overField1) {
          targetEnd = i;
          break;
        }
      }

      let insertIndex = remainingRows.length;

      if (targetStart >= 0 && targetEnd >= 0) {
        // 드롭된 마우스가 속한 타겟 패키지 전체 그룹을 기준으로,
        // 하향 이동 중일 때는 타겟 그룹의 아래(targetEnd + 1), 상향 이동 중일 때는 타겟 그룹의 위(targetStart)로 통째로 이동합니다.
        const isMovingDown = sourceIndex < (overIndex ?? 0);
        if (isMovingDown) {
          insertIndex = targetEnd + 1;
        } else {
          insertIndex = targetStart;
        }
      } else {
        if (overIndex !== undefined && overIndex >= 0) {
          if (sourceIndex < overIndex) {
            insertIndex = Math.max(0, Math.min(overIndex - sourceBlockRows.length + 1, remainingRows.length));
          } else {
            insertIndex = Math.min(overIndex, remainingRows.length);
          }
        }
      }

      const nextRows = [
        ...remainingRows.slice(0, insertIndex),
        ...sourceBlockRows,
        ...remainingRows.slice(insertIndex),
      ];

      setRowData(
        nextRows.map((row, index) => ({
          ...row,
          field0: index + 1,
        }))
      );
    },
    [rowData, setRowData]
  );
  const [openCellMerge, setOpenCellMerge] = React.useState(false);
  const [mergePackageName, setMergePackageName] = React.useState('');
  const hasCheckedRows = rowData.some((row) => row.cheked);

  const moveCheckedRowsWithinGroup = React.useCallback(
    (direction: 'up' | 'down') => {
      setRowData((prev) => {
        const nextRows = [...prev];
        let groupStart = 0;

        while (groupStart < nextRows.length) {
          let groupEnd = groupStart;

          while (groupEnd + 1 < nextRows.length && nextRows[groupEnd + 1]?.field1 === nextRows[groupStart]?.field1) {
            groupEnd += 1;
          }

          if (direction === 'up') {
            for (let index = groupStart + 1; index <= groupEnd; index += 1) {
              const current = nextRows[index];
              const previous = nextRows[index - 1];

              if (current?.cheked && !previous?.cheked) {
                nextRows[index - 1] = current;
                nextRows[index] = previous;
              }
            }
          } else {
            for (let index = groupEnd - 1; index >= groupStart; index -= 1) {
              const current = nextRows[index];
              const following = nextRows[index + 1];

              if (current?.cheked && !following?.cheked) {
                nextRows[index] = following;
                nextRows[index + 1] = current;
              }
            }
          }

          groupStart = groupEnd + 1;
        }

        return nextRows.map((row, index) => ({
          ...row,
          field0: index + 1,
        }));
      });
    },
    [setRowData]
  );

  const handleMoveCheckedRowsUp = React.useCallback(() => {
    moveCheckedRowsWithinGroup('up');
  }, [moveCheckedRowsWithinGroup]);

  const handleMoveCheckedRowsDown = React.useCallback(() => {
    moveCheckedRowsWithinGroup('down');
  }, [moveCheckedRowsWithinGroup]);

  const handleMergePackageName = React.useCallback(() => {
    if (!mergePackageName.trim()) {
      return;
    }

    setRowData((prev) => {
      // 1. field1 업데이트
      const updated = prev.map((row) => {
        if (!row.cheked) {
          return row;
        }

        return {
          ...row,
          cheked: false,
          field1: mergePackageName,
        };
      });

      // 2. 동일 field1끼리 연속 그룹으로 정렬
      //    기존 순서를 최대한 유지하면서, 같은 field1은 첫 등장 위치로 모음
      const groups: Map<string, DummyData1Type[]> = new Map();
      const keyOrder: string[] = [];

      for (const row of updated) {
        if (!groups.has(row.field1)) {
          groups.set(row.field1, []);
          keyOrder.push(row.field1);
        }

        groups.get(row.field1)!.push(row);
      }

      const regrouped: DummyData1Type[] = [];

      for (const key of keyOrder) {
        for (const row of groups.get(key)!) {
          regrouped.push(row);
        }
      }

      return regrouped.map((row, index) => ({
        ...row,
        field0: index + 1,
      }));
    });

    setMergePackageName('');
    setOpenCellMerge(false);
  }, [mergePackageName, setRowData]);

  // 2026-06-01 width, flex 수정, sortable 추가
  const columnDefs1: (ColDef<DummyData1Type> | ColGroupDef<DummyData1Type>)[] = useMemo(
    () => [
      {
        headerName: '순서',
        field: 'field0',
        width: attributeColumnWidth(40),
        editable: true,
        cellClass: 'text-center',
        cellEditor: 'agNumberCellEditor',
        sortable: false,
        autoHeight: true,
        spanRows: true,
      },
      {
        headerName: '패키지명',
        field: 'field1',
        cellClass: '',
        width: attributeColumnWidth(140),
        autoHeight: true,
        spanRows: true,
        editable: true,
        cellEditor: 'agTextCellEditor',
        rowDrag: true,
      },
      {
        headerName: '선택',
        field: 'cheked',
        width: 30,
        sortable: false,
        editable: true,
        cellDataType: 'boolean',
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        autoHeight: true,
        resizable: false,
      },
      {
        headerName: '담보그룹명',
        field: 'field2',
        flex: 2,
        minWidth: attributeColumnWidth(200),
        autoHeight: true,
        editable: true,
        cellEditor: 'agTextCellEditor',
        rowDrag: true,
      },
    ],
    [attributeColumnWidth]
  );
  return (
    <>
      <Dialog open>
        <DialogContent showCloseButton resizable={true} size="md">
          <DialogHeader>
            <DialogTitle>
              <Typo tag={'strong'} variant={'heading-lg'}>
                보장패키지유형관리
              </Typo>
              <Typo tag={'p'} variant={'body-xl'}>
                (LTPZ640)
              </Typo>
            </DialogTitle>
          </DialogHeader>
          <DialogSection className="grid-rows-[auto_1fr] gap-1">
            <Grow placement="ec" className="w-full">
              <Button
                variant={'outlined'}
                color={'gray'}
                disabled={!hasCheckedRows}
                onClick={() => setOpenCellMerge(true)}
              >
                패키지 병합/분리
              </Button>
              <Button variant={'outlined'} color={'gray'} onClick={handleAddRow}>
                행추가
                <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
              </Button>
              <Button variant={'outlined'} color={'gray'} onClick={handleDeleteRow} disabled={!hasCheckedRows}>
                행삭제
                <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
              </Button>
              <Button
                color="gray-light"
                only="icon"
                size="sm"
                variant="outlined"
                onClick={handleMoveCheckedRowsUp}
                disabled={!hasCheckedRows}
              >
                <ArrowIcon className="rotate-90" color={'#FF5C2E'} size={13} />
              </Button>
              <Button
                color="gray-light"
                only="icon"
                size="sm"
                variant="outlined"
                onClick={handleMoveCheckedRowsDown}
                disabled={!hasCheckedRows}
              >
                <ArrowIcon className="-rotate-90" color={'#FF5C2E'} size={13} />
              </Button>
            </Grow>
            <div className="ag-theme-alpine min-h-[50vh]">
              <AgGridReact<DummyData1Type>
                onGridReady={(event) => {
                  gridApiRef.current = event.api;
                }}
                noRowsOverlayComponent={AgGridEmptyComponent}
                getRowId={(params) => String(params.data.id)}
                rowData={rowData}
                columnDefs={columnDefs1}
                onCellValueChanged={handleCellValueChanged}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                }}
                singleClickEdit={true}
                rowDragManaged={false}
                onRowDragEnter={handleRowDragEnter}
                onRowDragEnd={handleRowDragEnd}
                domLayout="normal"
                animateRows={false}
                tooltipShowMode="whenTruncated"
                tooltipShowDelay={0}
                tooltipHideDelay={3000}
                enableCellSpan={true}
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
      <ConfirmDialog
        title="패키지 병합/분리"
        description={
          <div className="space-y-2">
            <p>선택한 담보그룹명의 패키지명을 입력하세요.</p>
            <Input
              type="text"
              placeholder="패키지명 입력하세요."
              value={mergePackageName}
              onChange={(e) => setMergePackageName(e.target.value)}
            />
          </div>
        }
        open={openCellMerge}
        confirmLabel="적용"
        cancelLabel="취소"
        onOpenChange={setOpenCellMerge}
        onConfirm={handleMergePackageName}
      />
    </>
  );
};

export default Ltpz640;
