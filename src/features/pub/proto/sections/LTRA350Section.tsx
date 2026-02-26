'use client';

import { useState } from 'react';
import AsideBody from '@/shared/components/features/AsideBody';
import PageHead from '@/shared/components/features/PageHead';
import PageProcess from '@/shared/components/features/PageProcess';
import AsideFoot from '@/shared/components/features/AsideFoot';
import TaskStatusBoard from '@/shared/components/features/TaskStatusBoard';
import { LayoutTemplateA } from '@/shared/components/layout/LayoutTemplate';
import { LTRA350MainHead, LTRA350MainBody } from '../components/index_LTRA350';
import MainFoot from '@/shared/components/features/MainFoot';

// 데이터 관련 import 제거
import { DUMMY_LTRA350_DATA } from '@/features/pub/proto/data/LTRA350Data';

export default function LTRA350Section() {
  const [hideAside, setHideAside] = useState(false);
  const data = DUMMY_LTRA350_DATA;
 
  return (
    <LayoutTemplateA
      pageHead={<PageHead data={data.pageHead} />}
      process={<PageProcess />}

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
      asideBody={<AsideBody data={data.aside} />}
      asideFoot={<AsideFoot />}
      
      hideAside={hideAside}
    />
  );
}
