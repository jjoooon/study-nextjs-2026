/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import type { UIUXsize } from '@/shared/types/uiTypes';
import { Gcol, Grow } from '@atoms';
import { ErrorMsg } from '@common/ErrorMsg';
import { SelectDropIcon } from '@icons';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

const CUSTOM_INPUT_VALUE = '__custom_input__' as const;

const WIDTH_MAP: Record<UIUXsize, string> = {
  full: 'w-full',
  auto: 'w-auto',
  max: 'w-max',
  min: 'w-min',
  '2xs': 'w-[4rem]',
  xs: 'w-[8rem]',
  sm: 'w-[10rem]',
  md: 'w-[12rem]',
  lg: 'w-[14rem]',
  xl: 'w-[16rem]',
  '2xl': 'w-[18rem]',
};

const TRIGGER_VARIANT_MAP = {
  default: '',
} as const;

/**
 * 숫자를 3자리마다 콤마를 찍어 포맷팅합니다.
 */
function formatAmount(value: string): string {
  const num = value.replace(/[^0-9]/g, '');
  if (!num) return '';
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * SelectDrop 컴포넌트에서 사용하는 개별 옵션 데이터 타입입니다.
 */
export type SelectDropOption<TValue extends string = string> = {
  /** 화면에 노출할 텍스트 라벨 */
  label: string;
  /** 옵션의 고유 식별값 */
  value: TValue;
  /** 해당 옵션의 비활성화 여부 */
  disabled?: boolean;
};

/**
 * SelectDrop 컴포넌트의 Props 인터페이스입니다.
 */
export type SelectDropProps<TValue extends string = string> = Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
  'children'
> & {
  /**
   * 드롭다운의 선택 동작 방식
   * - `checkbox`: 다중 선택(체크박스) 형식
   * - `radio`: 단일 선택(라디오 버튼) 형식
   * - `custom`: 옵션 영역 레이어 내부의 UI를 `children`을 통해 직접 개발자가 구현하는 형식
   * @default 'checkbox'
   */
  typeMode?: 'checkbox' | 'radio' | 'custom';
  /**
   * 트리거 버튼 스타일 타입
   * @default 'default'
   */
  variant?: keyof typeof TRIGGER_VARIANT_MAP;
  /** 드롭다운 내부에 표시할 표준 옵션 리스트 */
  options?: ReadonlyArray<SelectDropOption<TValue>>;
  /** 현재 선택된 값들의 배열 (제어 컴포넌트용) */
  value?: ReadonlyArray<TValue>;
  /** 초기 선택된 값들의 배열 (비제어 컴포넌트용) */
  defaultValue?: ReadonlyArray<TValue>;
  /** 선택 값이 변경될 때 발생하는 이벤트 핸들러 */
  onValueChange?: (values: TValue[]) => void;
  /** 라디오 선택 모드(`typeMode="radio"`)에서 직접 금액 입력을 지원할지 여부 */
  allowCustomInput?: boolean;
  /** 직접 입력용 라디오 항목의 텍스트 라벨 */
  customInputLabel?: string;
  /** 직접 입력 텍스트 상자의 입력값 (제어 컴포넌트용) */
  customInputValue?: string;
  /** 직접 입력 텍스트 상자의 초기 입력값 (비제어 컴포넌트용) */
  defaultCustomInputValue?: string;
  /** 직접 입력값이 변경될 때 발생하는 이벤트 핸들러 */
  onCustomInputValueChange?: (value: string) => void;
  /** 선택된 옵션이 없을 경우 노출할 안내 메시지(Placeholder) */
  placeholder?: string;
  /**
   * 트리거 버튼 및 옵션 레이어의 너비 지정
   * - `full`, `auto`, `max`, `min`, 또는 크기 상수('xs', 'sm', 'md' 등)
   * - rem 환산용 숫자형(ex: 120 -> 12rem) 또는 CSS 너비 스타일 문자열
   * @default 'md'
   */
  width?: UIUXsize | number | string;
  /**
   * 트리거 버튼의 크기 (높이)
   * - `lg`: 2.8rem (기본)
   * - `md`: 2.5rem
   * @default 'lg'
   */
  size?: UIUXsize;
  /** 필수 입력 여부 (선택되지 않을 시 노란색 하이라이트 스타일 제공) */
  required?: boolean;
  /** 읽기 전용 여부 (트리거 클릭 비활성화 및 배경 회색 처리) */
  readOnly?: boolean;
  /** 트리거 버튼 자체에 주입할 임의의 Tailwind/CSS 클래스명 */
  triggerClassName?: string;
  /** 에러 상태(선택 미흡 등) 여부 */
  error?: boolean;
  /** 에러 안내용 에러 메시지 내용 */
  errorMsg?: React.ReactNode;
  /**
   * 에러 메시지가 표시될 위치
   * - `tl`: Top Left, `tc`: Top Center, `tr`: Top Right
   * - `bl`: Bottom Left, `bc`: Bottom Center, `br`: Bottom Right
   * @default 'bl'
   */
  errorPs?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
  /** Popover의 sideOffset 간격 설정 */
  _sideOffset?: 0;
  /** 체크박스 다중 선택 모드(`typeMode="checkbox"`)일 때, 에러 해제 조건이 되는 최소 선택 개수 */
  minCount?: number;
  /** `typeMode="custom"` 상태일 때 드롭다운 팝오버 본문 내부에 표시할 임의의 리액트 컴포넌트 노드 */
  children?: React.ReactNode;
};

/**
 * SelectDrop 컴포넌트는 Radix UI의 Popover Primitive를 활용하여 풍부한 기능과 스타일을 탑재한 커스텀 셀렉트 드롭다운 컴포넌트입니다.
 * 체크박스를 통한 다중 선택, 라디오 기반 단일 선택, 직접 입력 입력창 내장 기능 등을 탑재하고 있습니다.
 */
function SelectDrop<TValue extends string = string>({
  typeMode,
  variant = 'default',
  options = [],
  value,
  defaultValue,
  onValueChange,
  allowCustomInput = false,
  customInputLabel = '직접입력',
  customInputValue,
  defaultCustomInputValue = '',
  onCustomInputValueChange,
  placeholder = '선택',
  width = 'md',
  triggerClassName,
  size = 'lg',
  required = false,
  readOnly = false,
  error = false,
  errorMsg = '입력은 필수입니다.',
  errorPs = 'bl',
  _sideOffset = 0,
  minCount = 1,
  children,
  ...contentProps
}: SelectDropProps<TValue>) {
  const selectionMode = typeMode ?? 'checkbox';
  const widthClass = (typeof width === 'string' && WIDTH_MAP[width as UIUXsize]) || '';

  const inlineWidthStyle = (() => {
    if (typeof width === 'number') {
      return { width: `${width / 10}rem` };
    }
    if (typeof width === 'string' && !WIDTH_MAP[width as UIUXsize]) {
      return { width };
    }
    return undefined;
  })();

  const errorId = React.useId();
  const isDisabled = readOnly;
  const heightClass = size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]';

  const [open, setOpen] = React.useState(false);
  const [internalCustomInputValue, setInternalCustomInputValue] = React.useState(defaultCustomInputValue);
  const [internalValues, setInternalValues] = React.useState<TValue[]>(() => {
    if (selectionMode === 'radio') {
      const firstValue = defaultValue?.[0];
      return firstValue ? [firstValue] : [];
    }

    return [...(defaultValue ?? [])];
  });

  const isControlled = value !== undefined;
  const selectedValues = React.useMemo(() => {
    const nextValues = isControlled ? [...value] : internalValues;

    if (selectionMode === 'radio') {
      const firstValue = nextValues[0];
      return firstValue ? [firstValue] : [];
    }

    return nextValues;
  }, [internalValues, isControlled, selectionMode, value]);

  const setSelectedValues = React.useCallback(
    (nextValues: TValue[]) => {
      const normalizedValues =
        selectionMode === 'radio' ? (nextValues.length > 0 ? [nextValues[0] as TValue] : []) : nextValues;

      if (!isControlled) {
        setInternalValues(normalizedValues);
      }
      onValueChange?.(normalizedValues);
    },
    [isControlled, onValueChange, selectionMode]
  );

  const selectedSet = React.useMemo(() => new Set(selectedValues), [selectedValues]);

  const resolvedCustomInputValue = React.useMemo(
    () => customInputValue ?? internalCustomInputValue,
    [customInputValue, internalCustomInputValue]
  );

  const isCustomInputSelected = React.useMemo(
    () => selectionMode === 'radio' && allowCustomInput && selectedValues[0] === (CUSTOM_INPUT_VALUE as TValue),
    [allowCustomInput, selectedValues, selectionMode]
  );

  const displayText = React.useMemo(() => {
    if (isCustomInputSelected) {
      const formatted = formatAmount(resolvedCustomInputValue);
      return formatted ? `${formatted}원` : customInputLabel;
    }

    const checkedOptions = options.filter((option) => selectedSet.has(option.value));

    if (checkedOptions.length === 0) {
      return placeholder;
    }

    const firstLabel = checkedOptions[0]?.label;

    if (!firstLabel) {
      return placeholder;
    }

    if (checkedOptions.length === 1) {
      return firstLabel;
    }

    return `${firstLabel} 외 ${checkedOptions.length - 1}`;
  }, [customInputLabel, isCustomInputSelected, options, placeholder, resolvedCustomInputValue, selectedSet]);

  const handleCheckedChange = React.useCallback(
    (optionValue: TValue, checked: boolean | 'indeterminate') => {
      const nextSelected = new Set(selectedSet);

      if (checked === true) {
        nextSelected.add(optionValue);
      } else {
        nextSelected.delete(optionValue);
      }

      setSelectedValues(Array.from(nextSelected));
    },
    [selectedSet, setSelectedValues]
  );

  const handleRadioValueChange = React.useCallback(
    (nextValue: string) => {
      setSelectedValues(nextValue ? [nextValue as TValue] : []);
    },
    [setSelectedValues]
  );

  const handleCustomInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      if (customInputValue === undefined) {
        setInternalCustomInputValue(nextValue);
      }

      onCustomInputValueChange?.(nextValue);
    },
    [customInputValue, onCustomInputValueChange]
  );

  const safeMinCount = Math.max(1, minCount ?? 1);
  const radioHasValue =
    selectionMode === 'radio' && (isCustomInputSelected ? !!resolvedCustomInputValue : selectedValues.length > 0);
  const checkboxValid = selectionMode === 'checkbox' && selectedValues.length >= safeMinCount;
  const showError = selectionMode === 'custom' ? false : error && !(radioHasValue || checkboxValid);

  const triggerStyle = cn(
    'flex items-center justify-between gap-1 rounded-[0.4rem] border px-1.5 text-[1.3rem]',
    heightClass,
    showError
      ? 'text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] border-[var(--color-input-border-error)] ring-1 ring-[var(--color-input-surface-error)]'
      : required
        ? 'text-[var(--color-text-basic)] bg-[var(--color-input-surface-highlight)] border-[var(--color-input-border-highlight)]'
        : 'text-[var(--color-text-basic)] border-(--color-blue-gray-30) bg-(--color-gray-0)',
    showError
      ? 'hover:border-[var(--color-input-border-error)] focus:border-[var(--color-input-border-error)] focus:ring-[var(--color-input-surface-error)]'
      : required
        ? 'hover:border-[var(--color-input-border-highlight-bold)] focus:border-[var(--color-input-border-highlight-bold)]'
        : 'hover:border-[var(--color-input-border-hover)] focus:border-[var(--color-input-border-hover)] focus:ring-[var(--color-gray-5)]',
    'focus:outline-none focus:ring-1',
    readOnly && 'bg-[var(--color-gray-10)] cursor-not-allowed opacity-100 pointer-events-none',
    'disabled:cursor-not-allowed disabled:bg-(--color-gray-10)',
    TRIGGER_VARIANT_MAP[variant],
    widthClass,
    triggerClassName
  );

  const arrowStateColor = showError
    ? 'var(--color-danger-50)'
    : required
      ? 'var(--color-icon-gray)'
      : readOnly
        ? 'var(--color-icon-gray-lighter)'
        : 'currentColor';

  return (
    <div className={cn('relative cp-selectdrop', widthClass)} style={inlineWidthStyle}>
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild disabled={isDisabled}>
          <button
            type="button"
            tabIndex={readOnly ? -1 : undefined}
            aria-invalid={showError || undefined}
            aria-describedby={showError ? errorId : undefined}
            aria-readonly={readOnly || undefined}
            className={cn(
              triggerStyle,
              'w-full aria-[expanded=true]:outline -outline-offset-[0.2rem] aria-[expanded=true]:outline-[0.2rem]'
            )}
          >
            <span className="truncate text-left">{displayText}</span>
            <SelectDropIcon size={size === 'lg' ? 16 : 12} color={arrowStateColor} className={cn('shrink-0')} />
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            style={inlineWidthStyle}
            className={cn(
              'z-50 rounded-[0.4rem] bg-(--color-gray-0) shadow-[0px_2px_8px_0px_rgba(0,0,0,0.16)]',
              widthClass
            )}
            {...contentProps}
          >
            {selectionMode === 'custom' ? (
              (children ?? null)
            ) : (
              <Gcol className={cn('p-[0.2rem]')} placement={'ss'} gap={0}>
                <button
                  type="button"
                  value={placeholder}
                  className={`w-full px-2 hover:bg-[var(--color-warning-10)] flex items-center justify-start text-[1.3rem] ${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`}
                  onClick={() => {
                    setSelectedValues([]);
                    if (allowCustomInput && customInputValue === undefined) {
                      setInternalCustomInputValue('');
                    }
                    setOpen(false);
                  }}
                >
                  선택
                </button>
                {selectionMode === 'radio' ? (
                  <RadioGroup
                    value={selectedValues[0] ?? ''}
                    onValueChange={handleRadioValueChange}
                    className="flex-col items-start"
                    width="full"
                    disabled={isDisabled}
                  >
                    {options.map((option) => {
                      return (
                        <Grow
                          key={option.value}
                          placement={'sc'}
                          className={`w-full px-2 hover:bg-[var(--color-warning-10)] items-center ${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`}
                        >
                          <RadioGroupItem value={option.value} disabled={option.disabled || readOnly} size="md">
                            {option.label}
                          </RadioGroupItem>
                        </Grow>
                      );
                    })}

                    {allowCustomInput && (
                      <>
                        <Grow
                          placement={'sc'}
                          className={`w-full px-2 hover:bg-[var(--color-warning-10)] items-center ${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`}
                        >
                          <RadioGroupItem value={CUSTOM_INPUT_VALUE} size="md" disabled={readOnly}>
                            {customInputLabel}
                          </RadioGroupItem>
                        </Grow>
                        {isCustomInputSelected && (
                          <Grow className={`w-[calc(100% + 0.6rem)] w-full px-2`}>
                            <Input
                              value={resolvedCustomInputValue}
                              onChange={handleCustomInputChange}
                              commaAmount={true}
                              size="sm"
                              width="full"
                              readOnly={readOnly}
                              after={<span className="text-[1.3rem]">원</span>}
                            />
                          </Grow>
                        )}
                      </>
                    )}
                  </RadioGroup>
                ) : selectionMode === 'checkbox' ? (
                  options.map((option) => {
                    return (
                      <Grow
                        key={option.value}
                        placement={'ss'}
                        className={`w-full px-2 hover:bg-[var(--color-warning-10)] items-center ${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`}
                      >
                        <Checkbox
                          checked={selectedSet.has(option.value)}
                          onCheckedChange={(checked) => {
                            handleCheckedChange(option.value, checked);
                          }}
                          disabled={option.disabled || readOnly}
                          size="md"
                          className="-translate-y-[0.1rem]"
                        >
                          {option.label}
                        </Checkbox>
                      </Grow>
                    );
                  })
                ) : null}
              </Gcol>
            )}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
      {showError && (
        <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
          {errorMsg}
        </ErrorMsg>
      )}
    </div>
  );
}

export { SelectDrop };
