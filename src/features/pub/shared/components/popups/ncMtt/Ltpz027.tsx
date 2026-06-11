/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
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
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@uiux/Table';
import { TableCell } from '@uiux/Table';
import { DialogBottomInfo } from '@common/DialogBottomInfo';

// Grid2 dummy data
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '김한화',
    field02: '1',
    field03: '2026-02-11 11:22:55',
    field04: '2026-02-11 12:42:55',
    field05: '취소',
    field06: '',
    field07: '',
  },
  {
    id: 2,
    field01: '김한화',
    field02: '2',
    field03: '2026-02-12 12:22:55',
    field04: '',
    field05: '진행중',
    field06: '',
    field07: '',
  },
];

type DummyData2Type = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
};
const DummyData2: DummyData2Type[] = [
  {
    id: 1,
    field01: '김한화',
    field02: '1990-01-01',
    field03: '010-0000-0000',
    field04: '진행중',
  },
];

const Ltpz027 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '대상',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        field: 'field01',
        cellClass: 'text-center px-0!',
        autoHeight: true,
        spanRows: true,
      },
      {
        headerName: '차수',
        flex: 1,
        minWidth: attributeColumnWidth(40),
        field: 'field02',
        cellClass: 'text-center px-0!',
        autoHeight: true,
      },
      {
        headerName: '의뢰일시',
        flex: 2,
        minWidth: attributeColumnWidth(120),
        field: 'field03',
        cellClass: 'text-center px-0!',
        autoHeight: true,
      },
      {
        headerName: '완료(취소)일시',
        flex: 2,
        minWidth: attributeColumnWidth(120),
        field: 'field04',
        cellClass: 'text-center px-0!',
        autoHeight: true,
      },
      {
        headerName: '진행상태',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        field: 'field05',
        cellClass: 'text-center px-0!',
        autoHeight: true,
      },
      {
        headerName: '답변내용',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        field: 'field06',
        cellClass: 'text-center px-0!',
        autoHeight: true,
        cellRenderer: () => (
          // 2026-06-02 버튼 추가
          <Button variant={'outlined'} size={'md'} color={'gray'}>
            보기
          </Button>
        ),
      },
      {
        headerName: '확인필요',
        flex: 10,
        field: 'field07',
        cellClass: 'text-center px-0!',
        autoHeight: true,
      },
    ],
    [attributeColumnWidth]
  );
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="ml" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              SELEF고지 알림톡 발송
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ027)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="w-full grid h-full grid-rows-[auto_1fr]">
          <Gcol placement={'ss'}>
            <Typo variant="heading-sm" color="default">
              발송대상
            </Typo>
            <Table variant="default">
              <TableHeader>
                <TableRow>
                  <TableHead>성명</TableHead>
                  <TableHead>생년월일</TableHead>
                  <TableHead>휴대폰번호</TableHead>
                  <TableHead colSpan={2}>발송구분</TableHead>
                  <TableHead>진행상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="text-center">
                  <TableCell>김한화</TableCell>
                  <TableCell>1990-01-01</TableCell>
                  <TableCell>010-0000-0000</TableCell>
                  <TableCell>
                    <Button aria-label="발송" variant={'contained'} size={'md'} color={'primary'}>
                      발송
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button aria-label="취소" variant={'outlined'} size={'md'} color={'gray'}>
                      취소
                    </Button>
                  </TableCell>
                  <TableCell>진행중</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Gcol>
          <Grid className="grid-rows-[auto_1fr] gap-2" placement={'ss'}>
            <Typo variant="heading-sm" color="default">
              진행이력
            </Typo>
            <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                }}
                domLayout="normal"
                className="text-center"
                enableCellSpan={true}
              />
            </div>
            {/* M1. 텍스트 추가 */}
            <Grow variant="box-warning">
              <Typo icon="warning" variant="body-sm">
                알림톡 발송불가 대상: 채널 (방카,TM) / 연령(만 19세미만) / 고객정보(휴대폰 또는 고객번호누락) /
                심사상태(심사중 또는 심사승인) / 설계상태(설계수정 불가상태)
              </Typo>
            </Grow>
            {/* 2026-06-02 추가 */}
            <Gcol placement={'ss'} variant={'box-info'} className="w-full">
              <Typo variant={'body-md'} icon={'info'}>
                <b>필수 확인 사항</b>
              </Typo>
              <Typo variant="body-sm" color={'gray'} className="break-all tracking-normal">
                https://mscfadev.hwgeneralins.com:3443/pages/mcsfaLaucher?token=%2B9KJdLIxDfn046Jv9BUJN2fPeYtkm8Zg5bBmUSFvB1uGethPAvVXaSLISXHk55VwmijfXVLT20DTWz0%2Ba9F98dLCdZvseSH80HsvmiNt0Z38659LhINnYtXU8dzykyi
              </Typo>
            </Gcol>
          </Grid>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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

export default Ltpz027;
