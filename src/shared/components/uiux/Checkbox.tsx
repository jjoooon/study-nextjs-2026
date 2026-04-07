'use client';

import { Grow } from '@atoms';
import { ErrorMsg } from '@common/ErrorMsg';
import { CheckIcon, Favorite } from '@icons';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

interface UICheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  children?: React.ReactNode;
  variant?: 'default' | 'favorite' | 'noneText' | 'button' | 'text' | 'chipBox';
  size?: 'lg' | 'md';
  color?: 'primary' | 'info';
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
  toggleValue: (value: string, checked: boolean | 'indeterminate') => void;
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
    lg: 'size-[2rem] rounded-[0.4rem]',
    md: 'size-[1.4rem] rounded-[0.3rem]',
  };
  const chipBoxSizeStyles = {
    lg: 'h-[2.8rem] px-[1rem]',
    md: 'h-[2.5rem] px-[0.8rem]',
  };
  const favoriteSizeStyles = {
    lg: 'size-[2rem]',
    md: 'size-[1.8rem]',
  };
  const buttonSizeStyles = {
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
  };

  const iconSize = size === 'lg' ? 16 : 14;
  const checkedColorStyles = {
    primary: 'var(--color-primary-50)',
    info: 'var(--color-element-information)',
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
            'px-1.5 text-[1.3rem] tracking-[-0.042rem] w-auto rounded-[0.4rem] border border-[var(--color-gray-20)] bg-[var(--color-gray-0)] font-normal leading-normal text-[var(--color-gray-100)] whitespace-nowrap',

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
  color?: 'primary' | 'info';
}

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
  const isControlled = valueProp !== undefined;
  const values = isControlled ? valueProp : internalValues;
  const errorId = React.useId();

  const setValues = React.useCallback(
    (nextValues: string[]) => {
      if (!isControlled) {
        setInternalValues(nextValues);
      }
      onValueChange?.(nextValues);
    },
    [isControlled, onValueChange]
  );

  const toggleValue = React.useCallback(
    (value: string, checked: boolean | 'indeterminate') => {
      setValues(
        checked === true
          ? values.includes(value)
            ? values
            : [...values, value]
          : values.filter((item) => item !== value)
      );
    },
    [setValues, values]
  );

  React.useEffect(() => {
    if (validateMode === 'manual') {
      setHasValidationStarted(error);
    }
  }, [error, validateMode]);

  const usesCountValidation = required || minSelected > 1;
  const countError = values.length < minSelected;
  const hasStartedValidation = validateMode === 'auto' ? true : hasValidationStarted;
  const isError = usesCountValidation ? (hasStartedValidation ? countError : false) : error;

  React.useEffect(() => {
    onErrorChange?.(isError);
  }, [isError, onErrorChange]);

  const resolvedErrorMsg = errorMsg ?? `${minSelected}개 이상 선택해 주세요.`;

  const contextValue = React.useMemo(
    () => ({ values, required, disabled, error: isError, variant, size, color, toggleValue }),
    [color, disabled, isError, required, size, toggleValue, values, variant]
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
}

function CheckboxGroupItem({ value, ...props }: CheckboxGroupItemProps) {
  const context = React.useContext(CheckboxGroupContext);

  if (!context) {
    throw new Error('CheckboxGroupItem must be used within CheckboxGroup.');
  }

  const isChecked = context.values.includes(value);

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
        context.toggleValue(value, checked);
      }}
    />
  );
}

export { Checkbox, CheckboxGroup, CheckboxGroupItem };
