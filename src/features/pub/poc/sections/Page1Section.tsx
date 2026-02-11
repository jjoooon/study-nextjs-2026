'use client';

import { useState } from 'react';
import { Tabs, TabsPanel, TabsList, TabsTrigger } from '@/shared/components/uiux';
import { useTabs } from '@/shared/hooks/useTabs';
import { popup } from '@/shared/utils/popup/popupApi';
import { InsPlanSet, InsPlanList } from '../components/Page1Index';

const TABS = [
  { value: 'tab1', label: '상품/플랜 설계' },
  { value: 'tab2', label: '담보 설계' },
  { value: 'tab3', label: '추천 설계' },
  { value: 'tab4', label: '보장분석 설계' },
];

export default function Page1() {
  const { tabs, active, setActive, handleRemove, visibleTabs } = useTabs(TABS);
  const [selectedCategory, setSelectedCategory] = useState<string>('0');
  const [selectedAge, setSelectedAge] = useState<string>('전체');

  // Alert 테스트 핸들러
  const handleAlertTest = async () => {
    await popup.alert({
      title: '알림',
      message: '팝업 Alert 테스트입니다.',
      buttonText: '확인',
    });
  };

  // Confirm 테스트 핸들러
  const handleConfirmTest = async () => {
    const confirmed = await popup.confirm({
      title: '확인',
      message: '팝업 Confirm 테스트입니다. 계속하시겠습니까?',
      confirmText: '확인',
      cancelText: '취소',
    });

    console.log('Confirm 결과:', confirmed);
  };

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
      {/* 팝업 테스트 버튼 */}
      <div className="flex gap-2">
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
          onClick={handleAlertTest}
        >
          Alert 테스트
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
          onClick={handleConfirmTest}
        >
          Confirm 테스트
        </button>
      </div>

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

