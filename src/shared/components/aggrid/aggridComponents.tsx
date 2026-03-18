// 외부 라이브러리
import type { ValueFormatterParams, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community';

// 내부 공통 컴포넌트
import { AmountUnitInput } from '@features/AmountUnitInput';
import { SelectArrowIcon } from '@icons';


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
  return params.value ? params.value.toLocaleString() : '';
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
      <span className="block w-[6rem] text-right">{params.value}</span>
      {params.data?.canEditExpiry ? (
        <SelectArrowIcon size={14} color={'var(--color-gray-50)'} />
      ) : (
        <SelectArrowIcon size={14} color={'var(--color-gray-20)'} />
      )}
    </div>
  );
}
