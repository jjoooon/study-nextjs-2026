/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Fragment } from 'react';
import { Num1, Num2, Num3, Num4, Num5, Num6 } from '@/shared/components/icons/StepNumber';
import { Gcol, Typo } from '@atoms';
import { ProcessDot, CheckBoldIcon, ProcessActiveIcon } from '@icons';

// 단계 표시 기본 데이터
// - step: 단계 번호(예: 1,2,3...)
// - label: 단계명 텍스트
export type PageProcessItem = {
  step: number;
  label: string;
};

// PageProcess 입력값
// - completeSteps가 있으면 "명시 완료 목록" 기준으로 완료 상태를 판단
// - completeSteps가 없으면 activeStep보다 작은 단계를 완료로 간주
type PageProcessProps = {
  items: PageProcessItem[];
  completeSteps?: number[];
  activeStep?: number;
  defaultActiveStep?: number;
  onStepChange?: (step: number) => void;
};

export function PageProcess({ items, completeSteps, activeStep, defaultActiveStep, onStepChange }: PageProcessProps) {
  // 활성 단계 우선순위: activeStep > defaultActiveStep > 첫 아이템 step > 1
  const resolvedActiveStep = activeStep ?? defaultActiveStep ?? items[0]?.step ?? 1;
  // 완료 단계 조회 성능/가독성을 위해 Set으로 변환
  const completeStepSet = new Set(completeSteps ?? []);

  // 단계별 상태 계산
  // - 'active'   : 현재 활성 단계
  // - 'complete' : 완료 단계
  // - ''         : 아직 진행 전 단계
  const getStepState = (step: number) => {
    if (resolvedActiveStep === step) return 'active';

    // completeSteps가 전달된 경우, 전달값만 완료로 취급(자동 완료 계산 비활성)
    if (completeStepSet.size > 0) {
      if (completeStepSet.has(step)) return 'complete';
      return '';
    }

    // completeSteps가 없으면 활성 단계보다 앞선 단계는 완료 처리
    if (resolvedActiveStep > step) return 'complete';
    return '';
  };

  return (
    // 우측 세로형 단계 네비게이션 컨테이너
    <Gcol
      placement="bwe"
      className="w-[3.8rem] pb-[2rem] bg-[var(--color-gray-5)] border-r-[1px] border-r-[var(--color-gray-15)]"
    >
      <Gcol className="h-full max-h-[54rem] gap-0" placement="se">
        {items.map((item, index) => (
          <Fragment key={item.step}>
            {(() => {
              const stepState = getStepState(item.step);
              const isActive = stepState === 'active';
              const isComplete = stepState === 'complete';

              return (
                // 각 단계 버튼: 클릭 시 상위로 단계 변경 이벤트 전달
                <button
                  type="button"
                  data-process={stepState}
                  className={`relative flex flex-col w-[2.9rem] py-[2rem] gap-1 items-center justify-center -mt-[1px] rounded-tl-[0.8rem] border border-[1px] border-[var(--color-gray-15)] border-r-0 rounded-bl-[0.8rem] py-[0.6rem] hover:bg-[var(--color-secondary-5)] bg-[#fff] text-[var(--color-gray-70)] z-0 shadow-[0_0.2rem_0.4rem_0_rgba(0,0,0,0.10)] ${
                    isActive &&
                    'w-[3.3rem] text-white z-1 border-y-[1px] border-l-[1px] border-r-0 border-transparent rounded-l-xl rounded-r-none bg-origin-border [background-clip:padding-box,_border-box] [background-image:linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%),linear-gradient(to_bottom,#ffad4f,#e5561c)]'
                  }
                  ${isComplete && 'bg-[var(--color-secondary-30)] text-white hover:bg-[var(--color-secondary-40)] border-[#89807c]'}
                  }`}
                  onClick={() => onStepChange?.(item.step)}
                >
                  <b
                    className={`w-[1.8rem] h-[1.8rem] leading-0 rounded-full flex items-center justify-center ${
                      isComplete
                        ? 'bg-[#FFF]'
                        : isActive
                          ? 'bg-[#FFF] text-transparent'
                          : 'bg-[var(--color-secondary-30)] text-[var(--color-gray-0)]'
                    }`}
                  >
                    {isComplete ? (
                      // 완료 단계: 체크 아이콘
                      <CheckBoldIcon color="var(--color-secondary-30)" />
                    ) : isActive ? (
                      // 활성 단계: 회전 아이콘
                      <ProcessActiveIcon className="animate-spin [animation-duration:4s]" />
                    ) : item.step === 1 ? (
                      // 기본 단계: 숫자 아이콘(1~6)
                      <Num1 />
                    ) : item.step === 2 ? (
                      <Num2 />
                    ) : item.step === 3 ? (
                      <Num3 />
                    ) : item.step === 4 ? (
                      <Num4 />
                    ) : item.step === 5 ? (
                      <Num5 />
                    ) : item.step === 6 ? (
                      <Num6 />
                    ) : null}
                  </b>
                  <Typo
                    className={`px-0 w-[2.8rem] text-[1.1rem] leading-[1.3rem] text-center ${isActive ? 'text-white font-[700]' : isComplete ? 'text-white' : 'text-[var(--color-gray-70)]'}`}
                  >
                    {item.label}
                  </Typo>
                </button>
              );
            })()}
          </Fragment>
        ))}
      </Gcol>
    </Gcol>
  );
}
