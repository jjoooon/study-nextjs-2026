'use client';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

export const Ltpa3500209 = ({ open, onOpenChange }: PopupBaseProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} size="sm">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              설계복사 선택
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA350)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <Gcol className="w-full" gap={5} placement="ss">
            <Typo tag={'p'} variant={'body-lg'}>
              복사할 기능을 선택하세요.
            </Typo>
            <Gcol className="w-full text-center" gap={1}>
              <Button style={{ width: '20rem' }} onClick={() => {}} size="xl" variant="outlined">
                현재고객으로 복사
              </Button>
              <Button style={{ width: '20rem' }} onClick={() => {}} size="xl" variant="outlined">
                신규 고객으로 복사 (간편 설계)
              </Button>
              <Button style={{ width: '20rem' }} onClick={() => {}} size="xl" variant="outlined">
                다태아연계 복사
              </Button>
            </Gcol>
          </Gcol>
        </DialogSection>
        <DialogFooter>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
