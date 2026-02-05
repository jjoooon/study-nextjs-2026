/**
 * MSW Customers Handlers
 *
 * 고객 API를 모킹하는 MSW 핸들러
 */

import { http } from 'msw';

import type { Customer, GetCustomersParams } from '@/features/poc/types/customerTypes';
import { mockCustomers } from '@/mocks/data/customers';

/**
 * 고객 검색 API 핸들러
 *
 * @endpoint GET /api/poc/customers
 * @description 검색 조건에 따라 고객 목록을 반환
 */
export const customersHandlers = [
  http.get('/api/poc/customers', ({ request }) => {
    // URL 파라미터 파싱
    const url = new URL(request.url);
    const filtersParam = url.searchParams.get('filters');
    const sortBy = url.searchParams.get('sortBy') || 'name';
    const sortOrder = url.searchParams.get('sortOrder') || 'asc';

    // 필터 파싱
    let filters: GetCustomersParams['filters'] = {};
    if (filtersParam) {
      try {
        filters = JSON.parse(filtersParam);
      } catch {
        console.error('[MSW] Failed to parse filters:', filtersParam);
      }
    }

    // 필터링 로직
    let filtered = [...mockCustomers];

    // 고객유형 필터
    if (filters?.customerType === '개인') {
      filtered = filtered.filter((c) => c.customerType === '개인');
    } else if (filters?.customerType === '법인') {
      filtered = filtered.filter((c) => c.customerType === '법인');
    }

    // 고객식별번호 필터 (부분 일치)
    if (filters?.customerNo) {
      filtered = filtered.filter((c) => c.customerNo.includes(filters.customerNo!));
    }

    // 고객명 필터 (부분 일치)
    if (filters?.name) {
      filtered = filtered.filter((c) => c.name.includes(filters.name!));
    }

    // 생년월일 필터 (부분 일치)
    if (filters?.birthDate) {
      filtered = filtered.filter((c) => c.birthDate.includes(filters.birthDate!));
    }

    // 휴대폰번호 필터 (연결하여 검사)
    const phoneFull = `${filters?.phone1 || ''}${filters?.phone2 || ''}${filters?.phone3 || ''}`;
    if (phoneFull && phoneFull !== '010') {
      filtered = filtered.filter((c) => c.phone.replace(/-/g, '').includes(phoneFull));
    }

    // 최근등록고객 필터 (3개월)
    if (filters?.recentCustomer) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      filtered = filtered.filter((c) => new Date(c.createdAt) >= threeMonthsAgo);
    }

    // 해지고객 제외
    if (filters?.excludeTerminated) {
      filtered = filtered.filter((c) => c.status !== 'terminated');
    }

    // 정렬
    filtered.sort((a, b) => {
      const aVal = a[sortBy as keyof Customer];
      const bVal = b[sortBy as keyof Customer];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal, 'ko') : bVal.localeCompare(aVal, 'ko');
      }
      return 0;
    });

    // 응답 반환
    return Response.json({
      customers: filtered,
      total: filtered.length,
    });
  }),
];
