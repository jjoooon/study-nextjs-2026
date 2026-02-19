'use client';

import { Gcol, Grow, Typo } from '@/shared/components/common';
import { Checkbox } from '@/shared/components/uiux';

export default function AsideFoot1() {
  return (
    <Gcol className="w-full gap-1">
      <Grow
        placement="bwc"
        className="rounded-[0.8rem] border border-[var(--color-gray-15)] px-[1rem] py-2 shadow-[0_0.1rem_0.2rem_0_rgba(0,0,0,0.01)]"
      >
        <Checkbox variant="button">4세대</Checkbox>
        <Grow className="gap-[0.2rem]">
          <Typo variant="amount-md" color="primary">
            3,450
          </Typo>
          <Typo variant="heading-md">원</Typo>
        </Grow>
      </Grow>
    </Gcol>
  );
}
