/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useMemo } from 'react';
import { AgGridEmptyComponent, numberValueFormatter, useAgGridInfiniteAppend, useDynamicColumnWidths } from '@aggrid';
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
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect } from '@uiux/NativeSelect';

import '@/shared/lib/agGridPub';

type DummyData1Type = {
  id: number;
  packageName: string;
  field1: string;
  field2: string;
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
    field2: '나눔의 행복(상해사망)',
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
    field3: 50000,
    field4: 2,
    field5: 2,
    field6: true,
  },
  {
    id: 3,
    packageName: '암주요치료(전이암)',
    field1: 'CLA23114',
    field2: '통합암(4대유사암제외) 진단비',
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
    field3: 50000,
    field4: 7 + i,
    field5: 1,
    field6: false,
  })),
];

export default function Ltpa660Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const getExpiryRenderer = createExpiryCellRenderer<DummyData1Type>;
  const gridApiRef = React.useRef<GridApi<DummyData1Type> | null>(null);
  const gridRef = React.useRef<AgGridReact<DummyData1Type>>(null);

  const pageSize = 3;
  const {
    loadedCount,
    totalCount,
    dataSource,
    handleLoadAll: handleLoadAllDefault,
    handleLoadNext: handleLoadNextDefault,
    handleLoadReset: handleLoadResetDefault,
    handleSortChanged,
  } = useAgGridInfiniteAppend({
    allRows: DummyData1,
    pageSize,
  });

  const handleLoadNext = React.useCallback(() => {
    handleLoadNextDefault();
  }, [handleLoadNextDefault]);

  const handleLoadAll = React.useCallback(() => {
    handleLoadAllDefault();
  }, [handleLoadAllDefault]);

  const handleLoadReset = React.useCallback(() => {
    handleLoadResetDefault();
  }, [handleLoadResetDefault]);
  // 2026-06-01 minWidth, flex 수정, valueParser, valueFormatter 추가
  const columnDefs2: ColDef<DummyData1Type>[] = useMemo(
    () => [
      {
        headerName: '담보코드',
        field: 'field1',
        cellClass: 'text-center',
        flex: 1,
        minWidth: attributeColumnWidth(80),
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
        headerName: '담보명',
        field: 'field2',
        flex: 10,
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
        cellClass: 'text-center editable-cell',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        valueParser: (params) => Number(params.newValue), // 저장 시 숫자로
        valueFormatter: (params) => String(params.value ?? ''), // 표시 시 문자열로
        cellRenderer: getExpiryRenderer('center'),
      },
      {
        headerName: '추천제외',
        field: 'field6',
        width: attributeColumnWidth(70),
        editable: true,
        cellDataType: 'boolean',
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        cellClass: 'editable-cell',
      },
    ],
    [attributeColumnWidth, getExpiryRenderer]
  );

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '담보별추천속성관리',
            pageId: 'LTPA660',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid grid-rows-[auto_minmax(0,1fr)] gap-3 h-full">
            <Grow placement="bwe" className="w-full" variant={'box-round'}>
              <FormTable variant={'none'} cols={['w-1', 'w-[20rem]', 'w-1', 'w-auto']}>
                <FormRow>
                  <FormCell title={'담보'} tdClassName="grid-cols-[auto_auto_1fr_auto]" colSpan={3}>
                    <NativeSelect width={96}>
                      <option value="">담보그룹</option>
                    </NativeSelect>
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
                  <FormCell title={'구분'}>
                    <CheckboxGroup className="gap-3">
                      {[
                        { label: '현재판매담보', value: '현재판매담보' },
                        { label: '보통약관제외', value: '보통약관제외' },
                        { label: '동시가입담보 묶어서 보기', value: 'simpleExclude' },
                      ].map((option) => (
                        <CheckboxGroupItem key={option.value} value={option.value}>
                          {option.label}
                        </CheckboxGroupItem>
                      ))}
                    </CheckboxGroup>
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
                {/* 2026-06-04 suppressClickEdit={true} 삭제 */}
                <AgGridReact<DummyData1Type>
                  ref={gridRef}
                  onGridReady={(event) => {
                    gridApiRef.current = event.api;
                  }}
                  onSortChanged={(event) => {
                    handleSortChanged(
                      event.api
                        .getColumnState()
                        .filter((col) => col.sort)
                        .map((col) => ({
                          colId: col.colId || '',
                          sort: (col.sort || 'asc') as 'asc' | 'desc',
                        }))
                    );
                  }}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowId={(params) => String(params.data.id)}
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
                  rowModelType="infinite"
                  cacheBlockSize={pageSize}
                  maxBlocksInCache={2}
                  datasource={dataSource}
                />
              </div>
              <TableMore
                gridRef={gridRef}
                isAll={false}
                loadedCount={loadedCount}
                totalCount={totalCount}
                pageSize={pageSize}
                onLoadAll={handleLoadAll}
                onLoadNext={handleLoadNext}
                onLoadReset={handleLoadReset}
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
