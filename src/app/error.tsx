/**
 * Error Boundary - 루트 에러 핸들링 컴포넌트
 *
 * @description
 * Next.js App Router의 에러 바운더리로, 루트 layout 하위에서 발생하는 에러를 캐치하여
 * 사용자에게 친화적인 에러 UI를 제공합니다. layout.tsx는 유지되며 page.tsx 및
 * 그 하위 컴포넌트에서 발생한 에러만 처리합니다.
 *
 * @architecture
 * - 활성화 범위: layout.tsx 하위의 모든 페이지 및 컴포넌트
 * - Layout 유지: 에러 발생 시에도 루트 layout은 정상 렌더링
 * - 계층적 처리: 하위 경로의 error.tsx가 우선적용됨
 *
 * @usage
 * 자동으로 에러를 캐치하므로 직접 호출할 필요가 없습니다.
 * - page.tsx에서 throw new Error() 발생 시 자동 활성화
 * - 데이터 fetching 에러 자동 처리
 * - 컴포넌트 렌더링 에러 자동 처리
 *
 * @props
 * - error: Error 객체와 digest(에러 해시값)
 * - reset: 에러 상태를 초기화하고 페이지를 재시도하는 함수
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */

'use client';

import { useEffect } from 'react';
import log from '@/shared/utils/logger';
import { Gcol, Typo } from '@atoms';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const logger = log.getLogger('Global');

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error('Application error:', error);
  }, [error]);

  return (
    <Gcol className="min-h-screen">
      <Gcol gap={6}>
        <img src="/images/error.svg" alt="error" />
        <Gcol gap={4}>
          <Typo tag="strong" variant={'heading-lg'} icon={'warning'}>
            일시적인 오류가 발생했어요
          </Typo>
          <Typo tag="span" variant={'body-md'} className="text-center leading-[1.5]">
            요청을 처리하는 중 문제가 발생했어요.
            <br />
            잠시 후 다시 시도해 주세요.
          </Typo>
        </Gcol>
      </Gcol>
    </Gcol>
  );
}
