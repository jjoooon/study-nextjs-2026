import { useTabs } from '@/shared/hooks/useTabs';

import type { LniPl020Step2DataType } from '@/features/pub/proto/data/LniPl020Step2Data';

export type PlanFiltersData = LniPl020Step2DataType['planFilters'];
export type MainHeadTab = PlanFiltersData['tabList'][number] & { value: string };

export function useLniPl020Tabs(planFilters: PlanFiltersData) {
  const stringifiedData: MainHeadTab[] = planFilters.tabList.map((item) => ({
    ...item,
    value: String(item.value),
  }));

  const { tabs, active, setActive } = useTabs<MainHeadTab>(stringifiedData);

  return { tabs, active, setActive };
}
