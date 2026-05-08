'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import type {
  CellClassParams,
  ColDef,
  GridApi,
  EditableCallbackParams,
  CellEditorSelectorResult,
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  createCellClickSelectionToggleHandler,
  createInsertCopiedRowButtonCellRenderer,
  numberValueFormatter,
  useDynamicColumnWidths,
  AgGridEmptyComponent,
  AmountWithPopoverCellEditor,
} from '@aggrid';
import { Divider, Gcol, Grow, Typo, Grid } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InputHash } from '@common/InputHash';
import { KeyValueList } from '@common/KeyValueList';
import { LayoutScrollItem, LayoutScrollWrap } from '@common/LayoutScroll';
import { SelectDrop } from '@common/SelectDrop';
import { TextSelectChange } from '@common/TextSelectChange';

import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { ChevronDownIcon, PaperIcon, ResetIcon, SaveIcon, SearchIcon, SizeIcon, SizeOffIcon } from '@icons';
import { LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { Accordion } from '@uiux/Accordion';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
// Shared AgGrid generic utilities & cell renderers
import {
  rowDataWithTrackingFactory,
  useEnsureLockedRowsSelected,
  useHandleSelectionChanged,
  useGridSelectionChangedHandler,
  useGridReadyHandler,
  searchButtonRenderer,
  useExpiryCellRenderer,
  editableCellClassRules,
  productNameCellRenderer,
  uwIconRenderer,
  groupEditableButtonRenderer,
} from '../hooks/useLtpa35002';

import '@/shared/lib/agGridPub';

interface DummyDataType {
  id: number;
  isChecked?: boolean;
  isStandard?: {
    group: boolean;
    edit: boolean;
  }; // [isStandard, 기준이 되는 필드명]
  num: number | null;
  title?: string | number | boolean | string[] | number[];
  field2?: string | number | boolean | string[] | number[];
  insuredAmount?: string | number | boolean | string[] | number[];
  isSelectedInsuredAmount?: boolean;
  field4?: string | number | boolean | string[] | number[];
  field4b?: string | number | boolean | string[] | number[];
  field5?: string | number | boolean | string[] | number[];
  field5b?: string | number | boolean | string[] | number[];

  field6?: string | number | boolean | string[] | number[];
  field7?: string | number | boolean | string[] | number[];
  field8?: string | number | boolean | string[] | number[];
  rowCopy?: string | number | boolean | string[] | number[];
  titleDetail?: {
    title: string;
    description: string;
    info: string[];
  };

  isEditedtitle?: boolean;
  isEditedField2?: boolean;
  isEditedinsuredAmount?: boolean;
  isEditedField4?: boolean;
  isEditedField4b?: boolean;
  isEditedField5?: boolean;
  isEditedField5b?: boolean;
  isEditedField6?: boolean;
  isEditedField7?: boolean;
  isEditedField8?: boolean;
  isEditedrowCopy?: boolean;

  filePath?: string[];
  locked?: boolean;
  isHighlighted?: boolean;
  isError?: boolean;
  badge?: string[];
  [key: string]: unknown;
}
const DummyData: DummyDataType[] = [
  {
    id: 1,
    num: 1,
    filePath: ['set-1'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title:
      '무배당 삼성화재 실손의료보험 무배당 삼성화재 실손의료보험무배당 삼성화재 실손의료보험무배당 삼성화재 실손의료보험 무배당 삼성화재 실손의료보험무배당 삼성화재 실손의료보험',
    field2: true,
    insuredAmount: '5000',
    isSelectedInsuredAmount: false,

    field4: 4500,
    field4b: 100,

    field5: '05개월',
    field5b: '80세',
    isEditedField5b: true,

    field6: '20년',
    isEditedField6: true,

    field8: '인수가능',
    rowCopy: true,
    titleDetail: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: true,
    isHighlighted: true,
    badge: ['독립', '갱신', '배타', '미래'],
    isError: false,
  },
  {
    id: 2,
    num: 2,
    filePath: ['set-2'],
    isChecked: false,
    isStandard: {
      group: false,
      edit: false,
    },
    title: '무배당 KB손해보험 암보험',
    field2: true,
    insuredAmount: '3400',
    isSelectedInsuredAmount: false,
    field4: 4500,
    field4b: 100,

    field5: '05개월',
    field5b: '80세',
    isEditedField5b: true,

    field6: '20년',
    isEditedField6: true,
    field8: '인수불가',
    rowCopy: true,
    titleDetail: {
      title: '담보명 1특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,
    isHighlighted: false,
    badge: ['갱신'],
    isError: false,
  },
  {
    id: 3,
    num: 123,
    filePath: ['set-123'],
    isChecked: false,
    isStandard: {
      group: true,
      edit: false,
    },
    title: '유방암(수용체타입)진단비',
    field2: false,
    insuredAmount: '4400',
    isSelectedInsuredAmount: false,
    field4: 4500,
    field4b: 100,

    field5: '05개월',
    field5b: '80세',
    isEditedField5b: true,

    field6: '20년',
    isEditedField6: true,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 4,
    num: null,
    filePath: ['set-123', 'set-123-1'],
    isChecked: true,
    isStandard: {
      group: true,
      edit: true,
    },

    title: '유방암A타입진단비(호르몬수용체양성,HER2음성)',
    field2: false,
    insuredAmount: '4400',
    isSelectedInsuredAmount: false,
    field4: 4500,
    field4b: 100,

    field5: '05개월',
    field5b: '80세',
    isEditedField5b: true,

    field6: '20년',
    isEditedField6: true,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 5,
    num: null,
    filePath: ['set-123', 'set-123-2'],
    isChecked: true,
    isStandard: {
      group: true,
      edit: false,
    },

    title: '유방암B타입진단비(호르몬수용체양성,HER2양성)',
    field2: false,
    insuredAmount: '4400',
    isSelectedInsuredAmount: false,
    field4: 4500,
    field4b: 100,

    field5: '05개월',
    field5b: '80세',
    isEditedField5b: true,

    field6: '20년',
    isEditedField6: true,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 6,
    num: 230,
    filePath: ['set-230'],
    isChecked: false,
    isStandard: {
      group: true,
      edit: false,
    },

    title: '주요순환계질환Ⅰ특정치료비(요양병원제외,각연간1회한)',
    field2: false,
    insuredAmount: '5460',
    isSelectedInsuredAmount: false,
    field4: 4500,
    field4b: 100,

    field5: '05개월',
    field5b: '80세',
    isEditedField5b: true,

    field6: '20년',
    isEditedField6: true,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 7,
    num: null,
    filePath: ['set-230', 'set-230-1'],
    isChecked: true,
    isStandard: {
      group: true,
      edit: true,
    },
    title: '주요순환계질환Ⅰ특정치료비(수술(혈전제거술제외))(요양병원제외,－연간1회한)',
    field2: false,
    insuredAmount: '1천만원',
    isSelectedInsuredAmount: true,
    field4: 4500,
    field4b: 100,

    field5: '05개월',
    field5b: '80세',
    isEditedField5b: true,

    field6: '20년',
    isEditedField6: true,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 8,
    num: null,
    filePath: ['set-230', 'set-230-2'],
    isChecked: true,
    isStandard: {
      group: true,
      edit: false,
    },

    title: '주요순환계질환Ⅰ특정치료비(혈전제거술)(요양병원제외,연간1회한)',
    field2: false,
    insuredAmount: '4400',
    isSelectedInsuredAmount: false,
    field4: 4500,
    field4b: 100,

    field5: '05개월',
    field5b: '80세',
    isEditedField5b: true,

    field6: '20년',
    isEditedField6: true,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 9,
    num: 231,
    filePath: ['set-231'],
    isChecked: false,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '무배당 현대해상 3대질병보험',
    field2: false,
    insuredAmount: '5460',
    isSelectedInsuredAmount: false,
    field4: 4500,
    field4b: 100,

    field5: '05개월',
    field5b: '80세',
    isEditedField5b: true,

    field6: '20년',
    isEditedField6: true,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 10,
    num: null,
    filePath: ['set-231', 'set-231-1'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },
    title: '- 무배당 현대해상 3대질병보험',
    field2: false,
    insuredAmount: '1400',
    isSelectedInsuredAmount: false,
    field4: 4500,
    field4b: 100,

    field5: '05개월',
    field5b: '80세',
    isEditedField5b: true,

    field6: '20년',
    isEditedField6: true,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 11,
    num: null,
    filePath: ['set-231', 'set-231-2'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '- 무배당 현대해상 3대질병보험',
    field2: false,
    insuredAmount: '4400',
    isSelectedInsuredAmount: false,
    field4: 4500,
    field4b: 100,

    field5: '05개월',
    field5b: '80세',
    isEditedField5b: true,

    field6: '20년',
    isEditedField6: true,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
    badge: ['독립'],
    isError: false,
  },
];

type PlanAccordionItem = {
  value: string;
  trigger: string;
  content: string[];
};
const planAccordionItems: PlanAccordionItem[] = [
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
];

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
  const [rowData, setRowData] = useState<AgGridRow[]>(DummyData);
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
          <Divider />
          <Checkbox variant={'text'} checked={checkedMap.reset} onCheckedChange={handleCheckedChange('reset')}>
            담보초기화
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
  const duplicateRenderer = useMemo(() => {
    return createInsertCopiedRowButtonCellRenderer<AgGridRow, 'id'>(rowDataWithTracking, {
      idKey: 'id',
      getNextId: (rows) => {
        const ids = rows.map((r) => (typeof r.id === 'number' ? r.id : Number(r.id))).filter((n) => !isNaN(n));
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        return maxId + 1;
      },
      patchCopiedRow: (originalRow, nextId) => ({
        ...originalRow,
        id: nextId,
        displayNo: originalRow.id,
        isDuplicate: true,
        isChecked: true,
        filePath: Array.isArray(originalRow.filePath) ? [...originalRow.filePath, String(nextId)] : [String(nextId)],
      }),
      isVisible: (params) => {
        const isRowChecked = params.node?.isSelected?.() ?? false;
        const isCopiedRow = params.data?.isDuplicate === true;
        return isRowChecked && !isCopiedRow;
      },
      ariaLabel: '동일 담보 추가',
    });
  }, [rowDataWithTracking]);
  const ensureLockedRowsSelected = useEnsureLockedRowsSelected();
  const handleSelectionChanged = useHandleSelectionChanged<AgGridRow, number>('id', onSelectPlan);
  const handleGridSelectionChanged = useGridSelectionChangedHandler<AgGridRow>({
    ensureLockedRowsSelected,
    setRowData,
    prevSelectedIdsRef,
    handleSelectionChanged,
    refreshColumns: ['field5', 'field6', 'rowCopy'],
  });

  const handleGridCellClickToggle = useMemo(() => createCellClickSelectionToggleHandler<AgGridRow>(), []);
  const gridReadyHandler = useGridReadyHandler<AgGridRow>(ensureLockedRowsSelected);
  const handleGridReady = useCallback(
    (params: { api: GridApi<AgGridRow> }) => {
      gridApiRef.current = params.api;
      gridReadyHandler(params);
    },
    [gridReadyHandler]
  );

  // ---------------------------------------------------
  // ColDef 태아
  const columnDefs: ColDef<AgGridRow>[] = useMemo(
    () => [
      {
        headerName: '속성',
        field: 'field2',
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
        cellRenderer: groupEditableButtonRenderer<AgGridRow>(getExpiryRenderer, numberValueFormatter),
        editable: (params: EditableCallbackParams) => {
          // 그룹이면서 편집 불가면 에디터 비활성화
          if (params.data?.isStandard?.group && !params.data?.isStandard?.edit) {
            return false;
          }
          return true;
        },
      },
      {
        headerGroupComponent: () => (
          <Grow className="w-full text-[1.3rem]" placement={'cc'} gap={0}>
            보험료<span className="text-[1.1rem]">(원)</span>
          </Grow>
        ),
        children: [
          {
            headerName: '출생전',
            field: 'field4',
            width: attributeColumnWidth[7],
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter<AgGridRow>,
          },
          {
            headerName: '출생후',
            field: 'field4b',
            width: attributeColumnWidth[7],
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
        ],
      },
      {
        headerName: '납기',
        children: [
          {
            headerName: '출생후',
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
        ],
      },
      {
        headerName: '예상UW',
        headerComponent: () => (
          <Grow className="w-full" placement={'cc'} gap={0}>
            <span className="text-[1.1rem]">예상</span>UW
          </Grow>
        ),
        field: 'field8',
        width: attributeColumnWidth[6],
        cellClass: 'text-center px-0! tracking-tighter',
        cellRenderer: uwIconRenderer,
      },
      {
        headerName: '중복',
        field: 'rowCopy',
        width: attributeColumnWidth[4],
        cellRenderer: duplicateRenderer,
        resizable: false,
      },
    ],
    [attributeColumnWidth, duplicateRenderer, getExpiryRenderer]
  );

  return (
    <Gcol>
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
                <SelectDrop typeMode="custom" size="md" width={160} placeholder="나만의 설계선택">
                  {/* 여기에 */}
                  <Gcol className="w-full p-[0.2rem]">
                    <Button variant="outlined" size="md" className="w-full">
                      <SaveIcon /> 나만의 설계
                    </Button>

                    <Accordion type="multiple" className="w-full" defaultValue={['item-1', 'item-2', 'item-3']}>
                      {planAccordionItems.map((item) => (
                        <AccordionItem key={item.value} value={item.value}>
                          <AccordionTrigger className="w-full group flex justify-between items-center text-[1.3rem] font-bold">
                            {item.trigger}
                            <ChevronDownIcon
                              size={14}
                              color="#777"
                              className="transition-transform group-data-[state=open]:rotate-0 group-data-[state=closed]:rotate-180"
                            />
                          </AccordionTrigger>
                          <AccordionContent className="px-[0.8rem]">
                            {item.content.map((text, index) => (
                              <Typo key={`${item.value}-${index}`} variant="body-md">
                                {text}
                              </Typo>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Gcol>
                </SelectDrop>

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
                onSelectionChanged={handleGridSelectionChanged}
                onGridReady={handleGridReady}
                // onRowDataUpdated={handleRowDataUpdated}
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
                  cellRenderer: productNameCellRenderer,
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
                  <Grid className="grid-cols-[auto_1fr_auto_auto] gap-1 w-full">
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
    </Gcol>
  );
}
