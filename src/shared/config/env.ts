/**
 * Environment Variables Configuration
 *
 * @description
 * 환경 변수 검증 및 타입 안전성 보장
 *
 * @usage
 * import { config } from '@/shared/config/env';
 *
 * const apiUrl = config.apiUrl;
 * const isDev = config.isDevelopment;
 */

import { z } from 'zod';

/**
 * 환경 변수 스키마
 *
 * @description
 * Zod를 사용한 환경 변수 검증
 * - 필수 값은 .refine()으로 검증
 * - 기본값은 .default()로 제공
 */
const envSchema = z.object({
  // ==========================================================================
  // Node.js 환경
  // ==========================================================================

  /** Node.js 환경 (development | production | test) */
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // ==========================================================================
  // 애플리케이션 설정 (공개)
  // ==========================================================================

  /** 애플리케이션 이름 */
  NEXT_PUBLIC_APP_NAME: z.string().default('Next.js App'),

  /** 애플리케이션 버전 */
  NEXT_PUBLIC_APP_VERSION: z.string().default('1.0.0'),

  /** 애플리케이션 설명 */
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().default(''),

  // ==========================================================================
  // API 설정 (공개)
  // ==========================================================================

  /** API 기본 URL */
  NEXT_PUBLIC_API_URL: z.string().url().default('/api'),

  /** API 타임아웃 (ms) */
  NEXT_PUBLIC_API_TIMEOUT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive())
    .default('10000'),

  /** API 재시도 횟수 */
  NEXT_PUBLIC_API_RETRY_COUNT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().min(0).max(10))
    .default('3'),

  // ==========================================================================
  // 인증 설정 (공개)
  // ==========================================================================

  /** 액세스 토큰 만료 시간 (분) */
  NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive())
    .default('15'),

  /** 리프레시 토큰 만료 시간 (일) */
  NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive())
    .default('7'),

  // ==========================================================================
  // OAuth 설정 (공개)
  // ==========================================================================

  /** Google OAuth Client ID */
  NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID: z.string().optional(),

  /** GitHub OAuth Client ID */
  NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID: z.string().optional(),

  /** Kakao OAuth Client ID */
  NEXT_PUBLIC_KAKAO_OAUTH_CLIENT_ID: z.string().optional(),

  /** Naver OAuth Client ID */
  NEXT_PUBLIC_NAVER_OAUTH_CLIENT_ID: z.string().optional(),

  // ==========================================================================
  // Feature Flags (공개)
  // ==========================================================================

  /** 고급 필터링 활성화 */
  NEXT_PUBLIC_FEATURE_ADVANCED_FILTERS: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),

  /** 다크 모드 활성화 */
  NEXT_PUBLIC_FEATURE_DARK_MODE: z
    .string()
    .transform((val) => val === 'true')
    .default('true'),

  /** 실시간 알림 활성화 */
  NEXT_PUBLIC_FEATURE_REALTIME_NOTIFICATIONS: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),

  /** 성능 모니터링 활성화 */
  NEXT_PUBLIC_FEATURE_PERFORMANCE_MONITORING: z
    .string()
    .transform((val) => val === 'true')
    .default('true'),

  // ==========================================================================
  // 개발 도구 설정 (공개)
  // ==========================================================================

  /** Storybook 활성화 */
  NEXT_PUBLIC_STORYBOOK_ENABLED: z
    .string()
    .transform((val) => val === 'true')
    .default('true'),

  /** Redux DevTools 활성화 */
  NEXT_PUBLIC_REDUX_DEVTOOLS: z
    .string()
    .transform((val) => val === 'true')
    .default('true'),

  /** 로깅 레벨 */
  NEXT_PUBLIC_LOG_LEVEL: z
    .enum(['error', 'warn', 'info', 'debug'])
    .default('debug'),

  // ==========================================================================
  // Sentry 설정 (공개)
  // ==========================================================================

  /** Sentry DSN */
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),

  /** Sentry 환경 */
  NEXT_PUBLIC_SENTRY_ENVIRONMENT: z.string().optional(),

  // ==========================================================================
  // Analytics 설정 (공개)
  // ==========================================================================

  /** Google Analytics ID */
  NEXT_PUBLIC_GA_ID: z.string().optional(),

  /** Google Tag Manager ID */
  NEXT_PUBLIC_GTM_ID: z.string().optional(),

  // ==========================================================================
  // 기타 설정 (공개)
  // ==========================================================================

  /** 타임존 */
  NEXT_PUBLIC_TIMEZONE: z.string().default('Asia/Seoul'),

  /** 로케일 */
  NEXT_PUBLIC_LOCALE: z.string().default('ko-KR'),

  /** 통화 */
  NEXT_PUBLIC_CURRENCY: z.string().default('KRW'),

  // ==========================================================================
  // 서버 전용 환경 변수 (비공개)
  // ==========================================================================

  /** 데이터베이스 URL */
  DATABASE_URL: z.string().optional(),

  /** Redis URL */
  REDIS_URL: z.string().optional(),

  /** OAuth 시크릿 (서버 전용) */
  GOOGLE_OAUTH_CLIENT_SECRET: z.string().optional(),
  GITHUB_OAUTH_CLIENT_SECRET: z.string().optional(),
  KAKAO_OAUTH_CLIENT_SECRET: z.string().optional(),
  NAVER_OAUTH_CLIENT_SECRET: z.string().optional(),
});

/**
 * 검증된 환경 변수
 */
const validateEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .filter((e) => e.code === 'invalid_type')
        .map((e) => `  - ${e.path.join('.')}: ${e.message}`);

      console.error('❌ Invalid environment variables:');
      missingVars.forEach((msg) => console.error(msg));
      console.error('\nPlease check your .env file.');
    }
    throw error;
  }
};

/**
 * 환경 설정 객체
 *
 * @example
 * ```typescript
 * import { config } from '@/shared/config/env';
 *
 * if (config.isDevelopment) {
 *   console.log('Development mode');
 * }
 *
 * const apiUrl = config.apiUrl;
 * ```
 */
export const config = validateEnv();

/**
 * 환경 설정 타입
 */
export type Config = z.infer<typeof envSchema>;

/**
 * 편의 속성들
 */
export const isDevelopment = config.NODE_ENV === 'development';
export const isProduction = config.NODE_ENV === 'production';
export const isTest = config.NODE_ENV === 'test';

/**
 * 공개 설정 (클라이언트에서 접근 가능)
 */
export const publicConfig = {
  appName: config.NEXT_PUBLIC_APP_NAME,
  appVersion: config.NEXT_PUBLIC_APP_VERSION,
  appDescription: config.NEXT_PUBLIC_APP_DESCRIPTION,

  apiUrl: config.NEXT_PUBLIC_API_URL,
  apiTimeout: config.NEXT_PUBLIC_API_TIMEOUT,
  apiRetryCount: config.NEXT_PUBLIC_API_RETRY_COUNT,

  accessTokenExpiry: config.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY,
  refreshTokenExpiry: config.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY,

  features: {
    advancedFilters: config.NEXT_PUBLIC_FEATURE_ADVANCED_FILTERS,
    darkMode: config.NEXT_PUBLIC_FEATURE_DARK_MODE,
    realtimeNotifications: config.NEXT_PUBLIC_FEATURE_REALTIME_NOTIFICATIONS,
    performanceMonitoring: config.NEXT_PUBLIC_FEATURE_PERFORMANCE_MONITORING,
  },

  devtools: {
    storybook: config.NEXT_PUBLIC_STORYBOOK_ENABLED,
    redux: config.NEXT_PUBLIC_REDUX_DEVTOOLS,
    logLevel: config.NEXT_PUBLIC_LOG_LEVEL,
  },

  oauth: {
    google: {
      clientId: config.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    },
    github: {
      clientId: config.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID,
    },
    kakao: {
      clientId: config.NEXT_PUBLIC_KAKAO_OAUTH_CLIENT_ID,
    },
    naver: {
      clientId: config.NEXT_PUBLIC_NAVER_OAUTH_CLIENT_ID,
    },
  },

  timezone: config.NEXT_PUBLIC_TIMEZONE,
  locale: config.NEXT_PUBLIC_LOCALE,
  currency: config.NEXT_PUBLIC_CURRENCY,
} as const;

/**
 * 비공개 설정 (서버에서만 접근 가능)
 */
export const serverConfig = {
  databaseUrl: config.DATABASE_URL,
  redisUrl: config.REDIS_URL,
} as const;

/**
 * 기본 export
 */
export default config;
