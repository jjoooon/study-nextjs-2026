'use client';

import { Gcol, Grow, Typo, ZoomControl } from '@/shared/components/common';
import { Button } from '@/shared/components/uiux';

export default function PageHead() {
  return (
    <Gcol className="w-full">
      <Grow placement="msb">
        <Grow className="gap-1">
          <Typo>상품가입설계</Typo>
          <Typo>(LTRA350)</Typo>
        </Grow>
        <Grow className="gap-1">
          <ZoomControl />
          <Button>닫기</Button>
        </Grow>
      </Grow>
      <div>페이지 헤드</div>
    </Gcol>
  );
}
