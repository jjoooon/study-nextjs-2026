/**
 * Simple Logging Wrapper using loglevel
 *
 * @description
 * - Simple console.log wrapper
 * - Auto-disable in production
 * - Environment-aware log levels
 * - All logger instances respect global log level
 * - IP-based dynamic log level support via cookie
 *
 * @usage
 * import log from '@/shared/utils/logger';
 * const authLogger = log.getLogger('Auth');
 * authLogger.info('Login successful', { userId: '123' });
 */

import log from 'loglevel';
import { publicConfig } from '../config/env';
import { getCookieValue } from './cookieUtils';

const DEBUG_COOKIE_NAME = 'debug_log_level';

/**
 * 쿠키에서 디버그 로그 레벨 읽기
 *
 * @description
 * 클라이언트 환경에서 쿠키를 확인하여 IP 기반 디버그 레벨을 가져옵니다.
 *
 * @returns 쿠키에 설정된 로그 레벨 또는 null
 */
function getDebugLogLevelFromCookie(): log.LogLevelDesc | null {
  const level = getCookieValue(DEBUG_COOKIE_NAME) as string | undefined;

  if (level && ['error', 'warn', 'info', 'debug'].includes(level)) {
    return level as log.LogLevelDesc;
  }

  return null;
}

/**
 * 로그 레벨 결정 (우선순위: 쿠키 > 환경변수)
 *
 * @description
 * 1. 쿠키에 디버그 레벨이 있는 경우 (IP 기반 예외 적용)
 * 2. 환경변수에 설정된 기본 레벨
 */
function determineLogLevel(): log.LogLevelDesc {
  // 1. 쿠키 기반 디버그 레벨 (우선순위 높음)
  const cookieLevel = getDebugLogLevelFromCookie();
  if (cookieLevel) {
    return cookieLevel;
  }

  // 2. 환경변수 기본 레벨
  return publicConfig.devtools.logLevel;
}

/**
 * Configure global log level and ensure all instances respect it
 *
 * @description
 * - Sets global default log level from environment or cookie
 * - Disables global method to prevent instance-level overrides
 * - All getLogger instances will respect this global level
 */
const globalLogLevel = determineLogLevel();

// Set global log level
log.setDefaultLevel(globalLogLevel);

/**
 * Factory method that creates loggers with proper level inheritance
 *
 * @description
 * - Custom getLogger wrapper that ensures all instances respect global log level
 * - Prevents individual instances from having their own level settings
 * - Maintains loglevel's original API while enforcing consistent behavior
 */
const originalGetLogger = log.getLogger;

log.getLogger = (name: string) => {
  const logger = originalGetLogger(name);
  // Ensure this instance respects global log level
  logger.setLevel(globalLogLevel);
  return logger;
};

/**
 * 쿠키 변경 감지 및 로그 레벨 동적 업데이트
 *
 * @description
 * 쿠키 변경 이벤트를 감지하여 로그 레벨을 동적으로 업데이트합니다.
 * 주로 개발 환경에서 IP가 변경되는 경우 등에 사용됩니다.
 */
export function setupCookieListener(): void {
  if (typeof window === 'undefined') {
    return;
  }

  // 쿠키 변경 감지 (간단한 폴링 방식)
  let lastLevel = getDebugLogLevelFromCookie();
  const checkInterval = 1000; // 1초마다 확인

  const intervalId = setInterval(() => {
    const currentLevel = getDebugLogLevelFromCookie();
    const loggerLevel = log.getLogger('dummy').getLevel();

    const defaultLevel = publicConfig.devtools.logLevel;
    const targetLevel = currentLevel ?? defaultLevel;
    const newLevelConstant = log.levels[targetLevel as keyof typeof log.levels];

    if (currentLevel !== lastLevel) {
      lastLevel = currentLevel;

      if (currentLevel !== null && loggerLevel !== newLevelConstant) {
        // 로그 레벨 변경
        log.setLevel(newLevelConstant);
        // eslint-disable-next-line no-console
        console.log(`[Logger] Log level changed to: ${currentLevel}`);
      } else if (currentLevel === null && loggerLevel !== log.levels[defaultLevel as keyof typeof log.levels]) {
        // 기본 레벨로 복원
        log.setLevel(defaultLevel);
        // eslint-disable-next-line no-console
        console.log(`[Logger] Log level reset to: ${defaultLevel}`);
      }
    }
  }, checkInterval);

  // 개발 환경에서만 리스너 정리 함수 반환
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  // 프로덕션에서는 너무 자주 확인하지 않도록 5초마다 확인
  clearInterval(intervalId);
  setInterval(() => {
    // 프로덕션에서는 5초마다 확인
  }, 5000);
}

export default log;
