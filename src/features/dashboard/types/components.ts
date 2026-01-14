/**
 * Dashboard 컴포넌트 Props 타입
 *
 * @description
 * 대시보드 컴포넌트들의 인터페이스를 정의
 */

import type { DashboardStats, ActivityItem } from './api';
import type { Widget } from './ui';

// ============================================================================
// DASHBOARD STATS COMPONENT
// ============================================================================

/**
 * DashboardStats 컴포넌트 Props
 *
 * @description
 * 통계 카드 컴포넌트의 속성을 정의
 */
export interface DashboardStatsProps {
  /** 통계 데이터 */
  stats?: DashboardStats;
  /** 로딩 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 새로고침 핸들러 */
  onRefresh?: () => void;
  /** 표시할 통계 항목 (선택적) */
  statsToShow?: Array<keyof DashboardStats>;
}

// ============================================================================
// RECENT ACTIVITY COMPONENT
// ============================================================================

/**
 * RecentActivity 컴포넌트 Props
 *
 * @description
 * 최근 활동 목록 컴포넌트의 속성을 정의
 */
export interface RecentActivityProps {
  /** 활동 데이터 목록 */
  activities?: ActivityItem[];
  /** 로딩 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 표시할 최대 항목 수 */
  maxItems?: number;
  /** 전체 보기 핸들러 */
  onViewAll?: () => void;
  /** 활동 항목 클릭 핸들러 */
  onActivityClick?: (activity: ActivityItem) => void;
  /** 자동 새로고침 간격 (밀리초, 0 = 비활성화) */
  refreshInterval?: number;
}

// ============================================================================
// WIDGET COMPONENT
// ============================================================================

/**
 * Widget 컴포넌트 Props
 *
 * @description
 * 개별 위젯 컴포넌트의 속성을 정의
 */
export interface WidgetProps {
  /** 위젯 정보 */
  widget: Widget;
  /** 로딩 여부 */
  isLoading?: boolean;
  /** 위젯 토글 핸들러 */
  onToggle?: (widgetId: string) => void;
  /** 위젯 편집 핸들러 */
  onEdit?: (widgetId: string) => void;
  /** 위젯 삭제 핸들러 */
  onDelete?: (widgetId: string) => void;
  /** 위젯 데이터 (타입에 따라 다름) */
  data?: unknown;
  /** 에러 메시지 */
  error?: string | null;
}

/**
 * WidgetContainer 컴포넌트 Props
 *
 * @description
 * 위젯을 감싸는 컨테이너 컴포넌트의 속성
 */
export interface WidgetContainerProps {
  /** 자식 컴포넌트 (위젯 내용) */
  children: React.ReactNode;
  /** 위젯 정보 */
  widget: Widget;
  /** 드래그 가능 여부 */
  draggable?: boolean;
  /** 드래그 시작 핸들러 */
  onDragStart?: (widgetId: string) => void;
  /** 드래그 종료 핸들러 */
  onDragEnd?: () => void;
}

// ============================================================================
// DASHBOARD LAYOUT COMPONENT
// ============================================================================

/**
 * DashboardLayout 컴포넌트 Props
 *
 * @description
 * 대시보드 전체 레이아웃 컴포넌트의 속성
 */
export interface DashboardLayoutProps {
  /** 자식 컴포넌트들 */
  children: React.ReactNode;
  /** 현재 레이아웃 모드 */
  mode?: 'view' | 'edit';
  /** 모드 변경 핸들러 */
  onModeChange?: (mode: 'view' | 'edit') => void;
  /** 로딩 여부 */
  isLoading?: boolean;
}

// ============================================================================
// WIDGET SETTINGS COMPONENT
// ============================================================================

/**
 * WidgetSettings 컴포넌트 Props
 *
 * @description
 * 위젯 설정 패널 컴포넌트의 속성
 */
export interface WidgetSettingsProps {
  /** 설정 대상 위젯 */
  widget: Widget;
  /** 설정 저장 핸들러 */
  onSave: (widgetId: string, settings: unknown) => void;
  /** 설정 취소 핸들러 */
  onCancel: () => void;
  /** 설정 패널 열림 여부 */
  isOpen: boolean;
  /** 닫기 핸들러 */
  onClose: () => void;
}
