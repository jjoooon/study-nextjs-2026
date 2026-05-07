'use client';

import '@/shared/lib/agGridPub';
import { Gcol, Grow, Typo } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
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
import { BulletList, BulletListItem } from '@/shared/components/common/BulletList';

const Ltpz088 = () => {

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              나눔의행복 수익자
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ088)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable variant="none" cols={['w-1', 'w-auto']}>
              <FormRow>
                <FormCell
                  title={'설계번호'}
                  tdClassName="grid grid-cols-[auto_auto_auto_1fr] items-center gap-1 w-full"
                >
                  <Input aria-label="" width={130} value={'LA260112297637'} readOnly />
                  -
                  <Input aria-label="" width={30} value={'1'} readOnly />
                  <Input aria-label="" width={300} value={'한화 BigPlus 재산종합보험 2601'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <FormTable caption={'질권설정내용'} cols={['w-[10rem]', 'w-auto']}>
            <FormRow>
              <FormCell title={'수익자'}>
                <Input aria-label="" value={''} readOnly />
                <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                  <SearchIcon color={'var(--color-primary-50)'} />
                </Button>
                <Input aria-label="" width={150} value={''} readOnly />
              </FormCell>
            </FormRow>
          </FormTable>

          <Gcol placement={'ss'} variant={'box-info'} className="w-full">
            <BulletList color={'info'} size="md">
              <BulletListItem before="①" type="symbols">
                수익자는 청약서발행 전 필수로 입력되어야 합니다.
              </BulletListItem>
              <BulletListItem before="②" type="symbols">
                수익자지정은 당사에 고객등록이 완료된 비영리법안*만 가능합니다.
                <BulletList color={'warning'} size="md">
                  <BulletListItem  type="ref">
                    법인성격코드(사업자번호 중간 2자리)가 82, 83번 인 경우
                  </BulletListItem>
                  <BulletListItem type="dash">
                    82 : 비영리법인의 본점 및 지점(법인인격 없는 사단,재단,기타 단체 중 법인으로 보는 단체를 포함)
                  </BulletListItem>
                  <BulletListItem type="dash">
                    83 : 국가, 지방자치단체, 지방자치단체조합
                  </BulletListItem>
                </BulletList>
              </BulletListItem>
            </BulletList>
          </Gcol>

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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz088;
