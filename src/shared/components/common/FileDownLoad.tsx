/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { FileItemIcon, InputClearIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';

/**
 * 파일 다운로드 리스트 1행을 구성하는 기본 데이터 모델.
 */
export type DownloadFileItem = {
  /** 사용자에게 표시할 파일명 */
  filename: string;
  /** 파일 크기(바이트 기준 number 또는 숫자 문자열) */
  filesize: string | number;
  /** 실제 다운로드 주소 또는 파일 식별 값 */
  fileAddress: string;
};

/**
 * 파일 행 컴포넌트 props.
 * - `download=true`: 체크박스가 있는 "다운로드 대상 선택" 모드
 * - `download=false`: 삭제 버튼이 있는 "업로드된 파일 표시" 모드
 */
type FileDownLoadProps = DownloadFileItem & {
  download?: boolean;
};

/**
 * `filesize`를 안전하게 byte(number)로 정규화.
 * - 숫자면 유효값만 통과
 * - 문자열이면 `parseFloat` 후 유효값만 통과
 * - 비정상 값은 0으로 처리
 */
function toBytes(filesize: string | number): number {
  if (typeof filesize === 'number') {
    return Number.isFinite(filesize) ? filesize : 0;
  }

  const parsed = Number.parseFloat(filesize);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * byte 값을 사람이 읽기 쉬운 단위 문자열(KB/MB/GB)로 변환.
 * - 소수점 2자리 고정
 */
export function formatFileSizeFromBytes(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)}GB`;
  }
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
  }
  return `${(bytes / 1024).toFixed(2)}KB`;
}

/**
 * 파일 다운로드/표시 리스트의 단일 아이템 UI.
 *
 * 렌더 모드:
 * 1) `download=true`
 *    - 체크박스 + 파일명 + 파일크기
 *    - 여러 파일 중 다운로드 대상 선택 UI에 사용
 *
 * 2) `download=false`
 *    - 파일명 + 파일크기 + 우측 삭제 아이콘 버튼
 *    - 업로드 완료 후 목록 표시/제거 UI에 사용
 */
export function FileDownLoad({ filename, filesize, fileAddress, download = true }: FileDownLoadProps) {
  /** 파일 크기 표시 문자열(예: 12.34MB) */
  const fileSizeLabel = formatFileSizeFromBytes(toBytes(filesize));

  return (
    <Grow
      variant="box-line"
      className="w-full border-[var(--color-gray-15)] items-center h-[56.rem] bg-[#FFF] rounded-[0.8rem] py-[0.8rem] px-[1rem]"
      placement="bwe"
    >
      {download ? (
        <Gcol className="flex items-start">
          {/*
            다운로드 대상 선택 모드:
            - Checkbox value로 fileAddress를 전달해 선택값 식별에 활용
          */}
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
            {/* 업로드/첨부 목록 표시 모드 */}
            <Typo variant={'body-md'} className="flex justify-start items-center gap-0.5">
              <FileItemIcon />
              {filename}
            </Typo>
            <Typo variant={'body-sm'} className="text-[#FF5C2E] mr-[1rem]">
              {fileSizeLabel}
            </Typo>
          </Gcol>
          {/* TODO: 실제 삭제 핸들러 연결 필요 */}
          <Button variant={'none'} onClick={() => {}} only={'icon'}>
            <InputClearIcon color="#6B7280" />
          </Button>
        </>
      )}
    </Grow>
  );
}

/**
 * 파일 목록 전체 용량 합계를 계산해 표시 문자열로 반환.
 * - 각 파일의 `filesize`를 안전하게 byte로 변환 후 누적
 */
export function formatTotalFileSize(files: DownloadFileItem[]): string {
  const totalBytes = files.reduce((total, file) => total + toBytes(file.filesize), 0);
  return formatFileSizeFromBytes(totalBytes);
}
