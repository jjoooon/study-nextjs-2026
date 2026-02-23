'use client';

import { useState } from 'react';
import AsidBody from '@/shared/components/features/AsideBody';
import PageHead from '@/shared/components/features/PageHead';
import AsideFoot from '@/shared/components/features/AsideFoot';
import TaskStatusBoard from '@/shared/components/features/TaskStatusBoard';
import { LayoutTemplateA } from '@/shared/components/layout/LayoutTemplate';
import { LTRA350MainHead, LTRA350MainBody } from '../components/index_LTRA350';
import MainFoot from '@/shared/components/features/MainFoot';

// 데이터 관련 import 제거
export interface LTRA350SectionProps {
  planCovData: any;
  taskStatusData: any;
  headData: any;
  mainHeadData: any;
  mainHeadCategories: any;
  tags: any;
  visibleCount: number;
}

export default function LTRA350Section({
  planCovData,
  taskStatusData,
  headData,
  mainHeadData,
  mainHeadCategories,
  tags,
  visibleCount,
}: LTRA350SectionProps) {
  const [hideAside, setHideAside] = useState(false);

  return (
    <LayoutTemplateA
      pageHead={<PageHead data={headData} />}
      process={<div>프로세스</div>}

      mainHead={
        <LTRA350MainHead
          data={mainHeadData}
          categories={mainHeadCategories}
          tags={tags}
          visibleCount={visibleCount}
        />
      }
      mainBody={
        <LTRA350MainBody
          data={planCovData}
          hideAside={hideAside}
          setHideAside={setHideAside}
        />
      }
      mainFoot={<MainFoot />}

      asideHead={<TaskStatusBoard state={taskStatusData} />}
      asideBody={<AsidBody />}
      asideFoot={<AsideFoot />}
      
      hideAside={hideAside}
    />
  );
}
