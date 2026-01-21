'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { AUTH_ROUTES, MAIN_ROUTES } from '@/shared/constants/routes';
import { useLogoutMutation } from '@/shared/services/authService';
import { selectIsAuthenticated, selectUser } from '@/shared/store/authSelectors';
import { clearCredentials } from '@/shared/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface NavItem {
  name: string;
  href: string;
  description?: string;
}

const navigation: NavItem[] = [
  { name: '홈', href: MAIN_ROUTES.HOME, description: '메인 페이지' },
  { name: '대시보드', href: MAIN_ROUTES.DASHBOARD, description: '사용자 대시보드' },
];

export function Navigation() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Redux auth 상태
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  /**
   * 로그아웃 핸들러
   */
  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(clearCredentials());
      setIsUserMenuOpen(false);
      // 로그아웃 후 메인 페이지로 이동
      window.location.href = MAIN_ROUTES.HOME;
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 및 브랜드 */}
          <div className="flex-shrink-0">
            <Link href={MAIN_ROUTES.HOME} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Next.js App</span>
            </Link>
          </div>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* 데스크톱 인증 메뉴 - 조건부 렌더링 */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {!isAuthenticated ? (
              // 로그인 전: 로그인 버튼
              <Link
                href={AUTH_ROUTES.LOGIN}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                로그인
              </Link>
            ) : (
              // 로그인 후: 사용자 정보 및 로그아웃
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-expanded={isUserMenuOpen}
                >
                  {/* 사용자 아바타 */}
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-base">{user?.name}</span>
                  </div>
                  {/* 사용자 이름 */}
                  <span className="hidden lg:block">{user?.name || '사용자'}</span>
                  {/* 드롭다운 화살표 */}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 사용자 메뉴 드롭다운 */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 모바일 메뉴 버튼 & 인증 메뉴 */}
          <div className="md:hidden flex items-center space-x-2">
            {/* 모바일 인증 메뉴 - 항상 표시 */}
            {!isAuthenticated ? (
              <Link
                href={AUTH_ROUTES.LOGIN}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                로그인
              </Link>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-expanded={isUserMenuOpen}
                >
                  {/* 사용자 아바타 */}
                  <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{user?.name}</span>
                  </div>
                </button>

                {/* 사용자 메뉴 드롭다운 */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 햄버거 메뉴 버튼 */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">메뉴 열기</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.href) ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                  {isActive(item.href) && (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                {item.description && <p className="text-xs text-gray-500 mt-0.5 ml-1">{item.description}</p>}
              </Link>
            ))}
          </div>

          {/* 모바일 인증 메뉴 - 조건부 렌더링 */}
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
            {!isAuthenticated ? (
              // 로그인 전: 로그인 버튼
              <Link
                href={AUTH_ROUTES.LOGIN}
                className="block px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                로그인
              </Link>
            ) : (
              // 로그인 후: 사용자 정보 및 로그아웃
              <>
                <div className="px-4 py-2 bg-gray-50 rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{user?.name}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full text-left px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
