'use client';

import { useState, type ReactNode } from 'react';
import { Grow, Typo, FormTableLine, FormCell, FormRow, FormTable, FormItem } from '@/shared/components/common';
import { DatePickerInput } from '@/shared/components/common/DatePicker';
import { Button, RadioGroup, RadioGroupItem, Separator } from "@/shared/components/uiux"
import type { LTRA350DataType } from '@/features/pub/proto/data/LTRA350Data';

type LTRA350_1_MainBodyProps = {
  data?: LTRA350DataType['mainBody'];
  selectedPlanId?: number | null;
  onSelectPlan?: (planId: number) => void;
  className?: string;
  children?: ReactNode;
};

export function LTRA350_1_MainBody({
  data: _data,
  selectedPlanId: _selectedPlanId,
  onSelectPlan: _onSelectPlan,
  className,
  children,
}: LTRA350_1_MainBodyProps) {
  const [value, setValue] = useState('');
  const [rangeValue, setRangeValue] = useState<{ from?: string; to?: string }>({
    from: '2026-01-30',
    to: '2026-01-30',
  });

  return (
    <Grow placement="ss" className={className ?? 'h-full w-full'}>
      <FormTableLine>
         <FormTable caption="행/열 병합 케이스" cols={['w-[20%]', 'w-[30%]', 'w-[20%]', 'w-[30%]']}>
            <FormRow>
                <FormCell title="보험시기">
                    <DatePickerInput
                        value={value}
                        mode="single"
                        width="9rem"
                        onChange={(date, formattedValue) => setValue(formattedValue ?? '')}
                        />
                    <Button
                        color="secondary"
                        onClick={() => {}}
                        only="default"
                        size="lg"
                        variant="outlined"
                        >오늘</Button>    
                </FormCell>
                <FormCell title="보험기간">
                   <DatePickerInput
                    readOnly
                    mode="range"
                    width="9rem"
                    rangeValue={rangeValue}
                  />
                </FormCell>
            </FormRow>
            <FormRow>
                <FormCell title="보험기간" colSpan={3}>
                    <RadioGroup value={value} onValueChange={setValue} className='flex-row gap-3'>
                      <RadioGroupItem value="option1" id="insurance-period-80">80세</RadioGroupItem>
                      <RadioGroupItem value="option2" id="insurance-period-90">90세</RadioGroupItem>
                      <RadioGroupItem value="option3" id="insurance-period-100-a">100세</RadioGroupItem>
                      <RadioGroupItem value="option4" id="insurance-period-100-b">100세</RadioGroupItem>
                    </RadioGroup>
                </FormCell>
            </FormRow>
            <FormRow>
                <FormCell title="납기" colSpan={3}>
                    <RadioGroup value={value} onValueChange={setValue} className='flex-row gap-3'>
                      <RadioGroupItem value="option1" id="payment-period-10">10년납</RadioGroupItem>
                      <RadioGroupItem value="option2" id="payment-period-15">15년납</RadioGroupItem>
                      <RadioGroupItem value="option3" id="payment-period-20">20년납</RadioGroupItem>
                      <RadioGroupItem value="option4" id="payment-period-25">25년납</RadioGroupItem>
                      <RadioGroupItem value="option5" id="payment-period-30">30년납</RadioGroupItem>
                      <RadioGroupItem value="option6" id="payment-period-lifetime">전기납</RadioGroupItem>
                    </RadioGroup>   
                </FormCell>
            </FormRow>
             <FormRow>
                <FormCell title="납입주기">
                     <RadioGroup value={value} onValueChange={setValue} className='flex-row gap-3'>
                      <RadioGroupItem value="option1" id="payment-cycle-monthly">월납</RadioGroupItem>
                      <RadioGroupItem value="option2" id="payment-cycle-quarterly">3개월</RadioGroupItem>
                      <RadioGroupItem value="option3" id="payment-cycle-semiannual">6개월</RadioGroupItem>
                      <RadioGroupItem value="option4" id="payment-cycle-annual">연납</RadioGroupItem>
                    </RadioGroup>   
                </FormCell>
                <FormCell title="갱신주기">
                    <RadioGroup value={value} onValueChange={setValue} className='flex-row gap-3'>
                      <RadioGroupItem value="option1" id="renewal-period-3">3년</RadioGroupItem>
                      <RadioGroupItem value="option2" id="renewal-period-10">10년</RadioGroupItem>
                      <RadioGroupItem value="option3" id="renewal-period-20">20년</RadioGroupItem>
                    </RadioGroup>  
                </FormCell>
            </FormRow>
            <FormRow>
                <FormCell title="고지유형" colSpan={3}>
                    <RadioGroup value={value} onValueChange={setValue} width="full" className='grid grid-cols-3 gap-x-6 gap-y-2 w-full'>
                      <RadioGroupItem className='justify-start' value="option1" id="notification-type-1">1형(일반고지형)</RadioGroupItem>
                      <RadioGroupItem className='justify-start' value="option2" id="notification-type-2">2형(건강고지형II(6년))</RadioGroupItem>
                      <RadioGroupItem className='justify-start' value="option3" id="notification-type-3">3형(건강고지형II(7년)) </RadioGroupItem>
                      <RadioGroupItem className='justify-start' value="option4" id="notification-type-4">4형(건강고지형II(8년))</RadioGroupItem>
                      <RadioGroupItem className='justify-start' value="option5" id="notification-type-5">5형(건강고지형II(9년))</RadioGroupItem>
                      <RadioGroupItem className='justify-start' value="option6" id="notification-type-6">6형(건강고지형II(10년))</RadioGroupItem>
                    </RadioGroup>  
                </FormCell>
            </FormRow>
        </FormTable>
      </FormTableLine>
    </Grow>
  );
}
