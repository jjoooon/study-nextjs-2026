/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Suspense } from 'react';
import Ltpa350Section from '@/features/pub/ispl/sections/Ltpa350Section';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Ltpa350Section />
    </Suspense>
  );
}
