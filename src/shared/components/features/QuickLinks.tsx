'use client';

import Link from 'next/link';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { PlusIcon } from '@icons';
import { Button } from '@uiux/Button';

export function QuickLinks() {
  return (
    <Gcol className="w-full gap-1">
      <Grow className="gap-2" placement="bwc">
        <Typo variant="heading-md">바로가기</Typo>
        {/* <Button variant="none" only="icon" size="sm">
          <SettingIcon color="var(--color-secondary-50)" />
        </Button> */}
      </Grow>
      <Grid variant="box-line" className="grid-cols-[1fr_1fr] w-full gap-[0.6rem]" placement="ss">
        {/* <div className="grid grid-cols-[1fr_1fr] bg-[var(--color-gray-0)] rounded-[0.8rem] border border-[var(--color-gray-5)] w-full gap-[0.6rem] p-2.5 gap-1 shadow-[0_0.4rem_0.8rem_0_rgba(0,0,0,0.04)]"> */}
        <Button asChild variant="outlined" color={'primary'} size={'sm'} className="w-full">
          <Link href="/login">설계매뉴얼</Link>
        </Button>
        <Button asChild variant="outlined" color={'gray-light'} size={'sm'} className="w-full">
          <Link href="/login">실손정액조회</Link>
        </Button>
        <Button asChild variant="outlined" color={'gray-light'} size={'sm'} className="w-full">
          <Link href="/login">다른상품설계</Link>
        </Button>
        <Button asChild variant="outlined" color={'gray-light'} size={'sm'} className="w-full">
          <Link href="/login">동일상품복사</Link>
        </Button>
        <Button asChild variant="outlined" color={'gray-light'} size={'sm'} className="w-full">
          <Link href="/login">설계동의</Link>
        </Button>
        <Button asChild variant="outlined" color={'gray-light'} size={'sm'} className="w-full">
          <Link href="/login">전체누적</Link>
        </Button>
        <Button asChild variant="outlined" color={'gray-light'} size={'sm'} className="w-full">
          <Link href="/login">약관조회</Link>
        </Button>
        <Button variant="outlined" color={'gray-light'} size={'sm'} className="w-full">
          더보기
          <PlusIcon color="var(--color-gray-50)" />
        </Button>
      </Grid>
    </Gcol>
  );
}
