/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
//* 2026-05-27 *
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';

import { Ltpa3500301 } from '../../../ncMtt/components/Ltpa3500301';

const Ltpz003 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              알릴사항 미리보기
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ003)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        {/* M1. 전체적으로 수정 */}
        <DialogSection className="grid-rows-[1fr]">
          <div className="!relative min-h-[60vh] h-full">
            <Ltpa3500301 sampleMode={true} />
          </div>
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

export default Ltpz003;
