/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { type DateRange } from 'react-day-picker';
import { FormItemSize, FormItemWidth } from '@/shared/types/uiTypes';
import { CalendarIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Calendar } from '@uiux/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { ErrorMsg } from '@common/ErrorMsg';

type CalendarSelection = Date | Date[] | DateRange | undefined;

type DatePickerRangeValue = {
  from?: string;
  to?: string;
};

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

function formatInputDigits(digits: string) {
  if (digits.length === 0) return '';
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
}

function parseDateFromDigits(digits: string) {
  if (digits.length !== 8) return undefined;
  const year = parseInt(digits.slice(0, 4), 10);
  const month = parseInt(digits.slice(4, 6), 10);
  const day = parseInt(digits.slice(6, 8), 10);

  const isValidRange = month >= 1 && month <= 12 && day >= 1 && day <= 31;
  if (!isValidRange) return undefined;

  const dateObj = new Date(year, month - 1, day);
  const isActualValid = dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day;

  return isActualValid ? dateObj : undefined;
}

/**
 * DatePickerInput 컴포넌트의 Props 인터페이스입니다.
 */
interface UIInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** 입력 필드 및 관련 요소의 고유 ID */
  id?: string;
  /** 단일 날짜 값 (포맷: YYYY-MM-DD) */
  value?: string;
  /** 기간 선택 모드(`range`)일 때의 시작일 및 종료일 값 */
  rangeValue?: {
    /** 시작일 (포맷: YYYY-MM-DD) */
    from?: string;
    /** 종료일 (포맷: YYYY-MM-DD) */
    to?: string;
  };
  /**
   * 날짜 선택 모드
   * - `single`: 단일 날짜 선택
   * - `multiple`: 다중 날짜 선택
   * - `range`: 기간(시작일~종료일) 선택
   * @default 'single'
   */
  mode?: 'single' | 'multiple' | 'range';
  /**
   * 날짜가 변경되었을 때 호출되는 콜백 함수
   * @param date 마지막으로 선택/입력된 Date 객체 (유효하지 않으면 undefined)
   * @param formattedValue 포맷팅된 문자열 (single: YYYY-MM-DD, range: YYYY-MM-DD ~ YYYY-MM-DD 등)
   */
  onChange?: (date: Date | undefined, formattedValue: string) => void;
  /**
   * 입력 필드의 크기 (높이)
   * - `lg`: 2.8rem (기본)
   * - `md`: 2.5rem
   * @default 'lg'
   */
  size?: FormItemSize;
  /**
   * 입력 필드의 너비 (예: 'full', 'auto', '20rem' 등)
   * @default 'full'
   */
  width?: FormItemWidth;
  /** 필수 입력(체크) 스타일 적용 여부 */
  required?: boolean;
  /** 읽기 전용 상태 여부 */
  readOnly?: boolean;
  /** 비활성화 상태 여부 */
  disabled?: boolean;
  /** 에러 상태 표시 여부 */
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
  /** 월만 선택하는 모드(월 단위 그리드 캘린더) 여부 */
  monthOnly?: boolean;
  /**
   * monthOnly 모드에서 월이 선택되었을 때 호출되는 콜백 함수
   * @param month 선택된 월 (1~12)
   */
  onMonthSelect?: (month: number) => void;
}

/**
 * DatePickerInput 컴포넌트는 입력 필드와 캘린더 팝오버를 결합한 날짜 입력 UI입니다.
 * single, multiple, range 모드를 지원하며, 에러 메시지와 크기/너비 설정을 일관된 방식으로 제공합니다.
 */
export function DatePickerInput({
  id,
  value: initialValue,
  rangeValue,
  mode = 'single',
  onChange,
  size = 'lg',
  width = 'full',
  required = false,
  readOnly = false,
  disabled = false,
  error = false,
  errorMsg = '입력은 필수입니다.',
  errorPs = 'bl',
  monthOnly = false,
  onMonthSelect,
}: UIInputProps) {
  const generatedId = React.useId();
  const finalId = id || generatedId;
  const errorId = React.useId();
  const fromInputRef = React.useRef<HTMLInputElement>(null);
  const toInputRef = React.useRef<HTMLInputElement>(null);

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<CalendarSelection>(initialValue ? new Date(initialValue) : undefined);
  const [month, setMonth] = React.useState<Date | undefined>(initialValue ? new Date(initialValue) : undefined);
  const [numericValue, setNumericValue] = React.useState(initialValue?.replace(/\D/g, '') || '');
  const [rangeInput, setRangeInput] = React.useState({ from: '', to: '' });
  const [invalidRange, setInvalidRange] = React.useState({ from: false, to: false });
  const [invalidDate, setInvalidDate] = React.useState(false);

  const [prevInitialValue, setPrevInitialValue] = React.useState<string | undefined>(initialValue);
  const [prevMode, setPrevMode] = React.useState<string>(mode);
  const [prevRangeValue, setPrevRangeValue] = React.useState<DatePickerRangeValue | undefined>(rangeValue);

  // disabled 또는 readOnly가 활성화되면 팝업을 닫음 (렌더 단계에서 동기화)
  if ((disabled || readOnly) && open) {
    setOpen(false);
  }

  // initialValue, mode, rangeValue 변경 시 최신 상태로 동기화 (렌더 단계에서 동기화)
  if (initialValue !== prevInitialValue || mode !== prevMode || rangeValue !== prevRangeValue) {
    setPrevInitialValue(initialValue);
    setPrevMode(mode);
    setPrevRangeValue(rangeValue);

    if (mode === 'range' && rangeValue) {
      const from = rangeValue.from ? new Date(rangeValue.from) : undefined;
      const to = rangeValue.to ? new Date(rangeValue.to) : undefined;

      if (from && isValidDate(from) && to && isValidDate(to)) {
        setSelected({ from, to });
        setMonth(from);
        setRangeInput({
          from: formatDate(from),
          to: formatDate(to),
        });
        setNumericValue(`${formatDate(from).replace(/\D/g, '')}${formatDate(to).replace(/\D/g, '')}`);
      } else {
        setSelected(undefined);
        setMonth(undefined);
        setRangeInput({ from: '', to: '' });
        setNumericValue('');
      }
    } else {
      if (initialValue) {
        const newDate = new Date(initialValue);
        if (isValidDate(newDate)) {
          setSelected(newDate);
          setMonth(newDate);
          setNumericValue(initialValue.replace(/\D/g, ''));
        }
      } else {
        setSelected(undefined);
        setMonth(undefined);
        setNumericValue('');
        setRangeInput({ from: '', to: '' });
        setInvalidRange({ from: false, to: false });
        setInvalidDate(false);
      }
    }
  }

  const handleSelect = (selectedValue: CalendarSelection) => {
    setSelected(selectedValue);

    if (selectedValue instanceof Date || selectedValue === undefined) {
      const formattedValue = formatDate(selectedValue);
      setNumericValue(formattedValue.replace(/\D/g, ''));
      setInvalidDate(false);
      onChange?.(selectedValue, formattedValue);
      setOpen(false);
      return;
    }

    if (Array.isArray(selectedValue)) {
      const last = selectedValue[selectedValue.length - 1];
      if (last) setMonth(last);

      const formattedValue = selectedValue
        .slice()
        .sort((a, b) => a.getTime() - b.getTime())
        .map((date) => formatDate(date))
        .filter(Boolean)
        .join(', ');

      setNumericValue('');
      setInvalidDate(false);
      onChange?.(last, formattedValue);
      return;
    }

    const last = selectedValue.to ?? selectedValue.from;

    if (selectedValue.from && selectedValue.to) {
      const rangeFormatted = `${formatDate(selectedValue.from)} ~ ${formatDate(selectedValue.to)}`;
      const numericOnly = `${formatDate(selectedValue.from).replace(/\D/g, '')}${formatDate(selectedValue.to).replace(/\D/g, '')}`;
      setNumericValue(numericOnly);
      setRangeInput({ from: formatDate(selectedValue.from), to: formatDate(selectedValue.to) });
      setInvalidRange({ from: false, to: false });
      onChange?.(last, rangeFormatted);
    } else if (selectedValue.from) {
      const fromFormatted = formatDate(selectedValue.from);
      setNumericValue(fromFormatted.replace(/\D/g, ''));
      setRangeInput({ from: fromFormatted, to: '' });
      setInvalidRange({ from: false, to: false });
      onChange?.(selectedValue.from, fromFormatted);
    } else {
      setNumericValue('');
      setRangeInput({ from: '', to: '' });
      setInvalidRange({ from: false, to: false });
      onChange?.(undefined, '');
    }
    setInvalidDate(false);
  };

  const handleRangeInputChange = (part: 'from' | 'to') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
    const formatted = formatInputDigits(digits);

    setRangeInput((prev) => ({ ...prev, [part]: formatted }));

    const parsedDate = parseDateFromDigits(digits);
    const isInvalid = digits.length === 8 && !parsedDate;
    setInvalidRange((prev) => {
      const next = { ...prev, [part]: isInvalid };
      setInvalidDate(next.from || next.to);
      return next;
    });
    const currentRange =
      selected && !Array.isArray(selected) && !(selected instanceof Date)
        ? selected
        : { from: undefined, to: undefined };

    const nextRange: DateRange = { ...currentRange, [part]: parsedDate };
    setSelected(nextRange);

    if (parsedDate) {
      if (part === 'from' && digits.length === 8 && !rangeInput.to) {
        toInputRef.current?.focus();
      }
    }

    if (nextRange.from && nextRange.to) {
      const rangeFormatted = `${formatDate(nextRange.from)} ~ ${formatDate(nextRange.to)}`;
      setNumericValue(`${formatDate(nextRange.from).replace(/\D/g, '')}${formatDate(nextRange.to).replace(/\D/g, '')}`);
      onChange?.(nextRange.to ?? nextRange.from, rangeFormatted);
      setInvalidDate(false);
      return;
    }

    if (parsedDate) {
      const formattedValue = formatDate(parsedDate);
      setNumericValue(formattedValue.replace(/\D/g, ''));
      onChange?.(parsedDate, formattedValue);
      return;
    }

    if (digits.length < 8) {
      setInvalidRange((prev) => {
        const next = { ...prev, [part]: false };
        setInvalidDate(next.from || next.to);
        return next;
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    const limitedInput = inputValue.slice(0, 8);
    setNumericValue(limitedInput);

    if (limitedInput.length === 8) {
      const formatted = `${limitedInput.slice(0, 4)}-${limitedInput.slice(4, 6)}-${limitedInput.slice(6, 8)}`;
      const parts = formatted.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);

      const isValidRange = month >= 1 && month <= 12 && day >= 1 && day <= 31;

      if (isValidRange) {
        const dateObj = new Date(year, month - 1, day);
        const isActualValid =
          dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day;

        if (isActualValid) {
          setMonth(dateObj);
          setInvalidDate(false);
          onChange?.(dateObj, formatted);
        } else {
          setInvalidDate(true);
          onChange?.(undefined, '');
        }
      } else {
        setInvalidDate(true);
        onChange?.(undefined, '');
      }
    } else {
      setInvalidDate(false);
      onChange?.(undefined, '');
    }
  };

  const displayValue = (() => {
    if (mode === 'multiple') {
      if (!Array.isArray(selected) || selected.length === 0) return '';

      return selected
        .slice()
        .sort((a, b) => a.getTime() - b.getTime())
        .map((date) => formatDate(date))
        .filter(Boolean)
        .join(', ');
    }

    if (numericValue.length === 0) return '';

    if (mode === 'range') {
      if (numericValue.length <= 4) return numericValue;
      if (numericValue.length <= 6) return `${numericValue.slice(0, 4)}-${numericValue.slice(4)}`;
      if (numericValue.length <= 8)
        return `${numericValue.slice(0, 4)}-${numericValue.slice(4, 6)}-${numericValue.slice(6, 8)}`;
      if (numericValue.length <= 12)
        return `${numericValue.slice(0, 4)}-${numericValue.slice(4, 6)}-${numericValue.slice(6, 8)} ~ ${numericValue.slice(8, 12)}`;
      if (numericValue.length <= 14)
        return `${numericValue.slice(0, 4)}-${numericValue.slice(4, 6)}-${numericValue.slice(6, 8)} ~ ${numericValue.slice(8, 12)}-${numericValue.slice(12, 14)}`;
      return `${numericValue.slice(0, 4)}-${numericValue.slice(4, 6)}-${numericValue.slice(6, 8)} ~ ${numericValue.slice(8, 12)}-${numericValue.slice(12, 14)}-${numericValue.slice(14, 16)}`;
    }

    if (numericValue.length <= 4) return numericValue;
    if (numericValue.length <= 6) return `${numericValue.slice(0, 4)}-${numericValue.slice(4)}`;
    return `${numericValue.slice(0, 4)}-${numericValue.slice(4, 6)}-${numericValue.slice(6, 8)}`;
  })();

  const inlineWidthStyle = (() => {
    if (typeof width === 'string') {
      if (/^\d+(\.\d+)?$/.test(width)) return { width: `${width}rem` };
      if (/^\d+(\.\d+)?rem$/.test(width)) return { width };
      if (/^\d+(\.\d+)?px$/.test(width)) return { width };
    }
    return undefined;
  })();

  const inputStyle: React.CSSProperties | undefined = readOnly
    ? { ...(inlineWidthStyle ?? {}), backgroundColor: '#F4F4F4', border: '0.1rem solid #F4F4F4' }
    : inlineWidthStyle;

  const sizeClass = size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]';
  const buttonSizeClass = size === 'lg' ? 'h-[2.8rem] w-[2.8rem]' : 'h-[2.5rem] w-[2.5rem]';
  const isCalendarButtonDisabled = disabled || readOnly;

  const baseStyle = `px-[0.8rem] py-[0.4rem] rounded-[0.4rem] border text-[1.3rem] font-normal box-border tracking-[-0.03rem] ${
    error || invalidDate
      ? 'text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] border-[var(--color-input-border-error)]'
      : required
        ? 'text-[var(--color-text-basic)] bg-[var(--color-input-surface-highlight)] border-[var(--color-input-border-highlight)]'
        : 'text-[var(--color-text-basic)] border-[var(--color-input-border)] bg-white'
  }`;
  const hoverStyle =
    error || invalidDate
      ? 'hover:border-[var(--color-input-border-error)]'
      : required
        ? 'hover:border-[var(--color-input-border-highlight-bold)]'
        : 'hover:border-[var(--color-input-border-hover)]';
  const focusClass = `${
    error || invalidDate
      ? 'focus:border-[var(--color-input-border-error)]'
      : required
        ? 'focus:border-[var(--color-input-border-highlight-bold)]'
        : 'focus:border-[var(--color-input-border-hover)]'
  } focus:ring-1 focus:ring-[var(--color-gray-5)] focus:border-[0.2rem] focus:px-[0.7rem]`;
  const disabledClass = disabled
    ? 'bg-[var(--color-input-surface-disabled)] text-[var(--color-gray-40)] cursor-not-allowed pointer-events-none'
    : '';
  const readOnlyClass = readOnly ? 'bg-[var(--color-gray-5)] border border-[var(--color-gray-20)]!' : '';
  const rangeSelected = selected && !Array.isArray(selected) && !(selected instanceof Date) ? selected : undefined;
  const singleSelected = selected instanceof Date ? selected : undefined;
  const multiSelected = Array.isArray(selected) ? selected : undefined;

  return (
    <div className="relative flex gap-1 items-center justify-center">
      {mode === 'range' ? (
        <>
          <input
            id={finalId}
            type="tel"
            value={rangeInput.from}
            disabled={disabled}
            readOnly={readOnly}
            placeholder="____-__-__"
            aria-invalid={error || invalidRange.from ? true : undefined}
            aria-describedby={error || invalidDate ? errorId : undefined}
            onChange={handleRangeInputChange('from')}
            onKeyDown={(e) => {
              if (!readOnly && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                setOpen(true);
              }
              if (e.key === 'Escape') {
                e.preventDefault();
                setOpen(false);
              }
            }}
            className={`transition-[color,box-shadow] outline-none w-[8.4rem] ${sizeClass} ${baseStyle} ${hoverStyle} ${focusClass} ${disabledClass} ${readOnlyClass}`}
            style={inputStyle}
            data-size={size}
            data-width={width}
            ref={fromInputRef}
          />
          -
          <input
            type="tel"
            value={rangeInput.to}
            disabled={disabled}
            readOnly={readOnly}
            placeholder="____-__-__"
            aria-invalid={error || invalidRange.to ? true : undefined}
            aria-describedby={error || invalidDate ? errorId : undefined}
            onChange={handleRangeInputChange('to')}
            onKeyDown={(e) => {
              if (!readOnly && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                setOpen(true);
              }
              if (e.key === 'Escape') {
                e.preventDefault();
                setOpen(false);
              }
            }}
            className={`transition-[color,box-shadow] outline-none w-[8.4rem] ${sizeClass} ${baseStyle} ${hoverStyle} ${focusClass} ${disabledClass} ${readOnlyClass}`}
            style={inputStyle}
            data-size={size}
            data-width={width}
            ref={toInputRef}
          />
        </>
      ) : (
        <input
          id={finalId}
          type="tel"
          value={displayValue}
          placeholder={monthOnly ? '____-__' : '____-__-__'}
          disabled={disabled}
          readOnly={readOnly || mode === 'multiple'}
          required={required}
          aria-invalid={error || invalidDate ? true : undefined}
          aria-describedby={error || invalidDate ? errorId : undefined}
          onChange={mode === 'multiple' ? undefined : handleDateChange}
          onKeyDown={(e) => {
            if (!readOnly && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              setOpen(true);
            }
            if (e.key === 'Escape') {
              e.preventDefault();
              setOpen(false);
            }
          }}
          className={`transition-[color,box-shadow] outline-none w-[8.4rem] ${sizeClass} ${baseStyle} ${hoverStyle} ${focusClass} ${disabledClass} ${readOnlyClass}`}
          style={inputStyle}
          data-size={size}
          data-width={width}
        />
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={`${finalId}-button`}
            variant={'outlined'}
            only={'icon'}
            size={'lg'}
            color={'gray-light'}
            aria-label="Select date"
            className={buttonSizeClass}
            disabled={isCalendarButtonDisabled}
          >
            <CalendarIcon color="var(--color-icon-primary)" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-[1100] w-auto overflow-hidden p-0 border-(--color-border-gray-light)"
          align={'end'}
          alignOffset={-8}
          sideOffset={10}
        >
          {monthOnly ? (
            <Calendar
              mode={'single'}
              selected={singleSelected}
              onSelect={handleSelect}
              captionLayout={'dropdown'}
              month={month}
              onMonthChange={setMonth}
              monthOnly={true}
              onMonthSelect={onMonthSelect}
              onChange={(val) => {
                if (val && val.year && val.month) {
                  const formatted = `${val.year}-${String(val.month).padStart(2, '0')}`;
                  if (onChange) onChange(new Date(val.year, val.month - 1, 1), formatted);
                }
              }}
              onClose={() => setOpen(false)}
              className="border-none [&_.rdp-cell_selected]:bg-[#FF5C2E] [&_.rdp-cell_selected]:text-white [&_.rdp-range_middle]:bg-[#FF5C2E33] [&_.rdp-day_range_start]:bg-[#FF5C2E] [&_.rdp-day_range_end]:bg-[#FF5C2E] [&_.rdp-day_range_start]:text-white [&_.rdp-day_range_end]:text-white"
            />
          ) : mode === 'range' ? (
            <Calendar
              mode={'range'}
              defaultMonth={rangeSelected?.from}
              selected={rangeSelected}
              onSelect={handleSelect}
              captionLayout={'dropdown'}
              month={month}
              onMonthChange={setMonth}
              numberOfMonths={2}
              className="border-none [&_.rdp-cell_selected]:bg-[#FF5C2E] [&_.rdp-cell_selected]:text-white [&_.rdp-range_middle]:bg-[#FF5C2E33] [&_.rdp-day_range_start]:bg-[#FF5C2E] [&_.rdp-day_range_end]:bg-[#FF5C2E] [&_.rdp-day_range_start]:text-white [&_.rdp-day_range_end]:text-white"
              required={true}
            />
          ) : mode === 'multiple' ? (
            <Calendar
              mode={'multiple'}
              selected={multiSelected}
              onSelect={handleSelect}
              captionLayout={'dropdown'}
              month={month}
              onMonthChange={setMonth}
              className="border-none [&_.rdp-cell_selected]:bg-[#FF5C2E] [&_.rdp-cell_selected]:text-white [&_.rdp-range_middle]:bg-[#FF5C2E33] [&_.rdp-day_range_start]:bg-[#FF5C2E] [&_.rdp-day_range_end]:bg-[#FF5C2E] [&_.rdp-day_range_start]:text-white [&_.rdp-day_range_end]:text-white"
              required={required}
            />
          ) : (
            <Calendar
              mode={'single'}
              selected={singleSelected}
              onSelect={handleSelect}
              captionLayout={'dropdown'}
              month={month}
              onMonthChange={setMonth}
              className="border-none [&_.rdp-cell_selected]:bg-[#FF5C2E] [&_.rdp-cell_selected]:text-white [&_.rdp-range_middle]:bg-[#FF5C2E33] [&_.rdp-day_range_start]:bg-[#FF5C2E] [&_.rdp-day_range_end]:bg-[#FF5C2E] [&_.rdp-day_range_start]:text-white [&_.rdp-day_range_end]:text-white"
            />
          )}
        </PopoverContent>
      </Popover>
      {(error || invalidDate) && (
        <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
          {invalidDate && !error ? '유효하지 않은 날짜입니다.' : errorMsg}
        </ErrorMsg>
      )}
    </div>
  );
}
