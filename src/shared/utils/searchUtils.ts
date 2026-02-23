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

  // 초성 문자열과 동일한 인덱스 구조로 위치 매핑 생성
  type CharPosition = { chosungIndex: number; textIndex: number; isHangul: boolean };
  const positions: CharPosition[] = [];
  let chosungIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);
    const isHangul = code >= 0xac00 && code <= 0xd7a3;

    // 한글, 공백, 영문만 포함 (초성 변환 결과와 동일하게)
    if (isHangul || char === ' ' || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      positions.push({ chosungIndex, textIndex: i, isHangul });
      chosungIndex++;
    }
  }

  // 매칭된 구간의 모든 문자 인덱스 수집 (영문, 한글 모두)
  for (let j = 0; j < chosungQuery.length; j++) {
    const pos = positions[matchIndex + j];
    if (pos) {
      indices.push(pos.textIndex);
    }
  }

  return indices;
};

/**
 * 하이라이팅 정보를 반환
 * @param text 하이라이팅할 텍스트
 * @param query 검색어
 * @returns 하이라이팅 구간 배열 {text, highlight}
 *
 * @example
 * getHighlightRanges('사망후유', 'ㅅㅁㅎㅇ') // [{text: '사망후유', highlight: true}]
 * getHighlightRanges('AXA손해보험', 'ㅅㅎ') // [{text: 'AXA', highlight: false}, {text: '손해', highlight: true}, {text: '보험', highlight: false}]
 * getHighlightRanges('Hello World', 'ello') // [{text: 'H', highlight: false}, {text: 'ello', highlight: true}, {text: ' World', highlight: false}]
 */
export const getHighlightRanges = (text: string, query: string): Array<{ text: string; highlight: boolean }> => {
  if (!query.trim()) return [{ text, highlight: false }];

  // 초성 검색인 경우 (정확한 초성 일치)
  if (isChosungQuery(query)) {
    const matchIndices = findChosungMatchIndices(text, query);

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

  // 일반 텍스트 검색인 경우 (정확한 부분 문자열 일치, 띄어쓰기 포함)
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const result: Array<{ text: string; highlight: boolean }> = [];
  let match: RegExpExecArray | null;
  let lastIndex = 0;

  // 단일 패스로 매칭과 비매칭 부분 모두 추출
  while ((match = regex.exec(text)) !== null) {
    // 매칭되지 않은 이전 부분 추가
    if (match.index > lastIndex) {
      result.push({ text: text.slice(lastIndex, match.index), highlight: false });
    }

    // 매칭된 부분 추가
    result.push({ text: match[1], highlight: true });

    lastIndex = regex.lastIndex;
  }

  // 남은 텍스트 추가
  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex), highlight: false });
  }

  return result;
};
