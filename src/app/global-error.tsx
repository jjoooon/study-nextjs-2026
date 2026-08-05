/**
 * Global Error Boundary - 전역 에러 핸들링 컴포넌트
 *
 * @description
 * Next.js App Router의 최후 에러 방어선으로, 루트 layout을 포함한 전체 애플리케이션에서
 * 발생하는 치명적 에러를 캐치합니다. layout.tsx 자체에서 에러가 발생할 때만 활성화되며,
 * 전체 HTML을 새로 렌더링합니다.
 *
 * @architecture
 * - 활성화 범위: 전체 애플리케이션 (layout.tsx 포함)
 * - 최후의 방어선: error.tsx로 처리되지 않는 치명적 에러만 담당
 * - 완전한 리셋: <html>, <body> 태그를 직접 제공해야 함
 *
 * @usage
 * 자동으로 에러를 캐치하므로 직접 호출할 필요가 없습니다.
 * - layout.tsx에서 발생한 에러만 처리
 * - 일반 페이지 에러는 error.tsx가 우선 처리
 * - 거의 발생하지 않는 상황 대비 (레이아웃 시스템 crash 등)
 *
 * @props
 * - error: Error 객체와 digest(에러 해시값)
 * - reset: 에러 상태를 초기화하고 전체 앱을 재시작하는 함수
 *
 * @important
 * 이 컴포넌트는 반드시 <html> 및 <body> 태그를 포함해야 합니다.
 * 루트 layout을 완전히 대체하므로 전체 HTML 구조를 제공해야 합니다.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */

'use client';

import { useEffect } from 'react';
import log from '@/shared/utils/logger';
import { withPublicUrl } from '@/shared/utils/url/publicUrl';
import { Gcol, Typo } from '@atoms';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const logger = log.getLogger('Global');

export default function GlobalError({ error }: GlobalErrorProps) {
  useEffect(() => {
    // Log critical errors to error reporting service
    logger.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <Gcol className="min-h-screen">
          <Gcol gap={6}>
            <img src={withPublicUrl('/images/error.svg')} alt="error" />
            <Gcol gap={4}>
              <Typo tag="strong" variant={'heading-lg'} icon={'warning'} className="text-[#000]">
                일시적인 오류가 발생했어요
              </Typo>
              <Typo tag="span" color={'gray'} variant={'body-md'} className="text-center leading-[1.5]">
                요청을 처리하는 중 문제가 발생했어요.
                <br />
                잠시 후 다시 시도해 주세요.
              </Typo>
            </Gcol>
          </Gcol>
        </Gcol>
      </body>
    </html>
  );
}
