/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { FormItem, Grid, Grow, Typo } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InputCombo } from '@common/InputCombo';
import { ViewMode } from '@common/ViewMode';
import { ArrowIcon, PenIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { useState } from 'react';

type DefaultPageTitle = {
  title?: string;
  pageName?: string;
  pageId?: string | number;
  contractHolder?: string;
  simpleMode?: boolean;
  planNumber?: [string?, string?] | string[];
  planNumberList?: Array<{ label: string; value: string; name: string; amount: string; state: string }>;
};
type PageTitleProps = {
  data: DefaultPageTitle;
  simpleMode?: boolean;
  onSimpleModeChange?: (value: boolean) => void;
};

export function PageTitle({ data }: PageTitleProps) {
  // data가 undefined일 경우를 대비한 기본값 처리
  const safeData = data ?? {};
  const [contractHolder, setContractHolder] = useState<string>(safeData.contractHolder ?? '');

  return (
    <Grow placement={'bwc'} gap={3} className="w-full py-1">
      <Grow className="gap-[.8rem] flex-1" placement={'sc'}>
        <Typo tag={'h2'} variant={'heading-lg'}>
          {safeData.title}
        </Typo>
      </Grow>
      <Grow className="gap-2.5 shrink-0" placement={'ec'}>
        <FormItem className="w-[19.8rem] ml-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Input
                aria-label="계약자명 입력"
                type="text"
                value={contractHolder}
                width={'full'}
                onChange={(e) => setContractHolder(e.target.value)}
              />
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={0}>
              계약자명을 입력하세요.
            </TooltipContent>
          </Tooltip>
          <Button variant={'outlined'} color={'gray-light'} aria-label="계약자 추가" only={'icon'} size={'lg'}>
            <SearchIcon color="var(--color-primary-50)" />
          </Button>
        </FormItem>
      </Grow>
    </Grow>
  );
}

export function PageTitleProduct({ data, simpleMode, onSimpleModeChange }: PageTitleProps) {
  // data가 undefined일 경우를 대비한 기본값 처리
  const safeData = data ?? {};
  const [internalSimpleMode, setInternalSimpleMode] = useState<boolean>(safeData.simpleMode ?? false);
  const resolvedSimpleMode = simpleMode ?? internalSimpleMode;
  const handleSimpleModeChange = (value: boolean) => {
    if (simpleMode === undefined) {
      setInternalSimpleMode(value);
    }
    onSimpleModeChange?.(value);
  };

  // 설계번호와 계약자명 상태 추가
  const [planNumber, setPlanNumber] = useState<string[]>([
    safeData.planNumber?.[0] ?? '',
    safeData.planNumber?.[1] ?? '',
  ]);
  const [contractHolder, setContractHolder] = useState<string>(safeData.contractHolder ?? '');

  const sampleOptions = (safeData.planNumberList ?? []).map((item) => ({
    value: item.value,
    label: (
      <>
        <td>{item.label}</td>
        <td>{item.name}</td>
        <td>{item.amount}</td>
        <td>{item.state}</td>
      </>
    ),
  }));

  return (
    <Grow placement="bwc" className="w-full py-1 gap-1.5">
      <Grow className="gap-[.8rem] flex-1" placement="sc">
        <ViewMode label={['간편', '상세']} state={resolvedSimpleMode} onChange={handleSimpleModeChange} />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="none" color="gray" className="px-0">
              <Typo tag="h2" variant="heading-lg">
                {safeData.title}
              </Typo>
              <ArrowIcon className="rotate-180" color="var(--color-gray-60)" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={0}>
            {safeData.title}
          </TooltipContent>
        </Tooltip>

        <NativeSelect aria-label="플랜 선택" width={200} readOnly={false} required={false}>
          <NativeSelectOption value="1">차움건강검진할인형, 납입면제 강화형, 기본형</NativeSelectOption>
          <NativeSelectOption value="2">옵션 2</NativeSelectOption>
        </NativeSelect>
      </Grow>
      <Grow className="gap-2.5 shrink-0" placement="ec">
        <Button variant="outlined" color="gray" size="md">
          {/* M1. 아이콘 수정 */}
          <PenIcon size={12} />
          메모
        </Button>
        <FormTable caption="계약자 관련 정보 입력하세요." cols={['', '']} variant="none" lineTop={false}>
          <FormRow>
            <FormCell title="설계번호" className="pr-[0.4rem]!">
              <InputCombo
                aria-label="설계번호 입력"
                type="text"
                width={131}
                options={sampleOptions}
                value={planNumber[0]}
                clear={true}
                onChange={(value) => setPlanNumber([value, planNumber[1]])}
                placeholder="설계번호 입력하세요"
              />
              -
              <Input
                aria-label="설계번호 입력"
                type="text"
                value={planNumber[1]}
                width={26}
                onChange={(e) => setPlanNumber([planNumber[0], e.target.value])}
              />
              <Grid className="w-[19.8rem] ml-1.5 grid-cols-[1fr_2.5rem]">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Input
                      aria-label="계약자명 입력"
                      type="text"
                      value={contractHolder}
                      width={'full'}
                      onChange={(e) => setContractHolder(e.target.value)}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={0}>
                    {contractHolder}
                  </TooltipContent>
                </Tooltip>
                <Button variant="outlined" color="gray-light" aria-label="계약자 추가" only="icon" size="lg">
                  <SearchIcon color="var(--color-primary-50)" />
                </Button>
              </Grid>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
    </Grow>
  );
}
