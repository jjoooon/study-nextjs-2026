/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import { Typo, Grow, Grid, Gcol } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DatePickerInput } from '@common/DatePicker';
import { InfoBoxWarningIcon, MinusIcon, PlusIcon, TableSelectArrowIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import type {
  ICellEditorParams,
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
  GridReadyEvent,
  CellValueChangedEvent,
} from 'ag-grid-enterprise';
import type { AgGridReact } from 'ag-grid-react';
import type { RefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState, useImperativeHandle, forwardRef } from 'react';
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
 * 원본값과 달라진 셀에 클래스 룰을 적용하는 생성기 (공용)
 */
export function createModifiedCellClassRules<RowType extends Record<string, unknown>, ValueKey extends keyof RowType>(options: {
  rows: RowType[];
  idKey: IdKeyOf<RowType>;
  valueKey: ValueKey;
  className?: string;
  serialize?: (value: unknown) => string;
}): {
  [className: string]: (params: CellClassParams<RowType>) => boolean;
} {
  const {
    rows,
    idKey,
    valueKey,
    className = 'modify-cell',
    serialize = (value) => String(value ?? ''),
  } = options;

  const initialValueMap = new Map(rows.map((row) => [row[idKey], serialize(row[valueKey])])) ;

  return {
    [className]: (params) => {
      if (!params.data) {
        return false;
      }

      const rowId = params.data[idKey];

      return serialize(params.value) !== initialValueMap.get(rowId);
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
 * 행 추가 핸들러 생성기 (공용)
 * @param setRowData 행 데이터 setState
 * @param options.idKey 고유 id 필드명
 * @param options.getNextId 다음 id 생성 함수
 * @param options.createRow 신규 행 생성 함수
 * @param options.insertAt 삽입 위치 (기본값: 'end')
 * @param options.getInsertIndex 커스텀 삽입 인덱스 계산 함수
 */
export function createAddRowHandler<RowType extends Record<string, unknown>, IDType extends string | number>(
  setRowData: React.Dispatch<React.SetStateAction<RowType[]>>,
  options: {
    idKey: keyof RowType;
    getNextId: (rows: RowType[]) => IDType;
    createRow: (nextId: IDType, rows: RowType[]) => RowType;
    insertAt?: 'start' | 'end';
    getInsertIndex?: (rows: RowType[]) => number;
  }
) {
  const { idKey, getNextId, createRow, insertAt = 'end', getInsertIndex } = options;

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
              <Input size={'md'} value={value} after={'만'} readOnly className="w-[11.2rem]" />
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
  items,
}: {
  text: string;
  items?: { title: string; description: string; info: string[] };
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
            <Typo variant={'heading-sm'}>{items?.title}</Typo>
            <Button size={'sm'} className="-translate-y-[0.2rem]">
              AI 질문하기
            </Button>
          </Grow>
          <Gcol className="w-full" placement="ss">
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

/**
 * 휴대폰 번호 valueFormatter (010-1234-5678, 010-123-4567 등 자동 포맷)
 */
export function phoneNumberValueFormatter<T = unknown>(params: ValueFormatterParams<T>) {
  if (!params.value) return '';
  const v = String(params.value).replace(/[^0-9]/g, '');
  if (v.length === 11) {
    return `${v.slice(0, 3)}-${v.slice(3, 7)}-${v.slice(7)}`;
  } else if (v.length === 10) {
    return `${v.slice(0, 3)}-${v.slice(3, 6)}-${v.slice(6)}`;
  }
  return v;
}

/**
 * 휴대폰 번호 valueParser (숫자만 추출)
 */
export function phoneNumberValueParser(params: { newValue: string }) {
  return params.newValue.replace(/[^0-9]/g, '');
}
