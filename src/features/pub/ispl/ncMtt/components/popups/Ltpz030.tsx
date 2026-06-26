/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { Copy } from 'lucide-react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { CircleCheckIcon, ConditionalIcon, RefIcon, RefuseIcon, QuestionMark } from '@icons';
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import '@/shared/lib/agGridPub';

const underwritingDecisionMap = {
  refuse: {
    label: '거절',
    Icon: RefuseIcon,
  },
  conditional: {
    label: '조건부 인수',
    Icon: ConditionalIcon,
  },
  accept: {
    label: '인수',
    Icon: CircleCheckIcon,
  },
} as const;

// 인수 결정 상태 타입
type UnderwritingDecisionStatus = keyof typeof underwritingDecisionMap;
// 탭 정보 타입
type LTPZ030TabType = {
  name: string;
  value: string;
  label: string;
};

const DATA_TABS: LTPZ030TabType[] = [
  {
    name: '간편고지유형 사전체크',
    value: 'tab1',
    label: '간편고지유형 사전체크',
  },
  {
    name: '일반/건강고지유형 사전체크',
    value: 'tab2',
    label: '일반/건강고지유형 사전체크',
  },
];

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

// ===== 컴포넌트 시작 =====
const Ltpz030 = () => {
  // ===== 다이얼로그 렌더링 =====
  // 고지유형 추천 팝업 다이얼로그 (Tab1: ag-Grid, Tab2: 일반 테이블)
  return (
    <Dialog open>
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
                    <TableCell>Y</TableCell>
                    <TableCell>Y</TableCell>
                    <TableCell className={dangerY}>Y</TableCell>
                    <TableCell className={dangerY}>Y</TableCell>
                    <TableCell>
                      <span className={dangerY}>Y</span>/<span className={dangerY}>Y</span>
                    </TableCell>
                    <TableCell className={dangerY}>Y</TableCell>
                    <TableCell className={dangerY}>Y</TableCell>
                    <TableCell className={dangerY}>Y</TableCell>
                  </TableRow>
                  <TableRow className="text-center">
                    <TableHead>8년대</TableHead>
                    <TableCell>Y</TableCell>
                    <TableCell>N</TableCell>
                    <TableCell className={dangerY}>Y</TableCell>
                    <TableCell className={dangerY}>Y</TableCell>
                    <TableCell>
                      <span className={dangerY}>Y</span>/<span className={dangerY}>Y</span>
                    </TableCell>
                    <TableCell className={dangerY}>Y</TableCell>
                    <TableCell className={dangerY}>Y</TableCell>
                    <TableCell className={dangerY}>Y</TableCell>
                  </TableRow>
                  <TableRow className="text-center">
                    <TableHead>6년대</TableHead>
                    <TableCell>Y</TableCell>
                    <TableCell>N</TableCell>
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
            {/* 일반/건강고지 */}
            <Gcol gap={3}>
              <Gcol className="h-full" placement={'ss'}>
                <Grow placement="bwc">
                  <Grow placement="sc" gap={2}>
                    <Typo tag={'strong'} variant={'heading-md'}>
                      고지유형 찾기
                    </Typo>
                    <Button color="gray" variant="outlined" onClick={() => {}}>
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
                <Typo variant="heading-sm" color="default">
                  일반/건강고지
                </Typo>
                <Table variant="default">
                  <colgroup>
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: 'auto' }} />
                    <col style={{ width: '10%' }} />
                  </colgroup>
                  <TableHeader>
                    <TableRow>
                      <TableHead colSpan={3}>고지유형</TableHead>
                      <TableHead>제한</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            color="primary"
                            size="lg"
                            variant="text"
                            disabled
                          >
                            6형(건강10년)
                            <RefuseIcon />
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            className="w-full flex items-center justify-between no-underline"
                            color="primary"
                            size="lg"
                            variant="text"
                          >
                            5형(건강9년)
                            <RefuseIcon />
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            color="primary"
                            size="lg"
                            variant="text"
                            disabled
                          >
                            4형(건강8년)
                            <RefuseIcon />
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            color="primary"
                            size="lg"
                            variant="text"
                            disabled
                          >
                            3형(건강7년)
                            <RefuseIcon />
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            color="primary"
                            size="lg"
                            variant="text"
                            disabled
                          >
                            2형(건강6년)
                            <RefuseIcon />
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            color="primary"
                            size="lg"
                            variant="text"
                            disabled
                          >
                            일반고지형(5년)
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button only="icon" size={'md'} variant="none">
                              <QuestionMark color="var(--color-gray-500)" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            align="start"
                            side="bottom"
                            sideOffset={0}
                            variant="default"
                            className="z-[60] w-[22.1rem] block"
                          >
                            <Gcol placement={'ss'} gap={1.5}>
                              <Gcol placement={'ss'}>
                                <Grow placement={'bwc'}>
                                  <Typo tag={'strong'} className="body-md font-bold">
                                    $간편고지형명 판정결과$
                                  </Typo>
                                  <Button only="icon" size={'md'} variant="none">
                                    <Copy size={16} color="var(--color-gray-500)" />
                                  </Button>
                                </Grow>
                                <Typo tag={'p'} className="text-wrap">
                                  제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ -
                                  $질병수술비(ALL RISK)$
                                </Typo>
                              </Gcol>
                              <Gcol placement={'ss'}>
                                <Grow placement={'bwc'}>
                                  <Typo tag={'strong'} className="body-md font-bold">
                                    $345조건부(감액)$
                                  </Typo>
                                  <Button only="icon" size={'md'} variant="none">
                                    <Copy size={16} color="var(--color-gray-500)" />
                                  </Button>
                                </Grow>
                                <Typo tag={'p'} className="text-wrap">
                                  제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $인수판정룰
                                  사전안내 컬럼에 입력된 값 표시$
                                </Typo>
                              </Gcol>
                              <Gcol placement={'ss'}>
                                <Typo tag={'strong'} className="body-md font-bold">
                                  $345(2일)조건부(감액)$
                                </Typo>
                                <Typo tag={'p'} className="text-wrap">
                                  제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $인수판정룰
                                  사전안내 컬럼에 입력된 값 표시$
                                </Typo>
                              </Gcol>
                            </Gcol>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Gcol>
              {/* 간편고지 */}
              <Gcol className="h-full" placement={'ss'}>
                <Typo variant="heading-sm" color="default">
                  간편고지
                </Typo>
                <Grow></Grow>
                <Table variant="default">
                  <colgroup>
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: 'auto' }} />
                    <col style={{ width: '10%' }} />
                  </colgroup>
                  <TableHeader>
                    <TableRow>
                      <TableHead colSpan={3}>고지유형</TableHead>
                      <TableHead>제한</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            color="primary"
                            size="lg"
                            variant="text"
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            disabled
                          >
                            3105
                            <RefuseIcon />
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            color="primary"
                            size="lg"
                            variant="text"
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            disabled
                          >
                            385
                            <RefuseIcon />
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            color="primary"
                            size="lg"
                            variant="text"
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            disabled
                          >
                            365
                            <RefuseIcon />
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            color="primary"
                            size="lg"
                            variant="text"
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            disabled
                          >
                            355
                            <RefuseIcon />
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            color="primary"
                            size="lg"
                            variant="text"
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            disabled
                          >
                            355(2일)
                            <RefuseIcon />
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            color="primary"
                            size="lg"
                            variant="text"
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            disabled
                          >
                            345
                            <RefuseIcon />
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            color="primary"
                            size="lg"
                            variant="text"
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            disabled
                          >
                            345(2일)
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableCell></TableCell>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            color="primary"
                            size="lg"
                            variant="text"
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            disabled
                          >
                            335(2일)
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            color="primary"
                            size="lg"
                            variant="text"
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            disabled
                          >
                            325
                            <RefuseIcon />
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            color="primary"
                            size="lg"
                            variant="text"
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            disabled
                          >
                            325(2일)
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            color="primary"
                            size="lg"
                            variant="text"
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            disabled
                          >
                            315(2일)
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            color="primary"
                            size="lg"
                            variant="text"
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            disabled
                          >
                            305
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell>
                        <Grow className="w-full [&>div]:w-full">
                          <Checkbox
                            color="primary"
                            size="lg"
                            variant="text"
                            className="w-full flex items-center justify-between no-underline cursor-default"
                            disabled
                          >
                            305(2일)
                          </Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
  );
};

export default Ltpz030;
