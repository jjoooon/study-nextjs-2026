/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Grow, Gcol, Grid, Typo } from '@atoms';
import { BulletItem } from '@common/BulletList';
import { Button } from '@uiux/Button';
import { Textarea } from '@uiux/Textarea';
import React, { useRef, useState } from 'react';
import { CircleCheckStepIcon, ArrowIcon, TimeRecordIcon } from '@/shared/components/icons';

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

export interface ChatResultProps {
  chatData: ChatResultItem[];
}

// br 태그를 실제 줄바꿈으로 렌더링하는 컴포넌트
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
  const [page, setPage] = useState(1);
  const pageCount = chatData.length;
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 아이템의 스크롤 컨테이너 기준 offsetTop 계산
  const getItemOffsetTop = (item: HTMLDivElement) => {
    const container = scrollRef.current;
    if (!container) return 0;
    // item.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop
    return item.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
  };

  // 스크롤 위치 기준으로 현재 페이지 계산
  const getCurrentPageFromScroll = () => {
    const el = scrollRef.current;
    if (!el) return 1;
    const scrollTop = el.scrollTop;

    let currentPage = 1;
    for (let i = 0; i < itemRefs.current.length; i++) {
      const item = itemRefs.current[i];
      if (!item) continue;
      const itemTop = getItemOffsetTop(item);
      // 아이템 상단이 스크롤 위치 이하이면 해당 페이지
      if (itemTop <= scrollTop + 1) {
        currentPage = i + 1;
      }
    }
    return currentPage;
  };

  // 수동 스크롤 시 페이지 계산 (버튼 이동 중에는 무시)
  const handleScroll = () => {
    if (isScrollingRef.current) return;
    setPage(getCurrentPageFromScroll());
  };

  // 특정 페이지의 아이템 위치로 스크롤 이동
  const scrollToPage = (nextPage: number) => {
    const safePage = Math.max(1, Math.min(nextPage, pageCount));
    const el = scrollRef.current;
    const targetItem = itemRefs.current[safePage - 1];
    if (!el || !targetItem) return;

    // 스크롤 이동 전 getItemOffsetTop으로 정확한 위치 계산
    const targetTop = getItemOffsetTop(targetItem);

    setPage(safePage);
    isScrollingRef.current = true;
    el.scrollTo({ top: targetTop, behavior: 'smooth' });

    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  };

  return (
    <Grid className="h-full grid-rows-[auto_1fr_auto] gap-0 overflow-hidden">
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

      <Gcol className="relative w-full tracking-[-0.13rem] border-l border-r border-[var(--color-gray-20)] gap-0 overflow-hidden h-full min-h-0">
        <div
          ref={scrollRef}
          style={{
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
                {/* 심부산 */}
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

                {/* UW심사팀 */}
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
                          {/* br 태그 처리 */}
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

        {/* 페이지 버튼 */}
        <Gcol className="w-auto items-end gap-2 absolute bottom-2 right-3 z-50">
          <Button
            variant="outlined"
            color="link"
            only="icon"
            className="w-[4rem] h-[3.7rem] bg-[#EFF8FF] shadow-[0_2rem_4rem_0_rgba(0,0,0,0.1)]"
            aria-current
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

      {/* 요청자 의견 */}
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
