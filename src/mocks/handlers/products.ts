/**
 * MSW Handlers for Products API
 *
 * Products 관련 API 요청을 모킹합니다.
 */

import { http, HttpResponse, delay } from 'msw';

import { mockProducts } from '../data/products';
import type { CreateProductInput, UpdateProductInput } from '@/features/products/types/apiTypes';

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
    const category = url.searchParams.get('category') || '';
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const sortOrder = url.searchParams.get('sortOrder') || 'desc';

    // 네트워크 지연 시뮬레이션 (30-60ms)
    await delay(Math.floor(Math.random() * 30) + 300);

    // 필터링 로직
    let filteredProducts = [...mockProducts];

    if (search) {
      filteredProducts = filteredProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (status) {
      filteredProducts = filteredProducts.filter((p) => p.status === status);
    }

    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.category === category);
    }

    // 정렬 로직
    filteredProducts.sort((a, b) => {
      let comparison = 0;

      // 정렬 기준별 비교
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        default:
          comparison = 0;
      }

      // 오름차순/내림차순 적용
      return sortOrder === 'asc' ? comparison : -comparison;
    });

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

    // 네트워크 지연 시뮬레이션 (30-60ms)
    await delay(Math.floor(Math.random() * 30) + 30);

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

    // 네트워크 지연 시뮬레이션 (30-60ms)
    await delay(Math.floor(Math.random() * 30) + 30);

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

    // 네트워크 지연 시뮬레이션 (30-60ms)
    await delay(Math.floor(Math.random() * 30) + 30);

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

    // 네트워크 지연 시뮬레이션 (30-60ms)
    await delay(Math.floor(Math.random() * 30) + 30);

    const index = mockProducts.findIndex((p) => p.id === parseInt(id as string));

    if (index === -1) {
      return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    mockProducts.splice(index, 1);

    return HttpResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  }),
];
