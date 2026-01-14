/**
 * Auth 컴포넌트 Props 타입
 *
 * @description
 * 인증 관련 컴포넌트들의 인터페이스를 정의
 */

import type { ForgotPasswordInput, LoginInput, RegisterInput, ResetPasswordInput } from './api';
import type { AuthUser, LoginFormData, RegisterFormData } from './ui';

// ============================================================================
// LOGIN COMPONENT
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

// ============================================================================
// REGISTER COMPONENT
// ============================================================================

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

// ============================================================================
// FORGOT PASSWORD COMPONENT
// ============================================================================

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

// ============================================================================
// RESET PASSWORD COMPONENT
// ============================================================================

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

// ============================================================================
// AUTH LAYOUT COMPONENT
// ============================================================================

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

// ============================================================================
// PROTECTED ROUTE COMPONENT
// ============================================================================

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

// ============================================================================
// USER MENU COMPONENT
// ============================================================================

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

// ============================================================================
// AUTH PROVIDER COMPONENT
// ============================================================================

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
