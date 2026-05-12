/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { GridApi, SelectionChangedEvent } from 'ag-grid-enterprise';
import { useCallback } from 'react';

export function useGridSelectionChangedHandler<
  T extends { id: string | number; isDuplicate?: boolean; locked?: boolean },
>(options: {
  ensureLockedRowsSelected: (api: GridApi<T>) => void;
  setRowData: React.Dispatch<React.SetStateAction<T[]>>;
  prevSelectedIdsRef: React.MutableRefObject<Set<string | number>>;
  handleSelectionChanged: (event: SelectionChangedEvent<T>) => void;
  onSelectedIdsChange?: (selectedIds: Set<string | number>) => void;
  refreshColumns?: string[];
}) {
  const {
    ensureLockedRowsSelected,
    setRowData,
    prevSelectedIdsRef,
    handleSelectionChanged,
    onSelectedIdsChange,
    refreshColumns,
  } = options;

  return useCallback(
    (event: SelectionChangedEvent<T>): void => {
      ensureLockedRowsSelected(event.api);
      const currentSelectedIds = new Set(
        event.api
          .getSelectedNodes()
          .map((n) => n.data?.id)
          .filter((id): id is string | number => id !== undefined)
      );

      event.api.forEachNode((node) => {
        if (node.data) {
          const shouldExpand = currentSelectedIds.has(node.data.id);
          if (node.expanded !== shouldExpand) {
            node.setExpanded(shouldExpand);
          }
        }
      });

      const deselectedDuplicateIds: Array<string | number> = [];
      prevSelectedIdsRef.current.forEach((id) => {
        if (!currentSelectedIds.has(id)) {
          const node = event.api.getRowNode(String(id));
          if (node?.data?.isDuplicate) {
            deselectedDuplicateIds.push(id);
          }
        }
      });

      if (deselectedDuplicateIds.length > 0) {
        setRowData((prev) => prev.filter((row) => !deselectedDuplicateIds.includes(row.id)));
      }

      onSelectedIdsChange?.(currentSelectedIds);
      handleSelectionChanged(event);
      if (refreshColumns && refreshColumns.length > 0) {
        event.api.refreshCells({
          force: true,
          columns: refreshColumns,
        });
      }
    },
    [
      ensureLockedRowsSelected,
      setRowData,
      prevSelectedIdsRef,
      handleSelectionChanged,
      onSelectedIdsChange,
      refreshColumns,
    ]
  );
}
