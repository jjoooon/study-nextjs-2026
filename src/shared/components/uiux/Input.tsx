/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { ErrorMsg } from '@common/ErrorMsg';
import { InputClearIcon } from '@icons';
import { Button } from '@uiux/Button';
import { useState } from 'react';
import * as React from 'react';

import { INPUT_RESTRICTED_CHARS } from '@/shared/constants/restrictedChars';
import { cn } from '@/shared/lib/shadcn/utils';
import { UIUXsize } from '@/shared/types/uiTypes';
import { format } from '@/shared/utils/formatUtils';

interface UIInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'ghost' | 'default' | 'info';
  size?: UIUXsize;
  required?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMsg?: React.ReactNode;
  errorPs?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
  after?: React.ReactNode;
  before?: React.ReactNode;
  disabled?: boolean;
  commaAmount?: boolean;
  clear?: boolean;
  forceFocused?: boolean;
  formatter?: string;
  isFocused?: boolean;
  width?: 'auto' | 'full' | string | number;
  restrictChars?: boolean;
  // debug?: boolean;
}
function formatAmount(value: string) {
  const sanitized = sanitizeAmountInput(value);
  if (!sanitized) return '';

  const hasDot = sanitized.includes('.');
  const [intPartRaw = '', decimalPartRaw = ''] = sanitized.split('.');
  const intPart = intPartRaw.replace(/^0+(?=\d)/, '');
  const formattedInt = (intPart || '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (!hasDot) {
    return formattedInt;
  }

  return `${formattedInt}.${decimalPartRaw}`;
}

function applyRestrictedCharsFilter(value: string): string {
  const sorted = [...INPUT_RESTRICTED_CHARS].sort((a, b) => b.length - a.length);
  return sorted.reduce((acc, char) => acc.split(char).join(''), value);
}

function sanitizeAmountInput(value: string): string {
  const sanitized = value.replace(/[^0-9.]/g, '');
  const dotIndex = sanitized.indexOf('.');

  if (dotIndex === -1) {
    return sanitized;
  }

  const intPart = sanitized.slice(0, dotIndex).replace(/\./g, '');
  const decimalPart = sanitized.slice(dotIndex + 1).replace(/\./g, '');

  return `${intPart}.${decimalPart}`;
}

function Input({
  size = 'lg',
  variant = 'default',
  width = 'full',
  type,
  required = false,
  readOnly = false,
  error = false,
  errorMsg = '입력은 필수입니다.',
  errorPs = 'bl',
  after = null,
  before = null,
  disabled = false,
  commaAmount = false,
  clear = false,
  forceFocused = false,
  restrictChars = true,
  onChange,
  value,
  formatter,
  isFocused,
  className,
  ...props
}: UIInputProps) {
  const [focused, setFocused] = useState(false);
  const isInputFocused = typeof isFocused === 'boolean' ? isFocused : focused;
  const isControlled = value !== undefined;
  const { onFocus: onFocusProp, onBlur: onBlurProp, style: styleProp, ...inputProps } = props;

  const rawValue = value === undefined || value === null ? '' : String(value);
  let displayValue = rawValue;

  if (commaAmount) {
    displayValue = isFocused || forceFocused ? rawValue : formatAmount(rawValue);
  } else if (formatter) {
    displayValue = format(rawValue, formatter);
  }

  const resolvedWidth =
    typeof width === 'number' ? `${width / 10}rem` : width === 'full' ? '100%' : width === 'auto' ? 'auto' : width;
  const widthStyle = resolvedWidth ? { width: resolvedWidth } : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = restrictChars ? applyRestrictedCharsFilter(e.target.value) : e.target.value;
    if (commaAmount) {
      const normalizedValue = sanitizeAmountInput(val);
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: normalizedValue,
            formattedValue: formatAmount(normalizedValue),
          },
        } as React.ChangeEvent<HTMLInputElement> & {
          target: HTMLInputElement & { formattedValue: string };
        };
        onChange(syntheticEvent);
        return;
      }
    }
    if (val !== e.target.value) {
      onChange?.({ ...e, target: { ...e.target, value: val } } as React.ChangeEvent<HTMLInputElement>);
      return;
    }
    onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocusProp?.(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlurProp?.(e);
  };
  const errorId = React.useId();
  const isInvalid = props['aria-invalid'] === 'true' || props['aria-invalid'] === true;

  const baseStyle = cn(
    'w-full rounded-[0.4rem] px-2 text-[1.3rem] border border-[0.1rem] box-border tracking-[-0.13rem] appearance-none truncate',
    isInvalid || error
      ? 'text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] border-[var(--color-input-border-error)] ring-1 ring-[var(--color-input-surface-error)] border-[0.2rem] hover:px-[0.7rem] px-[0.7rem] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.10)]'
      : required
        ? 'text-[var(--color-text-basic)] bg-[var(--color-input-surface-highlight)] border-[var(--color-input-border-highlight)]'
        : 'text-[var(--color-text-basic)] border-[var(--color-input-border)] bg-white'
  );
  const ghostStyle = cn(
    'w-full rounded-[0.4rem] p-0 text-[1.3rem] bg-[transparent] focus:bg-[#fff] focus:border focus:border-[0.1rem] box-border tracking-[-0.13rem] appearance-none truncate'
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
  const readonlyStyle2 = readOnly
    ? 'bg-[transparent] cursor-not-allowed opacity-100 pointer-events-none border-0 px-0 text-[#000] font-bold appearance-none field-sizing-[content]'
    : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const sizeStyle = `${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`;

  const infoStyle = cn(
    'rounded-[0.4rem] px-2 text-[1.3rem] border border-[0.1rem] box-border tracking-[-0.13rem] appearance-none truncate',
    isInvalid || error
      ? 'text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] border-[var(--color-input-border-error)] ring-1 ring-[var(--color-input-surface-error)] border-[0.2rem] hover:px-[0.7rem] px-[0.7rem] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.10)]'
      : required
        ? 'text-[var(--color-text-basic)] bg-[var(--color-input-surface-highlight)] border-[var(--color-input-border-highlight)]'
        : 'text-[var(--color-text-basic)] border-[var(--color-input-border)] bg-white'
  );
  const variantStyles = {
    default: cn(baseStyle, hoverStyle, focusStyle, readonlyStyle, disabledStyle, sizeStyle),
    ghost: cn(ghostStyle, hoverStyle, focusStyle, readonlyStyle, disabledStyle, sizeStyle),
    info: cn(infoStyle, hoverStyle, focusStyle, readonlyStyle2, disabledStyle, 'h-[2.5rem]'),
  };

  // formatter가 'jumin'이고 placeholder 미지정 시 자동으로 주민번호 placeholder 적용
  const resolvedPlaceholder = formatter?.replaceAll('#', '_');
  const clearPaddingStyle = clear && isInputFocused && displayValue !== '' ? { paddingRight: '2.5rem' } : undefined;
  const mergedInputStyle = clearPaddingStyle ? { ...styleProp, ...clearPaddingStyle } : styleProp;

  // if (props.debug) {
  //   // eslint-disable-next-line no-console
  //   console.log('[Input] clear:', clear, 'isFocused:', isFocused, 'isInputFocused:', isInputFocused, 'displayValue:', displayValue, 'show:', clear && isInputFocused && displayValue !== '');
  // }
  return (
    <div className={cn('relative', className)} style={variant !== 'info' ? widthStyle : undefined}>
      {before || after ? (
        <div
          className={cn(
            variantStyles[variant],
            'flex items-center has-[:hover]:border-primary-500 has-[:focus]:outline-[.2rem] has-[:focus]:-outline-offset-[0.2rem] has-[:focus]:px-[0.7rem] gap-[0.2rem]'
          )}
        >
          {before && <div>{before}</div>}
          <div className="relative w-full [&>input]:w-full [&>input]:bg-transparent [&>input]:border-0 [&>input]:tracking-[-0.13rem] [&>input]:p-0 [&>input]:m-0 [&>input]:focus:ring-0 [&>input]:focus:outline-none">
            <input
              type={type}
              data-slot="input"
              className={cn(after && 'text-right')}
              required={required}
              readOnly={readOnly}
              aria-invalid={error || undefined}
              aria-describedby={error ? errorId : undefined}
              value={isControlled ? displayValue : undefined}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={mergedInputStyle}
              placeholder={resolvedPlaceholder}
              {...inputProps}
            />
            {clear && isInputFocused && displayValue !== '' && (
              <Button
                variant="none"
                color="gray"
                only="icon"
                size="xs"
                className="absolute! right-0 top-1/2 -translate-y-1/2"
                onMouseDown={(e) => e.preventDefault()} // 포커스 유지
                onClick={() => {
                  // input 값을 지우는 이벤트 발생
                  if (onChange) {
                    // let clearedValue = '';
                    // // 주민등록번호: 빈 문자열 전달
                    // if (formatter === 'jumin') {
                    //   clearedValue = '';
                    // } else if (formatter && typeof formatter === 'function') {
                    //   clearedValue = formatter('');
                    // }
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
          {variant === 'info' && readOnly ? (
            <span className="font-bold text-[#000]">{displayValue}</span>
          ) : (
            <input
              type={type}
              data-slot="input"
              className={cn(
                variantStyles[variant],
                commaAmount && 'text-right tracking-[-0.13rem]',
                'w-[100%] [:focus]:px-[0.7rem]'
              )}
              required={required}
              readOnly={readOnly}
              aria-invalid={error || undefined}
              aria-describedby={error ? errorId : undefined}
              value={isControlled ? displayValue : undefined}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={mergedInputStyle}
              placeholder={resolvedPlaceholder}
              {...inputProps}
            />
          )}
          {clear && isInputFocused && displayValue !== '' && (
            <Button
              variant="none"
              only="icon"
              size="xs"
              className="absolute! right-2 top-1/2 -translate-y-1/2"
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
