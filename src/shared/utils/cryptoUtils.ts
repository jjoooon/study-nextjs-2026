/**
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
/**
 * Crypto Utilities
 *
 * @description
 * 응답 페이로드 암복호화를 위한 Web Crypto API 유틸리티
 * - 서버 공개키(JWK) import
 * - 응답 암복호화용 AES-256-GCM 키 생성 및 RSA-OAEP 래핑
 *
 * @usage
 * import { importServerPublicKey, createResponseCipherKey } from '@/shared/utils/cryptoUtils';
 *
 * const serverPublicKey = await importServerPublicKey(publicJwk);
 * const { key, wrappedKey } = await createResponseCipherKey(serverPublicKey);
 * // wrappedKey는 요청에 실어 서버로 전송, key는 응답 복호화에 사용
 */

/**
 * 응답 암복호화에 쓰이는 AES 키(클라이언트: 복호화, 서버: 암호화)와, 서버로 전송할 래핑된 키
 */
export interface ResponseCipherKey {
  /** 응답 복호화에 사용할 CryptoKey (AES-256-GCM) */
  key: CryptoKey;
  /** 서버 공개키로 래핑된 키 (base64) — 요청에 실어 전송 */
  wrappedKey: string;
}

/**
 * 서버 공개키(JWK)를 RSA-OAEP 래핑용 CryptoKey로 가져옵니다
 *
 * @param jwk - 서버가 노출한 RSA 공개키(JWK)
 * @returns wrapKey에 사용할 CryptoKey
 */
export async function importServerPublicKey(jwk: JsonWebKey): Promise<CryptoKey> {
  return crypto.subtle.importKey('jwk', jwk, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['wrapKey']);
}

/**
 * 응답 암복호화용 AES 키를 생성하고 서버 공개키로 래핑합니다
 *
 * @description
 * 요청마다 새로 생성해 1회 사용 후 폐기합니다(세션 단위 재사용 금지).
 *
 * @param serverPublicKey - importServerPublicKey로 가져온 서버 공개키
 * @returns 응답 복호화용 키(key)와 서버 전송용 래핑된 키(wrappedKey)
 */
export async function createResponseCipherKey(serverPublicKey: CryptoKey): Promise<ResponseCipherKey> {
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true, // extractable: 서버로 래핑해서 전달해야 하므로 true여야 함
    ['decrypt'] // 복호화 용도로만 사용 — encrypt 권한은 필요 없음
  );

  const wrapped = await crypto.subtle.wrapKey('raw', key, serverPublicKey, { name: 'RSA-OAEP' });

  return { key, wrappedKey: bufferToBase64(wrapped) };
}

/**
 * 서버가 AES-GCM으로 암호화해 응답한 데이터를 복호화합니다
 *
 * @param key - createResponseCipherKey로 생성한 AES 키 (usage: decrypt)
 * @param ivBase64 - 서버가 암호화 시 사용한 IV (base64)
 * @param dataBase64 - 암호문 (base64, 끝에 16바이트 인증 태그 포함)
 * @returns 복호화된 평문 문자열
 */
export async function decryptResponse(key: CryptoKey, ivBase64: string, dataBase64: string): Promise<string> {
  const iv = base64ToBuffer(ivBase64);
  const ciphertext = base64ToBuffer(dataBase64);

  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv, tagLength: 128 }, key, ciphertext);

  return new TextDecoder().decode(plaintext);
}

/**
 * ArrayBuffer를 base64 문자열로 변환합니다
 *
 * @param buffer - 변환할 ArrayBuffer
 * @returns base64 인코딩 문자열
 */
function bufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

/**
 * base64 문자열을 ArrayBuffer로 변환합니다
 *
 * @param base64 - 변환할 base64 문자열
 * @returns 디코딩된 ArrayBuffer
 */
function base64ToBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
