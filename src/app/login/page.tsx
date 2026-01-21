'use client';

/**
 * Login Page
 *
 * @description
 * MSW로 모킹된 인증 API를 사용하는 로그인 페이지
 *
 * @features
 * - 이메일/비밀번호 로그인
 * - accessToken은 Redux 상태로 관리
 * - refreshToken은 HttpOnly Cookie로 자동 설정
 * - 로그인 성공 시 returnUrl 또는 메인 페이지로 리다이렉트
 * - 폼 유효성 검사
 *
 * @test
 * - 테스트 계정: test@example.com / password123
 */

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation } from '@/shared/services/authService';
import { setCredentials, setError } from '@/shared/store/authSlice';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');

  // returnUrl 쿼리 파라미터 추출 (AuthGuard에서 전달됨)
  const returnUrl = searchParams.get('returnUrl');

  /**
   * 로그인 핸들러
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 로그인 API 호출
      const result = await login({ email, password }).unwrap();

      // Redux 상태 업데이트
      // - accessToken과 user 정보만 저장
      // - refreshToken은 HttpOnly Cookie로 자동 설정됨
      dispatch(
        setCredentials({
          token: result.token,
          refreshToken: null, // 쿠키에서 관리하므로 Redux에 저장하지 않음
          user: result.user,
        })
      );

      // returnUrl이 있으면 해당 경로로, 없으면 메인 페이지로 리다이렉트
      const redirectPath = returnUrl ? decodeURIComponent(returnUrl) : '/';
      router.push(redirectPath);
    } catch (error) {
      // 에러 처리
      const errorMessage = error instanceof Error ? error.message : '로그인에 실패했습니다.';
      dispatch(setError(errorMessage));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-md">
        {/* 헤더 */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">로그인</h2>
        </div>

        {/* 로그인 폼 */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            {/* 이메일 입력 */}
            <div>
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-t-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="이메일 주소"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-b-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="비밀번호"
              />
            </div>
          </div>

          {/* 로그인 버튼 */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </div>

          {/* 테스트 정보 안내 */}
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">테스트 안내</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>이 로그인 기능은 MSW(Mock Service Worker)로 모킹된 API를 사용합니다.</p>
                  <ul className="mt-1 list-disc list-inside">
                    <li>이메일: test@example.com</li>
                    <li>비밀번호: password123</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
