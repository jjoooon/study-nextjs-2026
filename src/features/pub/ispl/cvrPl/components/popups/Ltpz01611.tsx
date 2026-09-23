/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { EssentialIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

const Ltpz01611 = () => {
  const [form, setFormField] = useFormFields({
    type01: 'selection',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
    type07: '',
    type08: '', // 2026-05-28 추가
  });
  return (
    <TableFold>
      <TableFoldHead title="재난배상책임(화재/붕괴/폭발)" />
      <TableFoldBody className="gap-2">
        <FormTable caption="화재배상" cols={['w-[9.4rem]', 'w-[11rem]', 'w-[11.5rem]', 'w-[11.5rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={'재난배상책임 가입관리코드'} titleColSpan={2}>
              <Input size="lg" value="" variant="default" width="18rem" readOnly />
              <Button variant={'outlined'}>가입관리코드조회</Button>
            </FormCell>
            <FormCell title={'상호(건물명)'}>
              <Input size="lg" value="" variant="default" width="24rem" />
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'업종구분코드'} titleColSpan={2} colSpan={4}>
              <NativeSelect
                aria-label="선택"
                width={290}
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '숙박시설 (여관, 여인숙, 유스호스텔 등)1' },
                  { value: 'selection2', id: 'type01-2', label: '편의점' },
                  { value: 'selection3', id: 'type01-2', label: '아파트' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {form.type01 === 'selection' && (
                <Checkbox color="primary" size="md" variant="default">
                  농어촌민박여부
                </Checkbox>
              )}
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell
              title={
                <Grow placement="sc">
                  영업장면적 (옥외시설 면적 포함)
                  <EssentialIcon />
                </Grow>
              }
              titleColSpan={2}
              colSpan={4}
            >
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
              <NativeSelect aria-label="보상한도 선택" width={'auto'} required>
                {[
                  { value: 1, label: '대인 1인당 1천만원. 1사고당 5천만원' },
                  { value: 2, label: '대인 1인당 1억. 1사고당 10억' },
                ].map((option, idx) => (
                  <NativeSelectOption key={idx} value={option.value}>
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
                  대인(1사고당)
                  <EssentialIcon />
                </Grow>
              }
              colSpan={4}
            >
              <NativeSelect
                aria-label="선택"
                width={100}
                value={form.type04}
                required
                onChange={(e) => setFormField('type04', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type04-1', label: '1억' },
                  { value: 'selection2', id: 'type04-2', label: '10억' },
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
                  종업원담보여부
                  <EssentialIcon />
                </Grow>
              }
              titleColSpan={2}
              colSpan={4}
            >
              <NativeSelect
                aria-label="선택"
                width={100}
                value={form.type01 === 'selection3' ? 'selection' : form.type05}
                disabled={form.type01 === 'selection3'}
                required
                onChange={(e) => setFormField('type05', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type05-1', label: '선택' },
                  { value: 'selection2', id: 'type05-2', label: '종업원담보' },
                  { value: 'selection3', id: 'type05-3', label: '종업원부담보' },
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
                  종업원부담보업종
                  <EssentialIcon />
                </Grow>
              }
              titleColSpan={2}
              colSpan={4}
            >
              {/* 2026-05-27 select 추가 */}
              {form.type05 === 'selection3' && (
                <NativeSelect
                  aria-label="선택"
                  width={360}
                  value={form.type06}
                  required
                  onChange={(e) => setFormField('type06', e.target.value)}
                >
                  {[
                    { value: 'selection', id: 'type06-1', label: '일반건물(사무실 전용)' },
                    {
                      value: 'selection2',
                      id: 'type06-2',
                      label: '관광숙박업, 숙박업, 병원, 방송사업을 하는 건물',
                    },
                    {
                      value: 'selection3',
                      id: 'type06-3',
                      label: '음식점(휴게, 일반), 유흥음식점(단란주점포함), 학교, 학원',
                    },
                    { value: 'selection4', id: 'type06-4', label: '공연장, 대규모점포, 농수산물도매시장' },
                    { value: 'selection5', id: 'type06-5', label: '상기이외의 일반물건' },
                    { value: 'selection6', id: 'type06-6', label: '공장물건' },
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
              <Input onChange={(e) => setFormField('type08', e.target.value)} value={form.type08} width={60} readOnly />
            </FormCell>
          </FormRow>
        </FormTable>
        <Gcol variant={'box-info'} placement={'ss'} className="w-full">
          <Typo variant={'body-sm'} icon={'info'} className="text-[var(--color-danger-50)]">
            ※ 재난배상책임 의무가입 대상 여부를 확인 후 가입하시기 바랍니다.
          </Typo>
          <BulletList position="col" className="pl-[2rem]">
            <BulletListItem size={'sm'} before="※" type="symbols">
              &quot;재난 및 안전관리 기본법&quot;에 따라 계약체결시 가입정보가 국민안전처로 통보되며, 재난배상책임
              가입관리코드 (행정안전부 발급한 고유번호)를 입력하여야 합니다.
            </BulletListItem>
            <BulletListItem size={'sm'} before="※" type="symbols">
              적용업종이 아파트인 경우, 15층 이하의 아파트(공동주택관리법 제2조제1항제2호에 따른 의무관리대상 공동주택에
              한정) 및 부속건물에 한하여 가입 가능합니다.
            </BulletListItem>
            <BulletListItem size={'sm'} before="※" type="symbols">
              적용업종이 휴게음식점/일반음식점인 경우, 1층에 위치한 100㎡(신고된 옥외시설 면적 포함) 이상인 시설에
              한하여 가입가능합니다.
            </BulletListItem>
            <BulletListItem size={'sm'} before="※" type="symbols">
              면적은 ㎡단위(1평=3.3㎡)로 입력하시기 바랍니다.
            </BulletListItem>
          </BulletList>
        </Gcol>
      </TableFoldBody>
    </TableFold>
  );
};

export default Ltpz01611;
