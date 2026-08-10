/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type {
  CellClassParams,
  ICellRendererParams,
  ColDef,
  GridApi,
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
import { Divider, Gcol, Grow, Typo, Grid } from '@atoms';
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
import { PaperIcon, ResetIcon, SizeIcon, SizeOffIcon } from '@icons';
import { LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';

import { dummyData } from '../data/ltpa35002bData';
import type { DummyDataType } from '../data/ltpa35002bData';
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

interface Ltpa35002Props {
  onSelectPlan?: (planId: number) => void;
  isWidthExpanded?: boolean;
  setIsWidthExpanded?: (value: boolean) => void;
}

export function Ltpa35002b({ onSelectPlan, isWidthExpanded = false, setIsWidthExpanded }: Ltpa35002Props) {
  // =====================
  // 상태 및 참조 관리
  // =====================
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);
  const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false, reset: false });
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [rowData, setRowData] = useState<AgGridRow[]>(dummyData);
  const pendingSelectIdRef = useRef<string | number | null>(null);
  const gridApiRef = useRef<GridApi<AgGridRow> | null>(null);
  const prevSelectedIdsRef = useRef<Set<string | number>>(new Set());
  const [coverageName, _setCoverageName] = useState('');
  const coverageNameRef = useRef(coverageName);

  const setCoverageName = useCallback((value: string) => {
    _setCoverageName(value);
    coverageNameRef.current = value;
  }, []);

  // =====================
  // 핸들러/콜백
  // =====================
  const handleCheckedChange = useCallback(
    (key: string) => (checked: boolean | 'indeterminate') => {
      setCheckedMap((map) => ({ ...map, [key]: !!checked }));
    },
    []
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
    refreshColumns: ['field5', 'field6', 'rowCopy'],
  });

  // 셀 클릭 시 선택 토글(입력/버튼 클릭은 유지) 공통 핸들러
  const handleGridCellClickToggle = useMemo(() => createCellClickSelectionToggleHandler<AgGridRow>(), []);

  // groupEditableButtonRenderer의 시그니처(ICellRendererParams)에 맞추기 위한 number formatter 어댑터
  const numberCellRenderer = useCallback(
    (params: ICellRendererParams<AgGridRow>) =>
      numberValueFormatter(params as unknown as ValueFormatterParams<AgGridRow>),
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

  const handleCellValueChanged = useCallback((params: CellValueChangedEvent<AgGridRow>) => {
    const { data, colDef, newValue } = params;
    if (!colDef.field) return;
    setRowData((prev) =>
      prev.map((row) => (row.id === data.id ? { ...row, [colDef.field as string]: newValue } : row))
    );
  }, []);

  // ---------------------------------------------------
  // ColDef 태아
  const columnDefs: ColDef<AgGridRow>[] = useMemo(
    () => [
      {
        headerName: '속성',
        field: 'field2',
        width: attributeColumnWidth(30),
        cellClass: 'text-center',
        cellRenderer: searchButtonRenderer,
        resizable: false,
      },
      {
        headerName: '가입금액(만원)',
        headerComponent: () => <HeaderWithUnit label="가입금액" unit="(만원)" col={true} />,
        field: 'insuredAmount',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: () => 'text-right editable-cell [&_input]:text-right',
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
        cellRenderer: groupEditableButtonRenderer<AgGridRow>(getExpiryRenderer, numberCellRenderer),
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
        headerName: '보험료(만원)',
        headerGroupComponent: () => <HeaderWithUnit label="보험료" unit="(만원)" />,
        children: [
          {
            headerName: '출생전',
            field: 'field4',
            flex: 1,
            minWidth: attributeColumnWidth(60),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<AgGridRow>,
          },
          {
            headerName: '출생후',
            field: 'field4b',
            flex: 1,
            minWidth: attributeColumnWidth(60),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<AgGridRow>,
          },
        ],
      },
      {
        headerName: '만기',
        children: [
          {
            headerName: '출생전',
            flex: 1,
            minWidth: attributeColumnWidth(60),
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
              values: [
                '01개월',
                '02개월',
                '03개월',
                '04개월',
                '05개월',
                '06개월',
                '07개월',
                '08개월',
                '09개월',
                '10개월',
                '11개월',
                '12개월',
                '무제한',
              ],
            },
            cellRenderer: getExpiryRenderer('left'),
          },
          {
            headerName: '출생후',
            field: 'field5b',
            flex: 1,
            minWidth: attributeColumnWidth(60),
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
              values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'],
            },
            cellRenderer: getExpiryRenderer('left'),
          },
        ],
      },
      {
        headerName: '납기',
        children: [
          {
            headerName: '출생후',
            field: 'field6',
            width: attributeColumnWidth(70),
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
              values: ['5년', '10년', '15년', '20년', '25년', '30년', '35년', '전기납'],
            },
            cellRenderer: getExpiryRenderer('left'),
          },
        ],
      },
      {
        headerName: 'UW예상',
        headerComponent: () => <HeaderWithUnit label="UW" unit="예상" className="flex-row-reverse" />,
        field: 'field8',
        flex: 1,
        minWidth: attributeColumnWidth(50),
        cellClass: 'text-center px-0! tracking-tighter',
        cellRenderer: uwIconRenderer,
      },
      {
        headerName: '중복',
        field: 'rowCopy',
        width: attributeColumnWidth(30),
        cellRenderer: duplicateRenderer,
        resizable: false,
        sortable: false,
        suppressMovable: true,
      },
    ],
    [attributeColumnWidth, duplicateRenderer, getExpiryRenderer, numberCellRenderer]
  );

  return (
    <Grid className="w-full grid-rows-[minmax(0,1fr)_auto]">
      <LayoutMainBody>
        <LayoutScrollWrap
          className={`${!isHeightExpanded ? 'grid-rows-[auto_auto_1fr]' : 'grid-rows-[auto_1fr]'} gap-0`}
        >
          <Gcol variant={'box-round-b'} placement={'ss'} className={`w-full ${!isHeightExpanded ? '' : 'hidden'}`}>
            <Grow gap={1.5} placement={'bwc'}>
              <Grow gap={2}>
                <Button variant={'contained'} color={'coolgray-light'} size={'md'}>
                  <PaperIcon />
                  보장패키지
                </Button>
                <Divider dir="col" />

                <CheckboxGroup
                  className="gap-[0.4rem] flex-wrap type-small"
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
                    { label: '기타', value: '8' },
                  ].map((category) => (
                    <CheckboxGroupItem key={category.value} value={category.value}>
                      {category.label}
                    </CheckboxGroupItem>
                  ))}
                </CheckboxGroup>
                <Divider dir="col" />

                <CheckboxGroup
                  className="gap-[0.4rem] flex-nowrap shrink-0 type-small"
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
          <Grow placement={'bwc'} className="gap-1 w-full pb-1 mt-3">
            <TextSelectChange
              items={[
                [
                  { checked: false, label: '100세만기', value: '100세만기' },
                  { checked: true, label: '30세만기', value: '30세만기' },
                ],
                [
                  { checked: false, label: '20년납입', value: '20년납입' },
                  { checked: true, label: '30년납입', value: '30년납입' },
                ],
                [
                  { checked: false, label: '월납', value: '월납' },
                  { checked: true, label: '연납', value: '연납' },
                ],
                [
                  { checked: false, label: '20년 갱신', value: '20년 갱신' },
                  { checked: true, label: '30년 갱신', value: '30년 갱신' },
                ],
                [
                  { checked: false, label: '1형', value: '1형' },
                  { checked: true, label: '2형', value: '2형' },
                ],
              ]}
            />
            <Grow className="gap-2.5">
              {/* M1. 담보초기화 삭제 */}
              <Checkbox>플랜기본값</Checkbox>
              <Grow className="gap-1">
                <NativeSelect aria-label="플랜 선택" width={140} size={'sm'} readOnly={false} required={false}>
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
                {/* M1. 토글 시 아이콘 변경 추가 */}
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
                getRowId={(params) => String(params.data.id)} // 그리드 행 식별자로 고유한 ID 지정
                singleClickEdit={true} // 한 번의 클릭만으로 즉시 편집 모드로 전환
                onCellValueChanged={handleCellValueChanged} // 편집 종료 후 최종 변경 값이 확정되었을 때 React 상태(rowData) 동기화
                // 2. 다중 행 선택 설정
                rowSelection={{
                  mode: 'multiRow' as const, // 다중 선택 모드 활성화
                  checkboxes: true, // 선택 열에 체크박스 노출
                  headerCheckbox: false, // 헤더 영역의 전체 선택 체크박스는 비활성화
                  enableClickSelection: false, // 일반 셀 영역을 클릭했을 때 행이 바로 선택되는 현상 방지
                  enableSelectionWithoutKeys: true, // Ctrl/Shift 키 조합 없이 클릭만으로 행 누적 다중 선택 지원
                }}
                // 3. 커스텀 클릭 핸들링 & 선택 열(Selection Column) 제어
                onCellClicked={handleGridCellClickToggle} // 셀 클릭 시, 잠금 행이 아니면 체크박스를 활성화/비활성화 시켜주는 토글 핸들러
                selectionColumnDef={{
                  // 체크박스가 위치한 컬럼의 커스텀 설정
                  width: 30, // 컬럼 가로 크기 지정
                  // pinned: 'left',
                  cellClass: 'text-center p-0!',
                  cellClassRules: {
                    // locked 속성이 있는 기본 필수 담보의 경우 체크박스 클릭(선택 해제)이 불가능하도록 CSS로 차단
                    'pointer-events-none': (params) => !!params.data?.locked,
                  },
                }}
                // 4. 컨텍스트 및 라이프사이클 이벤트
                onSelectionChanged={handleGridSelectionChanged} // 선택 상태가 달라졌을 때 (필수 잠금행 강제 유지 및 타 컬럼 갱신 등) 후처리 콜백
                onGridReady={handleGridReady} // 그리드가 최초 로딩을 끝마쳐 API 참조를 저장할 수 있을 때 호출
                context={{
                  // 커스텀 셀 렌더러(cellRenderer)에서 React 상태값 및 제어 함수를 공유하여 쓸 수 있도록 Context 객체 전달
                  coverageName,
                  setCoverageName,
                  showProductNameTooltip,
                  onShowProductNameTooltipChange: (checked: boolean | 'indeterminate') =>
                    setShowProductNameTooltip(checked === true),
                  checkedMap,
                  onCheckedChange: handleCheckedChange,
                }}
                // 5. 호버 및 툴팁 관리
                suppressRowHoverHighlight={false} // 마우스 오버 시 행 강조 활성화
                tooltipShowDelay={0} // 마우스가 닿으면 즉시 툴팁 생성
                tooltipHideDelay={9999} // 툴팁의 가시 시간을 최대로 유지
                tooltipMouseTrack={true} // 마우스 커서를 따라 툴팁이 움직이도록 설정
                // 6. 부모-자식 관계 표현 (Tree Data 모드)
                treeData={true} // 그리드 내에서 계층형 트리 데이터를 표현하도록 설정
                getDataPath={(row) => row.filePath?.map(String) ?? []} // 데이터 내 파일 경로 배열 정보를 기준으로 트리 구조 매핑
                groupDefaultExpanded={0} // 기본적으로 모든 트리 노드를 닫아둠 (0레벨만 노출)
                getRowClass={(params) => (params.data?.isError ? 'isError' : '')} // 비즈니스 유효성 에러가 발생한 행에 CSS 클래스 부여
                // 7. 자동 트리 그룹 컬럼 정의 (Auto Group Column Definition)
                autoGroupColumnDef={{
                  headerComponent: AgGridProductNameHeader, // 담보명 헤더를 위한 커스텀 헤더 렌더러
                  field: 'id',
                  flex: 10,
                  cellClass: (_) => 'text-left !p-0',
                  cellRenderer: productNameCellRenderer, // 트리 화살표와 텍스트를 커스터마이징한 렌더러
                  tooltipValueGetter: (params) => params.data?.title ?? '', // 마우스 호버 시 툴팁으로 풀네임 담보명 출력
                }}
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
      <LayoutMainFoot>
        {/* M1. variant="box" 추가 FormTable className 수정 */}
        <MainBottom variant="box">
          <MainBottomItem className="pl-0! pb-0! pt-0!">
            <FormTable
              className="relative w-full! [&_tr]:justify-between [&_th]:overflow-hidden [&_th]:border-b [&_td]:border-b after:[content-['']! after:absolute after:top-[50%] after:left-0 after:w-[calc(100%+1.2rem)] after:h-px after:bg-[var(--color-gray-15)]"
              lineTop={false}
              variant={'bottom'}
              cols={[
                'min-w-[9.3rem]',
                'min-w-[14.4rem]',
                'w-[25%]',
                'min-w-[8rem]',
                'w-[20%]',
                'min-w-[8rem]',
                'w-[20%]',
                'min-w-[8rem]',
                'w-[20%]',
              ]}
            >
              <FormRow className="overflow-hidden h-[4.5rem]">
                <FormCell
                  tdNone={true}
                  className="bg-(--color-primary-10)! rounded-tl-[1rem]!"
                  title={
                    <Typo variant="body-sm" weight={'bold'} className="pl-[1rem]">
                      출생<b className="text-[#FF5C2E]">전</b>
                    </Typo>
                  }
                />
                <FormCell title="환급금" className="pl-3!">
                  <Grow className="w-full flex justify-end">
                    <Input type="tel" commaAmount={true} size={'md'} value={100000} width={'full'} readOnly={true} />
                  </Grow>
                </FormCell>
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
                    value={100000}
                    size={'md'}
                    width={'full'}
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
              <FormRow className="overflow-hidden">
                <FormCell
                  className="bg-(--color-primary-10)!"
                  tdNone={true}
                  title={
                    <Grow>
                      <Typo variant="body-sm" weight={'bold'} className="pl-[1rem]">
                        출생<b className="text-[#FF5C2E]">후</b>
                      </Typo>
                      <Button variant={'outlined'} color={'gray'} size={'sm'}>
                        설명
                      </Button>
                    </Grow>
                  }
                />
                <FormCell
                  className="pl-3! "
                  title={
                    <Grow placement="sc">
                      만기금(환급률)
                      <Button variant={'outlined'} color={'gray'} size={'sm'}>
                        예상
                      </Button>
                    </Grow>
                  }
                >
                  <Grid className="grid-cols-[1fr_auto_auto] gap-1 w-full">
                    <Input
                      type="tel"
                      commaAmount={true}
                      value={100000}
                      width={'full'}
                      size={'md'}
                      readOnly={true}
                      className="[&_input]:text-right [&_input]:tracking-[-0.03rem] [&_input]:color-[#000]!"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <>
                          <Input
                            type="text"
                            commaAmount={true}
                            value={39.4}
                            size={'md'}
                            width={60}
                            className="[&_input]:text-right shrink-0 cursor-pointer"
                          />
                          %
                        </>
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
                        value={Number(100000).toLocaleString()}
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
                    size={'md'}
                    value={100000}
                    width={'full'}
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
                        value={0}
                        clear={true}
                        size={'md'}
                        width={'full'}
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
            <Grow className="gap-1">
              <Button variant={'outlined'} color={'gray'} size={'xl'}>
                담보전환
              </Button>
              <Button variant={'outlined'} color={'gray'} size={'xl'}>
                상품비교설계
              </Button>
              <Button variant={'outlined'} color={'gray'} size={'xl'}>
                동일상품복사
              </Button>
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
    </Grid>
  );
}
