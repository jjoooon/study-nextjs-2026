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
    <Grow className="[&>button]:flex-1 [&>button]:w-full" placement={'bwc'}>
      <Button variant={'outlined'} color={'gray'} size={'lg'}>
        제안서
        <PlusIcon />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outlined'} color={'gray'} size={'lg'}>
            출력
            <PlusIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="end" className="max-w-[42.5rem]" closeButton={true}>
          <Grid className="w-full grid-cols-[1fr] gap-1">
            <Button variant={'outlined'} color={'gray'} size={'lg'}>
              출력물 공통팝업
            </Button>
            {/* 아래 버튼들은 출력물 종류 선택 항목 */}
            <Button variant={'outlined'} color={'gray'} size={'lg'}>
              설계요약서
            </Button>
            <Button variant={'outlined'} color={'gray'} size={'lg'}>
              가입제안서
            </Button>
            <Button variant={'outlined'} color={'gray'} size={'lg'}>
              상품설명서
            </Button>
          </Grid>
        </PopoverContent>
      </Popover>

      <Ltpa120 />
    </Grow>
  );
}
