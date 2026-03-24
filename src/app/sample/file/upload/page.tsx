'use client';

import { FileUploadResult } from '@/shared//components/popups/FileUploader';
import { Button } from '@/shared/components/uiux';
import useMounted from '@/shared/hooks/useMounted';
import popup from '@/shared/utils/popup/popupApi';
import { registerDialog } from '@/shared/utils/popup/popupRegistry';

export default function Page() {
  useMounted(() => {
    registerDialog('fileUploader', () => import('@/shared//components/popups/FileUploader'));
  });

  const handleOpenFileUploader = async () => {
    popup.open<FileUploadResult>('fileUploader', {});
  };

  return <Button onClick={handleOpenFileUploader}>파일 업로드</Button>;
}
