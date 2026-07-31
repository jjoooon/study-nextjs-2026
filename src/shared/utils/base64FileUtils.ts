/**
 * File <-> Base64 변환 유틸리티
 *
 * @description
 * axiosBaseQuery가 body를 JSON으로 직렬화하는 구조를 유지하기 위해
 * 파일을 multipart/form-data 대신 base64 문자열로 인코딩/디코딩합니다.
 */

/**
 * File을 base64 문자열로 변환합니다 (data URL 접두사는 제거하고 반환)
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('파일을 읽는 데 실패했습니다'));
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.slice(result.indexOf(',') + 1);
      resolve(base64);
    };

    reader.readAsDataURL(file);
  });
}

/**
 * base64 문자열을 Uint8Array로 변환합니다 (XLSX.read 입력용)
 */
export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}
