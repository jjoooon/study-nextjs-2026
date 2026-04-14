'use client';
// 권오택
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { InfoBox } from '@common/InfoBox';
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
import { TableCell } from '@uiux/Table';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@uiux/Table';

ModuleRegistry.registerModules([AllCommunityModule]);

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

export const Ltpz027 = ({ open, onOpenChange }: PopupBaseProps) => {
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '대상',
      width: 70,
      field: 'field01',
      cellClass: 'text-center px-0!',
      autoHeight: true,
      spanRows: true,
    },
    {
      headerName: '차수',
      width: 70,
      field: 'field02',
      cellClass: 'text-center px-0!',
      autoHeight: true,
    },
    {
      headerName: '의뢰일시',
      width: 130,
      field: 'field03',
      cellClass: 'text-center px-0!',
      autoHeight: true,
    },
    {
      headerName: '완료(취소)일시',
      width: 130,
      field: 'field04',
      cellClass: 'text-center px-0!',
      autoHeight: true,
    },
    {
      headerName: '진행상태',
      width: 90,
      field: 'field05',
      cellClass: 'text-center px-0!',
      autoHeight: true,
    },
    {
      headerName: '답변내용',
      flex: 1,
      field: 'field06',
      cellClass: 'text-center px-0!',
      autoHeight: true,
    },
    {
      headerName: '확인필요',
      width: 90,
      field: 'field07',
      cellClass: 'text-center px-0!',
      autoHeight: true,
    },
  ];
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="lg" className="">
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
        <DialogSection className="w-full gap-5">
          <Gcol gap={3}>
            <Gcol placement={'ss'} gap={1.5}>
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
                    <TableCell>010-1234-5678</TableCell>
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
            <Gcol placement={'ss'} gap={1.5}>
              <Typo variant="heading-sm" color="default">
                진행이력
              </Typo>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: false,
                    resizable: false,
                  }}
                  domLayout="autoHeight"
                  className="text-center"
                  enableCellSpan={true}
                />
              </div>
            </Gcol>
            <InfoBox
              bg
              subTitle="알림톡 발송불가 대상: 채널 (방카,TM) / 연령(만 19세미만) / 고객정보(휴대폰 또는 고객번호누락) / 심사상태(심사중 또는 심사승인)"
              variant="warning"
            ></InfoBox>
          </Gcol>
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
/**
 * 확인요청
 * 이륜차부담보 가입 사이 계약 테이블 ag grid 확인
 */
