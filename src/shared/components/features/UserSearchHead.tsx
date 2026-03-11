'user client';

import React from 'react';
import { Gcol, Grow, Grid, Typo } from '@atoms';
import { ArrowIcon, FlagCheckIcon, CheckIcon, ZoomInIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Tabs, TabsContent, TabsList, TabsPanel, TabsLine, TabsTrigger } from "@uiux/Tabs";
import { Input } from '@uiux/Input';
import { DatePickerInput } from '@common/DatePicker';
import { useTabs } from "@/shared/hooks/useTabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselPagination 
} from '@uiux/Carousel';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';



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

  // 각 탭별로 선택된 인덱스를 기억하는 상태
  const [selectedIdxMap, setSelectedIdxMap] = React.useState<{ [tabValue: string]: number }>({});

  // 각 탭별 데이터(불변성 유지 위해 복사)
  const [tabDataMap, setTabDataMap] = React.useState<{ [tabValue: string]: User[] }>(() => {
    const map: { [tabValue: string]: User[] } = {};
    dataTabs.forEach(tab => {
      map[tab.value] = tab.data.map(user => ({ ...user }));
    });
    return map;
  });

  // 현재 탭의 선택 인덱스
  const selectedIdx = selectedIdxMap[name_active] ?? 0;
  const currentTabData = tabDataMap[name_active] ?? [];

  // 탭 변경 시 기존 선택값 유지
  const handleTabChange = (value: string) => {
    name_setActive(value);
  };

  // 버튼 클릭 시 해당 탭의 선택 인덱스만 변경
  const handleSelectIdx = (tabValue: string, idx: number) => {
    setSelectedIdxMap((prev) => ({ ...prev, [tabValue]: idx }));
  };

  // 공용 라디오 변경 핸들러 (성별, 등급 등)
  const handleRadioChange = (tabValue: string, idx: number, key: keyof User, value: string) => {
    setTabDataMap(prev => {
      const tabUsers = prev[tabValue] ? [...prev[tabValue]] : [];
      if (tabUsers[idx]) {
        tabUsers[idx] = { ...tabUsers[idx], [key]: value };
      }
      return { ...prev, [tabValue]: tabUsers };
    });
  };
  

  return (
    <Grow className="w-full ">
      <Tabs
        variant={"vertical"}
        onRemove={name_handleRemove}
        value={name_active}
        onValueChange={handleTabChange}
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
                          onClick={() => handleSelectIdx(tab.value, idx)}
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
                          <div className="absolute top-[0.5rem] right-[0.7rem]">
                            <FlagCheckIcon color={(selectedIdx === idx ? 'var(--color-primary-50)' : '#FFB800')} />
                            <CheckIcon size={12} color={'#FFF'} className="absolute top-[0.2rem] left-1/2 transform -translate-x-1/2" />
                          </div>
                          </Gcol>
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPagination />
                </Carousel>
                <Gcol> 
                  <Button id="btnRA" color={'coolgray'} size={'lg'} onClick={() => handleSelectIdx(tab.value, 0)}>
                    고객찾기
                    <SearchIcon size={16} color={'#FFF'} />
                  </Button>
                  <Button id="btnRC" variant={'outlined'} size={'lg'} color={'coolgray'} onClick={() => handleSelectIdx(tab.value, 0)}>
                    고객등록
                    <ZoomInIcon size={16} color={'#374151'} />
                  </Button>
                </Gcol>
              </Grow>
              {tab.data && tab.data[selectedIdx] ? (
                tab.value === 'userSearchHead1' ? (
                  <Grow gap={4} placement={'sc'} className="w-full flex-1 h-[6.8rem] justify-stretch items-stretch p-0 overflow-hidden border border-[var(--color-coolgray-60)] rounded-[0.8rem] pr-[1.6rem] bg-[#fff]">
                    <Gcol className="w-[13rem] px-3 bg-[var(--color-coolgray-10)]" placement={'cs'}>
                      <Typo variant={'body-sm'} className="text-[var( --color-coolgray-60)]">고객정보</Typo>
                      <Typo variant={'body-md'} weight={'bold'}>
                        {currentTabData[selectedIdx]?.name ?? '-'} 
                        {currentTabData[selectedIdx]?.age ?? '-'}세({currentTabData[selectedIdx]?.gender ?? '-'})
                      </Typo>
                    </Gcol>
                    <Grid className="grid-cols-[1fr_1fr] flex-1 place-content-center  gap-x-6 gap-y-[0.6rem] ">
                      <Grow gap={'0'} placement={'bwc'}>
                        <Typo variant={'body-sm'} className="text-[var( --color-coolgray-60)]">직업</Typo>
                        <Typo variant={'body-md'} weight={'bold'}>
                          {currentTabData[selectedIdx]?.jab ?? '-'} 
                        </Typo>
                      </Grow>
                      <Grow gap={'0'} placement={'bwc'}>
                        <Typo variant={'body-sm'} className="text-[var( --color-coolgray-60)]">{currentTabData[selectedIdx]?.product ?? '-'} </Typo>
                        <Button variant={'text'} size={'sm'}>
                          <Typo variant={'body-md'} weight={'bold'}>동의</Typo>
                          <ArrowIcon size={12} color={'#000'} className="rotate-180" />
                        </Button>
                      </Grow>
                      <Grow gap={'0'} placement={'bwc'}>
                        <Typo variant={'body-sm'} className="text-[var( --color-coolgray-60)]">입원/수술</Typo>
                        <Typo variant={'body-md'} weight={'bold'}>
                          {currentTabData[selectedIdx]?.history ?? '-'} 
                        </Typo>
                      </Grow>
                      <Grow gap={'0'} placement={'bwc'}>
                        <Typo variant={'body-sm'} className="text-[var( --color-coolgray-60)]">보장분석 <span className="text-[var(--color-primary-50)]!">({currentTabData[selectedIdx]?.plan ?? '-'} )</span></Typo>
                        <Button variant={'text'} size={'sm'}>
                          <Typo variant={'body-md'} weight={'bold'}>보기</Typo>
                          <ArrowIcon size={12} color={'#000'} className="rotate-180" />
                        </Button>
                      </Grow>
                    </Grid>
                  </Grow>
                ) : (
                  <Grow gap={4} placement={'bwc'} className="w-full flex-1 h-[6.8rem] px-4 overflow-hidden border border-[var(--color-coolgray-60)] rounded-[0.8rem] pr-[1.6rem] bg-[#fff]">
                    <Gcol className="" placement={'cs'}>
                      <Typo variant={'body-sm'} className="text-[var( --color-coolgray-60)]">나이</Typo>
                      <Grow>
                        <Input
                          value={currentTabData[selectedIdx]?.age ?? ''}
                          after={'세'}
                          width={'5rem'}
                          className="text-right"
                          min={0}
                          onChange={e => {
                            const nextAge = Number(e.target.value);
                            setTabDataMap(prev => {
                              const tabUsers = prev[tab.value] ? [...prev[tab.value]] : [];
                              if (tabUsers[selectedIdx]) {
                                tabUsers[selectedIdx] = { ...tabUsers[selectedIdx], age: nextAge };
                              }
                              return { ...prev, [tab.value]: tabUsers };
                            });
                          }}
                        />
                        <DatePickerInput
                          mode={'single'}
                          onChange={() => {}}
                          value={tab.data[selectedIdx].date}
                          width={'8.7rem'}
                        />
                      </Grow>
                    </Gcol>
                    <Gcol className="" placement={'cs'}>
                      <Typo variant={'body-sm'} className="text-[var( --color-coolgray-60)]">성별</Typo>
                      <RadioGroup
                        value={currentTabData[selectedIdx]?.gender ?? ''}
                        onValueChange={val => {
                          if (val === '남' || val === '여') {
                            handleRadioChange(tab.value, selectedIdx, 'gender', val);
                          }
                        }}
                        className="gap-1 flex flex-row"
                      >
                        <RadioGroupItem variant={'button'} value="남">남</RadioGroupItem>
                        <RadioGroupItem variant={'button'} value="여">여</RadioGroupItem>
                      </RadioGroup>
                    </Gcol>
                    <Gcol className="" placement={'cs'}>
                      <Typo variant={'body-sm'} className="text-[var( --color-coolgray-60)]">직업급수</Typo>
                      <RadioGroup
                        value={currentTabData[selectedIdx]?.grade ?? ''}
                        onValueChange={val => {
                          if (val === '1' || val === '2' || val === '3') {
                            handleRadioChange(tab.value, selectedIdx, 'grade', val);
                          }
                        }}
                        className="gap-1 flex flex-row"
                      >
                        <RadioGroupItem variant={'button'} value="1">1급</RadioGroupItem>
                        <RadioGroupItem variant={'button'} value="2">2급</RadioGroupItem>
                        <RadioGroupItem variant={'button'} value="3">3급</RadioGroupItem>
                      </RadioGroup>
                    </Gcol>
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