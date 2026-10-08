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
  getDialogLayerIndex,
  subscribeOverlay,
} from '@/shared/utils/popup/dialogOverlayRegistry';
import { buttonVariants } from '@uiux/Button';

// AlertDialog가 열릴 때 공유 레지스트리에 등록하기 위한 Context
const AlertDialogIdContext = React.createContext<string | null>(null);

// AlertDialog / Dialog 공유 z-index 시작 Base 값 (100부터 순차적으로 +1씩 부여)
const DEFAULT_ALERT_DIALOG_Z_INDEX = 100;

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

  // 열린 상태일 때만 공유 레지스트리에 등록 (순서대로 order 부여)
  React.useEffect(() => {
    if (!isOpen) return;
    registerDialog(alertDialogId, 1);
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
  style,
  disableMotion = false,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay> & {
  disableMotion?: boolean;
}) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      style={style}
      className={cn(
        'cp-alertdialog-overlay fixed inset-0 bg-black/60',
        disableMotion
          ? 'transition-none'
          : 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({ className, style, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  const alertDialogId = React.useContext(AlertDialogIdContext);

  // 공유 레지스트리 구독: 최상위 다이얼로그만 딤 표시 및 동적 z-index 계산
  const [topOpenDialogId, setTopOpenDialogId] = React.useState(getTopOpenDialogId);
  const [openCount, setOpenCount] = React.useState(getOpenCount);
  const [dialogLayerIndex, setDialogLayerIndex] = React.useState(() => getDialogLayerIndex(alertDialogId));

  React.useEffect(
    () =>
      subscribeOverlay(() => {
        setTopOpenDialogId(getTopOpenDialogId());
        setOpenCount(getOpenCount());
        setDialogLayerIndex(getDialogLayerIndex(alertDialogId));
      }),
    [alertDialogId]
  );

  const showOverlay = openCount <= 1 || alertDialogId === topOpenDialogId;
  const disableOverlayMotion = openCount > 1;

  // 레이어 기반 z-index: Dialog와 동일하게 100부터 시작하여 열린 순서대로 +1씩 부여
  const autoContentZIndex = DEFAULT_ALERT_DIALOG_Z_INDEX + (Math.max(dialogLayerIndex, 1) - 1);
  const overlayZIndex = autoContentZIndex - 1;

  return (
    <AlertDialogPortal>
      {showOverlay && <AlertDialogOverlay style={{ zIndex: overlayZIndex }} disableMotion={disableOverlayMotion} />}
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        style={{ zIndex: autoContentZIndex, ...style }}
        className={cn(
          `cp-alertdialog bg-white 
          data-[state=open]:animate-in 
          data-[state=closed]:animate-out 
          data-[state=closed]:fade-out-0 
          data-[state=open]:fade-in-0 
          data-[state=closed]:zoom-out-95 
          data-[state=open]:zoom-in-95 
          fixed top-[50%] left-[50%] grid w-full translate-x-[-50%] translate-y-[-50%] max-w-[calc(100vw-2rem)] 
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
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      asChild
      data-slot="alert-dialog-description"
      className={cn('text-[1.4rem] w-full p-0', className)}
      {...props}
    >
      <div>{children}</div>
    </AlertDialogPrimitive.Description>
  );
}

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants({ variant: 'contained', size: 'xl' }), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: 'outlined', size: 'xl', color: 'gray' }), className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

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
