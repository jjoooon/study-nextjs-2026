'use client';

import * as React from 'react';
import { Button, Input,
  Popover, PopoverTrigger, PopoverContent, PopoverAnchor
 } from '@/shared/components/uiux';
import { Typo, Gcol, Grow } from '@/shared/components/common';
import { CloseIcon } from '@/shared/components/icons';
 
interface AmountUnitInputProps {
  value: string | number;
  onChange: (value: string | number) => void;
  onEnter?: () => void;
  inputRef?: (el: HTMLInputElement | null) => void;
}

export function AmountUnitInput({
  value,
  onChange,
  onEnter,
  inputRef,
}: AmountUnitInputProps) {
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
    setInputValue(value ?? '');
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (e: React.MouseEvent<HTMLInputElement>) => {
    const width = (e.target as HTMLInputElement).offsetWidth;
    setMeasuredWidth(width);
    setOpen(true);
  };

  // 금액 조정 함수
  // 숫자를 콤마포맷 문자열로 변환
  const formatAmount = (num: number) => {
    return num.toLocaleString();
  };

  const handleAmountChange = (delta: number) => {
    // inputValue에서 콤마 제거 후 숫자 변환
    const current = Number((inputValue + '').replace(/,/g, '')) || 0;
    const next = current + delta;
    const formatted = formatAmount(next);
    setInputValue(formatted);
    onChange(formatted);
  };

  const handleSetMax = () => {
    const max = 10000; // 예시 최대값, 실제 값은 필요에 따라 조정
    const formatted = formatAmount(max);
    setInputValue(formatted);
    onChange(formatted);
  };
  const handleSetMin = () => {
    const min = 0; // 예시 최소값, 실제 값은 필요에 따라 조정
    const formatted = formatAmount(min);
    setInputValue(formatted);
    onChange(formatted);
  };


  // 엔터키 입력 시 onEnter 호출
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  // PopoverContent의 side를 감지하는 핸들러
  const handlePopoverOpenAutoSide = (side: 'top' | 'bottom' | 'left' | 'right') => {
    console.log('Popover opened on side:', side);
    setPopoverSide(side);
  };

  // side에 따라 Grow 위치 클래스 동적 결정
  let growClass = 'absolute left-[-1.6rem]';
  if (popoverSide === 'bottom') {
    growClass += ' -top-[4.8rem]';
  } else if (popoverSide === 'top') {
    growClass += ' -bottom-[4.6rem]';
  }

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <Grow className="releative">
        <PopoverTrigger asChild>
          <input
            ref={el => {
              triggerInputRef.current = el;
              if (inputRef) inputRef(el);
            }}
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleOpen}
            onMouseDown={e => e.preventDefault()}
            className="text-right cursor-pointer mt-[0.2rem] w-full"
            onKeyDown={handleKeyDown}
          />
        </PopoverTrigger>
      </Grow>
      {open && (
        <PopoverContent
          className="w-[29rem] "
          align="start"
          motion="none"
          portalContainer={typeof window !== 'undefined' ? document.querySelector('.ag-body-viewport') as HTMLElement | null : undefined}
          ref={el => {
            if (el) {
              const side = el.getAttribute('data-side');
              if (side === 'top' || side === 'bottom' || side === 'left' || side === 'right') {
                handlePopoverOpenAutoSide(side);
              }
            }
          }}
        >
          <Gcol className="w-full gap-3" placement="ss">
            <Grow className="w-full gap-3" placement="bws">
              <Typo variant="heading-sm">가입한도 인수단위(5만)</Typo>
              {/* <Button variant="none" only="icon" color="gray" size="sm" onClick={handleClose}>
                <CloseIcon />
              </Button> */}
            </Grow>
            <Grow className={growClass}>
              <Input
                variant="default"
                value={inputValue}
                onChange={handleInputChange}
                size="sm"
                className="text-right"
                formatType="amount"
                autoFocus
                width={measuredWidth ? `${measuredWidth / 10}rem` : undefined}
                onKeyDown={handleKeyDown}
              />
            </Grow>
            <Gcol className="gap-2.5">
              <Grow className="gap-1">
                <Button variant="contained" color="gray" className="w-[4.8rem]" onClick={() => handleAmountChange(5)}>
                  +5만
                </Button>
                <Button variant="outlined" color="primary" className="w-[7rem] font-bold tracking-[0]" onClick={() => handleAmountChange(1000)}>
                  +1000만
                </Button>
                <Button variant="outlined" color="primary" className="w-[7rem] font-bold tracking-[0]" onClick={() => handleAmountChange(5000)}>
                  +5000만
                </Button>
                <Button variant="outlined" color="primary" className="w-[4.8rem]" onClick={handleSetMax}>
                  최대
                </Button>
              </Grow>
              <Grow className="gap-1">
                <Button variant="outlined" color="gray" className="w-[4.8rem]" onClick={() => handleAmountChange(-5)}>
                  -5만
                </Button>
                <Button variant="outlined" color="primary" className="w-[7rem] font-bold tracking-[0]" onClick={() => handleAmountChange(-1000)}>
                  -1000만
                </Button>
                <Button variant="outlined" color="primary" className="w-[7rem] font-bold tracking-[0]" onClick={() => handleAmountChange(-5000)}>
                  -5000만
                </Button>
                <Button variant="outlined" color="primary" className="w-[4.8rem]" onClick={handleSetMin}>
                  최소
                </Button>
              </Grow>
            </Gcol>
          </Gcol>
        </PopoverContent>
      )}
    </Popover>
  );
}
