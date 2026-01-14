/**
 * Dashboard UI 관련 타입
 *
 * @description
 * 대시보드의 UI 상태, 위젯 구성, 레이아웃 등을 정의
 */

// ============================================================================
// WIDGET TYPES
// ============================================================================

/**
 * 위젯 타입
 */
export type WidgetType = 'stats' | 'chart' | 'activity' | 'custom';

/**
 * 위젯 인터페이스
 *
 * @description
 * 대시보드에 표시될 개별 위젯의 구조를 정의
 */
export interface Widget {
  /** 위젯 고유 ID */
  id: string;
  /** 위젯 유형 */
  type: WidgetType;
  /** 표시 순서 */
  position: number;
  /** 표시 여부 */
  isVisible: boolean;
}

// ============================================================================
// LAYOUT TYPES
// ============================================================================

/**
 * 위젯 레이아웃 정보
 *
 * @description
 * 위젯의 화면 내 위치와 크기를 정의
 */
export interface WidgetLayout {
  /** 위젯 ID */
  id: string;
  /** X 좌표 */
  x: number;
  /** Y 좌표 */
  y: number;
  /** 너비 (그리드 단위) */
  w: number;
  /** 높이 (그리드 단위) */
  h: number;
}

// ============================================================================
// UI STATE TYPES
// ============================================================================

/**
 * 대시보드 UI 상태
 *
 * @description
 * 사용자 인터랙션과 관련된 UI 상태를 정의
 */
export interface DashboardUIState {
  /** 현재 드래그 중인 위젯 ID */
  draggingWidgetId: string | null;
  /** 선택된 위젯 ID */
  selectedWidgetId: string | null;
  /** 편집 모드 여부 */
  isEditMode: boolean;
}
