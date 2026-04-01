'use client';

import type { ReactNode } from 'react';

// components - layout
import { LayoutTemplate } from '@layout/LayoutTemplate';
// components - features
import PageID from '@features/PageID';
import PageProcess from '@features/PageProcess';
import { PageTitleProduct as PageTitle } from '@features/PageTitle'; // PageTitle, PageTitleProduct


// hooks
import { useAsideToggleState } from '@/shared/hooks/useAsideToggleState';
import { useStepFromQuery } from '@/shared/hooks/useStepFromQuery';

// LTPA350 - components

// data
import { LTPA350Data } from '../data/LTPA350Data';
import type { LTPA350ProcessStep } from '../data/LTPA350Data';

import { LTPA010Main } from '../components/LTPA010Main';

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
  

  return (
    <LayoutTemplate
      // LayoutHead
      pageID={<PageID data={LTPA350Data.head.pageID} />}
      pageTitle={<PageTitle data={LTPA350Data.head.pageTitle} />}
     
      // LayoutBody: main
      mainBody={<LTPA010Main />}
      
      hideAside={hideAside}
    />
  );
}
