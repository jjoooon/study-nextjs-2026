/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import React from 'react';
import { useTabsPagination } from '@/shared/hooks/useTabs';
import { cn } from '@/shared/lib/shadcn/utils';
import { Grow, Gcol, Typo } from '@atoms';
import { ErrorMsg } from '@common/ErrorMsg';
import { ArrowIcon, ListIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Popover, PopoverTrigger, PopoverContent } from '@uiux/Popover';
import { Tabs, TabsList, TabsContent, TabsTrigger, TabsLine } from '@uiux/Tabs';

interface TabPagerProps<T> {
  /**
   * 탭 목록에 표시될 원본 데이터 배열
   */
  data?: T[] | null;
  /**
   * 한 페이지에 한 번에 보여줄 수 있는 최대 탭 개수
   * @default 6
   */
  visibleCount?: number;
  /**
   * 활성화된 탭 패널 내부에 들어갈 콘텐츠
   */
  children?: React.ReactNode;
  /**
   * 탭의 스타일 변형 프리셋명 (default 등)
   * @default 'default'
   */
  variant?: string;
  /**
   * 탭 라인 바로 아래 테이블이 오는지 여부 (디자인적 선 보더 조정을 위함)
   * @default false
   */
  hasTableBelow?: boolean;
  /**
   * 개별 탭 항목에 삭제(X) 버튼을 노출하여 탭을 닫거나 지울 수 있도록 허용할지 여부
   */
  removable?: boolean;
  /**
   * 탭 버튼 영역에 에러(경고) 상태를 표시할지 여부
   * @default false
   */
  error?: boolean;
  /**
   * error가 true일 때 팝오버 등으로 표시할 에러 상세 메시지
   * @default '입력하세요.'
   */
  errorMsg?: string;
  /**
   * 현재 활성화(선택)된 탭의 식별자 값 (Controlled)
   */
  active?: string;
  /**
   * 활성 탭 식별자가 바뀔 때 실행될 변경 함수
   */
  setActive: (value: string) => void;
  /**
   * 탭이 제거될 때 호출되는 콜백 함수 (removable이 true일 때 작동)
   */
  onRemove?: (value: string) => void;
  /**
   * 탭 페이지네이션 컨트롤 옆에 렌더링할 커스텀 추가 버튼들
   */
  renderButtons?: React.ReactNode;
  /**
   * 탭 헤더 라인 우측 끝(전체 영역의 가장 우측)에 추가로 렌더링할 커스텀 리액트 노드
   */
  renderAfter?: React.ReactNode;
  /**
   * 개별 탭 버튼의 내용을 동적으로 렌더링하기 위한 커스텀 함수
   */
  renderTab?: (tab: T) => React.ReactNode;
  /**
   * 전체 탭 목록 보기 팝오버 내 개별 아이템 렌더링 함수
   */
  renderDropdownItem?:
    | false
    | ((
        tab: T,
        setActive: (value: string) => void,
        setVisibleStart: (start: number) => void,
        data: T[],
        visibleCount: number
      ) => React.ReactNode);
  /**
   * 데이터 객체 T로부터 고유한 문자열 값(키/식별자)을 추출하는 함수
   */
  getValue: (tab: T) => string;
  /**
   * 탭 컴포넌트 루트 영역에 적용할 추가적인 CSS 클래스명
   */
  className?: string;
  /**
   * 탭 콘텐츠 패널 영역에 적용할 추가적인 CSS 클래스명
   */
  contentClass?: string;
}

/**
 * 페이지네이션형 탭 컴포넌트 (TabPager)
 * - 탭 아이템 개수가 많아 화면 폭을 초과할 때, 이전/다음 버튼을 통해 탭 헤더를 슬라이딩(페이지네이션)하는 탭 레이아웃 래퍼입니다.
 */
export function TabPager<T>({
  data,
  active,
  setActive,
  hasTableBelow = false,
  removable,
  onRemove,
  visibleCount = 6,
  children,
  variant = 'default',
  renderTab,
  error = false,
  errorMsg = '입력하세요.',
  renderDropdownItem,
  renderButtons,
  renderAfter,
  getValue,
  className,
  contentClass,
}: TabPagerProps<T>) {
  const safeData = data ?? [];

  // tab pagination 훅 사용
  const { visibleStart, end, handlePrev, handleNext, isLastPage, setVisibleStart } = useTabsPagination(
    safeData, // T[]: data의 타입이 자동으로 T로 추론됨
    visibleCount,
    variant,
    active ?? '',
    getValue
  );

  // removable이 true일 때만 onRemove 전달
  const tabsProps = {
    variant,
    value: active ?? '',
    removable,
    onValueChange: setActive,
    className: cn('w-full h-full grid grid-rows-[auto_1fr] content-start', className),
    ...(removable && onRemove ? { onRemove } : {}),
  };
  return (
    <>
      <Tabs {...tabsProps}>
        <TabsLine hasTableBelow={hasTableBelow}>
          <TabsList>
            {safeData?.slice(visibleStart, end).map((tab) => {
              // error 속성이 없는 타입도 허용
              const tabHasError =
                typeof tab === 'object' &&
                tab !== null &&
                'error' in tab &&
                Boolean((tab as { error?: unknown }).error);

              // disabled 속성이 없는 타입도 허용
              const tabIsDisabled =
                typeof tab === 'object' &&
                tab !== null &&
                'disabled' in tab &&
                Boolean((tab as { disabled?: unknown }).disabled);

              return (
                <TabsTrigger
                  key={getValue(tab)}
                  value={getValue(tab)}
                  data-tab-error={error && tabHasError ? 'true' : 'false'}
                  disabled={tabIsDisabled}
                >
                  {renderTab?.(tab)}
                  {error && tabHasError && (
                    <ErrorMsg aria-live="polite" show={true} position="tl">
                      {errorMsg}
                    </ErrorMsg>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <Grow gap={2.5} className="mb-[0.2rem]" placement={'es'}>
            {renderButtons}
            {Math.ceil(safeData.length / visibleCount) > 1 && (
              <Grow placement="cc" gap={1}>
                <Grow className="gap-[0.1rem] pt-[0.1rem]">
                  <Typo className="tracking-[0]!" color={'default'} weight={'bold'}>
                    {Math.ceil((visibleStart + visibleCount) / visibleCount)}
                  </Typo>
                  <Typo className="tracking-[0]! text-[var(--color-gray-50)]" weight={'bold'}>
                    /
                  </Typo>
                  <Typo className="tracking-[0]! text-[var(--color-gray-30)]" weight={'bold'}>
                    {Math.ceil(safeData.length / visibleCount)}
                  </Typo>
                </Grow>
                <Button
                  variant={'outlined'}
                  color={'gray'}
                  only={'icon'}
                  size={'md'}
                  onClick={handlePrev}
                  disabled={visibleStart === 0}
                >
                  <ArrowIcon />
                </Button>
                <Button
                  variant={'outlined'}
                  color={'gray'}
                  only={'icon'}
                  size={'md'}
                  onClick={handleNext}
                  disabled={isLastPage}
                >
                  <ArrowIcon className="rotate-180" />
                </Button>
                {renderDropdownItem && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={'outlined'} color={'gray'} only={'icon'} size={'md'}>
                        <ListIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-[0.2rem] flex flex-col border border-[var(--color-gray-20)] shadow-md  "
                      align={'end'}
                      closeButton={true}
                      onWheel={(e) => e.stopPropagation()}
                    >
                      <Gcol
                        className="overflow-y-auto min-h-0 z-0 max-h-[20rem] gap-0"
                        placement="ss"
                        onWheel={(e) => e.stopPropagation()}
                      >
                        {safeData.map((tab) =>
                          renderDropdownItem(tab, setActive, setVisibleStart, safeData, visibleCount)
                        )}
                      </Gcol>
                    </PopoverContent>
                  </Popover>
                )}
              </Grow>
            )}
            {renderAfter}
          </Grow>
        </TabsLine>
        {children && (
          <TabsContent value={active ?? ''} className={contentClass}>
            {children}
          </TabsContent>
        )}
      </Tabs>
    </>
  );
}
