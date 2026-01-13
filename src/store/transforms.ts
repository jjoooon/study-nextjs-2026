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

/**
 * UI 상태 변환
 *
 * @description
 * 사용자 설정만 저장하고 임시 UI 상태는 저장하지 않음
 *
 * @ux-improvement
 * - 보존: 테마, 사이드바 상태
 * - 제거: 모달 상태, 토스트 알림 (저장하면 안 되는 항목)
 *
 * @rationale
 * 모달과 토스트는 일시적임 - 페이지 새로고침 후 표시하면 좋지 않은 UX
 */
const uiTransform = createTransform(
  // 인바운드: state -> storage
  (inboundState: Record<string, unknown>, key) => {
    if (key === 'ui') {
      const state = inboundState as {
        sidebar: { isOpen: boolean };
        modal: { isOpen: boolean };
        theme: string;
        toast: unknown;
      };

      // 테마와 사이드바 상태만 유지
      return {
        theme: state.theme,
        sidebar: state.sidebar,
      };
    }
    return inboundState;
  },
  // 아웃바운드: storage -> state
  (outboundState: Record<string, unknown>, key) => {
    if (key === 'ui') {
      // 저장된 값을 기본 초기 상태와 병합
      return {
        ...outboundState,
        // 일시적 상태는 기본값으로 재설정
        modal: {
          isOpen: false,
          type: null,
          data: null,
        },
        toast: null,
      };
    }
    return outboundState;
  },
  { whitelist: ['ui'] }
);

export const transforms = [authTransform, uiTransform];
