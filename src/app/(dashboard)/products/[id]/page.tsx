/**
 * Product Detail Page
 *
 * 제품 상세 페이지 컴포넌트
 *
 * @description
 * 제품 상세 정보를 표시하고 수정/삭제 기능 제공
 * - Dynamic Reducer Pattern으로 products reducer lazy loading
 * - useProduct 훅으로 제품 조회 및 삭제
 * - ProductDetail 컴포넌트로 상세 정보 표시
 *
 * @architecture
 * Next.js App Router + Server Component + Client Component Pattern
 * Dynamic Route [id] 사용
 *
 * @usage
 * /products/123 route에서 자동으로 렌더링됨
 */

import { ProductDetailPageContent } from './ProductDetailPageContent';

// ============================================================================
// SERVER COMPONENT WRAPPER
// ============================================================================

/**
 * Product Detail Page Server Component
 *
 * Next.js 15+: params는 Promise이므로 async 서버 컴포넌트에서 처리
 */
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15+: params는 Promise이므로 await 필요
  const { id } = await params;

  // 클라이언트 컴포넌트로 id 전달
  return <ProductDetailPageContent id={id} />;
}
