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

// LniPl020 - components
import { LniPl020Step1 } from '../components/LniPl020Step1'; // 01. 담보설계
import { LniPl020Step2 } from '../components/LniPl020Step2'; // 02. 담보설계

// data
import { LniPl020Data } from '../data/LniPl020Data';
import type { LniPl020ProcessStep } from '../data/LniPl020Data';

// pageProcessStep 타입 가드 및 URL 파싱 함수 ---------------------------------
const isPageProcessStep = (value: number): value is LniPl020ProcessStep => {
  if (!Number.isInteger(value)) return false;
  return LniPl020Data.process.list.some((item) => item.step === value);
};

export default function LniPl020Section() {
  const defaultStep = LniPl020Data.process.state.active;
  const { activeStep, setActiveStep } = useStepFromQuery<LniPl020ProcessStep>({
    defaultStep,
    isValidStep: isPageProcessStep,
  });
  const { hideAside, isWidthExpanded, setIsWidthExpanded } = useAsideToggleState();
  const stepMainBody: Record<number, ReactNode> = {
    1: <LniPl020Step1 />,
    2: <LniPl020Step2 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />,
    3: <LniPl020Step1 />,
    4: <LniPl020Step1 />,
    5: <LniPl020Step1 />,
    6: <LniPl020Step1 />,
  };
 
  return (
    <LayoutTemplateAsideToggle
      // LayoutHead
      pageID={<PageID data={LniPl020Data.head.pageID} />}
      pageTitle={<PageTitle data={LniPl020Data.head.pageTitle} />}

      // LayoutBody: process
      pageProcess={
        <PageProcess
          items={LniPl020Data.process.list}
          completeSteps={LniPl020Data.process.state.complete}
          defaultActiveStep={LniPl020Data.process.state.active}
          activeStep={activeStep}
          onStepChange={setActiveStep}
        />
      }
     
      // LayoutBody: main
      mainBody={stepMainBody[activeStep]}
      
      // LayoutBody: aside
      asideHead={<TaskStatusBoard state={LniPl020Data.aside.taskState} />}
      asideBody={
        <>
          <InfoContract data={LniPl020Data.aside.simpleContractInfo} />
          <QuickLinks />
        </>
      }
      asideFoot={<AsideFoot />}
      hideAside={hideAside}
    />
  );
}
