/**
 * UI Constants
 *
 * @description
 * UI/UX 관련 상수 정의
 * 반응형 디자인, 색상, 애니메이션 등
 */

/**
 * 화면 크기 (Breakpoints)
 * Tailwind CSS 기본값과 일치
 */
export const BREAKPOINTS = {
  /** 모바일 (기본) */
  SM: 640, // 640px

  /** 태블릿 */
  MD: 768, // 768px

  /** 랩탑 */
  LG: 1024, // 1024px

  /** 데스크탑 */
  XL: 1280, // 1280px

  /** 와이드 스크린 */
  XXL: 1536, // 1536px
} as const;

/** Breakpoints 단위 (px) */
export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * 미디어 쿼리 생성 헬퍼
 */
export const MEDIA_QUERIES = {
  /** 최소 너비 (min-width) */
  min: (breakpoint: Breakpoint) => `(min-width: ${BREAKPOINTS[breakpoint]}px)`,

  /** 최대 너비 (max-width) */
  max: (breakpoint: Breakpoint) => `(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`,

  /** 범위 (min-width ~ max-width) */
  between: (min: Breakpoint, max: Breakpoint) =>
    `(min-width: ${BREAKPOINTS[min]}px) and (max-width: ${BREAKPOINTS[max] - 1}px)`,
} as const;

/**
 * Z-Index 레벨
 * 컴포넌트 쌓임 순서 관리
 */
export const Z_INDEX = {
  /** 기본 (normal flow) */
  BASE: 0,

  /** 고정된 요소 */
  FIXED: 10,

  /** 드롭다운 */
  DROPDOWN: 1000,

  /** 스티키 헤더 */
  STICKY: 1020,

  /** 모달 백드롭 */
  MODAL_BACKDROP: 1040,

  /** 모달 */
  MODAL: 1050,

  /** 팝오버 */
  POPOVER: 1060,

  /** 툴팁 */
  TOOLTIP: 1070,

  /** 알림/토스트 */
  TOAST: 1080,

  /** 최상위 (loader, alert) */
  TOP: 9999,
} as const;

/**
 * 애니메이션 시간 (ms)
 */
export const DURATION = {
  /** 즉시 */
  INSTANT: 0,

  /** 매우 빠름 */
  FAST: 150,

  /** 빠름 */
  NORMAL: 300,

  /** 보통 */
  MEDIUM: 500,

  /** 느림 */
  SLOW: 700,

  /** 매우 느림 */
  VERY_SLOW: 1000,
} as const;

/**
 * 애니메이션 이징 함수
 */
export const EASING = {
  /** 선형 */
  LINEAR: 'linear',

  /** 들어갈 때 */
  EASE_IN: 'ease-in',

  /** 나올 때 */
  EASE_OUT: 'ease-out',

  /** 들어갔다 나올 때 */
  EASE_IN_OUT: 'ease-in-out',

  /** 커브 (custom) */
  EASE_CUBIC: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/**
 * 트랜지션 조합
 */
export const TRANSITIONS = {
  /** 기본 트랜지션 */
  DEFAULT: `${DURATION.NORMAL}ms ${EASING.EASE_IN_OUT}`,

  /** 빠른 트랜지션 */
  FAST: `${DURATION.FAST}ms ${EASING.EASE_OUT}`,

  /** 느린 트랜지션 */
  SLOW: `${DURATION.SLOW}ms ${EASING.EASE_IN_OUT}`,

  /** 모달 트랜지션 */
  MODAL: `${DURATION.MEDIUM}ms ${EASING.EASE_CUBIC}`,
} as const;

/**
 * 색상 (Theme)
 * Tailwind CSS 색상 팔레트 기준
 */
export const COLORS = {
  /** 주요 색상 */
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // 기본
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  /** 보조 색상 */
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  /** 성공 */
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
  },

  /** 경고 */
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
  },

  /** 에러 */
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
  },

  /** 정보 */
  info: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
  },
} as const;

/**
 * 그리드 시스템
 */
export const GRID = {
  /** 컬럼 수 */
  COLUMNS: 12,

  /** 간격 (gap) */
  GAPS: {
    NONE: 0,
    XS: 4, // 4px
    SM: 8, // 8px
    MD: 16, // 16px
    LG: 24, // 24px
    XL: 32, // 32px
  } as const,

  /** 컨테이너 최대 너비 */
  CONTAINER_MAX_WIDTH: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
  } as const,
} as const;

/**
 * 간격 (Spacing)
 * Tailwind spacing scale 기준
 */
export const SPACING = {
  0: 0,
  1: 4,   // 4px
  2: 8,   // 8px
  3: 12,  // 12px
  4: 16,  // 16px
  5: 20,  // 20px
  6: 24,  // 24px
  8: 32,  // 32px
  10: 40, // 40px
  12: 48, // 48px
  16: 64, // 64px
  20: 80, // 80px
  24: 96, // 96px
} as const;

/**
 * 폰트 크기 (rem)
 */
export const FONT_SIZES = {
  XS: '0.75rem',   // 12px
  SM: '0.875rem',  // 14px
  BASE: '1rem',    // 16px
  LG: '1.125rem',  // 18px
  XL: '1.25rem',   // 20px
  '2XL': '1.5rem', // 24px
  '3XL': '1.875rem', // 30px
  '4XL': '2.25rem',  // 36px
  '5XL': '3rem',     // 48px
} as const;

/**
 * 폰트 두께
 */
export const FONT_WEIGHTS = {
  THIN: '100',
  EXTRALIGHT: '200',
  LIGHT: '300',
  NORMAL: '400',
  MEDIUM: '500',
  SEMIBOLD: '600',
  BOLD: '700',
  EXTRABOLD: '800',
  BLACK: '900',
} as const;

/**
 * 둥근 모서리 (border-radius)
 */
export const RADIUS = {
  NONE: '0',
  SM: '0.125rem',   // 2px
  DEFAULT: '0.25rem', // 4px
  MD: '0.375rem',   // 6px
  LG: '0.5rem',     // 8px
  XL: '0.75rem',    // 12px
  '2XL': '1rem',    // 16px
  '3XL': '1.5rem',  // 24px
  FULL: '9999px',   // 원형
} as const;

/**
 * 그림자 (box-shadow)
 */
export const SHADOWS = {
  NONE: 'none',
  SM: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  MD: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  LG: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  XL: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2XL': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
} as const;
