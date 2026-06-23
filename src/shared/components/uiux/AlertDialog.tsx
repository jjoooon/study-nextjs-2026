/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import {
  registerDialog,
  unregisterDialog,
  getOpenCount,
  getTopOpenDialogId,
  subscribeOverlay,
} from '@/shared/utils/popup/dialogOverlayRegistry';
import { buttonVariants } from '@uiux/Button';

// AlertDialog가 열릴 때 공유 레지스트리에 등록하기 위한 Context
const AlertDialogIdContext = React.createContext<string | null>(null);

// AlertDialog depth는 Dialog보다 항상 위에 있도록 큰 값 사용
const ALERT_DIALOG_DEPTH = 999;

function AlertDialog({
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  const alertDialogId = React.useId();

  // controlled / uncontrolled 상태 모두 추적
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

  // 열린 상태일 때만 공유 레지스트리에 등록
  React.useEffect(() => {
    if (!isOpen) return;
    registerDialog(alertDialogId, ALERT_DIALOG_DEPTH);
    return () => unregisterDialog(alertDialogId);
  }, [isOpen, alertDialogId]);

  return (
    <AlertDialogIdContext.Provider value={alertDialogId}>
      <AlertDialogPrimitive.Root
        data-slot="alert-dialog"
        open={isOpen}
        defaultOpen={defaultOpen}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </AlertDialogIdContext.Provider>
  );
}

function AlertDialogTrigger({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogPortal({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogOverlay({
  className,
  disableMotion = false,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay> & {
  disableMotion?: boolean;
}) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        'fixed inset-0 z-2050 bg-black/60',
        disableMotion
          ? 'transition-none'
          : 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  const alertDialogId = React.useContext(AlertDialogIdContext);

  // 공유 레지스트리 구독: 최상위 다이얼로그만 딤 표시
  const [topOpenDialogId, setTopOpenDialogId] = React.useState(getTopOpenDialogId);
  const [openCount, setOpenCount] = React.useState(getOpenCount);

  React.useEffect(
    () =>
      subscribeOverlay(() => {
        setTopOpenDialogId(getTopOpenDialogId());
        setOpenCount(getOpenCount());
      }),
    []
  );

  const showOverlay = openCount <= 1 || alertDialogId === topOpenDialogId;
  const disableOverlayMotion = openCount > 1;

  return (
    <AlertDialogPortal>
      {showOverlay && <AlertDialogOverlay disableMotion={disableOverlayMotion} />}
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          `bg-white 
          data-[state=open]:animate-in 
          data-[state=closed]:animate-out 
          data-[state=closed]:fade-out-0 
          data-[state=open]:fade-in-0 
          data-[state=closed]:zoom-out-95 
          data-[state=open]:zoom-in-95 
          fixed top-[50%] left-[50%] z-2051 grid w-full translate-x-[-50%] translate-y-[-50%] max-w-[calc(100vw-2rem)] 
          gap-5 rounded-[1rem] border border-[var(--color-gray-15)] py-5 px-6  shadow-none duration-200 w-auto min-w-[28rem] tracking-[-0.08rem]`,
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col items-start gap-5 text-left', className)}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn('flex flex-row justify-center items-center gap-2 text-[1.4rem] ', className)}
      {...props}
    />
  );
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn('text-[1.6rem] font-bold', className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('text-muted-foreground text-center text-[1.4rem] w-full p-0 whitespace-pre-line', className)}
      {...props}
    />
  );
}

function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants({ variant: 'contained', size: 'xl' }), className)}
      {...props}
    />
  );
}

function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outlined', size: 'xl', color: 'gray' }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
