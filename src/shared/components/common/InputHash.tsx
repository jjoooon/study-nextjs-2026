/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

// datalist + popover 기능의 InputCombo 컴포넌트
// 기존 Input 컴포넌트 활용
import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Typo, Grow, Gcol } from '@atoms';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';

// 고유 ID 생성을 위한 유틸
function getRandomId(prefix = 'inputcombo-') {
  return prefix + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

type ComboOption = string | { value: string; label: React.ReactNode };

interface InputComboProps extends Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange'> {
  options: ComboOption[];
  value?: string;
  onChange?: (value: string) => void;
  inputId?: string;
  width?: number | string;
}

export function InputHash({ options, value, width, onChange, inputId, ...restProps }: InputComboProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value ?? '');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number; width: number }>();
  const [comboId] = useState(() => inputId || getRandomId('inputcombo-input-'));

  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
    }
    if (value === undefined && inputValue !== '') {
      setInputValue('');
    }
    // eslint-disable-next-line
  }, [value]);

  // Input focus 시 popover 위치 계산 및 열기
  const handleFocus = () => {
    setOpen(true);
    setTimeout(() => {
      const el = document.querySelector(`input[data-comboid="${comboId}"]`) as HTMLInputElement | null;
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
  };

  // Input blur 시 popover 닫기 (즉시 닫힘)
  const handleBlur = () => {
    setOpen(false);
  };

  // 옵션 클릭 시 값 등록 및 popover 닫기
  const handleOptionClick = (opt: { value: string; label: React.ReactNode }) => {
    setInputValue(opt.value);
    onChange?.(opt.value);
    // Input에 blur를 강제로 발생시켜 popover가 무조건 닫히게 함
    // const el = document.querySelector(`input[data-comboid="${comboId}"]`) as HTMLInputElement | null;
    // el?.blur();
  };

  const popoverStyle: React.CSSProperties | undefined = popoverPos
    ? {
        position: 'absolute',
        top: popoverPos.top,
        left: popoverPos.left,
        zIndex: 9999,
      }
    : undefined;

  // 옵션 표준화
  const normalizedOptions = options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt));

  return (
    <>
      <Input
        value={value ?? ''}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => onChange?.(e.target.value)}
        autoComplete="off"
        data-comboid={comboId}
        width={width}
        className="font-normal"
        {...restProps}
      />
      {open && popoverPos && typeof window !== 'undefined' && typeof document !== 'undefined' && document.body
        ? ReactDOM.createPortal(
            <Gcol
              className="bg-white w-[25rem] p-1.5 border border-[var(--color-gray-20)] shadow-md animate-fadein rounded-[0.6rem]"
              style={popoverStyle}
              gap={1.5}
            >
              <Button variant={'outlined'} className="w-full">
                <Typo color="primary" className="gap-1 flex items-center">
                  <b>#</b>검색어 편집
                </Typo>
              </Button>
              <Grow className="flex-wrap gap-x-3 gap-y-0 max-h-[7.6rem] overflow-y-auto" placement="ss">
                {normalizedOptions.map((opt, idx) => (
                  <Button
                    variant="none"
                    key={String(opt.value) + '-' + idx}
                    className="cursor-pointer text-[1.3rem] px-0"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleOptionClick(opt)}
                  >
                    <Typo
                      color="gray"
                      className="gap-[0.2rem] flex items-center text-[var(--color-blue-gray-60)]"
                      weight={'bold'}
                    >
                      <span>#</span>
                      {opt.label}
                    </Typo>
                  </Button>
                ))}
              </Grow>
            </Gcol>,
            document.body
          )
        : null}
    </>
  );
}
