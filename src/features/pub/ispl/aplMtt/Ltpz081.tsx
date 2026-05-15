/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
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

const Ltpz081 = () => {

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="sm" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              영수증 발행
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="w-full">
          <FormTable caption="영수증 ">
            <FormRow>
              <FormCell title={'영수증선택'}>
                <NativeSelect aria-label="업무구분1 선택">
                  {[
                    { value: '영수증발행안함', label: '영수증발행안함' },
                    { value: '전자영수증', label: '전자영수증' },
                    { value: '수기영수증', label: '수기영수증' },
                  ].map((option) => (
                    <NativeSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'영수증번호'}>
                <Input aria-label="" error errorMsg="영수증 번호가 규칙에 맞지 않습니다." errorPs="tl" width={'full'} value={''} />
              </FormCell>
            </FormRow>
          </FormTable>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                영수증재발행
              </Button>
              <Button variant={'contained'} size={'xl'}>
                영수증 발행
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

export default Ltpz081;
