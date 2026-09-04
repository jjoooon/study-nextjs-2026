/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import type {
  CellClassParams,
  CellEditorSelectorResult,
  ColDef,
  EditableCallbackParams,
  IHeaderParams,
  PostSortRowsParams,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { DialogBottomInfo } from '@/shared/components/common/DialogBottomInfo';
import { createExpiryCellRenderer } from '@/shared/components/grid/CellRenderers';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent, DatePickerCellEditor, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletItem, BulletList, BulletListItem } from '@common/BulletList';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { Input } from '@uiux/Input';

import '@/shared/lib/agGridPub';

type LTPZ051Tab = { name: string; value: string; label: string };
const DATA_TABS: LTPZ051Tab[] = [
  { name: '승환계약정보 (0건)', value: 'value1', label: '승환계약정보 (0건)' },
  { name: '정상계약정보 (0건)', value: 'value2', label: '정상계약정보 (0건)' },
  { name: '추가계약정보 (0건)', value: 'value3', label: '추가계약정보 (0건)' },
];

export type SwitchContractItem = {
  id: string;
  name: string;
  isOur: boolean;
  company: string;
  productName: string;
  status: string;
  insured: string;
  period: string;
  premium: string;
  payPeriod: string;
  coverage: string;
  amount: string;
  refund: string;
  refundYm: string;
  rate: string;
  rateYm: string;
  purpose: string;
  exemption: string;
  isSwitch: boolean;
};

export type ExternalContractItem = {
  id: string;
  company: string;
  productName: string;
  status: string;
  insured: string;
  period: string;
  premium: string;
  payPeriod: string;
  coverage: string;
  amount: string;
  refund: string;
  refundYm: string;
  rate: string;
  rateYm: string;
  purpose: string;
  exemption: string;
  isSwitch: boolean;
};

const INITIAL_SWITCH_CONTRACTS: SwitchContractItem[] = [
  {
    id: 'our_1',
    name: '당사기존',
    isOur: true,
    company: '한화손보',
    productName: 'ㅇㅇ 간편보험 2601',
    status: '해지(2024-03-01)',
    insured: '홍길순',
    period: '2024-03-01 ~ 2026-03-31',
    premium: '165,000원',
    payPeriod: '월납/10년납',
    coverage: '질병후유장해 등',
    amount: '3,000만원',
    refund: '300,000,000,000원',
    refundYm: '2024-03',
    rate: '15.99%',
    rateYm: '2024-06',
    purpose: '장기상해',
    exemption: '계약자,피보험자,수익자의 고의사고 등',
    isSwitch: true,
  },
  {
    id: 'ext_1',
    name: '타사기존',
    isOur: false,
    company: '메리츠화재',
    productName: '(무)메리츠간편한355건강보험',
    status: '실효(2024-03-01)',
    insured: '홍길순',
    period: '2024-03-01 ~ 2026-03-31',
    premium: '165,000원',
    payPeriod: '월납/10년납',
    coverage: '유병자상해사망 등',
    amount: '3,000만원',
    refund: '4,000,000원',
    refundYm: '2024-03',
    rate: '13%',
    rateYm: '2024-06',
    purpose: '',
    exemption: '',
    isSwitch: true,
  },
  {
    id: 'ext_2',
    name: '타사기존',
    isOur: false,
    company: '삼성화재',
    productName: '삼성간편건강보험',
    status: '철회(2024-03-01)',
    insured: '홍길순',
    period: '2025-12-15 ~ 2026-03-15',
    premium: '165,000원',
    payPeriod: '월납/10년납',
    coverage: '유병자상해사망 등',
    amount: '3,000만원',
    refund: '',
    refundYm: '2024-03',
    rate: '',
    rateYm: '2024-06',
    purpose: '',
    exemption: '',
    isSwitch: false,
  },
];

const INITIAL_NORMAL_CONTRACTS: SwitchContractItem[] = [
  {
    id: 'our_1',
    name: '당사기존',
    isOur: true,
    company: '한화손보',
    productName: 'ㅇㅇ 간편보험 2601',
    status: '정상',
    insured: '홍길순',
    period: '2024-03-01 ~ 2026-03-31',
    premium: '165,000원',
    payPeriod: '월납/10년납',
    coverage: '질병후유장해 등',
    amount: '3,000만원',
    refund: '3,000,000원',
    refundYm: '2024-03',
    rate: '5.99%',
    rateYm: '2024-03',
    purpose: '장기상해',
    exemption: '계약자,피보험자,수익자의 고의사고 등',
    isSwitch: true,
  },
  {
    id: 'ext_1',
    name: '타사기존',
    isOur: false,
    company: '메리츠화재',
    productName: '(무)메리츠간편한355건강보험',
    status: '정상',
    insured: '홍길순',
    period: '2024-03-01 ~ 2026-03-31',
    premium: '165,000원',
    payPeriod: '월납/10년납',
    coverage: '유병자상해사망 등',
    amount: '3,000만원',
    refund: '',
    refundYm: '2024-03',
    rate: '',
    rateYm: '2024-03',
    purpose: '',
    exemption: '',
    isSwitch: true,
  },
  {
    id: 'ext_2',
    name: '타사기존',
    isOur: false,
    company: '삼성화재',
    productName: '삼성간편건강보험',
    status: '정상',
    insured: '홍길순',
    period: '2025-12-15 ~ 2026-03-15',
    premium: '165,000원',
    payPeriod: '월납/10년납',
    coverage: '유병자상해사망 등',
    amount: '3,000만원',
    refund: '',
    refundYm: '2024-03',
    rate: '',
    rateYm: '2024-03',
    purpose: '',
    exemption: '',
    isSwitch: false,
  },
];

const INITIAL_EXTERNAL_CONTRACTS: ExternalContractItem[] = [
  {
    id: 'ext_1',
    company: '한화손보',
    productName: 'ㅇㅇ 간편보험 2601',
    status: '계약상태',
    insured: '홍길순',
    period: '2024-03-01 ~ 2026-03-31',
    premium: '165,000원',
    payPeriod: '월납/10년납',
    coverage: '유병자상해사망 등',
    amount: '3,000만원',
    refund: '3,000원',
    refundYm: '2026-06',
    rate: '5.99%',
    rateYm: '2026-06',
    purpose: '장기상해',
    exemption: '계약자,피보험자,수익자의 고의사고 등',
    isSwitch: true,
  },
  {
    id: 'ext_2',
    company: '메리츠화재',
    productName: '(무)메리츠간편한355건강보험',
    status: '계약상태',
    insured: '홍길순',
    period: '2025-12-15 ~ 2026-03-15',
    premium: '165,000원',
    payPeriod: '월납/10년납',
    coverage: '유병자상해사망 등',
    amount: '3,000만원',
    refund: '3,000원',
    refundYm: '2026-06',
    rate: '5.99%',
    rateYm: '2026-06',
    purpose: '장기상해',
    exemption: '계약자,피보험자,수익자의 고의사고 등',
    isSwitch: false,
  },
  {
    id: 'ext_3',
    company: '삼성화재',
    productName: '삼성간편건강보험',
    status: '계약상태',
    insured: '홍길동',
    period: '2025-12-15 ~ 2026-03-15',
    premium: '165,000원',
    payPeriod: '월납/10년납',
    coverage: '유병자상해사망 등',
    amount: '3,000만원',
    refund: '3,000원',
    refundYm: '2026-06',
    rate: '5.99%',
    rateYm: '2026-06',
    purpose: '장기상해',
    exemption: '계약자,피보험자,수익자의 고의사고 등',
    isSwitch: false,
  },
];

type AgGridRow = any;

// ag-Grid 셀에 표시될 수 있는 데이터 타입
type GridCellValue = string | number | boolean | null | undefined;

// 체크박스 렌더러에 전달되는 파라미터
type CheckboxRendererParams<TData> = {
  data: TData | undefined;
  value: GridCellValue;
  colDef: ColDef<TData>;
  node?: any;
  api?: any;
  [key: string]: any;
};

// 셀 에디터 props
type WonUnitCellEditorProps = {
  value?: GridCellValue;
  onValueChange?: (value: string) => void;
  stopEditing?: () => void;
  [key: string]: any;
};

// 행 타입별 편집/표시 규칙
const TYPE3_NUMBER_FORMAT_TYPES = new Set(['보험료', '보험가입금액', '해약환급금/기준연월']);
const TYPE3_EDITABLE_TEXT_TYPES = new Set([
  '상품명',
  '계약상태',
  '피보험자',
  '납입주기/기간',
  '주요보장내용',
  '예정이율/기준연월',
  '보험목적',
  '면책사유 및 면책사항',
]);
const EDITABLE_TARGET_TYPES = new Set(['해약환급금/기준연월', '예정이율/기준연월', '보험목적', '면책사유 및 면책사항']);
const LEFT_ALIGN_TARGET_TYPES = new Set(['보험료', '보험가입금액', '해약환급금/기준연월', '예정이율/기준연월']);

const formatNumberWithComma = (str: string) => {
  const rawNum = str.replace(/[^0-9.-]/g, '');
  if (!rawNum || isNaN(Number(rawNum))) return str;
  const parts = rawNum.split('.');
  parts[0] = Number(parts[0]).toLocaleString();
  return parts.join('.');
};

// 공통: 행의 구분(type) 값 기반 판별 함수
const getTypeLabel = (row: { type: string | number } | undefined) => (row ? String(row.type) : '');
const SWITCHOVER_TYPES = new Set(['승환', '승환예정', '승환(예정)']);
const isSwitchoverRow = (row: { type: string | number } | undefined) => SWITCHOVER_TYPES.has(getTypeLabel(row));
const isLeftAlignTargetRow = (row: { type: string | number } | undefined) =>
  LEFT_ALIGN_TARGET_TYPES.has(getTypeLabel(row));

const isMainRefundRow = (row: { type: string | number } | undefined) => getTypeLabel(row).includes('해약환급금');
const isMainInterestRateRow = (row: { type: string | number } | undefined) => getTypeLabel(row).includes('예정이율');

// 숫자/비율 입력 행은 우측 정렬, 그 외는 중앙 정렬
const getValueCellClass = <TData extends { type: string | number }>(params: CellClassParams<TData>) =>
  isLeftAlignTargetRow(params.data)
    ? 'text-right [&_.ag-input-field-input]:text-right !leading-[1.3] !py-2'
    : 'text-center [&_.ag-input-field-input]:text-center !leading-[1.3] !py-2';

const getSelectableValueCellClass = <TData extends { type: string | number }>(params: CellClassParams<TData>) => {
  if (params.data && (isMainRefundRow(params.data) || isMainInterestRateRow(params.data))) {
    return 'split-dual-cell';
  }
  return isLeftAlignTargetRow(params.data)
    ? 'text-right [&_.ag-input-field-input]:text-right !leading-[1.3] !py-2'
    : 'text-center flex! items-center! justify-center! !leading-[1.3] !py-2 [&_.ag-input-field-input]:text-center';
};

const isType3CompanyRow = (row: AgGridRow | undefined) => row?.type === '보험회사명';
const isType3StatusRow = (row: AgGridRow | undefined) => row?.type === '계약상태';
const isType3InsuredRow = (row: AgGridRow | undefined) => row?.type === '피보험자';
const isType3DateRow = (row: AgGridRow | undefined) => row?.type === '보험기간';
const isType3PremiumRow = (row: AgGridRow | undefined) => row?.type === '보험료';
const isType3CoverageAmountRow = (row: AgGridRow | undefined) => row?.type === '보험가입금액';
const isType3PayPeriodRow = (row: AgGridRow | undefined) => row?.type === '납입주기/기간';
const getBaseYmField = (colId: string | undefined) => {
  if (!colId) return 'baseYm';
  return `${colId}BaseYm`;
};
const isType3NumberFormatRow = (row: AgGridRow | undefined) => TYPE3_NUMBER_FORMAT_TYPES.has(getTypeLabel(row));
const isType3EditableTextRow = (row: AgGridRow | undefined) => TYPE3_EDITABLE_TEXT_TYPES.has(getTypeLabel(row));
const isType3EditableRow = (row: AgGridRow | undefined) =>
  !!row &&
  !isSwitchoverRow(row) &&
  (isType3CompanyRow(row) || isType3DateRow(row) || isType3NumberFormatRow(row) || isType3EditableTextRow(row));

// 저장 직전 단위 문자열 및 천단위 콤마(,) 자동 보정 (원, %, 만원)
const getValueWithUnit = (row: { type: string | number } | undefined, value: GridCellValue): GridCellValue => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return value;
  }

  if (getTypeLabel(row) === '해약환급금/기준연월') {
    const numOnly = trimmed.replace(/원/g, '').trim();
    const formattedNum = formatNumberWithComma(numOnly);
    return `${formattedNum}원`;
  }

  if (getTypeLabel(row) === '예정이율/기준연월') {
    return trimmed.endsWith('%') ? trimmed : `${trimmed}%`;
  }

  if (row && getTypeLabel(row) === '보험가입금액') {
    const numOnly = trimmed.replace(/만원/g, '').trim();
    const formattedNum = formatNumberWithComma(numOnly);
    return `${formattedNum}만원`;
  }

  if (row && getTypeLabel(row) === '보험료') {
    const numOnly = trimmed.replace(/원/g, '').trim();
    const formattedNum = formatNumberWithComma(numOnly);
    return `${formattedNum}원`;
  }

  return value;
};

// 단위(원) 고정 입력 에디터
const WonUnitCellEditor = (props: WonUnitCellEditorProps) => {
  const editorValue = props.value == null ? '' : formatNumberWithComma(String(props.value).replace(/원/g, '').trim());

  return (
    <div className="flex h-full w-full items-center gap-1 px-1 bg-white">
      <input
        className="ag-input-field-input ag-text-field-input w-full text-right outline-none focus:border-primary-500 border border-gray-300 rounded px-1 text-xs"
        value={editorValue}
        onChange={(event) => {
          const val = formatNumberWithComma(event.target.value.replace(/원/g, '').trim());
          props.onValueChange?.(val);
        }}
        onBlur={() => props.stopEditing?.()}
        autoFocus
      />
      <span className="shrink-0 text-xs">원</span>
    </div>
  );
};

// 단위(만원) 고정 입력 에디터
const ManwonUnitCellEditor = (props: WonUnitCellEditorProps) => {
  const editorValue = props.value == null ? '' : formatNumberWithComma(String(props.value).replace(/만원/g, '').trim());

  return (
    <div className="flex h-full w-full items-center gap-1 px-1 bg-white">
      <input
        className="ag-input-field-input ag-text-field-input w-full text-right outline-none focus:border-primary-500 border border-gray-300 rounded px-1 text-xs"
        value={editorValue}
        onChange={(event) => {
          const val = formatNumberWithComma(event.target.value.replace(/만원/g, '').trim());
          props.onValueChange?.(val);
        }}
        onBlur={() => props.stopEditing?.()}
        autoFocus
      />
      <span className="shrink-0 text-xs">만원</span>
    </div>
  );
};

// 납입주기/기간 전용 입력 에디터 (기본 value에 '/' 포함)
const PayPeriodCellEditor = (props: WonUnitCellEditorProps) => {
  const initialVal = React.useMemo(() => {
    const raw = props.value == null ? '' : String(props.value).trim();
    if (!raw) return ' / ';
    if (!raw.includes('/')) return `${raw} / `;
    return raw;
  }, [props.value]);

  const [editorValue, setEditorValue] = React.useState(initialVal);

  return (
    <div className="flex h-full w-full items-center px-1 bg-white">
      <input
        className="ag-input-field-input ag-text-field-input w-full text-center outline-none focus:border-primary-500 border border-gray-300 rounded px-1 text-xs"
        value={editorValue}
        onChange={(event) => {
          const val = event.target.value;
          setEditorValue(val);
          props.onValueChange?.(val);
        }}
        onBlur={() => props.stopEditing?.()}
        autoFocus
      />
    </div>
  );
};

// Ltpz063 팝업 전용 가운데 정렬 DatePicker 에디터
const Ltpz063DatePickerCellEditor = (props: any) => {
  return (
    <div className="flex w-full h-full items-center justify-center mx-auto [&_.cp-datepicker]:mx-auto [&_.cp-datepicker]:justify-center">
      <DatePickerCellEditor {...props} />
    </div>
  );
};

// 2분할 해약환급금/예정이율 전용 셀 렌더러
const DualSplitCellRenderer = (params: CheckboxRendererParams<any>) => {
  const fieldKey = params.colDef?.field;
  const cellId = `${params.node?.id ?? ''}_${fieldKey ?? ''}`;
  const baseYmKey = getBaseYmField(fieldKey);

  const isRefund = isMainRefundRow(params.data);
  const isRate = isMainInterestRateRow(params.data);
  const unitSymbol = isRefund ? '원' : isRate ? '%' : '';

  const rawValue = params.value == null ? '' : String(params.value);
  const leftContent = getValueWithUnit(params.data, params.value);
  const dateValue = params.data?.[baseYmKey] ?? params.data?.baseYm ?? '';
  const rightContent = dateValue;

  const [isEditingLeft, setIsEditingLeft] = React.useState(false);
  const [isEditingRight, setIsEditingRight] = React.useState(false);
  const [editorValue, setEditorValue] = React.useState('');

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleCloseAll = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail !== cellId) {
        setIsEditingLeft(false);
        setIsEditingRight(false);
      }
    };
    window.addEventListener('close-all-split-cells', handleCloseAll);
    return () => {
      window.removeEventListener('close-all-split-cells', handleCloseAll);
    };
  }, [cellId]);

  React.useEffect(() => {
    if (!isEditingLeft && !isEditingRight) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!containerRef.current || containerRef.current.contains(target)) {
        return;
      }

      if (target instanceof Element) {
        const isInsidePopover =
          target.closest('.rdp') ||
          target.closest('.cp-datepicker') ||
          target.closest('[data-radix-popper-content-wrapper]') ||
          target.closest('[data-radix-portal]') ||
          target.closest('option') ||
          target.closest('select') ||
          target.closest('[data-slot="popover-content"]');

        if (isInsidePopover) {
          return;
        }
      }

      if (isEditingLeft) {
        handleSaveLeft(editorValue);
      }
      if (isEditingRight) {
        setIsEditingRight(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside, true);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside, true);
    };
  }, [isEditingLeft, isEditingRight, editorValue]);

  const handleStartLeftEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('close-all-split-cells', { detail: cellId }));
    let initVal = rawValue;
    if (isRefund) {
      initVal = formatNumberWithComma(initVal.replace(/원/g, '').trim());
    } else if (isRate) {
      initVal = initVal.replace(/%/g, '').trim();
    }
    setEditorValue(initVal);
    setIsEditingLeft(true);
  };

  const handleSaveLeft = (val: string) => {
    setIsEditingLeft(false);
    let finalVal = val.trim();
    if (finalVal.length > 0) {
      if (isRefund) {
        const numOnly = finalVal.replace(/원/g, '').trim();
        finalVal = `${formatNumberWithComma(numOnly)}원`;
      } else if (isRate) {
        finalVal = finalVal.endsWith('%') ? finalVal : `${finalVal}%`;
      }
    }
    if (params.node && params.data && fieldKey) {
      params.node.setData({
        ...params.data,
        [fieldKey]: finalVal,
      });
    }
  };

  const handleDateChange = (val1: any, val2?: string) => {
    let raw = '';
    if (typeof val1 === 'string') {
      raw = val1;
    } else if (typeof val2 === 'string') {
      raw = val2;
    } else if (typeof val1 === 'number') {
      const currentVal = params.data?.[baseYmKey] ?? params.data?.baseYm ?? '';
      const year = currentVal ? String(currentVal).slice(0, 4) : String(new Date().getFullYear());
      const m = String(val1).padStart(2, '0');
      raw = `${year}-${m}`;
    } else if (val1 && typeof val1 === 'object' && 'getFullYear' in val1) {
      const y = val1.getFullYear();
      const m = String(val1.getMonth() + 1).padStart(2, '0');
      raw = `${y}-${m}`;
    }

    if (params.node && params.data && raw) {
      const ymOnly = raw.replace(/[^0-9-]/g, '').slice(0, 7);
      const nextData = {
        ...params.data,
        baseYm: ymOnly,
        [baseYmKey]: ymOnly,
      };
      params.node.setData(nextData);
      params.api?.refreshCells({ rowNodes: [params.node], force: true });
    }
    setIsEditingRight(false);
  };

  const handleLeftBlur = () => {
    handleSaveLeft(editorValue);
  };

  return (
    <div ref={containerRef} className="relative !h-full h-full w-full flex items-stretch">
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[#ddddde] pointer-events-none z-10" />

      {isEditingLeft ? (
        <Grow className="w-1/2 flex-1 basis-1/2 min-w-0 max-w-[50%] justify-start px-1 flex items-center gap-1 h-full overflow-hidden">
          <input
            className="ag-input-field-input ag-text-field-input min-w-0 flex-1 text-right! outline-none focus:border-primary-500 border border-gray-300 rounded px-1 text-xs "
            value={editorValue}
            onChange={(event) => {
              const val = isRefund
                ? formatNumberWithComma(event.target.value.replace(/원/g, '').trim())
                : event.target.value.replace(/%/g, '').trim();
              setEditorValue(val);
            }}
            onBlur={handleLeftBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveLeft(editorValue);
              }
            }}
            autoFocus
          />
          {unitSymbol && <span className="shrink-0 text-xs">{unitSymbol}</span>}
        </Grow>
      ) : (
        <Grow
          className="w-1/2 flex-1 basis-1/2 min-w-0 max-w-[50%] justify-end pr-1 text-right overflow-hidden cursor-pointer !h-full h-full min-h-[28px] items-center flex self-stretch transition-colors text-[#006ff2]"
          onClick={handleStartLeftEdit}
        >
          {leftContent || '\u00A0'}
        </Grow>
      )}

      {isEditingRight ? (
        <Grow className="!h-full h-full pl-1 text-left! aspect-auto w-1/2 flex-1 basis-1/2 min-w-0 max-w-[50%] items-center justify-center overflow-visible pointer-events-auto z-10">
          <div className="w-full flex items-center justify-center pointer-events-auto">
            <DatePickerInput
              value={dateValue}
              onChange={(date, formatted) => {
                handleDateChange(formatted || date);
              }}
              onMonthSelect={(m) => {
                handleDateChange(m);
              }}
              monthOnly={true}
              width="full"
            />
          </div>
        </Grow>
      ) : (
        <Grow
          className="!h-full h-full pl-1 text-center aspect-auto w-1/2 flex-1 basis-1/2 min-w-0 max-w-[50%] items-center justify-center overflow-hidden cursor-pointer flex self-stretch min-h-[28px] transition-colors text-[#006ff2]"
          onClick={(e) => {
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent('close-all-split-cells', { detail: cellId }));
            setIsEditingRight(true);
          }}
        >
          {rightContent || '\u00A0'}
        </Grow>
      )}
    </div>
  );
};

// 승환(예정) 행 정렬 고정 (가장 하단에 위치)
const keepSwitchoverRowAtBottom = (params: PostSortRowsParams<AgGridRow>) => {
  const switchRowIndex = params.nodes.findIndex((node) => node.data && isSwitchoverRow(node.data));
  if (switchRowIndex > -1) {
    const [switchRow] = params.nodes.splice(switchRowIndex, 1);
    params.nodes.push(switchRow);
  }
};

export const Ltpz063 = () => {
  const { tabs, active, setActive } = useTabs(DATA_TABS);
  const [switchContracts, setSwitchContracts] = React.useState<SwitchContractItem[]>(INITIAL_SWITCH_CONTRACTS);
  const [normalContracts, setNormalContracts] = React.useState<SwitchContractItem[]>(INITIAL_NORMAL_CONTRACTS);
  const [externalContracts, setExternalContracts] = React.useState<ExternalContractItem[]>(INITIAL_EXTERNAL_CONTRACTS);
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 타사계약 추가 핸들러 (승환계약정보 탭)
  const handleAddSwitchContract = React.useCallback(() => {
    const newId = `ext_${Date.now()}`;
    const newContract: SwitchContractItem = {
      id: newId,
      name: '타사기존',
      isOur: false,
      company: '한화손보',
      productName: '',
      status: '정상',
      insured: '홍길순',
      period: '',
      premium: '',
      payPeriod: '',
      coverage: '',
      amount: '',
      refund: '',
      refundYm: '2026-06',
      rate: '',
      rateYm: '2026-06',
      purpose: '',
      exemption: '',
      isSwitch: false,
    };
    setSwitchContracts((prev) => [...prev, newContract]);
  }, []);

  // 타사계약 추가 핸들러 (추가계약정보 탭)
  const handleAddExternalContract = React.useCallback(() => {
    const newId = `ext_${Date.now()}`;
    const newContract: ExternalContractItem = {
      id: newId,
      company: '선택',
      productName: '',
      status: '선택',
      insured: '선택',
      period: '',
      premium: '',
      payPeriod: ' / ',
      coverage: '',
      amount: '',
      refund: '',
      refundYm: '2026-06',
      rate: '',
      rateYm: '2026-06',
      purpose: '',
      exemption: '',
      isSwitch: false,
    };
    setExternalContracts((prev) => [...prev, newContract]);
  }, []);

  // 타사계약 삭제 핸들러 (추가계약정보 탭)
  const handleDeleteExternalContract = React.useCallback((targetId: string) => {
    setExternalContracts((prev) => prev.filter((item) => item.id !== targetId));
  }, []);

  // 행 타입이 편집 가능 대상 타입인지 확인 (해약환급금, 예정이율, 보험목적, 면책사유)
  const isEditableTargetRow = (fieldName: string | number) => EDITABLE_TARGET_TYPES.has(String(fieldName));

  // ag-Grid 셀 스타일 규칙: 2분할 행에 '!p-0' 패딩 제거 적용
  const externalInsuranceCellClassRules = {
    '!p-0': ({ data }: { data: AgGridRow | undefined }) =>
      data ? isMainRefundRow(data) || isMainInterestRateRow(data) : false,
  };

  // value1 / value2 탭용 셀 클래스 규칙 (수정 가능한 셀만 editable-cell 및 text-[#006ff2] 부여)
  const getSwitchExternalCellClass = <TData extends { type: string | number }>(params: CellClassParams<TData>) => {
    if (!params.data) {
      return '';
    }

    if (isMainRefundRow(params.data) || isMainInterestRateRow(params.data)) {
      return 'split-dual-cell editable-cell text-[#006ff2]';
    }
    if (isEditableTargetRow(params.data.type) || isSwitchoverRow(params.data)) {
      return `${getSelectableValueCellClass(params)} editable-cell text-[#006ff2]`;
    }

    return getSelectableValueCellClass(params);
  };

  // value3 탭용 셀 클래스 규칙 (수정 가능한 셀만 editable-cell 및 text-[#006ff2] 부여)
  const getThirdExternalCellClass = <TData extends { type: string | number }>(params: CellClassParams<TData>) => {
    if (!params.data) {
      return '';
    }

    if (isMainRefundRow(params.data) || isMainInterestRateRow(params.data)) {
      return 'split-dual-cell editable-cell text-[#006ff2]';
    }
    if (isType3EditableRow(params.data) || isSwitchoverRow(params.data)) {
      return `${getSelectableValueCellClass(params)} editable-cell text-[#006ff2]`;
    }

    return getSelectableValueCellClass(params);
  };

  // 체크박스 셀 렌더러 생성 함수
  const createCheckboxCellRenderer = (
    setContractState: React.Dispatch<React.SetStateAction<any[]>>,
    enableSelectIcon: boolean = false
  ) => {
    return (params: CheckboxRendererParams<any>) => {
      if (!isSwitchoverRow(params.data)) {
        if (isMainRefundRow(params.data) || isMainInterestRateRow(params.data)) {
          return <DualSplitCellRenderer {...params} />;
        }
        if (
          enableSelectIcon &&
          params.data &&
          (isType3CompanyRow(params.data) || isType3StatusRow(params.data) || isType3InsuredRow(params.data))
        ) {
          return createExpiryCellRenderer<AgGridRow>('center')(params as any);
        }
        return getValueWithUnit(params.data, params.value);
      }

      const fieldKey = params.colDef?.field;
      const isChecked = Boolean(params.value);

      return (
        <Grow placement={'cc'}>
          <Checkbox
            checked={isChecked}
            onCheckedChange={(checked) => {
              if (!fieldKey) return;
              const newCheckedState = checked === true;
              params.node?.setData({
                ...params.data,
                [fieldKey]: newCheckedState,
              });
              setContractState((prev) =>
                prev.map((item) => (item.id === fieldKey ? { ...item, isSwitch: newCheckedState } : item))
              );
            }}
            aria-label="승환(예정) 선택"
          />
        </Grow>
      );
    };
  };

  const checkboxRenderer1 = React.useMemo(() => createCheckboxCellRenderer(setSwitchContracts, false), []);
  const checkboxRenderer2 = React.useMemo(() => createCheckboxCellRenderer(setNormalContracts, false), []);
  const checkboxRenderer3 = React.useMemo(() => createCheckboxCellRenderer(setExternalContracts, true), []);

  // Header Component for value3 (ExternalContracts)
  const ThirdGridHeaderWithDelete = React.useMemo(() => {
    const Component = (props: IHeaderParams<AgGridRow>) => {
      const colId = props.column?.getColId();
      const contractId = colId ? colId.replace(/^v3_/, '') : '';

      return (
        <Grow className="w-full" gap={2} placement={'cc'}>
          <span className="ag-header-cell-text">타사기존</span>
          <Button color="gray" variant="outlined" onClick={() => handleDeleteExternalContract(contractId)}>
            삭제
          </Button>
        </Grow>
      );
    };
    return Component;
  }, [handleDeleteExternalContract]);

  // value1 rowData
  const rowData1 = React.useMemo(() => {
    const ROW_FIELD_MAP: { id: number; type: string; field: keyof SwitchContractItem; ourVal: string }[] = [
      { id: 1, type: '보험회사명', field: 'company', ourVal: '한화손보' },
      { id: 2, type: '상품명', field: 'productName', ourVal: '한화 여성간편건강보험 4.0' },
      { id: 3, type: '계약상태', field: 'status', ourVal: '청약중' },
      { id: 4, type: '피보험자', field: 'insured', ourVal: '홍길순' },
      { id: 5, type: '보험기간', field: 'period', ourVal: '2024-03-01 ~ 2026-03-31' },
      { id: 6, type: '보험료', field: 'premium', ourVal: '165,000원' },
      { id: 7, type: '납입주기/기간', field: 'payPeriod', ourVal: '월납/10년납' },
      { id: 8, type: '주요보장내용', field: 'coverage', ourVal: '질병후유장해 등' },
      { id: 9, type: '보험가입금액', field: 'amount', ourVal: '3,000만원 등' },
      { id: 10, type: '해약환급금/기준연월', field: 'refund', ourVal: '신계약 해당사항 없음' },
      { id: 11, type: '예정이율/기준연월', field: 'rate', ourVal: '5.99%' },
      { id: 12, type: '보험목적', field: 'purpose', ourVal: '장기상해' },
      { id: 13, type: '면책사유 및 면책사항', field: 'exemption', ourVal: '계약자,피보험자,수익자의 고의사고 등' },
      { id: 14, type: '승환(예정)', field: 'isSwitch', ourVal: '' },
    ];

    return ROW_FIELD_MAP.map((item) => {
      const rowObj: any = {
        id: item.id,
        type: item.type,
        ourInsurance1: item.ourVal,
      };

      switchContracts.forEach((contract) => {
        rowObj[contract.id] = contract[item.field];
        if (item.type === '해약환급금/기준연월') {
          rowObj[`${contract.id}BaseYm`] = contract.refundYm;
        } else if (item.type === '예정이율/기준연월') {
          rowObj[`${contract.id}BaseYm`] = contract.rateYm;
        }
      });

      return rowObj;
    });
  }, [switchContracts]);

  // value1 columnDefs
  const columnDefs1: ColDef<AgGridRow>[] = React.useMemo(
    () => [
      {
        headerName: '구분',
        colId: 'v1_type',
        width: attributeColumnWidth(140),
        headerClass: '[&_.ag-header-cell-text]:font-bold',
        cellClass: 'text-center font-bold',
        field: 'type',
        pinned: 'left',
        autoHeight: true,
        wrapText: true,
      },
      {
        headerName: '당사신규',
        colId: 'v1_ourInsurance1',
        flex: 1,
        minWidth: attributeColumnWidth(230),
        headerClass: '[&_.ag-header-cell-text]:font-bold',
        cellClass: getValueCellClass,
        field: 'ourInsurance1',
        pinned: 'left',
        autoHeight: true,
        wrapText: true,
      },
      ...switchContracts.map((contract) => {
        const colDef: ColDef<AgGridRow> = {
          headerName: contract.name,
          colId: `v1_${contract.id}`,
          headerClass: '[&_.ag-header-cell-text]:font-bold',
          cellClass: getSwitchExternalCellClass,
          cellClassRules: externalInsuranceCellClassRules,
          width: attributeColumnWidth(249),
          minWidth: attributeColumnWidth(249),
          field: contract.id,
          cellRenderer: checkboxRenderer1,
          editable: ({ data }) =>
            data ? isEditableTargetRow(data.type) && !isMainRefundRow(data) && !isMainInterestRateRow(data) : false,
          autoHeight: true,
          wrapText: true,
        };
        return colDef;
      }),
    ],
    [switchContracts, attributeColumnWidth, checkboxRenderer1]
  );

  // value2 rowData
  const rowData2 = React.useMemo(() => {
    const ROW_FIELD_MAP: { id: number; type: string; field: keyof SwitchContractItem; ourVal: string }[] = [
      { id: 1, type: '보험회사명', field: 'company', ourVal: '한화손보' },
      { id: 2, type: '상품명', field: 'productName', ourVal: '한화 여성간편건강보험 4.0' },
      { id: 3, type: '계약상태', field: 'status', ourVal: '청약중' },
      { id: 4, type: '피보험자', field: 'insured', ourVal: '홍길순' },
      { id: 5, type: '보험기간', field: 'period', ourVal: '2024-03-01 ~ 2026-03-31' },
      { id: 6, type: '보험료', field: 'premium', ourVal: '165,000원' },
      { id: 7, type: '납입주기/기간', field: 'payPeriod', ourVal: '월납/10년납' },
      { id: 8, type: '주요보장내용', field: 'coverage', ourVal: '질병후유장해 등' },
      { id: 9, type: '보험가입금액', field: 'amount', ourVal: '3,000만원 등' },
      { id: 10, type: '해약환급금/기준연월', field: 'refund', ourVal: '신계약 해당사항 없음' },
      { id: 11, type: '예정이율/기준연월', field: 'rate', ourVal: '5.99%' },
      { id: 12, type: '보험목적', field: 'purpose', ourVal: '장기상해' },
      { id: 13, type: '면책사유 및 면책사항', field: 'exemption', ourVal: '계약자,피보험자,수익자의 고의사고 등' },
      { id: 14, type: '승환(예정)', field: 'isSwitch', ourVal: '' },
    ];

    return ROW_FIELD_MAP.map((item) => {
      const rowObj: any = {
        id: item.id,
        type: item.type,
        ourInsurance1: item.ourVal,
      };

      normalContracts.forEach((contract) => {
        rowObj[contract.id] = contract[item.field];
        if (item.type === '해약환급금/기준연월') {
          rowObj[`${contract.id}BaseYm`] = contract.refundYm;
        } else if (item.type === '예정이율/기준연월') {
          rowObj[`${contract.id}BaseYm`] = contract.rateYm;
        }
      });

      return rowObj;
    });
  }, [normalContracts]);

  // value2 columnDefs
  const columnDefs2: ColDef<AgGridRow>[] = React.useMemo(
    () => [
      {
        headerName: '구분',
        colId: 'v2_type',
        width: attributeColumnWidth(140),
        headerClass: '[&_.ag-header-cell-text]:font-bold',
        cellClass: 'text-center font-bold',
        field: 'type',
        pinned: 'left',
        autoHeight: true,
        wrapText: true,
      },
      {
        headerName: '당사신규',
        colId: 'v2_ourInsurance1',
        flex: 1,
        minWidth: attributeColumnWidth(230),
        headerClass: '[&_.ag-header-cell-text]:font-bold',
        cellClass: getValueCellClass,
        field: 'ourInsurance1',
        pinned: 'left',
        autoHeight: true,
        wrapText: true,
      },
      ...normalContracts.map((contract) => {
        const colDef: ColDef<AgGridRow> = {
          headerName: contract.name,
          colId: `v2_${contract.id}`,
          headerClass: '[&_.ag-header-cell-text]:font-bold',
          cellClass: getSwitchExternalCellClass,
          cellClassRules: externalInsuranceCellClassRules,
          width: attributeColumnWidth(249),
          minWidth: attributeColumnWidth(249),
          field: contract.id,
          cellRenderer: checkboxRenderer2,
          editable: ({ data }) =>
            data ? isEditableTargetRow(data.type) && !isMainRefundRow(data) && !isMainInterestRateRow(data) : false,
          autoHeight: true,
          wrapText: true,
        };
        return colDef;
      }),
    ],
    [normalContracts, attributeColumnWidth, checkboxRenderer2]
  );

  // value3 rowData (externalContracts 상태로부터 동적 렌더링)
  const rowData3 = React.useMemo(() => {
    const ROW_FIELD_MAP: { id: number; type: string; field: keyof ExternalContractItem; ourVal: string }[] = [
      { id: 1, type: '보험회사명', field: 'company', ourVal: '한화손보' },
      { id: 2, type: '상품명', field: 'productName', ourVal: '한화 여성간편건강보험 4.0' },
      { id: 3, type: '계약상태', field: 'status', ourVal: '청약중' },
      { id: 4, type: '피보험자', field: 'insured', ourVal: '홍길순' },
      { id: 5, type: '보험기간', field: 'period', ourVal: '2024-03-01 ~ 2026-03-31' },
      { id: 6, type: '보험료', field: 'premium', ourVal: '165,000원' },
      { id: 7, type: '납입주기/기간', field: 'payPeriod', ourVal: '월납/10년납' },
      { id: 8, type: '주요보장내용', field: 'coverage', ourVal: '질병후유장해 등' },
      { id: 9, type: '보험가입금액', field: 'amount', ourVal: '3,000만원 등' },
      { id: 10, type: '해약환급금/기준연월', field: 'refund', ourVal: '신계약 해당사항 없음' },
      { id: 11, type: '예정이율/기준연월', field: 'rate', ourVal: '5.99%' },
      { id: 12, type: '보험목적', field: 'purpose', ourVal: '장기상해' },
      { id: 13, type: '면책사유 및 면책사항', field: 'exemption', ourVal: '계약자,피보험자,수익자의 고의사고 등' },
      { id: 14, type: '승환(예정)', field: 'isSwitch', ourVal: '' },
    ];

    return ROW_FIELD_MAP.map((item) => {
      const rowObj: any = {
        id: item.id,
        type: item.type,
        ourInsurance1: item.ourVal,
      };

      externalContracts.forEach((contract) => {
        rowObj[contract.id] = contract[item.field];
        if (item.type === '해약환급금/기준연월') {
          rowObj[`${contract.id}BaseYm`] = contract.refundYm;
        } else if (item.type === '예정이율/기준연월') {
          rowObj[`${contract.id}BaseYm`] = contract.rateYm;
        }
      });

      return rowObj;
    });
  }, [externalContracts]);

  // value3 cellEditorSelector
  const getType3CellEditorSelector = (
    params: EditableCallbackParams<AgGridRow>
  ): CellEditorSelectorResult | undefined => {
    if (isType3CompanyRow(params.data)) {
      return {
        component: 'agSelectCellEditor',
        params: { values: ['선택', '한화손보', '메리츠화재', '삼성화재', 'KB손보', 'DB손보'] },
      };
    }

    if (isType3StatusRow(params.data)) {
      return {
        component: 'agSelectCellEditor',
        params: { values: ['선택', '계약상태', '정상', '실효', '해지', '철회', '피보험자'] },
      };
    }

    if (isType3InsuredRow(params.data)) {
      return {
        component: 'agSelectCellEditor',
        params: { values: ['선택', '홍길동', '홍길순'] },
      };
    }

    if (isType3DateRow(params.data)) {
      return {
        component: Ltpz063DatePickerCellEditor,
      };
    }

    if (isType3CoverageAmountRow(params.data)) {
      return {
        component: ManwonUnitCellEditor,
      };
    }

    if (isType3PremiumRow(params.data)) {
      return {
        component: WonUnitCellEditor,
      };
    }

    if (isType3PayPeriodRow(params.data)) {
      return {
        component: PayPeriodCellEditor,
      };
    }

    return undefined;
  };

  // value3 columnDefs (externalContracts 상태로부터 동적 렌더링)
  const columnDefs3: ColDef<AgGridRow>[] = React.useMemo(
    () => [
      {
        headerName: '구분',
        colId: 'v3_type',
        width: attributeColumnWidth(140),
        headerClass: '[&_.ag-header-cell-text]:font-bold',
        cellClass: 'text-center font-bold',
        field: 'type',
        pinned: 'left',
        autoHeight: true,
        wrapText: true,
      },
      {
        headerName: '당사신규',
        colId: 'v3_ourInsurance1',
        flex: 1,
        minWidth: attributeColumnWidth(230),
        headerClass: '[&_.ag-header-cell-text]:font-bold',
        cellClass: getValueCellClass,
        field: 'ourInsurance1',
        pinned: 'left',
        autoHeight: true,
        wrapText: true,
      },
      ...externalContracts.map((contract) => ({
        headerName: '타사기존',
        colId: `v3_${contract.id}`,
        headerClass: '[&_.ag-header-cell-text]:font-bold',
        headerComponent: ThirdGridHeaderWithDelete,
        cellClass: getThirdExternalCellClass,
        cellClassRules: externalInsuranceCellClassRules,
        width: attributeColumnWidth(249),
        minWidth: attributeColumnWidth(249),
        field: contract.id,
        cellRenderer: checkboxRenderer3,
        editable: (params: EditableCallbackParams<AgGridRow>) =>
          params.data
            ? isType3EditableRow(params.data) && !isMainRefundRow(params.data) && !isMainInterestRateRow(params.data)
            : false,
        cellEditorSelector: getType3CellEditorSelector,
        autoHeight: true,
        wrapText: true,
      })),
    ],
    [externalContracts, attributeColumnWidth, checkboxRenderer3, ThirdGridHeaderWithDelete]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              비교안내확인서(타사용) 입력
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ063)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'bwc'}>
            <FormTable
              variant={'head'}
              lineTop={false}
              caption="정액담보점검목록 조회"
              cols={['w-[6rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]']}
            >
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input
                    aria-label="설계번호 입력"
                    value={'LA01234567890'}
                    onChange={() => {}}
                    variant="info"
                    readOnly
                  />
                  <Input
                    aria-label=""
                    value={'한화 더 건강한 한아름좋합보험2601'}
                    onChange={() => {}}
                    variant="info"
                    readOnly
                  />
                </FormCell>
                <FormCell title={'승환확인여부 대상'}>
                  <Input aria-label="" value={'계약자:홍길동'} onChange={() => {}} variant="info" readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Gcol className="w-full" placement="ss" variant="box-warning">
            <Typo icon="warning" variant="body-sm">
              <b>주의사항</b>
            </Typo>
            <BulletList color={'warning'} size="sm">
              <BulletListItem before="1." type="symbols">
                {"보험회사 면책사유 및 면책사항은 '상품설명서 참조'등의 단순 기재가 불가 (금감원 주의사항)"}
              </BulletListItem>
              <BulletListItem before="2." type="symbols">
                조회기준일에 따라 일부 기존계약은 계약상태가 다르게 표기될 수 있음
              </BulletListItem>
              <BulletListItem before="3." type="symbols">
                해약환급률 및 예정이자율은 전전월말 기준 자료이므로 최근 2개월 내 체결계약은 데이터가 없을 수 있음
                <b className="font-bold">(공란인 경우 고객 확인 후 기재 필수)</b>
              </BulletListItem>
              <BulletListItem before="4." type="symbols">
                예정이자율은 금리연동형 상품의 경우 공시이율, 금리확정형 상품의 경우 적용이율이며,{' '}
                <b>이율 미적용 계약의 경우 &quot;적용이율 없음&quot; 으로 표기됨.</b>
              </BulletListItem>
            </BulletList>
          </Gcol>
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            hasTableBelow={true}
            getValue={(t) => t.value}
            renderTab={(t) => t.label ?? t.value}
            visibleCount={4}
            removable={false}
            renderAfter={
              <Grow gap={2} placement={'sc'}>
                <Typo>(2026-03-30 12:32 기준 한국신용정보원 계약정보 조회)</Typo>
                <Button color="gray" variant="outlined" onClick={() => {}}>
                  재조회
                </Button>
              </Grow>
            }
          >
            {active === 'value1' ? (
              <div className="ag-theme-alpine ag-border-t">
                <AgGridReact<AgGridRow>
                  getRowId={(params) => `tab1-${params.data.id}`}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData1}
                  columnDefs={columnDefs1}
                  postSortRows={keepSwitchoverRowAtBottom}
                  singleClickEdit={true}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  rowClassRules={{}}
                  domLayout="autoHeight"
                  animateRows={false}
                />
              </div>
            ) : active === 'value2' ? (
              <div className="ag-theme-alpine ag-border-t">
                <AgGridReact<AgGridRow>
                  getRowId={(params) => `tab2-${params.data.id}`}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
                  postSortRows={keepSwitchoverRowAtBottom}
                  singleClickEdit={true}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  rowClassRules={{}}
                  domLayout="autoHeight"
                  animateRows={false}
                />
              </div>
            ) : active === 'value3' ? (
              <div className="ag-theme-alpine ag-border-t">
                <AgGridReact<AgGridRow>
                  getRowId={(params) => `tab3-${params.data.id}`}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData3}
                  columnDefs={columnDefs3}
                  postSortRows={keepSwitchoverRowAtBottom}
                  singleClickEdit={true}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  rowClassRules={{}}
                  domLayout="autoHeight"
                  animateRows={false}
                />
              </div>
            ) : null}
          </TabPager>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea className="grid grid-cols-[1fr_auto]">
            <Grow>
              {active === 'value2' && (
                <BulletItem color="warning" size="sm" type="ref">
                  해약예정인 계약은 승환예정 체크박스 선택 후 저장해주시기 바랍니다.
                </BulletItem>
              )}
              {active === 'value3' && (
                <BulletItem color="warning" size="sm" type="ref">
                  06.6월 이전 비교안내할 타 보험회사 계약이 있거나, 고객님께서 추가로 안내받고 싶어하는 계약이 있는 경우
                  작성해주세요.
                </BulletItem>
              )}
            </Grow>
            <Grow>
              {active === 'value3' && (
                <>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>
                    불러오기
                  </Button>
                  <Button variant={'outlined'} size={'xl'} color={'gray'} onClick={handleAddExternalContract}>
                    타사승환추가
                  </Button>
                </>
              )}
              <Button variant={'contained'} size={'xl'}>
                저장
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz063;
