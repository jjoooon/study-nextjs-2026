'use client';

import { useState } from 'react';

import { FileUpload } from '@/shared/components/common/FileUpload';
import { FileItem } from '@/shared/types/fileTypes';
import log from '@/shared/utils/logger';

const logger = log.getLogger('Popup');

const initialFiles: FileItem[] = [
  {
    fileExtension: 'png',
    fileSize: 6770,
    fileType: 'image/png',
    filename: 'file1',
    id: '000',
  },
  {
    fileExtension: 'png',
    fileSize: 5000,
    fileType: 'image/png',
    filename: 'file2',
    id: '111',
  },
];

export default function PopupTestSection() {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);

  const handleClickButton = async () => {
    logger.debug('파일업로드 팝업 오픈 버튼 클릭 시 호출');
  };

  const handleChange = (nextFiles: FileItem[]) => {
    logger.debug('파일 목록 변경', nextFiles);
    setFiles(nextFiles);
  };

  return <FileUpload files={files} onClickButton={handleClickButton} onChange={handleChange} />;
}
