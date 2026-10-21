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

/**
 * 보험계약 중요사항 설명의무 확인(모집자) 팝업 (LTPZ120)
 */
const Ltpz120 = () => {
  // 대면 정보 입력 상태
  const [meetDate, setMeetDate] = React.useState<string>('');
  const [meetTime, setMeetTime] = React.useState<string>('');
  const [meetDuration, setMeetDuration] = React.useState<string>('120분 이상');
  const [meetMethod, setMeetMethod] = React.useState<string>('문서출력물 사용하여 대면설명');

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        {/* 팝업 헤더 */}
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              취급자 설명확인 전자서명 전 유의사항
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ122)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        {/* 팝업 본문 */}
        <DialogSection className="gap-3">
          {/* 상단 안내 문구 */}
          <Typo variant={'body-lg'} className="flex flex-col gap-[0.6rem]">
            <span>
              모집종사자는 금융소비자보호에 관한 법률 및 동법 하위규정 등에서 정하는 설명의무 사항을 포함한
              TM표준스크립트 설명 내용을 충실히 설명하였으며, 부실설명 등으로 고객과의 분쟁발생, 법규위반 사항이 발생할
              경우 과태료 등이 부과될 수 있습니다.
            </span>
            <span>
              전자서명 요청 전 계약자와의 직접 통화를 위하여, 보험계약에 동의하는 본인임을 확인하였으며, 보험계약의
              중요사항을 설명하였습니다. 또한, 전자서명은 고객이 직접 내용 확인 후 서명해야 한다는 사실과 보험계약서류를
              전달받아야 한다는 사실을 설명하였습니다.
            </span>
          </Typo>

          {/* 대면 정보 입력 FormTable */}
          <Typo variant={'body-lg'} weight={'bold'}>
            고객과 직접만난 일시, 장소, 설명방법을 기재하시기 바랍니다.
          </Typo>
          <FormTable lineTop cols={['w-[10rem]', 'w-[22rem]', 'w-[12rem]', 'w-auto']} variant="default">
            <FormRow>
              <FormCell title={'통화일시'}>
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
              <FormCell title={'설명기간(분)'}>
                {/* NativeSelect 형태 */}
                <NativeSelect width={'12rem'} value={meetDuration} onChange={(e) => setMeetDuration(e.target.value)}>
                  {[
                    { value: '120분 이상', label: '120분 이상' },
                    { value: '60분~120분', label: '60분~120분' },
                    { value: '30분~60분', label: '30분~60분' },
                    { value: '10분~30분', label: '10분~30분' },
                    { value: '10분 미만', label: '10분 미만' },
                  ].map((option) => (
                    <NativeSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </FormCell>
            </FormRow>

            <FormRow>
              <FormCell title={'설명방법 '} colSpan={3}>
                <NativeSelect
                  width={'24rem'}
                  value={meetMethod}
                  disabled
                  onChange={(e) => setMeetMethod(e.target.value)}
                >
                  {[{ value: '전화를 통한 설명', label: '전화를 통한 설명' }].map((option) => (
                    <NativeSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </FormCell>
            </FormRow>
          </FormTable>

          {/* 출력일시 및 전자서명 안내 */}
          <Gcol placement="ss" gap={0.5} className="text-[var(--color-gray-60)] text-[1.2rem]">
            <BulletList position="col">
              <BulletListItem className="whitespace-nowrap" type="ref" size="sm">
                상기 입력하신 정보는 인터넷 홈페이지등을 통해 고객에게 제공할 수 있습니다.
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
                계약자 : 김한화 010-2345-6789 / hanhwa@gmail.com
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
