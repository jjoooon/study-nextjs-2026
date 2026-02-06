/**
 * 인증 관련 MSW 핸들러
 *
 * @description
 * MSW(Mock Service Worker)를 사용하여 인증 API를 모킹합니다.
 * - 로그인, 로그아웃, 세션 검증 등 인증 관련 모든 API 모킹
 * - 쿠키 기반 세션 인증 방식
 * - 다양한 시나리오 시뮬레이션 가능 (성공, 실패, 네트워크 지연)
 *
 * @test
 * - 사번: 7자리 숫자 (예: 1234567)
 * - 비밀번호: 1111 (고정)
 * - 실패 케이스: 그 외 모든 조합
 *
 * @cookies
 * - InitechEamERCD: 1001 (고정)
 * - InitechEamUID: 로그인 시 사용한 사번
 * - InitechEamUIP: 127.0.0.1 (고정)
 * - InitechEamUPID: portal.hwgitest.com
 * - InitechEamUTOA: 1 (고정)
 * - InitechEamUHMAC: aaaaa (고정)
 * - InitechEamULAT: new Date().getTime()의 10자리
 */

import { http, HttpResponse, delay } from 'msw';
import { setCookieValue } from '@/shared/utils/cookieUtils';
import log from '@/shared/utils/logger';

const logger = log.getLogger('Global');

/**
 * 인증 API 핸들러
 */
export const authHandlers = [
  /**
   * 로그인
   * POST /api/auth/login
   *
   * @description
   * 사용자 자격증명을 검증하고 세션 쿠키 발급
   * - 쿠키들로 세션 관리
   * - 사용자 정보는 응답 본문으로 반환
   *
   * @success
   * - employeeId: 7자리 숫자 (정규식: /^\d{7}$/)
   * - password: 1111 (고정)
   *
   * @failure
   * - 그 외 모든 조합은 401 반환
   */
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { employeeId: string; password: string };
    const { employeeId, password } = body;

    // 네트워크 지연 시뮬레이션 (500ms)
    await delay(50);

    // ✅ 성공 시나리오: 사번 7자리 숫자, 비밀번호 1111
    const isValidEmployeeId = /^\d{7}$/.test(employeeId);
    const isValidPassword = password === '1111';

    if (isValidEmployeeId && isValidPassword) {
      // 쿠키 설정
      const timestamp = String(Date.now()).slice(0, 10);
      const cookieOptions = { path: '/', sameSite: 'lax' as const };

      setCookieValue('InitechEamERCD', '1001', cookieOptions);
      setCookieValue('InitechEamUID', employeeId, cookieOptions);
      setCookieValue('InitechEamUIP', '127.0.0.1', cookieOptions);
      setCookieValue('InitechEamUPID', 'portal.hwgitest.com', cookieOptions);
      setCookieValue('InitechEamUTOA', '1', cookieOptions);
      setCookieValue('InitechEamUHMAC', 'aaaaa', cookieOptions);
      setCookieValue('InitechEamULAT', timestamp, cookieOptions);

      return HttpResponse.json({
        user: {
          id: 1,
          employeeId,
          name: '사용자',
          role: 'user',
        },
      });
    }

    // ❌ 실패 시나리오: 잘못된 자격증명
    return HttpResponse.json(
      {
        error: 'INVALID_CREDENTIALS',
        message: '사번 또는 비밀번호가 올바르지 않습니다.',
      },
      { status: 401 }
    );
  }),

  /**
   * 로그아웃
   * POST /api/auth/logout
   *
   * @description
   * 사용자 로그아웃 처리
   * - 클라이언트에서 토큰 삭제
   * - 서버에서 세션 무효화 (MSW에서는 성공만 반환)
   */
  http.post('/api/auth/logout', async () => {
    return HttpResponse.json({
      message: '로그아웃 되었습니다.',
    });
  }),

  /**
   * 현재 사용자 정보 조회
   * GET /api/auth/me
   *
   * @description
   * 현재 로그인된 사용자 정보 조회
   * - 쿠키로 세션 검증
   *
   * @success
   * - InitechEamUID: 7자리 사번이 있는 경우
   *
   * @failure (401)
   * - 쿠키 없음
   * - 잘못된 세션
   */
  http.get('/api/auth/me', async ({ request }) => {
    // 쿠키에서 사번 추출
    let employeeId = null;
    const cookieHeader = request.headers.get('Cookie');

    if (cookieHeader) {
      const uidMatch = cookieHeader.match(/InitechEamUID=([^;]+)/);
      employeeId = uidMatch ? uidMatch[1] : null;
    }

    // MSW 환경에서 헤더에 없는 경우 document.cookie에서 읽기
    if (!employeeId && typeof document !== 'undefined') {
      const cookies = document.cookie;
      const uidMatch = cookies.match(/InitechEamUID=([^;]+)/);
      employeeId = uidMatch ? uidMatch[1] : null;
    }

    // 인증 검증: 7자리 사번인지 확인
    if (!employeeId || !/^\d{7}$/.test(employeeId)) {
      return HttpResponse.json(
        {
          error: 'UNAUTHORIZED',
          message: '인증이 필요합니다.',
        },
        { status: 401 }
      );
    }

    // 성공: 사용자 정보 반환
    return HttpResponse.json({
      user: {
        id: 1,
        employeeId,
        name: '사용자',
        role: 'user',
      },
    });
  }),

  /**
   * 토큰 갱신 (제거됨)
   *
   * @description
   * 쿠키 기반 인증에서는 토큰 갱신이 필요 없습니다.
   * 세션 쿠키의 유효기간 동안 자동으로 인증이 유지됩니다.
   *
   * @deprecated
   * 쿠키 기반 인증으로 변경되어 사용하지 않습니다.
   */
  // http.post('/api/auth/refresh', ...), // 제거됨

  /**
   * 비밀번호 찾기 (이메일 발송)
   * POST /api/auth/forgot-password
   *
   * @description
   * 비밀번호 재설정 이메일 발송 (시뮬레이션만)
   */
  http.post('/api/auth/forgot-password', async () => {
    // 실제로는 이메일을 발송하지만, MSW에서는 성공만 반환
    // 이메일 발송 시뮬레이션 (1초 지연)
    await delay(1000);

    return HttpResponse.json({
      message: '비밀번호 재설정 이메일을 발송했습니다.',
    });
  }),

  /**
   * 비밀번호 재설정
   * POST /api/auth/reset-password
   *
   * @description
   * 토큰으로 새 비밀번호 설정
   */
  http.post('/api/auth/reset-password', async ({ request }) => {
    const body = (await request.json()) as { token: string; newPassword: string };
    const { token } = body;

    // 실제로는 토큰 검증 후 비밀번호 변경
    logger.log('[MSW] Password reset requested:', { token, newPassword: '***' });

    return HttpResponse.json({
      message: '비밀번호가 재설정되었습니다.',
    });
  }),
];
