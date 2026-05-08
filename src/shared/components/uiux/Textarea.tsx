import { Grow } from '@atoms';
import { ErrorMsg } from '@common/ErrorMsg';
import { ReSizeIcon } from '@icons';
import * as React from 'react';
import { INPUT_RESTRICTED_CHARS } from '@/shared/constants/restrictedChars';
import { cn } from '@/shared/lib/shadcn/utils';

interface UITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'outline';
  error?: boolean;
  errorMsg?: React.ReactNode;
  errorPs?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';
  /** 최소 글자 수 표시 및 에러 조건 연동 */
  showMinLengthCount?: boolean;
  resize?: boolean | 'y' | ''; // 리사이즈 가능 여부 (기본값: true, 'y'는 세로만)
  maxLength?: number; // 최대 글자 수 (optional, but commonly used with textarea)
  restrictChars?: boolean;
}

function applyRestrictedCharsFilter(value: string): string {
  const sorted = [...INPUT_RESTRICTED_CHARS].sort((a, b) => b.length - a.length);
  return sorted.reduce((acc, char) => acc.split(char).join(''), value);
}

function Textarea({
  className,
  variant = 'default',
  error = false,
  errorMsg = '입력은 필수입니다.',
  errorPs = 'bl',
  resize = true,
  maxLength = 0,
  restrictChars = true,
  value: valueProp,
  defaultValue,
  onChange,
  ...props
}: UITextareaProps) {
  const errorId = React.useId();
  const isInvalid = props['aria-invalid'] === 'true' || props['aria-invalid'] === true;

  // controlled(외부 value 전달) / uncontrolled(내부 state) 이중 모드
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = React.useState<string>(String(defaultValue ?? ''));
  const value = isControlled ? valueProp : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = restrictChars ? applyRestrictedCharsFilter(e.target.value) : e.target.value;
    if (!isControlled) {
      setInternalValue(val);
    }
    if (val !== e.target.value) {
      onChange?.({ ...e, target: { ...e.target, value: val } } as React.ChangeEvent<HTMLTextAreaElement>);
      return;
    }
    onChange?.(e);
  };

  // minLength 조건을 만족하면 에러 해제 (0이하는 1로 처리)
  const currentLength = String(value ?? '').length;
  const effectiveMinLength = props.minLength !== undefined ? Math.max(props.minLength, 1) : undefined;
  const minLengthSatisfied = effectiveMinLength !== undefined ? currentLength >= effectiveMinLength : true;
  const showError = (error || isInvalid) && !minLengthSatisfied;

  const variantStyles = {
    default: 'w-full',
    outline: 'border-2 border-gray-300 focus:border-orange-500',
  };

  const errorStyle = showError
    ? 'text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] border-[var(--color-input-border-error)] focus-visible:border-[var(--color-input-border-error)] focus-visible:ring-[var(--color-input-surface-error)]'
    : '';

  return (
    <div
      className={cn(
        'relative w-full bg-[#fff] border border-[var(--color-gray-20)] rounded-[0.4rem] p-2',
        maxLength === 0 ? 'pb-2' : 'pb-0',
        showError
          ? 'bg-[var(--color-danger-5)] border-[var(--color-danger-50)] outline-[0.2rem] outline-[var(--color-danger-50)] -outline-offset-[0.2rem] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.10)]'
          : '',
        props.readOnly ? 'bg-[#E5E5E5] border-[0.1rem] border-solid border-[#CCC]' : ''
      )}
    >
      <textarea
        data-slot="textarea"
        aria-invalid={showError || undefined}
        aria-describedby={showError ? errorId : undefined}
        className={cn(
          'border-none shadow-0 placeholder:text-[var(--color-gray-30)] focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content h-[6.4rem] w-full bg-transparent p-0 text-[1.3rem] transition-[color,box-shadow] outline-none focus-visible:ring-[0.3rem] disabled:cursor-not-allowed disabled:opacity-50',
          variantStyles[variant],
          errorStyle,
          className,
          resize === 'y' ? 'resize-y' : resize ? 'resize' : 'resize-none'
        )}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {resize && (
        <div
          className={`absolute  right-1 pointer-events-none text-gray-400 event-none bg-[#fff] ${maxLength === 0 ? 'bottom-[0.6rem]' : 'bottom-[2.4rem]'}`}
        >
          <ReSizeIcon className={props.readOnly ? 'bg-[#E5E5E5]' : ''} />
        </div>
      )}

      {maxLength !== 0 && (
        <Grow placement={'ec'} className={cn('text-right text-[1.3rem] text-[var(--color-gray-30)] min-h-[2.8rem] ')}>
          <span className="text-[var(--color-gray-100)]">{currentLength}</span> / {maxLength}byte
        </Grow>
      )}

      {showError && (
        <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
          {errorMsg}
        </ErrorMsg>
      )}
    </div>
  );
}

export { Textarea };
