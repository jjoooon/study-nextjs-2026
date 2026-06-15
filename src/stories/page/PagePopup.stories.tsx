/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA010 from '@/app/pub/ispl/pages/LTPA010';
import { Ltpa35004 } from '@/features/pub/ispl/udRqRst/components/Ltpa35004'; // 04. 심사요청
import { Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: '페이지인팝업Test/LTPA010',
  component: LTPA010,
  argTypes: {
    open: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
  },
};

export const Default = () => (
  <LayoutDoc>
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              통합가입설계조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA010)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Ltpa35004 />
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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
  </LayoutDoc>
);
Default.args = {
  open: true,
};
