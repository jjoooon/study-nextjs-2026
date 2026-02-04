import { useState, useCallback, useEffect, useMemo, useRef } from 'react';

/**
 * 함수 파이프라인 Hook
 *
 * 복잡한 데이터 처리 로직을 순차적으로 실행하고 관리할 수 있습니다.
 *
 * @example
 * ```tsx
 * const pipeline = useDataPipeline([
 *   {
 *     label: 'Fetch User',
 *     fn: async () => {
 *       const response = await fetch('/api/user');
 *       return response.json();
 *     },
 *   },
 *   {
 *     label: 'Fetch Analytics',
 *     fn: async (results) => {
 *       const [user] = results;
 *       const response = await fetch(`/api/analytics/${user.id}`);
 *       return response.json();
 *     },
 *   },
 *   {
 *     label: 'Calculate Score',
 *     fn: (results) => {
 *       const [user, analytics] = results;
 *       return { score: user.score * analytics.multiplier };
 *     },
 *   },
 * ]);
 * ```
 */

// 타입 정의
type PipelineStep<T = unknown, R = unknown> = {
  /** 고유 ID (동적 관리용) */
  id?: string;

  /** 실행할 함수 (동기 또는 비동기) */
  fn: (prevResults: unknown[], context: Record<string, unknown>) => T | Promise<T>;

  /** 함수에 전달할 추가 인자 */
  fnArgs?: Record<string, unknown>;

  /** 실행 조건 (false면 스텝 건너뜀) */
  condition?: (prevResults: unknown[], context: Record<string, unknown>) => boolean;

  /** 성공 콜백 */
  onSuccess?: (data: R, allResults: unknown[], context: Record<string, unknown>) => void | Promise<void>;

  /** 에러 콜백 */
  onError?: (error: unknown) => void;

  /** 데이터 변환 함수 */
  transform?: (data: T) => R;

  /** 실행 컨텍스트 (단계 간 데이터 공유) */
  context?: Record<string, unknown>;

  /** 실행 여부 (false면 자동 실행 안 함) */
  execute?: boolean;

  /** 스텝 라벨 (디버깅/표시용) */
  label?: string;

  /** 스텝 설명 */
  description?: string;
};

export type { PipelineStep };

/**
 * 데이터 파이프라인 Hook
 *
 * 일반 함수들을 순차적으로 실행하여 복잡한 데이터 처리 파이프라인을 구성할 수 있습니다.
 *
 * @param initialSteps - 초기 스텝 배열
 * @returns 파이프라인 상태 및 조작 메서드
 */
// 안전한 ID 생성기
let stepIdCounter = 0;
const generateStepId = () => `step-${Date.now()}-${++stepIdCounter}`;

export function useDataPipeline(initialSteps: PipelineStep[] = []) {
  const [steps, setSteps] = useState<PipelineStep[]>(
    initialSteps.map((step) => ({
      ...step,
      id: step.id || generateStepId(),
      execute: step.execute ?? true,
    }))
  );

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [results, setResults] = useState<unknown[]>([]);
  const [errors, setErrors] = useState<unknown[]>([]);
  const [context, setContext] = useState<Record<string, unknown>>({});
  const [executedStepIds, setExecutedStepIds] = useState<Set<string>>(new Set());

  // Ref로 최신 값 참조 (무한 루프 방지)
  const stepsRef = useRef(steps);
  const resultsRef = useRef(results);
  const contextRef = useRef(context);
  const executedStepIdsRef = useRef(executedStepIds);

  // State 변경 시 Ref 업데이트
  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  useEffect(() => {
    resultsRef.current = results;
  }, [results]);

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  useEffect(() => {
    executedStepIdsRef.current = executedStepIds;
  }, [executedStepIds]);

  // 스텝 처리 로직
  useEffect(() => {
    let cancelled = false;

    const processStep = async (stepIndex: number) => {
      // Ref를 통해 최신 값 참조
      const currentSteps = stepsRef.current;
      const currentResults = resultsRef.current;
      const currentContext = contextRef.current;
      const currentExecutedStepIds = executedStepIdsRef.current;

      if (cancelled || stepIndex >= currentSteps.length) return;

      const step = currentSteps[stepIndex];

      // fn이 없으면 건너뜀
      if (!step.fn) {
        if (!cancelled) setCurrentStepIndex((prev) => prev + 1);
        return;
      }

      try {
        // 조건 체크
        if (step.condition && !step.condition(currentResults, currentContext)) {
          if (!cancelled) setCurrentStepIndex((prev) => prev + 1);
          return;
        }

        // 실행 여부 체크
        const shouldExecute = step.execute !== false;

        if (!shouldExecute) {
          if (!cancelled) setCurrentStepIndex((prev) => prev + 1);
          return;
        }

        // 이미 실행된 스텝인지 체크
        if (currentExecutedStepIds.has(step.id!)) {
          if (!cancelled) setCurrentStepIndex((prev) => prev + 1);
          return;
        }

        // 함수 실행
        const result: unknown = await step.fn(currentResults, {
          ...currentContext,
          ...step.fnArgs,
        });

        // 실행 기록 저장
        if (!cancelled) {
          setExecutedStepIds((prev) => new Set(prev).add(step.id!));
        }

        // 결과 변환
        const transformed = step.transform?.(result) ?? result;

        // 성공 콜백
        await step.onSuccess?.(transformed, currentResults, currentContext);

        // 결과 및 컨텍스트 저장
        if (!cancelled) {
          setResults((prev) => [...prev, transformed]);

          if (step.context) {
            setContext((prev) => ({ ...prev, ...step.context }));
          }

          setCurrentStepIndex((prev) => prev + 1);
        }
      } catch (error) {
        if (!cancelled) {
          step.onError?.(error);
          setErrors((prev) => [...prev, error]);
          setCurrentStepIndex((prev) => prev + 1);
        }
      }
    };

    processStep(currentStepIndex);

    return () => {
      cancelled = true;
    };
  }, [currentStepIndex]); // 오직 currentStepIndex만 의존성

  // ========== 스텝 조작 메서드 ==========

  /**
   * 단일 스텝 추가
   * @param step - 추가할 스텝
   * @param options - 옵션
   * @returns 추가된 스텝의 ID
   */
  const addStep = useCallback(
    (
      step: PipelineStep,
      options?: {
        /** 특정 위치에 삽입 (기본: 끝) */
        at?: number;
        /** 즉시 실행 여부 */
        executeImmediately?: boolean;
      }
    ) => {
      const newStep: PipelineStep = {
        ...step,
        id: step.id || generateStepId(),
        execute: step.execute ?? true,
      };

      setSteps((prev) => {
        if (options?.at !== undefined) {
          const newSteps = [...prev];
          newSteps.splice(options.at, 0, newStep);
          return newSteps;
        }
        return [...prev, newStep];
      });

      if (options?.executeImmediately) {
        setCurrentStepIndex(options?.at ?? steps.length);
      }

      return newStep.id;
    },
    [steps]
  );

  /**
   * 여러 스텝 한 번에 추가
   * @param newSteps - 추가할 스텝 배열
   * @param options - 옵션
   * @returns 추가된 스텝 ID 배열
   */
  const addSteps = useCallback(
    (
      newSteps: PipelineStep[],
      options?: {
        at?: number;
        executeImmediately?: boolean;
      }
    ) => {
      const stepsWithIds = newSteps.map((step) => ({
        ...step,
        id: step.id || generateStepId(),
        execute: step.execute ?? true,
      }));

      setSteps((prev) => {
        if (options?.at !== undefined) {
          const updated = [...prev];
          updated.splice(options.at, 0, ...stepsWithIds);
          return updated;
        }
        return [...prev, ...stepsWithIds];
      });

      if (options?.executeImmediately) {
        setCurrentStepIndex(options?.at ?? steps.length);
      }

      return stepsWithIds.map((s) => s.id);
    },
    [steps]
  );

  /**
   * 스텝 제거
   * @param stepIdOrIndex - 스텝 ID 또는 인덱스
   */
  const removeStep = useCallback((stepIdOrIndex: string | number) => {
    setSteps((prev) => {
      const index = typeof stepIdOrIndex === 'string' ? prev.findIndex((s) => s.id === stepIdOrIndex) : stepIdOrIndex;

      if (index === -1) return prev;

      const removedStep = prev[index];
      const newSteps = prev.filter((_, i) => i !== index);

      // 결과도 제거
      setResults((prevResults) => prevResults.filter((_, i) => i !== index));

      // 실행 기록에서도 제거
      if (removedStep.id) {
        setExecutedStepIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(removedStep.id!);
          return newSet;
        });
      }

      // 현재 인덱스 조정
      setCurrentStepIndex((current) => {
        if (index < current) return current - 1;
        if (index === current) return Math.max(0, current - 1);
        return current;
      });

      return newSteps;
    });
  }, []);

  /**
   * 스텝 교체
   * @param stepIdOrIndex - 스텝 ID 또는 인덱스
   * @param newStep - 새 스텝
   */
  const replaceStep = useCallback((stepIdOrIndex: string | number, newStep: PipelineStep) => {
    setSteps((prev) => {
      const index = typeof stepIdOrIndex === 'string' ? prev.findIndex((s) => s.id === stepIdOrIndex) : stepIdOrIndex;

      if (index === -1) return prev;

      const newSteps = [...prev];
      newSteps[index] = {
        ...newStep,
        id: typeof stepIdOrIndex === 'string' ? stepIdOrIndex : newStep.id,
      };

      // 실행 기록 초기화 (재실행 위해)
      setExecutedStepIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(newSteps[index].id!);
        return newSet;
      });

      return newSteps;
    });

    // 해당 위치부터 재실행
    if (typeof stepIdOrIndex === 'number') {
      setCurrentStepIndex(stepIdOrIndex);
      setResults((prev) => prev.slice(0, stepIdOrIndex));
    }
  }, []);

  /**
   * 특정 범위의 스텝 제거
   * @param startIndex - 시작 인덱스
   * @param endIndex - 끝 인덱스
   */
  const removeStepsInRange = useCallback((startIndex: number, endIndex: number) => {
    setSteps((prev) => {
      const newSteps = prev.filter((_, i) => i < startIndex || i > endIndex);

      setResults((prevResults) => prevResults.filter((_, i) => i < startIndex || i > endIndex));

      setCurrentStepIndex((current) => {
        if (endIndex < current) return current - (endIndex - startIndex + 1);
        if (startIndex <= current && current <= endIndex) return startIndex;
        return current;
      });

      return newSteps;
    });
  }, []);

  /**
   * 모든 스텝 제거
   * @param keepInitial - 초기 스텝 유지 여부
   */
  const clearSteps = useCallback(
    (keepInitial = false) => {
      if (keepInitial) {
        setSteps(
          initialSteps.map((step) => ({
            ...step,
            id: step.id || generateStepId(),
            execute: step.execute ?? true,
          }))
        );
        setResults((prev) => prev.slice(0, initialSteps.length));
      } else {
        setSteps([]);
        setResults([]);
      }
      setErrors([]);
      setContext({});
      setExecutedStepIds(new Set());
      setCurrentStepIndex(0);
    },
    [initialSteps]
  );

  /**
   * 스텝 이동 (순서 변경)
   * @param fromIndex - 원래 인덱스
   * @param toIndex - 이동할 인덱스
   */
  const moveStep = useCallback((fromIndex: number, toIndex: number) => {
    setSteps((prev) => {
      const newSteps = [...prev];
      const [removed] = newSteps.splice(fromIndex, 1);
      newSteps.splice(toIndex, 0, removed);

      // 결과도 같이 이동
      setResults((prevResults) => {
        const newResults = [...prevResults];
        const [result] = newResults.splice(fromIndex, 1);
        newResults.splice(toIndex, 0, result);
        return newResults;
      });

      // 이동한 스텝의 실행 기록 제거 (재실행 위해)
      if (removed.id) {
        setExecutedStepIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(removed.id!);
          return newSet;
        });
      }

      setCurrentStepIndex(toIndex);

      return newSteps;
    });
  }, []);

  /**
   * 조건으로 스텝 필터링
   * @param predicate - 필터링 조건 함수
   */
  const filterSteps = useCallback(
    (predicate: (step: PipelineStep, index: number) => boolean) => {
      setSteps((prev) => {
        const filtered = prev.filter(predicate);

        // 결과 매핑
        const newResults: unknown[] = [];
        prev.forEach((step, index) => {
          if (predicate(step, index)) {
            newResults.push(results[index]);
          }
        });
        setResults(newResults);

        return filtered;
      });
    },
    [results]
  );

  /**
   * 특정 스텝 찾기
   * @param predicate - 찾기 조건 함수
   * @returns 찾은 스텝 또는 undefined
   */
  const findStep = useCallback(
    (predicate: (step: PipelineStep, index: number) => boolean) => {
      return steps.find(predicate);
    },
    [steps]
  );

  // ========== 실행 메서드 ==========

  /**
   * 스텝 실행 (수동 트리거)
   * @param stepIdOrIndex - 스텝 ID 또는 인덱스
   * @param args - 함수에 전달할 추가 인자
   */
  const executeStep = useCallback((stepIdOrIndex: string | number, args?: Record<string, unknown>) => {
    setSteps((prev) => {
      const index = typeof stepIdOrIndex === 'string' ? prev.findIndex((s) => s.id === stepIdOrIndex) : stepIdOrIndex;

      if (index === -1) return prev;

      const newSteps = [...prev];
      newSteps[index] = {
        ...newSteps[index],
        execute: true,
        fnArgs: args,
      };

      // 실행 기록에서 제거하여 재실행
      setExecutedStepIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(newSteps[index].id!);
        return newSet;
      });

      setCurrentStepIndex(index);
      return newSteps;
    });
  }, []);

  /**
   * 실행 상태 초기화 (재실행)
   * @param fromIndex - 시작 인덱스 (기본: 0)
   */
  const resetExecution = useCallback((fromIndex = 0) => {
    setCurrentStepIndex(fromIndex);
    setResults((prev) => prev.slice(0, fromIndex));
    setErrors([]);
    setExecutedStepIds(new Set());

    setSteps((prev) =>
      prev.map((step, index) => {
        if (index < fromIndex) return step;
        return {
          ...step,
          execute: step.execute ?? true,
        };
      })
    );
  }, []);

  /**
   * 완전 초기화
   */
  const reset = useCallback(() => {
    setCurrentStepIndex(0);
    setResults([]);
    setErrors([]);
    setContext({});
    setExecutedStepIds(new Set());

    setSteps((prev) =>
      prev.map((step) => ({
        ...step,
        execute: step.execute ?? true,
      }))
    );
  }, []);

  // 파이프라인 통계 (최적화됨)
  const stats = useMemo(() => {
    const totalSteps = steps.length;
    const completedSteps = results.filter((r) => r !== undefined && r !== null).length;

    return {
      totalSteps,
      completedSteps,
      hasErrors: errors.length > 0,
    };
  }, [steps, results, errors]);

  return {
    // 상태
    steps,
    results,
    errors,
    context,
    isComplete: currentStepIndex >= steps.length,
    currentStep: currentStepIndex,
    stats,

    // 조작 메서드
    addStep,
    addSteps,
    removeStep,
    removeStepsInRange,
    replaceStep,
    moveStep,
    filterSteps,
    clearSteps,
    findStep,

    // 실행 메서드
    executeStep,
    resetExecution,
    reset,
  };
}

export type UseDataPipelineReturn = ReturnType<typeof useDataPipeline>;
