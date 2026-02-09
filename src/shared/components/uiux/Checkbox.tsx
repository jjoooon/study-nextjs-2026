'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';
import { CheckIcon, Favorite } from '@/shared/components/icons';

import { cn } from '@/shared/lib/shadcn/utils';

interface UICheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  children?: React.ReactNode;
  variant?: 'default' | 'favorite' | 'noneText';
  size?: 'large' | 'small';
  color?: 'primary' | 'information';
}

function Checkbox({
  className,
  children,
  variant = 'default',
  size = 'large',
  color = 'primary',
  ...props
}: UICheckboxProps) {
  const isFavorite = variant === 'favorite';
  const isNoneText = variant === 'noneText';
  const generatedId = React.useId();
  const checkboxId = props.id || generatedId;

  const sizeStyles = {
    large: 'size-[2rem] rounded-[0.4rem]',
    small: 'size-[1.4rem] rounded-[0.3rem]',
  };

  const colorStyles = {
    primary:
      'hover:border-(--color-border-primary) data-[state=checked]:bg-(--color-element-primary) data-[state=checked]:border-(--color-border-primary) data-[state=checked]:text-white',
    information:
      'hover:border-[var(--color-border-information,#006ff2)] data-[state=checked]:bg-[var(--color-element-information,#006ff2)] data-[state=checked]:border-[var(--color-border-information,#006ff2)] data-[state=checked]:text-white',
  };

  const iconSize = size === 'large' ? 16 : 14;

  return (
    <div className={`flex items-center gap-1 ${isFavorite ? 'h-full' : ''}`}>
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        id={checkboxId}
        className={cn(
          'shrink-0 border border-(--color-border-gray-light) bg-(--color-element-inverse) transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-(--color-element-gray-lighter) disabled:border-(--color-border-gray-light) disabled:data-[state=checked]:bg-(--color-element-gray-lighter) disabled:data-[state=checked]:border-(--color-border-gray-light) disabled:data-[state=checked]:text-[#b3b3b3]',
          isFavorite ? 'border-0 bg-transparent shadow-none size-[0.5rem]' : sizeStyles[size],
          !isFavorite && colorStyles[color],
          className
        )}
        {...props}
      >
        {isFavorite ? (
          <Favorite color={props.checked ? '#FF5C2E' : '#ECECEC'} />
        ) : (
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="grid place-content-center text-current transition-none"
          >
            <CheckIcon size={iconSize} color={props.disabled ? 'var(--color-icon-gray-light)' : undefined} />
          </CheckboxPrimitive.Indicator>
        )}
      </CheckboxPrimitive.Root>
      {children && !isNoneText && (
        <label htmlFor={checkboxId} className="text-[1.3rem] font-normal cursor-pointer select-none">
          {children}
        </label>
      )}
    </div>
  );
}

export { Checkbox };
