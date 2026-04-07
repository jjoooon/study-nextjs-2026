'use client';

// components - layout
// components - features
import type { ReactNode } from 'react';
import { useStepFromQuery } from '@/shared/hooks/useStepFromQuery';
import { useAsideToggleState } from '@aggrid';
import { InfoContract } from '@common/InfoContract';
import AsideFoot from '@features/AsideFoot';
import PageID from '@features/PageID';
import PageProcess from '@features/PageProcess';
import { PageTitleProduct as PageTitle } from '@features/PageTitle'; // PageTitle, PageTitleProduct
import { QuickLinks } from '@features/QuickLinks';
import TaskStatusBoard from '@features/TaskStatusBoard';

// hooks
import { LayoutTemplateAsideToggle } from '@layout/LayoutTemplate';

// LTPA350 - components
import { Ltpa350Step1 } from '../components/Ltpa350Step1'; // 01. 담보설계
import { Ltpa350Step2 } from '../components/Ltpa350Step2'; // 02. 담보설계

// types
type Ltpa350ProcessStep = 1 | 2 | 3 | 4 | 5 | 6;
type Ltpa350ProcessItem = {
  step: Ltpa350ProcessStep;
  label: string;
};
type Ltpa350ProcessState = {
  complete: Ltpa350ProcessStep[];
  active: Ltpa350ProcessStep;
};
interface Ltpa350DataType {
  head: {
    pageID: {
      pageName: string;
      pageId: string;
    };
    pageTitle: {
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
        state: string;
      }>;
    };
  };
  process: {
    list: Ltpa350ProcessItem[];
    state: Ltpa350ProcessState;
  };
}
const data: Ltpa350DataType = {
  head: {
    pageID: {
      pageName: '가입설계',
      pageId: 'LTPA350',
    },
    pageTitle: {
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
      ],
    },
  },
  process: {
    list: [
      { step: 1, label: '계약사항' },
      { step: 2, label: '담보설계' },
      { step: 3, label: '알릴사항' },
      { step: 4, label: '심사요청' },
      { step: 5, label: '추가사항' },
      { step: 6, label: '수납' },
    ],
    state: {
      complete: [1],
      active: 1,
    },
  },
};
const asideInfo = {
  step1: null,
  step2: {
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
  },
  step3: {
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
  },
  step4: {
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
  },
  step5: {
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
  },
  step6: {
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
  },
};

// pageProcessStep 타입 가드 및 URL 파싱 함수 ---------------------------------
const isPageProcessStep = (value: number): value is Ltpa350ProcessStep => {
  if (!Number.isInteger(value)) return false;
  return data.process.list.some((item) => item.step === value);
};

export default function Ltpa350Section() {
  const defaultStep = data.process.state.active;
  const { activeStep, setActiveStep } = useStepFromQuery<Ltpa350ProcessStep>({
    defaultStep,
    isValidStep: isPageProcessStep,
  });
  const { hideAside, isWidthExpanded, setIsWidthExpanded } = useAsideToggleState();
  const stepMainBody: Record<number, ReactNode> = {
    1: <Ltpa350Step1 />,
    2: <Ltpa350Step2 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />,
    3: <Ltpa350Step1 />,
    4: <Ltpa350Step1 />,
    5: <Ltpa350Step1 />,
    6: <Ltpa350Step1 />,
  };

  return (
    <LayoutTemplateAsideToggle
      // LayoutHead
      pageID={<PageID data={data.head.pageID} />}
      pageTitle={<PageTitle data={data.head.pageTitle} />}
      // LayoutBody: process
      pageProcess={
        <PageProcess
          items={data.process.list}
          completeSteps={data.process.state.complete}
          defaultActiveStep={data.process.state.active}
          activeStep={activeStep}
          onStepChange={(step) => {
            if (isPageProcessStep(step)) {
              setActiveStep(step);
            }
          }}
        />
      }
      // LayoutBody: main
      mainBody={stepMainBody[activeStep]}
      // LayoutBody: aside
      asideHead={
        <TaskStatusBoard
          state={[
            { id: 1, status: '정상', label: '누적', sum: 24 },
            { id: 2, status: '경고', label: '중복', sum: 1 },
            { id: 3, status: '중지', label: '직업', sum: 0 },
            { id: 4, status: '정상', label: '기타', sum: 99 },
          ]}
        />
      }
      asideBody={
        <>
          <InfoContract data={asideInfo[`step${activeStep}`]} />
          <QuickLinks />
        </>
      }
      asideFoot={<AsideFoot />}
      hideAside={hideAside}
    />
  );
}
