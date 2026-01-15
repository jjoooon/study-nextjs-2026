/**
 * Auth Feature Constants
 *
 * @description
 * 인증 Feature 전용 상수
 */

/**
 * 인증 상태
 */
export const AUTH_STATUS = {
  /** 인증되지 않음 */
  UNAUTHENTICATED: 'unauthenticated',

  /** 인증 중 */
  AUTHENTICATING: 'authenticating',

  /** 인증됨 */
  AUTHENTICATED: 'authenticated',

  /** 인증 만료 */
  EXPIRED: 'expired',
} as const;

export type AuthStatus = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];

/**
 * 사용자 역할
 */
export const USER_ROLE = {
  /** 관리자 */
  ADMIN: 'admin',

  /** 일반 사용자 */
  USER: 'user',

  /** 게스트 */
  GUEST: 'guest',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

/**
 * 사용자 역할 라벨
 */
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: '관리자',
  user: '사용자',
  guest: '게스트',
} as const;

/**
 * OAuth 프로바이더
 */
export const OAUTH_PROVIDER = {
  /** Google */
  GOOGLE: 'google',

  /** GitHub */
  GITHUB: 'github',

  /** Kakao */
  KAKAO: 'kakao',

  /** Naver */
  NAVER: 'naver',
} as const;

export type OAuthProvider = (typeof OAUTH_PROVIDER)[keyof typeof OAUTH_PROVIDER];

/**
 * OAuth 프로바이더 설정
 */
export const OAUTH_CONFIG = {
  [OAUTH_PROVIDER.GOOGLE]: {
    name: 'Google',
    color: '#DB4437',
    icon: 'google',
  },
  [OAUTH_PROVIDER.GITHUB]: {
    name: 'GitHub',
    color: '#333333',
    icon: 'github',
  },
  [OAUTH_PROVIDER.KAKAO]: {
    name: 'Kakao',
    color: '#FEE500',
    icon: 'kakao',
  },
  [OAUTH_PROVIDER.NAVER]: {
    name: 'Naver',
    color: '#03C75A',
    icon: 'naver',
  },
} as const;

/**
 * 인증 관련 제한
 */
export const AUTH_LIMITS = {
  /** 이메일 최대 길이 */
  EMAIL_MAX_LENGTH: 254,

  /** 비밀번호 최소 길이 */
  PASSWORD_MIN_LENGTH: 8,

  /** 비밀번호 최대 길이 */
  PASSWORD_MAX_LENGTH: 20,

  /** 이름 최소 길이 */
  NAME_MIN_LENGTH: 2,

  /** 이름 최대 길이 */
  NAME_MAX_LENGTH: 50,

  /** 로그인 시도 최대 횟수 */
  MAX_LOGIN_ATTEMPTS: 5,

  /** 계정 잠금 시간 (분) */
  LOCKOUT_DURATION: 30,
} as const;

/**
 * 토큰 관련 상수
 */
export const TOKEN = {
  /** 액세스 토큰 만료 시간 (분) */
  ACCESS_EXPIRY: 15,

  /** 리프레시 토큰 만료 시간 (일) */
  REFRESH_EXPIRY: 7,

  /** 토큰 갱신 여유 시간 (초) */
  REFRESH_BUFFER: 60, // 1분 전에 갱신

  /** 토큰 리프레시 간격 (ms) */
  REFRESH_INTERVAL: 10 * 60 * 1000, // 10분
} as const;

/**
 * 인증 폼 검증 메시지
 */
export const AUTH_FORM_MESSAGES = {
  /** 이메일 */
  EMAIL_REQUIRED: '이메일을 입력해주세요.',
  EMAIL_INVALID: '유효한 이메일 주소를 입력해주세요.',
  EMAIL_TOO_LONG: `이메일은 ${AUTH_LIMITS.EMAIL_MAX_LENGTH}자 이하로 입력해주세요.`,

  /** 비밀번호 */
  PASSWORD_REQUIRED: '비밀번호를 입력해주세요.',
  PASSWORD_TOO_SHORT: `비밀번호는 ${AUTH_LIMITS.PASSWORD_MIN_LENGTH}자 이상 입력해주세요.`,
  PASSWORD_TOO_LONG: `비밀번호는 ${AUTH_LIMITS.PASSWORD_MAX_LENGTH}자 이하로 입력해주세요.`,
 _PASSWORD_INVALID: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',

  /** 이름 */
  NAME_REQUIRED: '이름을 입력해주세요.',
  NAME_TOO_SHORT: `이름은 ${AUTH_LIMITS.NAME_MIN_LENGTH}자 이상 입력해주세요.`,
  NAME_TOO_LONG: `이름은 ${AUTH_LIMITS.NAME_MAX_LENGTH}자 이하로 입력해주세요.`,

  /** 일반 */
  TERMS_REQUIRED: '이용약관에 동의해주세요.',
  PRIVACY_REQUIRED: '개인정보 처리방침에 동의해주세요.',
} as const;

/**
 * 인증 관련 에러 메시지
 */
export const AUTH_ERROR_MESSAGES = {
  /** 로그인 */
  INVALID_CREDENTIALS: '이메일 또는 비밀번호가 올바르지 않습니다.',
  ACCOUNT_LOCKED: `로그인 시도 횟수를 초과했습니다. ${AUTH_LIMITS.LOCKOUT_DURATION}분 후에 다시 시도해주세요.`,
  ACCOUNT_DISABLED: '비활성화된 계정입니다.',
  EMAIL_NOT_VERIFIED: '이메일 인증이 완료되지 않았습니다.',

  /** 회원가입 */
  EMAIL_ALREADY_EXISTS: '이미 존재하는 이메일입니다.',
  WEAK_PASSWORD: '비밀번호가 너무 취약합니다.',
  REGISTRATION_FAILED: '회원가입에 실패했습니다.',

  /** 토큰 */
  TOKEN_EXPIRED: '로그인이 만료되었습니다. 다시 로그인해주세요.',
  TOKEN_INVALID: '유효하지 않은 토큰입니다.',
  REFRESH_FAILED: '토큰 갱신에 실패했습니다.',

  /** OAuth */
  OAUTH_FAILED: '소셜 로그인에 실패했습니다.',
  OAUTH_CANCELLED: '소셜 로그인이 취소되었습니다.',
  OAUTH_EMAIL_NOT_VERIFIED: '소셜 계정의 이메일 인증이 필요합니다.',
} as const;

/**
 * 인증 관련 성공 메시지
 */
export const AUTH_SUCCESS_MESSAGES = {
  LOGIN: '로그인되었습니다.',
  LOGOUT: '로그아웃되었습니다.',
  REGISTER: '회원가입이 완료되었습니다.',
  EMAIL_VERIFIED: '이메일 인증이 완료되었습니다.',
  PASSWORD_CHANGED: '비밀번호가 변경되었습니다.',
  PASSWORD_RESET: '비밀번호 재설정 이메일을 발송했습니다.',
} as const;

/**
 * 비밀번호 복잡도 요구사항
 */
export const PASSWORD_REQUIREMENTS = {
  /** 최소 길이 */
  MIN_LENGTH: AUTH_LIMITS.PASSWORD_MIN_LENGTH,

  /** 소문자 필수 */
  REQUIRE_LOWERCASE: true,

  /** 대문자 필수 */
  REQUIRE_UPPERCASE: false,

  /** 숫자 필수 */
  REQUIRE_NUMBER: true,

  /** 특수문자 필수 */
  REQUIRE_SPECIAL: true,

  /** 허용된 특수문자 */
  SPECIAL_CHARS: '!@#$%^&*',
} as const;

/**
 * 이메일 인증 관련 상수
 */
export const EMAIL_VERIFICATION = {
  /** 인증 코드 길이 */
  CODE_LENGTH: 6,

  /** 인증 코드 유효시간 (분) */
  CODE_EXPIRY: 5,

  /** 인증 코드 재발송 대기시간 (초) */
  RESEND_COOLDOWN: 60,

  /** 최대 재발송 횟수 */
  MAX_RESEND_COUNT: 3,
} as const;

/**
 * 비밀번호 찾기 관련 상수
 */
export const PASSWORD_RESET = {
  /** 재설정 토큰 유효시간 (시간) */
  TOKEN_EXPIRY: 1,

  /** 이메일 전송 간격 (초) */
  SEND_COOLDOWN: 60,
} as const;

/**
 * 로그인 상태 지속 옵션
 */
export const LOGIN_PERSISTENCE = {
  /** 세션 동안만 (브라우저 닫으면 로그아웃) */
  SESSION: 'session',

  /** 7일간 유지 */
  WEEK: 'week',

  /** 30일간 유지 */
  MONTH: 'month',
} as const;

export type LoginPersistence = (typeof LOGIN_PERSISTENCE)[keyof typeof LOGIN_PERSISTENCE];

/**
 * 로그인 상태 지속 라벨
 */
export const LOGIN_PERSISTENCE_LABELS: Record<LoginPersistence, string> = {
  session: '세션 유지',
  week: '7일 유지',
  month: '30일 유지',
} as const;

/**
 * 프로필 이미지 관련 상수
 */
export const PROFILE_IMAGE = {
  /** 최대 파일 크기 (2MB) */
  MAX_SIZE: 2 * 1024 * 1024,

  /** 지원되는 형식 */
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'] as const,

  /** 권장 크기 (px) */
  RECOMMENDED_SIZE: {
    WIDTH: 200,
    HEIGHT: 200,
  },

  /** 최소 크기 (px) */
  MIN_SIZE: {
    WIDTH: 100,
    HEIGHT: 100,
  },

  /** 최대 크기 (px) */
  MAX_SIZE: {
    WIDTH: 1024,
    HEIGHT: 1024,
  },
} as const;
