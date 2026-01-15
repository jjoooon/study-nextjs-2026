/**
 * Validation Constants
 *
 * @description
 * 입력 검증 관련 상수 정의
 * 정규식 패턴, 길이 제한, 허용 값 등
 */

/**
 * 정규식 패턴
 */
export const REGEX = {
  /** 이메일 */
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  /** URL */
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,

  /** 전화번호 (한국) */
  PHONE: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,

  /** 숫자만 */
  NUMERIC: /^[0-9]+$/,

  /** 영문만 */
  ALPHA: /^[a-zA-Z]+$/,

  /** 영문 + 숫자 */
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,

  /** 영문 + 숫자 + 특수문자 */
  ALPHANUMERIC_SPECIAL: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,

  /** 한글만 */
  KOREAN: /^[가-힣]+$/,

  /** 한글 + 영문 + 숫자 */
  KOREAN_ALPHANUMERIC: /^[가-힣a-zA-Z0-9]+$/,

  /** 우편번호 (한국) */
  POSTAL_CODE: /^\d{5}$/,

  /** 비밀번호 (영문, 숫자, 특수문자 포함 8-20자) */
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,

  /** 사용자명 (영문, 숫자, 언더스코어 4-20자) */
  USERNAME: /^[a-zA-Z0-9_]{4,20}$/,

  /** 16자리 카드 번호 (띄어쓰기 허용) */
  CREDIT_CARD: /^\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}$/,

  /** IPv4 주소 */
  IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,

  /** 16진수 색상 코드 (#RRGGBB or #RGB) */
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  /** 날짜 (YYYY-MM-DD) */
  DATE: /^\d{4}-\d{2}-\d{2}$/,

  /** 시간 (HH:MM) */
  TIME: /^([01]\d|2[0-3]):([0-5]\d)$/,

  /** 날짜시간 (YYYY-MM-DD HH:MM) */
  DATETIME: /^\d{4}-\d{2}-\d{2} ([01]\d|2[0-3]):([0-5]\d)$/,
} as const;

/**
 * 입력 길이 제한
 */
export const LENGTH = {
  /** 사용자명 */
  USERNAME: {
    MIN: 4,
    MAX: 20,
  },

  /** 비밀번호 */
  PASSWORD: {
    MIN: 8,
    MAX: 20,
  },

  /** 이름 */
  NAME: {
    MIN: 2,
    MAX: 50,
  },

  /** 제목 */
  TITLE: {
    MIN: 2,
    MAX: 200,
  },

  /** 설명 */
  DESCRIPTION: {
    MIN: 10,
    MAX: 5000,
  },

  /** 한 줄 설명 */
  SHORT_DESCRIPTION: {
    MIN: 10,
    MAX: 500,
  },

  /** 전화번호 */
  PHONE: {
    MIN: 10,
    MAX: 13,
  },

  /** 우편번호 */
  POSTAL_CODE: {
    LENGTH: 5,
  },

  /** 일반 텍스트 */
  TEXT: {
    MIN: 1,
    MAX: 1000,
  },
} as const;

/**
 * 파일 관련 제한
 */
export const FILE = {
  /** 최대 파일 크기 (bytes) */
  MAX_SIZE: {
    /** 이미지 (10MB) */
    IMAGE: 10 * 1024 * 1024,

    /** 문서 (5MB) */
    DOCUMENT: 5 * 1024 * 1024,

    /** 비디오 (100MB) */
    VIDEO: 100 * 1024 * 1024,

    /** 일반 (20MB) */
    DEFAULT: 20 * 1024 * 1024,
  } as const,

  /** 허용된 이미지 형식 */
  IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'] as const,

  /** 허용된 문서 형식 */
  DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ] as const,

  /** 허용된 비디오 형식 */
  VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'] as const,

  /** 이미지 최대 너비/높이 (px) */
  IMAGE_MAX_DIMENSIONS: {
    WIDTH: 4096,
    HEIGHT: 4096,
  } as const,

  /** 이미지 최소 너비/높이 (px) */
  IMAGE_MIN_DIMENSIONS: {
    WIDTH: 100,
    HEIGHT: 100,
  } as const,
} as const;

/**
 * 비밀번호 정책
 */
export const PASSWORD_POLICY = {
  /** 최소 길이 */
  MIN_LENGTH: 8,

  /** 최대 길이 */
  MAX_LENGTH: 20,

  /** 필수 문자 유형 */
  REQUIREMENTS: {
    /** 소문자 필수 */
    LOWERCASE: true,

    /** 대문자 필수 */
    UPPERCASE: false,

    /** 숫자 필수 */
    NUMBER: true,

    /** 특수문자 필수 */
    SPECIAL: true,

    /** 허용된 특수문자 */
    SPECIAL_CHARS: '!@#$%^&*',
  } as const,

  /** 공통 비밀번호 금지 */
  FORBIDDEN_PATTERNS: ['123456', 'password', 'qwerty', 'abc123'] as const,
} as const;

/**
 * 입력 마스크 패턴
 */
export const MASKS = {
  /** 전화번호 (010-1234-5678) */
  PHONE: 'XXX-XXXX-XXXX',

  /** 사업자등록번호 (XX-XXX-XXXXX) */
  BUSINESS_NUMBER: 'XX-XXX-XXXXX',

  /** 카드 번호 (XXXX-XXXX-XXXX-XXXX) */
  CREDIT_CARD: 'XXXX-XXXX-XXXX-XXXX',

  /** 계좌번호 (XXX-XX-XXXXX) */
  BANK_ACCOUNT: 'XXX-XX-XXXXX',

  /** 주민등록번호 (XXXXXX-X) */
  RESIDENT_NUMBER: 'XXXXXX-X',
} as const;

/**
 * 허용된 파일 확장자
 */
export const FILE_EXTENSIONS = {
  /** 이미지 */
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'] as const,

  /** 문서 */
  DOCUMENT: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt'] as const,

  /** 비디오 */
  VIDEO: ['.mp4', '.webm', '.ogg', '.mov', '.avi'] as const,

  /** 오디오 */
  AUDIO: ['.mp3', '.wav', '.ogg', '.aac'] as const,

  /** 압축 파일 */
  ARCHIVE: ['.zip', '.rar', '.7z', '.tar', '.gz'] as const,
} as const;

/**
 * 숫자 범위
 */
export const NUMBER_RANGE = {
  /** 가격 (원) */
  PRICE: {
    MIN: 0,
    MAX: 999999999,
  },

  /** 수량 */
  QUANTITY: {
    MIN: 0,
    MAX: 999999,
  },

  /** 할인율 (%) */
  DISCOUNT_RATE: {
    MIN: 0,
    MAX: 100,
  },

  /** 비율 (%) */
  PERCENTAGE: {
    MIN: 0,
    MAX: 100,
  },

  /** 별점 */
  RATING: {
    MIN: 0,
    MAX: 5,
    STEP: 0.5,
  },
} as const;

/**
 * 드롭다운 옵션 수
 */
export const DROPDOWN = {
  /** 최소 표시 옵션 수 */
  MIN_VISIBLE: 3,

  /** 기본 표시 옵션 수 */
  DEFAULT_VISIBLE: 5,

  /** 최대 표시 옵션 수 */
  MAX_VISIBLE: 10,
} as const;
