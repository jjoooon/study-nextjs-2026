'use client';

import { useState } from 'react';
// components - layout
import { LayoutTemplateB } from '@layout/LayoutTemplate';
// components - features
import PageID from '@features/PageID';
import { PageTitleProduct as PageTitle } from '@features/PageTitle'; // PageTitle, PageTitleProduct
import PageProcess from '@features/PageProcess';
import AsideBody from '@features/AsideBody';
import AsideFoot from '@features/AsideFoot';
import { LNIPL020Step1 as MainFoot } from '@features/MainFoot';
import TaskStatusBoard from '@features/TaskStatusBoard';

// LNIPL020 - components
import { LNIPL020_1_MainBody } from '../components/index_LNIPL020';

import { DUMMY_LNIPL020_DATA } from '@/features/pub/proto/data/LNIPL020Data';

export default function LNIPL020_Section() {
  const [hideAside, setHideAside] = useState(false);
  const data = DUMMY_LNIPL020_DATA;
 
  return (
    <LayoutTemplateB
     pageID={<PageID data={data.pageID} />}
    pageTitle={<PageTitle data={data.pageTitle} />}
      pageProcess={<PageProcess />}

      mainBody={
        <LNIPL020_1_MainBody />
      }
      mainFoot={<MainFoot />}

      asideHead={<TaskStatusBoard state={data.taskState} />}
      asideBody={<AsideBody data={data.aside} />}
      asideFoot={<AsideFoot />}

      hideAside={hideAside}
    />
  );
}
