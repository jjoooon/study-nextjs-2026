'use client';

import { Fragment } from 'react';
import { Gcol, Typo } from '@atoms';
import { ProcessDot } from '@icons';

export type PageProcessStep = 1 | 2 | 3 | 4 | 5 | 6;

type PageProcessItem = {
  step: PageProcessStep;
  label: string;
  activeBgClassName: string;
};

const PROCESS_ITEMS: PageProcessItem[] = [
  { step: 1, label: '계약사항', activeBgClassName: '[data-process=active]:bg-[linear-gradient(344deg,#FF5C2E_-17.78%,#FF8D02_88.79%)]' },
  { step: 2, label: '담보설계', activeBgClassName: '[data-process=active]:bg-[#000]' },
  { step: 3, label: '알릴사항', activeBgClassName: '[data-process=active]:bg-[#000]' },
  { step: 4, label: '심사요청', activeBgClassName: '[data-process=active]:bg-[#000]' },
  { step: 5, label: '추가사항', activeBgClassName: '[data-process=active]:bg-[#000]' },
  { step: 6, label: '수납', activeBgClassName: '[data-process=active]:bg-[#000]' },
];

type PageProcessProps = {
  activeStep?: PageProcessStep;
  onStepChange?: (step: PageProcessStep) => void;
};

export default function PageProcess({
  activeStep = 1,
  onStepChange,
}: PageProcessProps) {
  const getStepState = (step: PageProcessStep) => {
    if (activeStep === step) return 'active';
    if (activeStep > step) return 'complete';
    return '';
  };

  return(
    <Gcol placement="bwc" className="w-[4rem] pb-[2rem]">
      <Gcol className="justify-between h-full max-h-[54rem] items-center rounded-tr-[2rem] rounded-br-[0.4rem] bg-[#FFFBEF] shadow-[0_0.2rem_1.2rem_0_rgba(230,136,103,0.20)] py-[1rem]">
        {PROCESS_ITEMS.map((item, index) => (
          <Fragment key={item.step}>
            <button
              type="button"
              data-process={getStepState(item.step)}
              className={`flex flex-col w-full gap-1 items-center justify-center gap-1 rounded-tr-[0.8rem] py-[0.6rem] ${item.activeBgClassName}`}
              onClick={() => onStepChange?.(item.step)}
            >
              <b className="w-[1.8rem] h-[1.8rem] leading-0 text-[var(--color-gray-0)] rounded-full bg-[#B7BBC5] flex items-center justify-center">{item.step}</b>
              <Typo className="px-2 text-[var(--color-gray-70)] text-[1.1rem] font-bold leading-[1.2rem] text-center">{item.label}</Typo>
            </button>
            {index < PROCESS_ITEMS.length - 1 && <ProcessDot />}
          </Fragment>
        ))}
      </Gcol>
    </Gcol>
  )
}