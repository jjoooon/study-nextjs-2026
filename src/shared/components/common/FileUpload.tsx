'use client';

import { useId } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Grow, Typo } from '@atoms';
import { FileUploadIcon, InputClearIcon } from '../icons';
import { Button } from '../uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../uiux/Tooltip';

// ─── Types ───────────────────────────────────────────────────────────────────

type FileItem = {
  name: string;
  /** 식별용 key (없으면 name 사용) */
  key?: string;
};

type FileUploadProps = {
  id?: string;
  /** 표시할 파일 목록 */
  files?: FileItem[];
  className?: string;
  errorMessage?: string;
  /** 파일선택 버튼 클릭 */
  onClickButton?: () => void;
  /** 파일 태그 X 클릭 */
  onRemove?: (file: FileItem, index: number) => void;
};

// ─── FileUpload ───────────────────────────────────────────────────────────────

export function FileUpload({
  id,
  files = [],
  errorMessage,
  onClickButton,
  onRemove,
}: FileUploadProps) {
  const generatedId = useId();
  const baseId = id ?? generatedId;

  return (
    <Grow>
      {/* ── 파일선택 버튼 ── */}
      <Button
        variant={'outlined'}
        color={'gray'}
        size={'md'}
        aria-label="파일선택"
        aria-describedby={errorMessage ? `${baseId}-error` : undefined}
        aria-invalid={!!errorMessage}
        onClick={onClickButton}
        className={errorMessage}
      >
        <FileUploadIcon />
        파일선택
      </Button>

      {/* ── 파일 태그 목록 ── */}
      {files.map((file, index) => (
        <FileTag
          key={file.key ?? `${file.name}-${index}`}
          name={file.name}
          hasError={!!errorMessage}
          onRemove={() => onRemove?.(file, index)}
        />
      ))}

      {/* ── 에러 메시지 ── */}
      {errorMessage && (
        <p
          id={`${baseId}-error`}
          role="alert"
          className="w-full mt-0.5"
        >
          <Typo variant="body-sm" tag="span" className="text-[var(--color-text-danger)]">
            {errorMessage}
          </Typo>
        </p>
      )}
    </Grow>
  );
}

// ─── Utils ───────────────────────────────────────────────────────────────────

/**
 * 파일명이 길면 중간을 '...'으로 대체하고 마지막 글자를 보존합니다.
 * 예) "매우 긴 파일명 입니다.이렇게 길면 잘립니다 확인용" → "매우 긴 파일명 입...용"
 */
function truncateTail(name: string, keepStart = 12, keepEnd = 1): string {
  if (name.length <= keepStart + keepEnd) return name;
  return `${name.slice(0, keepStart)}...${name.slice(-keepEnd)}`;
}

// ─── FileTag ─────────────────────────────────────────────────────────────────

type FileTagProps = {
  name: string;
  onRemove: () => void;
  hasError?: boolean;
};

function FileTag({ name, onRemove, hasError = false }: FileTagProps) {
  const displayName = truncateTail(name);

  return (
    <Grow className="group">
      {/* 파일명 — hover 시 tooltip + 파란색, error 시 빨간색 */}
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="min-w-0 w-[12.3rem]">
            <Typo
              variant="body-sm"
              tag="span"
              className={cn(
                'transition-colors duration-100 ',
                hasError
                  ? 'text-[var(--color-text-danger)] underline'
                  : 'hover:text-[#006FF2] hover:underline'
              )}
            >
              {displayName}
            </Typo>
          </span>
        </TooltipTrigger>
        <TooltipContent variant="default" side="bottom" align="center" sideOffset={0}>
          {name}
        </TooltipContent>
      </Tooltip>

      {/* X 버튼 */}
      <button
        type="button"
        aria-label={`${name} 삭제`}
        onClick={onRemove}
        className={cn(
          'shrink-0 inline-flex items-center justify-center',
          'w-3.5 h-3.5 rounded-full',
          'text-[var(--color-text-subtle)]'
        )}
      >
        <InputClearIcon color={'#6B7280'} size={16} />
      </button>
    </Grow>
  );
}