/**
 * Edit Product Page
 *
 * 제품 수정 페이지 컴포넌트
 *
 * @description
 * 기존 제품을 수정하는 폼 페이지
 * - Dynamic Reducer Pattern으로 products reducer lazy loading
 * - useProductForm 훅으로 폼 상태 관리
 * - ProductForm 컴포넌트로 수정 폼 표시
 *
 * @architecture
 * Next.js App Router + Server Component + Client Component Pattern
 * Dynamic Route [id] 사용
 *
 * @usage
 * /products/123/edit route에서 자동으로 렌더링됨
 */

import { EditProductPageContent } from './EditProductPageContent';

// ============================================================================
// SERVER COMPONENT WRAPPER
// ============================================================================

/**
 * Edit Product Page Server Component
 *
 * Next.js 15+: params는 Promise이므로 async 서버 컴포넌트에서 처리
 */
export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15+: params는 Promise이므로 await 필요
  const { id } = await params;

  // 클라이언트 컴포넌트로 id 전달
  return <EditProductPageContent id={id} />;
}
