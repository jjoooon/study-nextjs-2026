/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Grow } from '@atoms';
import { CheckIcon, Favorite } from '@icons';
import { ErrorMsg } from '@common/ErrorMsg';

// 단일 Checkbox 컴포넌트 props
// - variant/size/color로 UI 모양을 바꾼다.
// - required/error/errorMsg로 검증 상태를 표시할 수 있다.
interface UICheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  children?: React.ReactNode;
  variant?: 'default' | 'favorite' | 'noneText' | 'button' | 'text' | 'chipBox';
  size?: 'xl' | 'lg' | 'md' | 'sm';
  color?: 'primary' | 'info' | 'secondary';
  required?: boolean;
  error?: boolean;
  errorMsg?: React.ReactNode;
  errorPs?: ErrorMsgPosition;
  showErrorMsg?: boolean;
}

type ErrorMsgPosition = 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';

// CheckboxGroup 내부 공유 상태
// - 개별 아이템은 Context를 통해 선택 여부/토글 함수/공통 옵션을 받는다.
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

// 단일 Checkbox
// - controlled / uncontrolled 둘 다 지원
// - variant에 따라 체크박스, 버튼형, 텍스트형, 칩형, 즐겨찾기형으로 렌더링 분기
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

  // 크기별 스타일 맵
  const sizeStyles = {
    xl: 'size-[2.4rem] rounded-[0.5rem]',
    lg: 'size-[2rem] rounded-[0.4rem]',
    md: 'size-[1.4rem] rounded-[0.3rem]',
    sm: 'size-[1.2rem] rounded-[0.2rem]',
  };
  const chipBoxSizeStyles = {
    xl: 'h-[3rem] px-[1.2rem]',
    lg: 'h-[2.8rem] px-[1rem]',
    md: 'h-[2.5rem] px-[0.8rem]',
    sm: 'h-[2.2rem] px-[0.6rem]',
  };
  const favoriteSizeStyles = {
    xl: 'size-[2.4rem]',
    lg: 'size-[2rem]',
    md: 'size-[1.8rem]',
    sm: 'size-[1.6rem]',
  };
  const buttonSizeStyles = {
    xl: 'h-[3rem] pr-[1.2rem] pl-[0.2rem]',
    lg: 'h-[2.8rem]',
    md: 'h-[2.5rem]',
    sm: 'h-[2.2rem]',
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

  // controlled/ uncontrolled 공용 상태 처리
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

  // text variant는 실제 체크박스를 숨기고 텍스트만 클릭 가능하게 만든다.
  if (isText) {
    const checkedColor =
      color === 'info' ? 'text-[var(--color-information-50, #006ff2)]' : 'text-[var(--color-primary-50)]';

    const labelClass = [
      'text-[1.3rem] font-normal select-none cursor-pointer tracking-[-0.13rem] underline underline-offset-4',
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
    <div className={cn('relative', `flex items-center gap-x-1 gap-y-[0.2rem] ${isFavorite ? 'h-full' : ''}`)}>
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
        {/* variant별 내부 표시 분기 */}
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

      {/* 일반 variant는 우측 라벨 텍스트를 별도 label로 렌더링 */}
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

// CheckboxGroup props
// - value/defaultValue: 선택값 배열
// - minSelected/required: 최소 선택 개수 검증
// - validateMode: manual(외부 에러 시작), auto(항상 즉시 검증)
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

// 중복 제거 유틸
const uniq = (values: string[]) => Array.from(new Set(values));

// 배열 값이 같은지 순서까지 포함해 비교
const areSameValues = (left: string[], right: string[]) => {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((value, index) => value === right[index]);
};

// CheckboxGroup
// - 여러 Checkbox를 하나의 값 배열로 제어
// - selectAll 항목과 최소 선택 개수 검증을 지원
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
  // manual 검증 모드에서 "에러 표시 시작 여부"를 제어
  const [hasValidationStarted, setHasValidationStarted] = React.useState(false);
  const [prevError, setPrevError] = React.useState(error);
  const [prevValidateMode, setPrevValidateMode] = React.useState(validateMode);
  // 그룹에 등록된 아이템 메타 정보(disabled/selectAll)
  const [registeredItems, setRegisteredItems] = React.useState<Record<string, CheckboxGroupItemRegistration>>({});
  const isControlled = valueProp !== undefined;
  const values = isControlled ? valueProp : internalValues;
  const errorId = React.useId();

  // selectAll 역할을 가진 항목 value 추출(있으면 1개만 사용)
  const selectAllValue = React.useMemo(
    () => Object.entries(registeredItems).find(([, item]) => item.selectAll)?.[0],
    [registeredItems]
  );

  // 실제 선택 대상이 되는 항목 목록(selectAll/disabled 제외)
  const selectableValues = React.useMemo(
    () =>
      Object.entries(registeredItems)
        .filter(([itemValue, item]) => !item.selectAll && !item.disabled && itemValue !== selectAllValue)
        .map(([itemValue]) => itemValue),
    [registeredItems, selectAllValue]
  );

  // 선택 가능한 항목이 모두 선택되었는지 계산
  const isAllSelectableChecked = React.useMemo(
    () => selectableValues.length > 0 && selectableValues.every((itemValue) => values.includes(itemValue)),
    [selectableValues, values]
  );

  // controlled/uncontrolled 공용 값 업데이트 함수
  const setValues = React.useCallback(
    (nextValues: string[]) => {
      if (!isControlled) {
        setInternalValues(nextValues);
      }
      onValueChange?.(nextValues);
    },
    [isControlled, onValueChange]
  );

  // 그룹 아이템 등록/해제
  // - disabled/selectAll 정보를 그룹이 알고 있어야 전체 선택/검증 계산이 가능하다.
  const registerItem = React.useCallback((value: string, options?: { disabled?: boolean; selectAll?: boolean }) => {
    setRegisteredItems((prev) => {
      const nextItem: CheckboxGroupItemRegistration = {
        disabled: options?.disabled ?? false,
        selectAll: options?.selectAll ?? false,
      };

      if (prev[value]?.disabled === nextItem.disabled && prev[value]?.selectAll === nextItem.selectAll) {
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
  }, []);

  // 특정 항목의 체크 상태 계산
  // - selectAll 항목은 전체 선택 상태를 그대로 따른다.
  const isItemChecked = React.useCallback(
    (value: string, selectAll?: boolean) => {
      if (selectAll) {
        return isAllSelectableChecked;
      }

      return values.includes(value);
    },
    [isAllSelectableChecked, values]
  );

  // 값 토글 처리
  // - selectAll 클릭 시 전체 선택/해제
  // - 일반 항목 클릭 시 개별 선택 후 selectAll 상태 재계산
  const toggleValue = React.useCallback(
    (value: string, checked: boolean | 'indeterminate', selectAll?: boolean) => {
      if (selectAll && selectAllValue) {
        const nextValues =
          checked === true
            ? uniq([...values.filter((item) => item !== selectAllValue), ...selectableValues, selectAllValue])
            : values.filter((item) => item !== selectAllValue && !selectableValues.includes(item));

        setValues(nextValues);
        return;
      }

      const nextSelectedValues =
        checked === true
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

      setValues(shouldCheckSelectAll ? uniq([...nextWithoutSelectAll, selectAllValue]) : nextWithoutSelectAll);
    },
    [selectAllValue, selectableValues, setValues, values]
  );

  // manual 모드에서는 외부 error prop이 들어온 시점부터 검증 표시 시작 (렌더 단계에서 동기화)
  if (error !== prevError || validateMode !== prevValidateMode) {
    setPrevError(error);
    setPrevValidateMode(validateMode);
    if (validateMode === 'manual') {
      setHasValidationStarted(error);
    }
  }

  // 검증 로직
  // - required 또는 minSelected > 1 이면 "선택 개수 기반 검증" 사용
  const usesCountValidation = required || minSelected > 1;
  const selectedCount = selectAllValue ? values.filter((item) => item !== selectAllValue).length : values.length;
  const countError = selectedCount < minSelected;
  const hasStartedValidation = validateMode === 'auto' ? true : hasValidationStarted;
  const isError = usesCountValidation ? (hasStartedValidation ? countError : false) : error;

  React.useEffect(() => {
    onErrorChange?.(isError);
  }, [isError, onErrorChange]);

  const resolvedErrorMsg = errorMsg ?? `${minSelected}개 이상 선택해 주세요.`;

  // 일반 항목 선택 상태가 바뀌면 selectAll 값도 자동 동기화 (렌더 단계에서 동기화)
  if (selectAllValue) {
    const normalizedValues = isAllSelectableChecked
      ? uniq([...values.filter((item) => item !== selectAllValue), selectAllValue])
      : values.filter((item) => item !== selectAllValue);

    if (!areSameValues(normalizedValues, values)) {
      setValues(normalizedValues);
    }
  }

  const contextValue = React.useMemo(
    () => ({
      values,
      required,
      disabled,
      error: isError,
      variant,
      size,
      color,
      isItemChecked,
      toggleValue,
      registerItem,
    }),
    [color, disabled, isError, isItemChecked, registerItem, required, size, toggleValue, values, variant]
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={cn('relative', width === 'full' ? 'w-full' : 'w-auto')}>
        <div
          role="group"
          className={cn('flex items-center justify-start flex-wrap w-full gap-x-2 gap-y-1', className)}
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

// CheckboxGroup 내부에서 사용하는 개별 아이템
// - 그룹 Context를 통해 checked/onChange/공통 옵션을 주입받는다.
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

  // 마운트 시 그룹에 자기 자신을 등록하고, 언마운트 시 해제
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
