/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type {
  ICellEditorParams,
  CellClickedEvent,
  SpanRowsParams,
  ValueFormatterParams,
  ICellRendererParams,
  SelectionChangedEvent,
  IDatasource,
  IGetRowsParams,
  EditableCallbackParams,
  CellClassParams,
  IHeaderParams,
  GridApi,
  GridReadyEvent,
  CellValueChangedEvent,
} from 'ag-grid-enterprise';
import type { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import type { RefObject } from 'react';
import { SCALE_CHANGE_EVENT } from '@/shared/utils/scale';
import { Typo, Grow, Grid, Gcol } from '@atoms';
import { InfoBoxWarningIcon, MinusIcon, PlusIcon, TableSelectArrowIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DatePickerInput } from '@common/DatePicker';

/**
 * 상단 토글 정렬에 필요한 메타 정보를 원본 행 타입 `T`에 결합한 타입.
 *
 * - `originalIndex`: 최초 rows 입력 순서(안정 정렬 기준)
 * - `toggleOrder`: 토글된 시점 순서(최근 토글 우선 정렬용)
 *   - `null`이면 현재 비토글 상태로 간주
 */
export type ToggleTopRow<T> = T & {
  originalIndex: number;
  toggleOrder: number | null;
};

/**
 * "상단 복제 행"임을 식별하기 위한 내부 메타 타입.
 *
 * - `isClonedTopRow`: 타입 가드에서 복제 행 여부를 구분하는 플래그
 * - `cloneBaseId`: 복제의 기준이 되는 원본 행 id(문자열 정규화)
 */
type CloneTopRowMeta = {
  isClonedTopRow: true;
  cloneBaseId: string;
};

/**
 * 원본 행 `T` + 복제 메타를 결합한 최종 복제 행 타입.
 *
 * `useCloneTopRows`에서 반환되는 `rowData`는
 * 원본 행(`T`)과 복제 행(`ClonedTopRow<T>`)이 함께 존재할 수 있으므로,
 * 호출부는 `hasCloneTopRowMeta()` 같은 타입 가드로 안전하게 분기한다.
 */
export type ClonedTopRow<T extends Record<string, unknown>> = T & CloneTopRowMeta;

/**
 * id로 허용하는 원시 타입 별칭.
 * - 그리드 row id 비교/문자열 정규화 기준으로 사용.
 */
type PrimitiveId = string | number;

/**
 * T에서 순서값으로 사용할 수 있는 number 키만 추출.
 *
 * 동작 방식:
 * 1) `keyof T`의 각 키 `K`를 순회
 * 2) `T[K] extends number`이면 `K`, 아니면 `never`
 * 3) 최종적으로 유니온으로 합쳐 "number 타입 필드명"만 남김
 *
 * 예)
 * type Row = { id: string; seq: number; name: string }
 * NumberKeyOf<Row> -> 'seq'
 */
type NumberKeyOf<T> = {
  [K in keyof T]-?: T[K] extends number ? K : never;
}[keyof T];

/**
 * T에서 id로 사용할 수 있는 키(string | number 값)만 추출.
 *
 * `PrimitiveId`(string | number)를 만족하는 필드만 선택하므로,
 * id 키를 잘못 지정하는 실수를 타입 레벨에서 방지한다.
 *
 * 예)
 * type Row = { id: number; uuid: string; active: boolean }
 * IdKeyOf<Row> -> 'id' | 'uuid'
 */
type IdKeyOf<T> = {
  [K in keyof T]-?: T[K] extends PrimitiveId ? K : never;
}[keyof T];

/**
 * T에서 토글 플래그로 사용할 수 있는 boolean 키만 추출.
 *
 * 체크박스/즐겨찾기/활성화 같은 토글성 필드만 허용하여
 * 토글 훅에서 숫자/문자열 필드를 실수로 전달하는 것을 예방한다.
 *
 * 예)
 * type Row = { id: number; isFavorite: boolean; name: string }
 * BooleanKeyOf<Row> -> 'isFavorite'
 */
type BooleanKeyOf<T> = {
  [K in keyof T]-?: T[K] extends boolean ? K : never;
}[keyof T];

/**
 * `useCloneTopRows` 입력 파라미터 타입.
 *
 * - `rows`: 원본 행 배열
 * - `idKey`: `rows`의 요소 타입 `T`에서 실제 id로 사용할 필드명
 *
 * 제네릭 제약(`IdKey extends IdKeyOf<T>`)으로 인해
 * `idKey`는 반드시 string/number 값 필드만 선택 가능하다.
 */
interface UseCloneTopRowsParams<T extends Record<string, unknown>, IdKey extends IdKeyOf<T>> {
  rows: T[];
  idKey: IdKey;
}

/**
 * `useToggleTopRows` 입력 파라미터 타입.
 *
 * - `rows`: 원본 행 배열
 * - `idKey`: 행 식별용 필드명 (`string | number` 값 필드만 허용)
 * - `toggleKey`: 토글 상태 필드명 (`boolean` 값 필드만 허용)
 *
 * 즉, 훅 사용 시 "식별 키"와 "토글 키"가 타입으로 강제되어
 * 런타임 전에 잘못된 설정을 최대한 차단한다.
 */
interface UseToggleTopRowsParams<T extends Record<string, unknown>> {
  rows: T[];
  idKey: IdKeyOf<T>;
  toggleKey: BooleanKeyOf<T>;
}

/**
 * 토글된 행을 상단으로 올리되, 원본 순서를 안정적으로 유지하는 정렬 유틸.
 *
 * 정렬 우선순위:
 * 1) 토글 여부: `true`가 항상 위
 * 2) 둘 다 토글된 경우: `toggleOrder`가 큰(최근 토글) 행이 위
 * 3) 그 외: 최초 입력 순서(`originalIndex`) 유지
 *
 * 운영 관점:
 * - 사용자 체감상 "방금 체크한 항목"을 즉시 상단에서 확인 가능
 * - 동일 상태 그룹 내에서 순서가 흔들리지 않아 화면 안정성이 높음
 */
function sortToggleRows<T extends Record<string, unknown>>(rows: ToggleTopRow<T>[], toggleKey: BooleanKeyOf<T>) {
  return [...rows].sort((prevRow, nextRow) => {
    const prevToggled = Boolean(prevRow[toggleKey]);
    const nextToggled = Boolean(nextRow[toggleKey]);

    if (prevToggled !== nextToggled) {
      return prevToggled ? -1 : 1;
    }

    if (prevToggled && nextToggled) {
      const prevOrder = prevRow.toggleOrder ?? 0;
      const nextOrder = nextRow.toggleOrder ?? 0;

      if (prevOrder !== nextOrder) {
        return nextOrder - prevOrder;
      }
    }

    return prevRow.originalIndex - nextRow.originalIndex;
  });
}

export function useToggleTopRows<T extends Record<string, unknown>>({
  rows,
  idKey,
  toggleKey,
}: UseToggleTopRowsParams<T>) {
  /**
   * 행의 토글 상태를 기준으로 상단 정렬을 관리하는 훅.
   *
   * 제공 기능:
   * - `rowData`: 정렬 규칙 적용 결과
   * - `toggleById(id)`: 특정 행 토글 반전 + 재정렬
   * - `setRowData`: 외부 수동 제어(필요 시)
   */
  /**
   * 최근 토글 순서를 기록하기 위한 증가 시퀀스.
   * - 더 최근에 토글된 항목이 상단에서 먼저 오도록 사용.
   */
  const sequenceRef = useRef(1);

  const [rowData, setRowData] = useState<ToggleTopRow<T>[]>(() => {
    const initialized = rows.map((row, index) => ({
      ...row,
      originalIndex: index,
      toggleOrder: row[toggleKey] ? 0 : null,
    }));

    return sortToggleRows(initialized, toggleKey);
  });

  /**
   * id 기준으로 토글 상태를 반전하고,
   * 반전 결과에 맞춰 상단 정렬 규칙을 다시 적용.
   */
  const toggleById = useCallback(
    (id: T[IdKeyOf<T>]) => {
      setRowData((prev) => {
        const nextRows = prev.map((row) => {
          if (row[idKey] !== id) {
            return row;
          }

          const nextToggled = !row[toggleKey];

          return {
            ...row,
            [toggleKey]: nextToggled,
            toggleOrder: nextToggled ? sequenceRef.current++ : null,
          } as ToggleTopRow<T>;
        });

        return sortToggleRows(nextRows, toggleKey);
      });
    },
    [idKey, toggleKey]
  );

  return {
    /** 정렬 규칙이 반영된 행 데이터 */
    rowData,
    /** 필요 시 외부에서 직접 행 데이터 갱신 */
    setRowData,
    /** 특정 id 행의 토글 상태 반전 */
    toggleById,
  };
}

function hasCloneTopRowMeta<T extends Record<string, unknown>>(row: T | ClonedTopRow<T>): row is ClonedTopRow<T> {
  /**
   * 복제 메타 존재 여부를 판별하는 타입 가드.
   *
   * 목적:
   * - 런타임 분기와 타입 분기를 일치시켜 안전한 속성 접근 보장
   * - `cloneBaseId` 같은 복제 전용 필드 접근 시 타입 오류 방지
   */
  return (row as Partial<CloneTopRowMeta>).isClonedTopRow === true;
}

export function useCloneTopRows<T extends Record<string, unknown>, IdKey extends IdKeyOf<T>>({
  rows,
  idKey,
}: UseCloneTopRowsParams<T, IdKey>) {
  /**
   * "상단 복제" 상태를 실제 행 전체가 아닌 base id 집합으로만 관리.
   *
   * 이유:
   * 1) 원본 데이터(rows)가 교체되어도 id 기준으로 복제 상태를 유지/정리하기 쉽다.
   * 2) 복제 행을 별도 배열로 들고 있지 않아 데이터 동기화 충돌을 줄인다.
   * 3) Set 기반 조회로 즐겨찾기/복제 여부 판별이 O(1)이다.
   */
  const [clonedBaseIds, setClonedBaseIds] = useState<Set<string>>(new Set());

  /**
   * 입력된 행이 원본인지 복제본인지와 상관없이
   * "원본 기준 id"(base id)를 문자열로 표준화하여 반환.
   */
  const resolveBaseId = useCallback(
    (row?: T | ClonedTopRow<T>) => {
      if (!row) {
        return null;
      }

      if (hasCloneTopRowMeta(row)) {
        return row.cloneBaseId;
      }

      return String(row[idKey] as PrimitiveId);
    },
    [idKey]
  );

  /**
   * rows 변경 시(조회 재실행/필터링/삭제 등) 더 이상 존재하지 않는 id를 복제 집합에서 제거.
   *
   * 예)
   * - 이전에 101, 102를 복제해둠
   * - 새 조회 결과에서 102가 사라짐
   * -> clonedBaseIds에서도 102 제거
   */
  useEffect(() => {
    const validIds = new Set(rows.map((row) => String(row[idKey] as PrimitiveId)));

    setClonedBaseIds((prev) => {
      const next = new Set<string>();

      prev.forEach((id) => {
        if (validIds.has(id)) {
          next.add(id);
        }
      });

      return next;
    });
  }, [idKey, rows]);

  const toggleCloneByRow = useCallback(
    (row: T | ClonedTopRow<T> | undefined, checked: boolean) => {
      /**
       * 행 단위 체크 상태를 받아 복제 대상 집합을 증감.
       * - checked=true  -> 상단 복제 대상에 추가
       * - checked=false -> 상단 복제 대상에서 제거
       */
      const baseId = resolveBaseId(row);
      if (!baseId) {
        return;
      }

      setClonedBaseIds((prev) => {
        const next = new Set(prev);

        if (checked) {
          next.add(baseId);
        } else {
          next.delete(baseId);
        }

        return next;
      });
    },
    [resolveBaseId]
  );

  /**
   * 현재 행이 "상단 복제 대상"인지 판별.
   * - 원본 행/복제 행 어디서 호출해도 동일한 base id 기준으로 동작.
   */
  const isFavoriteRow = useCallback(
    (row?: T | ClonedTopRow<T>) => {
      const baseId = resolveBaseId(row);
      return baseId ? clonedBaseIds.has(baseId) : false;
    },
    [clonedBaseIds, resolveBaseId]
  );

  /**
   * 최종 rowData 구성 규칙:
   * 1) 복제 대상 id에 해당하는 행을 먼저 "복제 행"으로 생성
   * 2) 복제 행 배열 + 원본 rows 배열을 결합
   *
   * 결과적으로 그리드 상단에 복제 행이 먼저 렌더링된다.
   */
  const rowData = useMemo<Array<T | ClonedTopRow<T>>>(() => {
    const clonedRows = rows
      .filter((row) => clonedBaseIds.has(String(row[idKey] as PrimitiveId)))
      .map((row) => ({
        ...row,
        isClonedTopRow: true,
        cloneBaseId: String(row[idKey] as PrimitiveId),
      }));

    return [...clonedRows, ...rows];
  }, [clonedBaseIds, idKey, rows]);

  /**
   * ag-Grid row id 생성 규칙.
   * - 복제 행: `cloned-{baseId}`
   * - 원본 행: `{id}`
   *
   * 복제/원본이 같은 base id를 공유하더라도 row id 충돌이 나지 않게 보장한다.
   */
  const getRowId = useCallback(
    (row?: T | ClonedTopRow<T>) => {
      if (!row) {
        return '';
      }

      if (hasCloneTopRowMeta(row)) {
        return `cloned-${row.cloneBaseId}`;
      }

      return String(row[idKey] as PrimitiveId);
    },
    [idKey]
  );

  const getCloneRowClass = useCallback((row?: T | ClonedTopRow<T>, className = 'row-cloning') => {
    /**
     * 복제 행에만 강조 class를 부여하기 위한 헬퍼.
     * 운영 화면에서 "원본/복제" 시각 구분에 사용.
     */
    if (!row) {
      return '';
    }

    return hasCloneTopRowMeta(row) ? className : '';
  }, []);

  return {
    clonedBaseIds,
    rowData,
    toggleCloneByRow,
    isFavoriteRow,
    getRowId,
    getCloneRowClass,
  };
}

/**
 * AG Grid 셀 편집 가능 여부 콜백 팩토리 (공용)
 *
 * @param mode
 *   - `'always'`       : 항상 편집 허용
 *   - `'whenSelected'` : 행이 선택(체크)된 경우에만 편집 허용
 *   - 커스텀 콜백      : `(params) => boolean` 직접 전달
 *
 * @example
 *   editable: createEditableCallback('whenSelected') // 선택 시에만
 *   editable: createEditableCallback('always')       // 항상
 *   editable: createEditableCallback((p) => !!p.data?.locked) // 커스텀
 */
export function createEditableCallback<T>(
  mode: 'always' | 'whenSelected' | ((params: EditableCallbackParams<T>) => boolean)
): (params: EditableCallbackParams<T>) => boolean {
  if (mode === 'always') return () => true;
  if (mode === 'whenSelected') return (params) => params.node?.isSelected?.() ?? false;
  return mode;
}

/**
 * AG Grid spanRows 콜백 생성기 (공용)
 * - 지정한 필드값이 연속 행에서 동일할 때만 병합
 */
export function createSpanRowsByField<T extends Record<string, unknown>, K extends keyof T>(field: K) {
  return (params: SpanRowsParams<T>): boolean => {
    const valueA = params.nodeA?.data?.[field];
    const valueB = params.nodeB?.data?.[field];

    return valueA !== undefined && valueA === valueB;
  };
}

/**
 * AG Grid 에러 셀 클래스 규칙 생성기 (공용)
 * - 사용자 정의 조건(predicate)을 받아 `ag-cell-error-border` 클래스를 적용
 */
export function createCellErrorClassRules<RowType>(predicate: (params: CellClassParams<RowType>) => boolean): {
  [className: string]: (params: CellClassParams<RowType>) => boolean;
} {
  return {
    'ag-cell-error-border': predicate,
  };
}

/**
 * 원본값과 달라진 셀에 클래스 룰을 적용하는 생성기 (공용)
 */
export function createModifiedCellClassRules<
  RowType extends Record<string, unknown>,
  ValueKey extends keyof RowType,
>(options: {
  rows: RowType[];
  idKey: IdKeyOf<RowType>;
  valueKey: ValueKey;
  className?: string;
  serialize?: (value: unknown) => string;
}): {
  [className: string]: (params: CellClassParams<RowType>) => boolean;
} {
  const { rows, idKey, valueKey, className = 'modify-cell', serialize = (value) => String(value ?? '') } = options;

  const initialValueMap = new Map(rows.map((row) => [row[idKey], serialize(row[valueKey])]));

  return {
    [className]: (params) => {
      if (!params.data) {
        return false;
      }

      return serialize(params.value) !== initialValueMap.get(params.data[idKey]);
    },
  };
}

/**
 * 선택 행 정보 전달 핸들러 생성기 (공용)
 * @param idKey 행 데이터의 id 필드명 (string)
 * @param callback id 전달 콜백 (id: IDType) => void
 */
export function createSelectionChangedHandler<RowType, IDType = unknown>(
  idKey: keyof RowType,
  callback?: (id: IDType) => void
) {
  return (event: SelectionChangedEvent<RowType>) => {
    const selectedNodes = event.api.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const selectedData = selectedNodes[0].data;
      if (selectedData && typeof callback === 'function') {
        const id = selectedData[idKey] as IDType;
        callback(id);
      }
    }
  };
}

/**
 * 셀 클릭 시 행 선택 토글 핸들러 생성기 (공용)
 * - 미선택 행 클릭: 즉시 선택
 * - 선택 행 클릭: 입력/버튼/에디터 영역 클릭은 유지, 일반 영역 클릭만 해제
 */
export function createCellClickSelectionToggleHandler<RowType>() {
  return (params: CellClickedEvent<RowType>) => {
    const { event, node, api } = params;
    if (!event || !('target' in event) || !event.target) return;

    const target = event.target as HTMLElement;
    const isSelected = node.isSelected();

    if (!isSelected) {
      node.setSelected(true);
      return;
    }

    if (api.getEditingCells().length > 0) return;

    const tagName = target.tagName;
    const isInputComponent =
      ['INPUT', 'SELECT', 'OPTION', 'BUTTON'].includes(tagName) ||
      target.closest('a') ||
      target.closest('button') ||
      target.closest('[role="button"]') ||
      target.closest('.editor-select');
    if (isInputComponent) return;

    node.setSelected(false);
  };
}

export type TreeNameCellRendererOptions = {
  /** 텍스트 span에 적용할 커스텀 class */
  className?: string;
  /** 그룹 토글 버튼에 적용할 커스텀 class */
  buttonClassName?: string;
  /** 자식 행 값 앞에 붙일 prefix (기본값: '- ') */
  childPrefix?: string;
  /** 그룹 행 클릭 시 expand/collapse 토글 여부 */
  toggleOnGroupClick?: boolean;
};

/**
 * TreeName 렌더러가 받는 전체 파라미터 타입.
 * - ag-Grid 기본 `ICellRendererParams` + 옵션 확장
 */
export type TreeNameCellRendererParams<RowType> = ICellRendererParams<RowType> & TreeNameCellRendererOptions;

/**
 * Tree Data용 텍스트 셀 렌더러 팩토리
 * - 그룹 노드: 버튼 클릭으로 expand/collapse
 * - 자식 노드: 선택적 prefix(기본 '- ') 표시
 * - 컬럼별 스타일: cellRendererParams.className / buttonClassName
 */
export function createTreeNameCellRenderer<RowType>() {
  const renderer = (params: TreeNameCellRendererParams<RowType>) => {
    const hasChildren = params.node.group;
    const isChild = params.node.level > 0;
    const textClassName = params.className ?? '';
    const buttonClassName = params.buttonClassName ?? '';
    const childPrefix = params.childPrefix ?? '- ';
    const toggleOnGroupClick = params.toggleOnGroupClick ?? true;
    const valueText = String(params.value ?? '');

    const handleToggle = () => {
      if (!hasChildren) {
        return;
      }

      params.node.setExpanded(!params.node.expanded);
    };

    if (hasChildren && toggleOnGroupClick) {
      return (
        <button
          type={'button'}
          className={`flex w-full items-center gap-1 text-left ${buttonClassName}`}
          onClick={handleToggle}
        >
          {valueText}
        </button>
      );
    }

    return hasChildren ? (
      <span className={`truncate-no ${textClassName}`}>{valueText}</span>
    ) : (
      <span className={`truncate-no ${textClassName}`}>
        {isChild && valueText ? childPrefix : ''}
        {valueText}
      </span>
    );
  };

  return Object.assign(renderer, { displayName: 'AgGridTreeNameCellRenderer' });
}

/**
 * AgGrid onCellValueChanged 핸들러 생성기 (공용)
 * @param field 변경할 필드명 (keyof RowType)
 * @param setRowData 행 데이터 setState
 * @param setErrorRows 에러 행 id setState
 * @param idKey id 필드명 (기본값: 'id')
 */
export function createCellValueChangedHandler<RowType extends Record<string, unknown>, IDType = number>(
  fields: keyof RowType | Array<keyof RowType>,
  setRowData: React.Dispatch<React.SetStateAction<RowType[]>>,
  setErrorRows: React.Dispatch<React.SetStateAction<IDType[]>>,
  idKey: keyof RowType = 'id' as keyof RowType
) {
  const fieldArr = Array.isArray(fields) ? fields : [fields];
  return (params: { colDef: { field?: string }; data: RowType; newValue: unknown }) => {
    if (params.colDef.field && fieldArr.includes(params.colDef.field as keyof RowType)) {
      setRowData((prev) =>
        prev.map((row) =>
          row[idKey] === params.data[idKey] ? { ...row, [params.colDef.field as keyof RowType]: params.newValue } : row
        )
      );
      setErrorRows((prev) => {
        const isInvalid = params.newValue === '' || params.newValue === undefined || Number(params.newValue) === 0;
        const rowId = params.data[idKey] as IDType;
        if (isInvalid && !prev.includes(rowId)) {
          return [...prev, rowId];
        } else if (!isInvalid && prev.includes(rowId)) {
          return prev.filter((id) => id !== rowId);
        }
        return prev;
      });
    }
  };
}

/**
 * 순서 컬럼 편집 시 행 위치를 재배치하고 순서를 1부터 다시 매기는 핸들러 생성기.
 * - 예: 5번 행의 순서를 1로 변경하면, 해당 행이 맨 앞으로 이동하고 나머지는 2, 3, 4, 5로 재정렬.
 * - 선택적으로 이동된 행이 보이도록 스크롤 위치를 맞춤.
 */
export function createSequentialRowReorderHandler<
  RowType extends Record<string, unknown>,
  IDType extends string | number,
>(
  setRowData: React.Dispatch<React.SetStateAction<RowType[]>>,
  options: {
    idKey: keyof RowType;
    orderKey: NumberKeyOf<RowType>;
    gridApiRef?: React.RefObject<GridApi<RowType> | null>;
  }
) {
  const { idKey, orderKey, gridApiRef } = options;

  return (params: CellValueChangedEvent<RowType>) => {
    if (params.colDef.field !== String(orderKey)) {
      return;
    }

    const requestedOrder = Number(params.newValue);
    if (!Number.isFinite(requestedOrder)) {
      return;
    }

    const targetRowId = params.data[idKey] as IDType;

    setRowData((previous) => {
      const sourceIndex = previous.findIndex((row) => row[idKey] === targetRowId);
      if (sourceIndex < 0) {
        return previous;
      }

      const sourceRow = previous[sourceIndex];
      const rowsWithoutSource = previous.filter((_, index) => index !== sourceIndex);
      const boundedIndex = Math.max(0, Math.min(Math.trunc(requestedOrder) - 1, rowsWithoutSource.length));

      const reorderedRows = [...rowsWithoutSource];
      reorderedRows.splice(boundedIndex, 0, sourceRow);

      return reorderedRows.map((row, index) => ({
        ...row,
        [orderKey]: index + 1,
      })) as RowType[];
    });

    if (gridApiRef?.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const rowNode = gridApiRef.current?.getRowNode(String(targetRowId));
          if (rowNode) {
            gridApiRef.current?.ensureNodeVisible(rowNode, 'middle');
          }
        });
      });
    }
  };
}

/**
 * 행 추가 핸들러 생성기 (공용)
 * @param setRowData 행 데이터 setState
 * @param options.idKey 고유 id 필드명
 * @param options.getNextId 다음 id 생성 함수
 * @param options.createRow 신규 행 생성 함수
 * @param options.insertAt 삽입 위치 (기본값: 'end')
 * @param options.getInsertIndex 커스텀 삽입 인덱스 계산 함수
 * @param options.gridApiRef 추가된 행으로 스크롤하기 위한 ag-Grid API ref
 */
export function createAddRowHandler<RowType extends Record<string, unknown>, IDType extends string | number>(
  setRowData: React.Dispatch<React.SetStateAction<RowType[]>>,
  options: {
    idKey: keyof RowType;
    getNextId: (rows: RowType[]) => IDType;
    createRow: (nextId: IDType, rows: RowType[]) => RowType;
    insertAt?: 'start' | 'end';
    getInsertIndex?: (rows: RowType[]) => number;
    gridApiRef?: React.RefObject<GridApi<RowType> | null>;
  }
) {
  const { idKey, getNextId, createRow, insertAt = 'end', getInsertIndex, gridApiRef } = options;

  return () => {
    setRowData((prev) => {
      const nextId = getNextId(prev);
      const newRow = {
        ...createRow(nextId, prev),
        [idKey]: nextId,
      } as RowType;

      const nextRows = [...prev];
      const defaultIndex = insertAt === 'start' ? 0 : nextRows.length;
      const customIndex = getInsertIndex ? getInsertIndex(nextRows) : defaultIndex;
      const boundedIndex = Math.max(0, Math.min(customIndex, nextRows.length));

      nextRows.splice(boundedIndex, 0, newRow);

      if (gridApiRef?.current) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const viewportElement = document.querySelector('.ag-body-viewport');
            if (viewportElement) {
              // 최하단으로 스크롤
              viewportElement.scrollTop = viewportElement.scrollHeight;
            }
          });
        });
      }

      return nextRows;
    });
  };
}

/**
 * 행 삭제 핸들러 생성기 (공용)
 * @param setRowData 행 데이터 setState
 * @param options.idKey 고유 id 필드명
 */
export function createDeleteRowHandler<RowType extends Record<string, unknown>, IDType extends string | number>(
  setRowData: React.Dispatch<React.SetStateAction<RowType[]>>,
  options: {
    idKey: keyof RowType;
  }
) {
  const { idKey } = options;

  return (rowId: IDType) => {
    setRowData((prev) => prev.filter((row) => row[idKey] !== rowId));
  };
}

/**
 * 다중 행 삭제 핸들러 생성기 (공용)
 * @param setRowData 행 데이터 setState
 * @param options.idKey 고유 id 필드명
 */
export function createDeleteRowsHandler<RowType extends Record<string, unknown>, IDType extends string | number>(
  setRowData: React.Dispatch<React.SetStateAction<RowType[]>>,
  options: {
    idKey: keyof RowType;
  }
) {
  const { idKey } = options;

  return (rowIds: IDType[]) => {
    const idSet = new Set(rowIds);
    setRowData((prev) => prev.filter((row) => !idSet.has(row[idKey] as IDType)));
  };
}

/**
 * 선택된 행 삭제 핸들러 생성기 (공용, gridApiRef 자동 사용)
 * @param setRowData 행 데이터 setState
 * @param gridApiRef ag-Grid API ref
 * @param options.idKey 고유 id 필드명
 */
export function createDeleteSelectedRowsHandler<RowType extends Record<string, unknown>>(
  setRowData: React.Dispatch<React.SetStateAction<RowType[]>>,
  gridApiRef: React.RefObject<GridApi<RowType> | null>,
  options: {
    idKey: keyof RowType;
  }
) {
  const { idKey } = options;

  return () => {
    const selectedNodes = gridApiRef.current?.getSelectedNodes() || [];
    const selectedIds: unknown[] = selectedNodes
      .map((node) => node.data?.[idKey])
      .filter((id) => id !== undefined && id !== null);

    if (selectedIds.length > 0) {
      const idSet = new Set(selectedIds);
      setRowData((prev) =>
        prev.filter((row) => {
          const rowIdValue = row[idKey] as unknown;
          return !idSet.has(rowIdValue);
        })
      );
    }
  };
}

/**
 * 행 복제 후 바로 아래 삽입 핸들러 생성기 (공용)
 * @param setRowData 행 데이터 setState
 * @param options.idKey 고유 id 필드명
 * @param options.getNextId 다음 id 생성 함수
 * @param options.patchCopiedRow 복제 행에 추가로 반영할 값
 */
export function createInsertCopiedRowHandler<RowType extends Record<string, unknown>, IDType extends string | number>(
  setRowData: React.Dispatch<React.SetStateAction<RowType[]>>,
  options: {
    idKey: keyof RowType;
    getNextId: (rows: RowType[]) => IDType;
    patchCopiedRow?: (sourceRow: RowType, nextId: IDType) => Partial<RowType>;
  }
) {
  const { idKey, getNextId, patchCopiedRow } = options;

  return (sourceRowId: IDType) => {
    setRowData((prev) => {
      const sourceIndex = prev.findIndex((row) => row[idKey] === sourceRowId);
      if (sourceIndex === -1) return prev;

      const sourceRow = prev[sourceIndex];
      const nextId = getNextId(prev);
      const copiedRow = {
        ...sourceRow,
        [idKey]: nextId,
        ...(patchCopiedRow ? patchCopiedRow(sourceRow, nextId) : {}),
      } as RowType;

      const nextRows = [...prev];
      nextRows.splice(sourceIndex + 1, 0, copiedRow);
      return nextRows;
    });
  };
}

/**
 * 중복(복제) 버튼 셀 렌더러 생성기 (공용)
 * @param options.idKey 행 데이터의 고유 id 필드명
 * @param options.onDuplicate 복제 실행 핸들러
 * @param options.isVisible 버튼 노출 여부 (기본: 현재 셀 값 truthy)
 * @param options.ariaLabel 버튼 접근성 라벨
 */
export function createDuplicateButtonCellRenderer<
  RowType extends Record<string, unknown>,
  Key extends keyof RowType,
>(options: {
  idKey: Key;
  onDuplicate: (id: Extract<RowType[Key], string | number>) => void;
  isVisible?: (params: ICellRendererParams<RowType>) => boolean;
  ariaLabel?: string;
}) {
  const { idKey, onDuplicate, isVisible = (params) => Boolean(params.value), ariaLabel = '행 복제' } = options;

  const isStringOrNumber = <T,>(value: T): value is Extract<T, string | number> => {
    return typeof value === 'string' || typeof value === 'number';
  };

  const renderer = (params: ICellRendererParams<RowType>) => {
    if (!isVisible(params)) return <Grow className="w-full h-full flex items-center justify-center"></Grow>;

    const row = params.data;
    if (!row) return '';

    const rowId = row[idKey];
    if (!isStringOrNumber(rowId)) return '';

    return (
      <Grow className="w-full h-full flex items-center justify-center">
        <Button
          aria-label={ariaLabel}
          variant={'outlined'}
          only={'icon'}
          className="uiux-duplicate-btn"
          size={'sm'}
          color={'gray-light'}
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onDuplicate(rowId);
          }}
        >
          <PlusIcon color={'var(--color-primary-50)'} />
        </Button>
      </Grow>
    );
  };

  return Object.assign(renderer, { displayName: 'AgGridDuplicateButtonCellRenderer' });
}

/**
 * 행 복제 + 버튼 렌더러 통합 생성기 (공용)
 * @param setRowData 행 데이터 setState
 * @param options.idKey 고유 id 필드명
 * @param options.getNextId 다음 id 생성 함수
 * @param options.patchCopiedRow 복제 행에 추가로 반영할 값
 * @param options.isVisible 버튼 노출 여부 (기본: 현재 셀 값 truthy)
 * @param options.ariaLabel 버튼 접근성 라벨
 */
export function createInsertCopiedRowButtonCellRenderer<
  RowType extends Record<string, unknown>,
  Key extends keyof RowType,
>(
  setRowData: React.Dispatch<React.SetStateAction<RowType[]>>,
  options: {
    idKey: Key;
    getNextId: (rows: RowType[]) => Extract<RowType[Key], string | number>;
    patchCopiedRow?: (sourceRow: RowType, nextId: Extract<RowType[Key], string | number>) => Partial<RowType>;
    isVisible?: (params: ICellRendererParams<RowType>) => boolean;
    ariaLabel?: string;
  }
) {
  const { idKey, getNextId, patchCopiedRow, isVisible, ariaLabel } = options;

  const onDuplicate = createInsertCopiedRowHandler<RowType, Extract<RowType[Key], string | number>>(setRowData, {
    idKey,
    getNextId,
    patchCopiedRow,
  });

  return createDuplicateButtonCellRenderer<RowType, Key>({
    idKey,
    onDuplicate,
    isVisible,
    ariaLabel,
  });
}

export type DuplicateRowBase = {
  /** 행 고유 식별자 */
  id: string | number;
  /** 복제 생성 행 여부 */
  isDuplicate?: boolean;
  /** 체크 상태(업무 화면별 의미 확장 가능) */
  isChecked?: boolean;
  /** 파일 경로 세그먼트 이력(업무 정책에 따라 누적) */
  filePath?: string[];
};

/**
 * rowData setState 래퍼.
 * - 행이 새로 추가된 경우, `isDuplicate`인 신규 행을 찾아
 *   `pendingSelectIdRef`에 기록(후속 선택 처리용).
 */
export function rowDataWithTrackingFactory<T extends { id: string | number; isDuplicate?: boolean }>(
  setRowData: React.Dispatch<React.SetStateAction<T[]>>,
  pendingSelectIdRef: React.MutableRefObject<string | number | null>
) {
  return (updater: T[] | ((prev: T[]) => T[])) => {
    setRowData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (next.length > prev.length) {
        const prevIds = new Set(prev.map((row) => row.id));
        const newDuplicate = next.find((row) => !prevIds.has(row.id) && row.isDuplicate);
        if (newDuplicate) {
          pendingSelectIdRef.current = newDuplicate.id;
        }
      }
      return next;
    });
  };
}

/**
 * 현재 rows에서 다음 숫자 id를 계산.
 * - 숫자 문자열도 number로 변환해 비교.
 * - 유효한 숫자 id가 없으면 1 반환.
 */
export function getNextNumericRowId<T extends { id: string | number }>(rows: T[]): number {
  const ids = rows.map((row) => (typeof row.id === 'number' ? row.id : Number(row.id))).filter((id) => !isNaN(id));
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  return maxId + 1;
}

/**
 * 복제 행 생성 시 공통 보정값을 적용.
 * - `id`: 새 id
 * - `displayNo`: 원본 id
 * - `isDuplicate`, `isChecked`: true
 * - `filePath`: 기존 경로에 새 id 문자열 추가
 */
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

/**
 * 복제 버튼 노출 조건.
 * - 행이 선택되어 있고,
 * - 이미 복제된 행이 아닐 때만 노출.
 */
export function isCopyButtonVisible<T extends { isDuplicate?: boolean }>(params: {
  node?: { isSelected?: () => boolean | undefined };
  data?: T;
}): boolean {
  const isRowChecked = params.node?.isSelected?.() ?? false;
  const isCopiedRow = params.data?.isDuplicate === true;
  return isRowChecked && !isCopiedRow;
}

/**
 * 라벨형 툴팁 valueGetter 생성기 (공용)
 * @param label 라벨 (예: 담보명)
 * @param field 데이터 필드명
 * @param valueGetter 데이터에서 값을 꺼내는 커스텀 함수
 */
export function createTooltipValueGetter<T extends Record<string, unknown>>(
  options: {
    label?: string;
    field?: keyof T;
    valueGetter?: (data: T) => unknown;
  } = {}
) {
  const { label, field, valueGetter } = options;

  return (params: { data?: T }) => {
    if (!params.data) return '';
    const rawValue = valueGetter ? valueGetter(params.data) : field ? params.data[field] : '';
    const value = rawValue === null || rawValue === undefined ? '' : String(rawValue);
    if (!label) return value;
    return `${label}: ${value}`;
  };
}

/**
 * 담보명 툴팁 포매터 (공용)
 */
export const productNameTooltipValueGetter = <T extends { productName?: string }>(params: { data?: T }) => {
  if (!params.data) return '';
  return `담보명: ${params.data.productName ?? ''}`;
};

/**
 * 숫자 콤마 포매터 (공용)
 */
export const numberValueFormatter = <T,>(params: ValueFormatterParams<T>) => {
  if (params.value === null || params.value === undefined || params.value === '') return '';
  // 문자열이지만 숫자라면 콤마 적용
  const num = Number(params.value);
  if (!isNaN(num)) return num.toLocaleString();
  return params.value;
};

/**
 * Popover를 통한 +/- 조정 기능이 포함된 숫자 편집기
 */
export const AmountWithPopoverCellEditor = forwardRef((props: ICellEditorParams, ref) => {
  const [value, setValue] = useState<number>(Number(props.value) || 0);
  const step = props.colDef?.cellEditorParams?.step || 100;
  const min = props.colDef?.cellEditorParams?.min ?? 100;
  const max = props.colDef?.cellEditorParams?.max ?? 20000;

  useImperativeHandle(
    ref,
    () => ({
      getValue: () => value,
      isCancelAfterEnd: () => false,
    }),
    [value]
  );

  return (
    <div className="flex items-center w-full h-full">
      <Popover defaultOpen={true}>
        <PopoverTrigger asChild>
          <input
            className="ag-input-field-input flex-1 w-full h-full border-none outline-none text-right bg-transparent p-0"
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') return;
              e.stopPropagation(); // 팝오버 내부 입력 시 그리드 이벤트 전파 방지
            }}
            autoFocus
          />
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          className="p-3 flex flex-col gap-2 w-auto"
          closeButton={false}
          onOpenAutoFocus={(e) => e.preventDefault()} // 팝오버 오픈 시 인풋 포커스 유지
        >
          <Gcol className="items-center" gap={1.5} placement="ss">
            <Grow gap={1.5} placement="ss">
              <Button
                aria-label={'백만원 추가'}
                variant={'outlined'}
                only={'icon'}
                size={'md'}
                color={'gray'}
                onMouseDown={(e) => e.stopPropagation()} // 클릭 시 그리드 편집 모드 유지
                onClick={() => setValue((v) => Math.max(min, v - step))}
              >
                <MinusIcon color={'var(--color-primary-50)'} />
              </Button>
              <Input size={'md'} value={value} after={'만'} readOnly className="w-[11.2rem]" align="right" />
              <Button
                aria-label={'백만원 추가'}
                variant={'outlined'}
                only={'icon'}
                size={'md'}
                color={'gray'}
                onMouseDown={(e) => e.stopPropagation()} // 클릭 시 그리드 편집 모드 유지
                onClick={() => setValue((v) => Math.min(max, v + step))}
              >
                <PlusIcon color={'var(--color-primary-50)'} />
              </Button>
            </Grow>
            <Grow>
              <Button
                size={'md'}
                color={'secondary'}
                onMouseDown={(e) => e.stopPropagation()} // 클릭 시 그리드 편집 모드 유지
                onClick={() => setValue(min)}
                className="min-w-[8.3rem]"
              >
                최소 {min.toLocaleString()}만원
              </Button>
              <Button
                size={'md'}
                onMouseDown={(e) => e.stopPropagation()} // 클릭 시 그리드 편집 모드 유지
                onClick={() => setValue(max)}
                className="min-w-[8.3rem]"
              >
                최대 {max >= 10000 ? `${max / 10000}억` : `${max.toLocaleString()}만원`}
              </Button>
            </Grow>
            <Typo icon="ref" color="gray" className="mt-1">
              가입금액 입력단위:백만원
            </Typo>
          </Gcol>
        </PopoverContent>
      </Popover>
    </div>
  );
});
AmountWithPopoverCellEditor.displayName = 'AmountWithPopoverCellEditor';

/**
 * 선택형 셀 UI 렌더러.
 *
 * 역할:
 * - 값 텍스트 + 우측 드롭다운 화살표 아이콘을 일관된 레이아웃으로 표시
 * - 클릭 토글 핸들러에서 입력성 컴포넌트로 인식되도록 `editor-select` class 제공
 *
 * @param params ag-Grid 셀 렌더 파라미터
 * @param params.align 텍스트 정렬(`left` | `center` | `right`, 기본 `right`)
 */
export function editableSelectCellRenderer<RowType>(
  params: ICellRendererParams<RowType> & { align?: 'left' | 'center' | 'right' }
) {
  const align = params.align ?? 'right';
  let justifyClass = 'justify-end';
  let textClass = 'text-right';
  if (align === 'left') {
    justifyClass = 'justify-start';
    textClass = 'text-left';
  } else if (align === 'center') {
    justifyClass = 'justify-center';
    textClass = 'text-center';
  }
  return (
    <div className={`flex items-center px-[0.6rem] ${justifyClass} gap-1 w-full h-full editor-select`}>
      <span className={`block flex-1 ${textClass}`}>{params.value}</span>
      <TableSelectArrowIcon color={'var(--color-gray-60)'} className="shrink-0" />
    </div>
  );
}

/** DatePicker 편집기 동작 모드: 단일 날짜 / 범위 날짜 */
type DatePickerEditorMode = 'single' | 'range';

type DatePickerRangeValue = {
  /** 범위 시작일 문자열 */
  from?: string;
  /** 범위 종료일 문자열 */
  to?: string;
};

type DatePickerCellEditorParams = {
  /** 셀 편집 모드 지정(미지정 시 single) */
  mode?: DatePickerEditorMode;
};

function parseRangeFromValue(rawValue: unknown): DatePickerRangeValue {
  // 1) 이미 객체 형태({ from, to })로 들어온 경우
  if (rawValue && typeof rawValue === 'object' && !Array.isArray(rawValue)) {
    const fromValue = 'from' in rawValue ? rawValue.from : undefined;
    const toValue = 'to' in rawValue ? rawValue.to : undefined;

    return {
      from: typeof fromValue === 'string' ? fromValue : '',
      to: typeof toValue === 'string' ? toValue : '',
    };
  }

  // 2) 비어있거나 문자열이 아닌 경우: 빈 범위로 정규화
  if (typeof rawValue !== 'string' || !rawValue.trim()) {
    return { from: '', to: '' };
  }

  // 3) "YYYY-MM-DD ~ YYYY-MM-DD" 같은 문자열을 분해
  const [from = '', to = ''] = rawValue.split('~').map((part) => part.trim());
  return { from, to };
}

/**
 * ag-Grid 셀 편집기용 DatePicker 래퍼.
 *
 * 지원 모드:
 * - single: 단일 날짜 문자열 편집
 * - range : "from ~ to" 범위 문자열 편집
 *
 * 구현 포인트:
 * 1) 그리드 재렌더/재진입 시 props.value와 내부 상태를 항상 동기화
 * 2) 날짜 선택 즉시 node.setDataValue로 셀 값 반영
 * 3) ag-Grid가 요구하는 imperative API(getValue, isCancelAfterEnd) 제공
 */
export function DatePickerCellEditor<RowType = unknown>(props: ICellEditorParams<RowType>) {
  const editorParams = (props.colDef?.cellEditorParams ?? {}) as DatePickerCellEditorParams;
  const mode: DatePickerEditorMode = editorParams.mode ?? 'single';

  const [value, setValue] = React.useState<string>(() => {
    if (mode === 'range') {
      const initialRange = parseRangeFromValue(props.value);
      if (initialRange.from && initialRange.to) {
        return `${initialRange.from} ~ ${initialRange.to}`;
      }
      return initialRange.from ?? '';
    }

    return typeof props.value === 'string' ? props.value : '';
  });
  const [rangeValue, setRangeValue] = React.useState<DatePickerRangeValue>(() => parseRangeFromValue(props.value));
  const inputRef = React.useRef<HTMLInputElement>(null);

  type CellEditorImperativeRef = {
    getValue: () => string;
    isCancelAfterEnd: () => boolean;
  };
  type CellEditorPropsWithForwardedRef<T> = ICellEditorParams<T> & {
    forwardedRef?: React.Ref<CellEditorImperativeRef>;
  };
  const propsWithForwardedRef = props as unknown as CellEditorPropsWithForwardedRef<RowType>;

  // 셀 진입 시마다 최신 value로 동기화
  React.useEffect(() => {
    if (mode === 'range') {
      const nextRange = parseRangeFromValue(props.value);
      setRangeValue(nextRange);
      if (nextRange.from && nextRange.to) {
        setValue(`${nextRange.from} ~ ${nextRange.to}`);
      } else {
        setValue(nextRange.from ?? '');
      }
      return;
    }

    setRangeValue({ from: '', to: '' });
    setValue(typeof props.value === 'string' ? props.value : '');
  }, [mode, props.value]);

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  const handleChange = (_: Date | undefined, formatted: string) => {
    if (mode === 'range') {
      const [from = '', to = ''] = formatted.split('~').map((part) => part.trim());
      const nextRangeValue = { from, to };
      setRangeValue(nextRangeValue);
      setValue(formatted);

      if (props.node && props.column) {
        props.node.setDataValue(props.column.getColId(), formatted);
      }
      return;
    }

    setValue(formatted);
    // 셀의 값을 즉시 반영
    if (props.node && props.column) {
      props.node.setDataValue(props.column.getColId(), formatted);
    }
    // 날짜 선택 시 편집 종료(값 반영)
    if (props.stopEditing) {
      setTimeout(() => props.stopEditing(), 0);
    }
  };

  // ag-Grid는 커스텀 에디터에 forwardedRef를 넘김
  React.useImperativeHandle(
    propsWithForwardedRef.forwardedRef,
    () => ({
      getValue: () => value,
      isCancelAfterEnd: () => false,
    }),
    [value]
  );

  return (
    <DatePickerInput
      mode={mode}
      value={mode === 'single' ? value : undefined}
      rangeValue={mode === 'range' ? rangeValue : undefined}
      onChange={handleChange}
      size="md"
      width="full"
    />
  );
}

/**
 * 필드 렌더러 컴포넌트가 받는 최소 props 계약.
 * - 행 데이터 전체를 옵션으로 전달한다.
 */
type FieldRendererComponentProps<T> = { data?: T };
/** 행 데이터를 받아 ReactNode를 반환하는 렌더 함수 시그니처 */
type FieldRendererResolver<T> = (data?: T) => React.ReactNode;
/** 컴포넌트 형태의 렌더러 타입 */
type FieldRendererComponent<T> = React.ComponentType<FieldRendererComponentProps<T>>;
/**
 * 필드 렌더 소스 유니온.
 * - 키 문자열 / 정적 노드 / 함수 / 컴포넌트 모두 허용
 */
type FieldRendererSource<T> = keyof T | React.ReactNode | FieldRendererResolver<T> | FieldRendererComponent<T>;

type OverflowTooltipTextProps = {
  /** 툴팁에 표시할 원문(없으면 툴팁 미표시) */
  text?: string;
  /** 실제 셀에 렌더할 콘텐츠 */
  children: React.ReactNode;
};

export function OverflowTooltipText({ text, children }: OverflowTooltipTextProps) {
  const textRef = React.useRef<HTMLSpanElement>(null);
  const [isOverflowed, setIsOverflowed] = React.useState(false);

  /**
   * 실제 렌더된 DOM 크기를 기준으로 overflow 여부 계산.
   * - 가로/세로 어느 한쪽이라도 넘치면 툴팁 표시 대상으로 간주.
   */
  const updateOverflowState = React.useCallback(() => {
    const element = textRef.current;

    if (!element) {
      setIsOverflowed(false);
      return;
    }

    const hasHorizontalOverflow = element.scrollWidth > element.clientWidth;
    const hasVerticalOverflow = element.scrollHeight > element.clientHeight;
    setIsOverflowed(hasHorizontalOverflow || hasVerticalOverflow);
  }, []);

  React.useEffect(() => {
    updateOverflowState();

    const element = textRef.current;
    if (!element) {
      return;
    }

    if (typeof ResizeObserver === 'undefined') {
      // 구형 환경 fallback: window resize 이벤트만 감시
      window.addEventListener('resize', updateOverflowState);

      return () => {
        window.removeEventListener('resize', updateOverflowState);
      };
    }

    const resizeObserver = new ResizeObserver(() => {
      updateOverflowState();
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateOverflowState, text, children]);

  const content = (
    <span ref={textRef} className="inline-block w-full truncate-no">
      {children}
    </span>
  );

  if (!text || !isOverflowed) {
    return content;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent variant="default" side="top" align="start">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

/**
 * 2단 셀 렌더러 팩토리.
 * - `field` 키, 렌더 함수, 컴포넌트, ReactNode를 모두 입력으로 지원
 * - 각 행의 상/하단 라인을 공통 레이아웃으로 렌더
 */
export const createFieldRenderer = <T extends Record<string, unknown>>(
  field1: FieldRendererSource<T>,
  field2?: FieldRendererSource<T>,
  div: 'row' | 'col' = 'col'
) => {
  const renderer = (params: ICellRendererParams<T>) => {
    const data = params.data as T | undefined;

    const parseSizedField = (
      field: FieldRendererSource<T> | undefined
    ): { source: FieldRendererSource<T> | undefined; size?: number } => {
      if (typeof field !== 'string') {
        return { source: field };
      }

      const matched = field.match(/^\[\s*([^,\]]+)\s*,\s*(\d+)\s*\]$/);
      if (!matched) {
        return { source: field };
      }

      const parsedSize = Number(matched[2]);
      if (!Number.isFinite(parsedSize)) {
        return { source: matched[1].trim() };
      }

      return {
        source: matched[1].trim(),
        size: parsedSize,
      };
    };

    const parsedField1 = parseSizedField(field1);
    const parsedField2 = parseSizedField(field2);

    // field1, field2 공통 resolver
    const resolveNode = (field: FieldRendererSource<T> | undefined): React.ReactNode => {
      if (field === undefined || field === null) return '';

      if (typeof field === 'function') {
        try {
          const result = (field as FieldRendererResolver<T>)(data);
          if (React.isValidElement(result) || typeof result === 'string' || typeof result === 'number') {
            return result;
          }
          return React.createElement(field as FieldRendererComponent<T>, { data });
        } catch {
          try {
            return React.createElement(field as FieldRendererComponent<T>, { data });
          } catch {
            return '';
          }
        }
      }

      if (typeof field === 'string' && data && (field as keyof T) in data) {
        return String(data?.[field as keyof T] ?? '');
      }

      return (field as React.ReactNode) ?? '';
    };

    const aNode = resolveNode(parsedField1.source);
    const bNode = resolveNode(parsedField2.source);

    const resolveTooltipText = (value: React.ReactNode): string | undefined => {
      if (value === null || value === undefined) {
        return undefined;
      }

      if (typeof value === 'string') {
        return value;
      }

      if (typeof value === 'number' || typeof value === 'bigint' || typeof value === 'boolean') {
        return String(value);
      }

      return undefined;
    };

    const aTooltipText = resolveTooltipText(aNode);
    const bTooltipText = resolveTooltipText(bNode);

    const renderCell = (value: React.ReactNode) => {
      if (React.isValidElement(value)) return value;
      return <Typo>{String(value ?? '')}</Typo>;
    };

    const renderCellWithTooltip = (value: React.ReactNode, tooltipText?: string) => {
      const content = renderCell(value);

      return <OverflowTooltipText text={tooltipText}>{content}</OverflowTooltipText>;
    };

    const getRowCellStyle = (size?: number): React.CSSProperties => {
      if (size === undefined) {
        return {
          flex: '1 1 0%',
          minWidth: 0,
        };
      }

      return {
        flex: `0 0 ${size}px`,
        width: `${size}px`,
        minWidth: `${size}px`,
      };
    };

    return div === 'col' ? (
      <Grid className="w-full grid-rows-[1fr_1fr] divide-y divide-gray-200" gap={0}>
        <div className="h-[3rem] w-full leading-[3rem] truncate-no pl-1">
          {renderCellWithTooltip(aNode, aTooltipText)}
        </div>
        <div className="h-[3rem] w-full leading-[3rem] truncate-no pl-1">
          {renderCellWithTooltip(bNode, bTooltipText)}
        </div>
      </Grid>
    ) : (
      <div className="flex w-full h-full justify-start divide-x divide-gray-200">
        <div className="truncate-no" style={getRowCellStyle(parsedField1.size)}>
          {renderCellWithTooltip(aNode, aTooltipText)}
        </div>
        <div className="truncate-no" style={getRowCellStyle(parsedField2.size)}>
          {renderCellWithTooltip(bNode, bTooltipText)}
        </div>
      </div>
    );
  };

  return Object.assign(renderer, { displayName: 'AgGridFieldRenderer' });
};

/**
 * ag-Grid + TablePagination 연동 공통 훅
 * @param gridRef ag-Grid API ref (React.useRef)
 * @param pageSize 페이지당 행 수
 */
export function useAgGridPagination<TData>(gridRef: React.RefObject<AgGridReact<TData> | null>, _pageSize: number) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  // ag-Grid onGridReady 핸들러
  const handleGridReady = (params: GridReadyEvent<TData>) => {
    setTotalPages(params.api.paginationGetTotalPages());
    setCurrentPage(params.api.paginationGetCurrentPage() + 1);
    params.api.addEventListener('paginationChanged', () => {
      setTotalPages(params.api.paginationGetTotalPages());
      setCurrentPage(params.api.paginationGetCurrentPage() + 1);
    });
  };

  // TablePagination에서 페이지 변경 시 ag-Grid 페이지 이동
  const handlePageChange = (page: number) => {
    if (gridRef.current?.api) {
      gridRef.current.api.paginationGoToPage(page - 1);
    }
  };

  return {
    currentPage,
    totalPages,
    handleGridReady,
    handlePageChange,
  };
}

interface UseAgGridInfiniteAppendParams<TData> {
  /** 전체 원본 행(서버 응답 또는 상위 상태) */
  allRows: TData[] | number;
  /** 한 번에 확장할 단위 건수 */
  pageSize: number;
  /** 초기 노출 건수(미지정 시 pageSize) */
  initialLoadedCount?: number;
}

/** ag-Grid sortModel 최소 표현 타입 */
type SortState = Array<{
  /** 정렬 대상 컬럼 id */
  colId: string;
  /** 정렬 방향 */
  sort: 'asc' | 'desc';
}>;

/**
 * infinite rowModel + 더보기(append) 공통 훅
 * - 다음: pageSize 만큼 로드 범위 증가
 * - 전체조회: 전체 건수로 로드 범위 확장
 * - 정렬: onSortChanged 콜백으로 sortModel 전달 필수
 */
export function useAgGridInfiniteAppend<TData>({
  allRows,
  pageSize,
  initialLoadedCount,
}: UseAgGridInfiniteAppendParams<TData>) {
  const totalCount = typeof allRows === 'number' ? allRows : allRows.length;
  const safeInitial = Math.max(0, Math.min(initialLoadedCount ?? pageSize, totalCount));

  const [loadedCount, setLoadedCount] = React.useState<number>(safeInitial);
  const [sortState, setSortState] = React.useState<SortState>([]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.max(1, Math.ceil(Math.max(loadedCount, 1) / pageSize));
  const isLastPage = loadedCount >= totalCount;

  const handleLoadNext = React.useCallback(() => {
    setLoadedCount((prev) => Math.min(totalCount, prev + pageSize));
  }, [pageSize, totalCount]);

  const handleLoadAll = React.useCallback(() => {
    setLoadedCount((prev) => (prev >= totalCount ? safeInitial : totalCount));
  }, [safeInitial, totalCount]);

  /**
   * 접기: 처음 상태(pageSize 또는 initialLoadedCount)로 복원.
   */
  const handleLoadReset = React.useCallback(() => {
    setLoadedCount(initialLoadedCount ?? pageSize);
  }, [initialLoadedCount, pageSize]);

  /**
   * 정렬 상태 업데이트 (AgGrid onSortChanged 콜백에서 호출)
   */
  const handleSortChanged = React.useCallback((sortModel: SortState) => {
    setSortState(sortModel);
  }, []);

  /**
   * 정렬 로직: sortState에 따라 데이터 정렬
   */
  const getSortedRows = React.useCallback(
    (rows: TData[]): TData[] => {
      if (sortState.length === 0) return rows;

      return [...rows].sort((a, b) => {
        for (const { colId, sort } of sortState) {
          const aVal = (a as Record<string, unknown>)[colId];
          const bVal = (b as Record<string, unknown>)[colId];

          if (aVal === bVal) continue;

          let comparison = 0;
          if (typeof aVal === 'string' && typeof bVal === 'string') {
            comparison = aVal.localeCompare(bVal);
          } else if (typeof aVal === 'number' && typeof bVal === 'number') {
            comparison = aVal - bVal;
          } else {
            comparison = String(aVal).localeCompare(String(bVal));
          }

          return sort === 'asc' ? comparison : -comparison;
        }
        return 0;
      });
    },
    [sortState]
  );

  const dataSource = React.useMemo<IDatasource>(() => {
    return {
      getRows: (params: IGetRowsParams) => {
        // 정렬 적용 후 슬라이싱
        const sortedRows = Array.isArray(allRows) ? getSortedRows(allRows) : [];
        const safeEnd = Math.min(params.endRow, loadedCount);
        const rowsThisBlock = sortedRows.slice(params.startRow, safeEnd);
        const lastRow = loadedCount >= totalCount ? totalCount : loadedCount;

        params.successCallback(rowsThisBlock, lastRow);
      },
    };
  }, [allRows, loadedCount, totalCount, getSortedRows]);

  return {
    loadedCount,
    totalCount,
    totalPages,
    currentPage,
    isLastPage,
    setLoadedCount,
    handleLoadNext,
    handleLoadAll,
    handleLoadReset,
    handleSortChanged,
    dataSource,
  };
}

/**
 * 헤더 체크박스 컴포넌트 추가 파라미터 타입
 */
export type GridHeaderCheckboxExtraParams = {
  getAllChecked: (api?: GridApi) => boolean;
  toggleAll: (next: boolean) => void;
};

/**
 * 헤더 체크박스 컴포넌트 Props 타입 (ag-grid IHeaderParams 확장)
 */
export type GridHeaderCheckboxParams = IHeaderParams & GridHeaderCheckboxExtraParams;

/**
 * 헤더 체크박스 공통 컴포넌트
 * - 열 전체 선택/해제
 * - getAllChecked: grid API로 현재 체크 상태 조회 (stale state 없음)
 * - toggleAll: grid API로 전체 행 값 변경 + 헤더 자동 갱신
 *
 * @example
 * headerComponent: GridHeaderCheckbox,
 * headerComponentParams: createHeaderCheckboxParams(gridApiRef, 'isCheck'),
 */
export const GridHeaderCheckbox = (props: GridHeaderCheckboxParams) => {
  const checked = props.getAllChecked(props.api);
  const display = props.displayName ?? props.column.getColDef().headerName;

  return (
    <Grow className="ag-header-cell-label">
      <Checkbox
        color="primary"
        variant={display ? 'default' : 'noneText'}
        checked={checked}
        size={'md'}
        onClick={(e) => e.stopPropagation()}
        onCheckedChange={(value) => {
          props.toggleAll(value === true);
          props.api.refreshHeader();
        }}
      >
        {display && <span className="ag-header-cell-text">{display}</span>}
      </Checkbox>
    </Grow>
  );
};

/**
 * 헤더 체크박스 headerComponentParams 생성기 (공용)
 * - getAllChecked: grid API에서 직접 읽어 stale React state 문제 해결
 * - toggleAll: grid API를 통해 전체 행 값 일괄 변경 후 헤더 갱신
 *
 * @param gridApiRef grid API ref (React.useRef<GridApi<T> | null>)
 * @param field 체크박스 필드명 (keyof T)
 *
 * @example
 * headerComponent: GridHeaderCheckbox,
 * headerComponentParams: createHeaderCheckboxParams(gridApiRef, 'isCheck'),
 */
export function createHeaderCheckboxParams<T extends Record<string, unknown>>(
  gridApiRef: React.RefObject<GridApi<T> | null>,
  field: keyof T & string
): GridHeaderCheckboxExtraParams {
  return {
    getAllChecked: (api?: GridApi<T>) => {
      const resolvedApi = api ?? gridApiRef.current;
      if (!resolvedApi) return false;
      const rows: T[] = [];
      resolvedApi.forEachNode((node) => {
        if (node.data) rows.push(node.data);
      });
      return rows.length > 0 && rows.every((row) => Boolean(row[field]));
    },
    toggleAll: (next: boolean) => {
      const api = gridApiRef.current;
      if (!api) return;
      api.forEachNode((node) => {
        if (node.data) node.setDataValue(field, next);
      });
      api.refreshHeader();
    },
  };
}

/**
 * 헤더 체크박스 동기화 onCellValueChanged 핸들러 생성기 (공용)
 * - 체크박스 셀 값 변경 시 헤더를 자동 갱신 (전체체크 상태 즉시 반영)
 * - createHeaderCheckboxParams와 함께 사용
 *
 * @param fields 헤더 체크박스와 연결된 필드명 (단일 또는 배열)
 *
 * @example
 * // AgGridReact에 적용
 * onCellValueChanged={createHeaderCheckboxOnCellValueChanged(['isCheck1', 'isCheck2'])}
 */
export function createHeaderCheckboxOnCellValueChanged<T>(fields: (keyof T & string) | (keyof T & string)[]) {
  const fieldSet = new Set(Array.isArray(fields) ? fields : [fields]);
  return (params: CellValueChangedEvent<T>) => {
    if (fieldSet.has(params.column.getColId() as keyof T & string)) {
      params.api.refreshHeader();
    }
  };
}

/**
 * ag-Grid 기본 empty overlay 컴포넌트.
 */
export function AgGridEmptyComponent({ className: _className }: React.ComponentProps<'div'>) {
  return (
    <div className="bg-(--color-gray-0) w-full h-full flex items-center justify-center gap-1 text-(--color-gray-70)">
      <InfoBoxWarningIcon color="var(--color-gray-50)" />
      조회 결과가 없습니다.
    </div>
  );
}

type FieldKey<TData> = Extract<keyof TData, string>;

interface UseAgGridColumnVisibilityParams<TData extends object> {
  /** 제어 대상 ag-Grid 인스턴스 ref */
  gridRef: RefObject<AgGridReact<TData> | null>;
  /** 토글 허용 컬럼 목록(화이트리스트) */
  toggleFields: readonly FieldKey<TData>[];
  /** 초기 표시 컬럼 목록(미지정 시 toggleFields 전체) */
  initialVisibleFields?: readonly FieldKey<TData>[];
}

export function useAgGridColumnVisibility<TData extends object>({
  gridRef,
  toggleFields,
  initialVisibleFields,
}: UseAgGridColumnVisibilityParams<TData>) {
  /**
   * 현재 사용자에게 노출 중인 컬럼 key 목록.
   * - 초기값은 initialVisibleFields 우선
   * - 없으면 toggleFields 전체 노출
   */
  const [visibleFields, setVisibleFields] = useState<FieldKey<TData>[]>(() => {
    if (initialVisibleFields && initialVisibleFields.length > 0) {
      return [...initialVisibleFields];
    }
    return [...toggleFields];
  });

  const applyColumnVisibility = useCallback(
    (selectedFields: readonly FieldKey<TData>[]) => {
      const api = gridRef.current?.api;
      if (!api) return;

      // 먼저 대상 컬럼(toggleFields)을 모두 숨긴 뒤,
      // 선택된 컬럼만 다시 표시하여 상태를 단순/명확하게 유지.
      api.setColumnsVisible([...toggleFields], false);
      api.setColumnsVisible([...selectedFields], true);
      api.refreshHeader();
    },
    [gridRef, toggleFields]
  );

  useEffect(() => {
    applyColumnVisibility(visibleFields);
  }, [applyColumnVisibility, visibleFields]);

  const onGridReady = useCallback(
    (_event: GridReadyEvent<TData>) => {
      applyColumnVisibility(visibleFields);
    },
    [applyColumnVisibility, visibleFields]
  );

  const onVisibleFieldsChange = useCallback(
    (fields: string[]) => {
      // 외부에서 들어온 임의 문자열 중 실제 토글 가능한 필드만 필터링
      const next = fields.filter((field): field is FieldKey<TData> => toggleFields.includes(field as FieldKey<TData>));
      setVisibleFields(next);
    },
    [toggleFields]
  );

  return {
    visibleFields,
    setVisibleFields,
    onVisibleFieldsChange,
    onGridReady,
    applyColumnVisibility,
  };
}

/**
 * 페이지 셸의 aside 표시/확장 상태를 관리하는 공통 훅.
 */
export function useAsideToggleState(initialState = false) {
  const [isWidthExpanded, setIsWidthExpanded] = useState(initialState);

  return {
    isWidthExpanded,
    setIsWidthExpanded,
    hideAside: isWidthExpanded,
  };
}

export const getCurrentRootFontSize = (fallbackFontSize = 10): number => {
  /**
   * html(root) 기준 font-size를 읽어 반응형 px 계산의 기준값으로 사용.
   * SSR 환경에서는 `window`가 없으므로 fallback을 반환한다.
   */
  if (typeof window === 'undefined') return fallbackFontSize;

  const computedFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);

  if (Number.isNaN(computedFontSize)) {
    return fallbackFontSize;
  }

  return computedFontSize;
};

/**
 * 기본 폰트 크기 변화에 대응하여 상대적인 px 값을 반환하는 함수
 * @param targetPx - 변환하고자 하는 기준 px 값 (예: 100)
 * @param standardFontSize - 기준이 되는 기본 폰트 크기 (기본값: 12)
 * @returns 현재 폰트 크기 비율이 적용된 px 값
 */
export const getDynamicPx = (targetPx: number, standardFontSize: number = 12): number => {
  const currentRootFontSize = getCurrentRootFontSize(standardFontSize);

  // 2. 기준 크기 대비 현재 크기의 비율 계산 후 적용
  // 공식: (현재 폰트 / 기준 폰트) * 목표 수치
  return (currentRootFontSize / standardFontSize) * targetPx;
};

export function useDynamicPx(targetPx: number, standardFontSize: number = 12): number {
  const [dynamicPx, setDynamicPx] = useState<number>(() => getDynamicPx(targetPx, standardFontSize));

  useEffect(() => {
    const updateDynamicPx = () => {
      setDynamicPx(getDynamicPx(targetPx, standardFontSize));
    };

    updateDynamicPx();

    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener(SCALE_CHANGE_EVENT, updateDynamicPx);

    return () => {
      window.removeEventListener(SCALE_CHANGE_EVENT, updateDynamicPx);
    };
  }, [standardFontSize, targetPx]);

  return dynamicPx;
}

export function renderTbodyTh(children: React.ReactNode) {
  return (
    <Grow className="w-full px-2 py-1  h-full">
      <Typo className="w-full whitespace-pre-wrap text-[#000] font-[500]" color="gray" tag="span" variant="body-md">
        {children}
      </Typo>
    </Grow>
  );
}

export function useDynamicColumnWidths() {
  const standardFontSize = 10;
  const [scaleRatio, setScaleRatio] = useState<number>(
    () => getCurrentRootFontSize(standardFontSize) / standardFontSize
  );

  useEffect(() => {
    const updateScaleRatio = () => {
      setScaleRatio(getCurrentRootFontSize(standardFontSize) / standardFontSize);
    };

    updateScaleRatio();

    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener(SCALE_CHANGE_EVENT, updateScaleRatio);

    return () => {
      window.removeEventListener(SCALE_CHANGE_EVENT, updateScaleRatio);
    };
  }, [standardFontSize]);

  const attributeColumnWidthPx = useMemo<number[]>(() => {
    const maxWidth = 260;
    // 인덱스 = 원본 px, 값 = 현재 스케일 적용 px
    return Array.from({ length: maxWidth + 1 }, (_, px) => px * scaleRatio);
  }, [scaleRatio]);

  const attributeColumnWidth = useMemo<((px: number) => number) & { [index: number]: number }>(() => {
    // 함수 호출 방식: attributeColumnWidth(37)
    const resolveWidth = ((px: number) => {
      const safePx = Math.max(0, Math.min(260, Math.trunc(px)));
      return attributeColumnWidthPx[safePx] ?? 0;
    }) as ((px: number) => number) & { [index: number]: number };

    // 프로퍼티 접근 방식도 지원: attributeColumnWidth[10] (== 100px 대응)
    for (let index = 0; index <= 26; index += 1) {
      resolveWidth[index] = attributeColumnWidthPx[index * 10] ?? 0;
    }

    return resolveWidth;
  }, [attributeColumnWidthPx]);

  const getAttributeColumnWidth = attributeColumnWidth;

  return {
    attributeColumnWidthPx,
    attributeColumnWidth,
    getAttributeColumnWidth,
  };
}

export const CoveragePopover = ({
  text,
  items,
}: {
  /** 트리거 버튼에 표시할 요약 텍스트 */
  text: string;
  /** 팝오버 상세 정보(없으면 일부 영역은 비어 있을 수 있음) */
  items?: { title: string; description: string; info: string[] };
}) => {
  /** 팝오버 열림 상태 */
  const [open, setOpen] = useState(false);
  /** 트리거 버튼 ref (접근성/포커스 제어 확장 대비) */
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className="truncate-no w-full pl-1.5 flex-1 text-left"
          aria-haspopup="dialog"
        >
          {text}
        </button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="max-w-[42.5rem] select-text" closeButton={true}>
        <Gcol>
          <Grow className="w-full" placement="bws">
            <Typo variant={'heading-sm'}>{items?.title}</Typo>
            <Button size={'sm'} className="-translate-y-[0.2rem]">
              AI 질문하기
            </Button>
          </Grow>
          <Gcol className="w-full select-text" placement="ss">
            <Typo variant={'body-sm'} color={'gray'}>
              {items?.description}
            </Typo>
            <BulletList type={'star'} size={'xs'}>
              {items?.info.map((item, index) => (
                <BulletListItem key={index}>{item}</BulletListItem>
              ))}
            </BulletList>
          </Gcol>
        </Gcol>
      </PopoverContent>
    </Popover>
  );
};
