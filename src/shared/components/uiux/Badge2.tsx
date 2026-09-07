/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

// Badge2 전용 cva 스타일 정의 (Figma 스펙: Height 19px, rounded-full 알약 뱃지)
const badge2Variants = cva(
  'inline-flex items-center justify-center rounded-full h-[1.9rem] text-[1.1rem] font-bold px-[0.6rem] py-[0.1rem] tracking-[-0.02rem] whitespace-nowrap shrink-0 gap-[0.2rem] leading-none transition-[color,box-shadow]',
  {
    variants: {
      color: {
        green: 'bg-[#E9FEF2] text-[#00AA4D]',
        blue: 'bg-[#E0EFFF] text-[#006FF2]',
        gray: 'bg-[#EDF0F3] text-[#222222]',
        dark: 'bg-[#000000] text-[#FFFFFF]',
        yellow: 'bg-[#FEF4D4] text-[#DD9F00]',
        red: 'bg-[#E43939] text-[#FFE0E0]',
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
 * - 인수: green (초록)
 * - 심사, 적부: blue (파랑)
 * - 서류, 진단, 예상UW: gray (회색)
 * - 감액, 부담보, 할증: yellow (노랑)
 * - 거절, 부담보·할증·감액: red (빨강)
 */
export const getBadge2ColorByText = (text?: string): VariantProps<typeof badge2Variants>['color'] => {
  if (!text) return 'gray';
  const trimmed = text.trim();

  if (trimmed === '인수') return 'green';
  if (trimmed === '심사' || trimmed === '적부') return 'blue';
  if (trimmed === '서류' || trimmed === '진단' || trimmed === '예상UW' || trimmed === '예상 UW') return 'gray';
  if (trimmed === '감액' || trimmed === '부담보' || trimmed === '할증') return 'yellow';
  if (trimmed === '거절' || (trimmed.includes('부담보') && (trimmed.includes('할증') || trimmed.includes('감액')))) {
    return 'red';
  }

  return 'gray';
};

export interface Badge2Props extends Omit<React.ComponentProps<'span'>, 'color'>, VariantProps<typeof badge2Variants> {
  asChild?: boolean;
}

/**
 * Figma 스펙 (19px 알약형 뱃지) 컴포넌트
 * - 텍스트 내용('인수', '심사', '적부', '서류', '진단', '감액', '부담보', '할증', '거절', '부담보·할증·감액')에 따라
 *   color="green", "blue", "gray", "yellow", "red" 가 자동 매핑됩니다.
 * - 명시적인 color prop 전달 시 지정한 color가 우선 적용됩니다.
 */
function Badge2({ className, color, children, asChild = false, ...props }: Badge2Props) {
  const Comp = asChild ? Slot : 'span';

  const textContent = extractText(children);
  const computedColor = color ?? getBadge2ColorByText(textContent);

  return (
    <Comp data-slot="badge2" className={cn(badge2Variants({ color: computedColor }), className)} {...props}>
      {children}
    </Comp>
  );
}

export { Badge2, badge2Variants };
