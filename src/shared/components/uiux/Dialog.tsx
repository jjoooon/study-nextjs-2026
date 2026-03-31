'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { CloseIcon } from '@icons';
import { cn } from '@/shared/lib/shadcn/utils';
import { Gcol, Grid } from '@atoms';

type DialogSizeValue = number | string;

type DialogSizePreset = 'sm' | 'md' | 'lg' | 'full';

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
const DEFAULT_DIALOG_CONTENT_Z_INDEX = DEFAULT_DIALOG_OVERLAY_Z_INDEX + 1;
const DIALOG_VIEWPORT_GAP = '2.4rem';
const DIALOG_DEFAULT_MAX_HEIGHT = `calc(100vh - ${DIALOG_VIEWPORT_GAP})`;
const DIALOG_FULL_WIDTH = `calc(100vw - 2rem)`;
const DIALOG_FULL_HEIGHT = `calc(100vh - 2rem)`;
const DIALOG_PRESET_WIDTH: Record<Exclude<DialogSizePreset, 'full'>, string> = {
  sm: '37rem',
  md: '56rem',
  lg: '76rem',
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

  if (size === 'sm' || size === 'md' || size === 'lg') {
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

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
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

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-black/60',
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
  showOverlay = true,
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
      zIndex: zIndex ?? DEFAULT_DIALOG_CONTENT_Z_INDEX,
    }),
    [props.style, position.x, position.y, isDragging, isResizing, resizedSize, resolvedSize, zIndex]
  );

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      if (isFullSize) return; // full 사이즈일 때 드래그/리사이즈 비활성화
      // DialogHeader 또는 드래그 가능한 영역에서만 시작
      const target = e.target as HTMLElement;
      const dialogHeader = target.closest('[data-slot="dialog-header"]');
      const dialogClose = target.closest('[data-slot="dialog-close"]');
      const resizeHandle = target.closest('[data-slot="resize-handle"]');

      // Close 버튼이면 드래그하지 않음
      if (dialogClose) return;

      // Resize handle에서 시작하면 resize 모드
      if (resizeHandle) {
        e.preventDefault();
        setIsResizing(resizeHandle.getAttribute('data-direction'));
        setDragStart({ x: e.clientX, y: e.clientY });
        return;
      }

      // Header가 있고 Header 내부이거나, Header가 없으면 드래그 허용
      if (dialogHeader || !contentRef.current?.querySelector('[data-slot="dialog-header"]')) {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
      }
    },
    [position, isFullSize]
  );

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.body.style.userSelect = 'none';
      if (isDragging && !isResizing) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setPosition({ x: newX, y: newY });
      }

      if (isResizing && contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        const baseWidth = resizedSize.width || rect.width;
        const baseHeight = resizedSize.height || rect.height;
        let shiftX = 0;
        let shiftY = 0;

        const newSize = { ...resizedSize };

        if (isResizing.includes('e')) {
          const nextWidth = Math.max(300, baseWidth + deltaX);
          newSize.width = nextWidth;
          shiftX += (nextWidth - baseWidth) / 2;
        }
        if (isResizing.includes('w')) {
          const nextWidth = Math.max(300, baseWidth - deltaX);
          newSize.width = nextWidth;
          shiftX -= (nextWidth - baseWidth) / 2;
        }
        if (isResizing.includes('s')) {
          const nextHeight = Math.max(200, baseHeight + deltaY);
          newSize.height = nextHeight;
          shiftY += (nextHeight - baseHeight) / 2;
        }
        if (isResizing.includes('n')) {
          const nextHeight = Math.max(200, baseHeight - deltaY);
          newSize.height = nextHeight;
          shiftY -= (nextHeight - baseHeight) / 2;
        }

        setResizedSize(newSize);
        if (shiftX !== 0 || shiftY !== 0) {
          setPosition((prev) => ({
            x: prev.x + shiftX,
            y: prev.y + shiftY,
          }));
        }
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
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
  }, [isDragging, isResizing, dragStart, resizedSize]);

  return (
    <DialogPortal data-slot="dialog-portal">
      {showOverlay && <DialogOverlay className={overlayClassName} />}
      <DialogPrimitive.Content
        ref={contentRef}
        data-slot="dialog-content"
        style={contentStyle}
        className={cn(
          'fixed left-[50%] top-[50%] grid grid-rows-[auto_1fr_auto] gap-[1.2rem] transition-none',
          'bg-white rounded-lg border border-[var(--color-gray-20)]  px-0 py-0 shadow-lg outline-none',
          'w-full',
          className
        )}
        onMouseDown={handleMouseDown}
        onPointerDownOutside={(event) => {
          onPointerDownOutside?.(event);
          if (!showOverlay) {
            event.preventDefault();
          }
        }}
        onInteractOutside={(event) => {
          onInteractOutside?.(event);
          if (!showOverlay) {
            event.preventDefault();
          }
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
            className="flex items-center justify-center w-[2.4rem] h-[2.4rem] ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-[2.2rem] right-[2.4rem] rounded-xs transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none "
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
        'flex flex-row content-start cursor-grab w-full active:cursor-grabbing min-h-[3.9rem] justify-center shrink-0 px-6 pt-5',
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
      className={cn('flex justify-between items-center gap-0 pt-5 pb-0 px-0 overflow-hidden rounded-bl-[.8rem] rounded-br-[.8rem] ', className)}
      
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('flex items-end gap-0.5 leading-none text-[1.6rem] tracking-tighter text-left border-b border-b-[0.1rem] border-[var(--color-gray-20)] pb-3 w-full pr-6', className)}
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
      gap={5}
      data-slot="dialog-section"
      className={cn('px-6 w-full h-full text-[1.4rem]', className)}
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
};
