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
 *   console.log('선택된 고객:', result.customer);
 * }
 */

import { useState, useMemo } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

// AG Grid Theming
import 'ag-grid-community/styles/ag-theme-quartz.css';

// AG Grid Module Registration
ModuleRegistry.registerModules([AllCommunityModule]);

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * 고객 데이터 타입
 */
export interface Customer {
  id: string;
  name: string;
  customerNo: string;
  customerType: string;
  phone: string;
  address: string;
  birthDate: string;
}

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
 * 고객 검색 조건 타입
 */
interface SearchFilters {
  customerType: string;
  customerNo: string;
  name: string;
  birthDate: string;
  phone1: string;
  phone2: string;
  phone3: string;
  recentCustomer: boolean;
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
// SAMPLE DATA
// ============================================================================

/**
 * 샘플 고객 데이터
 */
const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: '김철수',
    customerNo: 'CUST001',
    customerType: '개인',
    phone: '010-1234-5678',
    address: '서울시 강남구 테헤란로 123',
    birthDate: '1980-01-15',
  },
  {
    id: '2',
    name: '이영희',
    customerNo: 'CUST002',
    customerType: '법인',
    phone: '010-2345-6789',
    address: '서울시 서초구 강남대로 456',
    birthDate: '1985-03-22',
  },
  {
    id: '3',
    name: '박민수',
    customerNo: 'CUST003',
    customerType: '개인',
    phone: '010-3456-7890',
    address: '서울시 송파구 올림픽대로 789',
    birthDate: '1990-07-08',
  },
];

// ============================================================================
// CUSTOMER SEARCH DIALOG COMPONENT
// ============================================================================

/**
 * 고객찾기 팝업 컴포넌트
 */
export function CustomerSearchDialog({ title = '고객찾기', description = '', resolve }: CustomerSearchDialogProps) {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    customerType: '',
    customerNo: '',
    name: '',
    birthDate: '',
    phone1: '010',
    phone2: '',
    phone3: '',
    recentCustomer: false,
  });

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

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
  const handleFilterChange = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setSearchFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * 검색 핸들러
   */
  const handleSearch = () => {
    // TODO: 실제 검색 로직 구현 (현재는 샘플 데이터 표시)
    console.log('검색 조건:', searchFilters);
  };

  /**
   * 초기화 핸들러
   */
  const handleReset = () => {
    setSearchFilters({
      customerType: '',
      customerNo: '',
      name: '',
      birthDate: '',
      phone1: '010',
      phone2: '',
      phone3: '',
      recentCustomer: false,
    });
    setSelectedCustomer(null);
  };

  /**
   * 고객 선택 핸들러
   */
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  /**
   * 확인 버튼 핸들러
   */
  const handleConfirm = () => {
    if (selectedCustomer) {
      resolve({
        action: 'select',
        customer: selectedCustomer,
      });
    }
  };

  /**
   * 취소 버튼 핸들러
   */
  const handleCancel = () => {
    resolve({
      action: 'cancel',
    });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* 검색 필터 영역 */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
          <div className="grid grid-cols-3 gap-3">
            {/* 고객유형 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-0.5">고객유형</label>
              <select
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchFilters.customerType}
                onChange={(e) => handleFilterChange('customerType', e.target.value)}
              >
                <option value="">전체</option>
                <option value="individual">개인</option>
                <option value="corporate">법인</option>
              </select>
            </div>

            {/* 고객식별번호 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-0.5">고객식별번호</label>
              <input
                type="text"
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchFilters.customerNo}
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
                value={searchFilters.name}
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
                value={searchFilters.birthDate}
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
                  value={searchFilters.phone1}
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
                  value={searchFilters.phone2}
                  onChange={(e) => handleFilterChange('phone2', e.target.value)}
                  placeholder="0000"
                  maxLength={4}
                />
                <span className="text-gray-500">-</span>
                <input
                  type="text"
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  value={searchFilters.phone3}
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
                  checked={searchFilters.recentCustomer}
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
        <div className="mt-4">
          <AgGridReact<Customer>
            rowData={SAMPLE_CUSTOMERS}
            columnDefs={columnDefs}
            gridOptions={gridOptions}
            onRowClicked={(event) => event.data && handleSelectCustomer(event.data)}
            getRowId={(params) => params.data.id}
            rowClass="cursor-pointer"
          />
        </div>

        {/* 선택된 고객 정보 표시 */}
        {selectedCustomer && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm">
              <span className="font-medium text-blue-900">선택된 고객:</span>{' '}
              <span className="text-blue-700">
                {selectedCustomer.name} ({selectedCustomer.customerNo})
              </span>
            </div>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            취소
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedCustomer}>
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CustomerSearchDialog;
