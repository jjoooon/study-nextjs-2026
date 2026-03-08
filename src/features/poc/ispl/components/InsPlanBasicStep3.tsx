'use client';

import { Gcol, Typo, FormItem, Grow } from '@atoms';
import { FormCell, FormTable } from '@common/FormTable';
import { DatePickerInput } from '@common/DatePicker';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { TableRow } from '@uiux/Table';
import { Button } from '@uiux/Button';


import { SELECT_OPTIONS, RADIO_OPTIONS } from '../constants/insPlanBasicData';
import type { TabData } from '../types/insPlanBasic';

interface InsPlanBasicStep3Props {
  active: string;
  currentData: TabData;
  testError: boolean;
  handleChange: (field: keyof TabData, value: string | [string, string]) => void;
}

export function InsPlanBasicStep3({ active, currentData, testError, handleChange }: InsPlanBasicStep3Props) {
  return (
    <Gcol className="gap-[1rem] w-full">
      <Grow placement="bwc">
        <Typo tag="h3" variant="heading-lg">
          계약형태
        </Typo>
        <Grow>
          <Button color="gray" variant="outlined" size="md">
            최근사용한 계약형태
          </Button>
        </Grow>
      </Grow>
      <FormTable
        caption="계약형태 관련 정보 입력하세요."
        cols={['max-w-[20rem] w-[15%]', 'w-[25%]', 'max-w-[20rem] w-[15%]', 'w-[45%]']}
      >
        <TableRow>
          <FormCell title="보험시기">
            <DatePickerInput
              key={`${active}-insuranceStartDate`}
              value={currentData?.insuranceStartDate || ''}
              mode="single"
              width="sm"
              error={testError}
              errorMsg="보험시기는 필수입니다."
              errorPs="bl"
              onChange={(date, formattedValue) => {
                handleChange('insuranceStartDate', formattedValue ?? '');
              }}
            />
          </FormCell>
          <FormCell title="보험기간">
            <DatePickerInput
              key={`${active}-insurancePeriod`}
              rangeValue={
                currentData.insurancePeriod && currentData.insurancePeriod[0] && currentData.insurancePeriod[1]
                  ? { from: currentData.insurancePeriod[0], to: currentData.insurancePeriod[1] }
                  : undefined
              }
              mode="range"
              width="sm"
              error={testError}
              errorMsg="보험기간은 필수입니다."
              errorPs="bl"
              onChange={(date, formattedValue) => {
                if (formattedValue) {
                  const [from, to] = formattedValue.split(' ~ ').map((v) => v.trim());
                  handleChange('insurancePeriod', [from || '', to || '']);
                }
              }}
            />
          </FormCell>
        </TableRow>
        <TableRow>
          <FormCell title="플랜" colSpan={3}>
            <FormItem className="justify-between">
              <RadioGroup
                value={currentData.planType}
                onValueChange={(value) => handleChange('planType', value)}
                className="gap-x-[2.7rem] gap-y-[.8rem]"
              >
                {RADIO_OPTIONS.planSelect.map((planSelect) => (
                  <RadioGroupItem key={planSelect.value} value={planSelect.value}>
                    {planSelect.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
              <NativeSelect
                aria-label="플랜 선택"
                readOnly={false}
                required={true}
                width="max"
                error={testError}
                errorMsg="플랜 선택은 필수입니다."
                errorPs="tr"
                value={currentData.planOption}
                onChange={(e) => handleChange('planOption', e.target.value)}
              >
                <NativeSelectOption value="">선택</NativeSelectOption>
                {SELECT_OPTIONS.planOption.map((item) => (
                  <NativeSelectOption key={item.value} value={item.value}>
                    {item.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </FormItem>
          </FormCell>
        </TableRow>
        <TableRow>
          <FormCell title="납기" colSpan={3}>
            <FormItem className="justify-between">
              <RadioGroup
                value={currentData.deliveryTerm}
                className="gap-x-[2.7rem] gap-y-[.8rem]"
                error={testError}
                errorMsg="납기 선택은 필수입니다."
                errorPs="tl"
                onValueChange={(value) => handleChange('deliveryTerm', value)}
              >
                {RADIO_OPTIONS.deliveryDate.map((deliveryDate) => (
                  <RadioGroupItem key={deliveryDate.value} value={deliveryDate.value} required={true}>
                    {deliveryDate.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
              <NativeSelect
                aria-label="납기 선택"
                readOnly={false}
                required={true}
                width="max"
                error={testError}
                errorMsg="납기 선택은 필수입니다."
                errorPs="br"
                value={currentData.deliveryOption}
                onChange={(e) => handleChange('deliveryOption', e.target.value)}
              >
                <NativeSelectOption value="">선택</NativeSelectOption>
                {SELECT_OPTIONS.deliveryOptionData.map((item) => (
                  <NativeSelectOption key={item.value} value={item.value}>
                    {item.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </FormItem>
          </FormCell>
        </TableRow>
        <TableRow>
          <FormCell title="만기" colSpan={3}>
            <FormItem className="justify-between">
              <RadioGroup
                value={currentData.maturityTerm}
                onValueChange={(value) => handleChange('maturityTerm', value)}
                className="gap-x-[2.7rem] gap-y-[.8rem]"
              >
                {RADIO_OPTIONS.maturityAge.map((maturityAge) => (
                  <RadioGroupItem key={maturityAge.value} value={maturityAge.value}>
                    {maturityAge.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
              <NativeSelect
                aria-label="만기 선택"
                readOnly={false}
                required={true}
                width="max"
                error={testError}
                errorMsg="만기 선택은 필수입니다."
                errorPs="br"
                value={currentData.maturityOption}
                onChange={(e) => handleChange('maturityOption', e.target.value)}
              >
                <NativeSelectOption value="">선택</NativeSelectOption>
                {SELECT_OPTIONS.maturityOptionData.map((item) => (
                  <NativeSelectOption key={item.value} value={item.value}>
                    {item.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </FormItem>
          </FormCell>
        </TableRow>
        <TableRow>
          <FormCell title="납입주기" colSpan={3}>
            <NativeSelect
              aria-label="납입주기 선택"
              readOnly={false}
              required={true}
              width="max"
              error={testError}
              errorMsg="납입주기 선택은 필수입니다."
              errorPs="bl"
              value={currentData.paymentCycle}
              onChange={(e) => handleChange('paymentCycle', e.target.value)}
            >
              <NativeSelectOption value="">선택</NativeSelectOption>
              {SELECT_OPTIONS.paymentCycleData.map((item) => (
                <NativeSelectOption key={item.value} value={item.value}>
                  {item.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </FormCell>
        </TableRow>
        <TableRow>
          <FormCell title="고지유형" colSpan={3}>
            <RadioGroup
              value={currentData.noticeType}
              onValueChange={(value) => handleChange('noticeType', value)}
              className="gap-x-[2.7rem] gap-y-[.8rem] grid grid-cols-3"
            >
              {RADIO_OPTIONS.noticeType.map((noticeType) => (
                <RadioGroupItem key={noticeType.value} value={noticeType.value}>
                  {noticeType.label}
                </RadioGroupItem>
              ))}
            </RadioGroup>
          </FormCell>
        </TableRow>
      </FormTable>
    </Gcol>
  );
}
