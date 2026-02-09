'use client';

import { InsPlanBasic } from '../components/Page3Index';
import { INITIAL_TABS } from '../constants/insPlanBasicData';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/shared/components/uiux';
import { useTabs } from '@/shared/hooks/useTabs';

export default function Main() {
  const { active, setActive, handleRemove, visibleTabs } = useTabs(INITIAL_TABS);

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <Tabs value={active} onValueChange={setActive} className="w-full h-full grid grid-rows-[auto_1fr] content-start">
        <div className="border-b border-[#FF5C2E]">
          <TabsList>
            {visibleTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} removable onRemove={() => handleRemove(tab.value)}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value={active}>
          <div className="grid grid-rows-[auto_1fr] gap-[2rem]">
            <InsPlanBasic />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
