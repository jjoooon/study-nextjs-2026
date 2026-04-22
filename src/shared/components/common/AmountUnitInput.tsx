'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { agGridAutoScroll } from '@/shared/utils/agGridAutoScroll';
import { Typo, Gcol, Grow } from '@atoms';
import { PlusIcon, MinusIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { Popover, PopoverTrigger, PopoverContent } from '@uiux/Popover';

interface AmountUnitInputProps {
  value: string | number;
  onChange: (value: string | number) => void;
  onEnter?: () => void;
  inputRef?: (el: HTMLInputElement | null) => void;
}

export function AmountUnitInput({ value, onChange, onEnter, inputRef }: AmountUnitInputProps) {
  const [inputValue, setInputValue] = React.useState(value ?? '');
  const [open, setOpen] = React.useState(false);
  const [measuredWidth, setMeasuredWidth] = React.useState<number | undefined>(undefined);
  const [popoverSide, setPopoverSide] = React.useState<'top' | 'bottom' | 'left' | 'right' | undefined>(undefined);
  const triggerInputRef = React.useRef<HTMLInputElement>(null);
  const inlineInputRef = React.useRef<HTMLInputElement>(null);
  // open이 true가 되면 inline input에 포커스
  React.useEffect(() => {
    if (open && inlineInputRef.current) {
      inlineInputRef.current.focus();
    }
  }, [open]);

  React.useEffect(() => {
    if (value === '' || value === undefined || value === null) {
      setInputValue('');
    } else {
      setInputValue(String(value));
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, '');
    // 숫자만 입력되면 콤마포맷, 아니면 그대로
    if (/^\d*$/.test(raw)) {
      const num = Number(raw);
      if (!isNaN(num) && raw !== '') {
        const formatted = formatAmount(num);
        setInputValue(formatted);
        onChange(num); // 숫자만 전달
      } else {
        setInputValue('');
        onChange('');
      }
    } else {
      setInputValue(e.target.value);
      onChange(''); // 숫자가 아니면 빈 값 전달
    }
  };

  const handleOpen = (e: React.MouseEvent<HTMLInputElement>) => {
    const width = (e.target as HTMLInputElement).offsetWidth;
    setMeasuredWidth(width);
    setOpen(true);
    agGridAutoScroll();
  };

  // 금액 조정 함수
  // 숫자를 콤마포맷 문자열로 변환
  const formatAmount = (num: number) => {
    return num.toLocaleString();
  };
  const max = 20000;
  const min = 100;

  const handleAmountChange = (delta: number) => {
    // inputValue에서 콤마 제거 후 숫자 변환
    const current = Number((inputValue + '').replace(/,/g, '')) || 0;
    let next = current + delta;
    if (next < min) next = min;
    if (next > max) next = max;
    const formatted = formatAmount(next);
    setInputValue(formatted);
    onChange(next); // 숫자만 전달
  };

  const handleSetMax = () => {
    const formatted = formatAmount(max);
    setInputValue(formatted);
    onChange(max); // 숫자만 전달
  };
  const handleSetMin = () => {
    const formatted = formatAmount(min);
    setInputValue(formatted);
    onChange(min); // 숫자만 전달
  };

  // 엔터키 입력 시 onEnter 호출
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
      // onEnter 후(포커스 이동 후) 다음 tick에 스크롤 이동
      agGridAutoScroll();
    }
  };

  // PopoverContent의 side를 감지하는 핸들러
  const handlePopoverOpenAutoSide = (side: 'top' | 'bottom' | 'left' | 'right') => {
    setPopoverSide(side);
  };

  // side에 따라 Grow 위치 클래스 동적 결정
  let growClass = 'absolute -right-[1.2rem]';
  if (popoverSide === 'bottom') {
    growClass += ' -top-[4.3rem]';
  } else if (popoverSide === 'top') {
    growClass += ' -bottom-[4.3rem]';
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Grow className="relative h-full" data-pop="111">
        <PopoverTrigger asChild>
          <input
            ref={(el) => {
              triggerInputRef.current = el;
              if (inputRef) inputRef(el);
            }}
            value={
              inputValue && /^\d+$/.test(String(inputValue).replace(/,/g, ''))
                ? formatAmount(Number(String(inputValue).replace(/,/g, '')))
                : inputValue
            }
            onChange={handleInputChange}
            onClick={handleOpen}
            onMouseDown={(e) => e.preventDefault()}
            className="text-right cursor-pointer w-full h-full px-[0.8rem] text-[1.3rem]"
            onKeyDown={handleKeyDown}
          />
        </PopoverTrigger>
      </Grow>
      {open && (
        <PopoverContent
          className="border-[var(--color-gray-20)] p-3 rounded-[0.4rem] shadow-lg gap-2.5 w-[19.4rem]"
          align="end"
          motion="none"
          portalContainer={
            typeof window !== 'undefined'
              ? (document.querySelector('.ag-body-viewport') as HTMLElement | null)
              : undefined
          }
          ref={(el) => {
            if (el) {
              const side = el.getAttribute('data-side');
              if (side === 'top' || side === 'bottom' || side === 'left' || side === 'right') {
                handlePopoverOpenAutoSide(side);
              }
            }
          }}
        >
          <Gcol className="w-full gap-3" placement={'ss'}>
            <Grow className={cn('[&>div]:border-0!', growClass)}>
              <Input
                variant={'default'}
                type="number"
                value={inputValue ? Number(String(inputValue).replace(/,/g, '')) : ''}
                step="100"
                min={min}
                max={max}
                onChange={handleInputChange}
                className={cn(
                  'w-full border [&_input]:outline-[0.2rem] [&_input]:-outline-offset-[0.2rem] [&_input]:text-right [&_input]:tracking-[-0.03rem] [&_input]:[appearance:textfield] [&_input]:[&::-webkit-outer-spin-button]:appearance-none [&_input]:[&::-webkit-inner-spin-button]:appearance-none',
                  measuredWidth ? `w-[${measuredWidth / 10}rem]` : ''
                )}
                autoFocus
                onKeyDown={handleKeyDown}
              />
            </Grow>
            <Gcol className="gap-1.5" placement={'ss'}>
              <Grow className="gap-1.5" placement={'bwc'}>
                <Button
                  variant={'outlined'}
                  color={'gray-light'}
                  only={'icon'}
                  onClick={() => handleAmountChange(-100)}
                >
                  <MinusIcon color="var(--color-primary-50)" />
                </Button>
                <Input
                  variant={'default'}
                  value={inputValue}
                  size={'sm'}
                  className="text-right flex-1 w-[100%]"
                  commaAmount={true}
                  readOnly
                  after={'만원'}
                  width={'min'}
                />
                <Button variant={'outlined'} color={'gray-light'} only={'icon'} onClick={() => handleAmountChange(100)}>
                  <PlusIcon color="var(--color-primary-50)" className="translate-y-[0.1rem]" />
                </Button>
              </Grow>
              <Grow>
                <Button variant={'contained'} color={'secondary'} className="w-[8.4rem]" onClick={handleSetMin}>
                  최소 100만원
                </Button>
                <Button variant={'contained'} color={'primary'} className="w-[8.4rem]" onClick={handleSetMax}>
                  최대 2억
                </Button>
              </Grow>
              <Typo className="text-[var(--color-gray-50)]" icon={'ref'}>
                가입금액 입력단위:백만원
              </Typo>
            </Gcol>
          </Gcol>
        </PopoverContent>
      )}
    </Popover>
  );
}
