'use client';

import { FilePondErrorDescription, FilePondFile } from 'filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { useRef, useState } from 'react';
import type { FilePond as FilePondInstance } from 'react-filepond';
import { FilePond, registerPlugin } from 'react-filepond';
import { Button } from '@uiux/Button';
import { FileUpload } from '@common/FileUpload';
import { FileItemIcon, FileUploadIcon, InputClearIcon } from '@icons';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,DialogFooterArea, DialogClose, DialogSection } from '@uiux/Dialog';
import { IMAGE_TYPES, APPLICATION_TYPES, TEXT_TYPES, type MimeType } from '@/shared/constants/mimeTypes';
import log from '@/shared/utils/logger';

// Register FilePond plugins
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

// Import FilePond styles
// import 'filepond/dist/filepond.min.css';
// import './FileUploader2.css';

const logger = log.getLogger('FileUploader');

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
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
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

export default function FileUploader({ open, onOpenChange, resolve }: FileUploaderProps) {
  const pondRef = useRef<FilePondInstance>(null);
  const [fileCount, setFileCount] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [pondFiles, setPondFiles] = useState<FilePondFile[]>([]);

  // 허용할 파일 MIME 타입 설정
  const ACCEPTED_FILE_TYPES: MimeType[] = [
    IMAGE_TYPES.JPEG,
    IMAGE_TYPES.PNG,
    IMAGE_TYPES.GIF,
    APPLICATION_TYPES.PDF,
    APPLICATION_TYPES.MSWORD,
    APPLICATION_TYPES.WORD_XML,
    APPLICATION_TYPES.EXCEL,
    APPLICATION_TYPES.EXCEL_XML,
    APPLICATION_TYPES.POWERPOINT,
    APPLICATION_TYPES.POWERPOINT_XML,
    TEXT_TYPES.PLAIN,
    APPLICATION_TYPES.ZIP,
    APPLICATION_TYPES.SEVEN_Z,
  ];

  const MAX_FILE_SIZE = '1024MB'; // 1GB

  const handleBeforeAddFile = (item: FilePondFile) => {
    // 파일명 확인 (임시 파일 차단 같은 커스텀 로직만 처리)
    if (item.filename.includes('_temp')) {
      logger.warn('임시 파일은 업로드할 수 없습니다:', item.filename);
      return false;
    }

    return true;
  };

  const handleAddFile = (error: FilePondErrorDescription | null, file: FilePondFile) => {
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

  const handleRemoveFile = (error: FilePondErrorDescription | null, file: FilePondFile) => {
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

  const handleReorderFiles = (files: FilePondFile[]) => {
    logger.info('파일 순서 변경됨, 전체 파일 수:', files.length);
    setPondFiles(files);
  };

  const handleError = (error: FilePondErrorDescription) => {
    logger.error('파일 에러:', error?.body || error);
  };

  const handleWarning = (warning: FilePondErrorDescription) => {
    logger.warn('파일 경고:', warning?.body || warning);
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

    const filesWithSource = pondFiles.map((file) => ({
      id: file.id,
      filename: file.filename,
      fileSize: file.fileSize,
      fileExtension: file.fileExtension,
      fileType: file.fileType,
    }));
    logger.info('선택된 파일 목록:', filesWithSource);

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <FileUpload
        files={[{ name: '첨부파일.png', key: 'file-1' }]}
        onClickButton={() => {
          onOpenChange?.(true);
        }}
        onRemove={() => {
          /* 목록에서 제거 */
        }}
      />
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              파일업로드
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ994)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol className="w-full h-full gap-1 [&_.filepond--wrapper]:w-full [&_.filepond--wrapper]:!bg-[var(--color-primary-5)] [&_.filepond--wrapper]:rounded-[0.8rem] [&_.filepond--wrapper]:border [&_.filepond--wrapper]:border-dashed [&_.filepond--wrapper]:border-[var(--color-primary-50)] [&_.filepond--root]:!h-[26.4rem] [&_.filepond--root]:!max-h-[26.4rem] [&_.filepond--root]:overflow-x-hidden [&_.filepond--root]:overflow-y-auto [&_.filepond--drop-label]:flex [&_.filepond--drop-label]:flex-col [&_.filepond--drop-label]:justify-center [&_.filepond--drop-label]:items-center [&_.filepond--drop-label]:text-[var(--color-primary-50)] [&_.filepond--drop-label]:w-full [&_.filepond--drop-label]:h-full [&_.filepond--browser]:hidden [&_.filepond--data]:hidden [&_.filepond--list-scroller]:bg-red [&_.filepond--root]:h-full [&_.filepond--root]:border  ">
            {/* FilePond Drop Area */}
            <FilePond
              ref={pondRef}
              files={pondFiles.map((f) => f.source)}
              onaddfile={handleAddFile}
              onremovefile={handleRemoveFile}
              onreorderfiles={handleReorderFiles}
              onerror={handleError}
              onwarning={handleWarning}
              beforeAddFile={handleBeforeAddFile}
              credits={false}
              allowMultiple={true}
              allowReorder={true}
              maxFiles={500}
              acceptedFileTypes={ACCEPTED_FILE_TYPES}
              maxFileSize={MAX_FILE_SIZE}
              labelMaxFileSizeExceeded="1GB 이상의 파일은 업로드할 수 없습니다"
              labelMaxFileSize="최대 1GB"
              labelFileTypeNotAllowed="허용되지 않는 파일 형식입니다"
              fileValidateTypeLabelExpectedTypes="허용되지 않는 파일 형식입니다"
              labelIdle="이곳을 클릭 또는 파일을 드래그 하세요."
              allowFileTypeValidation={true}
              allowFileSizeValidation={true}
              // stylePanelLayout="compact"
              dropValidation
              instantUpload={false}
              server={{}}
            />

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
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} onClick={handleSearch}>
                파일검색
              </Button>
              <Button variant={'contained'} size={'xl'} onClick={handleUpload}>
                선택완료
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
