/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grid, Grow, Typo } from '@atoms';
import { BulletItem } from '@common/BulletList';
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
import { SearchIcon } from '@/shared/components/icons/CommonIcons';

const Ltpz037 = () => {
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

        <DialogSection className="grid-rows-[auto_auto_1fr]">
          <Typo variant="body-lg">정확한 알릴사항 자동고지를 위해 동의 문자동의(LMS)로 발송합니다.</Typo>

          <Gcol placement={'ss'} gap={2}>
            <Typo variant="body-lg" weight={'bold'}>
              취급자 정보
            </Typo>
            <Typo variant="body-md">
              질병정보는 민감정보로서 <b>알릴사항의 목적으로만 활용</b>바랍니다.<br></br>이외의 용도로 활용 또는{' '}
              <b>외부 유출시 법적처벌</b>을 받습니다.
            </Typo>
            <Grid className="w-full grid-cols-[12rem_auto_1fr_12rem] items-center gap-1 px-5 py-4 bg-[var(--color-gray-5)] rounded-[0.6rem]">
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
            <Table variant="default">
              <colgroup>
                <col style={{ width: '10rem' }} />
                <col style={{ width: 'auto' }} />
              </colgroup>
              <TableBody>
                <TableRow>
                  <TableHead className="text-left">고객명</TableHead>
                  <TableCell>
                    <Grow placement="bwc">
                      <Grow>
                        <Input width={62} value={'김한화'} readOnly />
                        <Input width={116} value={'900110-1******'} readOnly />
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
                      {/* <Badge color="red" size="md" variant="contained">FP질병제공동의 N</Badge> */}
                      <Badge color="green" size="md" variant="contained">
                        FP질병제공동의 Y
                      </Badge>
                    </Grow>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-left">휴대폰번호</TableHead>
                  <TableCell>
                    <Grow placement="ss">
                      <Input width={130} value={'010-1111-1111'} readOnly />
                      <Button variant={'outlined'} size={'lg'} color={'gray-light'}>
                        인증번호 발송
                      </Button>
                    </Grow>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-left">인증번호</TableHead>
                  <TableCell>
                    <Grow placement="ss">
                      <Input width={130} value={''} />
                      <Button variant={'outlined'} size={'lg'} color={'gray-light'}>
                        인증확인
                      </Button>
                    </Grow>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Grow placement="bwc" variant="box-info">
              <BulletItem className="w-full" type="dotBig">
                최근 동의이력
              </BulletItem>
              <Typo className="w-full text-right text-[#006FF2]" weight={'bold'} variant="body-sm">
                2026-03-19 10:00:00
              </Typo>
            </Grow>
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
