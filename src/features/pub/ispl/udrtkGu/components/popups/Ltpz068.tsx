/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Ai2Icon } from '@icons';
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
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

type DummyDataType = {
  id: number;
  field01: string;
  field02: string | number;
  field09: string | number;
  field10: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '1',
    field02: '보통약관(상해사망(간편))',
    field09: 5000,
    field10: 700,
    field03: 3500,
    field04: 490,
    field05: 2500,
    field06: 350,
    field07: 1500,
    field08: 210,
  },
  {
    id: 2,
    field01: '2',
    field02: '보험료납입면제대상보장(5대사유)(간편)',
    field09: 10,
    field10: 279,
    field03: 8,
    field04: 223,
    field05: 5,
    field06: 140,
    field07: 3,
    field08: 84,
  },
  {
    id: 3,
    field01: '3',
    field02: '보장보험료50%납입지원II(4대유사암)',
    field09: 1,
    field10: 942,
    field03: 1,
    field04: 942,
    field05: 1,
    field06: 942,
    field07: 1,
    field08: 942,
  },
  {
    id: 4,
    field01: '4',
    field02: '유방암(수용체타입)진단비',
    field09: 8000,
    field10: 5780,
    field03: 5000,
    field04: 3613,
    field05: 3000,
    field06: 2168,
    field07: 2000,
    field08: 1445,
  },
  {
    id: 5,
    field01: '5',
    field02: '유방암A타입진단비(호르몬수용체양성,HER2양성)',
    field09: 2000,
    field10: 4140,
    field03: 1500,
    field04: 3105,
    field05: 1000,
    field06: 2070,
    field07: 500,
    field08: 1035,
  },
  {
    id: 6,
    field01: '6',
    field02: '유방암B타입진단비(호르몬수용체양성,HER2양성)',
    field09: 2000,
    field10: 700,
    field03: 1500,
    field04: 525,
    field05: 1000,
    field06: 350,
    field07: 500,
    field08: 175,
  },
  {
    id: 7,
    field01: '7',
    field02: '유방암C타입진단비(HER2양성)',
    field09: 2000,
    field10: 380,
    field03: 1500,
    field04: 285,
    field05: 1000,
    field06: 190,
    field07: 500,
    field08: 95,
  },
  {
    id: 8,
    field01: '8',
    field02: '유방암D타입진단비(삼중음성)',
    field09: 100,
    field10: 28,
    field03: 70,
    field04: 20,
    field05: 50,
    field06: 14,
    field07: 30,
    field08: 8,
  },
  {
    id: 9,
    field01: '181',
    field02: '주요순환계질환I특정치료비(요양병원제외,각연간1회한)',
    field09: 2000,
    field10: 560,
    field03: 1500,
    field04: 420,
    field05: 1000,
    field06: 280,
    field07: 500,
    field08: 140,
  },
  {
    id: 10,
    field01: '182',
    field02: '주요순환계질환I특정치료비(수술(혈전제거술제외))(요양병원제외,각연간1회한)',
    field09: 3500,
    field10: 5305,
    field03: 2500,
    field04: 3789,
    field05: 1500,
    field06: 2274,
    field07: 1000,
    field08: 1516,
  },
  {
    id: 11,
    field01: '292',
    field02: '주요순환계질환I특정치료비(혈전제거술)(요양병원제외,연간1회한)',
    field09: 1000,
    field10: 2040,
    field03: 700,
    field04: 1428,
    field05: 500,
    field06: 1020,
    field07: 300,
    field08: 612,
  },
  {
    id: 12,
    field01: '598',
    field02: '주요순환계질환I특정치료비(혈전용해치료)(요양병원제외,연간1회한)',
    field09: 1000,
    field10: 180,
    field03: 700,
    field04: 126,
    field05: 500,
    field06: 90,
    field07: 300,
    field08: 54,
  },
  {
    id: 13,
    field01: '601',
    field02: '주요순환계질환I특정치료비(중환자실치료)(요양병원제외,연간1회한)',
    field09: 1000,
    field10: 300,
    field03: 700,
    field04: 210,
    field05: 500,
    field06: 150,
    field07: 300,
    field08: 90,
  },
  {
    id: 14,
    field01: '602',
    field02: '난임진단비(기혼자용)(갱신형)',
    field09: 20,
    field10: 1785,
    field03: 15,
    field04: 1339,
    field05: 10,
    field06: 893,
    field07: 5,
    field08: 446,
  },
  {
    id: 605,
    field01: '605',
    field02: '난임치료비II(급여인공수정,3회한,기혼자용)(갱신형)',
    field09: 150,
    field10: 530,
    field03: 100,
    field04: 353,
    field05: 70,
    field06: 247,
    field07: 50,
    field08: 177,
  },
  {
    id: 15,
    field01: '612',
    field02: '난임치료비II(급여인공수정치료비(첫번째)(갱신형))',
    field09: 50,
    field10: 330,
    field03: 30,
    field04: 198,
    field05: 20,
    field06: 132,
    field07: 10,
    field08: 66,
  },
  {
    id: 16,
    field01: '619',
    field02: '난임치료비II(급여인공수정치료비(두번째)(갱신형))',
    field09: 50,
    field10: 150,
    field03: 30,
    field04: 90,
    field05: 20,
    field06: 60,
    field07: 10,
    field08: 30,
  },
  {
    id: 17,
    field01: '620',
    field02: '난임치료비II(급여인공수정치료비(세번째)(갱신형))',
    field09: 50,
    field10: 50,
    field03: 30,
    field04: 30,
    field05: 20,
    field06: 20,
    field07: 10,
    field08: 10,
  },
];

type PlanKey = 'A' | 'B' | 'C';

const PLAN_COLS: Array<{
  key: PlanKey;
  leftField: keyof DummyDataType;
  rightField: keyof DummyDataType;
}> = [
  { key: 'A', leftField: 'field03', rightField: 'field04' },
  { key: 'B', leftField: 'field05', rightField: 'field06' },
  { key: 'C', leftField: 'field07', rightField: 'field08' },
];

const Ltpz068 = () => {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [selectedPlan, setSelectedPlan] = React.useState<PlanKey>('A');

  const sumRow = React.useMemo<DummyDataType[]>(() => {
    const toNumber = (value: string | number): number => {
      if (typeof value === 'number') {
        return Number.isFinite(value) ? value : 0;
      }

      const normalized = value.replaceAll(',', '').trim();
      if (normalized.length === 0) {
        return 0;
      }

      const parsed = Number(normalized);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const currentTotal = rowData.reduce((acc, row) => acc + toNumber(row.field10), 0);
    const planATotal = rowData.reduce((acc, row) => acc + toNumber(row.field04), 0);
    const planBTotal = rowData.reduce((acc, row) => acc + toNumber(row.field06), 0);
    const planCTotal = rowData.reduce((acc, row) => acc + toNumber(row.field08), 0);

    return [
      {
        id: -1,
        field01: '',
        field02: '',
        field09: '보장보험료(합)',
        field10: currentTotal,
        field03: '보장보험료(합)',
        field04: planATotal,
        field05: '보장보험료(합)',
        field06: planBTotal,
        field07: '보장보험료(합)',
        field08: planCTotal,
      },
    ];
  }, [rowData]);

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
        field: 'field09',
        width: 90,
        cellClass: 'text-right',
        valueFormatter: (p) => numericFormatter(p.value),
      },
      {
        headerName: '보험료(원)',
        field: 'field10',
        width: 70,
        cellClass: 'text-right',
        valueFormatter: (p) => numericFormatter(p.value),
      },
      ...PLAN_COLS.flatMap(({ leftField, rightField }): ColDef<DummyDataType>[] => [
        {
          headerName: '가입금액(만원)',
          field: leftField,
          width: 90,
          cellClass: 'text-right',
          valueFormatter: (p) => numericFormatter(p.value),
        },
        {
          headerName: '보험료(원)',
          field: rightField,
          width: 70,
          cellClass: 'text-right',
          valueFormatter: (p) => numericFormatter(p.value),
        },
      ]),
    ];
  }, [numericFormatter, attributeColumnWidth]);

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
            <Grid className="grid-cols-[16rem_16rem_16rem_16.6rem]  h-[calc(100%+4rem)] absolute top-[-4rem] right-0 items-start gap-0 z-100 pointer-events-none">
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
