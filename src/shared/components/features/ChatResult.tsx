/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import React, { useRef, useState } from 'react';
import { CircleCheckStepIcon, ArrowIcon, TimeRecordIcon } from '@/shared/components/icons';
import { Grow, Gcol, Grid, Typo } from '@atoms';
import { BulletItem } from '@common/BulletList';
import { Button } from '@uiux/Button';
import { Textarea } from '@uiux/Textarea';

// 단일 대화(요청자/심사팀) 묶음 데이터 타입
// - 하나의 배열 원소가 화면의 한 페이지(한 묶음 카드)를 구성한다.
export interface ChatResultItem {
  name: string;
  title: string;
  content: string;
  date: string;
  uw_name: string;
  uw_title: string;
  uw_content: string;
  uw_info: string;
  uw_state: string[];
  uw_date: string;
  uw_detail: string;
}

// ChatResult 컴포넌트 입력값
// - chatData 순서가 곧 페이지 순서(1페이지, 2페이지, ...)가 된다.
export interface ChatResultProps {
  chatData: ChatResultItem[];
}

// 문자열 내 <br> 태그를 실제 줄바꿈(<br />)으로 변환해 렌더링한다.
// 예: "A<br/>B" -> A(줄바꿈)B
const HtmlLineBreak: React.FC<{ content: string; className?: string }> = ({ content, className }) => {
  const lines = content.split(/<br\s*\/?>/i);
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </span>
  );
};

export const ChatResult: React.FC<ChatResultProps> = ({ chatData }) => {
  // 현재 표시 중인 페이지 번호(1-based)
  const [page, setPage] = useState(1);
  // 전체 페이지 수 = 대화 묶음 개수
  const pageCount = chatData.length;

  // 스크롤 컨테이너 DOM 참조
  const scrollRef = useRef<HTMLDivElement>(null);
  // 각 페이지 카드 DOM 참조(인덱스 = 페이지 - 1)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 버튼으로 smooth scroll 중일 때 onScroll 계산을 잠시 무시하기 위한 플래그
  const isScrollingRef = useRef(false);
  // smooth scroll 종료 시점을 추정해 플래그를 해제하기 위한 타이머
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 스크롤 시 인디케이터 표시 여부
  const [showIndicator, setShowIndicator] = useState(false);
  // 인디케이터를 3초 후에 숨기기 위한 타이머 참조
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 아이템의 offsetTop을 "문서 기준"이 아닌 "스크롤 컨테이너 기준"으로 계산한다.
  // scrollTo 대상 위치를 정확히 맞추기 위해 상대 좌표를 사용한다.
  const getItemOffsetTop = (item: HTMLDivElement) => {
    const container = scrollRef.current;
    if (!container) return 0;
    // 공식: (item.top - container.top) + container.scrollTop
    return item.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
  };

  // 현재 스크롤 위치(scrollTop)에서 활성 페이지를 계산한다.
  // "아이템 상단 <= 현재 스크롤 위치" 조건을 만족하는 마지막 아이템을 현재 페이지로 본다.
  const getCurrentPageFromScroll = () => {
    const el = scrollRef.current;
    if (!el) return 1;
    const scrollTop = el.scrollTop;

    let currentPage = 1;
    for (let i = 0; i < itemRefs.current.length; i++) {
      const item = itemRefs.current[i];
      if (!item) continue;
      const itemTop = getItemOffsetTop(item);
      // +1 보정: 소수점/브라우저 렌더링 오차로 경계가 떨리는 현상을 줄인다.
      if (itemTop <= scrollTop + 1) {
        currentPage = i + 1;
      }
    }
    return currentPage;
  };

  // 사용자가 직접 스크롤할 때 페이지 인디케이터를 동기화한다.
  // 단, 버튼 기반 smooth scroll 중에는 이 핸들러를 무시해 페이지 깜빡임을 방지한다.
  const handleScroll = () => {
    setShowIndicator(true);

    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    fadeTimerRef.current = setTimeout(() => {
      setShowIndicator(false);
    }, 3000);

    if (isScrollingRef.current) return;
    setPage(getCurrentPageFromScroll());
  };

  // 이전/다음 버튼으로 특정 페이지 위치까지 smooth scroll 이동한다.
  // - 페이지 범위를 벗어나는 값은 1~pageCount로 보정
  // - 이동 시작 시 페이지 숫자를 즉시 갱신해 버튼 체감 반응성을 높임
  const scrollToPage = (nextPage: number) => {
    const safePage = Math.max(1, Math.min(nextPage, pageCount));
    const el = scrollRef.current;
    const targetItem = itemRefs.current[safePage - 1];
    if (!el || !targetItem) return;

    // 대상 카드의 컨테이너 기준 위치를 계산해 스크롤 목적지로 사용
    const targetTop = getItemOffsetTop(targetItem);

    setPage(safePage);
    isScrollingRef.current = true;
    el.scrollTo({ top: targetTop, behavior: 'smooth' });

    // smooth scroll 완료 이벤트가 없어 타이머로 종료 시점을 추정한다.
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  };

  React.useEffect(() => {
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    };
  }, []);

  return (
    <Grid className="h-full grid-rows-[auto_1fr_auto] gap-0">
      <Grow
        className="w-full h-[4.1rem] px-2.5 py-5 bg-[var(--color-secondary-50)] rounded-t-lg"
        placement="bwc"
        variant="default"
      >
        <strong className="text-[1.4rem] text-white">심사결과안내</strong>
        <Button
          variant={'outlined'}
          color={'secondary'}
          size={'md'}
          className="border-[var(--color-secondary-50)] text-black"
        >
          이력상세
        </Button>
      </Grow>

      <Gcol className="relative w-full tracking-[-0.13rem] border-l border-r border-[var(--color-gray-20)] gap-0 overflow-hidden h-full min-h-[0rem]">
        <div
          ref={scrollRef}
          style={{
            // 페이지 단위 탐색 UX를 위해 세로 스냅 사용
            overflowY: 'auto',
            position: 'absolute',
            inset: 0,
            scrollSnapType: 'y mandatory',
          }}
          onScroll={handleScroll}
        >
          <Gcol className="gap-4">
            {chatData.map((item, idx) => (
              <div
                key={idx}
                ref={(el: HTMLDivElement | null) => {
                  itemRefs.current[idx] = el;
                }}
                style={{ scrollSnapAlign: 'start' }}
                className="py-2"
              >
                {/* 요청자 영역 */}
                <Gcol className="px-3 gap-2">
                  <Typo tag="strong" variant={'body-sm'} weight="bold" className="w-full flex justify-end">
                    {item.name}
                  </Typo>
                  <Gcol
                    className="w-[21rem] ml-auto rounded-lg bg-[var(--color-blue-gray-10)] py-2 px-3 align-start justify-start text-left"
                    gap="2"
                  >
                    <Gcol placement="ss">
                      <Typo variant="body-xs" className="justify-start text-[1.1rem]" weight="bold">
                        {item.title}
                      </Typo>
                      <BulletItem
                        before="ⓐ"
                        className="whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-50)]"
                        color="default"
                        onClick={() => {}}
                        size="md"
                        type="dash"
                      >
                        {item.content}
                      </BulletItem>
                    </Gcol>
                    <Typo
                      variant="body-xs"
                      className="w-full flex justify-start items-center text-[var(--color-gray-50)] align-left"
                    >
                      <TimeRecordIcon />
                      {item.date}
                    </Typo>
                  </Gcol>
                </Gcol>

                {/* UW 심사팀 영역 */}
                <Gcol className="px-3 gap-2 mt-4">
                  <Typo tag="strong" variant={'body-sm'} weight="bold" className="w-full flex justify-start">
                    {item.uw_name}
                  </Typo>
                  <Gcol className="ml-auto rounded-lg bg-[var(--color-warning-10)] py-2 px-3 align-start justify-start text-left gap-2">
                    <Gcol placement="ss">
                      <Grow className="w-full justify-between">
                        <Typo variant="body-xs" className="w-full justify-between align-center" weight="bold">
                          {item.uw_title}
                        </Typo>
                        <Button
                          color="primary"
                          onClick={() => {}}
                          only="default"
                          size="sm"
                          variant="outlined"
                          className="text-[1.1rem] leading-[2.2rem]"
                        >
                          상세보기
                        </Button>
                      </Grow>
                      <Gcol className="gap-0.5">
                        <BulletItem
                          className="whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-70)] leading-[1.7rem]"
                          color="default"
                          onClick={() => {}}
                          size="md"
                          type="dash"
                          before={undefined}
                        >
                          {/* 서버 문자열의 <br> 태그를 실제 줄바꿈으로 변환 */}
                          <HtmlLineBreak content={item.uw_content} />
                        </BulletItem>
                        <BulletItem
                          className="pl-2.5 whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-70)] leading-[1.7rem]"
                          before="ⓐ"
                          color="default"
                          onClick={() => {}}
                          size="md"
                          type="ref"
                        >
                          <HtmlLineBreak content={item.uw_info} />
                        </BulletItem>
                        <Grow placement="ss" className="w-full gap-0.5 pl-2.5">
                          {item.uw_state.map((state, sidx) => (
                            <Grow className="gap-0.5 aligin-center" key={sidx}>
                              <CircleCheckStepIcon />
                              <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">
                                {state}
                              </Typo>
                            </Grow>
                          ))}
                        </Grow>
                      </Gcol>
                    </Gcol>
                    <Typo
                      variant="body-xs"
                      className="w-full flex justify-start items-center text-[var(--color-gray-50)] align-left"
                    >
                      <TimeRecordIcon />
                      {item.uw_date}
                    </Typo>
                  </Gcol>
                </Gcol>
              </div>
            ))}
          </Gcol>
        </div>

        {/* 페이지 인디케이터 + 이전/다음 탐색 버튼 */}
        <Gcol className={`w-auto items-end gap-2 absolute bottom-2 right-3 z-50 transition-opacity duration-300`}>
          <Button
            variant="outlined"
            color="link"
            only="icon"
            className={`w-[4rem] h-[3.7rem] bg-[#EFF8FF] shadow-[0_2rem_4rem_0_rgba(0,0,0,0.1)] pointer-events-none  ${
              showIndicator ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Typo variant="body-lg">
              <b>{page}</b>/{pageCount}
            </Typo>
          </Button>
          <Grow>
            <Button
              variant="outlined"
              color="gray"
              only="icon"
              size="md"
              onClick={() => scrollToPage(page - 1)}
              disabled={page === 1}
              aria-label="이전"
            >
              <ArrowIcon className="rotate-90" />
            </Button>
            <Button
              variant="outlined"
              color="gray"
              only="icon"
              size="md"
              onClick={() => scrollToPage(page + 1)}
              disabled={page === pageCount}
              aria-label="다음"
            >
              <ArrowIcon className="rotate-270" />
            </Button>
          </Grow>
        </Gcol>
      </Gcol>

      {/* 하단 고정 입력: 요청자 의견 + 심사요청 액션 */}
      <Gcol className="shrink-0 w-full h-[13.2rem] py-2.5 px-3 bg-[var(--color-gray-5)] border border-[var(--color-gray-15)] rounded-b-[0.8rem]">
        <Grow placement="bwc">
          <b className="text-[1.3rem]">요청자 의견</b>
          <Button>심사요청</Button>
        </Grow>
        <Textarea
          placeholder="계약자에게 보장제한 설정범위 및 사유(피보험자의 과거병력)을 설명해주시기 바랍니다."
          variant="default"
          className="w-full text-[1.1rem] !text-[var(--color-gray-50)]"
          resize={false}
        />
      </Gcol>
    </Grid>
  );
};
