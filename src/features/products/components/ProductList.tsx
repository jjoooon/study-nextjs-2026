'use client';

/**
 * ProductList Component
 *
 * 제품 목록을 표시하는 컴포넌트
 */

import type { ProductListProps } from '../types/ui';

export default function ProductList({ products, isLoading, onProductClick }: ProductListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">제품이 없습니다.</p>
      </div>
    );
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
