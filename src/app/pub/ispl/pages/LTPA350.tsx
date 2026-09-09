/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Suspense } from 'react';
import Ltpa350Section from '@/features/pub/ispl/sections/Ltpa350Section';

export interface LTPA350PageProps {
  memoButtonColor?: 'gray' | 'primary';
  showRenewalCycle?: boolean;
  showContractConversion?: boolean;
}

export default function Page({
  memoButtonColor,
  showRenewalCycle = true,
  showContractConversion = false,
}: LTPA350PageProps = {}) {
  return (
    <Suspense fallback={null}>
      <Ltpa350Section
        memoButtonColor={memoButtonColor}
        showRenewalCycle={showRenewalCycle}
        showContractConversion={showContractConversion}
      />
    </Suspense>
  );
}
