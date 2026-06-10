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
    <Gcol placement="bwc" className="w-[4rem] pb-[2rem]">
      <Gcol className="justify-between h-full max-h-[54rem] items-center rounded-tr-[2rem] rounded-br-[0.4rem] bg-[var(--color-warning-5)] shadow-[0_0.1rem_0.1rem_0.1rem_rgba(77, 61, 12, 0.15)] py-[1rem]">
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
                  className={`flex flex-col w-full gap-1 items-center justify-center rounded-tr-[0.8rem] py-[0.6rem] hover:bg-[#FFEFBF] ${
                    isActive
                      ? 'bg-[linear-gradient(344deg,_#FF5C2E_-17.78%,_#FF8D02_88.79%)] text-white'
                      : 'bg-transparent text-[var(--color-gray-70)]'
                  }`}
                  onClick={() => onStepChange?.(item.step)}
                >
                  <b
                    className={`w-[1.8rem] h-[1.8rem] leading-0 rounded-full flex items-center justify-center ${
                      isComplete
                        ? 'bg-[#FF5C2E]'
                        : isActive
                          ? 'bg-[#FFF] text-transparent'
                          : 'bg-[#B7BBC5] text-[var(--color-gray-0)]'
                    }`}
                  >
                    {isComplete ? (
                      // 완료 단계: 체크 아이콘
                      <CheckBoldIcon />
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
                    className={`px-2 text-[1.1rem] leading-[1.3rem] text-center ${isActive ? 'text-white font-[700]' : 'text-[var(--color-gray-70)]'}`}
                  >
                    {item.label}
                  </Typo>
                </button>
              );
            })()}
            {/* 단계 사이 구분 점(작은 높이에서는 숨김) */}
            {index < items.length - 1 && (
              <span className="[@media(max-height:564px)]:hidden">
                <ProcessDot />
              </span>
            )}
          </Fragment>
        ))}
      </Gcol>
    </Gcol>
  );
}
