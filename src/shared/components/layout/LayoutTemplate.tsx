'use client';

import { Gcol } from '@atoms';
import { LayoutScrollWrap, LayoutScrollItem } from '@common/LayoutScroll';
import {
  LayoutBody,
  LayoutProcess,
  LayoutMain,
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
  asideLinks?: React.ReactNode;
  asideInfo?: React.ReactNode;
  asideFoot?: React.ReactNode;
  hideAside?: boolean;
  pageProcess?: React.ReactNode;
}
export const LayoutTemplateLTPA350MainBody = ({ mainBody }: Props) => (
  <LayoutMainBody>
    <LayoutScrollWrap>
      <LayoutScrollItem>{mainBody}</LayoutScrollItem>
    </LayoutScrollWrap>
  </LayoutMainBody>
);

export const LayoutTemplateLTPA350 = ({
  pageTitle,
  asideHead,
  mainBody,
  asideInfo,
  asideLinks,
  asideFoot,
  pageProcess,
  hideAside = false,
}: Props) => (
  <>
    <LayoutBody className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr] gap-x-3 gap-y-1">
      <div className="col-span-3 pl-2.5">{pageTitle}</div>
      <LayoutProcess>{pageProcess}</LayoutProcess>
      {mainBody}
      <LayoutAside className={`grid grid-rows-[auto_1fr_auto] gap-[1rem] ${hideAside ? 'hidden' : ''}`}>
        <LayoutAsideHead>{asideHead}</LayoutAsideHead>
        <LayoutAsideBody>
          <LayoutScrollWrap>
            <LayoutScrollItem>
              <Gcol className="gap-2 w-full pb-[4.9rem]" placement="ss">
                {asideInfo}
                {asideLinks}
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
