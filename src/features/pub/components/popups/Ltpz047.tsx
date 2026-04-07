'use client';
// 권오택
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpz047 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
    type07: '',
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              화재배상책임 추가속성
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ047)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol className="w-full" gap={5}>
            <Grow className="w-full" variant="box-round">
              <FormTable variant={'head'} lineTop={false} caption="">
                <FormRow>
                  <FormCell title={'설계번호'}>
                    <Typo color="default" tag="span" variant="body-lg" weight="bold">
                      LA123123123123
                    </Typo>
                    <Typo color="default" tag="span" variant="body-lg" weight="bold">
                      설계번호의 상품명 text
                    </Typo>
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
            <Grow className="w-full">
              <FormTable caption="화재배상" cols={['w-[10rem]', 'w-[10rem]', 'w-auto', 'w-[15rem]', 'w-auto']}>
                <FormRow>
                  <FormCell title={'업주성명(법인명)'} titleColSpan={2}>
                    <Input size="lg" value="" variant="default" width="18rem" readOnly />
                  </FormCell>
                  <FormCell title={'주민/법인번호'}>
                    <Input size="lg" value="______-_______" variant="default" width="11rem" readOnly />
                    <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                      의무가입대상조회
                    </Button>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'기본주소'} titleColSpan={2} colSpan={4}>
                    <Input size="lg" value="" variant="default" width="full" readOnly />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'상세주소'} titleColSpan={2} colSpan={4}>
                    <Input size="lg" value="" variant="default" width="full" readOnly />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'전체주소'} titleColSpan={2} colSpan={4}>
                    <Input size="lg" value="" variant="default" width="full" readOnly />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'다중이용업소 일련번호'} titleColSpan={2}>
                    <Input size="lg" value="__-___-____" variant="default" width="18rem" before={'MU-'} />
                  </FormCell>
                  <FormCell title={'상호'}>
                    <Input size="lg" value="" variant="default" width="18rem" />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'업종구분코드'} titleColSpan={2} colSpan={4}>
                    <NativeSelect
                      aria-label="선택"
                      width="10rem"
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type01-1', label: '선택1' },
                        { value: 'selection2', id: 'type01-2', label: '선택2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'영업장면적'} titleColSpan={2} colSpan={4}>
                    <Input
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      onChange={(e) => setFormField('type02', e.target.value)}
                      size="lg"
                      value={form.type02}
                      variant="default"
                      width="10rem"
                      commaAmount
                      after={'㎡'}
                      required
                    />
                    ↔
                    <Input
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      onChange={(e) => setFormField('type03', e.target.value)}
                      size="lg"
                      value={form.type03}
                      variant="default"
                      width="10rem"
                      commaAmount
                      after={'평'}
                      required
                    />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'보상한도'} titleRowSpan={2}></FormCell>
                  <FormCell title={'대인(1인당)'} colSpan={2}>
                    <Input
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      onChange={(e) => setFormField('type04', e.target.value)}
                      size="lg"
                      value={form.type04}
                      variant="default"
                      width="22rem"
                      readOnly
                      required
                    />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'대인(1사고당)'} colSpan={4}>
                    <NativeSelect
                      aria-label="선택"
                      width="10rem"
                      value={form.type05}
                      required
                      onChange={(e) => setFormField('type05', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type05-1', label: '선택1' },
                        { value: 'selection2', id: 'type05-2', label: '선택2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'종업원담보여부'} titleColSpan={2} colSpan={4}>
                    <NativeSelect
                      aria-label="선택"
                      width="10rem"
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
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'종업원담보업종'} titleColSpan={2} colSpan={4}></FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'할인율'} titleColSpan={2} colSpan={4}>
                    <Input
                      onChange={(e) => setFormField('type07', e.target.value)}
                      size="lg"
                      value={form.type07}
                      variant="default"
                      width="20rem"
                      readOnly
                    />
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
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
