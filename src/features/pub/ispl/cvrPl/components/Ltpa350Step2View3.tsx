'use client';

import {
  CoveragePopover,
  createCellClickSelectionToggleHandler,
  createCellErrorClassRules,
  createInsertCopiedRowButtonCellRenderer,
  createSelectionChangedHandler,
  editableSelectCellRenderer,
  numberValueFormatter,
  useDynamicColumnWidths,
  AgGridEmptyComponent,
  AmountWithPopoverCellEditor,
} from '@aggrid';
import { Divider, Gcol, Grow, Typo, Grid } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InputHash } from '@common/InputHash';
import { KeyValueList } from '@common/KeyValueList';
import { LayoutScrollItem, LayoutScrollWrap } from '@common/LayoutScroll';
import { SelectDrop } from '@common/SelectDrop';
import { TabPager } from '@common/TabPager';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { ChevronDownIcon, PaperIcon, ResetIcon, SaveIcon, SearchIcon, SizeIcon, SizeOffIcon } from '@icons';
import { LayoutMain, LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { TooltipQ } from '@common/TooltipQ';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import type {
  CellClassParams,
  ColDef,
  GridApi,
  ICellRendererParams,
  SelectionChangedEvent,
  IGroupCellRendererParams,
  IRowNode,
  EditableCallbackParams,
  CellEditorSelectorResult,
  ValueFormatterParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Accordion } from '@/shared/components/uiux/Accordion';
import { useTabs } from '@/shared/hooks/useTabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@uiux/Resizable';

import '@/shared/lib/agGridPub';

interface TabDataType {
  id: string | number;
  name?: string;
  age?: string | number;
  gender?: string;
  value: string;
  error?: boolean;
  info: string[];
}
const TabData: TabDataType[] = [
  {
    id: 1,
    name: '홍길동',
    age: '1',
    gender: '여',
    value: 'tab1',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
  },
  {
    id: 2,
    name: '목적물',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 3,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
];

interface DummyDataType {
  id: number;
  isChecked?: boolean;
  field1?: string | number | boolean;
  field2?: string | number | boolean;
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
    field2: 0,
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
    field2: 0,
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
    field2: 0,
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
  field1?: string | number | boolean;
  field2?: string | number | boolean;
  field3?: string | number | boolean | string[];
  isSelectedField4?: boolean;
  field4?: string | number | boolean;
  field5?: string | number | boolean;
  field6?: string | number | boolean;
  field7?: string | number | boolean;
  field8?: string | number | boolean;
  field9?: string | number | boolean;
  field10?: {
    title: string;
    description: string;
    info: string[];
  };

  isEditedField1?: boolean;
  isEditedField2?: boolean;
  isEditedField3?: boolean;
  isEditedField4?: boolean;
  isEditedField5?: boolean;
  isEditedField6?: boolean;
  isEditedField7?: boolean;
  isEditedField8?: boolean;
  isEditedField9?: boolean;

  filePath?: string[];
  locked?: boolean;
  isHighlighted?: boolean;
  isError?: boolean;
  badge?: string[];
  [key: string]: unknown;
}
const DummyData2: DummyData2Type[] = [
  {
    id: 1,
    isChecked: true,
    field1: '배상책임',
    field2: '보통약관(화재배상책임)',
    field3: false,
    field4: '2100',
    isSelectedField4: false,
    field5: '20년',
    isEditedField5: true,
    field6: '전기납',
    isEditedField6: true,
    field7: 0,
    isEditedField7: true,
    field10: {
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
    field2:
      '보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)',
    field3: true,
    field4: '100',
    isSelectedField4: false,
    isEditedField5: true,
    field6: '전기납',
    isEditedField6: true,
    field7: 0,
    isEditedField7: true,
    field10: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
  },
  {
    id:3,
    isChecked: false,
    field1: '배상책임',
    field2: '보통약관(화재배상책임)',
    field3: false,
    field4: '4100',
    isSelectedField4: false,
    isEditedField5: true,
    field6: '전기납',
    isEditedField6: true,
    field7: 0,
    isEditedField7: true,
    field10: {
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
    field2: '보통약관(화재배상책임, 무과실)',
    field3: true,
    field4: 100,
    isEditedField5: true,
    field6: '전기납',
    isEditedField6: true,
    field7: 0,
    isEditedField7: true,
    field10: {
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

export function Ltpa350Step2View3() {
  // 1) INLINED STATE (default)
    const [isHeightExpanded, setIsHeightExpanded] = useState(false);
    const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false, reset: false });
    const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
    const handleCheckedChange = (key: string) => (checked: boolean | 'indeterminate') => {
      setCheckedMap((map) => ({ ...map, [key]: !!checked }));
    };
    const { attributeColumnWidth } = useDynamicColumnWidths();
    const [testError, setTestError] = useState(false);
    // 2) Tabs/rowData 분기
    const tabListData = TabData;
    const stringifiedTabs: TabDataType[] = tabListData.map((item) => ({
      ...item,
      value: String(item.id),
    }));
    const { tabs: Tabs, active: TabActive, setActive: TabSetActive } = useTabs<TabDataType>(stringifiedTabs);
  
    // 3) Grid data
    const [rowData, setRowData] = useState<AgGridRow[]>(DummyData);
  
    // 중복 행 자동 선택 / 선택 해제 시 삭제 추적
    const pendingSelectIdRef = useRef<number | null>(null);
    const prevSelectedIdsRef = useRef<Set<number>>(new Set());
  
    // setRowData를 래핑하여 새로 삽입된 중복 행 id를 pendingSelectIdRef에 저장
    const setRowDataWithTracking = useCallback((updater: AgGridRow[] | ((prev: AgGridRow[]) => AgGridRow[])) => {
      setRowData((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        if (next.length > prev.length) {
          const prevIds = new Set(prev.map((r) => r.id));
          const newDuplicate = next.find((r) => !prevIds.has(r.id) && r.isDuplicate);
          if (newDuplicate) {
            pendingSelectIdRef.current = newDuplicate.id;
          }
        }
        return next;
      });
    }, []);
  
    // 헤더: 선택/미선택 카운트 체크박스 + 담보명 검색 입력 + 말풍선 토글
    const [coverageName, setCoverageName] = useState('');
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
                { value: '암암암암암', label: '암암암암암' },
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
    }, [checkedMap, coverageName, showProductNameTooltip]);
  
    // 셀: 담보명 + 번호 + 배지 렌더러 (중복 행은 원본 행의 번호 표시, 배지는 중복/원본 동일하게 표시)
    const productNameCellRenderer = (params: IGroupCellRendererParams<AgGridRow2> & ICellRendererParams<AgGridRow2>) => {
        const { data, api } = params;
        if (!data) return null;

        // 3. 공통 레이아웃 렌더링
        return (
          <CoveragePopover text={String(data.field2 ?? '')} items={data.field10} />
        );
      };
  
    // 셀: 속성 값이 있을 때 돋보기 아이콘 버튼 표시
    const searchButtonRenderer = (params: ICellRendererParams<AgGridRow2>) => {
      if (!params.value) return null;
      return (
        <div className="flex flex-wrap gap-1 justify-center items-center w-full h-full">
          <Button
            only={'icon'}
            variant={'none'}
            size={'sm'}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
        </div>
      );
    };
  
    // 셀: 드롭다운 선택 렌더러 정렬 및 아이콘생성
    const expiryCellRenderer = useCallback(
      (align: 'left' | 'center' | 'right' = 'right') =>
        (params: ICellRendererParams<AgGridRow>) =>
          editableSelectCellRenderer<AgGridRow>({ ...params, align }),
      []
    );

    const expiryCellRenderer2 = useCallback(
      (align: 'left' | 'center' | 'right' = 'right') =>
        (params: ICellRendererParams<AgGridRow2>) =>
          editableSelectCellRenderer<AgGridRow2>({ ...params, align }),
      []
    );
  
    // 만기 편집 가능 셀 스타일: 행 선택 시 editable-cell 클래스 적용 (선택 변경 시 refreshCells로 즉시 반영)
    // 납기는 항상 editable이므로 cellClass에 editable-cell을 고정으로 포함 → 별도 rules 불필요
    const editableCellClassRules = useMemo(
      () => ({
        'editable-cell': (params: CellClassParams<AgGridRow>) => {
          const isRowChecked = params.node?.isSelected?.() ?? false;
          return isRowChecked;
        },
      }),
      []
    );
  
    // 가입금액 셀 필수/에러 규칙
    // - 필수: row.field3Required === true (미지정 시 기본 true)
    // - 에러: 필수 + 값이 0(또는 빈값)
    const amountCellClassRules = useMemo(() => {
      const isAmountRequired = (params: CellClassParams<AgGridRow>) => {
        // field3Required가 존재하는 경우만 사용, 없으면 true로 처리
        if (typeof params.data !== 'undefined' && 'field3Required' in params.data) {
          return (params.data as { field3Required?: boolean }).field3Required ?? true;
        }
        return true;
      };
      const isAmountInvalid = (params: CellClassParams<AgGridRow>) =>
        params.value === '' || params.value === undefined || Number(params.value) === 0;
  
      return {
        required: isAmountRequired,
        ...createCellErrorClassRules<AgGridRow>((params) => isAmountRequired(params) && isAmountInvalid(params)),
      };
    }, []);
  
    // locked 행은 항상 선택 상태 유지 (체크박스 해제 방지)
    const ensureLockedRowsSelected = useCallback((api: GridApi<AgGridRow>) => {
      api.forEachNode((node) => {
        if (node.data?.locked && !node.isSelected()) {
          node.setSelected(true);
        }
      });
    }, []);
    const ensureLockedRowsSelected2 = useCallback((api: GridApi<AgGridRow2>) => {
      api.forEachNode((node) => {
        if (node.data?.locked && !node.isSelected()) {
          node.setSelected(true);
        }
      });
    }, []);
  
    // 선택된 행의 id를 부모(onSelectPlan)로 전달
    // const handleSelectionChanged = useMemo(
    //   () => createSelectionChangedHandler<AgGridRow, number>('id', onSelectPlan),
    //   [onSelectPlan]
    // );
  
    // 그리드 선택 변경 통합 핸들러: 체크박스 선택 시 트리 확장/해제
    const handleGridSelectionChanged = useCallback(
      (event: SelectionChangedEvent<AgGridRow>) => {
        ensureLockedRowsSelected(event.api);
  
        // 현재 선택된 id 목록
        const currentSelectedIds = new Set(
          event.api
            .getSelectedNodes()
            .map((n) => n.data?.id)
            .filter((id): id is number => id !== undefined)
        );
  
        // 트리 확장/축소: 체크된 행은 expand, 해제된 행은 collapse
        event.api.forEachNode((node) => {
          if (node.data) {
            const shouldExpand = currentSelectedIds.has(node.data.id);
            if (node.expanded !== shouldExpand) {
              node.setExpanded(shouldExpand);
            }
          }
        });
  
        // 이전 선택에서 해제된 중복 행 찾아 삭제
        const deselectedDuplicateIds: number[] = [];
        prevSelectedIdsRef.current.forEach((id) => {
          if (!currentSelectedIds.has(id)) {
            const node = event.api.getRowNode(String(id));
            if (node?.data?.isDuplicate) {
              deselectedDuplicateIds.push(id);
            }
          }
        });
        if (deselectedDuplicateIds.length > 0) {
          setRowData((prev) => prev.filter((row) => !deselectedDuplicateIds.includes(row.id)));
        }
  
        prevSelectedIdsRef.current = currentSelectedIds;
        // handleSelectionChanged(event);
        event.api.refreshCells({
          force: true,
          columns: ['field5', 'field6', 'field9'],
        });
      },
      [ensureLockedRowsSelected]
    );
    const handleGridSelectionChanged2 = useCallback(
      (event: SelectionChangedEvent<AgGridRow2>) => {
        ensureLockedRowsSelected(event.api);
  
        // 현재 선택된 id 목록
        const currentSelectedIds = new Set(
          event.api
            .getSelectedNodes()
            .map((n) => n.data?.id)
            .filter((id): id is number => id !== undefined)
        );
  
        // 트리 확장/축소: 체크된 행은 expand, 해제된 행은 collapse
        event.api.forEachNode((node) => {
          if (node.data) {
            const shouldExpand = currentSelectedIds.has(node.data.id);
            if (node.expanded !== shouldExpand) {
              node.setExpanded(shouldExpand);
            }
          }
        });
  
        // 이전 선택에서 해제된 중복 행 찾아 삭제
        const deselectedDuplicateIds: number[] = [];
        prevSelectedIdsRef.current.forEach((id) => {
          if (!currentSelectedIds.has(id)) {
            const node = event.api.getRowNode(String(id));
            if (node?.data?.isDuplicate) {
              deselectedDuplicateIds.push(id);
            }
          }
        });
        if (deselectedDuplicateIds.length > 0) {
          setRowData((prev) => prev.filter((row) => !deselectedDuplicateIds.includes(row.id)));
        }
  
        prevSelectedIdsRef.current = currentSelectedIds;
        // handleSelectionChanged(event);
        event.api.refreshCells({
          force: true,
          columns: ['field5', 'field6', 'field9'],
        });
      },
      [ensureLockedRowsSelected]
    );

    const handleGridCellClickToggle = useMemo(() => createCellClickSelectionToggleHandler<AgGridRow>(), []);
    const handleGridCellClickToggle2 = useMemo(() => createCellClickSelectionToggleHandler<AgGridRow2>(), []);
  
    // 그리드 준비 핸들러: locked 행 초기 선택 + 선택 상태 초기화
    const handleGridReady = useCallback(
      (params: { api: GridApi<AgGridRow> }) => {
        // 1. 기본 isChecked=true인 row 선택
        params.api.forEachNode((node) => {
          if (node.data?.isChecked && !node.isSelected()) {
            node.setSelected(true);
          }
        });
        // 2. locked row 항상 선택
        ensureLockedRowsSelected(params.api);
        // 3. 선택 상태 기록
        prevSelectedIdsRef.current = new Set(
          params.api
            .getSelectedNodes()
            .map((n) => n.data?.id)
            .filter((id): id is number => id !== undefined)
        );
      },
      [ensureLockedRowsSelected]
    );
  
    // 행 데이터 갱신 핸들러: locked 행 유지 + 신규 중복 행 자동 선택
    const handleRowDataUpdated = useCallback(
      (params: { api: GridApi<AgGridRow> }) => {
        ensureLockedRowsSelected(params.api);
        if (pendingSelectIdRef.current !== null) {
          const nodeToSelect = params.api.getRowNode(String(pendingSelectIdRef.current));
          if (nodeToSelect) {
            nodeToSelect.setSelected(true);
            pendingSelectIdRef.current = null;
          }
        }
      },
      [ensureLockedRowsSelected]
    );
  
    // 행 정렬: isError인 행을 상단으로
    const sortRows = (rows: AgGridRow[]) => {
      return [...rows].sort((a, b) => {
        if (a.isError === b.isError) return 0;
        return a.isError ? -1 : 1;
      });
    };
    const toggleError = (id: number | string) => {
      setRowData((prev) => {
        const updated = prev.map((row) => (row.id == id ? { ...row, isError: !row.isError } : row));
        // 완전히 새 배열로 반환
        return [...sortRows(updated)];
      });
    };

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
        field: 'field2',
        width: attributeColumnWidth[10],
        headerClass: 'px-0!',
        cellClass: () => 'text-right editable-cell [&_input]:text-right',
        editable: true,
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
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
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '목적물상세',
        field: 'field4',
        width: attributeColumnWidth[10],
        cellClass: 'editable-cell',
        cellClassRules: editableCellClassRules,
        editable: true,
      },
      {
        headerName: '수용장소상세',
        field: 'field5',
        width: attributeColumnWidth[10],
        cellClassRules: editableCellClassRules,
        cellClass: 'editable-cell',
        editable: true,
      },
      {
        headerName: '건물내/외',
        field: 'field6',
        width: attributeColumnWidth[10],
        cellClassRules: editableCellClassRules,
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
        cellRenderer: expiryCellRenderer('left'),
      },
      {
        headerName: '지하수용',
        field: 'field7',
        width: attributeColumnWidth[10],
        cellClassRules: editableCellClassRules,
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
        cellRenderer: expiryCellRenderer('left'),
      },
      {
        headerName: '야적물건',
        field: 'field8',
        width: attributeColumnWidth[10],
        cellClassRules: editableCellClassRules,
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
        cellRenderer: expiryCellRenderer('left'),
      },
    ],
    [attributeColumnWidth, editableCellClassRules, expiryCellRenderer, ]
  );

  const columnDefs2: ColDef<AgGridRow2>[] = useMemo(
    () => [
      {
        headerName: '',
        field: 'field1',
        width: attributeColumnWidth[8],
        spanRows: true,
        cellClass: 'flex! items-center! justify-center! text-center',
      },
      {
        headerName: '',
        field: 'field2',
        flex: 1,
        cellClass: 'text-left',
        suppressMovable: true, // 이동 방지
        headerComponent: productNameHeader,
        cellRenderer: productNameCellRenderer,
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
        field: 'field4',
        width: attributeColumnWidth[9],
        cellClass: () => 'text-right editable-cell [&_input]:text-right',
        cellClassRules: {
          ...amountCellClassRules,
          'style-select': (params) => !!params.data?.isSelectedField4,
          isStandardGroup: (params) => !!(params.data?.isStandard?.group && !params.data?.isStandard?.edit),
          isStandard: (params) => !!params.data?.isStandard?.edit,
          'tooltip-on': (params) => !!params.data?._tooltipOn,
        },
        cellEditorSelector: (params: EditableCallbackParams): CellEditorSelectorResult | undefined => {
          // isStandardGroup이면 에디터 비활성화
          if (params.data?.isStandard?.group && !params.data?.isStandard?.edit) {
            return undefined;
          }
          const isSelectedField4 = params.data?.isSelectedField4 ?? false;
          if (!isSelectedField4) {
            return {
              component: AmountWithPopoverCellEditor,
              params: { step: 500 }, // Popover에서 조정할 단위 설정
            };
          } else {
            const baseOptions = ['1천만원', '2천만원', '3천만원', '5천만원', '1억원'];
            return {
              component: 'agSelectCellEditor',
              params: { values: baseOptions },
            };
          }
        },
        // valueFormatter: numberValueFormatter<AgGridRow>,
        cellRenderer: (params: ICellRendererParams<AgGridRow2>) => {
          // isStandardGroup(비편집) 셀 클릭 시 같은 filePath 그룹의 isStandard.edit 셀의 툴팁을 항상 보여줌
          const isSelectedField4 = params.data?.isSelectedField4 ?? false;

          // 금액 콤마 포맷 적용
          const value = params.value;
          let display = value;
          if (!isSelectedField4) {
            if (typeof value === 'number') {
              display = value.toLocaleString();
            } else if (typeof value === 'string' && value !== '') {
              // 숫자형 문자열만 콤마 적용
              const num = Number(value.replace(/[^\d.-]/g, ''));
              display = isNaN(num) ? value : num.toLocaleString();
            }
          }
          // 버튼 클릭 시 그룹 내 isStandard(edit) 셀에 tooltip-on 3초간 부여

          return isSelectedField4
            ? expiryCellRenderer2('left')(params)
            : numberValueFormatter<AgGridRow2>(params as ValueFormatterParams<AgGridRow2>);
        },
        editable: (params: EditableCallbackParams) => {
          return true;
        },
      },
      {
        headerName: '만기',
        field: 'field5',
        width: attributeColumnWidth[9],
        cellClass: 'text-center',
        headerClass: 'px-0!',
      },
      {
        headerName: '납기',
        field: 'field6',
        width: attributeColumnWidth[9],
        cellClass: 'editable-cell',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['5년', '10년', '15년', '20년', '25년', '30년', '35년', '전기납'],
        },
      },
      {
        headerName: '보험료(원)',
        field: 'field7',
        width: attributeColumnWidth[9],
        cellClass: 'text-right ',
        cellEditor: 'agSelectCellEditor',
      },
    ],
    [attributeColumnWidth, productNameHeader]
  );

  

  return (
    <>
      <form
        id="page2-MainForm"
        className="w-full h-full"
        onSubmit={(event) => {
          event.preventDefault();
          setTestError(!testError);
        }}
        noValidate
      >
        <LayoutMain className="grid grid-rows-[auto_1fr_auto] gap-[1rem] h-full">
          <TabPager
            data={Tabs}
            active={TabActive}
            setActive={TabSetActive}
            visibleCount={5}
            removable={true}
            error={testError}
            errorMsg="입력하세요."
            getValue={(tab) => String(tab.id)}
            renderTab={(tab) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center">
                    <span className="max-w-20 truncate block">{tab.name}</span>
                    {tab.age && tab.gender && <span className="block">{`${tab.age}세(${tab.gender})`}</span>}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  <BulletList className="gap-[0.5rem]">
                    {(tab.info ?? []).map((info: string, index: number) => (
                      <BulletListItem key={index} type="dot">
                        {info}
                      </BulletListItem>
                    ))}
                  </BulletList>
                </TooltipContent>
              </Tooltip>
            )}
            renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => (
              <Button
                variant={'none'}
                key={String(tab.id)}
                onClick={() => {
                  setActive(String(tab.id));
                  const idx = data.findIndex((t) => String(t.id) === String(tab.id));
                  if (idx !== -1) {
                    const page = Math.floor(idx / visibleCount);
                    setVisibleStart(page * visibleCount);
                  }
                }}
              >
                <span className="flex items-start gap-2 w-full">
                  <span className="block">{tab.name}</span>
                  <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                </span>
              </Button>
            )}
          />

          <LayoutMainBody>
            <ResizablePanelGroup orientation="vertical" className="w-full">
              <ResizablePanel defaultSize={50}>
                <Grid className="w-full grid grid-rows-[auto_1fr] h-full" gap={1}>
                  <Grow placement={'bwc'} className="gap-1 w-full" gap={0}>
                    <Grow className="gap-1.5">
                      <Typo variant="heading-sm">화재기본담보</Typo>
                      <Typo variant="body-md">(060400, (1))</Typo>
                    </Grow>
                    <Grow className="gap-2.5">
                      <Grow className="gap-1">
                        <NativeSelect
                          aria-label="실손전부보상"
                          width={140}
                          size={'sm'}
                          readOnly={false}
                          required={false}
                        >
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
                      onRowDataUpdated={handleRowDataUpdated}
                      suppressRowHoverHighlight={false}
                      
                      getRowClass={(params) => (params.data?.isError ? 'isError' : '')}
                     
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      suppressAnimationFrame={true}
                      suppressColumnMoveAnimation={true}
                      suppressRowTransform={true}
                      animateRows={false}
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
                  <div className={`ag-theme-alpine${showProductNameTooltip ? ' show-product-tooltip' : ''}`}>
                    <AgGridReact<AgGridRow2>
                      enableCellSpan={true}
                      rowData={DummyData2}
                      columnDefs={columnDefs2}
                      getRowId={(params) => String(params.data.id)}
                      rowSelection={{
                        mode: 'multiRow' as const,
                        checkboxes: true,
                        headerCheckbox: false,
                        enableClickSelection: false,
                        enableSelectionWithoutKeys: true,
                      }}
                      onCellClicked={handleGridCellClickToggle2}
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
                      onRowDataUpdated={handleRowDataUpdated}
                      suppressRowHoverHighlight={false}
                      tooltipShowDelay={0}
                      tooltipHideDelay={9999}
                      tooltipMouseTrack={true}

                      getRowClass={(params) => (params.data?.isError ? 'isError' : '')}
                     
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
                    'w-[36%]',
                    'min-w-[8rem]',
                    'w-[30%]',
                    'min-w-[8rem]',
                    'w-[30%]',
                    'min-w-[8rem]',
                    'min-w-[15rem]',
                  ]}
                >
                  <FormRow>
                    <FormCell title="만기금(환급률)" style={{ borderBottom: '0.1rem solid #ccc' }}>
                      <Button variant={'outlined'} color={'gray'} size={'sm'}>
                        예상
                      </Button>
                      <Input
                        type="tel"
                        commaAmount={true}
                        value={100000}
                        size={'md'}
                        width={'full'}
                        readOnly={true}
                        className="[&_input]:text-right [&_input]:tracking-[-0.03rem] [&_input]:color-[#000]!"
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Input
                            type="text"
                            commaAmount={true}
                            value={39.4}
                            size={'md'}
                            width={60}
                            className="[&_input]:text-right shrink-0 cursor-pointer"
                          />
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
                      %
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
                            error={testError}
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
        </LayoutMain>
      </form>
    </>
  );
}
