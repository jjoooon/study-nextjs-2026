/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Suspense } from 'react';
import Ltpa350Section from '@/features/pub/ispl/sections/Ltpa350Section';

export interface LTPA350PageProps {
  buttonImageSrc?: string;
  borderWidth?: number | string;
}

export default function Page({ buttonImageSrc, borderWidth }: LTPA350PageProps = {}) {
  return (
    <Suspense fallback={null}>
      <Ltpa350Section buttonImageSrc={buttonImageSrc} borderWidth={borderWidth} />
    </Suspense>
  );
}
