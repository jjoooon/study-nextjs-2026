/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

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
import { ProductNameHeader } from '@grid/HeadRenderers';
import { PaperIcon, ResetIcon, SizeIcon, SizeOffIcon } from '@icons';
import { LayoutMain, LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import type {
  CellClassParams,
  ICellRendererParams,
  ColDef,
  GridApi,
  SelectionChangedEvent,
  EditableCallbackParams,
  CellEditorSelectorResult,
  ValueFormatterParams,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
// Shared AgGrid generic utilities & cell renderers
import { dummyData } from '../data/ltpa35002dData';
import type { DummyDataType } from '../data/ltpa35002dData';
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

export function Ltpa35002d({ onSelectPlan, isWidthExpanded = false, setIsWidthExpanded }: Ltpa35002Props) {
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
  const [coverageName, setCoverageName] = useState('');

  // =====================
  // 핸들러/콜백
  // =====================
  const handleCheckedChange = useCallback(
    (key: string) => (checked: boolean | 'indeterminate') => {
      setCheckedMap((map) => ({ ...map, [key]: !!checked }));
    },
    []
  );

  const productNameHeader = useCallback(
    () => (
      <ProductNameHeader
        coverageName={coverageName}
        onCoverageNameChange={setCoverageName}
        showProductNameTooltip={showProductNameTooltip}
        onShowProductNameTooltipChange={(checked) => setShowProductNameTooltip(!!checked)}
        checkedMap={checkedMap}
        onCheckedChange={handleCheckedChange}
      />
    ),
    [checkedMap, coverageName, showProductNameTooltip, handleCheckedChange]
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

  // onGridReady 시 잠금/기본선택 보정을 수행하고 api ref를 저장
  const gridReadyHandler = useGridReadyHandler<AgGridRow>(ensureLockedRowsSelected);
  const handleGridReady = useCallback(
    (params: { api: GridApi<AgGridRow> }) => {
      gridApiRef.current = params.api;
      gridReadyHandler(params);
    },
    [gridReadyHandler]
  );

  // --- 그리드 컬럼 정의 (인보험 뷰) ---
  const columnDefs: ColDef<AgGridRow>[] = useMemo(
    () => [
      {
        headerName: '속성',
        field: 'field2',
        width: attributeColumnWidth[4],
        cellClass: 'text-center',
        cellRenderer: searchButtonRenderer<AgGridRow>,
        resizable: false,
      },
      {
        headerComponent: () => (
          <Grow className="w-full" placement={'cc'} gap={0}>
            가입금액<span className="text-[1.1rem]">(만원)</span>
          </Grow>
        ),
        field: 'insuredAmount',
        width: attributeColumnWidth[9],
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
              params: { step: 10 }, // Popover에서 조정할 단위 설정
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
      },

      {
        headerName: '만기',
        // 행 선택 시에만 편집 가능 클래스 적용
        field: 'field5',
        width: attributeColumnWidth[7],
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
      {
        headerName: '납기',
        field: 'field6',
        width: attributeColumnWidth[7],
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
      {
        headerComponent: () => (
          <Grow className="w-full" placement={'cc'} gap={0}>
            보험료<span className="text-[1.1rem]">(원)</span>
          </Grow>
        ),
        field: 'field7',
        width: attributeColumnWidth[9],
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter<AgGridRow>,
      },

      {
        headerName: '중복',
        field: 'rowCopy',
        width: attributeColumnWidth[4],
        cellRenderer: duplicateRenderer,
        resizable: false,
      },
    ],
    [attributeColumnWidth, duplicateRenderer, getExpiryRenderer, numberCellRenderer]
  );

  return (
    <Gcol>
      <LayoutMain
        className={`grid w-full  ${!isHeightExpanded ? 'grid-rows-[auto_1fr_auto]' : 'grid-rows-[1fr_auto]'} gap-[1rem] h-full`}
      >
        {/* M1. 간격 및 위치 수정 */}
        <Gcol variant={'box-round'} placement={'ss'} className={`w-full ${!isHeightExpanded ? '' : 'hidden'}`}>
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
                minSelected={0}
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
                minSelected={0}
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
                <ResetIcon color="var(--color-gray-500)" />
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
                  rowData={rowData}
                  columnDefs={columnDefs}
                  getRowId={(params) => String(params.data.id)}
                  singleClickEdit={true} // 한 번의 클릭으로 편집 활성화
                  rowSelection={{
                    mode: 'multiRow' as const,
                    checkboxes: true,
                    headerCheckbox: false,
                    enableClickSelection: false,
                    enableSelectionWithoutKeys: true,
                  }}
                  onCellClicked={handleGridCellClickToggle}
                  selectionColumnDef={{
                    width: 30,
                    // pinned: 'left',
                    cellClass: 'text-center p-0!',
                    cellClassRules: {
                      'pointer-events-none': (params) => !!params.data?.locked,
                    },
                  }}
                  onSelectionChanged={onSelectionChanged}
                  onGridReady={handleGridReady}
                  // onRowDataUpdated={handleRowDataUpdated} // 제거: 시그니처 불일치로 미사용
                  suppressRowHoverHighlight={false}
                  tooltipShowDelay={0}
                  tooltipHideDelay={9999}
                  tooltipMouseTrack={true}
                  treeData={true}
                  getDataPath={(row) => row.filePath?.map(String) ?? []}
                  groupDefaultExpanded={0}
                  getRowClass={(params) => (params.data?.isError ? 'isError' : '')}
                  autoGroupColumnDef={{
                    headerComponent: productNameHeader,
                    field: 'id',
                    flex: 1,
                    cellClass: (_) => 'text-left !p-0',
                    cellRenderer: productNameCellRenderer<AgGridRow>,
                    tooltipValueGetter: (params) => params.data?.title ?? '', // 담보명 등 표시
                  }}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  suppressAnimationFrame={true}
                  suppressColumnMoveAnimation={true}
                  suppressRowTransform={true}
                  animateRows={false}
                />
              </div>
            </LayoutScrollItem>
          </LayoutScrollWrap>
        </LayoutMainBody>

        <LayoutMainFoot>
          {/* M1. variant="box" 추가 */}
          <MainBottom variant="box">
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
                  <FormCell title="만기금(환급률)" style={{ borderBottom: '0.1rem solid #ccc' }}>
                    <Grid className="grid-cols-[auto_1fr_auto_auto] gap-1 w-full">
                      <Button variant={'outlined'} color={'gray'} size={'sm'}>
                        예상
                      </Button>
                      <Input
                        type="tel"
                        commaAmount={true}
                        value={100000}
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
                              width={44}
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
                              { key: '총압입보험료', value: '000,000,000원' },
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
                        <span className="block w-full rounded-[0.4rem] h-[2.5rem] bg-[var(--color-gray-10)] px-2 text-[1.4rem] border border-[0.1rem] border-[var(--color-gray-20)] box-border tracking-[0] leading-[2.5rem] appearance-none truncate text-right cursor-pointer">
                          {Number(100000).toLocaleString()}
                        </span>
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
      </LayoutMain>
    </Gcol>
  );
}
