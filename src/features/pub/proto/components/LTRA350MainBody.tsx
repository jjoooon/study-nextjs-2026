
'use client';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ICellRendererParams, GridApi, ITooltipParams, ValueFormatterParams, EditableCallbackParams, ValueParserParams, CellClassParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState, useCallback, useRef } from 'react';
// DropdownMenu 임시 import (실제 경로에 맞게 수정 필요)
// import { DropdownMenu } from '@/shared/components/uiux';
import { Grow, Typo, Grid } from '@/shared/components/common';
import { SizeIcon, PlusIcon, SelectArrowIcon } from '@/shared/components/icons';
import { LayoutScrollWrap, LayoutScrollItem } from '@/shared/components/layout';
import { Button, Checkbox, NativeSelect, NativeSelectOption, Badge} from '@/shared/components/uiux';
import type { LTRA350DataType } from '@/features/pub/proto/data/LTRA350Data';

interface LTRA350MainBodyProps {
  data: LTRA350DataType['mainBody'];
  selectedPlanId?: number | null;
  onSelectPlan?: (planId: number) => void;
  hideAside: boolean;
  setHideAside: (hide: boolean) => void;
}

ModuleRegistry.registerModules([AllCommunityModule]);

export function LTRA350MainBody({
  data,
  selectedPlanId: _selectedPlanId,
  onSelectPlan,
  hideAside,
  setHideAside,
}: LTRA350MainBodyProps) {
  const rowData = data.agGridTable1;
 
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
  const duplicateRenderer = useCallback((params: ICellRendererParams<LTRA350DataType['mainBody']['agGridTable1'][number]>) => {
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
  const [checkedMap, setCheckedMap] = useState({ all: true, selected: false, unselected: false });
  const handleCheckedChange = (key: string) => (checked: boolean | 'indeterminate') => {
    setCheckedMap(map => ({ ...map, [key]: !!checked }));
  };

  // 담보명 헤더 컴포넌트를 useCallback으로 메모이제이션하여 불필요한 리렌더링 방지
  const productNameHeader = useCallback(
    () => (
      <Grow className="gap-1 w-full" placement="bwc">
        <Grow className="gap-1" placement="sc">
          담보명(<Checkbox size="sm">전체보기</Checkbox>)
        </Grow>
        <Grow className="gap-1.5" placement="sc">
          <Checkbox variant="text" checked={checkedMap.all} onCheckedChange={handleCheckedChange('all')}>전체 343</Checkbox>

          <Typo variant="body-sm" className="text-[var(--color-gray-20)] text-[1.1rem]">|</Typo>

          <Checkbox variant="text" checked={checkedMap.selected} onCheckedChange={handleCheckedChange('selected')}>선택 324</Checkbox>

          <Typo variant="body-sm" className="text-[var(--color-gray-20)] text-[1.1rem]">|</Typo>

          <Checkbox variant="text" checked={checkedMap.unselected} onCheckedChange={handleCheckedChange('unselected')}>미선택 112</Checkbox>
        </Grow>
      </Grow>
    ),
    [checkedMap, setCheckedMap]
  );

  // titleRenderer: productName 셀 커스텀 렌더러
  const titleRenderer = useCallback((params: ICellRendererParams<LTRA350DataType['mainBody']['agGridTable1'][number]>) => {
    return (
      <Grow className="" placement='bwc'>
        <p className="truncate w-full">
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
  const expiryCellRenderer = useCallback((params: ICellRendererParams<LTRA350DataType['mainBody']['agGridTable1'][number]>) => {
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
  const columnDefs: ColDef<LTRA350DataType['mainBody']['agGridTable1'][number]>[] = useMemo(
    () => [
      {
        headerName: '',
        checkboxSelection: true, // ag-Grid 기본 체크박스
        // suppressRowClickSelection: true, // 체크박스만 클릭 시 선택
        // field: 'selected',
        width: 30,
        cellClass: 'text-center p-0!',
        cellClassRules: {
          'pointer-events-none': params => !!params.data?.locked, // boolean 반환으로 타입 오류 방지
        },
        sortable: false,
        filter: false,
        // cellRenderer: checkboxRender,
        // headerComponent: CheckboxHeader,
        pinned: 'left',
      },
      {
        headerName: '',
        field: 'id',
        cellClass: 'text-center p-0!',
        width: 30,
        sortable: false,
        filter: false,
        editable: false,
        pinned: 'left',
      },
      {
        headerName: '담보명',
        field: 'productName',
        width: hideAside ? 510 : 390,
        cellClass: 'text-left',
        sortable: false,
        filter: false,
        autoHeight: true,
        pinned: 'left',
        tooltipValueGetter: (params: ITooltipParams<LTRA350DataType['mainBody']['agGridTable1'][number]>) => {
          if (!params.data) return '';
          return `담보명: ${params.data.productName}`;
        },
        headerComponent: productNameHeader,
        cellRenderer: titleRenderer
      },
      {
        headerName: '가입금액(만원)',
        field: 'coverageAmount',
        flex: 1.6,
        headerClass: 'px-0!',
        cellClass: () => 'text-right editable-cell',
        sortable: false,
        filter: false,
        editable: true,
        valueFormatter: (params: ValueFormatterParams<LTRA350DataType['mainBody']['agGridTable1'][number]>) => {
          return params.value ? params.value.toLocaleString() : '';
        },
        valueParser: (params: ValueParserParams<LTRA350DataType['mainBody']['agGridTable1'][number]>) => {
          return Number(params.newValue);
        },
      },
      {
        headerName: '보험료(만원)',
        field: 'premium',
        flex: 1.4,
        cellClass: 'text-right',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        valueFormatter: (params: ValueFormatterParams<LTRA350DataType['mainBody']['agGridTable1'][number]>) => {
          return params.value ? params.value.toLocaleString() : '';
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
        valueFormatter: (params: ValueFormatterParams<LTRA350DataType['mainBody']['agGridTable1'][number]>) => {
          return params.value ? params.value.toLocaleString() : '';
        },
      },
      {
        headerName: '만기',
        field: 'expiryPeriod',
        flex: 1,
        cellClass: 'text-center editable-cell',
        sortable: false,
        filter: false,
        editable: (params: EditableCallbackParams<LTRA350DataType['mainBody']['agGridTable1'][number]>) => params.data?.canEditExpiry ?? false,
        cellEditor: 'agSelectCellEditor', // ag-Grid 내장 select editor 사용
        cellEditorParams: {
          values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'], // 원하는 옵션
        },
        cellRenderer: expiryCellRenderer,
      },
      {
        headerName: '납기',
        field: 'paymentPeriod',
        flex: 1,
        cellClass: 'text-center',
        sortable: false,
        filter: false,
      },
      {
        headerName: '예상UW',
        field: 'expectedUwResult',
        headerClass: 'px-0!',
        flex: 1,
        cellClass: 'text-center',
        sortable: false,
        filter: false,
        cellStyle: (params: CellClassParams<LTRA350DataType['mainBody']['agGridTable1'][number]>) => {
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
        width: 44,
        cellClass: 'text-center ',
        sortable: false,
        filter: false,
        cellRenderer: duplicateRenderer,
        suppressRowClickSelection: true,
      },
    ],
    [duplicateRenderer, productNameHeader, expiryCellRenderer, hideAside]
  );

  return (
    <LayoutScrollWrap className="grid-rows-[auto_1fr]">
      <LayoutScrollItem className="w-full">
        <Grow placement="bwc" className="gap-1 w-full pb-1">
          <Grow>
            <Typo variant="heading-sm">100세만기 · 20년납입 · 월납 · 20년 갱신 · 1형</Typo>
          </Grow>
          <Grow className="gap-2.5">
            <Checkbox>플랜기본값</Checkbox>
            <Grow className="gap-1">
              <NativeSelect aria-label="플랜 선택" width="md" readOnly={false} required={false}>
                <NativeSelectOption value="">플랜 선택</NativeSelectOption>
                <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
              </NativeSelect>
              <NativeSelect aria-label="나만의 설계선택" width="md" readOnly={false} required={false}>
                <NativeSelectOption value="">나만의 설계선택</NativeSelectOption>
                <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
              </NativeSelect>
              <Button variant="outlined" color="gray" size="lg" onClick={() => setHideAside(!hideAside)}>
                {hideAside ? '작게보기' : '크게보기'}
                <SizeIcon color="var(--color-secondary-50)" />
              </Button>
            </Grow>
          </Grow>
        </Grow>
      </LayoutScrollItem>
      <LayoutScrollItem className="w-full">
        <div className="ag-theme-alpine">
          <AgGridReact<LTRA350DataType['mainBody']['agGridTable1'][number]>
            rowData={rowData}
            columnDefs={columnDefs}
            rowSelection="multiple" // multiple로 변경
            suppressRowClickSelection={true}
            onGridReady={(params) => {
              params.api.forEachNode((node) => {
                if (node.data?.locked) node.setSelected(true);
              });
            }}
            // isRowSelectable={(node) => !node.data?.locked}

            suppressRowHoverHighlight={false}
            onSelectionChanged={handleSelectionChanged}
            singleClickEdit={true} // 한 번의 클릭으로 편집 활성화
            tooltipShowDelay={0}
            tooltipHideDelay={9999}
            tooltipMouseTrack={true}
            getRowClass={(params) => (params.data?.isHighlighted ? 'ag-row-highlighted' : '')}
          />
        </div>
      </LayoutScrollItem>
    </LayoutScrollWrap>
  );
}
