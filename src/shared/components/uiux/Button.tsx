import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none cursor-pointer leading-[100%] tracking-[-0.13rem] has-[>svg]:inline-flex has-[>svg]:items-center has-[>svg]:justify-center',
  {
    variants: {
      variant: {
        contained: '',
        outlined: `disabled:text-(--color-gray-30)
        disabled:bg-(--color-gray-5)
        disabled:border-(--color-gray-10)`,
        text: `px-0! text-(--color-secondary-70) bg-transparent border-none underline-offset-3 
        hover:underline 
        focus-visible:underline`,
        none: 'bg-transparent border-none',
      },
      color: {
        primary: '',
        secondary: '',
        gray: '',
        'gray-light': '',
        success: '',
        link: 'text-(--color-information-50)',
        transparent: `bg-transparent text-(--color-text-primary) border-transparent`,
      },
      size: {
        xl: `h-[3.2rem] px-2 has-[>svg]:px-3 rounded-[0.6rem] text-[1.4rem] font-bold min-w-[8rem] gap-1`,
        lg: `h-[2.8rem] px-[1rem] has-[>svg]:px-2.5 rounded-[0.6rem] text-[1.4rem] font-bold gap-1`,
        md: `h-[2.5rem] px-[.6rem] has-[>svg]:px-1.5 rounded-[0.4rem] text-[1.3rem] font-bold gap-1`,
        sm: `h-[2.2rem] px-[.6rem] has-[>svg]:px-1.5 rounded-[0.3rem] text-[1.2rem] font-bold gap-1`,
      },
    },
    compoundVariants: [
      {
        variant: 'contained',
        color: 'primary',
        className: `border border-(--color-primary-50) 
        bg-(--color-primary-50) 
        text-(--color-gray-0) 
        hover:bg-(--color-primary-60) 
        hover:border-dashed 
        hover:border-(--color-gray-0) 
        focus-visible:ring-(--color-primary-60) 
        focus-visible:border-dashed 
        focus-visible:border-(--color-gray-0)
        disabled:text-(--color-gray-0)
        disabled:bg-(--color-gray-20)
        disabled:border-(--color-gray-20)`,
      },
      {
        variant: 'contained',
        color: 'gray',
        className: `border border-(--color-gray-50) 
        bg-(--color-gray-50) 
        text-(--color-gray-0) 
        hover:bg-(--color-gray-60) 
        hover:border-dashed 
        hover:border-(--color-gray-0) 
        focus-visible:ring-(--color-gray-60) 
        focus-visible:border-dashed 
        focus-visible:border-(--color-gray-0) 
        disabled:text-(--color-gray-0)
        disabled:bg-(--color-gray-20)
        disabled:border-(--color-gray-20)`,
      },
      {
        variant: 'contained',
        color: 'secondary',
        className: `border border-(--color-secondary-50) 
        bg-(--color-secondary-50) 
        text-(--color-gray-0) 
        hover:bg-(--color-secondary-70) 
        hover:border-dashed 
        hover:border-(--color-gray-0) 
        focus-visible:ring-(--color-secondary-70) 
        focus-visible:border-dashed 
        focus-visible:border-(--color-gray-0) 
        disabled:text-(--color-gray-0)
        disabled:bg-(--color-gray-20)
        disabled:border-(--color-gray-20)`,
      },
      {
        variant: 'contained',
        color: 'primary',
        size: 'xl',
        className: `disabled:text-(--color-gray-30)
        disabled:bg-(--color-gray-5)
        disabled:border-(--color-gray-5)`,
      },
      {
        variant: 'contained',
        color: 'secondary',
        size: 'xl',
        className: `disabled:text-(--color-gray-30)
        disabled:bg-(--color-gray-5)
        disabled:border-(--color-gray-5)`,
      },
      {
        variant: 'contained',
        color: 'gray',
        size: 'xl',
        className: `disabled:text-(--color-gray-30)
        disabled:bg-(--color-gray-5)
        disabled:border-(--color-gray-5)`,
      },

      {
        variant: 'outlined',
        color: 'primary',
        className: `border border-(--color-primary-50) 
        bg-(--color-primary-5) 
        text-(--color-primary-50) 
        hover:bg-(--color-primary-10) 
        hover:border-dashed 
        hover:border-(--color-gray-0) 
        focus-visible:ring-(--color-primary-10) 
        focus-visible:border-dashed 
        focus-visible:border-(--color-gray-0)`,
      },
      {
        variant: 'outlined',
        color: 'primary',
        size: 'sm',
        className: `border border-(--color-primary-50) 
        bg-(--color-gray-0) 
        text-(--color-primary-50) 
        hover:bg-(--color-gray-0) 
        hover:border-dashed 
        hover:border-(--color-gray-0) 
        focus-visible:ring-(--color-gray-0) 
        focus-visible:border-dashed 
        focus-visible:border-(--color-gray-0)`,
      },

      {
        variant: 'outlined',
        color: 'gray',
        className: `border border-(--color-gray-60) 
        bg-(--color-gary-0) 
        text-(--color-gary-100) 
        hover:bg-(--color-gray-5) 
        hover:border-dashed 
        hover:border-(--color-gray-100) 
        focus-visible:ring-(--color-gray-5) 
        focus-visible:border-dashed 
        focus-visible:border-(--color-gray-100)`,
      },
      {
        variant: 'outlined',
        color: 'gray-light',
        className: `border border-(--color-gray-20) 
        bg-(--color-gary-0) 
        text-(--color-gary-100) 
        hover:bg-(--color-gray-5) 
        hover:border-dashed 
        hover:border-(--color-gray-100) 
        focus-visible:ring-(--color-gray-5) 
        focus-visible:border-dashed 
        focus-visible:border-(--color-gray-100)`,
      },
      {
        variant: 'outlined',
        color: 'success',
        className: `border border-(--color-success-60) 
        bg-(--color-success-5) 
        text-(--color-success-60) 
        hover:bg-(--color-success-5) 
        hover:border-dashed 
        hover:border-(--color-success-60) 
        focus-visible:ring-(--color-success-5) 
        focus-visible:border-dashed 
        focus-visible:border-(--color-success-60)`,
      },

      {
        variant: 'text',
        color: 'success',
        className: `text-(--color-success-60)`,
      },
      {
        variant: 'text',
        color: 'primary',
        className: `text-(--color-primary-50)`,
      },
      {
        variant: 'text',
        color: 'link',
        className: `text-(--color-primary-50)`,
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
  onlyicon?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, UIButtonProps>(
  (
    {
      children,
      variant = 'contained',
      color = 'primary',
      size = 'md',
      className,
      asChild = false,
      type,
      onlyicon = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const iconClass = onlyicon ? 'p-0! aspect-square' : '';

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, color, size }), iconClass, className)}
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
