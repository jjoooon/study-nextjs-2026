'use client';

import { useRef, ReactNode } from 'react';
import { hydrateBizcode } from '@/shared/utils/bizcodeUtils';
import type { BizcodeDataResult } from '@/shared/utils/bizcodeUtils';

// ============================================================================
// StoreHydrator (클라이언트 컴포넌트)
// - SSR layout에서 fetchBizcode로 조회한 결과를 전달받아
// - hydrateBizcode()로 window.bizCodes에 저장
// ============================================================================

interface StoreHydratorProps {
  bizcodeData: BizcodeDataResult;
  children: ReactNode;
}

export function StoreHydrator({ bizcodeData, children }: StoreHydratorProps) {
  const isHydrated = useRef(false);

  // 최초 렌더링 시 즉시 hydration (useEffect 전에 동기적으로 실행)
  if (!isHydrated.current && typeof window !== 'undefined') {
    hydrateBizcode(bizcodeData);
    isHydrated.current = true;
  }

  return <>{children}</>;
}
