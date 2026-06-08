/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

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

const Ltpz109 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              카카오알림톡 발송
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ109)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="gap-2">
          <TableFold variant="default">
            <TableFoldHead title="고객 SELF고지 알림톡(LMS) 발송대상"></TableFoldHead>
            <TableFoldBody>
              <FormTable caption="FormTable 예시" className="" cols={['w-[20%]', 'w-auto']} lineTop variant="default">
                <FormRow>
                  <FormCell className="" title={'피보험자'} variant="default">
                    <Input aria-label="" width={'12rem'} value={'000000-0000000'} readOnly />
                    <Input aria-label="" width={'8rem'} value={'이한화'} readOnly />
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
                본 서비스는 아래 발송버튼 클릭 시 카카오 알림톡(URL주소포함)이 발송됩니다.
              </BulletListItem>
              <BulletListItem size="sm">
                발송된 URL을 접속하여 인터뷰 완료시 본 설계번호로 답변이 전송됩니다.
              </BulletListItem>
              <BulletListItem size="sm">
                알림톡(LMS) 수신번호는 피보험자 휴대폰번호이며, <br />
                알림톡(LMS) 발신번호는 모집자 휴대폰번호(TM계약 제외)입니다.
              </BulletListItem>
            </BulletList>
          </Gcol>
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              고객 SELF고지 알림톡(LMS) 전송시 주의사항
            </Typo>
            <BulletList>
              <BulletListItem size="sm">본인인증방법 : 카카오인증 또는 휴대폰인증</BulletListItem>
              <BulletListItem color="info" size="sm">
                <b>고객SELF고지 답변가능일 : 의뢰일로부터 3영업일(기한경과시 자동취소)</b>
              </BulletListItem>
              <BulletListItem color="info" size="sm">
                <b>고객답변완료(또는 발송취소)후 설계수정가능</b>
              </BulletListItem>
              <BulletListItem size="sm">접속환경에 따라 데이터 사용료가 부가될 수 있음</BulletListItem>
              <BulletListItem size="sm">카카오 알림톡 수신불가시(수신거절, 미설치 등) 문자로 발송</BulletListItem>
            </BulletList>
          </Gcol>
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              알림톡 발송확인 화면 안내
            </Typo>
            <BulletList>
              <BulletListItem size="sm">UMS(문자/메일/팩스) 전송결과에서 발송결과 확인가능합니다.</BulletListItem>
            </BulletList>
          </Gcol>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
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

export default Ltpz109;
