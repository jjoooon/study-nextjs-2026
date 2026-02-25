import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-[0.3rem] border-transparent px-1 h-[2rem] text-[1.2rem] font-bold tracking-[-0.13rem] w-fit whitespace-nowrap shrink-0 tra [&>svg]:size-[1.2rem] gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden aspect-square leading-none pt-[0.2rem]',
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
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'var(--color-information-10)', text: 'var(--color-information-50)' },
  red: { bg: 'var(--color-danger-10)', text: 'var(--color-danger-50)' },
  green: { bg: 'var(--color-success-10)', text: 'var(--color-success-50)' },
  orange: { bg: 'var(--color-primary-10)', text: 'var(--color-primary-50)' },
};

function Badge({
  className,
  variant,
  asChild = false,
  color,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
    color?: 'blue' | 'yellow' | 'red' | 'green' | 'black' | 'orange' | 'purple' | 'gray';
  }) {
  const Comp = asChild ? Slot : 'span';

  const style = color
    ? {
        backgroundColor: colorMap[color].bg,
        color: colorMap[color].text,
        ...props.style,
      }
    : props.style;

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} style={style} {...props} />;
}

export { Badge, badgeVariants };
