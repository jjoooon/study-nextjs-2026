'use client';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ICellRendererParams, ITooltipParams, ValueFormatterParams, EditableCallbackParams, CellClassParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState, useCallback, useRef } from 'react';

import type { LNIPL020DataType } from '@/features/pub/proto/data/LNIPL020Data';

// components - atoms
import { Grow, Typo } from '@atoms';
// components - icons
import { SizeIcon, PlusIcon, SelectArrowIcon, SearchIcon } from '@icons';
import { LayoutScrollWrap, LayoutScrollItem } from '@common/LayoutScroll';
// components - uiux
import { Button } from '@uiux/Button';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Checkbox } from '@uiux/Checkbox';
import { Badge } from '@uiux/Badge';
import { Input } from '@uiux/Input';
// components - features
import { AmountUnitInput } from '@features/AmountUnitInput'; 

interface LNIPL020MainBodyProps {
  data: LNIPL020DataType['mainBody'];
  selectedPlanId?: number | null;
  onSelectPlan?: (planId: number) => void;
  hideAside: boolean;
  setHideAside: (hide: boolean) => void;
}

ModuleRegistry.registerModules([AllCommunityModule]);

export function LNIPL020MainBody({
  data,
  selectedPlanId: _selectedPlanId,
  onSelectPlan,
  hideAside,
  setHideAside,
}: LNIPL020MainBodyProps) {
  const rowData = data.agGridTable1;

  // AmountUnitInput 포커스 이동용 ref 배열
  const amountInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // AmountUnitInput 오픈 셀 관리
  const [openedCellId, setOpenedCellId] = useState<string | null>(null);
 
  // AgGrid 선택 상태 관리 로직을 직접 구현
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const handleSelectionChanged = useCallback(
    (event: { api: any }) => {
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

  // duplicateRenderer를 useCallback으로 메모이제이션
  const duplicateRenderer = useCallback((params: ICellRendererParams<LNIPL020DataType['mainBody']['agGridTable1'][number]>) => {
    const isDuplicate = params.value as boolean;
    return isDuplicate ? (
      <Grow className="w-full h-full flex items-center justify-center">
        <Button
          aria-label="고객 추가"
          variant="outlined"
          only="icon" size="sm"
          color="gray-light"
          onClick={() => alert('추가')}
        >
          <PlusIcon color="var(--color-gray-30)" />
        </Button>
      </Grow>
    ) : (
      ''
    );
  }, []);


  // '전체 343' 체크박스 상태 관리
  const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false });
  const handleCheckedChange = (key: string) => (checked: boolean | 'indeterminate') => {
    setCheckedMap(map => ({ ...map, [key]: !!checked }));
  };

  // 담보명 풍선말(tooltip) 표시 여부 상태
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  // 강제 리렌더용 키
  const [gridKey, setGridKey] = useState(0);

  // 담보명 헤더 컴포넌트를 useCallback으로 메모이제이션하여 불필요한 리렌더링 방지
  const productNameHeader = useCallback(
    () => {
      const [coverageName, setCoverageName] = useState('');
      const handleTooltipCheck = (checked: boolean | 'indeterminate') => {
        setShowProductNameTooltip(!!checked);
        // 체크 해제 시 강제 리렌더로 툴팁 강제 닫힘
        if (!checked) setGridKey(k => k + 1);
      };
      return (
        <Grow className="gap-1 w-full" placement="bwc">
          <Grow className="gap-1.5" placement="sc">
            <Checkbox variant="text" checked={checkedMap.selected} onCheckedChange={handleCheckedChange('selected')}>선택 24건</Checkbox>
            <Typo variant="body-sm" className="text-[var(--color-gray-20)] text-[1.1rem]">|</Typo>
            <Checkbox variant="text" checked={checkedMap.unselected} onCheckedChange={handleCheckedChange('unselected')}>미선택</Checkbox>
          </Grow>

          <Grow className="gap-1">
            <Input
              aria-label="담보명"
              placeholder="담보명 입력"
              type="text"
              width='md'
              size="sm"
              clear={true}
              value={coverageName}
              onChange={(e) => setCoverageName(e.target.value)}
            />
            <Button aria-label="담보명 검색" variant="outlined" color="gray-light" only="icon" size="md">
              <SearchIcon color="var(--color-primary-50)" />
            </Button>
          </Grow>

          <Grow className="gap-1" placement="sc">
            <Checkbox size="sm" checked={showProductNameTooltip} onCheckedChange={handleTooltipCheck}>
              담보명 풍선말
            </Checkbox>
          </Grow>
        </Grow>
      )
    },
    [checkedMap, setCheckedMap, showProductNameTooltip]
  );

  // titleRenderer: productName 셀 커스텀 렌더러
  const titleRenderer = useCallback((params: ICellRendererParams<LNIPL020DataType['mainBody']['agGridTable1'][number]>) => {
    return (
      <Grow className="h-full pr-1.5" placement='bwc'>
        <div className="border-r border-[var(--color-gray-10)] h-full flex items-center w-[3rem] justify-center">{params.data?.id}</div>
        <p className="truncate w-full pl-2 flex-1">
          {params.data?.productName}
        </p>
        {params.data?.badge && (
          <Grow className="gap-1 shrink-0">
            {params.data?.badge?.includes('독립') && <Badge color="green" className="w-[3rem]">독립</Badge>}
            {params.data?.badge?.includes('갱신') && <Badge color="blue" className="w-[3rem]">갱신</Badge>}
          </Grow>
        )}
      </Grow>
    );
  }, []);

  // 만기 셀 렌더러를 useCallback으로 메모이제이션하여 불필요한 리렌더링 방지
  const expiryCellRenderer = useCallback((params: ICellRendererParams<LNIPL020DataType['mainBody']['agGridTable1'][number]>) => {
    return (
      <div className="flex items-center justify-center gap-1 w-full h-full">
        <span className="block w-[6rem] text-right">{params.value}</span>
        {params.data?.canEditExpiry ? <SelectArrowIcon size={14} color="var(--color-gray-50)" /> : <SelectArrowIcon size={14} color="var(--color-gray-20)" />}
      </div>
    );
  }, []);

  const [dropdownInfo, setDropdownInfo] = useState<{
    visible: boolean;
    cellRect: DOMRect | null;
    rowIndex: number | null;
    cellValue: any;
  }>({ visible: false, cellRect: null, rowIndex: null, cellValue: null });

  const handleCellClick = (event: React.MouseEvent, rowIndex: number, cellValue: any) => {
    const cellRect = event.currentTarget.getBoundingClientRect();
    setDropdownInfo({
      visible: true,
      cellRect,
      rowIndex,
      cellValue,
    });
  };

  // 컬럼 정의
  const columnDefs: ColDef<LNIPL020DataType['mainBody']['agGridTable1'][number]>[] = useMemo(
    () => [
      {
        headerName: '담보명',
        field: 'productName',
        width: hideAside ? 510 : 426,
        cellClass: 'text-left p-0!',
        sortable: false,
        filter: false,
        autoHeight: true,
        pinned: 'left',
        tooltipValueGetter: (params: ITooltipParams<LNIPL020DataType['mainBody']['agGridTable1'][number]>) => {
          if (!params.data) return '';
          return `담보명: ${params.data.productName}`;
        },
        headerComponent: productNameHeader,
        cellRenderer: titleRenderer
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
        cellRenderer: (params: ICellRendererParams<LNIPL020DataType['mainBody']['agGridTable1'][number]>) => {
          if (!params.value) return null;
          return (
            <div className="flex flex-wrap gap-1 justify-center items-center w-full h-full">
              <Button only="icon" variant="none" size="sm">
                <SearchIcon color="var(--color-primary-50)" />
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
        cellRenderer: (params: ICellRendererParams<LNIPL020DataType['mainBody']['agGridTable1'][number]>) => {
          const rowIndex = params.node?.rowIndex ?? 0;
          // ref 연결
          if (!amountInputRefs.current) amountInputRefs.current = [];
          return (
            <AmountUnitInput
              value={params.value}
              onChange={(newValue) => {
                if (params.setValue) {
                  params.setValue(newValue);
                }
              }}
              inputRef={el => { amountInputRefs.current[rowIndex] = el; }}
              onEnter={() => {
                // 다음 AmountUnitInput으로 포커스 이동
                const nextRef = amountInputRefs.current[rowIndex + 1];
                if (nextRef) {
                  nextRef.focus();
                }
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
        valueFormatter: (params: ValueFormatterParams<LNIPL020DataType['mainBody']['agGridTable1'][number]>) => {
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
        editable: (params: EditableCallbackParams<LNIPL020DataType['mainBody']['agGridTable1'][number]>) => params.data?.canEditExpiry ?? false,
        cellEditor: 'agSelectCellEditor', // ag-Grid 내장 select editor 사용
        cellEditorParams: {
          values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'], // 원하는 옵션
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
        editable: (params: EditableCallbackParams<LNIPL020DataType['mainBody']['agGridTable1'][number]>) => params.data?.canEditExpiry ?? false,
        cellEditor: 'agSelectCellEditor', // ag-Grid 내장 select editor 사용
        cellEditorParams: {
          values: ['5년', '10년', '15년', '20년', '25년', '30년', '35년', '전기납'], // 원하는 옵션
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
        valueFormatter: (params: ValueFormatterParams<LNIPL020DataType['mainBody']['agGridTable1'][number]>) => {
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
        cellStyle: (params: CellClassParams<LNIPL020DataType['mainBody']['agGridTable1'][number]>) => {
          const value = params.value as string;
          if (value === '인수') {
            return { color: '#006FF2' };
          } else if (value === '거절' || value === '조건부인수') {
            return { color: '#FB3F3F' };
          }
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
    [duplicateRenderer, productNameHeader, expiryCellRenderer, hideAside]
  );

  return (
    <LayoutScrollWrap className="grid-rows-[auto_1fr]">
      <LayoutScrollItem className="w-full">
        <Grow placement="bwc" className="gap-1 w-full pb-1">
          <Grow className="gap-1.5">
            <Typo variant="heading-sm">100세만기 · 20년납입 · 월납 · 20년 갱신 · 1형</Typo>
            <Button variant="outlined" color="gray" size="md">
              변경
            </Button>
          </Grow>
          <Grow className="gap-2.5">
            <Checkbox>담보초기화</Checkbox>
            <Checkbox>플랜기본값</Checkbox>
            <Grow className="gap-1">
              <NativeSelect aria-label="플랜 선택" width="sm" size="sm" readOnly={false} required={false}>
                <NativeSelectOption value="">플랜 선택</NativeSelectOption>
                <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
              </NativeSelect>
              <NativeSelect aria-label="나만의 설계선택" width="lg" size="sm" readOnly={false} required={false}>
                <NativeSelectOption value="">나만의 설계선택</NativeSelectOption>
                <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
              </NativeSelect>
              <Button variant="outlined" color="gray" size="md" onClick={() => setHideAside(!hideAside)}>
                <SizeIcon color="var(--color-secondary-50)" className="rotate-90" />
              </Button>
              <Button variant="outlined" color="gray" size="md" onClick={() => setHideAside(!hideAside)}>
                <SizeIcon color="var(--color-secondary-50)" />
              </Button>
            </Grow>
          </Grow>
        </Grow>
      </LayoutScrollItem>
      <LayoutScrollItem className="w-full">
        <div className="ag-theme-alpine">
          <AgGridReact<LNIPL020DataType['mainBody']['agGridTable1'][number]>
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
  );
}
