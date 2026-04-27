export interface AuthHeader {
  agycd?: string;
  answBasc?: string;
  answCode?: string;
  answDtal?: string;
  answTitle?: string;
  chnlType?: string;
  clntIp?: string;
  crntOrgcd?: string;
  envrFlag?: string;
  filter?: string;
  fnCd?: string;
  globalNo?: string;
}

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
  header?: AuthHeader;
  /** 현재 로그인된 사용자 정보 */
  user: User | null;
  /** 인증 여부 */
  isAuthenticated: boolean;
  /** 로딩 상태 */
  isLoading: boolean;
  /** 에러 메시지 */
  error: string | null;
}
