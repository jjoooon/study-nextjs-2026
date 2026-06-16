/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { Grow, Typo, Gcol } from '@atoms';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';

import '@/shared/lib/agGridPub';

const Ltpz103 = () => {
  const [isExistingCustomer, setIsExistingCustomer] = React.useState(false);
  const [isExistingGuardianCustomer, setIsExistingGuardianCustomer] = React.useState(false);
  const [isExistingParentCustomer, setIsExistingParentCustomer] = React.useState(false);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              가입설계동의 인증처리(주민번호입력)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr] gap-3">
          <FormTable caption={'가입설계동의 인증처리 테이블'} cols={['w-[14rem]', 'flex-1']}>
            <FormRow>
              <FormCell title={'인증대상'}>
                <Input width={80} value={''} readOnly />
                <Input width={120} value={''} readOnly />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'친권자'}>
                <Input width={80} value={''} readOnly />
                <Input width={120} value={''} readOnly />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'후견인'}>
                <Input width={80} value={''} readOnly />
                <Input width={120} value={''} readOnly />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'주민등록번호'}>
                <Input aria-label="" width={120} placeholder="______-_______" />
                <Button
                  aria-label="검색"
                  variant={'outlined'}
                  only="icon"
                  size={'lg'}
                  color={'gray-light'}
                  disabled={isExistingCustomer}
                >
                  <SearchIcon color={'var(--color-primary-50)'} />
                </Button>
                <Button variant={'outlined'} size={'lg'} color={'secondary'} disabled={isExistingCustomer}>
                  실명인증
                </Button>
                <Checkbox
                  checked={isExistingCustomer}
                  onCheckedChange={(checked) => setIsExistingCustomer(checked === true)}
                >
                  기존고객
                </Checkbox>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'친권자주민등록번호'}>
                <Input aria-label="" width={120} placeholder="______-_______" value={''} readOnly />
                <Button
                  aria-label="검색"
                  variant={'outlined'}
                  only="icon"
                  size={'lg'}
                  color={'gray-light'}
                  disabled={isExistingParentCustomer}
                >
                  <SearchIcon color={'var(--color-primary-50)'} />
                </Button>
                <Button variant={'outlined'} size={'lg'} color={'secondary'} disabled={isExistingParentCustomer}>
                  실명인증
                </Button>
                <Checkbox
                  checked={isExistingParentCustomer}
                  onCheckedChange={(checked) => setIsExistingParentCustomer(checked === true)}
                  size="lg"
                >
                  기존고객
                </Checkbox>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'후견인주민등록번호'}>
                <Input aria-label="" width={120} placeholder="______-_______" value={''} readOnly />
                <Button
                  aria-label="검색"
                  variant={'outlined'}
                  only="icon"
                  size={'lg'}
                  color={'gray-light'}
                  disabled={isExistingGuardianCustomer}
                >
                  <SearchIcon color={'var(--color-primary-50)'} />
                </Button>
                <Button variant={'outlined'} color={'secondary'} size={'lg'} disabled={isExistingGuardianCustomer}>
                  실명인증
                </Button>
                <Checkbox
                  checked={isExistingGuardianCustomer}
                  onCheckedChange={(checked) => setIsExistingGuardianCustomer(checked === true)}
                  size="lg"
                >
                  기존고객
                </Checkbox>
              </FormCell>
            </FormRow>
          </FormTable>
          <Gcol placement={'ss'} variant={'box-info'} className="w-full">
            <Typo variant={'body-md'} icon={'info'}>
              <b>필수 확인 사항</b>
            </Typo>
            <BulletList>
              <BulletListItem size={'sm'}>
                주민등록번호 오입력 시 동의를 다시 받으셔야 합니다. (수정불가)
              </BulletListItem>
              <BulletListItem size={'sm'}>기존고객 : 돋보기로 고객 불러오기</BulletListItem>
              <BulletListItem size={'sm'}>신규고객 : 주민등록번호 입력 후 실명인증</BulletListItem>
            </BulletList>
          </Gcol>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
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

export default Ltpz103;
