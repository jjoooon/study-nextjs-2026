/**
 * Secure Storage Configuration
 *
 * @description
 * Uses sessionStorage instead of localStorage for better security.
 * SessionStorage clears when tab/window closes, reducing attack surface.
 *
 * @security
 * - sessionStorage: cleared on tab close (better than localStorage)
 * - No sensitive tokens should be persisted long-term
 * - Consider httpOnly cookies for production (server-side)
 */

export const createSecureStorage = () => {
  if (typeof window === 'undefined') {
    // SSR fallback
    return {
      getItem: (_key: string) => Promise.resolve(null),
      setItem: (_key: string, _value: string) => Promise.resolve(),
      removeItem: (_key: string) => Promise.resolve(),
    };
  }

  return {
    getItem: (key: string) => {
      return Promise.resolve(sessionStorage.getItem(key));
    },
    setItem: (key: string, value: string) => {
      return Promise.resolve(sessionStorage.setItem(key, value));
    },
    removeItem: (key: string) => {
      return Promise.resolve(sessionStorage.removeItem(key));
    },
  };
};

export const secureStorage = createSecureStorage();
