'use client';

import { Grow, Typo } from '@atoms';
import { ZoomControl } from '@common/ZoomControl';
import { CloseIcon } from '@icons';
import { Button } from '@uiux/Button';

import { getHeader } from '@/shared/utils/authUtils';
import { size } from 'zod';

type DefaultPageID = {
  pageName?: string;
  pageId?: string | number;
  [key: string]: any;
}
type PageIDProps = {
  data: DefaultPageID;
};

export default function PageID({ data }: PageIDProps) {
  const safeData = data ?? {};

  // 로그인 사용자 사번
  getHeader('pfmStfno');

  return (
    <Grow placement={'bwc'} className="w-full py-1">
      <Grow>
        <Typo tag={'h1'} variant={'heading-sm'} style={{ fontSize: '13px !important' }}>
          {safeData.pageName}
        </Typo>
        <Typo>({safeData.pageId})</Typo>
      </Grow>
      <Grow>
        <ZoomControl />
        <Button variant={'none'} only={'icon'} size={'md'} aria-label="페이지 닫기">
          <CloseIcon />
        </Button>
      </Grow>
    </Grow>
  );
}
