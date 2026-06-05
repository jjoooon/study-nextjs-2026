/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

// 2026-05-21 import 수정
'use client';
import { Gcol, Grow, Typo } from '@atoms';

import { BulletList } from '@common/BulletList';
import { BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';
import { useState } from 'react';

const Ltpz055 = () => {
  const [sendType, setSendType] = useState<string>('option1');

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              휴대폰 전자서명 알림톡 발송
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ055)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable caption="보험정보" cols={['w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'발송대상 설계번호'}>
                  <Input value={'LA260212123123'} readOnly variant="info" size="lg" width="full" />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          {/* 2026-05-27 구조변경(Gcol 추가) */}
          <Gcol className="gap-2">
            <Table>
              <caption className="a11y-hidden">화면담당자 정보입니다.</caption>
              <colgroup>
                <col className="w-[10rem]" />
                <col className="w-auto" />
                <col className="w-auto" />
                <col className="w-[14rem]" />
              </colgroup>
              <TableHeader>
                <TableRow>
                  <TableHead>구문</TableHead>
                  <TableHead>기존발송번호</TableHead>
                  <TableHead>신규발송번호</TableHead>
                  <TableHead>
                    <RadioGroup
                      className="gap-2 grid grid-cols-2"
                      onValueChange={setSendType}
                      value={sendType}
                      width="full"
                    >
                      {[
                        { value: 'option1', label: '알림톡' },
                        { value: 'option2', label: 'LMS' },
                      ].map((option) => (
                        <RadioGroupItem
                          key={option.value}
                          color="primary"
                          id={option.value}
                          size="lg"
                          value={option.value}
                          variant="default"
                        >
                          {option.label}
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableHead>모집자</TableHead>
                  <TableCell className="text-center">
                    <Input
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      onChange={() => {}}
                      size="lg"
                      value={'010-****-1234'}
                      variant="default"
                      width="full"
                      readOnly
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      onChange={() => {}}
                      size="lg"
                      value=""
                      variant="default"
                      width="full"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                      발송
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>계약자</TableHead>
                  <TableCell className="text-center">
                    <Input
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      onChange={() => {}}
                      size="lg"
                      value={'010-****-1234'}
                      variant="default"
                      width="full"
                      readOnly
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      onChange={() => {}}
                      size="lg"
                      value=""
                      variant="default"
                      width="full"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                      발송
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>피보험자</TableHead>
                  <TableCell className="text-center">
                    <Input
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      onChange={() => {}}
                      size="lg"
                      value={'010-****-1234'}
                      variant="default"
                      width="full"
                      readOnly
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      onChange={() => {}}
                      size="lg"
                      value=""
                      variant="default"
                      width="full"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                      발송
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Gcol className="w-full" placement="ss" variant="box-info">
              <Typo icon="info" variant="body-sm">
                <b>알림톡/LMS 발송을 위한 팝업 입니다.</b>
              </Typo>
              <BulletList>
                <BulletListItem size="sm">기존 번호로 발송: 발송버튼 클릭</BulletListItem>
                <BulletListItem size="sm">새로운 번호로 발송: 신규발송번호 기재 후 발송버튼 클릭</BulletListItem>
              </BulletList>
            </Gcol>
            {/* 2026-05-27 스타일 변경 */}
            <Gcol className="w-full gap-2" placement="ss" variant="box-info">
              <BulletList className="w-full [&>li>div:first-child]:h-full">
                <BulletListItem size="sm">
                  <Grow placement="ss" className="gap-1 flex items-center justify-between">
                    <span className="w-[6.2rem] shrink-0">모집자URL:</span>
                    <Input
                      className="inline-block w-[calc(100%-6rem)]!"
                      readOnly
                      value={'https://hanwha.com/****'}
                      variant="default"
                      size="sm"
                    />
                  </Grow>
                </BulletListItem>
              </BulletList>
              <BulletList className="w-full [&>li>div:first-child]:h-full">
                <BulletListItem size="sm">
                  <Grow placement="ss" className="gap-1 flex items-center justify-between">
                    <span className="w-[6.2rem] shrink-0">계약자URL:</span>
                    <Input
                      className="inline-block w-[calc(100%-6rem)]!"
                      readOnly
                      value={'https://hanwha.com/****'}
                      variant="default"
                      size="sm"
                    />
                  </Grow>
                </BulletListItem>
              </BulletList>
              <BulletList className="w-full [&>li>div:first-child]:h-full">
                <BulletListItem size="sm">
                  <Grow placement="ss" className="gap-1 flex items-center justify-between">
                    <span className="w-[6.2rem] shrink-0">피모집자URL:</span>
                    <Input
                      className="inline-block w-[calc(100%-6rem)]!"
                      readOnly
                      value={'https://hanwha.com/****'}
                      variant="default"
                      size="sm"
                    />
                  </Grow>
                </BulletListItem>
              </BulletList>
            </Gcol>
          </Gcol>
        </DialogSection>
        {/* 2026-05-21 수정 */}
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

export default Ltpz055;
