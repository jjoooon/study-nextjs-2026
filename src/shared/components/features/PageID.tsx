'use client';

import { useState } from 'react';

import { Gcol, Grow, Typo } from '@atoms';
import { ZoomControl } from '@common/ZoomControl';
import { CloseIcon } from '@icons';
import { Button } from '@uiux/Button';

type DefaultPageID = {
  pageName?: string;
  pageId?: string | number;
  [key: string]: any;
}
type PageIDProps<T = DefaultPageID> = {
  data: T;
};

export default function PageID<T = DefaultPageID>({ data }: PageIDProps<T>) {
  const safeData = data ?? {};

  return (
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
  );
}
