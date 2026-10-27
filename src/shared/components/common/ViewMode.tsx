/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useId } from 'react';

export type ViewModeVariant = 'default' | 'secondary' | 'box';

export interface ViewModeProps {
  id?: string;
  state?: boolean;
  label?: [string, string];
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  variant?: ViewModeVariant;
  className?: string;
}

export const ViewMode = ({
  id,
  state = true,
  label,
  onChange,
  disabled = false,
  variant = 'default',
  className = '',
}: ViewModeProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isSecondary = variant === 'secondary' || variant === 'box';

  const labelClassName = isSecondary
    ? `relative min-h-[2rem] rounded-[0.2rem] translate-[0.1rem] flex justify-center items-center gap-0 z-1 ${
        disabled ? 'bg-[var(--color-gray-5)] rounded-[0.6rem]' : 'bg-transparent cursor-pointer'
      }`
    : `relative h-[2.8rem] p-[0.1rem] rounded-full border bg-white border-[var(--color-gray-15)] flex justify-center items-center gap-0 ${
        disabled ? '' : 'cursor-pointer'
      }`;

  const itemBaseClass = isSecondary
    ? `h-[2rem] leading-1 flex items-center px-1 rounded-[0.2rem] text-[1.1rem] tracking-[-0.08rem] whitespace-nowrap`
    : 'rounded-full flex items-center pl-1 pr-[0.6rem] h-full text-[1.1rem] tracking-[-0.08rem] whitespace-nowrap';

  const activeItemClass = isSecondary
    ? `text-[var(--color-gray-0)] font-bold ${disabled ? 'bg-[var(--color-blue-gray-50)]' : 'bg-[var(--color-secondary-50)]'}`
    : 'text-[var(--color-gray-0)] bg-gradient-to-r from-[#ff5c2e] to-[#ffb800] font-bold';

  const inactiveItemClass = isSecondary
    ? `bg-transparent font-normal ${disabled ? 'text-[var(--color-gray-30)]' : 'text-[var(--color-gray-100)]'}`
    : 'text-[var(--color-gray-50)] bg-transparent font-normal';

  const isFirstActive = state;
  const isSecondActive = !state;

  return (
    <div
      className={`flex items-center cp-viewmode relative ${
        isSecondary ? 'cp-viewmode-secondary' : 'cp-viewmode-default'
      } ${className}`.trim()}
    >
      <input
        type="checkbox"
        id={inputId}
        className="a11y-hidden"
        checked={!state}
        disabled={disabled}
        onChange={() => onChange?.(!state)}
      />
      <label htmlFor={inputId} className={labelClassName}>
        <span className={`peer-1 ${itemBaseClass} ${isFirstActive ? activeItemClass : inactiveItemClass}`}>
          {label?.[0] ?? '간편'}
        </span>
        <span className={`peer-2 ${itemBaseClass} ${isSecondActive ? activeItemClass : inactiveItemClass}`}>
          {label?.[1] ?? '상세'}
        </span>
      </label>
      {isSecondary && !disabled && (
        <span className="absolute w-full h-full border z-0 border-[var(--color-gray-20)] rounded-[0.2rem] top-[0.1rem] left-[0.1rem] pointer-events-none"></span>
      )}
    </div>
  );
};
