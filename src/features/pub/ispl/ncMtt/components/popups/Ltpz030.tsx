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
import { CircleCheckIcon, ConditionalIcon, RefIcon, RefuseIcon, AuditIcon, DiamondIcon } from '@icons';
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
const dangerY = 'text-[var(--color-text-danger)]';

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
      data: [
        { id: 'health10', label: '6형(건강10년)', state: 'refuse', disabled: disabledIds.includes('health10') },
        {
          id: 'health9',
          label: '5형(건강9년)',
          state: 'refuse',
          disabled: disabledIds.includes('health9'),
        },
        { id: 'health8', label: '4형(건강8년)', state: 'refuse', disabled: disabledIds.includes('health8') },
      ],
    },
    {
      data: [
        { id: 'health7', label: '3형(건강7년)', state: 'refuse', disabled: disabledIds.includes('health7') },
        { id: 'health6', label: '2형(건강6년)', state: 'refuse', disabled: disabledIds.includes('health6') },
        {
          id: 'general5',
          label: '일반고지형(5년)',
          disabled: disabledIds.includes('general5'),
        },
      ],
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
      data: [
        {
          id: 'simple3105',
          label: '3105',
          state: 'refuse',
        },
        { id: '' },
      ],
    },
    {
      data: [{ id: 'simple385', label: '385', state: 'refuse' }, { id: '' }],
    },
    {
      data: [{ id: 'simple365', label: '365', state: 'refuse' }, { id: '' }],
    },
    {
      data: [
        { id: 'simple355', label: '355', state: 'refuse' },
        {
          id: 'simple355_2d',
          label: '355(2일)',
          state: 'refuse',
        },
      ],
    },
    {
      data: [
        { id: 'simple345', label: '345', state: 'refuse' },
        { id: 'simple345_2d', label: '345(2일)' },
      ],
    },
    {
      data: [{ id: '' }, { id: 'simple335_2d', label: '335(2일)' }],
    },
    {
      data: [
        { id: 'simple325', label: '325', state: 'refuse' },
        { id: 'simple325_2d', label: '325(2일)' },
      ],
    },
    {
      data: [{ id: '' }, { id: 'simple315_2d', label: '315(2일)' }],
    },
    {
      data: [
        { id: 'simple305', label: '305' },
        { id: 'simple305_2d', label: '305(2일)' },
      ],
    },
  ];

  // ===== 다이얼로그 렌더링 =====
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent showCloseButton resizable={true} className="w-[110rem]">
          <DialogHeader>
            <DialogTitle>
              <Typo tag={'strong'} variant={'heading-lg'}>
                고지유형 찾기
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
                      <TableHead>경증외입원수술</TableHead>
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
                        <Checkbox color="primary" size="md" variant="text" className="no-underline cursor-default">
                          <span className="flex items-center gap-1 text-[1.2rem]">
                            <RefuseIcon size={16} />
                            거절
                          </span>
                        </Checkbox>
                        <Checkbox color="primary" size="md" variant="text" className="no-underline cursor-default">
                          <span className="flex items-center gap-1 text-[1.2rem]">
                            <DiamondIcon />
                            연기
                          </span>
                        </Checkbox>
                        <Checkbox color="primary" size="md" variant="text" className="no-underline cursor-default">
                          <span className="flex items-center gap-1 text-[1.2rem]">
                            <AuditIcon />
                            심사
                          </span>
                        </Checkbox>
                        <Checkbox color="primary" size="md" variant="text" className="no-underline cursor-default">
                          <span className="flex items-center gap-1 text-[1.2rem]">
                            <ConditionalIcon />
                            조건부
                          </span>
                        </Checkbox>
                        <Checkbox color="primary" size="md" variant="text" className="no-underline cursor-default">
                          <span className="flex items-center gap-1 text-[1.2rem]">
                            <CircleCheckIcon size={14} />
                            인수
                          </span>
                        </Checkbox>
                      </Grow>
                    </Grow>
                  </Grow>
                  {/* 일반/건강고지 테이블 */}
                  <Gcol className="h-full" placement={'ss'}>
                    <Typo tag={'strong'} variant={'body-sm'} icon={'dot'} weight={'bold'} color={'default'}>
                      일반/건강고지
                    </Typo>

                    <Ltpa030table healthRows={healthRows} isClick={false} />
                  </Gcol>
                </Gcol>
                {/* 간편고지 테이블 */}
                <Gcol className="h-full" placement={'ss'}>
                  <Grow placement="bwe">
                    <Typo tag={'strong'} variant={'body-sm'} icon={'dot'} weight={'bold'} color={'default'}>
                      간편고지
                    </Typo>
                    <Grow gap={2} className="items-center">
                      <Typo variant={'body-sm'} weight={'bold'}>
                        추가고지
                      </Typo>
                      <Divider />
                      <Checkbox color="primary" size="md" variant="text" className="no-underline cursor-default">
                        <span className="flex items-center gap-1">
                          고혈압
                          <RefuseIcon size={16} />
                        </span>
                      </Checkbox>
                      <Checkbox color="primary" size="md" variant="text" className="no-underline cursor-default">
                        <span className="flex items-center gap-1">
                          당뇨
                          <CircleCheckIcon size={14} />
                        </span>
                      </Checkbox>
                      <Checkbox color="primary" size="md" variant="text" className="no-underline cursor-default">
                        <span className="flex items-center gap-1">
                          고혈압&당뇨
                          <RefuseIcon size={16} />
                        </span>
                      </Checkbox>
                    </Grow>
                  </Grow>
                  <Ltpa030table simpleRows={simpleRows} isClick={false} />
                </Gcol>
              </Gcol>
            </Grow>
            <Gcol className="w-full" placement="ss" variant="box-warning">
              <Typo icon="warning" variant="body-sm">
                <b>주의사항</b>
              </Typo>
              <BulletList color={'warning'} size="sm">
                <BulletListItem>
                  추천유형 안내 :{' '}
                  <em>일반/건강고지형은 &quot;심사가능&quot; 유형, 간편고지형은 &quot;인수가능&quot; 유형 안내</em>
                  <BulletItem size="sm" type="dash">
                    <em>단순 비교시 고객에게 불리한 고지유형이 적용될 수 있으므로 주의</em>(유병력자일 경우라도 사고력
                    &middot; 가입담보에 따라 표준체/건강체로 가입가능)
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
      {isOpenLtpz110 && <Ltpz110 open={isOpenLtpz110} onOpenChange={setIsOpenLtpz110} isID={true} />}
    </>
  );
};

export default Ltpz030;
