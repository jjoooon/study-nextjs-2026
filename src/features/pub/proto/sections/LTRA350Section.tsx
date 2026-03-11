'use client';

import { useState } from 'react';

// components - layout
import { LayoutTemplateA } from '@layout/LayoutTemplate';
// components - features
import PageID from '@features/PageID';
import { PageTitleProduct as PageTitle } from '@features/PageTitle'; // PageTitle, PageTitleProduct
import PageProcess from '@features/PageProcess';

import { LTRA350Step2 as MainFoot } from '@features/MainFoot';

import TaskStatusBoard from '@features/TaskStatusBoard';
import { QuickLinks } from '@features/QuickLinks';
import { InfoContract } from '@features/InfoContract';
import AsideFoot from '@features/AsideFoot';

// LTRA350 - components
import { LTRA350MainHead, LTRA350MainBody } from '../components/index_LTRA350';

import { DUMMY_LTRA350_DATA } from '@/features/pub/proto/data/LTRA350Data';

// TaskStatusBoard: 꼭 확인해야 할 일!
type DataTaskState = {
  id: number;
  status: '정상' | '경고' | '중지';
  label: string;
  sum: number;
};
const dataTaskState: DataTaskState[] = [
  { id: 1, status: '정상', label: '누적', sum: 24 },
  { id: 2, status: '경고', label: '중복', sum: 0 },
  { id: 3, status: '중지', label: '직업', sum: 2 },
  { id: 4, status: '중지', label: '기타', sum: 0 },
];

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

      asideHead={<TaskStatusBoard state={dataTaskState} />}
      asideBody={
        <>
          <InfoContract data={data.aside} />
          <QuickLinks />
        </>
      }
      asideFoot={<AsideFoot />}
      
      hideAside={hideAside}
    />
  );
}
