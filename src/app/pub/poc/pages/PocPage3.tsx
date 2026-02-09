import InsPlanBasicAside from '@/features/pub/poc/components/InsPlanBasicAside';
import InsPlanBasicBottom from '@/features/pub/poc/components/InsPlanBasicBottom';
import Page3Section from '@/features/pub/poc/sections/Page3Section';

import { LayoutDocument, LayoutMain } from '@/shared/components/layout/Cabinet';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components/uiux';

export default function pageLayout() {
  return (
    <>
      <LayoutDocument className="grid-cols-[1fr] gap-5">
        <ResizablePanelGroup orientation="horizontal" className="w-full">
          <ResizablePanel defaultSize="80%" minSize="72rem">
            <LayoutMain className="grid-cols-[1fr] gap-5">
              <Page3Section />
            </LayoutMain>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="50%" minSize="0" maxSize="37.5rem">
            <InsPlanBasicAside />
          </ResizablePanel>
        </ResizablePanelGroup>
      </LayoutDocument>
      <InsPlanBasicBottom />
    </>
  );
}
