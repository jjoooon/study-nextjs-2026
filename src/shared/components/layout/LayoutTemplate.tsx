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

// 템플릿 공통 슬롯 props
// - 필요 영역만 선택적으로 주입해 화면 구조를 조합한다.
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

// LTPA350 전용: main body만 교체할 때 사용하는 헬퍼 래퍼
export const LayoutTemplateLTPA350MainBody = ({ mainBody }: Props) => <LayoutMainBody>{mainBody}</LayoutMainBody>;

// LTPA350 전용 전체 레이아웃
// - 상단 제목 1행 + 본문 3열(프로세스 / 메인 / 사이드) 구조
// - hideAside=true면 우측 사이드 영역 전체 숨김
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
    <LayoutBody className="grid grid-cols-[auto_minmax(92.2rem,1fr)_auto] grid-rows-[auto_minmax(0,1fr)] gap-x-3 gap-y-1">
      {/* 페이지 타이틀은 3열 전체에 걸쳐 표시 */}
      <div className="col-span-3 pl-2.5">{pageTitle}</div>

      {/* 좌측 세로 프로세스(단계바) */}
      <LayoutProcess>{pageProcess}</LayoutProcess>

      {/* 중앙 메인 영역 */}
      {mainBody}

      {/* 우측 사이드 영역(헤더/본문/푸터) */}
      <LayoutAside className={`grid grid-rows-[auto_minmax(0,1fr)_auto] gap-1 ${hideAside ? 'hidden' : ''}`}>
        <LayoutAsideHead>{asideHead}</LayoutAsideHead>
        <LayoutAsideBody>
          <LayoutScrollWrap>
            <LayoutScrollItem>
              {/* 사이드 본문 내부 블록 간 간격 유지 */}
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

// 기본 메인 템플릿
// - 본문은 스크롤 영역으로 감싸고, 하단 슬롯(mainFoot)을 선택적으로 렌더링
export const LayoutTemplate = ({ mainBody, mainFoot }: Props) => (
  <>
    <LayoutMain className="grid grid-rows-[minmax(0,1fr)_auto] gap-0 px-[1rem]">
      <LayoutMainBody>
        <LayoutScrollWrap>
          <LayoutScrollItem>{mainBody}</LayoutScrollItem>
        </LayoutScrollWrap>
      </LayoutMainBody>
      {/* 하단 슬롯이 없으면 최소 높이 placeholder로 레이아웃 흔들림 방지 */}
      {mainFoot ? <LayoutMainFoot>{mainFoot}</LayoutMainFoot> : <div className="h-[1rem]"></div>}
    </LayoutMain>
  </>
);

// 좌우 패딩이 없는(px-0) 변형 템플릿
export const LayoutTemplatePx0 = ({ mainBody, mainFoot }: Props) => (
  <>
    <LayoutMain className="grid grid-rows-[minmax(0,1fr)_auto] gap-0 px-0">
      <LayoutMainBody>
        <LayoutScrollWrap>
          <LayoutScrollItem>{mainBody}</LayoutScrollItem>
        </LayoutScrollWrap>
      </LayoutMainBody>
      <LayoutMainFoot>{mainFoot}</LayoutMainFoot>
    </LayoutMain>
  </>
);
