/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { UIUXsize } from '@/shared/types/uiTypes';
import { Typo } from '@atoms';
import { ErrorMsg } from '@common/ErrorMsg';
import { SelectDropIcon } from '@icons';

/**
 * NativeSelect 컴포넌트의 Props 인터페이스입니다.
 */
interface UINativeSelectProps extends Omit<React.ComponentProps<'select'>, 'size'> {
  /**
   * 셀렉트 스타일 변형
   * - `default`: 기본 드롭다운 스타일
   * - `text`: 읽기 전용 텍스트처럼 표시하는 스타일
   * @default 'default'
   */
  variant?: 'default' | 'text';
  /**
   * 셀렉트 상자의 크기 (높이)
   * - `lg`: 2.8rem (기본)
   * - `md`: 2.5rem
   * @default 'lg'
   */
  size?: UIUXsize;
  /**
   * 셀렉트 상자의 너비
   * - `full`: 100% 너비
   * - `auto`: 콘텐츠 크기에 맞춤
   * - 그 외 숫자(rem 단위 계산용) 또는 CSS 크기 문자열
   * @default 'full'
   */
  width?: number | string;
  /** 필수 선택 여부 (활성화 시 연한 노란색 배경 스타일 적용) */
  required?: boolean;
  /** 읽기 전용 상태 여부 (클릭 시 드롭다운이 열리지 않음) */
  readOnly?: boolean;
  /** 에러 상태(선택하지 않음 등) 표시 여부 */
  error?: boolean;
  /** 에러 상태일 때 표시할 메시지 내용 */
  errorMsg?: React.ReactNode;
  /**
   * 에러 메시지가 표시될 위치
   * - `tl`: Top Left (상단 좌측)
   * - `tc`: Top Center (상단 중앙)
   * - `tr`: Top Right (상단 우측)
   * - `bl`: Bottom Left (하단 좌측) (기본)
   * - `bc`: Bottom Center (하단 중앙)
   * - `br`: Bottom Right (하단 우측)
   * @default 'bl'
   */
  errorPs?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
}

type NativeSelectOptGroupProps = React.HTMLAttributes<HTMLOptGroupElement> & {
  disabled?: boolean;
  label?: string;
};

/**
 * NativeSelect 컴포넌트는 브라우저의 기본 <select> 요소를 디자인 시스템에 맞게 스타일링한 폼 선택 UI입니다.
 * 일관된 크기/너비/상태 표현과 에러 메시지 위치 제어를 지원합니다.
 */
const NativeSelect = React.forwardRef<HTMLSelectElement, UINativeSelectProps>(
  (
    {
      className,
      variant = 'default',
      size = 'lg',
      width = 'full',
      required = false,
      readOnly = false,
      error = false,
      errorMsg = '입력은 필수입니다.',
      errorPs = 'bl',
      ...props
    },
    ref
  ) => {
    const localRef = React.useRef<HTMLSelectElement>(null);
    React.useImperativeHandle(ref, () => localRef.current!);

    const [selectedValue, setSelectedValue] = React.useState<string | number | readonly string[] | undefined>(
      props.value ?? props.defaultValue ?? ''
    );

    React.useEffect(() => {
      if (props.value !== undefined) {
        setSelectedValue(props.value);
      }
    }, [props.value]);

    React.useEffect(() => {
      if (localRef.current) {
        setSelectedValue(localRef.current.value);
      }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const isValidValue = (val: string | number | readonly string[] | undefined) => {
      if (val === undefined || val === null) return false;
      const strVal = String(val).trim();
      return strVal !== '' && strVal !== 'false';
    };

    const isErrorActive = error && !isValidValue(selectedValue);

    const resolvedWidth =
      typeof width === 'number' ? `${width / 10}rem` : width === 'full' ? '100%' : width === 'auto' ? 'auto' : width;
    const widthStyle = resolvedWidth ? { width: resolvedWidth } : undefined;

    const errorId = React.useId();
    const isInvalid = props['aria-invalid'] === 'true' || props['aria-invalid'] === true;

    const baseStyle = cn(
      'w-full rounded-[0.4rem] px-2 pr-6 text-[1.3rem] border box-border tracking-[-0.13rem] appearance-none truncate',
      isInvalid || isErrorActive
        ? 'text-[var(--color-danger-50)] bg-[var(--color-danger-5)] border-[var(--color-danger-50)] border-[0.2rem] ring-1 ring-[var(--color-danger-5)]'
        : required
          ? 'text-[var(--color-text-basic)] bg-[var(--color-warning-10)] border-[var(--color-warning-30)]'
          : 'text-[var(--color-text-basic)] border-[var(--color-input-border)] bg-white'
    );
    const hoverStyle =
      isInvalid || isErrorActive
        ? 'hover:border-[var(--color-danger-50)]'
        : required
          ? 'hover:border-[var(--color-warning-70)]'
          : 'hover:border-[var(--color-input-border-hover)]';
    const focusStyle = `${
      isInvalid || isErrorActive ? 'focus:border-[var(--color-danger-50)] focus:ring-[var(--color-danger-5)]' : required
      // ? 'focus:border-[#006ff2] focus:ring-1 focus:ring-[#006ff2]'
      // : 'focus:border-[#006ff2] focus:ring-1 focus:ring-[#006ff2]'
    } 
      focus:outline-none`;
    const readonlyStyle = readOnly
      ? 'bg-[var(--color-input-surface-disabled)] cursor-not-allowed opacity-100 pointer-events-none'
      : '';
    const disabledStyle =
      'disabled:bg-[var(--color-input-surface-disabled)] disabled:cursor-not-allowed disabled:opacity-100';
    const disabledStyle2 = 'disabled:opacity-100 !border-0 !p-0 !w-auto';
    const sizeStyle = `${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`;

    const variantStyles = {
      default: cn(baseStyle, hoverStyle, focusStyle, readonlyStyle, disabledStyle, sizeStyle),
      text: cn(baseStyle, hoverStyle, focusStyle, readonlyStyle, disabledStyle2, sizeStyle),
    };

    const arrowStateStyle =
      isInvalid || isErrorActive
        ? 'var(--color-danger-50)'
        : required
          ? 'var(--color-gray-50)'
          : readOnly || props.disabled
            ? 'var(--color-gray-30)'
            : 'var(--color-gray-50)';

    return (
      <div className={cn('relative', className)} style={widthStyle}>
        <div className="group/native-select relative tracking-[-0.13rem]" data-slot="native-select-wrapper">
          {variant !== 'text' ? (
            <>
              <select
                ref={localRef}
                data-slot="native-select"
                className={cn('cp-nativeselect', variantStyles[variant])}
                tabIndex={readOnly ? -1 : props.tabIndex}
                aria-invalid={isErrorActive || undefined}
                aria-describedby={isErrorActive ? errorId : undefined}
                {...props}
                onChange={handleChange}
              />
              <SelectDropIcon
                className={cn(
                  'pointer-events-none absolute top-1/2 right-[0.8rem]  select-none text-[var(--color-icon-basic)]',
                  size === 'lg' ? 'size-[1.4rem] -translate-y-[0.6rem]' : 'size-[1.2rem] -translate-y-[0.5rem]'
                )}
                aria-hidden="true"
                color={arrowStateStyle}
              />
            </>
          ) : (
            <Typo variant="heading-sm" className="whitespace-nowrap">
              {(() => {
                const selectedVal = props.value ?? props.defaultValue;
                const matched = (
                  React.Children.toArray(props.children) as React.ReactElement<
                    React.OptionHTMLAttributes<HTMLOptionElement>
                  >[]
                ).find((child) => child.props.value === selectedVal);
                return matched ? matched.props.children : selectedVal;
              })()}
            </Typo>
          )}
        </div>
        {isErrorActive && (
          <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
            {errorMsg}
          </ErrorMsg>
        )}
      </div>
    );
  }
);

NativeSelect.displayName = 'NativeSelect';

function NativeSelectOption({ ...props }: React.ComponentProps<'option'>) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup({ className, ...props }: NativeSelectOptGroupProps) {
  return React.createElement('optgroup', {
    'data-slot': 'native-select-optgroup',
    className: cn(className),
    ...props,
  });
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
