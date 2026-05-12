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
    <Grow placement={'bwc'} className="w-full py-1">
      <Grow>
        <Typo tag={'h1'} variant={'heading-sm'} style={{ fontSize: '13px !important' }}>
          {safeData.pageName}
        </Typo>
        {safeData.pageId && <Typo>({safeData.pageId})</Typo>}
      </Grow>
      <Grow>
        <ZoomControl />
        <Button variant={'none'} only={'icon'} size={'md'} aria-label="페이지 닫기">
          <CloseIcon size={16} />
        </Button>
      </Grow>
    </Grow>
  );
}
