'use client';

import Image from 'next/image';
import { Gcol, Grow, Grid, Typo } from '@/shared/components/common';
import { Button } from '@/shared/components/uiux';

export default function TaskStatusBoard() {
  return (
    <Gcol
      variant="box"
      placement="ss"
      className="bg-[var(--color-coolgray-20)] rounded-[0.8rem] w-full gap-[0.6rem] px-2.5rem py-2"
    >
      <Grow className="gap-[0.2rem]">
        <Image
          src="/images/icon/icon-checkpoint.svg"
          alt="설명"
          width={16}
          height={16}
          className="w-[1.6rem] h-[1.6rem]"
        />
        <Typo tag="h4" variant="heading-sm">
          꼭 확인해야 할 일!
        </Typo>
      </Grow>

      <Grid className="grid-cols-2 gap-1 w-full">
        <Button variant="state" state="GO">
          누적
        </Button>
        <Button variant="state" state="WAIT">
          중복
        </Button>
        <Button variant="state" state="STOP">
          직업
        </Button>
        <Button variant="state" state="GO">
          기타
        </Button>
      </Grid>
    </Gcol>
  );
}
