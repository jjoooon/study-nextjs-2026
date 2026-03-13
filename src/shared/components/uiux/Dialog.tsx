'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { CloseIcon } from '@icons';
import { cn } from '@/shared/lib/shadcn/utils';

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
        'fixed inset-0 z-50 bg-black/50',
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
  defaultPosition,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  showOverlay?: boolean;
  overlayClassName?: string;
  resizable?: boolean;
  zIndex?: number;
  defaultPosition?: {
    x: number;
    y: number;
  };
}) {
  const [position, setPosition] = React.useState(defaultPosition ?? { x: 0, y: 0 });
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState<string | null>(null);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!defaultPosition) return;
    setPosition(defaultPosition);
  }, [defaultPosition]);

  const contentStyle = React.useMemo<React.CSSProperties>(
    () => ({
      ...(props.style ?? {}),
      transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
      cursor: isDragging ? 'grabbing' : isResizing ? 'auto' : undefined,
      width: size.width > 0 ? `${size.width}px` : undefined,
      height: size.height > 0 ? `${size.height}px` : undefined,
      zIndex,
    }),
    [props.style, position.x, position.y, isDragging, isResizing, size, zIndex]
  );

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
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
    [position]
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

        const baseWidth = size.width || rect.width;
        const baseHeight = size.height || rect.height;
        let shiftX = 0;
        let shiftY = 0;

        const newSize = { ...size };

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

        setSize(newSize);
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
  }, [isDragging, isResizing, dragStart, size]);

  return (
    <DialogPortal data-slot="dialog-portal">
      {showOverlay && <DialogOverlay className={overlayClassName} />}
      <DialogPrimitive.Content
        ref={contentRef}
        data-slot="dialog-content"
        style={contentStyle}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid grid-rows-[auto_1fr_auto] gap-[1.2rem] transition-none',
          'bg-white rounded-lg border px-0 py-0 shadow-lg outline-none',
          'w-full',
          className
        )}
        onMouseDown={handleMouseDown}
        {...props}
      >
        {children}
        {(isDragging || !!isResizing) && (
          <div
            aria-hidden="true"
            className="absolute inset-0 z-40 bg-transparent"
            style={{
              cursor: isDragging ? 'grabbing' : undefined,
            }}
          />
        )}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="flex items-center justify-center w-[2.4rem] h-[2.4rem] ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-[2.8rem] right-[3.2rem] rounded-xs transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none "
          >
            <CloseIcon color="#2C2724" />
          </DialogPrimitive.Close>
        )}
        {/* Resize Handles - Only shown when resizable is true */}
        {resizable && (
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
        'flex flex-col gap-2 text-center content-start cursor-grab active:cursor-grabbing min-h-[3.9rem] justify-center shrink-0 px-[3.2rem] pt-[2.6rem] pb-[1rem]',
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
      className={cn('flex justify-center gap-2 pt-[2.4rem] pb-[2rem] px-[3.2erm]', className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('leading-none font-bold text-[1.8rem] tracking-tighter text-left ', className)}
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

export {
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
