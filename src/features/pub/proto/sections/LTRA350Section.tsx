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
import type { LTRA350DataType } from '@/features/pub/proto/data/LTRA350Data';

export interface LTRA350SectionProps {
  data: LTRA350DataType;
}

export default function LTRA350Section({ data }: LTRA350SectionProps) {
  const [hideAside, setHideAside] = useState(false);

  return (
    <LayoutTemplateA
      pageHead={<PageHead data={data.pageHead} />}
      process={<div>프로세스</div>}

      mainHead={
        <LTRA350MainHead data={data.mainHead}/>
      }
      mainBody={
        <LTRA350MainBody
          data={data.mainBody}
          hideAside={hideAside}
          setHideAside={setHideAside}
        />
      }
      mainFoot={<MainFoot />}

      asideHead={<TaskStatusBoard state={data.taskState} />}
      asideBody={<AsidBody data={data.aside} />}
      asideFoot={<AsideFoot />}
      
      hideAside={hideAside}
    />
  );
}
