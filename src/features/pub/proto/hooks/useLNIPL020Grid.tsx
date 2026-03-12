import { useCallback, useMemo, useRef, useState } from 'react';
import type {
  CellClassParams,
  ColDef,
  EditableCallbackParams,
  ICellRendererParams,
  ITooltipParams,
  SelectionChangedEvent,
  ValueFormatterParams,
} from 'ag-grid-community';

import { Grow, Typo } from '@atoms';
import { PlusIcon, SearchIcon, SelectArrowIcon } from '@icons';
import { AmountUnitInput } from '@features/AmountUnitInput';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';

import type { LTRA020_2_DataType } from '@/features/pub/proto/data/LTRA020_2_Data';

export type LNIPL020GridRow = LTRA020_2_DataType['coverageGrid']['agGridTable1'][number];

interface UseLNIPL020GridParams {
  hideAside: boolean;
  onSelectPlan?: (planId: number) => void;
}

export function useLNIPL020Grid({ hideAside, onSelectPlan }: UseLNIPL020GridParams) {
  const amountInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false });
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  const [gridKey, setGridKey] = useState(0);

  const handleCheckedChange = (key: string) => (checked: boolean | 'indeterminate') => {
    setCheckedMap((map) => ({ ...map, [key]: !!checked }));
  };

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
        <Button aria-label="고객 추가" variant={'outlined'} only={'icon'} size={'sm'} color={'gray-light'} onClick={() => alert('추가')}>
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
        width: hideAside ? 510 : 426,
        cellClass: 'text-left p-0!',
        sortable: false,
        filter: false,
        autoHeight: true,
        pinned: 'left',
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
    [duplicateRenderer, expiryCellRenderer, hideAside, productNameHeader, titleRenderer]
  );

  return {
    columnDefs,
    gridKey,
    handleSelectionChanged,
    showProductNameTooltip,
  };
}
