/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridEmptyComponent, DatePickerCellEditor, useDynamicColumnWidths } from '@aggrid';
import { Grow, Grid, Gcol } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { createExpiryCellRenderer } from '@grid/CellRenderers';
import { ZoomInIcon, ZoomOutIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

import '@/shared/lib/agGridPub';

type DummyData1Type = {
  id: number;
  code: string;
  productName: string;
  recommendStatus: '추천' | '제외' | '';
  startDate: string;
  endDate: string;
  channel: 'GA' | '전속' | 'TM' | '';
  priority: number;
};

const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    code: 'LA028227001',
    productName: '나눔의행복(상해사망)',
    recommendStatus: '추천',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: 'GA',
    priority: 1,
  },
  {
    id: 2,
    code: 'LA028227002',
    productName: '나눔의행복(상해사망)(간편)',
    recommendStatus: '제외',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: '전속',
    priority: 2,
  },
  {
    id: 3,
    code: 'LA028227003',
    productName: '보통약관(상해사망(간편))',
    recommendStatus: '추천',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: 'TM',
    priority: 3,
  },
  {
    id: 4,
    code: 'LA028227004',
    productName: '보통약관(상해사망(갱신형))',
    recommendStatus: '추천',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: 'GA',
    priority: 4,
  },
  {
    id: 5,
    code: 'LA028227005',
    productName: '보통약관(상해사망)',
    recommendStatus: '제외',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: '전속',
    priority: 5,
  },
  {
    id: 6,
    code: 'LA028227006',
    productName: '보통약관(부양자상해사망)',
    recommendStatus: '제외',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: 'TM',
    priority: 6,
  },
  {
    id: 7,
    code: 'LA028227007',
    productName: '상해사망',
    recommendStatus: '추천',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: 'GA',
    priority: 7,
  },
  {
    id: 8,
    code: 'LA028227008',
    productName: '상해사망',
    recommendStatus: '제외',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: '전속',
    priority: 8,
  },
  {
    id: 9,
    code: 'LA028227009',
    productName: '상해사망',
    recommendStatus: '추천',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: 'TM',
    priority: 9,
  },
  {
    id: 10,
    code: 'LA028227010',
    productName: '상해사망(간편)',
    recommendStatus: '추천',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: 'GA',
    priority: 10,
  },
  {
    id: 11,
    code: 'LA028227011',
    productName: '상해사망(간편)',
    recommendStatus: '제외',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: '전속',
    priority: 11,
  },
  {
    id: 12,
    code: 'LA028227012',
    productName: '상해사망(간편)',
    recommendStatus: '제외',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: 'TM',
    priority: 12,
  },
  {
    id: 13,
    code: 'LA028227013',
    productName: '상해사망(간편,갱신형)',
    recommendStatus: '추천',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: '전속',
    priority: 13,
  },
  {
    id: 14,
    code: 'LA028227014',
    productName: '상해사망(간편,연만기)',
    recommendStatus: '제외',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: 'TM',
    priority: 14,
  },
  {
    id: 15,
    code: 'LA028227015',
    productName: '상해사망(간편,연만기)',
    recommendStatus: '추천',
    startDate: '2026-09-09',
    endDate: '2026-09-30',
    channel: 'TM',
    priority: 15,
  },
];

export default function Ltpa670Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const getExpiryRenderer = createExpiryCellRenderer<DummyData1Type>;
  const gridApiRef = useRef<GridApi<DummyData1Type> | null>(null);
  const gridRef = useRef<AgGridReact<DummyData1Type>>(null);

  const [channels, setChannels] = useState<string[]>(['전속', 'GA', 'TM']);
  const [rowData, setRowData] = useState<DummyData1Type[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const totalCount = DummyData1.length;
  const pageSize = 5;

  const fetchMockData = useCallback(async (page: number, limit: number) => {
    return new Promise<DummyData1Type[]>((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        resolve(DummyData1.slice(start, end));
      }, 100);
    });
  }, []);

  const handleSearch = useCallback(async () => {
    const initialData = await fetchMockData(1, pageSize);
    setRowData(initialData);
    setLoadedCount(initialData.length);
  }, [fetchMockData, pageSize]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleLoadNext = useCallback(async () => {
    if (loadedCount >= totalCount) return;
    const nextPage = Math.floor(loadedCount / pageSize) + 1;
    const nextData = await fetchMockData(nextPage, pageSize);
    setRowData((prev) => [...prev, ...nextData]);
    setLoadedCount((prev) => prev + nextData.length);
  }, [fetchMockData, loadedCount, totalCount, pageSize]);

  const handleLoadAll = useCallback(async () => {
    if (loadedCount >= totalCount) return;
    setRowData(DummyData1);
    setLoadedCount(totalCount);
  }, [loadedCount, totalCount]);

  const handleAddRow = useCallback(() => {
    setRowData((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((r) => r.id)) + 1 : 1;
      const newRow: DummyData1Type = {
        id: nextId,
        code: '',
        productName: '',
        recommendStatus: '',
        startDate: '',
        endDate: '',
        channel: '',
        priority: prev.length + 1,
      };
      return [...prev, newRow];
    });
  }, []);

  const handleDeleteRow = useCallback(() => {
    const api = gridApiRef.current;
    if (!api) return;
    const selectedNodes = api.getSelectedNodes();
    const selectedIds = new Set(selectedNodes.map((node) => node.data?.id));
    if (selectedIds.size === 0) return;
    setRowData((prev) => prev.filter((row) => !selectedIds.has(row.id)));
  }, []);

  const columnDefs2: ColDef<DummyData1Type>[] = useMemo(
    () => [
      {
        headerName: '상품코드',
        field: 'code',
        flex: 1,
        editable: true,
        minWidth: attributeColumnWidth(120),
        cellClass: 'editable-cell text-center',
      },
      {
        headerName: '상품명',
        field: 'productName',
        flex: 8,
        minWidth: attributeColumnWidth(240),
      },
      {
        headerName: '추천여부',
        field: 'recommendStatus',
        flex: 2,
        minWidth: attributeColumnWidth(80),
        cellClass: 'editable-cell',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['추천', '제외'],
        },
        cellRenderer: getExpiryRenderer('center'),
      },
      {
        headerName: '적용기간',
        flex: 3,
        minWidth: attributeColumnWidth(260),
        cellClass: 'text-center flex! items-center! editable-cell justify-center!',
        editable: true,
        cellEditor: DatePickerCellEditor,
        cellEditorParams: {
          mode: 'range',
        },
        valueGetter: (params) => {
          if (params.data?.startDate && params.data?.endDate) {
            return `${params.data.startDate} ~ ${params.data.endDate}`;
          }
          return params.data?.startDate || '';
        },
        valueSetter: (params) => {
          if (!params.data) return false;
          const val = String(params.newValue || '').trim();
          if (!val) {
            params.data.startDate = '';
            params.data.endDate = '';
          } else {
            const [from = '', to = ''] = val.split('~').map((s) => s.trim());
            params.data.startDate = from;
            params.data.endDate = to;
          }
          return true;
        },
      },
      {
        headerName: '판매채널',
        field: 'channel',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        cellClass: 'text-center flex! items-center! editable-cell  justify-center!',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['GA', '전속', 'TM'],
        },
        cellRenderer: getExpiryRenderer('center'),
      },
      {
        headerName: '우선순위',
        field: 'priority',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: (params) => {
          const baseClass = 'editable-cell text-center';
          if (params.value == null || !params.api) return baseClass;

          const valStr = String(params.value).trim();
          if (!valStr) return baseClass;

          let count = 0;
          params.api.forEachNode((node) => {
            if (node.data && String(node.data.priority ?? '').trim() === valStr) {
              count++;
            }
          });

          return count > 1 ? `${baseClass} isError` : baseClass;
        },
        editable: true,
      },
    ],
    [attributeColumnWidth, getExpiryRenderer]
  );

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '상품별 추천속성관리',
            pageId: 'LTPA670',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid grid-rows-[auto_minmax(0,1fr)] gap-3 h-full">
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <Grow className="gap-[4rem]">
                <Grow>
                  <RadioGroup className="gap-2" width="full">
                    <RadioGroupItem value={'전체'} color="primary" size="md">
                      전체
                    </RadioGroupItem>
                    <RadioGroupItem value={'추천'} color="primary" size="md">
                      추천
                    </RadioGroupItem>
                    <RadioGroupItem value={'제외'} color="primary" size="md">
                      제외
                    </RadioGroupItem>
                  </RadioGroup>
                </Grow>
                <Grow>
                  <CheckboxGroup value={channels} onValueChange={setChannels} className="gap-3">
                    <CheckboxGroupItem value="전속" size="md">
                      전속
                    </CheckboxGroupItem>
                    <CheckboxGroupItem value="GA" size="md">
                      GA
                    </CheckboxGroupItem>
                    <CheckboxGroupItem value="TM" size="md">
                      TM
                    </CheckboxGroupItem>
                  </CheckboxGroup>
                </Grow>
              </Grow>

              <Grow>
                <Button color="coolgray" onClick={handleSearch} only="default" size="lg" variant="contained">
                  조회
                </Button>
                {/* <Button
                  color={'gray'}
                  only={'icon'}
                  size={'lg'}
                  variant={'outlined'}
                  onClick={handleSearch}
                  aria-label="새로고침"
                >
                  <ResetIcon />
                </Button> */}
              </Grow>
            </Grow>
            <Gcol className="w-full overflow-hidden">
              <Grow placement="ec" className="w-full">
                <Button variant={'outlined'} color={'gray'} onClick={handleAddRow}>
                  행추가
                  <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
                </Button>
                <Button variant={'outlined'} color={'gray'} onClick={handleDeleteRow}>
                  행삭제
                  <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                </Button>
              </Grow>
              <div className="ag-theme-alpine">
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
                  onCellValueChanged={(event) => {
                    if (event.colDef.field === 'priority') {
                      event.api.refreshCells({ force: true });
                    }
                  }}
                  singleClickEdit={true}
                  stopEditingWhenCellsLoseFocus={true}
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
              />
            </Gcol>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={2} placement={'ec'} className="w-full">
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
