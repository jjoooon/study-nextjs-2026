'use client';
// 권오택
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import * as React from 'react';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InfoBox } from '@common/InfoBox';
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

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpz050 = ({ open, onOpenChange }: PopupBaseProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              부실유의계약 선별인수 확인서
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ050)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol className="w-full" gap={5}>
            <FormTable
              caption="부실유의계약 선별인수 확인서"
              cols={['w-[9rem]', 'w-auto', 'w-[9rem]', 'w-auto']}
              lineTop
              variant="default"
            >
              <FormRow>
                <FormCell title={'상품명'}>Text</FormCell>
                <FormCell title={'설계번호'}>Text</FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'계약자'}>Text</FormCell>
                <FormCell title={'주피보험자'}>Text</FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'모집자'} colSpan={3}>
                  Text
                </FormCell>
              </FormRow>
            </FormTable>
            <InfoBox bg subTitle="부실유의계약 해당 항목" variant="warning">
              <div
                dangerouslySetInnerHTML={{
                  __html: '<strong>단 사유 입력시 DB 암호화  정책에 의거 개인정보 입력불가</strong>',
                }}
              />
            </InfoBox>
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
