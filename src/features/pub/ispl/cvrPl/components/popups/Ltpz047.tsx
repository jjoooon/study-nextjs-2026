/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useFormFields } from '@/shared/hooks/useFormFields';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { EssentialIcon } from '@icons';
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

const Ltpz047 = () => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
    type07: '',
    type08: '', // 2026-05-28 추가
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
        <DialogSection className="grid-rows-[auto_1fr] items-start">
          <Grow className="w-full" variant="box-round">
            <FormTable variant={'head'} lineTop={false} caption="">
              <FormTable variant="none" cols={['w-1', 'w-auto']}>
                <FormRow>
                  {/* 2026-05-27 variant 추가 */}
                  <FormCell title={'설계번호'} tdClassName="grid grid-cols-[auto_1fr] items-center gap-1 w-full">
                    <Input aria-label="" variant="info" width={130} value={'LA123456789012'} readOnly />
                    <Input aria-label="" variant="info" value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
            </FormTable>
          </Grow>
          <Gcol className="w-full">
            <FormTable caption="화재배상" cols={['w-[7.4rem]', 'w-[11.5rem]', 'w-auto', 'w-[11.5rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'업주성명(법인명)'} titleColSpan={2}>
                  <Input size="lg" value="" variant="default" width="13rem" readOnly />
                </FormCell>
                <FormCell title={'주민/법인번호'}>
                  <Input size="lg" value="______-_______" variant="default" width="10rem" readOnly />
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
                  <Input size="lg" value="__-___-____" variant="default" width="14rem" before={'MU-'} />
                </FormCell>
                <FormCell title={'상호'}>
                  <Input size="lg" value="" variant="default" width="14rem" />
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell
                  title={'업종구분코드'}
                  titleColSpan={2}
                  colSpan={
                    ['selection2', 'selection3', 'selection4', 'selection5', 'selection6'].includes(form.type01)
                      ? undefined
                      : 4
                  }
                >
                  <NativeSelect
                    aria-label="선택"
                    width="10rem"
                    value={form.type01}
                    onChange={(e) => setFormField('type01', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type01-1', label: '선택1' },
                      { value: 'selection2', id: 'type01-2', label: '게임제공업(005)' },
                      { value: 'selection3', id: 'type01-3', label: '인터넷컴퓨터게임시설제공업(006)' },
                      { value: 'selection4', id: 'type01-4', label: '복합유통게임제공업(014)' },
                      { value: 'selection5', id: 'type01-5', label: '영화상영관(008)' },
                      { value: 'selection6', id: 'type01-6', label: '고시원(016)' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
                {/* 게임제공업(005), 인터넷컴퓨터게임시설제공업(006), 복합유통게임제공업(014) 인 경우 */}
                {['selection2', 'selection3', 'selection4'].includes(form.type01) && (
                  <FormCell title={'대수'}>
                    <Input size="lg" value="" variant="default" width="18rem" required placeholder="0" commaAmount />
                  </FormCell>
                )}
                {/* 영화상영관(008) 인 경우 */}
                {form.type01 === 'selection5' && (
                  <FormCell title={'좌석수'}>
                    <Input size="lg" value="" variant="default" width="18rem" required />
                  </FormCell>
                )}
                {/* 고시원(016) 인 경우 */}
                {form.type01 === 'selection6' && (
                  <FormCell title={'객실수'}>
                    <Input size="lg" value="" variant="default" width="18rem" required />
                  </FormCell>
                )}
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
                <FormCell
                  title={
                    <Grow placement="sc">
                      대인(1인당)
                      <EssentialIcon />
                    </Grow>
                  }
                  colSpan={4}
                >
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
                      { value: 'selection', id: 'type06-1', label: '선택' },
                      { value: 'selection2', id: 'type06-2', label: '종업원담보' },
                      { value: 'selection3', id: 'type06-3', label: '종업원부담보' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
              </FormRow>
              <FormRow>
                {/* 2026-05-27 EssentialIcon 아이콘 삭제 */}
                <FormCell
                  title={
                    <Grow placement="sc">
                      <span>종업원담보업종</span>
                    </Grow>
                  }
                  titleColSpan={2}
                  colSpan={4}
                >
                  {/* 2026-05-27 select 추가 */}
                  {form.type06 === 'selection3' && (
                    <NativeSelect
                      aria-label="선택"
                      width={360}
                      value={form.type07}
                      required
                      onChange={(e) => setFormField('type07', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type07-1', label: '일반건물(사무실 전용)' },
                        {
                          value: 'selection2',
                          id: 'type07-2',
                          label: '관광숙박업, 숙박업, 병원, 방송사업을 하는 건물',
                        },
                        {
                          value: 'selection3',
                          id: 'type07-3',
                          label: '음식점(휴게, 일반), 유흥음식점(단란주점포함), 학교, 학원',
                        },
                        { value: 'selection4', id: 'type07-4', label: '공연장, 대규모점포, 농수산물도매시장' },
                        { value: 'selection5', id: 'type07-5', label: '상기이외의 일반물건' },
                        { value: 'selection6', id: 'type07-6', label: '공장물건' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  )}
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'할인율'} titleColSpan={2} colSpan={4}>
                  <Input
                    onChange={(e) => setFormField('type08', e.target.value)}
                    value={form.type08}
                    width={60}
                    readOnly
                  />
                </FormCell>
              </FormRow>
            </FormTable>
            <Gcol className="w-full" placement="ss" variant="box-detail">
              <Typo icon="detail" variant="body-sm">
                해당업종의 면적은 ㎡단위(1평=3.3㎡)로 입력하시기 바랍니다.
              </Typo>
              <Typo icon="detail" variant="body-sm" className="text-[var(--color-danger-50)]">
                화재배상 의무가입 대상은 화재배상책임Ⅲ(무과실책임포함,다중이용업소)를 가입하시기 바랍니다.
              </Typo>
              <Typo icon="detail" variant="body-sm">
                &quot;다중이용업소의 안전관리에 관한 특별법&quot;에 따라 가입하는 경우
                <span className="text-[var(--color-danger-50)]"> 다중이용업소 일련번호를 반드시 입력</span>하시기
                바랍니다.(다중이용업소의 화재배상책임보험 가입의무 규정)
              </Typo>
              <Typo icon="detail" variant="body-sm">
                다중이용업소 일련번호가 등록된 경우 계약체결시 가입정보가 국민안전처로 통보됩니다.
              </Typo>
            </Gcol>
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

export default Ltpz047;
