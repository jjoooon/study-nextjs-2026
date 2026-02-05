/**
 * MSW Browser Worker Setup
 *
 * 이 파일은 브라우저 환경에서 MSW (Mock Service Worker)를 설정합니다.
 *
 * MSW 활성화 조건:
 * - NEXT_PUBLIC_MSW_ENABLED 환경 변수가 'true'로 설정된 경우
 * - 개발/프로덕션 환경 모두에서 사용 가능
 */

import { setupWorker } from 'msw/browser';

import { handlers } from '@/mocks/handlers';

export const worker = setupWorker(...handlers);
