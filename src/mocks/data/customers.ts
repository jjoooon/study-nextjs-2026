/**
 * POC Feature Mock Data
 *
 * Customers API 응답을 모킹하기 위한 데이터입니다.
 */

import type { Customer } from '@/features/poc/types/customerTypes';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: '김철수',
    customerNo: 'CUST001',
    customerType: '개인',
    phone: '010-0000-0000',
    address: '서울시 강남구 테헤란로 123',
    birthDate: '19800115',
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
  },
  {
    id: '2',
    name: '이영희',
    customerNo: 'CUST002',
    customerType: '법인',
    phone: '010-2345-6789',
    address: '서울시 서초구 강남대로 456',
    birthDate: '19850322',
    status: 'active',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-15T00:00:00.000Z',
  },
  {
    id: '3',
    name: '박민수',
    customerNo: 'CUST003',
    customerType: '개인',
    phone: '010-3456-7890',
    address: '서울시 송파구 올림픽대로 789',
    birthDate: '19900708',
    status: 'active',
    createdAt: '2024-10-01T00:00:00.000Z',
    updatedAt: '2024-10-15T00:00:00.000Z',
  },
  {
    id: '4',
    name: '최수진',
    customerNo: 'CUST004',
    customerType: '개인',
    phone: '011-4567-8901',
    address: '서울시 마포구 월드컵로 111',
    birthDate: '19851230',
    status: 'terminated',
    createdAt: '2023-05-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '5',
    name: '한빛나',
    customerNo: 'CUST005',
    customerType: '법인',
    phone: '010-5678-9012',
    address: '서울시 영등포구 여의도동 222',
    birthDate: '19951120',
    status: 'active',
    createdAt: '2024-11-01T00:00:00.000Z',
    updatedAt: '2024-11-15T00:00:00.000Z',
  },
];
