'use client';

import { useState } from 'react';

import { Gcol } from '@/shared/components/common';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/shared/components/uiux';
import { useTabs } from '@/shared/hooks/useTabs';
import { INITIAL_TABS } from '../constants/insPlanBasicData';
import type { TabKey } from '../constants/insPlanBasicData';
import { useForm } from '../hooks/useForm';
import { InsPlanBasic, InsPlanBasicStep1, InsPlanBasicStep2, InsPlanBasicStep3 } from './Page2Index';

export default function Ltra350Step1() {
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
  } = useForm(active as TabKey);

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

            <form
              id="page2-MainForm"
              onSubmit={(event) => {
                event.preventDefault();
                setTestError(!testError);
              }}
              noValidate
            >
              <Gcol className="gap-[2rem] w-full overflow-y-auto h-[calc(100vh-47.4rem)] pb-[3.2rem]" placement="ts">
                <InsPlanBasicStep1 currentData={currentData} testError={testError} handleChange={handleChange} />

                <InsPlanBasicStep2
                  active={active}
                  currentData={currentData}
                  activeInsured={activeInsured}
                  testError={testError}
                  handleInsuredChange={handleInsuredChange}
                  handleInsuredTabChange={handleInsuredTabChange}
                  handleRemoveInsured={handleRemoveInsured}
                  getInsuredData={getInsuredData}
                />

                <InsPlanBasicStep3
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
