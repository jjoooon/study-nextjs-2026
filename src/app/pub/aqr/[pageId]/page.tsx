/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { notFound } from 'next/navigation';
import log from '@/shared/utils/logger';

// ==============================================================================
// 페이지 컴포넌트
// ==============================================================================

export default async function Page({ params }: { params: { pageId: string } }) {
  const logger = log.getLogger('App Routing');
  const { pageId } = await params;
  logger.debug(`pageId: ${pageId}`);

  let PageComponent;
  try {
    const module = await import(`../pages/${pageId}`);
    PageComponent = module.default;
  } catch {
    notFound();
  }

  return <PageComponent />;
}
