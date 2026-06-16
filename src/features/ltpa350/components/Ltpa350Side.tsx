import * as React from 'react';

// ------------------------------------------------------------
// Types for the different side components based on the active step
// ------------------------------------------------------------
interface Ltpa35003Info {
  FP: boolean; // FP질병제공 동의 Y | N
  name: string;
  consentEndDate: string; // 동의 종료일
  noticeType: string; // 공지사항 유형(1형/2형)
  diseaseCount: number; // 질병 개수
  reviewers: [string, string][]; // 심사자 정보 배열([코드, 이름])
  systems: number; // 심사 시스템 개수
}

interface Ltpa35004Info {
  reviewType: string; // 심사유형(특인심사/일반심사)
  reviewStatus: string; // 심사상태(배정대기/심사중/심사완료)
  msg: string; // 심사 상태 메시지 (줄바꿈 문자 포함 가능)
  notice: string; // 심사 관련 공지사항 (길면 줄바꿈 최대 2줄)
}

interface Ltpa350Info {
  date: string; // 보험시기
  polName: string; // 계약자명
  insName: string; // 피보험자명
  insAge: string; // 피보험자 나이
  insGender: string; // 피보험자 성별
  insGrade: string; // 피보험자 등급
  quoteExpiryDate: string; // 설계 유효기간
  insuranceAgeDate: string; // 상령일
  consentEndDate: string; // 동의 종료일
  note: string; // 특이사항 메모
  docPrint: boolean; // 문서 출력 여부
  docScan: boolean; // 문서 스캔 여부
  eGuideDiscount: number[]; // 전자적 안내 할인 금액 배열
}

// ------------------------------------------------------------
// Placeholder side components – in a real project these would be
// replaced with the actual UI for each step.
// ------------------------------------------------------------
const Ltpa35003Side: React.FC<{ info: Ltpa35003Info }> = ({ info }) => (
  <div>
    <h3>Ltpa35003Side</h3>
    <pre>{JSON.stringify(info, null, 2)}</pre>
  </div>
);

const Ltpa35004Side: React.FC<{ info: Ltpa35004Info }> = ({ info }) => (
  <div>
    <h3>Ltpa35004Side</h3>
    <pre>{JSON.stringify(info, null, 2)}</pre>
  </div>
);

const Ltpa350Side: React.FC<{ info: Ltpa350Info | null }> = ({ info }) => (
  <div>
    <h3>Ltpa350Side</h3>
    {info ? <pre>{JSON.stringify(info, null, 2)}</pre> : <span>No data</span>}
  </div>
);

// ------------------------------------------------------------
// Main component that decides which side component to render
// ------------------------------------------------------------
export interface Ltpa350SideContainerProps {
  /** 현재 진행 중인 단계 (1‑6) */
  activeStep: number;
  /** 3단계용 데이터 */
  step3Info?: Ltpa35003Info;
  /** 4단계용 데이터 */
  step4Info?: Ltpa35004Info;
  /** 1,2,5,6 단계용 데이터 */
  baseInfo?: Ltpa350Info;
}

/**
 * Ltpa350SideContainer renders the appropriate side component based on the
 * `activeStep` prop. If the specific step data is missing it simply renders
 * nothing for that step.
 */
export const Ltpa350SideContainer: React.FC<Ltpa350SideContainerProps> = ({
  activeStep,
  step3Info,
  step4Info,
  baseInfo,
}) => {
  if (activeStep === 3 && step3Info) {
    return <Ltpa35003Side info={step3Info} />;
  }

  if (activeStep === 4 && step4Info) {
    return <Ltpa35004Side info={step4Info} />;
  }

  // Steps 1, 2, 5, 6 share the same component (null is allowed)
  if ([1, 2, 5, 6].includes(activeStep)) {
    return <Ltpa350Side info={baseInfo ?? null} />;
  }

  // Fallback – render nothing if the step is unknown
  return null;
};

export default Ltpa350SideContainer;
