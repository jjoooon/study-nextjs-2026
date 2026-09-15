/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import {
  AuditIcon,
  CircleCheckIcon,
  ConditionalIcon,
  DiamondIcon,
  RefuseIcon,
} from '@/shared/components/icons/CommonIcons';
import { cn } from '@/shared/lib/shadcn/utils';

// Badge2 전용 cva 스타일 정의 (Figma 스펙: Height 19px, rounded-full 알약 뱃지)
const badge2Variants = cva(
  'inline-flex items-center justify-center rounded-full h-[1.9rem] text-[1.1rem] font-bold px-[0.6rem] py-[0.1rem] tracking-[-0.02rem] whitespace-nowrap shrink-0 gap-[0.3rem] leading-none transition-[color,box-shadow]',
  {
    variants: {
      color: {
        green: 'bg-[#E9FEF2] text-[#00AA4D]',
        blue: 'bg-[#E0EFFF] text-[#006FF2]',
        gray: 'bg-[#E4E7EC] text-[#000]',
        dark: 'bg-[#000000] text-[#FFFFFF]',
        yellow: 'bg-[#FEF4D4] text-[#DD9F00]',
        red: 'bg-[#FFE0E0] text-[#E43939]',
        orange: 'bg-[#FFE0E0] text-[#FF5C2E]',
      },
    },
    defaultVariants: {
      color: 'gray',
    },
  }
);

/**
 * React.ReactNode 노드에서 텍스트 추출 헬퍼
 */
const extractText = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join('');
  }
  if (React.isValidElement(node) && node.props && (node.props as { children?: React.ReactNode }).children) {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
};

/**
 * 텍스트 내용 기반으로 Badge2 color 자동 매핑
 */
export const getBadge2ColorByText = (text?: string): VariantProps<typeof badge2Variants>['color'] => {
  if (!text) return 'gray';
  const trimmed = text.trim();

  if (
    trimmed.includes('조건부') ||
    trimmed.includes('할증') ||
    trimmed.includes('부담보') ||
    trimmed.includes('감액')
  ) {
    return 'yellow';
  }
  if (trimmed.includes('거절')) {
    return 'red';
  }
  if (trimmed.includes('연기')) {
    return 'gray';
  }
  if (
    trimmed.includes('심사') ||
    trimmed.includes('적부') ||
    trimmed.includes('진단') ||
    trimmed.includes('서류') ||
    trimmed.includes('인심사') ||
    trimmed.includes('서류보완')
  ) {
    return 'orange';
  }
  if (trimmed.includes('인수')) {
    return 'green';
  }

  return 'gray';
};

/**
 * 가입가능 여부(인수, 조건부인수 등) 텍스트 및 뱃지 스타일 렌더링 헬퍼
 * - 다른 컴포넌트(.tsx)에서 공통으로 재사용 가능
 */
export const getPossibilityBadgeStyle = (possibility?: string | string[]) => {
  if (!possibility) return { color: 'green' as const, iconColor: '#00AA4D', label: '예상 : 인수' };

  const rawText = Array.isArray(possibility) ? possibility.filter(Boolean).join(',') : possibility;
  const clean = rawText.replace(/^[0-9]/, '').trim();

  if (!clean) return { color: 'green' as const, iconColor: '#00AA4D', label: '예상 : 인수' };

  const label = clean.startsWith('예상') ? clean : `예상: ${clean}`;

  if (clean.includes('조건부') || clean.includes('할증') || clean.includes('부담보') || clean.includes('감액')) {
    return { color: 'yellow' as const, iconColor: '#DD9F00', label };
  }
  if (clean.includes('거절')) {
    return { color: 'red' as const, iconColor: '#E43939', label };
  }
  if (clean.includes('연기')) {
    return { color: 'gray' as const, iconColor: '#4B5563', label };
  }
  if (clean.includes('심사') || clean.includes('적부') || clean.includes('진단') || clean.includes('서류')) {
    return { color: 'orange' as const, iconColor: '#FF5C2E', label };
  }
  if (clean.includes('인수')) {
    return { color: 'green' as const, iconColor: '#00AA4D', label };
  }

  return { color: 'green' as const, iconColor: '#00AA4D', label };
};

/**
 * 텍스트 내용 기반으로 Badge2 전용 아이콘 자동 생성 헬퍼
 * - 인수: CircleCheckIcon (초록 체크)
 * - 거절: RefuseIcon (빨간 X)
 * - 연기: DiamondIcon (회색 마름모)
 * - 심사 (진단/인심사/서류보완/적부): AuditIcon (레드 점 3개 사각형)
 * - 조건부인수 (할증/부담보/감액): ConditionalIcon (노란 경고 삼각형)
 */
export const getBadge2IconByText = (text?: string, iconColor?: string): React.ReactNode => {
  if (!text) return null;
  const trimmed = text.trim();

  if (
    trimmed.includes('조건부') ||
    trimmed.includes('할증') ||
    trimmed.includes('부담보') ||
    trimmed.includes('감액')
  ) {
    return <ConditionalIcon size={12} color={iconColor ?? '#FFB800'} />;
  }
  if (trimmed.includes('거절')) {
    return <RefuseIcon size={12} color={iconColor ?? '#E43939'} />;
  }
  if (trimmed.includes('연기')) {
    return <DiamondIcon size={13} color={iconColor ?? '#4B5563'} />;
  }
  if (
    trimmed.includes('심사') ||
    trimmed.includes('적부') ||
    trimmed.includes('진단') ||
    trimmed.includes('인심사') ||
    trimmed.includes('서류보완')
  ) {
    return <AuditIcon size={12} color={iconColor ?? '#FF5C2E'} />;
  }
  if (trimmed.includes('인수')) {
    return <CircleCheckIcon size={12} color={iconColor ?? '#00AA4D'} />;
  }

  return null;
};

export interface Badge2Props extends Omit<React.ComponentProps<'span'>, 'color'>, VariantProps<typeof badge2Variants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  showIcon?: boolean;
}

/**
 * Figma 스펙 (19px 알약형 뱃지) 컴포넌트
 */
function Badge2({ className, color, icon, showIcon = true, children, asChild = false, ...props }: Badge2Props) {
  const Comp = asChild ? Slot : 'span';

  const textContent = extractText(children);
  const computedColor = color ?? getBadge2ColorByText(textContent);

  const renderedIcon = React.useMemo(() => {
    if (icon !== undefined) return icon;
    if (!showIcon) return null;

    const hasSvgChild = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && (child.type === 'svg' || typeof child.type === 'function')
    );
    if (hasSvgChild) return null;

    return getBadge2IconByText(textContent);
  }, [icon, showIcon, children, textContent]);

  return (
    <Comp data-slot="badge2" className={cn(badge2Variants({ color: computedColor }), className)} {...props}>
      {renderedIcon}
      {children}
    </Comp>
  );
}

export { Badge2, badge2Variants };
