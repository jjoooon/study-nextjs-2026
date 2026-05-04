'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

// 테스트 시 마우스가 떠난 후에도 툴팁을 오래 유지하려면 skipDelayDuration 값을 늘려주세요. (예: 300000ms = 5분)
function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  variant = 'default',
  sideOffset = 0,
  align,
  alignOffset,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
  variant?: 'default' | 'dark' | 'light';
}) {
  const variantStyles = {
    // 1. 외부 컨테이너 배경 및 텍스트 색상 수정
    default: 'bg-[#FFF] border-[0.1rem] border-solid border-[#CCC] rounded-[0.4rem]',
    dark: 'bg-[var(--color-gray-90)] text-[var(--color-gray-0)] border border-[var(--color-gray-90)]',
    light: 'bg-[#FFF] border-[0.1rem] border-solid border-[#CCC] rounded-[0.4rem]',
  };

  const arrowStyles = {
    // 2. 화살표 색상을 컨테이너와 일치시킴
    default: 'bg-[#FFF] fill-white  border-[0.1rem] border border-[#CCC] z-[-1]',
    dark: 'bg-[var(--color-gray-90)] fill-[var(--color-gray-90)] border border-[var(--color-gray-90)]',
    light: 'bg-[#FFF] fill-white  border-[0.1rem] border border-[#CCC] z-[-1]',
  };

  const contentStyles = {
    // 3. 내부 콘텐츠 박스 배경 수정 (필요 시)
    default: '',
    dark: 'bg-[var(--color-gray-90)] fill-[var(--color-gray-90)] rounded-[0.4rem] border border-[var(--color-gray-90)]',
    light: '',
  };

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset ?? 0}
        className={cn(
          'group zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-1 z-[9999] w-auto rounded-[0.4rem] text-[1.2rem] leading-[1.45] text-balance max-w-[24rem] text-[var(--color-gray-70)] px-[1rem] py-[0.8rem]',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'p-0 relative z-51 whitespace-normal text-[var(--color-gray-70)] text-[1.2rem] text-wrap',
            contentStyles[variant]
          )}
        >
          {typeof children === 'string' ? <span dangerouslySetInnerHTML={{ __html: children }} /> : children}
        </div>
        {variant === 'default' || variant === 'light' ? (
          <TooltipPrimitive.Arrow asChild>
            <svg width="12" height="7" viewBox="0 0 12 7" style={{ overflow: 'visible' }}>
              {/* 흰 fill을 y=-3까지 올려 box border 연결선을 덮음 */}
              <polygon points="0,-1 6,7 12, -1" fill="#FFF" />
              {/* 양쪽 사선만 stroke — 상단 가로선 없음 */}
              <polyline points="0,0 6,7 12,0" fill="none" stroke="#CCC" strokeWidth="1" />
            </svg>
          </TooltipPrimitive.Arrow>
        ) : (
          <TooltipPrimitive.Arrow
            className={cn(
              'bg-foreground fill-foreground size-[0.9rem] translate-y-[calc(-50%-0.25rem)] rotate-45 rounded-[0.1rem] animate-none',
              arrowStyles[variant]
            )}
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
