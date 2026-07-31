/**
 * Excel Upload Service
 *
 * RTK Query로 엑셀 파일 업로드(및 mock 다운로드 echo)를 처리합니다.
 * axiosBaseQuery가 body를 JSON(axios data)으로 매핑하므로 파일은 base64 문자열로 전송합니다.
 */

import { createApi } from '@reduxjs/toolkit/query/react';

import { createApiConfig } from '@/shared/lib/rtkQuery/createApiConfig';
import type { ExcelFilePayload } from '../types/excelUploadTypes';

export const excelUploadService = createApi({
  ...createApiConfig({
    reducerPath: 'excelUploadService',
    tagTypes: [],
  }),

  endpoints: (builder) => ({
    /**
     * 엑셀 파일 업로드
     * POST /api/sample/excel-upload
     *
     * @description
     * mock 서버가 업로드한 파일을 그대로 되돌려줍니다(echo).
     * 응답의 base64를 다시 파싱하면 "다운로드한 파일"처럼 사용할 수 있습니다.
     */
    uploadExcelFile: builder.mutation<ExcelFilePayload, ExcelFilePayload>({
      query: (payload) => ({
        url: '/sample/excel-upload',
        method: 'POST',
        body: payload,
        spinnerMessage: '엑셀 업로드 중...',
      }),
    }),
  }),
});

export const { useUploadExcelFileMutation } = excelUploadService;

export default excelUploadService;
