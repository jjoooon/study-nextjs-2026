'use client';

import { useAsideToggleState } from '@aggrid';
import { BottomBar } from '@common/BottomBar';
import { AsideFoot } from '@features/AsideFoot';
import { PageID } from '@features/PageID';
import { PageProcess } from '@features/PageProcess';
import { PageTitleProduct as PageTitle } from '@features/PageTitle';
import { QuickLinks } from '@features/QuickLinks';
import { TaskStatusBoard } from '@features/TaskStatusBoard';
import { LayoutTemplateLTPA350 } from '@layout/LayoutTemplate';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { useState } from 'react';
import type { ReactNode } from 'react';

import { Ltpa35003Side } from '../../shared/components/Ltpa35003Side';
import { Ltpa35004Side } from '../../shared/components/Ltpa35004Side';
import { Ltpa350Side } from '../../shared/components/Ltpa350Side';
import type { Ltpz005TabValue } from '../../shared/components/popups/Ltpz005';
import Ltpz005 from '../../shared/components/popups/Ltpz005';
import { Ltpa35005 } from '../aplMtt/components/Ltpa35005'; // 05. 추가사항
import { Ltpa35006 } from '../aplMtt/components/Ltpa35006'; // 06. 수납
import { Ltpa35001 } from '../crmtt/components/Ltpa35001'; // 01. 가입설계
import { Ltpa35002 } from '../cvrPl/components/Ltpa35002'; // 02. 담보설계
import { Ltpa35003 } from '../ncMtt/components/Ltpa35003'; // 04. 심사요청
import { Ltpa35004 } from '../udRqRst/components/Ltpa35004'; // 04. 심사요청
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

// pageProcessStep 타입 가드 및 URL 파싱 함수 ---------------------------------
const isPageProcessStep = (value: number): value is Ltpa350ProcessStep => {
  if (!Number.isInteger(value)) return false;
  return data.process.list.some((item) => item.step === value);
};

export default function Ltpa350Section() {
  const [simpleMode, setSimpleMode] = useState<boolean>(data.head.pageTitle.simpleMode);
  const [isTaskStatusPopupOpen, setIsTaskStatusPopupOpen] = useState<boolean>(false);
  const [taskStatusActiveTab, setTaskStatusActiveTab] = useState<Ltpz005TabValue>('common');
  const defaultStep = data.process.state.active;
  const { activeStep, setActiveStep } = useStepFromQuery<Ltpa350ProcessStep>({
    defaultStep,
    isValidStep: isPageProcessStep,
  });
  const { hideAside } = useAsideToggleState();

  // 퍼블 확인용 viewKey 상태 (섹션에서 통합 관리)
  const [currentViewKey, setCurrentViewKey] = useState<ViewKey>('view1');

  const stepMainBody: Record<number, ReactNode> = {
    1: <Ltpa35001 simpleMode={simpleMode} viewKey={currentViewKey} />, // prop 추가
    2: <Ltpa35002 />,
    3: <Ltpa35003 simpleMode={simpleMode} />,
    4: <Ltpa35004 />,
    5: <Ltpa35005 />,
    6: <Ltpa35006 />,
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
              { id: 4, status: '정상', label: '예상UW', sum: 99 },
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
        // 각단계별정보
        asideInfo={
          activeStep === 3 ? (
            <Ltpa35003Side
              info={{
                FP: true,
                name: '홍길동',
                consentEndDate: '2024-06-30',
                noticeType: '1형(일반고지형)',
                diseaseCount: 6,
                reviewers: [
                  ['M40', '척추만곡증'],
                  ['M40', '척추만곡증'],
                  ['M40', '척추만곡증'],
                  ['M40', '척추만곡증'],
                ],
                systems: 4,
              }}
            />
          ) : activeStep === 4 ? (
            <Ltpa35004Side
              info={{
                reviewType: '특인심사',
                reviewStatus: '배정대기',
                msg: '[심사운용 시간 이후 요청]\n심사 자배정대기 중입니다.',
                notice:
                  '3월 질병 심사기준 안내 두줄까지 공지사항제목 노출 3월 질병 심사기준 안내 두줄까지 공지사항제목 노출',
              }}
            />
          ) : activeStep === 1 ? (
            <Ltpa350Side info={null} />
          ) : (
            <Ltpa350Side
              info={{
                date: '2024-05-08',
                polName: '홍길동',
                insName: '홍길동',
                insAge: '32',
                insGender: '남',
                insGrade: '1급',
                quoteExpiryDate: '2024-06-30',
                insuranceAgeDate: '2024-05-08',
                consentEndDate: '2024-06-30',
                note: '알릴사항 비대상',
                docPrint: true,
                docScan: false,
                eGuideDiscount: [1230, 39990],
              }}
            />
          )
        }
        // 바로가기
        asideLinks={
          <>
            <QuickLinks />
          </>
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
