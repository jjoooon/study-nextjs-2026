/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { FileOrigin, FilePondErrorDescription, FilePondFile } from 'filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { useRef, useState } from 'react';
import type { FilePond as FilePondInstance } from 'react-filepond';
import { FilePond, registerPlugin } from 'react-filepond';
import { publicConfig } from '@/shared/config/env';
import { APPLICATION_TYPES, IMAGE_TYPES, TEXT_TYPES, type MimeType } from '@/shared/constants/mimeTypes';
import { Ltpz995Result, UploadFileItem } from '@/shared/types/fileTypes';
import log from '@/shared/utils/logger';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import 'filepond/dist/filepond.min.css';

// Register FilePond plugins
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const logger = log.getLogger('FileUploader');

export interface Ltpz995Props {
  files?: UploadFileItem[];
  onOpenChange?: (open: boolean) => void;
  /** Promise resolve 함수 (결과 반환) */
  resolve: (result: Ltpz995Result) => void;
}

// 파일 크기를 읽기 쉬운 단위로 변환
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Byte';

  const k = 1024;
  const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

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

export default function Ltpz995({ files, resolve }: Ltpz995Props) {
  const pondRef = useRef<FilePondInstance>(null);
  const [fileCount, setFileCount] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleInit = () => {
    files?.forEach((f) => {
      pondRef.current!.addFile(f.edmsId, { file: { name: f.originalFilename, size: f.fileSize }, type: 'local' });
    });
  };

  const handleBeforeAddFile = (item: FilePondFile) => {
    // 파일명 확인 (임시 파일 차단 같은 커스텀 로직만 처리)
    if (item.filename.includes('_temp')) {
      logger.warn('임시 파일은 업로드할 수 없습니다:', item.filename);
      return false;
    }

    return true;
  };

  const syncStats = (currentFiles: FilePondFile[]) => {
    setFileCount(currentFiles.length);
    setTotalSize(currentFiles.reduce((sum, f) => sum + (f.fileSize || 0), 0));
  };

  const handleAddFile = (error: FilePondErrorDescription | null, file: FilePondFile) => {
    if (error) {
      logger.error('파일 추가 오류:', error);
      return;
    }

    const currentFiles = pondRef.current?.getFiles() ?? [];
    const isDuplicate = currentFiles
      .filter((f) => f.id !== file.id)
      .some((f) => f.filename === file.filename && f.fileSize === file.fileSize);

    if (isDuplicate) {
      logger.info('중복 파일 무시:', file.filename);
      pondRef.current?.removeFile(file.id);
      return;
    }

    logger.info('파일 추가됨:', file.filename, '전체 파일 수:', currentFiles.length);
    syncStats(currentFiles);
  };

  const handleRemoveFile = (error: FilePondErrorDescription | null, file: FilePondFile) => {
    if (error) {
      logger.error('파일 제거 오류:', error);
      return;
    }

    const currentFiles = pondRef.current?.getFiles() ?? [];
    logger.info('파일 제거됨:', file.filename, '전체 파일 수:', currentFiles.length);
    syncStats(currentFiles);
  };

  const handleReorderFiles = (files: FilePondFile[]) => {
    logger.info('파일 순서 변경됨, 전체 파일 수:', files.length);
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

  const handleSelect = async () => {
    setIsUploading(true);
    try {
      await pondRef.current?.processFiles();
      const currentFiles = pondRef.current?.getFiles() ?? [];
      resolve({
        action: 'select',
        files: currentFiles.map((f) => {
          if (f.origin === FileOrigin.LOCAL) {
            return files!.find((orig) => orig.edmsId === f.serverId)!;
          }
          const response = JSON.parse(f.serverId);
          return response.payload.payload[0] as UploadFileItem;
        }),
      });
    } catch (error) {
      logger.error('파일 업로드 오류:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    resolve({
      action: 'close',
    });
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              파일업로드
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ995)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[1fr_auto] gap-1">
          <FilePond
            ref={pondRef}
            name="files"
            oninit={handleInit}
            onaddfile={handleAddFile}
            onremovefile={handleRemoveFile}
            onreorderfiles={handleReorderFiles}
            onerror={handleError}
            onwarning={handleWarning}
            beforeAddFile={handleBeforeAddFile}
            credits={false}
            allowMultiple={true}
            allowReorder={false}
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
            server={{
              process: {
                url: `${publicConfig.apiUrl}/ltp/file/uploadFiles`,
                method: 'POST',
              },
            }}
            styleButtonRemoveItemPosition="right"
            styleButtonProcessItemPosition="right"
            styleLoadIndicatorPosition="right"
            styleProgressIndicatorPosition="right"
            itemInsertInterval={0}
            stylePanelLayout="compact"
            styleItemPanelAspectRatio={null}
          />

          <Grow className="w-full text-[1.3rem] gap-0" placement="ec">
            {/* <span>
              최대 <span className="text-(--color-text-danger) font-semibold">500</span>개{' '}
              <span className="text-(--color-text-danger) font-semibold">1 GB</span> 제한
            </span> */}
            파일 <span className="text-[var(--color-primary-50)]">{fileCount}</span> 개 /
            <span className="text-[var(--color-primary-50)]"> {formatFileSize(totalSize)}</span> 용량
          </Grow>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow placement="ec">
              <Button variant={'outlined'} size={'xl'} color={'gray'} onClick={handleSearch}>
                파일찾기
              </Button>
              <Button
                variant={'contained'}
                size={'xl'}
                disabled={fileCount === 0 || isUploading}
                onClick={handleSelect}
              >
                {isUploading ? '업로드 중...' : '선택완료'}
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'} onClick={handleClose}>
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
