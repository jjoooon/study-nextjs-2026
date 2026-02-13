'use client';

import * as React from 'react';
import { type DateRange } from 'react-day-picker';
import { Separator, ErrorMsg } from '@/shared/components/common';

import { CalendarIcon } from '@/shared/components/icons';
import { Calendar, Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/uiux';

import { FormItemSize, FormItemWidth } from '@/shared/types/uiuxTypes';

type CalendarSelection = Date | Date[] | DateRange | undefined;

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

interface UIInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  id?: string;
  value?: string;
  rangeValue?: { from?: string; to?: string };
  mode?: 'single' | 'multiple' | 'range';
  onChange?: (date: Date | undefined, formattedValue: string) => void;
  size?: FormItemSize;
  width?: FormItemWidth;
  required?: boolean;
  error?: boolean;
  errorMsg?: React.ReactNode;
  errorPs?: 'tl' | 'tr' | 'bl' | 'br';
}

export function DatePickerInput({
  id,
  value: initialValue,
  rangeValue,
  mode = 'single',
  onChange,
  size = 'lg',
  width = 'full',
  required = false,
  error = false,
  errorMsg = '입력은 필수입니다.',
  errorPs = 'bl',
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

  React.useEffect(() => {
    // range 모드일 때 rangeValue 우선 처리
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
      return;
    }

    // 단일/다중 모드 처리
    if (initialValue) {
      const newDate = new Date(initialValue);
      if (isValidDate(newDate)) {
        setSelected(newDate);
        setMonth(newDate);
        setNumericValue(initialValue.replace(/\D/g, ''));
      }
    } else {
      // initialValue가 빈 문자열이면 리셋
      setSelected(undefined);
      setMonth(undefined);
      setNumericValue('');
      setRangeInput({ from: '', to: '' });
      setInvalidRange({ from: false, to: false });
      setInvalidDate(false);
    }
  }, [initialValue, mode, rangeValue]);

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
      const formattedValue = formatDate(last);
      setNumericValue(formattedValue.replace(/\D/g, ''));
      setInvalidDate(false);
      onChange?.(last, formattedValue);
      return;
    }

    const last = selectedValue.to ?? selectedValue.from;

    // range 포맷: from~to
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
    const inputValue = e.target.value.replace(/\D/g, ''); // 숫자만 남기기

    // 최대 8자리까지만 허용
    const limitedInput = inputValue.slice(0, 8);

    // 순수 숫자로만 저장
    setNumericValue(limitedInput);

    // 완전한 날짜 형식(YYYY-MM-DD)일 때만 Date 객체 생성 및 onChange 호출
    if (limitedInput.length === 8) {
      const formatted = `${limitedInput.slice(0, 4)}-${limitedInput.slice(4, 6)}-${limitedInput.slice(6, 8)}`;

      // 날짜 수동 파싱
      const parts = formatted.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);

      // 유효한 월(1-12), 일(1-31) 범위 확인
      const isValidRange = month >= 1 && month <= 12 && day >= 1 && day <= 31;

      if (isValidRange) {
        const dateObj = new Date(year, month - 1, day);

        // 실제 생성된 날짜가 입력한 날짜와 일치하는지 확인 (보정 여부 체크)
        const isActualValid =
          dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day;

        if (isActualValid) {
          setMonth(dateObj);
          setInvalidDate(false);
          onChange?.(dateObj, formatted);
        } else {
          // 유효하지 않은 날짜 (예: 2009-02-31)
          setInvalidDate(true);
          onChange?.(undefined, '');
        }
      } else {
        // 범위를 벗어난 날짜
        setInvalidDate(true);
        onChange?.(undefined, '');
      }
    } else {
      // 불완전한 입력일 때는 date를 undefined로, onChange에 빈 문자열 전달
      setInvalidDate(false);
      onChange?.(undefined, '');
    }
  };

  // 화면에 표시할 포맷된 값 (마스킹 없음)
  const displayValue = (() => {
    if (numericValue.length === 0) return '';

    if (mode === 'range') {
      // range 모드: 16자리 (YYYYMMDDYYYYMMDD)
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

  const widthMap: Partial<Record<FormItemWidth, string>> = {
    full: 'w-full',
    max: 'w-max',
    '2xs': 'w-[4rem]',
    xs: 'w-[8rem]',
    sm: 'w-[10rem]',
    md: 'w-[12rem]',
    lg: 'w-[14rem]',
    xl: 'w-[16rem]',
    '2xl': 'w-[18rem]',
  };

  const widthClass = (width && widthMap[width]) || '';

  const inlineWidthStyle = (() => {
    if (typeof width === 'string') {
      if (/^\d+(\.\d+)?$/.test(width)) return { width: `${width}rem` };
      if (/^\d+(\.\d+)?rem$/.test(width)) return { width };
    }
    return undefined;
  })();

  const sizeClass = size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]';
  const buttonSizeClass = size === 'lg' ? 'h-[2.8rem] w-[2.8rem]' : 'h-[2.5rem] w-[2.5rem]';

  // range 모드일 때 더 큰 너비
  // const rangeModeWidth = mode === 'range' ? 'w-[28rem]' : '';

  const baseStyle = `px-[0.8rem] py-[0.4rem] rounded-[0.4rem] border text-[1.3rem] font-normal box-border
    ${
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

  const focusClass = `
    ${
      error || invalidDate
        ? 'focus:border-[var(--color-input-border-error)]'
        : required
          ? 'focus:border-[var(--color-input-border-highlight-bold)]'
          : 'focus:border-[var(--color-input-border-hover)]'
    }
    focus:ring-1 focus:ring-[var(--color-gray-5)] focus:border-[0.2rem] focus:px-[0.7rem]`;

  const rangeSelected = selected && !Array.isArray(selected) && !(selected instanceof Date) ? selected : undefined;
  const singleSelected = selected instanceof Date ? selected : undefined;
  const multiSelected = Array.isArray(selected) ? selected : undefined;

  return (
    <div className="relative flex gap-1 items-center">
      {mode === 'range' ? (
        <>
          <input
            id={finalId}
            type="tel"
            value={rangeInput.from}
            placeholder="____-__-__"
            aria-invalid={error || invalidRange.from ? true : undefined}
            aria-describedby={error || invalidDate ? errorId : undefined}
            onChange={handleRangeInputChange('from')}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpen(true);
              }
              if (e.key === 'Escape') {
                e.preventDefault();
                setOpen(false);
              }
            }}
            className={`transition-[color,box-shadow] outline-none ${sizeClass} ${widthClass} ${baseStyle} ${hoverStyle} ${focusClass}`}
            style={inlineWidthStyle}
            data-size={size}
            data-width={width}
            ref={fromInputRef}
          />
          <Separator>-</Separator>
          <input
            type="tel"
            value={rangeInput.to}
            placeholder="____-__-__"
            aria-invalid={error || invalidRange.to ? true : undefined}
            aria-describedby={error || invalidDate ? errorId : undefined}
            onChange={handleRangeInputChange('to')}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpen(true);
              }
              if (e.key === 'Escape') {
                e.preventDefault();
                setOpen(false);
              }
            }}
            className={`transition-[color,box-shadow] outline-none ${sizeClass} ${widthClass} ${baseStyle} ${hoverStyle} ${focusClass}`}
            style={inlineWidthStyle}
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
          placeholder="____-__-__"
          required={required}
          aria-invalid={error || invalidDate ? true : undefined}
          aria-describedby={error || invalidDate ? errorId : undefined}
          onChange={handleDateChange}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setOpen(true);
            }
            if (e.key === 'Escape') {
              e.preventDefault();
              setOpen(false);
            }
          }}
          className={`transition-[color,box-shadow] outline-none ${sizeClass} ${widthClass} ${baseStyle} ${hoverStyle} ${focusClass}`}
          style={inlineWidthStyle}
          data-size={size}
          data-width={width}
        />
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={`${finalId}-button`}
            variant="none" onlyicon
            color="primary"
            aria-label="Select date"
            className={buttonSizeClass}
          >
            <CalendarIcon color="var(--color-icon-primary)" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0 border-(--color-border-gray-light)"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          {mode === 'range' ? (
            <Calendar
              mode="range"
              defaultMonth={rangeSelected?.from}
              selected={rangeSelected}
              onSelect={handleSelect}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              numberOfMonths={2}
              className="border-none [&_.rdp-cell_selected]:bg-[#FF5C2E] [&_.rdp-cell_selected]:text-white [&_.rdp-range_middle]:bg-[#FF5C2E33] [&_.rdp-day_range_start]:bg-[#FF5C2E] [&_.rdp-day_range_end]:bg-[#FF5C2E] [&_.rdp-day_range_start]:text-white [&_.rdp-day_range_end]:text-white"
              required={true}
            />
          ) : mode === 'multiple' ? (
            <Calendar
              mode="multiple"
              selected={multiSelected}
              onSelect={handleSelect}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              className="border-none [&_.rdp-cell_selected]:bg-[#FF5C2E] [&_.rdp-cell_selected]:text-white [&_.rdp-range_middle]:bg-[#FF5C2E33] [&_.rdp-day_range_start]:bg-[#FF5C2E] [&_.rdp-day_range_end]:bg-[#FF5C2E] [&_.rdp-day_range_start]:text-white [&_.rdp-day_range_end]:text-white"
              required={required}
            />
          ) : (
            <Calendar
              mode="single"
              selected={singleSelected}
              onSelect={handleSelect}
              captionLayout="dropdown"
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
