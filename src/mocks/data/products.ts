/**
 * Products Feature Mock Data
 *
 * Products API 응답을 모킹하기 위한 데이터입니다.
 */

import type { Product } from '@/features/products/types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Plan',
    price: 99000,
    description: '프리미엄 요금제',
    status: 'active',
    category: 'subscription',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'Basic Plan',
    price: 49000,
    description: '기본 요금제',
    status: 'active',
    category: 'subscription',
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-10T00:00:00.000Z',
  },
  {
    id: 3,
    name: 'Enterprise Plan',
    price: 299000,
    description: '기업용 요금제',
    status: 'active',
    category: 'subscription',
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-12T00:00:00.000Z',
  },
  {
    id: 4,
    name: 'Starter Plan',
    price: 19000,
    description: '입문용 요금제',
    status: 'inactive',
    category: 'subscription',
    createdAt: '2024-01-04T00:00:00.000Z',
    updatedAt: '2024-01-08T00:00:00.000Z',
  },
  {
    id: 5,
    name: 'Consulting Service',
    price: 500000,
    description: '일회 컨설팅 서비스',
    status: 'active',
    category: 'one-time',
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-14T00:00:00.000Z',
  },
];

export const productsData = {
  products: mockProducts,
  total: mockProducts.length,
};
