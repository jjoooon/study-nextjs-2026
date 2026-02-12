'use client';

import { Gcol, Grow, Typo, ZoomControl } from '@/shared/components/common';
import { Button } from '@/shared/components/uiux';

export default function PageHead() {
  return (
    <Gcol className="w-full px-[1rem] gap-[1rem]">
      <Grow placement="msb" className="w-full">
        <Grow className="gap-1">
          <Typo variant="heading-sm">상품가입설계</Typo>
          <Typo>(LTRA350)</Typo>
        </Grow>
        <Grow className="gap-1">
          <ZoomControl />
          <Button>닫기</Button>
        </Grow>
      </Grow>

      <Grow placement="msb" className="w-full">
        <Grow className="gap-1">
          <Typo variant="heading-sm">상품가입설계</Typo>
          <Typo>(LTRA350)</Typo>
        </Grow>
        <Grow className="gap-1">
          <ZoomControl />
          <Button>닫기</Button>
        </Grow>
      </Grow>
    </Gcol>
  );
}
