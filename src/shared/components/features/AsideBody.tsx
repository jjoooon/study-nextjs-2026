'use client';

import { Gcol, Grow, Typo } from '@/shared/components/common';
import { NewPopupIcon } from '@/shared/components/icons';
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/uiux';
import { LayoutScrollWrap, LayoutScrollItem } from '../layout';
import { QuickLinks } from './QuickLinks';

export default function AsideBody() {
  return (
    <Gcol placement="ss" className="w-full">
      <Tabs defaultValue="info" className="grid grid-rows-[auto_1fr] w-full h-full gap-[1rem]">
        <TabsList variant="box">
          <TabsTrigger variant="box" value="info">
            주요정보
          </TabsTrigger>
          <TabsTrigger variant="box" value="AI">
            AI
          </TabsTrigger>
        </TabsList>
        {/* 주요정보 */}
        <TabsContent value="info" className="w-full h-full relative">
          <LayoutScrollWrap>
            <LayoutScrollItem>
              <Gcol className="gap-2 w-full" placement="ss">
                <section className="w-full">
                  <Grow className="gap-2" placement="bwc">
                    <Typo variant="heading-md">인수지침 점검</Typo>
                    <Button variant="none" size="icon-sm">
                      <NewPopupIcon />
                    </Button>
                  </Grow>
                </section>
                <section className="w-full">
                  <Grow className="gap-2" placement="bwc">
                    <Typo variant="heading-md">간편설계 계약정보</Typo>
                    <Button variant="none" size="icon-sm">
                      <NewPopupIcon />
                    </Button>
                  </Grow>
                </section>
                <QuickLinks />
              </Gcol>
            </LayoutScrollItem>
          </LayoutScrollWrap>
        </TabsContent>
        {/* AI */}
        <TabsContent value="AI" className="w-full h-full relative">
          <LayoutScrollWrap>
            <LayoutScrollItem>AI...</LayoutScrollItem>
          </LayoutScrollWrap>
        </TabsContent>
      </Tabs>
    </Gcol>
  );
}
