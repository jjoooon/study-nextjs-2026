'use client';

import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Grow } from '@atoms';
import { ErrorMsg } from '@common/ErrorMsg';
import { InputClearIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';

export interface InputTagProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string[];
  variant?: 'default' | 'box-line';
  onChange?: (value: string[]) => void;
  placeholder?: string;
  maxTags?: number; // 최대 태그 수 제한 (옵션)
  error?: boolean;
  errorMsg?: string;
  errorPs?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
}

const InputTag = React.forwardRef<HTMLInputElement, InputTagProps>(
  (
    {
      className,
      value = [],
      onChange,
      placeholder = '텍스트 영역입니다.',
      maxTags,
      error,
      errorMsg,
      errorPs,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);
    const errorId = React.useId();
    // 내부 input 요소에 대한 ref
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Enter, 쉼표(,) 입력 시 태그 추가 로직
    const addTag = (tagContent: string) => {
      const trimmedTag = tagContent.trim();

      // 빈 값, 중복값, 최대 태그 수 초과 시 추가하지 않음
      if (!trimmedTag || value.includes(trimmedTag)) return;
      if (maxTags && value.length >= maxTags) return;

      const newTags = [...value, trimmedTag];
      onChange?.(newTags); // 부모에게 변경된 상태 전달
      setInputValue(''); // 입력창 초기화
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
        e.preventDefault(); // 기본 동작(줄바꿈 등) 방지
        addTag(inputValue);
      } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
        // 입력창이 비어있고 Backspace 누르면 마지막 태그 삭제
        removeTag(value.length - 1);
      }
    };

    const removeTag = (indexToRemove: number) => {
      const newTags = value.filter((_, index) => index !== indexToRemove);
      onChange?.(newTags);
    };

    // 전체 div 영역 클릭 시 내부 input에 포커스 부여
    const handleDivClick = () => {
      inputRef.current?.focus();
    };

    return (
      <Grow
        placement="ss"
        variant={variant}
        onClick={handleDivClick}
        // 중요: 여기가 shadcn Input의 포커스 스타일을 흉내내는 부분입니다.
        className={cn(
          'flex flex-wrap',
          error
            ? 'border-[var(--color-danger-50)] bg-[var(--color-danger-5)] outline-[0.2rem] outline-[var(--color-danger-50)] -outline-offset-[0.2rem] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.10)]'
            : 'border-[var(--color-gray-20)]',
          className
        )}
      >
        {/* 생성된 태그(Badge) 목록 */}
        {value.map((tag, index) => (
          <Badge
            key={`${tag}-${index}`}
            variant="contained"
            color="gray"
            className="gap-1 px-1 py-0.5 text-[1.2rem] font-bold"
          >
            {tag}
            <Button
              type="button"
              variant={'none'}
              size={'sm'}
              only={'icon'}
              className="w-[1.4rem]! h-[1.4rem]! p-0 "
              onClick={(e) => {
                e.stopPropagation(); // div 클릭 이벤트 전파 방지
                removeTag(index);
              }}
              aria-label={`Remove ${tag} tag`}
            >
              <InputClearIcon color={'var(--color-blue-gray-50)'} />
            </Button>
          </Badge>
        ))}

        {/* 실제 입력바 */}
        <input
          {...props}
          ref={inputRef} // 컴포넌트 외부 ref는 무시하고 내부 ref 사용 (div 클릭 포커스 때문)
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder} // 태그가 하나라도 있으면 placeholder 숨김
          // Input 스타일 리셋
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm disabled:cursor-not-allowed disabled:opacity-50"
          // 태그 최대 개수 도달 시 입력 막기
          disabled={maxTags ? value.length >= maxTags : false}
        />

        {error && (
          <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
            {errorMsg}
          </ErrorMsg>
        )}
      </Grow>
    );
  }
);

InputTag.displayName = 'InputTag';

export { InputTag };
