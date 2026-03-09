    'user client';

import React from 'react';
import { Gcol, Grow, Grid, Typo } from '@atoms';
import { Tabs, TabsContent, TabsList, TabsPanel, TabsLine, TabsTrigger } from "@uiux/Tabs";
import { useTabs } from "@/shared/hooks/useTabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselPagination 
} from '@uiux/Carousel';

const DATA_TABS_1 = [
  { value: 'userSearchHead1', label: '최근등록고객' },
  { value: 'userSearchHead2', label: '미등록고객' },
];

const slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5', 'Slide 6', 'Slide 7', 'Slide 8', 'Slide 9', 'Slide 10', 'Slide 11', 'Slide 12'];

export default function UserSearchHead() {
  const { 
    tabs, active: 
    name_active, 
    setActive: name_setActive, 
    handleRemove: name_handleRemove 
  } = useTabs(DATA_TABS_1);

  // 토글 버튼 그룹 상태: 선택된 인덱스
  const [selectedIdx, setSelectedIdx] = React.useState(0);

  return (
    <Grow className="w-full ">
      <Tabs
        variant={"vertical"}
        onRemove={name_handleRemove}
        value={name_active}
        onValueChange={name_setActive}
        className="grid grid-cols-[9.8rem_1fr] w-full h-full gap-0 "
      >
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent value={tab.value} key={tab.value} className="w-full h-full relative bg-[#F3F4F6] px-4 pt-3 rounded-tr-[1rem] rounded-br-[1rem] gap-4">
            {tab.value === 'userSearchHead1' ? (
              <>
                <Carousel opts={{slidesToScroll: 4,}} className='w-[33rem] '>
                  <CarouselContent className="h-[6.8rem]">
                    {slides.map((text, idx) => (
                      <CarouselItem key={text} className='basis-1/4'>
                        <button
                          type="button"
                          aria-pressed={selectedIdx === idx}
                          className={
                            `h-[6rem] w-[7.8rem] rounded-md border flex items-center justify-center bg-[#FFF] text-[1.3rem] transition-colors ` +
                            (selectedIdx === idx
                              ? 'border-[#ff5c2e] border-[0.2rem] font-bold shadow-[0.4rem_0.6rem_0.6rem_0_rgba(34,34,34,0.1)]'
                              : 'text-black border-[var(--color-coolgray-30)] opacity-70 hover:border-[#ff5c2e]')
                          }
                          onClick={() => setSelectedIdx(idx)}
                        >
                          {text}
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPagination />
                </Carousel>
              </>
            ) : (
              <Typo tag="h3" className="text-gray-700">
                미등록고객
              </Typo>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </Grow>
  );
}