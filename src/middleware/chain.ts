/**
 * Middleware Chain
 *
 * @purpose
 * - 여러 미들웨어 핸들러를 순차적으로 실행
 * - Chain of Responsibility 패턴 구현
 * - 조건부 실행 지원
 *
 * @description
 * 미들웨어 핸들러들을 등록된 순서대로 실행하며,
 * 각 핸들러는 request와 response를 수정할 수 있습니다.
 */

import type { NextRequest } from 'next/server';
import type { NextResponse } from 'next/server';
import { NextResponse as createNextResponse } from 'next/server';
import type { ConfiguredHandler, MiddlewareHandler, MiddlewareHandlerConfig } from './types';
import log from '@/shared/utils/logger';

const logger = log.getLogger('MiddlewareChain');

/**
 * 미들웨어 핸들러를 래핑하여 조건부 실행 및 로깅 추가
 */
function wrapHandler(
  handler: MiddlewareHandler,
  config?: MiddlewareHandlerConfig
): MiddlewareHandler {
  return async (request: NextRequest, response: NextResponse): Promise<NextResponse> => {
    // 조건부 실행: condition이 false면 스킵
    if (config?.condition && !config.condition(request)) {
      return response;
    }

    const handlerName = config?.name || 'AnonymousHandler';
    const startTime = performance.now();

    try {
      const result = await handler(request, response);
      const duration = performance.now() - startTime;

      logger.debug(`[Middleware] ${handlerName} executed in ${duration.toFixed(2)}ms`);

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      logger.error(`[Middleware] ${handlerName} failed after ${duration.toFixed(2)}ms:`, error);

      // 에러 발생 시에도 체인 계속 실행 (다른 핸들러 영향 최소화)
      return response;
    }
  };
}

/**
 * 미들웨어 핸들러들을 합성하여 체인 생성
 *
 * @param handlers - 미들웨어 핸들러 배열
 * @returns 합성된 미들웨어 함수
 *
 * @example
 * const chain = composeMiddleware([
 *   { handler: handler1, config: { name: 'Handler1' } },
 *   { handler: handler2, config: { name: 'Handler2', condition: (req) => req.nextUrl.pathname !== '/api' } },
 * ]);
 */
export function composeMiddleware(
  handlers: (MiddlewareHandler | ConfiguredHandler)[]
): (request: NextRequest) => Promise<NextResponse> {
  const wrappedHandlers = handlers.map((item) => {
    if (typeof item === 'function') {
      return wrapHandler(item);
    }
    return wrapHandler(item.handler, item.config);
  });

  return async (request: NextRequest): Promise<NextResponse> => {
    const response = createNextResponse.next();
    let currentResponse = response;

    for (const handler of wrappedHandlers) {
      currentResponse = await handler(request, currentResponse);
    }

    return currentResponse;
  };
}

/**
 * 미들웨어 체인에 핸들러 추가
 *
 * @description
 * 기존 체인에 새로운 핸들러를 추가하여 새로운 체인을 반환합니다.
 * 불변성을 유지하며 새로운 체인을 생성합니다.
 */
export function addHandler(
  chain: (request: NextRequest) => Promise<NextResponse>,
  handler: MiddlewareHandler | ConfiguredHandler
): (request: NextRequest) => Promise<NextResponse> {
  // 기존 체인을 핸들러로 래핑
  const existingAsHandler: ConfiguredHandler = {
    handler: async (req: NextRequest) => chain(req),
    config: { name: 'ExistingChain' },
  };

  return composeMiddleware([existingAsHandler, handler]);
}
