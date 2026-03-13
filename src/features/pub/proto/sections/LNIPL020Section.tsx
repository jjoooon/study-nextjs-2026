'use client';

import { useEffect, useState, type ReactNode } from 'react';

// components - layout
import { LayoutTemplateA } from '@layout/LayoutTemplate';
// components - features
import AsideFoot from '@features/AsideFoot';
import PageID from '@features/PageID';
import PageProcess from '@features/PageProcess';
import { PageTitleProduct as PageTitle } from '@features/PageTitle'; // PageTitle, PageTitleProduct
import TaskStatusBoard from '@features/TaskStatusBoard';
import { InfoContract } from '@features/InfoContract';
import { QuickLinks } from '@features/QuickLinks';
import { DUMMY_LNIPL020_DATA } from '@/features/pub/proto/data/LNIPL020Data';

import type { PageProcessStep } from '@features/PageProcess';

// LNIPL020 - components
import { LNIPL020_1 } from '../components/LNIPL020_1'; // 01. 담보설계
import { LNIPL020_2 } from '../components/LNIPL020_2'; // 02. 담보설계

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

const isPageProcessStep = (value: number): value is PageProcessStep => {
  return value >= 1 && value <= 6;
};

const parseStepParam = (value: string | null): PageProcessStep | null => {
  if (!value) return null;
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return null;
  if (!isPageProcessStep(parsed)) return null;
  return parsed;
};

export default function LNIPL020Section() {
  const [activeStep, setActiveStep] = useState<PageProcessStep>(1);
  const [isWidthExpanded, setIsWidthExpanded] = useState(false);
  const data = DUMMY_LNIPL020_DATA;

  useEffect(() => {
    const syncStepFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const activeStepFromQuery = parseStepParam(params.get('activeStep')) ?? parseStepParam(params.get('step'));
      if (!activeStepFromQuery) return;
      setActiveStep(activeStepFromQuery);
    };

    syncStepFromUrl();
    window.addEventListener('popstate', syncStepFromUrl);

    return () => {
      window.removeEventListener('popstate', syncStepFromUrl);
    };
  }, []);

  const stepMainBodies: Record<PageProcessStep, ReactNode> = {
    1: <LNIPL020_1 />,
    2: <LNIPL020_2 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />,
    3: <LNIPL020_2 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />,
    4: <LNIPL020_2 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />,
    5: <LNIPL020_2 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />,
    6: <LNIPL020_2 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />,
  };
 
  return (
    <LayoutTemplateA
      pageID={<PageID data={data.pageID} />}
      pageTitle={<PageTitle data={data.pageTitle} />}

      pageProcess={<PageProcess activeStep={activeStep} onStepChange={setActiveStep} />}
  
      mainBody={stepMainBodies[activeStep]}
      hideAside={isWidthExpanded}

      asideHead={<TaskStatusBoard state={dataTaskState} />}
      asideBody={
        <>
          <InfoContract data={data.aside} />
          <QuickLinks />
        </>
      }
      asideFoot={<AsideFoot />}
      
    />
  );
}
