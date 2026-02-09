'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ErrorMsg } from '@/shared/components/common';
import { cn } from '@/shared/lib/shadcn/utils';

// RadioGroup Context to pass error state to RadioGroupItems
const RadioGroupContext = React.createContext<{
  error?: boolean;
}>({
  error: false,
});

const radioGroupItemVariants = cva(
  'transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'rounded-full border bg-(--color-element-inverse) data-[state=checked]:border-(--color-border-gray-light) data-[required=true]:bg-(--color-input-surface-highlight) data-[required=true]:border-(--color-input-border-highlight) data-[invalid]:bg-[var(--color-input-surface-error)] data-[invalid]:border-[var(--color-input-border-error)]',
        button:
          'rounded-[0.6rem] border border-(--color-border-gray-light) bg-white font-normal leading-normal text-black data-[state=checked]:bg-[#fff7f4] data-[state=checked]:text-[#ff3800] data-[state=checked]:border-[#ff6135] data-[state=checked]:shadow-[0rem_0.1rem_0.1rem_0rem_rgba(255,92,46,0.19)] data-[required=true]:bg-(--color-input-surface-highlight) data-[required=true]:border-(--color-input-border-highlight) data-[invalid]:text-[var(--color-text-danger)] data-[invalid]:bg-[var(--color-input-surface-error)] data-[invalid]:border-[var(--color-input-border-error)]',
      },
      size: {
        large: '',
        small: '',
      },
      color: {
        primary: 'border-(--color-border-gray-light) hover:border-(--color-element-primary) ',
        information: 'border-(--color-border-gray-light) hover:border-[#006ff2] data-[state=checked]:border-[#006ff2]',
      },
    },
    compoundVariants: [
      // default variant + size
      {
        variant: 'default',
        size: 'large',
        className: 'h-[2rem] w-[2rem]',
      },
      {
        variant: 'default',
        size: 'small',
        className: 'h-[1.4rem] w-[1.4rem]',
      },
      // button variant + size
      {
        variant: 'button',
        size: 'large',
        className: 'h-[2.8rem] px-[1rem] text-[1.4rem] tracking-[-0.042rem] w-auto',
      },
      {
        variant: 'button',
        size: 'small',
        className: 'h-[2.8rem] px-[1rem] text-[1.3rem] tracking-[-0.039rem] w-auto',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'large',
      color: 'primary',
    },
  }
);

const radioIndicatorVariants = cva('absolute rounded-full bg-(--color-element-primary)', {
  variants: {
    size: {
      large: 'h-[1rem] w-[1rem]',
      small: 'h-[0.6rem] w-[0.6rem]',
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    error?: boolean;
    errorMsg?: React.ReactNode;
    errorPs?: 'tl' | 'tr' | 'bl' | 'br';
  }
>(({ className, error, errorMsg, errorPs = 'bl', ...props }, ref) => {
  const errorId = React.useId();

  return (
    <RadioGroupContext.Provider value={{ error }}>
      <div className="relative">
        <RadioGroupPrimitive.Root
          className={cn('flex items-center justify-start flex-wrap', className)}
          {...props}
          ref={ref}
        />
        {error && (
          <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
            {errorMsg}
          </ErrorMsg>
        )}
      </div>
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> &
    VariantProps<typeof radioGroupItemVariants> & {
      size?: 'large' | 'small';
      color?: 'primary' | 'information';
      children?: React.ReactNode;
      error?: boolean;
      errorMsg?: React.ReactNode;
      errorPs?: 'tl' | 'tr' | 'bl' | 'br';
    }
>(
  (
    {
      className,
      variant,
      size = 'large',
      color = 'primary',
      children,
      error = false,
      errorMsg = '선택은 필수입니다.',
      errorPs = 'bl',
      ...props
    },
    ref
  ) => {
    const isButton = variant === 'button';
    const generatedId = React.useId();
    const radioId = props.id || generatedId;
    const errorId = React.useId();
    const { error: groupError } = React.useContext(RadioGroupContext);
    const isError = error || groupError;

    return (
      <div className={`relative flex items-center gap-[.5rem] ${isButton ? '' : ''}`}>
        <RadioGroupPrimitive.Item
          ref={ref}
          id={radioId}
          className={cn(
            radioGroupItemVariants({ variant, size, color }),
            'relative whitespace-nowrap',
            isError && 'bg-[var(--color-input-surface-error)]! border-[var(--color-input-border-error)]!',
            props.required && 'data-[state=checked]:border-[var(--color-input-border-highlight)]',
            className
          )}
          data-required={props.required}
          data-invalid={isError ? '' : undefined}
          aria-invalid={isError ? true : undefined}
          {...props}
        >
          {!isButton && (
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center whitespace-nowrap">
              <div className={cn(radioIndicatorVariants({ size }))} />
            </RadioGroupPrimitive.Indicator>
          )}
          {children && isButton && children}
        </RadioGroupPrimitive.Item>
        {children && !isButton && (
          <label
            htmlFor={radioId}
            className={cn(
              'text-[1.3rem] font-normal cursor-pointer select-none',
              isError && 'text-[var(--color-text-danger)]'
            )}
          >
            {children}
          </label>
        )}
        {error && (
          <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
            {errorMsg}
          </ErrorMsg>
        )}
      </div>
    );
  }
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
