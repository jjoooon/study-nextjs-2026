'use client';

import { useState } from 'react';
import { ArrowSide, ArrowSideBg } from '@/shared/components/icons';
import { LayoutFlow } from '@/shared/components/layout/Cabinet';
import { Toggle } from '@/shared/components/uiux';

interface FlowStatusProps {
  onToggleChange?: (pressed: boolean) => void;
  defaultPressed?: boolean;
}

const FlowStatus = ({ onToggleChange, defaultPressed = false }: FlowStatusProps) => {
  const [isOpen, setIsOpen] = useState(defaultPressed);

  const handleToggleChange = (pressed: boolean) => {
    setIsOpen(pressed);
    onToggleChange?.(pressed);
  };

  return (
    <LayoutFlow className={`${isOpen ? 'w-[31rem]' : 'w-[5.6rem]'}`}>
      <Toggle
        aria-label="Toggle Flow"
        size="free"
        variant="sidebar"
        type="button"
        defaultPressed={defaultPressed}
        onPressedChange={handleToggleChange}
        className="group/toggle absolute top-8 left-full z-10"
      >
        <ArrowSide className="rotate-180 group-data-[state=on]/toggle:rotate-0 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" />
        <ArrowSideBg />
      </Toggle>
      <div className={`${isOpen ? 'px-[2rem]' : 'px-[1.4rem]'} py-[3.2rem]`}>
        <ol
          className={`${isOpen ? 'gap-[1rem]' : 'gap-[5.6rem]'} flex flex-col :after:content-[''] after:block after:w-px after:h-full after:w-[.4rem]! after:bg-[radial-gradient(circle,#d1d5db_.1rem,transparent_.1rem)] after:bg-[length:100%_0.8rem] after:absolute after:top-0 after:left-[1.2rem] relative`}
        >
          <li data-state="on" className="group flex gap-[1.3rem] relative z-1">
            <div className="relative flex items-center justify-center w-[2.8rem] h-[2.8rem] shrink-0 bg-white">
              <svg
                className="absolute inset-0 z-1 hidden group-data-[state=on]:block"
                viewBox="0 0 28 28"
                aria-hidden="true"
              >
                <circle
                  cx="14"
                  cy="14"
                  r="11.5"
                  fill="none"
                  stroke="var(--color-element-primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="50.6 72.3"
                  transform="rotate(-90 14 14)"
                />
              </svg>
              <svg className="absolute inset-0" viewBox="0 0 28 28" aria-hidden="true">
                <circle
                  cx="14"
                  cy="14"
                  r="11.5"
                  fill="none"
                  stroke="#ECECEC"
                  strokeWidth="3"
                  transform="rotate(-90 14 14)"
                />
              </svg>
              <b className="leading-0 text-[#999999] font-extrabold font-[1.1rem] -translate-y-[.1rem]">1</b>
            </div>
            {isOpen && (
              <div className="w-full px-[2rem] py-[1.6rem] rounded-[1.6rem] border border-[#ccc] bg-white flex flex-col gap-1 group-data-[state=on]:shadow-[0_0.2rem_0.4rem_0_rgba(0,0,0,0.08)]">
                <h3 className="flex justify-between items-center">
                  <b className="font-bold group-data-[state=on]:text-[#ff5c2e] text-[1.6rem]">가입설계</b>
                </h3>
                <ul className="w-full hidden group-data-[state=on]:block" aria-hidden="true">
                  <li>2025-11-14~</li>
                  <li>홍길순(여, 42세)</li>
                  <li>한화 시그니처 여성 3N5 간편건강보험 3.0 2504</li>
                </ul>
              </div>
            )}
          </li>
          <li data-state="off" className="group flex gap-[1.3rem] z-1">
            <div className="relative flex items-center justify-center w-[2.8rem] h-[2.8rem] shrink-0 bg-white">
              <svg
                className="absolute inset-0 z-1 hidden group-data-[state=on]:block"
                viewBox="0 0 28 28"
                aria-hidden="true"
              >
                <circle
                  cx="14"
                  cy="14"
                  r="11.5"
                  fill="none"
                  stroke="var(--color-element-primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="50.6 72.3"
                  transform="rotate(-90 14 14)"
                />
              </svg>
              <svg className="absolute inset-0" viewBox="0 0 28 28" aria-hidden="true">
                <circle
                  cx="14"
                  cy="14"
                  r="11.5"
                  fill="none"
                  stroke="#ECECEC"
                  strokeWidth="3"
                  transform="rotate(-90 14 14)"
                />
              </svg>
              <b className="leading-0 text-[#999999] font-extrabold font-[1.1rem] -translate-y-[.1rem]">2</b>
            </div>
            {isOpen && (
              <div className="w-full px-[2rem] py-[1.6rem] rounded-[1.6rem] border border-[#ccc] bg-white flex flex-col gap-1 group-data-[state=on]:shadow-[0_0.2rem_0.4rem_0_rgba(0,0,0,0.08)]">
                <h3 className="flex justify-between items-center">
                  <b className="font-bold group-data-[state=on]:text-[#ff5c2e] text-[1.6rem]">청약사항</b>
                </h3>
                <ul className="w-full hidden group-data-[state=on]:block" aria-hidden="true">
                  <li>2025-11-14~</li>
                  <li>홍길순(여, 42세)</li>
                  <li>한화 시그니처 여성 3N5 간편건강보험 3.0 2504</li>
                </ul>
              </div>
            )}
          </li>
        </ol>
      </div>
    </LayoutFlow>
  );
};

export default FlowStatus;
