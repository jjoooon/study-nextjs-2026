/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { Grow } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { EssentialIcon } from '@icons';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

const Ltpz01603 = () => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
  });

  return (
    <TableFold>
      <TableFoldHead title="음식물배상책임" />
      <TableFoldBody className="gap-2">
        <FormTable caption="설계번호" cols={['w-[8rem]', 'w-[6rem]', 'w-[6rem]', 'w-[auto]', 'w-[18rem]', 'w-[auto]']}>
          <FormRow>
            <FormCell title={'업종구분'} titleColSpan={3}>
              <NativeSelect
                aria-label="항목 선택"
                width={160}
                value={form.type01}
                required
                onChange={(e) => setFormField('type01', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '선택' },
                  { value: 'selection2', id: 'type01-2', label: '선택1' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'업종구분2'}>
              <NativeSelect
                aria-label="항목 선택"
                width={160}
                value={form.type02}
                required
                onChange={(e) => setFormField('type02', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type02-1', label: '업종1' },
                  { value: 'selection2', id: 'type02-2', label: '업종2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'보상한도'} tdNone />
            <FormCell title={'대인'} tdNone />
            <FormCell title={'1인당'}>
              <NativeSelect
                aria-label="항목 선택"
                width={160}
                value={form.type03}
                required
                onChange={(e) => setFormField('type03', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type03-1', label: '선택' },
                  { value: 'selection2', id: 'type03-2', label: '선택1' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'1사고당'}>
              <NativeSelect
                aria-label="항목 선택"
                width={160}
                value={form.type04}
                required
                onChange={(e) => setFormField('type04', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type04-1', label: '업종1' },
                  { value: 'selection2', id: 'type04-2', label: '업종2' },
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
                  자기부담금 <EssentialIcon />
                </Grow>
              }
              titleColSpan={3}
              colSpan={3}
            >
              <Input
                aria-label=""
                width={160}
                value={form.type05}
                onChange={(e) => setFormField('type05', e.target.value)}
                commaAmount
                readOnly
                required
              />
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'연간매출액'} titleColSpan={3} colSpan={3}>
              <Input
                aria-label=""
                width={160}
                value={form.type06}
                onChange={(e) => setFormField('type06', e.target.value)}
                commaAmount
                required
              />
              만원
            </FormCell>
          </FormRow>
        </FormTable>
      </TableFoldBody>
    </TableFold>
  );
};

export default Ltpz01603;
