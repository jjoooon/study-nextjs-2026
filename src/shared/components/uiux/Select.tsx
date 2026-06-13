/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';
import { SelectArrowIcon } from '@icons';

// Select 루트 컴포넌트: 전체 선택 컨트롤의 상태를 관리합니다.
function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

// 항목들을 그룹화할 때 사용합니다. (예: 지역별, 카테고리별)
function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

// 선택된 현재 값을 화면에 표시하는 영역입니다.
function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

type SelectSize = 'default' | 'small';

// SelectTrigger 전용 Props
// - variant: 디자인 변형 (현재 기본값만 존재)
// - selectSize: 크기 제어 (default: 28px, small: 25px)
// - required: 필수 입력 여부에 따른 스타일 적용
// - readOnly: 읽기 전용 상태 (클릭 방지 및 스타일 변경)
interface UISelectTriggerProps extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  variant?: 'default';
  selectSize?: SelectSize;
  required?: boolean;
  readOnly?: boolean;
}

// 선택창을 여는 버튼(Trigger) 컴포넌트입니다.
function SelectTrigger({
  className,
  variant = 'default',
  selectSize = 'default',
  required = false,
  readOnly = false,
  children,
  ...props
}: UISelectTriggerProps) {
  // 외부에서 전달된 aria-invalid 속성을 통해 유효성 검사 실패 상태를 파악합니다.
  const isInvalid = props['aria-invalid'] === 'true' || props['aria-invalid'] === true;

  // 기본 스타일 정의: 에러(Invalid) > 필수(Required) > 일반 순으로 우선순위를 가집니다.
  const baseStyle = cn(
    "data-[size=default]:h-[2.8rem] data-[size=small]:h-[2.5rem] w-full rounded-[0.4rem] px-2 py-0 text-[1.3rem] border box-border tracking-[--typo-letter-spacing-n3] border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    isInvalid
      ? 'text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] border-[var(--color-input-border-error)]'
      : required
        ? 'text-[var(--color-text-basic)] bg-[var(--color-input-surface-highlight)] border-[var(--color-input-border-highlight)]'
        : 'text-[var(--color-text-basic)] border-[var(--color-input-border)] bg-white'
  );

  // 마우스 호버 시 보더 색상 제어
  const hoverStyle = isInvalid
    ? 'hover:border-[var(--color-input-border-error)]'
    : required
      ? 'hover:border-[var(--color-input-border-highlight-bold)]'
      : 'hover:border-[var(--color-input-border-hover)]';

  // 포커스 시 스타일 제어 (보더 두께 및 링 효과)
  const focusStyle = `${
    isInvalid
      ? 'focus:border-[var(--color-input-border-error)]'
      : required
        ? 'focus:border-[var(--color-input-border-highlight-bold)]'
        : 'focus:border-[var(--color-input-border-hover)]'
  } 
    focus:ring-1 focus:ring-[var(--color-gray-5)] focus:border-[0.2rem] focus:px-[0.8rem]`;

  // 읽기 전용 상태일 때의 배경색 및 커서 정의
  const readonlyStyle = readOnly ? 'bg-[var(--color-input-surface-disabled)] cursor-not-allowed opacity-100' : '';

  // 비활성화 상태 정의
  const disabledStyle = 'disabled:opacity-50 disabled:cursor-not-allowed';

  // 우측 화살표 아이콘의 색상을 상태에 따라 결정
  const arrowStateStyle = isInvalid
    ? 'var(--color-danger-50)'
    : required
      ? 'var(--color-icon-gray)'
      : 'var(--color-icon-secondary)';

  const variantStyles = {
    default: cn(baseStyle, hoverStyle, focusStyle, readonlyStyle, disabledStyle),
  };

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={selectSize}
      className={cn(variantStyles[variant], className)}
      disabled={readOnly || props.disabled}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <SelectArrowIcon className="size-4" color={arrowStateStyle} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

// 드롭다운 메뉴가 나타나는 컨테이너(Content) 컴포넌트입니다.
// - 포털(Portal)을 사용하여 DOM의 최상단에 렌더링됩니다.
function SelectContent({
  className,
  children,
  position = 'popper',
  align = 'center',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'z-50 max-h-[30rem] min-w-[8rem] overflow-hidden rounded-[0.4rem] border border-[var(--color-input-border)] bg-white shadow-lg',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

// 그룹의 제목을 표시할 때 사용합니다.
function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  );
}

// 개별 선택 항목(Option) 컴포넌트입니다.
function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-[0.2rem] py-[0.2rem] px-[0.8rem] text-[1.3rem] outline-none',
        'text-[var(--color-text-basic)] hover:bg-[var(--color-input-surface-highlight)] focus:bg-[var(--color-input-surface-highlight)]',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      {/* 항목이 선택되었을 때 나타나는 체크 표시 인디케이터 */}
      <span data-slot="select-item-indicator" className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

// 항목들 사이의 구분선입니다.
function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

// 리스트가 길어질 때 상단으로 스크롤하는 버튼입니다.
function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

// 리스트가 길어질 때 하단으로 스크롤하는 버튼입니다.
function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
