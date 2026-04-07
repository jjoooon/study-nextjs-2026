'use client';

// datalist + popover 기능의 InputCombo 컴포넌트
// 기존 Input 컴포넌트 활용

import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '@/shared/lib/shadcn/utils';
import { Input } from '@uiux/Input';

// 고유 ID 생성을 위한 유틸
function getRandomId(prefix = 'inputcombo-') {
  return prefix + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

type ComboOption = string | { value: string; label: React.ReactNode };

interface InputComboProps extends Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange'> {
  options: ComboOption[];
  value: string;
  onChange: (value: string) => void;
  popoverPlacement?: 'bottom' | 'top';
  clear?: boolean;
  size?: 'md' | 'lg';
  inputId?: string; // 고유 id를 외부에서 지정 가능
  ulClassName?: string;
  col?: number; // 옵션 리스트의 컬럼 수 (기본 1)
}

export function InputCombo({
  options,
  value,
  onChange,
  popoverPlacement = 'bottom',
  inputId,
  col = 1,
  clear,
  size = 'lg',
  ulClassName,
  ...restProps
}: InputComboProps) {
  // 고유 data-comboid 생성 (컴포넌트 인스턴스마다, 외부에서 id 지정 가능)
  const [testId] = useState(() => inputId || getRandomId('inputcombo-input-'));
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  // inputRef는 Input 내부 input을 직접 참조하기 위해 사용
  const inputRef = useRef<HTMLInputElement | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number; width: number }>();
  // Input의 실제 focus 상태를 동기화
  const [isFocused, setIsFocused] = useState(false);
  // popoverRef 불필요 (Radix Popover 사용)

  // 옵션을 value/label로 통일
  const normalized = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : { value: opt.value, label: opt.label }
  );

  // 입력값에 따라 옵션 필터링 (value, label 모두에서 검색)
  const filtered = normalized.filter(
    (opt) =>
      opt.value.toLowerCase().includes(inputValue.toLowerCase()) ||
      (typeof opt.label === 'string' ? opt.label.toLowerCase().includes(inputValue.toLowerCase()) : false)
  );

  // input 값 외부 변경 반영
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // input 포커스/블러 관리
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    setOpen(true);
    // Input 내부의 실제 input 엘리먼트를 찾아서 ref에 할당
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
    // restProps.onFocus가 있으면 호출
    if (typeof restProps.onFocus === 'function') {
      restProps.onFocus(e);
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setTimeout(() => {
      const active = document.activeElement;
      // inputRef, popoverRef 모두에 포커스가 없을 때만 닫기
      if (
        (!popoverRef.current || !popoverRef.current.contains(active)) &&
        (!inputRef.current || active !== inputRef.current)
      ) {
        setOpen(false);
        setHoveredIdx(null);
      }
    }, 100);
    // restProps.onBlur가 있으면 호출
    if (typeof restProps.onBlur === 'function') {
      restProps.onBlur(e);
    }
  };

  // input 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
    setOpen(true);
    setHoveredIdx(null);
  };

  // 리스트 클릭 처리
  const handleOptionClick = (opt: { value: string; label: React.ReactNode }) => {
    setInputValue(opt.value);
    onChange(opt.value);
    setOpen(false);
    setHoveredIdx(null);
    inputRef.current?.focus();
  };

  // 키보드 네비게이션
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

  // popover 위치 스타일 (absolute + body portal)
  const popoverStyle: React.CSSProperties | undefined = popoverPos
    ? {
        position: 'absolute',
        top: popoverPos.top,
        left: popoverPos.left,
        // width: popoverPos.width,
        zIndex: 9999,
      }
    : undefined;

  return (
    <div className={'relative ' + (restProps.className ?? '')}>
      <Input
        size={size}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        data-comboid={testId}
        clear={clear}
        isFocused={open || isFocused}
        {...restProps}
      />
      {open && filtered.length > 0 && popoverPos && typeof window !== 'undefined'
        ? typeof document !== 'undefined' && document.body
          ? // body portal로 렌더링
            ReactDOM.createPortal(
              <div
                ref={popoverRef}
                tabIndex={-1}
                className="bg-white px-2.5 py-2 border border-[var(--color-gray-20)] shadow-md max-h-48 overflow-auto animate-fadein rounded-[0.6rem]"
                style={popoverStyle}
              >
                <table
                  className={cn(
                    `[&_td]:px-2 [&_td]:py-1 [&_td]:whitespace-nowrap [&_td]:border [&_td]:border-[var(--color-gray-10)] [&_td]:rounded-sm`,
                    ulClassName
                  )}
                >
                  <tbody
                    className={cn(
                      col !== 1 ? `grid grid-cols-${col} [&_tr]:border-0 [&_tr]:-ml-[0.1rem] [&_tr]:-mt-[0.1rem]` : ''
                    )}
                  >
                    {filtered.map((opt, idx) => (
                      <tr
                        key={opt.value}
                        className={cn(
                          'cursor-pointer [&_td]:text-[1.3rem]',
                          'hover:[&_td]:bg-[var(--color-warning-10)]',
                          hoveredIdx === idx ? '[&_td]:bg-[var(--color-warning-10)]' : undefined
                        )}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleOptionClick(opt)}
                        onMouseEnter={() => setHoveredIdx(idx)}
                      >
                        {opt.label}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>,
              document.body
            )
          : null
        : null}
    </div>
  );
}
