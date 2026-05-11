/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
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
        dark: '',
        soft: 'border',
        outlined: 'border bg-transparent',
        rounded:
          'rounded-full bg-[var(--color-blue-gray-15)] text-[#000] h-[1.5rem] text-[1.1rem] font-bold px-[0.4rem]',
        ghost: '',
      },
      size: {
        lg: 'h-[2.4rem] text-[1.4rem] font-bold px-2 [&>svg]:size-[1.4rem] pt-[0.1rem] tracking-[-0.13rem]',
        md: 'h-[1.8rem] text-[1.1rem] font-bold px-1 pr-[0.6rem] [&>svg]:size-[1.2rem] tracking-[-0.13rem]',
        sm: `h-[1.5rem] text-[1.1rem] font-bold pl-[0.2rem] pr-[0.4rem] pt-[0.1rem] [&>svg]:size-[1.1rem] tracking-[-0.13rem]`,
      },
      color: {
        blue: '',
        red: '',
        green: '',
        primary: '',
        gray: '',
        bluegray: '',
        secondary: '',
        purple: '',
        yellow: '',
      },
    },
    compoundVariants: [
      // Contained + Colors
      {
        variant: 'contained',
        color: 'blue',
        class: 'bg-[var(--color-information-10)] text-[var(--color-information-50)]',
      },
      { variant: 'contained', color: 'red', class: 'bg-[var(--color-danger-10)] text-[var(--color-danger-50)]' },
      { variant: 'contained', color: 'green', class: 'bg-[var(--color-success-10)] text-[var(--color-success-50)]' },
      { variant: 'contained', color: 'primary', class: 'bg-[var(--color-primary-10)] text-[var(--color-primary-50)]' },
      { variant: 'contained', color: 'gray', class: 'bg-[var(--color-blue-gray-15)] text-[var(--color-gray-70)]' },
      { variant: 'contained', color: 'bluegray', class: 'bg-[var(--color-blue-gray-50)] text-[var(--color-gray-0)]' },
      { variant: 'contained', color: 'secondary', class: 'bg-[var(--color-secondary-50)] text-[var(--color-gray-0)]' },
      { variant: 'contained', color: 'purple', class: 'bg-[#F0E6FF] text-[#853EE2]' },
      { variant: 'contained', color: 'yellow', class: 'bg-[#FFF4E5] text-[#FFB800]' },

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

      { variant: 'rounded', size: 'sm', class: 'pl-[0.4rem] pr-[0.6rem]' },

      // Soft + Colors
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
      // Outlined + Colors
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
      // Ghost + Colors
      { variant: 'ghost', color: 'blue', class: 'text-[var(--color-information-50)]' },
      { variant: 'ghost', color: 'yellow', class: 'text-[var(--color-warning-50)]' },
      { variant: 'ghost', color: 'red', class: 'text-[var(--color-danger-50)]' },
      { variant: 'ghost', color: 'green', class: 'text-[var(--color-success-50)]' },
      { variant: 'ghost', color: 'primary', class: 'text-[var(--color-primary-50)]' },
      { variant: 'ghost', color: 'gray', class: 'text-[var(--color-gray-70)]' },
      { variant: 'ghost', color: 'purple', class: 'text-[#853EE2]' },
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

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant, size, color }), className)} {...props} />;
}

export { Badge, badgeVariants };
