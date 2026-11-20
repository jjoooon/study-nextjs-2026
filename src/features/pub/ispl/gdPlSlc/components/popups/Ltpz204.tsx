/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { CellClickedEvent, ColDef, ColGroupDef, GridApi, NewValueParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useMemo } from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo, Gcol, Grid } from '@atoms';
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

export type CoverageItemType = {
  name: string;
  status?: '가능' | '불가';
};

type DummyData1Type = {
  id: number;
  field1: string;
  field2: string;
  checked: boolean;
  coverages?: CoverageItemType[];
};

const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    field1: '간병',
    field2: '간병인사용',
    checked: false,
    coverages: [
      { name: '간병 - 간병인사용', status: '가능' },
      { name: '간병인사용일당(요양병원제외)(1일이상180일한도)' },
      { name: '간병인사용일당(요양병원)(1일이상180일한도)' },
    ],
  },
  {
    id: 2,
    field1: '암주요',
    field2: '암주요치료(상급종합)',
    checked: false,
    coverages: [
      { name: '암주요 - 암주요치료(상급종합)', status: '불가' },
      { name: '전이암특정치료비(종합병원)(각연간1회한)' },
      { name: '전이암특정치료비(수술)(종합병원)(연간1회한)' },
      { name: '전이암특정치료비(항암방사선치료)(종합병원)(연간1회한)' },
      { name: '전이암특정치료비(항암약물치료)(종합병원)(연간1회한)' },
    ],
  },
  {
    id: 3,
    field1: '암주요',
    field2: '암주요치료(종합병원)',
    checked: false,
    coverages: [
      { name: '암주요 - 암주요치료(종합병원)', status: '가능' },
      { name: '암주요치료비(종합병원)(연간1회한)' },
      { name: '암수술비(종합병원)(연간1회한)' },
    ],
  },
  {
    id: 4,
    field1: '암주요',
    field2: '암주요치료(비급여)',
    checked: false,
    coverages: [{ name: '암주요 - 암주요치료(비급여)', status: '가능' }, { name: '암주요치료비(비급여)(연간1회한)' }],
  },
  {
    id: 5,
    field1: '암주요',
    field2: '암주요치료(전이암)',
    checked: false,
    coverages: [
      { name: '암주요 - 암주요치료(전이암)', status: '가능' },
      { name: '전이암특정치료비(수술)(종합병원)(연간1회한)' },
      { name: '전이암특정치료비(항암방사선치료)(종합병원)(연간1회한)' },
      { name: '전이암특정치료비(항암약물치료)(종합병원)(연간1회한)' },
      { name: '전이암특정치료비(수술)(암전문의료기관(상급종합병원등))(연간1회한)' },
      { name: '전이암특정치료비(항암방사선치료)(암전문의료기관(상급종합병원등))(연간1회한)' },
    ],
  },
  {
    id: 6,
    field1: '암주요',
    field2: '표적항암',
    checked: false,
    coverages: [
      { name: '암주요 - 표적항암', status: '가능' },
      { name: '표적항암약물허가치료비' },
      { name: '표적항암방사선치료비' },
    ],
  },
  {
    id: 7,
    field1: '순환계치료비',
    field2: '요양병원제외',
    checked: false,
    coverages: [{ name: '순환계치료비 - 요양병원제외', status: '가능' }, { name: '순환계질환치료비(요양병원제외)' }],
  },
  {
    id: 8,
    field1: '순환계치료비',
    field2: '상급종합병원',
    checked: false,
    coverages: [{ name: '순환계치료비 - 상급종합병원', status: '가능' }, { name: '순환계질환치료비(상급종합병원)' }],
  },
  {
    id: 9,
    field1: '순환계치료비',
    field2: '주요순환계',
    checked: false,
    coverages: [{ name: '순환계치료비 - 주요순환계', status: '가능' }, { name: '주요순환계질환진단비' }],
  },
  {
    id: 10,
    field1: '입원',
    field2: '1인실',
    checked: false,
    coverages: [
      { name: '입원 - 1인실', status: '가능' },
      { name: '상해종합병원1인실입원비(1일이상30일한도)' },
      { name: '상해종합병원1인실입원비(1일이상30일한도)' },
    ],
  },
  {
    id: 11,
    field1: '입원',
    field2: '2~3인실',
    checked: false,
    coverages: [{ name: '입원 - 2~3인실', status: '가능' }, { name: '종합병원 2~3인실 입원일당' }],
  },
  {
    id: 12,
    field1: '운전자',
    field2: '운전자비용',
    checked: false,
    coverages: [
      { name: '운전자 - 운전자비용', status: '가능' },
      { name: '교통사고처리지원금(동승자포함)' },
      { name: '변호사선임비용' },
    ],
  },
  {
    id: 13,
    field1: '여성',
    field2: '유/갑/생',
    checked: false,
    coverages: [
      { name: '여성 - 유/갑/생', status: '불가' },
      { name: '유방,갑상선,여성생식기질환통합치료비(연간1억원한도)' },
      { name: '유방,갑상선,여성생식기질환통합치료비(연간5천만원한도)' },
      { name: '유방,갑상선,여성생식기질환(일반질환)통합치료비(연간2천만원한도)' },
    ],
  },
  {
    id: 14,
    field1: '출산/난임',
    field2: '미혼자용',
    checked: false,
    coverages: [{ name: '출산/난임 - 미혼자용', status: '불가' }, { name: '난임치료보장특약(인공수정/체외수정)' }],
  },
  {
    id: 15,
    field1: '출산/난임',
    field2: '기혼자용',
    checked: false,
    coverages: [{ name: '출산/난임 - 기혼자용', status: '가능' }, { name: '출산축하보장특약' }],
  },
];

type DummyData2Type = {
  id: string | number;
  parentId: number;
  packageName?: string;
  field1: string;
  status?: '가능' | '불가' | '';
  isGroupDivider?: boolean;
};

const Ltpz204 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  const columnDefs1: (ColDef<DummyData1Type> | ColGroupDef<DummyData1Type>)[] = useMemo(
    () => [
      {
        headerName: '패키지명',
        field: 'field1',
        flex: 3,
        minWidth: attributeColumnWidth(100),
        cellClass: 'text-center',
        autoHeight: true,
        spanRows: true,
      },
      {
        headerName: '선택',
        field: 'checked',
        width: attributeColumnWidth(30),
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
        flex: 4,
        autoHeight: true,
        cellClass: 'cursor-pointer',
      },
    ],
    [attributeColumnWidth]
  );

  const [rowData1, setRowData1] = React.useState<DummyData1Type[]>(DummyData1);

  const handleCellClicked1 = React.useCallback((event: CellClickedEvent<DummyData1Type>) => {
    if (event.colDef.field === 'field2' && event.node && event.data) {
      const nextChecked = !event.data.checked;
      event.node.setDataValue('checked', nextChecked);
      setRowData1((prev) => prev.map((row) => (row.id === event.data!.id ? { ...row, checked: nextChecked } : row)));
    }
  }, []);

  const handleCellValueChanged1 = React.useCallback((event: NewValueParams<DummyData1Type>) => {
    if (event.colDef.field === 'checked' && event.data) {
      setRowData1((prev) =>
        prev.map((row) => (row.id === event.data!.id ? { ...row, checked: event.data!.checked } : row))
      );
    }
  }, []);

  const rowData2 = useMemo<DummyData2Type[]>(() => {
    const rawList: DummyData2Type[] = [];
    rowData1.forEach((item) => {
      if (item.checked) {
        const coverages: CoverageItemType[] =
          item.coverages && item.coverages.length > 0
            ? item.coverages
            : [
                {
                  name: `${item.field1} - ${item.field2}`,
                  status: '가능',
                },
                {
                  name: `${item.field2} 관련 세부담보`,
                },
              ];

        rawList.push(
          ...coverages.map<DummyData2Type>((cov, index) => ({
            id: `${item.id}-${index + 1}`,
            parentId: item.id,
            packageName: item.field2,
            field1: cov.name,
            status: cov.status ?? '',
          }))
        );
      }
    });
    return rawList.map((item, index) => ({
      ...item,
      isGroupDivider: index > 0 && (item.parentId !== rawList[index - 1].parentId || Boolean(item.status)),
    }));
  }, [rowData1]);

  const rowClassRules2 = useMemo(
    () => ({
      'package-group-divider': (params: { data?: DummyData2Type }) => Boolean(params.data?.isGroupDivider),
    }),
    []
  );

  const gridApiRef = React.useRef<GridApi<DummyData2Type> | null>(null);
  const columnDefs2: (ColDef<DummyData2Type> | ColGroupDef<DummyData2Type>)[] = useMemo(
    () => [
      {
        headerName: '적용여부',
        field: 'status',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        sortable: false,
        cellClass: (params) => {
          if (params.data?.status === '가능') {
            return 'text-center font-bold isSuccess';
          }
          if (params.data?.status === '불가') {
            return 'text-center font-bold isCancel !border-r-transparent';
          }
          return 'text-center';
        },
        cellRenderer: (params: { value?: string }) => {
          if (!params.value) return null;
          return (
            <span className={params.value === '불가' ? 'text-[var(--color-danger-50)] font-bold' : 'font-bold'}>
              {params.value}
            </span>
          );
        },
      },
      {
        headerName: '담보명',
        field: 'field1',
        flex: 10,
        sortable: false,
        cellClass: (params) => {
          if (params.data?.status === '가능') {
            return 'font-bold isSuccess';
          }
          if (params.data?.status === '불가') {
            return 'font-bold isCancel';
          }
          return '';
        },
        tooltipValueGetter: createTooltipValueGetter<DummyData2Type>({ field: 'field1' }),
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl" className="ltpz204-style">
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
        <DialogSection className="grid-rows-[minmax(0,1fr)] gap-1 p-1">
          <ResizablePanelGroup orientation="horizontal" className="w-full h-full min-h-[30rem]">
            <ResizablePanel defaultSize={40}>
              <Grid className="grid-rows-[auto_minmax(0,1fr)] h-full w-full overflow-y-hidden">
                <Grow className="w-full h-[2.5rem]" placement="sc">
                  <Typo variant={'heading-md'} tag="h2">
                    패키지
                  </Typo>
                </Grow>
                <div className="ag-theme-alpine ">
                  <AgGridReact<DummyData1Type>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowData1}
                    columnDefs={columnDefs1}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                    }}
                    singleClickEdit={true}
                    domLayout="normal"
                    animateRows={false}
                    enableCellSpan={true}
                    onCellClicked={handleCellClicked1}
                    onCellValueChanged={handleCellValueChanged1}
                  />
                </div>
              </Grid>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={60}>
              <Grid className="grid-rows-[auto_minmax(0,1fr)] h-full w-full overflow-y-hidden">
                <Grow className="w-full h-[2.5rem]" placement="bwc">
                  <Typo variant={'heading-md'} tag="h2">
                    세부담보
                  </Typo>
                  <p>
                    <b className="text-[var(--color-danger-50)]">불가</b> : 추천옵션에 관련된 상품에 패키지가 없다면, ‘
                    <b className="text-[var(--color-danger-50)]">불가</b>’ 표시됩니다.
                  </p>
                </Grow>
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyData2Type>
                    onGridReady={(event) => {
                      gridApiRef.current = event.api;
                    }}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    noRowsOverlayComponentParams={{
                      message: '보장패키지를 선택해주세요',
                    }}
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowData2}
                    columnDefs={columnDefs2}
                    rowClassRules={rowClassRules2}
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
              </Grid>
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
