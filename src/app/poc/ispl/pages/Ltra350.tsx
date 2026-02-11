/**
 * Ltra350
 */

import InsPlanBasicAside from '@/features/poc/ispl/components/InsPlanBasicAside';
import InsPlanBasicBottom from '@/features/poc/ispl/components/InsPlanBasicBottom';
import Ltra350Section from '@/features/poc/ispl/sections/Ltra350Section';

import { LayoutDocument, LayoutMain } from '@/shared/components/layout/Cabinet';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components/uiux';

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
            <InsPlanBasicAside />
          </ResizablePanel>
        </ResizablePanelGroup>
      </LayoutDocument>
      <InsPlanBasicBottom />
    </>
  );
}
