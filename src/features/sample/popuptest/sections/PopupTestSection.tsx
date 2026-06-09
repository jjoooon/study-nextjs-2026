'use client';

import { FileItem, FileUpload } from '@/shared/components/common/FileUpload';
import log from '@/shared/utils/logger';

const logger = log.getLogger('Popup');

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
  const handleClickButton = async () => {
    logger.debug('파일업로드 팝업 오픈 버튼 클릭 시 호출');
  };

  const handleRemove = (file: FileItem, index: number) => {
    logger.debug('파일업로드 팝업에서 파일 삭제 시 호출', file, index);
  };

  return <FileUpload files={filesForButton} onClickButton={handleClickButton} onRemove={handleRemove} />;
}
