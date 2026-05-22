/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { createTooltipValueGetter } from '@aggrid';
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
    field02: '보통약관(상해사망)',
    field09: 100,
    field10: 28,
    field03: 100,
    field04: 28,
    field05: 100,
    field06: 28,
    field07: 100,
    field08: 28,
  },
  {
    id: 2,
    field01: '2',
    field02: '보험료납입면제대상보장(8대사융Ⅱ 보험료납입면제대상보장(8대사융Ⅱ) 보험료납입면제대상보장(8대사융Ⅱ)',
    field09: 100,
    field10: 28,
    field03: 10,
    field04: 320,
    field05: 10,
    field06: 320,
    field07: 10,
    field08: 320,
  },
  {
    id: 3,
    field01: '3',
    field02: '보장보험료50%납입지원Ⅱ(4대유사암)',
    field09: 100,
    field10: 28,
    field03: 30,
    field04: 28,
    field05: 50,
    field06: 28,
    field07: 30,
    field08: 28,
  },
  {
    id: 4,
    field01: '4',
    field02: '상해사망(체증형)',
    field09: 100,
    field10: 28,
    field03: 300,
    field04: 960,
    field05: 200,
    field06: 640,
    field07: 300,
    field08: 960,
  },
  {
    id: 5,
    field01: '5',
    field02: '상해사망추가',
    field09: 100,
    field10: 28,
    field03: 100,
    field04: 28,
    field05: 100,
    field06: 28,
    field07: 100,
    field08: 28,
  },
  {
    id: 6,
    field01: '6',
    field02: '상해80%이상후유장애',
    field09: 100,
    field10: 28,
    field03: 100,
    field04: 320,
    field05: 100,
    field06: 320,
    field07: 100,
    field08: 320,
  },
  {
    id: 7,
    field01: '7',
    field02: '상해후유장해(3-100%)(갱신형)',
    field09: 100,
    field10: 28,
    field03: 100,
    field04: 320,
    field05: 100,
    field06: 320,
    field07: 100,
    field08: 320,
  },
  {
    id: 8,
    field01: '8',
    field02: '질병사망',
    field09: 100,
    field10: 28,
    field03: 100,
    field04: 28,
    field05: 100,
    field06: 28,
    field07: 100,
    field08: 28,
  },
  {
    id: 181,
    field01: '181',
    field02: '주요순환계질환Ⅰ특정치료비(상급종합병원,권역심뇌혈관질환센터)(각연간',
    field09: 100,
    field10: 28,
    field03: 600,
    field04: 320,
    field05: 500,
    field06: 320,
    field07: 600,
    field08: 320,
  },
  {
    id: 182,
    field01: '182',
    field02: '암(4대유사암제외)진단후특정치료비(암전문의료기관(상급종합 병원))(진',
    field09: 100,
    field10: 28,
    field03: 100,
    field04: 28,
    field05: 100,
    field06: 28,
    field07: 100,
    field08: 28,
  },
  {
    id: 292,
    field01: '292',
    field02: '주요뇌혈관질환(90일면책)진단비(간편)',
    field09: 100,
    field10: 28,
    field03: 100,
    field04: 28,
    field05: 100,
    field06: 28,
    field07: 100,
    field08: 28,
  },
  {
    id: 598,
    field01: '598',
    field02: '암(갑상선암및전립선암제외)다빈치로봇수술비(1회한)(갱신형)(CLA07606)',
    field09: 100,
    field10: 28,
    field03: 500,
    field04: 948,
    field05: 300,
    field06: 558,
    field07: 200,
    field08: 294,
  },
  {
    id: 601,
    field01: '601',
    field02: '뇌혈관질환수술비(수술1회당)',
    field09: 100,
    field10: 28,
    field03: 10,
    field04: 68,
    field05: 20,
    field06: 136,
    field07: 30,
    field08: 204,
  },
  {
    id: 602,
    field01: '602',
    field02: '뇌혈관질환수술비(수술1회당)(갱신형)',
    field09: 100,
    field10: 28,
    field03: 10,
    field04: 13,
    field05: 20,
    field06: 26,
    field07: 30,
    field08: 39,
  },
  {
    id: 605,
    field01: '605',
    field02: '허혈성심장질환수술비(수술1회당)',
    field09: 100,
    field10: 28,
    field03: 10,
    field04: 66,
    field05: 20,
    field06: 132,
    field07: 30,
    field08: 198,
  },
  {
    id: 612,
    field01: '612',
    field02: '상해종합병원1인실입원비(1일이상30일한도)',
    field09: 100,
    field10: 28,
    field03: 1,
    field04: 37,
    field05: 2,
    field06: 74,
    field07: 3,
    field08: 111,
  },
  {
    id: 619,
    field01: '619',
    field02: '상해중환자실입원비(1일이상10일한도)',
    field09: 100,
    field10: 28,
    field03: 1,
    field04: 87,
    field05: 2,
    field06: 174,
    field07: 3,
    field08: 261,
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

  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(() => {
    return [
      {
        headerName: '순번',
        field: 'field01',
        width: 60,
        cellClass: 'text-center px-0!',
      },
      {
        headerName: '담보명',
        field: 'field02',
        flex: 1,
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
  }, [numericFormatter]);

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
                    className="flex flex-col w-full cursor-pointer h-[100%]"
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
