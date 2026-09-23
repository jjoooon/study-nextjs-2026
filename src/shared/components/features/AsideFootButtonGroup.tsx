/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Grid, Grow } from '@atoms';
import Ltpa120 from '@features/Ltpa120';
import { PlusIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';

export function AsideFootButtonGroup() {
  return (
    <Grow className="asidefootbuttongroup [&>button]:flex-1 [&>button]:w-full" placement={'bwc'}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outlined'} color={'gray'} size={'lg'}>
            제안서
            <PlusIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="start" className="max-w-[42.5rem]" closeButton={true}>
          <Grid className="w-full grid-cols-[1fr] gap-1">
            <Button variant={'outlined'} color={'gray'} size={'lg'}>
              미리보기
            </Button>
            <Button variant={'outlined'} color={'gray'} size={'lg'}>
              출력
            </Button>
            <Button variant={'outlined'} color={'gray'} size={'lg'}>
              PDF저장
            </Button>
          </Grid>
        </PopoverContent>
      </Popover>

      <Button variant={'outlined'} color={'gray'} size={'lg'}>
        출력
      </Button>

      <Ltpa120 />
    </Grow>
  );
}
