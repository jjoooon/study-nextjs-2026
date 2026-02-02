/**
 * Middleware Types
 *
 * @purpose
 * - 공통 미들웨어 타입 정의
 * - 미들웨어 핸들러 인터페이스
 */

import type { NextRequest } from 'next/server';
import type { NextResponse } from 'next/server';

/**
 * 미들웨어 핸들러 함수 타입
 *
 * @description
 * 각 미들웨어 핸들러는 request와 response를 받아
 * response를 수정하거나 새로운 response를 반환할 수 있습니다.
 *
 * @param request - NextRequest 객체
 * @param response - NextResponse 객체 (기본적으로 NextResponse.next())
 * @returns 수정된 NextResponse 객체
 */
export type MiddlewareHandler = (
  request: NextRequest,
  response: NextResponse
) => NextResponse | Promise<NextResponse>;

/**
 * 미들웨어 핸들러 설정
 *
 * @description
 * 핸들러 실행 조건 등 추가 설정을 위한 타입
 */
export interface MiddlewareHandlerConfig {
  /** 핸들러 이름 (디버깅/로깅용) */
  name?: string;
  /** 핸들러 실행 조건 함수 */
  condition?: (request: NextRequest) => boolean;
}

/**
 * 구성된 미들웨어 핸들러
 */
export interface ConfiguredHandler {
  handler: MiddlewareHandler;
  config?: MiddlewareHandlerConfig;
}
