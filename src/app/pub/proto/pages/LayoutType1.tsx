'use client';

import LayoutType1Section from '@/features/pub/proto/sections/LayoutType1Section';
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
} from '@/shared/components/layout';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components/uiux';

export default function Page() {
  return (
    <LayoutFolder>
      <LayoutFolderHead>
        <LayoutMainHead>콘텐츠 헤드</LayoutMainHead>
        <LayoutAsideHead>사이드 헤드</LayoutAsideHead>
      </LayoutFolderHead>
      <LayoutFolderBody>
        <ResizablePanelGroup orientation="horizontal" className="w-full">
          <ResizablePanel defaultSize="75%" minSize="72rem">
            <LayoutMain>
              <LayoutMainBody>
                {/* features/proto/sections */}
                <LayoutType1Section />
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
