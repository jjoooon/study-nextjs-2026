/**
 * Not Found - 404 에러 처리 컴포넌트
 *
 * @description
 * Next.js App Router의 404 에러 페이지로, 존재하지 않는 URL 경로로 접근하거나
 * Server Component / Server Action에서 notFound() 함수를 호출할 때 렌더링됩니다.
 *
 * @architecture
 * - 활성화 범위: 존재하지 않는 모든 라우트(URL) 및 notFound() 실행 시점
 * - Layout 유지: 루트 layout.tsx 내부에서 렌더링되어 상단/하단 레이아웃이 유지됨
 * - Rendering: Server Component (기본) 또는 Client Component
 *
 * @usage
 * - 잘못된 URL 접근 시 자동 렌더링
 * - 코드 상에서 동적 404 처리:
 *   import { notFound } from 'next/navigation';
 *   if (!data) notFound();
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */

import { Gcol, Typo } from '@atoms';

export default function NotFound() {
  return (
    <Gcol className="min-h-screen">
      <Gcol gap={6}>
        <img src="/images/error_404.svg" alt="404" />
        <Gcol gap={4}>
          <Typo tag="strong" variant={'heading-lg'} icon={'warning'}>
            페이지를 찾을 수 없어요
          </Typo>
          <Typo tag="span" variant={'body-md'} className="text-center leading-[1.5]">
            주소가 잘못되었거나 페이지가 이동 또는 삭제되었을 수 있어요. <br />
            입력한 주소를 다시 확인해 주세요.
          </Typo>
        </Gcol>
      </Gcol>
    </Gcol>
  );
}
