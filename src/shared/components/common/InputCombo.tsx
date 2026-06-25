/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '@/shared/lib/shadcn/utils';
import { Grid } from '@atoms';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';

function getRandomId(prefix = 'inputcombo-') {
  return prefix + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

type ComboOptionItem<TValue> = {
  value: TValue;
  label: React.ReactNode;
  [key: string]: unknown;
};
type ComboOptionValue<TValue> = TValue | ComboOptionItem<TValue>;

function isComboOptionItem<TValue>(opt: ComboOptionValue<TValue>): opt is ComboOptionItem<TValue> {
  return typeof opt === 'object' && opt !== null && 'value' in opt && 'label' in opt;
}

/**
 * InputCombo 컴포넌트의 Props 인터페이스입니다.
 */
interface InputComboProps<TValue> extends Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange' | 'variant'> {
  /** 자동완성에 노출할 옵션 목록 배열 (단순 값 배열 또는 { value, label } 형태 가능) */
  options: ComboOptionValue<TValue>[];
  /** 현재 입력 필드의 값 */
  value: TValue | string;
  /**
   * 입력값이 변경되거나 팝오버에서 옵션이 선택되었을 때 호출되는 콜백 함수
   * @param value 변경된 값
   * @param option 선택된 옵션의 상세 객체 (텍스트 입력 시에는 생략됨)
   */
  onChange: (value: TValue | string, option?: ComboOptionItem<TValue>) => void;
  /**
   * 컴포넌트의 스타일 형태
   * - `default`: 일반 테이블 구조 팝오버 목록
   * - `recommend`: 둥근 칩 버튼 그룹 형태 팝오버 목록
   * @default 'default'
   */
  variant?: 'default' | 'recommend';
  /** 입력창이 포커스되고 글자가 있을 때 'X' 클리어 버튼을 노출시킬지 여부 */
  clear?: boolean;
  /**
   * 입력 필드의 크기
   * - `lg`: 2.8rem (기본)
   * - `md`: 2.5rem
   * @default 'lg'
   */
  size?: 'md' | 'lg';
  /** 입력창 및 웹 접근성용 label 연결에 사용할 고유 ID (생략 시 자동 생성) */
  inputId?: string;
  /** 옵션 리스트 테이블에 적용할 추가 스타일 클래스 */
  className?: string;
  /** 옵션 목록을 그리드로 구성할 때의 열(column) 개수 */
  col?: number;
  /** 팝오버의 고정 너비 (기본은 입력 필드의 가로폭과 동일) */
  width?: number | string;
}

/**
 * InputCombo 컴포넌트는 Input과 Popover 자동완성 리스트 기능을 결합한 컴포넌트입니다.
 * 입력값에 맞춰 옵션을 필터링하고, 리스트 항목 선택 시 입력값을 편리하게 변경할 수 있도록 돕습니다.
 */
export function InputCombo<TValue = string>({
  options,
  value,
  width,
  variant = 'default',
  onChange,
  inputId,
  col = 1,
  clear,
  size = 'lg',
  className,
  ...restProps
}: InputComboProps<TValue>) {
  const [testId] = useState(() => inputId || getRandomId('inputcombo-input-'));
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(String(value));
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number; width: number }>();
  const [isFocused, setIsFocused] = useState(false);
  const [prevValue, setPrevValue] = useState<TValue | string | undefined>(value);

  const normalized = options.map((opt) => (isComboOptionItem(opt) ? opt : { value: opt, label: String(opt) }));

  // 콤보의 기능을 한가지로 통일하기 위해 필터링을 생략하고 항상 전체 리스트를 보여줍니다.
  const filtered = normalized;

  // value prop 변경 시 최신 상태로 동기화 (렌더 단계에서 동기화)
  if (value !== prevValue) {
    setPrevValue(value);
    setInputValue(String(value));
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    setOpen(true);
    setTimeout(() => {
      const el = document.querySelector(`input[data-comboid="${testId}"]`) as HTMLInputElement | null;
      if (el) {
        inputRef.current = el;
        const rect = el.getBoundingClientRect();
        setPopoverPos({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    }, 0);
    if (typeof restProps.onFocus === 'function') {
      restProps.onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setTimeout(() => {
      const active = document.activeElement;
      if (
        (!popoverRef.current || !popoverRef.current.contains(active)) &&
        (!inputRef.current || active !== inputRef.current)
      ) {
        setOpen(false);
        setHoveredIdx(null);
      }
    }, 100);
    if (typeof restProps.onBlur === 'function') {
      restProps.onBlur(e);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setOpen(true);
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    setPopoverPos({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
    if (typeof restProps.onClick === 'function') {
      restProps.onClick(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
    setOpen(true);
    setHoveredIdx(null);
  };

  const handleOptionClick = (opt: ComboOptionItem<TValue>) => {
    setInputValue(String(opt.value));
    onChange(opt.value, opt);
    setOpen(false);
    setHoveredIdx(null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || filtered.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHoveredIdx((prev) => (prev === null ? 0 : Math.min(prev + 1, filtered.length - 1)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHoveredIdx((prev) => (prev === null ? filtered.length - 1 : Math.max(prev - 1, 0)));
    } else if (e.key === 'Enter' && hoveredIdx !== null) {
      e.preventDefault();
      handleOptionClick(filtered[hoveredIdx]);
    } else if (e.key === 'Escape') {
      setOpen(false);
      setHoveredIdx(null);
    }
  };

  const isSelected = (optValue: TValue) => {
    return optValue === value;
  };

  const popoverStyle: React.CSSProperties | undefined = popoverPos
    ? {
        position: 'absolute',
        top: popoverPos.top,
        left: popoverPos.left,
        zIndex: 9999,
      }
    : undefined;

  if (variant === 'recommend') {
    return (
      <>
        <Input
          size={size}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          data-comboid={testId}
          clear={clear}
          isFocused={open || isFocused}
          width={width}
          {...restProps}
        />
        {open && normalized.length > 0 && popoverPos && typeof window !== 'undefined'
          ? typeof document !== 'undefined' && document.body
            ? ReactDOM.createPortal(
                <div
                  ref={popoverRef}
                  tabIndex={-1}
                  className="bg-white px-2.5 py-2 border border-[var(--color-gray-20)] shadow-md max-h-48 overflow-auto animate-fadein rounded-[0.6rem]"
                  style={popoverStyle}
                >
                  <Grid className="grid-cols-[1fr_1fr] gap-2">
                    {normalized.map((opt, idx) => {
                      const selected = isSelected(opt.value);
                      return (
                        <Button
                          variant={selected ? 'contained' : 'outlined'}
                          color={selected ? 'primary' : 'gray-light'}
                          className="rounded-full"
                          key={`${idx}-${String(opt.value)}`}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleOptionClick(opt)}
                          onMouseEnter={() => setHoveredIdx(idx)}
                        >
                          {opt.label}
                        </Button>
                      );
                    })}
                  </Grid>
                </div>,
                document.body
              )
            : null
          : null}
      </>
    );
  }
  return (
    <>
      <Input
        size={size}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        data-comboid={testId}
        clear={clear}
        isFocused={open || isFocused}
        width={width}
        {...restProps}
      />
      {open && filtered.length > 0 && popoverPos && typeof window !== 'undefined'
        ? typeof document !== 'undefined' && document.body
          ? ReactDOM.createPortal(
              <div
                ref={popoverRef}
                tabIndex={-1}
                className="bg-white px-2.5 py-2 border border-[var(--color-gray-20)] shadow-md max-h-48 overflow-auto animate-fadein rounded-[0.6rem]"
                style={popoverStyle}
              >
                <table
                  className={cn(
                    `[&_td]:px-2 [&_td]:py-1 [&_td]:whitespace-nowrap [&_td]:border [&_td]:border-[var(--color-gray-10)] [&_td]:rounded-sm`,
                    className
                  )}
                >
                  <tbody
                    className={cn(
                      col !== 1 ? `grid grid-cols-${col} [&_tr]:border-0 [&_tr]:-ml-[0.1rem] [&_tr]:-mt-[0.1rem]` : ''
                    )}
                  >
                    {filtered.map((opt, idx) => {
                      const selected = isSelected(opt.value);
                      return (
                        <tr
                          key={`${idx}-${String(opt.value)}`}
                          className={cn(
                            'cursor-pointer [&_td]:text-[1.3rem]',
                            'hover:[&_td]:bg-[var(--color-warning-10)]',
                            selected
                              ? '[&_td]:bg-[var(--color-warning-30)] [&_td]:font-bold [&_td]:text-[var(--color-primary-60)]'
                              : hoveredIdx === idx
                                ? '[&_td]:bg-[var(--color-warning-10)]'
                                : undefined
                          )}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleOptionClick(opt)}
                          onMouseEnter={() => setHoveredIdx(idx)}
                        >
                          {opt.label}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>,
              document.body
            )
          : null
        : null}
    </>
  );
}
