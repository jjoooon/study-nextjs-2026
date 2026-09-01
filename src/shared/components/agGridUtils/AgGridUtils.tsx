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
import type { AgGridReact, CustomLoadingOverlayProps, CustomCellEditorProps } from 'ag-grid-react';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import type { RefObject } from 'react';
import { SCALE_CHANGE_EVENT } from '@/shared/utils/scale';
import { Typo, Grow, Grid, Gcol } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DatePickerInput } from '@common/DatePicker';
import { Ltpa120 } from '@features/Ltpa120';
import { InfoBoxWarningIcon, MinusIcon, PlusIcon, TableSelectArrowIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from '@uiux/Popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

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

  const [prevRows, setPrevRows] = useState<T[]>(rows);

  /**
   * rows 변경 시(조회 재실행/필터링/삭제 등) 더 이상 존재하지 않는 id를 복제 집합에서 즉시 제거 (렌더 단계에서 동기화).
   */
  if (rows !== prevRows) {
    setPrevRows(rows);
    const validIds = new Set(rows.map((row) => String(row[idKey] as PrimitiveId)));
    const next = new Set<string>();
    let hasChanged = false;

    clonedBaseIds.forEach((id) => {
      if (validIds.has(id)) {
        next.add(id);
      } else {
        hasChanged = true;
      }
    });

    if (hasChanged) {
      setClonedBaseIds(next);
    }
  }

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
 * [Ag-Grid Helper] 셀 값 변경 이벤트 공용 핸들러 생성기
 *
 * - 셀 값 수정 시 상태(state) 동기화 및 유효성(Validation) 체크 결과(에러 행 ID 관리) 자동 갱신
 * @param fields 변경할 필드명 (단일 또는 배열)
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
 * @param options.transformRows 생성 및 삽입 완료 후 행 전체 재정렬/변환 함수
 */
export function createAddRowHandler<RowType extends Record<string, unknown>, IDType extends string | number>(
  setRowData: React.Dispatch<React.SetStateAction<RowType[]>>,
  options: {
    idKey: keyof RowType;
    getNextId: (rows: RowType[]) => IDType;
    createRow: (nextId: IDType, rows: RowType[], focusedRow?: RowType) => RowType;
    insertAt?: 'start' | 'end' | 'focused';
    getInsertIndex?: (rows: RowType[]) => number;
    gridApiRef?: React.RefObject<GridApi<RowType> | null>;
    transformRows?: (rows: RowType[]) => RowType[];
  }
) {
  const { idKey, getNextId, createRow, insertAt = 'end', getInsertIndex, gridApiRef, transformRows } = options;

  return () => {
    setRowData((prev) => {
      const nextId = getNextId(prev);

      let focusedRow: RowType | undefined = undefined;
      const nextRows = [...prev];

      let defaultIndex = insertAt === 'start' ? 0 : nextRows.length;

      // focused 인 경우 포커스된 행 바로 아래 또는 선택된/마지막 행 바로 아래에 인덱위치 설정
      if (insertAt === 'focused' && gridApiRef?.current) {
        const focusedCell = gridApiRef.current.getFocusedCell();
        const selectedNodes = gridApiRef.current.getSelectedNodes();

        if (focusedCell && focusedCell.rowIndex >= 0) {
          defaultIndex = focusedCell.rowIndex + 1;
          const displayedRow = gridApiRef.current.getDisplayedRowAtIndex(focusedCell.rowIndex);
          focusedRow = displayedRow?.data ?? prev[focusedCell.rowIndex];
        } else if (selectedNodes.length > 0) {
          const selectedNode = selectedNodes[0];
          focusedRow = selectedNode.data;
          const selectedIndex = selectedNode.rowIndex;
          defaultIndex =
            selectedIndex !== null && selectedIndex !== undefined && selectedIndex >= 0
              ? selectedIndex + 1
              : nextRows.length;
        } else if (prev.length > 0) {
          defaultIndex = nextRows.length;
          focusedRow = prev[prev.length - 1];
        } else {
          defaultIndex = nextRows.length;
        }
      } else if (prev.length > 0) {
        focusedRow = prev[prev.length - 1];
      }

      const newRow = {
        ...createRow(nextId, prev, focusedRow),
        [idKey]: nextId,
      } as RowType;

      const customIndex = getInsertIndex ? getInsertIndex(nextRows) : defaultIndex;
      const boundedIndex = Math.max(0, Math.min(customIndex, nextRows.length));

      nextRows.splice(boundedIndex, 0, newRow);

      const finalRows = transformRows ? transformRows(nextRows) : nextRows;

      if (gridApiRef?.current) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // 새로 삽입된 행으로 스크롤 이동
            gridApiRef.current?.ensureIndexVisible(boundedIndex, 'middle');

            if (insertAt === 'focused') {
              const focusedCell = gridApiRef.current?.getFocusedCell();
              if (focusedCell) {
                gridApiRef.current?.setFocusedCell(boundedIndex, focusedCell.column.getColId());
              }
            } else if (insertAt === 'end') {
              const viewportElement = document.querySelector('.ag-body-viewport');
              if (viewportElement) {
                viewportElement.scrollTop = viewportElement.scrollHeight;
              }
            }
          });
        });
      }

      return finalRows;
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
 * [Ag-Grid Helper] 셀 텍스트 말줄임(Truncated) 처리 시 툴팁 반환 게터 생성기
 *
 * - 셀의 텍스트가 생략되었을 때(말줄임 상태) 툴팁에 표시할 원본 값을 가져옴
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

  return (params: { data?: T; value?: unknown; valueFormatted?: string | null }) => {
    const rawValue =
      valueGetter && params.data
        ? valueGetter(params.data)
        : field && params.data
          ? params.data[field]
          : (params.valueFormatted ?? params.value ?? '');
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
 * [Ag-Grid Formatter] 천단위 콤마 포맷터
 *
 * - 숫자 데이터를 천단위 구분을 위해 3자리마다 쉼표(,)가 포함된 문자열로 포맷팅
 */
export const numberValueFormatter = <T,>(params: ValueFormatterParams<T>) => {
  if (params.value === null || params.value === undefined || params.value === '') return '';
  // 문자열이지만 숫자라면 콤마 적용
  const num = Number(params.value);
  if (!isNaN(num)) return num.toLocaleString();
  return params.value;
};

/**
 * Popover를 통한 +/- 조정 기능이 포함된 숫자 편집기 (가입금액 전용 커스텀 Cell Editor)
 *
 * [동작 상세 설명 & 다른 개발자를 위한 가이드]
 * 1. 상태 분리 (로컬 상태 vs 글로벌 상태):
 *    - 값 수정 중(onChange, 버튼 클릭) 실시간으로 부모 React 상태(rowData)를 변경하면 그리드가 전체 리렌더링되면서
 *      현재 열려있는 편집 세션(Cell Editor)이 강제로 파괴(Destroy)되는 현상이 발생합니다.
 *    - 이를 막기 위해 편집 진행 중에는 로컬 상태(`value`, `valueRef`)만 업데이트하고,
 *      최종적으로 에디터가 닫힐 때(unmount 시점) 그리드 데이터와 부모 상태에 한꺼번에 커밋하도록 설계되었습니다.
 *
 * 2. Event Propagation 차단 (인풋 클릭 시 편집 꺼짐 방지):
 *    - ag-Grid는 document 레벨에서 발생하는 click 및 mousedown 이벤트를 감시하여, 셀 바깥 영역이 클릭되면 편집 모드를 종료합니다.
 *    - React의 `e.stopPropagation()` 만으로는 이 네이티브 이벤트 전파를 막을 수 없어 에디터 내 인풋을 클릭했을 때 편집 모드가 종료되는 문제가 있었습니다.
 *    - 따라서 인풋의 `onMouseDown` 및 `onClick` 이벤트 핸들러에서 `e.nativeEvent.stopImmediatePropagation()`을 명시적으로 호출해
 *      ag-Grid 내부의 전파 감지 핸들러로 이벤트가 도달하지 못하도록 확실하게 격리하였습니다.
 *
 * 3. ag-Grid 팝업 선언 (isPopup):
 *    - `isPopup: () => true`를 통해 ag-Grid에게 이 컴포넌트가 셀 내부가 아닌 별도의 팝업(레이어) 형태로 띄워짐을 알려주어,
 *      팝오버 영역 내부 클릭 시 셀 포커스가 튀거나 팝업이 닫히는 현상을 구조적으로 방지합니다.
 */
export const AmountWithPopoverCellEditor = forwardRef((props: ICellEditorParams, ref) => {
  const initialValue = Number(props.value) || 0;
  // UI 렌더링 동기화를 위한 State와 unmount 시 참조할 최신 값을 보관하는 Ref를 분리하여 관리
  const [value, setValueState] = useState<number>(initialValue);
  const valueRef = useRef<number>(initialValue);
  const [open, setOpen] = useState(true);
  const step = props.colDef?.cellEditorParams?.step || 100;
  const min = props.colDef?.cellEditorParams?.min ?? 100;
  const max = props.colDef?.cellEditorParams?.max ?? 20000;

  // 값 업데이트 시 State와 Ref를 동시에 동기화
  const updateValue = useCallback((newValue: number) => {
    valueRef.current = newValue;
    setValueState(newValue);
  }, []);

  // [중요] 에디터 컴포넌트가 언마운트(소멸)되는 최종 시점에 최종 누적값을 그리드 셀에 반영
  // 이 처리를 통해 여러 번 버튼을 클릭하여 수정한 최종 값이 중간 유실 없이 상위 rowData 상태까지 일괄 동기화됩니다.
  useEffect(() => {
    return () => {
      if (props.node && props.column) {
        props.node.setDataValue(props.column.getColId(), valueRef.current);
      }
    };
  }, [props.node, props.column]);

  // 그리드 바디 스크롤 발생 시 자동으로 에디터 팝업을 닫음
  useEffect(() => {
    const handleScroll = () => {
      props.stopEditing?.(false);
    };
    props.api?.addEventListener('bodyScroll', handleScroll);
    return () => {
      props.api?.removeEventListener('bodyScroll', handleScroll);
    };
  }, [props.api, props.stopEditing]);

  useImperativeHandle(
    ref,
    () => ({
      getValue: () => valueRef.current,
      isCancelAfterEnd: () => false,
      isPopup: () => true, // ag-Grid에 이 컴포넌트가 팝업 형태임을 알려 위치 및 포커스 관리를 위임
    }),
    []
  );

  // 팝오버의 열림/닫힘 상태가 바뀔 때 에디팅 모드를 함께 종료시켜줍니다.
  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (!nextOpen) {
        props.stopEditing?.(false);
      }
    },
    [props]
  );

  return (
    <div className="flex items-center w-full h-full">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverAnchor asChild>
          <input
            className="ag-input-field-input flex-1 w-full h-full border-none outline-none text-right bg-transparent p-0"
            type="number"
            value={value}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (!isNaN(val)) {
                updateValue(val);
              }
            }}
            // [중요] input 영역 마우스 클릭 시 ag-Grid가 외부 클릭으로 인지해 편집 모드를 Cancel(Destroy)하는 현상 완전 방지
            onMouseDown={(e) => {
              e.nativeEvent.stopImmediatePropagation(); // ag-Grid document mousedown 핸들러 차단
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.nativeEvent.stopImmediatePropagation(); // ag-Grid document click 핸들러 차단
              e.stopPropagation();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                props.stopEditing?.(false);
                return;
              }
              e.stopPropagation(); // 팝오버 내부 입력 시 그리드 이벤트 전파 방지
            }}
            autoFocus
          />
        </PopoverAnchor>
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
                onClick={() => updateValue(Math.max(min, valueRef.current - step))}
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
                onClick={() => updateValue(Math.min(max, valueRef.current + step))}
              >
                <PlusIcon color={'var(--color-primary-50)'} />
              </Button>
            </Grow>
            <Grow>
              <Button
                size={'md'}
                color={'secondary'}
                onMouseDown={(e) => e.stopPropagation()} // 클릭 시 그리드 편집 모드 유지
                onClick={() => updateValue(min)}
                className="min-w-[8.3rem]"
              >
                최소 {min.toLocaleString()}만원
              </Button>
              <Button
                size={'md'}
                onMouseDown={(e) => e.stopPropagation()} // 클릭 시 그리드 편집 모드 유지
                onClick={() => updateValue(max)}
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
  params: ICellRendererParams<RowType> & {
    align?: 'left' | 'center' | 'right';
    paddingClass?: string;
  }
) {
  const align = params.align ?? 'right';
  let textClass = 'text-right';
  let defaultPaddingClass = 'px-[0.6rem]';

  if (align === 'left') {
    textClass = 'text-left';
    defaultPaddingClass = 'pr-[1.6rem]';
  } else if (align === 'center') {
    textClass = 'text-center';
    defaultPaddingClass = 'pr-[1.2rem]';
  } else if (align === 'right') {
    textClass = 'text-right';
    defaultPaddingClass = 'pr-[1.2rem]';
  }

  const paddingClass = params.paddingClass ?? defaultPaddingClass;
  const displayValue =
    params.valueFormatted !== undefined && params.valueFormatted !== null ? params.valueFormatted : params.value;
  return (
    <div className={`relative flex w-full h-full items-center ${paddingClass} editor-select select-none`}>
      <span className={`block flex-1 min-w-0 truncate-no ${textClass}`}>{displayValue}</span>
      <TableSelectArrowIcon
        color={'var(--color-gray-60)'}
        className="absolute right-[0rem] top-1/2 -translate-y-1/2 shrink-0 pointer-events-none"
      />
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
  /** 월만 선택하는 모드(월 단위 그리드 캘린더) 여부 */
  monthOnly?: boolean;
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
 * [Ag-Grid Cell Editor] DatePicker 달력 입력 에디터
 *
 * - 직접 날짜 입력(YYYY-MM-DD) 및 달력 팝업을 통한 날짜 선택 기능 제공
 * - ag-Grid 컬럼 설정의 cellEditorParams로 DatePickerCellEditorParams 옵션 전달 가능
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

  const [prevValueProp, setPrevValueProp] = React.useState<unknown>(props.value);
  const [prevModeProp, setPrevModeProp] = React.useState<DatePickerEditorMode>(mode);

  // 셀 진입 시마다 최신 value로 동기화 (렌더 단계에서 동기화)
  if (props.value !== prevValueProp || mode !== prevModeProp) {
    setPrevValueProp(props.value);
    setPrevModeProp(mode);

    if (mode === 'range') {
      const nextRange = parseRangeFromValue(props.value);
      setRangeValue(nextRange);
      if (nextRange.from && nextRange.to) {
        setValue(`${nextRange.from} ~ ${nextRange.to}`);
      } else {
        setValue(nextRange.from ?? '');
      }
    } else {
      setRangeValue({ from: '', to: '' });
      setValue(typeof props.value === 'string' ? props.value : '');
    }
  }

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
      monthOnly={editorParams.monthOnly}
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
  div: 'row' | 'col' = 'col',
  ratio: [number, number] = [1, 1]
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

    const getRowCellStyle = (index: 0 | 1, size?: number): React.CSSProperties => {
      if (size === undefined) {
        const flexRatio = ratio[index];
        return {
          flex: `${flexRatio} ${flexRatio} 0%`,
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
        <div className="truncate-no" style={getRowCellStyle(0, parsedField1.size)}>
          {renderCellWithTooltip(aNode, aTooltipText)}
        </div>
        <div className="truncate-no" style={getRowCellStyle(1, parsedField2.size)}>
          {renderCellWithTooltip(bNode, bTooltipText)}
        </div>
      </div>
    );
  };

  return Object.assign(renderer, { displayName: 'AgGridFieldRenderer' });
};

/**
 * [Ag-Grid Hook] ag-Grid 페이지네이션 연동용 커스텀 훅
 *
 * - 외부 TablePagination 컴포넌트와 ag-Grid API의 페이지 상태를 연동
 * - 페이지 크기(pageSize) 단위로 페이지 변경 및 총 페이지 계산 처리
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
 * [Ag-Grid Hook] 무한 스크롤 및 추가 로드(TableMore) 연동용 커스텀 훅
 *
 * - ag-Grid의 Infinite Row Model 데이터 소스를 생성 및 관리
 * - '더보기' 및 '전체보기' 액션에 대응하여 데이터를 추가로 바인딩
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
        {display && <span className="ag-header-cell-text font-bold!">{display}</span>}
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
 * [Ag-Grid Component] 데이터가 없을 때 노출하는 Empty 오버레이 UI
 */
interface AgGridEmptyComponentProps extends React.ComponentProps<'div'> {
  message?: string;
}

export function AgGridEmptyComponent({ className: _className, message }: AgGridEmptyComponentProps) {
  return (
    message && (
      <div className="bg-(--color-gray-0) w-full h-full flex items-center justify-center gap-1 text-(--color-gray-70)">
        <InfoBoxWarningIcon color="var(--color-gray-50)" />
        {message ?? '조회 결과가 없습니다.'}
      </div>
    )
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

  /** AI 질문하기(Ltpa120) 레이어 팝업 열림 상태 */
  const [isLtpa120Open, setIsLtpa120Open] = useState(false);

  return (
    <>
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
              <Button
                size={'sm'}
                className="-translate-y-[0.2rem]"
                onClick={() => {
                  setOpen(false); // 팝오버 닫기
                  setIsLtpa120Open(true); // AI 질문하기 팝업 열기
                }}
              >
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
      <Ltpa120 open={isLtpa120Open} setOpen={setIsLtpa120Open} isButton={false} className="w-[32rem]" />
    </>
  );
};

export const CustomGridLoadingOverlay = (props: CustomLoadingOverlayProps & { loadingMessage?: string }) => {
  return (
    <div className="ag-overlay-loading-wrapper flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-lg ">
        {/* 커스텀 로딩 애니메이션 */}
        <div className="animate-spin rounded-full h-4 w-4 border-b-1 border-[var(--color-primary-50)]"></div>
        <span className="text-sm text-gray-700">{props.loadingMessage || '데이터를 가져오는 중입니다...'}</span>
      </div>
    </div>
  );
};

/**
 * [Ag-Grid Helper] 셀 내부 버튼 클릭 시 그리드가 인풋 편집 모드로 진입하는 것을 방지하는 editable 콜백 생성기
 */
export function createEditableCallbackForButton<T = unknown>(
  isEditable: boolean | ((params: EditableCallbackParams<T>) => boolean) = true
): (params: EditableCallbackParams<T>) => boolean {
  return (params: EditableCallbackParams<T>) => {
    const event = (params as unknown as { event?: MouseEvent }).event;
    const target = (event?.target ?? document.activeElement) as HTMLElement;
    if (target && (target.closest('button') || target.tagName === 'BUTTON' || target.closest('[data-slot="button"]'))) {
      return false; // 버튼 클릭 시 인풋 편집 활성화 방지
    }
    return typeof isEditable === 'function' ? isEditable(params) : isEditable;
  };
}

/**
 * [Ag-Grid Helper] 셀 내부 버튼 클릭 시 그리드가 인풋 편집 모드로 진입하는 것을 방지하는 판별 함수
 */
export function suppressClickEditForButton(params: { event?: MouseEvent | KeyboardEvent }) {
  const event = (params as unknown as { event?: MouseEvent }).event;
  const target = (event?.target ?? document.activeElement) as HTMLElement;
  return !!(
    target &&
    (target.closest('button') || target.tagName === 'BUTTON' || target.closest('[data-slot="button"]'))
  );
}

/**
 * [Ag-Grid Helper] Input + 검색 버튼 공통 Cell Renderer (비편집 셀 상태)
 */
export function InputWithSearchCellRenderer<T = unknown>(params: ICellRendererParams<T>) {
  const onButtonClick = params.colDef?.cellRendererParams?.onButtonClick;
  const disabled = Boolean(params.colDef?.cellRendererParams?.disabled || params.colDef?.cellRendererParams?.readOnly);

  const handleAction = (e: React.SyntheticEvent) => {
    if (disabled) return;
    e.stopPropagation();
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }
    if (typeof onButtonClick === 'function') {
      onButtonClick(params);
    }
  };

  return (
    <Grow className="w-full h-full gap-1" placement="bwc">
      <span className="truncate">{params.value || ''}</span>
      <Button
        aria-label="검색"
        variant="outlined"
        only="icon"
        size="md"
        color="gray-light"
        disabled={disabled}
        onMouseDown={(e) => {
          if (!disabled) handleAction(e);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          if (!disabled) handleAction(e);
        }}
      >
        <SearchIcon color={disabled ? 'var(--color-gray-40)' : 'var(--color-primary-50)'} />
      </Button>
    </Grow>
  );
}

/**
 * [Ag-Grid Helper] Input + 검색 버튼 공통 Cell Editor (셀 편집 상태)
 */
export function InputWithSearchCellEditor<T = unknown>(props: CustomCellEditorProps<T>) {
  const [value, setValue] = React.useState(props.value ?? '');
  const onButtonClick = props.colDef?.cellEditorParams?.onButtonClick;
  const inputProps = props.colDef?.cellEditorParams?.inputProps;
  const disabled = Boolean(
    props.colDef?.cellEditorParams?.disabled ||
    props.colDef?.cellEditorParams?.readOnly ||
    inputProps?.disabled ||
    inputProps?.readOnly
  );

  return (
    <Grow className="w-full h-full gap-1" placement="bwc">
      <Input
        {...inputProps}
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          setValue(val);
          props.onValueChange(val);
        }}
        autoFocus
      />
      <Button
        aria-label="검색"
        variant="outlined"
        only="icon"
        size="md"
        color="gray-light"
        disabled={disabled}
        onClick={() => {
          if (!disabled && typeof onButtonClick === 'function') {
            onButtonClick(value, props);
          }
        }}
      >
        <SearchIcon color={disabled ? 'var(--color-gray-40)' : 'var(--color-primary-50)'} />
      </Button>
    </Grow>
  );
}

/**
 * [Ag-Grid Helper] 방안 4: React Portal 기반 에러 툴팁 Cell Editor (상공 팝업/확대축소 시 짤림 100% 방지)
 * - AG Grid의 overflow: hidden 및 뷰포트 영역 제약을 완벽히 극복하기 위해
 *   Radix Portal(document.body)을 사용해 에러 메시지 툴팁을 띄우는 공용 에디터입니다.
 */
export function PortalErrorTooltipCellEditor<T = unknown>(props: CustomCellEditorProps<T>) {
  const [value, setValue] = React.useState(props.value ?? '');
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const getErrorMessage = props.colDef?.cellEditorParams?.getErrorMessage;
  const errorMessage = React.useMemo(() => {
    if (typeof getErrorMessage === 'function') {
      return getErrorMessage(value, props);
    }
    if (value === '' || value === null || value === undefined) {
      return '필수 입력 항목입니다.';
    }
    return null;
  }, [value, getErrorMessage, props]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const isError = Boolean(errorMessage);
  const maxLength = props.colDef?.cellEditorParams?.maxLength;

  return (
    <div className="w-full h-full flex items-center relative">
      <Tooltip open={isError}>
        <TooltipTrigger asChild>
          <Input
            ref={inputRef}
            type="text"
            error={isError}
            maxLength={maxLength}
            value={value}
            onChange={(e) => {
              const val = e.target.value;
              setValue(val);
              props.onValueChange(val);
            }}
          />
        </TooltipTrigger>
        {errorMessage && (
          <TooltipContent side="top" align="start" variant="danger" sideOffset={4}>
            {errorMessage}
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  );
}

/**
 * [Ag-Grid Component] 비동기 데이터 로딩 툴팁 버튼 컴포넌트 (공용)
 *
 * - 마우스 호버 시 지정된 delay(기본 1000ms) 또는 fetchContent (Promise 콜백)을 실행해
 *   로딩 툴팁을 노출한 뒤 데이터가 준비되는 즉시 내용을 표출합니다.
 */
export interface AsyncTooltipButtonProps {
  /** 버튼 텍스트 또는 렌더링 노드 */
  label: React.ReactNode;
  /** 비동기 데이터 로드 콜백 (지연 후 표시할 콘텐츠 반환 함수) */
  fetchContent?: () => Promise<React.ReactNode> | React.ReactNode;
  /** 호버 후 데이터 요청/딜레이 시간 (ms, 기본값: 1000) */
  delay?: number;
  /** 툴팁 노출 방향 ('top' | 'right' | 'bottom' | 'left', 기본값: 'top') */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** 로딩 중 표기할 텍스트/노드 (기본값: '불러오는 중...') */
  loadingText?: React.ReactNode;
  /** 비동기 대신 고정 표시할 콘텐츠 */
  content?: React.ReactNode;
  /** 버튼 커스텀 스타일 및 속성 */
  buttonProps?: Omit<React.ComponentProps<typeof Button>, 'children'>;
}

export function AsyncTooltipButton({
  label,
  fetchContent,
  delay = 1000,
  side = 'top',
  loadingText = '불러오는 중...',
  content,
  buttonProps,
}: AsyncTooltipButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [tooltipContent, setTooltipContent] = React.useState<React.ReactNode | null>(content ?? null);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);

    if (content) {
      setTooltipContent(content);
      setLoading(false);
      return;
    }

    setLoading(true);
    setTooltipContent(null);

    timerRef.current = setTimeout(async () => {
      if (fetchContent) {
        try {
          const res = await fetchContent();
          setTooltipContent(res);
        } catch {
          setTooltipContent('데이터를 불러오지 못했습니다.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(false);
    setLoading(false);
    setTooltipContent(null);
  };

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <Button
          color="link"
          only="default"
          size="lg"
          variant="text"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...buttonProps}
        >
          {label}
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side} sideOffset={1}>
        {loading ? (
          <Typo tag="span" variant="body-sm" className="break-all whitespace-pre-wrap text-gray-400">
            {loadingText}
          </Typo>
        ) : (
          <Typo tag="span" variant="body-sm" className="break-all whitespace-pre-wrap">
            {tooltipContent}
          </Typo>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

export type TwoRadioCellRendererOptions = {
  trueLabel?: string;
  falseLabel?: string;
  trueValue?: string;
  falseValue?: string;
};
