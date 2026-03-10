/**
 * 검색 유틸리티
 * - 한글 초성 검색
 * - 텍스트 하이라이팅
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
 * getChosung('형 한') // 'ㅎ ㅎ' (공백 유지)
 */
export const getChosung = (text: string): string => {
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);

    // 한글 범위: 가(0xAC00) ~ 힣(0xD7A3)
    if (code >= 0xac00 && code <= 0xd7a3) {
      result += CHOSUNG[Math.floor((code - 0xac00) / 28 / 21)];
    } else {
      result += text[i];
    }
  }

  return result;
};

/**
 * 검색어가 초성 검색이 필요한지 확인 (공백, 영문 허용)
 * @param query 검색어
 * @returns 초성 쿼리 여부
 *
 * @example
 * isChosungQuery('ㅅㅎㅎㅇ') // true
 * isChosungQuery('ㅅㅎ ㅎㅇ') // true (공백 허용)
 * isChosungQuery('DBㅅㅎㅂㅎ') // true (영문+초성 허용)
 * isChosungQuery('사망') // false
 */
export const isChosungQuery = (query: string): boolean => {
  // 한글 완성형 문자가 없으면 초성 검색으로 처리
  const hasCompleteHangul = /[가-힣]/.test(query);
  return !hasCompleteHangul && query.length > 0;
};

/**
 * 텍스트의 초성이 검색어와 매칭되는지 확인 (정확한 일치)
 * @param text 검색 대상 텍스트
 * @param chosungQuery 초성 검색어
 * @returns 매칭 여부
 *
 * @example
 * matchesChosung('사망후유', 'ㅅㅎ') // true
 * matchesChosung('사망후유', 'ㅅ ㅎ') // false
 */
export const matchesChosung = (text: string, chosungQuery: string): boolean => {
  const textChosung = getChosung(text);
  return textChosung.includes(chosungQuery);
};

/**
 * 초성 검색어에 매칭되는 문자의 인덱스를 찾음 (정확한 일치, 공백 포함, 대소문자 무시)
 * @param text 검색 대상 텍스트
 * @param chosungQuery 초성 검색어
 * @returns 매칭되는 문자의 인덱스 배열
 *
 * @example
 * findChosungMatchIndices('사망후유', 'ㅅㅎ') // [0, 1]
 * findChosungMatchIndices('비갱신형 한국...', 'ㅎ ㅎ') // [3, 5] - '형', '한'
 * findChosungMatchIndices('DB손해보험 해외여행보험', 'ㅎ ㅎ') // [마지막-1, 마지막-5] - '험', '해'
 * findChosungMatchIndices('DB손해보험', 'dbㅅㅎㅂㅎ') // [0, 1, 2, 3, 4] - 'DB손해보험' 전체
 */
export const findChosungMatchIndices = (text: string, chosungQuery: string): number[] => {
  const textChosung = getChosung(text);
  const matchIndex = textChosung.toLowerCase().indexOf(chosungQuery.toLowerCase());

  if (matchIndex === -1) return [];

  const indices: number[] = [];
  let chosungIndex = 0;
  let matchedCount = 0;
  const queryLen = chosungQuery.length;

  // 단일 순회로 매칭된 인덱스 추적 (positions 배열 제거로 성능 개선)
  for (let i = 0; i < text.length && matchedCount < queryLen; i++) {
    // getChosung는 모든 문자를 반환하므로, 모든 문자를 카운트해야 인덱스 매핑이 정확함
    if (chosungIndex >= matchIndex && matchedCount < queryLen) {
      indices.push(i);
      matchedCount++;
    }
    chosungIndex++; // 모든 문자를 카운트 (getChosung 동작과 동일하게)
  }

  // 정확히 매칭된 경우에만 반환
  return matchedCount === queryLen ? indices : [];
};

/**
 * 하이라이팅 정보를 반환
 * @param text 하이라이팅할 텍스트
 * @param query 검색어 (문자열 또는 문자열 배열)
 * @returns 하이라이팅 구간 배열 {text, highlight}
 *
 * @example
 * getHighlightRanges('사망후유', 'ㅅㅁㅎㅇ') // [{text: '사망후유', highlight: true}]
 * getHighlightRanges('AXA손해보험', 'ㅅㅎ') // [{text: 'AXA', highlight: false}, {text: '손해', highlight: true}, {text: '보험', highlight: false}]
 * getHighlightRanges('Hello World', 'ello') // [{text: 'H', highlight: false}, {text: 'ello', highlight: true}, {text: ' World', highlight: false}]
 * getHighlightRanges('AXA손해보험', ['ㅅㅎ', '보험']) // 여러 검색어 모두 하이라이트
 * getHighlightRanges('Hello World', ['ello', 'World']) // 여러 검색어 모두 하이라이트
 */
export const getHighlightRanges = (
  text: string,
  query: string | string[]
): Array<{ text: string; highlight: boolean }> => {
  const queries = Array.isArray(query) ? query : [query];

  // 모든 쿼리가 비어있는 경우
  if (queries.length === 0 || queries.every((q) => q.length === 0)) {
    return [{ text, highlight: false }];
  }

  // 모든 하이라이트 범위를 추적하기 위한 배열 (시작, 끝)
  const highlightRanges: Array<[number, number]> = [];

  for (const singleQuery of queries) {
    if (singleQuery.length === 0) continue;

    // 초성 검색인 경우 (정확한 초성 일치)
    if (isChosungQuery(singleQuery)) {
      const matchIndices = findChosungMatchIndices(text, singleQuery);

      if (matchIndices.length > 0) {
        const startIndex = matchIndices[0];
        const endIndex = matchIndices[matchIndices.length - 1];
        highlightRanges.push([startIndex, endIndex]);
      }
    } else {
      // 일반 텍스트 검색인 경우 (정확한 부분 문자열 일치, 띄어쓰기 포함)
      const escapedQuery = singleQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedQuery, 'gi');
      let match: RegExpExecArray | null;

      while ((match = regex.exec(text)) !== null) {
        highlightRanges.push([match.index, match.index + match[0].length - 1]);
      }
    }
  }

  // 범위가 없으면 하이라이트 없이 반환
  if (highlightRanges.length === 0) {
    return [{ text, highlight: false }];
  }

  // 범위 병합 (겹치는 또는 인접한 범위들을 합침)
  highlightRanges.sort((a, b) => a[0] - b[0]);
  const mergedRanges: Array<[number, number]> = [highlightRanges[0]];

  for (let i = 1; i < highlightRanges.length; i++) {
    const lastRange = mergedRanges[mergedRanges.length - 1];
    const currentRange = highlightRanges[i];

    // 범위가 겹치거나 인접하면 병합
    if (currentRange[0] <= lastRange[1] + 1) {
      lastRange[1] = Math.max(lastRange[1], currentRange[1]);
    } else {
      mergedRanges.push(currentRange);
    }
  }

  // 병합된 범위를 기반으로 결과 구성
  const result: Array<{ text: string; highlight: boolean }> = [];
  let lastIndex = 0;

  for (const [startIndex, endIndex] of mergedRanges) {
    // 하이라이트되지 않은 텍스트 추가
    if (startIndex > lastIndex) {
      result.push({ text: text.slice(lastIndex, startIndex), highlight: false });
    }

    // 하이라이트된 텍스트 추가
    result.push({ text: text.slice(startIndex, endIndex + 1), highlight: true });

    lastIndex = endIndex + 1;
  }

  // 남은 텍스트 추가
  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex), highlight: false });
  }

  return result;
};
