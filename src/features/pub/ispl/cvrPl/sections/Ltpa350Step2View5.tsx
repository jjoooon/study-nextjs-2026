'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import type { CellClassParams, ColDef, GridApi, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Accordion } from '@/shared/components/uiux/Accordion';
import {
  amountUnitInputCellRenderer,
  editableSelectCellRenderer,
  numberValueFormatter,
  createInsertCopiedRowButtonCellRenderer,
  createSelectionChangedHandler,
  createCellClickSelectionToggleHandler,
  createTooltipValueGetter,
  createEditableCallback,
  createCellErrorClassRules,
  useDynamicColumnWidths,
  CoveragePopover,
} from '@aggrid';
import { Grow, Gcol, Typo, Divider } from '@atoms';
import { FormRow, FormTable, FormCell } from '@common/FormTable';
import { HashList } from '@common/HashList';
import { KeyValueList } from '@common/KeyValueList';
import { LayoutScrollWrap, LayoutScrollItem } from '@common/LayoutScroll';
import { SelectDrop } from '@common/SelectDrop';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { ChevronDownIcon, PaperIcon, ResetIcon, SaveIcon, SearchIcon, SizeIcon } from '@icons';
import { LayoutMainBody, LayoutMainFoot, LayoutMain } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';

ModuleRegistry.registerModules([AllCommunityModule]);

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
  field9?: string | number | boolean;
  field10?: {
    title: string;
    description: string;
    info: string[];
  };
  locked?: boolean;
  isHighlighted?: boolean;
  badge?: string[];
  [key: string]: unknown;
}
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field1:
      '적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료적립보험료',
    field2: true,
    field3: 500,
    field4: 450,
    field5: '80세',
    field6: '20년',
    field7: 100,
    field8: '인수',
    field9: true,
    field10: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: true,

    isHighlighted: true,
  },
  {
    id: 2,
    field1: '적립보험료2',
    field2: true,
    field3: 300,
    field4: 280,
    field5: '100세',
    field6: '30년',
    field7: 80,
    field8: '인수',
    field9: false,
    field10: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
  },
  {
    id: 3,
    field1: '적립보험료3',
    field2: false,
    field3: 400,
    field4: 380,
    field5: '90세',
    field6: '25년',
    field7: 120,
    field8: '인수',
    field9: false,
    field10: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    isHighlighted: false,
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

interface Ltpa350Step2Props {
  onSelectPlan?: (planId: number) => void;
  isWidthExpanded?: boolean;
  setIsWidthExpanded?: (value: boolean) => void;
}

export function Ltpa350Step2View5({ onSelectPlan, isWidthExpanded = false, setIsWidthExpanded }: Ltpa350Step2Props) {
  // 1) INLINED STATE (default)
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);
  const amountInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false });
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  const [gridKey, setGridKey] = useState(0);
  const handleActionButtonClick = useCallback(() => {}, []);
  const handleCheckedChange = (key: string) => (checked: boolean | 'indeterminate') => {
    setCheckedMap((map) => ({ ...map, [key]: !!checked }));
  };

  // Dynamic widths based on zoom scale
  const { attributeColumnWidth } = useDynamicColumnWidths();

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

  // ── 담보명 열 (field1) ────────────────────────────────────────────────────────
  // 헤더: 선택/미선택 카운트 체크박스 + 담보명 검색 입력 + 말풍선 토글
  const [coverageName, setCoverageName] = useState('');
  const productNameHeader = useCallback(() => {
    const handleTooltipCheck = (checked: boolean | 'indeterminate') => {
      setShowProductNameTooltip(!!checked);
      if (!checked) setGridKey((key) => key + 1);
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
          <Input
            aria-label="담보명"
            placeholder="담보명 입력"
            type="text"
            width={'full'}
            size={'sm'}
            clear={true}
            value={coverageName}
            onChange={(e) => setCoverageName(e.target.value)}
          />
          <Button aria-label="담보명 검색" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
          <Button
            aria-label="담보명 초기화"
            variant={'outlined'}
            color={'gray-light'}
            only={'icon'}
            size={'md'}
            onClick={() => setCoverageName('')}
          >
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

  // ── 속성 열 (field2) ─────────────────────────────────────────────────────────
  // 셀: 속성 값이 있을 때 돋보기 아이콘 버튼 표시
  const attributeRenderer = (params: ICellRendererParams<AgGridRow>) => {
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

  // ── 가입금액 열 (field3) ──────────────────────────────────────────────────────
  // 셀: 금액 입력 컴포넌트 (ref 배열로 포커스 제어 지원)
  const coverageAmountCellRenderer = (params: ICellRendererParams<AgGridRow>) =>
    amountUnitInputCellRenderer<AgGridRow>({ ...params, amountInputRefs: amountInputRefs.current });

  // ── 만기/납기 열 (field5, field6) ────────────────────────────────────────────
  // 셀: 드롭다운 선택 렌더러 (선택 여부에 따라 편집 가능/불가 아이콘 표시)
  const expiryCellRenderer = useCallback(
    (align: 'left' | 'center' | 'right' = 'right') =>
      (params: ICellRendererParams<AgGridRow>) =>
        editableSelectCellRenderer<AgGridRow>({ ...params, align }),
    []
  );

  // 만기/납기 편집 조건 생성기: 'whenSelected' | 'always' 모드를 인자로 받아 editable 콜백 반환
  const getEditableCallback = useCallback(
    (mode: 'always' | 'whenSelected') => createEditableCallback<AgGridRow>(mode),
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

  // ── 중복 열 (field9) ──────────────────────────────────────────────────────────
  // 셀: 행 복사 버튼 — 행이 선택(체크)된 경우에만 노출/동작
  const duplicateRenderer = useMemo(
    () =>
      createInsertCopiedRowButtonCellRenderer<AgGridRow, 'id'>(setRowDataWithTracking, {
        idKey: 'id',
        getNextId: (rows) => rows.reduce((maxId, row) => (row.id > maxId ? row.id : maxId), 0) + 1,
        patchCopiedRow: (originalRow, nextId) => ({
          id: nextId,
          displayNo: originalRow.id, // 복사 행은 원본 id를 표시용 번호로
          isDuplicate: true,
        }),
        isVisible: (params) => {
          const isDuplicateEnabled = Boolean(params.value);
          const isRowChecked = params.node?.isSelected?.() ?? false;
          const isCopiedRow = params.data?.field9 === false;
          return isDuplicateEnabled && isRowChecked && !isCopiedRow;
        },
        ariaLabel: '동일 담보 추가',
      }),
    [setRowDataWithTracking]
  );

  // ── 행 선택 핸들러 ────────────────────────────────────────────────────────────
  // locked 행은 항상 선택 상태 유지 (체크박스 해제 방지)
  const ensureLockedRowsSelected = useCallback((api: GridApi<AgGridRow>) => {
    api.forEachNode((node) => {
      if (node.data?.locked && !node.isSelected()) {
        node.setSelected(true);
      }
    });
  }, []);

  // 선택된 행의 id를 부모(onSelectPlan)로 전달
  const handleSelectionChanged = useMemo(
    () => createSelectionChangedHandler<AgGridRow, number>('id', onSelectPlan),
    [onSelectPlan]
  );

  // 그리드 선택 변경 통합 핸들러: locked 행 유지 → 중복 행 선택 해제 시 삭제 → 부모 전달 → 셀 스타일 갱신
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
      handleSelectionChanged(event);
      event.api.refreshCells({
        force: true,
        columns: ['field5', 'field6', 'field9'],
      });
    },
    [ensureLockedRowsSelected, handleSelectionChanged]
  );
  const handleGridCellClickToggle = useMemo(() => createCellClickSelectionToggleHandler<AgGridRow>(), []);

  // 그리드 준비 핸들러: locked 행 초기 선택 + 선택 상태 초기화
  const handleGridReady = useCallback(
    (params: { api: GridApi<AgGridRow> }) => {
      ensureLockedRowsSelected(params.api);
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

  // 연금/저축
  const columnDefs: ColDef<AgGridRow>[] = useMemo(
    () => [
      {
        headerName: '담보명',
        field: 'field1',
        flex: 1,
        cellClass: 'text-left',
        sortable: false,
        filter: false,
        autoHeight: true,
        suppressMovable: true, // 이동 방지
        lockPosition: 'left', // 왼쪽 고정 유지
        lockPinned: true, // 고정 열에서 제외 방지
        tooltipValueGetter: createTooltipValueGetter<AgGridRow>({
          label: '담보명',
          field: 'field1',
        }),
        headerComponent: productNameHeader,
        cellRenderer: (params: ICellRendererParams<AgGridRow>) => {
          return <CoveragePopover text={String(params.data?.field1 ?? '')} data={params.data?.field10} />;
        },
      },
      {
        headerName: '속성',
        field: 'field2',
        width: attributeColumnWidth[0],
        cellClass: 'text-center',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        resizable: false,
        cellRenderer: attributeRenderer,
      },
      {
        headerName: '가입금액(만원)',
        field: 'field3',
        width: attributeColumnWidth[4],
        headerClass: 'px-0!',
        cellClass: () => 'text-right editable-cell [&_input]:text-right px-0!',
        cellClassRules: amountCellClassRules,
        sortable: false,
        filter: false,
        editable: false,
        cellRenderer: coverageAmountCellRenderer,
      },
      {
        headerName: '만기',
        field: 'field5',
        width: attributeColumnWidth[2],
        cellClass: 'text-center px-[0.2rem]!',
        cellClassRules: editableCellClassRules,
        sortable: false,
        filter: false,
        resizable: false,
        editable: getEditableCallback('whenSelected'),
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'],
        },
        cellRenderer: expiryCellRenderer('left'),
      },
      {
        headerName: '납기',
        field: 'field6',
        width: attributeColumnWidth[2],
        cellClass: 'text-center px-[0.2rem]!',
        cellClassRules: editableCellClassRules,
        sortable: false,
        filter: false,
        resizable: false,
        editable: getEditableCallback('whenSelected'),
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['5년', '10년', '15년', '20년', '25년', '30년', '35년', '전기납'],
        },
        cellRenderer: expiryCellRenderer('left'),
      },
      {
        headerName: '보험료(원)',
        field: 'field7',
        width: attributeColumnWidth[3],
        cellClass: 'text-right',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        valueFormatter: numberValueFormatter<AgGridRow>,
      },
      {
        headerName: '중복',
        field: 'field9',
        width: attributeColumnWidth[0],
        headerClass: 'text-center px-0!',
        cellClass: 'text-center px-0!',
        sortable: false,
        filter: false,
        cellRenderer: duplicateRenderer,
        resizable: false,
      },
    ],
    [
      amountCellClassRules,
      attributeColumnWidth,
      duplicateRenderer,
      expiryCellRenderer,
      getEditableCallback,
      editableCellClassRules,
      productNameHeader,
      // titleRenderer,
    ]
  );

  const [testError, setTestError] = useState(false);

  return (
    <LayoutMainBody>
      <form
        id="page2-MainForm"
        className="w-full h-full"
        onSubmit={(event) => {
          event.preventDefault();
          setTestError(!testError);
        }}
        noValidate
      >
        <LayoutMain
          className={`grid ${!isHeightExpanded ? 'grid-rows-[auto_1fr_auto]' : 'grid-rows-[1fr_auto]'} gap-[1rem] h-full`}
        >
          <Gcol variant={'box-round-b'} placement={'ss'} className={`w-full ${!isHeightExpanded ? '' : 'hidden'}`}>
            <Grow gap={3}>
              <Button variant={'contained'} color={'coolgray-light'} size={'md'}>
                <PaperIcon />
                담보패키지 선택
              </Button>
              <CheckboxGroup
                className="gap-1 flex-wrap"
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
            </Grow>

            <Grow gap={3} className="w-full" placement={'bwc'}>
              <Grow gap={3} className="w-full" placement={'ss'}>
                <CheckboxGroup
                  className="gap-1 flex-nowrap shrink-0"
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

                <HashList
                  data={[
                    '암',
                    '뇌',
                    '심',
                    '수술',
                    '특정',
                    '표적',
                    '치료',
                    '골절',
                    '화상',
                    '치매',
                    '심',
                    '수술',
                    '특정',
                    '표적',
                    '치료',
                  ]}
                />
              </Grow>
              <Grow placement={'ec'}>
                <Button variant={'outlined'} only="icon" color={'gray'} size={'lg'}>
                  <ResetIcon color="var(--color-gray-500)" />
                </Button>
              </Grow>
            </Grow>
          </Gcol>

          <LayoutMainBody>
            <LayoutScrollWrap className="grid-rows-[auto_1fr]">
              <Grow placement={'bwc'} className="gap-1 w-full pb-1">
                <Grow className="gap-1.5">
                  <Typo variant="heading-sm">100세만기 · 20년납입 · 월납 · 20년 갱신 · 1형</Typo>
                  <Button variant={'outlined'} color={'gray'} size={'md'}>
                    변경
                  </Button>
                </Grow>
                <Grow className="gap-2.5">
                  <Checkbox>담보초기화</Checkbox>
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

                    <Button
                      variant={'outlined'}
                      color={'gray'}
                      size={'md'}
                      onClick={() => setIsHeightExpanded(!isHeightExpanded)}
                    >
                      <SizeIcon color="var(--color-secondary-50)" className="rotate-90" />
                    </Button>
                    <Button
                      variant={'outlined'}
                      color={'gray'}
                      size={'md'}
                      onClick={() => setIsWidthExpanded?.(!isWidthExpanded)}
                    >
                      <SizeIcon color="var(--color-secondary-50)" />
                    </Button>
                  </Grow>
                </Grow>
              </Grow>
              <LayoutScrollItem className="w-full">
                <div className="ag-theme-alpine">
                  <AgGridReact<AgGridRow>
                    key={gridKey}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    getRowId={(params) => String(params.data.id)}
                    singleClickEdit={true} // 한 번의 클릭으로 편집 활성화
                    rowSelection={{
                      mode: 'multiRow' as const,
                      checkboxes: true,
                      headerCheckbox: true,
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
                    getRowClass={(params) => {
                      if (params.data?.isDuplicate) return 'is-duplicate';
                      return '';
                    }}
                    tooltipShowDelay={showProductNameTooltip ? 0 : undefined}
                    tooltipHideDelay={showProductNameTooltip ? 9999 : undefined}
                    tooltipMouseTrack={showProductNameTooltip ? true : undefined}
                  />
                </div>
              </LayoutScrollItem>
            </LayoutScrollWrap>
          </LayoutMainBody>
          <LayoutMainFoot>
            <MainBottom>
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
              <MainBottomItem>
                <Grow></Grow>
                <Grow className="gap-1">
                  <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={handleActionButtonClick}>
                    상품비교설계
                  </Button>
                  <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={handleActionButtonClick}>
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
    </LayoutMainBody>
  );
}
