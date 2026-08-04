/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ExcelExportParams } from 'ag-grid-enterprise';
import type { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import log from '@/shared/utils/logger';
import { FileExportIcon } from '@icons';
import { Button } from '@uiux/Button';

const logger = log.getLogger('ExcelExportButton');

export interface ExcelExportButtonProps<T> {
  /** 내보내기 대상 ag-Grid 인스턴스 ref */
  gridRef: React.RefObject<AgGridReact<T> | null>;
  /** ag-Grid `exportDataAsExcel`에 그대로 전달할 옵션 (fileName, sheetName, columnKeys 등) */
  exportParams?: ExcelExportParams;
  /** 버튼 라벨 (기본: '엑셀내보내기') */
  buttonLabel?: React.ReactNode;
  /** 내보내기 완료 후 콜백 */
  onSuccess?: () => void;
  /** 내보내기 실패 시 콜백 (기본: 로그 + alert) */
  onError?: (error: unknown) => void;
  /** Button에 그대로 전달할 추가 props */
  buttonProps?: Omit<React.ComponentProps<typeof Button>, 'onClick' | 'children'>;
}

function defaultOnError(error: unknown) {
  logger.error('엑셀 내보내기 실패:', error);
  alert('엑셀 내보내기에 실패했습니다.');
}

/**
 * ag-Grid의 `exportDataAsExcel`을 호출하는 공용 버튼.
 * gridRef만 넘기면 되고, `exportParams`로 파일명/시트명/컬럼 범위 등을 커스터마이징할 수 있다.
 */
export function ExcelExportButton<T>({
  gridRef,
  exportParams,
  buttonLabel = '엑셀내보내기',
  onSuccess,
  onError = defaultOnError,
  buttonProps,
}: ExcelExportButtonProps<T>) {
  function exportExcel() {
    try {
      gridRef.current?.api.exportDataAsExcel(exportParams);
      onSuccess?.();
    } catch (error) {
      onError(error);
    }
  }

  return (
    <Button color="success" variant="outlined" {...buttonProps} onClick={exportExcel}>
      {buttonLabel}
      <FileExportIcon />
    </Button>
  );
}
