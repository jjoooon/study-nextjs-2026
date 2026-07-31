/**
 * MSW 핸들러 통합
 *
 * 이 파일은 모든 MSW 핸들러를 통합하여 내보냅니다.
 * 새로운 핸들러를 추가할 때 여기에 import하여 등록하세요.
 */

import { authHandlers } from './auth';
import { customersHandlers } from './customers';
import { dashboardHandlers } from './dashboard';
import { errorHandlers } from './errors';
import { productsHandlers } from './products';
import { sampleHandlers } from './sample';

export const handlers = [
  ...authHandlers,
  ...customersHandlers,
  ...dashboardHandlers,
  ...productsHandlers,
  ...sampleHandlers,
  ...errorHandlers,
];
