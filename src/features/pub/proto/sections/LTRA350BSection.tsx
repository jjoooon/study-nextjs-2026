'use client';

import { useState } from 'react';
import { LayoutTemplateB } from '@/shared/components/layout/LayoutTemplate';

import PageHead from '@/shared/components/features/PageHead';
import PageProcess from '@/shared/components/features/PageProcess';
import AsideBody from '@/shared/components/features/AsideBody';
import { LTRA350MainHead, LTRA350MainBody } from '../components/index_LTRA350';
import AsideFoot from '@/shared/components/features/AsideFoot';
import MainFoot from '@/shared/components/features/MainFoot';
import TaskStatusBoard from '@/shared/components/features/TaskStatusBoard';


import { DUMMY_LTRA350_DATA } from '@/features/pub/proto/data/LTRA350Data';

export default function LTRA350BSection() {
  const [hideAside, setHideAside] = useState(false);
  const data = DUMMY_LTRA350_DATA;
 
  return (
    <LayoutTemplateB
      pageHead={<PageHead data={data.pageHead} />}
      pageProcess={<PageProcess />}

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
