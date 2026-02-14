'use client';

import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';

import { ArrowIcon } from '@/shared/components/icons';
import { Button, buttonVariants } from '@/shared/components/uiux';
import { cn } from '@/shared/lib/shadcn/utils';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'none',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
        formatWeekdayName: (date) => {
          const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
          return weekdays[date.getDay()];
        },
        ...formatters,
      }}
      classNames={{
        root: cn('w-auto p-4', defaultClassNames.root),
        months: cn('relative flex flex-col gap-4 md:flex-row', defaultClassNames.months),
        month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1 pointer-events-none',
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'h-[2.8rem] w-[2.8rem] border border-[var(--color-input-border)] select-none p-0! aria-disabled:opacity-50 pointer-events-auto hover:border-dashed hover:border-[var(--color-button-outlined-border-gray-hover)] hover:bg-[var(--color-button-outlined-surface-gray-hover)]',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'h-[2.8rem] w-[2.8rem] border border-[var(--color-input-border)] select-none p-0! aria-disabled:opacity-50 pointer-events-auto hover:border-dashed hover:border-[var(--color-button-outlined-border-gray-hover)] hover:bg-[var(--color-button-outlined-surface-gray-hover)]',
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
          'has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border h-[2.8rem] border-[var(--color-input-border)]',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('bg-popover absolute inset-0 opacity-0', defaultClassNames.dropdown),
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
          'group/day relative h-full w-full select-none px-1 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md grid place-items-center',
          defaultClassNames.day
        ),
        range_start: cn('bg-accent rounded-l-md', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('bg-accent rounded-r-md', defaultClassNames.range_end),
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
            return <ArrowIcon className={cn('', className)} {...props} />;
          }

          if (orientation === 'right') {
            return <ArrowIcon className={cn('rotate-180', className)} {...props} />;
          }

          return <ChevronDownIcon className={cn('size-4', className)} {...props} />;
        },
        MonthCaption: ({ ...captionProps }) => {
          const { onMonthChange } = props as React.ComponentProps<typeof DayPicker> & {
            onMonthChange?: (date: Date) => void;
          };
          const today = new Date();

          const handleTodayClick = () => {
            if (onMonthChange) {
              onMonthChange(today);
            }
          };

          return (
            <div
              className="flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-1">
                {captionProps.children}
                {onMonthChange && (
                  <Button
                    variant="outlined"
                    color="gray"
                    size="md"
                    className="font-[1.3rem]"
                    onClick={handleTodayClick}
                  >
                    오늘
                  </Button>
                )}
              </div>
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
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const isToday = modifiers.today;
  const isSelected = modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle;
  const isSaturday = day.date.getDay() === 6;
  const isSunday = day.date.getDay() === 0;
  const isDisabled = modifiers.disabled;
  const isOutside = modifiers.outside;

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={isSelected}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'relative flex aspect-square h-[2.6rem] w-[2.6rem] flex-col gap-1 text-[1.4rem] leading-none',
        'hover:bg-[var(--color-element-gray-lighter)] rounded-full items-center justify-center',
        // Selected state (주황색 배경, 흰색 텍스트)
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
      {isToday && !isSelected && (
        <div className="absolute bottom-[0] left-1/2 -translate-x-1/2 w-1 h-1 bg-[#ff5c2e] rounded-full" />
      )}
    </button>
  );
}

export { Calendar, CalendarDayButton };
