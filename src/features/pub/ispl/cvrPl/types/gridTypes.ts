/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import type { GridApi } from 'ag-grid-enterprise';

export type ProductNameCellBase = {
  id: string | number;
  isDuplicate?: boolean;
  num?: number | null;
  displayNo?: number | string;
  badge?: string[];
  title?: string | number | boolean;
};

export type ProductTitleDetail = {
  title: string;
  description: string;
  info: string[];
};

export type EnsureLockedRowsSelected = <T extends { locked?: boolean }>(
  api: GridApi<T>,
  isLocked?: (row: T) => boolean
) => void;
