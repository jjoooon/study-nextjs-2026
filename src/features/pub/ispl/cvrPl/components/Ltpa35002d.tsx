/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

/**
 * @file Ltpa35002d.tsx
 * @description 한화손해보험 장기보험 상품설계 화면에서 담보(Coverage)를 조회, 선택 및 가입금액/보험료 등을 설계하는 Ag-Grid 기반의 인보험 담보 설계 컴포넌트입니다.
 *
 * 주요 설계 요구사항:
 * 1. Ag-Grid의 Tree Data 모드를 사용하여 담보를 계층형(부모-자식) 구조로 시각화
 * 2. 필수 담보(locked: true)에 대한 선택 해제 방지 및 로킹 보정 로직 구현
 * 3. 가입금액에 대한 인풋 팝업 에디터(AmountWithPopoverCellEditor) 및 셀렉트 에디터 분기 제공
 * 4. 동일 담보 복제(행 추가) 시, 포커스 및 스크롤, 선택 상태 보정을 위한 비동기 트래킹
 * 5. 만기/납기 컬럼에 대한 수정 가능 여부(isEditedField5, 6) 조건부 제어
 */

import type {
  CellClassParams,
  ICellRendererParams,
  ColDef,
  GridApi,
  SelectionChangedEvent,
  EditableCallbackParams,
  CellEditorSelectorResult,
  ValueFormatterParams,
  CellValueChangedEvent,
  SuppressKeyboardEventParams,
  ValueParserParams,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  createCellClickSelectionToggleHandler,
  createInsertCopiedRowButtonCellRenderer,
  getNextNumericRowId,
  numberValueFormatter,
  patchCopiedDuplicateRow,
  rowDataWithTrackingFactory,
  useDynamicColumnWidths,
  AgGridEmptyComponent,
  AmountWithPopoverCellEditor,
} from '@aggrid';
import { Divider, Gcol, Grow, Grid } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { KeyValueList } from '@common/KeyValueList';
import { LayoutScrollItem, LayoutScrollWrap } from '@common/LayoutScroll';
import { TextSelectChange } from '@common/TextSelectChange';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { MyPlanSelect } from '@features/MyPlanSelect';
import {
  createExpiryCellRenderer,
  groupEditableButtonRenderer,
  productNameCellRenderer,
  searchButtonRenderer,
} from '@grid/CellRenderers';
import { HeaderWithUnit, AgGridProductNameHeader } from '@grid/HeadRenderers';
import { PaperIcon, ResetIcon, SizeIcon, SizeOffIcon } from '@icons';
import { LayoutMain, LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { dummyData } from '../data/ltpa35002dData';
import type { DummyDataType } from '../data/ltpa35002dData';
import { useGridReadyHandler } from '../hooks/useGridReadyHandler';
import { useGridSelectionChangedHandler } from '../hooks/useGridSelectionChangedHandler';
import { useHandleSelectionChanged } from '../hooks/useHandleSelectionChanged';
import { editableCellClassRules, ensureLockedRowsSelected } from '../utils/agGridUtils';

import '@/shared/lib/agGridPub';

/**
 * Ag-Grid 행 데이터 타입 정의
 * 더미 데이터 타입인 DummyDataType에 화면 렌더링 및 비즈니스 제어를 위한 확장 필드를 추가로 정의합니다.
 */
type AgGridRow = DummyDataType & {
  isDuplicate?: boolean; // 동일 담보 추가 기능을 통해 복제된 행인지 여부
  displayNo?: number; // 그리드 화면 상에 표시되는 번호
  badge?: string[]; // 담보명 옆에 표시되는 라벨/배지 목록
  locked?: boolean; // 필수 담보 여부 (선택 상태가 상시 유지되며 해제 불가)
  isHighlighted?: boolean; // 로우 강조 하이라이트 여부
};

// 렌더링 성능 최적화를 위해 불변 설정 및 순수 함수는 컴포넌트 외부로 분리
const ROW_SELECTION = {
  mode: 'multiRow' as const,
  checkboxes: true,
  headerCheckbox: false,
  enableClickSelection: false,
  enableSelectionWithoutKeys: true,
};

const getDataPath = (row: AgGridRow) => row.filePath?.map(String) ?? [];
const getRowClass = (params: { data?: AgGridRow }) => (params.data?.isError ? 'isError' : '');
const getRowId = (params: { data: AgGridRow }) => String(params.data.id);

const SelectionClearHeader = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant={'text'}
        color={'gray'}
        className="justify-center flex items-center gap-1 w-full text-[var(--color-gray-100)]"
      >
        해제
      </Button>
    </TooltipTrigger>
    <TooltipContent variant="default" side="top" align="start" sideOffset={-4}>
      담보 모두 해제
    </TooltipContent>
  </Tooltip>
);

export type AgGridRow35002d = AgGridRow;

/**
 * Ltpa35002d 컴포넌트의 Props 인터페이스
 */
interface Ltpa35002Props {
  onSelectPlan?: (planId: number) => void; // 플랜 선택 시 부모 컴포넌트(상위 설계 페이지)로 변경된 플랜 ID를 알리는 콜백 함수
  isWidthExpanded?: boolean; // 설계 영역의 가로 너비 확장 상태값
  setIsWidthExpanded?: (value: boolean) => void; // 가로 너비 확장 상태 변경 함수
  rowData?: AgGridRow[];
  setRowData?: React.Dispatch<React.SetStateAction<AgGridRow[]>>;
}

export function Ltpa35002d({
  onSelectPlan,
  isWidthExpanded = false,
  setIsWidthExpanded,
  rowData: externalRowData,
  setRowData: externalSetRowData,
}: Ltpa35002Props) {
  // =====================
  // 상태 및 참조 관리 (State & Refs)
  // =====================

  // 그리드 상단의 필터 영역(보장패키지 등) 접기/펼치기 토글 상태 (true 시 필터가 숨겨지고 테이블 영역 확장)
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);

  // 체크박스 그룹 필터 상태 관리 (선택됨/미선택됨/초기화 등)
  const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false, reset: false });

  // 담보명 컬럼 내부의 상품 설명 툴팁 표시 제어 상태
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);

  const handleShowProductNameTooltipChange = useCallback((checked: boolean | 'indeterminate') => {
    setShowProductNameTooltip(checked === true);
  }, []);

  // 해상도나 레이아웃 너비에 따라 열 가로폭을 비율(rem 단위를 기준)로 조절하기 위한 커스텀 훅
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 그리드에 바인딩되어 실시간 렌더링될 행 데이터 배열 상태
  const [internalRowData, setInternalRowData] = useState<AgGridRow[]>(dummyData);
  const rowData = externalRowData ?? internalRowData;
  const setRowData = externalSetRowData ?? setInternalRowData;

  // 신규 행이 추가/복제되었을 때, 렌더링 사이클 이후 강제로 Selection 상태를 주입해주기 위해 보관하는 임시 ID Ref
  const pendingSelectIdRef = useRef<string | number | null>(null);

  // AgGridReact 컴포넌트 인스턴스 API를 담아두기 위한 참조 객체 (동적 선택/스크롤/셀 포커싱에 사용)
  const gridApiRef = useRef<GridApi<AgGridRow> | null>(null);

  // 이전 선택 상태(체크된 ID 목록)를 저장하여 상태 변동 비교 및 선택 복구 로직에 사용하기 위한 Set
  const prevSelectedIdsRef = useRef<Set<string | number>>(new Set());

  // 선택된 담보명 상태
  const [coverageName, _setCoverageName] = useState('');
  const coverageNameRef = useRef(coverageName);

  // context 전송용 담보명 변경 콜백 (React State와 Ref를 동시에 일관성 있게 업데이트)
  const setCoverageName = useCallback((value: string) => {
    _setCoverageName(value);
    coverageNameRef.current = value;
  }, []);

  // =====================
  // 핸들러/콜백 (Handlers & Callbacks)
  // =====================

  // 상단 필터 항목들의 체크/언체크 상태 변화 핸들러
  const handleCheckedChange = useCallback(
    (key: string) => (checked: boolean | 'indeterminate') => {
      setCheckedMap((map) => ({ ...map, [key]: !!checked }));
    },
    []
  );

  // 그리드 Context 객체 메모이제이션
  const gridContext = useMemo(
    () => ({
      coverageName,
      setCoverageName,
      showProductNameTooltip,
      onShowProductNameTooltipChange: handleShowProductNameTooltipChange,
      checkedMap,
      onCheckedChange: handleCheckedChange,
    }),
    [
      coverageName,
      setCoverageName,
      showProductNameTooltip,
      handleShowProductNameTooltipChange,
      checkedMap,
      handleCheckedChange,
    ]
  );

  // =====================
  // 공용 유틸리티/셀 렌더러 (Helper Functions & Custom Renderers)
  // =====================

  // 만기/납기 셀 렌더링 시 UI 스타일(정렬값 등)을 지정하여 반환하는 팩토리 함수 호출
  const getExpiryRenderer = createExpiryCellRenderer<AgGridRow>;

  /**
   * [중요] 행 데이터 변경 및 포커스 복구 헬퍼 함수
   */
  const rowDataWithTracking = useCallback(
    (updater: AgGridRow[] | ((prev: AgGridRow[]) => AgGridRow[])) => {
      // 1. 공통 팩토리 유틸리티를 호출해 데이터 업데이트 및 펜딩 ID 설정
      rowDataWithTrackingFactory<AgGridRow>(setRowData, pendingSelectIdRef)(updater);

      // 2. 비동기 렌더링 이후 다음 마이크로태스크에서 선택 상태 보정 적용
      setTimeout(() => {
        if (pendingSelectIdRef.current && gridApiRef.current) {
          const node = gridApiRef.current.getRowNode(String(pendingSelectIdRef.current));
          if (node && !node.isSelected()) {
            node.setSelected(true);
          }
        }
      }, 0);
    },
    [setRowData, pendingSelectIdRef]
  );

  /**
   * [중요] 동일 담보 추가 복제 버튼 셀 렌더러
   */
  const duplicateRenderer = useMemo(() => {
    return createInsertCopiedRowButtonCellRenderer<AgGridRow, 'id'>(rowDataWithTracking, {
      idKey: 'id',
      getNextId: getNextNumericRowId,
      patchCopiedRow: patchCopiedDuplicateRow,
      isVisible: (params) => params.data?.rowCopy === true && params.data?.isDuplicate !== true, // 이미 복제된 행에는 추가 복제 버튼이 안 보이도록 차단
      ariaLabel: '동일 담보 추가',
    });
  }, [rowDataWithTracking]);

  // 그리드 내 단일/다중 행 선택 시 변경된 플랜 또는 담보 ID를 상위 컴포넌트(onSelectPlan)로 발송하는 훅
  const handleSelectionChanged = useHandleSelectionChanged<AgGridRow, number>('id', onSelectPlan);

  /**
   * [중요] 다중 행 선택 통합 처리 핸들러
   */
  const handleGridSelectionChanged = useGridSelectionChangedHandler<AgGridRow>({
    ensureLockedRowsSelected,
    setRowData,
    prevSelectedIdsRef,
    handleSelectionChanged,
    onSelectedIdsChange: (selectedIds) => {
      prevSelectedIdsRef.current = selectedIds;
    },
    refreshColumns: ['field5', 'field6', 'rowCopy'],
  });

  /**
   * Ag-Grid rowSelection 이벤트 발생 시 호출되는 최종 콜백
   */
  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent<AgGridRow>) => {
      if (pendingSelectIdRef.current !== null) {
        const node = event.api.getRowNode(String(pendingSelectIdRef.current));
        if (node && !node.isSelected()) {
          node.setSelected(true);
        }
        pendingSelectIdRef.current = null;
      }
      handleGridSelectionChanged(event);
    },
    [handleGridSelectionChanged]
  );

  // 셀 영역 클릭 시 체크박스 선택/해제 상태를 토글하는 핸들러
  const handleGridCellClickToggle = useMemo(() => createCellClickSelectionToggleHandler<AgGridRow>(), []);

  // groupEditableButtonRenderer 내에서 보험료 포맷팅 시 사용할 숫자 천단위 콤마 포맷터 어댑터
  const numberCellRenderer = useCallback(
    (params: ICellRendererParams<AgGridRow>) =>
      numberValueFormatter(params as unknown as ValueFormatterParams<AgGridRow>),
    []
  );

  // 그룹 편집 버튼 렌더러 메모이제이션
  const groupEditableRenderer = useMemo(
    () => groupEditableButtonRenderer<AgGridRow>(getExpiryRenderer, numberCellRenderer),
    [getExpiryRenderer, numberCellRenderer]
  );

  // 체크박스 선택 컬럼 정의 메모이제이션
  const selectionColumnDef = useMemo(
    () => ({
      headerComponent: SelectionClearHeader,
      width: attributeColumnWidth(30),
      cellClass: 'text-center p-0! editable-cell',
      cellClassRules: {
        'pointer-events-none': (params: CellClassParams<AgGridRow>) => !!params.data?.locked,
      },
    }),
    [attributeColumnWidth]
  );

  // 자동 트리 그룹 컬럼 정의 메모이제이션
  const autoGroupColumnDef = useMemo(
    () => ({
      headerName: '담보명',
      headerComponent: AgGridProductNameHeader,
      field: 'id' as const,
      flex: 107,
      cellClass: 'text-left !p-0',
      cellRenderer: productNameCellRenderer<AgGridRow>,
      tooltipValueGetter: (params: { data?: AgGridRow }) => params.data?.title ?? '',
    }),
    []
  );

  const gridReadyHandler = useGridReadyHandler<AgGridRow>(ensureLockedRowsSelected);
  const handleGridReady = useCallback(
    (params: { api: GridApi<AgGridRow> }) => {
      gridApiRef.current = params.api;
      gridReadyHandler(params);
    },
    [gridReadyHandler]
  );

  /**
   * 그리드 내 에디터를 통해 셀 값이 수정되었을 때 React 상태(rowData)에 변경 사항을 동기화하는 핸들러
   */
  const handleCellValueChanged = useCallback((params: CellValueChangedEvent<AgGridRow>) => {
    const { data, colDef, newValue } = params;
    if (!colDef.field) return;
    setRowData((prev) =>
      prev.map((row) => (row.id === data.id ? { ...row, [colDef.field as string]: newValue } : row))
    );
  }, []);

  // --- 그리드 컬럼 정의 (인보험 뷰) ---
  const columnDefs: ColDef<AgGridRow>[] = useMemo(
    () => [
      {
        headerName: '속성',
        field: 'field2',
        width: attributeColumnWidth(30), // 화면 너비 및 rem 비율에 맞춰 동적으로 계산된 가로 폭
        cellClass: 'text-center',
        cellRenderer: searchButtonRenderer<AgGridRow>, // 특정 담보의 속성/특징 정보를 볼 수 있는 돋보기 검색 버튼 렌더러
        resizable: false,
      },
      {
        headerName: '가입금액(만원)',
        headerComponent: HeaderWithUnit,
        headerComponentParams: {
          label: '가입금액',
          unit: '(만원)',
        },
        field: 'insuredAmount',
        flex: 1,
        minWidth: attributeColumnWidth(74),
        cellClass: 'text-right editable-cell [&_input]:text-right',
        cellClassRules: {
          // 셀 조건에 따라 다르게 지정할 CSS 스타일 규칙 매핑
          'style-select': (params) => !!params.data?.isSelectedInsuredAmount, // 리스트 선택식 금액 입력일 때 테두리 스타일
          isStandardGroup: (params) => !!(params.data?.isStandard?.group && !params.data?.isStandard?.edit), // 수정 불가 기본형 담보 그룹 스타일
          isStandard: (params) => !!params.data?.isStandard?.edit, // 수정 가능 담보 스타일
          'tooltip-on': (params) => !!params.data?._tooltipOn, // 툴팁 활성화 상태 스타일
        },
        cellEditorSelector: (params: EditableCallbackParams): CellEditorSelectorResult | undefined => {
          // 1. 담보 그룹 기준값이면서 개별 수정을 막아야 하는 경우엔 에디터를 띄우지 않음 (undefined 반환)
          if (params.data?.isStandard?.group && !params.data?.isStandard?.edit) {
            return undefined;
          }
          const isSelectedInsuredAmount = params.data?.isSelectedInsuredAmount ?? false;

          // 2. 가입금액 입력 방식을 슬라이더/인풋 팝업(AmountWithPopoverCellEditor) 또는 단순 콤보박스(agSelectCellEditor)로 이원화
          if (!isSelectedInsuredAmount) {
            return {
              component: AmountWithPopoverCellEditor, // 금액 증감 버튼(+/-) 및 직접 수치 입력을 허용하는 팝업 에디터
              params: { step: 10 }, // 금액 증감시 조절할 기본 단위값 (10만원 단위)
            };
          } else {
            const baseOptions = ['1천만원', '2천만원', '3천만원', '5천만원', '1억원'];
            return {
              component: 'agSelectCellEditor', // Ag-Grid 내장 콤보박스 에디터
              params: { values: baseOptions },
            };
          }
        },
        // 가입금액 전용 셀 렌더러 (만기 표시 렌더러 및 포맷팅용 천단위 콤마 포맷터 지정)
        cellRenderer: groupEditableRenderer,
        editable: (params: EditableCallbackParams) => {
          // 그룹 담보이면서 편집 불가능한 행은 셀 편집 비활성화
          if (params.data?.isStandard?.group && !params.data?.isStandard?.edit) {
            return false;
          }
          return true;
        },
        // [중요] 편집 모드 중 ag-Grid의 기본 키보드 이벤트 인터셉트 비활성화
        // 셀에 텍스트 인풋을 입력하는 중 Enter, Backspace, 화살표 키 등을 누를 때
        // ag-Grid가 기본 그리드 네비게이션 동작(포커스 이동 및 편집 세션 파괴)을 방지합니다.
        suppressKeyboardEvent: (params: SuppressKeyboardEventParams) => {
          return params.editing;
        },
        // [중요] 사용자가 입력한 문자열을 순수 숫자값으로 파싱하여 ag-Grid 데이터에 바인딩
        valueParser: (params: ValueParserParams) => {
          const val = params.newValue;
          if (val === null || val === undefined || val === '') return 0;
          // 한글('만원' 등)이나 콤마(,) 등 숫자가 아닌 특수문자를 제거하고 파싱
          const parsed = Number(String(val).replace(/[^\d.-]/g, ''));
          return isNaN(parsed) ? 0 : parsed;
        },
      },
      {
        headerName: '보험료(원)',
        headerComponent: HeaderWithUnit,
        headerComponentParams: {
          label: '보험료',
          unit: '(원)',
        },
        sortable: true,
        field: 'field7',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter<AgGridRow>, // 보험료에 천단위 콤마(,) 렌더링 포맷팅 적용
      },
      {
        headerName: '만기',
        field: 'field5',
        flex: 1,
        minWidth: attributeColumnWidth(64),
        cellClassRules: editableCellClassRules<AgGridRow>(),
        cellClass: (params: CellClassParams<AgGridRow>) => {
          const base = 'tracking-tighter';
          // 만기 수정이 불가능한 로우(isEditedField5 !== true)인 경우 스타일 제어용 클래스명 부여
          return params.data?.isEditedField5 === true ? `${base} editable-cell` : `${base} no-edited`;
        },
        editable: (params: EditableCallbackParams) => {
          // 개별 데이터에 'isEditedField5' 속성이 true로 설정된 행만 편집 가능하도록 락 제어
          return params.data?.isEditedField5 === true;
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'],
        },
        cellRenderer: getExpiryRenderer('left'), // 좌측 정렬 만기 렌더러
      },
      {
        headerName: '납기',
        field: 'field6',
        flex: 1,
        minWidth: attributeColumnWidth(64),
        cellClassRules: editableCellClassRules<AgGridRow>(),
        cellClass: (params: CellClassParams<AgGridRow>) => {
          const base = 'tracking-tighter';
          // 납기 수정이 불가능한 로우(isEditedField6 !== true)인 경우 스타일 제어용 클래스명 부여
          return params.data?.isEditedField6 === true ? `${base} editable-cell` : `${base} no-edited`;
        },
        editable: (params: EditableCallbackParams) => {
          // 개별 데이터에 'isEditedField6' 속성이 true로 설정된 행만 편집 가능하도록 락 제어
          return params.data?.isEditedField6 === true;
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['5년', '10년', '15년', '20년', '25년', '30년', '35년', '전기납'],
        },
        cellRenderer: getExpiryRenderer('left'), // 좌측 정렬 납기 렌더러
      },
      {
        headerName: '중복',
        field: 'rowCopy',
        width: attributeColumnWidth(30),
        cellRenderer: duplicateRenderer, // 동일 담보를 추가/복제해주는 중복 행 생성기 버튼 셀 렌더러
        resizable: false,
        sortable: false,
        suppressMovable: true,
      },
    ],
    [attributeColumnWidth, duplicateRenderer, getExpiryRenderer, groupEditableRenderer]
  );

  //보장패키지 선택여부에 따라
  const [is보장패키지, set보장패키지] = useState(false);

  return (
    <Gcol>
      {/* 전체 화면 레이아웃: 상단 필터(가변), 본문 그리드, 하단 요약/액션 영역 */}
      <LayoutMain
        className={`grid w-full  ${!isHeightExpanded ? 'grid-rows-[auto_1fr_auto]' : 'grid-rows-[1fr_auto]'} gap-[1rem] h-full`}
      >
        {/* M1. 간격 및 위치 수정 */}
        <Gcol variant={'box-round-b'} placement={'ss'} className={`w-full ${!isHeightExpanded ? '' : 'hidden'}`}>
          <Grow className="gap-[0.2rem]" placement={'bwc'}>
            <Grow className="gap-[0.6rem]" placement={'sc'}>
              <Button variant={'contained'} color={is보장패키지 ? 'primary' : 'coolgray-light'} size={'md'}>
                <PaperIcon />
                보장패키지
              </Button>
              <Divider dir="col" color="primary-light" />

              <CheckboxGroup
                className="gap-[0.2rem] flex-wrap"
                color="primary"
                size="md"
                icon={false}
                variant="button"
                width="auto"
              >
                {[
                  { label: '사망후유', value: '0' },
                  { label: '진단비', value: '1' },
                  { label: '입원/통원', value: '2' },
                  { label: '수술/치료', value: '3' },
                  { label: '골절/화상', value: '4' },
                  { label: '검사/지원', value: '5' },
                  { label: '운전/비용', value: '6' },
                  { label: '재물/배상', value: '7' },
                  { label: '어린이', value: '9' },
                  { label: '기타', value: '8' },
                ].map((category) => (
                  <CheckboxGroupItem key={category.value} value={category.value}>
                    {category.label}
                  </CheckboxGroupItem>
                ))}
              </CheckboxGroup>
              <Divider dir="col" color="primary-light" />

              <CheckboxGroup
                className="gap-[0.2rem] flex-nowrap shrink-0"
                color="primary"
                size="md"
                icon={false}
                variant="button"
                width="auto"
              >
                {[
                  { label: '갱신', value: '1' },
                  { label: '비갱신', value: '2' },
                ].map((category) => (
                  <CheckboxGroupItem key={category.value} value={category.value}>
                    {category.label}
                  </CheckboxGroupItem>
                ))}
              </CheckboxGroup>
            </Grow>
            <Grow placement={'ec'}>
              <Button variant={'outlined'} only="icon" color={'gray'} size={'lg'}>
                <ResetIcon color="var(--color-gray-50)" />
              </Button>
            </Grow>
          </Grow>
        </Gcol>
        {/* //M1. 간격 및 위치 수정 */}

        <LayoutMainBody>
          <LayoutScrollWrap className="grid-rows-[auto_1fr]">
            <Grow placement={'bwc'} className="gap-1 w-full pb-1">
              <TextSelectChange
                items={[
                  [
                    { checked: false, label: '100세만기', value: '100세만기' },
                    { checked: true, label: '30세만기', value: '30세만기' },
                  ],
                  [
                    { checked: false, label: '월납', value: '월납' },
                    { checked: true, label: '연납', value: '연납' },
                  ],
                ]}
              />
              <Grow className="gap-2.5">
                {/* M1. 담보초기화 삭제 */}
                <Checkbox>플랜기본값</Checkbox>
                <Grow className="gap-1">
                  {/* 즉시 적용 가능한 기본 플랜 프리셋 선택 */}
                  <NativeSelect aria-label="플랜 선택" width={140} size={'sm'} readOnly={true} required={false}>
                    {[
                      { label: '플랜 선택', value: 'planA' },
                      { label: '올인원플랜(15~89세)', value: 'planB' },
                      { label: '플1형(355간편고지형)(프리미엄올인원플랜)(1.7189형)(15~80세)', value: 'planC' },
                    ].map((option) => (
                      <NativeSelectOption key={option.value} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <MyPlanSelect
                    readOnly={true}
                    items={[
                      {
                        value: 'item-1',
                        trigger: '기관플랜(5)',
                        content: [
                          '(지점)올인원플랜(15~40세)',
                          '(지점)올인원플랜(15~40세)',
                          '(지점)올인원플랜(15~40세)',
                          '(지점)올인원플랜(15~40세)',
                        ],
                      },
                      {
                        value: 'item-2',
                        trigger: '기관플랜(0)',
                        content: [
                          '(지점)올인원플랜(15~40세)',
                          '(지점)올인원플랜(15~40세)',
                          '(지점)올인원플랜(15~40세)',
                        ],
                      },
                      {
                        value: 'item-3',
                        trigger: '모집자플랜(0)',
                        content: [
                          '(지점)올인원플랜(15~40세)',
                          '(지점)올인원플랜(15~40세)',
                          '(지점)올인원플랜(15~40세)',
                        ],
                      },
                    ]}
                  />

                  {/* M1. 토글 시 아이콘 변경 추가 */}
                  {/* 상단 필터 영역 높이 토글: 접기/펼치기 */}
                  <Button
                    variant={'outlined'}
                    color={'gray'}
                    size={'md'}
                    only={'icon'}
                    onClick={() => setIsHeightExpanded(!isHeightExpanded)}
                  >
                    {isHeightExpanded ? (
                      <SizeOffIcon size={16} color="var(--color-secondary-50)" className="rotate-90" />
                    ) : (
                      <SizeIcon size={16} color="var(--color-secondary-50)" className="rotate-90" />
                    )}
                  </Button>
                  {/* 본문 설계 영역 가로폭 토글: 좌우 확장/복원 */}
                  <Button
                    variant={'outlined'}
                    color={'gray'}
                    size={'md'}
                    only={'icon'}
                    onClick={() => setIsWidthExpanded?.(!isWidthExpanded)}
                  >
                    {isWidthExpanded ? (
                      <SizeOffIcon size={16} color="var(--color-secondary-50)" />
                    ) : (
                      <SizeIcon size={16} color="var(--color-secondary-50)" />
                    )}
                  </Button>
                  {/* //M1. 토글 시 아이콘 변경 추가 */}
                </Grow>
              </Grow>
            </Grow>
            <LayoutScrollItem>
              <div
                className={`tooltip-hidden-toggle ag-theme-alpine${showProductNameTooltip ? ' show-product-tooltip' : ''}`}
              >
                <AgGridReact<AgGridRow>
                  // 1. 데이터 및 기본 구성
                  rowData={rowData} // 그리드에 렌더링할 데이터 목록
                  columnDefs={columnDefs} // 컬럼 정의 구조 객체
                  getRowId={getRowId} // 그리드 행 식별자로 고유한 ID 지정 (복제/선택 복원 정확도 보장)
                  singleClickEdit={true} // 한 번의 클릭만으로 즉시 편집 모드로 전환
                  onCellValueChanged={handleCellValueChanged} // 편집 종료 후 최종 변경 값이 확정되었을 때 React 상태(rowData) 동기화
                  // 2. 다중 행 선택 설정
                  rowSelection={ROW_SELECTION}
                  // 3. 커스텀 클릭 핸들링 & 선택 열(Selection Column) 제어
                  onCellClicked={handleGridCellClickToggle} // 셀 클릭 시, 잠금 행이 아니면 체크박스를 활성화/비활성화 시켜주는 토글 핸들러
                  selectionColumnDef={selectionColumnDef}
                  // 4. 컨텍스트 및 라이프사이클 이벤트
                  onSelectionChanged={onSelectionChanged} // 선택 상태가 달라졌을 때 (필수 잠금행 강제 유지 및 타 컬럼 갱신 등) 후처리 콜백
                  onGridReady={handleGridReady} // 그리드가 최초 로딩을 끝마쳐 API 참조를 저장할 수 있을 때 호출
                  context={gridContext}
                  // 5. 호버 및 툴팁 관리
                  suppressRowHoverHighlight={false} // 마우스 오버 시 행 강조 활성화
                  tooltipShowDelay={0} // 마우스가 닿으면 즉시 툴팁 생성
                  tooltipHideDelay={9999} // 툴팁의 가시 시간을 최대로 유지
                  tooltipMouseTrack={true} // 마우스 커서를 따라 툴팁이 움직이도록 설정
                  // 6. 부모-자식 관계 표현 (Tree Data 모드)
                  treeData={true} // 그리드 내에서 계층형 트리 데이터를 표현하도록 설정
                  getDataPath={getDataPath} // 데이터 내 filePath 배열을 경로로 사용해 부모-자식 트리 노드 구성
                  groupDefaultExpanded={0} // 기본적으로 모든 트리 노드를 닫아둠 (0레벨만 노출)
                  getRowClass={getRowClass} // 비즈니스 유효성 에러가 발생한 행에 CSS 클래스 부여
                  // 7. 자동 트리 그룹 컬럼 정의 (Auto Group Column Definition)
                  autoGroupColumnDef={autoGroupColumnDef}
                  noRowsOverlayComponent={AgGridEmptyComponent} // 데이터가 없을 때 표시할 대체 UI 컴포넌트
                  // 8. 렌더링 성능 최적화 옵션 (대규모 데이터 및 빠른 스크롤 성능 유지)
                  suppressAnimationFrame={true} // 애니메이션 프레임 제어를 생략하여 렌더링 속도 증가
                  suppressColumnMoveAnimation={true} // 컬럼 이동 애니메이션 비활성화
                  suppressRowTransform={true} // 절대좌표(Transform) 대신 Top 스타일을 사용하여 스크롤 성능 최적화
                  animateRows={false} // 행 이동/추가 시 애니메이션 비활성화
                />
              </div>
            </LayoutScrollItem>
          </LayoutScrollWrap>
        </LayoutMainBody>

        {/* 
          화면 하단 푸터 영역 (LayoutMainFoot)
          - 만기환급금, 보장보험료, 적립보험료, 합계보험료 등 설계된 보험료의 주요 요약 금액을 표 형식(FormTable)으로 노출합니다.
          - 각 금액 셀에는 마우스 클릭 시 상세 내역(총납입보험료, 중도환급금, 최소/최대보험료 등)을 보여주는 Popover가 부착되어 있습니다.
          - 하단 버튼 영역을 통해 다른 상품과의 비교설계, 동일 상품 복사, 최종 지침 보험료 계산 요청 등을 실행합니다.
        */}
        <LayoutMainFoot>
          {/* M1. variant="box" 추가 */}
          <MainBottom variant="box">
            {/* 금액 표 영역 */}
            <MainBottomItem className="!py-0">
              <FormTable
                className="w-full! [&_tr]:justify-between"
                lineTop={false}
                variant={'bottom'}
                cols={[
                  'min-w-[9rem]',
                  'w-[25%]',
                  'min-w-[8rem]',
                  'w-[20%]',
                  'min-w-[8rem]',
                  'w-[20%]',
                  'min-w-[8rem]',
                  'w-[20%]',
                ]}
              >
                <FormRow>
                  {/* 만기금 및 환급률 표시 셀 */}
                  <FormCell
                    title={
                      <Grow placement="sc" className="whitespace-nowrap" gap={1}>
                        만기금(환급률)
                        <Button variant={'outlined'} color={'gray'} size={'sm'}>
                          예상
                        </Button>
                      </Grow>
                    }
                    style={{ borderBottom: '0.1rem solid #ccc' }}
                  >
                    <Grid className="grid-cols-[1fr_auto_auto] gap-1 w-full">
                      {/* 예상 만기 환급금 수치 인풋 */}
                      <Input
                        type="tel"
                        commaAmount={true}
                        value={100000}
                        size={'md'}
                        readOnly={true}
                        className="[&_input]:text-right [&_input]:tracking-[-0.03rem] [&_input]:color-[#000]!"
                      />
                      {/* 예상 환급률 비율 인풋 및 상세 팝오버(Popover) */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <>
                            <Input
                              type="text"
                              commaAmount={true}
                              value={39.4}
                              size={'md'}
                              width={44}
                              className="[&_input]:text-right shrink-0 cursor-pointer"
                            />
                            %
                          </>
                        </PopoverTrigger>
                        {/* 환급률 관련 총 납입/환급금 상세 명세 팝업 내용 */}
                        <PopoverContent side="top" align="end" className="max-w-[42.5rem]" closeButton={true}>
                          <KeyValueList
                            direction="col"
                            variant="amount"
                            data={[
                              { key: '총납입보험료', value: '000,000,000원' },
                              { key: '중도환급금', value: '0원' },
                              { key: '만기환급금', value: '000,000,000원' },
                            ]}
                            className="w-full"
                          />
                        </PopoverContent>
                      </Popover>
                    </Grid>
                  </FormCell>

                  {/* 보장보험료 표시 셀 */}
                  <FormCell title="보장보험료">
                    <Popover>
                      <PopoverTrigger className="w-full">
                        <Input
                          type="tel"
                          commaAmount={true}
                          value={Number(100000).toLocaleString()}
                          size={'md'}
                          readOnly={true}
                          className="[&_input]:text-right [&_input]:tracking-[-0.03rem] [&_input]:color-[#000]!"
                        />
                      </PopoverTrigger>
                      {/* 보장보험료 상세 명세 (일시납보험료 등) 팝업 내용 */}
                      <PopoverContent side="top" align="end" className="max-w-[42.5rem]" closeButton={true}>
                        <KeyValueList
                          direction="col"
                          variant="amount"
                          data={[{ key: '일시납보험료', value: '000,000,000원' }]}
                          className="w-full"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormCell>

                  {/* 적립보험료 표시 셀 */}
                  <FormCell title="적립보험료">
                    <Input
                      type="tel"
                      commaAmount={true}
                      value={100000}
                      width={'full'}
                      size={'md'}
                      readOnly={true}
                      className="text-right"
                    />
                  </FormCell>

                  {/* 합계보험료 표시 셀 (최소/최대 가이드라인 표시 팝업 연동) */}
                  <FormCell title="합계보험료">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Input
                          type="tel"
                          commaAmount={true}
                          value={0}
                          clear={true}
                          width={'full'}
                          size={'md'}
                          required={true}
                          error={false}
                          errorMsg={'계약자 입력은 필수입니다.'}
                          errorPs={'tr'}
                          className="text-right font-bold"
                        />
                      </PopoverTrigger>
                      {/* 합계보험료 가이드라인 (최소/최대 기준 보험료) 팝업 내용 */}
                      <PopoverContent side="top" align="end" className="max-w-[42.5rem]" closeButton={true}>
                        <KeyValueList
                          direction="col"
                          variant="amount"
                          data={[
                            { key: '최소 보험료', value: '000,000,000원' },
                            { key: '최대 보험료', value: '000,000,000원' },
                          ]}
                          className="w-full"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormCell>
                </FormRow>
              </FormTable>
            </MainBottomItem>

            {/* 하단 설계 실행 및 복사 관련 버튼 묶음 */}
            <MainBottomItem>
              <Grow className="gap-1">
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  상품비교설계
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  동일상품복사
                </Button>
                {/* 
                  보험료계산(지침) 버튼
                  - 폼('page2-MainForm')과 연동되어 전체 설계를 기반으로 보험료 계산 로직을 백엔드로 제출합니다.
                */}
                <Button
                  type="submit"
                  form={'page2-MainForm'}
                  variant={'contained'}
                  color={'primary'}
                  size={'xl'}
                  // onClick={onCalcGuidelineClick}
                >
                  보험료계산(지침)
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        </LayoutMainFoot>
      </LayoutMain>
    </Gcol>
  );
}
