/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Typo } from '@atoms';
import { Dialog, DialogContent, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

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

const Ltpz997 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              화면담당자
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ997)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <Table>
            <caption className="a11y-hidden">화면담당자 정보입니다.</caption>
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

export default Ltpz997;
