'use client';

import Link from 'next/link';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { AddIcon } from '@icons';
import { Button } from '@uiux/Button';

const DummyList = [
  { fix: true, name: '설계매뉴얼', link: '/login' },
  { fix: true, name: '실손정액조회', link: '/login' },
  { fix: false, name: '다른상품설계', link: '/login' },
  { fix: false, name: '동일상품복사', link: '/login' },
  { fix: false, name: '설계동의', link: '/login' },
  { fix: false, name: '전체누적', link: '/login' },
  { fix: false, name: '약관조회', link: '/login' },
];

export function QuickLinks() {
  return (
    <Gcol className="w-full gap-1">
      <Grow className="gap-2" placement="bwc">
        <Typo variant="heading-md">바로가기</Typo>
        <Button variant="outlined" color="gray" size="sm">
          편집
        </Button>
      </Grow>
      {/* M1. gap-1 수정 */}
      <Grid variant="box-line" className="grid-cols-[1fr_1fr] w-full gap-1" placement="ss">
        {DummyList.map((menu, index) => (
          <Button
            asChild
            key={`${menu.name}-${index}`}
            variant="outlined"
            color={menu.fix ? 'primary' : 'gray-light'}
            size={'sm'}
            className="w-full"
          >
            <Link href={menu.link} className="truncate w-full block! text-center" title={menu.name}>
              {menu.name}
            </Link>
          </Button>
        ))}
        <Button variant="outlined" color={'gray-light'} size={'sm'} className="w-full">
          전체보기
          <AddIcon color="var(--color-gray-50)" size={12} />
        </Button>
      </Grid>
    </Gcol>
  );
}
