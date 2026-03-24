'use client';

import { useRef, useState } from 'react';
import type { FilePond as FilePondInstance } from 'react-filepond';
import { FilePond } from 'react-filepond';
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/uiux';
import log from '@/shared/utils/logger';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

import './FileUploader2.css';

const logger = log.getLogger('FileUploader');

// FilePond 파일 아이템 타입 정의
export interface FilePondFile {
  id: string;
  filename: string;
  fileSize: number;
  fileExtension: string;
  fileType: string;
  source: File;
}

export interface FileItem {
  id: string;
  filename: string;
  fileSize: number;
  fileExtension: string;
  fileType: string;
}

export interface FileUploadResult {
  action: 'search' | 'select' | 'cancel';
  files?: FileItem[];
}

export interface FileUploaderProps {
  title?: string;
  /** Promise resolve 함수 (결과 반환) */
  resolve: (result: FileUploadResult) => void;
}

// 파일 크기를 읽기 쉬운 단위로 변환
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Byte';

  const k = 1024;
  const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export default function FileUploader({ title = '파일업로드', resolve }: FileUploaderProps) {
  const pondRef = useRef<FilePondInstance>(null);
  const [fileCount, setFileCount] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [pondFiles, setPondFiles] = useState<FilePondFile[]>([]);

  const handleAddFile = (error: any | null, file: any) => {
    if (error) {
      logger.error('파일 추가 오류:', error);
      return;
    }

    // 함수형 업데이트로 클로저 문제 해결
    setPondFiles((prev) => {
      // 중복 파일 체크 (파일명과 크기로 비교)
      const isDuplicate = prev.some((f) => f.filename === file.filename && f.fileSize === file.fileSize);

      if (isDuplicate) {
        logger.info('중복 파일 무시:', file.filename);
        // FilePond에서 파일 제거
        pondRef.current?.removeFile(file.id);
        return prev; // 기존 파일 목록 반환 (추가 안 함)
      }

      const updatedFiles = [...prev, file];
      logger.info('파일 추가됨:', file.filename, '전체 파일 수:', updatedFiles.length);

      // 파일 개수 업데이트
      setFileCount(updatedFiles.length);

      // 전체 파일 크기 계산
      const total = updatedFiles.reduce((sum, f) => {
        return sum + (f.fileSize || 0);
      }, 0);
      setTotalSize(total);

      return updatedFiles;
    });
  };

  const handleRemoveFile = (error: any | null, file: any) => {
    if (error) {
      logger.error('파일 제거 오류:', error);
      return;
    }

    setPondFiles((prev) => {
      const updatedFiles = prev.filter((f) => f.id !== file.id);
      logger.info('파일 제거됨:', file.filename, '전체 파일 수:', updatedFiles.length);

      // 파일 개수 업데이트
      setFileCount(updatedFiles.length);

      // 전체 파일 크기 계산
      const total = updatedFiles.reduce((sum, f) => {
        return sum + (f.fileSize || 0);
      }, 0);
      setTotalSize(total);

      return updatedFiles;
    });
  };

  const handleSearch = () => {
    pondRef.current?.browse();
  };

  const handleUpload = async () => {
    // TODO: @YunJunmo
    // try {
    //   // 1. FormData 생성
    //   const formData = new FormData();

    //   pondFiles.forEach((file) => {
    //     // file.source가 실제 File 객체
    //     formData.append('files', file.source);
    //   });

    //   // 2. 서버 업로드 API 호출 (예시)
    //   const response = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   // 3. 응답 처리
    //   const result = await response.json();
    //   logger.info('서버 업로드 결과:', result);

    //   // 4. API 응답값을 resolve로 전달
    //   resolve({
    //     action: 'select',
    //     files: result.uploadedFiles, // 서버에서 반환한 파일 정보
    //   });
    // } catch (error) {
    //   logger.error('파일 업로드 실패:', error);

    //   // 에러 시 사용자에게 알림 (옵션)
    //   // alert({ message: '파일 업로드에 실패했습니다.' });

    //   resolve({
    //     action: 'cancel',
    //   });
    // }

    resolve({
      action: 'select',
      files: [],
    });
  };

  const handleCancel = () => {
    resolve({
      action: 'cancel',
    });
  };

  return (
    <Dialog open onOpenChange={handleCancel}>
      <DialogContent className="h-[35vh] w-360 min-w-7xl min-h-240" resizable={true}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full px-[3.2rem] flex flex-col gap-4">
          {/* FilePond Drop Area */}
          <div>
            <FilePond
              ref={pondRef}
              files={pondFiles.map((f) => f.source)}
              onaddfile={handleAddFile}
              onremovefile={handleRemoveFile}
              credits={false}
              allowMultiple={true}
              maxFiles={500}
              labelIdle="이곳을 클릭 또는 파일을 드래그 하세요."
              // stylePanelLayout="compact"
              dropValidation
              instantUpload={false}
              server={{}}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center text-[1.3rem] px-[0.6rem] h-[2rem] border-t border-(--color-table-border-border-gray)">
            <span>
              최대 <span className="text-(--color-text-danger) font-semibold">500</span>개{' '}
              <span className="text-(--color-text-danger) font-semibold">1 GB</span> 제한
            </span>
            <span>
              <span className="text-(--color-text-danger) font-semibold">{fileCount}</span> 개,{' '}
              <span className="text-(--color-text-danger) font-semibold"> {formatFileSize(totalSize)}</span> 추가됨
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="lg" color="gray" onClick={handleSearch}>
            파일검색
          </Button>
          <Button variant="outline" size="lg" color="gray" onClick={handleUpload}>
            선택완료
          </Button>
          <Button variant="contained" size="lg" onClick={handleCancel}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
