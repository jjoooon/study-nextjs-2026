import InsPlanBasicAside from '@/features/pub/poc/components/InsPlanBasicAside';
import InsPlanBasicBottom from '@/features/pub/poc/components/InsPlanBasicBottom';
import Page2Section from '@/features/pub/poc/sections/Page2Section';

import { LayoutDocument, LayoutMain } from '@/shared/components/layout/Cabinet';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components/uiux';

export default function pageLayout() {
  return (
    <>
      <LayoutDocument className="grid-cols-[1fr] gap-5">
        <ResizablePanelGroup orientation="horizontal" className="w-full">
          <ResizablePanel defaultSize="75%" minSize="72rem">
            <LayoutMain className="grid-cols-[1fr] gap-5">
              <Page2Section />
            </LayoutMain>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="37.5rem" minSize="0" maxSize="50%">
            <InsPlanBasicAside />
          </ResizablePanel>
        </ResizablePanelGroup>
      </LayoutDocument>
      <InsPlanBasicBottom />
    </>
  );
}
