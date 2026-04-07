import i18n from 'i18next';

/**
 * 현재 locale 기반으로 번역 메시지를 조회하는 유틸리티
 * i18next를 기반으로 간단하게 메시지를 가져옵니다
 */

/**
 * 현재 locale 조회
 * @returns 현재 locale 코드 (ko, en, jp 등)
 */
export const getCurrentLocale = (): string => {
  return i18n.language || 'ko';
};

/**
 * 현재 locale로 메시지 조회 (간단한 사용)
 * @param key - 번역 키
 * @returns 번역된 메시지
 */
export const getMessage = (key: string): string => {
  return i18n.t(key);
};

/**
 * 지정된 locale으로 메시지 조회
 * @param key - 번역 키 (예: 'header.title')
 * @param locale - 특정 locale (未指定時は현在 locale使用)
 * @returns 번역된 메시지
 */
export const msg = (key: string, locale?: string): string => {
  const targetLocale = locale || getCurrentLocale();
  return i18n.t(key, { lng: targetLocale });
};

/**
 * 메시지 조회 with 기본값
 * @param key - 번역 키
 * @param defaultValue - 번역이 없을 때의 기본값
 * @returns 번역된 메시지 또는 기본값
 */
export const getMessageWithDefault = (key: string, defaultValue: string): string => {
  const message = getMessage(key);
  return message === key ? defaultValue : message; // 키 자체가 반환되면 번역 실패
};

/**
 * Locale 변경
 * @param locale - 변경할 locale 코드
 */
export const setLocale = async (locale: string): Promise<void> => {
  try {
    await i18n.changeLanguage(locale);
    // localStorage와 cookie에 저장
    localStorage.setItem('language', locale);
    document.cookie = `language=${locale}; path=/; max-age=31536000`;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to set locale:', error);
  }
};

/**
 * 사용 가능한 모든 locale 조회
 * @returns locale 옵션 배열
 */
export const getAvailableLocales = (): Array<{ code: string; name: string; flag: string }> => {
  return [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'jp', name: '日本語', flag: '🇯🇵' },
  ];
};
