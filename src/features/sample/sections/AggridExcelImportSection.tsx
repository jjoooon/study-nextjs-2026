/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useMemo } from 'react';
import log from '@/shared/utils/logger';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grid, Grow } from '@atoms';
import { PageID } from '@features/PageID';
import { createExpiryCellRenderer } from '@grid/CellRenderers';
import { ExcelExportButton } from '@grid/ExcelExportButton';
import { ExcelImportButton } from '@grid/ExcelImportButton';
import { LayoutHead } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';

import '@/shared/lib/agGridPub';

const logger = log.getLogger('AgridExcelImportSample');

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

// 헤더명 커스텀
const HEADER_NAME_MAP: Record<string, string> = {
  field1: '상품코드1',
  field2: '상품명2',
  packageName: '종명',
  field3: '판매건수',
  field4: '판매순위',
  field5: '순위조정',
  field6: '추천제외',
};

// 헤더 width 커스텀
const COLUMN_WIDTH_MAP: Record<string, number> = {
  field1: 100,
  field2: 400,
  packageName: 200,
};

export default function Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const getExpiryRenderer = createExpiryCellRenderer<DummyData1Type>;
  const gridApiRef = React.useRef<GridApi<DummyData1Type> | null>(null);
  const gridRef = React.useRef<AgGridReact<DummyData1Type>>(null);

  const [rowData, setRowData] = React.useState<DummyData1Type[]>(() => DummyData1.slice(0, 5));

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
        field: 'packageName',
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
            pageName: 'Aggrid Excel Import 샘플',
            pageId: '-',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid grid-rows-[auto_1fr] gap-3 h-full">
            <Grow placement="bwe" className="w-full" variant={'box-round'}>
              <Grow></Grow>
            </Grow>
            <Gcol>
              <Grow className="w-full" placement="ec">
                <ExcelImportButton<DummyData1Type>
                  excelColName={[
                    'id',
                    'packageName',
                    'field1',
                    'field2',
                    'field7',
                    'field3',
                    'field4',
                    'field5',
                    'field6',
                  ]}
                  start={[1, 1]}
                  onSuccess={(importedRows) => {
                    logger.debug('임포트 완료', importedRows);
                    setRowData(importedRows);
                  }}
                />
                {/*
                  화면과 다른 데이터로 export하고 싶을 때:
                  - 행 개수만 줄이기: exportParams.shouldRowBeSkipped로 특정 행 제외
                  - 화면보다 많거나 완전히 다른 데이터: export 직전 api.setGridOption('rowData', 커스텀데이터) →
                    exportDataAsExcel() → 원래 데이터로 복원
                  - 셀 내용만 다르게: processCellCallback에서 params.value 대신 원하는 값 return
                  - 그리드 데이터와 무관한 시트(표지 등): 필터로 행을 0개로 만든 뒤 api.getSheetDataForExcel({ prependContent, processHeaderCallback: () => '' })로
                    커스텀 시트를 만들고, 필터를 풀어 실제 데이터 시트를 추가로 뽑아 api.exportMultipleSheetsAsExcel({ data: [...] })로 합치기
                */}
                <ExcelExportButton<DummyData1Type>
                  gridRef={gridRef}
                  fileName={'hello.xlsx'}
                  exportParams={{
                    // 엑셀에 노출할 필드명 커스텀
                    // columnKeys: ['field1'],
                    // 헤더명 커스텀
                    processHeaderCallback: (params) =>
                      HEADER_NAME_MAP[params.column.getColId()] ??
                      params.api.getDisplayNameForColumn(params.column, null),
                    // 컬럼 width
                    columnWidth: (params) => {
                      const colId = params.column?.getColId() ?? '';
                      return COLUMN_WIDTH_MAP[colId] ?? 100; // 매핑에 없으면 기본값
                    },
                    // 상단에 오늘 날짜 한 줄 추가 (그리드 컬럼 수만큼 병합 + 가운데 정렬)
                    prependContent: [
                      {
                        cells: [
                          {
                            data: {
                              value: new Date().toLocaleDateString('ko-KR'),
                              type: 'String',
                            },
                            mergeAcross: columnDefs2.length - 1,
                            styleId: 'text-center',
                          },
                        ],
                      },
                    ],
                  }}
                />
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
                  excelStyles={[
                    {
                      id: 'text-right',
                      alignment: {
                        horizontal: 'Right',
                      },
                    },
                    {
                      id: 'text-center',
                      alignment: {
                        horizontal: 'Center',
                      },
                    },
                  ]}
                />
              </div>
            </Gcol>
          </Grid>
        }
      />
    </>
  );
}
