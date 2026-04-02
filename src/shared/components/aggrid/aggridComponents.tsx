

// 외부 라이브러리
import * as React from 'react';
import type { ValueFormatterParams, ICellRendererParams, SelectionChangedEvent, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { Typo, Gcol, Grow } from '@atoms';
import { InfoBoxWarningIcon } from '@icons';

// 내부 공통 컴포넌트
import { useCallback, useEffect, useState } from 'react';
import type { RefObject } from 'react';
import type { GridReadyEvent } from 'ag-grid-community';
import type { AgGridReact } from 'ag-grid-react';

import { AmountUnitInput } from '@features/AmountUnitInput';
import { SelectDropIcon } from '@icons';

import { DatePickerInput } from '@common/DatePicker';
import type { ICellEditorParams } from 'ag-grid-community';

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
          row[idKey] === params.data[idKey]
            ? { ...row, [params.colDef.field as keyof RowType]: params.newValue }
            : row
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
  // 0도 정상 노출
  return Number(params.value).toLocaleString();
};


/**
 * 가입금액(만원) 셀 렌더러 (AmountUnitInput 사용, 행별 ref 지원)
 */
export function amountUnitInputCellRenderer<RowType>(
  params: ICellRendererParams<RowType> & { amountInputRefs: Array<HTMLInputElement | null> }
) {
  const rowIndex = params.node?.rowIndex ?? 0;
  if (!params.amountInputRefs) return null;
  return (
    <AmountUnitInput
      value={params.value}
      onChange={(newValue) => {
        if (params.setValue) params.setValue(newValue);
      }}
      inputRef={(el) => {
        params.amountInputRefs[rowIndex] = el;
      }}
      onEnter={() => {
        const nextRef = params.amountInputRefs[rowIndex + 1];
        if (nextRef) nextRef.focus();
      }}
    />
  );
}


/**
 * 만기/납기 셀 렌더러 (셀 편집 가능 여부에 따라 화살표 색상 변경)
 */
export function editableSelectCellRenderer<RowType extends { canEditExpiry?: boolean }>(params: ICellRendererParams<RowType>) {
  return (
    <div className="flex items-center justify-end gap-1 w-full h-full">
      <span className="block w-auto text-right">{params.value}</span>
      {params.data?.canEditExpiry ? (
        <SelectDropIcon size={14} color={'var(--color-gray-50)'} />
      ) : (
        <SelectDropIcon size={14} color={'var(--color-gray-20)'} />
      )}
    </div>
  );
}

export function DatePickerCellEditor<RowType = unknown>(props: ICellEditorParams<RowType>) {
  const [value, setValue] = React.useState<string>(props.value ?? '');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  const handleChange = (_: Date | undefined, formatted: string) => {
    setValue(formatted);
  };

  // ag-Grid는 커스텀 에디터에 forwardedRef를 넘김
  React.useImperativeHandle(
    (props as any).forwardedRef,
    () => ({
      getValue: () => value,
      isCancelAfterEnd: () => false,
    }),
    [value]
  );

  return (
    <DatePickerInput
      value={value}
      onChange={handleChange}
      size="md"
      width="full"
    />
  );
}

export const createFieldRenderer = <T extends Record<string, any>>(
  field1: keyof T | React.ReactNode | ((data?: T) => React.ReactNode) | React.ComponentType<any>,
  field2?: keyof T | React.ReactNode | ((data?: T) => React.ReactNode) | React.ComponentType<any>,
) => {
  return (params: ICellRendererParams<T>) => {
    const data = params.data as T | undefined;

    // field1, field2 공통 resolver
    const resolveNode = (
      field: keyof T | React.ReactNode | ((data?: T) => React.ReactNode) | React.ComponentType<any> | undefined
    ): React.ReactNode => {
      if (field === undefined || field === null) return '';

      if (typeof field === 'function') {
        try {
          const result = (field as any)(data);
          if (React.isValidElement(result) || typeof result === 'string' || typeof result === 'number') {
            return result;
          }
          return React.createElement(field as React.ComponentType<any>, { data });
        } catch {
          try {
            return React.createElement(field as React.ComponentType<any>, { data });
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

    return (
      <Gcol className="w-full h-[5.6rem] justify-start divide-y divide-gray-200" gap={0} >
        <div className='h-[2.8rem] w-full leading-[2.8rem]'>
          {renderCell(aNode)}
        </div>
        <div className="h-[2.8rem] w-full leading-[2.8rem]">
          {renderCell(bNode)}
        </div>
      </Gcol>
    );
  };
};

/**
* ag-Grid + TablePagination 연동 공통 훅
* @param gridRef ag-Grid API ref (React.useRef)
* @param pageSize 페이지당 행 수
*/
export function useAgGridPagination(gridRef: React.RefObject<any>, pageSize: number) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  // ag-Grid onGridReady 핸들러
  const handleGridReady = React.useCallback((params: any) => {
    gridRef.current = params.api;
    setTotalPages(params.api.paginationGetTotalPages());
    setCurrentPage(params.api.paginationGetCurrentPage() + 1);
    params.api.addEventListener('paginationChanged', () => {
      setTotalPages(params.api.paginationGetTotalPages());
      setCurrentPage(params.api.paginationGetCurrentPage() + 1);
    });
  }, [gridRef]);

  // TablePagination에서 페이지 변경 시 ag-Grid 페이지 이동
  const handlePageChange = React.useCallback((page: number) => {
    if (gridRef.current) {
      gridRef.current.paginationGoToPage(page - 1);
    }
  }, [gridRef]);

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

export function AgGridEmptyComponent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className="bg-[var(--color-gray-0)] w-full h-full flex items-center justify-center gap-1 text-[var(--color-gray-70)]" {...props}>
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

  const onVisibleFieldsChange = useCallback((fields: string[]) => {
    const next = fields.filter((field): field is FieldKey<TData> =>
      toggleFields.includes(field as FieldKey<TData>)
    );
    setVisibleFields(next);
  }, [toggleFields]);

  return {
    visibleFields,
    setVisibleFields,
    onVisibleFieldsChange,
    onGridReady,
    applyColumnVisibility,
  };
}