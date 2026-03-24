'use client';

import { useState, useRef } from 'react';
import { FilePond } from 'react-filepond';
import type { FilePond as FilePondInstance } from 'react-filepond';
import {
  Button,
  Checkbox,
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/uiux';
import log from '@/shared/utils/logger';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import './FileUploader.css';

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
  const [selectAll, setSelectAll] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [pondFiles, setPondFiles] = useState<FilePondFile[]>([]);
  const [selectedFileIds, setSelectedFileIds] = useState<Set<string>>(new Set());
  const [activeFileId, setActiveFileId] = useState<string | null>(null);

  // 컨텍스트 메뉴 항목 클릭 시 이벤트 전파 방지 헬퍼
  const stopPropagation = (handler: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    handler();
  };

  const handleSearch = () => {
    resolve({
      action: 'search',
    });
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
      files: filesWithSource,
    });
  };

  const handleCancel = () => {
    resolve({
      action: 'cancel',
    });
  };

  // FilePond에서 파일이 추가될 때 호출
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

    // FilePond에서 해당 파일만 제거 (다른 파일들이 추가될 시간을 줌)
    setTimeout(() => {
      if (pondRef.current) {
        pondRef.current.removeFile(file.id);
      }
    }, 100);
  };

  // 개별 파일 선택 토글
  const toggleFileSelection = (fileId: string) => {
    const newSelected = new Set(selectedFileIds);
    if (newSelected.has(fileId)) {
      newSelected.delete(fileId);
    } else {
      newSelected.add(fileId);
    }
    setSelectedFileIds(newSelected);
    setSelectAll(newSelected.size === pondFiles.length && pondFiles.length > 0);
  };

  // 전체 선택 토글
  const toggleSelectAll = () => {
    const newState = !selectAll;

    if (newState) {
      // 전체 선택
      setSelectedFileIds(new Set(pondFiles.map((f) => f.id)));
    } else {
      // 전체 해제
      setSelectedFileIds(new Set());
    }

    setSelectAll(newState);
  };

  // 파일 삭제
  const removeFile = (fileId: string) => {
    const updated = pondFiles.filter((f) => f.id !== fileId);
    setPondFiles(updated);
    setFileCount(updated.length);
    const total = updated.reduce((sum, file) => sum + (file.fileSize || 0), 0);
    setTotalSize(total);
    selectedFileIds.delete(fileId);
    setSelectedFileIds(new Set(selectedFileIds));
  };

  // 전체 파일 제거
  const removeAllFiles = () => {
    setPondFiles([]);
    setFileCount(0);
    setTotalSize(0);
    setSelectedFileIds(new Set());
    setSelectAll(false);
  };

  // 파일 순서 변경
  const moveFile = (fileId: string, direction: 'up' | 'down' | 'top' | 'bottom') => {
    const index = pondFiles.findIndex((f) => f.id === fileId);
    if (index === -1) return;

    const updated = [...pondFiles];
    const [file] = updated.splice(index, 1);

    switch (direction) {
      case 'up':
        if (index > 0) updated.splice(index - 1, 0, file);
        else updated.splice(index, 0, file);
        break;
      case 'down':
        if (index < updated.length) updated.splice(index + 1, 0, file);
        else updated.splice(index, 0, file);
        break;
      case 'top':
        updated.unshift(file);
        break;
      case 'bottom':
        updated.push(file);
        break;
    }

    setPondFiles(updated);
    // 파일 이동 후 해당 파일 다시 활성화
    setActiveFileId(fileId);
  };

  return (
    <Dialog open onOpenChange={handleCancel}>
      <DialogContent className="h-[80vh] w-360 min-w-7xl min-h-240" resizable={true}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full px-[3.2rem] flex flex-col gap-4">
          {/* FilePond Drop Area */}
          <div>
            <FilePond
              ref={pondRef}
              credits={false}
              files={[]}
              onaddfile={handleAddFile}
              allowMultiple={true}
              maxFiles={500}
              labelIdle="이곳을 더블클릭 또는 파일을 드래그 하세요."
              stylePanelLayout="compact"
              dropValidation
              instantUpload={false}
              server={{}}
            />
          </div>

          {/* File Table */}
          <div className="flex-1 flex flex-col min-h-0 border border-(--color-table-border-border-gray)">
            {/* Header */}
            <div className="flex bg-(--color-table-th-surface-gray) border-b border-(--color-table-border-border-gray)">
              <div className="w-16 flex items-center justify-center h-[3rem] py-[0.2rem] relative z-10 pointer-events-auto">
                <Checkbox checked={selectAll} onCheckedChange={() => toggleSelectAll()} />
              </div>
              <div className="flex-1 flex items-center py-[0.4rem] px-[0.6rem] text-[1.3rem] border-x border-(--color-table-border-border-gray)">
                파일 이름
              </div>
              <div className="w-64 flex items-center justify-center h-[3rem] py-[0.2rem] px-[0.6rem] text-[1.3rem]">
                파일 크기
              </div>
            </div>

            {/* File List */}
            <div className="h-80 overflow-y-auto" onClick={() => setActiveFileId(null)}>
              {pondFiles.length === 0 ? (
                <div className="flex items-center justify-center h-full text-(--color-text-gray-light) text-[1.3rem]">
                  파일이 없습니다
                </div>
              ) : (
                <div>
                  {pondFiles.map((file, index) => (
                    <ContextMenu
                      key={file.id}
                      onOpenChange={(open) => {
                        if (open) {
                          setActiveFileId(file.id);
                        }
                      }}
                    >
                      <ContextMenuTrigger asChild>
                        <div
                          className={`flex border-b border-(--color-table-border-border-gray) hover:bg-muted/50 transition-colors ${activeFileId === file.id ? 'bg-muted' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveFileId(file.id);
                          }}
                        >
                          <div className="w-16 flex items-center justify-center py-[0.4rem] relative z-10 pointer-events-auto">
                            <Checkbox
                              checked={selectedFileIds.has(file.id)}
                              onCheckedChange={() => toggleFileSelection(file.id)}
                            />
                          </div>
                          <div className="flex-1 flex items-center py-[0.4rem] px-[0.6rem] text-[1.3rem] border-x border-(--color-table-border-border-gray) relative z-10 pointer-events-auto">
                            {file.filename}
                          </div>
                          <div className="w-64 flex items-center justify-center gap-2 py-[0.4rem] px-[0.6rem] text-[1.3rem] relative z-10 pointer-events-auto">
                            <span>{formatFileSize(file.fileSize || 0)}</span>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="text-(--color-text-gray-light) hover:text-(--color-text-danger) transition-colors cursor-pointer"
                              aria-label="파일 삭제"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuGroup>
                          <ContextMenuItem onClick={stopPropagation(() => pondRef.current?.browse())}>
                            파일 추가
                          </ContextMenuItem>
                          <ContextMenuItem onClick={stopPropagation(() => removeFile(file.id))}>
                            선택된 항목제거
                          </ContextMenuItem>
                          <ContextMenuItem onClick={stopPropagation(() => removeAllFiles())}>
                            전체 항목제거
                          </ContextMenuItem>
                        </ContextMenuGroup>
                        <ContextMenuSeparator />
                        <ContextMenuGroup>
                          <ContextMenuItem
                            onClick={stopPropagation(() => moveFile(file.id, 'top'))}
                            disabled={index === 0}
                          >
                            맨 앞으로
                          </ContextMenuItem>
                          <ContextMenuItem
                            onClick={stopPropagation(() => moveFile(file.id, 'up'))}
                            disabled={index === 0}
                          >
                            앞으로
                          </ContextMenuItem>
                          <ContextMenuItem
                            onClick={stopPropagation(() => moveFile(file.id, 'down'))}
                            disabled={index === pondFiles.length - 1}
                          >
                            뒤로
                          </ContextMenuItem>
                          <ContextMenuItem
                            onClick={stopPropagation(() => moveFile(file.id, 'bottom'))}
                            disabled={index === pondFiles.length - 1}
                          >
                            맨 뒤로
                          </ContextMenuItem>
                        </ContextMenuGroup>
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-[1.3rem] px-[0.6rem] py-[0.4rem] border-t border-(--color-table-border-border-gray)">
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
