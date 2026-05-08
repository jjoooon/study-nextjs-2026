'use client';

import '@/shared/lib/agGridPub';

import { Grow, Typo } from '@atoms';


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




const Ltpz093 = () => {


  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              가족연계할인 안내 및 기계약 찾기
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                체결완료 계약 찾기
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                체결중 설계 찾기
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz093;
