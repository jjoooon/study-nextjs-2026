/**
 * Products API Types
 */

/**
 * 제품 엔티티
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  category: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 제품 생성 입력
 */
export interface CreateProductInput {
  name: string;
  price: number;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  category: string;
}

/**
 * 제품 수정 입력
 */
export interface UpdateProductInput {
  name?: string;
  price?: number;
  description?: string;
  status?: 'active' | 'inactive' | 'archived';
  category?: string;
}

/**
 * 제품 목록 조회 파라미터
 */
export interface ProductListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * 제품 목록 응답
 */
export interface ProductsListResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}
