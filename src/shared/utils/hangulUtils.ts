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

/**
 * 초성 검색어에 매칭되는 문자의 인덱스를 찾음
 * @param text 검색 대상 텍스트
 * @param chosungQuery 초성 검색어
 * @param fuzzy 비연속 매칭 허용 여부 (기본값: true)
 * @returns 매칭되는 문자의 인덱스 배열
 *
 * @example
 * findChosungMatchIndices('사망후유', 'ㅅㅎ', true) // [0, 2] - fuzzy 허용
 * findChosungMatchIndices('사망후유', 'ㅅㅎ', false) // [0, 1] - 연속만
 * findChosungMatchIndices('가입금액', 'ㄱㅇ') // [0, 1]
 */
export const findChosungMatchIndices = (
  text: string,
  chosungQuery: string,
  fuzzy: boolean = true
): number[] => {
  const indices: number[] = [];
  let queryIndex = 0;

  for (let i = 0; i < text.length && queryIndex < chosungQuery.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);

    // 한글만 검사
    if (code >= 0xac00 && code <= 0xd7a3) {
      const startIndex = Math.floor((code - 0xac00) / 28 / 21);
      if (CHOSUNG[startIndex] === chosungQuery[queryIndex]) {
        indices.push(i);
        queryIndex++;

        // 연속 매칭만 허용하는 경우, 다음 문자가 바로 매칭되지 않으면 중단
        if (!fuzzy && queryIndex < chosungQuery.length) {
          const nextChar = text[i + 1];
          if (nextChar) {
            const nextCode = nextChar.charCodeAt(0);
            if (nextCode >= 0xac00 && nextCode <= 0xd7a3) {
              const nextStartIndex = Math.floor((nextCode - 0xac00) / 28 / 21);
              if (CHOSUNG[nextStartIndex] !== chosungQuery[queryIndex]) {
                return [];
              }
            }
          }
        }
      }
    }
  }

  // 전체 검색어가 매칭된 경우에만 반환
  return queryIndex === chosungQuery.length ? indices : [];
};

/**
 * 하이라이팅 정보를 반환
 * @param text 하이라이팅할 텍스트
 * @param query 검색어
 * @param fuzzy 초성 검색 시 fuzzy 매칭 허용 여부 (기본값: true)
 * @returns 하이라이팅 구간 배열 {text, highlight}
 *
 * @example
 * getHighlightRanges('사망후유', 'ㅅㅎㅎㅇ') // [{text: '사망후유', highlight: true}]
 * getHighlightRanges('AXA손해보험', 'ㅅㅎ') // [{text: 'AXA', highlight: false}, {text: '손해', highlight: true}, {text: '보험', highlight: false}]
 */
export const getHighlightRanges = (
  text: string,
  query: string,
  fuzzy: boolean = true
): Array<{ text: string; highlight: boolean }> => {
  if (!query.trim()) return [{ text, highlight: false }];

  // 초성 검색인 경우
  if (isChosungQuery(query)) {
    const matchIndices = findChosungMatchIndices(text, query, fuzzy);

    if (matchIndices.length === 0) return [{ text, highlight: false }];

    // 연속된 인덱스를 그룹화하여 구간 단위로 하이라이팅
    const result: Array<{ text: string; highlight: boolean }> = [];
    let lastIndex = 0;
    let i = 0;

    while (i < matchIndices.length) {
      const startIndex = matchIndices[i];

      // 이전 텍스트 추가
      if (startIndex > lastIndex) {
        result.push({ text: text.slice(lastIndex, startIndex), highlight: false });
      }

      // 연속된 구간 찾기
      let endIndex = startIndex;
      while (i + 1 < matchIndices.length && matchIndices[i + 1] === endIndex + 1) {
        i++;
        endIndex = matchIndices[i];
      }

      result.push({ text: text.slice(startIndex, endIndex + 1), highlight: true });

      lastIndex = endIndex + 1;
      i++;
    }

    // 남은 텍스트 추가
    if (lastIndex < text.length) {
      result.push({ text: text.slice(lastIndex), highlight: false });
    }

    return result;
  }

  // 일반 텍스트 검색인 경우
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part) => ({
    text: part,
    highlight: regex.test(part),
  }));
};
