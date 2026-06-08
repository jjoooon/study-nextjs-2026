'use client';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-enterprise';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useEffect } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@uiux/Tabs';

ModuleRegistry.registerModules([AllCommunityModule]);

// Types
interface InsPlanDep3 {
  plan: string;
  name: string;
  id?: string | null;
}

interface InsPlanListDep3Props {
  dep3Data: InsPlanDep3[];
}

// Initial Tabs (모든 가능한 플랜)
const initialTabs = [
  { value: 'tab1-1-1', label: '회사플랜', planType: '회사플랜' },
  { value: 'tab1-1-2', label: '기관플랜', planType: '기관플랜' },
  { value: 'tab1-1-3', label: '모집자플랜', planType: '모집자플랜' },
];

// Custom Cell Renderer - 상품명 + 추가 정보
const InsPlanNameRenderer = (props: ICellRendererParams<InsPlanDep3>) => {
  const data = props.data;
  if (!data) return null;

  return (
    <Grow placement="bwc" className="h-full">
      <Typo variant="body-md" className="flex-1 truncate justify-start ">
        {data.name}
      </Typo>
      {data.id && (
        <Button className="shrink-0" color="secondary" size="xs">
          담보보기
        </Button>
      )}
    </Grow>
  );
};

export function InsPlanListDep3({ dep3Data }: InsPlanListDep3Props) {
  const { active, setActive, visibleTabs } = useTabs(initialTabs);

  const columnDefs: ColDef<InsPlanDep3>[] = useMemo(
    () => [
      {
        headerName: '플랜명',
        field: 'name',
        flex: 1,
        cellClass: 'text-left',
        sortable: false,
        filter: false,
        suppressMovable: true, // 드래그 이동 방지
        lockPosition: true, // 컬럼 위치 고정
        tooltipValueGetter: (params) => {
          if (!params.data) return '';
        },
        cellRenderer: InsPlanNameRenderer,
      },
    ],
    []
  );

  // 탭별로 plan 값에 따라 데이터 필터링
  const getTabData = (planType: string) => dep3Data.filter((item) => item.plan === planType);

  // 현재 탭에 데이터가 없으면 데이터 있는 탭으로 자동 변경
  useEffect(() => {
    const currentTabData = visibleTabs.find((tab) => tab.value === active);
    if (currentTabData) {
      const tabDataFilter = (planType: string) => dep3Data.filter((item) => item.plan === planType);
      const tabData = tabDataFilter(currentTabData.planType);
      if (tabData.length === 0) {
        // 데이터가 있는 첫 번째 탭 찾기
        const nextTabWithData = visibleTabs.find((tab) => tabDataFilter(tab.planType).length > 0);
        if (nextTabWithData) {
          setActive(nextTabWithData.value);
        }
      }
    }
  }, [dep3Data, active, visibleTabs, setActive]);

  if (dep3Data.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Typo variant="body-md" className="text-gray-400">
          선택된 상품이 없습니다.
        </Typo>
      </div>
    );
  }

  return (
    <>
      <Tabs value={active} onValueChange={setActive} className="w-full h-full grid grid-rows-[auto_1fr] content-start">
        <div className="border-b border-[#FF5C2E]">
          <TabsList>
            {visibleTabs.map((tab) => {
              const tabData = getTabData(tab.planType);
              return (
                <TabsTrigger key={tab.value} variant="default" value={tab.value} disabled={tabData.length === 0}>
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        {visibleTabs.map((tab) => {
          const tabData = getTabData(tab.planType);
          return (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="ag-theme-alpine th-s top-noline" style={{ height: '100%', width: '100%' }}>
                <AgGridReact<InsPlanDep3>
                  rowData={tabData}
                  columnDefs={columnDefs}
                  rowSelection="multiple"
                  suppressRowHoverHighlight={false}
                  suppressDragLeaveHidesColumns={true} // 드래그로 컬럼 숨기기 방지
                />
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
}
