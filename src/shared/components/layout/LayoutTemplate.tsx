'use client';

import {
  LayoutHead,
  LayoutBody,
  LayoutProcess,
  LayoutFolder,
  LayoutFolderHead,
  LayoutFolderBody,
  LayoutFolderFoot,
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
  asideFoot1: React.ReactNode;
  asideFoot2: React.ReactNode;
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
  asideFoot1,
  asideFoot2,
  process,
  hideAside = false,
}: Props) => (
  <>
    <LayoutHead>{pageHead}</LayoutHead>
    <LayoutBody>
      <LayoutProcess>{process}</LayoutProcess>
      <LayoutFolder>
        <LayoutFolderHead className="grid grid-cols-[1fr_19.8rem] gap-[1rem]">
          <LayoutMainHead>{mainHead}</LayoutMainHead>
          <LayoutAsideHead>{asideHead}</LayoutAsideHead>
        </LayoutFolderHead>
        <LayoutFolderBody className="grid grid-cols-[1fr_auto] gap-[1rem]">
          <LayoutMain>
            <LayoutMainBody>{mainBody}</LayoutMainBody>
          </LayoutMain>
          {!hideAside && (
            <LayoutAside>
              <LayoutAsideBody>{asideBody}</LayoutAsideBody>
              <LayoutAsideFoot className="mb-[-0.6rem]">{asideFoot1}</LayoutAsideFoot>
            </LayoutAside>
          )}
        </LayoutFolderBody>
        <LayoutFolderFoot className="grid grid-cols-[1fr_19.8rem] gap-[1rem]">
          <LayoutMainFoot>{mainFoot}</LayoutMainFoot>
          <LayoutAsideFoot>{asideFoot2}</LayoutAsideFoot>
        </LayoutFolderFoot>
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
