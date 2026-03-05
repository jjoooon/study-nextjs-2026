'use client';

import { useState } from 'react';

import { Gcol, Grow, Typo, FormItem } from '@atoms';
import { ZoomControl } from '@common/ZoomControl';
import { FormTable, FormRow, FormCell,} from '@common/FormTable';
import { ViewMode } from '@common/ViewMode';
import { InputCombo } from '@common/InputCombo';
import { CloseIcon, SearchIcon, MemoIcon } from '@icons';
import { Input } from '@uiux/Input';
import { Button } from '@uiux/Button';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import type { LTRA350DataType } from '@/features/pub/proto/data/LTRA350Data';

export default function PageHead({ data }: { data: LTRA350DataType['pageHead'] }) {
  // data가 undefined일 경우를 대비한 기본값 처리
  const safeData = data ?? {};
  const [simpleMode, setSimpleMode] = useState<boolean>(safeData.simpleMode ?? false);

  // 설계번호와 계약자명 상태 추가
  const [planNumber, setPlanNumber] = useState<string[]>([
    safeData.planNumber?.[0] ?? '',
    safeData.planNumber?.[1] ?? '',
  ]);
  const [contractHolder, setContractHolder] = useState<string>(safeData.contractHolder ?? '');

  const sampleOptions = safeData.planNumberList?.map(item => ({
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
    <Gcol className="w-full px-[1rem]">
      <Grow placement="bwc" className="w-full py-1">
        <Grow className="gap-1">
          <Typo tag="h1" variant="heading-sm">
            {safeData.pageName}
          </Typo>
          <Typo>({safeData.pageId})</Typo>
        </Grow>
        <Grow className="gap-1">
          <ZoomControl />
          <Button variant="none" only="icon" size="md">
            <CloseIcon />
          </Button>
        </Grow>
      </Grow>

      <Grow placement="bwc" className="w-full py-1 gap-3">
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
          <FormTable caption="계약자 관련 정보 입력하세요." cols={['', '']} variant="none">
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
    </Gcol>
  );
}
