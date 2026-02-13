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

const pageHeadData = {
  simpleMode: true,
  pageName: '상품가입설계',
  pageId: 'LTRA350',
  title: '한화 시그니처 여성 건강보험 3.0 2504',
  options: ['납입면제 강화형', '기본형'],
  planNumber: ['LA20234472050000', '2'],
  contractHolder: '6012345 박하늘별님달',
};

export default function PageHead() {
  const [simpleMode, setSimpleMode] = useState(pageHeadData.simpleMode);

  return (
    <Gcol className="w-full px-[1rem]">
      <Grow placement="bwc" className="w-full py-1">
        <Grow className="gap-1">
          <Typo tag="h1" variant="heading-sm">
            {pageHeadData.pageName}
          </Typo>
          <Typo>({pageHeadData.pageId})</Typo>
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
          <ViewMode state={simpleMode} onChange={setSimpleMode} />
          <Typo tag="h2" variant="heading-lg">
            {pageHeadData.title}
          </Typo>
          <BulletList position="row" className="gap-[.89rem]">
            {pageHeadData.options.map((item, index) => (
              <BulletListItem type="dot" key={index}>
                {item}
              </BulletListItem>
            ))}
          </BulletList>
          <Button variant="contained" color="secondary" size="md">
            변경
          </Button>
        </Grow>
        <Grow className="gap-1 shrink-0" placement="ec">
          <FormTable caption="계약자 관련 정보 입력하세요." cols={['w-[6rem]', '']} variant="none">
            <FormRow>
              <FormCell title="설계번호">
                <Input aria-label="설계번호 입력" type="text" defaultValue={pageHeadData.planNumber[0]} width="lg" />
                <Separator>-</Separator>
                <Input aria-label="설계번호 입력" type="text" defaultValue={pageHeadData.planNumber[1]} width="2xs" />

                <FormItem className="w-auto ml-3">
                  <Input aria-label="계약자명 입력" type="text" defaultValue={pageHeadData.contractHolder} width="lg" />
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
