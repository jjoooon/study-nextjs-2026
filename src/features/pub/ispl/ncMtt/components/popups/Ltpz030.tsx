/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import Ltpz110 from '@/features/pub/shared/components/popups/Ltpz110';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { CircleCheckIcon, ConditionalIcon, RefIcon, RefuseIcon } from '@icons';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';
import '@/shared/lib/agGridPub';

import Ltpa030table, { SimpleUnderwritingRow, HealthUnderwritingRow } from '../Ltpa030table';

// Y 케이스 전용 스타일 클래스 변수 (색상, 굵기 설정)
const dangerY = 'text-[var(--color-text-danger)] font-bold';

// 라벨 문자열을 인수 결정 정보(아이콘, 라벨)로 변환하는 함수
// const getUnderwritingDecision = (value: string | number) => {
//   if (typeof value !== 'string') {
//     return null;
//   }

//   const status = underwritingDecisionStatusByLabel[value.trim()];

//   return status ? underwritingDecisionMap[status] : null;
// };

interface Ltpz030Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabledIds?: string[];
}

// ===== 컴포넌트 시작 =====
const Ltpz030 = ({ open = true, onOpenChange, disabledIds = [] }: Ltpz030Props) => {
  const [isOpenLtpz110, setIsOpenLtpz110] = React.useState(false);

  const healthRows: HealthUnderwritingRow[] = [
    {
      col1: { id: 'health10', label: '6형(건강10년)', hasRefuseIcon: true, disabled: disabledIds.includes('health10') },
      col2: {
        id: 'health9',
        label: '5형(건강9년)',
        hasRefuseIcon: true,
        disabled: disabledIds.includes('health9'),
      },
      col3: { id: 'health8', label: '4형(건강8년)', hasRefuseIcon: true, disabled: disabledIds.includes('health8') },
    },
    {
      col1: { id: 'health7', label: '3형(건강7년)', hasRefuseIcon: true, disabled: disabledIds.includes('health7') },
      col2: { id: 'health6', label: '2형(건강6년)', hasRefuseIcon: true, disabled: disabledIds.includes('health6') },
      col3: {
        id: 'general5',
        label: '일반고지형(5년)',
        disabled: disabledIds.includes('general5'),
      },
      tooltipData: [
        {
          title: '$간편고지형명 판정결과$',
          content: '제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $질병수술비(ALL RISK)$',
        },
        {
          title: '$345조건부(감액)$',
          content:
            '제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $인수판정룰 사전안내 컬럼에 입력된 값 표시$',
        },
        {
          title: '$345(2일)조건부(감액)$',
          content:
            '제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $인수판정룰 사전안내 컬럼에 입력된 값 표시$',
        },
      ],
    },
  ];

  const simpleRows: SimpleUnderwritingRow[] = [
    {
      col1: {
        id: 'simple3105',
        label: '3105',
        hasRefuseIcon: true,
      },
    },
    {
      col1: { id: 'simple385', label: '385', hasRefuseIcon: true },
    },
    {
      col1: { id: 'simple365', label: '365', hasRefuseIcon: true },
    },
    {
      col1: { id: 'simple355', label: '355', hasRefuseIcon: true },
      col2: {
        id: 'simple355_2d',
        label: '355(2일)',
        hasRefuseIcon: true,
      },
    },
    {
      col1: { id: 'simple345', label: '345', hasRefuseIcon: true },
      col2: { id: 'simple345_2d', label: '345(2일)' },
    },
    {
      col2: { id: 'simple335_2d', label: '335(2일)' },
    },
    {
      col1: { id: 'simple325', label: '325', hasRefuseIcon: true },
      col2: { id: 'simple325_2d', label: '325(2일)' },
    },
    {
      col2: { id: 'simple315_2d', label: '315(2일)' },
    },
    {
      col1: { id: 'simple305', label: '305' },
      col2: { id: 'simple305_2d', label: '305(2일)' },
    },
  ];

  // ===== 다이얼로그 렌더링 =====
  // 고지유형 추천 팝업 다이얼로그 (Tab1: ag-Grid, Tab2: 일반 테이블)
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent showCloseButton resizable={false} size="2xl">
          <DialogHeader>
            <DialogTitle>
              <Typo tag={'strong'} variant={'heading-lg'}>
                고지유형 추천(LTPZ030)
              </Typo>
              <Typo tag={'p'} variant={'body-xl'}>
                (LTPZ030)
              </Typo>
            </DialogTitle>
          </DialogHeader>
          <DialogSection>
            <Grow className="w-full" variant="box-round">
              <FormTable variant={'head'} lineTop={false}>
                <FormRow>
                  <FormCell title={'피보험자'}>
                    <Input value={'김*화'} variant="info" readOnly />
                  </FormCell>
                  <FormCell title={'기준일자'}>
                    <Input value={'2026-06-01'} variant="info" readOnly />
                  </FormCell>
                  <FormCell title={'지급정보 조회기간'}>
                    <Input value={'10년'} variant="info" readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
            <Grow className="grid w-full grid-cols-[1fr_1fr] gap-3" placement={'ss'}>
              {/* N년내 입원수술 사전체크 (일반 HTML 테이블) */}
              <Gcol className="h-full" placement={'ss'}>
                <Grow placement="sc">
                  <Typo tag={'strong'} variant={'heading-md'}>
                    보험금 지급정보
                  </Typo>
                </Grow>
                <Typo variant="heading-sm" color="default">
                  N년내 입원수술
                </Typo>
                <Table variant="default">
                  <colgroup>
                    <col style={{ width: '11%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '12%' }} />
                    <col style={{ width: '13%' }} />
                    <col style={{ width: '12%' }} />
                    <col style={{ width: '12%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                  </colgroup>
                  <TableHeader>
                    <TableRow>
                      <TableHead rowSpan={2}>대상기간</TableHead>
                      <TableHead rowSpan={2}>수술</TableHead>
                      <TableHead rowSpan={2}>입원</TableHead>
                      <TableHead colSpan={2}>건강/일반</TableHead>
                      <TableHead colSpan={4}>간편</TableHead>
                    </TableRow>
                    <TableRow>
                      <TableHead>경증외입원수술</TableHead>
                      <TableHead>10대중대질환</TableHead>
                      <TableHead>
                        경증외
                        <br />
                        입원수술
                        <br />
                        (전체/2일)
                      </TableHead>
                      <TableHead>6대중대질환</TableHead>
                      <TableHead>고혈압</TableHead>
                      <TableHead>당뇨</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="text-center">
                      <TableHead>10년대</TableHead>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>/<span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableHead>8년대</TableHead>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span>N</span>
                      </TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>/<span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableHead>6년대</TableHead>
                      <TableCell>
                        <span className={dangerY}>Y</span>
                      </TableCell>
                      <TableCell>
                        <span>N</span>
                      </TableCell>
                      <TableCell className={dangerY}>Y</TableCell>
                      <TableCell className={dangerY}>Y</TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>/N
                      </TableCell>
                      <TableCell className={dangerY}>Y</TableCell>
                      <TableCell className={dangerY}>Y</TableCell>
                      <TableCell className={dangerY}>Y</TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableHead>5년대</TableHead>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>/N
                      </TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableHead>4년대</TableHead>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>
                        <span className={dangerY}>Y</span>/N
                      </TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableHead>3년대</TableHead>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N/N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableHead>2년대</TableHead>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N/N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableHead>1년대</TableHead>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N/N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableHead>3개월내</TableHead>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N/N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>N</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Gcol placement={'ss'} className="w-full min-w-0 ">
                  <div className="flex w-full min-w-0 items-start gap-[0.4rem] text-[1.2rem] leading-[150%] tracking-[-0.13rem] text-[var(--color-gray-70)]">
                    <RefIcon className="mt-[0.4rem] shrink-0" color="var(--color-secondary-50)" size={10} />
                    <span className="min-w-0 break-words">
                      {
                        '중대질환(10대) : 암, 백혈병, 고혈압, 협심증, 심근경색, 심장판막증, 간경화증, 뇌졸중증(뇌출혈, 뇌경색), 당뇨병, 에이즈(AIDS) 및 HIV보균 '
                      }
                    </span>
                  </div>
                  <div className="flex w-full min-w-0 items-start gap-[0.4rem] text-[1.2rem] leading-[150%] tracking-[-0.13rem] text-[var(--color-gray-70)]">
                    <RefIcon className="mt-[0.4rem] shrink-0" color="var(--color-secondary-50)" size={10} />
                    <span className="min-w-0 break-words">
                      {
                        '중대질환(6대) : 암, 협심증, 심근경색, 뇌졸중증(뇌출혈, 뇌경색), 간경화증, 심장판막증 단, 투석중인 만성신장질환은 제외됩니다.'
                      }
                    </span>
                  </div>
                </Gcol>
              </Gcol>
              <Gcol gap={3}>
                <Grow placement="bwc">
                  <Grow placement="sc" gap={2}>
                    <Typo tag={'strong'} variant={'heading-md'}>
                      고지유형 찾기
                    </Typo>
                    <Button color="gray" variant="outlined" onClick={() => setIsOpenLtpz110(true)}>
                      정보변경
                    </Button>
                  </Grow>
                  <Grow gap={3} className="items-center">
                    <Checkbox color="primary" size="md" variant="text" className="no-underline cursor-default">
                      <span className="flex items-center gap-1">
                        <RefuseIcon color="#E43939" />
                        거절
                      </span>
                    </Checkbox>
                    <Checkbox color="primary" size="md" variant="text" className="no-underline cursor-default">
                      <span className="flex items-center gap-1">
                        <span className="text-[var(--color-blue-gray-80)] font-bold">◆</span>
                        연기
                      </span>
                    </Checkbox>
                    <Checkbox color="primary" size="md" variant="text" className="no-underline cursor-default">
                      <span className="flex items-center gap-1">
                        <span className="text-[#B54121] font-bold">■</span>
                        심사
                      </span>
                    </Checkbox>
                    <Checkbox color="primary" size="md" variant="text" className="no-underline cursor-default">
                      <span className="flex items-center gap-1">
                        <ConditionalIcon color="#FFB800" />
                        조건부
                      </span>
                    </Checkbox>
                    <Checkbox color="primary" size="md" variant="text" className="no-underline cursor-default">
                      <span className="flex items-center gap-1">
                        <CircleCheckIcon color="#009443" />
                        인수
                      </span>
                    </Checkbox>
                  </Grow>
                </Grow>

                <Gcol className="h-full" placement={'ss'}>
                  <Typo variant="heading-sm" color="default">
                    일반/건강고지
                  </Typo>

                  <Ltpa030table healthRows={healthRows} isClick={false} />
                </Gcol>
                <Gcol className="h-full" placement={'ss'}>
                  <Typo variant="heading-sm" color="default">
                    간편고지
                  </Typo>

                  <Ltpa030table simpleRows={simpleRows} isClick={false} />
                </Gcol>
              </Gcol>
            </Grow>
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
      {isOpenLtpz110 && <Ltpz110 open={isOpenLtpz110} onOpenChange={setIsOpenLtpz110} isID={true} />}
    </>
  );
};

export default Ltpz030;
