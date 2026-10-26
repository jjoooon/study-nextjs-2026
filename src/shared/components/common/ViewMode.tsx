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
    ? `relative min-h-[1.8rem] p-[0.3rem] rounded-[0.2rem] bg-[var(--color-secondary-5)] translate-[0.1rem] flex justify-center items-center gap-0 ${
        disabled ? '' : 'cursor-pointer'
      }
        [&>.peer-1]:text-[var(--color-gray-0)]
        [&>.peer-1]:bg-[var(--color-secondary-50)]
        [&>.peer-1]:font-bold
        peer-checked:[&>.peer-1]:bg-[var(--color-secondary-5)]
        peer-checked:[&>.peer-1]:font-normal
        peer-checked:[&>.peer-1]:text-[var(--color-gray-100)]
        peer-checked:[&>.peer-1]:text-normal

        peer-checked:[&>.peer-2]:text-[var(--color-gray-0)]
        peer-checked:[&>.peer-2]:font-bold
        peer-checked:[&>.peer-2]:bg-[var(--color-secondary-50)]`
    : `relative h-[2.8rem] p-[0.1rem] rounded-full border bg-white border-[var(--color-gray-15)] flex justify-center items-center gap-0 ${
        disabled ? '' : 'cursor-pointer'
      }  
        [&>.peer-1]:text-[var(--color-gray-0)] 
        [&>.peer-1]:bg-gradient-to-r 
        [&>.peer-1]:from-[#ff5c2e] 
        [&>.peer-1]:to-[#ffb800] 
        [&>.peer-1]:font-bold
        peer-checked:[&>.peer-1]:!bg-none 
        peer-checked:[&>.peer-1]:font-normal 
        peer-checked:[&>.peer-1]:text-[var(--color-gray-50)] 
        peer-checked:[&>.peer-1]:text-normal 
        
        peer-checked:[&>.peer-2]:text-[var(--color-gray-0)] 
        peer-checked:[&>.peer-2]:font-bold 
        peer-checked:[&>.peer-2]:bg-gradient-to-r 
        peer-checked:[&>.peer-2]:from-[#ff5c2e] 
        peer-checked:[&>.peer-2]:to-[#ffb800]`;

  const itemClassName = isSecondary
    ? 'h-[1.8rem] leading-1 flex items-center px-1 rounded-[0.3rem] text-[1.1rem] text-[var(--color-gray-100)] tracking-[-0.08rem] whitespace-nowrap'
    : 'rounded-full flex items-center pl-1 pr-[0.6rem] h-full text-[1.1rem] text-[var(--color-gray-50)] tracking-[-0.08rem] !whitespace-nowrap';

  return (
    <div
      className={`flex items-center cp-viewmode ${
        isSecondary ? 'cp-viewmode-secondary' : 'cp-viewmode-default'
      } ${className}`.trim()}
    >
      <input
        type="checkbox"
        id={inputId}
        className="peer a11y-hidden"
        checked={!state}
        disabled={disabled}
        onChange={() => onChange?.(!state)}
      />
      <label htmlFor={inputId} className={labelClassName}>
        <span className={`peer-1 ${itemClassName}`}>{label?.[0] ?? '간편'}</span>
        <span className={`peer-2 ${itemClassName}`}>{label?.[1] ?? '상세'}</span>
        {/* <b className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#ff5c2e] to-[#ffb800] shadow-[0rem_.2rem_.4rem_0rem_rgba(0,0,0,0.08)] absolute z-0 w-[3rem] h-[2.4rem] left-[.1rem] transition-left duration-300"></b> */}
      </label>
    </div>
  );
};
