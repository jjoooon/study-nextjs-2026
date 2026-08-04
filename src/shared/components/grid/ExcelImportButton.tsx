/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import * as XLSX from 'xlsx';
import { useUploadExcelFileMutation } from '@/shared/services/excelUploadService';
import { base64ToUint8Array, fileToBase64 } from '@/shared/utils/base64FileUtils';
import log from '@/shared/utils/logger';
import { FileExportIcon } from '@icons';
import { Button } from '@uiux/Button';

const logger = log.getLogger('ExcelImportButton');

export interface ExcelImportButtonProps<T extends Record<string, unknown>> {
  /** input accept 속성 (기본: '.xlsx,.xls') */
  accept?: string;
  /** 버튼 라벨 (기본: '엑셀가져오기') */
  buttonLabel?: React.ReactNode;
  /** 임포트 완료 시 콜백 */
  onImported?: (importedRows: T[]) => void;
  /** 임포트 실패 시 콜백 (기본: 로그) */
  onError?: (error: unknown) => void;
  /** Button에 그대로 전달할 추가 props */
  buttonProps?: Omit<React.ComponentProps<typeof Button>, 'onClick' | 'children'>;
}

// 엑셀/JSON 변환 과정에서 boolean이 "true"/"false" 문자열로 내려오는 경우가 많아, 값 그대로 실제 boolean으로 정규화한다.
function normalizeBooleanStrings<T extends Record<string, unknown>>(row: T): T {
  const normalized: Record<string, unknown> = { ...row };

  for (const key of Object.keys(normalized)) {
    const value = normalized[key];
    if (typeof value !== 'string') continue;

    const lowered = value.trim().toLowerCase();
    if (lowered === 'true') normalized[key] = true;
    else if (lowered === 'false') normalized[key] = false;
  }

  return normalized as T;
}

function parseWorkbookToRows<T extends Record<string, unknown>>(workbook: XLSX.WorkBook): T[] {
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  return XLSX.utils.sheet_to_json<T>(worksheet).map(normalizeBooleanStrings);
}

function defaultOnError(error: unknown) {
  logger.error('엑셀 업로드 실패:', error);
}

/**
 * 엑셀 파일을 업로드해 그리드 rowData 타입(T)과 동일한 shape의 데이터로 파싱한 뒤 onImported로 전달하는 버튼.
 * 엑셀 헤더가 T의 field명과 일치하는 "완전한 데이터 파일"이라고 가정한다 (id 포함, 별도 매핑/채번 없음).
 * 업로드 API는 프로젝트 공용 엔드포인트(`excelUploadService`) 하나만 사용한다.
 */
export function ExcelImportButton<T extends Record<string, unknown>>({
  accept = '.xlsx,.xls',
  buttonLabel = '엑셀가져오기',
  onImported,
  onError = defaultOnError,
  buttonProps,
}: ExcelImportButtonProps<T>) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadExcelFile] = useUploadExcelFileMutation();

  async function importExcel(file: File) {
    try {
      const fileContent = await fileToBase64(file);
      const response = await uploadExcelFile({ fileName: file.name, fileContent }).unwrap();

      const workbook = XLSX.read(base64ToUint8Array(response.fileContent), { type: 'array' });
      const importedRows = parseWorkbookToRows<T>(workbook);

      onImported?.(importedRows);
      logger.info(`엑셀 임포트 완료: ${response.fileName} (${importedRows.length}행 추가)`, importedRows);
    } catch (error) {
      onError(error);
    }
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = ''; // 같은 파일 재선택 허용

    if (file) {
      void importExcel(file);
    }
  }

  return (
    <>
      <input ref={fileInputRef} type="file" accept={accept} className="hidden" onChange={handleFileInputChange} />
      <Button color="success" variant="outlined" {...buttonProps} onClick={() => fileInputRef.current?.click()}>
        {buttonLabel}
        <FileExportIcon />
      </Button>
    </>
  );
}
