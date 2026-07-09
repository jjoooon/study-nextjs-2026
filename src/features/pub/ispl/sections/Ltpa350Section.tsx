/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

// ag-grid 연동 유틸 훅: 우측 aside 접힘 상태를 전역 그리드 레이아웃 상태와 동기화할 때 사용
import { useState } from 'react';
import type { ReactNode } from 'react';
import { LayoutFoot, LayoutHead } from '@/shared/components/layout/BaseLayout';
import { useStepFromQuery } from '@/shared/hooks/useStepFromQuery';
import { useAsideToggleState } from '@aggrid';

// 하단 고정 액션 바(저장/다음 등 공통 액션 영역)
import { BottomBar } from '@common/BottomBar';

// 우측 aside 하단 요약 정보(보험료/포인트 등) 표시
import { AsideFoot } from '@features/AsideFoot';

// 페이지 식별 영역(업무명 + 화면ID)
import { PageID } from '@features/PageID';

// 단계 네비게이션(계약사항/담보설계/알릴사항...) UI
import { PageProcess } from '@features/PageProcess';

// 상품 타이틀/플랜번호/계약자 정보 영역
import { PageTitleProduct as PageTitle } from '@features/PageTitle';

// 우측 aside 바로가기 링크 묶음
import { QuickLinks } from '@features/QuickLinks';

// 우측 신호등 상태 보드(공통/누적/직업/예상UW)
import { TaskStatusBoard } from '@features/TaskStatusBoard';

// LTPA350 전용 페이지 레이아웃 템플릿(상단/본체/aside/하단 구조를 props로 조립)
import { LayoutTemplateLTPA350 } from '@layout/LayoutTemplate';

// 단계별 aside 상세 컴포넌트(심사요청/알릴사항/공통 요약)
import { Ltpa35003Side } from '../../shared/components/Ltpa35003Side'; //사이드 3.알림사항
import { Ltpa35004Side } from '../../shared/components/Ltpa35004Side'; //사이드 4.심사요청
import { Ltpa350Side } from '../../shared/components/Ltpa350Side'; //사이드 공통 1.가입설계,2.담보설계,5.추가사항,6.수납

// 신호등 클릭 시 열리는 팝업 탭 타입 + 팝업 컴포넌트
import type { Ltpz005TabValue } from '../../shared/components/popups/Ltpz005';
import Ltpz005 from '../../shared/components/popups/Ltpz005';

// 단계별 메인 본문 컴포넌트(1~6단계)

import { Ltpa35005 } from '../aplMtt/components/Ltpa35005'; // 05. 추가사항
import { Ltpa35006 } from '../aplMtt/components/Ltpa35006'; // 06. 수납
import { Ltpa35001 } from '../crmtt/components/Ltpa35001'; // 01. 가입설계
import { Ltpa35002 } from '../cvrPl/components/Ltpa35002'; // 02. 담보설계
import { Ltpa35003 } from '../ncMtt/components/Ltpa35003'; // 03. 알림사항
import { Ltpa35004 } from '../udRqRst/components/Ltpa35004'; // 04. 심사요청

// 공통 페이지 shell 상/하단 슬롯 + URL query 기반 step 동기화 훅

// 퍼블 확인용 뷰키 타입 (Step1/Step2와 동일하게 맞춤)
type ViewKey = 'view1' | 'view2' | 'view3' | 'view4' | 'view5';

// types
type Ltpa350ProcessStep = 1 | 2 | 3 | 4 | 5 | 6; //단계번호
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
      simpleMode: false, // true 심플모드 | false 상세모드
      title: '한화 시그니처 여성 간편건강보험4.0 무배당2604',
      options: ['납입면제형', '납입후50%해약환급금지급형'], //셀렉트박스 옵션값
      planNumber: ['LA20234472050000', '2'],
      contractHolder: '3999999 김한손',
      //planNumberList는 설계번호 검색시 나오는 리스트목록
      planNumberList: [
        { label: 'LA20234472050000', value: 'LA20234472050000', name: '김한손', amount: '23,000', state: '설계중' },
        { label: 'LA20234472050001', value: 'LA20234472050001', name: '박하늘', amount: '45,500', state: '계약완료' },
        { label: 'LA20234472050002', value: 'LA20234472050002', name: '이도현', amount: '12,300', state: '심사중' },
        { label: 'LA20234472050003', value: 'LA20234472050003', name: '최수영', amount: '99,900', state: '청약완료' },
        { label: 'LA20234472050004', value: 'LA20234472050004', name: '한지민', amount: '77,700', state: '설계중' },
      ],
    },
  },

  // process.list는 좌측 페이지 프로세스 단계 네비게이션에 사용되는 단계 정보 배열
  // process.state는 현재 단계(active)와 완료 단계 배열(complete)을 관리하는 객체 완료가 여러개일 경우는 [1,2,...] 이런식으로 관리
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
      active: 1, //현재단계
    },
  },
};

// 우측 하단 asideFoot 영역에 단계별로 보여줄 요약 정보(보험료/포인트 등) 매핑
// step1 계약사항, step2 담보설계, step3 알릴사항, step4 심사요청, step5 추가사항, step6 수납
const asideFoot = {
  step1: {
    insGen: 0, //4세대
    paymentAmount: 0, //납입보험료
    point: 0, //청약포인트
  },
  step2: {
    insGen: 0,
    paymentAmount: 72531,
    point: 0,
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

//isPageProcessStep- URL query(step)에서 추출한 값이 유효한 페이지 프로세스 단계(Ltpa350ProcessStep)인지 판별하는 타입 가드 함수. 주소뒤에 ?step=1 이런식으로 입력했을때 1~6단계까지만 허용하는 함수
const isPageProcessStep = (value: number): value is Ltpa350ProcessStep => {
  if (!Number.isInteger(value)) return false; // 정수가 아니면 false
  return data.process.list.some((item) => item.step === value); // 허용 단계(1~6)에 있는지 확인
};

export default function Ltpa350Section() {
  // simpleMode: 페이지를 간략 모드로 보여줄지 여부 (PageTitle와 step별 본문에서 같이 사용)
  const [simpleMode, setSimpleMode] = useState<boolean>(data.head.pageTitle.simpleMode);

  // 신호등(TaskStatusBoard) 클릭으로 열리는 상세 팝업(LTPZ005) open 상태/초기 탭
  const [isTaskStatusPopupOpen, setIsTaskStatusPopupOpen] = useState<boolean>(false);
  const [taskStatusActiveTab, setTaskStatusActiveTab] = useState<Ltpz005TabValue>('common');

  // 2단계 화면에서 좌/우 폭 확장 시 aside를 강제로 숨기기 위한 상태
  const [isWidthExpanded, setIsWidthExpanded] = useState<boolean>(false);
  const defaultStep = data.process.state.active;

  // URL query(step)와 현재 단계 상태를 동기화
  // - defaultStep: query가 없을 때 기본 진입 단계
  // - isValidStep: 허용 단계(1~6)만 반영하는 가드
  const { activeStep, setActiveStep } = useStepFromQuery<Ltpa350ProcessStep>({
    defaultStep,
    isValidStep: isPageProcessStep,
  });

  // 전역 aside 접힘 상태 + 화면 확장 상태를 합성하여 최종 hideAside 결정
  const { hideAside: asideToggleState } = useAsideToggleState();
  const hideAside = isWidthExpanded ? true : asideToggleState;

  // 퍼블 확인용 viewKey 상태 (섹션에서 통합 관리)
  const [currentViewKey] = useState<ViewKey>('view3');

  // 단계별 메인 콘텐츠 매핑
  // - `simpleMode`: 1/3단계에서 간략 UI 여부 제어
  // - `onIsWidthExpandedChange`: 2단계에서 본문 폭 변경 시 상위의 aside 표시 정책 동기화
  const stepMainBody: Record<number, ReactNode> = {
    1: <Ltpa35001 simpleMode={simpleMode} />,
    2: <Ltpa35002 onIsWidthExpandedChange={setIsWidthExpanded} />,
    3: <Ltpa35003 simpleMode={simpleMode} />,
    4: <Ltpa35004 />,
    5: <Ltpa35005 />,
    6: <Ltpa35006 />,
  };

  return (
    <>
      {/* 퍼블 페이지확인용 (섹션에서 통합 관리) */}
      {/* <NativeSelect
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
      </NativeSelect> */}
      {/* 퍼블 페이지확인용 */}

      <LayoutHead>
        {/*
          PageID props
          - pageName: 상단 업무명(사용자에게 보이는 이름)
          - pageId: 시스템 화면 식별자(운영/문의 시 기준 코드)
        */}
        <PageID
          data={{
            pageName: '가입설계',
            pageId: 'LTPA350',
          }}
        />
      </LayoutHead>

      <LayoutTemplateLTPA350
        // pageTitle: 상단 상품 타이틀 영역 슬롯
        // - data: 상품명/플랜번호/계약자 등 렌더링 데이터
        // - simpleMode: 간략모드 현재값
        // - onSimpleModeChange: 토글 이벤트 핸들러
        pageTitle={<PageTitle data={data.head.pageTitle} simpleMode={simpleMode} onSimpleModeChange={setSimpleMode} />}
        // pageProcess: 단계 이동 UI 슬롯
        // - items: 단계 목록(라벨/step)
        // - completeSteps: 완료 표시할 step 배열
        // - defaultActiveStep: 초기 활성 단계
        // - activeStep: 현재 활성 단계(단방향 상태 주입)
        // - onStepChange: 사용자 클릭 시 단계 변경 처리
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
        // mainBody: 현재 단계에 해당하는 실제 업무 컴포넌트
        mainBody={stepMainBody[activeStep]}
        // asideHead: 우측 상단 신호등 보드ㄴ
        // - state: 카드별 상태값(상태/라벨/건수)
        // - onItemClick: 클릭 시 팝업 탭 이동 + 필요 시 step=2 강제 이동
        asideHead={
          <TaskStatusBoard
            state={[
              { id: 1, status: '정상', label: '공통', sum: 24 },
              { id: 2, status: '경고', label: '누적', sum: 0 },
              { id: 3, status: '중지', label: '직업', sum: 2 },
              { id: 4, status: '없음', label: '예상UW', sum: 0 },
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
        // asideInfo: 우측 중단 상세 정보 슬롯(단계별로 다른 컴포넌트 렌더링)
        // - step 3: 알릴사항 요약(Ltpa35003Side)
        // - step 4: 심사요청 요약(Ltpa35004Side)
        // - step 1: 공백/기본 처리(Ltpa350Side info=null)
        // - 그 외: 공통 계약 요약(Ltpa350Side info=객체)
        asideInfo={
          activeStep === 3 ? (
            <Ltpa35003Side
              info={{
                FP: true, //FP질병제공 동의 Y | N
                name: '홍길동',
                consentEndDate: '2024-06-30', //동의종료일
                noticeType: '1형(일반고지형)', //공지사항 유형(1형/2형)
                diseaseCount: 6, //질병개수
                reviewers: [
                  ['M40', '척추만곡증'],
                  ['M40', '척추만곡증'],
                  ['M40', '척추만곡증'],
                  ['M40', '척추만곡증'],
                ], //심사자 정보 배열(심사자명, 심사자코드) - 최대 4명까지 노출, 넘칠 경우 "외 n명"으로 표시
                systems: 4, //심사 시스템 개수
              }}
            />
          ) : activeStep === 4 ? (
            <Ltpa35004Side
              info={{
                reviewType: '특인심사', //심사유형(특인심사/일반심사)
                reviewStatus: '배정대기', //심사상태(배정대기/심사중/심사완료)
                msg: '[심사운용 시간 이후 요청]\n심사 자배정대기 중입니다.', //심사 상태 메시지
                notice:
                  '3월 질병 심사기준 안내 두줄까지 공지사항제목 노출 3월 질병 심사기준 안내 두줄까지 공지사항제목 노출', //심사 관련 공지사항(길면 줄바꿈 최대2줄)
              }}
            />
          ) : activeStep === 1 ? (
            <Ltpa350Side info={null} />
          ) : (
            <Ltpa350Side
              info={{
                date: '2026-06-30', //보험시기
                polName: '김한화', //계약자명
                insName: '김한화', //피보험자명
                insAge: '32', //피보험자 나이
                insGender: '여', //피보험자 성별
                insGrade: '1급', //피보험자 등급
                quoteExpiryDate: '2026-06-30', //설계유효기간
                insuranceAgeDate: '2026-08-16', //상령일
                consentEndDate: '2026-06-30', //동의종료일
                note: '알릴사항 대상', //특이사항 메모
                docPrint: true, //문서 출력 여부
                docScan: false, //문서 스캔 여부
                eGuideDiscount: [1230, 39990], //전자적안내동의할인 금액 배열
              }}
            />
          )
        }
        // asideLinks: 우측 하단 바로가기 메뉴 슬롯
        asideLinks={
          <>
            <QuickLinks />
          </>
        }
        // asideFoot: 단계별 보험료/포인트 요약
        // - dataTotal: `activeStep`에 맞는 데이터 선택 전달
        // - viewKey: 퍼블 분기키(aside 내부 표시 분기에 활용)
        asideFoot={<AsideFoot dataTotal={asideFoot[`step${activeStep}`]} viewKey={currentViewKey} />}
        // hideAside: 우측 aside 노출 여부
        hideAside={hideAside}
      />

      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>

      {isTaskStatusPopupOpen && (
        // Ltpz005 props
        // - open: 다이얼로그 열림 상태(제어 컴포넌트 패턴)
        // - onOpenChange: 닫힘/열림 이벤트를 부모 상태와 동기화
        // - initialActiveTab: 팝업 진입 시 기본 탭(신호등 클릭 라벨과 매핑)
        <Ltpz005
          open={isTaskStatusPopupOpen}
          onOpenChange={setIsTaskStatusPopupOpen}
          initialActiveTab={taskStatusActiveTab}
        />
      )}
    </>
  );
}
