/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { Grow, Gcol, Typo } from '@atoms';
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
import * as React from 'react';

const Ltpz108 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              대용량 지침 체크 방법 안내
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <Gcol
            className="w-full [&>h3]:w-full [&>h3]:text-center [&>h3]:font-bold [&>p_b]:text-[var(--color-primary-50)] [&>p_b]:font-bold overflow-y-auto"
            variant="box-round"
            placement={'ss'}
            gap={2}
          >
            <h3>[피보험자 20명 초과시 지침 체크 방법 선택]</h3>
            <p>
              지침체크 처리시 약 1분 정도 소요 예상 됩니다.
              <br />- 시스템 동시 사용자 수, 설계 피보험자 수, 설계 담보 수 등에 따라 소요 시간 차이 발생
            </p>
            <p>
              일반적인 지침체크 방법은 버튼 클릭 후 3분 이내에 전산처리가 완료 되지 않으면 시간초과(TimeOut)로 지침
              체크가 되지 않습니다.
              <br />
              <b>일반적인 지침체크 방법</b>으로 진행 하시려면 &apos;<b>즉시처리</b>&apos; 버튼을 클릭하여 주세요.
            </p>
            <p>
              만약 지침체크시 TimeOut이 발생하였거나, TimeOut이 예상되는 경우 &apos;대용량처리&apos;버튼을 클릭하여
              주세요.
            </p>
            <p>
              &apos;<b>대용량처리</b>&apos; 버튼을 클릭하시면 &apos;<b>대용량 처리방식</b>&apos;으로 지침체크가 처리
              됩니다. 이 경우 지침체크 예상 소요시간(1분) 이후에 지침체크 결과를 확인하여 주시기 바랍니다.{' '}
            </p>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                즉시처리
              </Button>
              <Button variant={'contained'} size={'xl'}>
                대용량처리
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

export default Ltpz108;
