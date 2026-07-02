/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from 'react';
import iaListData from './ialist.json';

export type PageProcessStep = 1 | 2 | 3 | 4 | 5 | 6;
export type SortOrder = 'default' | 'asc' | 'desc';
export type SortKey = 'dep4' | 'file' | 'plan' | 'pub' | 'dev' | 'path' | 'id' | 'completeDate' | 'modifyDate';

export type SortState = {
  key: SortKey | null;
  order: SortOrder;
};

export type IARow = {
  num?: number;
  no?: number;
  dep1: string;
  dep2: string;
  dep3: string;
  id: string;
  subId?: string;
  step?: string;
  dep4: string;
  type?: string;
  tab?: string;
  new?: string;
  plan: string;
  pub: string;
  dev: string;
  date: string;
  modify: string;
  file?: string;
  popup?: string;
  path?: string;
};

const ROWS: IARow[] = iaListData as IARow[];

export const getRowKey = (row: Pick<IARow, 'id' | 'subId'>) => `${row.id}-${row.subId ?? ''}`;

export const formatCompleteDate = (value: string) => value.replace(/^26\./, '');

export const isCompletedRow = (row: Pick<IARow, 'date'>) => {
  return Boolean(row.date?.trim());
};

export function useIaDashboard() {
  const [showPhaseOnly] = React.useState(false);
  const [sortState, setSortState] = React.useState<SortState>({ key: null, order: 'default' });
  const [selectedPlan, setSelectedPlan] = React.useState<string>('all');
  const [selectedPub, setSelectedPub] = React.useState<string>('all');
  const [selectedDev, setSelectedDev] = React.useState<string>('all');

  const [activeRowKey, setActiveRowKey] = React.useState<string>(() => getRowKey(ROWS[0]));

  const handleSort = React.useCallback((key: SortKey) => {
    setSortState((prev) => {
      if (prev.key !== key || prev.order === 'default') {
        return { key, order: 'asc' };
      }
      if (prev.order === 'asc') {
        return { key, order: 'desc' };
      }
      return { key: null, order: 'default' };
    });
  }, []);

  const visibleRows = React.useMemo(() => {
    const filtered = ROWS.filter((row) => row.dep1 === '차세대가입설계');
    if (!showPhaseOnly) {
      return filtered;
    }
    return filtered.filter((row) => isCompletedRow(row));
  }, [showPhaseOnly]);

  const pubOptions = React.useMemo(() => {
    const names = new Set<string>();
    visibleRows.forEach((row) => {
      const value = row.pub ?? '';
      if (value) {
        names.add(value);
      }
    });
    return Array.from(names).sort((left, right) => left.localeCompare(right, 'ko'));
  }, [visibleRows]);

  const devOptions = React.useMemo(() => {
    const names = new Set<string>();
    visibleRows.forEach((row) => {
      if (row.dev) {
        names.add(row.dev);
      }
    });
    return Array.from(names).sort((left, right) => left.localeCompare(right, 'ko'));
  }, [visibleRows]);

  const planOptions = React.useMemo(() => {
    const names = new Set<string>();
    visibleRows.forEach((row) => {
      if (row.plan) {
        names.add(row.plan);
      }
    });
    return Array.from(names).sort((left, right) => left.localeCompare(right, 'ko'));
  }, [visibleRows]);

  const ownerFilteredRows = React.useMemo(() => {
    return visibleRows.filter((row) => {
      const isPlanMatched = selectedPlan === 'all' || row.plan === selectedPlan;
      const isPubMatched = selectedPub === 'all' || row.pub === selectedPub;
      const isDevMatched = selectedDev === 'all' || row.dev === selectedDev;
      return isPlanMatched && isPubMatched && isDevMatched;
    });
  }, [selectedDev, selectedPlan, selectedPub, visibleRows]);

  const totalCount = React.useMemo(() => ownerFilteredRows.length, [ownerFilteredRows]);
  const doneCount = React.useMemo(() => {
    return ownerFilteredRows.filter((row) => isCompletedRow(row)).length;
  }, [ownerFilteredRows]);
  const progressPercent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const activeRow = React.useMemo(() => {
    return ownerFilteredRows.find((row) => getRowKey(row) === activeRowKey) ?? ownerFilteredRows[0] ?? null;
  }, [activeRowKey, ownerFilteredRows]);

  const sortedRows = React.useMemo(() => {
    if (sortState.key === null || sortState.order === 'default') {
      return ownerFilteredRows;
    }
    const sortKey = sortState.key;
    return [...ownerFilteredRows].sort((left, right) => {
      if (sortKey === 'completeDate' || sortKey === 'modifyDate') {
        const getDateNum = (row: IARow, type: 'completeDate' | 'modifyDate') => {
          const result = type === 'completeDate' ? row.date : row.modify;
          return (result ?? '').replace(/\./g, '');
        };
        const leftValue = getDateNum(left, sortKey);
        const rightValue = getDateNum(right, sortKey);
        const compareResult = leftValue.localeCompare(rightValue);
        return sortState.order === 'asc' ? compareResult : -compareResult;
      }
      type SortableKeys = keyof Pick<IARow, 'dep4' | 'file' | 'plan' | 'pub' | 'dev' | 'path' | 'id'>;
      if (!sortKey || !['dep4', 'file', 'plan', 'pub', 'dev', 'path', 'id'].includes(sortKey)) {
        return 0;
      }
      const key = sortKey as SortableKeys;
      const leftValue = left[key] ?? '';
      const rightValue = right[key] ?? '';
      const compareResult = leftValue.localeCompare(rightValue, 'ko');
      return sortState.order === 'asc' ? compareResult : -compareResult;
    });
  }, [ownerFilteredRows, sortState]);

  const toPageStep = React.useCallback((subId: string): PageProcessStep | undefined => {
    const match = subId.match(/_(\d)$/);

    if (!match) {
      return undefined;
    }

    const step = Number(match[1]);
    if (step >= 1 && step <= 6) {
      return step as PageProcessStep;
    }

    return undefined;
  }, []);

  const activeStep = toPageStep(activeRow?.subId ?? '');

  return {
    sortState,
    selectedPlan,
    setSelectedPlan,
    selectedPub,
    setSelectedPub,
    selectedDev,
    setSelectedDev,
    activeRowKey,
    setActiveRowKey,
    handleSort,
    pubOptions,
    devOptions,
    planOptions,
    totalCount,
    doneCount,
    progressPercent,
    activeRow,
    activeStep,
    sortedRows,
  };
}
