'use client';

import { useEffect } from 'react';
import { FileUploadResult } from '@/shared//components/popups/FileUploader';
import { Button } from '@/shared/components/uiux';
import popup from '@/shared/utils/popup/popupApi';
import { registerDialog } from '@/shared/utils/popup/popupRegistry';

export default function Page() {
  useEffect(() => {
    registerDialog('fileUploader', () => import('@/shared//components/popups/FileUploader'));
  }, []);

  const handleOpenFileUploader = async () => {
    popup.open<FileUploadResult>('fileUploader', {
      title: '고객찾기',
    });
  };

  return <Button onClick={handleOpenFileUploader}>파일 업로드</Button>;
}
