'use client';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon } from '@icons';
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
import { Input } from '@uiux/Input';

export const Ltpz024 = ({ open, onOpenChange }: PopupBaseProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              [심평원] 진료정보 조회동의
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (Ltpz024)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr_auto]">
          <Gcol gap={5}>
            <Grow className="w-full" variant="box-round" placement={'ss'}>
              <FormTable caption="보험정보" cols={['w-[6rem]', 'w-flex']} variant={'head'}>
                <FormRow>
                  <FormCell title={'설계번호'}>
                    <Input width={130} value={'LA260209313558'} readOnly />
                    {/* M1. disabled 삭제 */}
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input width={70} value={'김한화'} readOnly />
                    <Input width={120} value={'010-1234-1234'} readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
            <Gcol gap={2.5}>
              <Grow placement={'ss'} className="w-full">
                <Typo variant={'body-lg'}>알릴 의무 대체 서비스 이용을 위한 알림톡 발송 서비스입니다.</Typo>
              </Grow>
              <Gcol placement={'ss'} variant={'box-info'} className="w-full">
                <Typo variant={'body-md'} icon={'info'}>
                  <b>서비스안내</b>
                </Typo>
                <BulletList color={'info'} size="md">
                  <BulletListItem>
                    본인인증을 통해 내 의료정보를 간편하게 제출(국민건강보험공단, 건강보험심사평가원)
                  </BulletListItem>
                  <BulletListItem>
                    고객 직접 동의만 가능하며, 동의 완료시 알릴의무고지는 해당 서비스를 통해서만 가능
                  </BulletListItem>
                </BulletList>
              </Gcol>
              <Gcol placement={'ss'} variant={'box-info'} className="w-full">
                <Typo variant={'body-md'} icon={'info'}>
                  <b>서비스 이용 시 대체가능 항목</b>
                </Typo>
                <BulletList color={'info'} size="md">
                  <BulletListItem>최근 3개월 내 약물복용</BulletListItem>
                  <BulletListItem>최근 1년 이내 추가검사여부</BulletListItem>
                  <BulletListItem>최근5년 이내 치료여부</BulletListItem>
                  <BulletListItem>최근5년 이내 중요질병여부</BulletListItem>
                  <BulletListItem>최근5년 이내 입원, 수술여부</BulletListItem>
                </BulletList>
              </Gcol>
              <Gcol placement={'ss'} variant={'box-info'} className="w-full">
                <Typo variant={'body-md'} icon={'info'}>
                  <b>동의 유효기간 및 주의사항</b>
                </Typo>
                <BulletList color={'info'} size="md">
                  <BulletListItem>
                    고객 동의일(의료정보 제출일)로부터 15일간 유효하며, 만료 시 재 동의 필요
                  </BulletListItem>
                  <BulletListItem>신규 동의 시 기존 설계건(청약심사 미완료단계)의 경우 진행 불가</BulletListItem>
                </BulletList>
              </Gcol>
            </Gcol>
          </Gcol>
          <TableFold>
            <TableFoldHead title="고객정보" />
            <TableFoldBody>
              <Gcol className="w-full" gap={5}>
                <Gcol className="w-full" gap={2}>
                  <Grow placement={'ss'} className="w-full">
                    <Typo variant={'body-md'}>고객 휴대폰번호는 고객등록화면에서 수정해주세요.</Typo>
                  </Grow>
                  <FormTable caption="고객정보 수정 테이블" cols={['w-[10rem] flex-1']}>
                    <FormRow>
                      <FormCell title={'고객명'}>
                        <Input placeholder="" value="김한화" width={70} readOnly />
                        <Input placeholder="" value="900101-1******" width={120} readOnly />
                        {/* M1. 수정 */}
                        <Button
                          aria-label="검색"
                          variant={'outlined'}
                          only="icon"
                          size={'lg'}
                          color={'gray-light'}
                          disabled
                        >
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'휴대폰번호'}>
                        <Input placeholder="" value="000-8234-8234" width={110} readOnly />
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Gcol>
                {/* <InfoBox
                  title="처리결과 저장 시, 신청하신 분께 알림톡이 발송되오니 참고 바랍니다."
                  variant={'info'}
                  bg={false}
                ></InfoBox> */}
              </Gcol>
            </TableFoldBody>
          </TableFold>
          <Gcol></Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
                알림톡발송
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
