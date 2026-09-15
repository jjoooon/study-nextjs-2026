/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

export type UwStatusType =
  | '인수'
  | '인수가능'
  | '거절'
  | '인수불가'
  | '연기'
  | '인심사'
  | '서류보완'
  | '진단'
  | '적부'
  | '할증'
  | '부담보'
  | '감액'
  | string;

/**
 * UW 상태 텍스트에 따른 원형 Dot 색상 추출 유틸 함수
 */
export const getUwStatusColor = (status: string): string => {
  const trimmed = status.trim();
  switch (trimmed) {
    case '인수':
      return 'var(--color-success-60)'; // 초록
    case '거절':
      return 'var(--color-danger-50)'; // 빨강
    case '연기':
      return 'var(--color-gray-30)'; // 회색
    case '인심사':
    case '서류보완':
    case '진단':
    case '적부':
      return 'var(--color-primary-40)'; // 주황
    case '할증':
      return '#F472B6'; //  핑크
    case '부담보':
      return 'var(--color-purple-50)'; // 보라
    case '감액':
      return 'var(--color-information-50)'; // 파랑
    case 'SI경증':
      return 'var(--color-success-60)';
    case 'SI경증(감액)':
      return 'var(--color-information-50)';
    default:
      return 'var(--color-success-60)';
  }
};

export interface UwDotProps {
  status?: UwStatusType;
  size?: 'sm' | 'md' | 'lg' | number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * [공용 컴포넌트] UW 상태 텍스트에 따라 색상이 동적으로 설정되는 원형 Dot 컴포넌트
 */
export function DotColor({ status = '', size = 'md', className, style }: UwDotProps) {
  const color = getUwStatusColor(status);

  const sizeClass =
    size === 'sm'
      ? 'w-[0.6rem] h-[0.6rem]'
      : size === 'lg'
        ? 'w-[1.2rem] h-[1.2rem]'
        : typeof size === 'number'
          ? ''
          : 'w-[1rem] h-[1rem]';

  const customSizeStyle = typeof size === 'number' ? { width: `${size}px`, height: `${size}px` } : {};

  return (
    <span
      className={cn('rounded-full inline-block shrink-0', sizeClass, className)}
      style={{ backgroundColor: color, ...customSizeStyle, ...style }}
      title={status}
    />
  );
}
