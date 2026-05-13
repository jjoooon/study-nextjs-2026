/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Grid } from '@atoms';
import { CloseIcon } from '@icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

type DialogSizeValue = number | string;

type DialogSizePreset = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

type DialogSizeConfig = {
  width?: DialogSizeValue;
  height?: DialogSizeValue;
  minWidth?: DialogSizeValue;
  minHeight?: DialogSizeValue;
  maxWidth?: DialogSizeValue;
  maxHeight?: DialogSizeValue;
};

type DialogSize = DialogSizePreset | DialogSizeConfig;

const DEFAULT_DIALOG_OVERLAY_Z_INDEX = 50;
const DEFAULT_DIALOG_CONTENT_Z_INDEX = 51;
const DIALOG_Z_INDEX_STEP = 2;
const DIALOG_VIEWPORT_GAP = '2.4rem';
const DIALOG_DEFAULT_MAX_HEIGHT = `calc(100vh - ${DIALOG_VIEWPORT_GAP})`;
const DIALOG_FULL_WIDTH = `calc(100vw - 2rem)`;
const DIALOG_FULL_HEIGHT = `calc(100vh - 2rem)`;
const DIALOG_PRESET_WIDTH: Record<Exclude<DialogSizePreset, 'full'>, string> = {
  sm: '37rem',
  md: '56rem',
  lg: '76rem',
  xl: '96rem',
  '2xl': '112rem',
};

const toCssSize = (value?: DialogSizeValue): string | undefined => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const isDialogSizeConfig = (size?: DialogSize): size is DialogSizeConfig => {
  return typeof size === 'object' && size !== null;
};

const resolveDialogSize = (size?: DialogSize) => {
  if (size === 'full') {
    return {
      width: DIALOG_FULL_WIDTH,
      height: DIALOG_FULL_HEIGHT,
      maxHeight: DIALOG_FULL_HEIGHT,
    };
  }

  if (size === 'sm' || size === 'md' || size === 'lg' || size === 'xl' || size === '2xl') {
    return {
      width: DIALOG_PRESET_WIDTH[size],
      maxHeight: DIALOG_DEFAULT_MAX_HEIGHT,
    };
  }

  if (isDialogSizeConfig(size)) {
    const hasHeight = size.height !== undefined;
    return {
      width: toCssSize(size.width),
      height: toCssSize(size.height),
      minWidth: toCssSize(size.minWidth),
      minHeight: toCssSize(size.minHeight),
      maxWidth: toCssSize(size.maxWidth),
      maxHeight: toCssSize(size.maxHeight) ?? (hasHeight ? undefined : DIALOG_DEFAULT_MAX_HEIGHT),
    };
  }

  return {
    maxHeight: DIALOG_DEFAULT_MAX_HEIGHT,
  };
};

// 열린 다이얼로그 depth 추적 — 가장 높은 depth 만 암막 표시
const _openDialogs = new Map<string, number>(); // id → depth
const _overlayListeners = new Set<() => void>();

function _registerDialog(id: string, depth: number) {
  _openDialogs.set(id, depth);
  _overlayListeners.forEach((fn) => fn());
}
function _unregisterDialog(id: string) {
  _openDialogs.delete(id);
  _overlayListeners.forEach((fn) => fn());
}
function _getMaxOpenDepth() {
  return _openDialogs.size > 0 ? Math.max(..._openDialogs.values()) : 0;
}
function _getOpenCount() {
  return _openDialogs.size;
}
function _subscribeOverlay(fn: () => void) {
  _overlayListeners.add(fn);
  return () => {
    _overlayListeners.delete(fn);
  };
}

const DialogDepthContext = React.createContext<number>(0);

function Dialog({
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const parentDepth = React.useContext(DialogDepthContext);
  const newDepth = parentDepth + 1;
  const dialogId = React.useId();

  // controlled / uncontrolled open 상태 모두 추적
  const [openState, setOpenState] = React.useState(defaultOpen ?? false);
  const isControlled = openProp !== undefined;
  const isOpen = isControlled ? openProp : openState;

  const handleOpenChange = React.useCallback(
    (val: boolean) => {
      if (!isControlled) setOpenState(val);
      onOpenChange?.(val);
    },
    [isControlled, onOpenChange]
  );

  // open 상태일 때만 _openDialogs 에 등록
  React.useEffect(() => {
    if (!isOpen) return;
    _registerDialog(dialogId, newDepth);
    return () => _unregisterDialog(dialogId);
  }, [isOpen, dialogId, newDepth]);

  return (
    <DialogDepthContext.Provider value={newDepth}>
      <DialogPrimitive.Root
        data-slot="dialog"
        open={isOpen}
        defaultOpen={defaultOpen}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </DialogDepthContext.Provider>
  );
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, style, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      style={style}
      className={cn(
        'fixed inset-0 bg-black/60 pointer-events-none',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  closeButtonClassName,
  showOverlay,
  overlayClassName,
  resizable = false,
  zIndex,
  size,
  defaultPosition,
  onPointerDownOutside,
  onInteractOutside,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  closeButtonClassName?: string;
  showOverlay?: boolean;
  overlayClassName?: string;
  resizable?: boolean;
  // 다이얼로그 레이어 우선순위 제어용 (기본값: overlay보다 1 높음)
  zIndex?: number;
  size?: DialogSize;
  defaultPosition?: {
    x: number;
    y: number;
  };
}) {
  const depth = React.useContext(DialogDepthContext);
  // depth 기반 z-index: 1단계 50/51, 2단계 52/53 ...
  const autoContentZIndex = DEFAULT_DIALOG_CONTENT_Z_INDEX + (depth - 1) * DIALOG_Z_INDEX_STEP;

  // 오버레이 상태 구독만 (등록은 Dialog 에서 처리)
  const [maxOpenDepth, setMaxOpenDepth] = React.useState(_getMaxOpenDepth);
  const [openCount, setOpenCount] = React.useState(_getOpenCount);

  React.useEffect(
    () =>
      _subscribeOverlay(() => {
        setMaxOpenDepth(_getMaxOpenDepth());
        setOpenCount(_getOpenCount());
      }),
    []
  );

  // 각 다이얼로그는 자신의 depth만으로 z-index를 결정 (첫번째 51 고정, 두번째 53 고정)
  const parallelZIndex = zIndex !== undefined ? zIndex : autoContentZIndex;

  const overlayZIndex = React.useMemo(() => {
    if (zIndex !== undefined) return zIndex - 1;
    return DEFAULT_DIALOG_OVERLAY_Z_INDEX + (depth - 1) * DIALOG_Z_INDEX_STEP;
  }, [depth, zIndex]);

  // 단일 팝업 → 항상 암막 표시 / 중첩 → 가장 위(depth === maxOpenDepth)만 표시
  const resolvedShowOverlay = showOverlay ?? (openCount <= 1 || depth >= maxOpenDepth);
  const isFullSize = size === 'full';
  const [position, setPosition] = React.useState(defaultPosition ?? { x: 0, y: 0 });
  const [resizedSize, setResizedSize] = React.useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState<string | null>(null);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!defaultPosition) return;
    setPosition(defaultPosition);
  }, [defaultPosition]);

  const resolvedSize = React.useMemo(() => resolveDialogSize(size), [size]);

  const contentStyle = React.useMemo<React.CSSProperties>(
    () => ({
      ...(props.style ?? {}),
      transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
      cursor: isDragging ? 'grabbing' : isResizing ? 'auto' : undefined,
      width: resizedSize.width > 0 ? `${resizedSize.width}px` : resolvedSize.width,
      height: resizedSize.height > 0 ? `${resizedSize.height}px` : resolvedSize.height,
      minWidth: resolvedSize.minWidth,
      minHeight: resolvedSize.minHeight,
      maxWidth: resolvedSize.maxWidth,
      maxHeight: resolvedSize.maxHeight,
      zIndex: parallelZIndex,
    }),
    [props.style, position.x, position.y, isDragging, isResizing, resizedSize, resolvedSize, parallelZIndex]
  );

  // 1. 상태 변수에 초기값을 저장할 변수 추가 (isResizing과 함께 관리)
  const [initialCapture, setInitialCapture] = React.useState<{
    width: number;
    height: number;
    x: number;
    y: number;
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      if (isFullSize) return;
      e.stopPropagation();
      const target = e.target as HTMLElement;
      const resizeHandle = target.closest('[data-slot="resize-handle"]');
      const dialogHeader = target.closest('[data-slot="dialog-header"]');
      const dialogClose = target.closest('[data-slot="dialog-close"]');
      const interactiveElement = target.closest('button, a, input, textarea, select, [role="button"]');

      if (dialogClose || interactiveElement) {
        return;
      }

      if (resizeHandle) {
        e.preventDefault();
        const rect = contentRef.current!.getBoundingClientRect();
        setIsResizing(resizeHandle.getAttribute('data-direction'));
        // 리사이즈 시작 시점의 모든 상태를 스냅샷으로 저장
        setInitialCapture({
          width: rect.width,
          height: rect.height,
          x: position.x,
          y: position.y,
          mouseX: e.clientX,
          mouseY: e.clientY,
        });
        return;
      }

      if (dialogHeader || !contentRef.current?.querySelector('[data-slot="dialog-header"]')) {
        // 드래그 로직은 기존과 동일하게 유지해도 무방함
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      }
    },
    [position, isFullSize]
  );

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isResizing) {
        setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
      }

      if (isResizing && initialCapture) {
        // 시작점으로부터 마우스가 움직인 총 거리
        const deltaX = e.clientX - initialCapture.mouseX;
        const deltaY = e.clientY - initialCapture.mouseY;

        let newWidth = initialCapture.width;
        let newHeight = initialCapture.height;
        let newX = initialCapture.x;
        let newY = initialCapture.y;

        // --- X축 계산 ---
        if (isResizing.includes('e')) {
          // 오른쪽 확장: 너비는 늘어나고, 중심점은 늘어난 양의 절반만큼 오른쪽(+X)으로
          const addedWidth = deltaX;
          newWidth = Math.max(300, initialCapture.width + addedWidth);
          const actualAddedWidth = newWidth - initialCapture.width;
          newX = initialCapture.x + actualAddedWidth / 2;
        } else if (isResizing.includes('w')) {
          // 왼쪽 확장: 너비는 늘어나고, 중심점은 늘어난 양의 절반만큼 왼쪽(-X)으로
          const addedWidth = -deltaX;
          newWidth = Math.max(300, initialCapture.width + addedWidth);
          const actualAddedWidth = newWidth - initialCapture.width;
          newX = initialCapture.x - actualAddedWidth / 2;
        }

        // --- Y축 계산 ---
        if (isResizing.includes('s')) {
          // 아래쪽 확장: 높이는 늘어나고, 중심점은 늘어난 양의 절반만큼 아래(+Y)로
          const addedHeight = deltaY;
          newHeight = Math.max(200, initialCapture.height + addedHeight);
          const actualAddedHeight = newHeight - initialCapture.height;
          newY = initialCapture.y + actualAddedHeight / 2;
        } else if (isResizing.includes('n')) {
          // 위쪽 확장: 높이는 늘어나고, 중심점은 늘어난 양의 절반만큼 위(-Y)로
          const addedHeight = -deltaY;
          newHeight = Math.max(200, initialCapture.height + addedHeight);
          const actualAddedHeight = newHeight - initialCapture.height;
          newY = initialCapture.y - actualAddedHeight / 2;
        }

        setResizedSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
      setInitialCapture(null); // 캡처 데이터 초기화
      document.body.style.userSelect = 'auto';
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizedSize, initialCapture]);

  return (
    <DialogPortal data-slot="dialog-portal">
      {resolvedShowOverlay && <DialogOverlay style={{ zIndex: overlayZIndex }} className={overlayClassName} />}
      <DialogPrimitive.Content
        ref={contentRef}
        data-slot="dialog-content"
        style={contentStyle}
        className={cn(
          'fixed left-[50%] top-[50%] grid grid-rows-[auto_1fr_auto] gap-5 transition-none',
          'bg-white rounded-lg border border-[var(--color-gray-20)]  px-0 py-0 shadow-lg outline-none',
          'w-full grid grid-rows-[auto_1fr_auto]',
          className
        )}
        onMouseDown={handleMouseDown}
        onPointerDownOutside={(event) => {
          onPointerDownOutside?.(event);
        }}
        onInteractOutside={(event) => {
          onInteractOutside?.(event);
        }}
        {...props}
      >
        {children}
        {(isDragging || !!isResizing) && !isFullSize && (
          <div
            aria-hidden="true"
            className="absolute inset-0 z-51 bg-transparent"
            style={{
              cursor: isDragging ? 'grabbing' : undefined,
            }}
          />
        )}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={cn(
              'flex items-center justify-center w-[2.4rem] h-[2.4rem] ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-[2.2rem] right-[2.4rem] rounded-xs transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none',
              closeButtonClassName
            )}
          >
            <CloseIcon color="#2C2724" />
          </DialogPrimitive.Close>
        )}
        {/* Resize Handles - Only shown when resizable is true and not full size */}
        {resizable && !isFullSize && (
          <>
            <div
              data-slot="resize-handle"
              data-direction="e"
              className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500/20 transition-colors"
            />
            <div
              data-slot="resize-handle"
              data-direction="w"
              className="absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-blue-500/20 transition-colors"
            />
            <div
              data-slot="resize-handle"
              data-direction="s"
              className="absolute bottom-0 left-0 h-1 w-full cursor-row-resize hover:bg-blue-500/20 transition-colors"
            />
            <div
              data-slot="resize-handle"
              data-direction="n"
              className="absolute top-0 left-0 h-1 w-full cursor-row-resize hover:bg-blue-500/20 transition-colors"
            />
            {/* Corner resize handles */}
            <div
              data-slot="resize-handle"
              data-direction="se"
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize hover:bg-blue-500/30 transition-colors rounded-bl-lg"
            />
            <div
              data-slot="resize-handle"
              data-direction="sw"
              className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize hover:bg-blue-500/30 transition-colors rounded-br-lg"
            />
            <div
              data-slot="resize-handle"
              data-direction="ne"
              className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize hover:bg-blue-500/30 transition-colors rounded-tl-lg"
            />
            <div
              data-slot="resize-handle"
              data-direction="nw"
              className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize hover:bg-blue-500/30 transition-colors rounded-tr-lg"
            />
          </>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        'flex flex-row content-start cursor-grab w-full active:cursor-grabbing min-h-[5.6rem] justify-center shrink-0 px-6 pt-5 shrink-0',
        className
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex flex-col gap-0 p-0 overflow-hidden rounded-bl-[.8rem] rounded-br-[.8rem]', className)}
      {...props}
    />
  );
}

function DialogFooterArea({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer-area"
      className={cn(
        'flex gap-2 pb-5 px-6 justify-between [&>div]:w-full [&>div]:first:justify-start [&>div]:last:justify-end',
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        'flex items-end gap-0.5 leading-none text-[1.6rem] tracking-tighter text-left border-b border-b-[0.1rem] border-[var(--color-gray-20)] pb-3 w-full pr-6 [&_.body-xl]:!text-[1.4rem] [&_.body-xl]:!text-[var(--color-gray-70)]',
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function DialogSection({ children, className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <Grid
      gap={3}
      data-slot="dialog-section"
      className={cn('px-6 w-full h-full text-[1.4rem] overflow-auto grid-rows-[1fr]', className)}
      {...props}
    >
      {children}
    </Grid>
  );
}

export {
  DialogSection,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogFooterArea,
};
