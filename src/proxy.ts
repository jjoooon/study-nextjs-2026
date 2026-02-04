/**
 * Next.js Proxy
 *
 * @purpose
 * - IP 기반 로그 레벨 동적 설정
 * - 소스맵 파일 접근 차단
 * - 여러 미들웨어 핸들러를 순차적으로 실행
 *
 * @description
 * 환경변수 DEBUG_IPS에 등록된 IP에서 접근 시,
 * DEBUG_LOG_LEVEL로 설정된 로그 레벨을 쿠키에 설정합니다.
 *
 * 환경변수 예시:
 * DEBUG_IPS=127.0.0.1,192.168.1.100,10.0.0.0/24
 * DEBUG_LOG_LEVEL=debug
 *
 * 새로운 핸들러를 추가하려면 아래 handlers 배열에 추가하세요.
 */

import type { NextRequest } from 'next/server';
import { composeMiddleware } from './middleware/chain';
// import { blockSourceMapsHandler } from './middleware/handlers/blockSourceMaps';
import { debugLogLevelHandler } from './middleware/handlers/debugLogLevel';

/**
 * 미들웨어 핸들러 목록
 *
 * @description
 * 등록된 순서대로 실행됩니다.
 */
const handlers = [
  // {
  //   handler: blockSourceMapsHandler,
  //   config: {
  //     name: 'BlockSourceMaps',
  //   },
  // },
  {
    handler: debugLogLevelHandler,
    config: {
      name: 'DebugLogLevel',
    },
  },
  // 여기에 새로운 핸들러를 추가하세요
  // 예: { handler: authHandler, config: { name: 'Auth' } },
];

const middlewareChain = composeMiddleware(handlers);

export function proxy(request: NextRequest) {
  return middlewareChain(request);
}

/**
 * 프록시가 실행될 경로 패턴
 * - _next/static/chunks/*.js.map 제외하고 허용
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
  // 소스맵 추가
  // matcher: ['/((?!_next/static/(?!chunks/.*\\.map$)|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
