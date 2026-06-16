'use client';

import { useState, useMemo } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';
import { InsPlanListDep1 } from './InsPlanListDep1';
import { InsPlanListDep2 } from './InsPlanListDep2';
import { InsPlanListDep3 } from './InsPlanListDep3';
import { MOCK_DATA } from '../constants/insPlanListData';

interface InsPlanListProps {
  filterCategory: string;
  filterAge: string;
}

// 상품 정보 섹션
export function InsPlanList({ filterCategory, filterAge }: InsPlanListProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [selectedDep2Index, setSelectedDep2Index] = useState<number | null>(null);

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    // 카테고리 매핑
    const categoryMap: Record<string, string> = {
      '0': '', // 전체
      '1': '종합건강',
      '2': '간편',
      '3': '여성',
      '4': '암/간병',
      '5': '자녀/치아',
      '6': '상해',
      '7': '의료비',
      '8': '재물',
      '9': '연금/저축',
    };

    return MOCK_DATA.filter((product) => {
      // 카테고리 필터
      if (filterCategory !== '0') {
        const mappedCategory = categoryMap[filterCategory];
        if (product.category !== mappedCategory) {
          return false;
        }
      }

      // 연령 필터
      if (filterAge !== '전체') {
        let minAge = 0;
        let maxAge = Number.POSITIVE_INFINITY;

        const rangeMatch = product.age.match(/(\d+)~(\d+)/);
        if (rangeMatch) {
          minAge = parseInt(rangeMatch[1], 10);
          maxAge = parseInt(rangeMatch[2], 10);
        } else {
          const minOnlyMatch = product.age.match(/(\d+)\s*세\s*이상/);
          if (minOnlyMatch) {
            minAge = parseInt(minOnlyMatch[1], 10);
          }
        }

        switch (filterAge) {
          case '0~14세':
            if (!(minAge <= 14 && maxAge >= 0)) return false;
            break;
          case '15~24세':
            if (!(minAge <= 24 && maxAge >= 15)) return false;
            break;
          case '25~59세':
            if (!(minAge <= 59 && maxAge >= 25)) return false;
            break;
          case '60~65세':
            if (!(minAge <= 65 && maxAge >= 60)) return false;
            break;
          case '66세 이상':
            if (maxAge < 66) return false;
            break;
        }
      }

      return true;
    });
  }, [filterCategory, filterAge]);

  const selectedProduct = selectedPlanId ? filteredData.find((p) => p.id === selectedPlanId) : undefined;
  const selectedDep2 =
    selectedProduct && selectedDep2Index !== null ? selectedProduct.dep2[selectedDep2Index] : undefined;

  return (
    <ResizablePanelGroup orientation="horizontal" className="w-full pb-[3.4rem]">
      <ResizablePanel defaultSize={70} minSize={'50%'} className="resizablePanel-line">
        <InsPlanListDep1 data={filteredData} selectedPlanId={selectedPlanId} onSelectPlan={setSelectedPlanId} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={30} minSize={'30%'}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={42} minSize={'20%'} maxSize={300} className="resizablePanel-line">
            <InsPlanListDep2
              product={selectedProduct}
              selectedDep2Index={selectedDep2Index}
              onSelectDep2={setSelectedDep2Index}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={58} minSize={'30%'} className="resizablePanel-line">
            <InsPlanListDep3 dep3Data={selectedDep2?.dep3 || []} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
