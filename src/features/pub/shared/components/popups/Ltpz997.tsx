/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Typo } from '@atoms';
import { Dialog, DialogContent, DialogHeader, DialogSection, DialogTitle, DialogFooter } from '@uiux/Dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';
import { DialogBottomInfo } from '@common/DialogBottomInfo';

// 화면 담당자 정보 데이터 타입 정의
type DummyDataType = {
  id: number; // 고유 ID
  field1: string; // 성명
  field2: string; // 부서명
  field3: string; // 연락처
};

// 그리드에 표시할 임시 데이터 (현업담당자와 전산담당자)
const dummyData: DummyDataType[] = [
  { id: 1, field1: '홍길동', field2: 'ESG추진하트', field3: '-' },
  { id: 2, field1: '홍길순', field2: '-', field3: '-' },
];

/**
 * Ltpz997: 현재 화면의 업무 및 시스템을 담당하는 담당자 정보를 보여주는 팝업 컴포넌트입니다.
 */
const Ltpz997 = () => {
  return (
    <Dialog open>
      {/* showCloseButton: 닫기 버튼 노출, resizable: 크기 조절 불가, size: 중간 크기 */}
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
          {/* 담당자 정보를 비교하여 보여주는 테이블 */}
          <Table>
            <caption className="a11y-hidden">화면담당자 정보입니다.</caption>
            <TableHeader>
              <TableRow>
                {/* 테이블 헤더: 구분, 현업, 전산 순 */}
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
        {/* 하단 공통 정보 영역 (전화번호 등 안내) */}
        <DialogFooter>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz997;
