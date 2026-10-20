/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { QuestionMark } from '@icons';
import { Button } from '@uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

type TooltipQProps = {
  /** 툴팁의 초기 열림 상태 */
  defaultOpen?: boolean;
  /** 툴팁 오프셋 */
  sideOffset?: number;
  /** 툴팁 정렬 */
  align?: 'start' | 'center' | 'end';
  /** 툴팁 컨텐츠 추가 클래스 */
  className?: string;
  /** 툴팁 본문 내용 (호버 시 표시) */
  children?: ReactNode;
  /** 물음표 아이콘 클릭 시 실행할 콜백 함수 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
  /** 접근성 라벨 @default '도움말' */
  ariaLabel?: string;
};

export function TooltipQ({
  defaultOpen = false,
  sideOffset = 1,
  className,
  children,
  align = 'center',
  onClick,
  disabled = false,
  ariaLabel = '도움말',
}: TooltipQProps) {
  const isClickable = Boolean(onClick);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };

  const buttonClassName = cn(
    'aspect-auto translate-y-[0.2rem] ml-[0.2rem] h-[1.4rem] w-[1.4rem] p-0 rounded-full transition-colors text-[#61554F]',
    isClickable ? 'cursor-pointer hover:bg-[#61554F] hover:text-white active:bg-[#4a413c]' : 'cursor-default'
  );

  // 안내 텍스트(children) 없이 클릭 콜백(onClick)만 있는 경우 순수 아이콘 버튼으로 렌더링
  if (onClick && !children) {
    return (
      <Button
        type="button"
        only="icon"
        size="md"
        variant="none"
        disabled={disabled}
        aria-label={ariaLabel}
        className={buttonClassName}
        onClick={handleClick}
      >
        <QuestionMark color="currentColor" />
      </Button>
    );
  }

  return (
    <Tooltip defaultOpen={defaultOpen}>
      <TooltipTrigger asChild>
        <Button
          type="button"
          only="icon"
          size="md"
          variant="none"
          disabled={disabled}
          aria-label={ariaLabel}
          className={buttonClassName}
          onClick={handleClick}
        >
          <QuestionMark color="currentColor" />
        </Button>
      </TooltipTrigger>
      {children && (
        <TooltipContent
          side="top"
          align={align}
          sideOffset={sideOffset}
          variant="default"
          className={cn('[&>span]:whitespace-auto! text-wrap tracking-[-0.05rem] break-keep', className)}
        >
          {children}
        </TooltipContent>
      )}
    </Tooltip>
  );
}
