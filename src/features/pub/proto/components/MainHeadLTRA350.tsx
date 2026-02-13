'use client';

import React from 'react';
import { useTabsPagination } from '@/features/pub/proto/hooks/useTabsPagination';
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

const VISIBLE_COUNT = 6; //탭 최대 노출 갯수
const mockData = [
  {
    name: '반짝빛나리반짝빛나리',
    age: '1',
    gender: '여',
    value: 'tab1',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '4',
    gender: '남',
    value: 'tab4',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '5',
    gender: '여',
    value: 'tab5',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '6',
    gender: '여',
    value: 'tab6',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '7',
    gender: '남',
    value: 'tab7',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '8',
    gender: '남',
    value: 'tab8',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '9',
    gender: '여',
    value: 'tab9',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '10',
    gender: '남',
    value: 'tab10',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '11',
    gender: '여',
    value: 'tab11',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '12',
    gender: '남',
    value: 'tab12',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '13',
    gender: '남',
    value: 'tab13',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '14',
    gender: '여',
    value: 'tab14',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '15',
    gender: '남',
    value: 'tab15',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
];

export function MainHeadLTRA350() {
  const [active, setActive] = React.useState('tab1');

  // tab pagination 훅 사용
  const { visibleStart, end, handlePrev, handleNext, isLastPage, setVisibleStart } = useTabsPagination(
    mockData,
    VISIBLE_COUNT,
    active
  );

  return (
    <>
      <Tabs value={active} onValueChange={setActive} className="w-full h-full grid grid-rows-[auto_1fr] content-start">
        <TabsLine>
          <TabsList>
            {mockData.slice(visibleStart, end).map((tab) => (
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
          <Grow className="gap-[.4rem] mb-[.1rem]">
            <Grow className="gap-[.2rem]">
              <Typo className="tracking-[0]!" color="primary" weight="bold">
                {Math.ceil((visibleStart + VISIBLE_COUNT) / VISIBLE_COUNT)}
              </Typo>
              <Typo className="tracking-[0]!" color="gray-light" weight="bold">
                /
              </Typo>
              <Typo className="tracking-[0]!" color="gray-light" weight="bold">
                {Math.ceil(mockData.length / VISIBLE_COUNT)}
              </Typo>
            </Grow>
            <Button
              variant="outlined"
              color="gray-light"
              onlyicon={true}
              onClick={handlePrev}
              disabled={visibleStart === 0}
            >
              <ArrowLightIcon className="rotate-180" />
            </Button>
            <Button variant="outlined" color="gray-light" onlyicon={true} onClick={handleNext} disabled={isLastPage}>
              <ArrowLightIcon />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlined" color="gray-light" onlyicon={true}>
                  <ListIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-auto p-3 flex flex-col gap-1 overflow-auto" align="end">
                {mockData.map((tab) => (
                  <Button
                    variant="text"
                    key={tab.value}
                    onClick={() => {
                      setActive(tab.value);
                      // 해당 탭이 보이도록 페이지네이션 이동
                      const idx = mockData.findIndex((t) => t.value === tab.value);
                      if (idx !== -1) {
                        const page = Math.floor(idx / VISIBLE_COUNT);
                        setVisibleStart(page * VISIBLE_COUNT);
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
        <TabsContent value={active}></TabsContent>
      </Tabs>
    </>
  );
}
