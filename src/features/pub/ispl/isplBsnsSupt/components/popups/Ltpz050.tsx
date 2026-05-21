/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
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
import { Textarea } from '@uiux/Textarea';
import * as React from 'react';

const Ltpz050 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              부실유의계약 선별인수 확인서
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ050)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <FormTable
            caption="부실유의계약 선별인수 확인서"
            cols={['w-[9rem]', 'w-auto', 'w-[9rem]', 'w-auto']}
            lineTop
            variant="default"
          >
            <FormRow>
              <FormCell title={'상품명'}>Text</FormCell>
              <FormCell title={'설계번호'}>Text</FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'계약자'}>Text</FormCell>
              <FormCell title={'주피보험자'}>Text</FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'모집자'} colSpan={3}>
                Text
              </FormCell>
            </FormRow>
          </FormTable>
          <Gcol>
            <Gcol variant="box-warning" className="w-full" placement="ss">
              <Typo variant={'body-sm'} icon={'warning'}>
                부실유의계약 해당 항목
              </Typo>
              <Typo variant={'body-lg'} weight={'bold'}>
                단 사유 입력시 DB 암호화 정책에 의거 개인정보 입력불가
              </Typo>
            </Gcol>

            <FormTable caption="부실유의계약 대상 사유" cols={['w-[10rem]', 'w-auto']} lineTop variant="default">
              <FormRow>
                <FormCell title={'부실유의계약 대상 사유'}>
                  <Grow className="w-full [&>div]:w-full!" placement="ss">
                    <Textarea placeholder="내용을 입력하세요" showMinLengthCount readOnly />
                  </Grow>
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'선별인수 사유[지점장(BM)]'}>
                  <Grow className="w-full [&>div]:w-full!" placement="ss">
                    <Textarea placeholder="내용을 입력하세요" showMinLengthCount />
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>
            <FormTable caption="부실유의계약 대상 사유" cols={['w-[10rem]', 'w-auto']} lineTop variant="default">
              <FormRow>
                <FormCell title={'부실유의계약 대상 사유'}>
                  <Grow className="w-full [&>div]:w-full!" placement="ss">
                    <Textarea placeholder="내용을 입력하세요" showMinLengthCount readOnly />
                  </Grow>
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'선별인수 사유[지점장(BM)]'}>
                  <Grow className="w-full [&>div]:w-full!" placement="ss">
                    <Textarea placeholder="내용을 입력하세요" showMinLengthCount />
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>
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

export default Ltpz050;
