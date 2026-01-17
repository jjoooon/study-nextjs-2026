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
   * - accessToken은 응답 본문으로 반환
   * - refreshToken은 HttpOnly Cookie로 설정
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
      // MSW에서 실제 브라우저 쿠키 설정을 위해 document.cookie 사용
      // 참고: HttpOnly 속성은 JavaScript에서 설정 불가능하므로 개발용으로만 사용
      if (typeof document !== 'undefined') {
        document.cookie = 'refreshToken=mock-refresh-token-67890; Path=/; Max-Age=604800; SameSite=lax';
      }

      return HttpResponse.json({
        token: 'mock-jwt-token-12345',
        expiresIn: 3600, // 1시간
        user: {
          id: 1,
          email: 'test@example.com',
          name: '테스트 사용자',
          role: 'user',
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
   * - Authorization: Bearer new-mock-jwt-token-* (갱신된 토큰)
   *
   * @failure (401)
   * - Authorization 헤더 없음
   * - 잘못된 토큰
   * - 만료된 토큰: expired-token-*
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

    // 토큰 추출
    const token = authHeader.split(' ')[1];

    // 만료된 토큰 시뮬레이션 (토큰 갱신 테스트용)
    if (token.startsWith('expired-token-')) {
      return HttpResponse.json(
        {
          error: 'TOKEN_EXPIRED',
          message: '토큰이 만료되었습니다.',
        },
        { status: 401 }
      );
    }

    // 유효한 토큰 검증
    const isValidToken = token === 'mock-jwt-token-12345' || token.startsWith('new-mock-jwt-token-');

    if (!isValidToken) {
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
   * 쿠키의 리프레시 토큰으로 새로운 액세스 토큰 발급
   * - refreshToken은 HttpOnly Cookie에서 읽음
   * - 새로운 accessToken만 응답 본문으로 반환
   */
  http.post('/api/auth/refresh', async ({ request }) => {
    // MSW에서는 Cookie 헤더가 null일 수 있으므로 document.cookie 직접 읽기
    let refreshToken = null;

    // 1. 요청 헤더에서 쿠키 읽기 시도
    const cookieHeader = request.headers.get('Cookie');

    if (cookieHeader) {
      const refreshTokenMatch = cookieHeader.match(/refreshToken=([^;]+)/);
      refreshToken = refreshTokenMatch ? refreshTokenMatch[1] : null;
    }

    // 2. 헤더에 없으면 document.cookie에서 읽기 (MSW 환경)
    if (!refreshToken && typeof document !== 'undefined') {
      const cookies = document.cookie;
      const refreshTokenMatch = cookies.match(/refreshToken=([^;]+)/);
      refreshToken = refreshTokenMatch ? refreshTokenMatch[1] : null;
    }

    if (refreshToken === 'mock-refresh-token-67890') {
      return HttpResponse.json({
        token: 'new-mock-jwt-token-' + Date.now(),
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
