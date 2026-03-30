'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { Gcol, Grow } from '@atoms';
import { ErrorMsg } from '@common/ErrorMsg';
import { SelectDropIcon } from '@icons';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { cn } from '@/shared/lib/shadcn/utils';
import type { UIUXsize } from '@/shared/types/uiuxTypes';

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

export type SelectDropOption<TValue extends string = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

/**
 * SelectDrop Props Definition
 */
export type SelectDropProps<TValue extends string = string> = Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
  'children'
> & {
  typeMode?: 'checkbox' | 'radio';
  variant?: keyof typeof TRIGGER_VARIANT_MAP;
  options: ReadonlyArray<SelectDropOption<TValue>>;
  value?: ReadonlyArray<TValue>;
  defaultValue?: ReadonlyArray<TValue>;
  onValueChange?: (values: TValue[]) => void;
  allowCustomInput?: boolean;
  customInputLabel?: string;
  customInputValue?: string;
  defaultCustomInputValue?: string;
  onCustomInputValueChange?: (value: string) => void;
  placeholder?: string;
  width?: UIUXsize | number | string;
  size?: UIUXsize;
  required?: boolean;
  readOnly?: boolean;
  triggerClassName?: string;
  error?: boolean;
  errorMsg?: React.ReactNode;
  errorPs?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
  sideOffset?: 0;
  /** 체크박스 최소 선택 갯수 (기본값 1) */
  minCount?: number;
};

/**
 * SelectDrop Component
 *
 * Popover 기반의 커스텀 셀렉트 컴포넌트입니다.
 * 체크박스(다중 선택)와 라디오(단일 선택) 모드를 지원하며,
 * 라디오 모드에서는 직접 입력 기능을 옵션으로 제공합니다.
 */
function SelectDrop<TValue extends string = string>({
  typeMode,
  variant = 'default',
  options,
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
  sideOffset = 0,
  minCount = 1,
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
  const selectedValues = React.useMemo(
    () => {
      const nextValues = isControlled ? [...value] : internalValues;

      if (selectionMode === 'radio') {
        const firstValue = nextValues[0];
        return firstValue ? [firstValue] : [];
      }

      return nextValues;
    },
    [internalValues, isControlled, selectionMode, value]
  );

  const setSelectedValues = React.useCallback(
    (nextValues: TValue[]) => {
      const normalizedValues =
        selectionMode === 'radio'
          ? nextValues.length > 0
            ? [nextValues[0] as TValue]
            : []
          : nextValues;

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
    () =>
      selectionMode === 'radio' &&
      allowCustomInput &&
      selectedValues[0] === (CUSTOM_INPUT_VALUE as TValue),
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
  // 에러 해제 조건: 라디오(값 있으면), 체크박스(최소 선택 갯수 이상)
  // minCount는 1 이상으로 보정
  const safeMinCount = Math.max(1, minCount ?? 1);
  const radioHasValue = selectionMode === 'radio' && (isCustomInputSelected ? !!resolvedCustomInputValue : selectedValues.length > 0);
  const checkboxValid = selectionMode === 'checkbox' && selectedValues.length >= safeMinCount;
  const showError = error && !(radioHasValue || checkboxValid);

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
    readOnly && 'bg-[var(--color-input-surface-disabled)] cursor-not-allowed opacity-100 pointer-events-none',
    'disabled:cursor-not-allowed disabled:bg-(--color-blue-gray-10) disabled:text-gray-50',
    TRIGGER_VARIANT_MAP[variant],
    widthClass,
    triggerClassName,
  );

  const arrowStateColor = showError
    ? 'var(--color-danger-50)'
    : required
      ? 'var(--color-icon-gray)'
      : readOnly
        ? 'var(--color-icon-gray-lighter)'
        : 'currentColor';

  // // 에러 해제 조건: 라디오(값 있으면), 체크박스(최소 선택 갯수 이상)
  // const radioHasValue = variant === 'radio' && (isCustomInputSelected ? !!resolvedCustomInputValue : selectedValues.length > 0);
  // const checkboxValid = variant === 'checkbox' && selectedValues.length >= minCount;
  // const showError = error && !(radioHasValue || checkboxValid);

  return (
    <div className={cn('relative', widthClass)} style={inlineWidthStyle}>
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild disabled={isDisabled}>
          <button
            type="button"
            tabIndex={readOnly ? -1 : undefined}
            aria-invalid={showError || undefined}
            aria-describedby={showError ? errorId : undefined}
            aria-readonly={readOnly || undefined}
            className={cn(triggerStyle, 'aria-[expanded=true]:outline -outline-offset-[0.2rem] aria-[expanded=true]:outline-[0.2rem]')}
          >
            <span className="truncate text-left">{displayText}</span>
            <SelectDropIcon
              size={size === 'lg' ? 16 : 12}
              color={arrowStateColor}
              className={cn('shrink-0')}
            />
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            style={inlineWidthStyle}
            className={cn(
              'z-50 min-w-48 rounded-[0.4rem] bg-(--color-gray-0) shadow-[0px_2px_8px_0px_rgba(0,0,0,0.16)]',
              widthClass,
            )}
            {...contentProps}
          >
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
                      <Grow key={option.value} placement={'sc'} className={`w-full px-2 hover:bg-[var(--color-warning-10)] items-center ${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`}>
                        <RadioGroupItem
                          value={option.value}
                          disabled={option.disabled || readOnly}
                          size="md"
                        >
                          {option.label}
                        </RadioGroupItem>
                      </Grow>
                    );
                  })}

                  {allowCustomInput && (
                    <>
                      <Grow placement={'sc'} className={`w-full px-2 hover:bg-[var(--color-warning-10)] items-center ${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`}>
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
              ) : (
                options.map((option) => {
                  return (
                    <Grow key={option.value} placement={'ss'} className={`w-full px-2 hover:bg-[var(--color-warning-10)] items-center ${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`}>
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
              )}
            </Gcol>
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

export default SelectDrop;