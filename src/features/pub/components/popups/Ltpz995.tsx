'use client';
// 권오택
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FileDownLoad, formatTotalFileSize } from '@common/FileDownLoad';
import { FileUpload } from '@common/FileUpload';
import { FileUploadIcon } from '@icons';
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

ModuleRegistry.registerModules([AllCommunityModule]);

const fileList = [
  { filename: '스크린샷 2026-0209-555-8989.png', filesize: '119808', fileAddress: 'file-address' },
  { filename: '스크린샷 2026-0209-555-8989.png', filesize: '119808', fileAddress: 'file-address' },
  { filename: '스크린샷 2026-0209-555-8989.png', filesize: '119808', fileAddress: 'file-address' },
  { filename: '스크린샷 2026-0209-555-8989.png', filesize: '119808', fileAddress: 'file-address' },
  { filename: '스크린샷 2026-0209-555-8989.png', filesize: '119808', fileAddress: 'file-address' },
  { filename: '스크린샷 2026-0209-555-8989.png', filesize: '119808', fileAddress: 'file-address' },
];

export const Ltpz995 = ({ open, onOpenChange }: PopupBaseProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <FileUpload
        files={[{ name: '첨부파일.png', key: 'file-1' }]}
        onClickButton={() => {
          onOpenChange?.(true);
        }}
        onRemove={() => {
          /* 목록에서 제거 */
        }}
      />
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              파일업로드
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ995)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol
            variant="box-round"
            className="justify-center items-center overflow-scroll bg-[#FFF5F3] border border-dashed border-[#FF5C2E] gap-3"
          >
            <Gcol className="w-full min-h-{17rem} overflow-y-auto overflow-x-hidden justify-start">
              <Button
                variant={'none'}
                className="flex flex-col items-center justify-center gap-2.5 w-full h-[26rem] shrink-0"
              >
                <FileUploadIcon color="#FF5C2E" size={32} />
                <Typo variant={'body-xl'} className="text-[#FF5C2E]">
                  이곳을 클릭하거나 파일을 드래그 하세요.
                </Typo>
              </Button>

              {fileList.map((file, index) => (
                <FileDownLoad
                  download={false}
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
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                파일찾기
              </Button>

              <Button variant={'contained'} size={'xl'}>
                선택완료
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
