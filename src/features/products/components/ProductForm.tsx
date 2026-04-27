'use client';

/**
 * ProductForm Component
 *
 * 제품 등록/수정 폼 컴포넌트
 *
 * @description
 * Zod 스키마를 사용한 폼 검증 구현
 *
 * @architecture
 * - Zod 스키마: utils/validation.ts
 * - 실시간 검증: 필드 변경 시 자동 검증
 * - 제출 시 검증: 전체 폼 검증
 */

import { useEffect, useState } from 'react';
import { z } from 'zod';

import { zodToFieldErrors } from '@/shared/utils/validation/zodHelpers';
import type { CreateProductInput, Product, UpdateProductInput } from '../types/apiTypes';
import { createProductSchema } from '../utils/validation';

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

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

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
   *
   * @description
   * Zod 스키마를 사용한 실시간 필드 검증
   */
  const handleChange = (field: keyof CreateProductInput, value: string | number) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // 실시간 검증 (해당 필드만)
    try {
      // 부분 스키마 생성 (현재 필드만)
      const fieldSchema = createProductSchema.shape[field];
      if (fieldSchema) {
        fieldSchema.parse(value);
        // 검증 성공 시 에러 제거
        if (errors[field]) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      }
    } catch (error) {
      // Zod 에러를 메시지로 변환
      if (error instanceof z.ZodError) {
        const fieldError = zodToFieldErrors(error);
        setErrors((prev) => ({ ...prev, ...fieldError }));
      }
    }
  };

  /**
   * 폼 전체 검증
   *
   * @description
   * 제출 시 전체 폼 데이터를 Zod 스키마로 검증
   * @returns 검증 통과 여부
   */
  const validate = (): boolean => {
    const result = createProductSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = zodToFieldErrors(result.error);
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  /**
   * 제출 핸들러
   *
   * @description
   * Zod 검증 후 데이터 제출
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Zod 검증 통과한 타입 안전한 데이터 사용
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
