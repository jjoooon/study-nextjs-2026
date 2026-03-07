'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';
import { ErrorMsg } from '@common/ErrorMsg';

import { CheckIcon, CheckboxIcon, Favorite } from '@icons';
import { Grow } from '@atoms';

import { cn } from '@/shared/lib/shadcn/utils';

interface UICheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  children?: React.ReactNode;
  variant?: 'default' | 'favorite' | 'noneText' | 'button' | 'text';
  size?: 'default' | 'sm';
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
  size = 'default',
  color = 'primary',
  ...props
}: UICheckboxProps) {
  const isDefaultSm = variant === 'default' && size === 'sm';
  const isFavorite = variant === 'favorite';
  const isNoneText = variant === 'noneText';
  const isButton = variant === 'button';
  const isText = variant === 'text';
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
    default: 'size-[2rem] rounded-[0.4rem]',
    sm: 'size-[1.4rem] rounded-[0.3rem]',
  };

  const colorStyles = {
    primary:
      'hover:border-[var(--color-border-primary)] data-[state=checked]:bg-[var(--color-element-primary)] data-[state=checked]:border-[var(--color-border-primary)] data-[state=checked]:text-white',
    info:
      'hover:border-[var(--color-border-information,#006ff2)] data-[state=checked]:bg-[var(--color-element-information,#006ff2)] data-[state=checked]:border-[var(--color-border-information,#006ff2)] data-[state=checked]:text-white',
  };

  const buttonColorStyles = {
    primary:
      'data-[state=checked]:bg-[#fff7f4] data-[state=checked]:text-[#ff3800] data-[state=checked]:border-[#ff6135] data-[state=checked]:shadow-[0rem_0.1rem_0.1rem_0rem_rgba(255,92,46,0.19)]',
    info:
      'data-[state=checked]:bg-[#f0f7ff] data-[state=checked]:text-[#006ff2] data-[state=checked]:border-[#006ff2] data-[state=checked]:shadow-[0rem_0.1rem_0.1rem_0rem_rgba(0,111,242,0.19)]',
  };

  const favoriteSizeStyles = {
    default: 'size-[2rem]',
    sm: 'size-[1.8rem]',
  };

  const buttonSizeStyles = {
    default: 'h-[2.5rem]',
    sm: 'h-[2.2rem]',
  };

  const iconSize = size === 'default' ? 16 : 14;
  const checkedColorStyles = {
    primary: 'var(--color-primary-50)',
    info: 'var(--color-element-information,#006ff2)',
  };

  // support both controlled and uncontrolled usage
  const [internalChecked, setInternalChecked] = React.useState<boolean | 'indeterminate'>(false);
  const isControlled = propsChecked !== undefined;
  const checkedState: boolean | 'indeterminate' = isControlled ? (propsChecked as boolean | 'indeterminate') : internalChecked;

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
    // checkedState가 true일 때 underline과 색상 적용
    const textClass = [
      "text-[1.3rem] font-normal select-none cursor-pointer",
      checkedState === true && `underline underline-offset-4 font-bold! ${color === 'info' ? 'text-[var(--color-element-information,#006ff2)]' : 'text-[var(--color-primary-50)]'}`
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <div className="relative w-fit">
        <label htmlFor={checkboxId} className={cn(textClass, hasErrorState && 'text-[var(--color-text-danger)]', className)}>
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
          'shrink-0 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[required=true]:bg-[var(--color-input-surface-highlight)] data-[required=true]:border-[var(--color-input-border-highlight)] data-[invalid=true]:bg-[var(--color-input-surface-error)] data-[invalid=true]:border-[var(--color-input-border-error)] disabled:cursor-not-allowed disabled:bg-[var(--color-element-gray-lighter)] disabled:border-[var(--color-border-gray-light)] disabled:data-[state=checked]:bg-[var(--color-element-gray-lighter)] disabled:data-[state=checked]:border-[var(--color-border-gray-light)] disabled:data-[state=checked]:text-[#b3b3b3] [state=checked]:shadow-[0_0.1rem_0.1rem_0_rgba(255,92,46,0.20)]',
          // favorite 스타일
          isDefaultSm && 'translate-y-[0.1rem]',
          isFavorite && 'border-0 bg-transparent shadow-none',
          isFavorite && favoriteSizeStyles[size],
          // button 스타일
          isButton &&
            'px-1.5 text-[1.3rem] tracking-[-0.042rem] w-auto rounded-[0.4rem] border border-[var(--color-gray-20)] bg-[var(--color-gray-0)] font-normal leading-normal text-[var(--color-gray-100)] whitespace-nowrap',
          isButton && buttonSizeStyles[size],
          isButton && buttonColorStyles[color],
          // default 스타일
          !isFavorite &&
            !isButton &&
            'border border-[var(--color-border-gray-light)] bg-[var(--color-element-inverse)]',
          !isFavorite && !isButton && sizeStyles[size],
          !isFavorite && !isButton && colorStyles[color],
          className
        )}
        {...restProps}
      >
        {isFavorite ? (
          <Favorite color={checkedState ? checkedColorStyles[color] : 'var(--color-gray-30)'} />
        ) : isButton ? (
          <Grow className="gap-[0.2rem]" placement="sc">
            <CheckboxIcon color={checkedState ? checkedColorStyles[color] : 'var(--color-gray-30)'} />
            {children}
          </Grow>
        ) : (
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className={cn('grid place-content-center text-current transition-none', size === 'sm' && 'translate-y-[-0.1rem]')}
          >
            <CheckIcon size={iconSize} color={props.disabled ? 'var(--color-icon-gray-light)' : undefined} />
          </CheckboxPrimitive.Indicator>
        )}
      </CheckboxPrimitive.Root>
      {children && !isNoneText && !isButton && !isFavorite && (
        <label
          htmlFor={checkboxId}
          className={cn('text-[1.3rem] font-normal cursor-pointer select-none', hasErrorState && 'text-[var(--color-text-danger)]')}
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
  minSelected?: number;
  validateMode?: 'manual' | 'auto';
  error?: boolean;
  errorMsg?: React.ReactNode;
  errorPs?: ErrorMsgPosition;
  width?: 'full' | 'auto';
  variant?: 'default' | 'favorite' | 'noneText' | 'button' | 'text';
  size?: 'default' | 'sm';
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
  minSelected = 1,
  validateMode = 'manual',
  error = false,
  errorMsg,
  errorPs = 'bl',
  width = 'full',
  variant = 'default',
  size = 'default',
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

  // Enable count validation when explicitly required, or when minSelected is set above 1.
  const usesCountValidation = required || minSelected > 1;
  const countError = values.length < minSelected;
  const hasStartedValidation = validateMode === 'auto' ? true : hasValidationStarted;
  const isError = usesCountValidation ? (hasStartedValidation ? countError : false) : error;

  React.useEffect(() => {
    onErrorChange?.(isError);
  }, [isError, onErrorChange]);

  const resolvedErrorMsg = errorMsg ?? `${minSelected}개 이상 선택해 주세요.`;

  const contextValue = React.useMemo(
    () => ({ values, required, error: isError, variant, size, color, toggleValue }),
    [color, isError, required, size, toggleValue, values, variant]
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={cn('relative', width === 'full' ? 'w-full' : 'w-auto')}>
        <div
          role="group"
          className={cn('flex items-center justify-start flex-wrap', className)}
          data-required={required ? 'true' : undefined}
          data-invalid={isError ? 'true' : undefined}
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

interface CheckboxGroupItemProps extends Omit<UICheckboxProps, 'checked' | 'defaultChecked' | 'onCheckedChange' | 'value'> {
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
