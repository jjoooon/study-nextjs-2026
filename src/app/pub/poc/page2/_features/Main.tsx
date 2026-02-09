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

            <form
              id="page2-MainForm"
              onSubmit={(event) => {
                event.preventDefault();
                setTestError(!testError);
              }}
              noValidate
            >
              <Gcol className="gap-[2rem] w-full overflow-y-auto h-[calc(100vh-47.4rem)] pb-[3.2rem]" placement="ts">
                <ContractorSection currentData={currentData} testError={testError} handleChange={handleChange} />

                <InsuredSection
                  active={active}
                  currentData={currentData}
                  activeInsured={activeInsured}
                  testError={testError}
                  handleInsuredChange={handleInsuredChange}
                  handleInsuredTabChange={handleInsuredTabChange}
                  handleRemoveInsured={handleRemoveInsured}
                  getInsuredData={getInsuredData}
                />

                <ContractTypeSection
                  active={active}
                  currentData={currentData}
                  testError={testError}
                  handleChange={handleChange}
                />
              </Gcol>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
