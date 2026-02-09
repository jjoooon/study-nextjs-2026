'use client';

/**
 * Customer Search Dialog (고객찾기 팝업)
 *
 * @description
 * - 고객 검색 및 선택을 위한 팝업
 * - 다양한 검색 필터를 통한 고객 조회
 * - 선택한 고객 정보 반환
 *
 * @usage
 * import { popup } from '@/shared/utils/popup';
 *
 * const result = await popup.open<CustomerSearchDialogResult>('products/customer-search', {
 *   title: '고객찾기'
 * });
 *
 * if (result?.action === 'select') {
 *   logger.log('선택된 고객:', result.customer);
 * }
 */

import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, ValidationModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';
import { useCustomerSearch } from '@/features/poc/hooks/useCustomerSearch';
import type { Customer } from '@/features/poc/types/customerTypes';
import { isProduction } from '@/shared/config/env';
import log from '@/shared/utils/logger';
import { Button } from '@/shared/components/uiux/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/uiux/dialog';

// AG Grid Theming
import 'ag-grid-community/styles/ag-theme-quartz.css';

const logger = log.getLogger('Poc');

// AG Grid Module Registration
ModuleRegistry.registerModules([AllCommunityModule, ...(!isProduction ? [ValidationModule] : [])]);

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * 고객 검색 결과 타입
 */
export interface CustomerSearchDialogResult {
  /** 수행된 액션 타입 */
  action: 'select' | 'cancel';
  /** 선택된 고객 (select 액션 시) */
  customer?: Customer;
}

/**
 * 고객찾기 팝업 Props
 */
export interface CustomerSearchDialogProps {
  /** 팝업 제목 */
  title?: string;
  /** 팝업 설명 */
  description?: string;
  /** Promise resolve 함수 (결과 반환) */
  resolve: (result: CustomerSearchDialogResult) => void;
}

// ============================================================================
// CUSTOMER SEARCH DIALOG COMPONENT
// ============================================================================

/**
 * 고객찾기 팝업 컴포넌트
 */
export function CustomerSearchDialog({ title = '고객찾기', description = '', resolve }: CustomerSearchDialogProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // API를 통한 고객 검색
  const { customers, isLoading, searchFilters, updateFilter, handleSearch, handleReset } = useCustomerSearch();

  // ============================================================================
  // AG GRID COLUMN DEFINITIONS
  // ============================================================================

  const columnDefs: ColDef<Customer>[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: '고객명',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        minWidth: 100,
        pinned: 'left',
        cellStyle: () => ({ fontWeight: 600 }),
      },
      {
        field: 'customerNo',
        headerName: '고객식별번호',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        minWidth: 120,
      },
      {
        field: 'customerType',
        headerName: '고객유형명',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        minWidth: 100,
        cellStyle: () => ({ color: '#6b7280' }),
      },
      {
        field: 'phone',
        headerName: '휴대폰번호',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        minWidth: 140,
      },
      {
        field: 'address',
        headerName: '주소',
        sortable: false,
        filter: true,
        resizable: true,
        flex: 2,
        minWidth: 200,
        cellStyle: () => ({ color: '#6b7280' }),
      },
    ],
    []
  );

  // ============================================================================
  // AG GRID OPTIONS
  // ============================================================================

  const gridOptions = useMemo(
    () => ({
      animateRows: true,
      domLayout: 'autoHeight' as const,
      rowHeight: 50,
      headerHeight: 45,
      pagination: false,
      suppressCellFocus: true,
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
      },
      rowSelection: {
        mode: 'singleRow' as const,
        enableClickSelection: true,
        enableSelectionWithoutKeys: true,
        checkboxes: false,
      },
      onSelectionChanged: () => {
        // AG Grid에서 선택된 행을 처리하기 위해 ref로 접근 필요
        // 현재는 onRowClicked로 처리
      },
    }),
    []
  );

  /**
   * 검색 필터 변경 핸들러
   */
  const handleFilterChange = <K extends keyof typeof searchFilters>(key: K, value: (typeof searchFilters)[K]) => {
    updateFilter(key, value);
  };

  /**
   * 고객 선택 핸들러
   */
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  /**
   * 취소 버튼 핸들러
   */
  const handleCancel = () => {
    resolve({
      action: 'cancel',
    });
  };

  /**
   * Dialog 닫기 핸들러 (X 버튼, ESC 키, 백드롭 클릭)
   */
  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  /**
   * 고객등록 버튼 핸들러
   */
  const handleRegisterCustomer = () => {
    // TODO: 고객등록 기능 구현
    logger.log('고객등록');
  };

  /**
   * 고객수정 버튼 핸들러
   */
  const handleEditCustomer = () => {
    // TODO: 선택된 고객이 있으면 수정 기능 구현
    if (selectedCustomer) {
      logger.log('고객수정:', selectedCustomer);
    } else {
      logger.warn('선택된 고객이 없습니다.');
    }
  };

  /**
   * 닫기 버튼 핸들러
   */
  const handleClose = () => {
    handleCancel();
  };

  return (
    <Dialog open onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* 검색 필터 영역 */}
        <div className="p-3 bg-gray-50 rounded-lg border">
          <div className="grid grid-cols-3 gap-3">
            {/* 고객유형 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-0.5">고객유형</label>
              <select
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchFilters.customerType || ''}
                onChange={(e) => handleFilterChange('customerType', e.target.value as '' | '개인' | '법인')}
              >
                <option value="">전체</option>
                <option value="개인">개인</option>
                <option value="법인">법인</option>
              </select>
            </div>

            {/* 고객식별번호 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-0.5">고객식별번호</label>
              <input
                type="text"
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchFilters.customerNo || ''}
                onChange={(e) => handleFilterChange('customerNo', e.target.value)}
                placeholder="고객식별번호 입력"
              />
            </div>

            {/* 고객명 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-0.5">고객명</label>
              <input
                type="text"
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchFilters.name || ''}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                placeholder="고객명 입력"
              />
            </div>

            {/* 생년월일 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-0.5">생년월일</label>
              <input
                type="text"
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchFilters.birthDate || ''}
                onChange={(e) => handleFilterChange('birthDate', e.target.value)}
                placeholder="YYYYMMDD"
              />
            </div>

            {/* 휴대폰번호 */}
            <div className="flex flex-col col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-0.5">휴대폰번호</label>
              <div className="flex items-center gap-2">
                <select
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  value={searchFilters.phone1 || '010'}
                  onChange={(e) => handleFilterChange('phone1', e.target.value)}
                >
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="018">018</option>
                  <option value="019">019</option>
                </select>
                <span className="text-gray-500">-</span>
                <input
                  type="text"
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  value={searchFilters.phone2 || ''}
                  onChange={(e) => handleFilterChange('phone2', e.target.value)}
                  placeholder="0000"
                  maxLength={4}
                />
                <span className="text-gray-500">-</span>
                <input
                  type="text"
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  value={searchFilters.phone3 || ''}
                  onChange={(e) => handleFilterChange('phone3', e.target.value)}
                  placeholder="0000"
                  maxLength={4}
                />
              </div>
            </div>

            {/* 최근등록고객 (3개월) 및 버튼 */}
            <div className="flex items-center justify-between col-span-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={searchFilters.recentCustomer || false}
                  onChange={(e) => handleFilterChange('recentCustomer', e.target.checked)}
                />
                <span className="text-sm font-medium text-gray-700">최근등록고객 (3개월)</span>
              </label>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset}>
                  초기화
                </Button>
                <Button onClick={handleSearch}>조회</Button>
              </div>
            </div>
          </div>
        </div>

        {/* 고객 리스트 영역 - AG Grid */}
        <div className="mt-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <AgGridReact<Customer>
              rowData={customers}
              columnDefs={columnDefs}
              gridOptions={gridOptions}
              onRowClicked={(event) => event.data && handleSelectCustomer(event.data)}
              getRowId={(params) => params.data.id}
              rowClass="cursor-pointer"
            />
          )}

          {/* 해지고객 제외 체크박스 */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="exclude-terminated"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={searchFilters.excludeTerminated || false}
              onChange={(e) => handleFilterChange('excludeTerminated', e.target.checked)}
            />
            <label htmlFor="exclude-terminated" className="text-sm text-gray-700 cursor-pointer">
              해지고객 제외
            </label>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-200 my-4" />

        {/* 하단 버튼 영역 */}
        <div className="flex justify-between items-center">
          {/* 좌측: 고객등록, 고객수정 */}
          <div className="flex gap-2">
            <Button onClick={handleRegisterCustomer}>고객등록</Button>
            <Button variant="outline" onClick={handleEditCustomer} disabled={!selectedCustomer}>
              고객수정
            </Button>
          </div>

          {/* 우측: 닫기 */}
          <Button variant="outline" onClick={handleClose}>
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CustomerSearchDialog;
