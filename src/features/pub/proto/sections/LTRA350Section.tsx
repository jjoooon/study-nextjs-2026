'use client';

import { useState } from 'react';
import AsidBody from '@/shared/components/features/AsideBody';
import PageHead from '@/shared/components/features/PageHead';
import AsideFoot from '@/shared/components/features/AsideFoot';
import TaskStatusBoard from '@/shared/components/features/TaskStatusBoard';
import { LayoutTemplateA } from '@/shared/components/layout/LayoutTemplate';
import { LTRA350MainHead, LTRA350MainBody } from '../components/index_LTRA350';
import MainFoot from '@/shared/components/features/MainFoot';
import { 
  DUMMY_PLAN_COV_DATA, 
  DUMMY_TASK_STATUS_DATA, 
  DUMMY_HEAD_DATA, 
  DUMMY_MAIN_HEAD_DATA, 
  DUMMY_MAIN_HEAD_CATEGORIES, 
  DUMMY_TAGS, VISIBLE_COUNT 
} from '../data/LTRA350Data';


export default function LTRA350Section() {
  const [hideAside, setHideAside] = useState(false);

  return (
    <LayoutTemplateA
      pageHead={<PageHead data={DUMMY_HEAD_DATA} />}
      process={<div>프로세스</div>}
      mainHead={<LTRA350MainHead
        data={DUMMY_MAIN_HEAD_DATA}
        categories={DUMMY_MAIN_HEAD_CATEGORIES}
        tags={DUMMY_TAGS}
        visibleCount={VISIBLE_COUNT}
      />}
      mainBody={<LTRA350MainBody data={DUMMY_PLAN_COV_DATA} hideAside={hideAside} setHideAside={setHideAside} />}
      mainFoot={<MainFoot />}
      asideHead={<TaskStatusBoard state={DUMMY_TASK_STATUS_DATA} />}
      asideBody={<AsidBody />}
      asideFoot={<AsideFoot />}
      hideAside={hideAside}
    />
  );
}
