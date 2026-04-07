'use client';
// 권오택
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FileItemIcon, InputClearIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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
import type { PopupBaseProps } from './types';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ994 = ({ open, onOpenChange }: PopupBaseProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol className="w-full h-full gap-1">
            <Gcol
              variant="box-round"
              className="flex justify-start h-[24rem] bg-[#FFF5F3] border border-dashed border-[#FF5C2E] gap-2"
            >
              <Gcol className="w-full min-h-{17rem} overflow-y-auto overflow-x-hidden justify-start">
                <Grow
                  variant="box-round"
                  className="w-full flex border-[0.1rem] border-solid border-[#D8D8D8] items-center h-[56.rem] bg-[#FFF] rounded-[0.8rem] py-[0.8rem] px-[1rem]"
                  placement="bwe"
                >
                  <Gcol className="flex items-start">
                    <Checkbox color="primary" onCheckedChange={() => {}} size="lg" variant="default">
                      <Typo variant={'body-md'} className="flex justify-start items-center gap-0.5">
                        <FileItemIcon />
                        스크린샷 2026-0209-555-8989.png
                      </Typo>
                      <Typo variant={'body-sm'} className="text-[#FF5C2E] mr-[1rem]">
                        117KB
                      </Typo>
                    </Checkbox>
                  </Gcol>
                </Grow>
                <Grow
                  variant="box-round"
                  className="w-full flex border-[0.1rem] border-solid border-[#D8D8D8] items-center h-[56.rem] bg-[#FFF] rounded-[0.8rem] py-[0.8rem] px-[1rem]"
                  placement="bwe"
                >
                  <Gcol className="flex items-start">
                    <Checkbox color="primary" onCheckedChange={() => {}} size="lg" variant="default">
                      <Typo variant={'body-md'} className="flex justify-start items-center gap-0.5">
                        <FileItemIcon />
                        스크린샷 2026-0209-555-8989.png
                      </Typo>
                      <Typo variant={'body-sm'} className="text-[#FF5C2E] mr-[1rem]">
                        117KB
                      </Typo>
                    </Checkbox>
                  </Gcol>
                </Grow>
                <Grow
                  variant="box-round"
                  className="w-full flex border-[0.1rem] border-solid border-[#D8D8D8] items-center h-[56.rem] bg-[#FFF] rounded-[0.8rem] py-[0.8rem] px-[1rem]"
                  placement="bwe"
                >
                  <Gcol className="flex items-start">
                    <Checkbox color="primary" onCheckedChange={() => {}} size="lg" variant="default">
                      <Typo variant={'body-md'} className="flex justify-start items-center gap-0.5">
                        <FileItemIcon />
                        스크린샷 2026-0209-555-8989.png
                      </Typo>
                      <Typo variant={'body-sm'} className="text-[#FF5C2E] mr-[1rem]">
                        117KB
                      </Typo>
                    </Checkbox>
                  </Gcol>
                </Grow>
                <Grow
                  variant="box-round"
                  className="w-full flex border-[0.1rem] border-solid border-[#D8D8D8] items-center h-[56.rem] bg-[#FFF] rounded-[0.8rem] py-[0.8rem] px-[1rem]"
                  placement="bwe"
                >
                  <Gcol className="flex items-start">
                    <Checkbox color="primary" onCheckedChange={() => {}} size="lg" variant="default">
                      <Typo variant={'body-md'} className="flex justify-start items-center gap-0.5">
                        <FileItemIcon />
                        스크린샷 2026-0209-555-8989.png
                      </Typo>
                      <Typo variant={'body-sm'} className="text-[#FF5C2E] mr-[1rem]">
                        117KB
                      </Typo>
                    </Checkbox>
                  </Gcol>
                </Grow>
                <Grow
                  variant="box-round"
                  className="w-full flex border-[0.1rem] border-solid border-[#D8D8D8] items-center h-[56.rem] bg-[#FFF] rounded-[0.8rem] py-[0.8rem] px-[1rem]"
                  placement="bwe"
                >
                  <Gcol className="flex items-start">
                    <Checkbox color="primary" onCheckedChange={() => {}} size="lg" variant="default">
                      <Typo variant={'body-md'} className="flex justify-start items-center gap-0.5">
                        <FileItemIcon />
                        스크린샷 2026-0209-555-8989.png
                      </Typo>
                      <Typo variant={'body-sm'} className="text-[#FF5C2E] mr-[1rem]">
                        117KB
                      </Typo>
                    </Checkbox>
                  </Gcol>
                </Grow>
              </Gcol>
            </Gcol>
            <Grow className="w-full justify-end">
              <Typo variant={'body-sm'}>
                파일{' '}
                <Typo tag={'span'} className="text-[#FF5C2E]">
                  3
                </Typo>
                개 /{' '}
                <Typo tag={'span'} className="text-[#FF5C2E]">
                  200.98KB
                </Typo>{' '}
                용량
              </Typo>
            </Grow>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                버튼
              </Button>
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
