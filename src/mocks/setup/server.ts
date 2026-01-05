/**
 * MSW Node.js Server Setup
 *
 * 이 파일은 Node.js 환경(Jest, Vitest 등)에서 MSW를 설정합니다.
 * 테스트 환경에서만 사용됩니다.
 */

import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/handlers';

export const server = setupServer(...handlers);
