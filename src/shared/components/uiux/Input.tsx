// design 반영
'use client';

import * as React from 'react';

import { useState } from 'react';
import { ErrorMsg } from '@/shared/components/common';
import { InputClearIcon } from '@/shared/components/icons';
import { Button } from '@/shared/components/uiux';
import { cn } from '@/shared/lib/shadcn/utils';
import { FormItemSize, FormItemWidth } from '@/shared/types/uiuxTypes';

interface UIInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'ghost' | 'default';
  size?: FormItemSize;
  width?: FormItemWidth;
  required?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMsg?: React.ReactNode;
  errorPs?: 'tl' | 'tr' | 'bl' | 'br';
  after?: React.ReactNode;
  before?: React.ReactNode;
  disabled?: boolean;
  formatType?: 'amount' | 'number';
  clear?: boolean;
  forceFocused?: boolean;
}

function formatAmount(value: string) {
  const num = value.replace(/[^0-9]/g, '');
  if (!num) return '';
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
  after = null,
  before = null,
  disabled = false,
  formatType,
  clear = false,
  forceFocused = false,
  onChange,
  value,
  ...props
}: UIInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  // 입력 중에는 원본 값, blur 시에는 콤마 포함 값
  const displayValue =
    formatType === 'amount' && typeof value === 'string'
      ? (isFocused || forceFocused)
        ? value // 입력 중에는 그대로
        : formatAmount(value) // blur 시 콤마 적용
      : (value ?? '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('원본 입력값:', clear, isFocused , displayValue);
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (formatType === 'amount') {
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: val,
            formattedValue: formatAmount(val),
          },
        } as React.ChangeEvent<HTMLInputElement> & {
          target: HTMLInputElement & { formattedValue: string };
        };
        onChange(syntheticEvent);
        return;
      }
    }
    onChange?.(e);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

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
    'w-full rounded-[0.4rem] px-2 text-[1.3rem] border border-[0.1rem] box-border tracking-[--typo-letter-spacing-n3] appearance-none truncate',
    isInvalid || error
      ? 'text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] border-[var(--color-input-border-error)] ring-1 ring-[var(--color-input-surface-error)] border-[0.2rem] hover:px-[0.7rem] px-[0.7rem] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.10)]'
      : required
        ? 'text-[var(--color-text-basic)] bg-[var(--color-input-surface-highlight)] border-[var(--color-input-border-highlight)]'
        : 'text-[var(--color-text-basic)] border-[var(--color-input-border)] bg-white'
  );
  const ghostStyle = cn(
    'w-full rounded-[0.4rem] p-0 text-[1.3rem] bg-[transparent] focus:bg-[#fff] focus:border focus:border-[0.1rem] box-border tracking-[--typo-letter-spacing-n3] appearance-none truncate',
    
  );
  const hoverStyle =
    isInvalid || error
      ? 'hover:border-[var(--color-input-border-error)]'
      : required
        ? 'hover:border-[var(--color-input-border-highlight-bold)]'
        : 'hover:border-[var(--color-input-border-hover)]';
  const focusStyle = `${
    isInvalid || error
      ? 'focus:border-[var(--color-input-border-error)] focus:ring-[var(--color-input-surface-error)] focus:border-[0.2rem] shadow-[0_0.2rem_0.4rem_0_rgba(0,0,0,0.20)]'
      : required
        ? 'focus:border-[var(--color-input-border-highlight-bold)] focus:border-[0.2rem]'
        : 'focus:border-[var(--color-gray-100)]! focus:border-[0.2rem]'
  } 
      focus:ring-1 ${!isInvalid && !error ? 'focus:ring-[var(--color-gray-5)]' : ''} focus:outline-none`;
  const readonlyStyle = readOnly
    ? 'bg-[var(--color-input-surface-disabled)] cursor-not-allowed opacity-100 pointer-events-none'
    : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const sizeStyle = `${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`;

  const variantStyles = {
    default: cn(baseStyle, hoverStyle, focusStyle, readonlyStyle, disabledStyle, sizeStyle),
    ghost: cn(ghostStyle, hoverStyle, focusStyle, readonlyStyle, disabledStyle, sizeStyle),
  };

  return (
    <div className={cn('relative', withStyle())} style={inlineWidthStyle}>
      {before || after ? (
        <div
          className={cn(
            variantStyles[variant],
            className,
            'flex items-center has-[:hover]:border-primary-500 has-[:focus]:border-[.2rem] has-[:focus]:px-[0.7rem] gap-[0.2rem]'
          )}
          style={inlineWidthStyle}
        >
          {before && <div>{before}</div>}
          <div className="relative w-full">
            <input
              type={type}
              data-slot="input"
              className={cn('bg-transparent w-full h-full border-0 p-0 m-0 focus:ring-0 focus:outline-none', className)}
              required={required}
              readOnly={readOnly}
              aria-invalid={error || undefined}
              aria-describedby={error ? errorId : undefined}
              value={displayValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={clear && (isFocused || forceFocused) && displayValue !== '' ? { paddingRight: '2rem' } : undefined}
              {...props}
            />
            {clear && (isFocused || forceFocused) && displayValue !== '' && (
              <Button
                variant="none"
                color="gray"
                only="icon" size="xs"
                className="absolute right-0 top-1/2 -translate-y-1/2"
                onMouseDown={(e) => e.preventDefault()} // 포커스 유지
                onClick={() => {
                  // input 값을 지우는 이벤트 발생
                  if (onChange) {
                    const event = {
                      target: {
                        value: '',
                      },
                    } as React.ChangeEvent<HTMLInputElement>;
                    onChange(event);
                  }
                }}
              >
                <InputClearIcon />
              </Button>
            )}
          </div>
          {after && <div>{after}</div>}
        </div>
      ) : (
        <>
          <input
            type={type}
            data-slot="input"
            className={cn(variantStyles[variant], className, '[:focus]:px-[0.7rem]')}
            required={required}
            readOnly={readOnly}
            aria-invalid={error || undefined}
            aria-describedby={error ? errorId : undefined}
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={clear && (isFocused || forceFocused) && displayValue !== '' ? { paddingRight: '2.8rem' } : undefined}
            {...props}
          />
          {clear && (isFocused || forceFocused) && displayValue !== '' && (
            <Button
              variant="none"
              only="icon" size="xs"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onMouseDown={(e) => e.preventDefault()} // 포커스 유지
              onClick={() => {
                // input 값을 지우는 이벤트 발생
                if (onChange) {
                  const event = {
                    target: {
                      value: '',
                    },
                  } as React.ChangeEvent<HTMLInputElement>;
                  onChange(event);
                }
              }}
            >
              <InputClearIcon size={size === 'lg' ? 16 : 12} color="var(--color-gray-30)" />
            </Button>
          )}
        </>
      )}

      {error && (
        <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
          {errorMsg}
        </ErrorMsg>
      )}
    </div>
  );
}

export { Input };
