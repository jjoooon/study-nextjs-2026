import Aside from '@/app/pub/poc/page2/_layout/Aside';
import Footer from '@/app/pub/poc/page2/_layout/Footer';
import { LayoutDocument, LayoutMain } from '@/shared/components/layout/Cabinet';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components/uiux';

const pageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <LayoutDocument className="grid-cols-[1fr] gap-5">
        <ResizablePanelGroup orientation="horizontal" className="w-full">
          <ResizablePanel defaultSize="80%" minSize="72rem">
            <LayoutMain className="grid-cols-[1fr] gap-5">{children}</LayoutMain>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="50%" minSize="0" maxSize="37.5rem">
            <Aside />
          </ResizablePanel>
        </ResizablePanelGroup>
      </LayoutDocument>
      <Footer />
    </>
  );
};

export default pageLayout;
