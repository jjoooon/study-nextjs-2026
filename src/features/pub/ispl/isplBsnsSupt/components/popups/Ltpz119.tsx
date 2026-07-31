/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import '@/shared/lib/agGridPub';
import { Grid, Grow, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';

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

type DummyDataType1 = {
  id: number;
  field01: string | number;
  field02: string | number;
};
const DummyData1: DummyDataType1[] = [
  {
    id: 1,
    field01: '2006년 5월 심사가이드라인.xlsx',
    field02: '2,849KB',
  },
  {
    id: 2,
    field01: '2006년 5월 심사가이드라인.xlsx',
    field02: '2,849KB',
  },
  {
    id: 3,
    field01: '2006년 5월 심사가이드라인.xlsx',
    field02: '2,849KB',
  },
  {
    id: 4,
    field01: '2006년 5월 심사가이드라인.xlsx',
    field02: '2,849KB',
  },
  {
    id: 5,
    field01: '2006년 5월 심사가이드라인.xlsx',
    field02: '2,849KB',
  },
  {
    id: 6,
    field01: '2006년 5월 심사가이드라인.xlsx',
    field02: '2,849KB',
  },
];

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
  const [rowData1] = React.useState<DummyDataType1[]>(DummyData1);
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);
  const { attributeColumnWidth } = useDynamicColumnWidths();

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

  // AgGrid Column
  const columnDefs1: ColDef<DummyDataType1>[] = [
    {
      headerName: '파일목록',
      field: 'field01',
      flex: 10,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType1>({ field: 'field01' }),
    },
    {
      headerName: '파일크기',
      field: 'field02',
      flex: 1,
      cellClass: 'text-center',
      minWidth: attributeColumnWidth(90),
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '문서',
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
          <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
            <TableFold variant="default">
              <TableFoldHead title="파일목록">
                <Grow>
                  <Button color="gray" variant="outlined">
                    파일삭제
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={rowData1.length}>
                  <AgGridReact<DummyDataType1>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData1}
                    columnDefs={columnDefs1}
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
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <TableFold variant="default">
              <TableFoldHead title="첨부문서 결재 관리" />
              <TableFoldBody>
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
                <div className="ag-theme-alpine inner-scroll" data-row={rowData1.length}>
                  <AgGridReact<DummyDataType2>
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
                  />
                </div>
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
