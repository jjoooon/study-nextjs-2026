/**
 * Debug Log Level Handler
 *
 * @purpose
 * - IP 기반 로그 레벨 동적 설정
 * - 특정 IP 사용자에게 디버그 로그 레벨 부여
 *
 * @description
 * 환경변수 DEBUG_IPS에 등록된 IP에서 접근 시,
 * DEBUG_LOG_LEVEL로 설정된 로그 레벨을 쿠키에 설정합니다.
 *
 * 환경변수 예시:
 * DEBUG_IPS=127.0.0.1,192.168.1.100,10.0.0.0/24
 * DEBUG_LOG_LEVEL=debug
 */

import type { NextRequest } from 'next/server';
import type { NextResponse } from 'next/server';
import type { MiddlewareHandler } from '../types';
import { serverConfig } from '@/shared/config/env';
import { getClientIp, isIpMatch } from '@/shared/utils/ipUtils';
import log from '@/shared/utils/logger';

const DEBUG_COOKIE_NAME = 'debug_log_level';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7일

const logger = log.getLogger('DebugLogLevel');

/**
 * 디버그 로그 레벨 핸들러 생성
 *
 * @returns 미들웨어 핸들러 함수
 */
export function createDebugLogLevelHandler(): MiddlewareHandler {
  return (request: NextRequest, response: NextResponse): NextResponse => {
    // 디버그 IP가 설정되지 않은 경우 스킵
    if (serverConfig.debugIps.length === 0) {
      // 기존 쿠키 제거 (설정이 해제된 경우)
      if (request.cookies.get(DEBUG_COOKIE_NAME)) {
        response.cookies.delete(DEBUG_COOKIE_NAME);
      }
      return response;
    }

    // 이미 쿠키가 있는 경우 재설정 방지 (성능 최적화)
    const existingCookie = request.cookies.get(DEBUG_COOKIE_NAME);
    if (existingCookie?.value === serverConfig.debugLogLevel) {
      return response;
    }

    // 클라이언트 IP 추출
    const clientIp = getClientIp(request);
    logger.info(`Client IP: ${clientIp}`);

    // IP가 일치하는지 확인
    const isDebugIp = isIpMatch(clientIp, serverConfig.debugIps);

    if (isDebugIp) {
      // 디버그 로그 레벨 쿠키 설정
      response.cookies.set(DEBUG_COOKIE_NAME, serverConfig.debugLogLevel, {
        httpOnly: false, // 클라이언트 JavaScript에서 읽을 수 있어야 함
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: COOKIE_MAX_AGE,
        path: '/',
      });

      logger.debug(`Debug log level cookie set: ${serverConfig.debugLogLevel}`);
    } else {
      // 일치하지 않는 경우 기존 쿠키 제거
      if (existingCookie) {
        response.cookies.delete(DEBUG_COOKIE_NAME);
        logger.debug('Debug log level cookie removed (IP not matched)');
      }
    }

    return response;
  };
}

/**
 * 기본 디버그 로그 레벨 핸들러 인스턴스
 */
export const debugLogLevelHandler = createDebugLogLevelHandler();
