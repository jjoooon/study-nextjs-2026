'use client';

import { Grow, Typo } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';
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

export const Ltpz101 = () => {

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              철회 사유입력
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ101)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" placement={'bwe'}>
            <FormTable
              variant={'default'}
              lineTop
              caption="주민등록번호 오입력"
              cols={['w-[18rem]', 'flex-1']}
            >
              <FormRow>
                <FormCell title={
                  <div className="flex items-center gap-2">
                    <RadioGroup>
                      <RadioGroupItem value="resident-rdo" id="resident-rdo" />
                    </RadioGroup>
                    <span>주민등록번호 오입력</span>
                  </div>
                }>
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={
                  <div className="flex items-center gap-2">
                    <RadioGroup>
                      <RadioGroupItem value="customer-rdo" id="customer-rdo" />
                    </RadioGroup>
                    <span>고객요청(사유작성)</span>
                  </div>
                }>
                  <Input width="full" value="" />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
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

export default Ltpz101;