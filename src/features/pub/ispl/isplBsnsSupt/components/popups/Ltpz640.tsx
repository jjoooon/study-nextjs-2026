/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import {
  AgGridEmptyComponent,
  createAddRowHandler,
  createSequentialRowReorderHandler,
  useDynamicColumnWidths,
  getNextNumericRowId,
} from '@aggrid';
import { Grow, Typo } from '@atoms';
import { ConfirmDialog } from '@common/ConfirmDialog';
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
import type { CellValueChangedEvent, ColDef, ColGroupDef, GridApi, RowDragEndEvent } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';
import { useMemo } from 'react';

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
    cheked: false,
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

  const handleAddRow = createAddRowHandler<DummyData1Type, number>(setRowData, {
    idKey: 'id',
    getNextId: getNextNumericRowId,
    createRow: (nextId) => ({
      id: nextId,
      field0: nextId,
      field1: '',
      field2: '',
      cheked: false,
    }),
    insertAt: 'end',
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
      const reorderedRows: DummyData1Type[] = [];
      const draggedRowId = event.node.data?.id;
      const draggedField1 = String(event.node.data?.field1 ?? '');

      event.api.forEachNodeAfterFilterAndSort((node) => {
        if (node.data) {
          reorderedRows.push(node.data);
        }
      });

      if (draggedRowId === undefined || !draggedField1) {
        setRowData(
          reorderedRows.map((row, index) => ({
            ...row,
            field0: index + 1,
          }))
        );
        return;
      }

      const sourceIndex = rowData.findIndex((row) => row.id === draggedRowId);
      if (sourceIndex < 0) {
        setRowData(
          reorderedRows.map((row, index) => ({
            ...row,
            field0: index + 1,
          }))
        );
        return;
      }

      let sourceStart = sourceIndex;
      let sourceEnd = sourceIndex;

      while (sourceStart > 0 && rowData[sourceStart - 1]?.field1 === draggedField1) {
        sourceStart -= 1;
      }

      while (sourceEnd < rowData.length - 1 && rowData[sourceEnd + 1]?.field1 === draggedField1) {
        sourceEnd += 1;
      }

      const sourceBlockRows = rowData.slice(sourceStart, sourceEnd + 1);
      const sourceBlockIdSet = new Set(sourceBlockRows.map((row) => row.id));
      const originalIndexById = new Map(rowData.map((row, index) => [row.id, index] as const));

      if (sourceBlockRows.length <= 1) {
        setRowData(
          reorderedRows.map((row, index) => ({
            ...row,
            field0: index + 1,
          }))
        );
        return;
      }

      const firstDraggedIndex = reorderedRows.findIndex((row) => row.id === draggedRowId);
      const removedBefore = reorderedRows
        .slice(0, Math.max(firstDraggedIndex, 0))
        .filter((row) => sourceBlockIdSet.has(row.id)).length;
      const insertIndex = Math.max(firstDraggedIndex - removedBefore, 0);

      const remainingRows = reorderedRows.filter((row) => !sourceBlockIdSet.has(row.id));
      let normalizedInsertIndex = Math.min(insertIndex, remainingRows.length);
      const targetRow = remainingRows[normalizedInsertIndex];

      if (targetRow) {
        const targetField1 = targetRow.field1;
        let targetStartIndex = normalizedInsertIndex;
        let targetEndIndex = normalizedInsertIndex;

        while (targetStartIndex > 0 && remainingRows[targetStartIndex - 1]?.field1 === targetField1) {
          targetStartIndex -= 1;
        }

        while (
          targetEndIndex < remainingRows.length - 1 &&
          remainingRows[targetEndIndex + 1]?.field1 === targetField1
        ) {
          targetEndIndex += 1;
        }

        const isMergedTarget = targetStartIndex !== targetEndIndex;

        if (!isMergedTarget) {
          normalizedInsertIndex = targetStartIndex;
        } else {
          const targetOriginalIndex = originalIndexById.get(targetRow.id);

          if (targetOriginalIndex === undefined) {
            normalizedInsertIndex = targetStartIndex;
          } else if (sourceEnd < targetOriginalIndex) {
            normalizedInsertIndex = targetEndIndex + 1;
          } else if (sourceStart > targetOriginalIndex) {
            normalizedInsertIndex = targetStartIndex;
          } else {
            normalizedInsertIndex = targetStartIndex;
          }
        }
      }

      const mergedMovedRows = [
        ...remainingRows.slice(0, normalizedInsertIndex),
        ...sourceBlockRows,
        ...remainingRows.slice(normalizedInsertIndex),
      ];

      setRowData(
        mergedMovedRows.map((row, index) => ({
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

  // 2026-06-01 width, flex 수정
  const columnDefs1: (ColDef<DummyData1Type> | ColGroupDef<DummyData1Type>)[] = useMemo(
    () => [
      // {
      //   headerName: '순서',
      //   field: 'field0',
      //   width: 40,
      //   editable: true,
      //   cellClass: 'text-center',
      //   cellEditor: 'agNumberCellEditor',
      //   sortable: false,
      //   autoHeight: true,
      //   spanRows: true,
      // },
      {
        headerName: '패키지명',
        field: 'field1',
        cellClass: '',
        flex: 0.7,
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
        cellClass: '',
        flex: 2,
        autoHeight: true,
        editable: true,
        cellEditor: 'agTextCellEditor',
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
                rowDragManaged={true}
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
