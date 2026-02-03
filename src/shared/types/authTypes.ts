/**
 * 사용자 정보 타입
 */
export interface User {
  id: number;
  employeeId: string; // 사번
  name: string;
  role: string;
}

/**
 * 인증 상태 타입
 */
export interface AuthState {
  /** 현재 로그인된 사용자 정보 */
  user: User | null;
  /** 인증 여부 */
  isAuthenticated: boolean;
  /** 로딩 상태 */
  isLoading: boolean;
  /** 에러 메시지 */
  error: string | null;
}
