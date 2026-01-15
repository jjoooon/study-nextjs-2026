'use client';

/**
 * ProductList Component
 *
 * 제품 목록을 표시하는 컴포넌트
 *
 * @description
 * Shared UI 컴포넌트를 사용하여 로딩/빈 상태 표시
 */

import { EmptyList } from '@/shared/components/ui/EmptyState';
import { SkeletonList } from '@/shared/components/ui/Skeleton';
import type { ProductListProps } from '../types/ui';

export default function ProductList({ products, isLoading, onProductClick }: ProductListProps) {
  // 로딩 상태 - shared SkeletonList 사용
  if (isLoading) {
    return <SkeletonList count={5} />;
  }

  // 빈 상태 - shared EmptyList 사용
  if (products.length === 0) {
    return <EmptyList message="등록된 제품이 없습니다." />;
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onProductClick?.(product)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onProductClick?.(product);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">₩{product.price.toLocaleString()}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : product.status === 'inactive'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
              }`}
            >
              {product.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
