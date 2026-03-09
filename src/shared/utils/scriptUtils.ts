/**
 * 외부 스크립트 로더 유틸리티
 */

export interface LoadScriptOptions {
  async?: boolean;
  defer?: boolean;
  id?: string;
  attributes?: Record<string, string>;
}

export interface WaitForGlobalOptions {
  timeout?: number; // ms
  interval?: number; // ms
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

/**
 * 전역 변수가 생성될 때까지 대기
 * @param name - 전역 변수 이름
 * @param options - 대기 옵션
 */
export function waitForGlobal(name: string, options: WaitForGlobalOptions = {}): Promise<void> {
  const { timeout = 5000, interval = 50 } = options;

  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkGlobal = () => {
      if (window[name as keyof Window] !== undefined) {
        resolve();
        return;
      }

      if (Date.now() - startTime >= timeout) {
        reject(new Error(`Timeout waiting for global variable: ${name}`));
        return;
      }

      setTimeout(checkGlobal, interval);
    };

    checkGlobal();
  });
}

/**
 * 여러 전역 변수가 생성될 때까지 대기
 * @param names - 전역 변수 이름 배열
 * @param options - 대기 옵션
 */
export function waitForGlobals(names: string[], options: WaitForGlobalOptions = {}): Promise<void> {
  return Promise.all(names.map((name) => waitForGlobal(name, options))).then(() => {});
}

/**
 * 스크립트를 로드하고 특정 전역 변수가 생성될 때까지 대기
 * @param src - 로드할 스크립트 URL
 * @param globalName - 기다릴 전역 변수 이름
 * @param options - 로드 옵션
 */
export async function loadScriptWithGlobal(
  src: string,
  globalName: string,
  options: LoadScriptOptions = {}
): Promise<void> {
  await loadScript(src, options);
  await waitForGlobal(globalName);
}
