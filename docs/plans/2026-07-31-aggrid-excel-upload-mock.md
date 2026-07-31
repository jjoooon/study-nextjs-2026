# AG Grid Excel Upload + Mock Download Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Wire the "엑셀가져오기" button in `AggridExcelImportSection.tsx` to pick a local Excel file, upload it through an RTK Query mutation (JSON body, base64-encoded file — no multipart, per existing `axiosBaseQuery` architecture), have a mocked API echo the file straight back (simulating "download"), then parse the returned file with SheetJS (`xlsx`) so it's ready for the excel-import work that follows.

**Architecture:** New `excelUploadService` (RTK Query, registered in `API_REGISTRY`) posts `{ fileName, fileContent(base64) }` to `/api/sample/excel-upload`. A new MSW handler (`sampleHandlers`) parses the JSON body and returns it unchanged — no real storage, this *is* the mock "download". The component decodes the returned base64 back to bytes and calls `XLSX.read` / `XLSX.utils.sheet_to_json`, logging the parsed rows as the hand-off point for the next (separate) task of mapping them into the grid's business columns.

**Tech Stack:** RTK Query (`axiosBaseQuery`, JSON body only — confirmed no multipart support needed/used), MSW (`http`, `HttpResponse`, `delay`), SheetJS `xlsx` (new dependency), native `FileReader`/`atob` for base64 conversion.

**Scope note:** This plan stops at "file uploaded → mock-echoed → parsed into row objects, logged." Mapping parsed columns onto the grid's existing `DummyData1Type` columns is explicitly a follow-up task per the user ("그러면 이 파일을 가지고 엑셀 임포트 작업을 할 거야") — not built here (YAGNI).

**No test runner exists in this repo** (no `jest`/`vitest` config, no `*.test.ts` files anywhere). Verification below uses `npm run type-check`, `npm run lint`, and manual dev-server checks instead of automated tests, consistent with how the rest of the codebase is verified.

---

### Task 1: Add the `xlsx` (SheetJS) dependency

**Files:**
- Modify: `package.json`, `package-lock.json` (via npm)

**Step 1: Install**

Run: `npm install xlsx`

**Step 2: Verify**

Run: `node -e "console.log(Object.keys(require('xlsx')).includes('read'))"`
Expected: `true`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add xlsx dependency for excel parsing"
```

---

### Task 2: Base64 <-> File conversion utility

**Files:**
- Create: `src/shared/utils/base64FileUtils.ts`

**Step 1: Write the utility**

```ts
/**
 * File <-> Base64 변환 유틸리티
 *
 * @description
 * axiosBaseQuery가 body를 JSON으로 직렬화하는 구조를 유지하기 위해
 * 파일을 multipart/form-data 대신 base64 문자열로 인코딩/디코딩합니다.
 */

/**
 * File을 base64 문자열로 변환합니다 (data URL 접두사는 제거하고 반환)
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('파일을 읽는 데 실패했습니다'));
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.slice(result.indexOf(',') + 1);
      resolve(base64);
    };

    reader.readAsDataURL(file);
  });
}

/**
 * base64 문자열을 Uint8Array로 변환합니다 (XLSX.read 입력용)
 */
export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}
```

**Step 2: Verify**

Run: `npm run type-check`
Expected: no new errors from this file

**Step 3: Commit**

```bash
git add src/shared/utils/base64FileUtils.ts
git commit -m "feat: add file/base64 conversion utility"
```

---

### Task 3: Request/response types

**Files:**
- Create: `src/features/sample/types/excelUploadTypes.ts`

**Step 1: Write the types**

```ts
/**
 * Excel Upload API Types
 */

/**
 * 업로드/다운로드(echo)되는 엑셀 파일 페이로드
 *
 * @description
 * mock API가 업로드된 파일을 그대로 되돌려주므로 요청/응답 타입이 동일합니다.
 */
export interface ExcelFilePayload {
  /** 원본 파일명 */
  fileName: string;
  /** base64 인코딩된 파일 내용 */
  fileContent: string;
}
```

**Step 2: Verify**

Run: `npm run type-check`
Expected: no new errors

**Step 3: Commit**

```bash
git add src/features/sample/types/excelUploadTypes.ts
git commit -m "feat: add excel upload payload type"
```

---

### Task 4: RTK Query service (upload mutation)

**Files:**
- Create: `src/features/sample/services/excelUploadService.ts`

**Step 1: Write the service**

```ts
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
```

**Step 2: Register in the API registry**

Modify: `src/redux/api/config.ts`

Add import (near other feature imports, alphabetical with existing style):
```ts
import { excelUploadService } from '@/features/sample/services/excelUploadService';
```

Add to `API_REGISTRY` (Feature APIs section):
```ts
{ api: excelUploadService, priority: 50, name: 'excelUploadService' },
```

**Step 3: Verify**

Run: `npm run type-check`
Expected: no new errors

**Step 4: Commit**

```bash
git add src/features/sample/services/excelUploadService.ts src/redux/api/config.ts
git commit -m "feat: add excel upload RTK Query service and register it"
```

---

### Task 5: MSW mock handler (echo the uploaded file back)

**Files:**
- Create: `src/mocks/handlers/sample.ts`
- Modify: `src/mocks/handlers/index.ts`

**Step 1: Write the handler**

```ts
/**
 * MSW Handlers for Sample Excel Upload API
 *
 * 업로드된 엑셀 파일을 그대로 되돌려주는(echo) mock 핸들러입니다.
 * 실제 백엔드라면 저장 후 별도 다운로드 API가 있겠지만,
 * 이 샘플에서는 업로드 응답 자체가 "다운로드"를 대신합니다.
 */

import { http, HttpResponse, delay } from 'msw';

import type { ExcelFilePayload } from '@/features/sample/types/excelUploadTypes';

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
```

**Step 2: Register the handler**

Modify: `src/mocks/handlers/index.ts`

```ts
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
```

**Step 3: Verify**

Run: `npm run type-check && npm run lint`
Expected: no new errors

**Step 4: Commit**

```bash
git add src/mocks/handlers/sample.ts src/mocks/handlers/index.ts
git commit -m "feat: mock excel upload endpoint to echo uploaded file"
```

---

### Task 6: Wire the button, file picker, and parsing in `AggridExcelImportSection.tsx`

**Files:**
- Modify: `src/features/sample/sections/AggridExcelImportSection.tsx:198` (importExcel), `:216-224` (button)

**Step 1: Add imports**

At the top of the file, alongside existing imports:

```ts
import * as XLSX from 'xlsx';

import { useUploadExcelFileMutation } from '@/features/sample/services/excelUploadService';
import { base64ToUint8Array, fileToBase64 } from '@/shared/utils/base64FileUtils';
import log from '@/shared/utils/logger';
```

**Step 2: Add a module-level parse helper (mirrors the official ag-grid `parseWorkbook` example)**

Add above `export default function Section()`:

```ts
const logger = log.getLogger('AggridExcelImport');

function parseWorkbook(workbook: XLSX.WorkBook): Record<string, unknown>[] {
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  return XLSX.utils.sheet_to_json(worksheet);
}
```

**Step 3: Add the file input ref and mutation hook inside `Section()`**

Near the existing refs (`gridApiRef`, `gridRef`):

```ts
const fileInputRef = React.useRef<HTMLInputElement>(null);
const [uploadExcelFile] = useUploadExcelFileMutation();
```

**Step 4: Replace the empty `importExcel` stub (currently line 198-200)**

Replace:
```ts
  function importExcel() {
    //
  }
```

With:
```ts
  async function importExcel(file: File) {
    try {
      const fileContent = await fileToBase64(file);
      const response = await uploadExcelFile({ fileName: file.name, fileContent }).unwrap();

      const workbook = XLSX.read(base64ToUint8Array(response.fileContent), { type: 'array' });
      const parsedRows = parseWorkbook(workbook);

      // TODO: 이 데이터로 그리드 컬럼 매핑/임포트 작업 진행 예정
      logger.info(`엑셀 업로드 완료: ${response.fileName} (${parsedRows.length}행)`, parsedRows);
      alert(`${response.fileName} 업로드 완료 (${parsedRows.length}행)`);
    } catch (error) {
      logger.error('엑셀 업로드 실패:', error);
      alert('엑셀 파일 업로드에 실패했습니다.');
    }
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = ''; // 같은 파일 재선택 허용

    if (file) {
      void importExcel(file);
    }
  }
```

> Note: this leaves one intentional `TODO` marking the explicitly out-of-scope follow-up work (grid column mapping) that the user said they'll do next — everything else in this task is fully implemented, no stubs.

**Step 5: Add the hidden file input and wire the button's `onClick`**

Current (around line 218-224):
```tsx
              <Grow className="w-full" placement="ec">
                <Button color="success" variant="outlined">
                  엑셀가져오기
                  <FileExportIcon />
                </Button>
              </Grow>
```

Replace with:
```tsx
              <Grow className="w-full" placement="ec">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
                <Button color="success" variant="outlined" onClick={() => fileInputRef.current?.click()}>
                  엑셀가져오기
                  <FileExportIcon />
                </Button>
              </Grow>
```

**Step 6: Verify types/lint**

Run: `npm run type-check && npm run lint`
Expected: no new errors

**Step 7: Manual verification (no test runner in this repo)**

Run: `npm run dev`, open `/sample/aggrid-excel-import`, click "엑셀가져오기", pick any `.xlsx` file.

Expected:
- Native file picker opens
- Browser network tab shows `POST /api/sample/excel-upload` intercepted by MSW, response body echoes `{ fileName, fileContent }`
- Alert shows `"<filename> 업로드 완료 (N행)"`
- Console shows the parsed rows via the `AggridExcelImport` logger

**Step 8: Commit**

```bash
git add src/features/sample/sections/AggridExcelImportSection.tsx
git commit -m "feat: upload excel file via mock API and parse response with xlsx"
```

---

### Explicitly out of scope (follow-up task, per user)

- Mapping parsed Excel columns onto the grid's `DummyData1Type` / `columnDefs2`, or replacing `rowData` with the imported rows.
- Real backend persistence (mock only echoes the file).
- Large-file handling beyond the axios instance's existing 10s timeout (base64 inflates payload ~33%; not addressed here since it wasn't asked for and the sample files are small).
