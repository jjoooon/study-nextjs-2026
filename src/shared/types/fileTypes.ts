/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
// TODO: @YunJunmo B/E 결정 후 타입 확정
/**
 * 공통 파일업로드 아이템
 */
export interface FileItem {
  id: string;
  filename: string;
  fileSize: number;
  fileExtension: string;
  fileType: string;
}
