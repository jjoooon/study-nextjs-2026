'use client';

import * as React from 'react';
import { useRef, useState } from 'react';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea } from '@uiux/Dialog';

import { Input } from '@uiux/Input';


import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';
import { InfoBox } from '@/shared/components/common/InfoBox';
import type { PopupBaseProps } from './types';
ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPA401P = ({ open, onOpenChange }: PopupBaseProps) => {


  // const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
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
            <FormTable
              variant={'head'}
              lineTop={false}
              caption=""
            >
              <FormRow>
                <FormCell title={'설계접수번호'}>
                  LA260209313558
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <Gcol placement="ss" className="w-full" gap={5}>
            <TableFold>
              <TableFoldHead title="요청내용"></TableFoldHead>
              <TableFoldBody>
                <Grow className="w-full">
                  <FormTable
                    caption="피보험자의 위험정보 테이블"
                    cols={['w-[12rem]', 'flex-1', 'w-[12rem]', 'flex-1', 'w-[12rem]', 'flex-1']}
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
                      <FormCell title={'플랜'}>&nbsp;</FormCell>
                      <FormCell title={'희망보험료'}>5만원이하</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'계약자명'}>박한화</FormCell>
                      <FormCell title={'계약자 생년월일'}>2000-01-01</FormCell>
                      <FormCell title={''}>&nbsp;</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'피보험자'}>박한화</FormCell>
                      <FormCell title={'피보험자 생년월일'}>2000-01-01</FormCell>
                      <FormCell title={'상해급수'}>3급</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'기타요청내용'} colSpan={5}>text</FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>
              </TableFoldBody>
            </TableFold>

            <TableFold>
              <TableFoldHead title="처리결과" />
              <TableFoldBody>
                <Gcol className="w-full" gap={5}>
                  <Grow className="w-full">
                    <FormTable caption="처리결과 등록 테이블" cols={['w-[12rem] flex-1']}>
                      <FormRow>
                        <FormCell title={'처리결과'}>
                          <RadioGroup
                            className="gap-2"
                            errorMsg="하나를 선택해주세요."
                            errorPs="bl"
                            onValueChange={() => { }}
                            width="full"
                          >
                            <RadioGroupItem
                              id="result1"
                              value="option1"
                              checked={true}
                            >
                              설계완료
                            </RadioGroupItem>
                            <RadioGroupItem
                              id="result2"
                              value="option2"
                            >
                              반려
                            </RadioGroupItem>
                          </RadioGroup>
                        </FormCell>
                      </FormRow> 
                      <FormRow>
                        <FormCell title={'설계번호'}>
                          <Input
                            placeholder=""
                            value=""
                            width="20rem"
                            readOnly
                          />
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title={'메모'}>
                          <Input
                            placeholder=""
                            value=""
                            readOnly
                          />
                        </FormCell>
                      </FormRow>
                    </FormTable>
                  </Grow>
                 <InfoBox
                    title="처리결과 저장 시, 신청하신 분께 알림톡이 발송되오니 참고 바랍니다."
                    variant={'info'}
                    bg={false}
                  >
                  </InfoBox>
                </Gcol>
                
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
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                닫기
              </Button>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LTPA401P;
