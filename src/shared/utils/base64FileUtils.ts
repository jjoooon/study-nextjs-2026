/**
 * File <-> Base64 변환 유틸리티
 *
 * @description
 * axiosBaseQuery가 body를 JSON으로 직렬화하는 구조를 유지하기 위해
 * 파일을 multipart/form-data 대신 base64 문자열로 인코딩/디코딩합니다.
 */

/**
 * File을 base64 문자열로 변환합니다.
 * @param stripDataUrlPrefix true면 data URL 접두사(`data:...;base64,`)를 제거하고 순수 base64만 반환 (기본: false, 전체 텍스트 반환)
 */
export function fileToBase64(file: File, stripDataUrlPrefix = false): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('파일을 읽는 데 실패했습니다'));
    reader.onload = () => {
      const result = reader.result as string;
      resolve(stripDataUrlPrefix ? result.slice(result.indexOf(',') + 1) : result);
    };

    reader.readAsDataURL(file);
  });
}

/**
 * base64 문자열을 Uint8Array로 변환합니다 (XLSX.read 입력용).
 * data URL(`data:...;base64,`)이 그대로 들어와도 접두사를 제거하고 처리합니다.
 */
export function base64ToUint8Array(base64: string): Uint8Array {
  const pureBase64 = base64.startsWith('data:') ? base64.slice(base64.indexOf(',') + 1) : base64;
  const binaryString = atob(pureBase64);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}
