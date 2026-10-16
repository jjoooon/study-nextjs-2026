/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ColGroupDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import * as React from 'react';
import {
  AgGridEmptyComponent,
  useDynamicColumnWidths,
  createTreeNameCellRenderer,
  createTooltipValueGetter,
} from '@aggrid';
import { Grow, Typo, Grid } from '@atoms';
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

type DummyData1Type = {
  id: number;
  field1: string;
  field2: string;
  cheked?: boolean;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    field1: '간병',
    cheked: false,
    field2: '간병인사용',
  },
  {
    id: 2,
    field1: '암주요',
    cheked: false,
    field2: '암주요치료(상급종합)',
  },
  {
    id: 3,
    field1: '암주요',
    cheked: false,
    field2: '암주요치료(종합병원)',
  },
  {
    id: 4,
    field1: '암주요',
    cheked: false,
    field2: '암주요치료(비급여)',
  },
  {
    id: 5,
    field1: '암주요',
    cheked: false,
    field2: '암주요치료(전이암)',
  },
  {
    id: 6,
    field1: '암주요',
    cheked: false,
    field2: '표적항암',
  },
  {
    id: 7,
    field1: '순환계치료비',
    cheked: false,
    field2: '요양병원제외',
  },
  {
    id: 8,
    field1: '순환계치료비',
    cheked: false,
    field2: '상급종합병원',
  },
  {
    id: 9,
    field1: '순환계치료비',
    cheked: false,
    field2: '주요순환계',
  },
  {
    id: 10,
    field1: '입원',
    cheked: false,
    field2: '1인실',
  },
  {
    id: 11,
    field1: '입원',
    cheked: false,
    field2: '2~3인실',
  },
  {
    id: 12,
    field1: '운전자',
    cheked: false,
    field2: '운전자비용',
  },
  {
    id: 13,
    field1: '여성',
    cheked: false,
    field2: '유/갑/생',
  },
  {
    id: 14,
    field1: '출산/난임',
    cheked: false,
    field2: '미혼자용',
  },
  {
    id: 15,
    field1: '출산/난임',
    cheked: false,
    field2: '기혼자용',
  },
];

type DummyData2Type = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  filePath: string[];
};

const DummyData2: DummyData2Type[] = [
  {
    id: 1,
    field1: 'CLA23114',
    field2:
      '나눔의 행복(상해사망)나눔의 행복(상해사망)나눔의 행복(상해사망)나눔의 행복(상해사망)나눔의 행복(상해사망)나눔의 행복(상해사망)나눔의 행복(상해사망)나눔의 행복(상해사망)나눔의 행복(상해사망)나눔의 행복(상해사망)나눔의 행복(상해사망)나눔의 행복(상해사망)나눔의 행복(상해사망)나눔의 행복(상해사망)나눔의 행복(상해사망)',
    field3: '',
    filePath: ['1'],
  },
  {
    id: 2,
    field1: 'CLA23115',
    field2: '기본계약(상해후유장해 80%미만)',
    field3: '',
    filePath: ['2'],
  },
  {
    id: 3,
    field1: 'CLA23116',
    field2: '통합암(4대유사암제외) 진단비 세트',
    field3: '세트담보',
    filePath: ['3'],
  },
  {
    id: 4,
    field1: 'CLA23116-1',
    field2: '통합암진단비(일반암)',
    field3: '',
    filePath: ['3', '3-1'],
  },
  {
    id: 5,
    field1: 'CLA23116-2',
    field2: '유사암진단비(갑상선암/기타피부암/경계성종양/제자리암)',
    field3: '',
    filePath: ['3', '3-2'],
  },
  {
    id: 6,
    field1: 'CLA23116-3',
    field2: '특정소액암진단비',
    field3: '',
    filePath: ['3', '3-3'],
  },
  {
    id: 7,
    field1: 'CLA23117',
    field2: '표적항암약물허가치료비',
    field3: '',
    filePath: ['4'],
  },
  {
    id: 8,
    field1: 'CLA23118',
    field2: '암직접치료입원일당(1-180일)',
    field3: '',
    filePath: ['5'],
  },
  {
    id: 9,
    field1: 'CLA23119',
    field2: '뇌혈관질환 종합보장 세트',
    field3: '세트담보',
    filePath: ['6'],
  },
  {
    id: 10,
    field1: 'CLA23119-1',
    field2: '뇌혈관질환진단비',
    field3: '',
    filePath: ['6', '6-1'],
  },
  {
    id: 11,
    field1: 'CLA23119-2',
    field2: '뇌출혈진단비',
    field3: '',
    filePath: ['6', '6-2'],
  },
  {
    id: 12,
    field1: 'CLA23119-3',
    field2: '뇌혈관질환수술비',
    field3: '',
    filePath: ['6', '6-3'],
  },
  {
    id: 13,
    field1: 'CLA23120',
    field2: '허혈성심장질환 종합보장 세트',
    field3: '세트담보',
    filePath: ['7'],
  },
  {
    id: 14,
    field1: 'CLA23120-1',
    field2: '허혈성심장질환진단비',
    field3: '',
    filePath: ['7', '7-1'],
  },
  {
    id: 15,
    field1: 'CLA23120-2',
    field2: '급성심근경색증진단비',
    field3: '',
    filePath: ['7', '7-2'],
  },
  {
    id: 16,
    field1: 'CLA23121',
    field2: '골절진단비(치아파절제외)',
    field3: '',
    filePath: ['8'],
  },
  {
    id: 17,
    field1: 'CLA23122',
    field2: '깁스치료비(부목치료제외)',
    field3: '',
    filePath: ['9'],
  },
  {
    id: 18,
    field1: 'CLA23123',
    field2: '질병수술비(1-5종)',
    field3: '',
    filePath: ['10'],
  },
  {
    id: 19,
    field1: 'CLA23124',
    field2: '상해수술비(비급여포함)',
    field3: '',
    filePath: ['11'],
  },
  {
    id: 20,
    field1: 'CLA23125',
    field2: '가족일상생활배상책임(대인/대물 배상한도 1억원)',
    field3: '',
    filePath: ['12'],
  },
];

const treeNameCellRenderer = createTreeNameCellRenderer<DummyData2Type>();

const syncTreeVisibilityBySelection = (api: GridApi<DummyData2Type>) => {
  api.forEachNode((node) => {
    const isTopLevel = (node.data?.filePath.length ?? 0) === 1;
    const hasChildNode = (node.childrenAfterGroup?.length ?? 0) > 0;

    if (!isTopLevel || !hasChildNode) {
      return;
    }

    node.setExpanded(Boolean(node.isSelected()));
  });
};

const Ltpz020 = ({ open }: { open: boolean }) => {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 담보분류 -------------
  const columnDefs1: (ColDef<DummyData1Type> | ColGroupDef<DummyData1Type>)[] = useMemo(
    () => [
      {
        headerName: '패키지명',
        field: 'field1',
        width: attributeColumnWidth(90),
        wrapText: true,
        autoHeight: true,
        cellClass: 'whitespace-normal break-words !leading-[1.3] !py-2',
        spanRows: true,
      },
      {
        headerName: '선택',
        field: 'cheked',
        width: attributeColumnWidth(30),
        editable: true,
        cellDataType: 'boolean',
        cellClass: 'editable-cell text-center',
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        autoHeight: true,
        resizable: false,
      },
      {
        headerName: '세부',
        field: 'field2',
        flex: 1,
        autoHeight: true,
      },
    ],
    [attributeColumnWidth]
  );

  // 담보관리 -------------
  const [rowData2] = React.useState<DummyData2Type[]>(DummyData2);
  const gridApiRef = React.useRef<GridApi<DummyData2Type> | null>(null);

  const columnDefs2: ColDef<DummyData2Type>[] = useMemo(
    () => [
      {
        headerName: '담보명',
        field: 'field2',
        flex: 1,
        cellRenderer: treeNameCellRenderer,
        tooltipValueGetter: createTooltipValueGetter<DummyData2Type>({ field: 'field2' }),
      },
    ],
    []
  );

  // 검수:체크시 트리구조 열림.
  return (
    <Dialog open={open}>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              보장패키지 선택
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LPTZ020)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[minmax(0,1fr)] ">
          <Grid className="grid-cols-[30rem_1fr] grid-rows-[minmax(0,1fr)] h-full w-full" gap={3}>
            {/* 패키지 유형 */}
            <Grid className="grid-rows-[auto_minmax(0,1fr)] h-full w-full">
              <Grow className="w-full" placement="sc">
                <Typo variant={'heading-md'} tag="h2">
                  패키지 유형
                </Typo>
              </Grow>
              <div className="ag-theme-alpine inner-scroll">
                <AgGridReact<DummyData1Type>
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowId={(params) => String(params.data.id)}
                  rowData={DummyData1}
                  columnDefs={columnDefs1}
                  defaultColDef={{
                    sortable: true,
                    resizable: false,
                  }}
                  singleClickEdit={true}
                  domLayout="normal"
                  animateRows={false}
                  enableCellSpan={true}
                />
              </div>
            </Grid>

            {/* 세부담보 */}
            <Grid className="grid-rows-[auto_minmax(0,1fr)] h-full w-full" gap={1}>
              <Grow className="w-full" placement="bwc">
                <Typo variant={'heading-md'} tag="h2">
                  세부담보
                </Typo>
              </Grow>
              <div className="ag-theme-alpine inner-scroll">
                <AgGridReact<DummyData2Type>
                  onFirstDataRendered={(event) => {
                    event.api.selectAll();
                    syncTreeVisibilityBySelection(event.api);
                  }}
                  onSelectionChanged={(event) => {
                    syncTreeVisibilityBySelection(event.api);
                  }}
                  onGridReady={(event) => {
                    gridApiRef.current = event.api;
                  }}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  singleClickEdit={true}
                  rowSelection={{
                    mode: 'multiRow',
                    headerCheckbox: true,
                    checkboxes: (params) => (params.data?.filePath.length ?? 0) === 1,
                    hideDisabledCheckboxes: true,
                    enableClickSelection: false,
                  }}
                  selectionColumnDef={{
                    width: 30,
                    cellClass: 'editable-cell text-center',
                  }}
                  domLayout="normal"
                  animateRows={false}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                  tooltipHideDelay={3000}
                  treeData={true}
                  groupDisplayType={'custom'}
                  getDataPath={(row) => row.filePath}
                  groupDefaultExpanded={0}
                />
              </div>
            </Grid>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                적용
              </Button>
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
  );
};

export default Ltpz020;
