'use client';

import { useId, useState, useEffect } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Grow, Typo } from '@atoms';
import { FileUploadIcon, InputClearIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

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
  onRemove?: (file: FileItem, index: number) => void;
};

// ─── FileUpload ───────────────────────────────────────────────────────────────

export function FileUpload({
  id,
  files: filesProp = [],
  errorMessage,
  onClickButton,
  onRemove,
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
    onRemove?.(file, index);                                // 콜백 호출
  };

  return (
    <Grow>
      {/* ── 파일선택 버튼 ── */}
      <div className="relative w-[7.7rem] h-[2.5rem]">
        <input
          type="file"
          className="w-full h-full border opacity-0 cursor-pointer"
          onChange={e => {
            const fileList = e.target.files;
            if (!fileList || fileList.length === 0) return;
            const newFiles: FileItem[] = Array.from(fileList).map(f => {
              const fullName = f.name;
              const lastDot = fullName.lastIndexOf('.')
              const hasExt = lastDot > 0;
              const name = hasExt ? fullName.slice(0, lastDot) : fullName;
              const ext = hasExt ? fullName.slice(lastDot + 1) : '';
              return [name, ext] ;
            });
            setFiles(newFiles);
          }}
        />
        <Button
          variant={'outlined'}
          color={'gray'}
          size={'md'}
          aria-label="파일선택"
          aria-describedby={errorMessage ? `${baseId}-error` : undefined}
          aria-invalid={!!errorMessage}
          onClick={onClickButton}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <FileUploadIcon />
          파일선택
        </Button>
      </div>
      

      {/* ── 파일 태그 목록 ── */}
      {files.map((file, index) => (
        <FileTag
          key={file.key ?? `${file.name}-${index}`}
          name={file.name}
          hasError={!!errorMessage}
          onRemove={() => handleRemove(file, index)}
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

function truncateTail(name: string, keepStart = 12, keepEnd = 1): string {
  if (name.length <= keepStart + keepEnd) return name;
  return `${name.slice(0, keepStart)}...${name.slice(-keepEnd)}`;
}

// ─── FileTag ─────────────────────────────────────────────────────────────────

type FileTagProps = {
  name: string;
  ext?: string;
  onRemove: () => void;
  hasError?: boolean;
};

function FileTag({ name, ext, onRemove, hasError = false }: FileTagProps) {
  const displayName = truncateTail(name);
  const displayExt = truncateTail(ext ?? '');

  return (
    <Grow className="group">
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="min-w-0 w-[12.3rem]">
            <Typo
              variant="body-sm"
              tag="span"
              className={cn(
                'transition-colors duration-100',
                hasError
                  ? 'text-[var(--color-text-danger)] underline'
                  : 'hover:text-[#006FF2] hover:underline'
              )}
            >
              {displayName}{displayExt ? `.${displayExt}` : ''}
            </Typo>
          </span>
        </TooltipTrigger>
        <TooltipContent variant="default" side="bottom" align="center" sideOffset={0}>
          {name}
        </TooltipContent>
      </Tooltip>

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