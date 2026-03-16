'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsPanel, TabsTrigger } from '@/shared/components/uiux/Tabs';
import { useTabs } from '@/shared/hooks/useTabs';
import { InsPlanList, InsPlanSet } from '../components/Page1Index';

const TABS = [
  { value: 'tab1', label: '상품/플랜 설계' },
  { value: 'tab2', label: '담보 설계' },
  { value: 'tab3', label: '추천 설계' },
  { value: 'tab4', label: '보장분석 설계' },
];

export default function Ltra020Section() {
  const { tabs, active, setActive, handleRemove, visibleTabs } = useTabs(TABS);
  const [selectedCategory, setSelectedCategory] = useState<string>('0');
  const [selectedAge, setSelectedAge] = useState<string>('전체');

  // 탭별 컨텐츠 렌더링
  const renderTabContent = (tabValue: string) => {
    switch (tabValue) {
      case 'tab1':
        return (
          <div className="grid grid-rows-[auto_1fr] h-full gap-8">
            <InsPlanSet
              selectedCategory={selectedCategory}
              selectedAge={selectedAge}
              onCategoryChange={setSelectedCategory}
              onAgeChange={setSelectedAge}
            />
            <InsPlanList filterCategory={selectedCategory} filterAge={selectedAge} />
          </div>
        );
      case 'tab2':
        return <div>{`담보 설계 내용`}</div>;
      case 'tab3':
        return <div>{`추천 설계 내용`}</div>;
      case 'tab4':
        return <div>{`보장분석 설계 내용`}</div>;
      default:
        return null;
    }
  };

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
        {tabs.map((tab) => (
          <TabsPanel key={tab.value} value={tab.value} activeValue={active}>
            {renderTabContent(tab.value)}
          </TabsPanel>
        ))}
      </Tabs>
    </div>
  );
}