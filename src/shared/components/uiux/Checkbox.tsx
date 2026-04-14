'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Grow } from '@atoms';
import { ErrorMsg } from '@common/ErrorMsg';
import { CheckIcon, Favorite } from '@icons';

interface UICheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  children?: React.ReactNode;
  variant?: 'default' | 'favorite' | 'noneText' | 'button' | 'text' | 'chipBox';
  size?: 'xl' | 'lg' | 'md';
  color?: 'primary' | 'info' | 'secondary';
  required?: boolean;
  error?: boolean;
  errorMsg?: React.ReactNode;
  errorPs?: ErrorMsgPosition;
  showErrorMsg?: boolean;
}

type ErrorMsgPosition = 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';

type CheckboxGroupContextValue = {
  values: string[];
  required: boolean;
  disabled: boolean;
  error: boolean;
  variant: UICheckboxProps['variant'];
  size: UICheckboxProps['size'];
  color: UICheckboxProps['color'];
  isItemChecked: (value: string, selectAll?: boolean) => boolean;
  toggleValue: (value: string, checked: boolean | 'indeterminate', selectAll?: boolean) => void;
  registerItem: (value: string, options?: { disabled?: boolean; selectAll?: boolean }) => () => void;
};

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | null>(null);

function Checkbox({
  className,
  children,
  variant = 'default',
  size = 'lg',
  color = 'primary',
  ...props
}: UICheckboxProps) {
  const isDefaultMd = variant === 'default' && size === 'md';
  const isFavorite = variant === 'favorite';
  const isNoneText = variant === 'noneText';
  const isButton = variant === 'button';
  const isText = variant === 'text';
  const isChipBox = variant === 'chipBox';

  const generatedId = React.useId();
  const {
    checked: propsChecked,
    onCheckedChange: propsOnCheckedChange,
    id: propsId,
    required: isRequired = false,
    error = false,
    errorMsg = '선택은 필수입니다.',
    errorPs = 'bl',
    showErrorMsg = true,
    ...restProps
  } = props;
  const checkboxId = propsId || generatedId;
  const errorId = React.useId();

  const sizeStyles = {
    xl: 'size-[2.4rem] rounded-[0.5rem]',
    lg: 'size-[2rem] rounded-[0.4rem]',
    md: 'size-[1.4rem] rounded-[0.3rem]',
  };
  const chipBoxSizeStyles = {
    xl: 'h-[3rem] px-[1.2rem]',
    lg: 'h-[2.8rem] px-[1rem]',
    md: 'h-[2.5rem] px-[0.8rem]',
  };
  const favoriteSizeStyles = {
    xl: 'size-[2.4rem]',
    lg: 'size-[2rem]',
    md: 'size-[1.8rem]',
  };
  const buttonSizeStyles = {
    xl: 'h-[3rem] px-[1.2rem]',
    lg: 'h-[2.5rem]',
    md: 'h-[2.2rem]',
  };

  const colorStyles = {
    primary: `hover:border-[var(--color-primary-50)] 
      data-[state=checked]:bg-[var(--color-primary-50)] 
      data-[state=checked]:border-[var(--color-primary-50)] 
      data-[state=checked]:text-white`,
    info: `hover:border-[var(--color-information-50)] 
      data-[state=checked]:bg-[var(--color-information-50)] 
      data-[state=checked]:border-[var(--color-information-50)] 
      data-[state=checked]:text-white`,
    secondary: `hover:border-[var(--color-secondary-50)] 
      data-[state=checked]:bg-[var(--color-secondary-50)] 
      data-[state=checked]:border-[var(--color-secondary-50)] 
      data-[state=checked]:text-white`,
  };
  const buttonColorStyles = {
    primary: `data-[state=checked]:bg-[var(--color-primary-5)] 
      data-[state=checked]:text-[var(--color-primary-50)] 
      data-[state=checked]:border-[var(--color-primary-50)] 
      data-[state=checked]:shadow-[0rem_0.2rem_0.2rem_0rem_rgba(255,92,46,0.20)]`,
    info: `data-[state=checked]:bg-[var(--color-information-50)] 
      data-[state=checked]:text-[var(--color-information-50)] 
      data-[state=checked]:border-[var(--color-information-50)] 
      data-[state=checked]:shadow-[0rem_0.2rem_0.2rem_0rem_rgba(0,111,242,0.20)]`,
    secondary: `data-[state=checked]:bg-[var(--color-secondary-40)] 
      data-[state=checked]:text-[var(--color-secondary-90)] 
      data-[state=checked]:border-[var(--color-secondary-90)] 
      data-[state=checked]:shadow-[0rem_0.2rem_0.2rem_0rem_rgba(27,46,91,0.20)]`,
  };
  const chipBoxColorStyles = {
    primary: `data-[state=checked]:bg-[var(--color-primary-50)] 
      data-[state=checked]:text-[#FFF] 
      data-[state=checked]:border-[#ff6135] 
      data-[state=checked]:shadow-[0rem_0.2rem_0.2rem_0rem_rgba(255,92,46,0.19)]`,
    info: `data-[state=checked]:bg-[#006ff2] 
      data-[state=checked]:text-[#FFF] 
      data-[state=checked]:border-[#006ff2] 
      data-[state=checked]:shadow-[0rem_0.2rem_0.2rem_0rem_rgba(0,111,242,0.19)]`,
    secondary: `data-[state=checked]:bg-[var(--color-secondary-90)] 
      data-[state=checked]:text-[#FFF] 
      data-[state=checked]:border-[var(--color-secondary-90)] 
      data-[state=checked]:shadow-[0rem_0.2rem_0.2rem_0rem_rgba(27,46,91,0.19)]`,
  };

  const iconSize = size === 'xl' ? 19 : size === 'lg' ? 16 : 14;
  const checkedColorStyles = {
    primary: 'var(--color-primary-50)',
    info: 'var(--color-element-information)',
    secondary: 'var(--color-secondary-90)',
  };

  // support both controlled and uncontrolled usage
  const [internalChecked, setInternalChecked] = React.useState<boolean | 'indeterminate'>(false);
  const isControlled = propsChecked !== undefined;
  const checkedState: boolean | 'indeterminate' = isControlled
    ? (propsChecked as boolean | 'indeterminate')
    : internalChecked;

  const handleChange = (value: boolean | 'indeterminate') => {
    if (!isControlled) {
      setInternalChecked(value);
    }
    if (propsOnCheckedChange) {
      propsOnCheckedChange(value);
    }
  };

  const hasErrorState = error && checkedState !== true;

  if (isText) {
    const checkedColor =
      color === 'info' ? 'text-[var(--color-element-information,#006ff2)]' : 'text-[var(--color-primary-50)]';

    const labelClass = [
      'text-[1.3rem] font-normal select-none cursor-pointer tracking-[-0.13rem]',
      checkedState === true && `underline underline-offset-4 font-bold! ${checkedColor}`,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="relative w-fit">
        <label
          htmlFor={checkboxId}
          className={cn(labelClass, hasErrorState && 'text-[var(--color-text-danger)]', className)}
        >
          <CheckboxPrimitive.Root
            data-slot="checkbox"
            id={checkboxId}
            required={isRequired}
            aria-required={isRequired ? true : undefined}
            data-required={isRequired ? 'true' : undefined}
            data-invalid={hasErrorState ? 'true' : undefined}
            aria-invalid={hasErrorState ? true : undefined}
            aria-describedby={hasErrorState ? errorId : undefined}
            checked={checkedState}
            onCheckedChange={handleChange}
            className="hidden"
            {...restProps}
          />
          {children}
        </label>
        {hasErrorState && showErrorMsg && (
          <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
            {errorMsg}
          </ErrorMsg>
        )}
      </div>
    );
  }

  return (
    <div className={cn('relative', `flex items-center gap-1 ${isFavorite ? 'h-full' : ''}`)}>
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        id={checkboxId}
        required={isRequired}
        aria-required={isRequired ? true : undefined}
        data-required={isRequired ? 'true' : undefined}
        data-invalid={hasErrorState ? 'true' : undefined}
        aria-invalid={hasErrorState ? true : undefined}
        aria-describedby={hasErrorState ? errorId : undefined}
        checked={checkedState}
        onCheckedChange={handleChange}
        className={cn(
          `shrink-0 transition-colors outline-none tracking-[-0.13rem] 

          focus-visible:ring-2 
          focus-visible:ring-ring 
          focus-visible:ring-offset-2 

          data-[required=true]:bg-[var(--color-warning-10)] 
          data-[required=true]:border-[var(--color-warning-30)] 
          data-[required=true]:hover:border-[var(--color-primary-50)] 

          data-[invalid=true]:bg-[var(--color-input-surface-error)]! 
          data-[invalid=true]:border-[var(--color-input-border-error)]! 
          data-[invalid=true]:border-[0.2rem]! 

          disabled:cursor-not-allowed 
          disabled:bg-[var(--color-gray-10)] 
          disabled:border-[var(--color-gray-20)] 
          disabled:data-[state=checked]:bg-[var(--color-gray-10)] 
          disabled:data-[state=checked]:border-[var(--color-gray-20)] 
          disabled:data-[state=checked]:text-[var(--color-gray-30)] 
          [state=checked]:shadow-[0_0.1rem_0.1rem_0_rgba(255,92,46,0.20)]`,

          isDefaultMd && 'translate-y-[0.1rem]',
          isFavorite && 'border-0 bg-transparent shadow-none',
          isFavorite && favoriteSizeStyles[size],

          isButton &&
            'px-1.5 text-[1.3rem] tracking-[-0.042rem] w-auto rounded-[0.4rem] border border-[var(--color-gray-20)] bg-[var(--color-gray-0)] font-normal leading-normal text-[var(--color-gray-100)] whitespace-nowrap disabled:data-[state=checked]:text-[var(--color-primary-50)] disabled:text-[var(--color-gray-50)]',

          isButton && buttonSizeStyles[size],
          isButton && buttonColorStyles[color],

          isChipBox &&
            'px-2 text-[1.3rem] tracking-[-0.042rem] w-auto rounded-full border border-[var(--color-gray-20)] bg-[var(--color-gray-0)] font-normal leading-normal text-[var(--color-gray-100)] whitespace-nowrap',
          isChipBox && chipBoxSizeStyles[size],
          isChipBox && chipBoxColorStyles[color],

          !isFavorite &&
            !isButton &&
            'border border-[var(--color-border-gray-light)] bg-[var(--color-element-inverse)]',
          !isFavorite &&
            !isChipBox &&
            'border border-[var(--color-border-gray-light)] bg-[var(--color-element-inverse)]',
          !isFavorite && !isButton && !isChipBox && sizeStyles[size],
          !isFavorite && !isButton && !isChipBox && colorStyles[color],
          className
        )}
        {...restProps}
      >
        {isFavorite ? (
          <Favorite color={checkedState ? checkedColorStyles[color] : 'var(--color-gray-30)'} />
        ) : isButton || isChipBox ? (
          <Grow className="gap-[0.2rem] tracking-[-0.13rem]" placement="sc">
            {isButton && <CheckIcon color={checkedState ? checkedColorStyles[color] : 'var(--color-gray-30)'} />}
            {children}
          </Grow>
        ) : (
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className={cn(
              'grid place-content-center text-current transition-none',
              size === 'md' && 'translate-y-[-0.1rem]'
            )}
          >
            <CheckIcon size={iconSize} color={props.disabled ? 'var(--color-icon-gray-light)' : undefined} />
          </CheckboxPrimitive.Indicator>
        )}
      </CheckboxPrimitive.Root>

      {children && !isNoneText && !isButton && !isChipBox && !isFavorite && (
        <label
          htmlFor={checkboxId}
          className={cn(
            'text-[1.3rem] font-normal cursor-pointer select-none tracking-[-0.13rem]',
            hasErrorState && 'text-[var(--color-text-danger)]'
          )}
        >
          {children}
        </label>
      )}
      {hasErrorState && showErrorMsg && (
        <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
          {errorMsg}
        </ErrorMsg>
      )}
    </div>
  );
}

interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  onErrorChange?: (isError: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  minSelected?: number;
  validateMode?: 'manual' | 'auto';
  error?: boolean;
  errorMsg?: React.ReactNode;
  errorPs?: ErrorMsgPosition;
  width?: 'full' | 'auto';
  variant?: 'default' | 'favorite' | 'noneText' | 'button' | 'text' | 'chipBox';
  size?: 'lg' | 'md';
  color?: 'primary' | 'info' | 'secondary';
}

type CheckboxGroupItemRegistration = {
  disabled: boolean;
  selectAll: boolean;
};

const uniq = (values: string[]) => Array.from(new Set(values));

const areSameValues = (left: string[], right: string[]) => {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((value, index) => value === right[index]);
};

function CheckboxGroup({
  className,
  children,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  onErrorChange,
  required = false,
  disabled = false,
  minSelected = 1,
  validateMode = 'manual',
  error = false,
  errorMsg,
  errorPs = 'bl',
  width = 'full',
  variant = 'default',
  size = 'lg',
  color = 'primary',
  ...props
}: CheckboxGroupProps) {
  const [internalValues, setInternalValues] = React.useState<string[]>(defaultValue);
  const [hasValidationStarted, setHasValidationStarted] = React.useState(false);
  const [registeredItems, setRegisteredItems] = React.useState<Record<string, CheckboxGroupItemRegistration>>({});
  const isControlled = valueProp !== undefined;
  const values = isControlled ? valueProp : internalValues;
  const errorId = React.useId();

  const selectAllValue = React.useMemo(
    () => Object.entries(registeredItems).find(([, item]) => item.selectAll)?.[0],
    [registeredItems]
  );

  const selectableValues = React.useMemo(
    () =>
      Object.entries(registeredItems)
        .filter(([itemValue, item]) => !item.selectAll && !item.disabled && itemValue !== selectAllValue)
        .map(([itemValue]) => itemValue),
    [registeredItems, selectAllValue]
  );

  const isAllSelectableChecked = React.useMemo(
    () => selectableValues.length > 0 && selectableValues.every((itemValue) => values.includes(itemValue)),
    [selectableValues, values]
  );

  const setValues = React.useCallback(
    (nextValues: string[]) => {
      if (!isControlled) {
        setInternalValues(nextValues);
      }
      onValueChange?.(nextValues);
    },
    [isControlled, onValueChange]
  );

  const registerItem = React.useCallback(
    (value: string, options?: { disabled?: boolean; selectAll?: boolean }) => {
      setRegisteredItems((prev) => {
        const nextItem: CheckboxGroupItemRegistration = {
          disabled: options?.disabled ?? false,
          selectAll: options?.selectAll ?? false,
        };

        if (
          prev[value]?.disabled === nextItem.disabled &&
          prev[value]?.selectAll === nextItem.selectAll
        ) {
          return prev;
        }

        return {
          ...prev,
          [value]: nextItem,
        };
      });

      return () => {
        setRegisteredItems((prev) => {
          if (!(value in prev)) {
            return prev;
          }

          const next = { ...prev };
          delete next[value];
          return next;
        });
      };
    },
    []
  );

  const isItemChecked = React.useCallback(
    (value: string, selectAll?: boolean) => {
      if (selectAll) {
        return isAllSelectableChecked;
      }

      return values.includes(value);
    },
    [isAllSelectableChecked, values]
  );

  const toggleValue = React.useCallback(
    (value: string, checked: boolean | 'indeterminate', selectAll?: boolean) => {
      if (selectAll && selectAllValue) {
        const nextValues = checked === true
          ? uniq([...values.filter((item) => item !== selectAllValue), ...selectableValues, selectAllValue])
          : values.filter((item) => item !== selectAllValue && !selectableValues.includes(item));

        setValues(nextValues);
        return;
      }

      const nextSelectedValues = checked === true
        ? values.includes(value)
          ? values
          : [...values, value]
        : values.filter((item) => item !== value);

      if (!selectAllValue) {
        setValues(nextSelectedValues);
        return;
      }

      const nextWithoutSelectAll = nextSelectedValues.filter((item) => item !== selectAllValue);
      const shouldCheckSelectAll =
        selectableValues.length > 0 && selectableValues.every((itemValue) => nextWithoutSelectAll.includes(itemValue));

      setValues(
        shouldCheckSelectAll
          ? uniq([...nextWithoutSelectAll, selectAllValue])
          : nextWithoutSelectAll
      );
    },
    [selectAllValue, selectableValues, setValues, values]
  );

  React.useEffect(() => {
    if (validateMode === 'manual') {
      setHasValidationStarted(error);
    }
  }, [error, validateMode]);

  const usesCountValidation = required || minSelected > 1;
  const selectedCount = selectAllValue ? values.filter((item) => item !== selectAllValue).length : values.length;
  const countError = selectedCount < minSelected;
  const hasStartedValidation = validateMode === 'auto' ? true : hasValidationStarted;
  const isError = usesCountValidation ? (hasStartedValidation ? countError : false) : error;

  React.useEffect(() => {
    onErrorChange?.(isError);
  }, [isError, onErrorChange]);

  const resolvedErrorMsg = errorMsg ?? `${minSelected}개 이상 선택해 주세요.`;

  React.useEffect(() => {
    if (!selectAllValue) {
      return;
    }

    const normalizedValues = isAllSelectableChecked
      ? uniq([...values.filter((item) => item !== selectAllValue), selectAllValue])
      : values.filter((item) => item !== selectAllValue);

    if (!areSameValues(normalizedValues, values)) {
      setValues(normalizedValues);
    }
  }, [isAllSelectableChecked, selectAllValue, setValues, values]);

  const contextValue = React.useMemo(
    () => ({ values, required, disabled, error: isError, variant, size, color, isItemChecked, toggleValue, registerItem }),
    [color, disabled, isError, isItemChecked, registerItem, required, size, toggleValue, values, variant]
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={cn('relative', width === 'full' ? 'w-full' : 'w-auto')}>
        <div
          role="group"
          className={cn('flex items-center justify-start flex-wrap w-full', className)}
          data-required={required ? 'true' : undefined}
          data-disabled={disabled ? 'true' : undefined}
          data-invalid={isError ? 'true' : undefined}
          aria-disabled={disabled ? true : undefined}
          aria-invalid={isError ? true : undefined}
          aria-describedby={isError ? errorId : undefined}
          {...props}
        >
          {children}
        </div>
        {isError && (
          <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
            {resolvedErrorMsg}
          </ErrorMsg>
        )}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

interface CheckboxGroupItemProps extends Omit<
  UICheckboxProps,
  'checked' | 'defaultChecked' | 'onCheckedChange' | 'value'
> {
  value: string;
  selectAll?: boolean;
}

function CheckboxGroupItem({ value, selectAll = false, ...props }: CheckboxGroupItemProps) {
  const context = React.useContext(CheckboxGroupContext);

  if (!context) {
    throw new Error('CheckboxGroupItem must be used within CheckboxGroup.');
  }

  const { registerItem } = context;

  React.useEffect(() => {
    return registerItem(value, { disabled: props.disabled, selectAll });
  }, [props.disabled, registerItem, selectAll, value]);

  const isChecked = context.isItemChecked(value, selectAll);

  return (
    <Checkbox
      {...props}
      variant={props.variant ?? context.variant}
      size={props.size ?? context.size}
      color={props.color ?? context.color}
      required={context.required || props.required}
      disabled={context.disabled || props.disabled}
      error={context.error || props.error}
      showErrorMsg={false}
      checked={isChecked}
      onCheckedChange={(checked) => {
        context.toggleValue(value, checked, selectAll);
      }}
    />
  );
}

export { Checkbox, CheckboxGroup, CheckboxGroupItem };
