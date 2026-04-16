'use client';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';

type DummyDataType = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
};
const dummyData: DummyDataType[] = [
  { id: 1, field1: '홍길동', field2: 'ESG추진하트', field3: '-' },
  { id: 2, field1: '홍길순', field2: '-', field3: '-' },
];

export const Ltpz997 = ({ open, onOpenChange }: PopupBaseProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              화면권한보기
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ997)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <Table>
            <caption className="a11y-hidden">테이블 소개글</caption>
            <TableHeader>
              <TableRow>
                <TableHead>구문</TableHead>
                <TableHead>현업담당자</TableHead>
                <TableHead>전산담당자</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableHead>성명</TableHead>
                <TableCell className="text-center">{dummyData[0].field1}</TableCell>
                <TableCell className="text-center">{dummyData[1].field1}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>부서</TableHead>
                <TableCell className="text-center">{dummyData[0].field2}</TableCell>
                <TableCell className="text-center">{dummyData[1].field2}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>연락처</TableHead>
                <TableCell className="text-center">{dummyData[0].field3}</TableCell>
                <TableCell className="text-center">{dummyData[1].field3}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogSection>
      </DialogContent>
    </Dialog>
  );
};
