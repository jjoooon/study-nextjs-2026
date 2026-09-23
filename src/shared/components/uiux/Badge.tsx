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

// Badge 스타일 조합 규칙(cva)
// - base: 공통 레이아웃/타이포/아이콘 처리
// - variants: variant / size / color의 개별 축
// - compoundVariants: 축 조합별 실제 색상/보더 지정
const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-[0.3rem] px-1 w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden leading-none indent-[0rem]',
  {
    variants: {
      variant: {
        contained: '',
        dark: '',
        soft: 'border',
        outlined: 'border bg-transparent',
        rounded: 'rounded-full h-[1.5rem] text-[1.1rem] font-bold px-[0.4rem]',
        ghost: '',
        status:
          'rounded-full h-[1.9rem] text-[1.1rem] font-bold px-[0.6rem] py-[0.1rem] tracking-[-0.02rem] gap-[0.3rem]',
      },
      size: {
        lg: 'h-[2.2rem] text-[1.1rem] font-bold gap-[0.2rem] px-[0.6rem] [&>svg]:size-[1.4rem] pt-[0.1rem] tracking-[-0.13rem]',
        md: 'h-[1.8rem] text-[1.1rem] font-bold px-1 pr-[0.6rem] [&>svg]:size-[1.2rem] tracking-[-0.13rem]',
        sm: 'h-[1.5rem] text-[1.1rem] font-bold pl-[0.2rem] pr-[0.4rem] pt-[0.1rem] [&>svg]:size-[1.1rem] tracking-[-0.13rem]',
      },
      color: {
        // 색상 키 선언
        blue: '',
        red: '',
        green: '',
        primary: '',
        gray: '',
        bluegray: '',
        secondary: '',
        purple: '',
        yellow: '',
        orange: '',
        dark: '',
      },
    },
    compoundVariants: [
      // contained & rounded + color 조합
      {
        variant: ['contained', 'rounded'],
        color: 'blue',
        class: 'bg-[var(--color-information-10)] text-[var(--color-information-50)]',
      },
      {
        variant: ['contained', 'rounded'],
        color: 'red',
        class: 'bg-[var(--color-danger-10)] text-[var(--color-danger-50)]',
      },
      {
        variant: ['contained', 'rounded'],
        color: 'green',
        class: 'bg-[var(--color-success-10)] text-[var(--color-success-50)]',
      },
      {
        variant: ['contained', 'rounded'],
        color: 'primary',
        class: 'bg-[var(--color-danger-10)] text-[var(--color-primary-50)]',
      },
      {
        variant: ['contained', 'rounded'],
        color: 'gray',
        class: 'bg-[var(--color-blue-gray-15)] text-[var(--color-gray-70)]',
      },
      {
        variant: ['contained', 'rounded'],
        color: 'bluegray',
        class: 'bg-[var(--color-blue-gray-50)] text-[var(--color-gray-0)]',
      },
      {
        variant: ['contained', 'rounded'],
        color: 'secondary',
        class: 'bg-[var(--color-secondary-50)] text-[var(--color-gray-0)]',
      },
      { variant: ['contained', 'rounded'], color: 'purple', class: 'bg-[#F0E6FF] text-[#853EE2]' },
      { variant: ['contained', 'rounded'], color: 'yellow', class: 'bg-[var(--color-warning-10)] text-[#FFB800]' },

      // dark + color 조합
      {
        variant: 'dark',
        color: 'blue',
        class: 'bg-[var(--color-information-40)] text-[#FFF]',
      },
      { variant: 'dark', color: 'red', class: 'bg-[var(--color-danger-40)] text-[#FFF]' },
      { variant: 'dark', color: 'green', class: 'bg-[var(--color-success-40)] text-[#FFF]' },
      { variant: 'dark', color: 'primary', class: 'bg-[var(--color-primary-50)] text-[#FFF]' },
      { variant: 'dark', color: 'gray', class: 'bg-[var(--color-blue-gray-15)] text-[#FFF]' },
      { variant: 'dark', color: 'bluegray', class: 'bg-[var(--color-blue-gray-50)] text-[#FFF]' },
      { variant: 'dark', color: 'secondary', class: 'bg-[var(--color-secondary-50)] text-[#FFF]' },
      { variant: 'dark', color: 'purple', class: 'bg-[var(--color-purple-40)] text-[#FFF]' },

      // rounded 변형의 size별 예외 보정
      { variant: 'rounded', size: 'sm', class: 'pl-[0.4rem] pr-[0.6rem]' },

      // soft + color 조합
      {
        variant: 'soft',
        color: 'blue',
        class:
          'bg-[var(--color-information-10)] border-[var(--color-information-50)] text-[var(--color-information-50)]',
      },
      {
        variant: 'soft',
        color: 'red',
        class: 'bg-[var(--color-danger-10)] border-[var(--color-danger-50)] text-[var(--color-danger-50)]',
      },
      {
        variant: 'soft',
        color: 'green',
        class: 'bg-[var(--color-success-10)] border-[var(--color-success-50)] text-[var(--color-success-50)]',
      },
      {
        variant: 'soft',
        color: 'primary',
        class: 'bg-[var(--color-primary-10)] border-[var(--color-primary-50)] text-[var(--color-primary-50)]',
      },
      {
        variant: 'soft',
        color: 'gray',
        class: 'bg-[var(--color-blue-gray-15)] border-[var(--color-gray-70)] text-[var(--color-gray-70)]',
      },
      {
        variant: 'soft',
        color: 'bluegray',
        class: 'bg-[var(--color-gray-0)] border-[var(--color-blue-gray-50)] text-[var(--color-blue-gray-50)]',
      },
      {
        variant: 'soft',
        color: 'secondary',
        class: 'bg-[var(--color-gray-0)] border-[var(--color-secondary-50)] text-[var(--color-secondary-50)]',
      },
      {
        variant: 'soft',
        color: 'purple',
        class: 'bg-[#F0E6FF] border-[#853EE2] text-[#853EE2]',
      },

      // outlined + color 조합
      {
        variant: 'outlined',
        color: 'blue',
        class: 'border-[var(--color-information-50)] text-[var(--color-information-50)]',
      },
      { variant: 'outlined', color: 'red', class: 'border-[var(--color-danger-50)] text-[var(--color-danger-50)]' },
      { variant: 'outlined', color: 'green', class: 'border-[var(--color-success-50)] text-[var(--color-success-50)]' },
      {
        variant: 'outlined',
        color: 'primary',
        class: 'border-[var(--color-primary-50)] text-[var(--color-primary-50)]',
      },
      { variant: 'outlined', color: 'gray', class: 'border-[var(--color-gray-70)] text-[var(--color-gray-70)]' },
      {
        variant: 'outlined',
        color: 'bluegray',
        class: 'border-[var(--color-blue-gray-50)] text-[var(--color-blue-gray-50)]',
      },
      {
        variant: 'outlined',
        color: 'purple',
        class: 'border-[#853EE2] text-[#853EE2]',
      },
      {
        variant: 'outlined',
        color: 'secondary',
        class: 'border-[var(--color-secondary-50)] text-[var(--color-secondary-50)]',
      },

      // ghost + color 조합
      { variant: 'ghost', color: 'blue', class: 'text-[var(--color-information-50)]' },
      { variant: 'ghost', color: 'yellow', class: 'text-[var(--color-warning-50)]' },
      { variant: 'ghost', color: 'red', class: 'text-[var(--color-danger-50)]' },
      { variant: 'ghost', color: 'green', class: 'text-[var(--color-success-50)]' },
      { variant: 'ghost', color: 'primary', class: 'text-[var(--color-primary-50)]' },
      { variant: 'ghost', color: 'gray', class: 'text-[var(--color-gray-70)]' },
      { variant: 'ghost', color: 'purple', class: 'text-[#853EE2]' },
      { variant: 'ghost', color: 'secondary', class: 'text-[var(--color-secondary-50)]' },

      // status + color 조합 (Figma 스펙)
      { variant: 'status', color: 'green', class: 'bg-[#E9FEF2] text-[#00AA4D]' },
      { variant: 'status', color: 'blue', class: 'bg-[#E0EFFF] text-[#006FF2]' },
      { variant: 'status', color: 'gray', class: 'bg-[#E4E7EC] text-[#000]' },
      { variant: 'status', color: 'dark', class: 'bg-[#000000] text-[#FFFFFF]' },
      { variant: 'status', color: 'yellow', class: 'bg-[#FEF4D4] text-[#DD9F00]' },
      { variant: 'status', color: 'red', class: 'bg-[#FFE0E0] text-[#E43939]' },
      { variant: 'status', color: 'orange', class: 'bg-[#FFE0E0] text-[#FF5C2E]' },
    ],
    defaultVariants: {
      variant: 'contained',
      size: 'md',
      color: 'red',
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
 * 텍스트 내용 기반으로 Badge status color 자동 매핑
 */
export const getBadgeColorByText = (text?: string): VariantProps<typeof badgeVariants>['color'] => {
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

export const getBadge2ColorByText = getBadgeColorByText;

/**
 * 가입가능 여부(인수, 조건부인수 등) 텍스트 및 뱃지 스타일 렌더링 헬퍼
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
 * 텍스트 내용 기반으로 status 전용 아이콘 자동 생성 헬퍼
 */
export const getBadgeIconByText = (text?: string, iconColor?: string): React.ReactNode => {
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

export const getBadge2IconByText = getBadgeIconByText;

export interface BadgeProps extends Omit<React.ComponentProps<'span'>, 'color'>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  showIcon?: boolean;
}

/**
 * Badge 컴포넌트
 * - variant="status" 지정 시 업무/심사 상태용 알약형 뱃지(Figma 19px 스펙)로 동작하며 텍스트 기반 자동 색상 및 아이콘이 생성됩니다.
 * - asChild=true면 Radix Slot을 사용해 부모 엘리먼트를 Badge처럼 스타일링
 */
function Badge({
  className,
  variant = 'contained',
  size = 'md',
  color,
  icon,
  showIcon,
  children,
  asChild = false,
  ...props
}: BadgeProps) {
  const textContent = extractText(children);

  const isStatus = variant === 'status';
  const computedColor = color ?? (isStatus ? getBadgeColorByText(textContent) : 'red');
  const shouldShowIcon = showIcon ?? isStatus;

  const renderedIcon = React.useMemo(() => {
    if (icon !== undefined) return icon;
    if (!shouldShowIcon) return null;

    const hasSvgChild = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && (child.type === 'svg' || typeof child.type === 'function')
    );
    if (hasSvgChild) return null;

    return getBadgeIconByText(textContent);
  }, [icon, shouldShowIcon, children, textContent]);

  if (asChild) {
    return (
      <Slot
        data-slot="badge"
        className={cn(
          badgeVariants({
            variant,
            size: isStatus ? undefined : size,
            color: computedColor as VariantProps<typeof badgeVariants>['color'],
          }),
          className
        )}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <span
      data-slot="badge"
      className={cn(
        badgeVariants({
          variant,
          size: isStatus ? undefined : size,
          color: computedColor as VariantProps<typeof badgeVariants>['color'],
        }),
        className
      )}
      {...props}
    >
      {renderedIcon}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
