/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { ResetIcon } from '@icons';
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
import { Input } from '@uiux/Input';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import '@/shared/lib/agGridPub';

const Ltpz09103 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              고객 직업정보(상해급수)변경안내
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ051)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round">
            <FormTable variant={'head'} lineTop={false} caption="">
              <FormRow>
                <FormCell title={'검색'}>
                  <Input width={'16rem'} value={''} />
                  <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                    조회
                  </Button>
                  <Button
                    color={'gray'}
                    only={'icon'}
                    size={'lg'}
                    variant={'outlined'}
                    onClick={() => {}}
                    aria-label="새로고침"
                  >
                    <ResetIcon />
                  </Button>
                </FormCell>
              </FormRow>
            </FormTable>
            <Grow>
              <Button color="gray" variant="outlined">
                파일추가
              </Button>
              <Button color="gray" variant="outlined">
                파일수정
              </Button>
              <Button color="gray" variant="outlined">
                파일삭제
              </Button>
            </Grow>
          </Grow>
          <Gcol className="min-h-[30rem]">
            <Grow className="w-full min-h-[30rem]" variant="box-round">
              이미지 노출
            </Grow>
          </Gcol>
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

export default Ltpz09103;
