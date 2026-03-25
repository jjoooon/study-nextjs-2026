'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { CellClassParams, ColDef, EditableCallbackParams, ICellRendererParams, ITooltipParams, SelectionChangedEvent, ValueFormatterParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { amountUnitInputCellRenderer, editableSelectCellRenderer, numberValueFormatter, productNameTooltipValueGetter, createSelectionChangedHandler } from '@/shared/components/aggrid/aggridComponents';
import { LayoutMainHead, LayoutMainBody, LayoutMainFoot, LayoutMain } from '@layout/BaseLayout';
import { Grow, Gcol, Typo } from '@atoms';
import { AmountUnitInput } from '@features/AmountUnitInput';
import { LTPA350Step2 as MainFoot } from '@features/MainFoot';
import { PaperIcon, PlusIcon, ResetIcon, SearchIcon, SizeIcon } from '@icons';
import { LayoutScrollWrap, LayoutScrollItem } from '@common/LayoutScroll';
import { HashList } from '@common/HashList';
import { TabPager } from '@common/TabPager';
import { BulletList, BulletListItem } from '@common/BulletList';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@uiux/HoverCard';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Checkbox } from '@uiux/Checkbox';
import { useTabs } from '@/shared/hooks/useTabs';

import type { LTPA350Step2DataType } from '../data/LTPA350Step2Data';
import { LTPA350Step2Data } from '../data/LTPA350Step2Data';

type tabListDataData = LTPA350Step2DataType['tabList'];
type LTPA350GridRow = LTPA350Step2DataType['agGridTable1'][number];
type MainHeadTab = tabListDataData[number] & { value: string };

interface LTPA350Step2Props {
  onSelectPlan?: (planId: number) => void;
  isWidthExpanded?: boolean;
  setIsWidthExpanded?: (value: boolean) => void;
}

ModuleRegistry.registerModules([AllCommunityModule]);

export function LTPA350Step2({
  onSelectPlan,
  isWidthExpanded = false,
  setIsWidthExpanded,
}: LTPA350Step2Props) {

  // TEST용: TabPager 에러 상태 (보험료계산(지침) 클릭 시 토글)
  const [tabError, setTabError] = useState(false);

  // ---------------------------------------------------------------------------
  // 1) INLINED STATE (default)
  // ---------------------------------------------------------------------------
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);
  const amountInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false });
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  const [gridKey, setGridKey] = useState(0);

  const handleCheckedChange = (key: string) => (checked: boolean | 'indeterminate') => {
    setCheckedMap((map) => ({ ...map, [key]: !!checked }));
  };

  // ---------------------------------------------------------------------------
  // 2) Tabs
  // ---------------------------------------------------------------------------
  const stringifiedTabs: MainHeadTab[] = LTPA350Step2Data.tabList.map((item) => ({
    ...item,
    value: String(item.value),
  }));

  const {
    tabs: LTPA350_tabs,
    active: LTPA350_active,
    setActive: LTPA350_setActive,
  } = useTabs<MainHeadTab>(stringifiedTabs);

  // ---------------------------------------------------------------------------
  // 3) Grid data
  // ---------------------------------------------------------------------------
  const rowData = LTPA350Step2Data.agGridTable1;

  // 중복 셀 렌더러 (중복 여부에 따라 추가 버튼 노출)
  const duplicateRenderer = useCallback((params: ICellRendererParams<LTPA350GridRow>) => {
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

  // 담보명 헤더 렌더러 (선택/미선택 체크박스 + 검색창 + 담보명 풍선말 토글)
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
          <Typo variant={'body-sm'} className="text-(--color-gray-20) text-[1.1rem]">
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
          <Checkbox size={'md'} checked={showProductNameTooltip} onCheckedChange={handleTooltipCheck}>
            담보명 풍선말
          </Checkbox>
        </Grow>
      </Grow>
    );
  }, [checkedMap, showProductNameTooltip]);

  // 담보명 셀 렌더러
  const titleRenderer = useCallback((params: ICellRendererParams<LTPA350GridRow>) => {
    return (
      <Grow className="h-full pr-1.5" placement={'bwc'}>
        <div className="border-r border-(--color-gray-10) h-full flex items-center w-[3rem] justify-center">{params.data?.id}</div>
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

  // 만기/납기 셀 렌더러 (공통 컴포넌트 활용)
  const expiryCellRenderer = (params: ICellRendererParams<LTPA350GridRow>) => editableSelectCellRenderer<LTPA350GridRow>(params);

  // 가입금액(만원) 셀 렌더러 (공통 컴포넌트 활용)
  const coverageAmountCellRenderer = (params: ICellRendererParams<LTPA350GridRow>) => amountUnitInputCellRenderer<LTPA350GridRow>({ ...params, amountInputRefs: amountInputRefs.current });

  // 속성 셀 렌더러
  const attributeRenderer = (params: ICellRendererParams<LTPA350GridRow>) => {
    if (!params.value) return null;
    return (
      <div className="flex flex-wrap gap-1 justify-center items-center w-full h-full">
        <Button only={'icon'} variant={'none'} size={'sm'}>
          <SearchIcon color={'var(--color-primary-50)'} />
        </Button>
      </div>
    );
  };

  // 선택 행 정보 전달 (공용 핸들러 활용)
  const handleSelectionChanged = useCallback(
    createSelectionChangedHandler<LTPA350GridRow, number>('id', onSelectPlan),
    [onSelectPlan]
  );

  const columnDefs: ColDef<LTPA350GridRow>[] = useMemo(
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
        tooltipValueGetter: productNameTooltipValueGetter<LTPA350GridRow>,
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
        cellRenderer: attributeRenderer,
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
        cellRenderer: coverageAmountCellRenderer,
      },
      {
        headerName: '가능금액(만원)',
        field: 'availableAmount',
        flex: 1.6,
        cellClass: 'text-right',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        valueFormatter: numberValueFormatter<LTPA350GridRow>,
      },
      {
        headerName: '만기',
        field: 'expiryPeriod',
        width: 60,
        cellClass: 'text-center editable-cell px-[0.2rem]!',
        sortable: false,
        filter: false,
        resizable: false,
        editable: (params: EditableCallbackParams<LTPA350GridRow>) => params.data?.canEditExpiry ?? false,
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
        editable: (params: EditableCallbackParams<LTPA350GridRow>) => params.data?.canEditExpiry ?? false,
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
        valueFormatter: numberValueFormatter<LTPA350GridRow>,
      },
      {
        headerName: '예상UW',
        field: 'expectedUwResult',
        headerClass: 'px-0!',
        flex: 1,
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
  // } = useLTPA350Grid({
  //   isWidthExpanded,
  //   onSelectPlan,
  // });

  return (
    <LayoutMain className="grid grid-rows-[auto_1fr_auto] gap-[1rem]">
      <LayoutMainHead>
        <TabPager 
          // removable={true}
          // onRemove={LTPA350_handleRemove}
          data={LTPA350_tabs} 
          active={LTPA350_active}
          setActive={LTPA350_setActive}
          visibleCount={5}
          error={tabError}
          errorMsg="입력하세요."
          getValue={tab => String(tab.value)}
          renderTab={tab => (
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="flex items-center">
                  <span className="max-w-20 truncate block">{tab.name}</span>
                  <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                </span>
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
                {[
                  { label: '사망후유', value: '0' },
                  { label: '3대진단', value: '1' },
                  { label: '입원일당', value: '2' },
                  { label: '수술비', value: '3' },
                  { label: '골절/화상', value: '4' },
                  { label: '운전비용', value: '5' },
                  { label: '치료비', value: '6' },
                  { label: '기타', value: '7' },
                ].map(category => (
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
                  ].map(category => (
                    <Checkbox key={category.value} variant={'button'}>
                      {category.label}
                    </Checkbox>
                  ))}
                </Grow>
                <HashList data={['암', '뇌', '심', '수술', '특정', '표적', '치료', '골절', '화상', '치매', '심', '수술', '특정', '표적', '치료']} />
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
              <AgGridReact<LTPA350GridRow>
                key={gridKey}
                rowData={rowData}
                columnDefs={columnDefs}
                getRowId={(params) => String(params.data.id)}

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
        <MainFoot onCalcGuidelineClick={() => setTabError((prev) => !prev)} />
      </LayoutMainFoot>
    </LayoutMain>
  );
}
