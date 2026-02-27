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
  pageProcess?: React.ReactNode;
}

export const LayoutTemplateA = ({
  pageHead,
  mainHead,
  asideHead,
  mainBody,
  asideBody,
  mainFoot,
  asideFoot,
  pageProcess,
  hideAside = false,
}: Props) => (
  <>
    <LayoutHead>{pageHead}</LayoutHead>
    <LayoutBody>
      <LayoutProcess>{pageProcess}</LayoutProcess>
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
          </LayoutAside>
          )}
        </LayoutFolderBody>
        <LayoutFolderFoot className="grid grid-cols-[1fr_19.8rem] gap-[1rem]">
          <LayoutMainFoot>{mainFoot}</LayoutMainFoot>
          <LayoutAsideFoot className={hideAside ? 'hide-aside' : ''}>{asideFoot}</LayoutAsideFoot>
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
  pageProcess,
}: Props) => (
  <>
    <LayoutHead>{pageHead}</LayoutHead>
    <LayoutBody>
      <LayoutProcess>{pageProcess}</LayoutProcess>
      <LayoutFolder className="grid-rows-[1fr] grid-cols-[1fr_auto] gap-3">
        <LayoutMain className="grid grid-rows-[auto_1fr_auto] gap-[1rem]">
          <LayoutMainHead>{mainHead}</LayoutMainHead>
          <LayoutMainBody>{mainBody}</LayoutMainBody>
          <LayoutMainFoot>{mainFoot}</LayoutMainFoot>
        </LayoutMain>
        <LayoutAside className="grid grid-rows-[auto_1fr_auto] gap-[1rem]">
          <LayoutAsideHead>{asideHead}</LayoutAsideHead>
          <LayoutAsideBody>{asideBody}</LayoutAsideBody>
          <LayoutAsideFoot>{asideFoot}</LayoutAsideFoot>
        </LayoutAside>
      </LayoutFolder>
    </LayoutBody>
  </>
);
