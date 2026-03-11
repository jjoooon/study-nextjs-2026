'use client';

import { useState } from 'react';

import { Grow, Typo, FormItem } from '@atoms';
import { FormTable, FormRow, FormCell,} from '@common/FormTable';
import { ViewMode } from '@common/ViewMode';
import { InputCombo } from '@common/InputCombo';
import { SearchIcon, MemoIcon } from '@icons';
import { Input } from '@uiux/Input';
import { Button } from '@uiux/Button';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

type DefaultPageTitle = {
  pageName?: string;
  pageId?: string | number;
  [key: string]: any;
}
type PageTitleProps = {
  data: DefaultPageTitle;
};

export function PageTitle({ data }: PageTitleProps) {
  // data가 undefined일 경우를 대비한 기본값 처리
  const safeData = data ?? {};
  const [contractHolder, setContractHolder] = useState<string>(safeData.contractHolder ?? '');

  return (
    <Grow placement={'bwc'} gap={3} className="w-full py-1 min-w-[118.4rem]">
      <Grow className="gap-[.8rem] flex-1" placement={'sc'}>
        <Typo tag={'h2'} variant={'heading-lg'}>
          {safeData.title}
        </Typo>
      </Grow>
      <Grow className="gap-2.5 shrink-0" placement={'ec'}>
        <FormItem className="w-[19.8rem] ml-1.5">
          <Input
            aria-label="계약자명 입력"
            type="text"
            value={contractHolder}
            width={'full'}
            onChange={(e) => setContractHolder(e.target.value)}
          />
          <Button variant={'outlined'} color={'gray-light'} aria-label="계약자 추가" only={'icon'} size={'lg'}>
            <SearchIcon color="var(--color-primary-50)" />
          </Button>
        </FormItem>
      </Grow>
    </Grow>
  );
}

export function PageTitleProduct({ data }: PageTitleProps) {
  // data가 undefined일 경우를 대비한 기본값 처리
  const safeData = data ?? {};
  const [simpleMode, setSimpleMode] = useState<boolean>(safeData.simpleMode ?? false);

  // 설계번호와 계약자명 상태 추가
  const [planNumber, setPlanNumber] = useState<string[]>([
    safeData.planNumber?.[0] ?? '',
    safeData.planNumber?.[1] ?? '',
  ]);
  const [contractHolder, setContractHolder] = useState<string>(safeData.contractHolder ?? '');

  const sampleOptions = safeData.planNumberList?.map((item: { 
    label: string; 
    value: string; 
    name: string; 
    amount: string; 
    state: string 
  }) => ({
    value: item.value,
    label: (
      <div className="type--design-number">
        <div>{item.label}</div>
        <div>{item.name}</div>
        <div>{item.amount}</div>
        <div>{item.state}</div>
      </div>
    )
  }));

  return (
    <Grow placement="bwc" className="w-full py-1 gap-3 min-w-[118.4rem]">
      <Grow className="gap-[.8rem] flex-1" placement="sc">
        <ViewMode state={simpleMode} onChange={setSimpleMode as (value: boolean) => void} />
        <Typo tag="h2" variant="heading-lg">
          {safeData.title}
        </Typo>
        <div className="w-[0.4rem] h-[0.4rem] rounded-full bg-[var(--color-gray-30)]"></div>
        <NativeSelect aria-label="플랜 선택" width="2xl" readOnly={false} required={false}>
          <NativeSelectOption value="1">차움건강검진할인형, 납입면제 강화형, 기본형</NativeSelectOption>
          <NativeSelectOption value="2">옵션 2</NativeSelectOption>
        </NativeSelect>
      </Grow>
      <Grow className="gap-2.5 shrink-0" placement="ec">
        <Button variant="outlined" color="secondary" size="md">
          <MemoIcon />
          메모
        </Button>
        <FormTable caption="계약자 관련 정보 입력하세요." cols={['', '']} variant="none" lineTop={false}>
          <FormRow>
            <FormCell title="설계번호" className="pr-[0.4rem]!">
              {/* <Input
                aria-label="설계번호 입력"
                type="text"
                value={planNumber[0]}
                width="lg"
                onChange={(e) => setPlanNumber([e.target.value, planNumber[1]])}
              /> */}
              <InputCombo
                aria-label="설계번호 입력"
                type="text"
                width="lg"
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
                width="2xs"
                onChange={(e) => setPlanNumber([planNumber[0], e.target.value])}
              />

              <FormItem className="w-[19.8rem] ml-1.5">
                <Input
                  aria-label="계약자명 입력"
                  type="text"
                  value={contractHolder}
                  width="full"
                  onChange={(e) => setContractHolder(e.target.value)}
                />
                <Button variant="outlined" color="gray-light" aria-label="계약자 추가" only="icon" size="lg">
                  <SearchIcon color="var(--color-primary-50)" />
                </Button>
              </FormItem>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
    </Grow>
  );
}