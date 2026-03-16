/**
 * UI 개인화 설정 타입
 *
 * @description
 * 사용자별 UI 환경 설정을 관리합니다.
 *
 * @features
 * - 확대/축소 배율
 * - 테마 설정 (추가 예정)
 * - 레이아웃 설정 (추가 예정)
 */

/**
 * UI 개인화 상태 타입
 */
export interface UIState {
  /** 페이지 확대/축소 배율 (0.5 ~ 2.0, 기본값: 1.0) */
  zoom: number;

  /** 테마 설정 (추가 예정) */
  // theme: 'light' | 'dark' | 'auto';

  /** 사이드바 상태 (추가 예정) */
  // sidebarCollapsed: boolean;
}
