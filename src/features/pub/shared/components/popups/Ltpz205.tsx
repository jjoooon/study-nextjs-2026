/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { ConfirmDialog } from '@common/ConfirmDialog';
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

const Ltpz205 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xs">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              간편수납
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ205)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Typo className="font-bold">입력하신 초회보험료 정보로 수납하시겠습니까?</Typo>
          <Gcol gap={2}>
            <FormTable caption="사업자" cols={['w-[11rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'초회 납입방법'}>즉시이체</FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'예금주(카드주)'}>김한화</FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'계좌/카드번호'}>
                  행복은행<br></br> 111-222-333-113
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'초회 납입보험료'}>30,000원</FormCell>
              </FormRow>
            </FormTable>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => {}}>
                원수수납 이동
              </Button>
            </Grow>
            <Grow>
              <ConfirmDialog
                cancelLabel="닫기"
                confirmLabel="원수수납 이동"
                description="수납이 완료되었습니다. 수납이 완료되지 않아, 원수수납 화면으로 이동합니다."
                onCancel={() => {}}
                onConfirm={() => {}}
                onOpenChange={() => {}}
                title="알림"
                tone="info"
                trigger={
                  <Button variant={'contained'} size={'xl'}>
                    수납
                  </Button>
                }
              />
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

export default Ltpz205;
