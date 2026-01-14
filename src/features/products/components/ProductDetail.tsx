'use client';

/**
 * ProductDetail Component
 *
 * 제품 상세 정보를 표시하는 컴포넌트
 */

import type { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onBack?: () => void;
}

export function ProductDetail({ product, onEdit, onDelete, onBack }: ProductDetailProps) {
  const getStatusBadgeClass = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return '활성';
      case 'inactive':
        return '비활성';
      case 'archived':
        return '보관';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(product.status)}`}>
          {getStatusLabel(product.status)}
        </span>
      </div>

      {/* 기본 정보 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">기본 정보</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">제품명</dt>
            <dd className="mt-1 text-lg text-gray-900">{product.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">가격</dt>
            <dd className="mt-1 text-2xl font-bold text-blue-600">₩{product.price.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">카테고리</dt>
            <dd className="mt-1 text-lg text-gray-900">{product.category}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">상태</dt>
            <dd className="mt-1">
              <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusBadgeClass(product.status)}`}>
                {getStatusLabel(product.status)}
              </span>
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500">설명</dt>
            <dd className="mt-1 text-gray-900">{product.description}</dd>
          </div>
        </dl>
      </div>

      {/* 날짜 정보 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">날짜 정보</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">생성일</dt>
            <dd className="mt-1 text-gray-900">{new Date(product.createdAt).toLocaleString('ko-KR')}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">수정일</dt>
            <dd className="mt-1 text-gray-900">{new Date(product.updatedAt).toLocaleString('ko-KR')}</dd>
          </div>
        </dl>
      </div>

      {/* 작업 버튼 */}
      <div className="flex gap-4">
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(product.id)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            수정
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(product.id)}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
          >
            삭제
          </button>
        )}
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            목록으로
          </button>
        ) : (
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            목록으로
          </button>
        )}
      </div>
    </div>
  );
}
