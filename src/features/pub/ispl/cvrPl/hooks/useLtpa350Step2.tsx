'use client';

import { CoveragePopover, editableSelectCellRenderer } from '@aggrid';
import { createSelectionChangedHandler } from '@aggrid';
import { Grow, Gcol } from '@atoms';
import { SearchIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import {
  ICellRendererParams,
  CellClassParams,
  IGroupCellRendererParams,
  SelectionChangedEvent,
  ValueFormatterParams,
  IRowNode,
} from 'ag-grid-community';
import type { GridApi } from 'ag-grid-community';
import { useCallback, useMemo } from 'react';

/**
 * [공용 훅] AgGrid 초기화 핸들러
 * - locked(고정) 행 자동 선택, isChecked=true 행 자동 선택
 * - 사용 예시:
 *   const ensureLockedRowsSelected = useEnsureLockedRowsSelected();
 *   const gridReadyHandler = useGridReadyHandler<MyRowType>(ensureLockedRowsSelected);
 *   <AgGridReact onGridReady={gridReadyHandler} ... />
 */
export function useGridReadyHandler<T extends { id: string | number; isChecked?: boolean; locked?: boolean }>(
  ensureLockedRowsSelected: ReturnType<typeof useEnsureLockedRowsSelected>
) {
  return useCallback(
    (params: { api: GridApi<T> }) => {
      params.api.forEachNode((node) => {
        if (node.data?.isChecked && !node.isSelected()) {
          node.setSelected(true);
        }
      });
      ensureLockedRowsSelected<T>(params.api);
      // 반환값으로 nextSelectedIds를 전달
      return new Set(
        params.api
          .getSelectedNodes()
          .map((n) => n.data?.id)
          .filter((id): id is string | number => id !== undefined)
      );
    },
    [ensureLockedRowsSelected]
  );
}

/**
 * [공용 훅] 행 데이터 갱신 핸들러
 * - locked(고정) 행 자동 선택, 신규 중복 행 자동 선택
 * - 사용 예시:
 *   const handler = useRowDataUpdatedHandler<MyRowType>(ensureLockedRowsSelected);
 *   <AgGridReact onRowDataUpdated={handler} ... />
 */
export function useRowDataUpdatedHandler<T extends { id: string | number; locked?: boolean }>(
  ensureLockedRowsSelected: ReturnType<typeof useEnsureLockedRowsSelected>
) {
  return useCallback(
    (params: { api: GridApi<T>; pendingSelectId: string | number | null }) => {
      ensureLockedRowsSelected<T>(params.api);
      let cleared = false;
      if (params.pendingSelectId !== null) {
        const nodeToSelect = params.api.getRowNode(String(params.pendingSelectId));
        if (nodeToSelect) {
          nodeToSelect.setSelected(true);
        }
        cleared = true;
      }
      return cleared;
    },
    [ensureLockedRowsSelected]
  );
}

/**
 * [공용 훅] 그리드 선택 변경 통합 핸들러
 * - 고정행 선택 강제, 트리 자동 확장/축소, 중복 행 해제 시 삭제
 * - 사용 예시:
 *   const handler = useGridSelectionChangedHandler<MyRowType>({ ... });
 *   <AgGridReact onSelectionChanged={handler} ... />
 */
export function useGridSelectionChangedHandler<
  T extends { id: string | number; isDuplicate?: boolean; locked?: boolean },
>(options: {
  ensureLockedRowsSelected: (api: GridApi<T>) => void;
  setRowData: React.Dispatch<React.SetStateAction<T[]>>;
  prevSelectedIdsRef: React.MutableRefObject<Set<string | number>>;
  handleSelectionChanged: (event: SelectionChangedEvent<T>) => void;
  refreshColumns?: string[];
}) {
  const { ensureLockedRowsSelected, setRowData, prevSelectedIdsRef, handleSelectionChanged, refreshColumns } = options;

  return useCallback(
    (event: SelectionChangedEvent<T>) => {
      ensureLockedRowsSelected(event.api);
      // 현재 선택된 id 목록
      const currentSelectedIds = new Set(
        event.api
          .getSelectedNodes()
          .map((n) => n.data?.id)
          .filter((id): id is string | number => id !== undefined)
      );
      // 트리 관리: 체크된 행은 expand, 해제된 행은 collapse
      event.api.forEachNode((node) => {
        if (node.data) {
          const shouldExpand = currentSelectedIds.has(node.data.id);
          if (node.expanded !== shouldExpand) {
            node.setExpanded(shouldExpand);
          }
        }
      });
      // 이전 선택에서 해제된 중복 행 찾아 삭제
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

      handleSelectionChanged(event);
      if (refreshColumns && refreshColumns.length > 0) {
        event.api.refreshCells({
          force: true,
          columns: refreshColumns,
        });
      }
      // ref를 직접 변경하지 않고 반환값으로 전달
      return currentSelectedIds;
    },
    [ensureLockedRowsSelected, setRowData, prevSelectedIdsRef, handleSelectionChanged, refreshColumns]
  );
}

/**
 * [공용 셀 렌더러] 값이 있을 때 돋보기(검색) 버튼 표시
 * - 사용 예시: columnDefs에서 cellRenderer: searchButtonRenderer
 */
export function searchButtonRenderer<T>(params: ICellRendererParams<T>) {
  // 복사(중복) 버튼 활성화: 부모(그룹)와 자식 모두에서 value가 있으면 활성화
  // params.node?.group === true 면 그룹(부모), false면 leaf(자식)
  if (!params.value) return null;
  // 그룹(부모)도 value가 있으면 버튼 활성화
  return (
    <div className="flex flex-wrap gap-1 justify-center items-center w-full h-full">
      <Button
        only={'icon'}
        variant={'none'}
        size={'sm'}
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
        disabled={false}
      >
        <SearchIcon color={'var(--color-primary-50)'} />
      </Button>
    </div>
  );
}

/**
 * [공용 훅] 만기/납기 등 드롭다운 셀 렌더러 팩토리
 * - 사용 예시: const getExpiryRenderer = useExpiryCellRenderer();
 *   columnDefs에서 cellRenderer: getExpiryRenderer('left')
 */
export const useExpiryCellRenderer = () =>
  useCallback(
    <T,>(align: 'left' | 'center' | 'right' = 'right') =>
      (params: ICellRendererParams<T>) =>
        editableSelectCellRenderer<T>({ ...params, align }),
    []
  );

/**
 * [공용 셀 렌더러] 담보명 + 번호 + 배지
 * - 중복 행은 원본 행의 번호 표시, 배지는 중복/원본 동일하게 표시
 * - 사용 예시: autoGroupColumnDef에서 cellRenderer: productNameCellRenderer
 */
export type ProductNameCellBase = {
  id: string | number;
  isDuplicate?: boolean;
  num?: number | null;
  displayNo?: number | string;
  badge?: string[];
  title?: string | number | boolean;
};
export type ProductTitleDetail = { title: string; description: string; info: string[] };

export function productNameCellRenderer<
  T extends ProductNameCellBase,
  D extends ProductTitleDetail = ProductTitleDetail,
>(params: IGroupCellRendererParams<T & { titleDetail?: D }> & ICellRendererParams<T & { titleDetail?: D }>) {
  const { data, api } = params;
  if (!data) return null;

  // 1. 순번 계산 (중복 행일 경우 원본의 순서를 찾아옴)
  let displayOrder: string | number = data.num ?? '';

  if (data.isDuplicate) {
    const allRows: ProductNameCellBase[] = [];
    api.forEachNode((node) => {
      if (node.data && !node.data.isDuplicate) allRows.push(node.data as ProductNameCellBase);
    });

    // 원본 행들 사이에서 displayNo와 일치하는 id를 가진 행의 인덱스 찾기
    const originIdx = allRows.findIndex((r) => r.id === data.displayNo);
    displayOrder = originIdx !== -1 ? originIdx + 1 : '';
  }

  // 2. 뱃지 렌더링 헬퍼 함수
  const renderBadges = (badges?: string[]) => {
    if (!Array.isArray(badges) || badges.length === 0) return null;

    const badgeConfig = [
      { key: '미래', color: 'green' },
      { key: '갱신', color: 'blue' },
      { key: '배타', color: 'primary' },
      { key: '독립', color: 'purple' },
    ] as const;

    return (
      <Grow className="shrink-0">
        {badgeConfig
          .filter((conf) => badges.includes(conf.key))
          .map((conf) => (
            <Badge key={conf.key} variant="dark" color={conf.color} className="w-[3rem]">
              {conf.key}
            </Badge>
          ))}
      </Grow>
    );
  };

  return (
    <Grow className="h-full pr-1.5" placement="bwc">
      <Grow className="border-r border-(--color-gray-10) h-full items-center w-[3rem] justify-center">
        <span>{displayOrder}</span>
      </Grow>
      {!data.isDuplicate ? (
        <CoveragePopover text={String(data.title ?? '')} items={data.titleDetail as ProductTitleDetail | undefined} />
      ) : (
        <p className="truncate-no w-full pl-1.5 flex-1">{data.title ?? ''}</p>
      )}
      {renderBadges(data.badge)}
    </Grow>
  );
}

/**
 * [공용] 셀 클래스 룰: 선택된 행에만 editable-cell 적용
 * - 사용 예시: columnDefs에서 cellClassRules: editableCellClassRules()
 */
export function editableCellClassRules<T>() {
  return {
    'editable-cell': (params: CellClassParams<T>) => {
      const isRowChecked = params.node?.isSelected?.() ?? false;
      return isRowChecked;
    },
  };
}

/**
 * [공용 팩토리] 중복(복사) 행 자동 선택/추적
 * - setRowData, pendingSelectIdRef를 받아서 복사된 행을 자동 선택
 * - 사용 예시:
 *   const rowDataWithTracking = rowDataWithTrackingFactory<MyRowType>(setRowData, pendingSelectIdRef)
 */
export function rowDataWithTrackingFactory<T extends { id: string | number; isDuplicate?: boolean }>(
  setRowData: React.Dispatch<React.SetStateAction<T[]>>,
  pendingSelectIdRef: React.MutableRefObject<string | number | null>
) {
  const localPendingSelectIdRef = pendingSelectIdRef;
  return (updater: T[] | ((prev: T[]) => T[])) => {
    setRowData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (next.length > prev.length) {
        const prevIds = new Set(prev.map((r) => r.id));
        const newDuplicate = next.find((r) => !prevIds.has(r.id) && r.isDuplicate);
        if (newDuplicate) {
          localPendingSelectIdRef.current = newDuplicate.id;
        }
      }
      return next;
    });
  };
}

/**
 * [공용 훅] locked row 항상 선택
 * - 사용 예시: const ensureLockedRowsSelected = useEnsureLockedRowsSelected();
 */
export const useEnsureLockedRowsSelected = () =>
  useCallback(
    <T extends { locked?: boolean }>(api: GridApi<T>, isLocked: (row: T) => boolean = (row) => !!row.locked) => {
      api.forEachNode((node) => {
        if (isLocked(node.data as T) && !node.isSelected()) {
          node.setSelected(true);
        }
      });
    },
    []
  );

/**
 * [공용 훅] 선택된 행의 id를 부모로 전달
 * - 사용 예시: const handleSelectionChanged = useHandleSelectionChanged<MyRowType, number>('id', onSelectPlan)
 */
export function useHandleSelectionChanged<T, K>(idKey: keyof T, callback?: (id: K) => void) {
  return useMemo(() => createSelectionChangedHandler<T, K>(idKey, callback), [callback, idKey]);
}

/**
 * [공용 함수] isError 행을 상단으로 정렬
 * - 사용 예시: setRows(prev => sortRows(prev))
 */
export function sortRows<T extends { isError?: boolean }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => {
    if (a.isError === b.isError) return 0;
    return a.isError ? -1 : 1;
  });
}

/**
 * [공용 함수] 행의 isError 토글 및 정렬
 * - 사용 예시: toggleError(id, setRows)
 */
export function toggleError<T extends { id: string | number; isError?: boolean }>(
  id: string | number,
  setRows: React.Dispatch<React.SetStateAction<T[]>>
) {
  setRows((prev) => {
    const updated = prev.map((row) => (row.id == id ? { ...row, isError: !row.isError } : row));
    return sortRows(updated);
  });
}

/**
 * [공용 셀 렌더러] UW 상태 원형 아이콘
 * - value: '인수가능' | '인수불가' | '조건부인수' 등
 * - 사용 예시: columnDefs에서 cellRenderer: uwIconRenderer
 */
export function uwIconRenderer<T>(params: ICellRendererParams<T>) {
  const value = params.value as string;
  const color =
    value === '인수가능'
      ? 'var(--color-success-60)'
      : value === '인수불가'
        ? 'var(--color-danger-50)'
        : 'var(--color-warning-40)';
  return (
    <Gcol className="h-full" placement="cc">
      <div className={`w-[1rem] h-[1rem] rounded-full ${color ? `bg-[${color}]` : ''}`}></div>
    </Gcol>
  );
}

/**
 * [공용 셀 렌더러] 그룹/leaf 편집 row에서 버튼 노출 및 그룹 전체 tooltip-on 부여
 * - 사용 예시: columnDefs에서 cellRenderer: groupEditableButtonRenderer<AgGridRow>(getExpiryRenderer, numberValueFormatter)
 * - 버튼 클릭 시 같은 그룹 내 모든 편집 row에 tooltip-on 3초간 부여
 */
export function groupEditableButtonRenderer<
  T extends {
    isStandard?: { group?: boolean; edit?: boolean };
    filePath?: string[];
    isSelectedInsuredAmount?: boolean;
    _tooltipOn?: boolean;
  },
>(
  getExpiryRenderer: (align: 'left' | 'center' | 'right') => (params: ICellRendererParams<T>) => React.ReactNode,
  numberValueFormatter: (params: ValueFormatterParams<T>) => React.ReactNode
) {
  const Renderer = (params: ICellRendererParams<T>) => {
    const isSelectedInsuredAmount = params.data?.isSelectedInsuredAmount ?? false;
    // 편집 가능한 leaf row에서만 버튼 노출
    if (params.data?.isStandard?.group) {
      const value = params.value;
      let display = value;
      if (!isSelectedInsuredAmount) {
        if (typeof value === 'number') {
          display = value.toLocaleString();
        } else if (typeof value === 'string' && value !== '') {
          const num = Number(value.replace(/[^\d.-]/g, ''));
          display = isNaN(num) ? value : num.toLocaleString();
        }
      }
      // 버튼 클릭 시 같은 그룹 내 모든 편집 row에 tooltip-on 3초간 부여
      const handleClick = () => {
        const groupRoot = params.data?.filePath?.[0];
        const nodesToUpdate: IRowNode<T>[] = [];
        params.api.forEachNode((node) => {
          if (node.data?.filePath?.[0] === groupRoot && node.data?.isStandard?.edit) {
            nodesToUpdate.push(node);
            node.setData({ ...node.data, _tooltipOn: true });
          }
        });
        setTimeout(() => {
          nodesToUpdate.forEach((node) => {
            if (node.data) {
              node.setData({ ...node.data, _tooltipOn: false });
            }
          });
        }, 3000);
      };
      return (
        <button
          type="button"
          onClick={handleClick}
          style={{ width: '100%', background: 'none', border: 'none', padding: 0, textAlign: 'right' }}
        >
          {display}
        </button>
      );
    }
    // 나머지(그룹/비편집 row)는 기존 렌더러
    return isSelectedInsuredAmount
      ? getExpiryRenderer('left')(params)
      : numberValueFormatter(params as ValueFormatterParams<T>);
  };
  Renderer.displayName = 'GroupEditableButtonRenderer';
  return Renderer;
}
