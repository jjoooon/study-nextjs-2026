'use client';

import { useState } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { BulletList, BulletListItem } from '@common/BulletList';
import { TabPager } from '@common/TabPager';
import { LayoutMain } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { Ltpa35002a } from './Ltpa35002a';
import { Ltpa35002b } from './Ltpa35002b';
import { Ltpa35002c } from './Ltpa35002c';
import { Ltpa35002d } from './Ltpa35002d';
import '@/shared/lib/agGridPub';

interface TabDataType {
  id: string | number;
  name?: string;
  age?: string | number;
  gender?: string;
  value: string;
  error?: boolean;
  info: string[];
}

interface Ltpa35002Props {
  onIsWidthExpandedChange?: (isExpanded: boolean) => void;
}

const TabData: TabDataType[] = [
  {
    id: 1,
    name: '인보험/단체',
    age: '1',
    gender: '여',
    value: 'tab1',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
  },
  {
    id: 2,
    name: '태아',
    age: '1',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 3,
    name: '목적물',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 4,
    name: '연금/저축',
    age: '2',
    gender: '남',
    value: 'tab4',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
];

export function Ltpa35002({ onIsWidthExpandedChange }: Ltpa35002Props) {
  // =====================
  // 상태 및 참조 관리
  // =====================
  const [isWidthExpanded, setIsWidthExpanded] = useState(false);
  const tabListData = TabData;
  const stringifiedTabs: TabDataType[] = tabListData.map((item) => ({ ...item, value: String(item.id) }));
  const { tabs: Tabs, active: TabActive, setActive: TabSetActive } = useTabs<TabDataType>(stringifiedTabs);

  const handleSetIsWidthExpanded = (value: boolean) => {
    setIsWidthExpanded(value);
    onIsWidthExpandedChange?.(value);
  };

  const renderByTabValue = () => {
    switch (TabActive) {
      case '1':
        return <Ltpa35002a isWidthExpanded={isWidthExpanded} setIsWidthExpanded={handleSetIsWidthExpanded} />;
      case '2':
        return <Ltpa35002b isWidthExpanded={isWidthExpanded} setIsWidthExpanded={handleSetIsWidthExpanded} />;
      case '3':
        return <Ltpa35002c />;
      case '4':
        return <Ltpa35002d isWidthExpanded={isWidthExpanded} setIsWidthExpanded={handleSetIsWidthExpanded} />;
      default:
        return null;
    }
  };

  return (
    <>
      <form
        id="page2-MainForm"
        className="w-full h-full"
        onSubmit={(event) => {
          event.preventDefault();
        }}
        noValidate
      >
        <LayoutMain
          className={`grid ${TabActive !== '4' ? 'grid-rows-[auto_1fr]' : 'grid-rows-[1fr]'} gap-0 h-full w-full`}
        >
          {TabActive !== '4' && (
            <TabPager
              data={Tabs}
              active={TabActive}
              setActive={TabSetActive}
              visibleCount={5}
              error={false}
              errorMsg="입력하세요."
              getValue={(tab) => String(tab.id)}
              renderTab={(tab) => (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex items-center">
                      <span className="max-w-20 truncate block">{tab.name}</span>
                      <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={8}>
                    <BulletList className="gap-[0.5rem]">
                      {tab.info.map((info: string, index: number) => (
                        <BulletListItem key={index} type="dot">
                          {info}
                        </BulletListItem>
                      ))}
                    </BulletList>
                  </TooltipContent>
                </Tooltip>
              )}
              renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => (
                <Button
                  variant={'none'}
                  key={String(tab.id)}
                  onClick={() => {
                    setActive(String(tab.id));
                    const idx = data.findIndex((t) => String(t.id) === String(tab.id));
                    if (idx !== -1) {
                      const page = Math.floor(idx / visibleCount);
                      setVisibleStart(page * visibleCount);
                    }
                  }}
                >
                  <span className="flex items-start gap-2 w-full">
                    <span className="block">{tab.name}</span>
                    <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                  </span>
                </Button>
              )}
            />
          )}
          {TabActive === null ? <div>탭을 선택해주세요.</div> : renderByTabValue()}
        </LayoutMain>
      </form>
    </>
  );
}
