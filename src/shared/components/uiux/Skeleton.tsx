/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  loading?: boolean;
  /**
   * 모션(쉬머 애니메이션) 적용 여부
   * @default false
   */
  animate?: boolean;
  /**
   * 스켈레톤 형태 유형
   * - 'default': 기본 박스 형태 (rounded-[0.4rem])
   * - 'text': 텍스트 라인 형태 (inline-block, align-middle, h-[2rem], rounded-[1rem])
   * @default 'default'
   */
  type?: 'default' | 'text';
  /**
   * 스켈레톤 색상 톤
   * - 'default': 기본 밝은 톤 (#edeff1)
   * - 'dark': 더 진한 톤 (#d6d9dd)
   * @default 'default'
   */
  color?: 'default' | 'dark' | string;
}

function Skeleton({
  className,
  width,
  height,
  style,
  loading = true,
  animate = true,
  type = 'default',
  color = 'default',
  children,
  ...props
}: SkeletonProps) {
  const formatValue = (val?: string | number) => {
    if (val === undefined || val === null) return undefined;
    if (typeof val === 'number') return `${val}px`;
    return val;
  };

  const customStyle: React.CSSProperties = {
    ...(width !== undefined && { width: formatValue(width) }),
    ...(height !== undefined && { height: formatValue(height) }),
    ...style,
  };

  const isDark = color === 'dark';

  return (
    <>
      {loading ? (
        <div
          className={cn(
            'shrink-0',
            type === 'text' ? 'inline-block align-middle h-[2rem] rounded-[1rem]' : 'rounded-[0.4rem]',
            animate
              ? isDark
                ? 'skeleton-shimmer-screen-dark'
                : 'skeleton-shimmer-screen'
              : isDark
                ? 'bg-[var(--color-gray-10)]'
                : 'bg-[#edeff1]',
            children ? 'relative' : '',
            className
          )}
          style={customStyle}
          {...props}
        >
          {children && <div className="invisible pointer-events-none select-none">{children}</div>}
        </div>
      ) : (
        children
      )}
    </>
  );
}

export { Skeleton };
