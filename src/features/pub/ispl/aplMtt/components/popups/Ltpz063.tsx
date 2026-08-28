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

type DummyDataType = {
  id: number;
  type: string | number;
  ourInsurance1: string | number;
  ourInsurance2: string | number | boolean;
  externalInsurance1: string | number | boolean;
  externalInsurance2: string | number | boolean;
  baseYm?: string;
};

// ag-Grid 셀에 표시될 수 있는 데이터 타입
type GridCellValue = string | number | boolean | null | undefined;
// value1/value2 탭: 체크박스로 선택 가능한 필드명
type MainSelectableField = 'ourInsurance2' | 'externalInsurance1' | 'externalInsurance2';
// value3 탭: 체크박스로 선택 가능한 필드명 (externalInsurance3, externalInsurance4 추가)
type ExtraSelectableField = 'externalInsurance1' | 'externalInsurance2' | 'externalInsurance3' | 'externalInsurance4';

// 체크박스 렌더러에 전달되는 파라미터
type CheckboxRendererParams<TData> = {
  data: TData | undefined; // 현재 행 데이터
  value: GridCellValue; // 셀의 현재 값
  colDef: ColDef<TData>; // 컬럼 정의
  node?: any; // 행 노드
  api?: any; // 그리드 API
  [key: string]: any;
};

// 셀 에디터 props
type WonUnitCellEditorProps = {
  value?: GridCellValue; // 에디터의 현재 값
  onValueChange?: (value: string) => void; // 값 변경 콜백
  stopEditing?: () => void; // 에디팅 종료
  [key: string]: any;
};

// value3(추가계약정보) 탭에서 행 타입별 편집/표시 규칙에 사용
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

const DummyData: DummyDataType[] = [
  {
    id: 1,
    type: '보험회사명',
    ourInsurance1: '한화손보',
    ourInsurance2: '한화손보',
    externalInsurance1: '메리츠화재',
    externalInsurance2: '삼성화재',
  },
  {
    id: 2,
    type: '상품명',
    ourInsurance1: '한화 여성간편건강보험 4.0',
    ourInsurance2: 'ㅇㅇ 간편보험 2601',
    externalInsurance1: '(무)메리츠간편한355건강보험',
    externalInsurance2: '삼성간편건강보험',
  },
  {
    id: 3,
    type: '계약상태(발생일)',
    ourInsurance1: '청약중',
    ourInsurance2: '해지(2024-03-01)',
    externalInsurance1: '실효(2024-03-01)',
    externalInsurance2: '철회(2024-03-01)',
  },
  {
    id: 4,
    type: '피보험자',
    ourInsurance1: '홍길순',
    ourInsurance2: '홍길순',
    externalInsurance1: '홍길순',
    externalInsurance2: '홍길순',
  },
  {
    id: 5,
    type: '보험기간',
    ourInsurance1: '2024-03-01 ~ 2026-03-31',
    ourInsurance2: '2024-03-01 ~ 2026-03-31',
    externalInsurance1: '2024-03-01 ~ 2026-03-31',
    externalInsurance2: '2025-12-15 ~ 2026-03-15',
  },
  {
    id: 6,
    type: '보험료',
    ourInsurance1: '165,000원',
    ourInsurance2: '165,000원',
    externalInsurance1: '165,000원',
    externalInsurance2: '165,000원',
  },
  {
    id: 7,
    type: '납입주기/기간',
    ourInsurance1: '월납/10년납',
    ourInsurance2: '월납/10년납',
    externalInsurance1: '월납/10년납',
    externalInsurance2: '월납/10년납',
  },
  {
    id: 8,
    type: '주요보장내용',
    ourInsurance1: '질병후유장해 등',
    ourInsurance2: '질병후유장해 등',
    externalInsurance1: '유병자상해사망 등',
    externalInsurance2: '유병자상해사망 등',
  },
  {
    id: 9,
    type: '보험가입금액',
    ourInsurance1: '3,000만원',
    ourInsurance2: '3,000만원',
    externalInsurance1: '3,000만원',
    externalInsurance2: '3,000만원',
  },
  {
    id: 10,
    type: '해약환급금/기준연월',
    ourInsurance1: '신계약 해당사항 없음',
    ourInsurance2: '300000000000원',
    externalInsurance1: '4000000원',
    externalInsurance2: '',
    baseYm: '2024-03',
  },
  {
    id: 11,
    type: '예정이율/기준연월',
    ourInsurance1: '5.99%',
    ourInsurance2: '15.99%',
    externalInsurance1: '13',
    externalInsurance2: '',
    baseYm: '2024-06',
  },
  {
    id: 12,
    type: '보험목적',
    ourInsurance1: '장기상해',
    ourInsurance2: '장기상해',
    externalInsurance1: '',
    externalInsurance2: '',
  },
  {
    id: 13,
    type: '면책사유 및 면책사항',
    ourInsurance1: '계약자,피보험자,수익자의 고의사고 등',
    ourInsurance2: '계약자,피보험자,수익자의 고의사고 등',
    externalInsurance1: '',
    externalInsurance2: '',
  },
  {
    id: 14,
    type: '승환',
    ourInsurance1: '',
    ourInsurance2: true,
    externalInsurance1: true,
    externalInsurance2: false,
  },
];

type DummyDataType2 = DummyDataType;

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    type: '보험회사명',
    ourInsurance1: '한화손보',
    ourInsurance2: '한화손보',
    externalInsurance1: '메리츠화재',
    externalInsurance2: '삼성화재',
  },
  {
    id: 2,
    type: '상품명',
    ourInsurance1: '한화 여성간편건강보험 4.0',
    ourInsurance2: 'ㅇㅇ 간편보험 2601',
    externalInsurance1: '(무)메리츠간편한355건강보험',
    externalInsurance2: '삼성간편건강보험',
  },
  {
    id: 3,
    type: '계약상태',
    ourInsurance1: '청약중',
    ourInsurance2: '정상',
    externalInsurance1: '정상',
    externalInsurance2: '정상',
  },
  {
    id: 4,
    type: '피보험자',
    ourInsurance1: '홍길순',
    ourInsurance2: '홍길순',
    externalInsurance1: '홍길순',
    externalInsurance2: '홍길순',
  },
  {
    id: 5,
    type: '보험기간',
    ourInsurance1: '2024-03-01 ~ 2026-03-31',
    ourInsurance2: '2024-03-01 ~ 2026-03-31',
    externalInsurance1: '2024-03-01 ~ 2026-03-31',
    externalInsurance2: '2025-12-15 ~ 2026-03-15',
  },
  {
    id: 6,
    type: '보험료',
    ourInsurance1: '165,000원',
    ourInsurance2: '165,000원',
    externalInsurance1: '165,000원',
    externalInsurance2: '165,000원',
  },
  {
    id: 7,
    type: '납입주기/기간',
    ourInsurance1: '월납/10년납',
    ourInsurance2: '월납/10년납',
    externalInsurance1: '월납/10년납',
    externalInsurance2: '월납/10년납',
  },
  {
    id: 8,
    type: '주요보장내용',
    ourInsurance1: '질병후유장해 등',
    ourInsurance2: '질병후유장해 등',
    externalInsurance1: '유병자상해사망 등',
    externalInsurance2: '유병자상해사망 등',
  },
  {
    id: 9,
    type: '보험가입금액',
    ourInsurance1: '3,000만원',
    ourInsurance2: '3,000만원',
    externalInsurance1: '3,000만원',
    externalInsurance2: '3,000만원',
  },
  {
    id: 10,
    type: '해약환급금/기준연월',
    ourInsurance1: '신계약 해당사항 없음',
    ourInsurance2: '3,000,000원',
    externalInsurance1: '',
    externalInsurance2: '',
    baseYm: '2024-03',
  },
  {
    id: 11,
    type: '예정이율/기준연월',
    ourInsurance1: '5.99%',
    ourInsurance2: '5.99%',
    externalInsurance1: '',
    externalInsurance2: '',
    baseYm: '2024-03',
  },
  {
    id: 12,
    type: '보험목적',
    ourInsurance1: '장기상해',
    ourInsurance2: '장기상해',
    externalInsurance1: '',
    externalInsurance2: '',
  },
  {
    id: 13,
    type: '면책사유 및 면책사항',
    ourInsurance1:
      '계약자,피보험자,수익자의 고의사고 등계약자,피보험자,수익자의 고의사고 등계약자,피보험자,수익자의 고의사고 등',
    ourInsurance2: '계약자,피보험자,수익자의 고의사고 등',
    externalInsurance1: '',
    externalInsurance2: '',
  },
  {
    id: 14,
    type: '승환예정',
    ourInsurance1: '',
    ourInsurance2: true,
    externalInsurance1: true,
    externalInsurance2: false,
  },
];
type DummyDataType3 = {
  id: number;
  type: string | number;
  ourInsurance1: string | number;
  externalInsurance1: string | number | boolean;
  externalInsurance2: string | number | boolean;
  externalInsurance3: string | number | boolean;
  externalInsurance4?: string | number | boolean;
  baseYm?: string;
};

type AgGridRow = DummyDataType3;

// value3 탭의 기본 더미 데이터
const DummyData3: DummyDataType3[] = [
  {
    id: 1,
    type: '보험회사명',
    ourInsurance1: '한화손보',
    externalInsurance1: '한화손보',
    externalInsurance2: '메리츠화재',
    externalInsurance3: '삼성화재',
    externalInsurance4: 'KB손보',
  },
  {
    id: 2,
    type: '상품명',
    ourInsurance1: '한화 여성간편건강보험 4.0',
    externalInsurance1: 'ㅇㅇ 간편보험 2601',
    externalInsurance2: '(무)메리츠간편한355건강보험',
    externalInsurance3: '삼성간편건강보험',
    externalInsurance4: 'KB간편건강보험',
  },
  {
    id: 3,
    type: '계약상태',
    ourInsurance1: '청약중',
    externalInsurance1: '계약상태',
    externalInsurance2: '계약상태',
    externalInsurance3: '계약상태',
    externalInsurance4: '계약상태',
  },
  {
    id: 4,
    type: '피보험자',
    ourInsurance1: '홍길순',
    externalInsurance1: '홍길순',
    externalInsurance2: '홍길순',
    externalInsurance3: '홍길순',
    externalInsurance4: '홍길순',
  },
  {
    id: 5,
    type: '보험기간',
    ourInsurance1: '2024-03-01 ~ 2026-03-31',
    externalInsurance1: '2024-03-01 ~ 2026-03-31',
    externalInsurance2: '2025-12-15 ~ 2026-03-15',
    externalInsurance3: '2025-12-15 ~ 2026-03-15',
    externalInsurance4: '2025-12-15 ~ 2026-03-15',
  },
  {
    id: 6,
    type: '보험료',
    ourInsurance1: '165,000원',
    externalInsurance1: '165,000원',
    externalInsurance2: '165,000원',
    externalInsurance3: '165,000원',
    externalInsurance4: '165,000원',
  },
  {
    id: 7,
    type: '납입주기/기간',
    ourInsurance1: '월납/10년납',
    externalInsurance1: '월납/10년납',
    externalInsurance2: '월납/10년납',
    externalInsurance3: '월납/10년납',
    externalInsurance4: '월납/10년납',
  },
  {
    id: 8,
    type: '주요보장내용',
    ourInsurance1: '질병후유장해 등',
    externalInsurance1: '유병자상해사망 등',
    externalInsurance2: '유병자상해사망 등',
    externalInsurance3: '유병자상해사망 등',
    externalInsurance4: '유병자상해사망 등',
  },
  {
    id: 9,
    type: '보험가입금액',
    ourInsurance1: '3,000만원 등',
    externalInsurance1: '3,000만원',
    externalInsurance2: '3,000만원',
    externalInsurance3: '3,000만원',
    externalInsurance4: '3,000만원',
  },
  {
    id: 10,
    type: '해약환급금/기준연월',
    ourInsurance1: '신계약 해당사항 없음',
    externalInsurance1: '3,000만원',
    externalInsurance2: '3,000만원',
    externalInsurance3: '3,000만원',
    externalInsurance4: '3,000만원',
    baseYm: '2026-06',
  },
  {
    id: 11,
    type: '예정이율/기준연월',
    ourInsurance1: '5.99%',
    externalInsurance1: '5.99%',
    externalInsurance2: '5.99%',
    externalInsurance3: '5.99%',
    externalInsurance4: '5.99%',
    baseYm: '2026-06',
  },
  {
    id: 12,
    type: '보험목적',
    ourInsurance1: '장기상해',
    externalInsurance1: '장기상해',
    externalInsurance2: '장기상해',
    externalInsurance3: '장기상해',
    externalInsurance4: '장기상해',
  },
  {
    id: 13,
    type: '면책사유 및 면책사항',
    ourInsurance1: '계약자,피보험자,수익자의 고의사고 등',
    externalInsurance1: '계약자,피보험자,수익자의 고의사고 등',
    externalInsurance2: '계약자,피보험자,수익자의 고의사고 등',
    externalInsurance3: '계약자,피보험자,수익자의 고의사고 등',
    externalInsurance4: '계약자,피보험자,수익자의 고의사고 등',
  },
  {
    id: 14,
    type: '승환(예정)',
    ourInsurance1: '',
    externalInsurance1: true,
    externalInsurance2: false,
    externalInsurance3: false,
    externalInsurance4: false,
  },
];
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

const isType3CompanyRow = (row: DummyDataType3 | undefined) => row?.type === '보험회사명';
const isType3StatusRow = (row: DummyDataType3 | undefined) => row?.type === '계약상태';
const isType3InsuredRow = (row: DummyDataType3 | undefined) => row?.type === '피보험자';
const isType3DateRow = (row: DummyDataType3 | undefined) => row?.type === '보험기간';
const isType3PremiumRow = (row: DummyDataType3 | undefined) => row?.type === '보험료';
const isType3CoverageAmountRow = (row: DummyDataType3 | undefined) => row?.type === '보험가입금액';
const getBaseYmField = (colId: string | undefined) => {
  if (!colId) return 'baseYm';
  return `${colId}BaseYm`;
};
const isType3NumberFormatRow = (row: DummyDataType3 | undefined) => TYPE3_NUMBER_FORMAT_TYPES.has(getTypeLabel(row));
const isType3EditableTextRow = (row: DummyDataType3 | undefined) => TYPE3_EDITABLE_TEXT_TYPES.has(getTypeLabel(row));
const isType3EditableRow = (row: DummyDataType3 | undefined) =>
  !!row &&
  (isType3CompanyRow(row) ||
    isType3DateRow(row) ||
    isType3NumberFormatRow(row) ||
    isType3EditableTextRow(row) ||
    isSwitchoverRow(row));

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

  if (row && 'externalInsurance3' in row && getTypeLabel(row) === '보험가입금액') {
    const numOnly = trimmed.replace(/만원/g, '').trim();
    const formattedNum = formatNumberWithComma(numOnly);
    return `${formattedNum}만원`;
  }

  if (row && 'externalInsurance3' in row && getTypeLabel(row) === '보험료') {
    const numOnly = trimmed.replace(/원/g, '').trim();
    const formattedNum = formatNumberWithComma(numOnly);
    return `${formattedNum}원`;
  }

  return value;
};

// 단위(원) 고정 입력 에디터: 입력 시 단위는 제거하고 값만 편집
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

// 2분할 해약환급금/예정이율 전용 셀 렌더러 (좌측 금액/% input, 우측 기준연월 DatePicker 독립 제어)
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

  // 다른 셀 편집 개시 시 현재 셀을 닫도록 싱글톤 이벤트 수신
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
        // 달력 팝오버, 연도 드롭다운 포털, option/select 등 팝오버 내부 조작 시 닫지 않음
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
    <Grow ref={containerRef} className="relative !h-full h-full w-full flex items-stretch">
      {/* 중앙 세로 구분선 (상/하단 보더와 빈틈없이 완벽히 연결) */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[#ddddde] pointer-events-none z-10" />

      {/* 좌측 50% 영역 */}
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

      {/* 우측 50% 영역 */}
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
    </Grow>
  );
};

export const Ltpz063 = () => {
  // 탭 상태 + 탭별 그리드 데이터 상태
  const { tabs, active, setActive } = useTabs(DATA_TABS);
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2, setRowData2] = React.useState<DummyDataType2[]>(DummyData2);
  const [rowData3, setRowData3] = React.useState<DummyDataType3[]>(DummyData3);
  const { attributeColumnWidth } = useDynamicColumnWidths();

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

    if (row && 'externalInsurance3' in row && getTypeLabel(row) === '보험가입금액') {
      const numOnly = trimmed.replace(/만원/g, '').trim();
      const formattedNum = formatNumberWithComma(numOnly);
      return `${formattedNum}만원`;
    }

    if (row && 'externalInsurance3' in row && getTypeLabel(row) === '보험료') {
      const numOnly = trimmed.replace(/원/g, '').trim();
      const formattedNum = formatNumberWithComma(numOnly);
      return `${formattedNum}원`;
    }

    return value;
  };

  // Ltpz063 팝업 전용 가운데 정렬 DatePicker 에디터 (공통 파일 영향 0%)
  const Ltpz063DatePickerCellEditor = (props: any) => {
    return (
      <div className="flex w-full h-full items-center justify-center mx-auto [&_.cp-datepicker]:mx-auto [&_.cp-datepicker]:justify-center">
        <DatePickerCellEditor {...props} />
      </div>
    );
  };

  // value3 탭: 회사명/날짜/금액/비율/계약상태/피보험자에 맞는 에디터를 자동 선택
  const getType3CellEditorSelector = (
    params: EditableCallbackParams<AgGridRow>
  ): CellEditorSelectorResult | undefined => {
    if (isType3CompanyRow(params.data)) {
      return {
        component: 'agSelectCellEditor',
        params: { values: ['한화손보', '메리츠화재', '삼성화재', 'KB손보', 'DB손보'] },
      };
    }

    if (isType3StatusRow(params.data)) {
      return {
        component: 'agSelectCellEditor',
        params: { values: ['계약상태', '피보험자'] },
      };
    }

    if (isType3InsuredRow(params.data)) {
      return {
        component: 'agSelectCellEditor',
        params: { values: ['홍길동', '홍길순'] },
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

    return undefined;
  };

  // value3 탭 헤더: 타사기존 컬럼을 사용자 액션으로 숨길 수 있는 헤더
  const ThirdGridHeaderWithDelete = React.useMemo(() => {
    const Component = (props: IHeaderParams<AgGridRow>) => {
      const handleDeleteColumn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        const targetColumnId = props.column?.getColId();

        if (!targetColumnId) {
          return;
        }

        props.api.setColumnsVisible([targetColumnId], false);
      };

      return (
        <Grow className="w-full" gap={2} placement={'cc'}>
          <span className="ag-header-cell-text">타사기존</span>
          <Button color="gray" variant="outlined" onClick={handleDeleteColumn}>
            삭제
          </Button>
        </Grow>
      );
    };

    return Component;
  }, []);

  // value1/value2 탭: 필드명이 체크박스 선택 가능 필드인지 판별하는 타입 가드
  const isSelectableField = (field: string): field is MainSelectableField =>
    field === 'ourInsurance2' || field === 'externalInsurance1' || field === 'externalInsurance2';

  // value3 탭: 필드명이 체크박스 선택 가능 필드인지 판별하는 타입 가드 (externalInsurance3 포함)
  const isSelectableField3 = (field: string): field is ExtraSelectableField =>
    field === 'externalInsurance1' || field === 'externalInsurance2' || field === 'externalInsurance3';

  // 행 타입이 편집 가능 대상 타입인지 확인 (해약환급금, 예정이율, 보험목적, 면책사유)
  const isEditableTargetRow = (fieldName: DummyDataType['type']) => EDITABLE_TARGET_TYPES.has(String(fieldName));

  // ag-Grid 셀 스타일 규칙: 2분할 행에 '!p-0' 패딩 제거 적용
  const externalInsuranceCellClassRules = {
    '!p-0': ({ data }: { data: DummyDataType | undefined }) =>
      data ? isMainRefundRow(data) || isMainInterestRateRow(data) : false,
  };

  // 타사/당사 기존 컬럼 셀 클래스 규칙: 편집/강조 대상 행(해약환급금, 예정이율, 보험목적, 면책사유, 승환/승환예정)에만 파란색 text-[#006ff2] 및 editable-cell 부여
  const getExternalCellClass = <TData extends { type: string | number }>(params: CellClassParams<TData>) => {
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

  // 값을 체크박스의 체크 여부로 변환: null/undefined/빈 문자열 → false, 'true' 문자열 → true, 1 → true
  const isCheckedValue = (value: GridCellValue) => {
    if (value === null || value === undefined || value === '') {
      return false;
    }

    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'number') {
      return value === 1;
    }

    return value.toLowerCase() === 'true';
  };

  // value1 체크박스 변경 핸들러
  const handleCheckboxChange = (params: CheckboxRendererParams<DummyDataType>, checked: boolean | 'indeterminate') => {
    const targetField = params.colDef.field;

    if (!params.data || !targetField || !isSelectableField(targetField)) {
      return;
    }

    const nextValue = checked === true;

    setRowData((prevRows) =>
      prevRows.map((row) => (row.id === params.data?.id ? { ...row, [targetField]: nextValue } : row))
    );
  };

  // value2 체크박스 변경 핸들러
  const handleCheckboxChange2 = (
    params: CheckboxRendererParams<DummyDataType2>,
    checked: boolean | 'indeterminate'
  ) => {
    const targetField = params.colDef.field;

    if (!params.data || !targetField || !isSelectableField(targetField)) {
      return;
    }

    const nextValue = checked === true;

    setRowData2((prevRows) =>
      prevRows.map((row) => (row.id === params.data?.id ? { ...row, [targetField]: nextValue } : row))
    );
  };

  // value3 체크박스 변경 핸들러
  const handleCheckboxChange3 = (
    params: CheckboxRendererParams<DummyDataType3>,
    checked: boolean | 'indeterminate'
  ) => {
    const targetField = params.colDef.field;

    if (!params.data || !targetField || !isSelectableField3(targetField)) {
      return;
    }

    const nextValue = checked === true;

    setRowData3((prevRows) =>
      prevRows.map((row) => (row.id === params.data?.id ? { ...row, [targetField]: nextValue } : row))
    );
  };

  const createCheckboxCellRenderer = <TData extends { type: string | number }>(
    onChange: (params: CheckboxRendererParams<TData>, checked: boolean | 'indeterminate') => void
  ) => {
    // '승환' 행은 체크박스, 해약환급금/예정이율 행은 DualSplitCellRenderer, 일반 행은 문자열/숫자 값 표시
    const CheckboxCellRenderer = (params: CheckboxRendererParams<TData>) => {
      if (isSwitchoverRow(params.data)) {
        return (
          <div className="flex w-full justify-center">
            <Checkbox
              checked={isCheckedValue(params.value)}
              color="primary"
              onCheckedChange={(checked) => onChange(params, checked)}
              size="lg"
              variant="noneText"
            >
              단일
            </Checkbox>
          </div>
        );
      }

      if (isMainRefundRow(params.data) || isMainInterestRateRow(params.data)) {
        return <DualSplitCellRenderer {...params} />;
      }

      return getValueWithUnit(params.data, params.value);
    };

    CheckboxCellRenderer.displayName = 'CheckboxCellRenderer';

    return CheckboxCellRenderer;
  };

  const checkboxRenderer = createCheckboxCellRenderer(handleCheckboxChange);
  const checkboxRenderer2 = createCheckboxCellRenderer(handleCheckboxChange2);
  const checkboxRenderer3 = createCheckboxCellRenderer(handleCheckboxChange3);

  const keepSwitchoverRowAtBottom = (params: PostSortRowsParams<DummyDataType3>) => {
    for (let index = params.nodes.length - 1; index >= 0; index -= 1) {
      const rowNode = params.nodes[index];

      if (!isSwitchoverRow(rowNode.data)) {
        continue;
      }

      params.nodes.splice(index, 1);
      params.nodes.push(rowNode);
    }
  };

  // value1 탭의 타사기존 컬럼 팩토리
  const createMainExternalColumn = (
    field: 'externalInsurance1' | 'externalInsurance2',
    colId?: string
  ): ColDef<DummyDataType> => ({
    headerName: '타사기존',
    colId: colId || `v1_${field}`,
    headerClass: '[&_.ag-header-cell-text]:font-bold',
    cellClass: getExternalCellClass,
    width: attributeColumnWidth(249),
    minWidth: attributeColumnWidth(249),
    maxWidth: attributeColumnWidth(249),
    field,
    editable: ({ data }) =>
      data ? isEditableTargetRow(data.type) && !isMainRefundRow(data) && !isMainInterestRateRow(data) : false,
    cellRenderer: checkboxRenderer,
    autoHeight: true,
    wrapText: true,
  });

  // value3 탭의 타사기존 컬럼 팩토리 (헤더 삭제 버튼 포함)
  const createThirdExternalColumn = (field: ExtraSelectableField, colId?: string): ColDef<DummyDataType3> => ({
    headerName: '타사기존',
    colId: colId || `v3_${field}`,
    headerComponent: ThirdGridHeaderWithDelete,
    headerClass: '[&_.ag-header-cell-text]:font-bold ',
    cellClass: (params) =>
      params.data && (isMainRefundRow(params.data) || isMainInterestRateRow(params.data))
        ? '!p-0 !m-0 !h-full flex items-center justify-center editable-cell text-[#006ff2]'
        : `${getSelectableValueCellClass(params)} editable-cell text-[#006ff2]`,
    width: attributeColumnWidth(249),
    minWidth: attributeColumnWidth(249),
    maxWidth: attributeColumnWidth(249),
    field,
    editable: ({ data }) => isType3EditableRow(data) && !isMainRefundRow(data) && !isMainInterestRateRow(data),
    cellEditorSelector: getType3CellEditorSelector,
    cellEditorParams: {
      mode: 'range',
    },
    cellRenderer: checkboxRenderer3,
    autoHeight: true,
    wrapText: true,
  });

  // value1: 승환계약정보 컬럼
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '구분',
      colId: 'v1_type',
      width: attributeColumnWidth(140),
      minWidth: attributeColumnWidth(140),
      maxWidth: attributeColumnWidth(140),
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
      width: attributeColumnWidth(220),
      minWidth: attributeColumnWidth(220),
      maxWidth: attributeColumnWidth(220),
      headerClass: '[&_.ag-header-cell-text]:font-bold',
      cellClass: getValueCellClass,
      field: 'ourInsurance1',
      pinned: 'left',
      autoHeight: true,
      wrapText: true,
    },
    {
      headerName: '당사기존',
      colId: 'v1_ourInsurance2',
      width: attributeColumnWidth(249),
      minWidth: attributeColumnWidth(249),
      maxWidth: attributeColumnWidth(249),
      headerClass: '[&_.ag-header-cell-text]:font-bold',
      cellClass: getExternalCellClass,
      cellClassRules: externalInsuranceCellClassRules,
      flex: 1,
      field: 'ourInsurance2',
      cellRenderer: checkboxRenderer,
      autoHeight: true,
      wrapText: true,
    },
    createMainExternalColumn('externalInsurance1', 'v1_externalInsurance1'),
    createMainExternalColumn('externalInsurance2', 'v1_externalInsurance2'),
  ];
  // value2: 정상계약정보 컬럼
  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '구분',
      colId: 'v2_type',
      width: attributeColumnWidth(140),
      minWidth: attributeColumnWidth(140),
      maxWidth: attributeColumnWidth(140),
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
      width: attributeColumnWidth(220),
      minWidth: attributeColumnWidth(220),
      maxWidth: attributeColumnWidth(220),
      headerClass: '[&_.ag-header-cell-text]:font-bold',
      cellClass: getValueCellClass,
      field: 'ourInsurance1',
      pinned: 'left',
      autoHeight: true,
      wrapText: true,
    },
    {
      headerName: '당사기존',
      colId: 'v2_ourInsurance2',
      width: attributeColumnWidth(249),
      minWidth: attributeColumnWidth(249),
      maxWidth: attributeColumnWidth(249),
      headerClass: '[&_.ag-header-cell-text]:font-bold',
      cellClass: getExternalCellClass,
      cellClassRules: externalInsuranceCellClassRules,
      field: 'ourInsurance2',
      cellRenderer: checkboxRenderer2,
      autoHeight: true,
      wrapText: true,
    },
    {
      headerName: '타사기존',
      colId: 'v2_externalInsurance1',
      width: attributeColumnWidth(249),
      minWidth: attributeColumnWidth(249),
      maxWidth: attributeColumnWidth(249),
      headerClass: '[&_.ag-header-cell-text]:font-bold',
      cellClass: getExternalCellClass,
      cellClassRules: externalInsuranceCellClassRules,
      field: 'externalInsurance1',
      editable: ({ data }) =>
        data ? isEditableTargetRow(data.type) && !isMainRefundRow(data) && !isMainInterestRateRow(data) : false,
      cellRenderer: checkboxRenderer2,
      autoHeight: true,
      wrapText: true,
    },
  ];
  // value3: 추가계약정보 컬럼
  const columnDefs3: ColDef<DummyDataType3>[] = [
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
      minWidth: attributeColumnWidth(220),
      headerClass: '[&_.ag-header-cell-text]:font-bold',
      cellClass: getValueCellClass,
      field: 'ourInsurance1',
      pinned: 'left',
      autoHeight: true,
      wrapText: true,
    },
    createThirdExternalColumn('externalInsurance1', 'v3_externalInsurance1'),
    createThirdExternalColumn('externalInsurance2', 'v3_externalInsurance2'),
    createThirdExternalColumn('externalInsurance3', 'v3_externalInsurance3'),
    createThirdExternalColumn('externalInsurance4', 'v3_externalInsurance4'),
  ];

  // 탭 선택값에 따라 그리드를 분기 렌더링
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
                <AgGridReact<DummyDataType>
                  getRowId={(params) => `tab1-${params.data.id}`}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData}
                  columnDefs={columnDefs}
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
                <AgGridReact<DummyDataType2>
                  getRowId={(params) => `tab2-${params.data.id}`}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
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
                <AgGridReact<DummyDataType3>
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
              {active === 'value3' ? (
                <>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>
                    불러오기
                  </Button>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>
                    타사승환추가
                  </Button>
                </>
              ) : null}
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
