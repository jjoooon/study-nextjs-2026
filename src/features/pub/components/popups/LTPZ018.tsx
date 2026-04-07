'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { Gcol, Grow, Grid, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogTrigger,
  DialogClose,
} from '@uiux/Dialog';

import type { PopupBaseProps } from './types';

type MenuItem = {
  code: string;
  name: string;
  link: string;
};

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ018 = ({ open, onOpenChange }: PopupBaseProps) => {
  const DATA_TABS = [
    { label: '전체메뉴', value: 'tab1' },
    { label: '편집모드', value: 'tab2' },
  ];
  const menuList: MenuItem[] = [
    { code: 'm01', name: '설계완료알림', link: '/' },
    { code: 'm02', name: '다른상품설계', link: '/' },
    { code: 'm03', name: '수수료조회', link: '/' },
    { code: 'm04', name: '실손정액조회', link: '/' },

    { code: 'm05', name: '동일상품복사', link: '/' },
    { code: 'm06', name: '物비용처리', link: '/' },
    { code: 'm07', name: '설계비교', link: '/' },
    { code: 'm08', name: '계약복사', link: '/' },

    { code: 'm09', name: 'QA심사이력', link: '/' },
    { code: 'm10', name: '동의현황', link: '/' },
    { code: 'm11', name: '부실유의', link: '/' },
    { code: 'm12', name: '통판스크립트', link: '/' },

    { code: 'm13', name: '이미지조회', link: '/' },
    { code: 'm14', name: '인수기준', link: '/' },
    { code: 'm15', name: '공통스크립트', link: '/' },
    { code: 'm16', name: '이미지스캔', link: '/' },

    { code: 'm17', name: '인수스코어', link: '/' },
    { code: 'm18', name: 'TM마케팅동의', link: '/' },
    { code: 'm19', name: '질병가이드', link: '/' },
    { code: 'm20', name: '건출물대장', link: '/' },

    { code: 'm21', name: '전자문서지갑', link: '/' },
    { code: 'm23', name: '업종선택', link: '/' },
    { code: 'm24', name: '한눈에(통합)', link: '/' },
    { code: 'm25', name: '건물구조입력', link: '/' },

    { code: 'm26', name: '질문하기', link: '/' },
    { code: 'm27', name: '설계 매뉴얼', link: '/' },
    { code: 'm28', name: '실손정액조회', link: '/' },
    { code: 'm29', name: '전체누적', link: '/' },

    { code: 'm30', name: '약관조회', link: '/' },
    { code: 'm31', name: '부실유의', link: '/' },
    { code: 'm32', name: '설계동의', link: '/' },
    { code: 'm33', name: '수수료조회', link: '/' },

    { code: 'm34', name: '원클릭스캔', link: '/' },
    { code: 'm22', name: '청약완료불가사전안내', link: '/' },
  ];
  const myMenuList: MenuItem[] = [
    { code: 'm01', name: '설계완료알림', link: '/' },
    { code: 'm02', name: '다른상품설계', link: '/' },
    { code: 'm03', name: '수수료조회', link: '/' },
    { code: 'm04', name: '실손정액조회', link: '/' },
  ];

  const uniqueMenuList = useMemo(
    () => menuList.filter((menu, index, list) => list.findIndex((item) => item.code === menu.code) === index),
    [menuList]
  );

  const initialSelectedMenuNames = useMemo(() => {
    const initialNameSet = new Set(myMenuList.map((menu) => menu.code));
    return uniqueMenuList
      .filter((menu) => initialNameSet.has(menu.code))
      .map((menu) => menu.code)
      .slice(0, 7);
  }, [myMenuList, uniqueMenuList]);

  const [selectedMenuNames, setSelectedMenuNames] = useState<string[]>(initialSelectedMenuNames);

  const myMenu = useMemo(() => {
    const menuMap = new Map(uniqueMenuList.map((menu) => [menu.code, menu]));
    return selectedMenuNames.map((code) => menuMap.get(code)).filter((menu): menu is MenuItem => menu !== undefined);
  }, [selectedMenuNames, uniqueMenuList]);

  const handleMenuSelectionChange = (nextValues: string[]) => {
    if (nextValues.length <= 7) {
      setSelectedMenuNames(nextValues);
    }
  };

  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                  menuList.map((menu, idx) => (
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
                  <CheckboxGroup className="gap-1" value={selectedMenuNames} onValueChange={handleMenuSelectionChange}>
                    {uniqueMenuList.map((menu) => (
                      <CheckboxGroupItem
                        variant="button"
                        key={menu.code}
                        value={menu.code}
                        className="min-w-[10.5rem]"
                        size="lg"
                        disabled={selectedMenuNames.length >= 7 && !selectedMenuNames.includes(menu.code)}
                      >
                        {menu.name}
                      </CheckboxGroupItem>
                    ))}
                  </CheckboxGroup>
                )}
              </Grow>
            </TabPager>

            <Grid placement="ss" className="w-[15.2rem] h-full grid-rows-[auto_1fr]">
              <Typo tag={'h3'} variant={'heading-md'}>
                나의 메뉴
              </Typo>
              <Grow variant="box-line" className="w-full flex-wrap content-start" placement="ss" gap={1}>
                {active === 'tab2' ? (
                  <CheckboxGroup
                    className="gap-1 w-full"
                    value={selectedMenuNames}
                    onValueChange={handleMenuSelectionChange}
                  >
                    {myMenu.map((menu) => (
                      <CheckboxGroupItem
                        variant="button"
                        key={`mymenu-edit-${menu.code}`}
                        value={menu.code}
                        className="w-full"
                        size="lg"
                      >
                        {menu.name}
                      </CheckboxGroupItem>
                    ))}
                  </CheckboxGroup>
                ) : (
                  myMenu.map((menu) => (
                    <Button
                      key={`mymenu-${menu.code}`}
                      variant={'contained'}
                      size={'md'}
                      color={'gray'}
                      className="w-full"
                    >
                      {menu.name}
                    </Button>
                  ))
                )}
              </Grow>
            </Grid>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                저장
              </Button>
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
