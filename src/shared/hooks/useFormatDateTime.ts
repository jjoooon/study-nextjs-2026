/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { useCallback } from 'react';

/**
 * useFormatDateTime
 * - ISO 포맷 등 날짜 문자열 데이터를 YYYY-MM-DD HH:mm:ss 형식의 가독성 높은 일자 포맷으로 변환해주는 유틸용 커스텀 훅입니다.
 */
export const useFormatDateTime = () => {
  const formatDateTime = useCallback((isoString?: string | number): string => {
    if (!isoString) return '';
    const strVal = String(isoString);
    try {
      const date = new Date(strVal);
      if (isNaN(date.getTime())) return strVal;

      const yyyy = date.getUTCFullYear();
      const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(date.getUTCDate()).padStart(2, '0');
      const hh = String(date.getUTCHours()).padStart(2, '0');
      const mi = String(date.getUTCMinutes()).padStart(2, '0');
      const ss = String(date.getUTCSeconds()).padStart(2, '0');

      return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    } catch {
      return strVal;
    }
  }, []);

  return { formatDateTime };
};

export default useFormatDateTime;
