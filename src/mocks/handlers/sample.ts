/**
 * MSW Handlers for Sample Excel Upload API
 *
 * 업로드된 엑셀 파일을 그대로 되돌려주는(echo) mock 핸들러입니다.
 * 실제 백엔드라면 저장 후 별도 다운로드 API가 있겠지만,
 * 이 샘플에서는 업로드 응답 자체가 "다운로드"를 대신합니다.
 */

import { http, HttpResponse, delay } from 'msw';

import type { ExcelFilePayload } from '@/shared/types/excelUploadTypes';

export const sampleHandlers = [
  /**
   * 엑셀 파일 업로드 (echo)
   * POST /api/sample/excel-upload
   */
  http.post('/api/sample/excel-upload', async ({ request }) => {
    const body = (await request.json()) as ExcelFilePayload;

    // 네트워크 지연 시뮬레이션
    await delay(Math.floor(Math.random() * 30) + 300);

    return HttpResponse.json(body, { status: 200 });
  }),
];
