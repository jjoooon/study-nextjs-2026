'use client';

/**
 * Auth Guard - 라우트 보호 컴포넌트
 *
 * @description
 * Redux 인증 상태를 확인하여 인증되지 않은 사용자를 로그인 페이지로 리다이렉트합니다.
 * - 모든 페이지(공개 경로 제외)에 적용되는 라우트 보호
 * - Redux의 isAuthenticated 상태를 신뢰하여 판단
 * - 즉시 리다이렉트하여 최상의 UX 제공 (깜빡임 없음)
 *
 * @architecture
 * - Client Component: Redux 상태 접근을 위해 'use client' 지시어 사용
 * - useEffect: 인증 상태 확인 및 리다이렉트 로직
 * - Early Return: 인증되지 않은 경우 즉시 null 반환 (렌더링 방지)
 *
 * @features
 * - Redux Persist 지원: 페이지 새로고침 후에도 인증 상태 유지
 * - 중앙 집중식 경로 관리: PUBLIC_ROUTES 상수에서 공개 경로 관리
 * - 즉시 리다이렉트: 인증되지 않은 사용자는 바로 로그인 페이지로 이동
 * - 상태 유지: 리다이렉트 시 현재 경로를 query parameter로 전달 (선택 사항)
 *
 * @usage
 * Root Layout에서 사용하여 모든 페이지를 보호:
 * ```tsx
 * import { AuthGuard } from '@/shared/components/auth/AuthGuard';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <AuthGuard>{children}</AuthGuard>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * 공개 경로 추가 방법:
 * ```tsx
 * // @/shared/constants/routes.ts
 * export const PUBLIC_ROUTES = ['/login', '/register', '/about'] as const;
 * ```
 *
 * @see
 * - authSlice: @/features/auth/store/authSlice - 인증 상태 관리
 * - Redux Persist: @/store/config.ts - 상태 지속성 설정
 * - routes: @/shared/constants/routes - 공개 경로 상수
 * - Next.js Routing: https://nextjs.org/docs/app/building-your-application/routing
 */

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isPublicRoute } from '@/shared/constants/routes';
import { useAppSelector } from '@/store/hooks';

/**
 * Auth Guard Component
 *
 * @param children - 보호될 자식 컴포넌트들
 * @returns 인증된 경우 children 렌더링, 인증되지 않은 경우 null (리다이렉트됨)
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Redux 인증 상태 확인
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  /**
   * 인증 상태 확인 및 리다이렉트 로직
   *
   * @description
   * - 인증되지 않은 사용자 + 보호된 경로 → 로그인 페이지로 리다이렉트
   * - 공개 경로는 인증 상태와 상관없이 접근 허용
   * - 즉시 리다이렉트하여 깜빡임 없는 UX 제공
   */
  useEffect(() => {
    // 공개 경로인 경우 체크 통과
    if (isPublicRoute(pathname)) {
      return;
    }

    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    if (!isAuthenticated) {
      // 현재 경로를 query parameter로 전달 (로그인 후 복귀용)
      const returnUrl = encodeURIComponent(pathname);
      router.replace(`/login?returnUrl=${returnUrl}`);
    }
  }, [isAuthenticated, pathname, router]);

  /**
   * 렌더링 로직
   *
   * @description
   * - 인증된 경우: children 렌더링
   * - 인증되지 않은 경우 + 보호된 경로: null 반환 (리다이렉트됨)
   * - 공개 경로: 인증 상태와 상관없이 children 렌더링
   */
  if (!isAuthenticated && !isPublicRoute(pathname)) {
    // 인증되지 않은 보호된 경로: 렌더링하지 않음 (리다이렉트됨)
    return null;
  }

  // 인증된 경우 또는 공개 경로: children 렌더링
  return <>{children}</>;
}
