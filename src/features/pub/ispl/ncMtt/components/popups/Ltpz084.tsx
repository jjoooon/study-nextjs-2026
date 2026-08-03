'use client';

import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Button } from '@uiux/Button';
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { Input } from '@uiux/Input';
import { Ltpa3500301 } from '../Ltpa3500301';

const Ltpz084 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              알릴사항
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ084)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid grid-rows-[auto_1fr] h-full overflow-hidden">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable caption="성명" cols={['w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'성명'}>
                  <Input aria-label="" width={'12rem'} value={''} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <div className="relative w-full h-full min-h-0">
            <Ltpa3500301
              simpleMode={false}
              mtValue="0rem"
              warningMessage="알릴의무사항은 상세설계시 입력 가능합니다."
              // allNoDisabled={true}
            />
          </div>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} color={'gray'} size={'xl'}>
                장기질병가이드
              </Button>
            </Grow>
            <Grow>
              <Button variant={'outlined'} color={'gray'} size={'xl'}>
                알릴사항 가져오기
              </Button>
              <Button variant={'contained'} size={'xl'}>
                저장
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

export default Ltpz084;
