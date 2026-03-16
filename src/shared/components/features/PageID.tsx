'use client';

import { Grow, Typo } from '@atoms';
import { ZoomControl } from '@common/ZoomControl';
import { CloseIcon } from '@icons';
import { Button } from '@uiux/Button';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getHeader } from '@/shared/utils/authUtils';
import { selectZoom } from '@/shared/store/uiSelectors';
import { setZoom } from '@/shared/store/uiSlice';

type DefaultPageID = {
  pageName?: string;
  pageId?: string | number;
  [key: string]: any;
}
type PageIDProps = {
  data: DefaultPageID;
};

export default function PageID({ data }: PageIDProps) {
  const dispatch = useAppDispatch();
  const safeData = data ?? {};

  // 로그인 사용자 사번
  // getHeader('pfmStfno');

  // ui store 구독(selector)
  // const zoom = useAppSelector(selectZoom);

  // ui store 상태 변경(dispatch)
  // dispatch(setZoom(3));

  return (
    <Grow placement={'bwc'} className="w-full py-1">
      <Grow>
        <Typo tag={'h1'} variant={'heading-sm'}>
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
