/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FileDownLoad, formatTotalFileSize } from '@common/FileDownLoad';
import type { DownloadFileItem } from '@common/FileDownLoad';

const fileList: DownloadFileItem[] = [
  { filename: '스크린샷 2026-0209-555-8989.png', filesize: '1344024', fileAddress: 'file-address' },
  { filename: '스크린샷 2026-0209-555-8989.png', filesize: '103324', fileAddress: 'file-address' },
  { filename: '스크린샷 2026-0209-555-8989.png', filesize: '1024', fileAddress: 'file-address' },
];

export const Ltpz994 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              파일다운로드
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ994)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <Gcol className="w-full h-full gap-1">
            <Gcol
              variant="box-round"
              className="flex justify-start h-[24rem] bg-[#FFF5F3] border border-dashed border-[var(--color-primary-50)] gap-2"
            >
              <Gcol className="w-full min-h-{17rem} overflow-y-auto overflow-x-hidden justify-start">
                {fileList.map((file, index) => (
                  <FileDownLoad
                    key={index}
                    filename={file.filename}
                    filesize={file.filesize}
                    fileAddress={file.fileAddress}
                  />
                ))}
              </Gcol>
            </Gcol>
            <Grow className="w-full justify-end">
              <Typo variant={'body-sm'}>
                파일
                <Typo tag={'span'} className="text-[var(--color-primary-50)]">
                  {fileList.length}
                </Typo>
                개 /
                <Typo tag={'span'} className="text-[var(--color-primary-50)]">
                  {formatTotalFileSize(fileList)}
                </Typo>
                용량
              </Typo>
            </Grow>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                다운로드
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
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
};
