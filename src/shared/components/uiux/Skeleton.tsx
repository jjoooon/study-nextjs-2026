/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  loading?: boolean;
}

function Skeleton({ className, width, height, style, loading = true, children, ...props }: SkeletonProps) {
  const customStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  return (
    <>
      {loading ? (
        <div
          className={cn('rounded-[0.4rem] skeleton-shimmer-screen', children ? 'relative' : '', className)}
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
