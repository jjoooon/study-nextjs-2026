/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { Gcol, Grow, Typo } from '@atoms';
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
import * as React from 'react';

const Ltpa073 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              신용정보조회 인증처리
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA073)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable variant={'head'} lineTop={false} caption="인증번호">
              <FormRow>
                <FormCell title={'인증번호'}>
                  <Input variant={'info'} value={''} />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Gcol variant={'box-warning'} placement={'ss'} className="w-full">
            <Typo variant={'body-sm'} icon={'warning'}>
              고객에게 전달받은 인증번호 입력 후 [확인] 버튼을 누르세요.
            </Typo>
          </Gcol>
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

export default Ltpa073;
