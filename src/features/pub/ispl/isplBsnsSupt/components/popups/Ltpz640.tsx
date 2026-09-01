/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type {
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  GridApi,
  ICellRendererParams,
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
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
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

type TargetObjectType = boolean[];

type DummyData1Type = {
  id: number;
  field0: number;
  field1: string;
  field2: string;
  checked?: boolean;
  target?: TargetObjectType;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    field0: 1,
    field1: '간병',
    field2: '간병인사용',
    checked: true,
    target: [true, false, true],
  },
  {
    id: 2,
    field0: 2,
    field1: '암주요',
    field2: '암주요치료(상급종합)',
    checked: false,
    target: [false, false, true],
  },
  {
    id: 3,
    field0: 2,
    field1: '암주요',
    field2: '암주요치료(종합병원)',
    checked: false,
    target: [true, true, true],
  },
  {
    id: 4,
    field0: 2,
    field1: '암주요',
    field2: '암주요치료(비급여)',
    checked: false,
    target: [false, false, true],
  },
  {
    id: 5,
    field0: 2,
    field1: '암주요',
    field2: '암주요치료(전이암)',
    checked: false,
    target: [false, false, true],
  },
  {
    id: 6,
    field0: 2,
    field1: '암주요',
    field2: '표적항암',
    checked: false,
    target: [false, false, true],
  },
  {
    id: 7,
    field0: 3,
    field1: '순환계치료비',
    field2: '요양병원제외',
    checked: false,
    target: [false, false, true],
  },
  {
    id: 8,
    field0: 3,
    field1: '순환계치료비',
    field2: '상급종합병원',
    checked: false,
    target: [false, false, true],
  },
  {
    id: 9,
    field0: 3,
    field1: '순환계치료비',
    field2: '주요순환계',
    checked: false,
    target: [false, false, true],
  },
  {
    id: 10,
    field0: 4,
    field1: '입원',
    field2: '1인실',
    checked: false,
    target: [false, false, true],
  },
  {
    id: 11,
    field0: 4,
    field1: '입원',
    field2: '2~3인실',
    checked: false,
    target: [false, false, true],
  },
  {
    id: 12,
    field0: 5,
    field1: '운전자',
    field2: '운전자비용',
    checked: false,
    target: [false, false, true],
  },
  {
    id: 13,
    field0: 6,
    field1: '여성',
    field2: '유/갑/생',
    checked: false,
    target: [false, false, true],
  },
  {
    id: 14,
    field0: 7,
    field1: '출산/난임',
    field2: '미혼자용',
    checked: false,
    target: [false, false, true],
  },
  {
    id: 15,
    field0: 7,
    field1: '출산/난임',
    field2: '기혼자용',
    checked: false,
    target: [false, false, true],
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

  const handleTargetChange = React.useCallback(
    (rowId: number, nextValues: string[]) => {
      setRowData((prev) =>
        prev.map((row) => {
          if (row.id !== rowId) {
            return row;
          }

          return {
            ...row,
            target: [nextValues.includes('1'), nextValues.includes('2'), nextValues.includes('3')],
          };
        })
      );
    },
    [setRowData]
  );

  const handleAddRow = createAddRowHandler<DummyData1Type, number>(setRowData, {
    idKey: 'id',
    getNextId: getNextNumericRowId,
    createRow: (nextId, rows, focusedRow) => {
      const defaultField1 = focusedRow?.field1 || (rows.length > 0 ? rows[rows.length - 1].field1 : '');
      return {
        id: nextId,
        field0: nextId,
        field1: defaultField1,
        field2: '',
        checked: false,
        target: [false, false, false],
      };
    },
    insertAt: 'focused',
    transformRows: (rows) =>
      rows.map((row, index) => ({
        ...row,
        field0: index + 1,
      })),
    gridApiRef,
  });

  const handleOpenAddPackageDialog = React.useCallback(() => {
    setMergePackageName('');
    setOpenCellMerge(true);
  }, []);

  const handleDeleteRow = React.useCallback(() => {
    setRowData((prev) => prev.filter((row) => !row.checked));
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

      if (event.colDef.field === 'checked') {
        const changedId = event.data.id;
        const newChecked = Boolean(event.newValue);

        setRowData((prev) =>
          prev.map((row) => {
            if (row.id !== changedId) {
              return row;
            }

            return {
              ...row,
              checked: newChecked,
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

        const finalNextRows = nextRows.map((row, index) => ({
          ...row,
          field0: index + 1,
        }));
        setRowData(finalNextRows);

        if (gridApiRef.current) {
          const api = gridApiRef.current;
          api.setGridOption?.('rowData', finalNextRows);
          api.refreshClientSideRowModel?.('everything');
          api.resetRowHeights();
          api.redrawRows();
          api.refreshCells({ force: true });
        }
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

      const finalNextRows = nextRows.map((row, index) => ({
        ...row,
        field0: index + 1,
      }));
      setRowData(finalNextRows);

      if (gridApiRef.current) {
        const api = gridApiRef.current;
        api.setGridOption?.('rowData', finalNextRows);
        api.refreshClientSideRowModel?.('everything');
        api.resetRowHeights();
        api.redrawRows();
        api.refreshCells({ force: true });
      }
    },
    [rowData, setRowData]
  );
  const [openCellMerge, setOpenCellMerge] = React.useState(false);
  const [mergePackageName, setMergePackageName] = React.useState('');
  const hasCheckedRows = rowData.some((row) => row.checked);

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

              if (current?.checked && !previous?.checked) {
                nextRows[index - 1] = current;
                nextRows[index] = previous;
              }
            }
          } else {
            for (let index = groupEnd - 1; index >= groupStart; index -= 1) {
              const current = nextRows[index];
              const following = nextRows[index + 1];

              if (current?.checked && !following?.checked) {
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

  const handleCreateNewPackage = React.useCallback(() => {
    if (!mergePackageName.trim()) {
      return;
    }

    setRowData((prev) => {
      const nextId = getNextNumericRowId(prev);
      const newRow: DummyData1Type = {
        id: nextId,
        field0: 1,
        field1: mergePackageName,
        field2: '',
        checked: false,
        target: [false, false, false],
      };

      const nextRows = [newRow, ...prev];

      return nextRows.map((row, index) => ({
        ...row,
        field0: index + 1,
      }));
    });

    setMergePackageName('');
    setOpenCellMerge(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        gridApiRef.current?.ensureIndexVisible(0, 'middle');
        gridApiRef.current?.setFocusedCell(0, 'field1');
      });
    });
  }, [mergePackageName, setRowData, setMergePackageName, setOpenCellMerge]);

  // 2026-06-01 width, flex 수정, sortable 추가
  const columnDefs1: (ColDef<DummyData1Type> | ColGroupDef<DummyData1Type>)[] = useMemo(
    () => [
      // {
      //   headerName: '순서',
      //   field: 'field0',
      //   width: attributeColumnWidth(40),
      //   editable: true,
      //   cellClass: 'text-center',
      //   cellEditor: 'agNumberCellEditor',
      //   sortable: false,
      //   spanRows: true,
      // },
      {
        headerName: '패키지명',
        field: 'field1',
        flex: 1,
        cellClass: 'editable-cell',
        minWidth: attributeColumnWidth(140),
        spanRows: true,
        editable: true,
        cellEditor: 'agTextCellEditor',
        rowDrag: true,
      },
      {
        headerName: '선택',
        field: 'checked',
        flex: 1,
        minWidth: attributeColumnWidth(30),
        sortable: false,
        editable: true,
        cellDataType: 'boolean',
        cellClass: 'editable-cell',
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        resizable: false,
      },
      {
        headerName: '담보그룹명',
        field: 'field2',
        flex: 10,
        cellClass: 'editable-cell',
        editable: true,
        cellEditor: 'agTextCellEditor',
        rowDrag: true,
      },
      {
        headerName: '적용대상',
        field: 'target',
        flex: 1,
        minWidth: attributeColumnWidth(210),
        cellClass: 'text-center justify-center editable-cell',
        cellRenderer: (params: ICellRendererParams<DummyData1Type>) => {
          const target = params.data?.target ?? [false, false, false];
          const values: string[] = [];
          if (target[0]) values.push('1');
          if (target[1]) values.push('2');
          if (target[2]) values.push('3');
          if (target[0] && target[1] && target[2]) values.push('all');

          return (
            <div className="flex w-full items-center justify-center gap-2" onMouseDown={(e) => e.stopPropagation()}>
              <CheckboxGroup
                size="md"
                value={values}
                onValueChange={(nextValues) => params.data && handleTargetChange(params.data.id, nextValues)}
                className="gap-3 justify-center"
              >
                <CheckboxGroupItem value="all" selectAll>
                  전체
                </CheckboxGroupItem>
                <CheckboxGroupItem value="1">전속</CheckboxGroupItem>
                <CheckboxGroupItem value="2">GA</CheckboxGroupItem>
                <CheckboxGroupItem value="3">TM</CheckboxGroupItem>
              </CheckboxGroup>
            </div>
          );
        },
      },
    ],
    [attributeColumnWidth, handleTargetChange]
  );
  return (
    <>
      <Dialog open>
        <DialogContent showCloseButton resizable={true} size="lg">
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
          <DialogSection className="grid-rows-[auto_minmax(0,1fr)] gap-1">
            <Grow placement="ec" className="w-full">
              <Button variant={'outlined'} color={'gray'} onClick={handleOpenAddPackageDialog}>
                패키지 추가
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
            <div className="cp-ag-icon-grip ag-theme-alpine">
              <AgGridReact<DummyData1Type>
                onGridReady={(event) => {
                  gridApiRef.current = event.api;
                }}
                onFirstDataRendered={(event) => {
                  event.api.resetRowHeights();
                  event.api.redrawRows();
                  event.api.refreshCells({ force: true });
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
        title="패키지 추가"
        description={
          <div className="space-y-2">
            <p>추가할 패키지명을 입력하세요.</p>
            <Input
              type="text"
              placeholder="패키지명을 입력하세요."
              value={mergePackageName}
              onChange={(e) => setMergePackageName(e.target.value)}
            />
          </div>
        }
        open={openCellMerge}
        confirmLabel="적용"
        cancelLabel="취소"
        onOpenChange={setOpenCellMerge}
        onConfirm={handleCreateNewPackage}
      />
    </>
  );
};

export default Ltpz640;
