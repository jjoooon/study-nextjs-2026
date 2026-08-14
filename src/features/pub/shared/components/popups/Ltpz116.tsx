/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { CellEditingStartedEvent, ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import {
  AgGridEmptyComponent,
  createDeleteSelectedRowsHandler,
  createSequentialRowReorderHandler,
  getNextNumericRowId,
  useDynamicColumnWidths,
} from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon, ZoomInIcon, ZoomOutIcon } from '@icons';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

type DummyDataType = {
  id: number;
  isChecked?: boolean;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
  field6: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: true,
    field1: '설계누적반영',
    field2: 'LA260209313558',
    field3: '청약중',
    field4: '한화실 손의료보험(갱신형)2601',
    field5: '김한화',
    field6: '누적사전예외적용',
  },
  {
    id: 2,
    isChecked: true,
    field1: '설계누적반영',
    field2: 'LA260209313558',
    field3: '청약중',
    field4: '한화실 손의료보험(갱신형)2601',
    field5: '김한화',
    field6: '누적사전예외적용',
  },
  {
    id: 3,
    isChecked: true,
    field1: '설계누적반영',
    field2: 'LA260209313558',
    field3: '청약중',
    field4: '한화실 손의료보험(갱신형)2601',
    field5: '김한화',
    field6: '누적사전예외적용',
  },
  {
    id: 4,
    isChecked: true,
    field1: '설계누적반영',
    field2: 'LA260209313558',
    field3: '청약중',
    field4: '한화실 손의료보험(갱신형)2601',
    field5: '김한화',
    field6: '누적사전예외적용',
  },
];

const Ltpz116 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);
  const gridContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

  const handleAddRow = React.useCallback(() => {
    setRowData((prev) => {
      const nextId = getNextNumericRowId(prev);
      const newRow: DummyDataType = {
        isChecked: false,
        id: nextId,
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
        field6: '',
      };

      const nextRows = [...prev, newRow];

      // 최하단 스크롤
      setTimeout(() => {
        if (gridContainerRef.current) {
          const viewport = gridContainerRef.current.querySelector('.ag-body-viewport');
          if (viewport instanceof HTMLDivElement) {
            viewport.scrollTop = viewport.scrollHeight;
          }
        }
      }, 0);

      return nextRows;
    });
  }, []);

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
      headerName: '구분',
      field: 'field1',
      width: attributeColumnWidth(80),
    },
    {
      headerName: '설계번호',
      field: 'field2',
      flex: 2,
      minWidth: attributeColumnWidth(100),
      cellClass: '!px-0 text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Grow className="w-full flex items-center h-full px-2">
          <div className="flex-1 text-center">
            <Typo>{params.value}</Typo>
          </div>
          <div className="flex">
            <Button aria-label="질병 상세내용 보기" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
              <SearchIcon color={'var(--color-primary-50)'} />
            </Button>
          </div>
        </Grow>
      ),
    },
    {
      headerName: '상태',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      cellClass: 'text-center',
    },
    {
      headerName: '상품명',
      field: 'field4',
      flex: 2,
      cellClass: 'text-left',
      minWidth: attributeColumnWidth(200),
    },
    {
      headerName: '계약자',
      field: 'field5',
      flex: 1,
      cellClass: 'text-center',
      minWidth: attributeColumnWidth(60),
    },
    {
      headerName: '피보험자(김한화)',
      field: 'field6',
      flex: 2,
      cellClass: 'text-center',
      minWidth: attributeColumnWidth(100),
    },
    {
      headerName: '상세조건',
      width: attributeColumnWidth(60),
      cellClass: 'text-center',
      cellRenderer: (_params: ICellRendererParams<DummyDataType>) => (
        <Grow className="justify-center items-center h-full">
          <Button aria-label="질병 상세내용 보기" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grow>
      ),
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              동시가입누적체크
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ116)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr] gap-3">
          <Grow className="w-full" variant="box-round" placement={'bwe'}>
            <FormTable variant={'none'} cols={['w-1', 'w-3', 'w-1', 'w-auto']}>
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={'quoteNo'} value={'LA123456789012'} readOnly />
                  -
                  <Input aria-label="" width={26} value={'1'} readOnly />
                  <Input aria-label="" width={300} value={'무배당 LIFEPLUS 한아름종합보험2206'} readOnly />
                </FormCell>
                <FormCell title={'보험시기'}>2026-03-01</FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'피보험자'}>
                  <NativeSelect width={'auto'}>
                    {['김한화: 800101-1****', '김한화: 800101-1****'].map((option) => (
                      <NativeSelectOption key={option} value={option}>
                        {option}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
                <FormCell title={'설계상태'}>설계중</FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Grid placement="ec" className="w-full gap-2">
            <TableFold>
              <TableFoldHead title="동시가입누적 설계">
                {' '}
                <Button variant={'outlined'} color={'gray'} onClick={handleAddRow}>
                  행추가
                  <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
                </Button>
                <Button variant={'outlined'} color={'gray'} onClick={handleDeleteRow}>
                  행삭제
                  <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                </Button>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={rowData.length} ref={gridContainerRef}>
                  <AgGridReact<DummyDataType>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onGridReady={(event) => {
                      gridApiRef.current = event.api;
                    }}
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
              </TableFoldBody>
            </TableFold>
            <Gcol className="w-full" placement="ss" variant="box-warning">
              <Typo icon="warning" variant="body-sm">
                해당 팝업은 현재 누적이 감안되지 않은 타 설계번호와 동시 체결이 가능한지 인수지침 시뮬레이션을 위한
                화면입니다.
              </Typo>
            </Gcol>
          </Grid>
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

export default Ltpz116;
