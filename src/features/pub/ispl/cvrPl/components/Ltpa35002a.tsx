/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

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
  uwIconRenderer,
} from '@grid/CellRenderers';

import { HeaderWithUnit, AgGridProductNameHeader } from '@grid/HeadRenderers';
import { ResetIcon, SizeIcon, SizeOffIcon } from '@icons';
import { LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
// Shared AgGrid generic utilities & cell renderers
import { dummyData } from '../data/ltpa35002aData';
import type { DummyDataType } from '../data/ltpa35002aData';
import { useGridReadyHandler } from '../hooks/useGridReadyHandler';
import { useGridSelectionChangedHandler } from '../hooks/useGridSelectionChangedHandler';
import { useHandleSelectionChanged } from '../hooks/useHandleSelectionChanged';
import { editableCellClassRules, ensureLockedRowsSelected } from '../utils/agGridUtils';
import '@/shared/lib/agGridPub';

type AgGridRow = DummyDataType & {
  isDuplicate?: boolean;
  displayNo?: number;
  badge?: string[];
  locked?: boolean;
  isHighlighted?: boolean;
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

export type AgGridRow35002a = AgGridRow;

interface Ltpa35002Props {
  onSelectPlan?: (planId: number) => void;
  isWidthExpanded?: boolean;
  setIsWidthExpanded?: (value: boolean) => void;
  rowData?: AgGridRow[];
  setRowData?: React.Dispatch<React.SetStateAction<AgGridRow[]>>;
}

export function Ltpa35002a({
  onSelectPlan,
  isWidthExpanded = false,
  setIsWidthExpanded,
  rowData: externalRowData,
  setRowData: externalSetRowData,
}: Ltpa35002Props) {
  // =====================
  // 상태 및 참조 관리
  // =====================
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [internalRowData, setInternalRowData] = useState<AgGridRow[]>(() => dummyData);
  const rowData = externalRowData ?? internalRowData;
  const setRowData = externalSetRowData ?? setInternalRowData;

  // 전체 보험료(field7) 합계 계산
  const totalPremium = useMemo(() => {
    return rowData
      .filter((row) => row.isChecked)
      .reduce((sum, row) => {
        const val = Number(row.field7);
        return sum + (isNaN(val) ? 0 : val);
      }, 0);
  }, [rowData]);

  const pendingSelectIdRef = useRef<string | number | null>(null);
  const gridApiRef = useRef<GridApi<AgGridRow> | null>(null);
  const prevSelectedIdsRef = useRef<Set<string | number>>(new Set());

  // 담보명 헤더 렌더러
  const [coverageName, _setCoverageName] = useState('');
  const coverageNameRef = useRef(coverageName);

  const setCoverageName = useCallback((value: string) => {
    _setCoverageName(value);
    coverageNameRef.current = value;
  }, []);

  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);

  const handleShowProductNameTooltipChange = useCallback((checked: boolean | 'indeterminate') => {
    setShowProductNameTooltip(checked === true);
  }, []);

  // 해쉬 필터 상태 및 핸들러
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const selectedHashtagsRef = useRef(selectedHashtags);

  const handleHashtagChange = useCallback((hashtags: string[]) => {
    setSelectedHashtags(hashtags);
    selectedHashtagsRef.current = hashtags;
    gridApiRef.current?.onFilterChanged();
  }, []);

  const isExternalFilterPresent = useCallback(() => {
    return selectedHashtagsRef.current.length > 0;
  }, []);

  const doesExternalFilterPass = useCallback((node: any) => {
    if (selectedHashtagsRef.current.length === 0) return true;
    const badges = node.data?.badge || [];
    return selectedHashtagsRef.current.some((tag) => badges.includes(tag));
  }, []);

  // 그리드 Context 객체 메모이제이션 (인라인 객체 생성 방지)
  const gridContext = useMemo(
    () => ({
      coverageName,
      setCoverageName,
      showProductNameTooltip,
      onShowProductNameTooltipChange: handleShowProductNameTooltipChange,
      selectedHashtags,
      onHashtagChange: handleHashtagChange,
    }),
    [
      coverageName,
      setCoverageName,
      showProductNameTooltip,
      handleShowProductNameTooltipChange,
      selectedHashtags,
      handleHashtagChange,
    ]
  );

  // =====================
  // 공용 유틸리티/셀 렌더러
  // =====================
  // 만기/납기 컬럼에서 재사용하는 셀 렌더러 팩토리(정렬값만 주입)
  const getExpiryRenderer = createExpiryCellRenderer<AgGridRow>;

  // 행 추가/복제 시 setState + 선택 유지(pending id 재선택)를 한 번에 처리하는 래퍼
  const rowDataWithTracking = useCallback(
    (updater: AgGridRow[] | ((prev: AgGridRow[]) => AgGridRow[])) => {
      rowDataWithTrackingFactory<AgGridRow>(setRowData, pendingSelectIdRef)(updater);
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

  // 중복 버튼 렌더러: id 생성/복제 row 가공/표시 조건을 주입해 공통 팩토리 생성
  const duplicateRenderer = useMemo(() => {
    return createInsertCopiedRowButtonCellRenderer<AgGridRow, 'id'>(rowDataWithTracking, {
      idKey: 'id',
      getNextId: getNextNumericRowId,
      patchCopiedRow: patchCopiedDuplicateRow,
      isVisible: (params) => params.data?.rowCopy === true && params.data?.isDuplicate !== true, //복제된 행 중복버튼 안보이게
      ariaLabel: '동일 담보 추가',
    });
  }, [rowDataWithTracking]);

  // 단일 선택 id를 부모로 전달하는 기본 selection 핸들러
  const handleSelectionChanged = useHandleSelectionChanged<AgGridRow, number>('id', onSelectPlan);

  // 선택/해제 시 잠금행 보정 + 중복행 정리 + 관련 컬럼 강제 refresh를 수행하는 통합 핸들러
  const handleGridSelectionChanged = useGridSelectionChangedHandler<AgGridRow>({
    ensureLockedRowsSelected,
    setRowData,
    prevSelectedIdsRef,
    handleSelectionChanged,
    onSelectedIdsChange: (selectedIds) => {
      prevSelectedIdsRef.current = selectedIds;
    },
    refreshColumns: ['field5', 'field6', 'rowCopy'], // 만기/납기/중복 버튼 컬럼 강제 refresh
  });

  // 신규 생성 직후 pending id가 있으면 먼저 선택 상태를 복구하고 공통 selection 핸들러를 실행
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

  // 셀 클릭 시 선택 토글(입력/버튼 클릭은 유지) 공통 핸들러
  const handleGridCellClickToggle = useMemo(() => createCellClickSelectionToggleHandler<AgGridRow>(), []);

  // groupEditableButtonRenderer의 시그니처(ICellRendererParams)에 맞추기 위한 number formatter 어댑터
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
      flex: 20,
      cellClass: 'text-left !p-0',
      cellRenderer: productNameCellRenderer<AgGridRow>,
      tooltipValueGetter: (params: { data?: AgGridRow }) => params.data?.title ?? '',
    }),
    []
  );

  // onGridReady 시 잠금/기본선택 보정을 수행하고 api ref를 저장
  const gridReadyHandler = useGridReadyHandler<AgGridRow>(ensureLockedRowsSelected);
  const handleGridReady = useCallback(
    (params: { api: GridApi<AgGridRow> }) => {
      gridApiRef.current = params.api;
      gridReadyHandler(params);
    },
    [gridReadyHandler]
  );

  const handleCellValueChanged = useCallback(
    (params: CellValueChangedEvent<AgGridRow>) => {
      const { data, colDef, newValue } = params;
      if (!colDef.field) return;
      setRowData((prev) =>
        prev.map((row) => (row.id === data.id ? { ...row, [colDef.field as string]: newValue } : row))
      );
    },
    [setRowData]
  );

  const [cellWidth, setCellWidth] = useState([30, 70, 74, 70, 80, 64, 50, 30]);

  // --- 그리드 컬럼 정의 (인보험 뷰) ---
  // M5. 순서변경
  const columnDefs: ColDef<AgGridRow>[] = useMemo(
    () => [
      {
        headerName: '속성',
        field: 'field2',
        width: attributeColumnWidth(cellWidth[0]),
        cellClass: 'text-center',
        cellRenderer: searchButtonRenderer<AgGridRow>,
        resizable: false,
        sortable: false,
      },
      {
        headerName: '가능금액',
        // unSortIcon: true,
        field: 'field4',
        flex: 1,
        minWidth: attributeColumnWidth(cellWidth[1]),
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter<AgGridRow>,
      },
      {
        headerName: '가입금액(만원)',
        headerComponent: HeaderWithUnit,
        headerComponentParams: {
          label: '가입금액',
          unit: '(만원)',
        },
        sortable: true,
        field: 'insuredAmount',
        flex: 1,
        minWidth: attributeColumnWidth(cellWidth[2]),
        cellClass: 'text-right editable-cell [&_input]:text-right',
        cellClassRules: {
          'style-select': (params) => !!params.data?.isSelectedInsuredAmount,
          isStandardGroup: (params) => !!(params.data?.isStandard?.group && !params.data?.isStandard?.edit),
          isStandard: (params) => !!params.data?.isStandard?.edit,
          'tooltip-on': (params) => !!params.data?._tooltipOn,
        },
        cellEditorSelector: (params: EditableCallbackParams): CellEditorSelectorResult | undefined => {
          if (params.data?.isStandard?.group && !params.data?.isStandard?.edit) {
            return undefined;
          }
          const isSelectedInsuredAmount = params.data?.isSelectedInsuredAmount ?? false;
          if (!isSelectedInsuredAmount) {
            return {
              component: AmountWithPopoverCellEditor,
              params: {
                step: 100, //입력단위 100만원
              },
            };
          } else {
            const baseOptions = ['1천만원', '2천만원', '3천만원', '5천만원', '1억원'];
            return {
              component: 'agSelectCellEditor',
              params: { values: baseOptions },
            };
          }
        },
        cellRenderer: groupEditableRenderer,
        editable: (params: EditableCallbackParams) => {
          // 그룹이면서 편집 불가면 에디터 비활성화
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
        minWidth: attributeColumnWidth(cellWidth[3]),
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter<AgGridRow>,
      },
      {
        headerName: '만기',
        field: 'field5',
        flex: 1,
        minWidth: attributeColumnWidth(cellWidth[4]),
        // width: attributeColumnWidth[7],
        cellClassRules: editableCellClassRules<AgGridRow>(),
        cellClass: (params: CellClassParams<AgGridRow>) => {
          const base = 'px-[0.2rem]! tracking-tighter';
          return params.data?.isEditedField5 === true ? base : `${base} no-edited`;
        },
        editable: (params: EditableCallbackParams) => {
          return params.data?.isEditedField5 === true;
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['05년만기', '20세만기', '100세만기', '무제한'],
        },
        cellRenderer: getExpiryRenderer('left'),
      },
      {
        headerName: '납기',
        field: 'field6',
        flex: 1,
        minWidth: attributeColumnWidth(cellWidth[5]),
        cellClassRules: editableCellClassRules<AgGridRow>(),
        cellClass: (params: CellClassParams<AgGridRow>) => {
          const base = 'px-[0.2rem]! tracking-tighter';
          return params.data?.isEditedField6 === true ? base : `${base} no-edited`;
        },
        editable: (params: EditableCallbackParams) => {
          return params.data?.isEditedField6 === true;
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['5년납', '10년납', '15년납', '20년납', '25년납', '30년납', '35년납', '전기납'],
        },
        cellRenderer: getExpiryRenderer('left'),
      },

      {
        headerName: 'UW예상',
        headerComponent: HeaderWithUnit,
        headerComponentParams: {
          label: 'UW',
          unit: '예상',
          className: 'flex-row-reverse',
        },
        sortable: true,
        field: 'field8',
        flex: 1,
        minWidth: attributeColumnWidth(cellWidth[6]),
        // width: attributeColumnWidth[6],
        cellClass: 'text-center px-0! tracking-tighter',
        cellRenderer: uwIconRenderer,
      },
      {
        headerName: '중복',
        field: 'rowCopy',
        width: attributeColumnWidth(cellWidth[7]),
        cellRenderer: duplicateRenderer,
        resizable: false,
        sortable: false,
        suppressMovable: true,
      },
    ],
    [attributeColumnWidth, duplicateRenderer, getExpiryRenderer, groupEditableRenderer]
  );
  return (
    <Grid className="w-full grid-rows-[minmax(0,1fr)_auto]">
      <LayoutMainBody className="ltpa35002a-LayoutMainBody">
        <LayoutScrollWrap
          className={`${!isHeightExpanded ? 'grid-rows-[auto_auto_1fr]' : 'grid-rows-[auto_1fr]'} gap-0`}
        >
          <Gcol variant={'box-round-b'} placement={'ss'} className={`w-full ${!isHeightExpanded ? '' : 'hidden'}`}>
            <Grow className="gap-[0.2rem]" placement={'bwc'}>
              <Grow className="gap-[0.6rem]" placement={'sc'}>
                <Button variant={'contained'} color={'coolgray-light'} size={'md'}>
                  보장패키지
                </Button>
                <Divider dir="col" color="primary-light" />

                <CheckboxGroup
                  className="gap-[0.2rem] flex-wrap type-small"
                  color="primary"
                  size="lg"
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
                  className="gap-[0.2rem] flex-nowrap shrink-0 type-small"
                  color="primary"
                  size="lg"
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
          <Grow placement={'bwc'} className="gap-1 w-full pb-1 mt-3 flex-wrap">
            <TextSelectChange
              items={[
                [
                  { checked: true, label: '100세만기', value: '100세만기' },
                  { checked: false, label: '30세만기', value: '30세만기' },
                ],
                [
                  { checked: true, label: '20년납입', value: '20년납입' },
                  { checked: false, label: '30년납입', value: '30년납입' },
                ],
                [
                  { checked: true, label: '월납', value: '월납' },
                  { checked: false, label: '연납', value: '연납' },
                ],
                [
                  { checked: true, label: '20년 갱신', value: '20년 갱신' },
                  { checked: false, label: '30년 갱신', value: '30년 갱신' },
                ],
                [
                  { checked: true, label: '1형', value: '1형' },
                  { checked: false, label: '2형', value: '2형' },
                ],
              ]}
            />
            <Grow className="gap-2.5">
              <Checkbox>플랜기본값</Checkbox>
              <Grow className="gap-1">
                <NativeSelect aria-label="플랜 선택" width={120} size={'sm'} readOnly={false} required={false}>
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
                      content: ['(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)'],
                    },
                    {
                      value: 'item-3',
                      trigger: '모집자플랜(0)',
                      content: ['(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)'],
                    },
                  ]}
                />
                <Button
                  variant={'outlined'}
                  color={'gray'}
                  only={'icon'}
                  onClick={() => setIsHeightExpanded(!isHeightExpanded)}
                >
                  {isHeightExpanded ? (
                    <SizeOffIcon size={16} color="var(--color-secondary-50)" className="rotate-90" />
                  ) : (
                    <SizeIcon size={16} color="var(--color-secondary-50)" className="rotate-90" />
                  )}
                </Button>
                <Button
                  variant={'outlined'}
                  color={'gray'}
                  only={'icon'}
                  onClick={() => setIsWidthExpanded?.(!isWidthExpanded)}
                >
                  {isWidthExpanded ? (
                    <SizeOffIcon size={16} color="var(--color-secondary-50)" />
                  ) : (
                    <SizeIcon size={16} color="var(--color-secondary-50)" />
                  )}
                </Button>
              </Grow>
            </Grow>
          </Grow>
          <LayoutScrollItem>
            <div
              className={`tooltip-hidden-toggle ag-theme-alpine ${showProductNameTooltip ? ' show-product-tooltip' : ''}`}
            >
              <AgGridReact<AgGridRow>
                // 1. 데이터 및 기본 구성
                rowData={rowData} // 그리드에 렌더링할 데이터 목록
                columnDefs={columnDefs} // 컬럼 정의 구조 객체
                getRowId={getRowId} // 그리드 행 식별자로 고유한 ID 지정
                singleClickEdit={true} // 한 번의 클릭만으로 즉시 편집 모드로 전환
                onCellValueChanged={handleCellValueChanged} // 편집 종료 후 최종 변경 값이 확정되었을 때 React 상태(rowData) 동기화
                isExternalFilterPresent={isExternalFilterPresent}
                doesExternalFilterPass={doesExternalFilterPass}
                // 2. 다중 행 선택 설정
                rowSelection={ROW_SELECTION}
                // 3. 커스텀 클릭 핸들링 & 선택 열(Selection Column) 제어
                onCellClicked={handleGridCellClickToggle} // 셀 클릭 시, 잠금 행이 아니면 체크박스를 활성화/비활성화 시켜주는 토글 핸들러
                selectionColumnDef={selectionColumnDef}
                // 4. 컨텍스트 및 라이프사이클 이벤트
                context={gridContext}
                onSelectionChanged={onSelectionChanged} // 선택 상태가 달라졌을 때 (필수 잠금행 강제 유지 및 타 컬럼 갱신 등) 후처리 콜백
                onGridReady={handleGridReady} // 그리드가 최초 로딩을 끝마쳐 API 참조를 저장할 수 있을 때 호출
                // 5. 호버 및 툴팁 관리
                suppressRowHoverHighlight={false} // 마우스 오버 시 행 강조 활성화
                tooltipShowDelay={0} // 마우스가 닿으면 즉시 툴팁 생성
                tooltipHideDelay={9999} // 툴팁의 가시 시간을 최대로 유지
                tooltipMouseTrack={true} // 마우스 커서를 따라 툴팁이 움직이도록 설정
                // 6. 부모-자식 관계 표현 (Tree Data 모드)
                treeData={true} // 그리드 내에서 계층형 트리 데이터를 표현하도록 설정
                getDataPath={getDataPath} // 데이터 내 파일 경로 배열 정보를 기준으로 트리 구조 매핑
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

      <LayoutMainFoot className="ltpa35002a-LayoutMainFoot">
        <MainBottom variant="box">
          <MainBottomItem className="!pt-0">
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
                  <Grid className="grid-cols-[1fr_auto_auto] gap-1 w-full place-items-center">
                    <Input
                      type="tel"
                      commaAmount={true}
                      value={0}
                      size={'md'}
                      readOnly={true}
                      className="[&_input]:text-right [&_input]:tracking-[-0.03rem] [&_input]:color-[#000]!"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <span className="inline-flex items-center gap-1">
                          <Input
                            type="text"
                            commaAmount={true}
                            value={0}
                            size={'md'}
                            width={44}
                            className="[&_input]:text-right shrink-0 cursor-pointer"
                          />
                          %
                        </span>
                      </PopoverTrigger>
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
                <FormCell title="보장보험료">
                  <Popover>
                    <PopoverTrigger className="w-full">
                      <Input
                        type="tel"
                        commaAmount={true}
                        value={'121,375'}
                        size={'md'}
                        readOnly={true}
                        className="[&_input]:text-right [&_input]:tracking-[-0.03rem] [&_input]:color-[#000]!"
                      />
                    </PopoverTrigger>
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
                <FormCell title="적립보험료">
                  <Input
                    type="tel"
                    commaAmount={true}
                    value={0}
                    width={'full'}
                    size={'md'}
                    readOnly={true}
                    className="text-right"
                  />
                </FormCell>

                <FormCell title="합계보험료">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Input
                        type="tel"
                        commaAmount={true}
                        value={totalPremium}
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
          <MainBottomItem>
            <Button variant={'outlined'} color={'gray'} size={'xl'}>
              고지유형별보험료비교
            </Button>
            <Grow className="gap-1">
              <Button variant={'outlined'} color={'gray'} size={'xl'}>
                담보전환
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={'outlined'} color={'gray'} size={'xl'}>
                    상품비교설계
                  </Button>
                </TooltipTrigger>
                <TooltipContent variant="default" side="top" align="center" sideOffset={-1}>
                  상품/계약형태로 비교설계가 가능합니다.
                </TooltipContent>
              </Tooltip>
              <Button variant={'outlined'} color={'gray'} size={'xl'}>
                동일상품복사
              </Button>
              <Button type="button" variant={'contained'} color={'primary'} size={'xl'}>
                보험료계산(지침)
              </Button>
            </Grow>
          </MainBottomItem>
        </MainBottom>
      </LayoutMainFoot>
    </Grid>
  );
}
