'use client';

import { FileUpload } from '@/shared/components/common/FileUpload';
import useMounted from '@/shared/hooks/useMounted';
import log from '@/shared/utils/logger';
import { open } from '@/shared/utils/popup/popupApi';

const logger = log.getLogger('Popup');

export default function PopupTestSection() {
  useMounted(() => {
    logger.info('PopupTestSection mounted');
  });

  const handleClickButton = async () => {
    const result = await open('LTPZ995');
    logger.debug(result);
  };

  const handleRemove = () => {};

  return <FileUpload files={[]} onClickButton={handleClickButton} onRemove={handleRemove} />;
}
