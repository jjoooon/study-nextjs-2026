'use client';

import { useEffect, useState } from 'react';

/**
 * URL 쿼리값(`activeStep`, `step`)을 읽어 현재 페이지의 step 상태와 동기화하는 공통 훅.
 *
 * 역할
 * - 최초 렌더 시 URL의 step 값을 파싱해 `activeStep`에 반영
 * - 브라우저 뒤로가기/앞으로가기(`popstate`) 시 step 상태를 다시 동기화
 * - 화면별 step 범위 검증은 `isValidStep` 타입가드로 위임하여 타입 안정성 유지
 *
 * 사용 예
 * - PageProcess(1~6 단계)처럼 쿼리 기반으로 화면 단계를 제어하는 페이지 공통 로직
 */
interface UseStepFromQueryParams<TStep extends number> {
  defaultStep: TStep;
  isValidStep: (value: number) => value is TStep;
  queryKeys?: readonly string[];
}

const DEFAULT_QUERY_KEYS = ['activeStep', 'step'] as const;

export function useStepFromQuery<TStep extends number>({
  defaultStep,
  isValidStep,
  queryKeys = DEFAULT_QUERY_KEYS,
}: UseStepFromQueryParams<TStep>) {
  const [activeStep, setActiveStep] = useState<TStep>(defaultStep);

  useEffect(() => {
    const parseStepParam = (value: string | null): TStep | null => {
      if (!value) return null;

      const parsed = Number(value);
      if (!Number.isInteger(parsed)) return null;
      if (!isValidStep(parsed)) return null;

      return parsed;
    };

    const syncStepFromUrl = () => {
      const params = new URLSearchParams(window.location.search);

      for (const queryKey of queryKeys) {
        const parsedStep = parseStepParam(params.get(queryKey));
        if (parsedStep) {
          setActiveStep(parsedStep);
          return;
        }
      }
    };

    syncStepFromUrl();
    window.addEventListener('popstate', syncStepFromUrl);

    return () => {
      window.removeEventListener('popstate', syncStepFromUrl);
    };
  }, [isValidStep, queryKeys]);

  return { activeStep, setActiveStep };
}
