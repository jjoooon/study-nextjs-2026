'use client';

import { LayoutScrollWrap, LayoutScrollItem } from '@/shared/components/layout';

export default function LayoutType1Section() {
  return (
    <LayoutScrollWrap className="grid-rows-[1fr_auto]">
      <LayoutScrollItem className="w-full">
        <div className="text-[40rem]">
          1
          <br />
          2
          <br />
          3
          <br />
        </div>
      </LayoutScrollItem>
      <LayoutScrollItem className="bg-[pink] w-full">
        qqq
        <br />
        qqqqq
      </LayoutScrollItem>
    </LayoutScrollWrap>
  );
}
