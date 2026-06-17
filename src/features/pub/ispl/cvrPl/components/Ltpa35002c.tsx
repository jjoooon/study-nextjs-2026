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
import { Grid, Grow, Typo, Gcol } from '@atoms';
import {
  numberValueFormatter,
  useDynamicColumnWidths,
  AgGridEmptyComponent,
  AmountWithPopoverCellEditor,
} from '@aggrid';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@uiux/Resizable';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { KeyValueList } from '@common/KeyValueList';
import { TooltipQ } from '@common/TooltipQ';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { createExpiryCellRenderer, productNameCellRenderer, searchButtonRenderer } from '@grid/CellRenderers';
import { HeaderWithUnit, AgGridProductNameHeader } from '@grid/HeadRenderers';
// Shared AgGrid generic utilities & cell renderers
import { dummyData, dummyData2 } from '../data/ltpa35002cData';
import type { DummyData2Type, DummyDataType } from '../data/ltpa35002cData';
import { editableCellClassRules } from '../utils/agGridUtils';

import '@/shared/lib/agGridPub';

type AgGridRow = DummyDataType & {
  isDuplicate?: boolean;
  displayNo?: number;
  badge?: string[];
  locked?: boolean;
  isHighlighted?: boolean;
};

type AgGridRow2 = DummyData2Type & {
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
  const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false, reset: false });
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [rowData, setRowData] = useState<AgGridRow[]>(dummyData);
  const [rowData2, setRowData2] = useState<AgGridRow2[]>(dummyData2);
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

  const handleCellValueChanged = useCallback((params: CellValueChangedEvent<AgGridRow>) => {
    const { data, colDef, newValue } = params;
    if (!colDef.field) return;
    setRowData((prev) =>
      prev.map((row) => (row.id === data.id ? { ...row, [colDef.field as string]: newValue } : row))
    );
  }, []);

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

  // 재물
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
        tooltipValueGetter: (params) => params.data?.title ?? '', // 담보명 등 표시
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
          'style-select': (params: CellClassParams<AgGridRow2>) => !!params.data?.isSelectedInsuredAmount,
          isStandardGroup: (params: CellClassParams<AgGridRow2>) =>
            !!(params.data?.isStandard?.group && !params.data?.isStandard?.edit),
          isStandard: (params: CellClassParams<AgGridRow2>) => !!params.data?.isStandard?.edit,
          'tooltip-on': (params: CellClassParams<AgGridRow2>) => !!params.data?._tooltipOn,
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
