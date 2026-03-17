/**
 * AG Grid 한국어 로케일 텍스트
 * @see https://ag-grid.com/javascript-data-grid/localisation/
 *
 * @example
 * import { AG_GRID_LOCALE_KO } from '@/shared/constants/agGrid';
 * <AgGridReact localeText={AG_GRID_LOCALE_KO} />
 */
export const AG_GRID_LOCALE_KO: Record<string, string> = {
  // 페이지네이션
  page: '페이지',
  more: '더보기',
  to: '~',
  of: '/',
  firstPage: '첫 페이지',
  previousPage: '이전 페이지',
  nextPage: '다음 페이지',
  lastPage: '마지막 페이지',
  pageSizeSelectorLabel: '페이지 크기',

  // 필터
  filterOoo: '필터...',
  applyFilter: '적용',
  equals: '같음',
  notEqual: '같지 않음',
  lessThan: '미만',
  greaterThan: '초과',
  lessThanOrEqual: '이하',
  greaterThanOrEqual: '이상',
  inRange: '범위',
  contains: '포함',
  notContains: '미포함',
  startsWith: '시작 문자',
  endsWith: '끝 문자',
  blank: '빈 값',
  notBlank: '빈 값 아님',
  andCondition: '그리고',
  orCondition: '또는',

  // 컬럼 메뉴
  columns: '컬럼',
  filters: '필터',
  sortAscending: '오름차순',
  sortDescending: '내림차순',
  sortUnSort: '정렬 해제',
  pinColumn: '컬럼 고정',
  pinLeft: '왼쪽 고정',
  pinRight: '오른쪽 고정',
  noPin: '고정 해제',
  autosizeThisColumn: '이 컬럼 자동 크기',
  autosizeAllColumns: '모든 컬럼 자동 크기',
  resetColumns: '컬럼 초기화',
  expandAll: '모두 펼치기',
  collapseAll: '모두 접기',
  copy: '복사',
  copyWithHeaders: '헤더 포함 복사',
  copyWithGroupHeaders: '그룹 헤더 포함 복사',
  paste: '붙여넣기',
  export: '내보내기',
  csvExport: 'CSV 내보내기',
  excelExport: '엑셀 내보내기',

  // 기타
  loadingOoo: '로딩 중...',
  loading: '로딩 중',
  noRowsToShow: '표시할 데이터가 없습니다.',
  enabled: '사용',
  disabled: '사용 안 함',
  selectAll: '전체 선택',
  selectAllSearchResults: '검색 결과 전체 선택',
  searchOoo: '검색...',
  blanks: '빈 값',
};
