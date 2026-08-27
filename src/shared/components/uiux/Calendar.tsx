/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';

import { cn } from '@/shared/lib/shadcn/utils';
import { ArrowIcon } from '@icons';
import { Button, buttonVariants } from '@uiux/Button';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
  monthOnly?: boolean;
  onMonthSelect?: (month: number) => void;
  /**
   * monthOnly 모드에서 월 클릭 시 호출됨
   * @param value { year: number; month: number }
   */
  onChange?: (value: { year: number; month: number }) => void;
  /**
   * monthOnly 모드에서 월 클릭 후 닫기용
   */
  onClose?: () => void;
  /**
   * 하단 푸터 영역(오늘, 초기화 버튼) 표시 여부
   * @default true
   */
  showFooter?: boolean;
  /**
   * 하단 초기화 버튼 표시 여부
   * @default true
   */
  showReset?: boolean;
  /**
   * 오늘 버튼 클릭 시 호출되는 콜백
   */
  onTodayClick?: () => void;
  /**
   * 초기화 버튼 클릭 시 호출되는 콜백
   */
  onResetClick?: () => void;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'none',
  formatters,
  components,
  monthOnly = false,
  onMonthSelect,
  showFooter = true,
  showReset = true,
  onTodayClick,
  onResetClick,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  // Dedicated month grid renderer for monthOnly mode (Figma style)
  // 연도별로 선택된 월을 기억하는 ref
  const monthMemoryRef = React.useRef<{ [year: number]: number | undefined }>({});
  const today = new Date();
  const initialYear = (props.month instanceof Date ? props.month : today).getFullYear();
  const [currentYear, setCurrentYear] = React.useState<number>(initialYear);
  // selectedMonth: 우선 메모리에서, 없으면 props.month에서 추론
  let selectedMonth = monthMemoryRef.current[currentYear];
  // 최초 렌더링에서만 props.month로 초기화 (useRef로 최초 렌더링 여부 관리)
  const didInitRef = React.useRef(false);
  if (
    !didInitRef.current &&
    selectedMonth === undefined &&
    props.month instanceof Date &&
    props.month.getFullYear() === currentYear
  ) {
    selectedMonth = props.month.getMonth() + 1;
    monthMemoryRef.current[currentYear] = selectedMonth;
    didInitRef.current = true;
  }
  const renderMonthOnlyGrid = () => {
    // Year range: 10 years before and after current year
    const yearOptions = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

    // 연도 변경 핸들러: 해당 연도에 저장된 월 복원
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newYear = Number(e.target.value);
      setCurrentYear(newYear);
      // 월 복원: monthMemoryRef.current[newYear]가 있으면 그 값, 없으면 undefined
      // (selectedMonth는 currentYear에 따라 자동으로 바뀜)
      props.onMonthChange?.(new Date(newYear, 0, 1));
    };

    // 이전/다음 연도 버튼 클릭 시 월 복원
    const handlePrevYear = () => {
      const newYear = currentYear - 1;
      setCurrentYear(newYear);
      props.onMonthChange?.(new Date(newYear, 0, 1));
    };
    const handleNextYear = () => {
      const newYear = currentYear + 1;
      setCurrentYear(newYear);
      props.onMonthChange?.(new Date(newYear, 0, 1));
    };

    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="mb-4 flex w-full items-center justify-between gap-3">
          <Button
            variant="outlined"
            color="gray-light"
            size="lg"
            only="icon"
            className="pointer-events-auto"
            onClick={handlePrevYear}
            data-role="month-prev"
          >
            <ArrowIcon color={'var(--color-primary-50)'} />
          </Button>
          <div className="w-[7.2rem] shrink-0">
            <NativeSelect aria-label="연도 선택" value={currentYear} onChange={handleYearChange} width="full" size="md">
              {yearOptions.map((year) => (
                <NativeSelectOption key={year} value={year}>
                  {year}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <Button
            variant="outlined"
            color="gray-light"
            size="lg"
            only="icon"
            className="pointer-events-auto"
            onClick={handleNextYear}
            data-role="month-next"
          >
            <ArrowIcon className="rotate-180" color={'var(--color-primary-50)'} />
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
            const isSelected = selectedMonth === month;

            // 월 비활성화 여부 검사
            let isMonthDisabled = false;
            if (props.fromDate) {
              const fromYear = props.fromDate.getFullYear();
              const fromMonth = props.fromDate.getMonth() + 1;
              if (currentYear < fromYear || (currentYear === fromYear && month < fromMonth)) {
                isMonthDisabled = true;
              }
            }
            if (props.toDate) {
              const toYear = props.toDate.getFullYear();
              const toMonth = props.toDate.getMonth() + 1;
              if (currentYear > toYear || (currentYear === toYear && month > toMonth)) {
                isMonthDisabled = true;
              }
            }

            return (
              <button
                key={month}
                type="button"
                disabled={isMonthDisabled}
                data-month={`${currentYear}-${String(month).padStart(2, '0')}`}
                data-currentMonth={
                  today.getFullYear() === currentYear && today.getMonth() + 1 === month ? 'true' : undefined
                }
                data-selected-month={isSelected ? 'true' : undefined}
                aria-label={`${currentYear}년 ${month}월`}
                className={cn(
                  'w-[2.6rem] h-[2.6rem] flex items-center rounded-full justify-center text-[1.4rem] hover:bg-[var(--color-gray-10)] transition-all relative',
                  isSelected && 'bg-[var(--color-primary-50)] text-[#fff]',
                  isMonthDisabled &&
                    'text-[var(--color-text-gray-lighter)] opacity-50 cursor-not-allowed hover:bg-transparent pointer-events-none'
                )}
                onClick={() => {
                  monthMemoryRef.current[currentYear] = month;
                  onMonthSelect?.(month);
                  if (props.onChange) props.onChange({ year: currentYear, month });
                  if (props.onClose) props.onClose();
                }}
              >
                {month}
                {/* {today.getFullYear() === currentYear && today.getMonth() + 1 === month && (
                  <span className="absolute bottom-[0] left-1/2 -translate-x-1/2 w-1 h-1 bg-[#5f2eff] rounded-full"></span>
                )} */}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const handleTodayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const today = new Date();
    if (props.onMonthChange) {
      props.onMonthChange(today);
    }
    if (onTodayClick) {
      onTodayClick();
    }
  };

  const handleResetClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onResetClick) {
      onResetClick();
    } else {
      const onSelectProp = (props as { onSelect?: (val: unknown) => void }).onSelect;
      if (onSelectProp) {
        if (props.mode === 'multiple') {
          onSelectProp([]);
        } else {
          onSelectProp(undefined);
        }
      }
    }
  };

  if (monthOnly) {
    return (
      <div className="flex flex-col">
        {renderMonthOnlyGrid()}
        {showFooter && (
          <div className="px-4">
            <div className="pt-2 border-t border-[var(--color-gray-20)] flex items-center justify-end gap-1 pb-4">
              <Button
                type="button"
                variant="contained"
                color="coolgray"
                size="md"
                className="min-w-[4.5rem]"
                onClick={(e) => {
                  const today = new Date();
                  setCurrentYear(today.getFullYear());
                  monthMemoryRef.current[today.getFullYear()] = today.getMonth() + 1;
                  props.onMonthChange?.(today);
                  handleTodayClick(e);
                }}
              >
                이번달
              </Button>
              {showReset && (
                <Button
                  type="button"
                  variant="outlined"
                  color="coolgray"
                  size="md"
                  onClick={(e) => {
                    monthMemoryRef.current = {};
                    handleResetClick(e);
                  }}
                >
                  초기화
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="cp-datepicker-calendar-wrapper flex flex-col">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn(
          'cp-datepicker-calendar bg-background group/calendar px-3 pt-3 pb-2 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
          String.raw`rtl:**:[.rdp-button_previous>svg]:rotate-180`,
          String.raw`rtl:**:[.rdp-button_next>svg]:rotate-180`,
          className
        )}
        captionLayout={captionLayout}
        formatters={{
          formatMonthDropdown: (date) => String(date.getMonth() + 1).padStart(2, '0'),
          // 필요시 캡션도 01, 02로: formatMonthCaption: (date) => String(date.getMonth() + 1).padStart(2, '0'),
          formatWeekdayName: (date) => {
            const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
            return weekdays[date.getDay()];
          },
          ...formatters,
        }}
        classNames={{
          root: cn('w-auto', defaultClassNames.root),
          months: cn('relative flex flex-col gap-4 md:flex-row', defaultClassNames.months),
          month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
          nav: cn(
            'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1 pointer-events-none',
            defaultClassNames.nav
          ),
          button_previous: cn(
            buttonVariants({ variant: buttonVariant }),
            'h-[2.8rem] w-[2.8rem] border! border-[var(--color-gray-20)]! select-none p-0! aria-disabled:opacity-50 pointer-events-auto hover:border-dashed hover:border-[var(--color-button-outlined-border-gray-hover)] hover:bg-[var(--color-button-outlined-surface-gray-hover)] border-[0.1rem]! border-solid!',
            defaultClassNames.button_previous
          ),
          button_next: cn(
            buttonVariants({ variant: buttonVariant }),
            'h-[2.8rem] w-[2.8rem] border! border-[var(--color-gray-20)]! select-none p-0! aria-disabled:opacity-50 pointer-events-auto hover:border-dashed hover:border-[var(--color-button-outlined-border-gray-hover)] hover:bg-[var(--color-button-outlined-surface-gray-hover)] border-[0.1rem]! border-solid!',
            defaultClassNames.button_next
          ),
          month_caption: cn(
            'flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]',
            defaultClassNames.month_caption
          ),
          dropdowns: cn(
            'flex h-[--cell-size] w-full items-center justify-center gap-1.5 font-medium flex-row-reverse',
            defaultClassNames.dropdowns
          ),
          dropdown_root: cn(
            'has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border h-[2.8rem] border-[var(--color-gray-20)]',
            defaultClassNames.dropdown_root
          ),
          dropdown: cn('bg-[#fff] absolute inset-0 opacity-0', defaultClassNames.dropdown),
          caption_label: cn(
            'select-none font-medium',
            captionLayout === 'label'
              ? 'text-sm'
              : '[&>svg]:text-muted-foreground flex h-full items-center gap-1 rounded-md pl-2 pr-1 text-[1.3rem] [&>svg]:size-3.5',
            defaultClassNames.caption_label
          ),
          table: 'w-full border-collapse',
          weekdays: cn('grid grid-cols-7 place-items-center w-full', defaultClassNames.weekdays),
          weekday: cn(
            'text-muted-foreground flex-1 select-none rounded-md text-[1.4rem] font-normal px-1',
            defaultClassNames.weekday
          ),
          week: cn('grid grid-cols-7 place-items-center w-full h-[3.2rem]', defaultClassNames.week),
          week_number_header: cn('w-[--cell-size] select-none', defaultClassNames.week_number_header),
          week_number: cn('text-muted-foreground select-none text-[0.8rem]', defaultClassNames.week_number),
          day: cn(
            'group/day relative h-full w-full select-none px-1 text-center grid place-items-center',
            defaultClassNames.day
          ),
          range_start: cn(defaultClassNames.range_start),
          range_middle: cn(defaultClassNames.range_middle),
          range_end: cn(defaultClassNames.range_end),
          today: cn('relative', defaultClassNames.today),
          outside: cn('text-muted-foreground aria-selected:text-muted-foreground', defaultClassNames.outside),
          disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
          hidden: cn('invisible', defaultClassNames.hidden),
          ...classNames,
        }}
        components={{
          Root: ({ className, rootRef, ...props }) => {
            return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
          },
          Chevron: ({ className, orientation, ...props }) => {
            if (orientation === 'left') {
              return <ArrowIcon color={'var(--color-primary-50)'} className={cn('', className)} {...props} />;
            }
            if (orientation === 'right') {
              return <ArrowIcon color={'var(--color-primary-50)'} className={cn('rotate-180', className)} {...props} />;
            }
            return <ChevronDownIcon className={cn('size-4', className)} {...props} />;
          },
          MonthCaption: ({ ...captionProps }) => {
            return (
              <div
                className="flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-1">{captionProps.children}</div>
              </div>
            );
          },
          DayButton: CalendarDayButton,
          WeekNumber: ({ children, ...props }) => {
            return (
              <td {...props}>
                <div className="flex size-[--cell-size] items-center justify-center text-center">{children}</div>
              </td>
            );
          },
          ...components,
        }}
        {...props}
      />
      {showFooter && (
        <div className="px-4">
          <div className="pt-2 border-t border-[var(--color-gray-20)] flex items-center justify-end gap-1 pb-4">
            <Button
              type="button"
              variant="contained"
              color="coolgray"
              size="md"
              onClick={handleTodayClick}
              className="min-w-[4.5rem]"
            >
              오늘
            </Button>
            {showReset && (
              <Button type="button" variant="outlined" color="coolgray" size="md" onClick={handleResetClick}>
                초기화
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const isToday = modifiers.today;
  const isOutside = modifiers.outside;

  // outside 일자인 경우(이전 달, 다음 달의 날짜) 선택 상태가 이중으로 보이지 않도록 필터링
  const isSelected =
    !isOutside && modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle;
  const isRangeStart = !isOutside && modifiers.range_start;
  const isRangeEnd = !isOutside && modifiers.range_end;
  const isRangeMiddle = !isOutside && modifiers.range_middle;

  const isSaturday = day.date.getDay() === 6;
  const isSunday = day.date.getDay() === 0;
  const isDisabled = modifiers.disabled;

  return (
    <button
      ref={ref}
      type="button"
      data-today={isToday ? 'true' : undefined}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={isSelected}
      data-range-start={isRangeStart}
      data-range-end={isRangeEnd}
      data-range-middle={isRangeMiddle}
      className={cn(
        'relative flex aspect-square h-[2.6rem] w-[2.6rem] flex-col gap-1 text-[1.4rem] leading-none',
        'hover:bg-[var(--color-element-gray-lighter)] rounded-full items-center justify-center',
        // Selected state (주황색 배경, 흰색 텍스트)
        isToday && 'bg-[#000]',
        isSelected && 'bg-[#ff5c2e] text-white hover:bg-[var(--color-element-primary)]',

        // Disabled state (회색 텍스트)
        isDisabled && 'text-[var(--color-text-gray-lighter)] opacity-50 cursor-not-allowed hover:bg-transparent',
        // Saturday (파란색)
        !isSelected && !isDisabled && isSaturday && 'text-[var(--color-text-information)]',
        // Sunday/dayoff (빨간색)
        !isSelected && !isDisabled && isSunday && 'text-[var(--color-text-danger)]',
        // Outside month
        isOutside && 'text-[var(--color-text-gray-lighter)]',
        // Range states
        'data-[range-middle=true]:bg-[var(--color-element-gray-lighter)] data-[range-middle=true]:text-accent-foreground',
        'data-[range-start=true]:bg-[#ff5c2e] data-[range-start=true]:text-white',
        'data-[range-end=true]:bg-[#ff5c2e] data-[range-end=true]:text-white',
        'data-[range-end=true]:rounded-full data-[range-middle=true]:rounded-full! data-[range-start=true]:rounded-full',
        defaultClassNames.day,
        className
      )}
      {...props}
    >
      {props.children}
      {/* Today indicator dot (오늘 날짜 표시 점) */}
      {/* {isToday && !isSelected && (
        <div className="absolute bottom-[0] left-1/2 -translate-x-1/2 w-1 h-1 bg-[#ff5c2e] rounded-full" />
      )} */}
    </button>
  );
}

export { Calendar, CalendarDayButton };
