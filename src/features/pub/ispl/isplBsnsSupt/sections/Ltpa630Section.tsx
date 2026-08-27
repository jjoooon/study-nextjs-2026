/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useMemo } from 'react';
import {
  AgGridEmptyComponent,
  getNextNumericRowId,
  useDynamicColumnWidths,
  createAddRowHandler,
  createTooltipValueGetter,
} from '@aggrid';
import { Grow, Grid, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { FormTable, FormRow, FormCell } from '@common/FormTable';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { ZoomInIcon, ResetIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';

import '@/shared/lib/agGridPub';

type DummyData1Type = {
  id: number;
  field1: string;
  field2: string;
  field3: string[]; //전속,GA,TM
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    field1: '간병',
    field2: '간병인사용',
    field3: ['전속', 'GA', 'TM'],
  },
  {
    id: 2,
    field1: '암주요',
    field2: '암주요치료(상급종합)',
    field3: ['전속'],
  },
  {
    id: 3,
    field1: '암주요',
    field2: '암주요치료(종합병원)',
    field3: ['GA', 'TM'],
  },
  {
    id: 4,
    field1: '암주요',
    field2: '암주요치료(비급여)',
    field3: ['TM'],
  },
  {
    id: 5,
    field1: '암주요',
    field3: ['전속', 'TM'],
    field2: '암주요치료(전이암)',
  },
  {
    id: 6,
    field1: '암주요',
    field3: ['전속'],
    field2: '표적항암',
  },
  {
    id: 7,
    field1: '순환계치료비',
    field3: ['전속', 'GA', 'TM'],
    field2: '요양병원제외',
  },
  {
    id: 8,
    field1: '순환계치료비',
    field3: ['GA', 'TM'],
    field2: '상급종합병원',
  },
  {
    id: 9,
    field1: '순환계치료비',
    field3: ['GA'],
    field2: '주요순환계',
  },
  {
    id: 10,
    field1: '입원',
    field3: ['GA', 'TM'],
    field2: '1인실',
  },
  {
    id: 11,
    field1: '입원',
    field3: ['전속', 'GA', 'TM'],
    field2: '2~3인실',
  },
  {
    id: 12,
    field1: '운전자',
    field3: ['TM'],
    field2: '운전자비용',
  },
  {
    id: 13,
    field1: '여성',
    field3: ['전속', 'GA', 'TM'],
    field2: '유/갑/생',
  },
  {
    id: 14,
    field1: '출산/난임',
    field3: ['전속'],
    field2: '미혼자용',
  },
  {
    id: 15,
    field1: '출산/난임',
    field3: ['전속', 'GA', 'TM'],
    field2: '기혼자용',
  },
];

type DummyData2Type = {
  id: number;
  field1: string;
  field2: string;
  field3: boolean;
};

const DummyData2: DummyData2Type[] = [
  {
    id: 1,
    field1:
      '나눔의 행복(상해사망) 나눔의 행복(상해사망) 나눔의 행복(상해사망) 나눔의 행복(상해사망) 나눔의 행복(상해사망)',
    field2: '갱신형',
    field3: true,
  },
  {
    id: 2,
    field1: '나눔의 행복(상해사망)',
    field2: '갱신형',
    field3: false,
  },
];

const ALL_CHANNELS = ['전속', 'GA', 'TM']; // 또는 ['1', '2', '3']

export default function Ltpa630Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 2026-06-04 flex, minWidth 수정
  // 담보분류 -------------
  const columnDefs1: (ColDef<DummyData1Type> | ColGroupDef<DummyData1Type>)[] = useMemo(
    () => [
      {
        headerName: '패키지명',
        field: 'field1',
        cellClass: 'text-center',
        flex: 1,
        minWidth: attributeColumnWidth(140),
        autoHeight: true,
        spanRows: true,
      },
      {
        headerName: '세부',
        field: 'field2',
        flex: 6,
        minWidth: attributeColumnWidth(150),
        autoHeight: true,
      },
      {
        headerName: '적용대상',
        field: 'field3',
        flex: 6,
        minWidth: attributeColumnWidth(150),
        autoHeight: true,
        cellClass: 'text-center',
        valueFormatter: (params) => (Array.isArray(params.value) ? params.value.join(' / ') : (params.value ?? '')),
      },
    ],
    [attributeColumnWidth]
  );

  // 담보관리 -------------
  const [rowData2, setRowData2] = React.useState<DummyData2Type[]>(DummyData2);
  const gridApiRef = React.useRef<GridApi<DummyData2Type> | null>(null);

  const handleAddRow = createAddRowHandler<DummyData2Type, number>(setRowData2, {
    idKey: 'id',
    getNextId: getNextNumericRowId,
    createRow: (nextId) => ({
      id: nextId,
      field1: '',
      field2: '',
      field3: false,
    }),
    insertAt: 'end',
    gridApiRef,
  });

  // 2026-06-01 width, flex 수정
  const columnDefs2: ColDef<DummyData2Type>[] = useMemo(
    () => [
      {
        headerName: '담보명 (포함)',
        field: 'field1',
        flex: 6,
        minWidth: attributeColumnWidth(300),
        cellClass: 'editable-cell',
        editable: true,
        tooltipValueGetter: createTooltipValueGetter<DummyData2Type>({ field: 'field1' }),
      },
      {
        headerName: '담보명 (미포함)',
        field: 'field2',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        cellClass: 'text-center editable-cell',
        editable: true,
        tooltipValueGetter: createTooltipValueGetter<DummyData2Type>({ field: 'field1' }),
      },
      {
        headerName: '상태',
        field: 'field3',
        cellClass: 'text-center',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        cellRenderer: (params: ICellRendererParams<DummyData2Type>) => {
          return params.value === true ? '임시저장' : '';
        },
      },
      {
        headerName: '삭제',
        field: 'id',
        cellClass: 'text-center justify-center',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellRenderer: (params: ICellRendererParams<DummyData2Type>) => {
          return (
            <Button
              variant="outlined"
              color="gray-light"
              size="sm"
              onClick={() => {
                const targetId = params.data?.id;
                if (targetId !== undefined) {
                  setRowData2((prev) => prev.filter((row) => row.id !== targetId));
                }
              }}
            >
              삭제
            </Button>
          );
        },
      },
    ],
    [attributeColumnWidth, setRowData2]
  );

  const [values, setValues] = React.useState<string[]>(ALL_CHANNELS);

  const handleGroupChange = (nextValues: string[]) => {
    setValues(nextValues);
  };

  // 선택된 체크박스값(values)에 해당되는 항목만 필터링
  const filteredData1 = React.useMemo(() => {
    if (!values || values.length === 0) return [];
    const activeChannels = values.filter((v) => v !== 'all');
    if (activeChannels.length === 0) return [];

    return DummyData1.filter((row) => {
      if (!row.field3 || row.field3.length === 0) return false;
      return row.field3.some((channel) => activeChannels.includes(channel));
    });
  }, [values]);

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
          <Grid className="w-full grid-rows-[auto_minmax(0,1fr)] gap-3 h-full">
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable variant={'head'}>
                <FormRow>
                  <FormCell title={'적용대상검색'} tdClassName="grid-cols-[auto_1fr_auto]">
                    <CheckboxGroup value={values} onValueChange={handleGroupChange} className="gap-3">
                      <CheckboxGroupItem value="all" selectAll>
                        전체
                      </CheckboxGroupItem>
                      <CheckboxGroupItem value="전속">전속</CheckboxGroupItem>
                      <CheckboxGroupItem value="GA">GA</CheckboxGroupItem>
                      <CheckboxGroupItem value="TM">TM</CheckboxGroupItem>
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
            <Grid className="grid-cols-[2fr_3fr] h-full w-full" gap={3}>
              {/* 패키지 관리 */}
              <Grid className="grid-rows-[auto_minmax(0,1fr)] h-full w-full overflow-y-hidden">
                <Grow className="w-full h-[2.5rem]" placement="sc">
                  <Typo variant={'heading-md'} tag="h2">
                    패키지 관리
                  </Typo>
                </Grow>
                <div className="ag-theme-alpine radio-selection">
                  <AgGridReact<DummyData1Type>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    rowData={filteredData1}
                    columnDefs={columnDefs1}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                      cellStyle: { cursor: 'pointer' },
                    }}
                    singleClickEdit={true}
                    domLayout="normal"
                    animateRows={false}
                    enableCellSpan={true}
                  />
                </div>
              </Grid>

              {/* 담보관리 */}
              <Grid className="grid-rows-[auto_minmax(0,1fr)] h-full w-full overflow-y-hidden" gap={1}>
                <Grow className="w-full" placement="bwc">
                  <Typo variant={'heading-md'} tag="h2">
                    담보관리
                  </Typo>
                  <Grow placement="ec">
                    <Button variant={'outlined'} color={'gray'} onClick={handleAddRow}>
                      행추가
                      <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
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
                      // cellStyle: { cursor: 'pointer' },
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
            </Grid>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1} placement={'sc'}>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  패키지관리
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  상품별 시뮬레이션
                </Button>
              </Grow>
              <Grow gap={1} placement={'ec'}>
                <Button variant={'contained'} color={'primary'} size={'xl'}>
                  임시저장
                </Button>
                <Button variant={'contained'} color={'primary'} size={'xl'} disabled>
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
