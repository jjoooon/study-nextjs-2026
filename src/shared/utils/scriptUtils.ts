/**
 * 외부 스크립트 로더 유틸리티
 */

export interface LoadScriptOptions {
  async?: boolean;
  defer?: boolean;
  id?: string;
  attributes?: Record<string, string>;
}

/**
 * 외부 스크립트를 동적으로 로드
 * @param src - 로드할 스크립트 URL
 * @param options - 로드 옵션
 * @returns 스크립트 로드 완료 시 resolve되는 Promise
 */
export function loadScript(src: string, options: LoadScriptOptions = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    // 동일한 src를 가진 스크립트가 이미 존재하는지 확인
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    // ID가 제공된 경우 ID로 스크립트 확인
    if (options.id) {
      const scriptById = document.getElementById(options.id);
      if (scriptById) {
        resolve();
        return;
      }
    }

    const script = document.createElement('script');
    script.src = src;

    if (options.async) script.async = true;
    if (options.defer) script.defer = true;
    if (options.id) script.id = options.id;

    // 커스텀 속성 추가
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
    }

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

    document.head.appendChild(script);
  });
}

/**
 * URL 또는 ID로 스크립트 제거
 */
export function unloadScript(srcOrId: string): void {
  const script = document.querySelector(`script[src="${srcOrId}"]`) || document.getElementById(srcOrId);

  if (script) {
    script.remove();
  }
}

/**
 * 스크립트가 이미 로드되었는지 확인
 */
export function isScriptLoaded(srcOrId: string): boolean {
  return !!(document.querySelector(`script[src="${srcOrId}"]`) || document.getElementById(srcOrId));
}
