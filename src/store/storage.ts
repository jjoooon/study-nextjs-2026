/**
 * 보안 스토리지 설정
 *
 * @description
 * 더 나은 보안을 위해 localStorage 대신 sessionStorage 사용
 * SessionStorage는 탭/창이 닫히면 지워지므로 공격 표면 감소
 *
 * @security
 * - sessionStorage: 탭 닫을 시 지워짐 (localStorage보다 안전)
 * - 민감한 토큰은 장기간 저장되면 안 됨
 * - 프로덕션에서는 httpOnly 쿠키 고려 (서버 사이드)
 */

export const createSecureStorage = () => {
  if (typeof window === 'undefined') {
    // SSR 대체 처리
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
