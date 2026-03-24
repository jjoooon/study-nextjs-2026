'use client';

import { useState } from 'react';
import { FilePond } from 'react-filepond';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/uiux';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

export interface FileUploadResult {
  action: 'search' | 'select' | 'cancel';
  files?: any[];
}

export interface FileUploaderProps {
  title?: string;
  /** Promise resolve 함수 (결과 반환) */
  resolve: (result: FileUploadResult) => void;
}

// registerPlugin(FilePondPluginImagePreview);

// 파일 크기를 읽기 쉬운 단위로 변환
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Byte';

  const k = 1024;
  const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export default function FileUploader({ title = '파일업로드', resolve }: FileUploaderProps) {
  const [selectAll, setSelectAll] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [files, setFiles] = useState<any[]>([]);

  // 1GB in bytes

  const handleSearch = () => {
    resolve({
      action: 'search',
    });
  };

  const handleUpload = () => {
    resolve({
      action: 'cancel',
    });
  };

  const handleCancel = () => {
    resolve({
      action: 'cancel',
    });
  };

  const handleUpdateFiles = (fileItems: any[]) => {
    setFiles(fileItems);

    // 파일 개수 업데이트
    setFileCount(fileItems.length);

    // 전체 파일 크기 계산
    const total = fileItems.reduce((sum, file) => {
      return sum + (file.fileSize || 0);
    }, 0);
    setTotalSize(total);
  };

  return (
    <Dialog open onOpenChange={handleCancel}>
      <DialogContent className="h-[80vh] w-360 min-w-7xl min-h-240" resizable={true}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full px-[3.2rem]">
          <div className="flex flex-col h-full border border-(--color-table-border-border-gray)">
            {/* Header */}
            <div className="flex bg-(--color-table-th-surface-gray) border-b border-(--color-table-border-border-gray)">
              <div className="w-16 flex items-center justify-center h-[3rem] py-[0.2rem]">
                <Checkbox checked={selectAll} onCheckedChange={(checked) => setSelectAll(checked === true)} />
              </div>
              <div className="flex-1 flex items-center h-[3rem] py-[0.2rem] text-[1.3rem] border-x border-(--color-table-border-border-gray)">
                파일 이름
              </div>
              <div className="w-32 flex items-center justify-end h-[3rem] py-[0.2rem] px-[0.6rem] text-[1.3rem]">
                파일 크기
              </div>
            </div>

            {/* Body - FilePond Area */}
            <div className="flex-1 min-h-64">
              <FilePond
                credits={false}
                files={files}
                onupdatefiles={handleUpdateFiles}
                allowMultiple={true}
                maxFiles={500}
                name="files"
                labelIdle="이곳을 더블클릭 또는 파일을 드래그 하세요."
                stylePanelLayout="compact"
              />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-[1.3rem] px-[0.6rem] py-[0.4rem] border-t border-(--color-table-border-border-gray)">
              <span>최대 500개 1 GB 제한</span>
              <span>
                {fileCount} 개, {formatFileSize(totalSize)} 추가됨
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="lg" color="gray" onClick={handleSearch}>
            파일검색
          </Button>
          <Button variant="outline" size="lg" color="gray" onClick={handleCancel}>
            선택완료
          </Button>
          <Button variant="contained" size="lg" onClick={handleUpload}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
