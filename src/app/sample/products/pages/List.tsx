/**
 * List Page
 *
 * 쿠키 기반 인증 테스트를 위한 Server Component
 */

import { cookies } from 'next/headers';
import ListSection from '@/features/products/sections/ListSection';

export default async function Page() {
  // ✅ cookies()는 비동기 함수이므로 await 필요
  const cookieStore = await cookies();

  // 서버 콘솔에 출력 (브라우저 개발자 도구 X)
  console.log('🍪 Cookie Test - Server Component:');
  console.log('  All cookies:', cookieStore.getAll());

  return <ListSection />;
}
