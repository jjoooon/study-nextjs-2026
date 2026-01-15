/**
 * Auth UI 관련 타입
 *
 * @description
 * 인증 관련 UI 상태와 컴포넌트 Props를 정의
 */

import type { ForgotPasswordInput, LoginInput, RegisterInput, ResetPasswordInput } from './api';

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

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

/**
 * LoginForm 컴포넌트 Props
 */
export interface LoginFormProps {
  /** 로딩 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 로그인 성공 핸들러 */
  onLogin: (credentials: LoginInput) => Promise<void>;
  /** 비밀번호 찾기 클릭 핸들러 */
  onForgotPassword?: () => void;
  /** 회원가입 클릭 핸들러 */
  onRegister?: () => void;
  /** 초기 폼 데이터 */
  initialValues?: Partial<LoginFormData>;
}

/**
 * RegisterForm 컴포넌트 Props
 */
export interface RegisterFormProps {
  /** 로딩 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 회원가입 성공 핸들러 */
  onRegister: (userData: RegisterInput) => Promise<void>;
  /** 로그인 페이지로 이동 핸들러 */
  onLogin?: () => void;
  /** 초기 폼 데이터 */
  initialValues?: Partial<RegisterFormData>;
}

/**
 * ForgotPasswordForm 컴포넌트 Props
 */
export interface ForgotPasswordFormProps {
  /** 로딩 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 성공 메시지 */
  successMessage?: string | null;
  /** 비밀번호 찾기 요청 핸들러 */
  onForgotPassword: (data: ForgotPasswordInput) => Promise<void>;
  /** 로그인 페이지로 이동 핸들러 */
  onBackToLogin?: () => void;
}

/**
 * ResetPasswordForm 컴포넌트 Props
 */
export interface ResetPasswordFormProps {
  /** 비밀번호 재설정 토큰 (URL 파라미터) */
  resetToken: string;
  /** 로딩 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 성공 메시지 */
  successMessage?: string | null;
  /** 비밀번호 재설정 핸들러 */
  onResetPassword: (data: ResetPasswordInput) => Promise<void>;
  /** 로그인 페이지로 이동 핸들러 */
  onBackToLogin?: () => void;
}

/**
 * AuthLayout 컴포넌트 Props
 *
 * @description
 * 인증 페이지들의 공통 레이아웃
 */
export interface AuthLayoutProps {
  /** 자식 컴포넌트들 */
  children: React.ReactNode;
  /** 페이지 제목 */
  title?: string;
  /** 부제목 */
  subtitle?: string;
  /** 배경 이미지 URL (선택적) */
  backgroundImage?: string;
}

/**
 * ProtectedRoute 컴포넌트 Props
 */
export interface ProtectedRouteProps {
  /** 자식 컴포넌트 (보호된 페이지) */
  children: React.ReactNode;
  /** 인증되지 않았을 때 리다이렉트할 경로 */
  redirectTo?: string;
  /** 접근이 필요한 역할 (선택적) */
  requiredRoles?: string[];
}

/**
 * UserMenu 컴포넌트 Props
 */
export interface UserMenuProps {
  /** 현재 사용자 정보 */
  user: AuthUser;
  /** 로그아웃 핸들러 */
  onLogout: () => void;
  /** 프로필 클릭 핸들러 */
  onProfile?: () => void;
  /** 설정 클릭 핸들러 */
  onSettings?: () => void;
}

/**
 * AuthProvider 컴포넌트 Props
 */
export interface AuthProviderProps {
  /** 자식 컴포넌트들 */
  children: React.ReactNode;
  /** 초기 인증 상태 (선택적) */
  initialAuthState?: {
    isAuthenticated: boolean;
    user?: AuthUser;
  };
}
