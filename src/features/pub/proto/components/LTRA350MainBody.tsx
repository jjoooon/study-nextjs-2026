'use client';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ICellRendererParams, GridApi, ITooltipParams, ValueFormatterParams, EditableCallbackParams, ValueParserParams, CellClassParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState, useCallback } from 'react';
import { Grow, Typo } from '@/shared/components/common';
import { SizeIcon, PlusIcon, SelectArrowIcon } from '@/shared/components/icons';
import { LayoutScrollWrap, LayoutScrollItem } from '@/shared/components/layout';
import { Button, Checkbox, NativeSelect, NativeSelectOption } from '@/shared/components/uiux';
import type { AgGridData, AgGridProps } from '../types/LTRA350Data.types';
import { useAgGridSelection } from '../hooks/useAgGridSelection';

ModuleRegistry.registerModules([AllCommunityModule]);

export function LTRA350MainBody({
  data,
  selectedPlanId: _selectedPlanId,
  onSelectPlan,
  hideAside,
  setHideAside,
}: AgGridProps) {
  const { selectedRows, setSelectedRows, handleSelectionChanged } = useAgGridSelection(data, onSelectPlan);

  // checkboxRender를 useCallback으로 메모이제이션
  const checkboxRender = useCallback(
    (params: ICellRendererParams<AgGridData>) => {
      const isChecked = selectedRows.includes(params.data?.id || 0);
      return (
        <div className="w-full h-full flex items-center justify-center editable-cell">
          <div className="flex justify-center shrink-0 w-[2.6rem] h-full editable-cell">
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedRows([...selectedRows, params.data?.id || 0]);
                } else {
                  setSelectedRows(selectedRows.filter((id) => id !== params.data?.id));
                }
              }}
              size="sm"
              className="flex justify-center items-center"
            />
          </div>
          {/* {params.data && (
            <div className="border-l border-l-[var(--color-table-border-border-gray)] flex-1 text-center h-full">
              {params.data.id}
            </div>
          )} */}
        </div>
      );
    },
    [selectedRows, setSelectedRows]
  );

  // CheckboxHeader를 useCallback으로 메모이제이션
  const CheckboxHeader = useCallback(() => {
    const allSelected = data.length > 0 && selectedRows.length === data.length;

    return (
      <div className="w-full h-full flex items-center justify-center">
        <Checkbox
          // variant="button"
          color="secondary"
          size="sm"
          checked={allSelected}
          onCheckedChange={(checked) => {
            if (checked) {
              setSelectedRows(data.map((item) => item.id));
            } else {
              setSelectedRows([]);
            }
          }}
          className="flex justify-center items-center"
          aria-label="전체 선택"
        >
          {/* 전체선택 */}
        </Checkbox>
      </div>
    );
  }, [data, selectedRows]);

  // duplicateRenderer를 useCallback으로 메모이제이션
  const duplicateRenderer = useCallback((params: ICellRendererParams<AgGridData>) => {
    const isDuplicate = params.value as boolean;
    return isDuplicate ? (
      <Grow className="w-full h-full flex items-center justify-center">
        <Button
          aria-label="고객 추가"
          variant="outlined"
          size="icon-sm"
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

  // 담보명 헤더 컴포넌트를 useCallback으로 메모이제이션하여 불필요한 리렌더링 방지
  const productNameHeader = useCallback(
    () => (
      <Grow className="gap-1 w-full">
        담보명(
        <Checkbox size="sm">담보명 전체보기</Checkbox>)
      </Grow>
    ),
    []
  );

  // 만기 셀 렌더러를 useCallback으로 메모이제이션하여 불필요한 리렌더링 방지
  const expiryCellRenderer = useCallback((params: ICellRendererParams<AgGridData>) => {
    return (
      <div className="flex items-center justify-center gap-1 w-full h-full">
        <span className="block w-[6rem] text-right">{params.value}</span>
        {params.data?.canEditExpiry ? <SelectArrowIcon size={14} color="var(--color-gray-50)" /> : <SelectArrowIcon size={14} color="var(--color-gray-20)" />}
      </div>
    );
  }, []);

  // 컬럼 정의
  const columnDefs: ColDef<AgGridData>[] = useMemo(
    () => [
      {
        headerName: '',
        field: 'selected',
        width: 30,
        cellClass: 'text-center p-0!',
        sortable: false,
        filter: false,
        cellRenderer: checkboxRender,
        headerComponent: CheckboxHeader,
        suppressRowClickSelection: true,
        pinned: 'left',
      },
      {
        headerName: '',
        field: 'id',
        cellClass: 'text-center',
        width: 40,
        sortable: false,
        filter: false,
        editable: false,
        pinned: 'left',
      },
      {
        headerName: '담보명',
        field: 'productName',
        width: 300,
        cellClass: 'text-left',
        sortable: false,
        filter: false,
        autoHeight: true,
        pinned: 'left',
        tooltipValueGetter: (params: ITooltipParams<AgGridData>) => {
          if (!params.data) return '';
          return `담보명: ${params.data.productName}`;
        },
        headerComponent: productNameHeader,
      },
      {
        headerName: '가입금액(만원)',
        field: 'coverageAmount',
        flex: 1,
        cellClass: () => 'text-right editable-cell',
        sortable: true,
        filter: false,
        editable: true,
        valueFormatter: (params: ValueFormatterParams<AgGridData>) => {
          return params.value ? params.value.toLocaleString() : '';
        },
        valueParser: (params: ValueParserParams<AgGridData>) => {
          return Number(params.newValue);
        },
      },
      {
        headerName: '보험료(만원)',
        field: 'premium',
        width: 110,
        cellClass: 'text-right',
        sortable: true,
        filter: false,
        valueFormatter: (params: ValueFormatterParams<AgGridData>) => {
          return params.value ? params.value.toLocaleString() : '';
        },
      },
      {
        headerName: '가능금액(만원)',
        field: 'availableAmount',
        width: 110,
        cellClass: 'text-right',
        sortable: true,
        filter: false,
        valueFormatter: (params: ValueFormatterParams<AgGridData>) => {
          return params.value ? params.value.toLocaleString() : '';
        },
      },
      {
        headerName: '만기',
        field: 'expiryPeriod',
        width: 100,
        cellClass: 'text-center editable-cell',
        sortable: true,
        filter: false,
        editable: (params: EditableCallbackParams<AgGridData>) => params.data?.canEditExpiry ?? false,
        cellEditor: 'agSelectCellEditor', // ag-Grid 내장 select editor 사용
        cellEditorParams: {
          values: ['60세', '65세', '75세', '80세', '85세', '90세', '100세', '무제한'], // 원하는 옵션
        },
        cellRenderer: expiryCellRenderer,
      },
      {
        headerName: '납기',
        field: 'paymentPeriod',
        width: 80,
        cellClass: 'text-center',
        sortable: true,
        filter: false,
      },
      {
        headerName: '예상UW',
        field: 'expectedUwResult',
        width: 90,
        cellClass: 'text-center',
        sortable: false,
        filter: false,
        cellStyle: (params: CellClassParams<AgGridData>) => {
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
    [checkboxRender, CheckboxHeader, duplicateRenderer, productNameHeader, expiryCellRenderer]
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
                <SizeIcon />
              </Button>
            </Grow>
          </Grow>
        </Grow>
      </LayoutScrollItem>
      <LayoutScrollItem className="w-full">
        <div className="ag-theme-alpine space-bottom-12">
          <AgGridReact<AgGridData>
            rowData={data}
            columnDefs={columnDefs}
            rowSelection="multiple" // multiple로 변경
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
