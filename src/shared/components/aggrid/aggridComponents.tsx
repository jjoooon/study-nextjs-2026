
// 외부 라이브러리
import * as React from 'react';
import type { ValueFormatterParams, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community';

// 내부 공통 컴포넌트

import { AmountUnitInput } from '@features/AmountUnitInput';
import { SelectArrowIcon } from '@icons';

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
  field: keyof RowType,
  setRowData: React.Dispatch<React.SetStateAction<RowType[]>>,
  setErrorRows: React.Dispatch<React.SetStateAction<IDType[]>>,
  idKey: keyof RowType = 'id' as keyof RowType
) {
  return (params: { colDef: { field?: string }; data: RowType; newValue: unknown }) => {
    if (params.colDef.field === field) {
      setRowData((prev) =>
        prev.map((row) =>
          row[idKey] === params.data[idKey] ? { ...row, [field]: params.newValue } : row
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
    <div className="flex items-center justify-center gap-1 w-full h-full">
      <span className="block w-auto text-right">{params.value}</span>
      {params.data?.canEditExpiry ? (
        <SelectArrowIcon size={14} color={'var(--color-gray-50)'} />
      ) : (
        <SelectArrowIcon size={14} color={'var(--color-gray-20)'} />
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