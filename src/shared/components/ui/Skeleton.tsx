/**
 * Shared Skeleton Component
 *
 * @description
 * 로딩 상태에서 보여주는 스켈레톤 UI 컴포넌트
 * Tailwind CSS의 animate-pulse를 사용한 깜빡이는 효과
 *
 * @usage
 * ```tsx
 * <Skeleton count={5} height="h-24" className="bg-gray-200" />
 * <SkeletonList />
 * <SkeletonCard />
 * ```
 */

'use client';

import type { HTMLAttributes } from 'react';

// ============================================================================
// SKELETON PROPS
// ============================================================================

/**
 * Skeleton 컴포넌트 Props
 */
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 스켈레톤 개수
   * @default 1
   */
  count?: number;

  /**
   * 스켈레톤 높이
   * @default 'h-24'
   */
  height?: string;

  /**
   * 스켈레톤 너비
   * @default 'w-full'
   */
  width?: string;

  /**
   * 배경색 클래스
   * @default 'bg-gray-200'
   */
  bgClassName?: string;
}

// ============================================================================
// SKELETON COMPONENT
// ============================================================================

/**
 * Skeleton Component
 *
 * @description
 * 로딩 상태에서 보여주는 플레이스홀더 컴포넌트
 */
export function Skeleton({
  count = 1,
  height = 'h-24',
  width = 'w-full',
  bgClassName = 'bg-gray-200',
  className = '',
  ...props
}: SkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`${width} ${height} ${bgClassName} rounded-lg animate-pulse`} aria-hidden="true" />
      ))}
    </div>
  );
}

// ============================================================================
// PREDEFINED SKELETON VARIANTS
// ============================================================================

/**
 * 리스트용 스켈레톤
 *
 * @description
 * 리스트 아이템용 스켈레톤 (기본 5개)
 */
export function SkeletonList({ count = 5 }: { count?: number }) {
  return <Skeleton count={count} height="h-24" />;
}

/**
 * 카드용 스켈레톤
 *
 * @description
 * 카드 형태 컴포넌트용 스켈레톤
 */
export function SkeletonCard() {
  return <Skeleton count={1} height="h-64" />;
}

/**
 * 테이블용 스켈레톤
 *
 * @description
 * 테이블 행용 스켈레톤 (기본 10개)
 */
export function SkeletonTable({ rows = 10 }: { rows?: number }) {
  return <Skeleton count={rows} height="h-12" />;
}

/**
 * 텍스트용 스켈레톤
 *
 * @description
 * 제목/본문용 스켈레톤
 */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-200 rounded animate-pulse ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/**
 * 원형 스켈레톤
 *
 * @description
 * 아바타/이미지용 원형 스켈레톤
 */
export function SkeletonCircle({ size = 'w-12 h-12' }: { size?: string }) {
  return <div className={`${size} bg-gray-200 rounded-full animate-pulse`} aria-hidden="true" />;
}

/**
 * 폼용 스켈레톤
 *
 * @description
 * 폼 필드용 스켈레톤
 */
export function SkeletonForm({ fields = 5 }: { fields?: number }) {
  return (
    <div className="space-y-6">
      {[...Array(fields)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" aria-hidden="true" />
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse" aria-hidden="true" />
        </div>
      ))}
      <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" aria-hidden="true" />
    </div>
  );
}
