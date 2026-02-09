import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

interface UITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'outline';
}

function Textarea({ className, variant = 'default', ...props }: UITextareaProps) {
  const variantStyles = {
    default: '',
    outline: 'border-2 border-gray-300 focus:border-orange-500',
  };

  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-[0.2rem] text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[0.3rem] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
