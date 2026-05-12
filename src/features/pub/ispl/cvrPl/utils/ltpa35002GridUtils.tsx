/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

export {
  groupEditableButtonRenderer,
  productNameCellRenderer,
  searchButtonRenderer,
  uwIconRenderer,
} from '@grid/CellRenderers';
export {
  editableCellClassRules,
  ensureLockedRowsSelected,
  rowDataWithTrackingFactory,
  sortRows,
  toggleError,
} from './agGridUtils';
export type { EnsureLockedRowsSelected, ProductNameCellBase, ProductTitleDetail } from '../types/gridTypes';

export type DuplicateRowBase = {
  id: string | number;
  isDuplicate?: boolean;
  isChecked?: boolean;
  filePath?: string[];
};

export function getNextNumericRowId<T extends { id: string | number }>(rows: T[]): number {
  const ids = rows.map((row) => (typeof row.id === 'number' ? row.id : Number(row.id))).filter((id) => !isNaN(id));
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  return maxId + 1;
}

export function patchCopiedDuplicateRow<T extends DuplicateRowBase>(
  originalRow: T,
  nextId: number
): T & { displayNo: string | number } {
  return {
    ...originalRow,
    id: nextId,
    displayNo: originalRow.id,
    isDuplicate: true,
    isChecked: true,
    filePath: Array.isArray(originalRow.filePath) ? [...originalRow.filePath, String(nextId)] : [String(nextId)],
  };
}

export function isCopyButtonVisible<T extends { isDuplicate?: boolean }>(params: {
  node?: { isSelected?: () => boolean | undefined };
  data?: T;
}): boolean {
  const isRowChecked = params.node?.isSelected?.() ?? false;
  const isCopiedRow = params.data?.isDuplicate === true;
  return isRowChecked && !isCopiedRow;
}
