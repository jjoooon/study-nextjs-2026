/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
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
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

/**
 * 모바일 약관 계약자 미확인 팝업 (LTPZ121)
 */
const Ltpz121 = () => {
  // 전달 방법 라디오 선택 상태 ('직접전달' | '우편전달' | '기타방법으로 전달')
  const [deliveryMethod, setDeliveryMethod] = React.useState<string>('');
  // 기타방법 직접 입력 상세 내용
  const [etcDetail, setEtcDetail] = React.useState<string>('');

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="sm">
        {/* 팝업 헤더 */}
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              모바일 약관 계약자 미확인
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ121)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        {/* 팝업 본문 */}
        <DialogSection>
          <Gcol placement="ss" gap={6}>
            {/* 상단 안내 문구 */}
            <Gcol placement="ss">
              <Typo variant={'body-md'}>
                모바일 약관 전달 대상이나 계약자 미확인 상태입니다.<br></br> 모바일 외 방법으로 어떻게 계약자에게
                전달하셨는지 선택하시기 바랍니다.<br></br> (약관 미전달 시 청약완료 불가)
              </Typo>
            </Gcol>

            {/* 라디오 그룹 (전달 방법 선택) */}
            <RadioGroup
              value={deliveryMethod}
              onValueChange={setDeliveryMethod}
              className="flex flex-col items-start gap-2 w-full pt-1"
            >
              <RadioGroupItem value="직접전달">직접전달</RadioGroupItem>
              <RadioGroupItem value="우편전달">우편전달</RadioGroupItem>
              <Grow className="w-full items-center gap-2">
                <RadioGroupItem value="기타방법으로 전달" className="shrink-0">
                  기타방법으로 전달
                </RadioGroupItem>
                <Input
                  aria-label="기타방법 상세 내용"
                  className="flex-1"
                  value={etcDetail}
                  onChange={(e) => {
                    setEtcDetail(e.target.value);
                    if (deliveryMethod !== '기타방법으로 전달') {
                      setDeliveryMethod('기타방법으로 전달');
                    }
                  }}
                  onFocus={() => {
                    if (deliveryMethod !== '기타방법으로 전달') {
                      setDeliveryMethod('기타방법으로 전달');
                    }
                  }}
                />
              </Grow>
            </RadioGroup>
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

export default Ltpz121;
