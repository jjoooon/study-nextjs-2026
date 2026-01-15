/**
 * Dashboard 날짜 유틸리티
 *
 * @description
 * Shared date utilities를 재내보내는 모듈
 * Dashboard feature 전용 유틸리티가 필요한 경우 여기에 추가
 *
 * @deprecated
 * 이 파일은 @/shared/utils/date로 대체되었습니다.
 * 새로운 코드는 shared 모듈을 사용하세요.
 */

// Shared date utilities를 재내보내기
export {
  dateToISOString,
  isoStringToDate,
  getCurrentDateISOString,
  datesToISOStrings,
  isoStringsToDates,
  dateRangeToState,
  dateRangeFromState,
  isValidISOString,
  isValidDateRange,
} from '@/shared/utils/date/dateSerialization';

export {
  todayRange,
  thisWeekRange,
  thisMonthRange,
  last7DaysRange,
  last30DaysRange,
} from '@/shared/utils/date/dateRange';

// Dashboard 전용 타입 재내보내기
export type { DateRange, DateRangeObject } from '@/shared/types/date';
