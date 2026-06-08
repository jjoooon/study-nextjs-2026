/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { CircleCheckIcon, ConditionalIcon, RefIcon, RefuseIcon } from '@icons';
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

type UnderwritingDecisionStatus = keyof typeof underwritingDecisionMap;
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

// tab1_1 dummy data
type DummyDataType1T1 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
};
const underwritingDecisionStatusByLabel: Record<string, UnderwritingDecisionStatus> = {
  거절: 'refuse',
  조건부인수: 'conditional',
  '조건부 인수': 'conditional',
  인수: 'accept',
};
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
const getUnderwritingDecision = (value: string | number) => {
  if (typeof value !== 'string') {
    return null;
  }

  const status = underwritingDecisionStatusByLabel[value.trim()];

  return status ? underwritingDecisionMap[status] : null;
};

const Ltpz030 = () => {
  /* 2026.05.28 className 추가 */
  const columnDefs1T1 = React.useMemo<ColDef<DummyDataType1T1>[]>(
    () => [
      {
        headerName: '분류',
        field: 'field01',
        width: 70,
        autoHeight: true,
        editable: false,
        spanRows: true,
      },
      {
        headerName: '고지유형',
        field: 'field02',
        width: 70,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '가능여부',
        field: 'field03',
        width: 100,
        autoHeight: true,
        editable: false,
        cellRenderer: ({ value }: { value: string | number | null | undefined }) => {
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
        width: 100,
        autoHeight: true,
      },
      {
        headerName: '비고',
        field: 'field05',
        flex: 1,
        autoHeight: true,
        cellClass: 'truncate text-left!',
      },
    ],
    []
  );
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);
  const renderStatusCell = (value: 'Y' | 'N' | '-', highlight = false) => {
    const isDangerY = highlight && value === 'Y';

    return (
      <TableCell className={isDangerY ? 'font-bold text-[var(--color-text-danger)]' : undefined}>{value}</TableCell>
    );
  };

  // ag-Grid + TablePagination 연동 (공통 훅 사용)
  // const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);

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
            {active === 'tab1' ? (
              <>
                <Gcol placement="ss" className="w-full pt-3" gap={3}>
                  <Grow placement="bwe" className="w-full" variant={'box-round'} gap={5}>
                    <FormTable
                      variant={'head'}
                      cols={[
                        'w-[6rem]',
                        'w-auto',
                        'w-[6rem]',
                        'w-auto',
                        'w-[13rem]',
                        'w-auto',
                        'w-[4rem]',
                        'w-auto',
                        'w-[4rem]',
                        'w-auto',
                        'w-[12rem]',
                        'w-auto',
                      ]}
                    >
                      <FormRow>
                        <FormCell title={'피보험자'}>
                          <Input value="김한화" readOnly variant="info" />
                        </FormCell>
                        <FormCell title={'기준일자'}>
                          <Input value="YYYY-MM-DD" readOnly variant="info" />
                        </FormCell>
                        <FormCell title={'지급정보 조회기간'}>
                          <Input value="YY년" readOnly variant="info" />
                        </FormCell>
                        <FormCell title={'고혈압'}>
                          <Badge color="blue" size="md" variant="contained" className="translate-y-[0.1rem]">
                            가능
                          </Badge>
                        </FormCell>
                        <FormCell title={'당뇨'}>
                          <Badge color="blue" size="md" variant="contained" className="translate-y-[0.1rem]">
                            가능
                          </Badge>
                        </FormCell>
                        <FormCell title={'고혈압&당뇨'}>
                          <Badge color="blue" size="md" variant="contained" className="translate-y-[0.1rem]">
                            가능
                          </Badge>
                        </FormCell>
                      </FormRow>
                    </FormTable>
                  </Grow>
                  <Grow placement={'bws'} className="w-full" gap={3}>
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
                      />
                    </div>
                    <Gcol className="h-full">
                      <Table variant="default">
                        <colgroup>
                          <col style={{ width: '12.5%' }} />
                          <col style={{ width: '12.5%' }} />
                          <col style={{ width: '12.5%' }} />
                          <col style={{ width: '12.5%' }} />
                          <col style={{ width: '12.5%' }} />
                          <col style={{ width: '12.5%' }} />
                          <col style={{ width: '12.5%' }} />
                          <col style={{ width: '12.5%' }} />
                        </colgroup>
                        <TableHeader>
                          <TableRow>
                            <TableHead>대상기간</TableHead>
                            <TableHead>
                              경증 외<br /> 입원수술
                            </TableHead>
                            <TableHead>
                              경증 외<br /> 입원(2일)수술
                            </TableHead>
                            <TableHead>수술</TableHead>
                            <TableHead>입원</TableHead>
                            <TableHead>6대 중대질환</TableHead>
                            <TableHead>고혈압</TableHead>
                            <TableHead>당뇨</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="text-center">
                            <TableHead>10년대</TableHead>
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('Y')}
                            {renderStatusCell('Y')}
                            {renderStatusCell('-')}
                            {renderStatusCell('-', true)}
                            {renderStatusCell('-', true)}
                          </TableRow>
                          <TableRow className="text-center">
                            <TableHead>8년대</TableHead>
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('Y')}
                            {renderStatusCell('Y')}
                            {renderStatusCell('-')}
                            {renderStatusCell('-', true)}
                            {renderStatusCell('-', true)}
                          </TableRow>
                          <TableRow className="text-center">
                            <TableHead>6년대</TableHead>
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('Y')}
                            {renderStatusCell('Y')}
                            {renderStatusCell('-')}
                            {renderStatusCell('-', true)}
                            {renderStatusCell('-', true)}
                          </TableRow>
                          <TableRow className="text-center">
                            <TableHead>5년대</TableHead>
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('N')}
                            {renderStatusCell('N')}
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('N', true)}
                            {renderStatusCell('N', true)}
                          </TableRow>
                          <TableRow className="text-center">
                            <TableHead>4년대</TableHead>
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('N')}
                            {renderStatusCell('N')}
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('N', true)}
                            {renderStatusCell('N', true)}
                          </TableRow>
                          <TableRow className="text-center">
                            <TableHead>3년대</TableHead>
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('N')}
                            {renderStatusCell('N')}
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('N', true)}
                            {renderStatusCell('N', true)}
                          </TableRow>
                          <TableRow className="text-center">
                            <TableHead>2년대</TableHead>
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('N')}
                            {renderStatusCell('N')}
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('N', true)}
                            {renderStatusCell('N', true)}
                          </TableRow>
                          <TableRow className="text-center">
                            <TableHead>1년대</TableHead>
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('N')}
                            {renderStatusCell('N')}
                            {renderStatusCell('Y', true)}
                            {renderStatusCell('N', true)}
                            {renderStatusCell('N', true)}
                          </TableRow>
                          <TableRow className="text-center">
                            <TableHead>3개월내</TableHead>
                            {renderStatusCell('N', true)}
                            {renderStatusCell('N', true)}
                            {renderStatusCell('N')}
                            {renderStatusCell('N')}
                            {renderStatusCell('N', true)}
                            {renderStatusCell('N', true)}
                            {renderStatusCell('N', true)}
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Grow placement={'ss'} className="w-full min-w-0">
                        <div className="flex w-full min-w-0 items-start gap-[0.4rem] text-[1.2rem] leading-[150%] tracking-[-0.13rem] text-[var(--color-gray-70)]">
                          <RefIcon className="mt-[0.3rem] shrink-0" color="var(--color-secondary-50)" size={10} />
                          <span className="min-w-0 break-words">
                            {'중대질환(6대) : 암,협심증,심금경색,뇌졸중증(뇌출혈,뇌경색) 간경화증,심장판막증 단, ' +
                              '투석중인 만성신장질환은 제외됩니다.'}
                          </span>
                        </div>
                      </Grow>
                    </Gcol>
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
