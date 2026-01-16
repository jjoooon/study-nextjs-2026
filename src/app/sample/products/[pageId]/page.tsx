import dynamic from 'next/dynamic';
import log from '@/shared/utils/logger';

export default async function Page({ params }: { params: { pageId: string } }) {
  const logger = log.getLogger('ProductPage');

  const { pageId } = await params;
  logger.debug(`pageId: ${pageId}`);

  const PageComponent = dynamic(
    () =>
      import(`@/app/sample/products/pages/${pageId}`).catch(() => {
        return <div>not found</div>;
      }),
    {
      loading: () => <></>,
      ssr: true,
    }
  );
  return <PageComponent />;
}
