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

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';

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
export function CustomerSearchDialog({
  title = '고객찾기',
  description = '검색 조건을 입력하고 고객을 선택하세요.',
  resolve,
}: CustomerSearchDialogProps) {
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
    <Dialog open>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* 검색 필터 영역 */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <div className="grid grid-cols-3 gap-4">
            {/* 고객유형 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">고객유형</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="text-sm font-medium text-gray-700 mb-1">고객식별번호</label>
              <input
                type="text"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchFilters.customerNo}
                onChange={(e) => handleFilterChange('customerNo', e.target.value)}
                placeholder="고객식별번호 입력"
              />
            </div>

            {/* 고객명 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">고객명</label>
              <input
                type="text"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchFilters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                placeholder="고객명 입력"
              />
            </div>

            {/* 생년월일 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">생년월일</label>
              <input
                type="date"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchFilters.birthDate}
                onChange={(e) => handleFilterChange('birthDate', e.target.value)}
              />
            </div>

            {/* 휴대폰번호 */}
            <div className="flex flex-col col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1">휴대폰번호</label>
              <div className="flex items-center gap-2">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
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
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  value={searchFilters.phone2}
                  onChange={(e) => handleFilterChange('phone2', e.target.value)}
                >
                  <option value="">선택</option>
                  {Array.from({ length: 1000 }, (_, i) => String(i).padStart(3, '0')).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <span className="text-gray-500">-</span>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  value={searchFilters.phone3}
                  onChange={(e) => handleFilterChange('phone3', e.target.value)}
                >
                  <option value="">선택</option>
                  {Array.from({ length: 10000 }, (_, i) => String(i).padStart(4, '0')).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 최근등록고객 (3개월) */}
            <div className="flex flex-col col-span-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={searchFilters.recentCustomer}
                  onChange={(e) => handleFilterChange('recentCustomer', e.target.checked)}
                />
                <span className="text-sm font-medium text-gray-700">최근등록고객 (3개월)</span>
              </label>
            </div>
          </div>

          {/* 검색/초기화 버튼 */}
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleReset}>
              초기화
            </Button>
            <Button onClick={handleSearch}>조회</Button>
          </div>
        </div>

        {/* 고객 리스트 영역 */}
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12"></th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    고객명
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    고객식별번호
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    고객유형명
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    휴대폰번호
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    주소
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {SAMPLE_CUSTOMERS.map((customer) => (
                  <tr
                    key={customer.id}
                    className={`hover:bg-blue-50 transition-colors cursor-pointer ${
                      selectedCustomer?.id === customer.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleSelectCustomer(customer)}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        type="radio"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        checked={selectedCustomer?.id === customer.id}
                        onChange={() => handleSelectCustomer(customer)}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{customer.customerNo}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{customer.customerType}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{customer.phone}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 max-w-xs truncate">{customer.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 데이터가 없는 경우 */}
          {SAMPLE_CUSTOMERS.length === 0 && (
            <div className="text-center py-8 text-gray-500">검색된 고객이 없습니다.</div>
          )}
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
