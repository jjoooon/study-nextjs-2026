'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
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


export const Ltpz025 = ({ open, onOpenChange }: PopupBaseProps) => {
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              [심평원] 진료정보 조회도의 알림톡발송 및 이력관리
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ025)
             </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
           <Typo variant={'body-lg'}>심사평가원 동의를 위한 알림톡을 발송합니다.</Typo>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  아니오
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
