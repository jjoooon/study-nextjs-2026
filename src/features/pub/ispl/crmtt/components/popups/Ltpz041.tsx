/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Typo } from '@atoms';
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
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';

const Ltpz041 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xs">
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

        <DialogSection>
          <TableFold>
            <TableFoldHead title="개인사업자정보" />
            <TableFoldBody>
              <Gcol gap={2}>
                <FormTable caption="사업자" cols={['w-[9rem]', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'사업자명'}>
                      <Input value={'김한화'} readOnly />
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'사업자번호'}>
                      <Input value={'123-45-67890'} readOnly />
                    </FormCell>
                  </FormRow>
                </FormTable>

                <Gcol className="w-full" placement="ss" variant="box-info">
                  <Typo icon="info" variant="body-sm">
                    개인사업자정보는 계약자의 보조정보로 계약자는 대표자인 개인으로 함
                  </Typo>
                  <Typo icon="info" variant="body-sm">
                    계약자와 개인사업자의 대표자가 동일한 경우만 입력 가능(사업자등록증 스캔 필수)
                  </Typo>
                </Gcol>
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

export default Ltpz041;
