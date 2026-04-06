'use client';
// 권오택
import * as React from 'react';
import { Divider, Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea, DialogClose } from '@uiux/Dialog';
import { Input } from '@uiux/Input';
import type { PopupBaseProps } from './types';
import { FormCell, FormRow, FormTable } from '@common/FormTable';

type CheckTab = {
  id: string;
  label: string;
  icon: string;
  active: boolean;
  state: 'green' | 'yellow' | 'red';
};

const CHECK_TABS: CheckTab[] = [
  { id: 'common', label: '공통', icon: '', active: true, state: 'green' },
  { id: 'accum', label: '누적', icon: '', active: false, state: 'red' },
  { id: 'job', label: '직업', icon: '', active: false, state: 'yellow' },
  { id: 'uw', label: 'UW', icon: '', active: false, state: 'yellow' },
];

export const LTPZ005 = ({ open, onOpenChange }: PopupBaseProps) => {

  const getStateClass = (state: CheckTab['state']) => {
    if (state === 'green') return 'bg-[#0F9D58]';
    if (state === 'red') return 'bg-[#EF4444]';
    return 'bg-[#F59E0B]';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl" >
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>꼭 확인해야 할 일</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTRZ005)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>

          <Gcol className='w-full h-full' gap={4}>
            <Grow variant={'box-info-line'} className="w-full" placement='se'>
              <Typo variant={'body-lg'}>계약체결 전 꼭 확인해야 할 사항입니다.</Typo>
              <Divider variant={'dot'} color={'gray-light'} />
              
            </Grow>
            

            <Gcol className='w-full' gap={2}>
              <Typo tag={'strong'} variant={'heading-md'}>확인사항</Typo>
              <Gcol className='w-full h-88 bg-[#FFE0E0] rounded-[0.8rem] justify-center items-center'>
                <Typo variant={'body-xl'}>기존 스타일 동일</Typo>
              </Gcol>
            </Gcol>

            <Gcol className='w-full' gap={2}>
              <Typo tag={'strong'} variant={'heading-md'}>필수지침</Typo>
              <Gcol className='w-full h-88 bg-[#FFE0E0] rounded-[0.8rem] justify-center items-center'>
                <Typo variant={'body-xl'}>기존 스타일 동일</Typo>
              </Gcol>
            </Gcol>
          </Gcol>
        </DialogSection> 

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                버튼
              </Button>
              <Button variant={'contained'} size={'xl'}>
                저장
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