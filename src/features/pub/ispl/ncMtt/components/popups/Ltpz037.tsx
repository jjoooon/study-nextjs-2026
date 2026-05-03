'use client';

import { SearchIcon } from '@/shared/components/icons/CommonIcons';
import { Checkbox } from '@/shared/components/uiux/Checkbox';
import { Input } from '@/shared/components/uiux/Input';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
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
import { Table, TableBody, TableCell, TableHead, TableRow } from '@uiux/Table';

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

        <DialogSection className="grid-rows-[auto_1fr]">
          <Typo variant="body-lg" weight={'bold'}>
            정확한 알릴사항 자동고지를 위해 동의 문자동의(LMS)로 발송합니다.
          </Typo>
          <Gcol placement={'ss'} className="w-full">
            <Typo variant="body-lg" weight={'bold'}>
              취급자 정보
            </Typo>
            <Typo variant="body-md">
              질병정보는 민감정보로서 <b>알릴사항의 목적으로만 활용</b>바랍니다.<br></br>이외의 용도로 활용 또는{' '}
              <b>외부 유출시 법적처벌</b>을 받습니다.
            </Typo>
            <Grid className="w-full grid-cols-[12rem_auto_1fr_12rem] items-center gap-1">
              <Input value={'1234567'} readOnly />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
              <Input value={'김한화'} readOnly />
              <Input value={'010-1234-1234'} readOnly />
            </Grid>
            <Gcol variant={'box-warning'} placement={'ss'} className="w-full">
              <Typo variant={'body-sm'} className="text-[var(--color-danger-50)]">
                <Checkbox color="primary">고객에게 알릴 의무 최종 확인 후 진행하겠습니다.</Checkbox>
              </Typo>
              <Typo variant="body-md">고객 휴대폰번호는 고객등록화면에서 수정해주세요.</Typo>
            </Gcol>
          </Gcol>

          <Gcol placement={'ss'} className="w-full">
            <Typo variant="body-lg" weight={'bold'}>
              고객정보
            </Typo>
            <Table variant="default">
              <colgroup>
                <col style={{ width: '15rem' }} />
                <col style={{ width: 'auto' }} />
              </colgroup>
              <TableBody>
                <TableRow>
                  <TableHead className="text-left">고객명</TableHead>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-left">휴대폰번호</TableHead>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="text-left">인증번호</TableHead>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Gcol>

          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm">
              고지 상병별 필요한 심사정보가 있는 경우 추가질문을 운영중이며,<br></br>
              &quot;이상소견없음&quot;, &quot;완치됨&quot; 등의 내용은 &quot;완치&quot;로 고지하시면 심사에 반영됩니다.
              <br />
            </Typo>
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
