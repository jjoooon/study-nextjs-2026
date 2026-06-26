/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type {
  CellClassParams,
  ColDef,
  EditableCallbackParams,
  CellEditorSelectorResult,
  CellValueChangedEvent,
  SuppressKeyboardEventParams,
  ValueParserParams,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  numberValueFormatter,
  useDynamicColumnWidths,
  AgGridEmptyComponent,
  AmountWithPopoverCellEditor,
} from '@aggrid';
import { Grid, Grow, Typo, Gcol } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { KeyValueList } from '@common/KeyValueList';
import { TooltipQ } from '@common/TooltipQ';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { createExpiryCellRenderer, productNameCellRenderer, searchButtonRenderer } from '@grid/CellRenderers';
import { HeaderWithUnit, AgGridProductNameHeader } from '@grid/HeadRenderers';
import { LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@uiux/Resizable';
// Shared AgGrid generic utilities & cell renderers
import { dummyData, dummyData2 } from '../data/ltpa35002cData';
import type { DummyData2Type, DummyDataType } from '../data/ltpa35002cData';
import { editableCellClassRules } from '../utils/agGridUtils';

import '@/shared/lib/agGridPub';

type AgGridRow = DummyDataType & {
  // 행 상태 플래그 (UI 렌더링/편집 가능 여부 제어용)
  isDuplicate?: boolean;
  displayNo?: number;
  badge?: string[];
  locked?: boolean;
  isHighlighted?: boolean;
};

type AgGridRow2 = DummyData2Type & {
  // 행 상태 플래그 (UI 렌더링/편집 가능 여부 제어용)
  isDuplicate?: boolean;
  displayNo?: number;
  badge?: string[];
  locked?: boolean;
  isHighlighted?: boolean;
};

export function Ltpa35002c() {
  // =====================
  // 상태 및 참조 관리
  // =====================
  // 체크박스 토글 상태를 키-값 형태로 저장
  // (하위 셀 렌더러/헤더 렌더러와 context로 공유)
  const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false, reset: false });
  // 담보명 툴팁 전체 노출 토글 (2번째 그리드 wrapper className과 연동)
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  // 화면 폭 기반으로 컬럼 폭을 계산하는 공통 훅
  const { attributeColumnWidth } = useDynamicColumnWidths();
  // 상단(화재기본담보) 그리드 데이터
  const [rowData, setRowData] = useState<AgGridRow[]>(dummyData);
  // 하단(화재특약담보) 그리드 데이터
  const [rowData2, setRowData2] = useState<AgGridRow2[]>(dummyData2);
  // 현재 선택/포커스된 담보명 (그리드 context 공유용)
  const [coverageName, _setCoverageName] = useState('');
  // 그리드 내부 콜백에서 최신값을 즉시 참조하기 위한 ref
  // (state 업데이트 비동기 타이밍과 무관하게 현재값 접근 가능)
  const coverageNameRef = useRef(coverageName);

  // state + ref를 항상 동시에 갱신하는 setter
  // context로 내려가는 함수라 useCallback으로 참조 안정성 확보
  const setCoverageName = useCallback((value: string) => {
    _setCoverageName(value);
    coverageNameRef.current = value;
  }, []);

  // =====================
  // 핸들러/콜백
  // =====================
  // 공통 체크 상태 변경 핸들러
  // key별로 부분 업데이트하여 기존 map 상태를 유지
  const handleCheckedChange = useCallback(
    (key: string) => (checked: boolean | 'indeterminate') => {
      setCheckedMap((map) => ({ ...map, [key]: !!checked }));
    },
    []
  );

  // 상단 그리드 셀 편집값 반영
  // 변경된 행(id 기준)만 교체하여 불필요한 데이터 변형 최소화
  const handleCellValueChanged = useCallback((params: CellValueChangedEvent<AgGridRow>) => {
    const { data, colDef, newValue } = params;
    if (!colDef.field) return;
    setRowData((prev) =>
      prev.map((row) => (row.id === data.id ? { ...row, [colDef.field as string]: newValue } : row))
    );
  }, []);

  // 하단 그리드 셀 편집값 반영
  // 구조는 상단과 동일하며 데이터 소스(rowData2)만 다름
  const handleCellValueChanged2 = useCallback((params: CellValueChangedEvent<AgGridRow2>) => {
    const { data, colDef, newValue } = params;
    if (!colDef.field) return;
    setRowData2((prev) =>
      prev.map((row) => (row.id === data.id ? { ...row, [colDef.field as string]: newValue } : row))
    );
  }, []);

  // =====================
  // 공용 유틸리티/셀 렌더러
  // =====================
  // 만기/납기 컬럼에서 재사용하는 셀 렌더러 팩토리(정렬값만 주입)
  const getExpiryRenderer = createExpiryCellRenderer<AgGridRow>;

  // 상단 그리드(화재기본담보) 컬럼 정의
  // useMemo로 컬럼 객체 재생성 최소화 -> 그리드 리렌더 비용 절감
  const columnDefs: ColDef<AgGridRow>[] = useMemo(
    () => [
      {
        headerName: '부호',
        field: 'id',
        cellClass: 'text-center',
        width: attributeColumnWidth(50),
      },
      {
        headerName: '구분',
        field: 'field1',
        flex: 10,
        cellClass: 'text-left',
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
        minWidth: attributeColumnWidth(80),
        cellClass: () => 'text-right editable-cell [&_input]:text-right',
        valueFormatter: numberValueFormatter<AgGridRow>,
        cellClassRules: {
          'style-select': (params) => !!params.data?.isSelectedInsuredAmount,
          'tooltip-on': (params) => !!params.data?._tooltipOn,
        },
        cellEditorSelector: (params: EditableCallbackParams): CellEditorSelectorResult | undefined => {
          // 기준담보 그룹행이며 편집 불가 상태면 에디터 자체를 제공하지 않음
          if (params.data?.isStandard?.group && !params.data?.isStandard?.edit) {
            return undefined;
          }
          // 선택형 금액 여부에 따라 에디터를 분기
          // false: Popover 수치 조정 에디터 / true: 고정 옵션 select 에디터
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
          // 문자열(쉼표/문자 포함 가능)을 안전하게 숫자로 정규화
          // 빈값/잘못된 값은 0으로 통일하여 데이터 일관성 유지
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
        field: 'field3',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-right [&_input]:text-right',
        headerClass: 'px-0!',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter<AgGridRow>,
      },
      {
        headerName: '목적물상세',
        field: 'field4',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'editable-cell text-center',
        cellClassRules: editableCellClassRules<AgGridRow>(),
        editable: true,
      },
      {
        headerName: '수용장소상세',
        field: 'field5',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClassRules: editableCellClassRules<AgGridRow>(),
        cellClass: 'editable-cell text-center',
        editable: true,
      },
      {
        headerName: '건물내/외',
        field: 'field6',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClassRules: editableCellClassRules<AgGridRow>(),
        cellClass: (params: CellClassParams<AgGridRow>) => {
          // 편집 가능 여부를 class로 시각화(no-edited)
          const base = 'px-[0.2rem]! tracking-tighter ';
          return params.data?.isEditedField6 === true ? base : `${base} no-edited`;
        },
        editable: (params: EditableCallbackParams) => {
          return params.data?.isEditedField6 === true;
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['건물내', '건물밖야적'],
        },
        cellRenderer: getExpiryRenderer('center'),
      },
      {
        headerName: '지하수용',
        field: 'field7',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClassRules: editableCellClassRules<AgGridRow>(),
        cellClass: (params: CellClassParams<AgGridRow>) => {
          // 편집 가능 여부를 class로 시각화(no-edited)
          const base = 'px-[0.2rem]! tracking-tighter';
          return params.data?.isEditedField7 === true ? base : `${base} no-edited`;
        },
        editable: (params: EditableCallbackParams) => {
          return params.data?.isEditedField7 === true;
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['예', '아니오'],
        },
        cellRenderer: getExpiryRenderer('center'),
      },
      {
        headerName: '야적물건',
        field: 'field8',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClassRules: editableCellClassRules<AgGridRow>(),
        cellClass: (params: CellClassParams<AgGridRow>) => {
          // 편집 가능 여부를 class로 시각화(no-edited)
          const base = 'px-[0.2rem]! tracking-tighter';
          return params.data?.isEditedField8 === true ? base : `${base} no-edited`;
        },
        editable: (params: EditableCallbackParams) => {
          return params.data?.isEditedField8 === true;
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['가연성', '가연성2'],
        },
        cellRenderer: getExpiryRenderer('center'),
      },
    ],
    [attributeColumnWidth, getExpiryRenderer]
  );

  // 하단 그리드(화재특약담보) 컬럼 정의
  // 담보군/선택/담보명/속성/가입금액/보험료/만기/납기 순서
  const columnDefs2 = useMemo(
    (): ColDef<AgGridRow2>[] => [
      {
        headerName: '담보군',
        field: 'field1',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        spanRows: true,
        cellClass: (_params: CellClassParams<AgGridRow2>) => 'flex! items-center! justify-center! text-center',
      } as ColDef<AgGridRow2>,
      {
        headerName: '선택',
        field: 'isChecked',
        cellRenderer: 'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
        editable: true,
        cellClass: 'text-center editable-cell',
        width: attributeColumnWidth(30),
        cellClassRules: {
          // 잠금 행은 체크 편집 비활성화 (읽기전용 UX)
          'pointer-events-none': (params: CellClassParams<AgGridRow2>) => !!params.data?.locked,
        },
      },
      {
        headerName: '담보명',
        field: 'title',
        flex: 10,
        cellClass: 'text-left',
        headerComponent: AgGridProductNameHeader,
        cellRenderer: productNameCellRenderer,
        // 셀 툴팁에 표시할 문자열 지정 (빈값 방지)
        tooltipValueGetter: (params) => params.data?.title ?? '',
      },
      {
        headerName: '속성',
        field: 'field3',
        width: attributeColumnWidth(30),
        cellClass: 'text-center',
        cellRenderer: searchButtonRenderer,
        resizable: false,
      },
      {
        headerName: '가입금액(만원)',
        headerComponent: () => <HeaderWithUnit label="가입금액" unit="(만원)" />,
        sortable: true,
        field: 'insuredAmount',
        flex: 1,
        minWidth: attributeColumnWidth(74),
        cellClass: () => 'text-right editable-cell [&_input]:text-right',
        valueFormatter: numberValueFormatter<AgGridRow2>,
        cellClassRules: {
          // 금액 선택형 여부에 따른 스타일 분기
          'style-select': (params: CellClassParams<AgGridRow2>) => !!params.data?.isSelectedInsuredAmount,
          // 기준담보 그룹행(편집 불가) 스타일
          isStandardGroup: (params: CellClassParams<AgGridRow2>) =>
            !!(params.data?.isStandard?.group && !params.data?.isStandard?.edit),
          // 기준담보 편집 가능 행 스타일
          isStandard: (params: CellClassParams<AgGridRow2>) => !!params.data?.isStandard?.edit,
          // 커스텀 툴팁 활성화 상태
          'tooltip-on': (params: CellClassParams<AgGridRow2>) => !!params.data?._tooltipOn,
        },
        cellEditorSelector: (params: EditableCallbackParams): CellEditorSelectorResult | undefined => {
          // 기준담보 그룹행 + 편집 불가 상태면 에디터 제공 안 함
          if (params.data?.isStandard?.group && !params.data?.isStandard?.edit) {
            return undefined;
          }
          // 선택형 금액 여부에 따라 에디터 타입 전환
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
        editable: (params: EditableCallbackParams) => {
          // 그룹이면서 편집 불가면 에디터 비활성화
          if (params.data?.isStandard?.group && !params.data?.isStandard?.edit) {
            return false;
          }
          return true;
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
        valueFormatter: numberValueFormatter<AgGridRow2>,
      },
      {
        headerName: '만기',
        field: 'field5',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        cellClassRules: editableCellClassRules<AgGridRow2>(),
        cellClass: (params: CellClassParams<AgGridRow2>) => {
          // 편집 가능 여부를 class로 시각화(no-edited)
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
        cellRenderer: getExpiryRenderer('center'),
      },
      {
        headerName: '납기',
        field: 'field6',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        cellClassRules: editableCellClassRules<AgGridRow2>(),
        cellClass: (params: CellClassParams<AgGridRow2>) => {
          // 편집 가능 여부를 class로 시각화(no-edited)
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
        cellRenderer: getExpiryRenderer('center'),
      },
    ],
    [attributeColumnWidth, getExpiryRenderer]
  );

  return (
    <Gcol>
      <LayoutMainBody>
        <ResizablePanelGroup orientation="vertical" className="w-full">
          <ResizablePanel defaultSize={50}>
            <Grid className="w-full grid grid-rows-[auto_1fr] h-full" gap={1}>
              <Grow placement={'bwc'} className="gap-1 w-full pt-2" gap={0}>
                <Grow className="gap-1.5">
                  <Typo variant="heading-sm">화재기본담보</Typo>
                  <Typo variant="body-md">(060400, (1))</Typo>
                </Grow>
                <Grow className="gap-2.5">
                  <Grow className="gap-1">
                    <NativeSelect aria-label="실손전부보상" width={140} size={'sm'} readOnly={false} required={false}>
                      {[
                        { label: '실손전부보상', value: '실손전부보상' },
                        { label: '실손전부보상2', value: '실손전부보상2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Button variant={'outlined'} color={'gray'} size={'md'}>
                      가입설계도우미 알림톡발송
                    </Button>
                  </Grow>
                </Grow>
              </Grow>

              <div className="ag-theme-alpine">
                <AgGridReact<AgGridRow>
                  rowData={rowData}
                  columnDefs={columnDefs}
                  getRowId={(params) => String(params.data.id)}
                  singleClickEdit={true}
                  onCellValueChanged={handleCellValueChanged}
                  rowSelection={{
                    mode: 'multiRow' as const,
                    checkboxes: true,
                    headerCheckbox: false,
                    enableClickSelection: false,
                    enableSelectionWithoutKeys: true,
                  }}
                  selectionColumnDef={{
                    headerName: '선택',
                    width: 30,
                    // pinned: 'left',
                    cellClass: 'text-center p-0!',
                    cellClassRules: {
                      'pointer-events-none': (params) => !!params.data?.locked,
                    },
                  }}
                />
              </div>
            </Grid>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <Grid className="w-full grid grid-rows-[auto_1fr] h-full" gap={1}>
              <Grow placement={'bwc'} className="gap-1 w-full" gap={0}>
                <Grow className="gap-1.5">
                  <Typo variant="heading-sm">화재특약담보</Typo>
                </Grow>
                <Grow className="gap-2.5">
                  <Button color="gray" onClick={() => {}} only="default" size="md" variant="contained">
                    질권설정
                  </Button>
                  <TooltipQ>
                    {`질권설정이란 채권자가 채무자 등이 제공한 재산이나 재산권에 대해 다른 채권자보다 우선변제를 받을 수 있도록 하는 담보권입니다. 목적물 질권 설정 버튼은 청약진행 후 활성화 됩니다.`}
                  </TooltipQ>
                </Grow>
              </Grow>
              <div
                className={`tooltip-hidden-toggle ag-theme-alpine${showProductNameTooltip ? ' show-product-tooltip' : ''}`}
              >
                <AgGridReact<AgGridRow2>
                  enableCellSpan={true}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
                  getRowId={(params) => String(params.data.id)}
                  singleClickEdit={true}
                  onCellValueChanged={handleCellValueChanged2}
                  context={{
                    coverageName,
                    setCoverageName,
                    showProductNameTooltip,
                    onShowProductNameTooltipChange: (checked: boolean | 'indeterminate') =>
                      setShowProductNameTooltip(checked === true),
                    checkedMap,
                    onCheckedChange: handleCheckedChange,
                  }}
                  // onRowDataUpdated={handleRowDataUpdated}
                  tooltipShowDelay={0}
                  tooltipHideDelay={9999}
                  tooltipMouseTrack={true}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  suppressAnimationFrame={true}
                  suppressColumnMoveAnimation={true}
                  suppressRowTransform={true}
                  animateRows={false}
                />
              </div>
            </Grid>
          </ResizablePanel>
        </ResizablePanelGroup>
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
          <MainBottomItem className="justify-end">
            <Grow className="gap-1">
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
    </Gcol>
  );
}
