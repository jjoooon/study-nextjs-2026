'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

// 테스트 시 마우스가 떠난 후에도 툴팁을 오래 유지하려면 skipDelayDuration 값을 늘려주세요. (예: 300000ms = 5분)
function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  // return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} skipDelayDuration={20000000} {...props} />;
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
    default: 'bg-[#FFF] border-[0.1rem] border-solid border-[#CCC] rounded-[0.4rem] z-10',
    dark: 'bg-[var(--color-gray-90)] text-[var(--color-gray-0)] border border-[var(--color-gray-90)]',
    light: 'bg-[#FFF] border-[0.1rem] border-solid border-[#CCC] rounded-[0.4rem] z-10',
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
        align={align ?? (variant === 'default' || variant === 'light' ? 'start' : 'center')}
        alignOffset={alignOffset ?? 0}
        className={cn(
          'zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-[0.4rem] text-[1.3rem] leading-[1.45] text-balance',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className={cn('px-[1rem] py-[0.8rem] relative z-51', contentStyles[variant])}>
          {typeof children === 'string'
            ? <span dangerouslySetInnerHTML={{ __html: children }} />
            : children}
        </div>
        {variant === 'default' || variant === 'light' ? (
          <span className="pointer-events-none absolute left-[0.6rem] top-full -translate-y-px z-50 animate-none">
            <span className="absolute left-0 top-0 border-l-[6px] border-r-[6px] border-t-[7px] border-l-transparent border-r-transparent border-t-[#CCC]" />
            <span
              className="absolute left-[1px] top-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#FFF]"
              
            />
          </span>
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
