'use client';

import { useState } from 'react';
import gridData from '@/mocks/data/ispl/dump/planCovData.json';
import { Tabs, TabsList, TabsPanel, TabsTrigger } from '@uiux/Tabs';
import { useTabs } from '@/shared/hooks/useTabs';
import { InsPlanBasic, InsPlanCov } from '../components/Page3Index';
import { INITIAL_TABS2 } from '../constants/insPlanBasicData';

export default function LniPl020Step2() {
  const { active, setActive, handleRemove, visibleTabs } = useTabs(INITIAL_TABS2);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const handleSelectPlan = (planId: number) => {
    setSelectedPlanId(planId);
  };

  return (
    <div className="flex flex-col w-full h-full gap-6 resizablePanel-line">
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
        {visibleTabs.map((tab) => (
          <TabsPanel key={tab.value} value={tab.value} activeValue={active}>
            <div className="grid grid-rows-[auto_1fr] gap-[2rem]">
              <InsPlanBasic />
              <InsPlanCov data={gridData} selectedPlanId={selectedPlanId} onSelectPlan={handleSelectPlan} />
            </div>
          </TabsPanel>
        ))}
      </Tabs>
    </div>
  );
}
