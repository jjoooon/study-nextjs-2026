/**
 * Error Utilities
 *
 * 에러 메시지 추출 및 포맷팅 유틸리티 함수
 */

/**
 * RTK Query 에러 객체에서 메시지 추출
 */
export const getErrorMessage = (error: unknown): string => {
  if (!error) {
    return '알 수 없는 오류가 발생했습니다.';
  }

  // 문자열인 경우
  if (typeof error === 'string') {
    return error;
  }

  // 객체인 경우
  if (typeof error === 'object' && error !== null) {
    // SerializedError 형태 (RTK Query)
    if ('data' in error && error.data) {
      if (typeof error.data === 'string') {
        return error.data;
      }
      if (typeof error.data === 'object' && 'message' in error.data) {
        return (error.data as { message: string }).message;
      }
    }

    // 표준 Error 형태
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }

    // Fetch API Error 형태
    if ('status' in error) {
      return `서버 오류가 발생했습니다 (상태 코드: ${(error as { status: number }).status})`;
    }
  }

  return '알 수 없는 오류가 발생했습니다.';
};
