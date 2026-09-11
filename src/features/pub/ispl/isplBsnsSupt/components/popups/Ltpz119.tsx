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
const DummyData2: DummyDataType2[] = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  field01: '2006년 5월 심사가이드라인',
  field02: '2006년 5월 심사가이드라인',
  field03:
    index % 2 === 0 ? '간편심사가이드 인수완화 두통질병' : '간편심사가이드 인수완화 두통질병간편심사가이드 인수완화',
  field04: '김한화',
  field05: '2006-05-01 10:00:00',
  field06: '2006-05-01 10:00:00',
  field07: `doc${1000 + index}`,
  field08: '승인',
}));

export const Ltpz119 = () => {
  const pageSize = 5;
  const [rowData, setRowData] = React.useState<DummyDataType2[]>([]);
  const [loadedCount, setLoadedCount] = React.useState(0);
  const totalCount = DummyData2.length;

  const gridRef = React.useRef<AgGridReact<DummyDataType2>>(null);
  const { attributeColumnWidth } = useDynamicColumnWidths();

  const fetchMockData = React.useCallback(async (page: number, limit: number) => {
    return new Promise<DummyDataType2[]>((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        resolve(DummyData2.slice(start, end));
      }, 100);
    });
  }, []);

  const handleSearch = React.useCallback(async () => {
    const initialData = await fetchMockData(1, pageSize);
    setRowData(initialData);
    setLoadedCount(initialData.length);
  }, [fetchMockData, pageSize]);

  React.useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleLoadNext = React.useCallback(async () => {
    if (loadedCount >= totalCount) return;
    const nextPage = Math.floor(loadedCount / pageSize) + 1;
    const nextData = await fetchMockData(nextPage, pageSize);
    setRowData((prev) => [...prev, ...nextData]);
    setLoadedCount((prev) => prev + nextData.length);
  }, [fetchMockData, loadedCount, totalCount, pageSize]);

  const handleLoadAll = React.useCallback(async () => {
    if (loadedCount >= totalCount) return;
    setRowData(DummyData2);
    setLoadedCount(totalCount);
  }, [loadedCount, totalCount]);

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
              다운로드 파일 등록
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
              <TableFoldBody className="grid-rows-[auto_1fr] gap-3">
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
                    <Button color="coolgray" onClick={handleSearch} only="default" size="lg" variant="contained">
                      조회
                    </Button>
                    <Button
                      color={'gray'}
                      only={'icon'}
                      size={'lg'}
                      variant={'outlined'}
                      onClick={handleSearch}
                      aria-label="새로고침"
                    >
                      <ResetIcon />
                    </Button>
                  </Grow>
                </Grow>

                <Gcol gap={1} className="overflow-hidden min-h-[21.3rem]" placement="ss">
                  <div className="ag-theme-alpine">
                    <AgGridReact<DummyDataType2>
                      ref={gridRef}
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData}
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
                    isAll={true}
                    loadedCount={loadedCount}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onLoadAll={handleLoadAll}
                    onLoadNext={handleLoadNext}
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
