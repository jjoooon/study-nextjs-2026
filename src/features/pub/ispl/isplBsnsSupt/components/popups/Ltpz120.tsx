/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Badge } from '@uiux/Badge';
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
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

/**
 * 보험계약 중요사항 설명의무 확인(모집자) 팝업 (LTPZ120)
 */
const Ltpz120 = () => {
  // 질문 1~4 확인 라디오 상태
  const [q1, setQ1] = React.useState<string>('예'); //예, 아니오
  const [q2, setQ2] = React.useState<string>('');
  const [q3, setQ3] = React.useState<string>('');
  const [q4, setQ4] = React.useState<string>('');

  // 대면 정보 입력 상태
  const [meetDate, setMeetDate] = React.useState<string>('');
  const [meetTime, setMeetTime] = React.useState<string>('');
  const [meetDuration, setMeetDuration] = React.useState<string>('120분 이상');
  const [meetPlace, setMeetPlace] = React.useState<string>('');
  const [meetMethod, setMeetMethod] = React.useState<string>('문서출력물 사용하여 대면설명');

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        {/* 팝업 헤더 */}
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              보험계약 중요사항 설명의무 확인(모집자)
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ120)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        {/* 팝업 본문 */}
        <DialogSection>
          {/* 상단 안내 문구 */}
          <Typo variant={'body-lg'} className="pb-2">
            보험 모집자는 보험계약 체결 전 계약자 및 피보험자를 직접 만나 다음 사항을 고객님께 설명 하여야 합니다.
          </Typo>

          {/* 질문 1 ~ 5 */}
          <Gcol placement="ss" className="w-full" gap={2}>
            {/* 1번 질문 */}
            <Gcol placement="ss" className="w-full" gap={1}>
              <Typo variant={'body-md'} weight={'bold'} className="flex items-center gap-[0.6rem]">
                <Badge color="secondary" size="md" variant="contained" className="w-[1.8rem] h-[1.8rem]">
                  1
                </Badge>
                <span>
                  전자서명 요청 전 계약자 및 피보험자를 직접 만나 계약자가 보험계약에 동의하는{' '}
                  <span className="underline font-bold">본인임을 확인</span> 하셨습니까?
                </span>
              </Typo>
              <RadioGroup
                className="flex items-center gap-4 ml-[2.4rem]"
                defaultValue=""
                value={q1}
                onValueChange={setQ1}
              >
                {[
                  { value: '예', label: '예' },
                  { value: '아니오', label: '아니오' },
                ].map((option) => (
                  <RadioGroupItem key={option.value} value={option.value}>
                    {option.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </Gcol>

            {/* 2번 질문 */}
            <Gcol placement="ss" className="w-full" gap={1}>
              <Typo variant={'body-md'} weight={'bold'} className="flex items-center gap-[0.6rem]">
                <Badge color="secondary" size="md" variant="contained" className="w-[1.8rem] h-[1.8rem]">
                  2
                </Badge>
                <span>
                  계약자 및 피보험자를 직접 만나 보험약관 및 보험계약의{' '}
                  <span className="underline font-bold">중요사항을 설명</span> 하셨습니까?
                </span>
              </Typo>
              <RadioGroup
                className="flex items-center gap-4 ml-[2.4rem]"
                defaultValue=""
                value={q2}
                onValueChange={setQ2}
              >
                {[
                  { value: '예', label: '예' },
                  { value: '아니오', label: '아니오' },
                ].map((option) => (
                  <RadioGroupItem key={option.value} value={option.value}>
                    {option.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </Gcol>

            {/* 3번 질문 */}
            <Gcol placement="ss" className="w-full" gap={1}>
              <Typo variant={'body-md'} weight={'bold'} className="flex items-center gap-[0.6rem]">
                <Badge color="secondary" size="md" variant="contained" className="w-[1.8rem] h-[1.8rem]">
                  3
                </Badge>
                <span>
                  보험계약자 및 피보험자가 청약서에 <span className="underline font-bold">자필서명</span>을 하여야
                  한다는 사실을 설명하셨습니까?
                </span>
              </Typo>
              <RadioGroup
                className="flex items-center gap-4 ml-[2.4rem]"
                defaultValue=""
                value={q3}
                onValueChange={setQ3}
              >
                {[
                  { value: '예', label: '예' },
                  { value: '아니오', label: '아니오' },
                ].map((option) => (
                  <RadioGroupItem key={option.value} value={option.value}>
                    {option.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </Gcol>

            {/* 4번 질문 */}
            <Gcol placement="ss" className="w-full" gap={1}>
              <Typo variant={'body-md'} weight={'bold'} className="flex items-center gap-[0.6rem]">
                <Badge color="secondary" size="md" variant="contained" className="w-[1.8rem] h-[1.8rem]">
                  4
                </Badge>
                <span>
                  청약서 <span className="underline font-bold">부본을 교부</span> 받아야 한다는 사실을 설명하셨습니까?
                </span>
              </Typo>
              <RadioGroup
                className="flex items-center gap-4 ml-[2.4rem]"
                defaultValue=""
                value={q4}
                onValueChange={setQ4}
              >
                {[
                  { value: '예', label: '예' },
                  { value: '아니오', label: '아니오' },
                ].map((option) => (
                  <RadioGroupItem key={option.value} value={option.value}>
                    {option.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </Gcol>

            {/* 5번 항목 */}
            <Gcol placement="ss" className="w-full" gap={1}>
              <Typo variant={'body-md'} weight={'bold'} className="flex items-center gap-[0.6rem]">
                <Badge color="secondary" size="md" variant="contained" className="w-[1.8rem] h-[1.8rem]">
                  5
                </Badge>
                <span>고객과 직접만난 일시, 장소, 설명방법을 기재하시기 바랍니다.</span>
              </Typo>
            </Gcol>
          </Gcol>

          {/* 대면 정보 입력 FormTable */}
          <FormTable lineTop cols={['w-[10rem]', 'w-[22rem]', 'w-[12rem]', 'w-auto']} variant="default">
            <FormRow>
              <FormCell title={'대면일시'}>
                <Grow gap={1} className="items-center">
                  <DatePickerInput
                    mode="single"
                    value={meetDate}
                    onChange={(_date, formattedValue) => setMeetDate(formattedValue)}
                    width={120}
                  />
                  <Input
                    aria-label="대면시간"
                    width={51}
                    placeholder="__:__"
                    value={meetTime}
                    onChange={(e) => setMeetTime(e.target.value)}
                  />
                </Grow>
              </FormCell>
              <FormCell title={'대면설명기간(분)'}>
                {/* NativeSelect 형태 */}
                <NativeSelect width={'12rem'} value={meetDuration} onChange={(e) => setMeetDuration(e.target.value)}>
                  {[
                    { value: '10분', label: '10분' },
                    { value: '20분', label: '20분' },
                    { value: '30분', label: '30분' },
                    { value: '60분', label: '60분' },
                    { value: '90분', label: '90분' },
                    { value: '120분 이상', label: '120분 이상' },
                  ].map((option) => (
                    <NativeSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'대면장소'} colSpan={3}>
                <Input
                  aria-label="대면장소"
                  width="full"
                  value={meetPlace}
                  onChange={(e) => setMeetPlace(e.target.value)}
                />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'대면설명방법'} colSpan={3}>
                <NativeSelect width={'24rem'} value={meetMethod} onChange={(e) => setMeetMethod(e.target.value)}>
                  {[
                    { value: '문서출력물 사용하여 대면설명', label: '문서출력물 사용하여 대면설명' },
                    { value: '태블릿PC 사용하여 대면설명', label: '태블릿PC 사용하여 대면설명' },
                    { value: '화상통화 사용하여 대면설명', label: '화상통화 사용하여 대면설명' },
                  ].map((option) => (
                    <NativeSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </FormCell>
            </FormRow>
          </FormTable>

          {/* 본계약이 아닌경우 */}
          <Gcol placement="ss" gap={0.5} className="text-[var(--color-gray-60)] text-[1.2rem]">
            <BulletList position="col">
              <BulletListItem className="whitespace-nowrap" type="dash" size="sm">
                가입제안서(상품설명서) 출력일시 : 2026-10-16 10:05:05
              </BulletListItem>
              <BulletListItem className="whitespace-nowrap" type="dash" size="sm">
                가입제안서 or 상품설명서 출력 이후에 전자서명을 진행하실 수 있습니다.
              </BulletListItem>
            </BulletList>
          </Gcol>
          {/* 본계약일 경우 */}
          <Gcol placement="ss">
            <Typo variant={'body-sm'} color={'information'}>
              본인계약 해당시 가입제안서 출력, 전자서명 가능시간제어 및 대면설명정보입력 예외됩니다.
            </Typo>
            <BulletList position="col">
              <BulletListItem className="whitespace-nowrap" color="info" type="star" size="sm">
                본인계약 : 취급자주민번호 = 계약자주민번호
              </BulletListItem>
            </BulletList>
          </Gcol>

          {/* 수신처 확인 안내 박스 */}
          <Gcol placement={'ss'} variant={'box-info'} className="w-full gap-2">
            <Typo variant={'body-sm'} icon={'info'} className="!font-bold">
              알림톡(휴대폰) 및 청약서류(E-mail) 수신처를 정확히 확인 바랍니다.
            </Typo>
            <BulletList position="col">
              <BulletListItem className="whitespace-nowrap" type="dot" size="sm">
                계약자 : 김한화 010-2345-6789 / hanhwa@gmail.com(법정대리인:김한화 010-1234-5678)
              </BulletListItem>
              <BulletListItem className="whitespace-nowrap" type="dot" size="sm">
                취급자 : 김한화 010-2345-6789 (6012345)
              </BulletListItem>
              <BulletListItem className="whitespace-nowrap" type="dot" size="sm">
                피보험자 : 김한화 010-2345-5678
              </BulletListItem>
              <BulletListItem before="※" className="whitespace-nowrap" type="symbols" size="sm">
                계약자가 미성년인 경우 법정대리인의 휴대폰으로 알림톡이 발송됩니다.
              </BulletListItem>
            </BulletList>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
                확인
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  취소
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

export default Ltpz120;
