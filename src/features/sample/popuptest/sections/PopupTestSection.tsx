'use client';

import { FileUpload } from '@/shared/components/common/FileUpload';
import useMounted from '@/shared/hooks/useMounted';
import log from '@/shared/utils/logger';
import { open } from '@/shared/utils/popup/popupApi';

const logger = log.getLogger('Popup');

const filesForPopup = [
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

const filesForButton = [
  {
    ext: 'png',
    name: 'file1',
    key: '000',
  },
  {
    ext: 'png',
    name: 'file2',
    key: '111',
  },
];

export default function PopupTestSection() {
  useMounted(() => {
    logger.info('PopupTestSection mounted');
  });

  const handleClickButton = async () => {
    const result = await open('LTPZ995', { files: filesForPopup });
    logger.debug(result);
  };

  const handleRemove = () => {};

  return <FileUpload files={filesForButton} onClickButton={handleClickButton} onRemove={handleRemove} />;
}
