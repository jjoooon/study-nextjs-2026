/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import { rowDataWithTrackingFactory, getNextNumericRowId, patchCopiedDuplicateRow, isCopyButtonVisible } from '@aggrid';
import type { CellClassParams } from 'ag-grid-enterprise';

import type { EnsureLockedRowsSelected } from '../types/gridTypes';

export { rowDataWithTrackingFactory, getNextNumericRowId, patchCopiedDuplicateRow, isCopyButtonVisible };

export function editableCellClassRules<T>() {
  return {
    'editable-cell': (params: CellClassParams<T>) => {
      const isRowChecked = params.node?.isSelected?.() ?? false;
      return isRowChecked;
    },
  };
}

export const ensureLockedRowsSelected: EnsureLockedRowsSelected = (api, isLocked = (row) => !!row.locked) => {
  api.forEachNode((node) => {
    if (node.data && isLocked(node.data) && !node.isSelected()) {
      node.setSelected(true);
    }
  });
};

export function sortRows<T extends { isError?: boolean }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => {
    if (a.isError === b.isError) return 0;
    return a.isError ? -1 : 1;
  });
}

export function toggleError<T extends { id: string | number; isError?: boolean }>(
  id: string | number,
  setRows: React.Dispatch<React.SetStateAction<T[]>>
) {
  setRows((prev) => {
    const updated = prev.map((row) => (row.id == id ? { ...row, isError: !row.isError } : row));
    return sortRows(updated);
  });
}
