/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
// TODO: @YunJunmo B/E 결정 후 타입 확정
/**
 * 공통 파일업로드 아이템
 */
export interface UploadFileItem {
  edmsId: string;
  storedFilename: string;
}

/**
 * 파일 업로드 팝업 결과
 */
export interface Ltpz995Result {
  action: 'search' | 'select' | 'close';
  files?: UploadFileItem[];
}
