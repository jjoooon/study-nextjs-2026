/**
 * Auth API 관련 타입
 *
 * @description
 * 인증 API 요청/응답 타입을 정의
 */

// ============================================================================
// REQUEST TYPES
// ============================================================================

/**
 * 로그인 요청 페이로드
 */
export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * 회원가입 요청 페이로드
 */
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

/**
 * 토큰 갱신 요청 페이로드
 */
export interface RefreshTokenInput {
  refreshToken: string;
}

/**
 * 비밀번호 변경 요청 페이로드
 */
export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

/**
 * 프로필 수정 요청 페이로드
 */
export interface UpdateProfileInput {
  name?: string;
  email?: string;
  avatar?: string;
  phone?: string;
}

/**
 * 비밀번호 찾기 요청 페이로드
 */
export interface ForgotPasswordInput {
  email: string;
}

/**
 * 비밀번호 재설정 요청 페이로드
 */
export interface ResetPasswordInput {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * 인증 응답
 *
 * @description
 * 로그인/회원가입 등 인증 성공 시 서버가 반환하는 데이터
 */
export interface AuthResponse {
  /** 액세스 토큰 (JWT) */
  token: string;
  /** 리프레시 토큰 */
  refreshToken: string;
  /** 사용자 정보 */
  user: {
    id: string;
    email: string;
    name: string;
    role?: string;
    avatar?: string;
  };
  /** 토큰 만료 시간 (초) */
  expiresIn?: number;
}

/**
 * 사용자 프로필 응답
 *
 * @description
 * 사용자 상세 정보 조회 응답
 */
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role?: string;
  avatar?: string;
  phone?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * 토큰 갱신 응답
 */
export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * 비밀번호 찾기 응답
 */
export interface ForgotPasswordResponse {
  message: string;
  /** 재설정 토큰 유효 시간 (초) */
  resetTokenExpiresIn?: number;
}

/**
 * 비밀번호 재설정 응답
 */
export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

// ============================================================================
// API ERROR TYPES
// ============================================================================

/**
 * 인증 API 에러 응답
 */
export interface AuthErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
}

/**
 * 인증 API 공통 응답 타입
 */
export type AuthApiResponse<T = unknown> =
  | {
      success: true;
      data: T;
      message?: string;
      timestamp: string;
    }
  | AuthErrorResponse;
