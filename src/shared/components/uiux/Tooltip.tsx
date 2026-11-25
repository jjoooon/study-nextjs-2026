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
  triggerElement: HTMLElement | null;
  setTriggerElement: (element: HTMLElement | null) => void;
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
  const [triggerElement, setTriggerElement] = React.useState<HTMLElement | null>(null);
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
      triggerElement,
      setTriggerElement,
    }),
    [open, setOpen, onTriggerPointerDown, onTriggerClick, triggerElement]
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      <TooltipProvider>
        <TooltipPrimitive.Root data-slot="tooltip" open={open} onOpenChange={handleRadixOpenChange} {...props} />
      </TooltipProvider>
    </TooltipContext.Provider>
  );
}

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ onPointerDown, onClick, ...props }, forwardedRef) => {
  const tooltipContext = React.useContext(TooltipContext);

  const handleRef = React.useCallback(
    (node: React.ElementRef<typeof TooltipPrimitive.Trigger> | null) => {
      tooltipContext?.setTriggerElement(node);
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [tooltipContext, forwardedRef]
  );

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
      ref={handleRef}
      data-slot="tooltip-trigger"
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      {...props}
    />
  );
});
TooltipTrigger.displayName = 'TooltipTrigger';

export interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  variant?: 'default' | 'dark' | 'light' | 'danger';
  hideArrow?: boolean;
  arrowPadding?: number;
  /**
   * 화면 및 부모 컨테이너 좌/우 여백 중 넓은 쪽을 기준으로 방향이나 정렬을 자동 조정할지 여부 (기본값: true)
   */
  autoDirection?: boolean;
  /**
   * 좌/우(side='left' | 'right') 배치를 왼쪽/오른쪽 넓은 영역 쪽으로 자동 결정할지 여부 (기본값: false)
   */
  autoSide?: boolean;
  /**
   * 포탈 렌더링 여부 (기본값: true).
   * true일 경우 부모의 overflow: hidden/auto 클리핑을 벗어나 안전하게 렌더링됩니다.
   */
  portal?: boolean;
  /**
   * 포탈을 마운트할 특정 DOM 컨테이너 (미지정 시 document.body)
   */
  portalContainer?: HTMLElement | null;
}

/**
 * 트리거 요소를 감싸고 있는 상위 부모 중 overflow: auto | hidden | scroll 컨테이너들의
 * 교집합 가시 영역과 남은 여백을 계산합니다.
 */
function getEffectiveSpace(triggerEl: HTMLElement) {
  const rect = triggerEl.getBoundingClientRect();
  let minLeft = 0;
  let maxRight = typeof window !== 'undefined' ? window.innerWidth : 0;
  let minTop = 0;
  let maxBottom = typeof window !== 'undefined' ? window.innerHeight : 0;

  const overflowParents: HTMLElement[] = [];
  let current = triggerEl.parentElement;

  while (current && current !== document.body && current !== document.documentElement) {
    const style = window.getComputedStyle(current);
    const overflowX = style.overflowX;
    const overflowY = style.overflowY;
    const hasOverflow =
      overflowX === 'auto' ||
      overflowX === 'hidden' ||
      overflowX === 'scroll' ||
      overflowY === 'auto' ||
      overflowY === 'hidden' ||
      overflowY === 'scroll';

    if (hasOverflow) {
      overflowParents.push(current);
      const parentRect = current.getBoundingClientRect();
      minLeft = Math.max(minLeft, parentRect.left);
      maxRight = Math.min(maxRight, parentRect.right);
      minTop = Math.max(minTop, parentRect.top);
      maxBottom = Math.min(maxBottom, parentRect.bottom);
    }
    current = current.parentElement;
  }

  const leftSpace = Math.max(0, rect.left - minLeft);
  const rightSpace = Math.max(0, maxRight - rect.right);
  const topSpace = Math.max(0, rect.top - minTop);
  const bottomSpace = Math.max(0, maxBottom - rect.bottom);

  return {
    leftSpace,
    rightSpace,
    topSpace,
    bottomSpace,
    hasMoreSpaceOnLeft: leftSpace > rightSpace,
    overflowParents,
  };
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const TooltipContent = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps>(
  (
    {
      className,
      variant = 'default',
      hideArrow = false,
      sideOffset = -6,
      side = 'top',
      align,
      alignOffset,
      arrowPadding = 8,
      collisionPadding = 12,
      avoidCollisions = true,
      autoDirection = true,
      autoSide = false,
      portal = true,
      portalContainer,
      collisionBoundary,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const tooltipContext = React.useContext(TooltipContext);
    const triggerEl = tooltipContext?.triggerElement;

    const calculatePlacement = React.useCallback(() => {
      if (!autoDirection || !triggerEl || typeof window === 'undefined') {
        return {
          resolvedSide: side,
          resolvedAlign: align,
        };
      }

      // 부모의 overflow 컨테이너 경계 및 뷰포트를 모두 감안하여 가용 여백 계산
      const { hasMoreSpaceOnLeft } = getEffectiveSpace(triggerEl);

      let nextSide = side;
      let nextAlign = align;

      // 1. autoSide가 켜져 있거나, side가 'left' 또는 'right'로 지정된 경우:
      // 부모 overflow 영역 및 화면 좌/우 중 여백이 더 많은 쪽으로 side 자동 결정
      if (autoSide || side === 'left' || side === 'right') {
        nextSide = hasMoreSpaceOnLeft ? 'left' : 'right';
      }

      // 2. side가 'top' 또는 'bottom'인 경우:
      // align이 지정되지 않았거나, 우측 공간이 부족한데 start로 되어 있는 경우 (또는 그 반대)
      // 공간이 많은 쪽으로 툴팁이 펼쳐지도록 end 또는 start로 자동 보정 (align='center' 명시 시 유지)
      if (nextSide === 'top' || nextSide === 'bottom') {
        if (!align || (align === 'start' && hasMoreSpaceOnLeft) || (align === 'end' && !hasMoreSpaceOnLeft)) {
          nextAlign = hasMoreSpaceOnLeft ? 'end' : 'start';
        }
      }

      return {
        resolvedSide: nextSide,
        resolvedAlign: nextAlign,
      };
    }, [autoDirection, autoSide, side, align, triggerEl]);

    const [placement, setPlacement] = React.useState(calculatePlacement);

    useIsomorphicLayoutEffect(() => {
      setPlacement(calculatePlacement());
    }, [calculatePlacement]);

    React.useEffect(() => {
      if (!autoDirection || !triggerEl) return;
      const handleUpdate = () => {
        setPlacement(calculatePlacement());
      };
      window.addEventListener('resize', handleUpdate);
      // 부모 컨테이너 스크롤 시에도 실시간 위치 재계산
      window.addEventListener('scroll', handleUpdate, true);
      return () => {
        window.removeEventListener('resize', handleUpdate);
        window.removeEventListener('scroll', handleUpdate, true);
      };
    }, [autoDirection, triggerEl, calculatePlacement]);

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
      dark: 'bg-[var(--color-gray-90)] fill-[var(--color-gray-90)] rounded-[0.4rem] border border-[var(--color-gray-90)] text-[var(--color-gray-0)]',
      light: '',
      danger:
        'bg-[var(--color-input-surface-error)] fill-[var(--color-input-surface-error)] text-[var(--color-text-danger)]',
    };

    const contentNode = (
      <TooltipPrimitive.Content
        ref={forwardedRef}
        data-slot="tooltip-content"
        side={placement.resolvedSide}
        sideOffset={sideOffset}
        align={placement.resolvedAlign}
        alignOffset={alignOffset ?? 0}
        arrowPadding={arrowPadding}
        collisionPadding={collisionPadding}
        avoidCollisions={avoidCollisions}
        collisionBoundary={collisionBoundary}
        className={cn(
          'relative group zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-1 z-9999 max-w-[calc(100vw-2rem)] w-auto rounded-[0.6rem] text-[1.2rem] leading-[1.45] text-balance text-(--color-gray-70) px-[1rem] py-[0.4rem]',
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
    );

    if (!portal) {
      return contentNode;
    }

    return <TooltipPrimitive.Portal container={portalContainer}>{contentNode}</TooltipPrimitive.Portal>;
  }
);
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
