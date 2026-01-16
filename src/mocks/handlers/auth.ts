/**
 * 인증 관련 MSW 핸들러
 *
 * @description
 * MSW(Mock Service Worker)를 사용하여 인증 API를 모킹합니다.
 * - 로그인, 로그아웃, 토큰 검증 등 인증 관련 모든 API 모킹
 * - 다양한 시나리오 시뮬레이션 가능 (성공, 실패, 네트워크 지연)
 *
 * @test
 * - 테스트 계정: test@example.com / password123
 * - 실패 케이스: 그 외 모든 조합
 */

import { http, HttpResponse, delay } from 'msw';

/**
 * 인증 API 핸들러
 */
export const authHandlers = [
  /**
   * 로그인
   * POST /api/auth/login
   *
   * @description
   * 사용자 자격증명을 검증하고 JWT 토큰 발급
   *
   * @success
   * - email: test@example.com
   * - password: password123
   *
   * @failure
   * - 그 외 모든 조합은 401 반환
   */
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    const { email, password } = body;

    // 네트워크 지연 시뮬레이션 (500ms)
    await delay(500);

    // ✅ 성공 시나리오: 올바른 자격증명
    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({
        token: 'mock-jwt-token-12345',
        refreshToken: 'mock-refresh-token-67890',
        expiresIn: 3600, // 1시간
        user: {
          id: 1,
          email: 'test@example.com',
          name: '테스트 사용자',
          role: 'user',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Test',
        },
      });
    }

    // ❌ 실패 시나리오: 잘못된 자격증명
    return HttpResponse.json(
      {
        error: 'INVALID_CREDENTIALS',
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
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
   * - Authorization 헤더의 Bearer 토큰 검증
   *
   * @success
   * - Authorization: Bearer mock-jwt-token-12345
   *
   * @failure
   * - Authorization 헤더 없음 또는 잘못된 토큰
   */
  http.get('/api/auth/me', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // 인증 헤더 검증
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          error: 'UNAUTHORIZED',
          message: '인증이 필요합니다.',
        },
        { status: 401 }
      );
    }

    // 토큰 검증
    const token = authHeader.split(' ')[1];
    if (token !== 'mock-jwt-token-12345') {
      return HttpResponse.json(
        {
          error: 'INVALID_TOKEN',
          message: '유효하지 않은 토큰입니다.',
        },
        { status: 401 }
      );
    }

    // 성공: 사용자 정보 반환
    return HttpResponse.json({
      user: {
        id: 1,
        email: 'test@example.com',
        name: '테스트 사용자',
        role: 'user',
      },
    });
  }),

  /**
   * 토큰 갱신
   * POST /api/auth/refresh
   *
   * @description
   * 리프레시 토큰으로 새로운 액세스 토큰 발급
   */
  http.post('/api/auth/refresh', async ({ request }) => {
    const body = (await request.json()) as { refreshToken: string };
    const { refreshToken } = body;

    if (refreshToken === 'mock-refresh-token-67890') {
      return HttpResponse.json({
        token: 'new-mock-jwt-token-' + Date.now(),
        refreshToken: 'new-mock-refresh-token-' + Date.now(),
        expiresIn: 3600,
      });
    }

    return HttpResponse.json(
      {
        error: 'INVALID_REFRESH_TOKEN',
        message: '유효하지 않은 리프레시 토큰입니다.',
      },
      { status: 401 }
    );
  }),

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
    console.log('[MSW] Password reset requested:', { token, newPassword: '***' });

    return HttpResponse.json({
      message: '비밀번호가 재설정되었습니다.',
    });
  }),
];
