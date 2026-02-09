'use client';

import * as React from 'react';

import { Button } from '@/shared/components/uiux';
import { cn } from '@/shared/lib/shadcn/utils';

const arrowLeftIcon = 'http://localhost:3845/assets/2f33e3dd3ea7c2d630df1f5efc097d2a72631941.svg';
const arrowDownIcon = 'http://localhost:3845/assets/55934e31cf42a7c5e3791f00e013949c4db61808.svg';
const arrowRightIcon = 'http://localhost:3845/assets/9a224b4d8e594df0c69194b38dd70d900024c357.svg';
const dotIcon = 'http://localhost:3845/assets/bf26d8cb8e5c1bb0f4f27333f074118dc87be4ca.svg';

interface CalendarState {
  year: number;
  month: number;
  selectedDate: Date | null;
}

function Calendar({ className }: { className?: string }) {
  const [state, setState] = React.useState<CalendarState>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    selectedDate: new Date(),
  });

  const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month - 1, 1).getDay();

  const daysInMonth = getDaysInMonth(state.year, state.month);
  const firstDayOfMonth = getFirstDayOfMonth(state.year, state.month);
  const daysInPrevMonth = getDaysInMonth(state.year, state.month - 1);

  // Generate calendar days
  const calendarDays: (number | null)[] = [];

  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push(-(daysInPrevMonth - i));
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Next month days - only fill to complete the last week (7 days)
  const remainingDays = (7 - (calendarDays.length % 7)) % 7;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push(-(1000 + i));
  }

  const handlePrevMonth = () => {
    setState((prev) => {
      if (prev.month === 1) {
        return { ...prev, month: 12, year: prev.year - 1 };
      }
      return { ...prev, month: prev.month - 1 };
    });
  };

  const handleNextMonth = () => {
    setState((prev) => {
      if (prev.month === 12) {
        return { ...prev, month: 1, year: prev.year + 1 };
      }
      return { ...prev, month: prev.month + 1 };
    });
  };

  const handleToday = () => {
    const today = new Date();
    setState({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      selectedDate: today,
    });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prev) => ({ ...prev, year: parseInt(e.target.value) }));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prev) => ({ ...prev, month: parseInt(e.target.value) }));
  };

  const handleDayClick = (day: number) => {
    if (day > 0 && day <= daysInMonth) {
      const date = new Date(state.year, state.month - 1, day);
      setState((prev) => ({ ...prev, selectedDate: date }));
    }
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day > 0 &&
      day <= daysInMonth &&
      day === today.getDate() &&
      state.month === today.getMonth() + 1 &&
      state.year === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!state.selectedDate || day <= 0 || day > daysInMonth) return false;
    return (
      day === state.selectedDate.getDate() &&
      state.month === state.selectedDate.getMonth() + 1 &&
      state.year === state.selectedDate.getFullYear()
    );
  };

  const isSunday = (index: number) => index % 7 === 0;
  const isSaturday = (index: number) => index % 7 === 6;

  const getDayColor = (day: number, index: number) => {
    if (day <= 0) return 'text-[#b3b3b3]'; // Previous/next month
    if (isSelected(day)) return 'text-white';
    if (isSunday(index)) return 'text-[#e43939]'; // Red for Sunday
    if (isSaturday(index)) return 'text-[#e43939]'; // Red for Saturday
    return 'text-black';
  };

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div
      className={cn('border border-[#d8d8d8] rounded-lg bg-white p-4 flex flex-col gap-4', className)}
      data-name="day"
    >
      {/* Header */}
      <div className="flex gap-6 items-center">
        {/* Previous button */}
        <button
          onClick={handlePrevMonth}
          className="flex items-center justify-center w-7 h-7 border border-[#ccc] rounded-md bg-white hover:bg-gray-50"
          aria-label="Previous month"
        >
          <img alt="" className="w-2.5 h-2.5" src={arrowLeftIcon} />
        </button>

        {/* Year and Month selectors */}
        <div className="flex gap-4 flex-1">
          <select
            value={state.year}
            onChange={handleYearChange}
            className="flex-1 px-2 py-1 h-7 border border-[#ccc] rounded-sm text-xs font-normal bg-white cursor-pointer text-center"
          >
            {Array.from({ length: 10 }, (_, i) => state.year - 5 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={String(state.month).padStart(2, '0')}
            onChange={handleMonthChange}
            className="w-16 px-2 py-1 h-7 border border-[#ccc] rounded-sm text-xs font-normal bg-white cursor-pointer"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {String(month).padStart(2, '0')}
              </option>
            ))}
          </select>

          {/* Today button */}
          <button
            onClick={handleToday}
            className="px-2 py-1 h-7 border border-[#545454] rounded-md text-xs font-normal bg-white text-black hover:bg-gray-50"
          >
            오늘
          </button>
        </div>

        {/* Next button */}
        <button
          onClick={handleNextMonth}
          className="flex items-center justify-center w-7 h-7 border border-[#ccc] rounded-md bg-white hover:bg-gray-50"
          aria-label="Next month"
        >
          <img alt="" className="w-2.5 h-2.5" src={arrowRightIcon} />
        </button>
      </div>

      {/* Calendar */}
      <div className="flex flex-col gap-0">
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-0 place-items-center">
          {weekDays.map((day) => (
            <div
              key={day}
              className="flex items-center justify-center w-[2.6rem] h-[2.6rem] text-sm font-normal text-black"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-0 place-items-center">
          {calendarDays.map((day, index) => {
            const isOutsideMonth = day <= 0 || day > daysInMonth;
            const dayValue = Math.abs(day) % 1000;

            return (
              <button
                key={`${index}-${day}`}
                onClick={() => !isOutsideMonth && handleDayClick(dayValue)}
                disabled={isOutsideMonth}
                className={cn(
                  'flex items-center justify-center w-10 h-8 text-sm font-normal relative',
                  isSelected(dayValue) && !isOutsideMonth ? 'bg-[#ff5c2e] text-white rounded-full' : '',
                  !isOutsideMonth && !isSelected(dayValue) && getDayColor(dayValue, index),
                  isOutsideMonth && getDayColor(day, index),
                  !isOutsideMonth && 'hover:bg-gray-100'
                )}
              >
                {dayValue}
                {/* Dot indicator for events (e.g., day 26) */}
                {dayValue === 26 && !isOutsideMonth && (
                  <img alt="" className="absolute bottom-1 left-4 w-1 h-1" src={dotIcon} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { Calendar };
