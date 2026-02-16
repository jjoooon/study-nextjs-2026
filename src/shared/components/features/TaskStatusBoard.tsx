'use client';

import Image from 'next/image';
import { Gcol, Grow, Grid, Typo } from '@/shared/components/common';
import { Button } from '@/shared/components/uiux';

interface TaskStatusBoardProps {
  state: { id: number; status: string; label: string }[];
}

export default function TaskStatusBoard({ state }: TaskStatusBoardProps) {
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
        {state.map((item) => {
          return (
            <Button key={item.id} variant="state">
              {item.label}
              <Image
                src={`/images/icon/task-${item.status}.svg`}
                alt="설명"
                width={19}
                height={19}
                className="w-[auto] h-[1.9rem]"
              />
            </Button>
          );
        })}
      </Grid>
    </Gcol>
  );
}
