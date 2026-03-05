'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { CheckIcon, CheckboxIcon, Favorite } from '@icons';
import { Grow } from '@atoms';

import { cn } from '@/shared/lib/shadcn/utils';

interface UICheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  children?: React.ReactNode;
  variant?: 'default' | 'favorite' | 'noneText' | 'button' | 'text';
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
  const isDefaultSm = variant === 'default' && size === 'sm';
  const isFavorite = variant === 'favorite';
  const isNoneText = variant === 'noneText';
  const isButton = variant === 'button';
  const isText = variant === 'text';
  const generatedId = React.useId();
  const { checked: propsChecked, onCheckedChange: propsOnCheckedChange, id: propsId, ...restProps } = props;
  const checkboxId = propsId || generatedId;

  const sizeStyles = {
    lg: 'size-[2rem] rounded-[0.4rem]',
    sm: 'size-[1.4rem] rounded-[0.3rem]',
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

  // support both controlled and uncontrolled usage
  const [internalChecked, setInternalChecked] = React.useState<boolean | 'indeterminate'>(false);
  const isControlled = propsChecked !== undefined;
  const checkedState: boolean | 'indeterminate' = isControlled ? (propsChecked as boolean | 'indeterminate') : internalChecked;

  const handleChange = (value: boolean | 'indeterminate') => {
    if (!isControlled) {
      setInternalChecked(value);
    }
    if (propsOnCheckedChange) {
      propsOnCheckedChange(value);
    }
  };

  if (isText) {
    // checkedState가 true일 때 underline과 색상 적용
    const textClass = [
      "text-[1.3rem] font-normal select-none cursor-pointer",
      checkedState === true && "underline text-[var(--color-primary-50)] underline-offset-4 font-bold!"
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <label htmlFor={checkboxId} className={textClass}>
        <CheckboxPrimitive.Root
          data-slot="checkbox"
          id={checkboxId}
          checked={checkedState}
          onCheckedChange={handleChange}
          className="hidden"
          {...restProps}
        />
        {children}
      </label>
    );
  }
  return (
    <div className={`flex items-center gap-1 ${isFavorite ? 'h-full' : ''}`}>
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        id={checkboxId}
        checked={checkedState}
        onCheckedChange={handleChange}
        className={cn(
          'shrink-0 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[var(--color-element-gray-lighter)] disabled:border-[var(--color-border-gray-light)] disabled:data-[state=checked]:bg-[var(--color-element-gray-lighter)] disabled:data-[state=checked]:border-[var(--color-border-gray-light)] disabled:data-[state=checked]:text-[#b3b3b3] [state=checked]:shadow-[0_0.1rem_0.1rem_0_rgba(255,92,46,0.20)]',
          // favorite 스타일
          isDefaultSm && 'translate-y-[0.1rem]',
          isFavorite && 'border-0 bg-transparent shadow-none size-[0.5rem]',
          // button 스타일
          isButton &&
            'h-[2.5rem] px-1.5 text-[1.3rem] tracking-[-0.042rem] w-auto rounded-[0.4rem] border border-[var(--color-gray-20)] bg-[var(--color-gray-0)] font-normal leading-normal text-[var(--color-gray-100)] whitespace-nowrap',
          isButton && buttonColorStyles[color],
          // default 스타일
          !isFavorite &&
            !isButton &&
            'border border-[var(--color-border-gray-light)] bg-[var(--color-element-inverse)]',
          !isFavorite && !isButton && sizeStyles[size],
          !isFavorite && !isButton && colorStyles[color],
          className
        )}
        {...restProps}
      >
        {isFavorite ? (
          <Favorite color={checkedState ? 'var(--color-primary-50)' : 'var(--color-gray-30)'} />
        ) : isButton ? (
          <Grow className="gap-[0.2rem]" placement="sc">
            <CheckboxIcon color={checkedState ? 'var(--color-primary-50)' : 'var(--color-gray-30)'} />
            {children}
          </Grow>
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
