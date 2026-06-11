/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useId } from 'react';
// TODO: @YunJunmo 경로 이동 고려
// eslint-disable-next-line boundaries/element-types
import { Ltpz995Result } from '@/features/pub/shared/components/popups/Ltpz995';
import { cn } from '@/shared/lib/shadcn/utils';
import { UploadFileItem } from '@/shared/types/fileTypes';
import log from '@/shared/utils/logger';
import { open } from '@/shared/utils/popup/popupApi';
import { Gcol, Grow, Typo } from '@atoms';
import { FileItemIcon, FileUploadIcon, InputClearIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

const logger = log.getLogger('FileUpload');

// ─── Types ───────────────────────────────────────────────────────────────────

type FileUploadProps = {
  id?: string;
  files?: UploadFileItem[];
  className?: string;
  errorMessage?: string;
  onClickButton?: () => void;
  onClickFileName?: (file: UploadFileItem, index: number) => void;
  onChange?: (files: UploadFileItem[]) => void;
};

// ─── FileUpload ───────────────────────────────────────────────────────────────

export function FileUpload({
  id,
  files = [],
  errorMessage,
  onClickButton,
  onClickFileName,
  onChange,
  className,
}: FileUploadProps) {
  const generatedId = useId();
  const baseId = id ?? generatedId;

  const handleRemove = (file: UploadFileItem, index: number) => {
    onChange?.(files.filter((_, i) => i !== index));
  };

  const handleClickButton = async () => {
    onClickButton?.();
    const result = await open<Ltpz995Result>('LTPZ995', { files });
    logger.debug(result);
    if (result.action === 'select' && result.files) {
      onChange?.(result.files);
    }
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
          onClick={handleClickButton}
        >
          <FileUploadIcon size={12} />
          파일선택
        </Button>
      </div>

      {/* ── 파일 태그 목록 ── */}
      <Gcol className="pt-[0.2rem]" gap={1.5} placement={'ss'}>
        {files.map((file, index) => (
          <FileTag
            key={file.edmsId}
            name={file.storedFilename}
            // TODO: @YunJunmo 유틸로 변경
            ext={'png'}
            hasError={!!errorMessage}
            onNameClick={() => {
              handleClickButton();
              onClickFileName?.(file, index);
            }}
            onRemove={() => handleRemove(file, index)}
          />
        ))}
      </Gcol>

      {/* ── 에러 메시지 ── */}
      {errorMessage && (
        <p id={`${baseId}-error`} role="alert" className="w-full mt-0.5">
          <Typo variant="body-sm" tag="span" className="text-(--color-text-danger)">
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
                hasError ? 'text-(--color-text-danger) underline' : 'hover:text-[#006FF2] hover:underline'
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
          'text-(--color-text-subtle) translate-y-px'
        )}
      >
        <InputClearIcon color={'#6B7280'} size={16} />
      </Button>
    </Grow>
  );
}
