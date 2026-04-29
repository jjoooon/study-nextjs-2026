'use client';

import { useAsideToggleState } from '@aggrid';
import { BottomBar } from '@common/BottomBar';
import { InfoContract } from '@common/InfoContract';
import { AsideFoot } from '@features/AsideFoot';
import { PageID } from '@features/PageID';
import { PageProcess } from '@features/PageProcess';
import { PageTitleProduct as PageTitle } from '@features/PageTitle';
import { QuickLinks } from '@features/QuickLinks';
import { TaskStatusBoard } from '@features/TaskStatusBoard';
import { LayoutTemplateLTPA350 } from '@layout/LayoutTemplate';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ReactNode } from 'react';
import { useState } from 'react';

import type { Ltpz005TabValue } from '../../shared/components/popups/Ltpz005';
import { Ltpz005 } from '../../shared/components/popups/Ltpz005';
import type { Ltpz018MenuItem } from '../../shared/components/popups/Ltpz018';
import { Ltpz018 } from '../../shared/components/popups/Ltpz018';
import { Ltpa350Step5 } from '../aplMtt/components/Ltpa350Step5'; // 05. 추가사항
import { Ltpa350Step6 } from '../aplMtt/components/Ltpa350Step6'; // 06. 수납
import { Ltpa350Step1 } from '../crmtt/components/Ltpa350Step1'; // 01. 가입설계
import { Ltpa350Step2View1 } from '../cvrPl/components/Ltpa350Step2View1'; // 02. 담보설계
import { Ltpa350Step2View2 } from '../cvrPl/components/Ltpa350Step2View2'; // 02. 담보설계
import { Ltpa350Step2View3 } from '../cvrPl/components/Ltpa350Step2View3'; // 02. 담보설계
import { Ltpa350Step2View4 } from '../cvrPl/components/Ltpa350Step2View4'; // 02. 담보설계
import { Ltpa350Step2View5 } from '../cvrPl/components/Ltpa350Step2View5'; // 02. 담보설계
import { Ltpa350Step3 } from '../ncMtt/components/Ltpa350step3'; // 04. 심사요청
import { Ltpa350Step4 } from '../udRqRst/components/Ltpa350Step4'; // 04. 심사요청
import { LayoutFoot, LayoutHead } from '@/shared/components/layout/BaseLayout';
import { useStepFromQuery } from '@/shared/hooks/useStepFromQuery';
// 퍼블 확인용 뷰키 타입 (Step1/Step2와 동일하게 맞춤)
type ViewKey = 'view1' | 'view2' | 'view3' | 'view4' | 'view5';

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
      simpleMode: false,
      title: '한화 시그니처 여성 건강보험 3.0 2504',
      options: ['납입면제 강화형', '기본형'],
      planNumber: ['LA20234472050000', '2'],
      contractHolder: '6012345 박하늘별님달박하늘별님달',
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
      complete: [1], //완료단계
      active: 2, //현재단계
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
const asideFoot = {
  step1: {
    insGen: 0,
    paymentAmount: 3450,
    point: 640,
  },
  step2: {
    insGen: 3456,
    paymentAmount: 3450,
    point: 640,
  },
  step3: {
    insGen: 3456,
    paymentAmount: 3450,
    point: 640,
  },
  step4: {
    insGen: 3456,
    paymentAmount: 3450,
    point: 640,
  },
  step5: {
    insGen: 3456,
    paymentAmount: 3450,
    point: 640,
  },
  step6: {
    insGen: 3456,
    paymentAmount: 3450,
    point: 640,
  },
};
// step4(심사요청)만 별도 메뉴, 나머지는 기존 메뉴
const DEFAULT_MY_MENU_LIST: Ltpz018MenuItem[] = [
  { code: 'm01', fix: true, name: '설계완료알림', link: '/' },
  { code: 'm02', fix: false, name: '다른상품설계', link: '/' },
  { code: 'm03', fix: false, name: '수수료조회', link: '/' },
  { code: 'm04', fix: true, name: '실손정액조회', link: '/' },
];

const STEP4_MENU_LIST: Ltpz018MenuItem[] = [
  { code: 'm01', fix: true, name: '설계메뉴얼', link: '/' },
  { code: 'm02', fix: false, name: '실손정액조회', link: '/' },
  { code: 'm03', fix: false, name: '다른상품설계', link: '/' },
  { code: 'm04', fix: true, name: '동일상품복사', link: '/' },
  { code: 'm05', fix: false, name: '설계동의', link: '/' },
  { code: 'm06', fix: false, name: '전체누적', link: '/' },
  { code: 'm07', fix: false, name: '약관조회', link: '/' },
  { code: 'm08', fix: false, name: '더보기', link: '/' },
];

// pageProcessStep 타입 가드 및 URL 파싱 함수 ---------------------------------
const isPageProcessStep = (value: number): value is Ltpa350ProcessStep => {
  if (!Number.isInteger(value)) return false;
  return data.process.list.some((item) => item.step === value);
};

export default function Ltpa350Section() {
  const [simpleMode, setSimpleMode] = useState<boolean>(data.head.pageTitle.simpleMode);
  const [isTaskStatusPopupOpen, setIsTaskStatusPopupOpen] = useState<boolean>(false);
  const [taskStatusActiveTab, setTaskStatusActiveTab] = useState<Ltpz005TabValue>('common');
  const [isQuickLinksPopupOpen, setIsQuickLinksPopupOpen] = useState<boolean>(false);
  const [myMenuList, setMyMenuList] = useState<Ltpz018MenuItem[]>(DEFAULT_MY_MENU_LIST);
  const defaultStep = data.process.state.active;
  const { activeStep, setActiveStep } = useStepFromQuery<Ltpa350ProcessStep>({
    defaultStep,
    isValidStep: isPageProcessStep,
  });
  const { hideAside, isWidthExpanded, setIsWidthExpanded } = useAsideToggleState();

  // 퍼블 확인용 viewKey 상태 (섹션에서 통합 관리)
  const [currentViewKey, setCurrentViewKey] = useState<ViewKey>('view3');

  const renderStep2 = () => {
    switch (currentViewKey) {
      case 'view1':
        return (
          <Ltpa350Step2View1
            isWidthExpanded={isWidthExpanded}
            setIsWidthExpanded={setIsWidthExpanded}
            // viewKey={currentViewKey}
          />
        );
      case 'view2':
        return (
          <Ltpa350Step2View2
            isWidthExpanded={isWidthExpanded}
            setIsWidthExpanded={setIsWidthExpanded}
            viewKey={currentViewKey}
          />
        );
      case 'view3':
        return <Ltpa350Step2View3 />;
      case 'view4':
        return (
          <Ltpa350Step2View4
            isWidthExpanded={isWidthExpanded}
            setIsWidthExpanded={setIsWidthExpanded}
            viewKey={currentViewKey}
          />
        );
      case 'view5':
        return <Ltpa350Step2View5 isWidthExpanded={isWidthExpanded} setIsWidthExpanded={setIsWidthExpanded} />;
      default:
        return null;
    }
  };

  const stepMainBody: Record<number, ReactNode> = {
    1: <Ltpa350Step1 simpleMode={simpleMode} viewKey={currentViewKey} />, // prop 추가
    2: renderStep2(),
    3: <Ltpa350Step3 simpleMode={simpleMode}/>,
    4: <Ltpa350Step4 />,
    5: <Ltpa350Step5 />,
    6: <Ltpa350Step6 />,
  };

  return (
    <>
      {/* 퍼블 페이지확인용 (섹션에서 통합 관리) */}
      <NativeSelect
        width={'auto'}
        className="fixed top-1 left-[50%] z-100 opacity-80"
        value={currentViewKey}
        onChange={(e) => {
          setCurrentViewKey(e.target.value as ViewKey);
        }}
      >
        <NativeSelectOption value="view1">임시 화면확인용: 인보험</NativeSelectOption>
        <NativeSelectOption value="view2">임시 화면확인용: 태아</NativeSelectOption>
        <NativeSelectOption value="view3">임시 화면확인용: 재물</NativeSelectOption>
        <NativeSelectOption value="view4">임시 화면확인용: 단체</NativeSelectOption>
        <NativeSelectOption value="view5">임시 화면확인용: 연금/저축</NativeSelectOption>
      </NativeSelect>
      {/* 퍼블 페이지확인용 */}

      <LayoutHead>
        <PageID
          data={{
            pageName: '가입설계',
            pageId: 'LTPA350',
          }}
        />
      </LayoutHead>

      <LayoutTemplateLTPA350
        pageTitle={<PageTitle data={data.head.pageTitle} simpleMode={simpleMode} onSimpleModeChange={setSimpleMode} />}
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
        // 신호등
        asideHead={
          <TaskStatusBoard
            state={[
              { id: 1, status: '정상', label: '공통', sum: 24 },
              { id: 2, status: '경고', label: '누적', sum: 1 },
              { id: 3, status: '중지', label: '직업', sum: 0 },
              { id: 4, status: '정상', label: 'UW', sum: 99 },
            ]}
            onItemClick={(item) => {
              const nextActiveTab: Ltpz005TabValue =
                item.label === '공통'
                  ? 'common'
                  : item.label === '누적'
                    ? 'accum'
                    : item.label === '직업'
                      ? 'job'
                      : 'expected-uw';

              setTaskStatusActiveTab(nextActiveTab);
              setIsTaskStatusPopupOpen(true);
              // 무한루프 방지: 이미 2면 setActiveStep 호출 안 함
              if (activeStep !== 2) {
                setActiveStep(2);
              }
            }}
          />
        }
        // 바로가기
        asideLinks={
          <>
            <QuickLinks
              menus={activeStep === 4 ? STEP4_MENU_LIST : myMenuList}
              onMoreClick={() => setIsQuickLinksPopupOpen(true)}
            />
            {isQuickLinksPopupOpen && (
              <Ltpz018
                open={isQuickLinksPopupOpen}
                onOpenChange={setIsQuickLinksPopupOpen}
                myMenuList={activeStep === 4 ? STEP4_MENU_LIST : myMenuList}
                onSaveMyMenuList={setMyMenuList}
              />
            )}
          </>
        }
        // 심사요청
        asideInfo={
          activeStep === 4
            ? (
                <InfoContract
                  data={asideInfo[`step${activeStep}`]}
                  extraContent={true}
                />
              )
            : <InfoContract data={asideInfo[`step${activeStep}`]} />
        }
        asideFoot={<AsideFoot dataTotal={asideFoot[`step${activeStep}`]} viewKey={currentViewKey} />}
        hideAside={hideAside}
      />

      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>

      {isTaskStatusPopupOpen && (
        <Ltpz005
          open={isTaskStatusPopupOpen}
          onOpenChange={setIsTaskStatusPopupOpen}
          initialActiveTab={taskStatusActiveTab}
        />
      )}
    </>
  );
}
