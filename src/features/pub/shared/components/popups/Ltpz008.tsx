/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';

import { Badge } from '@uiux/Badge';
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

import { ColDef, ColGroupDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { PageArrowDoubleIcon, PageArrowIcon } from '@/shared/components/icons/CommonIcons';

type DummyDataType = {
  id: number;
  isChecked: boolean;
  isFixed: boolean;
  field01: string | number;
  field02: string | number;
};
const DummyData: DummyDataType[] = [
  { id: 1, isChecked: true, isFixed: true, field01: '특정부위', field02: '040' },
  { id: 2, isChecked: false, isFixed: true, field01: '특정부위', field02: '040' },
  { id: 3, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
  { id: 5, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
  { id: 7, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
  { id: 22, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
  { id: 23, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
  { id: 31, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
  { id: 33, isChecked: false, isFixed: false, field01: '특정부위', field02: '040' },
];

const Ltpz008 = () => {
  const [rightRowData, setRightRowData] = React.useState<DummyDataType[]>(DummyData);
  const rightGridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);

  const reorderMovableRows = React.useCallback(
    (rows: DummyDataType[], reorder: (movableRows: DummyDataType[]) => DummyDataType[]) => {
      const movableRows = rows.filter((row) => !row.isFixed);
      const reorderedMovableRows = reorder(movableRows);
      const fixedRowByIndex = new Map<number, DummyDataType>();

      rows.forEach((row, index) => {
        if (row.isFixed) {
          fixedRowByIndex.set(index, row);
        }
      });

      let movableIndex = 0;
      return rows.map((_, index) => {
        const fixedRow = fixedRowByIndex.get(index);
        if (fixedRow) {
          return fixedRow;
        }

        const movableRow = reorderedMovableRows[movableIndex];
        movableIndex += 1;
        return movableRow;
      });
    },
    []
  );

  const getSelectedIds = React.useCallback((): number[] => {
    const selectedNodes = rightGridApiRef.current?.getSelectedNodes() ?? [];
    return selectedNodes
      .filter((node) => !node.data?.isFixed)
      .map((node) => node.data?.id)
      .filter((id): id is number => typeof id === 'number');
  }, []);

  const moveSelectedBottom = React.useCallback(() => {
    const selectedIds = getSelectedIds();
    if (selectedIds.length === 0) return;

    const selectedSet = new Set(selectedIds);
    setRightRowData((prev) =>
      reorderMovableRows(prev, (movableRows) => {
        const selectedRows = movableRows.filter((row) => selectedSet.has(row.id));
        const unselectedRows = movableRows.filter((row) => !selectedSet.has(row.id));
        return [...unselectedRows, ...selectedRows];
      })
    );
  }, [getSelectedIds, reorderMovableRows]);

  const moveSelectedDownOne = React.useCallback(() => {
    const selectedIds = getSelectedIds();
    if (selectedIds.length === 0) return;

    const selectedSet = new Set(selectedIds);
    setRightRowData((prev) =>
      reorderMovableRows(prev, (movableRows) => {
        const next = [...movableRows];
        for (let index = next.length - 2; index >= 0; index -= 1) {
          if (selectedSet.has(next[index].id) && !selectedSet.has(next[index + 1].id)) {
            [next[index], next[index + 1]] = [next[index + 1], next[index]];
          }
        }
        return next;
      })
    );
  }, [getSelectedIds, reorderMovableRows]);

  const moveSelectedUpOne = React.useCallback(() => {
    const selectedIds = getSelectedIds();
    if (selectedIds.length === 0) return;

    const selectedSet = new Set(selectedIds);
    setRightRowData((prev) =>
      reorderMovableRows(prev, (movableRows) => {
        const next = [...movableRows];
        for (let index = 1; index < next.length; index += 1) {
          if (selectedSet.has(next[index].id) && !selectedSet.has(next[index - 1].id)) {
            [next[index - 1], next[index]] = [next[index], next[index - 1]];
          }
        }
        return next;
      })
    );
  }, [getSelectedIds, reorderMovableRows]);

  const moveSelectedTop = React.useCallback(() => {
    const selectedIds = getSelectedIds();
    if (selectedIds.length === 0) return;

    const selectedSet = new Set(selectedIds);
    setRightRowData((prev) =>
      reorderMovableRows(prev, (movableRows) => {
        const selectedRows = movableRows.filter((row) => selectedSet.has(row.id));
        const unselectedRows = movableRows.filter((row) => !selectedSet.has(row.id));
        return [...selectedRows, ...unselectedRows];
      })
    );
  }, [getSelectedIds, reorderMovableRows]);

  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '순번',
      width: 40,
      field: 'id',
      cellClass: 'text-center',
      spanRows: true,
    },
    {
      headerName: '대상이 되는 부위 또는 질병',
      flex: 1,
      field: 'field02',
      cellClass: 'text-left',
      autoHeight: true,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size={'lg'}>
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              담보순서변경
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ008)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="설계번호" variant="head" cols={['w-[1rem]', 'w-auto', 'w-[1rem]', 'w-auto']}>
              <FormRow className="grid grid-cols-[1fr_auto] w-full">
                <FormCell title={'상품명'} className="shrink-0" tdClassName="flex-1">
                  <Input value={'한화 시그니처 여성 검강보험 3.0 2504 '} readOnly />
                </FormCell>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={130} value={'LA123123123123'} readOnly />
                  -
                  <Input aria-label="" width={30} value={'1'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Grow gap={3} placement="ss" className="w-full">
            <Gcol className="h-full p-[1.2rem]" gap={2.5} placement="ss" variant="box-line">
              <Grow>
                <Badge color="gray" size={'md'} variant={'rounded'}>
                  현재
                </Badge>
                <Typo tag={'strong'} variant={'heading-md'}>
                  가입설계 선택 담보
                </Typo>
              </Grow>
              <div className="ag-theme-alpine min-h-[27rem]">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={DummyData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                    cellClass: 'text-center',
                  }}
                  domLayout="normal"
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </Gcol>
            <Gcol
              className="h-full p-[1.2rem] bg-[#FFF7F4] border-[0.2rem] border-[#FFCCBE]"
              gap={1}
              placement="ss"
              variant="box-line"
            >
              <Grow placement="bwc">
                <Grow>
                  <Badge className="bg-[#FFE0E0] text-[#FF5C2E]" size={'md'} variant={'rounded'}>
                    변경
                  </Badge>
                  <Typo tag={'strong'} variant={'heading-md'}>
                    가입설계 선택 담보
                  </Typo>
                </Grow>
                <Grow>
                  <Button color="gray-light" onClick={moveSelectedBottom} only="icon" size="md" variant="outlined">
                    <PageArrowDoubleIcon className="rotate-[270deg]" color={'#FF5C2E'} color2={'#FF5C2E'} />
                  </Button>
                  <Button color="gray-light" onClick={moveSelectedDownOne} only="icon" size="md" variant="outlined">
                    <PageArrowIcon className="rotate-[270deg]" color={'#FF5C2E'} />
                  </Button>
                  <Button color="gray-light" onClick={moveSelectedUpOne} only="icon" size="md" variant="outlined">
                    <PageArrowIcon className="rotate-[90deg]" color={'#FF5C2E'} />
                  </Button>
                  <Button color="gray-light" onClick={moveSelectedTop} only="icon" size="md" variant="outlined">
                    <PageArrowDoubleIcon className="rotate-[90deg]" color={'#FF5C2E'} color2={'#FF5C2E'} />
                  </Button>
                </Grow>
              </Grow>

              <div className="ag-theme-alpine min-h-[27rem]">
                <AgGridReact<DummyDataType>
                  onGridReady={(params) => {
                    rightGridApiRef.current = params.api;
                  }}
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rightRowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                    cellClass: 'text-center',
                  }}
                  domLayout="normal"
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                  rowSelection={{
                    mode: 'multiRow',
                    checkboxes: (params) => !params.data?.isFixed,
                    hideDisabledCheckboxes: true,
                    enableClickSelection: false,
                    headerCheckbox: false,
                  }}
                  selectionColumnDef={{
                    headerName: '선택',
                    width: 40,
                    cellClass: 'text-center editable-cell',
                  }}
                />
              </div>
            </Gcol>
          </Grow>
          <Typo icon="info" variant="body-sm">
            담보명의 순서를 변경항 경우 <b className="text-bold">담보설계(LTRA350)과 고객에게 전달하는 출력물</b>에도
            담보 순서가 변경됩니다.
          </Typo>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                초기화
              </Button>
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

export default Ltpz008;
