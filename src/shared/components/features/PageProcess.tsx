'use client';

import { Gcol, Typo } from '@/shared/components/common';
import { ProcessDot } from '@/shared/components/icons';
import { useState } from 'react';

export default function PageProcess() {
  return(
    <Gcol placement="bwc" className="w-[4rem] pb-[2rem]">
      <Gcol className="justify-between h-full max-h-[54rem] items-center rounded-tr-[2rem] rounded-br-[0.4rem] bg-[#FFFBEF] shadow-[0_0.2rem_1.2rem_0_rgba(230,136,103,0.20)] py-[1rem]">
        <button type="button" data-process="complete" className="flex flex-col w-full gap-1 items-center justify-center gap-1 rounded-tr-[0.8rem] py-[0.6rem] [data-process=active]:bg-[linear-gradient(344deg,#FF5C2E_-17.78%,#FF8D02_88.79%)] ">
          <b className="w-[1.8rem] h-[1.8rem] leading-0 text-[var(--color-gray-0)] rounded-full bg-[#B7BBC5] flex items-center justify-center">1</b>
          <Typo className="px-2 text-[var(--color-gray-70)] text-[1.1rem] font-bold leading-[1.2rem] text-center">계약사항</Typo>
        </button>
        <ProcessDot/>
        <button type="button" data-process="active" className="flex flex-col w-full gap-1 items-center justify-center gap-1 rounded-tr-[0.8rem] py-[0.6rem] [data-process=active]:bg-[#000]">
          <b className="w-[1.8rem] h-[1.8rem] leading-0 text-[var(--color-gray-0)] rounded-full bg-[#B7BBC5] flex items-center justify-center">2</b>
          <Typo className="px-2 text-[var(--color-gray-70)] text-[1.1rem] font-bold leading-[1.2rem] text-center">담보설계</Typo>
        </button>
        <ProcessDot/>
        <button type="button" data-process="" className="flex flex-col w-full gap-1 items-center justify-center gap-1 rounded-tr-[0.8rem] py-[0.6rem] [data-process=active]:bg-[#000]">
          <b className="w-[1.8rem] h-[1.8rem] leading-0 text-[var(--color-gray-0)] rounded-full bg-[#B7BBC5] flex items-center justify-center">3</b>
          <Typo className="px-2 text-[var(--color-gray-70)] text-[1.1rem] font-bold leading-[1.2rem] text-center">알릴사항</Typo>
        </button>
        <ProcessDot/>
        <button type="button" data-process="" className="flex flex-col w-full gap-1 items-center justify-center gap-1 rounded-tr-[0.8rem] py-[0.6rem] [data-process=active]:bg-[#000]">
          <b className="w-[1.8rem] h-[1.8rem] leading-0 text-[var(--color-gray-0)] rounded-full bg-[#B7BBC5] flex items-center justify-center">4</b>
          <Typo className="px-2 text-[var(--color-gray-70)] text-[1.1rem] font-bold leading-[1.2rem] text-center">심사요청</Typo>
        </button>
        <button type="button" data-process="" className="flex flex-col w-full gap-1 items-center justify-center gap-1 rounded-tr-[0.8rem] py-[0.6rem] [data-process=active]:bg-[#000]">
          <b className="w-[1.8rem] h-[1.8rem] leading-0 text-[var(--color-gray-0)] rounded-full bg-[#B7BBC5] flex items-center justify-center">5</b>
          <Typo className="px-2 text-[var(--color-gray-70)] text-[1.1rem] font-bold leading-[1.2rem] text-center">추가사항</Typo>
        </button>
        <ProcessDot/>
        <button type="button" data-process="" className="flex flex-col w-full gap-1 items-center justify-center gap-1 rounded-tr-[0.8rem] py-[0.6rem] [data-process=active]:bg-[#000]">
          <b className="w-[1.8rem] h-[1.8rem] leading-0 text-[var(--color-gray-0)] rounded-full bg-[#B7BBC5] flex items-center justify-center">6</b>
          <Typo className="px-2 text-[var(--color-gray-70)] text-[1.1rem] font-bold leading-[1.2rem] text-center">수납</Typo>
        </button>
      </Gcol>
    </Gcol>
  )
}