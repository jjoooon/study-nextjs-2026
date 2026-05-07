'use client';

import type { CellClassParams, ColDef, EditableCallbackParams, CellEditorSelectorResult } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useState } from 'react';
import {
  numberValueFormatter,
  useDynamicColumnWidths,
  AgGridEmptyComponent,
  AmountWithPopoverCellEditor,
} from '@aggrid';
import { Divider, Grid, Grow, Typo, Gcol } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InputHash } from '@common/InputHash';
import { KeyValueList } from '@common/KeyValueList';
import { TooltipQ } from '@common/TooltipQ';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { ResetIcon, SearchIcon } from '@icons';
import { LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@uiux/Resizable';
// Shared AgGrid generic utilities & cell renderers
import {
  searchButtonRenderer,
  useExpiryCellRenderer,
  editableCellClassRules,
  productNameCellRenderer,
} from '../hooks/useLtpa350Step2';

import '@/shared/lib/agGridPub';

interface DummyDataType {
  id: number;
  isChecked?: boolean;
  field1?: string | number | boolean;
  insuredAmount?: string | number | boolean;
  field3?: string | number | boolean;
  field4?: string | number | boolean;
  field5?: string | number | boolean;
  field6?: string | number | boolean;
  field7?: string | number | boolean;
  field8?: string | number | boolean;
  [key: string]: unknown;
}
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: true,
    field1: '건물(실손)',
    insuredAmount: '200',
    field3: 0,
    field4: '일체',
    field5: '일체',
    field6: '건물내',
    field7: '아니오',
    field8: '가연성',

    isEditedField6: true,
    isEditedField7: true,
    isEditedField8: true,
  },
  {
    id: 2,
    isChecked: false,
    field1: '가재(실손)',
    insuredAmount: '200',
    field3: 0,
    field4: '',
    field5: '일체',
    field6: '건물내',
    field7: '아니오',
    field8: '가연성',

    isEditedField6: true,
    isEditedField7: true,
    isEditedField8: true,
  },
  {
    id: 3,
    isChecked: false,
    field1: '가재(실손)',
    insuredAmount: '200',
    field3: 0,
    field4: '',
    field5: '일체',
    field6: '건물내',
    field7: '아니오',
    field8: '가연성',

    isEditedField6: true,
    isEditedField7: true,
    isEditedField8: true,
  },
];

interface DummyData2Type {
  id: number;
  isChecked?: boolean;
  isStandard?: {
    group: boolean;
    edit: boolean;
  }; // [isStandard, 기준이 되는 필드명]
  num?: number | null | undefined;
  title?: string | number | boolean;
  titleDetail?: {
    title: string;
    description: string;
    info: string[];
  };
  insuredAmount?: string | number | boolean | string[]; //가입금액
  isSelectedInsuredAmount?: boolean;
  rowCopy?: string | number | boolean;

  field1?: string | number | boolean;
  field2?: string | number | boolean;
  field3?: string | number | boolean;
  field4?: string | number | boolean;
  field5?: string | number | boolean;
  field6?: string | number | boolean;
  field7?: string | number | boolean;
  field8?: string | number | boolean;

  isEditedtitle?: boolean;
  isEditedInsuredAmount?: boolean;
  isEditedrowCopy?: boolean;

  isEditedField2?: boolean;
  isEditedinsuredAmount?: boolean;
  isEditedField5?: boolean;
  isEditedField6?: boolean;
  isEditedField7?: boolean;
  isEditedField8?: boolean;

  filePath?: string[];
  locked?: boolean;
  isError?: boolean;
  badge?: string[];
  [key: string]: unknown;
}
const DummyData2: DummyData2Type[] = [
  {
    id: 1,
    isChecked: true,
    field1: '배상책임',
    title: '보통약관(화재배상책임)',
    field3: false,
    insuredAmount: '2100',
    isEditedInsuredAmount: true,
    field5: '20년',
    isEditedField5: true,
    field6: '전기납',
    isEditedField6: true,
    field7: 0,
    isEditedField7: true,
    titleDetail: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
  },
  {
    id: 2,
    isChecked: false,
    field1: '배상책임',
    title:
      '보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)',
    field3: true,
    insuredAmount: '100',
    isEditedInsuredAmount: true,
    field5: '20년',
    isEditedField5: true,
    field6: '전기납',
    isEditedField6: true,
    field7: 0,
    isEditedField7: true,
    titleDetail: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
  },
  {
    id: 3,
    isChecked: false,
    field1: '배상책임',
    title: '보통약관(화재배상책임)',
    field3: false,
    insuredAmount: '4100',
    isEditedInsuredAmount: true,
    field5: '20년',
    isEditedField5: false,
    field6: '전기납',
    isEditedField6: false,
    field7: 0,
    isEditedField7: false,
    titleDetail: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
  },
  {
    id: 4,
    isChecked: true,
    field1: '화재기타',
    title: '보통약관(화재배상책임, 무과실)',
    field3: true,
    insuredAmount: 100,
    isEditedInsuredAmount: true,
    field5: '20년',
    isEditedField5: true,
    field6: '전기납',
    isEditedField6: true,
    field7: 0,
    isEditedField7: true,
    titleDetail: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
  },
];

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
  const [rowData] = useState<AgGridRow[]>(DummyData);
  const [rowData2] = useState<AgGridRow2[]>(DummyData2);
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

  const productNameHeader = useCallback(() => {
    const handleTooltipCheck = (checked: boolean | 'indeterminate') => {
      setShowProductNameTooltip(!!checked);
    };
    return (
      <Grow className="w-full px-[0.6rem]" placement={'cc'} gap={4}>
        <Grow gap={1.5} placement={'sc'}>
          <Checkbox variant={'text'} checked={checkedMap.selected} onCheckedChange={handleCheckedChange('selected')}>
            선택 24건
          </Checkbox>
          <Divider />
          <Checkbox
            variant={'text'}
            checked={checkedMap.unselected}
            onCheckedChange={handleCheckedChange('unselected')}
          >
            미선택
          </Checkbox>
        </Grow>
        <Grow>
          <InputHash
            options={[
              { value: '암암암암2', label: '암암암암2' },
              { value: '뇌뇌뇌뇌뇌', label: '뇌뇌뇌뇌뇌' },
              { value: '심심심심심', label: '심심심심심' },
              { value: '표적', label: '표적' },
              { value: '뇌', label: '뇌' },
              { value: '심장', label: '심장' },
              { value: '수술', label: '수술' },
              { value: '골절', label: '골절' },
              { value: '화상', label: '화상' },
              { value: '치매', label: '치매' },
              { value: '종신종신종신', label: '종신종신종신' },
            ]}
            size={'md'}
            placeholder="담보명 입력"
            clear={true}
            value={coverageName}
            onChange={(value) => setCoverageName(value)}
          />
          <Button aria-label="담보명 검색" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
          <Button aria-label="담보명 초기화" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
            <ResetIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grow>
        <Grow placement={'sc'}>
          <Checkbox size={'md'} checked={showProductNameTooltip} onCheckedChange={handleTooltipCheck}>
            담보명 말풍선
          </Checkbox>
        </Grow>
      </Grow>
    );
  }, [checkedMap, coverageName, showProductNameTooltip, handleCheckedChange]);

  // =====================
  // 공용 유틸리티/셀 렌더러
  // =====================
  const getExpiryRenderer = useExpiryCellRenderer();

  // 재물
  const columnDefs: ColDef<AgGridRow>[] = useMemo(
    () => [
      {
        headerName: '부호',
        field: 'id',
        cellClass: 'text-center',
        width: attributeColumnWidth[5],
      },
      {
        headerName: '구분',
        field: 'field1',
        flex: 1,
        cellClass: 'text-left',
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
      },
      {
        headerComponent: () => (
          <Grow className="w-full" placement={'cc'} gap={0}>
            보험료<span className="text-[1.1rem]">(원)</span>
          </Grow>
        ),
        field: 'field3',
        width: attributeColumnWidth[10],
        cellClass: 'text-right [&_input]:text-right',
        headerClass: 'px-0!',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter<AgGridRow>,
      },
      {
        headerName: '목적물상세',
        field: 'insuredAmount',
        width: attributeColumnWidth[10],
        cellClass: 'editable-cell',
        cellClassRules: editableCellClassRules<AgGridRow>(),
        editable: true,
      },
      {
        headerName: '수용장소상세',
        field: 'field5',
        width: attributeColumnWidth[10],
        cellClassRules: editableCellClassRules<AgGridRow>(),
        cellClass: 'editable-cell',
        editable: true,
      },
      {
        headerName: '건물내/외',
        field: 'field6',
        width: attributeColumnWidth[10],
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
        cellRenderer: getExpiryRenderer('left'),
      },
      {
        headerName: '지하수용',
        field: 'field7',
        width: attributeColumnWidth[10],
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
        cellRenderer: getExpiryRenderer('left'),
      },
      {
        headerName: '야적물건',
        field: 'field8',
        width: attributeColumnWidth[10],
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
        cellRenderer: getExpiryRenderer('left'),
      },
    ],
    [attributeColumnWidth, getExpiryRenderer]
  );

  const columnDefs2 = useMemo(
    (): ColDef<AgGridRow2>[] => [
      {
        headerName: '',
        field: 'field1',
        width: attributeColumnWidth[8],
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
        width: 30,
        cellClassRules: {
          'pointer-events-none': (params: CellClassParams<AgGridRow2>) => !!params.data?.locked,
        },
      },
      {
        headerName: '',
        field: 'title',
        flex: 1,
        cellClass: 'text-left',
        suppressMovable: true, // 이동 방지
        headerComponent: productNameHeader,
        cellRenderer: productNameCellRenderer,
        tooltipValueGetter: (params) => params.data?.title ?? '', // 담보명 등 표시
      },
      {
        headerName: '속성',
        field: 'field3',
        width: attributeColumnWidth[4],
        cellClass: 'text-center',
        cellRenderer: searchButtonRenderer,
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
        headerName: '만기',
        field: 'field5',
        width: attributeColumnWidth[7],
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
        cellRenderer: getExpiryRenderer('left'),
      },
      {
        headerName: '납기',
        field: 'field6',
        width: attributeColumnWidth[7],
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
        cellRenderer: getExpiryRenderer('left'),
      },
      {
        headerComponent: () => (
          <Grow className="w-full" placement={'cc'} gap={0}>
            보험료<span className="text-[1.1rem]">(원)</span>
          </Grow>
        ),
        field: 'field7',
        width: attributeColumnWidth[7],
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter<AgGridRow2>,
      },
    ],
    [attributeColumnWidth, getExpiryRenderer, productNameHeader]
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
          <MainBottomItem className="justify-end">
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
    </Gcol>
  );
}
