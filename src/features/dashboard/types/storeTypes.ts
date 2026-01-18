/**
 * Dashboard Store 상태 타입
 *
 * @description
 * Redux Slice 상태 구조와 액션 Payload 타입을 정의
 */

import type { Widget } from './uiTypes';

// ============================================================================
// STATE TYPES
// ============================================================================

/**
 * Dashboard UI 상태
 *
 * @description
 * 대시보드의 Redux 상태 구조를 정의
 *
 * @note
 * API 데이터는 RTK Query (dashboardApiSlice)에서 관리
 * 이 상태는 오직 UI 상태(위젯 구성)만 관리
 */
export interface DashboardState {
  /** 위젯 목록 */
  widgets: Widget[];
  /** 레이아웃 상태 */
  layout: {
    /** 드래그 중 여부 */
    isDragging: boolean;
    /** 선택된 위젯 ID */
    selectedWidget: string | null;
  };
  /** 필터 상태 */
  filters: {
    /** 날짜 범위 */
    dateRange: {
      /** 시작 날짜 (ISO 8601 문자열) */
      start: string;
      /** 종료 날짜 (ISO 8601 문자열) */
      end: string;
    };
  };
}

// ============================================================================
// ACTION PAYLOAD TYPES
// ============================================================================

/**
 * 위젯 토글 액션 Payload
 */
export interface ToggleWidgetPayload {
  /** 위젯 ID */
  widgetId: string;
  /** 표시 여부 (선택적) */
  isVisible?: boolean;
}

/**
 * 위젯 순서 변경 액션 Payload
 */
export interface ReorderWidgetsPayload {
  /** 원본 인덱스 */
  sourceIndex: number;
  /** 대상 인덱스 */
  destIndex: number;
}

/**
 * 위젯 추가 액션 Payload
 */
export interface AddWidgetPayload {
  /** 위젯 정보 */
  widget: Widget;
  /** 추가할 위치 (선택적, 지정하지 않으면 마지막) */
  position?: number;
}

/**
 * 위젯 제거 액션 Payload
 */
export interface RemoveWidgetPayload {
  /** 제거할 위젯 ID */
  widgetId: string;
}

/**
 * 위젯 업데이트 액션 Payload
 */
export interface UpdateWidgetPayload {
  /** 위젯 ID */
  widgetId: string;
  /** 업데이트할 속성 */
  updates: Partial<Omit<Widget, 'id'>>;
}

/**
 * 위젯 선택 액션 Payload
 */
export interface SelectWidgetPayload {
  /** 선택할 위젯 ID (null = 선택 해제) */
  widgetId: string | null;
}
