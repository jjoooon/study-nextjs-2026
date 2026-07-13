/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import Ltpz110 from '@/features/pub/shared/components/popups/Ltpz110';
import { Gcol, Grow, Typo, Divider } from '@atoms';
import { BulletItem, BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import NotificationTable from '@features/NotificationTable';
import type { HealthUnderwritingRow } from '@features/NotificationTable';
import { CircleCheckIcon, ConditionalIcon, RefIcon, RefuseIcon, AuditIcon, DiamondIcon } from '@icons';
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
import '@/shared/lib/agGridPub';

// Y 케이스 전용 스타일 클래스 변수 (색상, 굵기 설정)
const dangerY = 'text-[var(--color-text-danger)]';

const nData = [
  ['10년대', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
  ['8년대', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
  ['6년대', 'Y', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'Y', 'Y'],
  ['5년대', 'N', 'N', 'N', 'N', 'Y', 'N', 'N', 'N', 'N'],
  ['4년대', 'N', 'N', 'N', 'N', 'Y', 'N', 'N', 'N', 'N'],
  ['3년대', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
  ['2년대', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
  ['1년대', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
  ['3개월내', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
];

interface AdditionalNotice {
  label: string;
  type: 'refuse' | 'approve';
}

const additionalNotices: AdditionalNotice[] = [
  { label: '고혈압', type: 'refuse' },
  { label: '당뇨', type: 'approve' },
  { label: '고혈압&당뇨', type: 'refuse' },
];

const HEALTH_ROWS: HealthUnderwritingRow[] = [
  {
    data: [
      {
        label: '6형(건강10년)',
        state: '거절',
      },
      {
        label: '5형(건강9년)',
        state: '연기',
      },
      {
        label: '4형(건강8년)',
        state: '인수',
      },
    ],
    tooltipData: [
      {
        title: '간편고지형명 판정결과',
        content: [
          '제한담보: 질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비',
          '인수판정률 사전안내 컬럼에 입력된 값 표시',
        ],
      },
    ],
  },
  {
    data: [
      {
        label: '5형(건강9년)',
        state: '거절',
      },
      {},
      {},
    ],
    tooltipData: [
      {
        title: '간편고지형명 판정결과',
        content: [
          '제한담보: 질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비',
          '인수판정률 사전안내 컬럼에 입력된 값 표시',
        ],
      },
    ],
  },
  {
    data: [
      {
        label: '4형(건강8년)',
        state: '거절',
      },
      {},
      {},
    ],
  },
  {
    data: [
      {
        label: '3형(건강7년)',
        state: '거절',
      },
      {},
      {},
    ],
  },
  {
    data: [
      {
        label: '2형(건강6년)',
        state: '거절',
      },
      {},
      {},
    ],
  },
  {
    data: [
      {
        label: '일반고지형(5년)',
        state: '거절',
      },
      {},
      {},
    ],
  },
];

const CONVENIENCE_ROWS: HealthUnderwritingRow[] = [
  {
    data: [
      {
        label: '3105',
        state: '거절',
      },
      {},
      {},
    ],
    tooltipData: [
      {
        title: '간편고지형명 판정결과',
        content: ['질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비', '질병수술비(ALL RISK)'],
      },
      {
        title: '345조건부(감액)',
        content: [
          '질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비',
          '인수판정률 사전안내 컬럼에 입력된 값 표시',
        ],
      },
      {
        title: '345(2일)조건부(감액)',
        content: [
          '질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비',
          '인수판정률 사전안내 컬럼에 입력된 값 표시',
        ],
      },
    ],
  },
  {
    data: [
      {
        label: '385',
        state: '거절',
      },
      {},
      {},
    ],
  },
  {
    data: [
      {
        label: '365',
        state: '거절',
      },
      {},
      {},
    ],
  },
  {
    data: [
      {
        label: '355',
        state: '거절',
      },
      {
        label: '355(2일)',
        state: '거절',
      },
      {},
    ],
  },
  {
    data: [
      {
        label: '345',
        state: '거절',
      },
      {
        label: '345(2일)',
        state: '인수',
      },
      {},
    ],
  },
  {
    data: [
      {},
      {
        label: '335(2일)',
        state: '인수',
      },
      {},
    ],
  },
  {
    data: [
      {
        label: '325',
        state: '거절',
      },
      {
        label: '325(2일)',
        state: '인수',
      },
      {},
    ],
  },
  {
    data: [
      {},
      {
        label: '315(2일)',
        state: '인수',
      },
      {},
    ],
  },
  {
    data: [
      {
        label: '305',
        state: '인수',
      },
      {
        label: '305(2일)',
        state: '인수',
      },
      {},
    ],
  },
];

// ===== 컴포넌트 시작 =====
const Ltpz030 = () => {
  const [isOpenLtpz110, setIsOpenLtpz110] = React.useState(false);

  // 일반/건강고지 데이터 가공: 각 고지유형 셀에 식별자 ID를 동적 부여하고 checked를 false로 매핑
  const healthRows = React.useMemo<HealthUnderwritingRow[]>(
    () =>
      HEALTH_ROWS.map((row, rowIndex) => ({
        ...row,
        data: row.data.map((item, colIndex) => {
          const id = item.id || `health-${rowIndex}-${colIndex}`;
          return {
            ...item,
            id,
            checked: false,
          };
        }),
      })),
    []
  );

  // 간편고지 데이터 가공: 각 고지유형 셀에 식별자 ID를 동적 부여하고 checked를 false로 매핑
  const convenienceRows = React.useMemo<HealthUnderwritingRow[]>(
    () =>
      CONVENIENCE_ROWS.map((row, rowIndex) => ({
        ...row,
        data: row.data.map((item, colIndex) => {
          const id = item.id || `convenience-${rowIndex}-${colIndex}`;
          return {
            ...item,
            id,
            checked: false,
          };
        }),
      })),
    []
  );

  // ===== 다이얼로그 렌더링 =====
  return (
    <>
      <Dialog open>
        <DialogContent showCloseButton resizable={true} className="w-[110rem]">
          <DialogHeader>
            <DialogTitle>
              <Typo tag={'strong'} variant={'heading-lg'}>
                고지유형찾기(UW)
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
            <Grow className="grid w-full grid-cols-[1fr_42.8rem] gap-3" placement={'ss'}>
              {/* N년내 입원수술 사전체크 (일반 HTML 테이블) */}
              <Gcol className="h-full" placement={'ss'}>
                <Grow placement="sc">
                  <Typo tag={'strong'} variant={'heading-md'} className="leading-[2.5rem]">
                    보험금 지급정보
                  </Typo>
                </Grow>
                <Grow placement="sc">
                  <Typo tag={'strong'} variant={'body-sm'} icon={'dot'} weight={'bold'} color={'default'}>
                    N년내 입원수술
                  </Typo>
                </Grow>
                <Table variant="default">
                  <colgroup>
                    <col style={{ width: '5.4rem' }} />
                    <col style={{ width: 'auto' }} />
                    <col style={{ width: 'auto' }} />
                    <col style={{ width: 'auto' }} />
                    <col style={{ width: 'auto' }} />
                    <col style={{ width: 'auto' }} />
                    <col style={{ width: 'auto' }} />
                    <col style={{ width: 'auto' }} />
                    <col style={{ width: 'auto' }} />
                  </colgroup>
                  <TableHeader>
                    <TableRow>
                      <TableHead rowSpan={2}>
                        대상
                        <br />
                        기간
                      </TableHead>
                      <TableHead rowSpan={2}>수술</TableHead>
                      <TableHead rowSpan={2}>입원</TableHead>
                      <TableHead colSpan={2}>건강/일반</TableHead>
                      <TableHead colSpan={4}>간편</TableHead>
                    </TableRow>
                    <TableRow>
                      <TableHead>경증외 입원수술</TableHead>
                      <TableHead>10대중대질환</TableHead>
                      <TableHead>
                        경증외 입원수술
                        <br />
                        (전체/2일)
                      </TableHead>
                      <TableHead>6대중대질환</TableHead>
                      <TableHead>고혈압</TableHead>
                      <TableHead>당뇨</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nData.map((row, idx) => (
                      <TableRow key={idx} className="text-center">
                        <TableHead>{row[0]}</TableHead>
                        <TableCell>
                          <span className={row[1] === 'Y' ? dangerY : ''}>{row[1]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={row[2] === 'Y' ? dangerY : ''}>{row[2]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={row[3] === 'Y' ? dangerY : ''}>{row[3]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={row[4] === 'Y' ? dangerY : ''}>{row[4]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={row[5] === 'Y' ? dangerY : ''}>{row[5]}</span> /{' '}
                          <span className={row[6] === 'Y' ? dangerY : ''}>{row[6]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={row[7] === 'Y' ? dangerY : ''}>{row[7]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={row[8] === 'Y' ? dangerY : ''}>{row[8]}</span>
                        </TableCell>
                        <TableCell>
                          <span className={row[9] === 'Y' ? dangerY : ''}>{row[9]}</span>
                        </TableCell>
                      </TableRow>
                    ))}
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
                <Gcol>
                  <Grow placement="bwc" gap={2}>
                    <Typo tag={'strong'} variant={'heading-md'}>
                      고지유형 찾기
                    </Typo>
                    <Grow gap={2}>
                      <Button color="gray" variant="outlined" size={'lg'} onClick={() => setIsOpenLtpz110(true)}>
                        정보변경
                      </Button>
                      <Grow gap={2} className="items-center">
                        <span className="flex items-center gap-1 text-[1.2rem]">
                          <RefuseIcon size={16} />
                          거절
                        </span>
                        <span className="flex items-center gap-1 text-[1.2rem]">
                          <DiamondIcon />
                          연기
                        </span>
                        <span className="flex items-center gap-1 text-[1.2rem]">
                          <AuditIcon />
                          심사
                        </span>
                        <span className="flex items-center gap-1 text-[1.2rem]">
                          <ConditionalIcon />
                          조건부
                        </span>
                        <span className="flex items-center gap-1 text-[1.2rem]">
                          <CircleCheckIcon size={14} />
                          인수
                        </span>
                      </Grow>
                    </Grow>
                  </Grow>
                  {/* 일반/건강고지 테이블 */}
                  <Gcol className="h-full" placement={'ss'}>
                    <Typo tag={'strong'} variant={'body-sm'} icon={'dot'} weight={'bold'} color={'default'}>
                      일반/건강고지
                    </Typo>

                    <NotificationTable healthRows={healthRows} isClick={false} />
                  </Gcol>
                </Gcol>
                {/* 간편고지 테이블 */}
                <Gcol className="h-full" placement={'ss'}>
                  <Grow placement="bwe">
                    <Typo tag={'strong'} variant={'body-sm'} icon={'dot'} weight={'bold'} color={'default'}>
                      간편고지
                    </Typo>
                    <Grow gap={2} className="items-center">
                      <Typo variant={'body-sm'} weight={'bold'} className="text-[var(--color-gray-70)]">
                        추가고지
                      </Typo>
                      <Divider />
                      {additionalNotices.map((item) => (
                        <span key={item.label} className="flex items-center gap-[0.2rem] text-[1.2rem]">
                          {item.label}
                          {item.type === 'refuse' ? <RefuseIcon size={16} /> : <CircleCheckIcon size={14} />}
                        </span>
                      ))}
                    </Grow>
                  </Grow>

                  <NotificationTable healthRows={convenienceRows} isClick={false} />
                </Gcol>
              </Gcol>
            </Grow>
            <Gcol className="w-full" placement="ss" variant="box-warning">
              <Typo icon="warning" variant="body-sm">
                <b>주의사항</b>
              </Typo>
              <BulletList color={'warning'} size="sm">
                <BulletListItem>
                  고지유형 찾기 :{' '}
                  <em className="font-normal!">
                    일반/건강고지형은 &quot;심사가능&quot; 유형, 간편고지형은 &quot;인수가능&quot; 유형 안내
                  </em>
                  <BulletItem size="sm" type="dash" color="warning">
                    <Grow>
                      단순 비교시 고객에게 불리한 고지유형이 적용될 수 있으므로 주의
                      <p className="text-[var(--color-gray-70)]">
                        (유병력자일 경우라도 사고력 &middot; 가입담보에 따라 표준체/건강체로 가입가능)
                      </p>
                    </Grow>
                  </BulletItem>
                </BulletListItem>
                <BulletListItem>
                  사전심사 적용범위 : 일부 주요상품 및 주요담보만 사전심사 적용
                  <BulletList>
                    <BulletListItem size="sm" type="dash">
                      <Grow placement="ss">
                        적용상품 :
                        <BulletList>
                          <BulletItem size="sm" before="①" type="symbols">
                            건강/일반 - 시그니처 여성건강, 한아름, 굿밸런스, 0540, 신상품
                          </BulletItem>
                          <BulletItem size="sm" before="②" type="symbols">
                            간편 - 더경증간편, 시그니처 여성간편, 3N5 더 간편, 311 간편, 신상품 간편
                          </BulletItem>
                        </BulletList>
                      </Grow>
                    </BulletListItem>
                    <BulletItem size="sm" type="dash">
                      적용담보 : [기본 적용] 질병후유 3%, 암, 2대, 질병입원비, 질병수술비, 상해입원비, 상해수술비 +
                      [필요시 선택] 상해휴유3%, 요양진단비
                      <BulletList>
                        <BulletItem size="sm" type="dash">
                          적용담보 직접 선택/해제 가능
                        </BulletItem>
                      </BulletList>
                    </BulletItem>
                    <BulletItem size="sm" type="dash">
                      활용정보 : 보험금지급정보
                    </BulletItem>
                  </BulletList>
                </BulletListItem>
                <BulletListItem>
                  설계상품 &middot; 고지유형 선정의 보조수단으로 활용바라며, 실제 심사결과와 다를 수 있음
                </BulletListItem>
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
      {isOpenLtpz110 && (
        <Ltpz110
          open={isOpenLtpz110}
          onOpenChange={setIsOpenLtpz110}
          isID={true}
          defaultValues={['0', '1', '2', '3', '4', '5', '6']}
        />
      )}
    </>
  );
};

export default Ltpz030;
