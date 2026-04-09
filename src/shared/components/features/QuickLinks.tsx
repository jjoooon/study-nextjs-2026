'use client';

import Link from 'next/link';

import { Gcol, Grow, Typo, Grid } from '@atoms';
import { AddIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Popover, PopoverTrigger, PopoverContent } from '@uiux/Popover';

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
  const quickMenusMore = (menus && menus.length > 0 ? menus : DEFAULT_MENUS).slice(7);
  const isMoreDisabled = quickMenusMore.length === 0;

  return (
    <Gcol className="w-full gap-1">
      <Grow className="gap-2" placement="bwc">
        <Typo variant="heading-md">바로가기</Typo>
        <Button variant="outlined" color="gray" size="sm" onClick={onMoreClick}>
          편집
        </Button>
      </Grow>
      <Grid variant="box-line" className="grid-cols-[1fr_1fr] w-full gap-[0.6rem]" placement="ss">
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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outlined" color={'gray-light'} size={'sm'} className="w-full" disabled={isMoreDisabled}>
              더보기
              <AddIcon color="var(--color-gray-50)" size={12} />
            </Button>
          </PopoverTrigger>
          <PopoverContent motion="fade" closeButton align="end">
            <Gcol gap={1}>
              {quickMenusMore.map((menu, index) => (
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
            </Gcol>
          </PopoverContent>
        </Popover>
      </Grid>
    </Gcol>
  );
}
