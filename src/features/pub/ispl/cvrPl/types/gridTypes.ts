/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import type { GridApi } from 'ag-grid-enterprise';

export type EnsureLockedRowsSelected = <T extends { locked?: boolean }>(
  api: GridApi<T>,
  isLocked?: (row: T) => boolean
) => void;
