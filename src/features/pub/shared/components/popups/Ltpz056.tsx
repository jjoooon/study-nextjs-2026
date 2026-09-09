/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { SearchIcon } from '@/shared/components/icons';
import { Gcol, Typo, Grow } from '@atoms';
import { BulletList } from '@common/BulletList';
import { BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
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
import { Input } from '@uiux/Input';

const Ltpz056 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="sm">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              카카오알림톡 발송대상
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ056)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="gap-2 grid-rows-[auto_1fr_1fr]">
          <TableFold variant="default">
            <TableFoldHead title="카카오알림톡 발송대상"></TableFoldHead>
            <TableFoldBody>
              <FormTable caption="FormTable 예시" className="" cols={['w-[8rem]', 'w-auto']} lineTop variant="default">
                <FormRow>
                  <FormCell className="" title={'취급자'} variant="default">
                    <Input aria-label="" width={'9rem'} value={'이한화화'} readOnly />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={'9rem'} value={'123123'} readOnly />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell className="" title={'URL'} variant="default">
                    <Input
                      onChange={() => {}}
                      size="lg"
                      value={'https://hanwha.com/****'}
                      variant="default"
                      width="full"
                      readOnly
                    />
                  </FormCell>
                </FormRow>
              </FormTable>
            </TableFoldBody>
          </TableFold>

          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              화면 및 기능설명
            </Typo>
            <BulletList>
              <BulletListItem size="sm">
                본 서비스는 아래 발송버튼 클릭 시 상기 취급자로 카카오 알림톡(URL주소포함) 발송
              </BulletListItem>
              <BulletListItem size="sm">
                발송된 URL을 접속하여 장기보험관련 사진(서류)첨부 시 본 설계번호로 이미지 저장
              </BulletListItem>
            </BulletList>
          </Gcol>
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              카카오 알림톡 전송 시 주의사항
            </Typo>
            <BulletList>
              <BulletListItem size="sm">1회 최대 50매까지 발송(중복발송가능)</BulletListItem>
              <BulletListItem size="sm">접속환경에 따라 데이터사용료가 부과 가능</BulletListItem>
              <BulletListItem size="sm">발송불가시 상기 URL주소 복사하여 사용가능</BulletListItem>
              <BulletListItem size="sm">
                카카오 알림톡 수신불가시(수신거절, 미설치 등) 문자로 발송
                <BulletList>
                  ※ 사진첨부가 되지 않는 경우
                  <BulletList className="ml-2">
                    <BulletListItem size="sm" before="-" type="symbols">
                      핸드폰의 사용자환경에 따라 사진첨부가 안될 수 있음
                    </BulletListItem>
                    <BulletListItem size="sm" before="-" type="symbols">
                      이럴경우 {'"Chrome 브라우저"'} 설치 후 사용가능
                    </BulletListItem>
                    <BulletListItem size="sm" before="▶" type="symbols">
                      {'"Chrome 브라우저"'}는 Play 스토어 등에서 다운 및 설치
                    </BulletListItem>
                  </BulletList>
                </BulletList>
              </BulletListItem>
            </BulletList>
          </Gcol>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                발송
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

export default Ltpz056;
