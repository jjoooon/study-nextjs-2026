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
} from '@uiux/AlertDialog';

/**
 * Dialog 톤 타입 (실제 시각적 상태)
 *
 * @description
 * - danger: 적색 파괴적 버튼 (삭제 등 위험 작업)
 * - info: 기본 파란색 버튼 (일반 확인)
 */
export type DialogTone = 'danger' | 'info';

type ConfirmDialogProps = {
  /**
   * 다이얼로그의 열림 상태 (Controlled)
   */
  open?: boolean;
  /**
   * 다이얼로그의 초기 열림 상태 (Uncontrolled)
   * @default true
   */
  defaultOpen?: boolean;
  /**
   * 다이얼로그 열림 상태가 바뀔 때 호출되는 콜백 함수
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * 다이얼로그 상단 제목
   * @default '알림'
   */
  title?: string;
  /**
   * 다이얼로그 본문 메시지 (문자열 또는 리액트 노드)
   */
  description?: string | React.ReactNode;
  /**
   * 확인 버튼 라벨 텍스트
   * @default '확인'
   */
  confirmLabel?: string;
  /**
   * 취소 버튼 라벨 텍스트 (빈 값일 경우 취소 버튼을 숨김)
   * @default ''
   */
  cancelLabel?: string;
  /**
   * 다이얼로그의 시각적 톤/테마
   * - danger: 삭제 등 경고성 작업 (적색 테마 적용)
   * - info: 일반적인 확인/안내 (청색 테마 적용)
   * @default 'info'
   */
  tone?: DialogTone;
  /**
   * 확인 버튼을 눌렀을 때 실행되는 함수.
   * Promise를 반환할 수 있어 로딩 상태(비동기 처리)를 지원합니다.
   */
  onConfirm?: () => void | Promise<void>;
  /**
   * 취소 버튼을 눌렀을 때 실행되는 콜백 함수
   */
  onCancel?: () => void;
  /**
   * 다이얼로그를 트리거(열기)하는 리액트 노드 요소
   */
  trigger?: React.ReactNode;
  /**
   * 얼럿 모드 여부. true일 경우 취소 버튼을 원천적으로 비활성화/숨김 처리
   * @default false
   */
  alertMode?: boolean;
  /**
   * Promise 기반 호출을 지원하기 위한 resolve 함수 (DialogRenderer 연동용)
   */
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
  const confirmButtonRef = React.useRef<HTMLButtonElement>(null);
  const cancelButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleOpenAutoFocus = (e: Event) => {
    e.preventDefault();
    if (confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    } else if (cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  };

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
      <AlertDialogContent onOpenAutoFocus={handleOpenAutoFocus}>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description ? (
            typeof description === 'string' ? (
              <AlertDialogDescription
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <AlertDialogDescription className="whitespace-pre-wrap">{description}</AlertDialogDescription>
            )
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {showCancel && (
            <AlertDialogCancel ref={cancelButtonRef} onClick={handleCancel}>
              {cancelLabel}
            </AlertDialogCancel>
          )}
          {showConfirm && (
            <AlertDialogAction
              ref={confirmButtonRef}
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
