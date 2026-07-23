/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useId } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Ltpz995Result } from '@/shared/types/fileTypes';
import { UploadFileItem } from '@/shared/types/fileTypes';
import log from '@/shared/utils/logger';
import { open } from '@/shared/utils/popup/popupApi';
import { Gcol, Grow, Typo } from '@atoms';
import { FileItemIcon, FileUploadIcon, InputClearIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

const logger = log.getLogger('FileUpload');

// ─── Types ───────────────────────────────────────────────────────────────────

/**
 * FileUpload 컴포넌트의 Props 인터페이스입니다.
 */
type FileUploadProps = {
  /** 컴포넌트의 고유 ID (에러 메시지 웹 접근성 연결용) */
  id?: string;
  /** 표시할 파일 목록 데이터 배열 */
  files?: UploadFileItem[];
  /** 루트 요소에 적용할 추가 스타일 클래스 */
  className?: string;
  /** 에러 메시지 내용 (전달 시 파일명이 빨간색 밑줄로 표시됨) */
  errorMessage?: string;
  /** 파일선택 버튼 클릭 시 실행할 커스텀 콜백 (생략 시 기본 팝업 LTPZ995 호출) */
  onClickButton?: () => void;
  /** 파일명을 클릭했을 때 실행할 콜백 함수 */
  onClickFileName?: (file: UploadFileItem, index: number) => void;
  /** 파일 목록이 추가되거나 삭제되었을 때 호출되는 콜백 함수 */
  onChange?: (files: UploadFileItem[]) => void;
};

// ─── FileUpload ───────────────────────────────────────────────────────────────

/**
 * FileUpload 컴포넌트는 파일선택 버튼과 선택된 파일 태그를 함께 표시하는 UI 요소입니다.
 * 업로드 로직은 포함하지 않으며, 파일 목록과 이벤트 핸들러를 외부에서 주입하는 Controlled 컴포넌트입니다.
 */
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
    <Grow placement={'ss'} gap={1.5} className={cn(className, 'cp-fileupload')}>
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
            name={file.originalFilename}
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

// ─── FileTag ─────────────────────────────────────────────────────────────────

/**
 * 개별 파일 태그를 렌더링하는 FileTag 컴포넌트의 Props 인터페이스입니다.
 */
type FileTagProps = {
  /** 파일 이름 (전체 파일명) */
  name: string;
  /** 파일 확장자 (생략 시 name에서 자동 추출) */
  ext?: string;
  /** 파일 삭제 버튼 클릭 콜백 */
  onRemove: () => void;
  /** 에러 표시 상태 여부 (빨간색 및 밑줄 적용) */
  hasError?: boolean;
  /** 파일 이름 클릭 콜백 */
  onNameClick?: () => void;
};

function FileTag({ name, ext, onRemove, hasError = false, onNameClick }: FileTagProps) {
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
