'use client';

import LTRA350Section from '@/features/pub/proto/sections/LTRA350Section';
import {
  DUMMY_PLAN_COV_DATA,
  DUMMY_TASK_STATUS_DATA,
  DUMMY_HEAD_DATA,
  DUMMY_MAIN_HEAD_DATA,
  DUMMY_MAIN_HEAD_CATEGORIES,
  DUMMY_TAGS,
  VISIBLE_COUNT,
} from '@/features/pub/proto/data/LTRA350Data';

export default function Page() {
  return (
    <LTRA350Section
      planCovData={DUMMY_PLAN_COV_DATA}
      taskStatusData={DUMMY_TASK_STATUS_DATA}
      headData={DUMMY_HEAD_DATA}
      mainHeadData={DUMMY_MAIN_HEAD_DATA}
      mainHeadCategories={DUMMY_MAIN_HEAD_CATEGORIES}
      tags={DUMMY_TAGS}
      visibleCount={VISIBLE_COUNT}
    />
  );
}
 