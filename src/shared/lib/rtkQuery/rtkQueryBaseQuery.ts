/**
 * FetchBaseQuery for RTK Query
 *
 * @description
 * fetchBaseQuery를 기반으로 한 RTK Query 구현
 * - fetch API 사용 (RTK Query 표준 방식)
 * - TypeScript 완벽 호환
 * - RTK Query의 모든 기능 유지
 * - 401 에러 시 자동 토큰 갱신
 *
 * @architecture
 * - fetchBaseQuery 기반: RTK Query 표준 방식
 * - prepareHeaders: 자동 토큰 주입
 * - 타입 안전성: TypeScript 타입 정의
 * - 토큰 갱신: Mutex로 중복 요청 방지
 *
 * @usage
 * import { baseQuery } from '@/shared/lib/rtkQuery/rtkQueryBaseQuery';
 *
 * export const apiSlice = createApi({
 *   baseQuery,
 *   endpoints: (builder) => ({ ... })
 * });
 */

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setCredentials, clearCredentials } from '@/features/auth/store/authSlice';
import type { User } from '@/features/auth/types/storeTypes';
import { publicConfig } from '@/shared/config/env';
import { AUTH_ROUTES } from '@/shared/constants/routes';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Extra Options 타입
 */
interface ReauthExtraOptions {
  skipReauth?: boolean;
}

/**
 * BaseQuery 타입 정의
 */
type BaseQueryType = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, Record<string, unknown>, object>;

// ============================================================================
// MUTEX (중복 토큰 갱신 방지)
// ============================================================================

/**
 * Mutex
 *
 * @description
 * 여러 요청이 동시에 401 에러를 받을 때,
 * 토큰 갱신 요청이 중복되는 것을 방지하기 위한 Mutex
 */
class Mutex {
  private mutex: Promise<() => void> = Promise.resolve(() => {});

  /**
   * Mutex 락 획득
   */
  lock(): Promise<() => void> {
    const current = this.mutex;
    this.mutex = current.then(() => {
      return new Promise<() => void>((resolve) => {
        resolve(() => {});
      });
    });
    return current;
  }
}

const mutex = new Mutex();

// ============================================================================
// BASE QUERY WITH REAUTH (토큰 갱신 지원)
// ============================================================================

/**
 * 내부 fetchBaseQuery 인스턴스
 *
 * @description
 * baseQueryWithReauth 내부에서 사용하는 기본 fetchBaseQuery
 */
const internalBaseQuery = fetchBaseQuery({
  baseUrl: publicConfig.apiUrl,
  // HttpOnly Cookie 자동 전송을 위한 credentials 설정
  credentials: 'include',
  // 토큰 자동 주입 + 쿠키 수동 추가 (MSW 호환)
  prepareHeaders: (headers, { getState }) => {
    // Redux 상태에서 토큰 추출
    const state = getState() as { auth?: { token?: string | null } };
    const token = state.auth?.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    // MSW 테스트를 위해 쿠키를 수동으로 Cookie 헤더에 추가
    if (typeof document !== 'undefined') {
      const cookies = document.cookie;
      if (cookies) {
        headers.set('Cookie', cookies);
      }
    }

    return headers;
  },
});

/**
 * 토큰 갱신을 지원하는 BaseQuery Wrapper
 *
 * @description
 * 401 에러 발생 시 자동으로 토큰 갱신을 시도하고,
 * 원래 요청을 재시도합니다.
 *
 * @flow
 * 1. 요청 실행
 * 2. 401 에러 발생 시
 * 3. skipReauth 체크 (무한 루프 방지)
 * 4. Mutex 락 획득 (중복 갱신 방지)
 * 5. 토큰 갱신 요청
 * 6. 성공 시 Redux 상태 업데이트
 * 7. 원래 요청 재시도
 * 8. 실패 시 로그아웃
 */
export const baseQueryWithReauth: BaseQueryType = async (args, api, extraOptions) => {
  // extraOptions를 ReauthExtraOptions로 캐스팅 (undefined 안전 처리)
  const options = (extraOptions || {}) as ReauthExtraOptions;

  // 1. 초기 요청 시도
  let result = await internalBaseQuery(args, api, extraOptions);

  // 2. 401 에러이고 skipReauth가 아닌 경우
  if (result.error && result.error.status === 401) {
    // 3. skipReauth 옵션 체크 (refreshToken 엔드포인트 등)
    if (options.skipReauth === true) {
      return result;
    }

    // 4. Mutex 락 획득 (중복 갱신 방지)
    const release = await mutex.lock();

    try {
      // 5. 토큰 갱신 시도 (skipReauth 옵션을 true로 설정)
      const refreshResult = await internalBaseQuery({ url: AUTH_ROUTES.TOKEN_REFRESH, method: 'POST' }, api, {
        ...(extraOptions || {}),
        skipReauth: true,
      });

      // 6. 갱신 성공 시
      if (refreshResult.data) {
        // Redux 상태에서 새로운 토큰 추출
        const data = refreshResult.data as { token?: string };
        const newToken = data.token;

        if (newToken) {
          // 현재 Redux 상태의 사용자 정보 유지
          const state = api.getState() as { auth?: { user?: User | null } };
          const currentUser = state.auth?.user ?? null;

          // Redux 상태 업데이트 (토큰만 갱신, 사용자 정보 유지)
          api.dispatch(
            setCredentials({
              token: newToken,
              refreshToken: null,
              user: currentUser, // ✅ 기존 사용자 정보 유지
            })
          );

          // 7. 원래 요청 재시도 (새로운 토큰으로)
          result = await internalBaseQuery(args, api, extraOptions);
        }
      } else {
        // 8. 갱신 실패 시 로그아웃 처리
        api.dispatch(clearCredentials());

        // 쿠키 삭제
        if (typeof document !== 'undefined') {
          document.cookie = 'refreshToken=; Max-Age=0; Path=/';
        }

        // 로그인 페이지로 리다이렉트
        if (typeof window !== 'undefined') {
          window.location.href = AUTH_ROUTES.LOGIN;
        }
      }
    } finally {
      // Mutex 락 해제
      release();
    }
  }

  return result;
};

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * 기본 BaseQuery (토큰 갱신 포함)
 *
 * @description
 * 모든 API service에서 사용하는 기본 baseQuery
 * - 401 에러 시 자동 토큰 갱신
 * - Mutex로 중복 갱신 방지
 * - 갱신 실패 시 자동 로그아웃
 * - skipReauth 옵션으로 갱신 방지 가능
 *
 * @example
 * import { baseQuery } from '@/shared/lib/rtkQuery/rtkQueryBaseQuery';
 *
 * export const myApi = createApi({
 *   baseQuery,
 *   endpoints: (builder) => ({ ... })
 * });
 */
export const baseQuery = baseQueryWithReauth;

/**
 * Default Export
 *
 * @description
 * 토큰 갱신이 포함된 baseQuery가 기본값입니다
 */
export default baseQuery;
