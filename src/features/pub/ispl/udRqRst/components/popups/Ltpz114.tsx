/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useState } from 'react';
import { Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';

import { Button } from '@uiux/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';
import { Ltpa35004 } from '../Ltpa35004';

import '@/shared/lib/agGridPub';

const Ltpz114 = () => {
  const handleClose = () => {
    console.log(11111111);
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent showCloseButton resizable={true} size="2xl">
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
        <DialogSection className="grid-rows-[1fr] gap-3 Ltpz114">
          <Ltpa35004 />
        </DialogSection>
        <DialogFooter>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz114;
