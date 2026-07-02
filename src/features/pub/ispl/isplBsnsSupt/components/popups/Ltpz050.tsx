/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
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
              <FormCell title={'상품명'}>무배당 마은든든 계속보장암보험</FormCell>
              <FormCell title={'설계번호'}>LA141231231231</FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'계약자'}>김한화</FormCell>
              <FormCell title={'주피보험자'}>김손보</FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'모집자'} colSpan={3}>
                박한화
              </FormCell>
            </FormRow>
          </FormTable>
          <Gcol gap={2}>
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
                    <Textarea
                      placeholder="내용을 입력하세요"
                      value={'계약자의 12차월(1년)이내 미유지 계약이 직전 1년간 3건(3건이상)입니다.'}
                      readOnly
                    />
                  </Grow>
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'선별인수 사유[지점장(BM)]'}>
                  <Grow className="w-full [&>div]:w-full!" placement="ss">
                    <Textarea
                      placeholder="내용을 입력하세요"
                      value={'현재 계약은 정상 유지되고 있으면 암보험담보 추가 계약입니다.'}
                    />
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>
            <FormTable caption="부실유의계약 대상 사유" cols={['w-[10rem]', 'w-auto']} lineTop variant="default">
              <FormRow>
                <FormCell title={'부실유의계약 대상 사유'}>
                  <Grow className="w-full [&>div]:w-full!" placement="ss">
                    <Textarea
                      placeholder="내용을 입력하세요"
                      value={'계약자의 12차월(1년)이내 미유지 계약이 직전 1년간 3건(3건이상)입니다.'}
                      readOnly
                    />
                  </Grow>
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'선별인수 사유[지점장(BM)]'}>
                  <Grow className="w-full [&>div]:w-full!" placement="ss">
                    <Textarea
                      placeholder="내용을 입력하세요"
                      value={'현재 계약은 정상 유지되고 있으면 암보험담보 추가 계약입니다.'}
                    />
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            {/* 2026-05-27 버튼 추가 */}
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                인수
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                거절
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
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

export default Ltpz050;
