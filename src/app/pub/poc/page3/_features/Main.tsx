'use client';

import { useState } from 'react';
import { Gcol } from '@/shared/components/common';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/shared/components/uiux';
import { useTabs } from '@/shared/hooks/useTabs';

import { INITIAL_TABS } from './constants/main';
import type { TabKey } from './constants/main';
import { useMainForm } from './hooks/useMainForm';
import { HeaderSection, ContractorSection, InsuredSection, ContractTypeSection } from './sections';

export default function Main() {
  const [testError, setTestError] = useState(false);
  const { active, setActive, handleRemove, visibleTabs } = useTabs(INITIAL_TABS);

  const {
    activeInsured,
    currentData,
    handleChange,
    handleInsuredChange,
    handleInsuredTabChange,
    handleRemoveInsured,
    getInsuredData,
  } = useMainForm(active as TabKey);

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
            <HeaderSection />

            <Gcol className="gap-8">aa</Gcol>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
