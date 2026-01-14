'use client';

/**
 * ProductForm Component
 *
 * 제품 등록/수정 폼 컴포넌트
 */

import { useEffect, useState } from 'react';
import type { CreateProductInput, Product, UpdateProductInput } from '../types/api';

interface ProductFormProps {
  initialData?: Product;
  mode: 'create' | 'update';
  onSubmit: (data: CreateProductInput | UpdateProductInput) => Promise<Product | null>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export default function ProductForm({ initialData, mode, onSubmit, onCancel, isSubmitting = false }: ProductFormProps) {
  const [formData, setFormData] = useState<CreateProductInput>({
    name: '',
    price: 0,
    description: '',
    status: 'active',
    category: 'subscription',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateProductInput, string>>>({});

  // 초기 데이터 로드 (수정 모드)
  useEffect(() => {
    if (initialData && mode === 'update') {
      requestAnimationFrame(() => {
        setFormData({
          name: initialData.name,
          price: initialData.price,
          description: initialData.description,
          status: initialData.status,
          category: initialData.category,
        });
      });
    }
  }, [initialData, mode]);

  /**
   * 입력 변경 핸들러
   */
  const handleChange = (field: keyof CreateProductInput, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 에러 clear
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /**
   * 폼 검증
   */
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateProductInput, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = '제품명을 입력해주세요.';
    }

    if (formData.price <= 0) {
      newErrors.price = '가격은 0보다 커야 합니다.';
    }

    if (!formData.description.trim()) {
      newErrors.description = '설명을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 제출 핸들러
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 제품명 */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          제품명 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="제품명을 입력하세요"
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* 가격 */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
          가격 (원) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="price"
          value={formData.price}
          onChange={(e) => handleChange('price', parseInt(e.target.value) || 0)}
          placeholder="0"
          min="0"
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.price ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
      </div>

      {/* 카테고리 */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          카테고리 <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="subscription">구독</option>
          <option value="one-time">일회</option>
        </select>
      </div>

      {/* 상태 */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
          상태 <span className="text-red-500">*</span>
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value as Product['status'])}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="active">활성</option>
          <option value="inactive">비활성</option>
          <option value="archived">보관</option>
        </select>
      </div>

      {/* 설명 */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          설명 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="제품 설명을 입력하세요"
          rows={4}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      {/* 버튼 그룹 */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '저장 중...' : mode === 'create' ? '등록' : '수정'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
}
