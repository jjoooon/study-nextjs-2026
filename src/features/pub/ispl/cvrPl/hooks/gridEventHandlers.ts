/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { createSelectionChangedHandler } from '@aggrid';
import type { GridApi, SelectionChangedEvent } from 'ag-grid-enterprise';
import { useCallback, useMemo } from 'react';

import type { EnsureLockedRowsSelected } from '../types/gridTypes';

export function useGridReadyHandler<T extends { id: string | number; isChecked?: boolean; locked?: boolean }>(
  ensureLockedRowsSelected: EnsureLockedRowsSelected
) {
  return useCallback(
    (params: { api: GridApi<T> }): void => {
      params.api.forEachNode((node) => {
        if (node.data?.isChecked && !node.isSelected()) {
          node.setSelected(true);
        }
      });
      ensureLockedRowsSelected<T>(params.api);
    },
    [ensureLockedRowsSelected]
  );
}

export function useRowDataUpdatedHandler<T extends { id: string | number; locked?: boolean }>(
  ensureLockedRowsSelected: EnsureLockedRowsSelected
) {
  return useCallback(
    (params: { api: GridApi<T>; pendingSelectId: string | number | null }): void => {
      ensureLockedRowsSelected<T>(params.api);
      if (params.pendingSelectId !== null) {
        const nodeToSelect = params.api.getRowNode(String(params.pendingSelectId));
        if (nodeToSelect) {
          nodeToSelect.setSelected(true);
        }
      }
    },
    [ensureLockedRowsSelected]
  );
}

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

export function useHandleSelectionChanged<T, K>(idKey: keyof T, callback?: (id: K) => void) {
  return useMemo(() => createSelectionChangedHandler<T, K>(idKey, callback), [callback, idKey]);
}
