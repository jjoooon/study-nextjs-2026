/**
 * IP Address Utilities
 *
 * @description
 * - IP 주소 추출 (다양한 헤더 지원)
 * - IP 매칭 (단일 IP, CIDR 블록)
 * - 신뢰할 수 있는 프록시 환경 고려
 *
 * @usage
 * import { getClientIp, isIpMatch } from '@/shared/utils/ipUtils';
 *
 * const ip = getClientIp(request);
 * const isDebug = isIpMatch(ip, ['127.0.0.1', '192.168.1.0/24']);
 */

import type { NextRequest } from 'next/server';

/**
 * 신뢰할 수 있는 헤더 우선순위
 *
 * @description
 * 프록시/로드밸런서 환경에서 실제 클라이언트 IP를 추출하기 위한 헤더 순서
 * - X-Forwarded-For: 표준 헤더 (좌측이 원본 IP)
 * - CF-Connecting-IP: Cloudflare
 * - X-Real-IP: Nginx
 * - Forwarded: RFC 7239 표준
 */
const IP_HEADERS = ['x-forwarded-for', 'cf-connecting-ip', 'x-real-ip', 'forwarded'] as const;

/**
 * 요청에서 클라이언트 IP 추출
 *
 * @param request - NextRequest 객체 또는 Headers 객체
 * @returns 클라이언트 IP 주소, 없으면 null
 *
 * @example
 * getClientIp(nextRequest) // "127.0.0.1"
 * getClientIp(headers) // "192.168.1.100"
 */
export function getClientIp(request: NextRequest | Request): string | null {
  let headers: Headers;

  if ('headers' in request) {
    headers = request.headers;
  } else {
    headers = (request as Request).headers;
  }

  // 1. 신뢰할 수 있는 헤더에서 IP 추출 시도
  for (const header of IP_HEADERS) {
    const value = headers.get(header);
    if (value) {
      // X-Forwarded-For: client, proxy1, proxy2
      // Forwarded: for=192.0.2.1;for="[2001:db8:cafe::17]"
      const ip = parseForwardedHeader(value, header);
      if (ip) {
        return ip;
      }
    }
  }

  // 2. NextRequest의 ip 속성 (Vercel 등 일부 호스팅)
  if ('ip' in request && typeof request.ip === 'string' && request.ip) {
    return request.ip;
  }

  // 3. 연결 정보 (서버 환경 - Node.js Request)
  if ('socket' in request) {
    const nodeRequest = request as { socket?: { remoteAddress?: string } };
    if (nodeRequest.socket?.remoteAddress) {
      return nodeRequest.socket.remoteAddress;
    }
  }

  // 4. 개발 환경 fallback: localhost에서 접근 시 127.0.0.1 반환
  const host = headers.get('host') || '';
  const isLocalhost = /^localhost|^127\.0\.0\.1|^::1|^0\.0\.0\.0/.test(host);

  if (isLocalhost || (typeof window === 'undefined' && process.env.NODE_ENV === 'development')) {
    // localhost 또는 개발 환경에서 IP를 확인할 수 없는 경우
    return '127.0.0.1';
  }

  return null;
}

/**
 * 포워딩 헤더 파싱
 *
 * @param value - 헤더 값
 * @param headerName - 헤더 이름
 * @returns 추출된 IP 주소, 없으면 null
 */
function parseForwardedHeader(value: string, headerName: string): string | null {
  switch (headerName) {
    case 'x-forwarded-for': {
      // 첫 번째 IP가 원본 클라이언트
      const firstIp = value.split(',')[0]?.trim();
      return firstIp && isValidIp(firstIp) ? firstIp : null;
    }

    case 'cf-connecting-ip':
    case 'x-real-ip':
      return isValidIp(value) ? value : null;

    case 'forwarded': {
      // for=192.0.2.1;for="[2001:db8:cafe::17]"
      const match = value.match(/for=?[^\s;]+/i);
      if (match) {
        const ip = match[0].replace(/^for=/i, '').replace(/"/g, '');
        return isValidIp(ip) ? ip : null;
      }
      return null;
    }

    default:
      return null;
  }
}

/**
 * IP 주소 유효성 검사
 *
 * @param ip - 검사할 IP 주소
 * @returns 유효 여부
 */
export function isValidIp(ip: string): boolean {
  // IPv4
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(ip)) {
    const parts = ip.split('.');
    return parts.every((part) => {
      const num = parseInt(part, 10);
      return num >= 0 && num <= 255;
    });
  }

  // IPv6 (간단한 검사)
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){7}[0-9a-fA-F]{0,4}$/;
  return ipv6Regex.test(ip);
}

/**
 * IP 주소 매칭 검사
 *
 * @param clientIp - 클라이언트 IP
 * @param allowedIps - 허용 IP 목록 (단일 IP 또는 CIDR)
 * @returns 매칭 여부
 *
 * @example
 * isIpMatch('192.168.1.100', ['127.0.0.1']) // false
 * isIpMatch('192.168.1.100', ['192.168.1.100']) // true
 * isIpMatch('192.168.1.100', ['192.168.1.0/24']) // true
 * isIpMatch('192.168.1.100', ['127.0.0.1', '192.168.1.0/24']) // true
 */
export function isIpMatch(clientIp: string | null, allowedIps: string[]): boolean {
  if (!clientIp || allowedIps.length === 0) {
    return false;
  }

  return allowedIps.some((allowedIp) => {
    // CIDR 블록 검사
    if (allowedIp.includes('/')) {
      return isIpInCidr(clientIp, allowedIp);
    }
    // 정확히 일치
    return clientIp === allowedIp;
  });
}

/**
 * CIDR 블록 내 IP 검사
 *
 * @param ip - 검사할 IP
 * @param cidr - CIDR 표기법 (예: "192.168.1.0/24")
 * @returns 블록 내 여부
 */
function isIpInCidr(ip: string, cidr: string): boolean {
  const [network, prefixLengthStr] = cidr.split('/');
  const prefixLength = parseInt(prefixLengthStr, 10);

  if (!isValidIp(ip) || !isValidIp(network) || isNaN(prefixLength)) {
    return false;
  }

  // IPv4만 지원 (간단한 구현)
  const ipParts = ip.split('.').map(Number);
  const networkParts = network.split('.').map(Number);

  // 서브넷 마스크 계산
  const mask = (0xffffffff << (32 - prefixLength)) >>> 0;

  const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
  const networkNum = (networkParts[0] << 24) | (networkParts[1] << 16) | (networkParts[2] << 8) | networkParts[3];

  return (ipNum & mask) === (networkNum & mask);
}

/**
 * 로컬 IP 주소인지 확인
 *
 * @param ip - 검사할 IP
 * @returns 로컬 여부
 */
export function isLocalIp(ip: string | null): boolean {
  if (!ip) {
    return false;
  }

  const localPatterns = [
    '127.', // Loopback
    '::1', // IPv6 loopback
    'localhost',
    'fe80:', // Link-local
    'fc00:', // Unique local
  ];

  return localPatterns.some((pattern) => ip.startsWith(pattern));
}
