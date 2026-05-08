'use client';

import '@/shared/lib/agGridPub';
import { Gcol, Grow, Typo } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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
import * as React from 'react';
import { BulletList, BulletListItem } from '@/shared/components/common/BulletList';
import { Checkbox } from '@/shared/components/uiux/Checkbox';

const Ltpz092 = () => {
  const [isExistingCustomer, setIsExistingCustomer] = React.useState(false);
  const [isExistingParentCustomer, setIsExistingParentCustomer] = React.useState(false);
  const [isExistingGuardianCustomer, setIsExistingGuardianCustomer] = React.useState(false);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              가입설계동의 인증처리(주민번호 입력)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <FormTable caption="가입설계 동의" cols={['w-[14rem]', 'flex-1']}>
            <FormRow>
              <FormCell title={'인증대상'}>
                <Input width={80} value={'김한화'} readOnly />
                <Input width={120} value={'900101-1'} readOnly />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={'주민등록번호'}>
                <Input width={120} value={'900101-2134123'} />
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
                <Button
                  variant={'outlined'}
                  size={'lg'}
                  color={'secondary'}
                  onClick={() => {}}
                  disabled={isExistingCustomer}
                >
                  실명인증
                </Button>
                <Checkbox
                  checked={isExistingCustomer}
                  onCheckedChange={(checked) => setIsExistingCustomer(checked === true)}
                  size="lg"
                >
                  기존고객
                </Checkbox>
              </FormCell>
            </FormRow>
          </FormTable>

          <Gcol placement="ss">
            <Typo weight={'bold'}>친권자 정보</Typo>
            <FormTable caption="가입설계 동의" cols={['w-[14rem]', 'flex-1']}>
              <FormRow>
                <FormCell title={'친권자'}>
                  <Input width={80} value={''} readOnly />
                  <Input width={120} value={''} readOnly />
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'친권자 주민등록번호'}>
                  <Input width={120} value={'900101-2134123'} />
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
                  <Button
                    variant={'outlined'}
                    size={'lg'}
                    color={'secondary'}
                    onClick={() => {}}
                    disabled={isExistingParentCustomer}
                  >
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
            </FormTable>
          </Gcol>
          <Gcol placement="ss">
            <Typo weight={'bold'}>후견인 정보</Typo>
            <FormTable caption="가입설계 동의" cols={['w-[14rem]', 'flex-1']}>
              <FormRow>
                <FormCell title={'후견인'}>
                  <Input width={80} value={''} readOnly />
                  <Input width={120} value={''} readOnly />
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'후견인 주민등록번호'}>
                  <Input width={120} value={'900101-2134123'} />
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
                  <Button
                    variant={'outlined'}
                    size={'lg'}
                    color={'secondary'}
                    onClick={() => {}}
                    disabled={isExistingGuardianCustomer}
                  >
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
          </Gcol>
          <Gcol variant={'box-info'} placement={'ss'} className="w-full">
            <Typo variant={'body-sm'} icon={'info'}>
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
              <Button size={'xl'}>확인</Button>
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

export default Ltpz092;
