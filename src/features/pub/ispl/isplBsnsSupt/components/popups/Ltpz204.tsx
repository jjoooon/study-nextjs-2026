/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import * as React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo, Gcol } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
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
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';

import '@/shared/lib/agGridPub';

type DummyData1Type = {
  id: number;
  field1: string;
  field2: string;
  checked: boolean;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    field1: '간병',
    field2: '간병인사용',
    checked: true,
  },
  {
    id: 2,
    field1: '암주요',
    field2: '암주요치료(상급종합)',
    checked: false,
  },
  {
    id: 3,
    field1: '암주요',
    field2: '암주요치료(종합병원)',
    checked: true,
  },
  {
    id: 4,
    field1: '암주요',
    field2: '암주요치료(비급여)',
    checked: false,
  },
  {
    id: 5,
    field1: '암주요',
    field2: '암주요치료(전이암)',
    checked: false,
  },
  {
    id: 6,
    field1: '암주요',
    field2: '표적항암',
    checked: true,
  },
  {
    id: 7,
    field1: '순환계치료비',
    field2: '요양병원제외',
    checked: false,
  },
  {
    id: 8,
    field1: '순환계치료비',
    field2: '상급종합병원',
    checked: true,
  },
  {
    id: 9,
    field1: '순환계치료비',
    field2: '주요순환계',
    checked: false,
  },
  {
    id: 10,
    field1: '입원',
    field2: '1인실',
    checked: false,
  },
  {
    id: 11,
    field1: '입원',
    field2: '2~3인실',
    checked: true,
  },
  {
    id: 12,
    field1: '운전자',
    field2: '운전자비용',
    checked: true,
  },
  {
    id: 13,
    field1: '여성',
    field2: '유/갑/생',
    checked: true,
  },
  {
    id: 14,
    field1: '출산/난임',
    field2: '미혼자용',
    checked: true,
  },
  {
    id: 15,
    field1: '출산/난임',
    field2: '기혼자용',
    checked: true,
  },
];

type DummyData2Type = {
  id: number;
  field1: string;
};
const DummyData2: DummyData2Type[] = [
  {
    id: 1,
    field1:
      '나눔의 행복(상해사망) 나눔의 행복(상해사망) 나눔의 행복(상해사망) 나눔의 행복(상해사망) 나눔의 행복(상해사망)',
  },
  {
    id: 2,
    field1: '나눔의 행복(상해사망)',
  },
  {
    id: 3,
    field1: '통합암(4대유사암제외) 진단비',
  },
  {
    id: 4,
    field1: '나눔의 행복(상해사망)',
  },
  {
    id: 5,
    field1: '나눔의 행복(상해사망)',
  },
  {
    id: 6,
    field1: '나눔의 행복(상해사망)',
  },
];

const Ltpz204 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  const columnDefs1: (ColDef<DummyData1Type> | ColGroupDef<DummyData1Type>)[] = useMemo(
    () => [
      {
        headerName: '패키지명',
        field: 'field1',
        flex: 2,
        minWidth: attributeColumnWidth(130),
        cellClass: 'text-center',
        autoHeight: true,
        spanRows: true,
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
        autoHeight: true,
      },
      {
        headerName: '세부',
        field: 'field2',
        flex: 20,
        autoHeight: true,
      },
    ],
    [attributeColumnWidth]
  );

  const gridApiRef = React.useRef<GridApi<DummyData2Type> | null>(null);
  const columnDefs2: ColDef<DummyData2Type>[] = useMemo(
    () => [
      {
        headerName: '담보명',
        field: 'field1',
        flex: 5,
        minWidth: attributeColumnWidth(200),
        tooltipValueGetter: createTooltipValueGetter<DummyData2Type>({ field: 'field1' }),
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              보장패키지 선택
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ204)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[minmax(0,1fr)] gap-1">
          <ResizablePanelGroup orientation="horizontal" className="w-full h-full">
            <ResizablePanel defaultSize={50}>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyData1Type>
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowId={(params) => String(params.data.id)}
                  rowData={DummyData1}
                  columnDefs={columnDefs1}
                  defaultColDef={{
                    sortable: true,
                    resizable: true, // 2026-06-01 true로 변경
                  }}
                  singleClickEdit={true}
                  domLayout="normal"
                  animateRows={false}
                  enableCellSpan={true}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyData2Type>
                  onGridReady={(event) => {
                    gridApiRef.current = event.api;
                  }}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowId={(params) => String(params.data.id)}
                  rowData={DummyData2}
                  columnDefs={columnDefs2}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  singleClickEdit={true}
                  domLayout="normal"
                  animateRows={false}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                  tooltipHideDelay={3000}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
          <Gcol className="w-full" placement="ss" variant="box-warning">
            <Typo icon="warning">
              패키지에 속한 담보를 추천설계에 반영합니다. 단, 상품에 따라 일부 담보는 미반영될 수 있습니다.
            </Typo>
            <Typo icon="warning">
              세트담보의 경우, 대표담보(모단보)만 표시됨니다. 추천설계 결과에는 종속 담보(자담보)까지 함께 반영됩니다.
            </Typo>
          </Gcol>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button size={'xl'}>적용</Button>
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

export default Ltpz204;
