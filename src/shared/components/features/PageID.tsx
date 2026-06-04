/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Grow, Typo } from '@atoms';
import { ZoomControl } from '@common/ZoomControl';
import { CloseIcon } from '@icons';
import { Button } from '@uiux/Button';
import { getHeader } from '@/shared/utils/authUtils';

type DefaultPageID = {
  pageName?: string;
  pageId?: string | number;
  [key: string]: unknown;
};
type PageIDProps = {
  data: DefaultPageID;
};

export function PageID({ data }: PageIDProps) {
  const safeData = data ?? {};

  // 로그인 사용자 사번
  getHeader('stfno');

  return (
    <Grow placement={'bwc'} className="w-full py-[4px] gap-[4px]">
      <Grow className="gap-[4px]">
        <Typo tag={'h1'} variant={'heading-sm'} className="!text-[13px]">
          {safeData.pageName}
        </Typo>
        {safeData.pageId && <Typo className="!text-[13px]">({safeData.pageId})</Typo>}
      </Grow>
      <Grow className="gap-[4px]">
        <ZoomControl />
        <Button variant={'none'} only={'icon'} size={'md'} aria-label="페이지 닫기" className="!w-[16px] !h-[16px]">
          <CloseIcon size={16} className="!w-[16px] !h-[16px]" />
        </Button>
      </Grow>
    </Grow>
  );
}
