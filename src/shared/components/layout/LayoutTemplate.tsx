'use client';

import {
  LayoutHead,
  LayoutBody,
  LayoutProcess,
  LayoutFolder,
  LayoutFolderHead,
  LayoutFolderBody,
  LayoutMain,
  LayoutMainHead,
  LayoutMainBody,
  LayoutMainFoot,
  LayoutAside,
  LayoutAsideHead,
  LayoutAsideBody,
  LayoutAsideFoot,
} from '@/shared/components/layout';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components/uiux';

interface Props {
  pageHead: React.ReactNode;
  headMain: React.ReactNode;
  headAside: React.ReactNode;
  bodyMain: React.ReactNode;
  bodyAside: React.ReactNode;
  footMain: React.ReactNode;
  footAside: React.ReactNode;
  hideAside?: boolean;
}

export const LayoutTemplateA = ({
  pageHead,
  headMain,
  headAside,
  bodyMain,
  bodyAside,
  footMain,
  footAside,
  hideAside = false,
}: Props) => (
  <>
    <LayoutHead>{pageHead}</LayoutHead>
    <LayoutBody>
      <LayoutProcess>프로세스</LayoutProcess>
      <LayoutFolder>
        <LayoutFolderHead className="grid grid-cols-[1fr_auto] gap-[1rem]">
          <LayoutMainHead>{headMain}</LayoutMainHead>
          <LayoutAsideHead>{headAside}</LayoutAsideHead>
        </LayoutFolderHead>
        <LayoutFolderBody className="grid grid-cols-[1fr_auto] gap-[1rem]">
          <LayoutMain>
            <LayoutMainBody>{bodyMain}</LayoutMainBody>
            <LayoutMainFoot>{footMain}</LayoutMainFoot>
          </LayoutMain>
          {!hideAside && (
            <LayoutAside>
              <LayoutAsideBody>{bodyAside}</LayoutAsideBody>
              <LayoutAsideFoot>{footAside}</LayoutAsideFoot>
            </LayoutAside>
          )}
        </LayoutFolderBody>
      </LayoutFolder>
    </LayoutBody>
  </>
);

export const LayoutTemplateB = ({ headMain, headAside, bodyMain, bodyAside, footMain, footAside }: Props) => (
  <LayoutFolder>
    <LayoutFolderBody>
      <ResizablePanelGroup orientation="horizontal" className="w-full">
        <ResizablePanel defaultSize="100%" minSize="72rem">
          <LayoutMain>
            <LayoutMainHead>{headMain}</LayoutMainHead>
            <LayoutMainBody>{bodyMain}</LayoutMainBody>
            <LayoutMainFoot>{footMain}</LayoutMainFoot>
          </LayoutMain>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="19.8rem" minSize="0" maxSize="50%">
          <LayoutAside>
            <LayoutAsideHead>{headAside}</LayoutAsideHead>
            <LayoutAsideBody>{bodyAside}</LayoutAsideBody>
            <LayoutAsideFoot>{footAside}</LayoutAsideFoot>
          </LayoutAside>
        </ResizablePanel>
      </ResizablePanelGroup>
    </LayoutFolderBody>
  </LayoutFolder>
);
