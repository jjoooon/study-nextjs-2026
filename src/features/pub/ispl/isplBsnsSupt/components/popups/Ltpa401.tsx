/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
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
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';

const Ltpa401 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              GA대리점 설계 지원_상세조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA401)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable variant={'head'} lineTop={false}>
              <FormRow>
                <FormCell title={'설계접수번호'}>
                  <Input aria-label="" value={'LA260209313558'} readOnly variant="info" />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <Gcol placement="ss" gap={3}>
            <TableFold>
              <TableFoldHead title="요청내용" />
              <TableFoldBody>
                <FormTable
                  caption="피보험자의 위험정보 테이블"
                  cols={['w-[12rem]', 'w-auto', 'w-[12rem]', 'w-auto', 'w-[12rem]', 'w-auto']}
                >
                  <FormRow>
                    <FormCell title={'접수번호'}>26012723081</FormCell>
                    <FormCell title={'진행상태'}>처리중</FormCell>
                    <FormCell title={''}></FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'요청자사번'}>8012345</FormCell>
                    <FormCell title={'요청자명'}>김한화</FormCell>
                    <FormCell title={'요청자 휴대폰번호'}>010-1234-1234</FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'상품(상품유형)'}>운전자보험</FormCell>
                    <FormCell title={'플랜'}></FormCell>
                    <FormCell title={'희망보험료'}>5만원이하</FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'계약자명'}>박한화</FormCell>
                    <FormCell title={'계약자 생년월일'}>2000-01-01</FormCell>
                    <FormCell title={''}></FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'피보험자명'}>박한화</FormCell>
                    <FormCell title={'피보험자 생년월일'}>2000-01-01</FormCell>
                    <FormCell title={'상해급수'}>3급</FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'기타요청내용'} colSpan={5}>
                      text
                    </FormCell>
                  </FormRow>
                </FormTable>
              </TableFoldBody>
            </TableFold>

            <TableFold>
              <TableFoldHead title="처리결과 등록" />
              <TableFoldBody className="gap-2">
                <FormTable caption="처리결과 등록 테이블" cols={['w-[12rem] flex-1']}>
                  <FormRow>
                    <FormCell title={'처리결과'}>
                      <RadioGroup className="gap-3" defaultValue="" onValueChange={() => {}} width="full">
                        {[
                          { id: 'option1', label: '설계완료' },
                          { id: 'option2', label: '반려' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} id={option.id} value={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'설계번호'}>
                      <Input readOnly />
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'메모'}>
                      <Input readOnly />
                    </FormCell>
                  </FormRow>
                </FormTable>
                <Grow variant="box-info" placement="ss">
                  <Typo icon={'info'}>처리결과 저장 시, 신청하신 분께 알림톡이 발송되오니 참고 바랍니다.</Typo>
                </Grow>
              </TableFoldBody>
            </TableFold>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
                처리결과저장
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

export default Ltpa401;
