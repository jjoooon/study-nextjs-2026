/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, useDynamicColumnWidths, createTreeNameCellRenderer } from '@aggrid';
import { Grow, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormTable, FormRow, FormCell } from '@common/FormTable';
import { PageID } from '@features/PageID';
import { SearchIcon, ResetIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
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
  packageName: string;
  field1: string;
  field2: string;
  field3: string;
  filePath: string[];
};
const DummyData2: DummyData2Type[] = [
  {
    id: 1,
    packageName: '간병인 사용',
    field1: 'CLA23114',
    field2: '나눔의 행복(상해사망)',
    field3: '',
    filePath: ['1'],
  },
  {
    id: 2,
    packageName: '간병인 사용',
    field1: 'CLA23114',
    field2: '나눔의 행복(상해사망)',
    field3: '',
    filePath: ['2'],
  },
  {
    id: 3,
    packageName: '암주요치료(전이암)',
    field1: 'CLA23114',
    field2: '통합암(4대유사암제외) 진단비',
    field3: '세트담보',
    filePath: ['3'],
  },
  {
    id: 4,
    packageName: '암주요치료(전이암)',
    field1: '',
    field2: '나눔의 행복(상해사망)',
    field3: '',
    filePath: ['3', '3-1'],
  },
  {
    id: 5,
    packageName: '암주요치료(전이암)',
    field1: '',
    field2: '나눔의 행복(상해사망)',
    field3: '',
    filePath: ['3', '3-2'],
  },
  {
    id: 6,
    packageName: '암주요치료',
    field1: 'CLA23114',
    field2: '나눔의 행복(상해사망)',
    field3: '',
    filePath: ['4'],
  },
];

const treeNameCellRenderer = createTreeNameCellRenderer<DummyData2Type>();

export default function Ltpa650Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 담보분류 -------------
  // 2026-06-04 flex, minWidth 수정
  const columnDefs1: (ColDef<DummyData1Type> | ColGroupDef<DummyData1Type>)[] = useMemo(
    () => [
      {
        headerName: '패키지명',
        field: 'field1',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        autoHeight: true,
        spanRows: true,
      },
      {
        headerName: '세부',
        field: 'field2',
        flex: 3.5,
        minWidth: attributeColumnWidth(300),
        autoHeight: true,
      },
    ],
    [attributeColumnWidth]
  );

  // 담보관리 -------------
  const gridApiRef = React.useRef<GridApi<DummyData2Type> | null>(null);

  // 2026-06-01 width, flex 수정
  const columnDefs2: ColDef<DummyData2Type>[] = useMemo(
    () => [
      {
        headerName: '패키지명',
        field: 'packageName',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        autoHeight: true,
        spanRows: true,
      },
      {
        headerName: '담보코드',
        field: 'field1',
        cellClass: 'text-center',
        flex: 1,
        minWidth: attributeColumnWidth(90),
        autoHeight: true,
        spanRows: true,
      },
      {
        headerName: '담보명',
        field: 'field2',
        flex: 5,
        minWidth: attributeColumnWidth(200),
        cellClass: (params) =>
          params.data && params.data.filePath.length === 1
            ? ''
            : 'before:content-["-"] before:inline-block before:mr-1',
        // editable: (params) => Boolean(params.data && params.data.filePath.length === 1),
      },
      {
        headerName: '구분',
        field: 'field3',
        cellClass: 'text-center',
        flex: 1,
        minWidth: attributeColumnWidth(90),
        cellRenderer: treeNameCellRenderer,
        cellRendererParams: {
          className: 'block w-full text-center',
          buttonClassName: 'justify-center text-center',
        },
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '상품보장패키지관리',
            pageId: 'LTPA650',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid grid-rows-[auto_1fr] gap-3 h-full">
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable variant={'head'}>
                <FormRow>
                  <FormCell title={'상품'} tdClassName="grid-cols-[auto_1fr_auto]">
                    <Input width={120} value={'LA202852001'} />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input
                      aria-label=""
                      width={450}
                      value={'한화시그니처여성건강보험/(1종) 납입면제 강화형 기본형'}
                      readOnly
                    />
                  </FormCell>
                  <FormCell title={'기준일자'}>
                    <DatePickerInput mode="single" onChange={() => {}} value="" />
                  </FormCell>
                </FormRow>
              </FormTable>

              <Grow>
                <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                  조회
                </Button>
                <Button
                  color={'gray'}
                  only={'icon'}
                  size={'lg'}
                  variant={'outlined'}
                  onClick={() => {}}
                  aria-label="새로고침"
                >
                  <ResetIcon />
                </Button>
              </Grow>
            </Grow>
            <Grid className="grid-cols-[1fr_1fr] h-full w-full" gap={3}>
              {/* 패키지 관리 */}
              <div className="ag-theme-alpine radio-selection">
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

              {/* 담보관리 */}
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
                  treeData={true}
                  groupDisplayType={'custom'}
                  getDataPath={(row) => row.filePath}
                  groupDefaultExpanded={0}
                />
              </div>
            </Grid>
          </Grid>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
