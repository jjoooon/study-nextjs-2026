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

import { DUMMY_LniPl020_DATA } from '@/features/pub/proto/data/LniPl020Data';

import type { PageProcessStep } from '@features/PageProcess';

// LniPl020 - components
import { LniPl020Step1 } from '../components/LniPl020Step1'; // 01. 담보설계
import { LniPl020Step2 } from '../components/LniPl020Step2'; // 02. 담보설계

// 임시 공통 Data
const dataTaskState: Array<{
  id: number;
  status: '정상' | '경고' | '중지';
  label: string;
  sum: number;
}> = [
  { id: 1, status: '정상', label: '누적', sum: 24 },
  { id: 2, status: '경고', label: '중복', sum: 0 },
  { id: 3, status: '중지', label: '직업', sum: 2 },
  { id: 4, status: '중지', label: '기타', sum: 0 },
];
const dataAside: {
  date: string;
  polName: string;
  insName: string;
  insAge: string;
  insGender: string;
  insGrade: string;
  info: Array<string>;
  quoteExpiryDate: string;
  insuranceAgeDate: string;
  consentEndDate: string;
  note: string;
} = {
  date: '2024-05-08',
  polName: '홍길동',
  insName: '홍길동',
  insAge: '32',
  insGender: '남',
  insGrade: '1급',
  info: ['100세만기', '20년납입', '월납', '20년갱신', '1형(일반고지형)'],
  quoteExpiryDate: '2024-06-30',
  insuranceAgeDate: '2024-05-08',
  consentEndDate: '2024-06-30',
  note: '알릴사항 비대상',
}
const dataPageID: { 
  pageName: string; 
  pageId: string 
} = {
  pageName: '가입설계',
  pageId: 'LniPl020',
};
const dataPageTitle: { 
  simpleMode: boolean; 
  title: string; 
  options: string[]; 
  planNumber: string[]; 
  contractHolder: string; 
  planNumberList: Array<{ 
    label: string; 
    value: string; 
    name: string; 
    amount: string; 
    state: string 
  }>
} = {
  simpleMode: true,
  title: '한화 시그니처 여성 건강보험 3.0 2504',
  options: ['납입면제 강화형', '기본형'],
  planNumber: ['LA20234472050000', '2'],
  contractHolder: '6012345 박하늘별님달',
  planNumberList: [
    { label: 'LA20234472050000', value: 'LA20234472050000', name: '김은빈', amount: '23,000', state: '설계중' },
    { label: 'LA23234472050001', value: 'LA23234472050001', name: '박하늘', amount: '45,500', state: '계약완료' },
    { label: 'LA20234472050002', value: 'LA20234472050002', name: '이도현', amount: '12,300', state: '심사중' },
    { label: 'LA20234472050003', value: 'LA20234472050003', name: '최수영', amount: '99,900', state: '청약완료' },
    { label: 'LA20234472050004', value: 'LA20234472050004', name: '한지민', amount: '77,700', state: '설계중' },
  ]
};






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

export default function LniPl020Section() {
  const [activeStep, setActiveStep] = useState<PageProcessStep>(1);
  const [isWidthExpanded, setIsWidthExpanded] = useState(false);
  const data = DUMMY_LniPl020_DATA;

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
    1: <LniPl020Step1 />,
    2: <LniPl020Step2 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />,
    3: <LniPl020Step2 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />,
    4: <LniPl020Step2 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />,
    5: <LniPl020Step2 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />,
    6: <LniPl020Step2 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />,
  };
 
  return (
    <LayoutTemplateA
      pageID={<PageID data={dataPageID} />}
      pageTitle={<PageTitle data={dataPageTitle} />}

      pageProcess={<PageProcess activeStep={activeStep} onStepChange={setActiveStep} />}
  
      mainBody={stepMainBodies[activeStep]}
      hideAside={isWidthExpanded}

      asideHead={<TaskStatusBoard state={dataTaskState} />}
      asideBody={
        <>
          <InfoContract data={dataAside} />
          <QuickLinks />
        </>
      }
      asideFoot={<AsideFoot />}
      
    />
  );
}
