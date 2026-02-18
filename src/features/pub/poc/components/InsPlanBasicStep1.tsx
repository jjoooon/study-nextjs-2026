'use client';

import { FormTableLine, FormCell, FormTable, Gcol, Grow, Typo, FormItem } from '@/shared/components/common';
import { SearchIcon } from '@/shared/components/icons';
import { TableRow, Input, Button, NativeSelect, NativeSelectOption } from '@/shared/components/uiux';
import { SELECT_OPTIONS } from '../constants/insPlanBasicData';
import type { TabData } from '../types/insPlanBasic';

interface InsPlanBasicStep1Props {
  currentData: TabData;
  testError: boolean;
  handleChange: (field: keyof TabData, value: string | [string, string]) => void;
}

export function InsPlanBasicStep1({ currentData, testError, handleChange }: InsPlanBasicStep1Props) {
  return (
    <Gcol className="gap-[1rem] w-full">
      <Grow placement="bwc">
        <Typo tag="h3" variant="heading-lg">
          계약자
        </Typo>
      </Grow>

      <FormTableLine>
        <FormTable
          caption="계약자 관련 정보 입력하세요."
          cols={['max-w-[20rem] w-[15%]', 'w-[35%]', 'max-w-[20rem] w-[15%]', 'w-[35%]']}
        >
          <TableRow>
            <FormCell title={<b className="text-[var(--color-text-primary)]">계약자</b>}>
              <FormItem>
                <Input
                  aria-label="계약자명 입력"
                  type="text"
                  value={currentData.name}
                  required={true}
                  error={testError}
                  errorMsg="계약자 입력은 필수입니다."
                  errorPs="bl"
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                <Button aria-label="계약자 추가" variant="none" size="icon-md">
                  <SearchIcon />
                </Button>
              </FormItem>
            </FormCell>
            <FormCell title="개인정보취득경로">
              <NativeSelect
                aria-label="개인정보취득경로 선택"
                width="md"
                readOnly={false}
                required={true}
                value={currentData.personalInfoPath}
                error={testError}
                errorMsg="개인정보취득경로는 필수입니다."
                errorPs="bl"
                onChange={(e) => handleChange('personalInfoPath', e.target.value)}
              >
                <NativeSelectOption value="">선택</NativeSelectOption>
                {SELECT_OPTIONS.personalInfoPath.map((item) => (
                  <NativeSelectOption key={item.value} value={item.value}>
                    {item.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
          </TableRow>
          <TableRow>
            <FormCell title="발송지" colSpan={3}>
              <NativeSelect
                aria-label="발송지 구분 선택"
                width="lg"
                readOnly={false}
                required={false}
                value={currentData.deliveryType}
                onChange={(e) => handleChange('deliveryType', e.target.value)}
              >
                <NativeSelectOption value="">선택</NativeSelectOption>
                {SELECT_OPTIONS.deliveryType.map((item) => (
                  <NativeSelectOption key={item.value} value={item.value}>
                    {item.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <Input
                type="text"
                value={currentData.deliveryAddress}
                onChange={(e) => handleChange('deliveryAddress', e.target.value)}
              />
              <Input
                type="text"
                value={currentData.deliveryDetailAddress}
                onChange={(e) => handleChange('deliveryDetailAddress', e.target.value)}
              />
            </FormCell>
          </TableRow>
        </FormTable>
      </FormTableLine>
    </Gcol>
  );
}
