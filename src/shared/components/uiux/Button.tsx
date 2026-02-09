import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none cursor-pointer',
  {
    variants: {
      variant: {
        contained: '',
        outline: '',
        text: 'px-0!',
        underline: '',
        ghost: '',
        icon: '',
      },
      color: {
        primary: '',
        secondary: '',
        gray: '',
        grayLight: '',
        success: '',
        transparent: '',
      },
      size: {
        lg: 'h-[3.2rem] px-3 has-[>svg]:px-3 rounded-[0.6rem] text-[1.4rem] font-normal min-w-[8rem]',
        md: 'h-[2.8rem] px-2.5 has-[>svg]:px-2.5 rounded-[0.6rem] text-[1.3rem] font-normal',
        sm: 'h-[2.5rem] px-1.5 has-[>svg]:px-1.5 rounded-[0.4rem] text-[1.3rem] font-normal',
        xs: 'h-[2.2rem] px-1.5 has-[>svg]:px-1.5 rounded-[0.3rem] text-[1.2rem] font-normal',
      },
    },
    compoundVariants: [
      {
        variant: 'contained',
        color: 'primary',
        className:
          'bg-(--color-button-contained-surface-primary) text-(--color-text-inverse) border border-(--color-border-primary) hover:bg-(--color-button-contained-surface-primary-hover) hover:border-dashed hover:border-white focus-visible:ring-(--color-button-contained-surface-primary-hover) focus-visible:border-dashed focus-visible:border-white',
      },
      {
        variant: 'contained',
        color: 'secondary',
        className:
          'bg-(--color-button-contained-surface-secondary) text-(--color-text-inverse) border border-(--color-button-contained-surface-secondary) hover:bg-(--color-button-contained-surface-secondary-hover) hover:border-dashed hover:border-white focus-visible:ring-(--color-button-contained-surface-secondary-hover) focus-visible:border-dashed focus-visible:border-white',
      },
      {
        variant: 'contained',
        color: 'gray',
        className:
          'bg-(--color-button-contained-surface-gray) text-(--color-text-inverse) border border-(--color-button-contained-surface-gray) hover:bg-(--color-button-contained-surface-gray-hover) hover:border-dashed hover:border-white focus-visible:ring-(--color-button-contained-surface-gray-hover) focus-visible:border-dashed focus-visible:border-white',
      },

      // contained = outline
      {
        variant: 'contained',
        color: 'grayLight',
        className:
          'bg-white text-(--color-button-text-base) border border-(--color-button-outlined-surface-gray-light) hover:bg-(--color-button-outlined-surface-gray-hover) hover:border-dashed hover:border-white focus-visible:ring-(--color-button-outlined-surface-gray-hover) focus-visible:border-dashed focus-visible:border-white',
      },
      {
        variant: 'contained',
        color: 'success',
        className:
          'bg-(--color-button-outlined-surface-success) text-(--color-button-text-success) border border-(--color-button-outlined-border-success) hover:border-dashed focus-visible:ring-(--color-button-outlined-border-success) focus-visible:border-dashed',
      },
      {
        variant: 'outline',
        color: 'primary',
        className:
          'bg-(--color-button-secondary-contained-fill) text-(--color-text-primary) border border-(--color-border-primary) hover:border-dashed focus-visible:border-dashed',
      },
      {
        variant: 'outline',
        color: 'secondary',
        className:
          'bg-white text-(--color-text-base) border border-(--color-button-outlined-border-secondary) hover:border-dashed  hover:bg-(--color-button-outlined-surface-secondary-hover) hover:border-(--color-button-outlined-border-secondary-hover) focus-visible:border-dashed',
      },
      {
        variant: 'outline',
        color: 'gray',
        className:
          'bg-(--color-button-outlined-surface-gray) text-(--color-text-base) border border-(--color-button-outlined-border-gray) hover:border-dashed  hover:bg-(--color-button-outlined-surface-gray-hover) hover:border-(--color-button-outlined-border-gray-hover) focus-visible:border-dashed',
      },
      {
        variant: 'outline',
        color: 'grayLight',
        className:
          'bg-(--color-button-outlined-surface-gray-light) text-(--color-text-base) border border-(--color-button-outlined-border-gray-light) hover:border-dashed  hover:bg-(--color-button-outlined-surface-gray-light-hover) hover:border-(--color-button-outlined-border-gray-light-hover) focus-visible:border-dashed',
      },

      {
        variant: 'icon',
        color: 'primary',
        className:
          'bg-white text-(--color-text-primary) border border-(--color-border-primary) hover:border-dashed focus-visible:border-dashed !p-0 aspect-square',
      },
      {
        variant: 'icon',
        color: 'gray',
        className:
          'bg-white border border-(--color-button-contained-surface-gray) hover:border-dashed focus-visible:border-dashed !p-0 aspect-square',
      },
      {
        variant: 'icon',
        color: 'transparent',
        className:
          'bg-transparent text-(--color-text-primary) border border-transparent hover:border-dashed focus-visible:border-dashed !p-0 aspect-square',
      },
    ],
    defaultVariants: {
      variant: 'contained',
      color: 'primary',
      size: 'md',
    },
  }
);

interface UIButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, VariantProps<typeof buttonVariants> {
  variant?: VariantProps<typeof buttonVariants>['variant'];
  color?: VariantProps<typeof buttonVariants>['color'];
  size?: VariantProps<typeof buttonVariants>['size'];
  children?: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, UIButtonProps>(
  (
    { children, variant = 'contained', color = 'primary', size = 'md', className, asChild = false, type, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, color, size }), className)}
        type={Comp === 'button' ? (type ?? 'button') : undefined}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
