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

/**
 * Dialog 톤 타입 (실제 시각적 상태)
 *
 * @description
 * - danger: 적색 파괴적 버튼 (삭제 등 위험 작업)
 * - info: 기본 파란색 버튼 (일반 확인)
 */
export type DialogTone = 'danger' | 'info';

type ConfirmDialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: DialogTone;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  trigger?: React.ReactNode;
  /** Alert mode: 취소 버튼 숨김 */
  alertMode?: boolean;
  /** Promise resolve 함수 (DialogRenderer에서 전달) */
  resolve?: (result?: unknown) => void;
};

export function ConfirmDialog({
  open,
  defaultOpen = true,
  onOpenChange,
  title = '알림',
  description,
  confirmLabel = '확인',
  cancelLabel = '',
  tone = 'info',
  onConfirm,
  onCancel,
  trigger,
  alertMode = false,
  resolve,
}: ConfirmDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const dialogProps = {
    ...(open !== undefined ? { open } : {}),
    defaultOpen: defaultOpen ?? true, // 항상 기본 열림 상태
    ...(onOpenChange ? { onOpenChange } : {}),
  };

  // alertMode인 경우 취소 버튼 숨김
  const showConfirm = !!confirmLabel.length;
  const showCancel = !alertMode && !!cancelLabel.length;

  // 다이얼로그 닫기 함수
  const closeDialog = () => {
    onOpenChange?.(false);
  };

  // 확인 버튼 핸들러
  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      // onConfirm이 있으면 실행
      if (onConfirm) {
        await onConfirm();
      }
    } finally {
      setIsLoading(false);
      // alertMode: void, confirm mode: true
      resolve?.(alertMode ? undefined : true);
      closeDialog();
    }
  };

  // 취소 버튼 핸들러
  const handleCancel = () => {
    onCancel?.();
    resolve?.(false); // confirm mode에서 취소는 false
    closeDialog();
  };

  return (
    <AlertDialog {...dialogProps}>
      {trigger ? <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger> : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? <AlertDialogDescription dangerouslySetInnerHTML={{ __html: description }} /> : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {showCancel && <AlertDialogCancel onClick={handleCancel}>{cancelLabel}</AlertDialogCancel>}
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

// default export for dynamic import
export default ConfirmDialog;
