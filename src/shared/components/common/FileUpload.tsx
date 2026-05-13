/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Grow, Gcol, Typo } from '@atoms';
import { FileUploadIcon, InputClearIcon } from '@icons';
import { FileItemIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { useId, useState, useEffect } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

type FileItem = {
  name: string;
  ext?: string;
  key?: string;
};

type FileUploadProps = {
  id?: string;
  files?: FileItem[];
  className?: string;
  errorMessage?: string;
  onClickButton?: () => void;
  onClickFileName?: (file: FileItem, index: number) => void;
  onRemove?: (file: FileItem, index: number) => void;
};

// ─── FileUpload ───────────────────────────────────────────────────────────────

export function FileUpload({
  id,
  files: filesProp = [],
  errorMessage,
  onClickButton,
  onClickFileName,
  onRemove,
  className,
}: FileUploadProps) {
  const generatedId = useId();
  const baseId = id ?? generatedId;

  const [files, setFiles] = useState<FileItem[]>(filesProp);

  // 외부 props가 바뀔 때 내부 state 동기화
  useEffect(() => {
    setFiles(filesProp);
  }, [filesProp]);

  const handleRemove = (file: FileItem, index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index)); // 화면 즉시 반영
    onRemove?.(file, index); // 콜백 호출
  };

  return (
    <Grow placement={'ss'} gap={1.5} className={className}>
      {/* ── 파일선택 버튼 ── */}
      <div className="relative w-[7.7rem] h-[2.5rem]">
        <Button
          variant={'outlined'}
          color={'gray'}
          size={'md'}
          aria-label="파일선택"
          aria-describedby={errorMessage ? `${baseId}-error` : undefined}
          aria-invalid={!!errorMessage}
          onClick={onClickButton}
        >
          <FileUploadIcon size={12} />
          파일선택
        </Button>
      </div>

      {/* ── 파일 태그 목록 ── */}
      <Gcol className="pt-[0.2rem]" gap={1.5} placement={'ss'}>
        {files.map((file, index) => (
          <FileTag
            key={file.key ?? `${file.name}-${index}`}
            name={file.name}
            ext={file.ext}
            hasError={!!errorMessage}
            onNameClick={() => {
              onClickButton?.();
              onClickFileName?.(file, index);
            }}
            onRemove={() => handleRemove(file, index)}
          />
        ))}
      </Gcol>

      {/* ── 에러 메시지 ── */}
      {errorMessage && (
        <p id={`${baseId}-error`} role="alert" className="w-full mt-0.5">
          <Typo variant="body-sm" tag="span" className="text-[var(--color-text-danger)]">
            {errorMessage}
          </Typo>
        </p>
      )}
    </Grow>
  );
}

// ─── Utils ───────────────────────────────────────────────────────────────────

// 확장자를 제외한 본문에서 마지막 글자를 빼고 ...처리, 마지막 글자+확장자만 남김

// ─── FileTag ─────────────────────────────────────────────────────────────────

type FileTagProps = {
  name: string;
  ext?: string;
  onRemove: () => void;
  hasError?: boolean;
  onNameClick?: () => void;
};

function FileTag({ name, ext, onRemove, hasError = false, onNameClick }: FileTagProps) {
  // 확장자/마지막글자 분리
  let base = name;
  let extension = ext;
  if (!ext && name.includes('.')) {
    const idx = name.lastIndexOf('.');
    base = name.slice(0, idx);
    extension = name.slice(idx + 1);
  }
  const lastChar = base.slice(-1);
  const baseWithoutLast = base.slice(0, -1);

  return (
    <Grow placement={'sc'} className="w-full">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={onNameClick}
            className={cn(
              'flex items-center gap-[0.2rem] hover:[&>div]:underline hover:[&>div]:text-[#006FF2]',
              onNameClick ? 'cursor-pointer' : 'cursor-default'
            )}
          >
            <FileItemIcon className="shrink-0" />
            <Typo
              variant="body-sm"
              tag="div"
              className={cn(
                'grid grid-cols-[1fr_auto] transition-colors duration-100 tracking-0 pr-[0.3rem] w-full',
                hasError ? 'text-[var(--color-text-danger)] underline' : 'hover:text-[#006FF2] hover:underline'
              )}
            >
              {baseWithoutLast.length > 0 ? (
                <>
                  <span className="truncate inline-block align-middle">{baseWithoutLast}</span>
                  <span className="inline-block align-middle tracking-[-0.02rem]">
                    {lastChar}
                    {extension ? '.' + extension : ''}
                  </span>
                </>
              ) : (
                <span className="inline-block align-middle">{name}</span>
              )}
            </Typo>
          </button>
        </TooltipTrigger>
        <TooltipContent variant="default" side="bottom" align="center" sideOffset={0}>
          {name}
        </TooltipContent>
      </Tooltip>

      <Button
        type="button"
        aria-label={`${name} 삭제`}
        onClick={onRemove}
        only={'icon'}
        variant={'none'}
        className={cn(
          'shrink-0 inline-flex items-center justify-center',
          'w-[1.6rem] h-[1.6rem] rounded-full',
          'text-[var(--color-text-subtle)] translate-y-[0.1rem]'
        )}
      >
        <InputClearIcon color={'#6B7280'} size={16} />
      </Button>
    </Grow>
  );
}
