/**
 * MSW Handlers for Products API
 *
 * Products 관련 API 요청을 모킹합니다.
 */

import { http, HttpResponse, delay } from 'msw';
import type { CreateProductInput, UpdateProductInput } from '@/features/products/types';
import { mockProducts } from '../data/products';

export const productsHandlers = [
  /**
   * 제품 목록 조회
   * GET /api/products
   */
  http.get('/api/products', async ({ request }) => {
    const url = new URL(request.url);

    // 쿼리 파라미터 추출
    const page = url.searchParams.get('page') || '1';
    const pageSize = url.searchParams.get('pageSize') || '10';
    const search = url.searchParams.get('search') || '';
    const status = url.searchParams.get('status') || '';

    // 네트워크 지연 시뮬레이션 (100-300ms)
    await delay(Math.floor(Math.random() * 200) + 100);

    // 필터링 로직
    let filteredProducts = [...mockProducts];

    if (search) {
      filteredProducts = filteredProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (status) {
      filteredProducts = filteredProducts.filter((p) => p.status === status);
    }

    // 페이지네이션
    const startIndex = (parseInt(page) - 1) * parseInt(pageSize);
    const endIndex = startIndex + parseInt(pageSize);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return HttpResponse.json(
      {
        products: paginatedProducts,
        total: filteredProducts.length,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
      },
      { status: 200 }
    );
  }),

  /**
   * 제품 상세 조회
   * GET /api/products/:id
   */
  http.get('/api/products/:id', async ({ params }) => {
    const { id } = params;
    const product = mockProducts.find((p) => p.id === parseInt(id as string));

    await delay(Math.floor(Math.random() * 200) + 100);

    if (!product) {
      return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return HttpResponse.json(product, { status: 200 });
  }),

  /**
   * 제품 생성
   * POST /api/products
   */
  http.post('/api/products', async ({ request }) => {
    const body = (await request.json()) as CreateProductInput;

    await delay(Math.floor(Math.random() * 200) + 100);

    const newProduct = {
      id: mockProducts.length + 1,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockProducts.push(newProduct);

    return HttpResponse.json(newProduct, { status: 201 });
  }),

  /**
   * 제품 수정
   * PATCH /api/products/:id
   */
  http.patch('/api/products/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as UpdateProductInput;

    await delay(Math.floor(Math.random() * 200) + 100);

    const index = mockProducts.findIndex((p) => p.id === parseInt(id as string));

    if (index === -1) {
      return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    const updatedProduct = {
      ...mockProducts[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    mockProducts[index] = updatedProduct;

    return HttpResponse.json(updatedProduct, { status: 200 });
  }),

  /**
   * 제품 삭제
   * DELETE /api/products/:id
   */
  http.delete('/api/products/:id', async ({ params }) => {
    const { id } = params;

    await delay(Math.floor(Math.random() * 200) + 100);

    const index = mockProducts.findIndex((p) => p.id === parseInt(id as string));

    if (index === -1) {
      return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    mockProducts.splice(index, 1);

    return HttpResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  }),
];
