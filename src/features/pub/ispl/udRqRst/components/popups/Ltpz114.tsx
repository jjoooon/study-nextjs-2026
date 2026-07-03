/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Typo } from '@atoms';

import { Dialog, DialogContent, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';
import { Ltpa35004 } from '../Ltpa35004';

import '@/shared/lib/agGridPub';

const Ltpz114 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              심사요청
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ114)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[1fr] gap-3">
          <Ltpa35004 />
        </DialogSection>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz114;
