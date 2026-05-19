/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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
import { Table, TableBody, TableCell, TableHead, TableRow } from '@uiux/Table';

const Ltpz075 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              복합건물관리
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTRZ075)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr_auto]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="보험정보" cols={['w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={'15rem'} value={'LA260209313558'} readOnly />
                  -
                  <Input aria-label="" width={'3rem'} value={'1'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Table variant="default">
            <colgroup>
              <col style={{ width: '28%' }} />
              <col style={{ width: '24%' }} />
              <col style={{ width: '24%' }} />
              <col style={{ width: '24%' }} />
            </colgroup>
            <TableBody>
              <TableRow>
                <TableHead className="text-left">1급 바닥면적</TableHead>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} />㎡
                  </Grow>
                </TableCell>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} readOnly />평
                  </Grow>
                </TableCell>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} readOnly />%
                  </Grow>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-left">2급 바닥면적</TableHead>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} />㎡
                  </Grow>
                </TableCell>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} readOnly />평
                  </Grow>
                </TableCell>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} readOnly />%
                  </Grow>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-left">3급 바닥면적</TableHead>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} />㎡
                  </Grow>
                </TableCell>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} readOnly />평
                  </Grow>
                </TableCell>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} readOnly />%
                  </Grow>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-left">4급 바닥면적</TableHead>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} />㎡
                  </Grow>
                </TableCell>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} readOnly />평
                  </Grow>
                </TableCell>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} readOnly />%
                  </Grow>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="text-left">복합건물 바닥면적 합계</TableHead>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} readOnly />㎡
                  </Grow>
                </TableCell>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} readOnly />평
                  </Grow>
                </TableCell>
                <TableCell>
                  <Grow>
                    <Input onChange={() => {}} readOnly />%
                  </Grow>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Gcol placement={'ss'} variant={'box-warning'} className="w-full">
            <Typo variant={'body-md'} icon={'warning'}>
              <b>[복합구조건물 적용조건]</b>
            </Typo>
            <BulletList color={'warning'} size="md">
              <BulletListItem type="dotBig">공장업종(적용업종 기준)</BulletListItem>
              <BulletListItem type="dotBig">건물 구조 2종 이상 & 최열급 바닥 면적이 전체의 30% 이하</BulletListItem>
              <Typo variant={'body-md'} weight={'bold'}>
                [참고]
              </Typo>
              <BulletList color={'warning'} size="md">
                <BulletListItem type="dash">
                  우급: 최우급부터 순차적으로 합산해 전체면적의 70%에 도달하는 급수
                </BulletListItem>
                <BulletListItem type="dash">열급: 전체 바닥면적에서 우급을 제외한 면적</BulletListItem>
              </BulletList>
            </BulletList>
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

export default Ltpz075;
