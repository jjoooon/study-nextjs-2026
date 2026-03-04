import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-[0.3rem] border-transparent px-1 w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden leading-none',
  {
    variants: {
      variant: {
        default: 'bg-[#f4f4f4] text-[#7f7f7f]',
        secondary: 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        success: 'bg-green-500 text-white [a&]:hover:bg-green-600',
        warning: 'bg-yellow-500 text-white [a&]:hover:bg-yellow-600',
      },
      size: {
        lg: 'h-[2.4rem] text-[1.4rem] px-2 [&>svg]:size-[1.4rem] pt-[0.2rem]',
        md: 'h-[2rem] text-[1.2rem] px-1.5 [&>svg]:size-[1.2rem] pt-[0.2rem]',
        sm: 'h-[1.5rem] text-[1.1rem] font-bold px-[0.2rem] pt-[0.1rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-[var(--color-information-10)]', text: 'text-[var(--color-information-50)]' },
  red: { bg: 'bg-[var(--color-danger-10)]', text: 'text-[var(--color-danger-50)]' },
  green: { bg: 'bg-[var(--color-success-10)]', text: 'text-[var(--color-success-50)]' },
  orange: { bg: 'bg-[var(--color-primary-10)]', text: 'text-[var(--color-primary-50)]' },
};


type BadgeSize = 'lg' | 'md' | 'sm';

function Badge({
  className,
  variant,
  size = 'md',
  asChild = false,
  color,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
    color?: 'blue' | 'yellow' | 'red' | 'green' | 'black' | 'orange' | 'purple' | 'gray';
    size?: BadgeSize;
  }) {
  const Comp = asChild ? Slot : 'span';

  const colorClass = color && colorMap[color] ? `${colorMap[color].bg} ${colorMap[color].text}` : '';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), colorClass, className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
