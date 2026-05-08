/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

/**
 * Dialog Renderer (동적 로딩)
 *
 * @description
 * - 팝업 타입에 따라 컴포넌트를 렌더링
 * - 미리 정의된 팝업 맵에서 컴포넌트 조회
 * - Registry의 loader를 실행하여 컴포넌트 로드
 *
 * @architecture
 * 1. popupType → Registry에서 loader 조회
 * 2. useEffect로 컴포넌트 동적 로드 및 상태 저장
 * 3. 로딩 중이면 Fallback 표시
 * 4. 컴포넌트 렌더링
 *
 * @performance
 * - useMemo로 loader 캐싱 (불필요한 재조회 방지)
 */

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { PopupInstance } from '@/shared/store/popupSlice';
import { removePopup } from '@/shared/store/popupSlice';
import { getDialogLoader } from '@/shared/utils/popup/popupRegistry';

type DialogRendererProps = Omit<PopupInstance, 'zIndex'>;

/**
 * Dialog 렌더러 컴포넌트
 *
 * @param props - 팝업 인스턴스 정보
 */
export function DialogRenderer({ id, popupType, props }: DialogRendererProps) {
  const dispatch = useDispatch();
  const [Component, setComponent] = useState<React.ComponentType<Record<string, unknown>> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Registry에서 로더 조회 (메모이제이션으로 최적화)
  const loader = useMemo(() => getDialogLoader(popupType), [popupType]);

  // 컴포넌트 동적 로드
  useEffect(() => {
    if (!loader) {
      setError(new Error(`Dialog not found: ${popupType}. Please register it in popup-registry.ts`));
      return;
    }

    let isMounted = true;

    loader()
      .then((module) => {
        if (isMounted) {
          const mod = module as { default: React.ComponentType<Record<string, unknown>> };
          setComponent(() => mod.default);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [popupType, loader]);

  /**
   * Promise resolve 핸들러
   *
   * @param result - 팝업에서 반환할 결과 값
   */
  const resolve = (result?: unknown) => {
    dispatch(removePopup({ popupId: id, result }));
  };

  // 에러 처리
  if (error) {
    return (
      <div className="fixed inset-0 z-1000 flex items-center justify-center">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50" />
        {/* Error Content */}
        <div className="relative z-10 bg-white rounded-lg p-6 shadow-lg">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  // 컴포넌트가 아직 로드되지 않음
  if (!Component) {
    return <DialogLoadingFallback />;
  }

  return (
    <Suspense fallback={<DialogLoadingFallback />}>
      <Component {...props} resolve={resolve} />
    </Suspense>
  );
}

/**
 * Dialog 로딩 Fallback
 */
function DialogLoadingFallback() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        <p className="mt-2 text-sm text-gray-600">로딩 중...</p>
      </div>
    </div>
  );
}
