/**
 * Dashboard Feature Constants
 *
 * @description
 * 대시보드 Feature 전용 상수
 */

/**
 * 대시보드 위젯 타입
 */
export const WIDGET_TYPE = {
  /** 통계 카드 */
  STATS: 'stats',

  /** 차트 */
  CHART: 'chart',

  /** 목록 */
  LIST: 'list',

  /** 액티비티 */
  ACTIVITY: 'activity',

  /** 캘린더 */
  CALENDAR: 'calendar',
} as const;

export type WidgetType = (typeof WIDGET_TYPE)[keyof typeof WIDGET_TYPE];

/**
 * 차트 타입
 */
export const CHART_TYPE = {
  /** 선 그래프 */
  LINE: 'line',

  /** 막대 그래프 */
  BAR: 'bar',

  /** 원 그래프 */
  PIE: 'pie',

  /** 도넛 그래프 */
  DOUGHNUT: 'doughnut',

  /** 영역 그래프 */
  AREA: 'area',
} as const;

export type ChartType = (typeof CHART_TYPE)[keyof typeof CHART_TYPE];

/**
 * 대시보드 기간
 */
export const DASHBOARD_PERIOD = {
  /** 오늘 */
  TODAY: 'today',

  /** 이번 주 */
  WEEK: 'week',

  /** 이번 달 */
  MONTH: 'month',

  /** 이번 분기 */
  QUARTER: 'quarter',

  /** 올해 */
  YEAR: 'year',

  /** 전체 */
  ALL: 'all',
} as const;

export type DashboardPeriod = (typeof DASHBOARD_PERIOD)[keyof typeof DASHBOARD_PERIOD];

/**
 * 대시보드 기간 라벨
 */
export const DASHBOARD_PERIOD_LABELS: Record<DashboardPeriod, string> = {
  today: '오늘',
  week: '이번 주',
  month: '이번 달',
  quarter: '이번 분기',
  year: '올해',
  all: '전체',
} as const;

/**
 * 통계 카드 기본값
 */
export const STATS_DEFAULTS = {
  /** 기간 */
  period: DASHBOARD_PERIOD.MONTH,

  /** 이전 기간과 비교 */
  showComparison: true,

  /** 추세 표시 */
  showTrend: true,
} as const;

/**
 * 차트 기본값
 */
export const CHART_DEFAULTS = {
  /** 기간 */
  period: DASHBOARD_PERIOD.MONTH,

  /** 차트 타입 */
  type: CHART_TYPE.LINE,

  /** 애니메이션 */
  animated: true,

  /** 범례 표시 */
  showLegend: true,

  /** 툴팁 표시 */
  showTooltip: true,
} as const;

/**
 * 대시보스 위젯 크기
 */
export const WIDGET_SIZE = {
  SMALL: {
    cols: 1,
    rows: 1,
  },
  MEDIUM: {
    cols: 2,
    rows: 1,
  },
  LARGE: {
    cols: 2,
    rows: 2,
  },
  WIDE: {
    cols: 3,
    rows: 1,
  },
  FULL: {
    cols: 3,
    rows: 2,
  },
} as const;

export type WidgetSize = keyof typeof WIDGET_SIZE;

/**
 * 최대 위젯 수
 */
export const MAX_WIDGETS = 12;

/**
 * 위젯 새로고침 간격 (ms)
 */
export const WIDGET_REFRESH_INTERVAL = 60000; // 1분

/**
 * 최대 액티비티 표시 수
 */
export const MAX_ACTIVITIES = 10;

/**
 * 대시보드 관련 에러 메시지
 */
export const DASHBOARD_ERROR_MESSAGES = {
  LOAD_FAILED: '대시보스 로딩에 실패했습니다.',
  WIDGET_LOAD_FAILED: '위젯 로딩에 실패했습니다.',
  STATS_LOAD_FAILED: '통계 로딩에 실패했습니다.',
  CHART_LOAD_FAILED: '차트 로딩에 실패했습니다.',
} as const;

/**
 * 데이터 새로고침 관련 상수
 */
export const REFRESH = {
  /** 자동 새로고침 간격 (ms) */
  INTERVAL: 60000, // 1분

  /** 수동 새로고침 디바운스 (ms) */
  DEBOUNCE: 1000,

  /** 실패 시 재시도 횟수 */
  RETRY_COUNT: 3,

  /** 실패 시 재시도 간격 (ms) */
  RETRY_DELAY: 5000,
} as const;

/**
 * 대시보스 색상 (차트용)
 */
export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#22c55e',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#0ea5e9',
  PURPLE: '#8b5cf6',
  PINK: '#ec4899',
  CYAN: '#06b6d4',
} as const;

/**
 * 대시보스 레이아웃
 */
export const DASHBOARD_LAYOUT = {
  /** 그리드 컬럼 수 */
  COLUMNS: 3,

  /** 위젯 간 간격 (px) */
  GAP: 16,

  /** 최소 위젯 너비 (px) */
  MIN_WIDGET_WIDTH: 300,

  /** 최소 위젯 높이 (px) */
  MIN_WIDGET_HEIGHT: 200,
} as const;

/**
 * 액티비티 타입
 */
export const ACTIVITY_TYPE = {
  /** 생성 */
  CREATE: 'create',

  /** 수정 */
  UPDATE: 'update',

  /** 삭제 */
  DELETE: 'delete',

  /** 로그인 */
  LOGIN: 'login',

  /** 로그아웃 */
  LOGOUT: 'logout',

  /** 다운로드 */
  DOWNLOAD: 'download',

  /** 업로드 */
  UPLOAD: 'upload',
} as const;

export type ActivityType = (typeof ACTIVITY_TYPE)[keyof typeof ACTIVITY_TYPE];

/**
 * 액티비티 타입 아이콘
 */
export const ACTIVITY_ICONS: Record<ActivityType, string> = {
  create: 'plus',
  update: 'edit',
  delete: 'trash',
  login: 'log-in',
  logout: 'log-out',
  download: 'download',
  upload: 'upload',
} as const;

/**
 * 액티비티 타입 색상
 */
export const ACTIVITY_COLORS: Record<ActivityType, string> = {
  create: CHART_COLORS.SUCCESS,
  update: CHART_COLORS.PRIMARY,
  delete: CHART_COLORS.ERROR,
  login: CHART_COLORS.INFO,
  logout: CHART_COLORS.WARNING,
  download: CHART_COLORS.PURPLE,
  upload: CHART_COLORS.CYAN,
} as const;

/**
 * 테이블 표시 행 수
 */
export const TABLE_ROWS = {
  DEFAULT: 10,
  OPTIONS: [5, 10, 20, 50] as const,
} as const;

/**
 * 대시보스 로딩 상태
 */
export const DASHBOARD_LOADING_STATE = {
  /** 초기 로딩 */
  INITIAL: 'initial',

  /** 로딩 중 */
  LOADING: 'loading',

  /** 성공 */
  SUCCESS: 'success',

  /** 실패 */
  ERROR: 'error',

  /** 새로고침 중 */
  REFRESHING: 'refreshing',
} as const;

export type DashboardLoadingState = (typeof DASHBOARD_LOADING_STATE)[keyof typeof DASHBOARD_LOADING_STATE];
