/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { Grid, Grow, Typo, Gcol } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TabPager } from '@common/TabPager';
import { ArrowIcon, InputClearIcon } from '@icons';
import { Button } from '@uiux/Button';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { toast } from '@uiux/Sonner';
import { Fragment, useMemo, useState } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';

type MenuItem = {
  code: string;
  group: string;
  name: string;
  link: string;
  fix?: boolean;
  selected?: boolean;
};

export type Ltpz018MenuItem = {
  code: string;
  group: string;
  name: string;
  link: string;
  fix?: boolean;
  selected?: boolean;
};

const MENU_LIST: MenuItem[] = [
  { code: 'm1_1', selected: false, fix: true, group: '공통(기본)', name: '설계매뉴얼', link: '/' },
  { code: 'm1_2', selected: false, fix: false, group: '공통(기본)', name: '질문하기', link: '/' },
  { code: 'm1_3', selected: true, fix: false, group: '공통(기본)', name: '설계동의', link: '/' },
  { code: 'm1_4', selected: false, fix: false, group: '공통(기본)', name: '동의현황', link: '/' },
  { code: 'm1_5', selected: false, fix: false, group: '공통(기본)', name: '약관조회', link: '/' },

  { code: 'm2_1', selected: false, fix: true, group: '지침', name: '실손정액조회', link: '/' },
  { code: 'm2_2', selected: false, fix: false, group: '지침', name: '전체누적', link: '/' },
  { code: 'm2_3', selected: false, fix: false, group: '지침', name: '부실유의', link: '/' },
  { code: 'm2_4', selected: false, fix: false, group: '지침', name: '인수기준', link: '/' },
  { code: 'm2_5', selected: false, fix: false, group: '지침', name: '인수스코어', link: '/' },

  { code: 'm3_1', selected: false, fix: false, group: '영업관리', name: '수수료조회', link: '/' },
  { code: 'm3_2', selected: false, fix: false, group: '영업관리', name: '物비용처리', link: '/' },

  { code: 'm4_1', selected: false, fix: false, group: '설계', name: '다른상품설계', link: '/' },
  { code: 'm4_2', selected: false, fix: false, group: '설계', name: '동일상품복사', link: '/' },
  { code: 'm4_3', selected: false, fix: false, group: '설계', name: '계약복사', link: '/' },
  { code: 'm4_4', selected: false, fix: false, group: '설계', name: '설계비교', link: '/' },
  { code: 'm4_5', selected: false, fix: false, group: '설계', name: '건축물대장', link: '/' },
  { code: 'm4_6', selected: false, fix: false, group: '설계', name: '업종선택', link: '/' },
  { code: 'm4_7', selected: false, fix: false, group: '설계', name: '건물구조입력', link: '/' },
  { code: 'm4_8', selected: false, fix: false, group: '설계', name: '설계완료알림', link: '/' },
  { code: 'm4_9', selected: false, fix: false, group: '설계', name: '법정대리인등록', link: '/' },
  { code: 'm4_10', selected: false, fix: false, group: '설계', name: '담보순서조정', link: '/' },

  { code: 'm5_1', selected: false, fix: false, group: 'UW', name: '질병가이드', link: '/' },
  { code: 'm5_2', selected: false, fix: false, group: 'UW', name: '고지콕콕', link: '/' },
  { code: 'm5_3', selected: false, fix: false, group: 'UW', name: '청약완료불가사전안내', link: '/' },

  { code: 'm6_1', selected: false, fix: false, group: '스캔', name: '이미지조회', link: '/' },
  { code: 'm6_2', selected: false, fix: false, group: '스캔', name: '이미지스캔', link: '/' },
  { code: 'm6_3', selected: false, fix: false, group: '스캔', name: '원클릭스캔', link: '/' },
  { code: 'm6_4', selected: false, fix: false, group: '스캔', name: '전자문서지갑', link: '/' },

  { code: 'm7_1', selected: false, fix: false, group: 'TM', name: 'QA심사이력', link: '/' },
  { code: 'm7_2', selected: false, fix: false, group: 'TM', name: '통판스크립트', link: '/' },
  { code: 'm7_3', selected: false, fix: false, group: 'TM', name: '공통스크립트', link: '/' },
  { code: 'm7_4', selected: false, fix: false, group: 'TM', name: 'TMI마케팅동의', link: '/' },
];

const MAX_SELECTED_MENU = 7;

type Ltpz018Props = {
  onSaveMyMenuList?: (nextMenus: Ltpz018MenuItem[]) => void;
};

const Ltpz018 = ({ onSaveMyMenuList }: Ltpz018Props) => {
  const DATA_TABS = [
    { label: '전체메뉴', value: 'tab1' },
    { label: '편집모드', value: 'tab2' },
  ];
  const [menuList, setMenuList] = useState<MenuItem[]>(MENU_LIST);

  const uniqueMenuList = useMemo(
    () => menuList.filter((menu, index, list) => list.findIndex((item) => item.code === menu.code) === index),
    [menuList]
  );

  const fixedMenuCount = useMemo(() => uniqueMenuList.filter((menu) => menu.fix).length, [uniqueMenuList]);

  const [selectedMenuNames, setSelectedMenuNames] = useState<string[]>(
    MENU_LIST.filter((menu) => menu.selected).map((menu) => menu.code)
  );

  const showSelectionLimitToast = () => {
    toast.info('나의 메뉴는 최대 7개까지 선택할 수 있습니다.', { duration: 3000 });
  };

  const countNonFixedSelected = (codes: string[]) =>
    codes.filter((code) => {
      const target = uniqueMenuList.find((menu) => menu.code === code);
      return target !== undefined && !target.fix;
    }).length;

  const handleMenuSelectionChange = (nextValues: string[]) => {
    if (fixedMenuCount + countNonFixedSelected(nextValues) > MAX_SELECTED_MENU) {
      showSelectionLimitToast();
      return;
    }

    setSelectedMenuNames(nextValues);
    setMenuList((prev) =>
      prev.map((menu) => {
        if (menu.fix) return menu;
        return { ...menu, selected: nextValues.includes(menu.code) };
      })
    );
  };

  const handleRemoveMenu = (code: string) => {
    setSelectedMenuNames((prev) => prev.filter((selectedCode) => selectedCode !== code));
    setMenuList((prev) => prev.map((menu) => (menu.code === code ? { ...menu, selected: false } : menu)));
    setSelectedMenuCode((prev) => (prev === code ? null : prev));
  };

  const [selectedMenuCode, setSelectedMenuCode] = useState<string | null>(null);

  const handleMoveUp = () => {
    if (!selectedMenuCode) return;
    setSelectedMenuNames((prev) => {
      const idx = prev.indexOf(selectedMenuCode);
      if (idx <= 0) return prev;
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  const handleMoveDown = () => {
    if (!selectedMenuCode) return;
    setSelectedMenuNames((prev) => {
      const idx = prev.indexOf(selectedMenuCode);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };

  const { tabs, active, setActive } = useTabs(DATA_TABS);

  const handleSave = () => {
    const menuMap = new Map(uniqueMenuList.map((menu) => [menu.code, menu]));
    const nextMenus = selectedMenuNames
      .map((code) => menuMap.get(code))
      .filter((menu): menu is Ltpz018MenuItem => menu !== undefined);

    onSaveMyMenuList?.(nextMenus);
  };
  const groupedMenuList = useMemo(() => {
    const groups: { group: string; items: MenuItem[] }[] = [];
    for (const menu of MENU_LIST) {
      const last = groups[groups.length - 1];
      if (last?.group === menu.group) {
        last.items.push(menu);
      } else {
        groups.push({ group: menu.group, items: [menu] });
      }
    }
    return groups;
  }, []);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              바로가기 설정
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ018)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr] grid-cols-[1fr]">
          <Grid gap={5} className="grid-cols-[1fr_auto] place-items-stretch" placement="ss">
            <TabPager
              data={tabs}
              active={active}
              setActive={setActive}
              getValue={(tab) => String(tab.value)}
              renderTab={(tab) => <span>{tab.label}</span>}
            >
              <div className="w-full max-h-[46rem] overflow-y-auto">
                <Gcol variant="box-round-b" className="w-full flex-wrap h-[46rem] px-5 py-4" placement="ss" gap={2.5}>
                  {active === 'tab1' &&
                    groupedMenuList.map((g, gIdx) => (
                      <Gcol className="w-[14.8rem]" key={`group-${gIdx}`} placement="ss">
                        <Typo tag="h3" variant={'body-sm'} weight={'bold'}>
                          {g.group}
                        </Typo>
                        <Gcol className="w-auto" placement="ss">
                          {g.items.map((menu) => (
                            <Button
                              key={menu.code}
                              variant={'outlined'}
                              size={'md'}
                              color={'gray-light'}
                              className="w-[14.8rem]"
                            >
                              {menu.name}
                            </Button>
                          ))}
                        </Gcol>
                      </Gcol>
                    ))}

                  {active === 'tab2' &&
                    groupedMenuList.map((g, gIdx) => (
                      <Gcol className="w-[14.8rem]" key={`group-${gIdx}`} placement="ss">
                        <Typo tag="h3" variant={'body-sm'} weight={'bold'}>
                          {g.group}
                        </Typo>
                        <Gcol className="w-auto" placement="ss">
                          <CheckboxGroup
                            className="gap-1 [&>div]:min-w-[calc(25%_-_0.3rem)]"
                            value={selectedMenuNames}
                            onValueChange={handleMenuSelectionChange}
                          >
                            {g.items.map((menu) => (
                              <CheckboxGroupItem
                                variant="button"
                                key={menu.code}
                                value={menu.code}
                                size="lg"
                                className="w-[14.8rem]"
                                disabled={menu.fix}
                              >
                                {menu.name}
                              </CheckboxGroupItem>
                            ))}
                          </CheckboxGroup>
                        </Gcol>
                      </Gcol>
                    ))}
                </Gcol>
              </div>
            </TabPager>

            <Grid placement="ss" className="w-[15.2rem] h-full grid-rows-[auto_1fr]">
              <Grow className="w-full" placement="bwc">
                <Typo tag={'h3'} variant={'heading-md'}>
                  나의메뉴
                </Typo>
                {active === 'tab2' && (
                  <Grow>
                    <Button
                      variant={'outlined'}
                      size={'sm'}
                      color={'gray-light'}
                      only={'icon'}
                      aria-label="위로 이동"
                      disabled={!selectedMenuCode || selectedMenuNames.indexOf(selectedMenuCode) <= 0}
                      onClick={handleMoveUp}
                    >
                      <ArrowIcon size={13} color={'var(--color-primary-50)'} className="rotate-[90deg]" />
                    </Button>
                    <Button
                      variant={'outlined'}
                      size={'sm'}
                      color={'gray-light'}
                      only={'icon'}
                      aria-label="아래로 이동"
                      disabled={
                        !selectedMenuCode || selectedMenuNames.indexOf(selectedMenuCode) >= selectedMenuNames.length - 1
                      }
                      onClick={handleMoveDown}
                    >
                      <ArrowIcon size={13} color={'var(--color-primary-50)'} className="-rotate-[90deg]" />
                    </Button>
                  </Grow>
                )}
              </Grow>

              <Grow
                variant="box-line"
                className="w-full flex-wrap content-start overflow-y-auto relative overflow-x-hidden"
                placement="ss"
                gap={1}
              >
                <Gcol className="absolute top-0 w-full left-0 p-2.5">
                  {active === 'tab2' ? (
                    <>
                      {uniqueMenuList
                        .filter((menu) => menu.fix)
                        .map((menu) => (
                          <div
                            key={`mymenu-${menu.code}`}
                            tabIndex={0}
                            role="button"
                            onClick={() => setSelectedMenuCode((prev) => (prev === menu.code ? null : menu.code))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ')
                                setSelectedMenuCode((prev) => (prev === menu.code ? null : menu.code));
                            }}
                            className={`flex w-full items-center justify-between gap-2 px-2 rounded-[0.3rem] text-[#fff] h-[3.2rem] text-[1.2rem] font-bold cursor-pointer outline-none bg-[var(--color-gray-20)]`}
                          >
                            <div className="truncate w-[10rem]">{menu.name}</div>
                          </div>
                        ))}
                      {selectedMenuNames
                        .map((code) => uniqueMenuList.find((menu) => menu.code === code))
                        .filter((menu): menu is MenuItem => menu !== undefined && !menu.fix)
                        .map((menu) => (
                          <div
                            key={`mymenu-${menu.code}`}
                            tabIndex={0}
                            role="button"
                            onClick={() => setSelectedMenuCode((prev) => (prev === menu.code ? null : menu.code))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ')
                                setSelectedMenuCode((prev) => (prev === menu.code ? null : menu.code));
                            }}
                            className={`flex w-full items-center justify-between gap-2 px-2 rounded-[0.3rem] text-[#fff] h-[3.2rem] text-[1.2rem] font-bold cursor-pointer outline-none ${
                              selectedMenuCode === menu.code
                                ? 'bg-[var(--color-primary-50)] ring-2 ring-[var(--color-primary-30)]'
                                : 'bg-[var(--color-gray-50)]'
                            }`}
                          >
                            <div className="truncate w-[10rem]">{menu.name}</div>
                            <Button
                              variant={'none'}
                              only={'icon'}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveMenu(menu.code);
                              }}
                              className="w-[1.2rem] h-[1.2rem]"
                            >
                              <InputClearIcon size={12} />
                            </Button>
                          </div>
                        ))}
                    </>
                  ) : (
                    <>
                      {uniqueMenuList
                        .filter((menu) => menu.fix)
                        .map((menu) => (
                          <Button
                            key={`mymenu-${menu.code}`}
                            variant={'contained'}
                            size={'xl'}
                            color={'gray'}
                            className="w-full text-[1.2rem] rounded-[0.3rem]"
                          >
                            {menu.name}
                          </Button>
                        ))}
                      {selectedMenuNames
                        .map((code) => uniqueMenuList.find((menu) => menu.code === code))
                        .filter((menu): menu is MenuItem => menu !== undefined && !menu.fix)
                        .map((menu) => (
                          <Button
                            key={`mymenu-${menu.code}`}
                            variant={'contained'}
                            size={'xl'}
                            color={'gray'}
                            className="w-full text-[1.2rem] rounded-[0.3rem]"
                          >
                            {menu.name}
                          </Button>
                        ))}
                    </>
                  )}
                </Gcol>
              </Grow>
            </Grid>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                설정
              </Button>
            </Grow>
            <Grow>
              {active === 'tab2' && (
                <>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>
                    TMT설정 적용
                  </Button>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>
                    기본설정 적용
                  </Button>
                  <Button variant={'contained'} size={'xl'} onClick={handleSave}>
                    저장
                  </Button>
                </>
              )}
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz018;
