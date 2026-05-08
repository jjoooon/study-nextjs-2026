/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { FileItemIcon, InputClearIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';

type FileDownLoadProps = {
  filename: string;
  filesize: string | number;
  fileAddress: string;
  download?: boolean;
};

function toBytes(filesize: string | number): number {
  if (typeof filesize === 'number') {
    return Number.isFinite(filesize) ? filesize : 0;
  }

  const parsed = Number.parseFloat(filesize);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatFileSizeFromBytes(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)}GB`;
  }
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
  }
  return `${(bytes / 1024).toFixed(2)}KB`;
}

export function FileDownLoad({ filename, filesize, fileAddress, download = true }: FileDownLoadProps) {
  const fileSizeLabel = formatFileSizeFromBytes(toBytes(filesize));

  return (
    <Grow
      variant="box-line"
      className="w-full border-[var(--color-gray-15)] items-center h-[56.rem] bg-[#FFF] rounded-[0.8rem] py-[0.8rem] px-[1rem]"
      placement="bwe"
    >
      {download ? (
        <Gcol className="flex items-start">
          <Checkbox value={fileAddress}>
            <Typo variant={'body-md'} className="flex justify-start items-center gap-0.5">
              <FileItemIcon />
              {filename}
            </Typo>
            <Typo variant={'body-sm'} className="text-[var(--color-primary-50)] mr-[1rem]">
              {fileSizeLabel}
            </Typo>
          </Checkbox>
        </Gcol>
      ) : (
        <>
          <Gcol className="flex items-start">
            <Typo variant={'body-md'} className="flex justify-start items-center gap-0.5">
              <FileItemIcon />
              {filename}
            </Typo>
            <Typo variant={'body-sm'} className="text-[#FF5C2E] mr-[1rem]">
              {fileSizeLabel}
            </Typo>
          </Gcol>
          <Button variant={'none'} onClick={() => {}} only={'icon'}>
            <InputClearIcon color="#6B7280" />
          </Button>
        </>
      )}
    </Grow>
  );
}

export function formatTotalFileSize(files: Array<{ filesize: string | number }>): string {
  const totalBytes = files.reduce((total, file) => total + toBytes(file.filesize), 0);
  return formatFileSizeFromBytes(totalBytes);
}
