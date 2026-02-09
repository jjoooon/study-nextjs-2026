'use client';

/**
 * Main Page (POC)
 *
 * @description
 * - Proof of Concept 메인 페이지
 * - 고객찾기 팝업 테스트 버튼 포함
 */

import { useEffect, useState } from 'react';
import type { CustomerSearchDialogResult } from '@/features/poc/components/popups/CustomerSearchDialog';
import { Button } from '@/shared/components/uiux/button';
import log from '@/shared/utils/logger';
import { popup } from '@/shared/utils/popup/popupApi';
import { registerDialog } from '@/shared/utils/popup/popupRegistry';

const logger = log.getLogger('Poc');

/**
 * Main Page Component
 */
export default function MainPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<{
    name: string;
    customerNo: string;
  } | null>(null);

  // 컴포넌트 마운트 시 팝업 등록
  useEffect(() => {
    registerDialog('products/customer-search', () => import('@/features/poc/components/popups/CustomerSearchDialog'));
  }, []);

  /**
   * 고객찾기 팝업 열기 핸들러
   */
  const handleOpenCustomerSearch = async () => {
    try {
      const result = await popup.open<CustomerSearchDialogResult>('products/customer-search', {
        title: '고객찾기',
      });

      if (result?.action === 'select' && result.customer) {
        setSelectedCustomer({
          name: result.customer.name,
          customerNo: result.customer.customerNo,
        });
        logger.log('선택된 고객:', result.customer);
      }
    } catch (error) {
      logger.error('팝업 오류:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Proof of Concept - Main Page</h1>

        {/* 버튼 영역 */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">팝업 테스트</h2>
          <div className="flex gap-4">
            <Button onClick={handleOpenCustomerSearch}>고객찾기 팝업 열기</Button>
          </div>
        </div>

        {/* 선택된 고객 정보 표시 */}
        {selectedCustomer && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">선택된 고객 정보</h3>
            <div className="text-blue-700">
              <p>
                <span className="font-medium">고객명:</span> {selectedCustomer.name}
              </p>
              <p>
                <span className="font-medium">고객식별번호:</span> {selectedCustomer.customerNo}
              </p>
            </div>
          </div>
        )}

        {/* 안내 메시지 */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">사용 안내</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>고객찾기 버튼을 클릭하여 고객 검색 팝업을 엽니다</li>
            <li>검색 조건을 입력하고 조회 버튼을 클릭합니다</li>
            <li>고객을 선택하고 확인 버튼을 클릭하면 선택된 고객 정보가 표시됩니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
