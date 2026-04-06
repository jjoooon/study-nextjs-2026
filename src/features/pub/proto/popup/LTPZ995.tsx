'use client';
// 권오택
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea, DialogClose } from '@uiux/Dialog';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { PopupBaseProps } from './types';
import { FileItemIcon, FileUploadIcon, InputClearIcon } from '@icons';
import { FileUpload } from '@common/FileUpload';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ995 = ({ open, onOpenChange }: PopupBaseProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <FileUpload
        files={[{ name: '첨부파일.png', key: 'file-1' }]}
        onClickButton={() => {
          onOpenChange?.(true);
        }}
        onRemove={() => { /* 목록에서 제거 */ }}
      />
      <DialogContent showCloseButton resizable={true} size="md" >
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>파일업로드</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ995)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          {/* 파일업로드 전 */}
          <Gcol variant="box-round" className='justify-center items-center overflow-scroll
          bg-[#FFF5F3] border border-dashed border-[#FF5C2E] gap-3'>
            <Gcol className='w-full h-[26rem] shrink-0 flex'>
              <FileUploadIcon color='#FF5C2E' size={32} />
              <Typo variant={'body-xl'} className='text-[#FF5C2E]'>
                이곳을 클릭하거나 파일을 드래그 하세요.
              </Typo>
            </Gcol>
            <Gcol className='w-full min-h-{17rem} overflow-y-auto overflow-x-hidden justify-start'>
              <Grow variant="box-round" className='w-full flex border-[0.1rem] border-solid border-[#D8D8D8] items-center h-[56.rem] bg-[#FFF] rounded-[0.8rem] py-[0.8rem] px-[1rem]' placement='bwe'>
                <Gcol className='flex items-start'>
                  <Typo variant={'body-md'} className='flex justify-start items-center gap-0.5'>
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
              <Grow variant="box-round" className='w-full flex border-[0.1rem] border-solid border-[#D8D8D8] items-center h-[56.rem] bg-[#FFF] rounded-[0.8rem] py-[0.8rem] px-[1rem]' placement='bwe'>
                <Gcol className='flex items-start'>
                  <Typo variant={'body-md'} className='flex justify-start items-center gap-0.5'>
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
              <Grow variant="box-round" className='w-full flex border-[0.1rem] border-solid border-[#D8D8D8] items-center h-[56.rem] bg-[#FFF] rounded-[0.8rem] py-[0.8rem] px-[1rem]' placement='bwe'>
                <Gcol className='flex items-start'>
                  <Typo variant={'body-md'} className='flex justify-start items-center gap-0.5'>
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
              <Grow variant="box-round" className='w-full flex border-[0.1rem] border-solid border-[#D8D8D8] items-center h-[56.rem] bg-[#FFF] rounded-[0.8rem] py-[0.8rem] px-[1rem]' placement='bwe'>
                <Gcol className='flex items-start'>
                  <Typo variant={'body-md'} className='flex justify-start items-center gap-0.5'>
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
              <Grow variant="box-round" className='w-full flex border-[0.1rem] border-solid border-[#D8D8D8] items-center h-[56.rem] bg-[#FFF] rounded-[0.8rem] py-[0.8rem] px-[1rem]' placement='bwe'>
                <Gcol className='flex items-start'>
                  <Typo variant={'body-md'} className='flex justify-start items-center gap-0.5'>
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
          </Gcol>
          {/* 전파일업로드 후 */}
          <Grow className='w-full justify-end'>
            <Typo variant={'body-sm'}>
              파일 <Typo tag={'span'} className='text-[#FF5C2E]'>3</Typo>개 / <Typo tag={'span'} className='text-[#FF5C2E]'>200.98KB</Typo> 용량
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