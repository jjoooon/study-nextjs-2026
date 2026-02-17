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
  mainHead: React.ReactNode;
  mainBody: React.ReactNode;
  mainFoot: React.ReactNode;
  asideHead: React.ReactNode;
  asideBody: React.ReactNode;
  asideFoot: React.ReactNode;
  hideAside?: boolean;
  process?: React.ReactNode;
}

export const LayoutTemplateA = ({
  pageHead,
  mainHead,
  asideHead,
  mainBody,
  asideBody,
  mainFoot,
  asideFoot,
  process,
  hideAside = false,
}: Props) => (
  <>
    <LayoutHead>{pageHead}</LayoutHead>
    <LayoutBody>
      <LayoutProcess>{process}</LayoutProcess>
      <LayoutFolder>
        <LayoutFolderHead className="grid grid-cols-[1fr_auto] gap-[1rem]">
          <LayoutMainHead>{mainHead}</LayoutMainHead>
          <LayoutAsideHead>{asideHead}</LayoutAsideHead>
        </LayoutFolderHead>
        <LayoutFolderBody className="grid grid-cols-[1fr_auto] gap-[1rem]">
          <LayoutMain>
            <LayoutMainBody>{mainBody}</LayoutMainBody>
            <LayoutMainFoot>{mainFoot}</LayoutMainFoot>
          </LayoutMain>
          {!hideAside && (
            <LayoutAside>
              <LayoutAsideBody>{asideBody}</LayoutAsideBody>
              <LayoutAsideFoot>{asideFoot}</LayoutAsideFoot>
            </LayoutAside>
          )}
        </LayoutFolderBody>
      </LayoutFolder>
    </LayoutBody>
  </>
);

export const LayoutTemplateB = ({
  pageHead,
  mainHead,
  asideHead,
  mainBody,
  asideBody,
  mainFoot,
  asideFoot,
  process,
}: Props) => (
  <>
    <LayoutHead>{pageHead}</LayoutHead>
    <LayoutBody>
      <LayoutProcess>{process}</LayoutProcess>
      <LayoutFolder>
        <LayoutFolderBody>
          <ResizablePanelGroup orientation="horizontal" className="w-full">
            <ResizablePanel defaultSize="100%" minSize="72rem">
              <LayoutMain>
                <LayoutMainHead>{mainHead}</LayoutMainHead>
                <LayoutMainBody>{mainBody}</LayoutMainBody>
                <LayoutMainFoot>{mainFoot}</LayoutMainFoot>
              </LayoutMain>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize="19.8rem" minSize="0" maxSize="50%">
              <LayoutAside>
                <LayoutAsideHead>{asideHead}</LayoutAsideHead>
                <LayoutAsideBody>{asideBody}</LayoutAsideBody>
                <LayoutAsideFoot>{asideFoot}</LayoutAsideFoot>
              </LayoutAside>
            </ResizablePanel>
          </ResizablePanelGroup>
        </LayoutFolderBody>
      </LayoutFolder>
    </LayoutBody>
  </>
);
