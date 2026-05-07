import { notFound } from 'next/navigation';
import log from '@/shared/utils/logger';

// ==============================================================================
// 페이지 컴포넌트
// ==============================================================================

export default async function Page({ params }: { params: { pageId: string } }) {
  const logger = log.getLogger('ProductPage');
  const { pageId } = await params;
  logger.debug(`pageId: ${pageId}`);

  try {
    const { default: PageComponent } = await import(`../pages/${pageId}`);
    return <PageComponent />;
  } catch {
    notFound();
  }
}
