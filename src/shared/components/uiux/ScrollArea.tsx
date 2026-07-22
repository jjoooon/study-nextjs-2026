/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  /**
   * 스크롤바 표시 정책
   * - 'auto': 스크롤 영역이 넘칠 때 자동으로 표시
   * - 'always': 항상 스크롤바 노출
   * - 'scroll': 사용자가 스크롤 동작을 할 때만 일시적으로 노출
   * - 'hover': 마우스를 영역 위에 호버했을 때만 일시적으로 노출
   * @default 'always'
   */
  type?: 'auto' | 'always' | 'scroll' | 'hover';
  /**
   * type이 'scroll' 또는 'hover'일 때, 스크롤바가 숨겨지기 전까지의 대기 지연 시간 (밀리초)
   * @default 600
   */
  scrollHideDelay?: number;
  /**
   * 스크롤 영역 내부 콘텐츠
   */
  children?: React.ReactNode;
  /**
   * 추가적인 CSS 클래스명
   */
  className?: string;
}

/**
 * 스크롤 영역 컴포넌트 (ScrollArea)
 * - 브라우저 네이티브 스크롤바를 대체하여 크로스 브라우징 및 일관된 시각적 디자인을 제공하는 스크롤 컨테이너입니다.
 */
function ScrollArea({ className, children, type = 'always', ...props }: ScrollAreaProps) {
  return (
    // Root: 스크롤 영역의 최상위 컨테이너
    <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn('relative', className)} type={type} {...props}>
      {/* Viewport: 실제 콘텐츠가 렌더링되는 스크롤 가능한 영역 */}
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="cp-scrollarea size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {/* 스크롤바(기본 세로 방향) */}
      <ScrollBar />
      {/* Corner: 가로/세로 스크롤바가 만나는 모서리 영역 */}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

interface ScrollBarProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
  /**
   * 스크롤바의 방향 설정
   * - 'vertical': 세로형 스크롤바
   * - 'horizontal': 가로형 스크롤바
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * 추가적인 CSS 클래스명
   */
  className?: string;
}

/**
 * 스크롤바 서브 컴포넌트 (ScrollBar)
 * - 가로 또는 세로 방향 스크롤을 시각적으로 안내하고 조절하는 스크롤바 트랙 및 썸(Thumb)입니다.
 */
function ScrollBar({ className, orientation = 'vertical', ...props }: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent',
        className
      )}
      {...props}
    >
      {/* Thumb: 실제로 드래그하는 스크롤 손잡이 */}
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
