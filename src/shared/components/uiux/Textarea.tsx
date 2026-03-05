import * as React from 'react';
import { ErrorMsg } from '@common/ErrorMsg';

import { cn } from '@/shared/lib/shadcn/utils';

interface UITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'outline';
  error?: boolean;
  errorMsg?: React.ReactNode;
  errorPs?: 'tl' | 'tr' | 'bl' | 'br';
}

function Textarea({
  className,
  variant = 'default',
  error = false,
  errorMsg = '입력은 필수입니다.',
  errorPs = 'bl',
  ...props
}: UITextareaProps) {
  const errorId = React.useId();
  const isInvalid = props['aria-invalid'] === 'true' || props['aria-invalid'] === true;

  const variantStyles = {
    default: '',
    outline: 'border-2 border-gray-300 focus:border-orange-500',
  };

  const errorStyle =
    isInvalid || error
      ? 'text-[var(--color-text-danger)] bg-[var(--color-input-surface-error)] border-[var(--color-input-border-error)] focus-visible:border-[var(--color-input-border-error)] focus-visible:ring-[var(--color-input-surface-error)]'
      : '';

  return (
    <div className="relative w-full">
      <textarea
        data-slot="textarea"
        aria-invalid={error || undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-[0.2rem] text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[0.3rem] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          variantStyles[variant],
          errorStyle,
          className
        )}
        {...props}
      />

      {error && (
        <ErrorMsg aria-live="polite" show={true} position={errorPs} id={errorId}>
          {errorMsg}
        </ErrorMsg>
      )}
    </div>
  );
}

export { Textarea };
