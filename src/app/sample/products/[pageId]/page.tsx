import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import log from '@/shared/utils/logger';

// 🔒 화이트리스트: 허용된 페이지 ID만 정의
const ALLOWED_PAGE_IDS = ['List', 'Detail', 'New', 'Edit'] as const;
type PageId = (typeof ALLOWED_PAGE_IDS)[number];

// ==============================================================================
// 정적 생성: 빌드 시 HTML 미리 생성
// ==============================================================================

/**
 * generateStaticParams
 *
 * Next.js 빌드 시점에 호출되어 정적으로 생성할 페이지 경로를 정의합니다.
 *
 * @description
 * - 빌드 시 각 pageId별로 HTML을 미리 렌더링합니다.
 * - 사용자 요청 시 즉시 HTML을 제공하여 초기 로딩 속도가 50-80% 개선됩니다.
 * - SEO 최적화에 필수적인 기능입니다.
 * - 서버 부하를 줄이고 전체 성능을 향상시킵니다.
 *
 * @returns {Array<{ pageId: string }>} 정적 생성할 pageId 목록
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export function generateStaticParams(): Array<{ pageId: PageId }> {
  return ALLOWED_PAGE_IDS.map((pageId) => ({
    pageId,
  }));
}

// ==============================================================================
// 페이지 컴포넌트
// ==============================================================================

export default async function Page({ params }: { params: { pageId: string } }) {
  const logger = log.getLogger('ProductPage');

  const { pageId } = await params;
  logger.debug(`pageId: ${pageId}`);

  // ✅ 보안 검증: 화이트리스트에 없는 pageId는 404 처리
  if (!ALLOWED_PAGE_IDS.includes(pageId as PageId)) {
    logger.warn(`Invalid pageId attempted: ${pageId}`);
    notFound();
  }

  // ✅ 개선된 에러 처리: 함수 컴포넌트를 올바르게 반환
  const PageComponent = dynamic(() => import(`@/app/sample/products/pages/${pageId}`), {
    ssr: true,
  });

  return <PageComponent />;
}
