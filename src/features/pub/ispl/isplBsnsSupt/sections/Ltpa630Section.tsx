/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import {
  AgGridEmptyComponent,
  getNextNumericRowId,
  useDynamicColumnWidths,
  createAddRowHandler,
  createDeleteSelectedRowsHandler,
  createTreeNameCellRenderer,
} from '@aggrid';
import { Grow, Grid, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { ZoomInIcon, ZoomOutIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import type { ColDef, ColGroupDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useMemo } from 'react';

import '@/shared/lib/agGridPub';

type DummyData1Type = {
  id: number;
  field1: string;
  field2: string;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    field1: '간병',
    field2: '간병인사용',
  },
  {
    id: 2,
    field1: '암주요',
    field2: '암주요치료(상급종합)',
  },
  {
    id: 3,
    field1: '암주요',
    field2: '암주요치료(종합병원)',
  },
  {
    id: 4,
    field1: '암주요',
    field2: '암주요치료(비급여)',
  },
  {
    id: 5,
    field1: '암주요',
    field2: '암주요치료(전이암)',
  },
  {
    id: 6,
    field1: '암주요',
    field2: '표적항암',
  },
  {
    id: 7,
    field1: '순환계치료비',
    field2: '요양병원제외',
  },
  {
    id: 8,
    field1: '순환계치료비',
    field2: '상급종합병원',
  },
  {
    id: 9,
    field1: '순환계치료비',
    field2: '주요순환계',
  },
  {
    id: 10,
    field1: '입원',
    field2: '1인실',
  },
  {
    id: 11,
    field1: '입원',
    field2: '2~3인실',
  },
  {
    id: 12,
    field1: '운전자',
    field2: '운전자비용',
  },
  {
    id: 13,
    field1: '여성',
    field2: '유/갑/생',
  },
  {
    id: 14,
    field1: '출산/난임',
    field2: '미혼자용',
  },
  {
    id: 15,
    field1: '출산/난임',
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
    field2: '나눔의 행복(상해사망)',
    field3: '',
    filePath: ['1'],
  },
  {
    id: 2,
    field1: 'CLA23114',
    field2: '나눔의 행복(상해사망)',
    field3: '',
    filePath: ['2'],
  },
  {
    id: 3,
    field1: 'CLA23114',
    field2: '통합암(4대유사암제외) 진단비',
    field3: '세트담보',
    filePath: ['3'],
  },
  {
    id: 4,
    field1: '',
    field2: '나눔의 행복(상해사망)',
    field3: '',
    filePath: ['3', '3-1'],
  },
  {
    id: 5,
    field1: '',
    field2: '나눔의 행복(상해사망)',
    field3: '',
    filePath: ['3', '3-2'],
  },
  {
    id: 6,
    field1: 'CLA23114',
    field2: '나눔의 행복(상해사망)',
    field3: '',
    filePath: ['4'],
  },
];

const treeNameCellRenderer = createTreeNameCellRenderer<DummyData2Type>();

export default function Ltpa630Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 2026-06-04 flex, minWidth 수정
  // 담보분류 -------------
  const columnDefs1: (ColDef<DummyData1Type> | ColGroupDef<DummyData1Type>)[] = useMemo(
    () => [
      {
        headerName: '패키지명',
        field: 'field1',
        flex: 1,
        minWidth: attributeColumnWidth(140),
        autoHeight: true,
        spanRows: true,
      },
      {
        headerName: '세부',
        field: 'field2',
        flex: 6,
        minWidth: attributeColumnWidth(300),
        autoHeight: true,
      },
    ],
    [attributeColumnWidth]
  );

  // 2026-06-04 flex, minWidth 수정
  // 담보관리 -------------
  const [rowData2, setRowData2] = React.useState<DummyData2Type[]>(DummyData2);
  const gridApiRef = React.useRef<GridApi<DummyData2Type> | null>(null);

  const handleAddRow = createAddRowHandler<DummyData2Type, number>(setRowData2, {
    idKey: 'id',
    getNextId: getNextNumericRowId,
    createRow: (nextId) => ({
      id: nextId,
      field1: String(nextId),
      field2: '',
      field3: '',
      filePath: [String(nextId)],
    }),
    insertAt: 'end',
    gridApiRef,
  });

  const handleDeleteRow = createDeleteSelectedRowsHandler<DummyData2Type>(setRowData2, gridApiRef, {
    idKey: 'id',
  });

  // 2026-06-01 width, flex 수정
  const columnDefs2: ColDef<DummyData2Type>[] = useMemo(
    () => [
      {
        headerName: '담보명',
        field: 'field2',
        flex: 6,
        minWidth: attributeColumnWidth(300),
        cellClass: (params) =>
          params.data && params.data.filePath.length === 1
            ? 'editable-cell'
            : 'before:content-["-"] before:inline-block before:mr-1',
        editable: (params) => Boolean(params.data && params.data.filePath.length === 1),
      },
      {
        headerName: '구분',
        field: 'field3',
        cellClass: '[&>*]:justify-center',
        flex: 1,
        minWidth: attributeColumnWidth(90),
        cellRenderer: treeNameCellRenderer,
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '보장패키지담보관리',
            pageId: 'LTPA630',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-cols-[1fr_1fr] h-full w-full" gap={3}>
            {/* 패키지 관리 */}
            <Grid className="grid-rows-[auto_1fr] h-full w-full">
              <Grow className="w-full h-[2.5rem]" placement="sc">
                <Typo variant={'heading-md'} tag="h2">
                  패키지 관리
                </Typo>
              </Grow>
              <div className="ag-theme-alpine radio-selection">
                <AgGridReact<DummyData1Type>
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowId={(params) => String(params.data.id)}
                  rowData={DummyData1}
                  columnDefs={columnDefs1}
                  defaultColDef={{
                    sortable: true,
                    resizable: true, // 2026-06-01 true로 수정
                  }}
                  singleClickEdit={true}
                  domLayout="normal"
                  animateRows={false}
                  enableCellSpan={true}
                />
              </div>
            </Grid>

            {/* 담보관리 */}
            <Grid className="grid-rows-[auto_1fr] h-full w-full" gap={1}>
              <Grow className="w-full" placement="bwc">
                <Typo variant={'heading-md'} tag="h2">
                  담보관리
                </Typo>
                <Grow placement="ec">
                  <Button variant={'outlined'} color={'gray'} onClick={handleAddRow}>
                    행추가
                    <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
                  </Button>
                  <Button variant={'outlined'} color={'gray'} onClick={handleDeleteRow}>
                    행삭제
                    <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                  </Button>
                </Grow>
              </Grow>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyData2Type>
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
                    headerCheckbox: false,
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
                  treeData={true}
                  groupDisplayType={'custom'}
                  getDataPath={(row) => row.filePath}
                  groupDefaultExpanded={0}
                />
              </div>
            </Grid>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1} placement={'sc'} className="w-full">
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  패키지관리
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  상품별 시뮬레이션
                </Button>
              </Grow>
              <Grow gap={1} placement={'ec'} className="w-full">
                <Button variant={'contained'} color={'primary'} size={'xl'}>
                  저장
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
