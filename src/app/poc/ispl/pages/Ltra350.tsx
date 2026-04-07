import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';
import InsPlanCovAside from '@/features/poc/ispl/components/InsPlanCovAside';
import InsPlanCovBottom from '@/features/poc/ispl/components/InsPlanCovBottom';
import Ltra350Section from '@/features/poc/ispl/sections/Ltra350Section';

import { LayoutDocument, LayoutMain } from '@/shared/components/layout/Cabinet';

export default function Ltra350() {
  return (
    <>
      <LayoutDocument className="grid-cols-[1fr] gap-5">
        <ResizablePanelGroup orientation="horizontal" className="w-full">
          <ResizablePanel defaultSize="75%" minSize="72rem">
            <LayoutMain className="grid-cols-[1fr] gap-5">
              <Ltra350Section />
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
