/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useState } from 'react';
import * as React from 'react';

import { INPUT_RESTRICTED_CHARS } from '@/shared/constants/restrictedChars';
import { cn } from '@/shared/lib/shadcn/utils';
import { UIUXsize } from '@/shared/types/uiTypes';
import { format } from '@/shared/utils/formatUtils';
import { InputClearIcon } from '@icons';
import { Button } from '@uiux/Button';
import { ErrorMsg } from '@common/ErrorMsg';

/**
 * Input 컴포넌트의 Props 인터페이스입니다.
 */
interface UIInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 입력 필드 스타일 변형
   * - `default`: 기본 테두리가 있는 스타일
   * - `ghost`: 테두리가 없고 배경이 투명한 스타일 (포커스 시 테두리 생김)
   * - `info`: 테두리가 없고 읽기 전용 시 굵은 일반 텍스트 형태로 표시되는 정보 제공용 스타일
   * @default 'default'
   */
  variant?: 'ghost' | 'default' | 'info';
  /**
   * 입력 필드의 크기 (높이)
   * - `lg`: 2.8rem (기본)
   * - `md`: 2.5rem
   * @default 'lg'
   */
  size?: UIUXsize;
  /** 필수 입력 여부 (활성화 시 연한 분홍색 배경 적용) */
  required?: boolean;
  /** 읽기 전용 상태 여부 */
  readOnly?: boolean;
  /** 에러 상태(유효성 검증 실패 등) 표시 여부 */
  error?: boolean;
  /** 에러 상태일 때 표시할 메시지 내용 */
  errorMsg?: React.ReactNode;
  /**
   * 에러 메시지가 표시될 위치
   * - `tl`: Top Left (상단 좌측)
   * - `tc`: Top Center (상단 중앙)
   * - `tr`: Top Right (상단 우측)
   * - `bl`: Bottom Left (하단 좌측) (기본)
   * - `bc`: Bottom Center (하단 중앙)
   * - `br`: Bottom Right (하단 우측)
   * @default 'bl'
   */
  errorPs?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
  /** 입력 필드 뒤에 렌더링할 커스텀 요소 (예: 단위, 버튼 등) */
  after?: React.ReactNode;
  /** 입력 필드 앞에 렌더링할 커스텀 요소 */
  before?: React.ReactNode;
  /** 비활성화 상태 여부 */
  disabled?: boolean;
  /** 입력값에 세 자리마다 콤마(,)를 자동으로 붙여 금액 형태로 포맷팅할지 여부 */
  commaAmount?: boolean;
  /** 입력창이 포커스되고 글자가 있을 때 'X' 클리어 버튼을 노출시킬지 여부 */
  clear?: boolean;
  /** 강제로 포커스 상태 스타일을 적용할지 여부 */
  forceFocused?: boolean;
  /**
   * 입력값 마스킹/포맷 템플릿 (예: '######-########' 등)
   * 템플릿의 '#' 기호는 입력 가능한 자리수를 의미하며, 그 외 기호는 구분자로 동작합니다.
   */
  formatter?: string;
  /** 외부에서 포커스 상태를 제어하기 위한 prop */
  isFocused?: boolean;
  /**
   * 입력 필드 너비 설정
   * - `full`: 100% 너비
   * - `auto`: 콘텐츠 크기에 맞춤
   * - `quoteNo`: 12rem (견적 번호 등)
   * - 그 외 숫자(rem 단위) 혹은 CSS 너비 문자열
   * @default 'full'
   */
  width?: 'auto' | 'full' | 'quoteNo' | string | number;
  /** 특수문자 등 일부 입력 제한 문자 적용 여부 */
  restrictChars?: boolean;
  /**
   * 텍스트 정렬 방향
   * - `left`: 좌측 정렬 (기본)
   * - `center`: 중앙 정렬
   * - `right`: 우측 정렬 (commaAmount가 활성화되면 강제로 우측 정렬됨)
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  /** 에러 상태가 변경되었을 때 호출되는 콜백 함수 */
  onErrorChange?: (nextError: boolean) => void;
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

function normalizeFormattedInput(value: string): string {
  return value.replace(/\D/g, '');
}

function getDigitsBeforePosition(value: string, position: number): number {
  return [...value.slice(0, position)].filter((char) => /\d/.test(char)).length;
}

/**
 * Input 컴포넌트는 사용자로부터 텍스트 기반의 데이터를 입력받기 위한 UI 요소입니다.
 * 일관된 디자인 시스템을 유지하며 다양한 입력 시나리오에 대응할 수 있도록 설계되었습니다.
 */
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
  align = 'left',
  onChange,
  value,
  formatter,
  isFocused,
  onErrorChange,
  className,
  ...props
}: UIInputProps) {
  const [focused, setFocused] = useState(false);
  const [isErrorDismissed, setIsErrorDismissed] = useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const focusStartValueRef = React.useRef<string>('');
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
    typeof width === 'number'
      ? `${width / 10}rem`
      : width === 'full'
        ? '100%'
        : width === 'auto'
          ? 'auto'
          : width === 'quoteNo'
            ? '12rem'
            : width;
  const widthStyle = resolvedWidth ? { width: resolvedWidth } : undefined;

  const createSyntheticChangeEvent = (
    original: React.ChangeEvent<HTMLInputElement>,
    value: string,
    extra?: Record<string, unknown>
  ) => {
    return {
      ...original,
      target: {
        ...original.target,
        value,
        ...extra,
      },
    } as React.ChangeEvent<HTMLInputElement>;
  };

  const handleFormatterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = normalizeFormattedInput(e.target.value);
    onChange?.(createSyntheticChangeEvent(e, normalizedValue));
  };

  const getComparableValue = React.useCallback(
    (nextValue: string): string => {
      if (commaAmount) {
        return sanitizeAmountInput(nextValue);
      }

      if (formatter) {
        return normalizeFormattedInput(nextValue);
      }

      return restrictChars ? applyRestrictedCharsFilter(nextValue) : nextValue;
    },
    [commaAmount, formatter, restrictChars]
  );

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

    if (formatter) {
      handleFormatterChange({
        ...e,
        target: { ...e.target, value: val },
      } as React.ChangeEvent<HTMLInputElement>);
      return;
    }

    if (val !== e.target.value) {
      onChange?.({ ...e, target: { ...e.target, value: val } } as React.ChangeEvent<HTMLInputElement>);
      return;
    }
    onChange?.(e);
  };

  const handleFormatterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!formatter || !onChange) return;
    if (e.key !== 'Backspace' && e.key !== 'Delete') return;

    const { selectionStart, selectionEnd, value } = e.currentTarget;
    if (selectionStart === null || selectionEnd === null || selectionStart !== selectionEnd) return;

    const isDelimiter = (char: string | undefined) => char !== undefined && !/\d/.test(char);
    const currentChar = value[selectionStart];
    const previousChar = selectionStart > 0 ? value[selectionStart - 1] : undefined;

    if (e.key === 'Backspace' && isDelimiter(previousChar)) {
      e.preventDefault();
      const rawValue = normalizeFormattedInput(value);
      const deleteIndex = getDigitsBeforePosition(value, selectionStart - 1) - 1;
      if (deleteIndex < 0 || deleteIndex >= rawValue.length) return;

      const nextValue = rawValue.slice(0, deleteIndex) + rawValue.slice(deleteIndex + 1);
      onChange?.(createSyntheticChangeEvent(e as unknown as React.ChangeEvent<HTMLInputElement>, nextValue));
      return;
    }

    if (e.key === 'Delete' && isDelimiter(currentChar)) {
      e.preventDefault();
      const rawValue = normalizeFormattedInput(value);
      const deleteIndex = getDigitsBeforePosition(value, selectionStart);
      if (deleteIndex < 0 || deleteIndex >= rawValue.length) return;

      const nextValue = rawValue.slice(0, deleteIndex) + rawValue.slice(deleteIndex + 1);
      onChange?.(createSyntheticChangeEvent(e as unknown as React.ChangeEvent<HTMLInputElement>, nextValue));
      return;
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    focusStartValueRef.current = getComparableValue(e.currentTarget.value);
    setFocused(true);
    onFocusProp?.(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentValue = getComparableValue(e.currentTarget.value);
    const hasValueChanged = focusStartValueRef.current !== currentValue;

    if (error && hasValueChanged) {
      setIsErrorDismissed(true);
      onErrorChange?.(false);
    }

    setFocused(false);
    onBlurProp?.(e);
  };
  // 에러 상태 해제 시 에러 묵인 플래그(isErrorDismissed)를 즉시 초기화 (렌더 단계에서 동기화)
  if (!error && isErrorDismissed) {
    setIsErrorDismissed(false);
  }

  const errorId = React.useId();
  const isInvalid = props['aria-invalid'] === 'true' || props['aria-invalid'] === true;
  const shouldShowError = error && !isErrorDismissed;

  const baseStyle = cn(
    'w-full rounded-[0.4rem] px-2 text-[1.3rem] border border-[0.1rem] box-border tracking-[-0.03rem] appearance-none truncate pb-[0.1rem]',
    isInvalid || shouldShowError
      ? 'text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] border-[var(--color-input-border-error)] ring-1 ring-[var(--color-input-surface-error)] border-[0.2rem] hover:px-[0.7rem] px-[0.7rem] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.10)]'
      : required
        ? 'text-[var(--color-text-basic)] bg-[var(--color-input-surface-highlight)] border-[var(--color-input-border-highlight)]'
        : 'text-[var(--color-text-basic)] border-[var(--color-input-border)] bg-white'
  );
  const ghostStyle = cn(
    'w-full rounded-[0.4rem] p-0 text-[1.3rem] bg-[transparent] focus:bg-[#fff] focus:border focus:border-[0.1rem] box-border tracking-[-0.03rem] appearance-none truncate'
  );
  const hoverStyle =
    isInvalid || shouldShowError
      ? 'hover:border-[var(--color-input-border-error)]'
      : required
        ? 'hover:border-[var(--color-input-border-highlight-bold)]'
        : 'hover:border-[var(--color-input-border-hover)]';
  const focusStyle = `${
    isInvalid || shouldShowError
      ? 'focus:border-[var(--color-input-border-error)] focus:ring-[var(--color-input-surface-error)] focus:border-[0.2rem] shadow-[0_0.2rem_0.4rem_0_rgba(0,0,0,0.20)]'
      : required
        ? 'focus:border-[var(--color-input-border-highlight-bold)] focus:border-[0.2rem]'
        : 'focus:border-[var(--color-gray-100)]! focus:border-[0.2rem]'
  } 
      focus:ring-1 ${!isInvalid && !shouldShowError ? 'focus:ring-[var(--color-gray-5)]' : ''} focus:outline-none`;
  const readonlyStyle = readOnly
    ? 'bg-[var(--color-input-surface-disabled)] cursor-not-allowed opacity-100 pointer-events-none outline-none'
    : '';
  const readonlyStyle2 = readOnly
    ? 'bg-[transparent] cursor-not-allowed opacity-100 pointer-events-none border-0 px-0 text-[#000] font-bold outline-none appearance-none field-sizing-[content]'
    : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const sizeStyle = `${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`;

  const infoStyle = cn(
    'rounded-[0.4rem] px-2 text-[1.3rem] border border-[0.1rem] box-border tracking-[-0.03rem] appearance-none truncate',
    isInvalid || shouldShowError
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

  const resolvedPlaceholder = formatter?.replaceAll('#', '_');
  const clearPaddingStyle = clear && isInputFocused && displayValue !== '' ? { paddingRight: '2.5rem' } : undefined;
  const mergedInputStyle = clearPaddingStyle ? { ...styleProp, ...clearPaddingStyle } : styleProp;

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
          <div className="relative w-full [&>input]:w-full [&>input]:bg-transparent [&>input]:border-0 [&>input]:tracking-[-0.03rem] [&>input]:p-0 [&>input]:m-0 [&>input]:focus:ring-0 [&>input]:focus:outline-none">
            <input
              ref={inputRef}
              type={type}
              data-slot="input"
              className={cn(align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left')}
              required={required}
              readOnly={readOnly}
              aria-invalid={shouldShowError || undefined}
              aria-describedby={shouldShowError ? errorId : undefined}
              value={isControlled ? displayValue : undefined}
              onChange={handleChange}
              onKeyDown={handleFormatterKeyDown}
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
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
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
          {variant === 'info' && readOnly ? (
            <span className="font-bold text-[#000] text-[1.3rem]">{displayValue}</span>
          ) : (
            <input
              ref={inputRef}
              type={type}
              data-slot="input"
              className={cn(
                variantStyles[variant],
                commaAmount
                  ? 'text-right tracking-[-0.03rem]'
                  : align === 'right'
                    ? 'text-right'
                    : align === 'center'
                      ? 'text-center'
                      : 'text-left',
                'w-[100%] [:focus]:px-[0.7rem]'
              )}
              required={required}
              readOnly={readOnly}
              aria-invalid={shouldShowError || undefined}
              aria-describedby={shouldShowError ? errorId : undefined}
              value={isControlled ? displayValue : undefined}
              onChange={handleChange}
              onKeyDown={handleFormatterKeyDown}
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
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
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

      {shouldShowError && (
        <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
          {errorMsg}
        </ErrorMsg>
      )}
    </div>
  );
}

export { Input };
