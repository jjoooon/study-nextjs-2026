/**
 * MSW Handlers for Dashboard API
 *
 * Dashboard 관련 API 요청을 모킹합니다.
 */

import { http, HttpResponse, delay } from 'msw';
import { dashboardData } from '../data/dashboard';

/**
 * Dashboard 데이터 가져오기
 *
 * GET /api/dashboard
 */
export const dashboardHandlers = [
  http.get('/api/dashboard', async () => {
    // 네트워크 지연 시뮬레이션 (100-300ms)
    await delay(Math.floor(Math.random() * 200) + 100);

    return HttpResponse.json(dashboardData, {
      status: 200,
    });
  }),

  http.get('/api/dashboard/stats', async () => {
    const randomDelay = Math.floor(Math.random() * 200) + 100;
    await delay(randomDelay);

    return HttpResponse.json(dashboardData.stats, {
      status: 200,
    });
  }),

  http.get('/api/dashboard/activity', async () => {
    const randomDelay = Math.floor(Math.random() * 200) + 100;
    await delay(randomDelay);

    return HttpResponse.json(dashboardData.recentActivity, {
      status: 200,
    });
  }),
];
