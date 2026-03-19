'use client';

import { useRef, useState, useId } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Typo } from '@atoms';
import { FileUploadIcon } from '../icons';

type FileUploadProps = {
  id?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  buttonLabel?: string;
  onChange?: (files: File[]) => void;
  onRemove?: (file: File, index: number) => void;
  maxFiles?: number;
  errorMessage?: string;
};

export function FileUpload({
  id,
  accept,
  multiple = false,
  disabled = false,
  className,
  buttonLabel = '파일선택',
  onChange,
  onRemove,
  maxFiles,
  errorMessage,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const handleButtonClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files ?? []);
    if (newFiles.length === 0) return;

    const merged = multiple ? [...selectedFiles, ...newFiles] : newFiles;
    const limited = maxFiles ? merged.slice(0, maxFiles) : merged;

    setSelectedFiles(limited);
    onChange?.(limited);

    // reset so same file can be re-selected
    event.target.value = '';
  };

  const handleRemove = (index: number) => {
    const removed = selectedFiles[index];
    const next = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(next);
    onRemove?.(removed, index);
    onChange?.(next);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleButtonClick();
    }
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
        onChange={handleChange}
      />

      {/* Upload button */}
      <button
        type="button"
        aria-label={buttonLabel}
        aria-describedby={errorMessage ? `${inputId}-error` : undefined}
        aria-invalid={!!errorMessage}
        disabled={disabled}
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5',
          'border border-[var(--color-input-border-default)] rounded-DEFAULT',
          'bg-[var(--color-input-surface-default)]',
          'text-[var(--color-text-default)]',
          'cursor-pointer select-none',
          'transition-colors duration-150',
          'hover:bg-[var(--color-input-surface-hover)] hover:border-[var(--color-input-border-hover)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          errorMessage && 'border-[var(--color-input-border-error)]'
        )}
      >
        <FileUploadIcon />

        <Typo variant="body-sm" tag="span">
          {buttonLabel}
        </Typo>
      </button>

      {/* File tags */}
      {selectedFiles.map((file, index) => (
        <FileTag
          key={`${file.name}-${index}`}
          name={file.name}
          onRemove={() => handleRemove(index)}
          disabled={disabled}
        />
      ))}

      {/* Error message */}
      {errorMessage && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="w-full mt-0.5 text-[var(--color-text-danger)]"
        >
          <Typo variant="body-sm" tag="span">
            {errorMessage}
          </Typo>
        </p>
      )}
    </div>
  );
}

// ─── FileTag ────────────────────────────────────────────────────────────────

type FileTagProps = {
  name: string;
  onRemove: () => void;
  disabled?: boolean;
};

function FileTag({ name, onRemove, disabled }: FileTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1',
        'border border-[var(--color-input-border-default)] rounded-DEFAULT',
        'bg-[var(--color-input-surface-default)]',
        'max-w-[14rem]'
      )}
    >
      <Typo
        variant="body-sm"
        tag="span"
        className="truncate text-[var(--color-text-default)]"
      >
        {name}
      </Typo>

      <button
        type="button"
        aria-label={`${name} 삭제`}
        disabled={disabled}
        onClick={onRemove}
        className={cn(
          'shrink-0 flex items-center justify-center',
          'w-4 h-4 rounded-full',
          'text-[var(--color-text-subtle)]',
          'hover:text-[var(--color-text-danger)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'transition-colors duration-100'
        )}
      >
        {/* X icon */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </span>
  );
}
