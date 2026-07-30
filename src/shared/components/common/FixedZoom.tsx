/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { ReactNode, CSSProperties, HTMLAttributes } from 'react';
import { useZoomScale } from '@/shared/hooks/useZoomScale';
import { cn } from '@/shared/lib/shadcn/utils';

export interface FixedZoomProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** div 대신 custom tag 사용 여부 (기본: div) */
  as?: React.ElementType;
}

/**
 * 화면 전체 확대/축소(Zoom) 배율에 관계없이 내부 요소를 100% 비율 크기로 고정시켜주는 공통 래퍼 컴포넌트
 *
 * @example
 * ```tsx
 * <FixedZoom className="py-1">
 *   <PageTitle data={data} />
 * </FixedZoom>
 * ```
 */
export const FixedZoom = ({ children, className, style, as: asComp = 'div', ...rest }: FixedZoomProps) => {
  const { fixedStyle } = useZoomScale();
  const Comp = asComp;

  return (
    <Comp className={cn('fixed-zoom', className)} style={{ ...fixedStyle, ...style }} {...rest}>
      {children}
    </Comp>
  );
};
