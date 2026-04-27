import { useState, useRef, useCallback, useMemo } from 'react';
import { GridApi, SelectionChangedEvent } from 'ag-grid-community';

interface BaseRow {
  id: number;
  locked?: boolean;
  isDuplicate?: boolean;
  isChecked?: boolean;
  isError?: boolean;
}

export function useLtpa350Step2Logic<T extends BaseRow>(initialData: T[], onSelectPlan?: (planId: number) => void) {
  // 1) UI 확장 및 툴팁 상태
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  const [testError, setTestError] = useState(false);
  const [gridKey, setGridKey] = useState(0);

  // 2) 체크박스 상태 관리
  const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false, reset: false });
  const handleCheckedChange = (key: string) => (checked: boolean | 'indeterminate') => {
    setCheckedMap((map) => ({ ...map, [key]: !!checked }));
  };

  // 3) 그리드 데이터 상태
  const [rowData, setRowData] = useState<T[]>(initialData);
  const pendingSelectIdRef = useRef<number | null>(null);
  const prevSelectedIdsRef = useRef<Set<number>>(new Set());

  // 데이터 업데이트 (중복 행 추적 포함)
  const setRowDataWithTracking = useCallback((updater: T[] | ((prev: T[]) => T[])) => {
    setRowData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (next.length > prev.length) {
        const prevIds = new Set(prev.map((r) => r.id));
        const newDuplicate = next.find((r) => !prevIds.has(r.id) && r.isDuplicate);
        if (newDuplicate) {
          pendingSelectIdRef.current = newDuplicate.id;
        }
      }
      return next;
    });
  }, []);

  // 4) 공통 그리드 핸들러
  const ensureLockedRowsSelected = useCallback((api: GridApi<T>) => {
    api.forEachNode((node) => {
      if (node.data?.locked && !node.isSelected()) {
        node.setSelected(true);
      }
    });
  }, []);

  const handleGridReady = useCallback((params: { api: GridApi<T> }) => {
    params.api.forEachNode((node) => {
      if (node.data?.isChecked && !node.isSelected()) {
        node.setSelected(true);
      }
    });
    ensureLockedRowsSelected(params.api);
    prevSelectedIdsRef.current = new Set(
      params.api.getSelectedNodes().map((n) => n.data?.id).filter((id): id is number => id !== undefined)
    );
  }, [ensureLockedRowsSelected]);

  const handleRowDataUpdated = useCallback((params: { api: GridApi<T> }) => {
    ensureLockedRowsSelected(params.api);
    if (pendingSelectIdRef.current !== null) {
      const nodeToSelect = params.api.getRowNode(String(pendingSelectIdRef.current));
      if (nodeToSelect) {
        nodeToSelect.setSelected(true);
        pendingSelectIdRef.current = null;
      }
    }
  }, [ensureLockedRowsSelected]);

  const handleGridSelectionChanged = useCallback((event: SelectionChangedEvent<T>) => {
    ensureLockedRowsSelected(event.api);
    const currentSelectedIds = new Set(
      event.api.getSelectedNodes().map((n) => n.data?.id).filter((id): id is number => id !== undefined)
    );

    // 트리 확장/축소 및 해제된 중복 행 삭제 로직
    const deselectedDuplicateIds: number[] = [];
    prevSelectedIdsRef.current.forEach((id) => {
      if (!currentSelectedIds.has(id)) {
        const node = event.api.getRowNode(String(id));
        if (node?.data?.isDuplicate) deselectedDuplicateIds.push(id);
      }
    });

    if (deselectedDuplicateIds.length > 0) {
      setRowData((prev) => prev.filter((row) => !deselectedDuplicateIds.includes(row.id)));
    }

    prevSelectedIdsRef.current = currentSelectedIds;
    if (onSelectPlan) {
       // 실제 구현에서는 선택된 첫 번째 ID 혹은 목록을 전달
       onSelectPlan(Array.from(currentSelectedIds)[0] as number);
    }
    
    event.api.refreshCells({ force: true });
  }, [ensureLockedRowsSelected, onSelectPlan]);

  const toggleError = (id: number | string) => {
    setRowData((prev) => {
      const updated = prev.map((row) => (row.id == id ? { ...row, isError: !row.isError } : row)) as T[];
      return [...updated].sort((a, b) => (a.isError === b.isError ? 0 : a.isError ? -1 : 1));
    });
  };

  return {
    isHeightExpanded, setIsHeightExpanded,
    checkedMap, handleCheckedChange,
    showProductNameTooltip, setShowProductNameTooltip,
    testError, setTestError,
    gridKey, setGridKey,
    rowData, setRowData, setRowDataWithTracking,
    handleGridReady, handleRowDataUpdated, handleGridSelectionChanged,
    toggleError
  };
}