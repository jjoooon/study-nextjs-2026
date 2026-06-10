/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';
import { DialogBottomInfo } from '@common/DialogBottomInfo';

const Ltpz069 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="sm">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              설계복사 선택
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ069)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
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
        </DialogSection>
        <DialogFooter>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz069;
