import { AgGridReact } from 'ag-grid-react';

// 함수 오버로드: AgGrid 케이스
export function getCell(
  target: React.RefObject<AgGridReact | null>,
  rowIndex: number,
  colKey: string
): string | null | undefined;

// 함수 오버로드: 배열 케이스
export function getCell<T extends Record<string, unknown>>(
  target: T[],
  rowIndex: number,
  colKey: string
): T[keyof T] | undefined;

// 구현
export function getCell<T extends Record<string, unknown>>(
  target: React.RefObject<AgGridReact | null> | T[],
  rowIndex: number,
  colKey: string
): string | null | T[keyof T] | undefined {
  if ('current' in target) {
    // aggrid 인 경우
    const api = target.current?.api;
    if (api) {
      const rowNode = api.getDisplayedRowAtIndex(rowIndex);
      if (rowNode) {
        return api.getCellValue({ rowNode, colKey });
      }
      return '';
    }
  } else {
    // 배열인 경우
    const item = target.at(rowIndex);
    if (item) {
      return item[colKey] as T[keyof T];
    }
  }
}

// 함수 오버로드: 배열 케이스
export function setCell<T extends Record<string, unknown>>(
  target: T[],
  rowIndex: number,
  colKey: string,
  value: T[keyof T]
): void;

// 함수 오버로드: AgGrid 케이스
export function setCell(
  target: React.RefObject<AgGridReact | null>,
  rowIndex: number,
  colKey: string,
  value: unknown
): void;

// 구현
export function setCell<T extends Record<string, unknown>>(
  target: React.RefObject<AgGridReact | null> | T[],
  rowIndex: number,
  colKey: string,
  value: unknown
): void {
  if ('current' in target) {
    // aggrid 인 경우
    const api = target.current?.api;
    if (api) {
      const rowNode = api.getDisplayedRowAtIndex(rowIndex);
      if (rowNode) {
        rowNode.setDataValue(colKey, value);
      }
    }
  } else {
    // 배열인 경우
    const item = target.at(rowIndex);
    if (item) {
      (item as T)[colKey as keyof T] = value as T[keyof T];
    }
  }
}
