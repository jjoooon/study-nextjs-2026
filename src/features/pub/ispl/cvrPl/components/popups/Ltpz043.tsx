/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InfoBox } from '@common/InfoBox';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';

const Ltpz043 = () => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
    type07: '',
    type08: '',
  });

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              주차장배상책임
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ043)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol className="w-full" gap={5}>
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable variant={'head'} lineTop={false} caption="">
                <FormTable variant="none" cols={['w-1', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'설계번호'} tdClassName="grid grid-cols-[auto_1fr] items-center gap-1 w-full">
                      <Input aria-label="" width={130} value={'LA26020945959594'} readOnly />
                      <Input aria-label="" value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
                    </FormCell>
                  </FormRow>
                </FormTable>
              </FormTable>
            </Grow>

            <FormTable caption="주차장 정보" cols={['w-[8rem]', 'w-[8rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'옥내주차장'} titleColSpan={2}>
                  <Checkbox variant="noneText" aria-label="옥내주차장"></Checkbox>
                  <Input
                    errorMsg="입력은 필수입니다."
                    errorPs="bl"
                    onChange={(e) => setFormField('type01', e.target.value)}
                    value={form.type01}
                    width={100}
                    commaAmount
                  />
                  <div>㎡</div>
                  <div>↔</div>
                  <Input
                    errorMsg="입력은 필수입니다."
                    errorPs="bl"
                    onChange={(e) => setFormField('type02', e.target.value)}
                    value={form.type02}
                    width={100}
                    commaAmount
                  />
                  평
                </FormCell>
                <FormCell title={null}>
                  <Input onChange={() => {}} value={'10,000,000'} width={120} commaAmount readOnly />원
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'2단주차기'} titleColSpan={2}>
                  <Checkbox variant="noneText" aria-label="2단주차기"></Checkbox>
                  <Input
                    errorMsg="입력은 필수입니다."
                    errorPs="bl"
                    onChange={(e) => setFormField('type03', e.target.value)}
                    value={form.type03}
                    width={100}
                    commaAmount
                  />
                  대
                </FormCell>
                <FormCell title={null}>
                  <Input onChange={() => {}} value={'10,000,000'} width={120} commaAmount readOnly />원
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'기계식주차기'} titleColSpan={2}>
                  <Checkbox variant="noneText" aria-label="기계식주차기"></Checkbox>
                  <Input
                    errorMsg="입력은 필수입니다."
                    errorPs="bl"
                    onChange={(e) => setFormField('type04', e.target.value)}
                    value={form.type04}
                    width={100}
                    commaAmount
                  />
                  대
                </FormCell>
                <FormCell title={null}>
                  <Input onChange={() => {}} value={'10,000,000'} width={120} commaAmount readOnly />원
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'카리프트'} titleColSpan={2}>
                  <Checkbox variant="noneText" aria-label="카리프트"></Checkbox>
                  <Input
                    errorMsg="입력은 필수입니다."
                    errorPs="bl"
                    onChange={(e) => setFormField('type05', e.target.value)}
                    value={form.type05}
                    width={100}
                    commaAmount
                  />
                  대
                </FormCell>
                <FormCell title={null}>
                  <Input onChange={() => {}} value={'10,000,000'} width={120} commaAmount readOnly />원
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'보상한도'} titleRowSpan={2} tdNone={true}></FormCell>
                <FormCell title={'대인보상'}>
                  (1사고당)
                  <NativeSelect
                    aria-label="선택"
                    width={100}
                    value={form.type06}
                    required
                    onChange={(e) => setFormField('type06', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type06-1', label: '선택1' },
                      { value: 'selection2', id: 'type06-2', label: '선택2' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  (1인장)
                  <Input onChange={() => {}} size="lg" value={''} variant="default" width={100} readOnly />
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'대물보상'} colSpan={2}>
                  (1사고당)
                  <NativeSelect
                    aria-label="선택"
                    width={100}
                    value={form.type07}
                    required
                    onChange={(e) => setFormField('type07', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type07-1', label: '선택1' },
                      { value: 'selection2', id: 'type07-2', label: '선택2' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'공제금액'} titleColSpan={2} colSpan={2}>
                  <NativeSelect
                    aria-label="선택"
                    width={100}
                    value={form.type08}
                    required
                    onChange={(e) => setFormField('type08', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type08-1', label: '선택1' },
                      { value: 'selection2', id: 'type08-2', label: '선택2' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
              </FormRow>
            </FormTable>
            <InfoBox
              bg
              subTitle="해당업종의 면적은 ㎡단위(1평=3.3㎡)로 입력하시기 바랍니다."
              variant="warning"
            ></InfoBox>
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

export default Ltpz043;
