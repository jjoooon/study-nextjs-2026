/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import '@/shared/lib/agGridPub';
import { Grid, Grow, Gcol, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { TableMore } from '@common/TablePagination';

import { ResetIcon } from '@icons';
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
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import '@/shared/lib/agGridPub';

type DummyDataType2 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
};
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '승인',
  },
  {
    id: 2,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병간편심사가이드 인수완화 두통질병간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '승인',
  },
  {
    id: 3,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '승인',
  },
  {
    id: 4,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '승인',
  },
  {
    id: 5,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '승인',
  },
  {
    id: 6,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '승인',
  },
  {
    id: 7,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '승인',
  },
  {
    id: 8,
    field01: '2006년 5월 심사가이드라인',
    field02: '2006년 5월 심사가이드라인',
    field03: '간편심사가이드 인수완화 두통질병',
    field04: '김한화',
    field05: '2006-05-01 10:00:00',
    field06: '2006-05-01 10:00:00',
    field07: 'xxxxxxxxxx',
    field08: '승인',
  },
];

export const Ltpz119 = () => {
  const pageSize = 4;
  const [rowData2, setRowData2] = React.useState<DummyDataType2[]>(() => DummyData2.slice(0, pageSize));
  const [loadedCount, setLoadedCount] = React.useState(pageSize);
  const [totalCount, setTotalCount] = React.useState(DummyData2.length);
  const [isLoading, setIsLoading] = React.useState(false);

  const gridRef = React.useRef<AgGridReact<DummyDataType2>>(null);

  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 데이터 호출 모사 (API 호출)
  const fetchMockData = React.useCallback(async (page: number, limit: number) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const start = (page - 1) * limit;
      const end = start + limit;
      const items = DummyData2.slice(start, end);
      return {
        items,
        totalCount: DummyData2.length,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 다음 데이터 로드 (onLoadNext 콜백)
  const handleLoadNext = React.useCallback(async () => {
    if (loadedCount >= totalCount || isLoading) return;
    const nextPage = Math.ceil(loadedCount / pageSize) + 1;
    const res = await fetchMockData(nextPage, pageSize);
    setRowData2((prev) => [...prev, ...res.items]);
    setLoadedCount((prev) => prev + res.items.length);
  }, [loadedCount, totalCount, pageSize, fetchMockData, isLoading]);

  // 전체 데이터 로드 (onLoadAll 콜백)
  const handleLoadAll = React.useCallback(async () => {
    if (loadedCount >= totalCount || isLoading) return;
    const res = await fetchMockData(1, totalCount);
    setRowData2(res.items);
    setLoadedCount(res.items.length);
  }, [loadedCount, totalCount, fetchMockData, isLoading]);

  // 목록 접기 (onLoadReset 콜백)
  const handleLoadReset = React.useCallback(() => {
    setRowData2((prev) => prev.slice(0, pageSize));
    setLoadedCount(pageSize);
  }, [pageSize]);

  // 오늘 날짜 기준 1주일 전 ~ 오늘 계산
  const getInitialDateRange = () => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    const formatDate = (d: Date) => {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

    return {
      from: formatDate(oneWeekAgo),
      to: formatDate(today),
    };
  };

  const [dateRange, setDateRange] = React.useState(getInitialDateRange);

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '문서명',
      field: 'field01',
      flex: 1,
      cellClass: 'text-center',
      minWidth: attributeColumnWidth(150),
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field01' }),
    },
    {
      headerName: '제목',
      field: 'field02',
      flex: 1,
      cellClass: 'text-center',
      minWidth: attributeColumnWidth(150),
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field02' }),
    },
    {
      headerName: '주요내용',
      field: 'field03',
      flex: 10,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field03' }),
    },
    {
      headerName: '등록자',
      field: 'field04',
      flex: 1,
      cellClass: 'text-center',
      minWidth: attributeColumnWidth(90),
    },
    {
      headerName: '등록일시',
      field: 'field05',
      flex: 1,
      cellClass: 'text-center',
      minWidth: attributeColumnWidth(120),
    },
    {
      headerName: '수정일시',
      field: 'field06',
      flex: 1,
      cellClass: 'text-center',
      minWidth: attributeColumnWidth(120),
    },
    {
      headerName: '문서번호',
      field: 'field07',
      flex: 1,
      cellClass: 'text-center',
      minWidth: attributeColumnWidth(90),
    },
    {
      headerName: '결재상태',
      field: 'field08',
      flex: 1,
      cellClass: 'text-center',
      minWidth: attributeColumnWidth(60),
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              다운로드 파일등록
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ119)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <Grid className="w-full grid-rows-[1fr] h-full" gap={3}>
            <TableFold variant="default">
              <TableFoldHead title="첨부문서 결재 관리" />
              <TableFoldBody className="grid-rows-[auto_1fr]">
                <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
                  <FormTable variant="head">
                    <FormRow className="w-full">
                      <FormCell title={'결재상태'} className="shrink-0" tdClassName="flex-1">
                        <NativeSelect readOnly={true}>
                          <NativeSelectOption value="">승인</NativeSelectOption>
                        </NativeSelect>
                      </FormCell>
                      <FormCell title={'문서번호'} className="shrink-0" tdClassName="flex-1">
                        <Input width={120} aria-label="" value={'xxxxxxxxxx'} />
                      </FormCell>
                      <FormCell title={'조회기간'}>
                        <DatePickerInput
                          mode="range"
                          rangeValue={dateRange}
                          onChange={(val) => {
                            if (val && typeof val === 'object' && 'from' in val && 'to' in val) {
                              setDateRange(val as { from: string; to: string });
                            }
                          }}
                        />
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

                <Gcol gap={1}>
                  <div className="ag-theme-alpine inner-scroll" data-page={pageSize}>
                    <AgGridReact<DummyDataType2>
                      ref={gridRef}
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData2}
                      columnDefs={columnDefs2}
                      defaultColDef={{ sortable: true, resizable: true }}
                      singleClickEdit={true}
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: true,
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        width: 30,
                        cellClass: 'text-center editable-cell',
                      }}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      domLayout="normal"
                    />
                  </div>
                  <TableMore
                    gridRef={gridRef}
                    loadedCount={loadedCount}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onLoadAll={handleLoadAll}
                    onLoadNext={handleLoadNext}
                    onLoadReset={handleLoadReset}
                    isReset={true}
                  />
                </Gcol>
              </TableFoldBody>
            </TableFold>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                첨부
              </Button>
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

export default Ltpz119;
