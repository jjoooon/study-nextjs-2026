/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Grow, Gcol, Grid, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { CheckboxGroup, Checkbox } from '@uiux/Checkbox';
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
import '@/shared/lib/agGridPub';
// eslint-disable-next-line import/order
import { DialogBottomInfo } from '@common/DialogBottomInfo';

const Ltpz082 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="sm">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              65세이상 가입사유확인
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ082)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <Gcol className="border border-[var(--color-gray-15)] rounded-[.8rem] gap-0">
            <Grow
              placement="ss"
              variant="default"
              className="w-full h-[4.1rem] p-2.5 bg-[var(--color-gray-5)] rounded-t-[.8rem] gap-0"
            >
              <Typo variant="heading-md">고객님께서 이 보험을 가입하신 목적은 무엇입니까?(복수응답가능)</Typo>
            </Grow>
            <CheckboxGroup minSelected={2} onValueChange={() => {}} size="lg" value={[]} variant="default">
              <Grid className="grid-cols-2 gap-y-2 w-full px-5 py-2.5">
                {[
                  { value: 'check1', label: '사망, 진단 수술 등 보장 목적' },
                  { value: 'check2', label: '노후연금 목적' },
                  { value: 'check3', label: '목돈마련 목적' },
                  { value: 'check4', label: '상속, 증여 목적' },
                ].map((item, idx) => (
                  <Checkbox size="lg" value={item.value} key={item.label + idx}>
                    {item.label}
                  </Checkbox>
                ))}
              </Grid>
            </CheckboxGroup>
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

export default Ltpz082;
