/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Loader2 as SpinnerIcon } from 'lucide-react';
import { useState } from 'react';
import * as React from 'react';

import { INPUT_RESTRICTED_CHARS } from '@/shared/constants/restrictedChars';
import { cn } from '@/shared/lib/shadcn/utils';
import { UIUXsize } from '@/shared/types/uiTypes';
import { format } from '@/shared/utils/formatUtils';
import { ErrorMsg } from '@common/ErrorMsg';
import { InputClearIcon, MaskingOff, MaskingOn } from '@icons';
import { Button } from '@uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

interface UIInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'ghost' | 'default' | 'info';
  size?: UIUXsize;
  required?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMsg?: React.ReactNode;
  /** 에러 메시지 표시 위치 (t=top, b=bottom / l=left, c=center, r=right) */
  errorPs?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
  after?: React.ReactNode;
  before?: React.ReactNode;
  disabled?: boolean;
  /** 숫자를 천 단위 콤마로 표시, onChange에서 formattedValue도 함께 전달 */
  commaAmount?: boolean;
  clear?: boolean;
  /** 마스킹 토글 버튼(눈 아이콘) 표시 여부 */
  masking?: boolean;
  /** 외부에서 마스킹 상태를 직접 제어할 때 사용 (true: 마스킹/숨김 상태, false: 마스킹 해제/표시 상태) */
  isMasked?: boolean;
  /** 비제어 마스킹 상태의 초기 마스킹(숨김) 여부 @default true */
  defaultMasked?: boolean;
  /** 마스킹 토글 버튼 클릭 시 호출되는 콜백. 다음 마스킹 상태(nextMasked)를 전달하여 개발자가 API 호출 등으로 value를 갱신할 수 있도록 지원 */
  onMaskToggle?: (nextMasked: boolean, e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 마스킹 데이터 조회/갱신 중 로딩 인디케이터 표시 여부 @default false */
  isMaskLoading?: boolean;
  /** 날짜(YYYY-MM-DD 등)의 요일별 텍스트 색상 자동 적용 여부 (토: 파랑, 일: 빨강) */
  dateColor?: boolean;
  /** 외부에서 포커스 상태를 강제 지정할 때 사용 (commaAmount 표시 전환 등) */
  forceFocused?: boolean;
  /** 날짜·전화번호 등 포맷 패턴 문자열 (예: '####-##-##') */
  formatter?: string;
  /** 외부에서 포커스 여부를 제어할 때 사용 */
  isFocused?: boolean;
  width?: 'auto' | 'full' | 'quoteNo' | string | number;
  /** 특수문자 입력 제한 여부 (INPUT_RESTRICTED_CHARS 기준) */
  restrictChars?: boolean;
  align?: 'left' | 'center' | 'right';
  /** 블러 시 에러 상태가 해제될 때 호출 */
  onErrorChange?: (nextError: boolean) => void;
  e2eType?: number;
  /** 허용할 문자 종류 화이트리스트 필터 */
  charFilter?: 'ko' | 'en' | 'num' | 'en-num' | 'ko-en' | 'ko-en-num' | 'num-dash';
  /** 입력 최대 길이 지정 */
  maxLength?: number;
  /** 입력 최소 길이 지정 */
  minLength?: number;
  /** 읽기 전용(readOnly) 상태일 때 텍스트 말줄임 시 툴팁 노출 여부 @default true */
  showTooltipOnReadOnly?: boolean;
  /** 비활성화(disabled) 상태일 때 텍스트 말줄임 시 툴팁 노출 여부 @default true */
  showTooltipOnDisabled?: boolean;
  // debug?: boolean;
}

let measureCanvasContext: CanvasRenderingContext2D | null = null;

function getTextWidth(text: string, font: string, letterSpacing = 0): number {
  if (typeof window === 'undefined') return 0;
  try {
    if (!measureCanvasContext) {
      const canvas = document.createElement('canvas');
      measureCanvasContext = canvas.getContext('2d');
    }
    if (!measureCanvasContext) return 0;
    measureCanvasContext.font = font;
    const metrics = measureCanvasContext.measureText(text);
    const extra = letterSpacing * Math.max(0, text.length - 1);
    return metrics.width + extra;
  } catch {
    return 0;
  }
}

/** charFilter 값별 허용 문자 화이트리스트 패턴 (매치된 문자는 제거됨) */
const CHAR_FILTER_PATTERNS: Record<string, RegExp> = {
  ko: /[^가-힣ㄱ-ㅎㅏ-ㅣ]/g,
  en: /[^a-zA-Z]/g,
  num: /[^0-9]/g,
  'en-num': /[^a-zA-Z0-9]/g,
  'ko-en': /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]/g,
  'ko-en-num': /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/g,
  'num-dash': /[^0-9-]/g,
};

/** 허용되지 않은 문자를 제거해 반환 */
function applyCharFilter(value: string, filter: string): string {
  return value.replace(CHAR_FILTER_PATTERNS[filter] ?? /$/g, '');
}

/** 숫자 문자열을 천 단위 콤마 형식으로 변환 (소수점 보존) */
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

/** INPUT_RESTRICTED_CHARS에 정의된 금지 문자열을 제거 (긴 문자열 우선 처리) */
function applyRestrictedCharsFilter(value: string): string {
  const sorted = [...INPUT_RESTRICTED_CHARS].sort((a, b) => b.length - a.length);
  return sorted.reduce((acc, char) => acc.split(char).join(''), value);
}

/** 금액 입력값에서 숫자와 소수점만 남기고, 소수점이 여러 개일 때 첫 번째만 유지 */
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

/** formatter로 표시된 값에서 숫자만 추출 (구분자 제거용) */
function normalizeFormattedInput(value: string): string {
  return value.replace(/\D/g, '');
}

/** position 앞까지 존재하는 숫자 개수를 반환 (formatter 커서 위치 계산용) */
function getDigitsBeforePosition(value: string, position: number): number {
  return [...value.slice(0, position)].filter((char) => /\d/.test(char)).length;
}

/**
 * 날짜 문자열의 요일에 따른 텍스트 색상 클래스를 반환하는 공통 유틸 함수
 * - 토요일: text-[var(--color-information-50)] (파란색)
 * - 일요일: text-[var(--color-primary-50)] (빨간색)
 * - 평일 또는 유효하지 않은 날짜: ''
 */
export function getDateColorClass(dateValue?: string | number | readonly string[] | Date | null): string {
  if (!dateValue) return '';

  let date: Date;
  if (dateValue instanceof Date) {
    date = dateValue;
  } else {
    const trimmed = String(dateValue).trim();
    const match = trimmed.match(/^(\d{4})[-./]?(\d{2})[-./]?(\d{2})/);
    if (match) {
      const [, y, m, d] = match;
      date = new Date(Number(y), Number(m) - 1, Number(d));
    } else {
      date = new Date(trimmed);
    }
  }

  if (isNaN(date.getTime())) return '';
  const day = date.getDay();
  if (day === 6) return 'text-[var(--color-information-50)]';
  if (day === 0) return 'text-[var(--color-primary-50)]';
  return '';
}

const Input = React.forwardRef<HTMLInputElement, UIInputProps>(function Input(
  {
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
    masking = false,
    isMasked: isMaskedProp,
    defaultMasked = true,
    onMaskToggle,
    isMaskLoading = false,
    dateColor = false,
    forceFocused = false,
    restrictChars = true,
    align = 'left',
    onChange,
    value,
    formatter,
    isFocused,
    onErrorChange,
    className,
    charFilter,
    maxLength,
    minLength,
    showTooltipOnReadOnly = true,
    showTooltipOnDisabled = true,
    ...props
  },
  ref
) {
  const [focused, setFocused] = useState(false);
  const [isErrorDismissed, setIsErrorDismissed] = useState(false);
  const isControlledMask = typeof isMaskedProp === 'boolean';
  const [internalMasked, setInternalMasked] = useState(defaultMasked);
  const currentMasked = isControlledMask ? isMaskedProp : internalMasked;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const infoSpanRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (isControlledMask) {
      setInternalMasked(isMaskedProp);
    }
  }, [isControlledMask, isMaskedProp]);

  const resolvedType = type === 'password' ? (currentMasked ? 'password' : 'text') : type;
  const showMaskToggle = Boolean(masking && !disabled);

  const handleToggleMask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isMaskLoading) return;
    const nextMasked = !currentMasked;
    if (!isControlledMask) {
      setInternalMasked(nextMasked);
    }
    onMaskToggle?.(nextMasked, e);
  };

  React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);
  const focusStartValueRef = React.useRef<string>('');
  const isInputFocused = typeof isFocused === 'boolean' ? isFocused : focused;

  // 외부에서 isFocused prop이 true로 전달될 때 내부 DOM input에 포커스 자동 동기화
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  const isControlled = value !== undefined;
  const { onFocus: onFocusProp, onBlur: onBlurProp, style: styleProp, ...inputProps } = props;

  const rawValue =
    value !== undefined && value !== null
      ? String(value)
      : props.defaultValue !== undefined && props.defaultValue !== null
        ? String(props.defaultValue)
        : '';
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
            ? '11.6rem'
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

  // 포커스 진입 시점과 블러 시점의 값을 동일 기준으로 비교하기 위해 정규화
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
    // 필터 체인: restrictedChars(블랙리스트) → charFilter(화이트리스트) 순서로 적용
    const restricted = restrictChars ? applyRestrictedCharsFilter(e.target.value) : e.target.value;
    const val = charFilter ? applyCharFilter(restricted, charFilter) : restricted;

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
      // 비제어 모드에서는 React가 DOM을 재렌더링하지 않으므로 ref로 직접 교정
      if (!isControlled && inputRef.current) {
        inputRef.current.value = val;
      }

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
    'w-full rounded-[0.4rem] px-[0.4rem] text-[1.3rem] border border-[0.1rem] box-border tracking-[-0.03rem] appearance-none truncate pb-[0.1rem] focus:px-[0.3rem]',
    isInvalid || shouldShowError
      ? 'text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] border-[var(--color-input-border-error)] border-[0.2rem] hover:px-[0.3rem] px-[0.3rem] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.10)]'
      : required
        ? 'text-[var(--color-text-basic)] bg-[var(--color-input-surface-highlight)] border-[var(--color-input-border-highlight)]'
        : 'text-[var(--color-text-basic)] border-[var(--color-input-border)] bg-white'
  );
  const ghostStyle = cn(
    'w-full rounded-[0.4rem] p-0 text-[1.3rem] bg-[transparent]! focus:bg-[#fff] focus:border focus:border-[0.1rem] box-border tracking-[-0.03rem] appearance-none truncate'
  );
  const hoverStyle =
    isInvalid || shouldShowError
      ? 'hover:border-[var(--color-input-border-error)]'
      : required
        ? 'hover:border-[var(--color-input-border-highlight-bold)]'
        : 'hover:border-[var(--color-input-border-hover)]';
  const focusStyle = `${
    isInvalid || shouldShowError
      ? 'focus:border-[var(--color-input-border-error)] focus:ring-0 focus:border-[0.2rem] shadow-[0_0.2rem_0.4rem_0_rgba(0,0,0,0.20)]'
      : required
        ? 'focus:border-[var(--color-input-border-highlight-bold)] focus:border-[0.2rem]'
        : 'focus:border-[var(--color-gray-100)]! focus:border-[0.2rem]'
  } 
      focus:ring-1 ${!isInvalid && !shouldShowError ? 'focus:ring-[var(--color-gray-5)]' : ''} focus:outline-none`;
  const readonlyStyle = readOnly
    ? 'bg-[var(--color-input-surface-disabled)] cursor-pointer opacity-100 outline-none'
    : '';
  const readonlyStyle2 = readOnly
    ? 'bg-[transparent] cursor-pointer opacity-100 border-0 px-0 text-[#000] font-bold outline-none appearance-none field-sizing-[content] flex items-center'
    : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-pointer' : '';
  const sizeStyle = `${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`;

  const infoStyle = cn(
    'rounded-[0.4rem] px-2 text-[1.3rem] border border-[0.1rem] box-border tracking-[-0.03rem] appearance-none truncate',
    isInvalid || shouldShowError
      ? 'text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] border-[var(--color-input-border-error)] border-[0.2rem] hover:px-[0.3rem] px-[0.3rem] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.10)]'
      : required
        ? 'text-[var(--color-text-basic)] bg-[var(--color-input-surface-highlight)] border-[var(--color-input-border-highlight)]'
        : 'text-[var(--color-text-basic)] border-[var(--color-input-border)] bg-white'
  );
  const variantStyles = {
    default: cn(baseStyle, hoverStyle, focusStyle, readonlyStyle, disabledStyle, sizeStyle),
    ghost: cn(ghostStyle, hoverStyle, focusStyle, readonlyStyle, disabledStyle, sizeStyle),
    info: cn(infoStyle, hoverStyle, focusStyle, readonlyStyle2, disabledStyle, sizeStyle),
  };

  // formatter가 'jumin'이고 placeholder 미지정 시 자동으로 주민번호 placeholder 적용
  const resolvedPlaceholder = formatter?.replaceAll('#', '_');
  const showClearButton = Boolean(clear && isInputFocused && displayValue !== '' && !readOnly && !disabled);
  const hasDateColor = Boolean(dateColor);
  const dateColorStyle = hasDateColor ? getDateColorClass(displayValue) : '';
  const mergedInputStyle = styleProp;

  const isTooltipEligible = (readOnly && showTooltipOnReadOnly) || (disabled && showTooltipOnDisabled);

  const [isOverflow, setIsOverflow] = React.useState(false);

  const checkOverflow = React.useCallback(() => {
    const el = variant === 'info' && readOnly ? infoSpanRef.current : inputRef.current;
    if (!el || !displayValue || resolvedType === 'password') {
      setIsOverflow(false);
      return;
    }

    // 1. scrollWidth vs clientWidth 단순 비교
    if (el.scrollWidth > el.clientWidth + 1) {
      setIsOverflow(true);
      return;
    }

    // 2. input 태그 정밀 측정 (Canvas 기반 텍스트 폭과 패딩 제외 가용 너비 비교)
    if (el instanceof HTMLInputElement) {
      const style = window.getComputedStyle(el);
      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      const paddingRight = parseFloat(style.paddingRight) || 0;
      const availableWidth = el.clientWidth - paddingLeft - paddingRight;

      if (availableWidth > 0) {
        const font = `${style.fontWeight || '400'} ${style.fontSize || '13px'} ${style.fontFamily || 'inherit'}`;
        const letterSpacing = parseFloat(style.letterSpacing) || 0;
        const textWidth = getTextWidth(displayValue, font, letterSpacing);

        if (textWidth > availableWidth + 1) {
          setIsOverflow(true);
          return;
        }
      }
    }

    setIsOverflow(false);
  }, [variant, readOnly, displayValue, resolvedType]);

  React.useEffect(() => {
    if (!isTooltipEligible || !displayValue || resolvedType === 'password') {
      setIsOverflow(false);
      return;
    }

    const el = variant === 'info' && readOnly ? infoSpanRef.current : inputRef.current;
    if (!el) {
      setIsOverflow(false);
      return;
    }

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);
    window.addEventListener('resize', checkOverflow);

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(checkOverflow).catch(() => {});
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, [isTooltipEligible, displayValue, resolvedType, variant, readOnly, checkOverflow, width, size]);

  const shouldRenderTooltip =
    Boolean(isTooltipEligible) && resolvedType !== 'password' && Boolean(displayValue) && isOverflow;

  const renderSingleInput = (
    <input
      ref={inputRef}
      type={resolvedType}
      data-slot="input"
      className={cn(
        variantStyles[variant],
        dateColorStyle,
        commaAmount
          ? 'text-right tracking-[-0.03rem]'
          : align === 'right'
            ? 'text-right'
            : align === 'center'
              ? 'text-center'
              : 'text-left',
        'w-full min-w-0 box-border [:focus]:pl-[0.3rem] [&::-ms-reveal]:hidden [&::-ms-clear]:hidden',
        showClearButton && showMaskToggle
          ? 'pr-[4.4rem] [:focus]:pr-[4.4rem]'
          : showClearButton
            ? 'pr-[2rem] [:focus]:pr-[2rem]'
            : showMaskToggle
              ? 'pr-[2.4rem] [:focus]:pr-[2.4rem]'
              : '[:focus]:pr-[0.3rem]'
      )}
      required={required}
      readOnly={readOnly}
      disabled={disabled}
      maxLength={maxLength}
      minLength={minLength}
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
  );

  return (
    <div
      className={cn(
        'relative cp-input min-w-0 box-border',
        variant === 'info' && 'inline-flex items-center',
        showMaskToggle && 'masking',
        className
      )}
      data-comma-amount={commaAmount ? 'true' : undefined}
      style={variant !== 'info' ? widthStyle : undefined}
    >
      {before || after ? (
        <div
          className={cn(
            variantStyles[variant],
            shouldShowError && 'is-invalid',
            'flex items-center has-[:hover]:border-primary-500 has-[:focus]:outline-[.2rem] has-[:focus]:-outline-offset-[0.2rem] has-[:focus]:px-[0.3rem] gap-[0.2rem]'
          )}
          data-invalid={shouldShowError || undefined}
        >
          {before && <div>{before}</div>}
          <div className="relative w-full min-w-0 [&_input]:w-full [&_input]:min-w-0 [&_input]:box-border [&_input]:bg-transparent [&_input]:border-0 [&_input]:tracking-[-0.03rem] [&_input]:p-0 [&_input]:m-0 [&_input]:focus:ring-0 [&_input]:focus:outline-none">
            {shouldRenderTooltip ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className={cn('inline-flex w-full min-w-0', disabled && '[&>*]:pointer-events-none')}>
                    <input
                      ref={inputRef}
                      type={resolvedType}
                      data-slot="input"
                      className={cn(
                        align === 'right'
                          ? 'text-right'
                          : align === 'center' || width === 'quoteNo'
                            ? 'text-center'
                            : 'text-left',
                        dateColorStyle,
                        '[&::-ms-reveal]:hidden [&::-ms-clear]:hidden',
                        showClearButton && showMaskToggle
                          ? 'pr-[4.4rem]'
                          : showClearButton
                            ? 'pr-[2.2rem]'
                            : showMaskToggle
                              ? 'pr-[2.4rem]'
                              : ''
                      )}
                      required={required}
                      readOnly={readOnly}
                      disabled={disabled}
                      maxLength={maxLength}
                      minLength={minLength}
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
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  {displayValue}
                </TooltipContent>
              </Tooltip>
            ) : (
              <input
                ref={inputRef}
                type={resolvedType}
                data-slot="input"
                className={cn(
                  'w-auto',
                  align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left',
                  dateColorStyle,
                  '[&::-ms-reveal]:hidden [&::-ms-clear]:hidden',
                  showClearButton && showMaskToggle
                    ? 'pr-[4.4rem]'
                    : showClearButton
                      ? 'pr-[2rem]'
                      : showMaskToggle
                        ? 'pr-[2.4rem]'
                        : ''
                )}
                required={required}
                readOnly={readOnly}
                disabled={disabled}
                maxLength={maxLength}
                minLength={minLength}
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
            {showClearButton && (
              <Button
                variant="none"
                color="gray"
                only="icon"
                size="xs"
                className={cn('absolute! top-1/2 -translate-y-1/2', showMaskToggle ? 'right-[2.4rem]' : 'right-0')}
                onMouseDown={(e) => e.preventDefault()} // 포커스 유지
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
            {showMaskToggle && (
              <Button
                type="button"
                variant="none"
                only="icon"
                size="xs"
                disabled={disabled || isMaskLoading}
                className={cn(
                  'text-[var(--color-gray-60)] hover:text-[var(--color-gray-90)] cursor-pointer',
                  variant === 'info' && readOnly
                    ? 'relative! ml-1! inline-flex items-center self-center'
                    : 'absolute! right-0 top-1/2 -translate-y-1/2'
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleToggleMask}
                aria-label={currentMasked ? '마스킹 해제 (정보 조회)' : '마스킹 적용 (정보 숨김)'}
                title={currentMasked ? '마스킹 해제' : '마스킹 적용'}
              >
                {isMaskLoading ? (
                  <SpinnerIcon size={size === 'lg' ? 20 : 18} className="animate-spin stroke-[1.8]" />
                ) : currentMasked ? (
                  <MaskingOn size={size === 'lg' ? 20 : 18} />
                ) : (
                  <MaskingOff size={size === 'lg' ? 20 : 18} />
                )}
              </Button>
            )}
          </div>
          {after && <div>{after}</div>}
        </div>
      ) : (
        <>
          {variant === 'info' && readOnly ? (
            shouldRenderTooltip ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    ref={infoSpanRef}
                    className={cn(
                      'leading-[1.2] font-bold text-[#000] text-[1.3rem] inline-flex items-center truncate max-w-full h-[auto]!',
                      dateColorStyle,
                      sizeStyle
                    )}
                  >
                    {displayValue}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  {displayValue}
                </TooltipContent>
              </Tooltip>
            ) : (
              <span
                ref={infoSpanRef}
                className={cn(
                  'leading-[1.2]! font-bold text-[#000] text-[1.3rem] inline-flex items-center h-[auto]! py-[0rem]!',
                  dateColorStyle,
                  sizeStyle
                )}
              >
                {displayValue}
              </span>
            )
          ) : shouldRenderTooltip ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className={cn('inline-flex w-full min-w-0', disabled && '[&>*]:pointer-events-none')}>
                  {renderSingleInput}
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                {displayValue}
              </TooltipContent>
            </Tooltip>
          ) : (
            renderSingleInput
          )}
          {showClearButton && (
            <Button
              variant="none"
              only="icon"
              size="xs"
              className={cn(
                'absolute! top-1/2 -translate-y-1/2 h-[calc(100%-0.5rem)]',
                showMaskToggle ? 'right-[2.4rem]' : 'right-[0.2rem]'
              )}
              onMouseDown={(e) => e.preventDefault()} // 포커스 유지
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
          {showMaskToggle && (
            <Button
              type="button"
              variant="none"
              only="icon"
              size="xs"
              disabled={disabled || isMaskLoading}
              className={cn(
                'text-[var(--color-gray-60)] hover:text-[var(--color-gray-90)] cursor-pointer',
                !currentMasked && 'pointer-events-none',
                variant === 'info' && readOnly
                  ? 'relative! ml-1! inline-flex items-center self-center'
                  : 'absolute! right-[0.3rem] top-1/2 -translate-y-1/2'
              )}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleToggleMask}
              aria-label={currentMasked ? '마스킹 해제 (정보 조회)' : '마스킹 적용 (정보 숨김)'}
              title={currentMasked ? '마스킹 해제' : '마스킹 적용'}
            >
              {isMaskLoading ? (
                <SpinnerIcon size={size === 'lg' ? 16 : 14} className="animate-spin stroke-[1.8]" />
              ) : currentMasked ? (
                <MaskingOn size={size === 'lg' ? 20 : 18} />
              ) : (
                <MaskingOff size={size === 'lg' ? 20 : 18} />
              )}
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
});

export { Input };
