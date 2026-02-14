'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';
import { CheckIcon, Favorite } from '@/shared/components/icons';

import { cn } from '@/shared/lib/shadcn/utils';

interface UICheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  children?: React.ReactNode;
  variant?: 'default' | 'favorite' | 'noneText' | 'button';
  size?: 'lg' | 'sm';
  color?: 'primary' | 'information' | 'secondary';
}

function Checkbox({
  className,
  children,
  variant = 'default',
  size = 'lg',
  color = 'primary',
  ...props
}: UICheckboxProps) {
  const isFavorite = variant === 'favorite';
  const isNoneText = variant === 'noneText';
  const isButton = variant === 'button';
  const generatedId = React.useId();
  const checkboxId = props.id || generatedId;

  const sizeStyles = {
    lg: 'size-[2rem] rounded-[0.4rem]',
    sm: 'size-[1.4rem] rounded-[0.3rem]',
  };

  const buttonSizeStyles = {
    lg: 'h-[2.8rem] px-[1rem] text-[1.3rem] tracking-[-0.042rem] w-auto',
    sm: 'h-[2.8rem] px-[1rem] text-[1.3rem] tracking-[-0.039rem] w-auto',
  };

  const colorStyles = {
    primary:
      'hover:border-[var(--color-border-primary)] data-[state=checked]:bg-[var(--color-element-primary)] data-[state=checked]:border-[var(--color-border-primary)] data-[state=checked]:text-white',
    information:
      'hover:border-[var(--color-border-information,#006ff2)] data-[state=checked]:bg-[var(--color-element-information,#006ff2)] data-[state=checked]:border-[var(--color-border-information,#006ff2)] data-[state=checked]:text-white',
    secondary:
      'hover:border-[var(--color-border-secondary,#ff6135)] data-[state=checked]:bg-[var(--color-element-secondary,#ff6135)] data-[state=checked]:border-[var(--color-border-secondary,#ff6135)] data-[state=checked]:text-white',
  };

  const buttonColorStyles = {
    primary:
      'data-[state=checked]:bg-[#fff7f4] data-[state=checked]:text-[#ff3800] data-[state=checked]:border-[#ff6135] data-[state=checked]:shadow-[0rem_0.1rem_0.1rem_0rem_rgba(255,92,46,0.19)]',
    information:
      'data-[state=checked]:bg-[#f0f7ff] data-[state=checked]:text-[#006ff2] data-[state=checked]:border-[#006ff2] data-[state=checked]:shadow-[0rem_0.1rem_0.1rem_0rem_rgba(0,111,242,0.19)]',
    secondary:
      'data-[state=checked]:bg-[#61554F] data-[state=checked]:text-[#ffffff] data-[state=checked]:border-[#61554F]',
  };

  const iconSize = size === 'lg' ? 16 : 14;

  return (
    <div className={`flex items-center gap-1 ${isFavorite ? 'h-full' : ''}`}>
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        id={checkboxId}
        className={cn(
          'shrink-0 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[var(--color-element-gray-lighter)] disabled:border-[var(--color-border-gray-light)] disabled:data-[state=checked]:bg-[var(--color-element-gray-lighter)] disabled:data-[state=checked]:border-[var(--color-border-gray-light)] disabled:data-[state=checked]:text-[#b3b3b3]',
          // favorite 스타일
          isFavorite && 'border-0 bg-transparent shadow-none size-[0.5rem]',
          // button 스타일
          isButton &&
            'rounded-[0.6rem] border border-[var(--color-border-gray-light)] bg-white font-normal leading-normal text-black whitespace-nowrap',
          isButton && buttonSizeStyles[size],
          isButton && buttonColorStyles[color],
          // default 스타일
          !isFavorite &&
            !isButton &&
            'border border-[var(--color-border-gray-light)] bg-[var(--color-element-inverse)]',
          !isFavorite && !isButton && sizeStyles[size],
          !isFavorite && !isButton && colorStyles[color],
          className
        )}
        {...props}
      >
        {isFavorite ? (
          <Favorite color={props.checked ? '#FF5C2E' : '#ECECEC'} />
        ) : isButton ? (
          children
        ) : (
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="grid place-content-center text-current transition-none"
          >
            <CheckIcon size={iconSize} color={props.disabled ? 'var(--color-icon-gray-light)' : undefined} />
          </CheckboxPrimitive.Indicator>
        )}
      </CheckboxPrimitive.Root>
      {children && !isNoneText && !isButton && (
        <label htmlFor={checkboxId} className="text-[1.3rem] font-normal cursor-pointer select-none">
          {children}
        </label>
      )}
    </div>
  );
}

export { Checkbox };
