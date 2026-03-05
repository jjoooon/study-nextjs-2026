'use client';

import { useState } from 'react';
import { LayoutTemplateA } from '@/shared/components/layout/LayoutTemplate';

import PageHead from '@/shared/components/features/PageHead';
import PageProcess from '@/shared/components/features/PageProcess';
import AsideBody from '@/shared/components/features/AsideBody';
import { LTRA020MainHead, LTRA020MainBody } from '../components/index_LTRA020';
import AsideFoot from '@/shared/components/features/AsideFoot';
import MainFoot from '@/shared/components/features/MainFoot';
import TaskStatusBoard from '@/shared/components/features/TaskStatusBoard';


import { DUMMY_LTRA020_DATA } from '@/features/pub/proto/data/LTRA020Data';

export default function LTRA020Section() {
  const [hideAside, setHideAside] = useState(false);
  const data = DUMMY_LTRA020_DATA;
 
  return (
    <LayoutTemplateA
      pageHead={<PageHead data={data.pageHead} />}
      pageProcess={<PageProcess />}

      mainHead={
        <LTRA020MainHead data={data.mainHead}/>
      }
      mainBody={
        <LTRA020MainBody
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
