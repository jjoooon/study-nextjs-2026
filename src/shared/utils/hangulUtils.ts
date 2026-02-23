/**
 * 한글 처리 유틸리티
 */

const CHOSUNG = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

/**
 * 한글 문자열에서 초성만 추출
 * @param text 변환할 텍스트
 * @returns 초성으로 변환된 텍스트
 *
 * @example
 * getChosung('사망후유') // 'ㅅㅎㅎㅇ'
 * getChosung('3대진단') // '3ㄷㅈㄷ'
 */
export const getChosung = (text: string): string => {
  const result: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);

    // 한글 범위: 가(0xAC00) ~ 힣(0xD7A3)
    if (code >= 0xac00 && code <= 0xd7a3) {
      const startIndex = (code - 0xac00) / 28 / 21;
      result.push(CHOSUNG[Math.floor(startIndex)]);
    } else {
      result.push(char);
    }
  }

  return result.join('');
};

/**
 * 검색어가 초성으로만 구성되어 있는지 확인
 * @param query 검색어
 * @returns 초성 쿼리 여부
 *
 * @example
 * isChosungQuery('ㅅㅎㅎㅇ') // true
 * isChosungQuery('사망') // false
 */
export const isChosungQuery = (query: string): boolean => {
  const chosungPattern = /^[ㄱ-ㅎ|]+$/;
  return chosungPattern.test(query);
};

/**
 * 텍스트의 초성이 검색어와 매칭되는지 확인
 * @param text 검색 대상 텍스트
 * @param chosungQuery 초성 검색어
 * @returns 매칭 여부
 *
 * @example
 * matchesChosung('사망후유', 'ㅅㅎㅎㅇ') // true
 * matchesChosung('가입금액', 'ㄱㅇ') // true
 */
export const matchesChosung = (text: string, chosungQuery: string): boolean => {
  const textChosung = getChosung(text);
  return textChosung.includes(chosungQuery);
};
