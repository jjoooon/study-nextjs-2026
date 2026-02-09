// design 반영

import * as React from 'react';

import { ErrorMsg } from '@/shared/components/common';
import { cn } from '@/shared/lib/shadcn/utils';
import { FormItemSize, FormItemWidth } from '@/shared/types/uiuxTypes';

interface UIInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default';
  size?: FormItemSize;
  width?: FormItemWidth;
  required?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMsg?: React.ReactNode;
  errorPs?: 'tl' | 'tr' | 'bl' | 'br';
}

function Input({
  size = 'lg',
  variant = 'default',
  width = 'full',
  className,
  type,
  required = false,
  readOnly = false,
  error = false,
  errorMsg = '입력은 필수입니다.',
  errorPs = 'bl',
  ...props
}: UIInputProps) {
  const withStyle = () => {
    const widthMap: Record<FormItemWidth, string> = {
      full: 'w-full flex-1',
      max: 'w-max',
      '2xs': 'w-[4rem]',
      xs: 'w-[8rem]',
      sm: 'w-[10rem]',
      md: 'w-[12rem]',
      lg: 'w-[14rem]',
      xl: 'w-[16rem]',
      '2xl': 'w-[18rem]',
    };

    if (width && widthMap[width]) return widthMap[width];
    return '';
  };

  const inlineWidthStyle = (() => {
    if (typeof width === 'number') return { width: `${width}rem` };
    if (typeof width === 'string') {
      if (/^\d+(\.\d+)?$/.test(width)) return { width: `${width}rem` };
      if (/^\d+(\.\d+)?rem$/.test(width)) return { width };
    }
    return undefined;
  })();

  const errorId = React.useId();
  const isInvalid = props['aria-invalid'] === 'true' || props['aria-invalid'] === true;

  const baseStyle = cn(
    'w-full rounded-[0.4rem] px-2 text-[1.3rem] border box-border tracking-[--typo-letter-spacing-n3] appearance-none truncate',
    isInvalid || error
      ? 'text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] border-[var(--color-input-border-error)] ring-1 ring-[var(--color-input-surface-error)]'
      : required
        ? 'text-[var(--color-text-basic)] bg-[var(--color-input-surface-highlight)] border-[var(--color-input-border-highlight)]'
        : 'text-[var(--color-text-basic)] border-[var(--color-input-border)] bg-white'
  );
  const hoverStyle =
    isInvalid || error
      ? 'hover:border-[var(--color-input-border-error)]'
      : required
        ? 'hover:border-[var(--color-input-border-highlight-bold)]'
        : 'hover:border-[var(--color-input-border-hover)]';
  const focusStyle = `${
    isInvalid || error
      ? 'focus:border-[var(--color-input-border-error)] focus:ring-[var(--color-input-surface-error)]'
      : required
        ? 'focus:border-[var(--color-input-border-highlight-bold)]'
        : 'focus:border-[var(--color-input-border-hover)]'
  } 
      focus:ring-1 ${!isInvalid && !error ? 'focus:ring-[var(--color-gray-5)]' : ''} focus:outline-none`;
  const readonlyStyle = readOnly
    ? 'bg-[var(--color-input-surface-disabled)] cursor-not-allowed opacity-100 pointer-events-none'
    : '';
  const disabledStyle = 'disabled:opacity-50 disabled:cursor-not-allowed';
  const sizeStyle = `${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`;

  const variantStyles = {
    default: cn(baseStyle, hoverStyle, focusStyle, readonlyStyle, disabledStyle, sizeStyle),
  };

  return (
    <div className={cn('relative', withStyle())} style={inlineWidthStyle}>
      <input
        type={type}
        data-slot="input"
        className={cn(variantStyles[variant], className)}
        required={required}
        readOnly={readOnly}
        aria-invalid={error || undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
          {errorMsg}
        </ErrorMsg>
      )}
    </div>
  );
}

export { Input };
