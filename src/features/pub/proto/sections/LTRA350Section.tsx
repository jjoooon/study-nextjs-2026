'use client';

import { useState } from 'react';

// components - layout
import { LayoutTemplateA } from '@layout/LayoutTemplate';
// components - features
import PageID from '@features/PageID';
import { PageTitleProduct as PageTitle } from '@features/PageTitle'; // PageTitle, PageTitleProduct
import PageProcess from '@features/PageProcess';
import AsideBody from '@features/AsideBody';
import AsideFoot from '@features/AsideFoot';
import { LTRA350Step2 as MainFoot } from '@features/MainFoot';
import TaskStatusBoard from '@features/TaskStatusBoard';

// LTRA350 - components
import { LTRA350MainHead, LTRA350MainBody } from '../components/index_LTRA350';

import { DUMMY_LTRA350_DATA } from '@/features/pub/proto/data/LTRA350Data';

export default function LTRA350Section() {
  const [hideAside, setHideAside] = useState(false);
  const data = DUMMY_LTRA350_DATA;
 
  return (
    <LayoutTemplateA
      pageID={<PageID data={data.pageID} />}
      pageTitle={<PageTitle data={data.pageTitle} />}

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
