'use client';

import { useFormFields } from '@/shared/hooks/useFormFields';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InfoBox } from '@common/InfoBox';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
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

export const Ltpz041 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              개인사업자 정보 등록
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ041)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <TableFold>
            <TableFoldHead title="개인사업자정보" />
            <TableFoldBody>
              <Gcol>
                <FormTable caption="사업자" cols={['w-[14rem]', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'사업자명'}>
                      <Input value={form.type01} onChange={(e) => setFormField('type01', e.target.value)} readOnly />
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'사업자번호'}>
                      <Input value={form.type02} onChange={(e) => setFormField('type02', e.target.value)} readOnly />
                    </FormCell>
                  </FormRow>
                </FormTable>

                <InfoBox
                  subTitle="개인사업자정보는 계약자의 보조정보로 계약자는 대표자인 개인으로 함"
                  variant="info"
                ></InfoBox>
                <InfoBox
                  subTitle="계약자와 개인사업자의 대표자가 동일한 경우만 입력 가능(사업자등록증 스캔 필수)"
                  variant="info"
                ></InfoBox>
              </Gcol>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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
