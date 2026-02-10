import InsPlanCovAside from '@/features/pub/poc/components/InsPlanCovAside';
import InsPlanCovBottom from '@/features/pub/poc/components/InsPlanCovBottom';
import Page3Section from '@/features/pub/poc/sections/Page3Section';

import { LayoutDocument, LayoutMain } from '@/shared/components/layout/Cabinet';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components/uiux';

export default function pageLayout() {
  return (
    <>
      <LayoutDocument className="grid-cols-[1fr] gap-5">
        <ResizablePanelGroup orientation="horizontal" className="w-full">
          <ResizablePanel defaultSize="75%" minSize="72rem">
            <LayoutMain className="grid-cols-[1fr] gap-5">
              <Page3Section />
            </LayoutMain>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="37.5rem" minSize="0" maxSize="50%">
            <InsPlanCovAside />
          </ResizablePanel>
        </ResizablePanelGroup>
      </LayoutDocument>
      <InsPlanCovBottom />
    </>
  );
}
