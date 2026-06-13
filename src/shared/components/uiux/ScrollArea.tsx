/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

// Radix ScrollArea를 감싸는 래퍼 컴포넌트
// type='always' 기본값으로 스크롤바를 항상 표시한다.
function ScrollArea({
  className,
  children,
  type = 'always',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    // Root: 스크롤 영역의 최상위 컨테이너
    <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn('relative', className)} type={type} {...props}>
      {/* Viewport: 실제 콘텐츠가 렌더링되는 스크롤 가능한 영역 */}
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
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

// 스크롤바 컴포넌트: 가로(horizontal) / 세로(vertical) 방향을 모두 지원하며 기본은 세로이다.
// data-horizontal / data-vertical 속성으로 방향별 스타일을 분기 적용한다.
function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
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
