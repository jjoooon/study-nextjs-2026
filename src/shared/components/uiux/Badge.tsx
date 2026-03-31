/**
 * Badge Component
 * 
 * @description
 * 상태, 카테고리, 중요 정보를 시각적으로 표시하는 작은 라벨 컴포넌트
 * 
 * @features
 * - 4가지 스타일 변형: contained, soft, outlined, ghost
 * - 3가지 색상 옵션: blue, red, green
 * - 3가지 크기 옵션: sm, md, lg
 * - asChild prop을 통한 다형성 지원 (Radix UI Slot 활용)
 * 
 * @example
 * // 기본 사용
 * <Badge variant="contained" color="red" size="md">D-31</Badge>
 * 
 * // Soft 스타일 (배경 + 테두리)
 * <Badge variant="soft" color="blue">진행중</Badge>
 * 
 * // Link로 사용
 * <Badge asChild>
 *   <Link href="/status">상태 확인</Link>
 * </Badge>
 * 
 * @version 1.0.0
 * @since 2026-03-05
 * @lastModified 2026-03-05
 */

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-[0.3rem] px-1 w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden leading-none',
  {
    variants: {
      variant: {
        contained: '',
        soft: 'border',
        outlined: 'border bg-transparent',
        rounded: 'rounded-full bg-[var(--color-blue-gray-15)] text-[#000] h-[1.5rem] text-[1.1rem] font-bold px-[0.4rem]',
        ghost: '',
      },
      size: {
        lg: 'h-[2.4rem] text-[1.4rem] font-bold px-2 [&>svg]:size-[1.4rem] pt-[0.1rem]',
        md: 'h-[2rem] text-[1.2rem] font-bold px-1.5 [&>svg]:size-[1.2rem]',
        sm: `h-[1.5rem] text-[1.1rem] font-bold px-[0.2rem] pt-[0.1rem] [&>svg]:size-[1.1rem]`,
      },
      color: {
        blue: '',
        red: '',
        green: '',
        primary: '',
        gray: '',
        bluegray: '',
        secondary: '',
      },
    },
    compoundVariants: [
      // Contained + Colors
      { variant: 'contained', color: 'blue', class: 'bg-[var(--color-information-10)] text-[var(--color-information-50)]' },
      { variant: 'contained', color: 'red', class: 'bg-[var(--color-danger-10)] text-[var(--color-danger-50)]' },
      { variant: 'contained', color: 'green', class: 'bg-[var(--color-success-10)] text-[var(--color-success-50)]' },
      { variant: 'contained', color: 'primary', class: 'bg-[var(--color-primary-10)] text-[var(--color-primary-50)]' },
      { variant: 'contained', color: 'gray', class: 'bg-[var(--color-blue-gray-15)] text-[var(--color-gray-70)]' },
      { variant: 'contained', color: 'bluegray', class: 'bg-[var(--color-blue-gray-50)] text-[var(--color-gray-0)]' },
      { variant: 'contained', color: 'secondary', class: 'bg-[var(--color-secondary-50)] text-[var(--color-gray-0)]' },

      { variant: 'rounded', size: 'sm', class: 'pl-[0.4rem] pr-[0.6rem]' },

      // Soft + Colors
      { variant: 'soft', color: 'blue', class: 'bg-[var(--color-information-10)] border-[var(--color-information-50)] text-[var(--color-information-50)]' },
      { variant: 'soft', color: 'red', class: 'bg-[var(--color-danger-10)] border-[var(--color-danger-50)] text-[var(--color-danger-50)]' },
      { variant: 'soft', color: 'green', class: 'bg-[var(--color-success-10)] border-[var(--color-success-50)] text-[var(--color-success-50)]' },
      { variant: 'soft', color: 'primary', class: 'bg-[var(--color-primary-10)] border-[var(--color-primary-50)] text-[var(--color-primary-50)]' },
      { variant: 'soft', color: 'gray', class: 'bg-[var(--color-blue-gray-15)] border-[var(--color-gray-70)] text-[var(--color-gray-70)]' },
      { variant: 'soft', color: 'bluegray', class: 'bg-[var(--color-gray-0)] border-[var(--color-blue-gray-50)] text-[var(--color-blue-gray-50)]' },
      { variant: 'soft', color: 'secondary', class: 'bg-[var(--color-gray-0)] border-[var(--color-secondary-50)] text-[var(--color-secondary-50)]' },
      // Outlined + Colors
      { variant: 'outlined', color: 'blue', class: 'border-[var(--color-information-50)] text-[var(--color-information-50)]' },
      { variant: 'outlined', color: 'red', class: 'border-[var(--color-danger-50)] text-[var(--color-danger-50)]' },
      { variant: 'outlined', color: 'green', class: 'border-[var(--color-success-50)] text-[var(--color-success-50)]' },
      { variant: 'outlined', color: 'primary', class: 'border-[var(--color-primary-50)] text-[var(--color-primary-50)]' },
      { variant: 'outlined', color: 'gray', class: 'border-[var(--color-gray-70)] text-[var(--color-gray-70)]' },
      { variant: 'outlined', color: 'bluegray', class: 'border-[var(--color-blue-gray-50)] text-[var(--color-blue-gray-50)]' },
      { variant: 'outlined', color: 'secondary', class: 'border-[var(--color-secondary-50)] text-[var(--color-secondary-50)]' },
      // Ghost + Colors
      { variant: 'ghost', color: 'blue', class: 'text-[var(--color-information-50)]' },
      { variant: 'ghost', color: 'red', class: 'text-[var(--color-danger-50)]' },
      { variant: 'ghost', color: 'green', class: 'text-[var(--color-success-50)]' },
      { variant: 'ghost', color: 'primary', class: 'text-[var(--color-primary-50)]' },
      { variant: 'ghost', color: 'gray', class: 'text-[var(--color-gray-70)]' },
      { variant: 'ghost', color: 'bluegray', class: 'text-[var(--color-blue-gray-50)]' },
      { variant: 'ghost', color: 'secondary', class: 'text-[var(--color-secondary-50)]' },
    ],
    defaultVariants: {
      variant: 'contained',
      size: 'md',
      color: 'red',
    },
  }
);

function Badge({
  className,
  variant = 'contained',
  size = 'md',
  color = 'red',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, color }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
