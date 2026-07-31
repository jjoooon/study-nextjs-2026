/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useMemo } from 'react';
import { AgGridEmptyComponent, numberValueFormatter, useDynamicColumnWidths, createTooltipValueGetter } from '@aggrid';
import { Grow, Grid, Gcol } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormTable, FormRow, FormCell } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { createExpiryCellRenderer } from '@grid/CellRenderers';
import { SearchIcon, ResetIcon, FileExportIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';

import '@/shared/lib/agGridPub';

type DummyData1Type = {
  id: number;
  packageName: string;
  field1: string;
  field2: string;
  field7: string;
  field3: number;
  field4: number;
  field5: number;
  field6: boolean;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    packageName: '간병인 사용',
    field1: 'CLA23114',
    field2:
      '나눔의 행복(상해사망) 나눔의 행복(상해사망) 나눔의 행복(상해사망) 나눔의 행복(상해사망) 나눔의 행복(상해사망) 나눔의 행복(상해사망) 나눔의 행복(상해사망)',
    field7: '종명 종명 종명 종명 종명 종명 종명 종명 종명 종명 종명',
    field3: 50000,
    field4: 1,
    field5: 1,
    field6: false,
  },
  {
    id: 2,
    packageName: '간병인 사용',
    field1: 'CLA23114',
    field2: '나눔의 행복(상해사망)',
    field7: '',
    field3: 100000,
    field4: 2,
    field5: 2,
    field6: true,
  },
  {
    id: 3,
    packageName: '암주요치료(전이암)',
    field1: 'CLA23114',
    field2: '통합암(4대유사암제외) 진단비',
    field7: '',
    field3: 50000,
    field4: 3,
    field5: 3,
    field6: false,
  },
  {
    id: 4,
    packageName: '암주요치료(전이암)',
    field1: 'CLA23114',
    field2: '나눔의 행복(상해사망)',
    field7: '',
    field3: 50000,
    field4: 4,
    field5: 3,
    field6: false,
  },
  {
    id: 5,
    packageName: '암주요치료(전이암)',
    field1: 'CLA23114',
    field2: '나눔의 행복(상해사망)',
    field7: '',
    field3: 50000,
    field4: 4,
    field5: 1,
    field6: true,
  },
  {
    id: 6,
    packageName: '암주요치료',
    field1: 'CLA23114',
    field2: '나눔의 행복(상해사망)',
    field7: '',
    field3: 50000,
    field4: 6,
    field5: 1,
    field6: false,
  },
  ...Array.from({ length: 19 }, (_, i) => ({
    id: 7 + i,
    packageName: '종합치료',
    field1: 'CLA23114',
    field2: `치료담보 ${7 + i}`,
    field7: '',
    field3: 50000,
    field4: 7 + i,
    field5: 1,
    field6: false,
  })),
];

export default function Ltpa670Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const getExpiryRenderer = createExpiryCellRenderer<DummyData1Type>;
  const gridApiRef = React.useRef<GridApi<DummyData1Type> | null>(null);
  const gridRef = React.useRef<AgGridReact<DummyData1Type>>(null);

  const [rowData, setRowData] = React.useState<DummyData1Type[]>(() => DummyData1.slice(0, 5));
  const [loadedCount, setLoadedCount] = React.useState(5);
  const [totalCount] = React.useState(DummyData1.length);
  const [isLoading, setIsLoading] = React.useState(false);

  const pageSize = 5;

  const fetchMockData = React.useCallback(async (page: number, limit: number) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const start = (page - 1) * limit;
      const end = start + limit;
      const items = DummyData1.slice(start, end);
      return {
        items,
        totalCount: DummyData1.length,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoadNext = React.useCallback(async () => {
    if (loadedCount >= totalCount || isLoading) return;

    const nextPage = Math.ceil(loadedCount / pageSize) + 1;
    const res = await fetchMockData(nextPage, pageSize);

    setRowData((prev) => [...prev, ...res.items]);
    setLoadedCount((prev) => prev + res.items.length);
  }, [loadedCount, totalCount, pageSize, fetchMockData, isLoading]);

  const handleLoadAll = React.useCallback(async () => {
    if (loadedCount >= totalCount || isLoading) return;

    const res = await fetchMockData(1, totalCount);
    setRowData(res.items);
    setLoadedCount(res.items.length);
  }, [loadedCount, totalCount, fetchMockData, isLoading]);

  const handleLoadReset = React.useCallback(() => {
    setRowData((prev) => prev.slice(0, pageSize));
    setLoadedCount(pageSize);
  }, [pageSize]);
  // 2026-06-01 minWidth, flex 수정, valueParser, valueFormatter 추가
  const columnDefs2: ColDef<DummyData1Type>[] = useMemo(
    () => [
      {
        headerName: '상품코드',
        field: 'field1',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-center',
        autoHeight: true,
        cellRenderer: (params: ICellRendererParams<DummyData1Type>) =>
          params.data?.field1 ? (
            <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
              {params.value}
            </Button>
          ) : (
            params.value
          ),
      },
      {
        headerName: '상품명',
        field: 'field2',
        flex: 6,
        minWidth: attributeColumnWidth(300),
        tooltipValueGetter: createTooltipValueGetter<DummyData1Type>({ field: 'field2' }),
      },
      {
        headerName: '종명',
        field: 'field7',
        cellClass: 'text-center',
        flex: 2,
        minWidth: attributeColumnWidth(200),
        tooltipValueGetter: createTooltipValueGetter<DummyData1Type>({ field: 'field7' }),
      },
      {
        headerName: '판매건수',
        field: 'field3',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter<DummyData1Type>,
      },
      {
        headerName: '판매순위',
        field: 'field4',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
      {
        headerName: '순위조정',
        field: 'field5',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'px-[0.2rem]! editable-cell',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        cellRenderer: getExpiryRenderer('center'),
        valueParser: (params) => Number(params.newValue), // 저장 시 숫자로
        valueFormatter: (params) => String(params.value ?? ''), // 표시 시 문자열로
      },
      {
        headerName: '추천제외',
        field: 'field6',
        width: attributeColumnWidth(70),
        editable: true,
        cellDataType: 'boolean',
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
      },
    ],
    [attributeColumnWidth, getExpiryRenderer]
  );

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '상품별추천속성관리',
            pageId: 'LTPA670',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid grid-rows-[auto_1fr] gap-3 h-full">
            <Grow placement="bwe" className="w-full" variant={'box-round'}>
              <FormTable variant={'none'} cols={['w-1', 'w-[20rem]', 'w-1', 'w-auto']}>
                <FormRow>
                  <FormCell title={'담보'} tdClassName="grid-cols-[auto_1fr_auto]" colSpan={3}>
                    <Input width={80} value={'CLA23114'} />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input
                      aria-label=""
                      width={430}
                      value={'한화시그니처여성건강보험/(1종) 납입면제 강화형 기본형'}
                      readOnly
                    />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'조회기간'}>
                    <DatePickerInput mode="range" onChange={() => {}} value="" />
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
            <Gcol>
              <Grow className="w-full" placement="ec">
                <Button color="success" variant="outlined">
                  엑셀내보내기
                  <FileExportIcon />
                </Button>
              </Grow>
              <div className="ag-theme-alpine">
                {/* 2026-06-04 suppressClickEdit 삭제 */}
                <AgGridReact<DummyData1Type>
                  ref={gridRef}
                  onGridReady={(event) => {
                    gridApiRef.current = event.api;
                  }}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowId={(params) => String(params.data.id)}
                  columnDefs={columnDefs2}
                  rowData={rowData}
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
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                  tooltipHideDelay={3000}
                />
              </div>
              <TableMore
                gridRef={gridRef}
                isAll={true}
                loadedCount={loadedCount}
                totalCount={totalCount}
                pageSize={pageSize}
                onLoadAll={handleLoadAll}
                onLoadNext={handleLoadNext}
                onLoadReset={handleLoadReset}
                isReset={true}
              />
            </Gcol>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
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
