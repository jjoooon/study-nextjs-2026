import Footer from '@/app/pub/poc/page1/_layout/Footer';
import { LayoutDocument, LayoutMain } from '@/shared/components/layout/Cabinet';

const pageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <LayoutDocument className="grid-cols-[1fr]">
        <LayoutMain className="grid-cols-[1fr] gap-5">{children}</LayoutMain>
      </LayoutDocument>
      <Footer />
    </>
  );
};

export default pageLayout;
