/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Group, Panel, Separator } from 'react-resizable-panels';
import { cn } from '@/shared/lib/shadcn/utils';

// react-resizable-panels의 Group에 공통 레이아웃 스타일을 적용하는 래퍼
const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof Group>) => (
  <Group className={cn('flex h-full w-full [aria-orientation=vertical]:flex-col', className)} {...props} />
);

// 패널 본체는 라이브러리 컴포넌트를 그대로 재노출한다.
const ResizablePanel = Panel;

// 구분선(핸들)에서 발생한 이벤트가 상위 드래그/클릭 로직으로 전파되지 않도록 막는다.
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  withHandle?: boolean;
}) => (
  <Separator
    className={cn('resize-separator', className)}
    onMouseDown={(e) => e.stopPropagation()}
    onPointerDown={(e) => e.stopPropagation()}
    onClick={(e) => e.stopPropagation()}
    {...props}
  >
    {/* withHandle=true일 때만 시각적 핸들을 표시한다. */}
    {withHandle && <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border"></div>}
  </Separator>
);
export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
