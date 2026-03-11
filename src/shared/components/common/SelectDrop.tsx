'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { Gcol, Grow } from '@atoms';
import { SelectDropIcon } from '@icons';
import { Button } from '@uiux/Button';
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

export type SelectDropProps<TValue extends string = string> = Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
  'children'
> & {
  selectionMode?: 'checkbox' | 'radio';
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
  triggerClassName?: string;
  listClassName?: string;
  resetLabel?: string;
  confirmLabel?: string;
  closeOnConfirm?: boolean;
  disabled?: boolean;
};

function SelectDrop<TValue extends string = string>({
  selectionMode = 'checkbox',
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
  listClassName,
  resetLabel = '초기화',
  confirmLabel = '설정완료',
  closeOnConfirm = true,
  disabled = false,
  side = 'bottom',
  align = 'start',
  sideOffset = 0,
  ...contentProps
}: SelectDropProps<TValue>) {
  const widthClass = (typeof width === 'string' && WIDTH_MAP[width as UIUXsize]) || '';

  const inlineWidthStyle = (() => {
    if (typeof width === 'number') {
      return { width: `${width / 10}rem` };
    }
    if (typeof width === 'string' && !WIDTH_MAP[width as UIUXsize]) {
      // It's a string like "15rem" or "200px"
      return { width };
    }
    return undefined;
  })();

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

  const handleReset = React.useCallback(() => {
    setSelectedValues([]);
  }, [setSelectedValues]);

  const handleConfirm = React.useCallback(() => {
    if (closeOnConfirm) {
      setOpen(false);
    }
  }, [closeOnConfirm]);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild disabled={disabled}>
        <button
          type="button"
          style={inlineWidthStyle}
          className={cn(
            'flex h-[2.8rem] items-center justify-between gap-1 rounded-[0.4rem] border border-(--color-coolgray-30) bg-(--color-gray-0) px-1.5 text-[1.3rem] text-gray-100',
            'disabled:cursor-not-allowed disabled:bg-(--color-coolgray-10) disabled:text-gray-50',
            widthClass,
            triggerClassName,
          )}
        >
          <span className="truncate text-left">{displayText}</span>
          <SelectDropIcon
            size={16}
            className={cn('shrink-0 transition-transform duration-200', open && 'rotate-180')}
          />
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          style={inlineWidthStyle}
          className={cn(
            'z-50 rounded-[0.4rem] bg-(--color-gray-0) p-0 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.16)]',
            widthClass,
          )}
          {...contentProps}
        >
          <Gcol className={cn('px-2 pt-2', listClassName)} placement={'ss'} gap={0}>
            {selectionMode === 'radio' ? (
              <RadioGroup
                value={selectedValues[0] ?? ''}
                onValueChange={handleRadioValueChange}
                className="flex-col items-start"
                width="full"
                disabled={disabled}
              >
                {options.map((option) => {
                  return (
                    <Grow key={option.value} placement={'sc'} className="min-h-[2.8rem]">
                      <RadioGroupItem
                        value={option.value}
                        disabled={option.disabled}
                        size="sm"
                      >
                        {option.label}
                      </RadioGroupItem>
                    </Grow>
                  );
                })}

                {allowCustomInput && (
                  <>
                    <Grow placement={'sc'} className="min-h-[2.8rem]">
                      <RadioGroupItem value={CUSTOM_INPUT_VALUE} size="sm">
                        {customInputLabel}
                      </RadioGroupItem>
                    </Grow>
                    {isCustomInputSelected && (
                      <Grow className="mx-[-0.3rem] w-[calc(100% + 0.6rem)]">
                        <Input
                          value={resolvedCustomInputValue}
                          onChange={handleCustomInputChange}
                          commaAmount={true}
                          size="sm"
                          width="full"
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
                  <Grow key={option.value} placement={'ss'} className="min-h-[2.8rem]">
                    <Checkbox
                      checked={selectedSet.has(option.value)}
                      onCheckedChange={(checked) => {
                        handleCheckedChange(option.value, checked);
                      }}
                      disabled={option.disabled}
                      size="sm"
                    >
                      {option.label}
                    </Checkbox>
                  </Grow>
                );
              })
            )}
          </Gcol>

          {selectionMode === 'radio' ? (
            <Gcol className="px-1 py-1">
              <Button
                type="button"
                size="md"
                variant="contained"
                color="primary"
                className="h-[2.8rem] w-full"
                onClick={handleConfirm}
              >
                {confirmLabel}
              </Button>
            </Gcol>
          ) : (
            <Grow placement={'ss'} className="px-1 py-1" gap={1}>
              <Button
                type="button"
                size="md"
                variant="outlined"
                color="gray"
                className="h-[2.8rem] flex-1"
                onClick={handleReset}
              >
                {resetLabel}
              </Button>
              <Button
                type="button"
                size="md"
                variant="contained"
                color="primary"
                className="h-[2.8rem] flex-1"
                onClick={handleConfirm}
              >
                {confirmLabel}
              </Button>
            </Grow>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export default SelectDrop;