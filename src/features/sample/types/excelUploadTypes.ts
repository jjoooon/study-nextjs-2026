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
