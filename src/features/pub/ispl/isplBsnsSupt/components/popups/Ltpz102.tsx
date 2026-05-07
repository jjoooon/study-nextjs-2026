'use client';

import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Gcol, Grow, Typo } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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
import '@/shared/lib/agGridPub';

export const Ltpz102 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              철회알림특전송
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ102)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol className="w-full" placement={'bwe'} gap={2}>
            <FormTable variant={'default'} lineTop caption="고객명 정보 테이블" cols={['w-[18rem]', 'flex-1']}>
              <FormRow>
                <FormCell title={'고객명'}>
                  <Input width="full" value="김한화" readOnly />
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'고객 휴대폰번호'}>
                  <Input aria-label="고객 휴대폰번호 입력" width="full" placeholder="" />
                </FormCell>
              </FormRow>
            </FormTable>
            <Gcol className="w-full" placement="ss" variant="box-info">
              <Typo icon="info" variant="body-sm">
                철회알림톡 전송을 위한 팝업입니다.
              </Typo>
            </Gcol>
          </Gcol>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                발송하기
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

export default Ltpz102;
