import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md font-normal transition-all outline-none select-none cursor-pointer leading-[100%] tracking-[-0.13rem] 
  disabled:pointer-events-none disabled:opacity-50 
  focus-visible:ring-2 focus-visible:ring-offset-2 
  has-[>svg]:inline-flex has-[>svg]:items-center has-[>svg]:justify-center`,
  {
    variants: {
      variant: {
        contained: '',
        outlined: `disabled:text-[var(--color-gray-30)]
        disabled:bg-[var(--color-gray-5)]
        disabled:border-[var(--color-gray-10)]`,
        text: `px-0! text-[var(--color-secondary-70)] bg-transparent border-none underline-offset-3 
        hover:underline 
        focus-visible:underline`,
        none: 'bg-transparent border-none',
        state:
          'bg-[var(--color-gray-0)] text-[var(--color-gray-100)] border-[var(--color-gray-0)] p-x-1.5! justify-between text-[1.2rem] h-[3.1rem]! underline-offset-4 underline',
      },
      color: {
        primary: '',
        secondary: '',
        gray: '',
        'gray-light': '',
        success: '',
        link: 'text-[var(--color-information-50)]',
        transparent: `bg-transparent text-[var(--color-text-primary)] border-transparent`,
      },
      size: {
        xl: `h-[3.2rem] rounded-[0.6rem] text-[1.4rem] font-normal px-2 min-w-[8rem] gap-1`,
        lg: `h-[2.8rem] rounded-[0.4rem] text-[1.4rem] font-normal px-2.5 gap-1`,
        md: `h-[2.5rem] rounded-[0.4rem] text-[1.3rem] font-normal px-1.5 gap-[0.2rem]`,
        sm: `h-[2.2rem] rounded-[0.3rem] text-[1.2rem] font-normal px-1.5 gap-[0.2rem]`,
        xs: `h-[1.6rem] rounded-[0.3rem] text-[1.2rem] font-normal p-0 gap-[0.2rem]`,

        'icon-xl': `h-[3.2rem] rounded-[0.6rem] px-0 aspect-square`,
        'icon-lg': `h-[2.8rem] rounded-[0.4rem] px-0 aspect-square`,
        'icon-md': `h-[2.5rem] rounded-[0.4rem] px-0 aspect-square`,
        'icon-sm': `h-[2.2rem] rounded-[0.3rem] px-0 aspect-square`,
        'icon-xs': `h-[1.6rem] rounded-[0.3rem] px-0 aspect-square`,
      },
    },
    compoundVariants: [
      {
        variant: 'contained',
        color: 'primary',
        className: `border border-[var(--color-primary-50)] 
        bg-[var(--color-primary-50)] 
        text-[var(--color-gray-0)] 
        font-bold 
        hover:bg-[var(--color-primary-60)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-primary-60)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)]
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-gray-20)]
        disabled:border-[var(--color-gray-20)]`,
      },
      {
        variant: 'contained',
        color: 'gray',
        className: `border border-[var(--color-gray-50)] 
        bg-[var(--color-gray-50)] 
        text-[var(--color-gray-0)] 
        font-bold
        hover:bg-[var(--color-gray-60)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-gray-60)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)] 
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-gray-20)]
        disabled:border-[var(--color-gray-20)]`,
      },
      {
        variant: 'contained',
        color: 'gray-light',
        className: `border border-[var(--color-gray-20)] 
        bg-[var(--color-gray-20)] 
        text-[var(--color-gray-0)] 
        font-bold
        hover:bg-[var(--color-gray-60)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-gray-60)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)] 
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-gray-20)]
        disabled:border-[var(--color-gray-20)]`,
      },
      {
        variant: 'contained',
        color: 'success',
        className: `border border-[var(--color-success-50)] 
        bg-[var(--color-success-50)] 
        text-[var(--color-gray-0)] 
        font-bold
        hover:bg-[var(--color-success-60)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-success-60)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)] 
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-success-20)]
        disabled:border-[var(--color-success-20)]`,
      },
      {
        variant: 'contained',
        color: 'link',
        className: `border border-[var(--color-information-50)] 
        bg-[var(--color-information-50)] 
        text-[var(--color-gray-0)] 
        font-bold
        hover:bg-[var(--color-information-60)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-information-60)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)] 
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-information-20)]
        disabled:border-[var(--color-information-20)]`,
      },
      {
        variant: 'contained',
        color: 'secondary',
        className: `border border-[var(--color-secondary-50)] 
        bg-[var(--color-secondary-50)] 
        text-[var(--color-gray-0)] 
        hover:bg-[var(--color-secondary-70)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-0)] 
        focus-visible:ring-[var(--color-secondary-70)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-0)] 
        disabled:text-[var(--color-gray-0)]
        disabled:bg-[var(--color-gray-20)]
        disabled:border-[var(--color-gray-20)]`,
      },
      {
        variant: 'contained',
        color: 'primary',
        size: 'xl',
        className: `disabled:text-[var(--color-gray-30)]
        disabled:bg-[var(--color-gray-5)]
        font-bold 
        disabled:border-[var(--color-gray-5)]`,
      },
      {
        variant: 'contained',
        color: 'secondary',
        size: 'xl',
        className: `disabled:text-[var(--color-gray-30)]
        disabled:bg-[var(--color-gray-5)]
        disabled:border-[var(--color-gray-5)]`,
      },
      {
        variant: 'contained',
        color: 'gray',
        size: 'xl',
        className: `disabled:text-[var(--color-gray-30)]
        disabled:bg-[var(--color-gray-5)]
        disabled:border-[var(--color-gray-5)]`,
      },

      {
        variant: 'outlined',
        color: 'primary',
        className: `border border-[var(--color-primary-50)] 
        bg-[var(--color-primary-5)] 
        text-[var(--color-primary-50)] 
        hover:bg-[var(--color-primary-10)] 
        hover:border-dashed 
        hover:border-[var(--color-primary-50)] 
        focus-visible:ring-[var(--color-primary-10)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-primary-50)]`,
      },
      {
        variant: 'outlined',
        color: 'primary',
        size: 'sm',
        className: `border border-[var(--color-primary-50)] 
        bg-[var(--color-gray-0)] 
        text-[var(--color-primary-50)] 
        hover:bg-[var(--color-gray-0)] 
        hover:border-dashed 
        hover:border-[var(--color-primary-50)] 
        focus-visible:ring-[var(--color-primary-50)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-primary-50)]`,
      },

      {
        variant: 'outlined',
        color: 'gray',
        className: `border border-[var(--color-gray-60)] 
        bg-[var(--color-gray-0)] 
        text-[var(--color-gray-100)] 
        hover:bg-[var(--color-gray-5)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-100)] 
        focus-visible:ring-[var(--color-gray-5)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-100)]`,
      },
      {
        variant: 'outlined',
        color: 'gray-light',
        className: `border border-[var(--color-gray-20)] 
        bg-[var(--color-gray-0)] 
        text-[var(--color-gray-100)] 
        hover:bg-[var(--color-gray-5)] 
        hover:border-dashed 
        hover:border-[var(--color-gray-100)] 
        focus-visible:ring-[var(--color-gray-5)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-gray-100)]`,
      },
      {
        variant: 'outlined',
        color: 'success',
        className: `border border-[var(--color-success-60)] 
        bg-[var(--color-success-5)] 
        text-[var(--color-success-60)] 
        hover:bg-[var(--color-success-5)] 
        hover:border-dashed 
        hover:border-[var(--color-success-60)] 
        focus-visible:ring-[var(--color-success-5)] 
        focus-visible:border-dashed 
        focus-visible:border-[var(--color-success-60)]`,
      },

      {
        variant: 'text',
        color: 'success',
        className: `text-[var(--color-success-60)]`,
      },
      {
        variant: 'text',
        color: 'primary',
        className: `text-[var(--color-primary-50)]`,
      },
      {
        variant: 'text',
        color: 'link',
        className: `text-[var(--color-primary-50)]`,
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
