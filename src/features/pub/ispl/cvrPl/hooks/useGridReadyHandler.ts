/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import type { GridApi } from 'ag-grid-enterprise';
import { useCallback } from 'react';
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
