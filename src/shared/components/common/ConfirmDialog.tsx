/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

/**
 * ConfirmDialog Component
 *
 * @description
 * 사용자 확인이 필요한 작업 전에 표시하는 모달 다이얼로그 컴포넌트
 * 삭제, 저장 등 중요한 액션 전 사용자의 명시적 동의를 받을 때 사용
 *
 * @features
 * - 2가지 톤(tone) 옵션: danger(위험), info(일반)
 * - Alert 모드: 취소 버튼 없이 확인만 가능
 * - Confirm 모드: 확인/취소 버튼 제공
 * - 비동기 작업 지원: onConfirm에서 Promise 반환 가능
 * - DialogRenderer와 연동하여 선언적 API 제공
 *
 * @example
 * // 기본 사용 (Confirm 모드)
 * <ConfirmDialog
 *   title="삭제 확인"
 *   description="정말 삭제하시겠습니까?"
 *   confirmLabel="삭제"
 *   cancelLabel="취소"
 *   tone="danger"
 *   onConfirm={() => console.log('삭제됨')}
 * />
 *
 * // Alert 모드 (취소 버튼 없음)
 * <ConfirmDialog
 *   alertMode
 *   title="알림"
 *   description="저장되었습니다."
 *   confirmLabel="확인"
 * />
 *
 * // DialogRenderer를 통한 명령형 API
 * const result = await confirm({
 *   title: '삭제 확인',
 *   description: '정말 삭제하시겠습니까?',
 *   tone: 'danger'
 * });
 *
 * @version 1.0.0
 * @since 2026-03-05
 * @lastModified 2026-03-05
 */

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
} from '@uiux/AlertDialog';
import React from 'react';

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
  description?: string | React.ReactNode;
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
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {showCancel && <AlertDialogCancel onClick={handleCancel}>{cancelLabel}</AlertDialogCancel>}
          {showConfirm && (
            <AlertDialogAction
              disabled={isLoading}
              className={
                tone === 'danger'
                  ? 'border-(--color-danger-50) bg-(--color-gray-0) text-(--color-danger-50) hover:bg-(--color-danger-5) hover:border-dashed hover:border-(--color-danger-50)'
                  : undefined
              }
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

export default ConfirmDialog;
