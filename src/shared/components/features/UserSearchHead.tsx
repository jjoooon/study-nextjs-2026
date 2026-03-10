    'user client';

import React from 'react';
import { Gcol, Grow, Grid, Typo } from '@atoms';
import { ArrowLightIcon } from '@icons';
import { Button } from '@uiux/Button';
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



interface User {
  id: string;
  name?: string;
  age: number;
  gender: string;
  date?: string; // For unregistered customers: date info
  grade?: string; // For unregistered customers: grade info
  jab?: string; // For registered customers: job info
  history?: string; // For registered customers: medical history
  plan?: string; // For registered customers: plan progress info
  product?: string; // For registered customers: product recommendation info
}

interface TabData {
  id: string;
  tabName: string;
  data: User[];
}

interface UserSearchHeadProps {
  data: {
    [key: string]: TabData;
  };
}

export default function UserSearchHead({ data }: UserSearchHeadProps) {
  const dataTabs = Object.values(data).map((item) => ({
    value: `userSearchHead${item.id}`,
    label: item.tabName,
    data: item.data,
  }));

  const { tabs, active: name_active, setActive: name_setActive, handleRemove: name_handleRemove } = useTabs(dataTabs);
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
        {tabs.map((tab, tabIdx) => (
          <TabsContent value={tab.value} key={tab.value} className="min-w-[108.6rem] w-full h-full relative bg-[#F3F4F6] px-4 pt-3 rounded-tr-[1rem] rounded-br-[1rem] gap-4">
            <Grow gap={3} placement={'ss'}>
              <Grow gap={'1'} placement={'cs'}>
                <Carousel opts={{ slidesToScroll: 4 }} className="w-[33rem] ">
                  <CarouselContent className="h-[6.8rem]">
                    {tab.data && Array.isArray(tab.data) && tab.data.map((item, idx) => (
                      <CarouselItem key={item.id} className='basis-1/4'>
                        <button
                          type="button"
                          aria-pressed={selectedIdx === idx && name_active === tab.value}
                          className={
                            `items-start h-[6rem] w-[7.8rem] rounded-md border flex items-center justify-center bg-[#FFF] text-[1.3rem] transition-colors ` +
                            (selectedIdx === idx && name_active === tab.value
                              ? 'border-[0.2rem] border-[#ff5c2e] shadow-[0.4rem_0.6rem_0.6rem_0_rgba(34,34,34,0.1)]'
                              : 'text-black border-[var(--color-coolgray-30)] opacity-70 hover:border-[#ff5c2e]')
                          }
                          onClick={() => setSelectedIdx(idx)}
                        >
                          <Gcol gap={'0'} placement={'cs'} className="h-full w-full p-2.5 tracking-tighter">
                          {item.name ? (
                            <>
                              <Typo variant={'body-sm'} weight={'bold'} className="text-[#000]">{item.name}</Typo>
                              <Typo variant={'body-xs'}>{item.age}세({item.gender})</Typo>
                            </>
                          ) : (
                            <>
                              <Typo variant={'body-sm'} weight={'bold'} className="text-[#000]">{item.age}세({item.gender})</Typo>
                              <Typo variant={'body-xs'} weight={'normal'}>{item.grade}등급</Typo>
                            </>
                          )}
                          </Gcol>
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPagination />
                </Carousel>
                <Gcol> 
                  <Button color={'gray'} size={'lg'} onClick={() => setSelectedIdx(0)}>
                    고객찾기
                  </Button>
                  <Button variant={'outlined'} size={'lg'} color={'gray'} onClick={() => setSelectedIdx(0)}>
                    고객등록
                  </Button>
                </Gcol>
              </Grow>
              {tab.data && tab.data[selectedIdx] ? (
                tab.value === 'userSearchHead1' ? (
                  <Grow gap={4} placement={'sc'} className="w-full flex-1 h-[6.8rem] justify-stretch items-stretch p-0 overflow-hidden border border-[var(--color-coolgray-80)] rounded-[0.8rem] pr-[1.6rem] bg-[#fff]">
                    <Gcol className="w-[13rem] px-3 bg-[var(--color-coolgray-10)]" placement={'cs'}>
                      <Typo variant={'body-sm'}>고객정보</Typo>
                      <Typo variant={'body-md'} weight={'bold'}>
                        {tab.data[selectedIdx].name ?? '-'} 
                        {tab.data[selectedIdx].age ?? '-'}세({tab.data[selectedIdx].gender ?? '-'})
                      </Typo>
                    </Gcol>
                    <Grid className="grid-cols-[1fr_1fr] flex-1 place-content-center  gap-x-6 gap-y-[0.6rem] ">
                      <Grow gap={'0'} placement={'bwc'}>
                        <Typo variant={'body-sm'}>직업</Typo>
                        <Typo variant={'body-md'} weight={'bold'}>
                          {tab.data[selectedIdx].jab ?? '-'} 
                        </Typo>
                      </Grow>
                      <Grow gap={'0'} placement={'bwc'}>
                        <Typo variant={'body-sm'}>{tab.data[selectedIdx].product ?? '-'} </Typo>
                        <Button variant={'text'} size={'sm'}>
                          <Typo variant={'body-md'} weight={'bold'}>동의</Typo>
                          <ArrowLightIcon size={12} color={'#000'} />
                        </Button>
                      </Grow>
                      <Grow gap={'0'} placement={'bwc'}>
                        <Typo variant={'body-sm'}>입원/수술</Typo>
                        <Typo variant={'body-md'} weight={'bold'}>
                          {tab.data[selectedIdx].history ?? '-'} 
                        </Typo>
                      </Grow>
                      <Grow gap={'0'} placement={'bwc'}>
                        <Typo variant={'body-sm'}>보장분석 <span className="text-[var(--color-primary-50)]!">({tab.data[selectedIdx].plan ?? '-'} )</span></Typo>
                        <Button variant={'text'} size={'sm'}>
                          <Typo variant={'body-md'} weight={'bold'}>보기</Typo>
                          <ArrowLightIcon size={12} color={'#000'} />
                        </Button>
                      </Grow>
                    </Grid>
                  </Grow>
                ) : (
                  <Grow variant={'box-line'} placement={'sc'} className="w-full flex-1 h-full items-stretch">
                    <div><b>나이:</b> {tab.data[selectedIdx].age}</div>
                    <div><b>성별:</b> {tab.data[selectedIdx].gender}</div>
                    <div><b>날짜:</b> {tab.data[selectedIdx].date ?? '-'}</div>
                    <div><b>등급:</b> {tab.data[selectedIdx].grade ?? '-'}</div>
                  </Grow>
                )
              ) : (
                <span style={{ color: '#aaa' }}>선택된 정보가 없습니다.</span>
              )}
            </Grow>
          </TabsContent>
        ))}
      </Tabs>
    </Grow>
  );
}