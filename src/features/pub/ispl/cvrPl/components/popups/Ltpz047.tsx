/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Grow, Typo } from '@atoms';
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
import { EssentialIcon } from '@/shared/components/icons/CommonIcons';
import { useFormFields } from '@/shared/hooks/useFormFields';

const Ltpz047 = () => {
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
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
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
        <DialogSection>
          <Grow className="w-full" variant="box-round">
            <FormTable variant={'head'} lineTop={false} caption="">
              <FormTable variant="none" cols={['w-1', 'w-auto']}>
                <FormRow>
                  {/* 2027-05-27 input 수정 */}
                  <FormCell title={'설계번호'} tdClassName="grid grid-cols-[auto_1fr] items-center gap-1 w-full">
                    <Input aria-label="" variant="info" width={130} value={'LA26020945959594'} readOnly />
                    <Input aria-label="" variant="info" value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
            </FormTable>
          </Grow>
          <Grow className="w-full">
            <FormTable caption="화재배상" cols={['w-[7rem]', 'w-[10rem]', 'w-auto', 'w-[10rem]', 'w-auto']}>
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
                    value={form.type02}
                    width={100}
                    commaAmount
                    required
                  />
                  <div>㎡</div>
                  <div>↔</div>
                  <Input
                    errorMsg="입력은 필수입니다."
                    errorPs="bl"
                    onChange={(e) => setFormField('type03', e.target.value)}
                    value={form.type03}
                    width={100}
                    commaAmount
                    required
                  />
                  평
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'보상한도'} titleRowSpan={2} tdNone={true}></FormCell>
                <FormCell title={'대인(1인당)'} colSpan={2}>
                  <Input
                    errorMsg="입력은 필수입니다."
                    errorPs="bl"
                    onChange={(e) => setFormField('type04', e.target.value)}
                    value={form.type04}
                    width={220}
                    readOnly
                    required
                  />
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'대인(1사고당)'} colSpan={4}>
                  <NativeSelect
                    aria-label="선택"
                    width={100}
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
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell
                  title={
                    <Grow placement="sc">
                      <span>종업원담보업종</span>
                      <EssentialIcon />
                    </Grow>
                  }
                  titleColSpan={2}
                  colSpan={4}
                ></FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'할인율'} titleColSpan={2} colSpan={4}>
                  <Input
                    onChange={(e) => setFormField('type07', e.target.value)}
                    value={form.type07}
                    width={220}
                    readOnly
                  />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
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

export default Ltpz047;
