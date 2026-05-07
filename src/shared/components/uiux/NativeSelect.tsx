import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { UIUXsize } from '@/shared/types/uiTypes';
import { Typo } from '@atoms';
import { ErrorMsg } from '@common/ErrorMsg';
import { SelectDropIcon } from '@icons';

interface UINativeSelectProps extends Omit<React.ComponentProps<'select'>, 'size'> {
  variant?: 'default' | 'text';
  size?: UIUXsize;
  width?: number | string; // 숫자면 rem으로 변환, 'full'이면 100%, 'auto'면 auto
  required?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMsg?: React.ReactNode;
  errorPs?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
}

type NativeSelectOptGroupProps = React.HTMLAttributes<HTMLOptGroupElement> & {
  disabled?: boolean;
  label?: string;
};

function NativeSelect({
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
}: UINativeSelectProps) {
  const resolvedWidth =
    typeof width === 'number' ? `${width / 10}rem` : width === 'full' ? '100%' : width === 'auto' ? 'auto' : width;
  const widthStyle = resolvedWidth ? { width: resolvedWidth } : undefined;

  const errorId = React.useId();
  const isInvalid = props['aria-invalid'] === 'true' || props['aria-invalid'] === true;

  const baseStyle = cn(
    'w-full rounded-[0.4rem] px-2 pr-7 text-[1.3rem] border box-border tracking-[--typo-letter-spacing-n3] appearance-none truncate',
    isInvalid || error
      ? 'text-[var(--color-danger-50)] bg-[var(--color-danger-5)] border-[var(--color-danger-50)] border-[0.2rem] ring-1 ring-[var(--color-danger-5)]'
      : required
        ? 'text-[var(--color-text-basic)] bg-[var(--color-warning-10)] border-[var(--color-warning-30)]'
        : 'text-[var(--color-text-basic)] border-[var(--color-input-border)] bg-white'
  );
  const hoverStyle =
    isInvalid || error
      ? 'hover:border-[var(--color-danger-50)]'
      : required
        ? 'hover:border-[var(--color-warning-70)]'
        : 'hover:border-[var(--color-input-border-hover)]';
  const focusStyle = `${
    isInvalid || error
      ? 'focus:border-[var(--color-danger-50)] focus:ring-[var(--color-danger-5)]'
      : required
        ? 'focus:border-[var(--color-warning-70)] focus:border-[0.2rem]'
        : 'focus:border-[var(--color-gray-100)] focus:border-[0.2rem]'
  } 
    focus:ring-1 ${!isInvalid && !error ? 'focus:ring-[var(--color-gray-5)]' : ''} focus:outline-none`;
  const readonlyStyle = readOnly
    ? 'bg-[var(--color-input-surface-disabled)] cursor-not-allowed opacity-100 pointer-events-none'
    : '';
  const disabledStyle = 'disabled:opacity-50 disabled:cursor-not-allowed';
  const disabledStyle2 = 'disabled:opacity-100 !border-0 !p-0 !w-auto';
  const sizeStyle = `${size === 'lg' ? 'h-[2.8rem]' : 'h-[2.5rem]'}`;

  const variantStyles = {
    default: cn(baseStyle, hoverStyle, focusStyle, readonlyStyle, disabledStyle, sizeStyle),
    text: cn(baseStyle, hoverStyle, focusStyle, readonlyStyle, disabledStyle2, sizeStyle),
  };

  const arrowStateStyle =
    isInvalid || error
      ? 'var(--color-danger-50)'
      : required
        ? 'var(--color-icon-gray)'
        : readOnly
          ? 'var(--color-icon-gray-lighter)'
          : 'var(--color-icon-secondary)';

  return (
    <div className={cn('relative', className)} style={widthStyle}>
      <div className="group/native-select relative tracking-[-0.13rem]" data-slot="native-select-wrapper">
        {variant !== 'text' && !props.disabled ? (
          <>
            <select
              data-slot="native-select"
              className={cn(variantStyles[variant])}
              tabIndex={readOnly ? -1 : props.tabIndex}
              aria-invalid={error || undefined}
              aria-describedby={error ? errorId : undefined}
              // disabled={readOnly || props.disabled}
              {...props}
            />
            <SelectDropIcon
              className={cn(
                'pointer-events-none absolute top-1/2 right-[0.8rem] -translate-y-1/2 select-none text-[var(--color-icon-basic)]',
                size === 'lg' ? 'size-[1.6rem]' : 'size-[1.2rem]'
              )}
              aria-hidden="true"
              color={arrowStateStyle}
            />
          </>
        ) : (
          <Typo variant="heading-sm" className="whitespace-nowrap">
            {(() => {
              const selectedValue = props.value ?? props.defaultValue;
              const matched = (
                React.Children.toArray(props.children) as React.ReactElement<
                  React.OptionHTMLAttributes<HTMLOptionElement>
                >[]
              ).find((child) => child.props.value === selectedValue);
              return matched ? matched.props.children : selectedValue;
            })()}
          </Typo>
        )}
      </div>
      {error && (
        <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
          {errorMsg}
        </ErrorMsg>
      )}
    </div>
  );
}

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
