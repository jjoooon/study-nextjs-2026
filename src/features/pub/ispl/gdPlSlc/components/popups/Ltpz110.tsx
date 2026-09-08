/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { Gcol, Typo } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { CloseIcon } from '@icons';
import { Button } from '@uiux/Button';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { PopoverContent } from '@uiux/Popover';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import '@/shared/lib/agGridPub';

interface Ltpz110Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isID?: boolean;
  defaultValues?: string[];
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  onClose?: () => void;
}

const Ltpz110 = ({ isID, defaultValues, side = 'bottom', align = 'end', sideOffset = 4, onClose }: Ltpz110Props) => {
  const initialValues = defaultValues ?? (isID ? ['0', '1', '2', '3', '4', '5', '6'] : []);

  const renderBody = () => (
    <Gcol placement="ss" className="px-3 w-full">
      <Typo>아래 정보를 변경 후 [재조회]를 눌러주세요.</Typo>
      <Gcol gap="2">
        <FormTable caption="추가고지 및 적용담보 설정" cols={['w-[7.2rem]', 'w-[6rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={isID ? '간편 추가 고지형' : '추가고지'} titleRowSpan={2} tdNone />
            <FormCell title="고혈압">
              <RadioGroup defaultValue="Y">
                <RadioGroupItem value="Y" id="hypertension-Y">
                  있음
                </RadioGroupItem>
                <RadioGroupItem value="N" id="hypertension-N">
                  없음
                </RadioGroupItem>
              </RadioGroup>
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title="당뇨">
              <RadioGroup defaultValue="N">
                <RadioGroupItem value="Y" id="diabetes-Y">
                  있음
                </RadioGroupItem>
                <RadioGroupItem value="N" id="diabetes-N">
                  없음
                </RadioGroupItem>
              </RadioGroup>
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title="적용담보" titleColSpan={2}>
              <CheckboxGroup className="flex flex-wrap gap-y-2 gap-x-1" defaultValue={initialValues}>
                {(isID
                  ? [
                      { label: '질병후유3%', value: '0' },
                      { label: '암', value: '1' },
                      { label: '2대', value: '2' },
                      { label: '질병입원비', value: '3' },
                      { label: '질병수술비', value: '4' },
                      { label: '상해입원비', value: '5' },
                      { label: '상해수술비', value: '6' },
                      { label: '상해후유3%', value: '7' },
                      { label: '요양진단비', value: '8' },
                    ]
                  : [
                      { label: '질병후유', value: '0' },
                      { label: '암', value: '1' },
                      { label: '2대', value: '2' },
                      { label: '질병입원비', value: '3' },
                      { label: '질병수술비', value: '4' },
                      { label: '상해입원비', value: '5' },
                      { label: '상해수술비', value: '6' },
                    ]
                ).map((category) => (
                  <div key={category.value} className="w-[calc(25%-6px)] min-w-[85px] whitespace-nowrap">
                    <CheckboxGroupItem value={category.value}>{category.label}</CheckboxGroupItem>
                  </div>
                ))}
              </CheckboxGroup>
            </FormCell>
          </FormRow>
        </FormTable>
        {!isID && (
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm">
              간편고지 정보 변경 사항은 저장되지 않으므로, 알릴사항 입력시 새로 입력하시기 바랍니다.
            </Typo>
          </Gcol>
        )}
      </Gcol>
    </Gcol>
  );

  return (
    <PopoverContent
      side={side}
      align={align}
      sideOffset={sideOffset}
      className="grid grid-rows-[auto_1fr_auto] !pointer-events-auto bg-white rounded-[0.2rem] border border-[#1f1f1f] px-0 py-0 shadow-[0_0.2rem_1.2rem_0_#222222] outline-none dialog-bounce-transition w-[48rem]"
    >
      <Gcol gap="4" className="w-full">
        <div className="flex flex-row content-start cursor-grab w-full min-h-[3rem] justify-center pl-[1rem] pr-[0.5rem] shrink-0 border-b-[0.1rem] border-[var(--color-gray-20)]">
          <h2
            id="radix-_r_fo_"
            className="flex items-center gap-0.5 text-[1.4rem] tracking-tighter text-left pb-0 w-full pr-6 [&_strong]:text-[1.4rem]! [&_strong]:text-[#111827]! [&_strong]:font-bold!"
          >
            <Typo tag="strong" variant="heading-lg">
              고지유형 정보변경
            </Typo>
            <Typo tag="p" variant="body-xl">
              (LTPZ110)
            </Typo>
          </h2>
        </div>
        {renderBody()}
        <div className="w-full flex gap-2 pb-5 px-6 justify-end">
          <Button variant="contained" size="xl" color="primary">
            재조회
          </Button>
          <PopoverPrimitive.Close asChild>
            <Button variant="outlined" size="xl" color="gray-light" onClick={onClose}>
              닫기
            </Button>
          </PopoverPrimitive.Close>
        </div>
        <PopoverPrimitive.Close asChild>
          <Button
            variant="outlined"
            size="xl"
            color="gray-light"
            onClick={onClose}
            className="flex items-center justify-center w-[2.4rem] h-[2.4rem] ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-[0.3rem] right-[0.5rem] rounded-xs transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&amp;_svg]:pointer-events-none border-0 min-w-[2.4rem] p-0!"
          >
            <CloseIcon color="#2C2724" />
          </Button>
        </PopoverPrimitive.Close>
      </Gcol>
    </PopoverContent>
  );
};

export default Ltpz110;
