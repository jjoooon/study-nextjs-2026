// 외부 라이브러리

// 내부 공통 컴포넌트

import { Typo, Grow, Grid, Gcol } from '@atoms';
import { AmountUnitInput } from '@common/AmountUnitInput';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DatePickerInput } from '@common/DatePicker';
import { InfoBoxWarningIcon } from '@icons';
import { PlusIcon, TableSelectArrowIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import type { GridReadyEvent } from 'ag-grid-community';
import type {
  CellClickedEvent,
  ValueFormatterParams,
  ICellRendererParams,
  SelectionChangedEvent,
  IDatasource,
  IGetRowsParams,
  EditableCallbackParams,
  CellClassParams,
  IHeaderParams,
  GridApi,
  CellValueChangedEvent,
} from 'ag-grid-community';
import type { ICellEditorParams } from 'ag-grid-community';
import type { AgGridReact } from 'ag-grid-react';
import type { RefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as React from 'react';
import { SCALE_CHANGE_EVENT } from '@/shared/utils/scale';

export type ToggleTopRow<T> = T & {
  originalIndex: number;
  toggleOrder: number | null;
};

type PrimitiveId = string | number;

type IdKeyOf<T> = {
  [K in keyof T]-?: T[K] extends PrimitiveId ? K : never;
}[keyof T];

type BooleanKeyOf<T> = {
  [K in keyof T]-?: T[K] extends boolean ? K : never;
}[keyof T];

interface UseToggleTopRowsParams<T extends Record<string, unknown>> {
  rows: T[];
  idKey: IdKeyOf<T>;
  toggleKey: BooleanKeyOf<T>;
}

/**
 * 토글된 행을 상단으로 올리되, 원본 순서를 안정적으로 유지하는 정렬 유틸.
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
  const sequenceRef = useRef(1);

  const [rowData, setRowData] = useState<ToggleTopRow<T>[]>(() => {
    const initialized = rows.map((row, index) => ({
      ...row,
      originalIndex: index,
      toggleOrder: row[toggleKey] ? 0 : null,
    }));

    return sortToggleRows(initialized, toggleKey);
  });

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
    rowData,
    setRowData,
    toggleById,
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
    if (!isVisible(params))
      return (
        <Grow className="w-full h-full flex items-center justify-center">
          <Button
            aria-label={ariaLabel}
            variant={'outlined'}
            only={'icon'}
            className="uiux-duplicate-btn"
            size={'sm'}
            color={'gray'}
            disabled
          >
            <PlusIcon color={'var(--color-gray-30)'} />
          </Button>
        </Grow>
      );

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
          color={'gray'}
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onDuplicate(rowId);
          }}
        >
          <PlusIcon color={'var(--color-gray-70)'} />
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
 * 가입금액(만원) 셀 렌더러 (AmountUnitInput 사용, 행별 ref 지원)
 */

// React 컴포넌트로 분리 (Hook 규칙 위반 방지)
function AmountUnitInputCellRenderer<RowType>(
  props: ICellRendererParams<RowType> & { amountInputRefs: Array<HTMLInputElement | null> }
) {
  const rowIndex = props.node?.rowIndex ?? 0;
  if (!props.amountInputRefs) return null;

  const options: string[] = Array.isArray(props.colDef?.cellEditorParams?.values)
    ? (props.colDef.cellEditorParams.values as string[])
    : ['1천만원', '2천만원'];

  const [showSelect, setShowSelect] = React.useState(false);
  const [localValue, setLocalValue] = React.useState(props.value);

  if (typeof props.value === 'number') {
    return (
      <div>
        <AmountUnitInput
          value={props.value}
          onChange={(newValue) => {
            if (props.setValue) props.setValue(newValue);
          }}
          inputRef={(el) => {
            props.amountInputRefs[rowIndex] = el;
          }}
          onEnter={() => {
            const nextRef = props.amountInputRefs[rowIndex + 1];
            if (nextRef) nextRef.focus();
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {!showSelect ? (
        <button
          type="button"
          className={`flex items-center px-[0.6rem] gap-1 w-full h-full editor-select`}
          onClick={() => setShowSelect(true)}
        >
          <span className={`block flex-1`}>{localValue}</span>
          <TableSelectArrowIcon color={'var(--color-gray-60)'} className="shrink-0" />
        </button>
      ) : (
        <Grow className="w-full mt-[0.2rem] px-[0.6rem] items-center ">
          <NativeSelect
            size="md"
            value={localValue}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setLocalValue(e.target.value);
              setShowSelect(false);
              if (props.setValue) props.setValue(e.target.value);
            }}
            onBlur={() => setShowSelect(false)}
            autoFocus
          >
            {options.map((option) => (
              <NativeSelectOption key={option} value={option}>
                {option}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Grow>
      )}
    </div>
  );
}

// ag-Grid cellRenderer 함수로 등록할 때는 이 래퍼를 사용
export function amountUnitInputCellRenderer<RowType>(
  params: ICellRendererParams<RowType> & { amountInputRefs: Array<HTMLInputElement | null> }
) {
  return <AmountUnitInputCellRenderer {...params} />;
}

/**
 * 만기/납기 셀 렌더러 (셀 편집 가능 여부에 따라 화살표 색상 변경)
 */
/**
 * editableSelectCellRenderer
 * @param params ICellRendererParams
 * @param align 'left' | 'center' | 'right' (default: 'right')
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

export function DatePickerCellEditor<RowType = unknown>(props: ICellEditorParams<RowType>) {
  const [value, setValue] = React.useState<string>(props.value ?? '');
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
    setValue(props.value ?? '');
  }, [props.value]);

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  const handleChange = (_: Date | undefined, formatted: string) => {
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

  return <DatePickerInput value={value} onChange={handleChange} size="md" width="full" />;
}

type FieldRendererComponentProps<T> = { data?: T };
type FieldRendererResolver<T> = (data?: T) => React.ReactNode;
type FieldRendererComponent<T> = React.ComponentType<FieldRendererComponentProps<T>>;
type FieldRendererSource<T> = keyof T | React.ReactNode | FieldRendererResolver<T> | FieldRendererComponent<T>;

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

    const aNode = resolveNode(field1);
    const bNode = resolveNode(field2);
    const renderCell = (value: React.ReactNode) => {
      if (React.isValidElement(value)) return value;
      return <Typo>{String(value ?? '')}</Typo>;
    };

    return div === 'col' ? (
      <Grid className="w-full h-[5.6rem] grid-rowss-[1fr_1fr] divide-y divide-gray-200" gap={0}>
        <div className="h-[2.8rem] w-full leading-[2.8rem] truncate px-1">{renderCell(aNode)}</div>
        <div className="h-[2.8rem] w-full leading-[2.8rem] truncate px-1">{renderCell(bNode)}</div>
      </Grid>
    ) : (
      <Grid className="w-full h-full grid-cols-[1fr_1fr] justify-start divide-x divide-gray-200" gap={0}>
        <div className="truncate">{renderCell(aNode)}</div>
        <div className="truncate">{renderCell(bNode)}</div>
      </Grid>
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
  allRows: TData[];
  pageSize: number;
  initialLoadedCount?: number;
}

/**
 * infinite rowModel + 더보기(append) 공통 훅
 * - 다음: pageSize 만큼 로드 범위 증가
 * - 전체조회: 전체 건수로 로드 범위 확장
 */
export function useAgGridInfiniteAppend<TData>({
  allRows,
  pageSize,
  initialLoadedCount,
}: UseAgGridInfiniteAppendParams<TData>) {
  const totalCount = allRows.length;
  const safeInitial = Math.max(0, Math.min(initialLoadedCount ?? pageSize, totalCount));

  const [loadedCount, setLoadedCount] = React.useState<number>(safeInitial);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.max(1, Math.ceil(Math.max(loadedCount, 1) / pageSize));
  const isLastPage = loadedCount >= totalCount;

  const handleLoadNext = React.useCallback(() => {
    setLoadedCount((prev) => Math.min(totalCount, prev + pageSize));
  }, [pageSize, totalCount]);

  const handleLoadAll = React.useCallback(() => {
    setLoadedCount(totalCount);
  }, [totalCount]);

  const dataSource = React.useMemo<IDatasource>(() => {
    return {
      getRows: (params: IGetRowsParams) => {
        const safeEnd = Math.min(params.endRow, loadedCount);
        const rowsThisBlock = allRows.slice(params.startRow, safeEnd);
        const lastRow = loadedCount >= totalCount ? totalCount : loadedCount;

        params.successCallback(rowsThisBlock, lastRow);
      },
    };
  }, [allRows, loadedCount, totalCount]);

  return {
    loadedCount,
    totalCount,
    totalPages,
    currentPage,
    isLastPage,
    setLoadedCount,
    handleLoadNext,
    handleLoadAll,
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
        variant="noneText"
        checked={checked}
        size={'md'}
        onClick={(e) => e.stopPropagation()}
        onCheckedChange={(value) => {
          props.toggleAll(value === true);
          props.api.refreshHeader();
        }}
      />
      <span className="ag-header-cell-text">{display}</span>
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
export function AgGridEmptyComponent({ className: _className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className="bg-[var(--color-gray-0)] w-full h-full flex items-center justify-center gap-1 text-[var(--color-gray-70)]"
      {...props}
    >
      <InfoBoxWarningIcon color="var(--color-gray-50)" />
      조회 결과가 없습니다.
    </div>
  );
}

type FieldKey<TData> = Extract<keyof TData, string>;

interface UseAgGridColumnVisibilityParams<TData extends object> {
  gridRef: RefObject<AgGridReact<TData> | null>;
  toggleFields: readonly FieldKey<TData>[];
  initialVisibleFields?: readonly FieldKey<TData>[];
}

export function useAgGridColumnVisibility<TData extends object>({
  gridRef,
  toggleFields,
  initialVisibleFields,
}: UseAgGridColumnVisibilityParams<TData>) {
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
      <Typo className="w-full whitespace-pre-wrap" color="gray" tag="span" variant="body-md" weight="bold">
        {children}
      </Typo>
    </Grow>
  );
}

export function useDynamicColumnWidths() {
  const colWidth0 = useDynamicPx(0);
  const colWidth10 = useDynamicPx(10);
  const colWidth20 = useDynamicPx(20);
  const colWidth30 = useDynamicPx(30);
  const colWidth40 = useDynamicPx(40);
  const colWidth50 = useDynamicPx(50);
  const colWidth60 = useDynamicPx(60);
  const colWidth70 = useDynamicPx(70);
  const colWidth80 = useDynamicPx(80);
  const colWidth90 = useDynamicPx(90);
  const colWidth100 = useDynamicPx(100);
  const colWidth110 = useDynamicPx(110);
  const colWidth120 = useDynamicPx(120);
  const colWidth130 = useDynamicPx(130);
  const colWidth140 = useDynamicPx(140);
  const colWidth150 = useDynamicPx(150);
  const colWidth160 = useDynamicPx(160);
  const colWidth170 = useDynamicPx(170);
  const colWidth180 = useDynamicPx(180);
  const colWidth190 = useDynamicPx(190);
  const colWidth200 = useDynamicPx(200);
  const colWidth210 = useDynamicPx(210);
  const colWidth220 = useDynamicPx(220);
  const colWidth230 = useDynamicPx(230);
  const colWidth240 = useDynamicPx(240);
  const colWidth250 = useDynamicPx(250);
  const colWidth260 = useDynamicPx(260);

  const attributeColumnWidth = useMemo(
    () => [
      colWidth0,
      colWidth10,
      colWidth20,
      colWidth30,
      colWidth40,
      colWidth50,
      colWidth60,
      colWidth70,
      colWidth80,
      colWidth90,
      colWidth100,
      colWidth110,
      colWidth120,
      colWidth130,
      colWidth140,
      colWidth150,
      colWidth160,
      colWidth170,
      colWidth180,
      colWidth190,
      colWidth200,
      colWidth210,
      colWidth220,
      colWidth230,
      colWidth240,
      colWidth250,
      colWidth260,
    ],
    [
      colWidth0,
      colWidth10,
      colWidth20,
      colWidth30,
      colWidth40,
      colWidth50,
      colWidth60,
      colWidth70,
      colWidth80,
      colWidth90,
      colWidth100,
      colWidth110,
      colWidth120,
      colWidth130,
      colWidth140,
      colWidth150,
      colWidth160,
      colWidth170,
      colWidth180,
      colWidth190,
      colWidth200,
      colWidth210,
      colWidth220,
      colWidth230,
      colWidth240,
      colWidth250,
      colWidth260,
    ]
  );

  return {
    colWidth0,
    colWidth10,
    colWidth20,
    colWidth30,
    colWidth40,
    colWidth50,
    colWidth60,
    colWidth70,
    colWidth80,
    colWidth90,
    colWidth100,
    colWidth110,
    colWidth120,
    colWidth130,
    colWidth140,
    colWidth150,
    colWidth160,
    colWidth170,
    colWidth180,
    colWidth190,
    colWidth200,
    colWidth210,
    colWidth220,
    colWidth230,
    colWidth240,
    colWidth250,
    colWidth260,
    attributeColumnWidth,
  };
}

export const CoveragePopover = ({
  text,
  data,
}: {
  text: string;
  data?: { title: string; description: string; info: string[] };
}) => {
  const [open, setOpen] = useState(false);
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
      <PopoverContent side="bottom" align="start" className="max-w-[42.5rem]" closeButton={true}>
        <Gcol>
          <Grow className="w-full" placement="bws">
            <Typo variant={'heading-sm'}>{data?.title}</Typo>
            <Button size={'sm'} className="-translate-y-[0.2rem]">
              AI 질문하기
            </Button>
          </Grow>
          <Gcol className="w-full" placement="ss">
            <Typo variant={'body-sm'} color={'gray'}>
              {data?.description}
            </Typo>
            <BulletList type={'star'} size={'xs'}>
              {data?.info.map((item, index) => (
                <BulletListItem key={index}>{item}</BulletListItem>
              ))}
            </BulletList>
          </Gcol>
        </Gcol>
      </PopoverContent>
    </Popover>
  );
};
