/**
 * Loading UI - 전역 로딩 상태 컴포넌트
 *
 * @description
 * Next.js App Router의 자동 로딩 UI로, 페이지 전환 및 데이터 로딩 시 사용자에게
 * 피드백을 제공합니다. Suspense Boundary의 fallback으로 자동 활성화됩니다.
 *
 * @architecture
 * - 자동 활성화: 페이지 라우팅 및 데이터 fetching 중 자동 표시
 * - Suspense 통합: React Suspense와 연동된 fallback UI
 * - 계층적 지원: app/loading.tsx (전역) 및 경로별 loading.tsx
 *
 * @features
 * - 스피너 애니메이션: Tailwind animate-spin으로 회전하는 로딩 인디케이터
 * - 반응형 레이아웃: 모든 화면 크기에서 중앙 정렬
 * - 접근성: 시각적 피드백으로 로딩 상태 명확히 전달
 *
 * @usage
 * 자동으로 활성화됩니다:
 * - 페이지 이동 시 (Link 컴포넌트, router.push)
 * - 데이터 fetching 중 (async 컴포넌트)
 * - 서버 컴포넌트 렌더링 대기 중
 *
 * @customization
 * 특정 경로에 전용 로딩 UI를 만들려면:
 * - app/dashboard/loading.tsx 생성 → /dashboard 경로만 적용
 *
 * @important
 * - 'use client' 지시어 불필요 (Server Component로 동작)
 * - 파일명이 'loading.tsx'여야 자동 인식됨
 * - Suspense Boundary가 자동 생성됨
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
 */
import { Gcol, Typo } from '@atoms';
export default function Loading() {
  return (
    <Gcol className="flex items-center justify-center min-h-screen gap-6">
      <div className="relative w-[3rem] h-[3rem] flex items-center justify-center animate-gather-rotate">
        <div
          className="absolute w-[3rem] h-[3rem]  bg-[var(--color-danger-50)] rounded-full z-10 animate-gather-move"
          style={{ '--tx': '0px', '--ty': '-1.5rem' } as React.CSSProperties}
        />

        <div
          className="absolute w-[3rem] h-[3rem] bg-[var(--color-warning-40)] rounded-full z-20 animate-gather-move"
          style={{ '--tx': '-1.3rem', '--ty': '0.75rem' } as React.CSSProperties}
        />

        <div
          className="absolute w-[3rem] h-[3rem] bg-[var(--color-primary-50)] rounded-full z-30 animate-gather-move"
          style={{ '--tx': '1.3rem', '--ty': '0.75rem' } as React.CSSProperties}
        />
      </div>
      <Typo variant={'body-md'}>Loading...</Typo>
    </Gcol>
  );
}
