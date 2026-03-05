'use client';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageCode, getAvailableLanguageCodes } from '@/shared/lib/i18n';

/**
 * Custom hook to manage language switching with i18next
 * Provides translation function and language management utilities
 */
export const useLanguage = () => {
  const { i18n, t } = useTranslation('common');

  const changeLanguage = useCallback(
    async (langCode: LanguageCode) => {
      try {
        if (i18n && typeof i18n.changeLanguage === 'function') {
          await i18n.changeLanguage(langCode);
          // Store preference in localStorage
          // localStorage.setItem('language', langCode);
          // Store in cookie for server-side access
          // document.cookie = `language=${langCode}; path=/; max-age=31536000`;
        } else {
          console.error('i18n.changeLanguage is not available');
        }
      } catch (error) {
        console.error('Failed to change language:', error);
      }
    },
    [i18n]
  );

  const getCurrentLanguage = useCallback((): LanguageCode => {
    return (i18n.language as LanguageCode) || 'ko';
  }, [i18n.language]);

  const getAvailableLanguages = useCallback((): LanguageCode[] => {
    return getAvailableLanguageCodes();
  }, []);

  return {
    t,
    changeLanguage,
    getCurrentLanguage,
    getAvailableLanguages,
    i18n,
  };
};
