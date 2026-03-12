'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { CellClassParams, ColDef, EditableCallbackParams, ICellRendererParams, ITooltipParams, SelectionChangedEvent, ValueFormatterParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { LayoutMainHead, LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { Grow, Gcol, Typo } from '@atoms';
import { AmountUnitInput } from '@features/AmountUnitInput';
import { LNIPL020Step2 as MainFoot } from '@features/MainFoot';
import { PaperIcon, PlusIcon, ResetIcon, SearchIcon, SelectArrowIcon, SizeIcon } from '@icons';
import { LayoutScrollWrap, LayoutScrollItem } from '@common/LayoutScroll';
import { ErrorMsg } from '@common/ErrorMsg';
import { HashList } from '@common/HashList';
import { TabPager } from '@common/TabPager';
import { BulletList, BulletListItem } from '@common/BulletList';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@uiux/HoverCard';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Checkbox } from '@uiux/Checkbox';

import type { LTRA020_2_DataType } from '@/features/pub/proto/data/LTRA020_2_Data';
import { DUMMY_LTRA020_DATA } from '@/features/pub/proto/data/LTRA020_2_Data';
import { useTabs } from '@/shared/hooks/useTabs';

// 기본은 인라인 구성.
// 전용 훅으로 전환하려면 아래 import와 각 섹션의 HOOK MODE 코드를 사용.
// import { useLNIPL020Grid } from '@/features/pub/proto/hooks/useLNIPL020Grid';
// import { useLNIPL020Tabs } from '@/features/pub/proto/hooks/useLNIPL020Tabs';

type PlanFiltersData = LTRA020_2_DataType['planFilters'];
type MainHeadTab = PlanFiltersData['tabList'][number] & { value: string };
type LNIPL020GridRow = LTRA020_2_DataType['coverageGrid']['agGridTable1'][number];

interface LNIPL020_2Props {
  onSelectPlan?: (planId: number) => void;
  isWidthExpanded?: boolean;
  setIsWidthExpanded?: (value: boolean) => void;
}

ModuleRegistry.registerModules([AllCommunityModule]);

export function LNIPL020_2({
  onSelectPlan,
  isWidthExpanded = false,
  setIsWidthExpanded,
}: LNIPL020_2Props) {
  // 테이블 크기 조정
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);
  
  // ---------------------------------------------------------------------------
  // INLINED STATE (default)
  // ---------------------------------------------------------------------------
  const amountInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false });
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  const [gridKey, setGridKey] = useState(0);

  const handleCheckedChange = (key: string) => (checked: boolean | 'indeterminate') => {
    setCheckedMap((map) => ({ ...map, [key]: !!checked }));
  };

  // ---------------------------------------------------------------------------
  // 1) Data source
  // ---------------------------------------------------------------------------
  const planFilters = DUMMY_LTRA020_DATA.planFilters;
  const coverageGrid = DUMMY_LTRA020_DATA.coverageGrid;

  // ---------------------------------------------------------------------------
  // 2) Tabs
  // ---------------------------------------------------------------------------
  const stringifiedTabs: MainHeadTab[] = planFilters.tabList.map((item) => ({
    ...item,
    value: String(item.value),
  }));

  const {
    tabs: LNIPL020_tabs,
    active: LNIPL020_active,
    setActive: LNIPL020_setActive,
  } = useTabs<MainHeadTab>(stringifiedTabs);

  // HOOK MODE (tabs)
  // const {
  //   tabs: LNIPL020_tabs,
  //   active: LNIPL020_active,
  //   setActive: LNIPL020_setActive,
  // } = useLNIPL020Tabs(planFilters);

  // ---------------------------------------------------------------------------
  // 3) Grid data
  // ---------------------------------------------------------------------------
  const rowData = coverageGrid.agGridTable1;

  const handleSelectionChanged = useCallback(
    (event: SelectionChangedEvent<LNIPL020GridRow>) => {
      const selectedNodes = event.api.getSelectedNodes();
      if (selectedNodes.length > 0) {
        const selectedData = selectedNodes[0].data;
        if (selectedData && typeof onSelectPlan === 'function') {
          onSelectPlan(selectedData.id);
        }
      }
    },
    [onSelectPlan]
  );

  const duplicateRenderer = useCallback((params: ICellRendererParams<LNIPL020GridRow>) => {
    const isDuplicate = params.value as boolean;
    return isDuplicate ? (
      <Grow className="w-full h-full flex items-center justify-center">
        <Button
          aria-label="고객 추가"
          variant={'outlined'}
          only={'icon'}
          size={'sm'}
          color={'gray-light'}
          onClick={() => alert('추가')}
        >
          <PlusIcon color={'var(--color-gray-30)'} />
        </Button>
      </Grow>
    ) : (
      ''
    );
  }, []);

  const productNameHeader = useCallback(() => {
    const [coverageName, setCoverageName] = useState('');

    const handleTooltipCheck = (checked: boolean | 'indeterminate') => {
      setShowProductNameTooltip(!!checked);
      if (!checked) setGridKey((key) => key + 1);
    };

    return (
      <Grow className="w-full" placement={'bwc'}>
        <Grow className="gap-1.5" placement={'sc'}>
          <Checkbox variant={'text'} checked={checkedMap.selected} onCheckedChange={handleCheckedChange('selected')}>
            선택 24건
          </Checkbox>
          <Typo variant={'body-sm'} className="text-[var(--color-gray-20)] text-[1.1rem]">
            |
          </Typo>
          <Checkbox variant={'text'} checked={checkedMap.unselected} onCheckedChange={handleCheckedChange('unselected')}>
            미선택
          </Checkbox>
        </Grow>

        <Grow>
          <Input
            aria-label="담보명"
            placeholder="담보명 입력"
            type="text"
            width={'md'}
            size={'sm'}
            clear={true}
            value={coverageName}
            onChange={(e) => setCoverageName(e.target.value)}
          />
          <Button aria-label="담보명 검색" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grow>

        <Grow placement={'sc'}>
          <Checkbox size={'sm'} checked={showProductNameTooltip} onCheckedChange={handleTooltipCheck}>
            담보명 풍선말
          </Checkbox>
        </Grow>
      </Grow>
    );
  }, [checkedMap, showProductNameTooltip]);

  const titleRenderer = useCallback((params: ICellRendererParams<LNIPL020GridRow>) => {
    return (
      <Grow className="h-full pr-1.5" placement={'bwc'}>
        <div className="border-r border-[var(--color-gray-10)] h-full flex items-center w-[3rem] justify-center">{params.data?.id}</div>
        <p className="truncate w-full pl-2 flex-1">{params.data?.productName}</p>
        {params.data?.badge && (
          <Grow className="shrink-0">
            {params.data.badge.includes('독립') && <Badge color={'green'} className="w-[3rem]">독립</Badge>}
            {params.data.badge.includes('갱신') && <Badge color={'blue'} className="w-[3rem]">갱신</Badge>}
          </Grow>
        )}
      </Grow>
    );
  }, []);

  const expiryCellRenderer = useCallback((params: ICellRendererParams<LNIPL020GridRow>) => {
    return (
      <div className="flex items-center justify-center gap-1 w-full h-full">
        <span className="block w-[6rem] text-right">{params.value}</span>
        {params.data?.canEditExpiry ? (
          <SelectArrowIcon size={14} color={'var(--color-gray-50)'} />
        ) : (
          <SelectArrowIcon size={14} color={'var(--color-gray-20)'} />
        )}
      </div>
    );
  }, []);

  const columnDefs: ColDef<LNIPL020GridRow>[] = useMemo(
    () => [
      {
        headerName: '담보명',
        field: 'productName',
        width: isWidthExpanded ? 510 : 426,
        cellClass: 'text-left p-0!',
        sortable: false,
        filter: false,
        autoHeight: true,
        pinned: 'left',
        suppressMovable: true, // 이동 방지
        lockPosition: 'left', // 왼쪽 고정 유지
        lockPinned: true, // 고정 열에서 제외 방지
        tooltipValueGetter: (params: ITooltipParams<LNIPL020GridRow>) => {
          if (!params.data) return '';
          return `담보명: ${params.data.productName}`;
        },
        headerComponent: productNameHeader,
        cellRenderer: titleRenderer,
      },
      {
        headerName: '속성',
        field: 'attribute',
        width: 10,
        cellClass: 'text-center',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        resizable: false,
        cellRenderer: (params: ICellRendererParams<LNIPL020GridRow>) => {
          if (!params.value) return null;
          return (
            <div className="flex flex-wrap gap-1 justify-center items-center w-full h-full">
              <Button only={'icon'} variant={'none'} size={'sm'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            </div>
          );
        },
      },
      {
        headerName: '가입금액(만원)',
        field: 'coverageAmount',
        flex: 1.6,
        headerClass: 'px-0!',
        cellClass: () => 'text-right editable-cell [&_input]:text-right px-0!',
        sortable: false,
        filter: false,
        editable: false,
        cellRenderer: (params: ICellRendererParams<LNIPL020GridRow>) => {
          const rowIndex = params.node?.rowIndex ?? 0;
          if (!amountInputRefs.current) amountInputRefs.current = [];
          return (
            <AmountUnitInput
              value={params.value}
              onChange={(newValue) => {
                if (params.setValue) params.setValue(newValue);
              }}
              inputRef={(el) => {
                amountInputRefs.current[rowIndex] = el;
              }}
              onEnter={() => {
                const nextRef = amountInputRefs.current[rowIndex + 1];
                if (nextRef) nextRef.focus();
              }}
            />
          );
        },
      },
      {
        headerName: '가능금액(만원)',
        field: 'availableAmount',
        flex: 1.6,
        cellClass: 'text-right',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        valueFormatter: (params: ValueFormatterParams<LNIPL020GridRow>) => {
          return params.value ? params.value.toLocaleString() : '';
        },
      },
      {
        headerName: '만기',
        field: 'expiryPeriod',
        width: 60,
        cellClass: 'text-center editable-cell px-[0.2rem]!',
        sortable: false,
        filter: false,
        resizable: false,
        editable: (params: EditableCallbackParams<LNIPL020GridRow>) => params.data?.canEditExpiry ?? false,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'],
        },
        cellRenderer: expiryCellRenderer,
      },
      {
        headerName: '납기',
        field: 'paymentPeriod',
        width: 60,
        cellClass: 'text-center editable-cell px-[0.2rem]!',
        sortable: false,
        filter: false,
        resizable: false,
        editable: (params: EditableCallbackParams<LNIPL020GridRow>) => params.data?.canEditExpiry ?? false,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['5년', '10년', '15년', '20년', '25년', '30년', '35년', '전기납'],
        },
        cellRenderer: expiryCellRenderer,
      },
      {
        headerName: '보험료(만원)',
        field: 'premium',
        flex: 1.4,
        cellClass: 'text-right',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        valueFormatter: (params: ValueFormatterParams<LNIPL020GridRow>) => {
          return params.value ? params.value.toLocaleString() : '';
        },
      },
      {
        headerName: '예상UW',
        field: 'expectedUwResult',
        headerClass: 'px-0!',
        flex: 1,
        cellClass: 'text-center px-0! tracking-tighter',
        sortable: false,
        filter: false,
        cellStyle: (params: CellClassParams<LNIPL020GridRow>) => {
          const value = params.value as string;
          if (value === '인수') return { color: '#006FF2' };
          if (value === '거절' || value === '조건부인수') return { color: '#FB3F3F' };
          return undefined;
        },
      },
      {
        headerName: '중복',
        field: 'isDuplicate',
        width: 30,
        headerClass: 'text-center px-0!',
        cellClass: 'text-center px-0!',
        sortable: false,
        filter: false,
        cellRenderer: duplicateRenderer,
        resizable: false,
      },
    ],
    [duplicateRenderer, expiryCellRenderer, isWidthExpanded, productNameHeader, titleRenderer]
  );

  // HOOK MODE (grid)
  // const {
  //   columnDefs,
  //   gridKey,
  //   handleSelectionChanged,
  //   showProductNameTooltip,
  // } = useLNIPL020Grid({
  //   isWidthExpanded,
  //   onSelectPlan,
  // });

  return (
    <>
      <LayoutMainHead>
        <TabPager 
          // removable={true}
          // onRemove={LNIPL020_handleRemove}
          variant={'outlined'}
          data={LNIPL020_tabs} 
          active={LNIPL020_active}
          setActive={LNIPL020_setActive}
          visibleCount={planFilters.visibleCount}
          getValue={tab => String(tab.value)}
          renderTab={tab => (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div>
                  <span className="flex items-center">
                    <span className="max-w-20 truncate block">{tab.name}</span>
                    <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                  </span>
                  {tab.error && (
                    <ErrorMsg aria-live="polite" show={true} position={'tl'} id={'test'}>
                      입력하세요.
                    </ErrorMsg>
                  )}
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <BulletList>
                  {tab.info.map((info: string, index: number) => (
                    <BulletListItem key={index} type="dot">
                      {info}
                    </BulletListItem>
                  ))}
                </BulletList>
              </HoverCardContent>
            </HoverCard>
          )}
          renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => (  
            <Button
              variant={'text'}
              key={String(tab.value)}
              onClick={() => {
                setActive(String(tab.value));
                const idx = data.findIndex((t) => String(t.value) === String(tab.value));
                if (idx !== -1) {
                  const page = Math.floor(idx / visibleCount);
                  setVisibleStart(page * visibleCount);
                }
              }}
            >
              <span className="flex items-center gap-2">
                <span className="block">{tab.name}</span>
                <span className="block">{`${tab.age}세(${tab.gender})`}</span>
              </span>
            </Button>
          )}
        >
          <Gcol variant={'box'} placement={'ss'} className={`w-full ${!isHeightExpanded ? '' : 'hidden'}`} >
            <Grow gap={3}>
              <Button variant={'contained'} color={'coolgray'} size={'md'}>
                <PaperIcon />
                담보패키지 선택
              </Button>
              <Grow className="flex-wrap" placement={'ss'}>
                {planFilters.checkboxList1.map((category: PlanFiltersData['checkboxList1'][number]) => (
                  <Checkbox key={category.value} variant={'button'}>
                    {category.label}
                  </Checkbox>
                ))}
              </Grow>
            </Grow>

            <Grow gap={3} className="w-full" placement={'bwc'}>
              <Grow gap={3} className="w-full" placement={'ss'}>
                <Grow className="flex-wrap shrink-0" placement={'ss'}>
                  {planFilters.checkboxList2.map((category: PlanFiltersData['checkboxList2'][number]) => (
                    <Checkbox key={category.value} variant={'button'}>
                      {category.label}
                    </Checkbox>
                  ))}
                </Grow>
                <HashList data={planFilters.hashList} />
              </Grow>
              <Grow placement={'ec'}>
                <Button variant={'contained'} color={'coolgray'} size={'lg'}>
                  <ResetIcon />
                  초기화
                </Button>
              </Grow>
            </Grow>
          </Gcol>
        </TabPager>
      </LayoutMainHead>
      
      <LayoutMainBody>
        <LayoutScrollWrap className="grid-rows-[auto_1fr]">
          <LayoutScrollItem className="w-full">
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
                  <NativeSelect aria-label="플랜 선택" width={'sm'} size={'sm'} readOnly={false} required={false}>
                    <NativeSelectOption value="">플랜 선택</NativeSelectOption>
                    <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
                  </NativeSelect>
                  <NativeSelect aria-label="나만의 설계선택" width={'lg'} size={'sm'} readOnly={false} required={false}>
                    <NativeSelectOption value="">나만의 설계선택</NativeSelectOption>
                    <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
                  </NativeSelect>
                  <Button variant={'outlined'} color={'gray'} size={'md'} onClick={() => setIsHeightExpanded(!isHeightExpanded)}>
                    <SizeIcon color="var(--color-secondary-50)" className="rotate-90" />
                  </Button>
                  <Button variant={'outlined'} color={'gray'} size={'md'} onClick={() => setIsWidthExpanded?.(!isWidthExpanded)}>
                    <SizeIcon color="var(--color-secondary-50)" />
                  </Button>
                </Grow>
              </Grow>
            </Grow>
          </LayoutScrollItem>
          <LayoutScrollItem className="w-full">
            <div className="ag-theme-alpine">
              <AgGridReact<LNIPL020GridRow>
                key={gridKey}
                rowData={rowData}
                columnDefs={columnDefs}

                rowSelection={{
                  mode: 'multiRow' as const,
                  headerCheckbox: true,      // 헤더에 전체 선택 체크박스 표시
                  checkboxes: true,          // 각 행에 체크박스 표시
                  enableClickSelection: false, // 행 본문 클릭 시에는 선택 안 됨
                  isRowSelectable: (params) => !params.data?.locked,
                }}
                selectionColumnDef={{
                  width: 40,
                  pinned: 'left',
                  cellClass: 'text-center p-0!',
                  cellClassRules: {
                    'pointer-events-none': params => !!params.data?.locked,
                  },
                }}

                onGridReady={(params) => {
                  params.api.forEachNode((node) => {
                    if (node.data?.locked) node.setSelected(true);
                  });
                }}
                // isRowSelectable={(node) => !node.data?.locked}

                suppressRowHoverHighlight={false}
                onSelectionChanged={handleSelectionChanged}
                singleClickEdit={true} // 한 번의 클릭으로 편집 활성화
                tooltipShowDelay={showProductNameTooltip ? 0 : undefined}
                tooltipHideDelay={showProductNameTooltip ? 9999 : undefined}
                tooltipMouseTrack={showProductNameTooltip ? true : undefined}
                getRowClass={(params) => (params.data?.isHighlighted ? 'ag-row-highlighted' : '')}
              />
            </div>
          </LayoutScrollItem>
        </LayoutScrollWrap>
      </LayoutMainBody>

      <LayoutMainFoot>
         <MainFoot />
      </LayoutMainFoot>
    </>
  );
}
