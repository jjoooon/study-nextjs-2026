/**
 * Block Source Maps Handler
 *
 * @purpose
 * - 소스맵 파일 접근 차단
 * - 프로덕션 환경에서 소스 코드 유출 방지
 * - 특정 IP에서만 소스맵 접근 허용
 *
 * @description
 * .js.map 파일 요청을 감지하여 404 응답을 반환합니다.
 * ALLOWED_SOURCE_MAP_IPS에 등록된 IP에서는 소스맵 접근을 허용합니다.
 */

import type { NextRequest } from 'next/server';
import type { NextResponse } from 'next/server';
import { NextResponse as createNextResponse } from 'next/server';
import type { MiddlewareHandler } from '../types';
import { getClientIp } from '@/shared/utils/ipUtils';
import log from '@/shared/utils/logger';

const logger = log.getLogger('BlockSourceMaps');

/**
 * 소스맵 접근을 허용할 IP 목록 (하드코딩)
 *
 * @description
 * 개발용으로 임시 하드코딩. 추후 환경변수로 이동 예정.
 */
const ALLOWED_SOURCE_MAP_IPS = ['127.0.0.1', '::1'];

/**
 * 소스맵 파일 경로 패턴
 * _next/static/chunks/ 디렉토리의 .js.map 파일을 대상으로 합니다.
 */
const SOURCE_MAP_PATTERN = /_next\/static\/chunks\/.*\.js\.map$/;

/**
 * 소스맵 차단 핸들러 생성
 *
 * @returns 미들웨어 핸들러 함수
 */
export function createBlockSourceMapsHandler(): MiddlewareHandler {
  return (request: NextRequest, response: NextResponse): NextResponse => {
    const pathname = request.nextUrl.pathname;

    // 소스맵 파일 요청인 경우
    if (SOURCE_MAP_PATTERN.test(pathname)) {
      const clientIp = getClientIp(request);
      const isAllowedIp = clientIp && ALLOWED_SOURCE_MAP_IPS.includes(clientIp);

      if (isAllowedIp) {
        // 허용된 IP: 정상 응답 (소스맵 접근 허용)
        logger.info('[SourceMap Allowed]', {
          ip: clientIp,
          pathname: pathname,
        });
        return response;
      }

      // 차단된 IP: 404 응답 (소스맵 차단)
      logger.info('[SourceMap Blocked]', {
        ip: clientIp,
        pathname: pathname,
      });
      return new createNextResponse(null, { status: 404 });
    }

    // 소스맵 파일이 아닌 경우 정상 처리
    return response;
  };
}

/**
 * 기본 소스맵 차단 핸들러 인스턴스
 */
export const blockSourceMapsHandler = createBlockSourceMapsHandler();
