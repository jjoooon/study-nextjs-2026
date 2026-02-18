'use client';

import React from 'react';
import { Grow, Typo, BulletList, BulletListItem } from '@/shared/components/common';
import { ArrowLightIcon, ListIcon } from '@/shared/components/icons';
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
  TabsLine,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/shared/components/uiux';
import { useTabsPagination } from '@/shared/hooks/useTabsPagination';
import type { TabDataType } from '@/features/pub/proto/types/LTRA350Data.types';

interface TabHeadProps {
  data: TabDataType[];
  visibleCount: number;
  children: React.ReactNode;
}

export function TabHead({ data, visibleCount = 6, children }: TabHeadProps) {
  const [active, setActive] = React.useState('tab1');

  // tab pagination 훅 사용
  const { visibleStart, end, handlePrev, handleNext, isLastPage, setVisibleStart } = useTabsPagination(
    data,
    visibleCount,
    active
  );

  return (
    <>
      <Tabs value={active} onValueChange={setActive} className="w-full h-full grid grid-rows-[auto_1fr] content-start">
        <TabsLine>
          <TabsList>
            {data.slice(visibleStart, end).map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="flex items-center">
                      <span className="max-w-[8rem] truncate block">{tab.name}</span>
                      <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <BulletList>
                      {tab.info.map((info, index) => (
                        <BulletListItem key={index} type="dot">
                          {info}
                        </BulletListItem>
                      ))}
                    </BulletList>
                  </HoverCardContent>
                </HoverCard>
              </TabsTrigger>
            ))}
          </TabsList>
          <Grow className="gap-[.4rem] mb-[.2rem]">
            <Grow className="gap-[.1rem]">
              <Typo className="tracking-[0]!" color="primary" weight="bold">
                {Math.ceil((visibleStart + visibleCount) / visibleCount)}
              </Typo>
              <Typo className="tracking-[0]!" color="gray-light" weight="bold">
                /
              </Typo>
              <Typo className="tracking-[0]!" color="gray-light" weight="bold">
                {Math.ceil(data.length / visibleCount)}
              </Typo>
            </Grow>
            <Button
              variant="outlined"
              color="gray-light"
              size="icon-md"
              onClick={handlePrev}
              disabled={visibleStart === 0}
            >
              <ArrowLightIcon className="rotate-180" />
            </Button>
            <Button variant="outlined" color="gray-light" size="icon-md" onClick={handleNext} disabled={isLastPage}>
              <ArrowLightIcon />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlined" color="gray-light" size="icon-md">
                  <ListIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-auto p-3 flex flex-col gap-1 overflow-auto" align="end">
                {data.map((tab) => (
                  <Button
                    variant="text"
                    key={tab.value}
                    onClick={() => {
                      setActive(tab.value);
                      // 해당 탭이 보이도록 페이지네이션 이동
                      const idx = data.findIndex((t) => t.value === tab.value);
                      if (idx !== -1) {
                        const page = Math.floor(idx / visibleCount);
                        setVisibleStart(page * visibleCount);
                      }
                    }}
                  >
                    {tab.name}
                  </Button>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </Grow>
        </TabsLine>
        <TabsContent value={active}>{children}</TabsContent>
      </Tabs>
    </>
  );
}
