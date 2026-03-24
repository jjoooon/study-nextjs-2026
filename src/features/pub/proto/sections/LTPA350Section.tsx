'use client';

import type { ReactNode } from 'react';

// components - layout
import { LayoutTemplateAsideToggle } from '@layout/LayoutTemplate';
// components - features
import AsideFoot from '@features/AsideFoot';
import PageID from '@features/PageID';
import PageProcess from '@features/PageProcess';
import { PageTitleProduct as PageTitle } from '@features/PageTitle'; // PageTitle, PageTitleProduct
import TaskStatusBoard from '@features/TaskStatusBoard';
import { InfoContract } from '@features/InfoContract';
import { QuickLinks } from '@features/QuickLinks';

// hooks
import { useAsideToggleState } from '@/shared/hooks/useAsideToggleState';
import { useStepFromQuery } from '@/shared/hooks/useStepFromQuery';

// LTPA350 - components
import { LTPA350Step1 } from '../components/LTPA350Step1'; // 01. 담보설계
import { LTPA350Step2 } from '../components/LTPA350Step2'; // 02. 담보설계

// data
import { LTPA350Data } from '../data/LTPA350Data';
import type { LTPA350ProcessStep } from '../data/LTPA350Data';

// pageProcessStep 타입 가드 및 URL 파싱 함수 ---------------------------------
const isPageProcessStep = (value: number): value is LTPA350ProcessStep => {
  if (!Number.isInteger(value)) return false;
  return LTPA350Data.process.list.some((item) => item.step === value);
};

export default function LTPA350Section() {
  const defaultStep = LTPA350Data.process.state.active;
  const { activeStep, setActiveStep } = useStepFromQuery<LTPA350ProcessStep>({
    defaultStep,
    isValidStep: isPageProcessStep,
  });
  const { hideAside, isWidthExpanded, setIsWidthExpanded } = useAsideToggleState();
  const stepMainBody: Record<number, ReactNode> = {
    1: <LTPA350Step1 />,
    2: <LTPA350Step2 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />,
    3: <LTPA350Step1 />,
    4: <LTPA350Step1 />,
    5: <LTPA350Step1 />,
    6: <LTPA350Step1 />,
  };
 
  return (
    <LayoutTemplateAsideToggle
      // LayoutHead
      pageID={<PageID data={LTPA350Data.head.pageID} />}
      pageTitle={<PageTitle data={LTPA350Data.head.pageTitle} />}

      // LayoutBody: process
      pageProcess={
        <PageProcess
          items={LTPA350Data.process.list}
          completeSteps={LTPA350Data.process.state.complete}
          defaultActiveStep={LTPA350Data.process.state.active}
          activeStep={activeStep}
          onStepChange={setActiveStep}
        />
      }
     
      // LayoutBody: main
      mainBody={stepMainBody[activeStep]}
      
      // LayoutBody: aside
      asideHead={<TaskStatusBoard state={LTPA350Data.aside.taskState} />}
      asideBody={
        <>
          <InfoContract data={LTPA350Data.aside.simpleContractInfo} />
          <QuickLinks />
        </>
      }
      asideFoot={<AsideFoot />}
      hideAside={hideAside}
    />
  );
}
