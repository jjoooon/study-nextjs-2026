import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-[0.3rem] border-transparent px-2 h-[2.2rem] text-xs font-normal w-fit whitespace-nowrap shrink-0 [&>svg]:size-[1.2rem] gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden',
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
        go: 'bg-[#00C868] text-white',
        wait: 'bg-[#FFB82B] text-white',
        stop: 'bg-[#F9456F] text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: '#E3F2FD', text: '#1976D2' },
  yellow: { bg: '#FFF9E6', text: '#F57C00' },
  red: { bg: '#FFEBEE', text: '#D32F2F' },
  green: { bg: '#E8F5E9', text: '#388E3C' },
  black: { bg: '#F5F5F5', text: '#212121' },
  orange: { bg: '#FFF3E0', text: '#E65100' },
  purple: { bg: '#F3E5F5', text: '#7B1FA2' },
  gray: { bg: '#F4F4F4', text: '#7F7F7F' },
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
