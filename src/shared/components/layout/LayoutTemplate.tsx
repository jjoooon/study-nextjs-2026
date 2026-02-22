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

        <LayoutFolderHead className="grid grid-cols-[1fr_19.8rem] gap-[1rem]">
          <LayoutMainHead>{mainHead}</LayoutMainHead>
          <LayoutAsideHead>{asideHead}</LayoutAsideHead>
        </LayoutFolderHead>

        <LayoutFolderBody className="grid grid-cols-[1fr_auto] gap-[1rem]">
          <LayoutMain>
            <LayoutMainBody>{mainBody}</LayoutMainBody>
          </LayoutMain>
          <LayoutAside>
            <LayoutAsideBody>{asideBody}</LayoutAsideBody>
          </LayoutAside>
        </LayoutFolderBody>

        <LayoutFolderFoot className="grid grid-cols-[1fr_19.8rem] gap-[1rem]">
          <LayoutMainFoot>{mainFoot}</LayoutMainFoot>
          {!hideAside && (
            <LayoutAsideFoot>{asideFoot}</LayoutAsideFoot>
          )}
        </LayoutFolderFoot>
      </LayoutFolder>
    </LayoutBody>
  </>
);


