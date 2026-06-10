/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

/**
 * Separator 컴포넌트: 콘텐츠 사이의 시각적 또는 구조적 구분선을 렌더링합니다.
 * Radix UI의 Separator Primitive를 기반으로 하며, 접근성(Accessibility)을 지원합니다.
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    // decorative=true: 스크린 리더가 이 요소를 무시하도록 설정 (단순 장식용일 때)
    decorative={decorative}
    // 구분선의 방향을 설정 (horizontal 또는 vertical)
    orientation={orientation}
    className={cn(
      'shrink-0 bg-border', // 기본 스타일: 줄어들지 않도록 설정 및 배경색 지정
      // 가로 방향일 때: 높이 1px, 너비 100%
      // 세로 방향일 때: 높이 100%, 너비 1px
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
