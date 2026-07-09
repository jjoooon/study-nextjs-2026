/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { SearchIcon } from '@/shared/components/icons/CommonIcons';
import { NativeSelect, NativeSelectOption } from '@/shared/components/uiux/NativeSelect';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { BulletItem, BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Badge } from '@uiux/Badge';
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
import { Input } from '@uiux/Input';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@uiux/Table';

interface Ltpz037Props {
  type?: 'customer' | 'parent';
  diseaseAgree?: 'Y' | 'N';
}

const Ltpz037 = ({ type = 'customer', diseaseAgree = 'Y' }: Ltpz037Props) => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              FP 질병제공동의
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ037)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Gcol placement={'ss'} gap={2} className="sticky top-0 z-10 bg-[#fff]">
            <Typo variant="body-lg">피보험자의 보험금 지급정보를 조회하는 동의[문자 등의 LMS]를 발송합니다.</Typo>
            <Typo variant="body-lg" weight={'bold'}>
              취급자 정보
            </Typo>
            <Typo variant="body-md">
              지급정보는 민감정보로서 <b>고객권익목적으로만 활용</b>해야 합니다.<br></br> 목적 이외 용도로 활용 또는{' '}
              <b>외부유출 시 법적처벌</b>을 받습니다.
            </Typo>
            <Grid className="w-full grid-cols-[8rem_2.8rem_8rem_11rem] items-center gap-1 px-5 py-4 bg-[var(--color-gray-5)] rounded-[0.6rem]">
              <Input value={'1234567'} readOnly />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'} disabled>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
              <Input value={'김한화'} readOnly />
              <Input value={'010-1234-1234'} readOnly />
            </Grid>
            <Gcol variant={'box-warning-line'} placement={'ss'} className="w-full">
              <Typo variant={'body-sm'} className="text-[var(--color-danger-50)]">
                <Checkbox color="primary">타인에게 유출되지 않도록 처리하는 것에 동의합니다.</Checkbox>
              </Typo>
            </Gcol>
          </Gcol>

          <Gcol placement={'ss'} gap={2}>
            <Typo variant="body-lg" weight={'bold'}>
              고객정보
            </Typo>
            <Typo variant="body-sm">고객 휴대폰번호는 고객등록화면에서 수정해주세요.</Typo>
            <Table variant="default">
              <colgroup>
                <col style={{ width: '14rem' }} />
                <col style={{ width: 'auto' }} />
              </colgroup>
              <TableBody>
                <TableRow>
                  <TableHead className="text-left">고객명</TableHead>
                  <TableCell>
                    <Grow placement="bwc">
                      <Grow>
                        <Input width={84} value={'김한화화화'} readOnly />
                        <Input width={114} value={'900110-1******'} readOnly />
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
                      </Grow>
                      {/* 질병동의 여부 플래그 따라서 Y|N */}
                      {diseaseAgree === 'N' ? (
                        <Badge color="red" size="md" variant="contained">
                          FP질병제공동의 N
                        </Badge>
                      ) : (
                        <Badge color="green" size="md" variant="contained">
                          FP질병제공동의 Y
                        </Badge>
                      )}
                    </Grow>
                  </TableCell>
                </TableRow>
                {type === 'customer' && (
                  <TableRow>
                    <TableHead className="text-left">휴대폰번호</TableHead>
                    <TableCell>
                      <Grow placement="ss">
                        <NativeSelect aria-label="통신사" width={80} required>
                          {[
                            { value: 'SKT', label: 'SKT' },
                            { value: 'LG U+', label: 'LG U+' },
                            { value: 'KT', label: 'KT' },
                            { value: '알뜰폰', label: '알뜰폰' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <Input width={110} value={'010-0000-0000'} readOnly />
                        <Button size={'lg'}>인증번호 발송</Button>
                      </Grow>
                    </TableCell>
                  </TableRow>
                )}
                {type === 'parent' && (
                  <>
                    <TableRow>
                      <TableHead className="text-left">친권자명</TableHead>
                      <TableCell>
                        <Grow placement="bwc">
                          <Grow>
                            <Input width={84} value={'김한화화화'} readOnly />
                            <Input width={114} value={'900110-1******'} readOnly />
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
                          </Grow>
                        </Grow>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableHead className="text-left">친권자 휴대폰번호</TableHead>
                      <TableCell>
                        <Grow placement="ss">
                          <NativeSelect aria-label="통신사" width={100} required>
                            {[
                              { value: '', label: '선택' },
                              { value: 'SKT', label: 'SKT' },
                              { value: 'LG U+', label: 'LG U+' },
                              { value: 'KT', label: 'KT' },
                              { value: 'SK 알뜰폰', label: 'SK 알뜰폰' },
                              { value: 'KT 알뜰폰', label: 'KT 알뜰폰' },
                              { value: 'LG U+ 알뜰폰', label: 'LG U+ 알뜰폰' },
                            ].map((option) => (
                              <NativeSelectOption key={option.value} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                          <Input width={110} value={'010-0000-0000'} readOnly />
                          <Button size={'lg'}>인증번호 발송</Button>
                        </Grow>
                      </TableCell>
                    </TableRow>
                  </>
                )}
                <TableRow>
                  <TableHead className="text-left">인증번호</TableHead>
                  <TableCell>
                    <Grow placement="ss">
                      <Input width={110} value={''} required />
                      <Button variant={'outlined'} size={'lg'} color={'gray-light'}>
                        인증확인
                      </Button>
                    </Grow>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Gcol variant={'box-warning'} placement={'ss'}>
              <Typo variant={'body-sm'} icon={'warning'} color={'gray'}>
                통신사별 인증대기시간 경과 후 인증처리 불가합니다.
              </Typo>
              <BulletList position="col" className="pl-[2.2rem]">
                <BulletListItem size="md" type="dash">
                  SK / LG : 15분, KT : 7분
                </BulletListItem>
              </BulletList>
            </Gcol>
            <Grow
              placement="bwc"
              variant="box-info"
              className="bg-[#F4F4F4] border border-[0.1rem] border-[#D8D8D8] border-solid"
            >
              <BulletItem className="w-full font-bold text-[#000]" type="dot" size="md">
                최근 동의이력
              </BulletItem>
              <Typo className="w-full text-right text-[#006FF2]" weight={'bold'} variant="body-md">
                2026-03-19 10:00:00
              </Typo>
            </Grow>
          </Gcol>
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              LMS 발송 문구
            </Typo>
            <div>
              [한화손보] 인수심사판단을 위한 보험금지급 정보 모집인 제공 동의 인증번호 : 000000 안녕하세요. 김한화
              고객님. 보험가입 심사과정에서 고객님께서 이전에 보험금을 받으신 이력중, 미처 알려ㄷ주지 않은 부분이
              확인되었습니다. [한화손보] 인수심사판단을 위한 보험금지급 정보 모집인 제공 동의 인증번호 : 000000
              안녕하세요. 김한화 고객님. 보험가입 심사과정에서 고객님께서 이전에 보험금을 받으신 이력중, 미처 알려ㄷ주지
              않은 부분이 확인되었습니다. [한화손보] 인수심사판단을 위한 보험금지급 정보 모집인 제공 동의 인증번호 :
              000000 안녕하세요. 김한화 고객님. 보험가입 심사과정에서 고객님께서 이전에 보험금을 받으신 이력중, 미처
              알려ㄷ주지 않은 부분이 확인되었습니다.
            </div>
          </Gcol>
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
  );
};

export default Ltpz037;
