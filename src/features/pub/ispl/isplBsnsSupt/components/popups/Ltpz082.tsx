'use client';

import { Grow, Gcol, Grid, Typo } from '@atoms';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
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
import type { PopupBaseProps } from '@/shared/types/uiTypes';

import '@/shared/lib/agGridPub';


export const Ltpz082 = ({ open, onOpenChange }: PopupBaseProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              65세이상 가입사유확인
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <TableFold className="gap-0">
            <TableFoldBody className="gap-0">
              <Gcol className="border border-[var(--color-gray-15)] rounded-[.8rem] gap-0">
                <Grow placement="ss" variant="default" className="w-full h-[4.1rem] p-2.5 bg-[var(--color-gray-5)] rounded-t-[.8rem] gap-0">
                  <Typo variant="heading-md">고객님께서 이보험을 가입하신 목적은 무엇입니다?(복수 응답가능)</Typo>
                </Grow>
                <CheckboxGroup
                  color="primary"
                  errorMsg="2개 이상 선택해 주세요."
                  errorPs="bl"
                  minSelected={2}
                  onValueChange={() => {}}
                  size="lg"
                  value={[]}
                  variant="default"
                >
                  <Grid className="grid-cols-2 gap-y-2 w-full px-5 py-2.5">
                    {[ 
                      '사망,진단 수술 등 보장 목적',
                      '노후연금목적',
                      '목돈마련 목적',
                      '상속,증여목적' 
                    ].map((label, idx) => (
                    <Checkbox size="lg" value={`chk${idx + 1}`} key={label + idx}>
                      {label}
                    </Checkbox>
                  ))}
                  </Grid>
                </CheckboxGroup>
              </Gcol>
            </TableFoldBody>
          </TableFold>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
