'use client';

import { Grow, Typo } from '@atoms';
import { ZoomControl } from '@common/ZoomControl';
import { CloseIcon } from '@icons';
import { Button } from '@uiux/Button';

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
