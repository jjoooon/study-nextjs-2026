/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import {
  registerDialog,
  unregisterDialog,
  getOpenCount,
  getTopOpenDialogId,
  getDialogLayerIndex,
  subscribeOverlay,
} from '@/shared/utils/popup/dialogOverlayRegistry';
import { Grid } from '@atoms';
import { CloseIcon } from '@icons';
import { Button } from '@uiux/Button';

type DialogSizeValue = number | string;

type DialogSizePreset = 'xs' | 'sm' | 'md' | 'ml' | 'lg' | 'xl' | '2xl' | 'full';

type DialogSizeConfig = {
  width?: DialogSizeValue;
  height?: DialogSizeValue;
  minWidth?: DialogSizeValue;
  minHeight?: DialogSizeValue;
  maxWidth?: DialogSizeValue;
  maxHeight?: DialogSizeValue;
};

/** 다이얼로그 가로/세로 크기 타입 */
type DialogSize = DialogSizePreset | DialogSizeConfig;

const DEFAULT_DIALOG_CONTENT_Z_INDEX = 51;
const DIALOG_Z_INDEX_STEP = 2;
const DIALOG_VIEWPORT_GAP = '2.4rem';
const DIALOG_DEFAULT_MAX_HEIGHT = `calc(100vh - ${DIALOG_VIEWPORT_GAP})`;
const DIALOG_FULL_WIDTH = `calc(100vw - 2rem)`;
const DIALOG_FULL_HEIGHT = `calc(100vh - 2rem)`;
const DIALOG_PRESET_WIDTH: Record<Exclude<DialogSizePreset, 'full'>, string> = {
  xs: '32rem',
  sm: '48rem',
  md: '56rem',
  ml: '62rem',
  lg: '76rem',
  xl: '96rem',
  '2xl': '118rem',
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

  if (
    size === 'xs' ||
    size === 'sm' ||
    size === 'md' ||
    size === 'ml' ||
    size === 'lg' ||
    size === 'xl' ||
    size === '2xl'
  ) {
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

type DialogContextValue = {
  depth: number;
  dialogId: string | null;
  isMinimized: boolean;
  setMinimized: React.Dispatch<React.SetStateAction<boolean>>;
};

const DialogDepthContext = React.createContext<DialogContextValue>({
  depth: 0,
  dialogId: null,
  isMinimized: false,
  setMinimized: () => {},
});

interface DialogProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  /**
   * 다이얼로그의 열림 상태 (Controlled)
   */
  open?: boolean;
  /**
   * 다이얼로그의 기본 초기 열림 상태 (Uncontrolled)
   */
  defaultOpen?: boolean;
  /**
   * 다이얼로그 열림 상태가 바뀔 때 호출되는 콜백 함수
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * 모달 형태로 작동할지 여부 (배경 클릭 차단 등)
   * @default true
   */
  modal?: boolean;
  /**
   * 다이얼로그의 접힘 상태 (Controlled)
   */
  minimized?: boolean;
  /**
   * 다이얼로그의 기본 초기 접힘 상태 (Uncontrolled)
   */
  defaultMinimized?: boolean;
  /**
   * 다이얼로그 접힘 상태가 바뀔 때 호출되는 콜백 함수
   */
  onMinimizeChange?: (minimized: boolean) => void;
}

/**
 * 다이얼로그 루트 컴포넌트 (Dialog)
 * - 팝업/모달의 라이프사이클과 중첩(Depth) 깊이에 따른 레이어 포커스를 관리합니다.
 */
function Dialog({
  open: openProp,
  defaultOpen,
  onOpenChange,
  minimized: minimizedProp,
  defaultMinimized,
  onMinimizeChange,
  ...props
}: DialogProps) {
  const parentDialogContext = React.useContext(DialogDepthContext);
  const newDepth = parentDialogContext.depth + 1;
  const dialogId = React.useId();

  // controlled / uncontrolled minimized 상태 모두 추적
  const [minimizedState, setMinimizedState] = React.useState(defaultMinimized ?? false);
  const isMinimizedControlled = minimizedProp !== undefined;
  const isMinimized = isMinimizedControlled ? minimizedProp : minimizedState;

  const handleMinimizeChange = React.useCallback(
    (val: React.SetStateAction<boolean>) => {
      const nextVal = typeof val === 'function' ? (val as (prev: boolean) => boolean)(isMinimized) : val;
      if (!isMinimizedControlled) setMinimizedState(nextVal);
      onMinimizeChange?.(nextVal);
    },
    [isMinimizedControlled, onMinimizeChange, isMinimized]
  );

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

  // open 상태일 때만 _openDialogs 에 등록 및 최소화 상태 반영
  React.useEffect(() => {
    if (!isOpen) return;
    registerDialog(dialogId, newDepth, isMinimized);
    return () => unregisterDialog(dialogId);
  }, [isOpen, dialogId, newDepth, isMinimized]);

  return (
    <DialogDepthContext.Provider
      value={{
        depth: newDepth,
        dialogId,
        isMinimized,
        setMinimized: handleMinimizeChange,
      }}
    >
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

/**
 * 다이얼로그 트리거 컴포넌트 (DialogTrigger)
 * - 클릭 시 다이얼로그를 오픈하는 버튼 역할을 담당합니다.
 */
function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/**
 * 다이얼로그 닫기 컴포넌트 (DialogClose)
 * - 클릭 시 다이얼로그를 닫습니다.
 */
function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

type DialogMinimizeProps = Omit<React.ComponentProps<typeof DialogPrimitive.Close>, 'color'>;

/**
 * 다이얼로그 접기 컴포넌트 (DialogMinimize)
 * - 클릭 시 다이얼로그를 접습니다.
 */
function DialogMinimize({ className, ...props }: DialogMinimizeProps) {
  const { isMinimized, setMinimized } = React.useContext(DialogDepthContext);
  return (
    <Button
      variant={'none'}
      color="transparent"
      onClick={() => setMinimized(!isMinimized)}
      className={cn('flex items-center justify-center p-0', className)}
      {...props}
    >
      {isMinimized ? (
        <span className="w-[1rem] h-[1rem] border border-[var(--color-gray-70)] border-[0.15rem] rounded-[0.2rem]"></span>
      ) : (
        <span className="w-[1.3rem] h-[0.2rem] bg-[var(--color-gray-70)] rounded-[0.2rem]"></span>
      )}
    </Button>
  );
}

interface DialogOverlayProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
  /**
   * 오픈/클로즈 트랜지션 애니메이션 비활성화 여부
   * @default false
   */
  disableMotion?: boolean;
}

/**
 * 다이얼로그 백드롭 오버레이 (DialogOverlay)
 * - 다이얼로그 배경을 차단하는 어두운 막 레이어입니다.
 */
function DialogOverlay({ className, style, disableMotion = false, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      style={style}
      className={cn(
        'fixed inset-0 bg-black/60 pointer-events-none',
        disableMotion
          ? 'transition-none'
          : 'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className
      )}
      {...props}
    />
  );
}

interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /**
   * 우측 상단에 기본 닫기(X) 버튼을 노출할지 여부
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * 닫기(X) 버튼에 적용할 추가적인 CSS 클래스명
   */
  closeButtonClassName?: string;
  /**
   * 백드롭 오버레이를 렌더링할지 여부.
   * 값을 전달하지 않으면 여러 팝업이 겹쳐 열렸을 때 최상위 팝업에만 오버레이를 자동으로 띄워 가독성을 높입니다.
   */
  showOverlay?: boolean;
  /**
   * 백드롭 오버레이에 적용할 추가적인 CSS 클래스명
   */
  overlayClassName?: string;
  /**
   * 마우스 드래그를 통해 다이얼로그 너비/높이를 조절(Resize)할 수 있는지 여부
   * @default false
   */
  resizable?: boolean;
  /**
   * 다이얼로그의 z-index 우선순위 수동 지정.
   * 값을 지정하지 않을 경우, 열린 다이얼로그의 레이어 순서에 맞춰 51, 53, 55 순으로 자동 부여됩니다.
   */
  zIndex?: number;
  /**
   * 다이얼로그 크기 규격 설정 (너비/높이 사이즈)
   * - 프리셋: 'xs' | 'sm' | 'md' | 'ml' | 'lg' | 'xl' | '2xl' | 'full'
   * - 커스텀: `{ width, height, minWidth, minHeight, maxWidth, maxHeight }`
   */
  size?: DialogSize;
  /**
   * 다이얼로그의 초기 출력 기준 오프셋 좌표 (x, y)
   */
  defaultPosition?: {
    x: number;
    y: number;
  };
  minimized?: boolean;
}

/**
 * 다이얼로그 콘텐츠 본체 (DialogContent)
 * - 실제 다이얼로그 팝업 창 영역입니다. 드래그 이동 및 크기 조절(Resizable) 기능을 내장하고 있습니다.
 */
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
  minimized,
  ...props
}: DialogContentProps) {
  const { dialogId, isMinimized } = React.useContext(DialogDepthContext);

  // 오버레이 상태 구독만 (등록은 Dialog 에서 처리)
  const [topOpenDialogId, setTopOpenDialogId] = React.useState(getTopOpenDialogId);
  const [openCount, setOpenCount] = React.useState(getOpenCount);
  const [dialogLayerIndex, setDialogLayerIndex] = React.useState(() => getDialogLayerIndex(dialogId));

  React.useEffect(
    () =>
      subscribeOverlay(() => {
        setTopOpenDialogId(getTopOpenDialogId());
        setOpenCount(getOpenCount());
        setDialogLayerIndex(getDialogLayerIndex(dialogId));
      }),
    [dialogId]
  );

  // 최소화로 인해 활성화된 팝업 개수가 0이 될 때 body style 조정
  React.useEffect(() => {
    if (openCount === 0) {
      document.body.style.removeProperty('pointer-events');
      document.body.style.removeProperty('filter');
    } else {
      document.body.style.pointerEvents = 'none';
      document.body.style.filter = 'none';
    }

    return () => {
      if (getOpenCount() === 0) {
        document.body.style.removeProperty('pointer-events');
        document.body.style.removeProperty('filter');
      }
    };
  }, [openCount]);

  // 레이어 기반 z-index: 열린 순서대로 51, 53, 55 ...
  const autoContentZIndex = DEFAULT_DIALOG_CONTENT_Z_INDEX + (Math.max(dialogLayerIndex, 1) - 1) * DIALOG_Z_INDEX_STEP;

  // 각 다이얼로그는 자신의 레이어 순서만으로 z-index를 결정
  const parallelZIndex = zIndex !== undefined ? zIndex : autoContentZIndex;

  const overlayZIndex = parallelZIndex - 1;

  // 단일 팝업 → 항상 암막 표시 / 복수 팝업 → 최상위 다이얼로그만 암막 표시 (현재 팝업이 최소화된 경우에는 무조건 암막 숨김)
  const resolvedShowOverlay =
    !isMinimized && (showOverlay ?? (openCount <= 1 || (dialogId !== null && dialogId === topOpenDialogId)));
  const disableOverlayMotion = openCount > 1;
  const isFullSize = size === 'full';
  const [position, setPosition] = React.useState(defaultPosition ?? { x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = React.useState(() => defaultPosition !== undefined);
  const [resizedSize, setResizedSize] = React.useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState<string | null>(null);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const [prevDefaultPosition, setPrevDefaultPosition] = React.useState<typeof defaultPosition>(defaultPosition);

  const setContentRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (node !== null && !isInitialized) {
        const rect = node.getBoundingClientRect();
        setPosition({ x: rect.left, y: rect.top });
        setIsInitialized(true);
      }
    },
    [isInitialized]
  );

  // defaultPosition 변경 시 최신 상태로 동기화 (렌더 단계에서 동기화, x/y 좌표값 비교로 무한루프 방지)
  if (defaultPosition?.x !== prevDefaultPosition?.x || defaultPosition?.y !== prevDefaultPosition?.y) {
    setPrevDefaultPosition(defaultPosition);
    if (defaultPosition) {
      setPosition(defaultPosition);
    }
  }

  const resolvedSize = React.useMemo(() => resolveDialogSize(size), [size]);

  const contentStyle = React.useMemo<React.CSSProperties>(
    () => ({
      ...(props.style ?? {}),
      left: isInitialized ? '0px' : '50%',
      top: isInitialized ? '0px' : '50%',
      transform: isInitialized ? `translate(${position.x}px, ${position.y}px)` : `translate(-50%, -50%)`,
      cursor: isDragging ? 'grabbing' : isResizing ? 'auto' : undefined,
      width: resizedSize.width > 0 ? `${resizedSize.width}px` : resolvedSize.width,
      height: resizedSize.height > 0 ? `${resizedSize.height}px` : resolvedSize.height,
      minWidth: resolvedSize.minWidth,
      minHeight: resolvedSize.minHeight,
      maxWidth: resolvedSize.maxWidth,
      maxHeight: resolvedSize.maxHeight,
      zIndex: parallelZIndex,
    }),
    [
      props.style,
      position.x,
      position.y,
      isDragging,
      isResizing,
      resizedSize,
      resolvedSize,
      parallelZIndex,
      isInitialized,
    ]
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
          // 오른쪽 확장: 좌측(left)이 고정되고 우측으로 너비 확대
          newWidth = Math.max(300, initialCapture.width + deltaX);
          newX = initialCapture.x;
        } else if (isResizing.includes('w')) {
          // 왼쪽 확장: 우측(right)이 고정되고 좌측으로 너비 확대
          newWidth = Math.max(300, initialCapture.width - deltaX);
          const actualWidthChange = newWidth - initialCapture.width;
          newX = initialCapture.x - actualWidthChange;
        }

        // --- Y축 계산 ---
        if (isResizing.includes('s')) {
          // 아래쪽 확장: 위쪽(top)이 고정되고 아래쪽으로 높이 확대
          newHeight = Math.max(200, initialCapture.height + deltaY);
          newY = initialCapture.y;
        } else if (isResizing.includes('n')) {
          // 위쪽 확장: 아래쪽(bottom)이 고정되고 위쪽으로 높이 확대
          newHeight = Math.max(200, initialCapture.height - deltaY);
          const actualHeightChange = newHeight - initialCapture.height;
          newY = initialCapture.y - actualHeightChange;
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
      {resolvedShowOverlay && (
        <DialogOverlay
          style={{ zIndex: overlayZIndex }}
          className={overlayClassName}
          disableMotion={disableOverlayMotion}
        />
      )}
      <DialogPrimitive.Content
        ref={setContentRef}
        data-slot="dialog-content"
        style={contentStyle}
        data-isminimize={isMinimized ? 'true' : 'false'}
        className={cn(
          'fixed grid grid-rows-[auto_1fr_auto] gap-5 transition-none',
          'bg-white rounded-lg border border-[var(--color-gray-20)]  px-0 py-0 shadow-lg outline-none',
          'w-full grid grid-rows-[auto_1fr_auto]',
          className
        )}
        onMouseDown={handleMouseDown}
        onPointerDownOutside={(event) => {
          event.preventDefault();
          onPointerDownOutside?.(event);
        }}
        onInteractOutside={(event) => {
          event.preventDefault();
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
        {minimized && (
          <DialogMinimize
            className={cn(
              'flex items-center justify-center w-[2.4rem] h-[2.4rem] absolute top-[2.2rem] rounded-xs transition-opacity disabled:pointer-events-none p-0',
              showCloseButton ? 'right-[5.6rem]' : 'right-[2.4rem]'
            )}
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

/**
 * 다이얼로그 헤더 영역 (DialogHeader)
 * - 팝업 최상단 타이틀 영역이며, 잡아서 드래그하여 다이얼로그를 이동할 수 있는 트리거 영역입니다.
 */
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

/**
 * 다이얼로그 하단 푸터 (DialogFooter)
 * - 다이얼로그의 하단 버튼 배치 영역입니다.
 */
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

/**
 * 다이얼로그 타이틀 (DialogTitle)
 * - 팝업 상단 굵은 텍스트 제목 영역입니다.
 */
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

/**
 * 다이얼로그 세부 설명 (DialogDescription)
 */
function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

/**
 * 다이얼로그 스크롤 가능 세션 콘텐츠 영역 (DialogSection)
 */
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
  DialogMinimize,
};
