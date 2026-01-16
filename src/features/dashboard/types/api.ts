/**
 * Dashboard API 관련 타입
 *
 * @description
 * 대시보드 API 요청/응답 타입을 정의
 */

// ============================================================================
// STATS TYPES
// ============================================================================

/**
 * 대시보드 통계 데이터
 *
 * @description
 * 대시보드에 표시될 핵심 지표들을 정의
 */
export interface DashboardStats {
  /** 전체 사용자 수 */
  totalUsers: number;
  /** 활성 사용자 수 */
  activeUsers: number;
  /** 전체 게시글 수 */
  totalPosts: number;
  /** 수익 */
  revenue: number;
  /** 성장률 (백분율) */
  growthRate: number;
}

// ============================================================================
// ACTIVITY TYPES
// ============================================================================

/**
 * 활동 유형
 */
export type ActivityType = 'user' | 'post' | 'comment' | 'login' | 'logout';

/**
 * 활동 항목
 *
 * @description
 * 최근 활동 내역을 나타내는 데이터 구조
 */
export interface ActivityItem {
  /** 활동 고유 ID */
  id: string;
  /** 활동 유형 */
  type: ActivityType;
  /** 활동 메시지 */
  message: string;
  /** 타임스탬프 (ISO 8601) */
  timestamp: string;
  /** 활동을 수행한 사용자 정보 */
  user: {
    name: string;
    email: string;
  };
  /** 추가 메타데이터 */
  metadata?: Record<string, unknown>;
}

// ============================================================================
// DASHBOARD DATA TYPES
// ============================================================================

/**
 * 대시보드 전체 데이터
 *
 * @description
 * 대시보드 페이지에 필요한 모든 데이터를 포함
 */
export interface DashboardData {
  /** 통계 데이터 */
  stats: DashboardStats;
  /** 최근 활동 목록 */
  recentActivity: ActivityItem[];
  /** 위젯 구성 */
  widgets: Widget[];
}

// Forward import from ui.ts to avoid circular dependency
import type { Widget } from './ui';

// ============================================================================
// QUERY PARAM TYPES
// ============================================================================

/**
 * 대시보드 데이터 요청 파라미터
 *
 * @description
 * 대시보드 데이터 조회 시 사용할 쿼리 파라미터
 */
export interface DashboardQueryParams {
  /** 데이터 기간 */
  period?: 'day' | 'week' | 'month' | 'year';
  /** 시작일 (ISO 8601) */
  startDate?: string;
  /** 종료일 (ISO 8601) */
  endDate?: string;
  /** 포함할 위젯 타입 필터 */
  includeWidgetTypes?: string[];
}

// ============================================================================
// RESPONSE WRAPPER TYPES
// ============================================================================

/**
 * API 응답 래퍼
 *
 * @description
 * 대시보드 API의 공통 응답 구조
 */
export interface DashboardApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}
