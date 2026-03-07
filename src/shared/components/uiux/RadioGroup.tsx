'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ErrorMsg } from '@common/ErrorMsg';
import { cn } from '@/shared/lib/shadcn/utils';

// RadioGroup Context to pass error state to RadioGroupItems
const RadioGroupContext = React.createContext<{
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
}>({
  error: false,
  required: false,
  disabled: false,
});

const radioGroupItemVariants = cva(
  'transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-100 disabled:border-[var(--color-gray-30)] disabled:data-[state=checked]:border-[var(--color-gray-30)]',
  {
    variants: {
      variant: {
        default:
          'rounded-full border bg-[var(--color-element-inverse)] data-[state=checked]:border-[var(--color-border-gray-light)] data-[required=true]:bg-[var(--color-input-surface-highlight)] data-[required=true]:border-[var(--color-input-border-highlight)] data-[invalid]:bg-[var(--color-input-surface-error)] data-[invalid]:border-[var(--color-input-border-error)]',
        button:
          'rounded-[0.6rem] border border-[var(--color-border-gray-light)] bg-white font-normal leading-normal text-black data-[required=true]:bg-[var(--color-input-surface-highlight)] data-[required=true]:border-[var(--color-input-border-highlight)] data-[invalid]:text-[var(--color-text-danger)] data-[invalid]:bg-[var(--color-input-surface-error)] data-[invalid]:border-[var(--color-input-border-error)] disabled:data-[state=checked]:text-[var(--color-gray-30)] disabled:data-[state=checked]:shadow-none',
      },
      size: {
        default: '',
        sm: '',
      },
      width: {
        full: 'w-full',
        auto: 'w-auto',
      },
      color: {
        primary: 'border-[var(--color-border-gray-light)] hover:border-[var(--color-element-primary)]',
        info:'border-[var(--color-border-gray-light)] hover:border-[#006ff2]',
      },
    },
    compoundVariants: [
      // default variant + size
      {
        variant: 'default',
        size: 'default',
        className: 'h-[2rem] w-[2rem]',
      },
      {
        variant: 'default',
        size: 'sm',
        className: 'h-[1.4rem] w-[1.4rem]',
      },
      // button variant + size
      {
        variant: 'button',
        size: 'default',
        className: 'h-[2.8rem] px-[1rem] text-[1.4rem] tracking-[-0.042rem] w-auto',
      },
      {
        variant: 'button',
        size: 'sm',
        className: 'h-[2.8rem] px-[1rem] text-[1.3rem] tracking-[-0.039rem] w-auto',
      },
      {
        variant: 'button',
        color: 'primary',
        className:
          'data-[state=checked]:bg-[#fff7f4] data-[state=checked]:text-[#ff3800] data-[state=checked]:border-[#ff6135] data-[state=checked]:shadow-[0rem_0.1rem_0.1rem_0rem_rgba(255,92,46,0.19)]',
      },
      {
        variant: 'button',
        color: 'info',
        className:
          'data-[state=checked]:bg-[#f0f7ff] data-[state=checked]:text-[#006ff2] data-[state=checked]:border-[#006ff2] data-[state=checked]:shadow-[0rem_0.1rem_0.1rem_0rem_rgba(0,111,242,0.19)]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      color: 'primary',
      width: 'full',
    },
  }
);

const radioIndicatorVariants = cva('absolute rounded-full', {
  variants: {
    size: {
      default: 'h-[1rem] w-[1rem]',
      sm: 'h-[0.6rem] w-[0.6rem]',
    },
    color: {
      primary: 'bg-[var(--color-element-primary)]',
      info: 'bg-[#006ff2]',
    },
    disabled: {
      true: 'bg-[var(--color-gray-30)]',
      false: '',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'primary',
    disabled: false,
  },
});

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    error?: boolean;
    errorMsg?: React.ReactNode;
    errorPs?: 'tl' | 'tc' |  'tr' | 'bl' | 'bc'| 'br';
    width?: 'full' | 'auto';
  }
>(({ className, error, errorMsg, width='full', errorPs = 'bl', ...props }, ref) => {
  const errorId = React.useId();
  const groupRequired = Boolean(props.required);
  const groupDisabled = Boolean(props.disabled);

  return (
    <RadioGroupContext.Provider value={{ error, required: groupRequired, disabled: groupDisabled }}>
      <div className={cn('relative', width === 'full' ? 'w-full' : 'w-auto')}>
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
      size?: 'default' | 'sm';
      color?: 'primary' | 'info';
      children?: React.ReactNode;
      error?: boolean;
      errorMsg?: React.ReactNode;
      errorPs?: 'tl' | 'tc' |  'tr' | 'bl' | 'bc'| 'br';
    }
>(
  (
    {
      className,
      variant,
      size = 'default',
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
    const { error: groupError, required: groupRequired, disabled: groupDisabled } = React.useContext(RadioGroupContext);
    const isError = error || groupError;
    const isRequired = Boolean(props.required || groupRequired);
    const isDisabled = Boolean(props.disabled || groupDisabled);

    return (
      <div className={`relative flex items-center gap-[.5rem] ${isButton ? '' : ''}`}>
        <RadioGroupPrimitive.Item
          ref={ref}
          id={radioId}
          className={cn(
            radioGroupItemVariants({ variant, size, color }),
            'relative whitespace-nowrap',
            isError && 'bg-[var(--color-input-surface-error)]! border-[var(--color-input-border-error)]!',
            isRequired && 'data-[state=checked]:border-[var(--color-input-border-highlight)]',
            className
          )}
          data-required={isRequired}
          data-invalid={isError ? '' : undefined}
          aria-invalid={isError ? true : undefined}
          {...props}
        >
          {!isButton && (
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center whitespace-nowrap">
              <div className={cn(radioIndicatorVariants({ size, color, disabled: isDisabled }))} />
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
