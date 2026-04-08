'use client';

import { Gcol } from '@atoms';
import { LayoutScrollWrap, LayoutScrollItem } from '@common/LayoutScroll';
import {
  LayoutHead,
  LayoutBody,
  LayoutProcess,
  LayoutFolder,
  LayoutMain,
  LayoutMainHead,
  LayoutMainBody,
  LayoutMainFoot,
  LayoutAside,
  LayoutAsideHead,
  LayoutAsideBody,
  LayoutAsideFoot,
} from '@layout/BaseLayout';

interface Props {
  pageID?: React.ReactNode;
  pageTitle?: React.ReactNode;
  mainHead?: React.ReactNode;
  mainBody?: React.ReactNode;
  mainFoot?: React.ReactNode;
  asideHead?: React.ReactNode;
  asideBody?: React.ReactNode;
  asideFoot?: React.ReactNode;
  hideAside?: boolean;
  pageProcess?: React.ReactNode;
}

export const LayoutTemplateAsideToggle = ({
  pageTitle,
  asideHead,
  mainBody,
  asideBody,
  asideFoot,
  pageProcess,
  hideAside = false,
}: Props) => (
  <>
    <LayoutBody className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr] gap-3">
      <div className="col-span-3">{pageTitle}</div>
      <LayoutProcess>{pageProcess}</LayoutProcess>
      {mainBody}
      <LayoutAside className={`grid grid-rows-[auto_1fr_auto] gap-[1rem] ${hideAside ? 'hidden' : ''}`}>
        <LayoutAsideHead>{asideHead}</LayoutAsideHead>
        <LayoutAsideBody>
          <LayoutScrollWrap>
            <LayoutScrollItem>
              <Gcol className="gap-2 w-full pb-[4.9rem]" placement="ss">
                {asideBody}
              </Gcol>
            </LayoutScrollItem>
          </LayoutScrollWrap>
        </LayoutAsideBody>
        <LayoutAsideFoot>{asideFoot}</LayoutAsideFoot>
      </LayoutAside>
    </LayoutBody>
  </>
);

export const LayoutTemplate = ({ mainBody, mainFoot }: Props) => (
  <>
    <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem] px-[1rem]">
      <LayoutMainBody>
        <LayoutScrollWrap>
          <LayoutScrollItem>{mainBody}</LayoutScrollItem>
        </LayoutScrollWrap>
      </LayoutMainBody>
      {mainFoot && <LayoutMainFoot>{mainFoot}</LayoutMainFoot>}
    </LayoutMain>
  </>
);

export const LayoutTemplateA = ({
  pageID,
  pageTitle,
  asideHead,
  mainBody,
  asideBody,
  asideFoot,
  pageProcess,
  hideAside = false,
}: Props) => (
  <>
    <LayoutHead>
      {pageID}
      {pageTitle}
    </LayoutHead>

    <LayoutBody className="grid grid-cols-[auto_1fr_auto] gap-3">
      <LayoutProcess>{pageProcess}</LayoutProcess>

      {mainBody}

      <LayoutAside className={`grid grid-rows-[auto_1fr_auto] gap-[1rem] ${hideAside ? 'hidden' : ''}`}>
        <LayoutAsideHead>{asideHead}</LayoutAsideHead>
        <LayoutAsideBody>
          <LayoutScrollWrap>
            <LayoutScrollItem>
              <Gcol className="gap-2 w-full pb-[4.9rem]" placement="ss">
                {asideBody}
              </Gcol>
            </LayoutScrollItem>
          </LayoutScrollWrap>
        </LayoutAsideBody>
        <LayoutAsideFoot>{asideFoot}</LayoutAsideFoot>
      </LayoutAside>
    </LayoutBody>
  </>
);
export const LayoutTemplateB = ({
  pageID,
  pageTitle,
  mainHead,
  asideHead,
  mainBody,
  asideBody,
  mainFoot,
  asideFoot,
  pageProcess,
}: Props) => (
  <>
    <LayoutHead>
      {pageID}
      {pageTitle}
    </LayoutHead>
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
