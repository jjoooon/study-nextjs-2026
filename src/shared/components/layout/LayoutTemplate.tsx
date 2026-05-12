/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
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
export const LayoutTemplateLTPA350MainBody = ({ mainBody }: Props) => <LayoutMainBody>{mainBody}</LayoutMainBody>;

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
      {/* M1. 간격수정 gap-3 */}
      <LayoutAside className={`grid grid-rows-[auto_1fr_auto] gap-3 ${hideAside ? 'hidden' : ''}`}>
        <LayoutAsideHead>{asideHead}</LayoutAsideHead>
        <LayoutAsideBody>
          <LayoutScrollWrap>
            <LayoutScrollItem>
              {/* M1. 간격수정 gap-3 */}
              <Gcol className="gap-3 w-full pb-[4.9rem]" placement="ss">
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

export const LayoutTemplatePx0 = ({ mainBody, mainFoot }: Props) => (
  <>
    <LayoutMain className="grid grid-rows-[1fr_auto] gap-0 px-0">
      <LayoutMainBody>
        <LayoutScrollWrap>
          <LayoutScrollItem>{mainBody}</LayoutScrollItem>
        </LayoutScrollWrap>
      </LayoutMainBody>
      {mainFoot && <LayoutMainFoot>{mainFoot}</LayoutMainFoot>}
    </LayoutMain>
  </>
);
