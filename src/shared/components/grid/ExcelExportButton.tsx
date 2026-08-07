/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, ExcelExportParams } from 'ag-grid-enterprise';
import type { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import log from '@/shared/utils/logger';
import { FileExportIcon } from '@icons';
import { Button } from '@uiux/Button';

const logger = log.getLogger('ExcelExportButton');

export interface ExcelExportButtonProps<T> {
  /** 내보내기 대상 ag-Grid 인스턴스 ref */
  gridRef: React.RefObject<AgGridReact<T> | null>;
  /** 내보낼 엑셀 파일명 (지정 시 exportParams.fileName보다 우선) */
  fileName?: string;
  /** ag-Grid `exportDataAsExcel`에 그대로 전달할 옵션 (fileName, sheetName, columnKeys 등) */
  exportParams?: ExcelExportParams;
  /**
   * export 전용 컬럼 정의. 지정하면 export 직전에 그리드의 columnDefs를 이걸로 잠시 교체했다가
   * export 후 원래 columnDefs로 복원한다. 화면은 headerComponent/cellRenderer로 렌더링하지만
   * 엑셀에는 그 결과가 반영되지 않으므로, headerName/valueGetter만으로 구성된 별도 컬럼 정의가 필요할 때 사용.
   */
  excelColumnDefs?: (ColDef<T> | ColGroupDef<T>)[];
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
 * `excelColumnDefs`를 넘기면 export 순간에만 그리드 columnDefs를 그걸로 교체했다가 원복한다.
 */
export function ExcelExportButton<T>({
  gridRef,
  fileName,
  exportParams,
  excelColumnDefs,
  buttonLabel = '엑셀내보내기',
  onSuccess,
  onError = defaultOnError,
  buttonProps,
}: ExcelExportButtonProps<T>) {
  function handleExcelExport() {
    try {
      const api = gridRef.current?.api;
      const params = fileName ? { ...exportParams, fileName } : exportParams;

      if (api && excelColumnDefs) {
        const originalColumnDefs = api.getColumnDefs();
        let sheetData: string | undefined;
        try {
          // exportDataAsExcel은 내부적으로 'exporting' 오버레이를 비동기로 띄운 뒤 다음 tick에
          // 실제 데이터를 수집한다. 그 사이 아래 finally에서 columnDefs를 원복해버리면
          // excelColumnDefs가 아니라 복원된 원래 columnDefs가 export되어 버린다.
          // getSheetDataForExcel은 완전히 동기적으로 현재 컬럼 상태를 읽어 시트 데이터를 만들기 때문에
          // 이걸로 먼저 데이터를 확보한 뒤 columnDefs를 복원하고, exportMultipleSheetsAsExcel로 내려받는다.
          api.setGridOption('columnDefs', excelColumnDefs);
          sheetData = api.getSheetDataForExcel(params ?? {});
        } finally {
          api.setGridOption('columnDefs', originalColumnDefs);
        }
        if (sheetData) {
          api.exportMultipleSheetsAsExcel({ data: [sheetData], fileName: params?.fileName });
        }
      } else {
        api?.exportDataAsExcel(params);
      }
      onSuccess?.();
    } catch (error) {
      onError(error);
    }
  }

  return (
    <Button color="success" variant="outlined" {...buttonProps} onClick={handleExcelExport}>
      {buttonLabel}
      <FileExportIcon />
    </Button>
  );
}
