'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/uiux';

type ConfirmDialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'danger' | 'info' | 'success';
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  trigger?: React.ReactNode;
};

export function ConfirmDialog({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '',
  tone = 'danger',
  onConfirm,
  onCancel,
  trigger,
}: ConfirmDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const dialogProps = {
    ...(open !== undefined ? { open } : {}),
    ...(defaultOpen !== undefined ? { defaultOpen } : {}),
    ...(onOpenChange ? { onOpenChange } : {}),
  };

  const showConfirm = !!confirmLabel.length;
  const showCancel = !!cancelLabel.length;
  console.log('ConfirmDialogqueue Rendered', showCancel);
  const handleConfirm = async () => {
    if (!onConfirm) return;
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
      onOpenChange?.(false);
    }
  };

  return (
    <AlertDialog {...dialogProps}>
      {trigger ? <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger> : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {showCancel && <AlertDialogCancel onClick={onCancel}>{cancelLabel}</AlertDialogCancel>}
          {showConfirm && (
            <AlertDialogAction
              disabled={isLoading}
              className={tone === 'danger' ? 'bg-destructive hover:bg-destructive/90' : undefined}
              onClick={handleConfirm}
            >
              {isLoading ? 'Processing...' : confirmLabel}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
