/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { type DateRange } from 'react-day-picker';
import { FormItemSize } from '@/shared/types/uiTypes';
import { ErrorMsg } from '@common/ErrorMsg';
import { CalendarIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Calendar } from '@uiux/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';

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

function isSameDay(d1: Date | undefined, d2: Date | undefined) {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
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
interface UIInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'min' | 'max'> {
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
  /** 퀵 기간 선택 옵션(당일, 1주일, 1개월, 3개월) 버튼 표시 여부 (mode가 range일 때만 동작) */
  options?: boolean;
  /** 시작일 선택 시 자동으로 설정될 종료일과의 간격 일수 (기본값: 7) */
  autoRangeDays?: number;

  /** 선택 가능한 최소 날짜 (포맷: YYYY-MM-DD 또는 Date 객체) */
  min?: string | Date;
  /** 선택 가능한 최대 날짜 (포맷: YYYY-MM-DD 또는 Date 객체) */
  max?: string | Date;
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
  required = false,
  readOnly = false,
  disabled = false,
  error = false,
  errorMsg = '입력은 필수입니다.',
  errorPs = 'bl',
  monthOnly = false,
  onMonthSelect,
  options = false,
  autoRangeDays = 0,
  min,
  max,
}: UIInputProps) {
  const autoClose = true;
  const autoRangeFix = false;
  const generatedId = React.useId();
  const finalId = id || generatedId;
  const errorId = React.useId();
  const fromInputRef = React.useRef<HTMLInputElement>(null);
  const toInputRef = React.useRef<HTMLInputElement>(null);

  const [open, setOpen] = React.useState(false);
  const [isSelectingEnd, setIsSelectingEnd] = React.useState(false);
  const [selected, setSelected] = React.useState<CalendarSelection>(initialValue ? new Date(initialValue) : undefined);
  const [month, setMonth] = React.useState<Date | undefined>(initialValue ? new Date(initialValue) : undefined);

  const minDate = React.useMemo(() => {
    if (!min) return undefined;
    return min instanceof Date ? min : new Date(min);
  }, [min]);

  const maxDate = React.useMemo(() => {
    if (!max) return undefined;
    return max instanceof Date ? max : new Date(max);
  }, [max]);

  const disabledDays = React.useMemo(() => {
    const rules: any[] = [];
    if (minDate) {
      rules.push({ before: minDate });
    }
    if (maxDate) {
      rules.push({ after: maxDate });
    }

    if (autoRangeDays > 0 && selected && !Array.isArray(selected) && !(selected instanceof Date)) {
      const from = selected.from;
      const to = selected.to;
      if (from && (!to || isSelectingEnd)) {
        const fromCopy = new Date(from);
        fromCopy.setHours(0, 0, 0, 0);

        rules.push({ before: fromCopy });

        const maxAllowed = new Date(fromCopy);
        maxAllowed.setDate(maxAllowed.getDate() + autoRangeDays - 1);
        rules.push({ after: maxAllowed });
      }
    }
    return rules.length > 0 ? rules : undefined;
  }, [minDate, maxDate, autoRangeDays, selected, isSelectingEnd]);
  const [numericValue, setNumericValue] = React.useState(initialValue?.replace(/\D/g, '') || '');
  const [rangeInput, setRangeInput] = React.useState({ from: '', to: '' });
  const [invalidRange, setInvalidRange] = React.useState({ from: false, to: false });
  const [invalidDate, setInvalidDate] = React.useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setIsSelectingEnd(false);
    }
  };

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

      const isFromValid = from && isValidDate(from);
      const isToValid = to && isValidDate(to);

      if (isFromValid && isToValid) {
        setSelected({ from, to });
        setMonth(from);
        setRangeInput({
          from: formatDate(from),
          to: formatDate(to),
        });
        setNumericValue(`${formatDate(from).replace(/\D/g, '')}${formatDate(to).replace(/\D/g, '')}`);
      } else if (isFromValid) {
        setSelected({ from, to: undefined });
        setMonth(from);
        setRangeInput({
          from: formatDate(from),
          to: '',
        });
        setNumericValue(formatDate(from).replace(/\D/g, ''));
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

  const handleSelect = (selectedValue: CalendarSelection, selectedDay?: Date) => {
    if (mode === 'range') {
      if (selectedDay) {
        if (autoRangeDays > 0 && !autoRangeFix) {
          const currentRangeSelected =
            selected && !Array.isArray(selected) && !(selected instanceof Date) ? selected : undefined;

          if (!isSelectingEnd || !currentRangeSelected || !currentRangeSelected.from) {
            const nextFrom = selectedDay;
            setSelected({ from: nextFrom, to: undefined });
            setRangeInput({ from: formatDate(nextFrom), to: '' });
            setNumericValue(formatDate(nextFrom).replace(/\D/g, ''));
            setIsSelectingEnd(true);
            onChange?.(nextFrom, formatDate(nextFrom));
            setInvalidDate(false);
            return;
          }

          if (isSelectingEnd && currentRangeSelected.from) {
            const fromDate = currentRangeSelected.from;
            const maxAllowed = new Date(fromDate);
            maxAllowed.setDate(maxAllowed.getDate() + autoRangeDays - 1);

            if (selectedDay < fromDate || selectedDay > maxAllowed) {
              const nextFrom = selectedDay;
              setSelected({ from: nextFrom, to: undefined });
              setRangeInput({ from: formatDate(nextFrom), to: '' });
              setNumericValue(formatDate(nextFrom).replace(/\D/g, ''));
              setIsSelectingEnd(true);
              onChange?.(nextFrom, formatDate(nextFrom));
              setInvalidDate(false);
              return;
            }

            const nextTo = selectedDay;
            setSelected({ from: fromDate, to: nextTo });
            setRangeInput({ from: formatDate(fromDate), to: formatDate(nextTo) });
            setNumericValue(`${formatDate(fromDate).replace(/\D/g, '')}${formatDate(nextTo).replace(/\D/g, '')}`);
            setIsSelectingEnd(false);
            onChange?.(nextTo, `${formatDate(fromDate)} ~ ${formatDate(nextTo)}`);
            setOpen(false);
            setInvalidDate(false);
            return;
          }
        }

        const offset = autoRangeDays ?? 7;

        if (autoRangeFix) {
          const nextFrom = selectedDay;
          const nextTo = new Date(nextFrom);
          nextTo.setDate(nextTo.getDate() + offset);

          setSelected({ from: nextFrom, to: nextTo });
          setRangeInput({ from: formatDate(nextFrom), to: formatDate(nextTo) });
          setNumericValue(`${formatDate(nextFrom).replace(/\D/g, '')}${formatDate(nextTo).replace(/\D/g, '')}`);
          setIsSelectingEnd(false);
          onChange?.(nextTo, `${formatDate(nextFrom)} ~ ${formatDate(nextTo)}`);

          setOpen(false);
          setInvalidDate(false);
          return;
        }

        const currentRangeSelected =
          selected && !Array.isArray(selected) && !(selected instanceof Date) ? selected : undefined;

        const fromDate = currentRangeSelected?.from;
        const toDate = currentRangeSelected?.to;

        // 1. 선택일(시작일) 다시 선택시 전체 초기화
        if (fromDate && isSameDay(selectedDay, fromDate)) {
          setSelected(undefined);
          setRangeInput({ from: '', to: '' });
          setNumericValue('');
          setIsSelectingEnd(false);
          onChange?.(undefined, '');
          setInvalidDate(false);
          return;
        }

        // 2. 종료일 선택 다시 선택시 종료일 초기화 및 종료일 대기 모드 전환
        if (toDate && isSameDay(selectedDay, toDate)) {
          setSelected({ from: fromDate, to: undefined });
          setRangeInput({ from: formatDate(fromDate), to: '' });
          setNumericValue(formatDate(fromDate).replace(/\D/g, ''));
          setIsSelectingEnd(true); // 종료일 선택 대기 상태로 전환
          onChange?.(fromDate, formatDate(fromDate));
          setInvalidDate(false);
          return;
        }

        // 1. 기존에 이미 기간 선택(from과 to 모두 존재)이 완료되었던 상태에서 세 번째 클릭이 들어온 경우 -> 무조건 새로운 시작일로 지정
        if (currentRangeSelected?.from && currentRangeSelected?.to && !isSelectingEnd) {
          const nextFrom = selectedDay;
          const nextTo = new Date(nextFrom);
          nextTo.setDate(nextTo.getDate() + offset);

          // 만약 자동으로 계산된 nextTo가 maxDate를 넘는다면 클램프
          if (maxDate && nextTo > maxDate) {
            nextTo.setTime(maxDate.getTime());
          }

          setSelected({ from: nextFrom, to: nextTo });
          setRangeInput({ from: formatDate(nextFrom), to: formatDate(nextTo) });
          setNumericValue(`${formatDate(nextFrom).replace(/\D/g, '')}${formatDate(nextTo).replace(/\D/g, '')}`);
          setIsSelectingEnd(true); // 종료일 선택 대기 상태로 전환
          onChange?.(nextTo, `${formatDate(nextFrom)} ~ ${formatDate(nextTo)}`);

          if (autoClose) setOpen(false);
          setInvalidDate(false);
          return;
        }

        // 2. 종료일 대기 상태이거나, 한쪽만 채워져 있는 경우
        if (isSelectingEnd && currentRangeSelected?.from) {
          const fromDate = currentRangeSelected.from;
          if (selectedDay < fromDate) {
            // 클릭한 날짜가 시작일보다 전인 경우 -> 새로운 시작일로 지정하고 종료일은 자동 +offset일 계산
            const nextFrom = selectedDay;
            const nextTo = new Date(nextFrom);
            nextTo.setDate(nextTo.getDate() + offset);

            setSelected({ from: nextFrom, to: nextTo });
            setRangeInput({ from: formatDate(nextFrom), to: formatDate(nextTo) });
            setNumericValue(`${formatDate(nextFrom).replace(/\D/g, '')}${formatDate(nextTo).replace(/\D/g, '')}`);
            setIsSelectingEnd(true); // 여전히 종료일 대기 상태
            onChange?.(nextTo, `${formatDate(nextFrom)} ~ ${formatDate(nextTo)}`);
          } else {
            // 클릭한 날짜가 시작일보다 같거나 후인 경우 -> 종료일로 지정하고 완료
            const nextTo = selectedDay;
            setSelected({ from: fromDate, to: nextTo });
            setRangeInput({ from: formatDate(fromDate), to: formatDate(nextTo) });
            setNumericValue(`${formatDate(fromDate).replace(/\D/g, '')}${formatDate(nextTo).replace(/\D/g, '')}`);
            setIsSelectingEnd(false); // 선택 완료
            onChange?.(nextTo, `${formatDate(fromDate)} ~ ${formatDate(nextTo)}`);
            setOpen(false);
          }
        } else {
          // 시작일 선택 단계
          const nextFrom = selectedDay;
          const nextTo = new Date(nextFrom);
          nextTo.setDate(nextTo.getDate() + offset);

          setSelected({ from: nextFrom, to: nextTo });
          setRangeInput({ from: formatDate(nextFrom), to: formatDate(nextTo) });
          setNumericValue(`${formatDate(nextFrom).replace(/\D/g, '')}${formatDate(nextTo).replace(/\D/g, '')}`);
          setIsSelectingEnd(true); // 다음 클릭은 종료일 선택
          onChange?.(nextTo, `${formatDate(nextFrom)} ~ ${formatDate(nextTo)}`);
        }
        if (autoClose) setOpen(false);
        setInvalidDate(false);
        return;
      }
    }

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

    // min, max 범위 검사 추가
    const isWithinRange = parsedDate
      ? (!minDate || parsedDate >= minDate) && (!maxDate || parsedDate <= maxDate)
      : true;

    const isInvalid = digits.length === 8 && (!parsedDate || !isWithinRange);
    setInvalidRange((prev) => {
      const next = { ...prev, [part]: isInvalid };
      setInvalidDate(next.from || next.to);
      return next;
    });

    const currentRange =
      selected && !Array.isArray(selected) && !(selected instanceof Date)
        ? selected
        : { from: undefined, to: undefined };

    // 만약 시작일이 완성되었고 종료일이 비어있다면 자동 입력 적용
    if (part === 'from' && parsedDate && digits.length === 8 && isWithinRange) {
      const offset = autoRangeDays ?? 7;
      const autoTo = new Date(parsedDate);
      autoTo.setDate(autoTo.getDate() + offset);

      // autoTo가 maxDate를 넘지 않도록 클램프
      if (maxDate && autoTo > maxDate) {
        autoTo.setTime(maxDate.getTime());
      }

      const autoToFormatted = formatDate(autoTo);

      setRangeInput({ from: formatted, to: autoToFormatted });
      setSelected({ from: parsedDate, to: autoTo });
      setNumericValue(`${digits}${autoToFormatted.replace(/\D/g, '')}`);
      setInvalidRange({ from: false, to: false });
      setInvalidDate(false);
      onChange?.(autoTo, `${formatted} ~ ${autoToFormatted}`);

      // 포커스 종료일로 이동
      toInputRef.current?.focus();
      return;
    }

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
          // min, max 범위 검사 추가
          const isWithinMin = !minDate || dateObj >= minDate;
          const isWithinMax = !maxDate || dateObj <= maxDate;

          if (isWithinMin && isWithinMax) {
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

  const inputStyle: React.CSSProperties | undefined = readOnly
    ? { backgroundColor: '#F4F4F4', border: '0.1rem solid #F4F4F4' }
    : undefined;

  const handleQuickSelect = (type: 'today' | 'week' | 'month' | '3months') => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const from = new Date(today);
    const to = new Date(today);

    if (type === 'week') {
      from.setDate(from.getDate() - 7);
    } else if (type === 'month') {
      from.setMonth(from.getMonth() - 1);
    } else if (type === '3months') {
      from.setMonth(from.getMonth() - 3);
    }

    const fromStr = formatDate(from);
    const toStr = formatDate(to);

    setSelected({ from, to });
    setRangeInput({ from: fromStr, to: toStr });
    setNumericValue(`${fromStr.replace(/\D/g, '')}${toStr.replace(/\D/g, '')}`);
    setInvalidRange({ from: false, to: false });
    setIsSelectingEnd(false);
    onChange?.(to, `${fromStr} ~ ${toStr}`);
    if (autoClose) setOpen(false);
  };

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
        />
      )}
      <Popover open={open} onOpenChange={handleOpenChange}>
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
              fromDate={minDate}
              toDate={maxDate}
              disabled={disabledDays}
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
              fromDate={minDate}
              toDate={maxDate}
              disabled={disabledDays}
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
              fromDate={minDate}
              toDate={maxDate}
              disabled={disabledDays}
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
              required={true}
              fromDate={minDate}
              toDate={maxDate}
              disabled={disabledDays}
              className="border-none [&_.rdp-cell_selected]:bg-[#FF5C2E] [&_.rdp-cell_selected]:text-white [&_.rdp-range_middle]:bg-[#FF5C2E33] [&_.rdp-day_range_start]:bg-[#FF5C2E] [&_.rdp-day_range_end]:bg-[#FF5C2E] [&_.rdp-day_range_start]:text-white [&_.rdp-day_range_end]:text-white"
            />
          )}
        </PopoverContent>
      </Popover>
      {mode === 'range' && options && (
        <div className="flex gap-[0.4rem] items-center shrink-0">
          <Button
            type="button"
            variant="outlined"
            color="gray-light"
            size={size}
            onClick={() => handleQuickSelect('today')}
            className="px-[0.8rem] min-w-0"
          >
            당일
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="gray-light"
            size={size}
            onClick={() => handleQuickSelect('week')}
            className="px-[0.8rem] min-w-0"
          >
            1주일
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="gray-light"
            size={size}
            onClick={() => handleQuickSelect('month')}
            className="px-[0.8rem] min-w-0"
          >
            1개월
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="gray-light"
            size={size}
            onClick={() => handleQuickSelect('3months')}
            className="px-[0.8rem] min-w-0"
          >
            3개월
          </Button>
        </div>
      )}
      {(error || invalidDate) && (
        <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
          {invalidDate && !error ? '유효하지 않은 날짜입니다.' : errorMsg}
        </ErrorMsg>
      )}
    </div>
  );
}
