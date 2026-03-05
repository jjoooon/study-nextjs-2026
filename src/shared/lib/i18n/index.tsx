import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import koCommon from './locales/ko/common.json';
import enCommon from './locales/en/common.json';
import jpCommon from './locales/jp/common.json';

/**
 * Initialize i18next for client-side usage with local locale files
 * Uses static imports for translation files and starts with Korean
 */
export const initializeI18n = () => {
  if (i18n.isInitialized) {
    return i18n;
  }

  i18n
    .use(initReactI18next)
    .init({
      lng: 'ko',
      fallbackLng: 'ko',
      defaultNS: 'common',
      ns: ['common'],
      resources: {
        ko: { common: koCommon },
        en: { common: enCommon },
        jp: { common: jpCommon },
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

  return i18n;
};

/**
 * Available languages configuration
 */
export const AVAILABLE_LANGUAGES = {
  ko: { name: '한국어', flag: '🇰🇷' },
  en: { name: 'English', flag: '🇺🇸' },
  jp: { name: '日本語', flag: '🇯🇵' },
} as const;

export type LanguageCode = keyof typeof AVAILABLE_LANGUAGES;

/**
 * Get language name from language code
 */
export const getLanguageName = (langCode: LanguageCode): string => {
  return AVAILABLE_LANGUAGES[langCode]?.name || langCode;
};

/**
 * Get all available language codes
 */
export const getAvailableLanguageCodes = (): LanguageCode[] => {
  return Object.keys(AVAILABLE_LANGUAGES) as LanguageCode[];
};

export default i18n;