/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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
import { Input } from '@uiux/Input';

import Ltpz01601 from './Ltpz01601';
import Ltpz01602 from './Ltpz01602';
import Ltpz01603 from './Ltpz01603';
import Ltpz01608 from './Ltpz01608';
import Ltpz01609 from './Ltpz01609';
import Ltpz01610 from './Ltpz01610';

import '@/shared/lib/agGridPub';

const Ltpz016 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              설계담보상세정보등록
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ016)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable variant="none" cols={['w-1', 'w-auto']}>
              <FormRow>
                <FormCell
                  title={'설계번호'}
                  tdClassName="grid grid-cols-[auto_auto_auto_1fr] items-center gap-1 w-full"
                >
                  <Input aria-label="" width={'quoteNo'} value={'LA123456789012'} readOnly />
                  -
                  <Input aria-label="" width={26} value={'1'} readOnly />
                  <Input aria-label="" value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} variant="info" readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          {/* Ltpz01608 */}
          <Ltpz01608 />

          {/* Ltpz01609 */}
          <Ltpz01609 />

          {/* Ltpz01610 */}
          <Ltpz01610 />

          {/* ltpz01601 */}
          <Ltpz01601 />

          {/* ltpz01602 */}
          <Ltpz01602 />

          {/* ltpz01603 */}
          <Ltpz01603 />
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
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

export default Ltpz016;
