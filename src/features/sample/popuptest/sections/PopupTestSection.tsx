'use client';

import { useState } from 'react';

import { FileUpload } from '@/shared/components/common/FileUpload';
import { UploadFileItem } from '@/shared/types/fileTypes';
import log from '@/shared/utils/logger';

const logger = log.getLogger('Popup');

const initialFiles: UploadFileItem[] = [
  {
    storedFilename: 'file1',
    edmsId: '000',
  },
  {
    storedFilename: 'file2',
    edmsId: '111',
  },
];

export default function PopupTestSection() {
  const [files, setFiles] = useState<UploadFileItem[]>(initialFiles);

  const handleClickButton = async () => {
    logger.debug('파일업로드 팝업 오픈 버튼 클릭 시 호출');
  };

  const handleChange = (nextFiles: UploadFileItem[]) => {
    logger.debug('파일 목록 변경', nextFiles);
    setFiles(nextFiles);
  };

  return <FileUpload files={files} onClickButton={handleClickButton} onChange={handleChange} />;
}
