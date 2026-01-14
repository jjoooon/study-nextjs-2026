/**
 * Auth Store 상태 타입
 *
 * @description
 * Redux Slice 상태 구조와 액션 Payload 타입을 정의
 */

import type { AuthUser } from './ui';

// ============================================================================
// STATE TYPES
// ============================================================================

/**
 * Auth Redux 상태
 *
 * @description
 * 인증 상태를 관리하는 Redux 상태 구조
 *
 * @note
 * - token: 메모리에만 저장 (보안 위해 persist에서 제외)
 * - isAuthenticated: 지속성 저장 (세션 유지용)
 * - user: 지속성 저장 (사용자 정보)
 */
export interface AuthState {
  /** 인증 여부 (지속성) */
  isAuthenticated: boolean;
  /** 사용자 정보 (지속성) */
  user: AuthUser;
  /** 액세스 토큰 (비지속성, 메모리만) */
  token: string | null;
  /** 로딩 상태 */
  isLoading: boolean;
  /** 에러 메시지 */
  error: string | null;
}

/**
 * 초기 Auth 상태
 */
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: {
    id: null,
    name: null,
    email: null,
  },
  token: null,
  isLoading: false,
  error: null,
};

// ============================================================================
// ACTION PAYLOAD TYPES
// ============================================================================

/**
 * 로그인 시작 액션 (Payload 없음)
 */

/**
 * 로그인 성공 액션 Payload
 */
export interface LoginSuccessPayload {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

/**
 * 로그인 실패 액션 Payload
 */
export interface LoginFailurePayload {
  error: string;
}

/**
 * 로그아웃 액션 (Payload 없음)
 */

/**
 * 에러 초기화 액션 (Payload 없음)
 */

// ============================================================================
// SELECTOR PARAMETER TYPES
// ============================================================================

/**
 * 인증 상태 요약
 */
export interface AuthStatusSummary {
  isAuthenticated: boolean;
  isLoading: boolean;
  hasError: boolean;
  userId: string | null;
  userName: string | null;
  userRole: string | undefined;
}

/**
 * 세션 유효성 정보
 */
export interface SessionValidity {
  isValid: boolean;
  hasToken: boolean;
  isExpired: boolean;
  timeUntilExpiry: number | null; // 만료까지 남은 시간 (밀리초)
}
