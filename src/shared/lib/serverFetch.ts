import { cookies } from 'next/headers';

/**
 * Server Component에서 쿠키를 포함하여 fetch하는 유틸리티
 */
export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();

  // 모든 쿠키를 Cookie 헤더에 포함
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Cookie: cookieHeader,
    },
  });
}
