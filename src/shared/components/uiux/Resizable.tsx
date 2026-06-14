/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Group, Panel, Separator } from 'react-resizable-panels';
import { cn } from '@/shared/lib/shadcn/utils';

/**
 * 리사이즈 패널 그룹 컴포넌트 (ResizablePanelGroup)
 * - 가로 또는 세로 방향으로 크기 조절이 가능한 패널들을 묶어주는 메인 컨테이너입니다.
 * - 내부적으로 `react-resizable-panels` 라이브러리의 `Group`을 사용합니다.
 */
const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof Group>) => (
  <Group className={cn('flex h-full w-full [aria-orientation=vertical]:flex-col', className)} {...props} />
);

/**
 * 리사이즈 가능 개별 패널 컴포넌트 (ResizablePanel)
 * - 패널 그룹 내의 실제 분할 영역을 나타냅니다.
 * - 내부적으로 `react-resizable-panels` 라이브러리의 `Panel`을 사용합니다.
 */
const ResizablePanel = Panel;

interface ResizableHandleProps extends React.ComponentProps<typeof Separator> {
  /**
   * 구분선 핸들 영역 중앙에 드래그 가능 여부를 보여주는 마커 요소를 표시할지 여부
   * @default false
   */
  withHandle?: boolean;
}

/**
 * 리사이즈 구분선/핸들 컴포넌트 (ResizableHandle)
 * - 패널 사이를 마우스 드래그로 조절할 수 있도록 연결하는 얇은 구분선입니다.
 * - 마우스 드래그나 포인터 다운 이벤트가 타 컴포넌트로 전파되는 것을 차단합니다.
 */
const ResizableHandle = ({ withHandle, className, ...props }: ResizableHandleProps) => (
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
