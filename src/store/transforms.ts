import { createTransform } from 'redux-persist';

/**
 * 인증 상태 변환
 *
 * @description
 * 지속성 저장 전 인증 상태에서 민감한 정보를 필터링
 *
 * @security
 * - 토큰은 저장되지 않음 (XSS 공격 방지)
 * - 민감하지 않은 사용자 정보만 저장 (isAuthenticated, user id/name)
 * - 앱 로드 시 서버나 쿠키에서 토큰을 다시 가져와야 함
 *
 * @usage
 * 저장 전:
 *   { isAuthenticated: true, token: "jwt-xyz", user: {...} }
 *
 * 저장 후:
 *   { isAuthenticated: true, token: null, user: {...} }
 */
const authTransform = createTransform(
  // 인바운드: state -> storage (저장 전)
  (inboundState: Record<string, unknown>, key) => {
    if (key === 'auth') {
      // 토큰이나 임시 로딩 상태는 저장하지 않음
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { token, isLoading, error, ...safeState } = inboundState as {
        token: string;
        isLoading: boolean;
        error: string | null;
        [key: string]: unknown;
      };

      return safeState;
    }
    return inboundState;
  },
  // 아웃바운드: storage -> state (재 하이드레이션 후)
  (outboundState: Record<string, unknown>, key) => {
    if (key === 'auth') {
      // 재 하이드레이션 후 토큰이 null인지 확인
      return {
        ...outboundState,
        token: null,
      };
    }
    return outboundState;
  },
  { whitelist: ['auth'] }
);

export const transforms = [authTransform];
