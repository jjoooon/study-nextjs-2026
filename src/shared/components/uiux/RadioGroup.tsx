/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { ErrorMsg } from '@common/ErrorMsg';

/**
 * RadioGroup 내부 아이템들에 에러 및 필수 상태를 전파하기 위한 컨텍스트입니다.
 */
const RadioGroupContext = React.createContext<{
  /** 에러 상태 여부 */
  error?: boolean;
  /** 필수 선택 여부 */
  required?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 현재 선택된 값 */
  selectedValue?: string;
  /** 선택 해제 허용 여부 */
  allowDeselect?: boolean;
  /** 값 변경 핸들러 */
  handleValueChange?: (value: string) => void;
  /** 라디오 그룹 변형 */
  variant?: 'default' | 'button' | 'noCheckButton' | 'chipBox' | 'tab' | 'folderTab' | 'tabBadge' | 'none';
  /** 아이템 크기 */
  size?: 'lg' | 'md' | 'sm';
  /** 아이템 색상 */
  color?: 'primary' | 'info';
}>({
  error: false,
  required: false,
  disabled: false,
  selectedValue: undefined,
  allowDeselect: true,
  handleValueChange: undefined,
  variant: undefined,
  size: undefined,
  color: undefined,
});

const radioGroupItemVariants = cva(
  `transition-colors 
  focus:outline-none 
  focus-visible:ring-1 
  focus-visible:ring-ring 
  disabled:cursor-not-allowed 
  disabled:opacity-100 
  disabled:border-[var(--color-gray-15)] 
  disabled:bg-[var(--color-gray-10)] 
  disabled:data-[state=checked]:border-[var(--color-gray-15)]`,
  {
    variants: {
      variant: {
        default:
          'rounded-full border bg-[var(--color-element-inverse)] data-[state=checked]:border-[var(--color-border-gray-light)] data-[required=true]:bg-[var(--color-input-surface-highlight)] data-[required=true]:border-[var(--color-input-border-highlight)] data-[invalid]:bg-[var(--color-input-surface-error)] data-[invalid]:border-[var(--color-input-border-error)]',
        button:
          'rounded-[0.4rem] border border-[var(--color-border-gray-light)] bg-white font-normal leading-normal text-black data-[required=true]:bg-[var(--color-input-surface-highlight)] data-[required=true]:border-[var(--color-input-border-highlight)] data-[invalid]:text-[var(--color-text-danger)] data-[invalid]:bg-[var(--color-input-surface-error)] data-[invalid]:border-[var(--color-input-border-error)] disabled:data-[state=checked]:text-[var(--color-gray-30)] disabled:data-[state=checked]:shadow-none',
        noCheckButton:
          'rounded-[0.4rem] border border-[var(--color-border-gray-light)] bg-white font-normal leading-normal text-black data-[required=true]:bg-[var(--color-input-surface-highlight)] data-[required=true]:border-[var(--color-input-border-highlight)] data-[invalid]:text-[var(--color-text-danger)] data-[invalid]:bg-[var(--color-input-surface-error)] data-[invalid]:border-[var(--color-input-border-error)] disabled:data-[state=checked]:text-[var(--color-gray-30)] disabled:data-[state=checked]:shadow-none',
        chipBox:
          'rounded-full border border-[var(--color-gray-20)] bg-[var(--color-gray-0)] font-normal leading-normal text-[var(--color-gray-100)] whitespace-nowrap px-2 text-[1.3rem] tracking-[-0.042rem] w-auto data-[state=checked]:bg-[var(--color-primary-50)] data-[state=checked]:text-[#FFF] data-[state=checked]:border-[#ff6135] ',
        folderTab: `h-[3.2rem] px-[1.6rem] text-[1.3rem] font-bold leading-normal tracking-[-0.04rem] inline-flex items-center justify-center select-none transition-all
        rounded-t-[0.4rem] rounded-b-none -mr-px relative z-0
        bg-white text-[var(--color-gray-90,#222)]
        border-t border-l border-r border-[var(--color-border-gray-light,#d8d8d8)]
        border-b-[0.1rem] border-b-[var(--color-primary-50,#ff5c2e)]
        hover:text-[var(--color-primary-50,#ff5c2e)] hover:bg-[var(--color-gray-5,#f9f9f9)]
        data-[state=checked]:bg-white! data-[state=checked]:text-black!
        data-[state=checked]:border-t-[0.3rem]! data-[state=checked]:border-t-[var(--color-primary-50,#ff5c2e)]!
        data-[state=checked]:border-l-[0.1rem]! data-[state=checked]:border-l-[var(--color-primary-50,#ff5c2e)]!
        data-[state=checked]:border-r-[0.1rem]! data-[state=checked]:border-r-[var(--color-primary-50,#ff5c2e)]!
        data-[state=checked]:border-b-[0.1rem]! data-[state=checked]:border-b-white!
        data-[state=checked]:-mb-[0.1rem]! data-[state=checked]:z-10!`,
        tab: `h-[3.2rem] px-[1.6rem] text-[1.3rem] font-bold leading-normal tracking-[-0.04rem] inline-flex items-center justify-center select-none transition-all
        rounded-t-[0.4rem] rounded-b-none -mr-px relative z-0
        bg-white text-[var(--color-gray-90,#222)]
        border-t border-l border-r border-[var(--color-border-gray-light,#d8d8d8)]
        border-b-[0.1rem] border-b-[var(--color-primary-50,#ff5c2e)]
        hover:text-[var(--color-primary-50,#ff5c2e)] hover:bg-[var(--color-gray-5,#f9f9f9)]
        data-[state=checked]:bg-white! data-[state=checked]:text-black!
        data-[state=checked]:border-t-[0.3rem]! data-[state=checked]:border-t-[var(--color-primary-50,#ff5c2e)]!
        data-[state=checked]:border-l-[0.1rem]! data-[state=checked]:border-l-[var(--color-primary-50,#ff5c2e)]!
        data-[state=checked]:border-r-[0.1rem]! data-[state=checked]:border-r-[var(--color-primary-50,#ff5c2e)]!
        data-[state=checked]:border-b-[0.1rem]! data-[state=checked]:border-b-white!
        data-[state=checked]:-mb-[0.1rem]! data-[state=checked]:z-10!`,
        tabBadge: `h-[2.6rem] rounded-full border-transparent bg-[var(--color-gray-10)] px-[1rem] py-[0.4rem] text-[1.2rem] font-bold leading-normal tracking-[-0.13rem] text-[#000] inline-flex items-center gap-1 transition-all select-none
        data-[state=checked]:border-transparent! data-[state=checked]:bg-[#1f2429]! data-[state=checked]:text-white! [&_.count-badge]:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]!
        [&_.count-badge]:inline-flex [&_.count-badge]:px-[0.4rem] [&_.count-badge]:items-center [&_.count-badge]:justify-center [&_.count-badge]:min-w-[1.6rem] [&_.count-badge]:h-[1.6rem] [&_.count-badge]:rounded-full [&_.count-badge]:text-[1.2rem] [&_.count-badge]:font-bold [&_.count-badge]:leading-none [&_.count-badge]:tracking-normal [&_.count-badge]:pb-[0.25rem] [&_.count-badge]:text-center [&_.count-badge]:bg-white [&_.count-badge]:text-gray-100
        data-[state=checked]:[&_.count-badge]:bg-[#fbc02d]! data-[state=checked]:[&_.count-badge]:text-gray-100!
        [&_.sub-label]:text-[#e53935] data-[state=checked]:[&_.sub-label]:text-[#E43939]!`,
        none: '',
      },
      size: {
        lg: '',
        md: '',
        sm: '',
      },
      width: {
        full: 'w-full',
        auto: 'w-auto',
      },
      color: {
        primary: 'border-[var(--color-border-gray-light)] hover:border-[var(--color-element-primary)]',
        info: 'border-[var(--color-border-gray-light)] hover:border-[#006ff2]',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        size: 'lg',
        className: 'h-[2rem] w-[2rem]',
      },
      {
        variant: 'default',
        size: 'md',
        className: 'h-[1.4rem] w-[1.4rem]',
      },
      {
        variant: 'button',
        size: 'lg',
        className: 'h-[2.8rem] px-[1rem] text-[1.3rem] tracking-[-0.13rem] w-auto',
      },
      {
        variant: 'button',
        size: 'md',
        className: 'h-[2.5rem] px-[1rem] text-[1.3rem] tracking-[-0.13rem] w-auto',
      },
      {
        variant: 'button',
        size: 'sm',
        className: 'h-[2.2rem] px-[1rem] text-[1.3rem] tracking-[-0.13rem] w-auto',
      },
      {
        variant: 'button',
        color: 'primary',
        className:
          'data-[state=checked]:bg-[#fff7f4] data-[state=checked]:text-[#ff3800] data-[state=checked]:border-[#ff6135] data-[state=checked]:shadow-[0rem_0.1rem_0.1rem_0rem_rgba(255,92,46,0.19)]',
      },
      {
        variant: 'button',
        color: 'info',
        className:
          'data-[state=checked]:bg-[#f0f7ff] data-[state=checked]:text-[#006ff2] data-[state=checked]:border-[#006ff2] data-[state=checked]:shadow-[0rem_0.1rem_0.1rem_0rem_rgba(0,111,242,0.19)]',
      },
      {
        variant: 'noCheckButton',
        size: 'lg',
        className: 'h-[2.8rem] px-[1rem] text-[1.3rem] tracking-[-0.13rem] w-auto justify-center items-center flex',
      },
      {
        variant: 'noCheckButton',
        size: 'md',
        className: 'h-[2.5rem] px-[1rem] text-[1.3rem] tracking-[-0.13rem] w-auto justify-center items-center flex',
      },
      {
        variant: 'noCheckButton',
        size: 'sm',
        className: 'h-[2.2rem] px-[1rem] text-[1.3rem] tracking-[-0.13rem] w-auto justify-center items-center flex',
      },
      {
        variant: 'noCheckButton',
        color: 'primary',
        className:
          'data-[state=checked]:bg-[#fff7f4] data-[state=checked]:text-[#ff3800] data-[state=checked]:border-[#ff6135] data-[state=checked]:shadow-[0rem_0.1rem_0.1rem_0rem_rgba(255,92,46,0.19)]',
      },
      {
        variant: 'noCheckButton',
        color: 'info',
        className:
          'data-[state=checked]:bg-[#f0f7ff] data-[state=checked]:text-[#006ff2] data-[state=checked]:border-[#006ff2] data-[state=checked]:shadow-[0rem_0.1rem_0.1rem_0rem_rgba(0,111,242,0.19)]',
      },
      {
        variant: 'chipBox',
        size: 'lg',
        className: 'h-[2.8rem] px-[1rem]',
      },
      {
        variant: 'chipBox',
        size: 'md',
        className: 'h-[2.6rem] px-[0.8rem]',
      },
      {
        variant: 'chipBox',
        color: 'info',
        className:
          'data-[state=checked]:bg-[#006ff2] data-[state=checked]:text-[#FFF] data-[state=checked]:border-[#006ff2] data-[state=checked]:shadow-none',
      },
      {
        variant: 'tab',
        size: 'lg',
        className: 'h-[3.2rem] px-[1.6rem] text-[1.3rem]',
      },
      {
        variant: 'tab',
        size: 'md',
        className: 'h-[2.8rem] px-[1.2rem] text-[1.2rem]',
      },
      {
        variant: 'tab',
        size: 'sm',
        className: 'h-[2.4rem] px-[0.9rem] text-[1.1rem]',
      },
      {
        variant: 'tab',
        color: 'info',
        className:
          'border-b-[#006ff2] hover:text-[#006ff2] data-[state=checked]:border-t-[#006ff2]! data-[state=checked]:border-l-[#006ff2]! data-[state=checked]:border-r-[#006ff2]!',
      },
      {
        variant: 'folderTab',
        size: 'lg',
        className: 'h-[3.2rem] px-[1.6rem] text-[1.3rem]',
      },
      {
        variant: 'folderTab',
        size: 'md',
        className: 'h-[2.8rem] px-[1.2rem] text-[1.2rem]',
      },
      {
        variant: 'folderTab',
        size: 'sm',
        className: 'h-[2.4rem] px-[0.9rem] text-[1.1rem]',
      },
      {
        variant: 'folderTab',
        color: 'info',
        className:
          'border-b-[#006ff2] hover:text-[#006ff2] data-[state=checked]:border-t-[#006ff2]! data-[state=checked]:border-l-[#006ff2]! data-[state=checked]:border-r-[#006ff2]!',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'lg',
      color: 'primary',
      width: 'full',
    },
  }
);

const radioIndicatorVariants = cva('absolute rounded-full', {
  variants: {
    size: {
      lg: 'h-[1rem] w-[1rem]',
      md: 'h-[0.6rem] w-[0.6rem]',
    },
    color: {
      primary: 'bg-[var(--color-element-primary)]',
      info: 'bg-[#006ff2]',
    },
    disabled: {
      true: 'bg-[var(--color-gray-30)]',
      false: '',
    },
  },
  defaultVariants: {
    size: 'lg',
    color: 'primary',
    disabled: false,
  },
});

/**
 * RadioGroup 컴포넌트의 추가 Props 정의
 */
interface RadioGroupExtraProps {
  /** 에러 상태(아무것도 선택되지 않았거나 유효하지 않은 입력 등) 표시 여부 */
  error?: boolean;
  /** 에러 발생 시 노출될 안내 메시지 내용 */
  errorMsg?: React.ReactNode;
  /**
   * 에러 메시지가 노출될 위치
   * - `tl`: Top Left (상단 좌측)
   * - `tc`: Top Center (상단 중앙)
   * - `tr`: Top Right (상단 우측)
   * - `bl`: Bottom Left (하단 좌측)
   * - `bc`: Bottom Center (하단 중앙)
   * - `br`: Bottom Right (하단 우측)
   * @default 'bl'
   */
  errorPs?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
  /**
   * 라디오 그룹의 기본 변형 스타일
   */
  variant?: 'default' | 'button' | 'noCheckButton' | 'chipBox' | 'tab' | 'folderTab' | 'tabBadge' | 'none';
  /**
   * 라디오 그룹 아이템의 기본 크기
   * @default 'lg'
   */
  size?: 'lg' | 'md' | 'sm';
  /**
   * 라디오 그룹 아이템의 기본 색상
   * @default 'primary'
   */
  color?: 'primary' | 'info';
  /**
   * 라디오 그룹 컨테이너의 너비
   * - `full`: 100% 너비 적용
   * - `auto`: 콘텐츠 크기에 맞춤
   * @default 'auto'
   */
  width?: 'full' | 'auto';
  /**
   * 이미 선택된 아이템 다시 클릭 시 선택 해제 허용 여부
   * @default false
   */
  allowDeselect?: boolean;
  /**
   * allowDeselect의 별칭 (선택 해제 허용 여부)
   * @default false
   */
  clearable?: boolean;
}

/**
 * RadioGroup 컴포넌트는 여러 옵션 중 하나만 선택할 수 있는 폼 컨트롤들의 그룹 역할을 합니다.
 * Radix UI RadioGroup Primitive를 래핑하여 에러 상태 관리 및 에러 메시지 렌더링 기능을 제공합니다.
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & RadioGroupExtraProps
>(
  (
    {
      className,
      error,
      errorMsg,
      variant,
      size,
      color,
      width = 'auto',
      errorPs = 'bl',
      value,
      defaultValue,
      onValueChange,
      required,
      disabled,
      allowDeselect = false,
      clearable,
      ...props
    },
    ref
  ) => {
    const errorId = React.useId();
    const groupRequired = Boolean(required);
    const groupDisabled = Boolean(disabled);
    const canDeselect = clearable ?? allowDeselect;
    const isTabGroup = variant === 'tab' || variant === 'folderTab';

    const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
    const isControlled = value !== undefined;
    const selectedValue = isControlled ? value : internalValue;
    const hasSelection = typeof selectedValue === 'string' && selectedValue.length > 0;
    const groupError = Boolean(error) && !hasSelection;

    const handleValueChange = React.useCallback(
      (nextValue: string) => {
        if (!isControlled) {
          setInternalValue(nextValue);
        }
        onValueChange?.(nextValue);
      },
      [isControlled, onValueChange]
    );

    return (
      <RadioGroupContext.Provider
        value={{
          error: groupError,
          required: groupRequired,
          disabled: groupDisabled,
          selectedValue: selectedValue ?? undefined,
          allowDeselect: canDeselect,
          handleValueChange,
          variant,
          size,
          color,
        }}
      >
        <div className={cn('relative', width === 'full' ? 'w-full' : 'w-auto')}>
          <RadioGroupPrimitive.Root
            className={cn(
              isTabGroup
                ? 'cp-radio-tabs flex items-end justify-start relative w-full border-b-[0.1rem] border-b-[var(--color-primary-50,#ff5c2e)]'
                : 'cp-radio flex items-center justify-start flex-wrap gap-x-2 gap-y-1',
              className
            )}
            value={selectedValue ?? undefined}
            defaultValue={defaultValue}
            onValueChange={handleValueChange}
            required={required}
            disabled={disabled}
            {...props}
            ref={ref}
          />
          {groupError && (
            <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
              {errorMsg}
            </ErrorMsg>
          )}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * RadioGroupItem 컴포넌트의 Props 정의
 */
interface RadioGroupItemExtraProps extends VariantProps<typeof radioGroupItemVariants> {
  /**
   * 라디오 아이템 색상 테마
   * - `primary`: 기본 테마색상 적용
   * - `info`: 파란색 계열 테마색상 적용
   * @default 'primary'
   */
  color?: 'primary' | 'info';
  /** 아이템 텍스트 또는 콘텐츠 */
  children?: React.ReactNode;
  /** 에러 상태(유효하지 않음) 표시 여부 */
  error?: boolean;
  /** 에러 메시지 내용 */
  errorMsg?: React.ReactNode;
  /**
   * 에러 메시지 표시 위치
   * @default 'bl'
   */
  errorPs?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
}

/**
 * RadioGroupItem 컴포넌트는 RadioGroup 내부의 단일 선택 옵션 요소입니다.
 * 원형 스타일(default), 버튼 스타일(button), 칩 스타일(chipBox) 등의 다양한 변형을 지원합니다.
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & RadioGroupItemExtraProps
>(
  (
    {
      className,
      variant,
      size,
      color,
      width,
      children,
      error = false,
      errorMsg: _errorMsg = '선택은 필수입니다.',
      errorPs: _errorPs = 'bl',
      ...props
    },
    ref
  ) => {
    const {
      error: groupError,
      required: groupRequired,
      disabled: groupDisabled,
      selectedValue,
      allowDeselect,
      handleValueChange,
      variant: groupVariant,
      size: groupSize,
      color: groupColor,
    } = React.useContext(RadioGroupContext);

    const resolvedVariant = variant ?? groupVariant ?? 'default';
    const resolvedSize = size ?? groupSize ?? 'lg';
    const resolvedColor = color ?? groupColor ?? 'primary';

    const isButton = resolvedVariant === 'button';
    const isNoCheckButton = resolvedVariant === 'noCheckButton';
    const isChipBox = resolvedVariant === 'chipBox';
    const isTab = resolvedVariant === 'tab' || resolvedVariant === 'folderTab';
    const isTabBadge = resolvedVariant === 'tabBadge';
    const generatedId = React.useId();
    const radioId = props.id || generatedId;
    const isError = error || groupError;
    const isRequired = Boolean(props.required || groupRequired);
    const isDisabled = Boolean(props.disabled || groupDisabled);
    const indicatorSize = resolvedSize === 'sm' ? 'md' : resolvedSize;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      props.onClick?.(e);
      if (e.defaultPrevented) return;

      if (allowDeselect && props.value === selectedValue && handleValueChange) {
        handleValueChange('');
      }
    };

    return (
      <div
        className={cn(
          'relative',
          !isTab && 'flex items-center gap-1',
          isTab && 'inline-flex items-end -mr-px',
          (width === 'full' || className?.includes('w-full')) && 'w-full flex-1'
        )}
      >
        <RadioGroupPrimitive.Item
          ref={ref}
          id={radioId}
          onClick={handleClick}
          className={cn(
            radioGroupItemVariants({ variant: resolvedVariant, size: resolvedSize, color: resolvedColor, width }),
            'relative whitespace-nowrap',
            isError &&
              'bg-[var(--color-input-surface-error)]! border-[var(--color-input-border-error)]! border-[0.2rem]!',
            isRequired && 'data-[state=checked]:border-[var(--color-input-border-highlight)]',
            isButton && 'pl-[2.2rem]',
            className
          )}
          data-variant={resolvedVariant || undefined}
          data-required={isRequired}
          data-invalid={isError ? '' : undefined}
          aria-invalid={isError ? true : undefined}
          {...props}
          {...(isChipBox || isTab || isTabBadge || resolvedVariant === 'none' ? {} : { size: undefined })}
        >
          {isButton ? (
            <div
              className={cn(
                'border border-[var(--color-gray-15)]! absolute left-[0.6rem] rounded-full flex items-center justify-center bg-white focus:!outline-none tracking-[-0.13rem]',
                resolvedSize === 'sm'
                  ? 'top-[0.35rem] h-[1.2rem] w-[1.2rem]'
                  : resolvedSize === 'md'
                    ? 'top-[0.45rem] h-[1.4rem] w-[1.4rem]'
                    : 'top-[0.55rem] h-[1.4rem] w-[1.4rem]'
              )}
            >
              <RadioGroupPrimitive.Indicator className="flex items-center justify-center whitespace-nowrap focus:!outline-none">
                <div
                  className={cn(
                    radioIndicatorVariants({ size: 'lg', color: resolvedColor, disabled: isDisabled }),
                    resolvedSize === 'sm' ? 'h-[0.7rem] w-[0.7rem]' : 'h-[0.8rem] w-[0.8rem]'
                  )}
                />
              </RadioGroupPrimitive.Indicator>
            </div>
          ) : !(isNoCheckButton || isChipBox || isTab || isTabBadge) ? (
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center whitespace-nowrap">
              <div
                className={cn(
                  radioIndicatorVariants({ size: indicatorSize, color: resolvedColor, disabled: isDisabled }),
                  resolvedSize === 'lg' && 'h-[1rem] w-[1rem]',
                  resolvedSize === 'md' && 'h-[0.6rem] w-[0.6rem]'
                )}
              />
            </RadioGroupPrimitive.Indicator>
          ) : null}
          {children && (isButton || isNoCheckButton || isChipBox || isTab || isTabBadge) && children}
        </RadioGroupPrimitive.Item>

        {children && !isButton && !isNoCheckButton && !isChipBox && !isTab && !isTabBadge && (
          <label
            htmlFor={radioId}
            className={cn(
              'text-[1.3rem] font-normal cursor-pointer select-none tracking-[-0.13rem]',
              isError && 'text-[var(--color-text-danger)]'
            )}
          >
            {children}
          </label>
        )}
      </div>
    );
  }
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
