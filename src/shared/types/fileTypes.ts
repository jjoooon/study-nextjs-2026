/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
/**
 * 공통 파일업로드 아이템
 */
export interface UploadFileItem {
  originalFilename: string; // 원본파일명
  fileSize: number; // 파일사이즈
  extension: string; // 파일확장자
  edmsId: string; // 저장파일명
  storedFilename: string; // EDMSID
}

/**
 * 파일 업로드 팝업 결과
 */
export interface Ltpz995Result {
  action: 'search' | 'select' | 'close';
  files?: UploadFileItem[];
}
