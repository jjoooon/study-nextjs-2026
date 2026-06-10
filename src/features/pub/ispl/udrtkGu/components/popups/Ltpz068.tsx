/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Grow, Typo, Grid } from '@atoms';
import { Ai2Icon } from '@icons';
import { createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
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
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { DialogBottomInfo } from '@common/DialogBottomInfo';

type DummyDataType = {
  id: number;
  field01: string;
  field02: string | number;
  insuredAmount: string | number;
  premium: string | number;
  insuredAmountA: string | number;
  premiumA: string | number;
  insuredAmountB: string | number;
  premiumB: string | number;
  insuredAmountC: string | number;
  premiumC: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '1',
    field02: '보통약관(상해사망(간편))',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 2,
    field01: '2',
    field02: '보험료납입면제대상보장(5대사유)(간편)',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 3,
    field01: '3',
    field02: '보장보험료50%납입지원II(4대유사암)',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 200,
    premiumA: 50,
    insuredAmountB: 200,
    premiumB: 50,
    insuredAmountC: 200,
    premiumC: 50,
  },
  {
    id: 4,
    field01: '4',
    field02: '유방암(수용체타입)진단비',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 200,
    premiumA: 50,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 5,
    field01: '5',
    field02: '유방암A타입진단비(호르몬수용체양성,HER2양성)',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 6,
    field01: '6',
    field02: '유방암B타입진단비(호르몬수용체양성,HER2양성)',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 90,
    premiumA: 5,
    insuredAmountB: 90,
    premiumB: 5,
    insuredAmountC: 90,
    premiumC: 5,
  },
  {
    id: 7,
    field01: '7',
    field02: '유방암C타입진단비(HER2양성)',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 90,
    premiumC: 10,
  },
  {
    id: 8,
    field01: '8',
    field02: '유방암D타입진단비(삼중음성)',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 9,
    field01: '181',
    field02: '주요순환계질환I특정치료비(요양병원제외,각연간1회한)',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 10,
    field01: '182',
    field02: '주요순환계질환I특정치료비(수술(혈전제거술제외))(요양병원제외,각연간1회한)',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 11,
    field01: '292',
    field02: '주요순환계질환I특정치료비(혈전제거술)(요양병원제외,연간1회한)',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 12,
    field01: '598',
    field02: '주요순환계질환I특정치료비(혈전용해치료)(요양병원제외,연간1회한)',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 13,
    field01: '601',
    field02: '주요순환계질환I특정치료비(중환자실치료)(요양병원제외,연간1회한)',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 14,
    field01: '602',
    field02: '난임진단비(기혼자용)(갱신형)',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 605,
    field01: '605',
    field02: '난임치료비II(급여인공수정,3회한,기혼자용)(갱신형)',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 15,
    field01: '612',
    field02: '난임치료비II(급여인공수정치료비(첫번째)(갱신형))',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 16,
    field01: '619',
    field02: '난임치료비II(급여인공수정치료비(두번째)(갱신형))',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
  {
    id: 17,
    field01: '620',
    field02: '난임치료비II(급여인공수정치료비(세번째)(갱신형))',
    insuredAmount: 100,
    premium: 28,
    insuredAmountA: 100,
    premiumA: 28,
    insuredAmountB: 100,
    premiumB: 28,
    insuredAmountC: 100,
    premiumC: 28,
  },
];

type PlanKey = 'A' | 'B' | 'C';

const PLAN_COLS: Array<{
  key: PlanKey;
  leftField: keyof DummyDataType;
  rightField: keyof DummyDataType;
}> = [
  { key: 'A', leftField: 'insuredAmountA', rightField: 'premiumA' },
  { key: 'B', leftField: 'insuredAmountB', rightField: 'premiumB' },
  { key: 'C', leftField: 'insuredAmountC', rightField: 'premiumC' },
];

const Ltpz068 = () => {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [selectedPlan, setSelectedPlan] = React.useState<PlanKey>('A');

  const toNumber = React.useCallback((value: string | number): number => {
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : 0;
    }

    const normalized = value.replaceAll(',', '').trim();
    if (normalized.length === 0) {
      return 0;
    }

    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }, []);

  const sumRow = React.useMemo<DummyDataType[]>(() => {
    const currentTotal = rowData.reduce((acc, row) => acc + toNumber(row.premium), 0);
    const planATotal = rowData.reduce((acc, row) => acc + toNumber(row.premiumA), 0);
    const planBTotal = rowData.reduce((acc, row) => acc + toNumber(row.premiumB), 0);
    const planCTotal = rowData.reduce((acc, row) => acc + toNumber(row.premiumC), 0);

    return [
      {
        id: -1,
        field01: '',
        field02: '',
        insuredAmount: '보장보험료(합)',
        premium: currentTotal,
        insuredAmountA: '보장보험료(합)',
        premiumA: planATotal,
        insuredAmountB: '보장보험료(합)',
        premiumB: planBTotal,
        insuredAmountC: '보장보험료(합)',
        premiumC: planCTotal,
      },
    ];
  }, [rowData, toNumber]);

  const numericFormatter = React.useCallback((value: string | number | null | undefined): string => {
    if (value === null || value === undefined || value === '') return '';
    if (typeof value === 'string' && isNaN(Number(value.replaceAll(',', '')))) return value;
    const num = typeof value === 'number' ? value : Number(value.replaceAll(',', ''));
    return Number.isFinite(num) ? num.toLocaleString() : String(value);
  }, []);

  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(() => {
    return [
      {
        headerName: '순번',
        field: 'field01',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center px-0!',
      },
      {
        headerName: '담보명',
        field: 'field02',
        flex: 7,
        cellClass: 'text-left ',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
      },
      {
        headerName: '가입금액(만원)',
        field: 'insuredAmount',
        width: attributeColumnWidth(90),
        cellClass: 'text-right',
        valueFormatter: (p) => numericFormatter(p.value),
      },
      {
        headerName: '보험료(원)',
        field: 'premium',
        width: attributeColumnWidth(70),
        cellClass: 'text-right',
        valueFormatter: (p) => numericFormatter(p.value),
      },
      ...PLAN_COLS.flatMap(({ leftField, rightField }): ColDef<DummyDataType>[] => [
        {
          headerName: '가입금액(만원)',
          field: leftField,
          width: attributeColumnWidth(90),
          cellClass: 'text-right pr-2!',
          valueFormatter: (p) => numericFormatter(p.value),
          cellClassRules: {
            'cell-greater': (params) => {
              if (params.node.isRowPinned()) return false;
              const base = toNumber(params.data?.insuredAmount ?? 0);
              const current = toNumber(params.value ?? 0);
              return current > base;
            },
            'cell-less': (params) => {
              if (params.node.isRowPinned()) return false;
              const base = toNumber(params.data?.insuredAmount ?? 0);
              const current = toNumber(params.value ?? 0);
              return current < base;
            },
          },
        },
        {
          headerName: '보험료(원)',
          field: rightField,
          width: attributeColumnWidth(70),
          cellClass: 'text-right pr-2!',
          valueFormatter: (p) => numericFormatter(p.value),
          cellClassRules: {
            'cell-greater': (params) => {
              if (params.node.isRowPinned()) return false;
              const base = toNumber(params.data?.premium ?? 0);
              const current = toNumber(params.value ?? 0);
              return current > base;
            },
            'cell-less': (params) => {
              if (params.node.isRowPinned()) return false;
              const base = toNumber(params.data?.premium ?? 0);
              const current = toNumber(params.value ?? 0);
              return current < base;
            },
          },
        },
      ]),
    ];
  }, [numericFormatter, attributeColumnWidth, toNumber]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              AI인수지침 위배해소 결과 확인 및 적용
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ068)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr] gap-2 pt-[2rem]">
          <Grow className="w-full justify-start">
            <Ai2Icon color={'var(--color-information-50)'} />
            <Typo variant={'body-lg'} className="font-bold">
              <b className="text-[var(--color-information-50)]">AI의 해결안을 적용</b>하면 인수지침 위배 항목이{' '}
              <b className="text-[var(--color-information-50)]">자동 해소</b>됩니다.
            </Typo>
          </Grow>

          {/* A안 / B안 / C안 상단 탭 */}
          <div className="relative">
            <Grid className="grid-cols-[15.8rem_16rem_16.2rem_17.6rem]  h-[calc(100%+4rem)] absolute top-[-4rem] right-0 items-start gap-0 z-100 pointer-events-none">
              <div className="flex flex-col w-full cursor-pointer h-[100%]">
                {/* 탭 헤더 */}
                <Grow className="flex flex-col items-start justify-between h-[100%] p-0 rounded-t-[1rem] gap-0 ">
                  <div className="flex flex-row items-center justify-between h-[4rem] py-2 px-4 rounded-t-[1rem] w-full pointer-events-auto bg-[var(--color-primary-50)]">
                    <Typo className="text-[1.4rem] font-bold text-white">현재</Typo>
                  </div>
                  <div
                    className="border w-[calc(100%+0.01rem)] h-[calc(100%-4rem)]"
                    style={{ borderColor: 'var(--color-primary-50)', borderWidth: '0.2rem' }}
                  ></div>
                </Grow>
              </div>
              {PLAN_COLS.map(({ key: plan }) => {
                const isActive = selectedPlan === plan;
                const bg = isActive ? 'var(--color-information-50)' : 'var(--color-secondary-50)';
                return (
                  <div
                    role="button"
                    key={plan}
                    className="flex flex-col w-full cursor-pointer h-[100%] focus:outline-none"
                    tabIndex={0}
                    onClick={() => setSelectedPlan(plan)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedPlan(plan);
                      }
                    }}
                    aria-pressed={isActive}
                  >
                    {/* 탭 헤더 */}
                    <Grow className="flex flex-col items-start justify-between h-[100%] p-0 rounded-t-[1rem] gap-0 ">
                      <div
                        className="flex flex-row items-center justify-between h-[4rem] py-2 px-4 rounded-t-[1rem] w-full pointer-events-auto"
                        style={{ backgroundColor: bg }}
                      >
                        <Typo className="text-[1.4rem] font-bold text-white">{plan}안</Typo>
                        <RadioGroup
                          value={isActive ? plan : ''}
                          onValueChange={() => setSelectedPlan(plan)}
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                          <RadioGroupItem color="info" id={`plan-${plan}`} size="lg" value={plan} variant="default" />
                        </RadioGroup>
                      </div>
                      <div
                        className="border w-[calc(100%+0.01rem)] h-[calc(100%-4rem)]"
                        style={{ borderColor: bg, borderWidth: isActive ? '0.4rem' : '0.2rem' }}
                      ></div>
                    </Grow>
                  </div>
                );
              })}
            </Grid>
            {/* 그리드 */}
            <div className="ag-theme-alpine relative min-h-[calc(100vh-30rem)] !max-h-[30rem]">
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: true,
                  resizable: false,
                  cellDataType: false,
                }}
                alwaysShowVerticalScroll={true}
                enableCellSpan={true}
                domLayout="normal"
                tooltipShowMode="standard"
                tooltipShowDelay={0}
                getRowStyle={(params) => (params.node.rowPinned ? { fontWeight: 'bold' } : undefined)}
                pinnedBottomRowData={sumRow}
              />
            </div>
          </div>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                적용
              </Button>
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

export default Ltpz068;
