import * as React from 'react';
import { ErrorMsg } from '@common/ErrorMsg';

import { Grow } from '@atoms';
import { ReSizeIcon } from '@icons';
import { cn } from '@/shared/lib/shadcn/utils';

interface UITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'outline';
  error?: boolean;
  errorMsg?: React.ReactNode;
  errorPs?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
  /** 최소 글자 수 표시 및 에러 조건 연동 */
  showMinLengthCount?: boolean;
  maxLength?: number; // 최대 글자 수 (optional, but commonly used with textarea)
}

function Textarea({
  className,
  variant = 'default',
  error = false,
  errorMsg = '입력은 필수입니다.',
  errorPs = 'bl',
  showMinLengthCount = true,
  maxLength = 1000,
  ...props
}: UITextareaProps) {
  const errorId = React.useId();
  const isInvalid = props['aria-invalid'] === 'true' || props['aria-invalid'] === true;

  // minLength 조건을 만족하면 에러 해제 (0이하는 1로 처리)
  const currentLength = String(props.value ?? props.defaultValue ?? '').length;
  const effectiveMinLength = props.minLength !== undefined ? Math.max(props.minLength, 1) : undefined;
  const minLengthSatisfied = effectiveMinLength !== undefined ? currentLength >= effectiveMinLength : true;
  const showError = (error || isInvalid) && !minLengthSatisfied;

  const variantStyles = {
    default: '',
    outline: 'border-2 border-gray-300 focus:border-orange-500',
  };

  const errorStyle = showError
    ? 'text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] border-[var(--color-input-border-error)] focus-visible:border-[var(--color-input-border-error)] focus-visible:ring-[var(--color-input-surface-error)]'
    : '';

  return (
    <div className="w-[60rem]">
      <div className="relative border border-[var(--color-gray-20)] rounded-[0.4rem] p-2 pb-0 w-[24rem]">
        <textarea
          data-slot="textarea"
          aria-invalid={showError || undefined}
          aria-describedby={showError ? errorId : undefined}
          className={cn(
            'border-none shadow-0 placeholder:text-[var(--color-gray-30)] focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content h-full w-full bg-transparent p-0 text-[1.3rem] transition-[color,box-shadow] outline-none focus-visible:ring-[0.3rem] disabled:cursor-not-allowed disabled:opacity-50',
            variantStyles[variant],
            errorStyle,
            className
          )}
          {...props}
        />
        <div className="absolute bottom-[2.4rem] right-1 pointer-events-none text-gray-400 event-none bg-[#fff]">
          <ReSizeIcon />
        </div>

        {maxLength && (
          <Grow placement={'ec'} className={cn(
            'text-right text-[1.3rem] text-[var(--color-gray-30)] min-h-[2.8rem] ',
          )}>
            <span className="text-[var(--color-gray-100)]">{currentLength}</span> / {maxLength}byte
          </Grow>
        )}

        {showError && (
          <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
            {errorMsg}
          </ErrorMsg>
        )}
      </div>
    </div>
  );
}

export { Textarea };
