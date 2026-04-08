'use client';

import Link from 'next/link';

import { Gcol, Grow, Typo, Grid } from '@atoms';
import { PlusIcon } from '@icons';
import { Button } from '@uiux/Button';

type QuickLinkItem = {
  name: string;
  link: string;
};

type QuickLinksProps = {
  menus?: QuickLinkItem[];
  onMoreClick?: () => void;
};

const DEFAULT_MENUS: QuickLinkItem[] = [
  { name: '설계매뉴얼', link: '/login' },
  { name: '실손정액조회', link: '/login' },
  { name: '다른상품설계', link: '/login' },
  { name: '동일상품복사', link: '/login' },
  { name: '설계동의', link: '/login' },
  { name: '전체누적', link: '/login' },
  { name: '약관조회', link: '/login' },
];

export function QuickLinks({ menus, onMoreClick }: QuickLinksProps) {
  const quickMenus = (menus && menus.length > 0 ? menus : DEFAULT_MENUS).slice(0, 7);

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
        {quickMenus.map((menu, index) => (
          <Button
            asChild
            key={`${menu.name}-${index}`}
            variant="outlined"
            color={index === 0 ? 'primary' : 'gray-light'}
            size={'sm'}
            className="w-full"
          >
            <Link href={menu.link} className="truncate w-full block! text-center" title={menu.name}>
              {menu.name}
            </Link>
          </Button>
        ))}
        <Button variant="outlined" color={'gray-light'} size={'sm'} className="w-full" onClick={onMoreClick}>
          더보기
          <PlusIcon color="var(--color-gray-50)" />
        </Button>
      </Grid>
    </Gcol>
  );
}
