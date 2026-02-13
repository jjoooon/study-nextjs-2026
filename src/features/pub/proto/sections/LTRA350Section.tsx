'use client';

import { MainHeadLTRA350 } from '../components/LTRA350';
import {
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
  LayoutScrollWrap,
  LayoutScrollItem,
} from '@/shared/components/layout';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components/uiux';

export default function LTRA350Section() {
  return (
    <LayoutFolder>
      <LayoutFolderHead className="grid grid-cols-[1fr_auto] gap-[1rem]">
        <LayoutMainHead>
          <MainHeadLTRA350 />
        </LayoutMainHead>
        <LayoutAsideHead>사이드 헤드</LayoutAsideHead>
      </LayoutFolderHead>
      <LayoutFolderBody>
        <ResizablePanelGroup orientation="horizontal" className="w-full">
          <ResizablePanel defaultSize="75%" minSize="72rem">
            <LayoutMain>
              <LayoutMainBody>
                <LayoutScrollWrap className="grid-rows-[1fr_auto]">
                  <LayoutScrollItem className="w-full">
                    <div className="text-[40rem]">
                      1
                      <br />
                      2
                      <br />
                      3
                      <br />
                    </div>
                  </LayoutScrollItem>
                  <LayoutScrollItem className="bg-[pink] w-full">
                    qqq
                    <br />
                    qqqqq
                  </LayoutScrollItem>
                </LayoutScrollWrap>
              </LayoutMainBody>
              <LayoutMainFoot>
                콘텐츠 풋터
                <br /> 콘텐츠 풋터
              </LayoutMainFoot>
            </LayoutMain>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="37.5rem" minSize="0" maxSize="50%">
            <LayoutAside>
              <LayoutAsideBody>사이드 바디</LayoutAsideBody>
              <LayoutAsideFoot>사이드 풋터</LayoutAsideFoot>
            </LayoutAside>
          </ResizablePanel>
        </ResizablePanelGroup>
      </LayoutFolderBody>
    </LayoutFolder>
  );
}
