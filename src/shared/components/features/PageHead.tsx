'use client';

import { useState } from 'react';
import {
  Gcol,
  Grow,
  Typo,
  ZoomControl,
  BulletList,
  BulletListItem,
  FormTable,
  FormRow,
  FormCell,
  Separator,
  FormItem,
  ViewMode,
} from '@/shared/components/common';
import { CloseIcon, SearchIcon } from '@/shared/components/icons';
import { Input, Button } from '@/shared/components/uiux';

interface PageHeadData {
  data: {
    simpleMode?: boolean;
    pageName?: string;
    pageId?: string;
    title?: string;
    options?: string[];
    planNumber?: string[];
    contractHolder?: string;
  };
}

export default function PageHead({ data }: PageHeadData) {
  // data가 undefined일 경우를 대비한 기본값 처리
  const safeData = data ?? {};
  const [simpleMode, setSimpleMode] = useState<boolean>(safeData.simpleMode ?? false);

  // 설계번호와 계약자명 상태 추가
  const [planNumber, setPlanNumber] = useState<string[]>([
    safeData.planNumber?.[0] ?? '',
    safeData.planNumber?.[1] ?? '',
  ]);
  const [contractHolder, setContractHolder] = useState<string>(safeData.contractHolder ?? '');

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
          <Button variant="none" onlyicon={true}>
            <CloseIcon />
          </Button>
        </Grow>
      </Grow>

      <Grow placement="bwc" className="w-full py-1">
        <Grow className="gap-[.8rem] flex-1" placement="sc">
          <ViewMode state={simpleMode} onChange={setSimpleMode as (value: boolean) => void} />
          <Typo tag="h2" variant="heading-lg">
            {safeData.title}
          </Typo>
          <BulletList position="row" className="gap-[.89rem]">
            {safeData.options?.map((item, index) => (
              <BulletListItem type="dot" key={index}>
                {item}
              </BulletListItem>
            ))}
          </BulletList>
          <Button variant="outlined" color="gray" size="md">
            변경
          </Button>
        </Grow>
        <Grow className="gap-1 shrink-0" placement="ec">
          <FormTable caption="계약자 관련 정보 입력하세요." cols={['w-[6rem]', '']} variant="none">
            <FormRow>
              <FormCell title="설계번호">
                <Input
                  aria-label="설계번호 입력"
                  type="text"
                  value={planNumber[0]}
                  width="lg"
                  onChange={(e) => setPlanNumber([e.target.value, planNumber[1]])}
                />
                <Separator>-</Separator>
                <Input
                  aria-label="설계번호 입력"
                  type="text"
                  value={planNumber[1]}
                  width="2xs"
                  onChange={(e) => setPlanNumber([planNumber[0], e.target.value])}
                />

                <FormItem className="w-auto ml-3">
                  <Input
                    aria-label="계약자명 입력"
                    type="text"
                    value={contractHolder}
                    width="lg"
                    onChange={(e) => setContractHolder(e.target.value)}
                  />
                  <Button variant="outlined" color="gray-light" aria-label="계약자 추가" onlyicon size="lg">
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
