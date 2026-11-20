import { themeQuartz } from 'ag-grid-community';

export const hanwhaStyleTheme = themeQuartz.withParams({
  // 폰트 및 기본 컬러
  fontFamily: 'Pretendard, -apple-system, sans-serif',
  fontSize: 12,
  foregroundColor: '#333333',
  backgroundColor: '#f5f5f5', // 데이터가 없는 하단 빈 영역 배경색 (background fill: gray-light)

  // 외곽 테두리 제거 (상/하단 라인만 별도 제어)
  wrapperBorder: false,
  wrapperBorderRadius: 0,

  // 헤더 스타일
  headerBackgroundColor: '#f2f2f2',
  headerTextColor: '#111111',
  headerFontWeight: 700,
  headerHeight: 34,
  headerColumnBorder: { style: 'solid', width: 1, color: '#e5e5e5' },
  headerColumnResizeHandleColor: 'transparent',

  // 행(Row) 및 홀짝 배경
  rowHeight: 30,
  oddRowBackgroundColor: '#f9f9f9', // 짝수번째(0-index 기준 odd) 연회색 줄무늬
  rowHoverColor: '#f0f4f8',
  selectedRowBackgroundColor: '#fff5f0',

  // 셀 간격 및 테두리
  cellHorizontalPadding: 8,
  rowBorder: { style: 'solid', width: 1, color: '#ebebeb' },
  columnBorder: { style: 'solid', width: 1, color: '#ebebeb' },

  // 체크박스 포인트 컬러 (시안의 오렌지 톤)
  accentColor: '#ff5c00',
  checkboxCheckedBackgroundColor: '#ff5c00',
  checkboxCheckedBorderColor: '#ff5c00',

  // 에디팅 포커스 테두리 (시안의 100 입력창 검은 테두리)
  focusShadow: 'none',
  inputFocusBorder: { style: 'solid', width: 1.5, color: '#111111' },
});
