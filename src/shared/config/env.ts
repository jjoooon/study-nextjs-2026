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
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

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
  NEXT_PUBLIC_API_URL: z.string().default('/api'),

  /** API 타임아웃 (ms) */
  NEXT_PUBLIC_API_TIMEOUT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive())
    .default(10000),

  /** API 재시도 횟수 */
  NEXT_PUBLIC_API_RETRY_COUNT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().min(0).max(10))
    .default(3),

  // ==========================================================================
  // 인증 설정 (공개)
  // ==========================================================================

  // 쿠키 기반 인증으로 변경되어 토큰 만료 시간 설정 제거됨

  // ==========================================================================
  // Feature Flags (공개)
  // ==========================================================================

  /** 다크 모드 활성화 */
  NEXT_PUBLIC_FEATURE_DARK_MODE: z
    .string()
    .transform((val) => val === 'true')
    .default(true),

  /** 실시간 알림 활성화 */
  NEXT_PUBLIC_FEATURE_REALTIME_NOTIFICATIONS: z
    .string()
    .transform((val) => val === 'true')
    .default(false),

  /** 성능 모니터링 활성화 */
  NEXT_PUBLIC_FEATURE_PERFORMANCE_MONITORING: z
    .string()
    .transform((val) => val === 'true')
    .default(true),

  // ==========================================================================
  // 개발 도구 설정 (공개)
  // ==========================================================================

  /** Storybook 활성화 */
  NEXT_PUBLIC_STORYBOOK_ENABLED: z
    .string()
    .transform((val) => val === 'true')
    .default(true),

  /** Redux DevTools 활성화 */
  NEXT_PUBLIC_REDUX_DEVTOOLS: z
    .string()
    .transform((val) => val === 'true')
    .default(true),

  /** 로깅 레벨 */
  NEXT_PUBLIC_LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('debug'),

  // ==========================================================================
  // 디버그 설정 (비공개 - 서버에서만 접근 가능)
  // ==========================================================================

  /** 디버그 허용 IP 목록 (쉼표로 구분, CIDR 지원) */
  DEBUG_IPS: z.string().optional(),

  /** 디버그 IP에 적용할 로그 레벨 */
  DEBUG_LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('debug'),
});

/**
 * 환경 설정 객체
 *
 * @description
 * validateEnv 함수를 사용하지 않고 직접 process.env에서 읽어옵니다.
 * Zod 스키마를 사용하여 타입 안전성을 보장합니다.
 */
const config = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,

  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,

  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
  NEXT_PUBLIC_API_RETRY_COUNT: process.env.NEXT_PUBLIC_API_RETRY_COUNT,

  NEXT_PUBLIC_FEATURE_DARK_MODE: process.env.NEXT_PUBLIC_FEATURE_DARK_MODE,
  NEXT_PUBLIC_FEATURE_REALTIME_NOTIFICATIONS: process.env.NEXT_PUBLIC_FEATURE_REALTIME_NOTIFICATIONS,
  NEXT_PUBLIC_FEATURE_PERFORMANCE_MONITORING: process.env.NEXT_PUBLIC_FEATURE_PERFORMANCE_MONITORING,

  NEXT_PUBLIC_STORYBOOK_ENABLED: process.env.NEXT_PUBLIC_STORYBOOK_ENABLED,
  NEXT_PUBLIC_REDUX_DEVTOOLS: process.env.NEXT_PUBLIC_REDUX_DEVTOOLS,
  NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,

  DEBUG_IPS: process.env.DEBUG_IPS,
  DEBUG_LOG_LEVEL: process.env.DEBUG_LOG_LEVEL,
});

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

  features: {
    darkMode: config.NEXT_PUBLIC_FEATURE_DARK_MODE,
    realtimeNotifications: config.NEXT_PUBLIC_FEATURE_REALTIME_NOTIFICATIONS,
    performanceMonitoring: config.NEXT_PUBLIC_FEATURE_PERFORMANCE_MONITORING,
  },

  devtools: {
    storybook: config.NEXT_PUBLIC_STORYBOOK_ENABLED,
    redux: config.NEXT_PUBLIC_REDUX_DEVTOOLS,
    logLevel: config.NEXT_PUBLIC_LOG_LEVEL,
  },
} as const;

/**
 * 비공개 설정 (서버에서만 접근 가능)
 */
export const serverConfig = {
  debugIps:
    config.DEBUG_IPS?.split(',')
      .map((ip) => ip.trim())
      .filter(Boolean) ?? [],
  debugLogLevel: config.DEBUG_LOG_LEVEL,
} as const;
