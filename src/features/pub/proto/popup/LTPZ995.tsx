'use client';
// 권오택
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea, DialogClose } from '@uiux/Dialog';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { PopupBaseProps } from './types';
import { FileItemIcon, FileUploadIcon, InputClearIcon } from '@icons';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ995 = ({ open, onOpenChange }: PopupBaseProps) => {

   
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md" >
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>파일업로드</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ995)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          {/* <Gcol variant="box-round" className='justify-center items-center h-[23rem] bg-[#FFF5F3] border border-dashed border-[#FF5C2E] gap-3'>
            <FileUploadIcon color='#FF5C2E' size={32} />
            <Typo variant={'body-xl'} className='text-[#FF5C2E]'>
              이곳을 클릭하거나 파일을 드래그 하세요.
            </Typo>
          </Gcol>
          <Grow className='justify-end gap-2'>
            <Typo variant={'body-sm'} color={'gray'}>
              최대 10개, 100MB까지 업로드 가능합니다.
            </Typo>
          </Grow> */}
          <Gcol variant="box-round" className='justify-center items-center h-[23rem] bg-[#FFF5F3] border border-dashed border-[#FF5C2E] gap-3'>
            <Grow className='w-full h-[56.rem] px-[1rem] border-b border-[#D8D8D8]' placement='bwe'>
              <Gcol className='flex items-start'>
                <Typo variant={'body-md'} className='flex justify-start items-center'>
                  <FileItemIcon />
                  스크린샷 2026-0209-555-8989.png
                </Typo>
                <Typo variant={'body-sm'} className='text-[#FF5C2E] mr-[1rem]'>
                  117KB
                </Typo>
              </Gcol>
              <Button variant={'none'}  onClick={() => {}} only={'icon'}>
                <InputClearIcon color='#6B7280' />
              </Button>
            </Grow>
          </Gcol>

          <Grow className='justify-end'>
            <Typo variant={'body-sm'} className='text-[#FF5C2E]'>
              파일 3개 / 209KB 용량
            </Typo>
          </Grow>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                파일찾기
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                버튼
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