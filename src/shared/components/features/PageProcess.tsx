'use client';

import { Fragment } from 'react';
import { Gcol, Typo } from '@atoms';
import { ProcessDot, CheckBoldIcon, ProcessActiveIcon } from '@icons';

export type PageProcessItem = {
  step: number;
  label: string;
};

type PageProcessProps = {
  items: PageProcessItem[];
  completeSteps?: number[];
  activeStep?: number;
  defaultActiveStep?: number;
  onStepChange?: (step: number) => void;
};

export function PageProcess({ items, completeSteps, activeStep, defaultActiveStep, onStepChange }: PageProcessProps) {
  const resolvedActiveStep = activeStep ?? defaultActiveStep ?? items[0]?.step ?? 1;
  const completeStepSet = new Set(completeSteps ?? []);

  const getStepState = (step: number) => {
    if (resolvedActiveStep === step) return 'active';
    if (completeStepSet.size > 0) {
      if (completeStepSet.has(step)) return 'complete';
      return '';
    }
    if (resolvedActiveStep > step) return 'complete';
    return '';
  };

  return (
    <Gcol placement="bwc" className="w-[4rem] pb-[2rem]">
      <Gcol className="justify-between h-full max-h-[54rem] items-center rounded-tr-[2rem] rounded-br-[0.4rem] bg-[#FFFBEF] shadow-[0_0.2rem_1.2rem_0_rgba(230,136,103,0.20)] py-[1rem]">
        {items.map((item, index) => (
          <Fragment key={item.step}>
            {(() => {
              const stepState = getStepState(item.step);
              const isActive = stepState === 'active';
              const isComplete = stepState === 'complete';

              return (
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
                      <CheckBoldIcon />
                    ) : isActive ? (
                      <ProcessActiveIcon className="animate-spin [animation-duration:4s]" />
                    ) : (
                      item.step
                    )}
                  </b>
                  <Typo
                    className={`px-2 text-[1.1rem] leading-[1.3rem] text-center ${isActive ? 'text-white' : 'text-[var(--color-gray-70)]'}`}
                  >
                    {item.label}
                  </Typo>
                </button>
              );
            })()}
            {index < items.length - 1 && <ProcessDot />}
          </Fragment>
        ))}
      </Gcol>
    </Gcol>
  );
}
