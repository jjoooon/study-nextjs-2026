'use client';

import type { CellClassParams, ColDef, GridApi, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
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
  useDynamicPx,
} from '@aggrid';
import { Grow, Gcol, Typo, Divider } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormRow, FormTable, FormCell } from '@common/FormTable';
import { HashList } from '@common/HashList';
import { LayoutScrollWrap, LayoutScrollItem } from '@common/LayoutScroll';
import { TabPager } from '@common/TabPager';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PaperIcon, ResetIcon, SearchIcon, SizeIcon } from '@icons';
import { LayoutMainHead, LayoutMainBody, LayoutMainFoot, LayoutMain } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350MainBody } from '@layout/LayoutTemplate';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';

import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

// data
import type { Ltpa350Step2DataType, Ltpa350Step2DataType2 } from '../data/ltpa350Step2Data';
import { Ltpa350Step2Data, Ltpa350Step2Data2 } from '../data/ltpa350Step2Data';

ModuleRegistry.registerModules([AllCommunityModule]);

type ViewKey = 'view1' | 'view2' | 'view3' | 'view4' | 'view5';

type LTPA350GridRow =
  | (Ltpa350Step2DataType['agGridTable1'][number] & { isDuplicate?: boolean; displayNo?: number })
  | (Ltpa350Step2DataType2['agGridTable1'][number] & { isDuplicate?: boolean; displayNo?: number });
type MainHeadTab = (Ltpa350Step2DataType['tabList'][number] | Ltpa350Step2DataType2['tabList'][number]) & {
  value: string;
};

interface Ltpa350Step2Props {
  onSelectPlan?: (planId: number) => void;
  isWidthExpanded?: boolean;
  setIsWidthExpanded?: (value: boolean) => void;
  viewKey: ViewKey;
}

export function Ltpa350Step2({
  onSelectPlan,
  isWidthExpanded = false,
  setIsWidthExpanded,
  viewKey,
}: Ltpa350Step2Props) {
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
  const colWidth0 = useDynamicPx(40);
  const colWidth1 = useDynamicPx(60);
  const colWidth2 = useDynamicPx(100);
  const colWidth3 = useDynamicPx(120);
  const colWidth4 = useDynamicPx(140);
  const attributeColumnWidth = useMemo(
    () => [colWidth0, colWidth1, colWidth2, colWidth3, colWidth4],
    [colWidth0, colWidth1, colWidth2, colWidth3, colWidth4]
  );

  // 2) Tabs/rowData 분기
  const isFetus = viewKey === 'view2';
  const tabListData = isFetus ? Ltpa350Step2Data2.tabList : Ltpa350Step2Data.tabList;
  const stringifiedTabs: MainHeadTab[] = tabListData.map((item) => ({
    ...item,
    value: String(item.id),
  }));
  const {
    tabs: LTPA350Tabs,
    active: LTPA350Active,
    setActive: Ltpa350SetActive,
  } = useTabs<MainHeadTab>(stringifiedTabs);

  // 3) Grid data
  const [rowData, setRowData] = useState<LTPA350GridRow[]>(
    isFetus ? Ltpa350Step2Data2.agGridTable1 : Ltpa350Step2Data.agGridTable1
  );

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

  // 셀: 순번 · 담보명 텍스트 · 독립/갱신 뱃지
  const titleRenderer = useCallback((params: ICellRendererParams<LTPA350GridRow>) => {
    // 전체 rowData에서 원본(복사본 아님)만 필터링
    const api = params.api;
    const allRows: LTPA350GridRow[] = [];
    api.forEachNode((node) => {
      if (node.data) allRows.push(node.data);
    });
    const originals = allRows.filter((r) => !r.isDuplicate);

    // 원본 행의 id → 순번 매핑
    const idToOrder = new Map<number, number>();
    originals.forEach((row, idx) => {
      idToOrder.set(row.id, idx + 1);
    });

    if (!params.data || !params.data.isDuplicate) {
      // 원본 행: 1,2,3...
      const order = params.data ? (idToOrder.get(params.data.id) ?? '') : '';
      return (
        <Grow className="h-full pr-1.5" placement={'bwc'}>
          <Grow className="border-r border-(--color-gray-10) h-full items-center w-[3rem] justify-center">{order}</Grow>
          <p className="truncate w-full pl-1.5 flex-1">{params.data?.field1 ?? ''}</p>
          {params.data?.badge && (
            <Grow className="shrink-0">
              {params.data.badge.includes('독립') && (
                <Badge color={'green'} className="w-[3rem]">
                  독립
                </Badge>
              )}
              {params.data.badge.includes('갱신') && (
                <Badge color={'blue'} className="w-[3rem]">
                  갱신
                </Badge>
              )}
            </Grow>
          )}
        </Grow>
      );
    } else {
      // 복사 행: 원본 순번-복사 인덱스
      const originId = params.data.displayNo;
      const order = originId !== undefined ? (idToOrder.get(originId) ?? '') : '';
      // 같은 원본에서 복사된 행들 중 현재 행의 인덱스
      const sameOriginCopies = allRows.filter((r) => r.isDuplicate && r.displayNo === originId);
      const myIdx = sameOriginCopies.findIndex((r) => r === params.data) + 1;
      return (
        <Grow className="h-full pr-1.5" placement={'bwc'}>
          <Grow className="border-r border-(--color-gray-10) h-full items-center w-[3rem] justify-center">
            {order}-{myIdx}
          </Grow>
          <p className="truncate w-full pl-1.5 flex-1">{params.data?.field1 ?? ''}</p>
          {params.data?.badge && (
            <Grow className="shrink-0">
              {params.data.badge.includes('독립') && (
                <Badge color={'green'} className="w-[3rem]">
                  독립
                </Badge>
              )}
              {params.data.badge.includes('갱신') && (
                <Badge color={'blue'} className="w-[3rem]">
                  갱신
                </Badge>
              )}
            </Grow>
          )}
        </Grow>
      );
    }
  }, []);

  // ── 속성 열 (field2) ─────────────────────────────────────────────────────────
  // 셀: 속성 값이 있을 때 돋보기 아이콘 버튼 표시
  const attributeRenderer = (params: ICellRendererParams<LTPA350GridRow>) => {
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
  const coverageAmountCellRenderer = (params: ICellRendererParams<LTPA350GridRow>) =>
    amountUnitInputCellRenderer<LTPA350GridRow>({ ...params, amountInputRefs: amountInputRefs.current });

  // ── 만기/납기 열 (field5, field6) ────────────────────────────────────────────
  // 셀: 드롭다운 선택 렌더러 (선택 여부에 따라 편집 가능/불가 아이콘 표시)
  const expiryCellRenderer = useCallback(
    (params: ICellRendererParams<LTPA350GridRow>) => editableSelectCellRenderer<LTPA350GridRow>(params),
    []
  );

  // 만기/납기 편집 조건 생성기: 'whenSelected' | 'always' 모드를 인자로 받아 editable 콜백 반환
  const getEditableCallback = useCallback(
    (mode: 'always' | 'whenSelected') => createEditableCallback<LTPA350GridRow>(mode),
    []
  );

  // 만기 편집 가능 셀 스타일: 행 선택 시 editable-cell 클래스 적용 (선택 변경 시 refreshCells로 즉시 반영)
  // 납기는 항상 editable이므로 cellClass에 editable-cell을 고정으로 포함 → 별도 rules 불필요
  const editableCellClassRules = useMemo(
    () => ({
      'editable-cell': (params: CellClassParams<LTPA350GridRow>) => {
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
    const isAmountRequired = (params: CellClassParams<LTPA350GridRow>) => {
      // field3Required가 존재하는 경우만 사용, 없으면 true로 처리
      if (typeof params.data !== 'undefined' && 'field3Required' in params.data) {
        return (params.data as { field3Required?: boolean }).field3Required ?? true;
      }
      return true;
    };
    const isAmountInvalid = (params: CellClassParams<LTPA350GridRow>) =>
      params.value === '' || params.value === undefined || Number(params.value) === 0;

    return {
      required: isAmountRequired,
      ...createCellErrorClassRules<LTPA350GridRow>((params) => isAmountRequired(params) && isAmountInvalid(params)),
    };
  }, []);

  // ── 중복 열 (field9) ──────────────────────────────────────────────────────────
  // 셀: 행 복사 버튼 — 행이 선택(체크)된 경우에만 노출/동작
  const duplicateRenderer = useMemo(
    () =>
      createInsertCopiedRowButtonCellRenderer<LTPA350GridRow, 'id'>(setRowData, {
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
    []
  );

  // ── 행 선택 핸들러 ────────────────────────────────────────────────────────────
  // locked 행은 항상 선택 상태 유지 (체크박스 해제 방지)
  const ensureLockedRowsSelected = useCallback((api: GridApi<LTPA350GridRow>) => {
    api.forEachNode((node) => {
      if (node.data?.locked && !node.isSelected()) {
        node.setSelected(true);
      }
    });
  }, []);

  // 선택된 행의 id를 부모(onSelectPlan)로 전달
  const handleSelectionChanged = useMemo(
    () => createSelectionChangedHandler<LTPA350GridRow, number>('id', onSelectPlan),
    [onSelectPlan]
  );

  // 그리드 선택 변경 통합 핸들러: locked 행 유지 → 부모 전달 → 만기/납기 셀 스타일 즉시 갱신
  const handleGridSelectionChanged = useCallback(
    (event: SelectionChangedEvent<LTPA350GridRow>) => {
      ensureLockedRowsSelected(event.api);
      handleSelectionChanged(event);
      event.api.refreshCells({
        force: true,
        columns: ['field5', 'field6', 'field9'],
      });
    },
    [ensureLockedRowsSelected, handleSelectionChanged]
  );
  const handleGridCellClickToggle = useMemo(() => createCellClickSelectionToggleHandler<LTPA350GridRow>(), []);

  // 인보험
  const columnDefs: ColDef<LTPA350GridRow>[] = useMemo(
    () => [
      {
        headerName: '담보명',
        field: 'field1',
        flex: 1,
        cellClass: 'text-left p-0!',
        sortable: false,
        filter: false,
        autoHeight: true,
        suppressMovable: true, // 이동 방지
        lockPosition: 'left', // 왼쪽 고정 유지
        lockPinned: true, // 고정 열에서 제외 방지
        tooltipValueGetter: createTooltipValueGetter<LTPA350GridRow>({
          label: '담보명',
          field: 'field1',
        }),
        headerComponent: productNameHeader,
        cellRenderer: titleRenderer,
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
        width: attributeColumnWidth[2],
        headerClass: 'px-0!',
        cellClass: () => 'text-right editable-cell [&_input]:text-right px-0!',
        cellClassRules: amountCellClassRules,
        sortable: false,
        filter: false,
        editable: false,
        cellRenderer: coverageAmountCellRenderer,
      },
      {
        headerName: '가능금액(만원)',
        field: 'field4',
        width: attributeColumnWidth[2],
        cellClass: 'text-right',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        valueFormatter: numberValueFormatter<LTPA350GridRow>,
      },
      {
        headerName: '만기',
        field: 'field5',
        width: attributeColumnWidth[1],
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
        cellRenderer: expiryCellRenderer,
      },
      {
        headerName: '납기',
        field: 'field6',
        width: attributeColumnWidth[1],
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
        cellRenderer: expiryCellRenderer,
      },
      {
        headerName: '보험료(만원)',
        field: 'field7',
        width: attributeColumnWidth[1],
        cellClass: 'text-right',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        valueFormatter: numberValueFormatter<LTPA350GridRow>,
      },
      {
        headerName: '예상UW',
        field: 'field8',
        headerClass: 'px-0!',
        width: attributeColumnWidth[1],
        cellClass: 'text-center px-0! tracking-tighter',
        sortable: false,
        filter: false,
        cellStyle: (params: CellClassParams<LTPA350GridRow>) => {
          const value = params.value as string;
          if (value === '인수') return { color: '#006FF2' };
          if (value === '거절' || value === '조건부인수') return { color: '#FB3F3F' };
          return undefined;
        },
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
      titleRenderer,
    ]
  );
  // 태아
  const columnDefs2: ColDef<LTPA350GridRow>[] = useMemo(
    () => [
      {
        headerName: '담보명',
        field: 'field1',
        flex: 1,
        cellClass: 'text-left p-0!',
        sortable: false,
        filter: false,
        autoHeight: true,
        suppressMovable: true, // 이동 방지
        lockPosition: 'left', // 왼쪽 고정 유지
        lockPinned: true, // 고정 열에서 제외 방지
        tooltipValueGetter: createTooltipValueGetter<LTPA350GridRow>({
          label: '담보명',
          field: 'field1',
        }),
        headerComponent: productNameHeader,
        cellRenderer: titleRenderer,
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
        width: attributeColumnWidth[2],
        headerClass: 'px-0!',
        cellClass: () => 'text-right editable-cell [&_input]:text-right px-0!',
        cellClassRules: amountCellClassRules,
        sortable: false,
        filter: false,
        editable: false,
        cellRenderer: coverageAmountCellRenderer,
      },
      {
        headerName: '보험료(원)',
        cellClass: 'text-right',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        children: [
          {
            field: 'field4',
            headerName: '출생전',
            width: attributeColumnWidth[1],
            valueFormatter: numberValueFormatter<LTPA350GridRow>,
          },
          {
            field: 'field4',
            headerName: '출생후',
            width: attributeColumnWidth[1],
            valueFormatter: numberValueFormatter<LTPA350GridRow>,
          },
        ],
      },
      {
        headerName: '만기',
        cellClass: 'text-center px-[0.2rem]!',
        sortable: false,
        filter: false,
        resizable: false,
        children: [
          {
            field: 'field5',
            headerName: '출생전',
            width: attributeColumnWidth[1],
            cellClass: 'text-center px-[0.2rem]!',
            cellClassRules: editableCellClassRules, // 선택 시에만 editable-cell 클래스 적용
            editable: getEditableCallback('whenSelected'), // 선택 시에만 편집 허용
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'],
            },
            cellRenderer: expiryCellRenderer,
          },
          {
            field: 'field5',
            headerName: '출생후',
            width: attributeColumnWidth[1],
            cellClass: 'text-center px-[0.2rem]!',
            cellClassRules: editableCellClassRules, // 선택 시에만 editable-cell 클래스 적용
            editable: getEditableCallback('whenSelected'), // 선택 시에만 편집 허용
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'],
            },
            cellRenderer: expiryCellRenderer,
          },
        ],
      },
      {
        headerName: '납기',
        cellClass: 'text-center px-[0.2rem]!',
        sortable: false,
        filter: false,
        resizable: false,
        children: [
          {
            field: 'field6',
            headerName: '출생후',
            width: attributeColumnWidth[0],
            cellClass: 'text-center px-[0.2rem]!',
            cellClassRules: editableCellClassRules, // 선택 시에만 editable-cell 클래스 적용
            editable: getEditableCallback('whenSelected'), // 선택 시에만 편집 허용
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'],
            },
            cellRenderer: expiryCellRenderer,
          },
        ],
      },
      {
        headerName: '예상UW',
        field: 'field8',
        headerClass: 'px-0!',
        width: attributeColumnWidth[2],
        cellClass: 'text-center px-0! tracking-tighter',
        sortable: false,
        filter: false,
        cellStyle: (params: CellClassParams<LTPA350GridRow>) => {
          const value = params.value as string;
          if (value === '인수') return { color: '#006FF2' };
          if (value === '거절' || value === '조건부인수') return { color: '#FB3F3F' };
          return undefined;
        },
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
      titleRenderer,
    ]
  );
  // 재물
  const columnDefs3: ColDef<LTPA350GridRow>[] = useMemo(
    () => [
      {
        headerName: '담보명',
        field: 'field1',
        flex: 1,
        cellClass: 'text-left p-0!',
        sortable: false,
        filter: false,
        autoHeight: true,
        suppressMovable: true, // 이동 방지
        lockPosition: 'left', // 왼쪽 고정 유지
        lockPinned: true, // 고정 열에서 제외 방지
        tooltipValueGetter: createTooltipValueGetter<LTPA350GridRow>({
          label: '담보명',
          field: 'field1',
        }),
        headerComponent: productNameHeader,
        cellRenderer: titleRenderer,
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
        width: attributeColumnWidth[2],
        headerClass: 'px-0!',
        cellClass: () => 'text-right editable-cell [&_input]:text-right px-0!',
        cellClassRules: amountCellClassRules,
        sortable: false,
        filter: false,
        editable: false,
        cellRenderer: coverageAmountCellRenderer,
      },
      {
        headerName: '가능금액(만원)',
        field: 'field4',
        width: attributeColumnWidth[2],
        cellClass: 'text-right',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        valueFormatter: numberValueFormatter<LTPA350GridRow>,
      },
      {
        headerName: '만기',
        field: 'field5',
        width: attributeColumnWidth[1],
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
        cellRenderer: expiryCellRenderer,
      },
      {
        headerName: '납기',
        field: 'field6',
        width: attributeColumnWidth[1],
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
        cellRenderer: expiryCellRenderer,
      },
      {
        headerName: '보험료(만원)',
        field: 'field7',
        width: attributeColumnWidth[1],
        cellClass: 'text-right',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        valueFormatter: numberValueFormatter<LTPA350GridRow>,
      },
      {
        headerName: '예상UW',
        field: 'field8',
        headerClass: 'px-0!',
        width: attributeColumnWidth[1],
        cellClass: 'text-center px-0! tracking-tighter',
        sortable: false,
        filter: false,
        cellStyle: (params: CellClassParams<LTPA350GridRow>) => {
          const value = params.value as string;
          if (value === '인수') return { color: '#006FF2' };
          if (value === '거절' || value === '조건부인수') return { color: '#FB3F3F' };
          return undefined;
        },
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
      titleRenderer,
    ]
  );

  const [amount, setAmount] = useState('0');
  const [refundRate, setRefundRate] = useState('39.4');
  const [testError, setTestError] = useState(false);

  return (
    <LayoutTemplateLTPA350MainBody
      mainBody={
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
              data={LTPA350Tabs}
              active={LTPA350Active}
              setActive={Ltpa350SetActive}
              visibleCount={5}
              error={testError}
              errorMsg="입력하세요."
              getValue={(tab) => String(tab.id)}
              renderTab={(tab) => (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex items-center">
                      <span className="max-w-20 truncate block">{tab.name}</span>
                      <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={8}>
                    <BulletList>
                      {tab.info.map((info: string, index: number) => (
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
            >
              <Gcol variant={'box-round-b'} placement={'ss'} className={`w-full ${!isHeightExpanded ? '' : 'hidden'}`}>
                <Grow gap={3}>
                  <Button variant={'contained'} color={'coolgray-light'} size={'md'}>
                    <PaperIcon />
                    담보패키지 선택
                  </Button>
                  <Grow className="flex-wrap" placement={'ss'}>
                    {[
                      { label: '사망후유', value: '0' },
                      { label: '3대진단', value: '1' },
                      { label: '입원일당', value: '2' },
                      { label: '수술비', value: '3' },
                      { label: '골절/화상', value: '4' },
                      { label: '운전비용', value: '5' },
                      { label: '치료비', value: '6' },
                      { label: '기타', value: '7' },
                    ].map((category) => (
                      <Checkbox key={category.value} variant={'button'}>
                        {category.label}
                      </Checkbox>
                    ))}
                  </Grow>
                </Grow>

                <Grow gap={3} className="w-full" placement={'bwc'}>
                  <Grow gap={3} className="w-full" placement={'ss'}>
                    <Grow className="flex-wrap shrink-0" placement={'ss'}>
                      {[
                        { label: '갱신', value: '1' },
                        { label: '비갱신', value: '2' },
                      ].map((category) => (
                        <Checkbox key={category.value} variant={'button'}>
                          {category.label}
                        </Checkbox>
                      ))}
                    </Grow>
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
            </TabPager>

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
                      <NativeSelect
                        aria-label="나만의 설계선택"
                        width={140}
                        size={'sm'}
                        readOnly={false}
                        required={false}
                      >
                        <NativeSelectOption value="">나만의 설계선택</NativeSelectOption>
                        <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
                      </NativeSelect>
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
                  {/* 인보험 */}
                  {viewKey === 'view1' && (
                    <div className="ag-theme-alpine">
                      <AgGridReact<LTPA350GridRow>
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
                        onGridReady={(params) => {
                          ensureLockedRowsSelected(params.api);
                        }}
                        onRowDataUpdated={(params) => {
                          ensureLockedRowsSelected(params.api);
                        }}
                        suppressRowHoverHighlight={false}
                        getRowClass={(params) => {
                          if (params.data?.isDuplicate) return 'is-duplicate';
                          if (params.data?.isHighlighted) return 'ag-row-highlighted';
                          return '';
                        }}
                        tooltipShowDelay={showProductNameTooltip ? 0 : undefined}
                        tooltipHideDelay={showProductNameTooltip ? 9999 : undefined}
                        tooltipMouseTrack={showProductNameTooltip ? true : undefined}
                      />
                    </div>
                  )}

                  {/* 태아 */}
                  {viewKey === 'view2' && (
                    <div className="ag-theme-alpine">
                      <AgGridReact<LTPA350GridRow>
                        key={gridKey}
                        rowData={rowData}
                        columnDefs={columnDefs2}
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
                        onGridReady={(params) => {
                          ensureLockedRowsSelected(params.api);
                        }}
                        onRowDataUpdated={(params) => {
                          ensureLockedRowsSelected(params.api);
                        }}
                        suppressRowHoverHighlight={false}
                        getRowClass={(params) => {
                          if (params.data?.isDuplicate) return 'is-duplicate';
                          if (params.data?.isHighlighted) return 'ag-row-highlighted';
                          return '';
                        }}
                        tooltipShowDelay={showProductNameTooltip ? 0 : undefined}
                        tooltipHideDelay={showProductNameTooltip ? 9999 : undefined}
                        tooltipMouseTrack={showProductNameTooltip ? true : undefined}
                      />
                    </div>
                  )}
                </LayoutScrollItem>
              </LayoutScrollWrap>
            </LayoutMainBody>

            <LayoutMainFoot>
              <MainBottom>
                <MainBottomItem>
                  <FormTable
                    className="w-[auto]"
                    lineTop={false}
                    variant={'bottom'}
                    cols={['w-[9rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]']}
                  >
                    <FormRow>
                      <FormCell title="만기금(환급률)">
                        <Button variant={'outlined'} color={'gray'} size={'sm'}>
                          예상
                        </Button>
                        <Input
                          type="tel"
                          commaAmount={true}
                          value={100000}
                          width={100}
                          readOnly={true}
                          className="[&_input]:text-right [&_input]:tracking-[-0.03rem] [&_input]:color-[#000]!"
                        />
                        <Input
                          type="text"
                          commaAmount={true}
                          value={refundRate}
                          onChange={(e) => setRefundRate(e.target.value)}
                          width={60}
                          className="[&_input]:text-right"
                        />
                        %
                      </FormCell>
                      <FormCell title="보장보험료">
                        <Input
                          type="tel"
                          commaAmount={true}
                          value={100000}
                          width={100}
                          readOnly={true}
                          className="[&_input]:text-right"
                        />
                      </FormCell>
                      <FormCell title="적립보험료">
                        <Input
                          type="tel"
                          commaAmount={true}
                          value={100000}
                          width={100}
                          readOnly={true}
                          className="text-right"
                        />
                      </FormCell>
                    </FormRow>
                  </FormTable>
                  <FormTable className="w-[auto]" lineTop={false} variant={'bottom'} cols={['w-[7rem]', '']}>
                    <FormRow>
                      <FormCell title="합계보험료">
                        <Input
                          type="tel"
                          commaAmount={true}
                          value={amount}
                          clear={true}
                          width={130}
                          onChange={(e) => {
                            setAmount(e.target.value);
                            setTestError(!e.target.value);
                          }}
                          required={true}
                          error={testError}
                          errorMsg={'계약자 입력은 필수입니다.'}
                          errorPs={'tr'}
                          className="text-right font-bold"
                        />
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </MainBottomItem>
                <MainBottomItem>
                  <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={handleActionButtonClick}>
                    고지유형별보험료비교
                  </Button>
                  <Grow className="gap-1">
                    <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={handleActionButtonClick}>
                      조건별비교설계
                    </Button>
                    <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={handleActionButtonClick}>
                      다른상품설계
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
      }
    />
  );
}
