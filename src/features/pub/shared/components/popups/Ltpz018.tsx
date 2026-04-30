'use client';

import '@/shared/lib/agGridPub';
import { Grid, Grow, Typo, Gcol } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TabPager } from '@common/TabPager';
import { InputClearIcon, PlusIcon, ArrowIcon } from '@icons';
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
import { useMemo, useState } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';


type MenuItem = {
  code: string;
  name: string;
  link: string;
  fix?: boolean;
};

export type Ltpz018MenuItem = {
  code: string;
  name: string;
  link: string;
  fix?: boolean;
};

const MENU_LIST: MenuItem[] = [
  { code: 'm01', fix: true, name: '설계완료알림', link: '/' },
  { code: 'm02', fix: false, name: '다른상품설계', link: '/' },
  { code: 'm03', fix: false, name: '수수료조회', link: '/' },
  { code: 'm04', fix: true, name: '실손정액조회', link: '/' },

  { code: 'm05', fix: false, name: '동일상품복사', link: '/' },
  { code: 'm06', fix: false, name: '物비용처리', link: '/' },
  { code: 'm07', fix: false, name: '설계비교', link: '/' },
  { code: 'm08', fix: false, name: '계약복사', link: '/' },

  { code: 'm09', fix: false, name: 'QA심사이력', link: '/' },
  { code: 'm10', fix: false, name: '동의현황', link: '/' },
  { code: 'm11', fix: false, name: '부실유의', link: '/' },
  { code: 'm12', fix: false, name: '통판스크립트', link: '/' },

  { code: 'm13', fix: false, name: '이미지조회', link: '/' },
  { code: 'm14', fix: false, name: '인수기준', link: '/' },
  { code: 'm15', fix: false, name: '공통스크립트', link: '/' },
  { code: 'm16', fix: false, name: '이미지스캔', link: '/' },

  { code: 'm17', fix: false, name: '인수스코어', link: '/' },
  { code: 'm18', fix: false, name: 'TM마케팅동의', link: '/' },
  { code: 'm19', fix: false, name: '질병가이드', link: '/' },
  { code: 'm20', fix: false, name: '건출물대장', link: '/' },

  { code: 'm21', fix: false, name: '전자문서지갑', link: '/' },
  { code: 'm23', fix: false, name: '업종선택', link: '/' },
  { code: 'm24', fix: false, name: '한눈에(통합)', link: '/' },
  { code: 'm25', fix: false, name: '건물구조입력', link: '/' },

  { code: 'm26', fix: false, name: '질문하기', link: '/' },
  { code: 'm27', fix: false, name: '설계 매뉴얼', link: '/' },
  { code: 'm28', fix: false, name: '실손정액조회', link: '/' },
  { code: 'm29', fix: false, name: '전체누적', link: '/' },

  { code: 'm30', fix: false, name: '약관조회', link: '/' },
  { code: 'm31', fix: false, name: '부실유의', link: '/' },
  { code: 'm32', fix: false, name: '설계동의', link: '/' },
  { code: 'm33', fix: false, name: '수수료조회', link: '/' },

  { code: 'm34', fix: false, name: '원클릭스캔', link: '/' },
  { code: 'm22', fix: false, name: '청약완료불가사전안내', link: '/' },
];

const MY_MENU_LIST: MenuItem[] = [
  { code: 'm01', fix: true, name: '설계완료알림', link: '/' },
  { code: 'm02', fix: false, name: '다른상품설계', link: '/' },
  { code: 'm03', fix: false, name: '수수료조회', link: '/' },
  { code: 'm04', fix: true, name: '실손정액조회', link: '/' },
];

type Ltpz018Props = PopupBaseProps & {
  myMenuList?: Ltpz018MenuItem[];
  onSaveMyMenuList?: (nextMenus: Ltpz018MenuItem[]) => void;
};

export const Ltpz018 = ({ open, onOpenChange, myMenuList, onSaveMyMenuList }: Ltpz018Props) => {
  const DATA_TABS = [
    { label: '전체메뉴', value: 'tab1' },
    { label: '편집모드', value: 'tab2' },
  ];
  const uniqueMenuList = useMemo(
    () => MENU_LIST.filter((menu, index, list) => list.findIndex((item) => item.code === menu.code) === index),
    []
  );

  const initialSelectedMenuNames = useMemo(() => {
    const sourceMenuList = myMenuList ?? MY_MENU_LIST;
    const initialNameSet = new Set(sourceMenuList.map((menu) => menu.code));
    return uniqueMenuList.filter((menu) => initialNameSet.has(menu.code)).map((menu) => menu.code);
  }, [myMenuList, uniqueMenuList]);

  const [selectedMenuNames, setSelectedMenuNames] = useState<string[]>(initialSelectedMenuNames);

  const myMenu = useMemo(() => {
    const menuMap = new Map(uniqueMenuList.map((menu) => [menu.code, menu]));
    return selectedMenuNames.map((code) => menuMap.get(code)).filter((menu): menu is MenuItem => menu !== undefined);
  }, [selectedMenuNames, uniqueMenuList]);

  const handleMenuSelectionChange = (nextValues: string[]) => {
    setSelectedMenuNames(nextValues);
  };

  const handleRemoveMenu = (code: string) => {
    setSelectedMenuNames((prev) => prev.filter((selectedCode) => selectedCode !== code));
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
    onOpenChange?.(false);
  };

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
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

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grid gap={5} className="grid-cols-[1fr_auto] place-items-stretch" placement="ss">
            <TabPager
              data={tabs}
              active={active}
              setActive={setActive}
              getValue={(tab) => String(tab.value)}
              renderTab={(tab) => <span>{tab.label}</span>}
            >
              <Grow variant="box-round-b" className="w-full flex-wrap" placement="ss">
                {active === 'tab1' &&
                  MENU_LIST.map((menu, idx) => (
                    <Button
                      key={`menu-${idx}`}
                      variant={'outlined'}
                      size={'md'}
                      color={'gray-light'}
                      className="min-w-[calc(25%_-_0.3rem)]"
                    >
                      {menu.name}
                    </Button>
                  ))}
                {active === 'tab2' && (
                  <CheckboxGroup
                    className="gap-1 [&>div]:min-w-[calc(25%_-_0.3rem)]"
                    value={selectedMenuNames}
                    onValueChange={handleMenuSelectionChange}
                  >
                    {uniqueMenuList.map((menu) => (
                      <CheckboxGroupItem
                        variant="button"
                        key={menu.code}
                        value={menu.code}
                        size="lg"
                        className="w-full"
                        disabled={menu.fix}
                      >
                        {menu.name}
                      </CheckboxGroupItem>
                    ))}
                  </CheckboxGroup>
                )}
              </Grow>
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
                      {myMenu.map((menu) => (
                        <div
                          key={`mymenu-${menu.code}`}
                          tabIndex={0}
                          role="button"
                          onClick={() => setSelectedMenuCode((prev) => (prev === menu.code ? null : menu.code))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ')
                              setSelectedMenuCode((prev) => (prev === menu.code ? null : menu.code));
                          }}
                          className={`flex w-full items-center justify-between gap-2 px-2 rounded-[0.3rem] text-[#fff] h-[2.2rem] text-[1.2rem] font-bold cursor-pointer outline-none ${
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
                            disabled={menu.fix ? true : false}
                          >
                            <InputClearIcon size={12} />
                          </Button>
                        </div>
                      ))}
                      {Array.from({ length: Math.max(0, 7 - myMenu.length) }).map((_, i) => (
                        <div
                          key={`mymenu-empty-${i}`}
                          className="flex w-full items-center justify-between px-2 bg-[var(--color-gray-5)] rounded-[0.3rem] text-[var(--color-gray-30)] h-[2.2rem] text-[1.2rem] border border-dashed border-[var(--color-gray-15)] justify-center"
                        >
                          <PlusIcon size={12} />
                          추가
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {myMenu.map((menu) => (
                        <Button
                          key={`mymenu-${menu.code}`}
                          variant={'contained'}
                          size={'sm'}
                          color={'gray'}
                          className="w-full"
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
