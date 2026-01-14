/**
 * Auth UI 관련 타입
 *
 * @description
 * 인증 관련 UI 상태와 컴포넌트 구조를 정의
 */

// ============================================================================
// USER TYPES
// ============================================================================

/**
 * 인증된 사용자 정보
 *
 * @description
 * 애플리케이션에서 사용자 정보를 표현하는 인터페이스
 */
export interface AuthUser {
  /** 사용자 고유 ID (null = 미인증) */
  id: string | null;
  /** 사용자 이름 (null = 미인증) */
  name: string | null;
  /** 사용자 이메일 (null = 미인증) */
  email: string | null;
  /** 사용자 역할 (선택적) */
  role?: UserRole;
  /** 프로필 이미지 URL (선택적) */
  avatar?: string;
  /** 전화번호 (선택적) */
  phone?: string;
}

/**
 * 사용자 역할 유형
 */
export type UserRole = 'admin' | 'user' | 'moderator' | 'guest';

// ============================================================================
// AUTH UI STATE TYPES
// ============================================================================

/**
 * 인증 UI 상태
 *
 * @description
 * 인증 관련 UI의 로딩, 에러 등을 정의
 */
export interface AuthUIState {
  /** 현재 인증 단계 */
  currentStep: 'login' | 'register' | 'forgot-password' | 'reset-password';
  /** 로딩 중 여부 */
  isLoading: boolean;
  /** 에러 메시지 */
  error: string | null;
  /** 성공 메시지 */
  successMessage: string | null;
  /** 이메일 인증 여부 */
  isEmailVerified: boolean;
}

// ============================================================================
// FORM TYPES
// ============================================================================

/**
 * 로그인 폼 상태
 */
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * 회원가입 폼 상태
 */
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms?: boolean;
}

/**
 * 비밀번호 찾기 폼 상태
 */
export interface ForgotPasswordFormData {
  email: string;
}

/**
 * 비밀번호 재설정 폼 상태
 */
export interface ResetPasswordFormData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
