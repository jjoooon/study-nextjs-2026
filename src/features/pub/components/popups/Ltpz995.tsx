'use client';

import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FileUpload } from '@common/FileUpload';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
  DialogSection,
} from '@uiux/Dialog';
import { FilePondErrorDescription, FilePondFile } from 'filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { useRef, useState, useEffect } from 'react';

import type { FilePond as FilePondInstance } from 'react-filepond';
import { FilePond, registerPlugin } from 'react-filepond';
import { IMAGE_TYPES, APPLICATION_TYPES, TEXT_TYPES, type MimeType } from '@/shared/constants/mimeTypes';
import log from '@/shared/utils/logger';
import 'filepond/dist/filepond.min.css';

// Register FilePond plugins
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

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
  // FileUpload에 실제 표시할 파일 목록 (선택완료 시점)
  const [filesForUpload, setFilesForUpload] = useState<{ name: string; key: string }[]>([]);

  // 모달 닫힐 때 파일 상태 초기화
  useEffect(() => {
    if (!open) {
      // setState를 마이크로태스크로 비동기 처리하여 React 경고 방지
      Promise.resolve().then(() => {
        setPondFiles([]);
        setFileCount(0);
        setTotalSize(0);
      });
    }
  }, [open]);

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
    // FileUpload에 파일 목록 반영
    setFilesForUpload(pondFiles.map((file) => ({ name: file.filename, key: file.id })));
    // 기존 resolve 로직 유지 (필요시 수정)
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
    // 업로드 후 창 닫기
    onOpenChange?.(false);
  };

  return (
    <Dialog open>
      <FileUpload
        files={filesForUpload}
        onClickButton={() => {
          onOpenChange?.(true);
        }}
        onRemove={() => {
          /* 목록에서 제거 */
        }}
        className="w-[26rem]"
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
        <DialogSection className="grid-rows-[1fr_auto] gap-1">
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
            labelIdle={`<FileUploadIcon />이곳을 클릭 또는 파일을 드래그 하세요.`}
            allowFileTypeValidation={true}
            allowFileSizeValidation={true}
            // stylePanelLayout="compact"
            dropValidation
            instantUpload={false}
            server={{}}
            styleButtonRemoveItemPosition="right"
            styleButtonProcessItemPosition="right"
            styleLoadIndicatorPosition="right"
            styleProgressIndicatorPosition="right"
          />

          <Grow className="w-full" placement="ec">
            {/* <span>
              최대 <span className="text-(--color-text-danger) font-semibold">500</span>개{' '}
              <span className="text-(--color-text-danger) font-semibold">1 GB</span> 제한
            </span> */}
            파일 <span className="text-(--color-text-danger)">{fileCount}</span> 개 /
            <span className="text-(--color-text-danger)"> {formatFileSize(totalSize)}</span> 용량
          </Grow>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'} onClick={handleSearch}>
                파일찾기
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
