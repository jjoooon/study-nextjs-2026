/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Grow } from '@atoms';
import { InputClearIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { ErrorMsg } from '@common/ErrorMsg';

/**
 * InputTag 컴포넌트의 Props 인터페이스입니다.
 */
export interface InputTagProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  /** 현재 입력되어 등록된 태그 문자열 배열 */
  value?: string[];
  /**
   * 컴포넌트 루트 컨테이너 스타일 변형
   * - `default`: 기본 박스 스타일
   * - `box-line`: 테두리 라인이 강조되는 박스 스타일
   * @default 'default'
   */
  variant?: 'default' | 'box-line';
  /** 태그 목록이 추가되거나 제거되는 등 변경되었을 때 호출되는 콜백 함수 */
  onChange?: (value: string[]) => void;
  /** 입력 필드에 표시할 플레이스홀더 (태그가 추가되면 자동으로 사라짐) */
  placeholder?: string;
  /** 최대 입력 및 등록할 수 있는 태그의 개수 제한 */
  maxTags?: number;
  /** 에러 상태 표시 여부 */
  error?: boolean;
  /** 에러 시 렌더링할 에러 메시지 내용 */
  errorMsg?: string;
  /**
   * 에러 메시지가 표시될 툴팁 위치
   * - `tl`: Top Left (상단 좌측)
   * - `tc`: Top Center (상단 중앙)
   * - `tr`: Top Right (상단 우측)
   * - `bl`: Bottom Left (하단 좌측) (기본)
   * - `bc`: Bottom Center (하단 중앙)
   * - `br`: Bottom Right (하단 우측)
   * @default 'bl'
   */
  errorPs?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
}

/**
 * InputTag 컴포넌트는 태그 입력을 위한 폼 UI 요소입니다.
 * 최대 입력 개수와 플레이스홀더를 설정할 수 있으며, 현재 입력된 태그를 뱃지 형식으로 편리하게 표시하고 삭제할 수 있습니다.
 */
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
    const errorId = React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

    const addTag = (tagContent: string) => {
      const trimmedTag = tagContent.trim();

      if (!trimmedTag || value.includes(trimmedTag)) return;
      if (maxTags && value.length >= maxTags) return;

      const newTags = [...value, trimmedTag];
      onChange?.(newTags);
      setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
        removeTag(value.length - 1);
      }
    };

    const removeTag = (indexToRemove: number) => {
      const newTags = value.filter((_, index) => index !== indexToRemove);
      onChange?.(newTags);
    };

    const handleDivClick = () => {
      inputRef.current?.focus();
    };

    return (
      <Grow
        placement="ss"
        variant={variant}
        onClick={handleDivClick}
        className={cn(
          'flex flex-wrap border border-[var(--color-gray-20)] w-full px-2 py-1 rounded-[0.4rem] bg-white',
          error
            ? 'border-[var(--color-danger-50)] bg-[var(--color-danger-5)] outline-[0.2rem] outline-[var(--color-danger-50)] -outline-offset-[0.2rem] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.10)]'
            : 'border-[var(--color-gray-20)]',
          className
        )}
      >
        {value.map((tag, index) => (
          <Badge
            key={`${tag}-${index}`}
            variant="contained"
            color="gray"
            className="gap-1 px-1 text-[1.2rem] font-bold"
          >
            {tag}
            <Button
              type="button"
              variant={'none'}
              size={'sm'}
              only={'icon'}
              className="w-[1.4rem]! h-[1.4rem]! p-0 "
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              aria-label={`Remove ${tag} tag`}
            >
              <InputClearIcon color={'var(--color-blue-gray-50)'} size={12} />
            </Button>
          </Badge>
        ))}

        <input
          {...props}
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 min-w-[12rem] h-[1.8rem] bg-transparent outline-none text-sm disabled:cursor-not-allowed disabled:opacity-50"
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
