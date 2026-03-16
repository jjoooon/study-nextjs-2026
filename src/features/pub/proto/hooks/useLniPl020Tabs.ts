import { useTabs } from '@/shared/hooks/useTabs';

import type { LTRA020_2_DataType } from '@/features/pub/proto/data/LniPl020Step2Data';

export type PlanFiltersData = LTRA020_2_DataType['planFilters'];
export type MainHeadTab = PlanFiltersData['tabList'][number] & { value: string };

export function useLniPl020Tabs(planFilters: PlanFiltersData) {
  const stringifiedData: MainHeadTab[] = planFilters.tabList.map((item) => ({
    ...item,
    value: String(item.value),
  }));

  const { tabs, active, setActive } = useTabs<MainHeadTab>(stringifiedData);

  return { tabs, active, setActive };
}
