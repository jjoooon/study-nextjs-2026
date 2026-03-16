import InsPlanCovAside from '@/features/poc/ispl/components/InsPlanCovAside';
import InsPlanCovBottom from '@/features/poc/ispl/components/InsPlanCovBottom';
import LniPl020Section from '@/features/poc/ispl/sections/LniPl020Section';

import { LayoutDocument, LayoutMain } from '@/shared/components/layout/Cabinet';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';

export default function LniPl020() {
  return (
    <>
      <LayoutDocument className="grid-cols-[1fr] gap-5">
        <ResizablePanelGroup orientation="horizontal" className="w-full">
          <ResizablePanel defaultSize="75%" minSize="72rem">
            <LayoutMain className="grid-cols-[1fr] gap-5">
              <LniPl020Section />
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
