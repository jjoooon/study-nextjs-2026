/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Suspense } from 'react';
import Ltpa350Section, { type Ltpa350ProcessStep } from '@/features/pub/ispl/sections/Ltpa350Section';

export interface LTPA350PageProps {
  showRenewalCycle?: boolean;
  showContractConversion?: boolean;
  initialStep?: Ltpa350ProcessStep;
  isSubmitted?: boolean;
}

export default function Page({
  showRenewalCycle = true,
  showContractConversion = false,
  initialStep,
  isSubmitted,
}: LTPA350PageProps = {}) {
  return (
    <Suspense fallback={null}>
      <Ltpa350Section
        showRenewalCycle={showRenewalCycle}
        showContractConversion={showContractConversion}
        initialStep={initialStep}
        isSubmitted={isSubmitted}
      />
    </Suspense>
  );
}
