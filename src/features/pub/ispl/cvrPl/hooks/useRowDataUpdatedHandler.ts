/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { GridApi } from 'ag-grid-enterprise';
import { useCallback } from 'react';
import type { EnsureLockedRowsSelected } from '../types/gridTypes';

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
