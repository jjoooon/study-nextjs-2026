/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

type TooltipContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onTriggerPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onTriggerClick: () => void;
};

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

// 테스트 시 마우스가 떠난 후에도 툴팁을 오래 유지하려면 skipDelayDuration 값을 늘려주세요. (예: 300000ms = 5분)
function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}

function Tooltip({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const pointerTypeRef = React.useRef<string>('');
  const wasOpenOnPointerDownRef = React.useRef<boolean>(false);
  const isTriggerInteractingRef = React.useRef<boolean>(false);

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const handleRadixOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      // 트리거 클릭/탭 도중 Radix 기본 동작이 강제로 닫는 현상 방지
      if (!nextOpen && isTriggerInteractingRef.current) {
        return;
      }
      setOpen(nextOpen);
    },
    [setOpen]
  );

  const onTriggerPointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      pointerTypeRef.current = e.pointerType;
      wasOpenOnPointerDownRef.current = open;
      isTriggerInteractingRef.current = true;

      if (typeof window !== 'undefined') {
        const resetInteracting = () => {
          window.setTimeout(() => {
            isTriggerInteractingRef.current = false;
          }, 100);
        };
        window.addEventListener('pointerup', resetInteracting, { once: true });
        window.addEventListener('pointercancel', resetInteracting, { once: true });
      }
    },
    [open]
  );

  const onTriggerClick = React.useCallback(() => {
    const isTouchOrPen = pointerTypeRef.current === 'touch' || pointerTypeRef.current === 'pen';
    const nextOpen = isTouchOrPen ? !wasOpenOnPointerDownRef.current : true;

    if (nextOpen && typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('tooltip.open'));
    }
    setOpen(nextOpen);

    queueMicrotask(() => {
      isTriggerInteractingRef.current = false;
    });
  }, [setOpen]);

  const contextValue = React.useMemo<TooltipContextValue>(
    () => ({
      open,
      setOpen,
      onTriggerPointerDown,
      onTriggerClick,
    }),
    [open, setOpen, onTriggerPointerDown, onTriggerClick]
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      <TooltipProvider>
        <TooltipPrimitive.Root data-slot="tooltip" open={open} onOpenChange={handleRadixOpenChange} {...props} />
      </TooltipProvider>
    </TooltipContext.Provider>
  );
}

function TooltipTrigger({ onPointerDown, onClick, ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const tooltipContext = React.useContext(TooltipContext);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    tooltipContext?.onTriggerPointerDown(e);
    onPointerDown?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    tooltipContext?.onTriggerClick();
    onClick?.(e);
  };

  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      {...props}
    />
  );
}

function TooltipContent({
  className,
  variant = 'default',
  hideArrow = false,
  sideOffset = -6,
  align,
  alignOffset,
  arrowPadding = 8,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
  variant?: 'default' | 'dark' | 'light' | 'danger';
  hideArrow?: boolean;
  arrowPadding?: number;
}) {
  const variantStyles = {
    // 1. 외부 컨테이너 배경 및 텍스트 색상 수정
    default:
      'bg-[#FFF] border-[0.1rem] border-solid border-[#CCC] rounded-[0.6rem] shadow-[0_0.2rem_0.4rem_0_rgba(0,0,0,0.1)]',
    dark: 'bg-[var(--color-gray-90)] text-[var(--color-gray-0)] border border-[var(--color-gray-90)]',
    light: 'bg-[#FFF] border-[0.1rem] border-solid border-[#CCC] rounded-[0.4rem]',
    danger:
      'bg-[var(--color-input-surface-error)] border border-[var(--color-input-border-error)] text-[var(--color-danger-50)] shadow-md',
  };

  const arrowStyles = {
    // 2. 화살표 색상을 컨테이너와 일치시킴
    default: 'bg-[#FFF] fill-white border-[0.1rem] border border-[#CCC] z-[-1]',
    dark: 'bg-[var(--color-gray-90)] fill-[var(--color-gray-90)] border border-[var(--color-gray-90)]',
    light: 'bg-[#FFF] fill-white  border-[0.1rem] border border-[#CCC] z-[-1]',
    danger:
      'bg-[var(--color-input-surface-error)] fill-[var(--color-input-surface-error)] border border-[var(--color-input-border-error)] z-[-1]',
  };

  const contentStyles = {
    // 3. 내부 콘텐츠 박스 배경 수정 (필요 시)
    default: 'tracking-[-0.05rem]',
    dark: 'bg-[var(--color-gray-90)] fill-[var(--color-gray-90)] rounded-[0.4rem] border border-[var(--color-gray-90)]',
    light: '',
    danger:
      'bg-[var(--color-input-surface-error)] fill-[var(--color-input-surface-error)] text-[var(--color-text-danger)]',
  };

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset ?? 0}
        arrowPadding={arrowPadding}
        className={cn(
          'relative group zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-1 z-9999 w-auto rounded-[0.6rem] text-[1.2rem] leading-[1.45] text-balance text-(--color-gray-70) px-[1rem] py-[0.4rem]',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'p-0 relative z-51 whitespace-normal text-(--color-gray-70) text-[1.2rem] text-wrap',
            contentStyles[variant]
          )}
        >
          {typeof children === 'string' ? <span dangerouslySetInnerHTML={{ __html: children }} /> : children}
        </div>
        {!hideArrow &&
          (variant === 'default' || variant === 'light' ? (
            <TooltipPrimitive.Arrow asChild style={{ visibility: 'visible' }}>
              <svg width="8" height="6" viewBox="0 0 12 7" style={{ overflow: 'visible', visibility: 'visible' }}>
                {/* 흰 fill을 y=-3까지 올려 box border 연결선을 덮음 */}
                <polygon points="0,-1 6,7 12, -1" fill="#FFF" />
                {/* 양쪽 사선만 stroke — 상단 가로선 없음 */}
                <polyline points="0,0 6,7 12,0" fill="none" stroke="#CCC" strokeWidth="1" />
              </svg>
            </TooltipPrimitive.Arrow>
          ) : variant === 'danger' ? (
            <TooltipPrimitive.Arrow asChild style={{ visibility: 'visible' }}>
              <svg width="8" height="6" viewBox="0 0 12 7" style={{ overflow: 'visible', visibility: 'visible' }}>
                <polygon points="0,-1 6,7 12, -1" fill="var(--color-input-surface-error)" />
                <polyline points="0,0 6,7 12,0" fill="none" stroke="var(--color-input-border-error)" strokeWidth="1" />
              </svg>
            </TooltipPrimitive.Arrow>
          ) : (
            <TooltipPrimitive.Arrow
              style={{ visibility: 'visible' }}
              className={cn(
                'bg-foreground fill-foreground size-[0.9rem] translate-y-[calc(-50%-0.25rem)] rotate-45 rounded-[0.1rem] animate-none !visible',
                arrowStyles[variant]
              )}
            />
          ))}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
