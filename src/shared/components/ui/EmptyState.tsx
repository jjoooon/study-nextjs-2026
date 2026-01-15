/**
 * Shared EmptyState Component
 *
 * @description
 * 데이터가 없을 때 보여주는 빈 상태 컴포넌트
 * 아이콘, 메시지, 액션 버튼을 포함할 수 있음
 *
 * @usage
 * ```tsx
 * <EmptyState
 *   message="등록된 제품이 없습니다."
 *   icon={<FolderOpenIcon />}
 *   action={{
 *     label: "제품 등록하기",
 *     onClick: () => setShowModal(true)
 *   }}
 * />
 * ```
 */

'use client';

import type { ReactNode } from 'react';

// ============================================================================
// EMPTY STATE PROPS
// ============================================================================

/**
 * EmptyState 액션 Props
 */
export interface EmptyStateAction {
  /**
   * 버튼 라벨
   */
  label: string;

  /**
   * 클릭 핸들러
   */
  onClick: () => void;

  /**
   * 버튼 스타일
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline';
}

/**
 * EmptyState Component Props
 */
export interface EmptyStateProps {
  /**
   * 메시지
   */
  message: string;

  /**
   * 아이콘 (선택)
   */
  icon?: ReactNode;

  /**
   * 설명 (선택)
   */
  description?: string;

  /**
   * 액션 버튼 (선택)
   */
  action?: EmptyStateAction;

  /**
   * 추가 클래스명
   */
  className?: string;
}

// ============================================================================
// EMPTY STATE COMPONENT
// ============================================================================

/**
 * EmptyState Component
 *
 * @description
 * 데이터가 없을 때 보여주는 컴포넌트
 */
export function EmptyState({ message, icon, description, action, className = '' }: EmptyStateProps) {
  const buttonVariantClasses = {
    primary: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors',
    secondary: 'px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors',
    outline: 'px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors',
  };

  return (
    <div className={`text-center py-12 ${className}`}>
      {/* 아이콘 */}
      {icon && (
        <div className="mb-4 flex justify-center">
          <div className="text-gray-400">{icon}</div>
        </div>
      )}

      {/* 메시지 */}
      <p className="text-gray-500 text-lg">{message}</p>

      {/* 설명 */}
      {description && <p className="text-gray-400 text-sm mt-2">{description}</p>}

      {/* 액션 버튼 */}
      {action && (
        <div className="mt-6">
          <button type="button" onClick={action.onClick} className={buttonVariantClasses[action.variant || 'primary']}>
            {action.label}
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// PREDEFINED EMPTY STATE VARIANTS
// ============================================================================

/**
 * 리스트용 빈 상태
 *
 * @description
 * "데이터가 없습니다" 메시지
 */
export function EmptyList({ message = '데이터가 없습니다.', action }: Omit<EmptyStateProps, 'icon'>) {
  return (
    <EmptyState
      message={message}
      icon={
        <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      }
      action={action}
    />
  );
}

/**
 * 검색 결과용 빈 상태
 *
 * @description
 * "검색 결과가 없습니다" 메시지
 */
export function EmptySearch({
  message = '검색 결과가 없습니다.',
  searchTerm,
}: {
  message?: string;
  searchTerm?: string;
}) {
  const description = searchTerm ? `"${searchTerm}"에 대한 검색 결과가 없습니다.` : '다른 검색어로 시도해보세요.';

  return (
    <EmptyState
      message={message}
      description={description}
      icon={
        <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      }
    />
  );
}

/**
 * 권한 없음 빈 상태
 *
 * @description
 * "접근 권한이 없습니다" 메시지
 */
export function EmptyPermission({ message = '접근 권한이 없습니다.' }: { message?: string }) {
  return (
    <EmptyState
      message={message}
      description="관리자에게 문의하거나 다른 계정으로 로그인해주세요."
      icon={
        <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      }
    />
  );
}

/**
 * 에러 빈 상태
 *
 * @description
 * 오류 발생 시 메시지
 */
export function EmptyError({
  message = '데이터를 불러오는 중 오류가 발생했습니다.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      message={message}
      description="잠시 후 다시 시도해주세요."
      icon={
        <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      }
      action={onRetry ? { label: '다시 시도', onClick: onRetry, variant: 'primary' as const } : undefined}
    />
  );
}
