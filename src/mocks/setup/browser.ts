/**
 * MSW Browser Worker Setup
 *
 * 이 파일은 브라우저 환경에서 MSW (Mock Service Worker)를 설정합니다.
 * 개발 모드에서만 사용됩니다.
 */

import { setupWorker } from 'msw/browser';

import { handlers } from '@/mocks/handlers';

export const worker = setupWorker(...handlers);
