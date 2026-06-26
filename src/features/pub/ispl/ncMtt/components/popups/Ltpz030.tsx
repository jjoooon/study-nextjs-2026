/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { Copy } from 'lucide-react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent, useDynamicColumnWidths, createTooltipValueGetter } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
<<<<<<< Updated upstream
import { CircleCheckIcon, ConditionalIcon, RefIcon, RefuseIcon } from '@icons';
=======
import { CircleCheckIcon, ConditionalIcon, RefIcon, RefuseIcon, QuestionMark } from '@icons';
>>>>>>> Stashed changes
import { Badge } from '@uiux/Badge';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';
<<<<<<< Updated upstream

=======
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
>>>>>>> Stashed changes
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

// ===== Tab1 테이블 데이터 =====
// Tab1-1: 간편고지 사전체크 테이블 (ag-Grid)
type DummyDataType1T1 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
};
// 라벨을 인수 결정 상태로 변환하는 매핑 (거절, 조건부 인수 등)
const underwritingDecisionStatusByLabel: Record<string, UnderwritingDecisionStatus> = {
  거절: 'refuse',
  조건부인수: 'conditional',
  '조건부 인수': 'conditional',
  인수: 'accept',
};
// Tab1-1 테이블의 샘플 데이터
const DummyData1T1: DummyDataType1T1[] = [
  {
    id: 1,
    field01: '더경증',
    field02: '3105',
    field03: '거절',
    field04: '',
    field05: '경증외, 중대질환 1148,1737,1152,1737,1',
  },
  {
    id: 2,
    field01: '더경증',
    field02: '385',
    field03: '거절',
    field04: '',
    field05: '경증외, 중대질환 1148,1737,1152,1737,1',
  },
  {
    id: 3,
    field01: '더경증',
    field02: '365',
    field03: '거절',
    field04: '',
    field05: '경증외, 중대질환 1148,1737,1152,1737',
  },
  {
    id: 4,
    field01: '3N5',
    field02: '355',
    field03: '거절',
    field04: '',
    field05: '경증외, 중대질환 1148,1737,1152,1737',
  },
  {
    id: 5,
    field01: '3N5',
    field02: '345',
    field03: '거절',
    field04: '',
    field05: '경증외, 중대질환 1148,1737,1152,1737',
  },
  {
    id: 6,
    field01: '3N5(2일)',
    field02: '355(2일)',
    field03: '거절',
    field04: '',
    field05: '경증외, 중대질환 1148,1737,1152,1737',
  },
  {
    id: 7,
    field01: '3N5(2일)',
    field02: '345(2일)',
    field03: '거절',
    field04: '',
    field05: '경증외, 중대질환 1148,1737,1152,1737',
  },
  {
    id: 8,
    field01: '3N5(2일)',
    field02: '335(2일)',
    field03: '거절',
    field04: '',
    field05: '경증외, 중대질환 1148,1737,1152,1737',
  },
  {
    id: 9,
    field01: '3N5(2일)',
    field02: '325(2일)',
    field03: '조건부인수',
    field04: '',
    field05: '경증외, 중대질환 1148,1737',
  },
  {
    id: 10,
    field01: '3N5(2일)',
    field02: '315(2일)',
    field03: '인수',
    field04: '',
    field05: '경증외, 중대질환 1148,1737',
  },
];
// 라벨 문자열을 인수 결정 정보(아이콘, 라벨)로 변환하는 함수
const getUnderwritingDecision = (value: string | number) => {
  if (typeof value !== 'string') {
    return null;
  }

  const status = underwritingDecisionStatusByLabel[value.trim()];

  return status ? underwritingDecisionMap[status] : null;
};

// ===== 컴포넌트 시작 =====
const Ltpz030 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths(); // 화면 크기에 따라 컬럼 너비를 동적으로 조정

  // ===== ag-Grid 컬럼 정의 =====
  // Tab1 테이블의 컬럼 설정 (분류, 고지유형, 가능여부, 제한담보, 비고)
  /* 2026.05.28 className 추가 */
  const columnDefs1T1 = React.useMemo<ColDef<DummyDataType1T1>[]>(
    () => [
      {
        headerName: '분류',
        field: 'field01',
        width: attributeColumnWidth(70),
        autoHeight: true,
        editable: false,
        spanRows: true,
      },
      {
        headerName: '고지유형',
        field: 'field02',
        width: attributeColumnWidth(70),
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '가능여부',
        field: 'field03',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        autoHeight: true,
        editable: false,
        cellRenderer: ({ value }: { value: string | number | null | undefined }) => {
          // 인수 결정 상태를 아이콘과 라벨로 표시하는 렌더러
          const decision = getUnderwritingDecision(value ?? '');

          if (!decision) {
            return value;
          }

          const { label, Icon } = decision;

          return (
            <span className="inline-flex items-center gap-0.5">
              <Icon aria-hidden="true" />
              {label}
            </span>
          );
        },
      },
      {
        headerName: '제한담보',
        field: 'field04',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        autoHeight: true,
      },
      {
        headerName: '비고',
        field: 'field05',
        flex: 1,
        minWidth: attributeColumnWidth(220),
        autoHeight: true,
        cellClass: 'truncate text-left!',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType1T1>({ field: 'field05' }),
      },
    ],
    [attributeColumnWidth]
  );

  // ===== 탭 상태 관리 =====
  // useTabs 훅으로 활성 탭, 탭 데이터 관리
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  // ===== 상태 셀 렌더링 헬퍼 함수 =====
  // Tab2 테이블의 Y/N/- 상태를 렌더링하는 함수
  // Y 케이스인 경우 빨강색으로 표시
  const renderStatusCell = (value: string, highlight = true) => {
    if (value.includes('/')) {
      const parts = value.split('/');
      return (
        <TableCell>
          {parts.map((part, index) => {
            const isY = part === 'Y';
            const isDangerY = highlight && isY;
            return (
              <React.Fragment key={index}>
                {index > 0 && '/'}
                <span className={isDangerY ? 'font-bold text-[var(--color-text-danger)]' : undefined}>{part}</span>
              </React.Fragment>
            );
          })}
        </TableCell>
      );
    }

    const isY = value === 'Y';
    const isDangerY = highlight && isY;
    return (
      <TableCell className={isDangerY ? 'font-bold text-[var(--color-text-danger)]' : undefined}>{value}</TableCell>
    );
  };

  // ag-Grid + TablePagination 연동 (공통 훅 사용)
  // const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);

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
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell>
                      <span className="text-[var(--color-text-danger)] font-bold">Y</span>/
                      <span className="text-[var(--color-text-danger)] font-bold">Y</span>
                    </TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                  </TableRow>
                  <TableRow className="text-center">
                    <TableHead>8년대</TableHead>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell>N</TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell>
                      <span className="text-[var(--color-text-danger)] font-bold">Y</span>/
                      <span className="text-[var(--color-text-danger)] font-bold">Y</span>
                    </TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                  </TableRow>
                  <TableRow className="text-center">
                    <TableHead>6년대</TableHead>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell>N</TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell>
                      <span className="text-[var(--color-text-danger)] font-bold">Y</span>/N
                    </TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                    <TableCell className="text-[var(--color-text-danger)] font-bold">Y</TableCell>
                  </TableRow>
                  <TableRow className="text-center">
                    <TableHead>5년대</TableHead>
                    <TableCell>N</TableCell>
                    <TableCell>N</TableCell>
                    <TableCell>N</TableCell>
                    <TableCell>N</TableCell>
                    <TableCell>
                      <span className="text-[var(--color-text-danger)] font-bold">Y</span>/N
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
                      <span className="text-[var(--color-text-danger)] font-bold">Y</span>/N
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
                <Typo variant="heading-sm" color="default">
                  일반/건강고지
                </Typo>
                <Table variant="default">
                  <colgroup>
                    <col style={{ width: '30%' }} />
                    <col style={{ width: 'auto' }} />
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
                    <TableRow className="text-left">
                      <TableCell>6형(건강10년)</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableCell>5형(건강9년)</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableCell>4형(건강8년)</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableCell>3형(건강7년)</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableCell>2형(건강6년)</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableCell>일반고지형(5년)</TableCell>
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
                    <col style={{ width: 'auto' }} />
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
                    <TableRow className="text-center">
                      <TableCell>6형(건강10년)</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableCell>5형(건강9년)</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableCell>4형(건강8년)</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableCell>3형(건강7년)</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableCell>2형(건강6년)</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow className="text-center">
                      <TableCell>일반고지형(5년)</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Gcol>
            </Gcol>
          </Grow>
          {/* 탭 페이저: Tab1(간편고지 사전체크), Tab2(일반/건강고지 사전체크) */}
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            removable={false}
            onRemove={handleRemove}
            visibleCount={4}
            variant="default"
            getValue={(tab) => String(tab.value)}
            renderTab={(tab) => <span>{tab.label}</span>}
            renderDropdownItem={false}
          >
            {/* ===== Tab1: 간편고지유형 사전체크 =====  */}
            {active === 'tab1' ? (
              <>
                <Gcol placement="ss" className="w-full pt-3" gap={3}>
                  <Grow placement={'bws'} className="w-full" gap={3}>
                    {/* ag-Grid 테이블: 간편고지 사전체크 결과 테이블 */}
                    <div className="ag-theme-alpine w-full">
                      <AgGridReact<DummyDataType1T1>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={DummyData1T1}
                        columnDefs={columnDefs1T1}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        animateRows={false}
                        domLayout="autoHeight"
                        className="text-center"
                        enableCellSpan={true}
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                      />
                    </div>
                  </Grow>
                  <Gcol variant={'box-info'} placement={'ss'}>
                    <BulletList>
                      <BulletListItem color="info" size="sm">
                        지급정보 중 우선순위 조건에 따라 안내하며 실제 심사결과와 다를 수 있으니, 참고 보완 자료로 활용
                        바랍니다.
                      </BulletListItem>
                      <BulletListItem size="sm">
                        해당서비스는 고지유형을 선택하는 보조수단으로만 활용바랍니다.
                      </BulletListItem>
                      <BulletListItem size="sm">
                        보험금미청구 or 청구진행중 or 부진단코드 등 조회불가하오니 고객님께 확인하시기 바랍니다.
                      </BulletListItem>
                    </BulletList>
                  </Gcol>
                </Gcol>
              </>
            ) : (
              /* ===== Tab2: 일반/건강고지유형 사전체크 ===== */
              <Gcol placement="ss" className="w-full h-full pt-2" gap={3}>
                <Grow placement="bwe" className="w-full" variant={'box-round'} gap={5}>
                  <FormTable
                    variant={'none'}
                    caption="피보험자 정보 테이블"
                    cols={['w-[5rem]', 'w-[5rem]', 'w-[5rem]', 'w-[11rem]', 'w-[14rem]', 'w-auto']}
                  >
                    <FormRow>
                      <FormCell title={'피보험자'}>
                        <Typo tag={'strong'} className="body-md font-bold">
                          김*화
                        </Typo>
                      </FormCell>
                      <FormCell title={'기준일자'}>
                        <Typo tag={'strong'} className="body-md font-bold">
                          YYYY-MM-DD
                        </Typo>
                      </FormCell>
                      <FormCell title={'지급정보 조회기간'}>
                        <Typo tag={'strong'} className="body-md font-bold">
                          YY년
                        </Typo>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>
                <Gcol className="h-full">
                  <Table variant="default">
                    <caption className="a11y-hidden">일반/건강고지유형 피보험자 정보 테이블</caption>
                    <colgroup>
                      <col style={{ width: '12rem' }} />
                      <col style={{ width: '8rem' }} />
                      <col style={{ width: '8rem' }} />
                      <col style={{ width: '8rem' }} />
                      <col style={{ width: '9rem' }} />
                      <col style={{ width: '8rem' }} />
                      <col style={{ width: 'auto' }} />
                    </colgroup>
                    <TableHeader>
                      <TableRow>
                        <TableHead>고지유형</TableHead>
                        <TableHead>
                          경증 외<br /> 입원수술
                        </TableHead>
                        <TableHead>수술</TableHead>
                        <TableHead>입원</TableHead>
                        <TableHead>10대 중대질환</TableHead>
                        <TableHead>추천유형</TableHead>
                        <TableHead>비고(사유)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="text-center">
                        <TableHead>6형(건강고지10년)</TableHead>
                        {renderStatusCell('Y', true)}
                        {renderStatusCell('N')}
                        {renderStatusCell('Y')}
                        {renderStatusCell('Y', true)}
                        <TableCell rowSpan={6}>
                          <Gcol gap={1}>
                            <Badge color="blue" size="md" variant="contained">
                              일반고지형
                            </Badge>
                            <Badge color="blue" size="md" variant="contained">
                              건강고지형
                            </Badge>
                            <Badge color="green" size="md" variant="contained">
                              간편고지형
                            </Badge>
                          </Gcol>
                        </TableCell>
                        {/* 2026.05.28 className 추가 */}
                        <TableCell rowSpan={6} className="text-left">
                          종대질환 경증외 입원수술 심사필요병력(거절 39,40,41,797)
                        </TableCell>
                      </TableRow>
                      <TableRow className="text-center">
                        <TableHead>5형(건강고지10년)</TableHead>
                        {renderStatusCell('Y', true)}
                        {renderStatusCell('N')}
                        {renderStatusCell('Y')}
                        {renderStatusCell('Y', true)}
                      </TableRow>
                      <TableRow className="text-center">
                        <TableHead>4형(건강고지10년)</TableHead>
                        {renderStatusCell('Y', true)}
                        {renderStatusCell('N')}
                        {renderStatusCell('Y')}
                        {renderStatusCell('Y', true)}
                      </TableRow>
                      <TableRow className="text-center">
                        <TableHead>3형(건강고지10년)</TableHead>
                        {renderStatusCell('Y', true)}
                        {renderStatusCell('N')}
                        {renderStatusCell('Y')}
                        {renderStatusCell('Y', true)}
                      </TableRow>
                      <TableRow className="text-center">
                        <TableHead>2형(건강고지10년)</TableHead>
                        {renderStatusCell('Y', true)}
                        {renderStatusCell('N')}
                        {renderStatusCell('Y')}
                        {renderStatusCell('Y', true)}
                      </TableRow>
                      <TableRow className="text-center">
                        <TableHead>일반고지형(5년)</TableHead>
                        {renderStatusCell('Y', true)}
                        {renderStatusCell('N')}
                        {renderStatusCell('Y')}
                        {renderStatusCell('Y', true)}
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Grow placement={'ss'} className="w-full min-w-0">
                    {/* Tab2 테이블 주석: 중대질환 정의 */}
                    <div className="flex w-full min-w-0 items-start gap-[0.4rem] text-[1.2rem] leading-[150%] tracking-[-0.13rem] text-[var(--color-gray-70)]">
                      <RefIcon className="mt-[0.3rem] shrink-0" color="var(--color-secondary-50)" size={10} />
                      <span className="min-w-0 break-words">
                        {
                          '10대 중대질환 : 암, 백혈병, 협심증, 심근경색, 심장판막증, 간경화증, 죄졸중증(뇌출혈, 뇌경색), 당뇨병, 에이즈(AIDS) 및 HIV보균'
                        }
                      </span>
                    </div>
                  </Grow>
                </Gcol>
                <Gcol variant={'box-info'} placement={'ss'}>
                  <BulletList>
                    <BulletListItem color="info" size="sm">
                      지급정보 중 우선순위 조건에 따라 안내하며 실제 심사결과와 다를 수 있으니, 참고 보완 자료로 활용
                      바랍니다.
                    </BulletListItem>
                    <BulletListItem size="sm">
                      해당서비스는 고지유형을 선택하는 보조수단으로만 활용바랍니다.
                    </BulletListItem>
                    <BulletListItem size="sm">
                      보험금미청구 or 청구진행중 or 부진단코드 등 조회불가하오니 고객님께 확인하시기 바랍니다.
                    </BulletListItem>
                  </BulletList>
                </Gcol>
              </Gcol>
            )}
          </TabPager>
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
