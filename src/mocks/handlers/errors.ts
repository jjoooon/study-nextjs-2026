/**
 * 에러 시뮬레이션 핸들러
 *
 * 이 파일은 에러 처리 테스트를 위한 핸들러를 정의합니다.
 * 다양한 에러 시나리오를 시뮬레이션할 수 있습니다.
 */

import { http, HttpResponse, delay } from 'msw';

export const errorHandlers = [
  // ========================================================================
  // ERROR HANDLING TEST ENDPOINTS
  // ========================================================================

  // 500 에러 시뮬레이션
  http.get('/api/error/server-error', async () => {
    await delay(200);
    return HttpResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }),

  // 네트워크 에러 시뮬레이션
  http.get('/api/error/network-error', async () => {
    await delay(200);
    // 네트워크 에러를 시뮬레이션하기 위해 유효하지 않은 응답 반환
    return HttpResponse.error();
  }),

  // 인증 에러 시뮬레이션
  http.get('/api/error/unauthorized', async () => {
    await delay(200);
    return HttpResponse.json(
      { message: 'Unauthorized access' },
      { status: 401 }
    );
  }),

  // 타임아웃 시뮬레이션
  http.get('/api/error/timeout', async () => {
    // 10초 이상 지연 (RTK Query의 timeout: 10000을 초과)
    await delay(11000);
    return HttpResponse.json({ message: 'Timeout' });
  }),
];
