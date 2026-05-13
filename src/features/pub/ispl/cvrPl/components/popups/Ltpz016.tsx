/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
import { EssentialIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogClose,
  DialogFooterArea,
} from '@uiux/Dialog';

import { Input } from '@uiux/Input';

const Ltpz016 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              설계담보상세정보등록
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ016)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable variant="none" cols={['w-1', 'w-auto']}>
              <FormRow>
                <FormCell
                  title={'설계번호'}
                  tdClassName="grid grid-cols-[auto_auto_auto_1fr] items-center gap-1 w-full"
                >
                  <Input aria-label="" width={130} value={'LA26020945959594'} readOnly />
                  -
                  <Input aria-label="" width={30} value={'1'} readOnly />
                  <Input aria-label="" value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <TableFold>
            <TableFoldHead title="가족일상생활배상책임Ⅲ(대물 20만원(누수50만원)공제)(갱신형)" />
            <TableFoldBody className="gap-2">
              <FormTable caption="설계번호" cols={['w-[21rem]', 'w-[auto]']}>
                <FormRow>
                  <FormCell title={'자택주소동일'}>
                    <Input value={'서울 영등포구 63로 328호(여의도동, 은하아파트)'} readOnly />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell
                    title={
                      <Grow placement="sc">
                        기본주소
                        <EssentialIcon />
                      </Grow>
                    }
                  >
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" value={''} readOnly />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell
                    title={
                      <Grow placement="sc">
                        상세주소(동번호/층수/호수 입력)
                        <EssentialIcon />
                      </Grow>
                    }
                  >
                    <Input aria-label="" value={''} readOnly />
                    <Input aria-label="" value={''} readOnly />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'전체주소'}>
                    <Input aria-label="" value={''} readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
              <Gcol variant={'box-info'} placement={'ss'} className="w-full">
                <Typo variant={'body-sm'} icon={'info'}>
                  약관상 피보홈자가 소유, 사용, 관리 중 발생한 우연한 사고로 배상책임을 부당하는 주거용 주택을 등록해
                  주세요.
                </Typo>
              </Gcol>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
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

export default Ltpz016;
