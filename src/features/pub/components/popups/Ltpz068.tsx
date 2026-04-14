'use client';

import type {
  ColDef,
  DisplayedColumnsChangedEvent,
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  GridSizeChangedEvent,
} from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TableFold } from '@common/TableFold';
import { Button } from '@uiux/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = {
  id: number;
  field01: string;
  field02: string | number;
  field03: number;
  field04: number;
  field05: number;
  field06: number;
  field07: number;
  field08: number;
};

const DummyData: DummyDataType[] = [
  { id: 1,   field01: '1',   field02: '보통약관(상해사망)',                                                             field03: 100, field04: 28,  field05: 100, field06: 28,  field07: 100, field08: 28  },
  { id: 2,   field01: '2',   field02: '보험료납입면제대상보장(8대사융Ⅱ)',                                                field03: 10,  field04: 320, field05: 10,  field06: 320, field07: 10,  field08: 320 },
  { id: 3,   field01: '3',   field02: '보장보험료50%납입지원Ⅱ(4대유사암)',                                               field03: 30,  field04: 28,  field05: 50,  field06: 28,  field07: 30,  field08: 28  },
  { id: 4,   field01: '4',   field02: '상해사망(체증형)',                                                               field03: 300, field04: 960, field05: 200, field06: 640, field07: 300, field08: 960 },
  { id: 5,   field01: '5',   field02: '상해사망추가',                                                                   field03: 100, field04: 28,  field05: 100, field06: 28,  field07: 100, field08: 28  },
  { id: 6,   field01: '6',   field02: '상해80%이상후유장애',                                                            field03: 100, field04: 320, field05: 100, field06: 320, field07: 100, field08: 320 },
  { id: 7,   field01: '7',   field02: '상해후유장해(3-100%)(갱신형)',                                                   field03: 100, field04: 320, field05: 100, field06: 320, field07: 100, field08: 320 },
  { id: 8,   field01: '8',   field02: '질병사망',                                                                       field03: 100, field04: 28,  field05: 100, field06: 28,  field07: 100, field08: 28  },
  { id: 181, field01: '181', field02: '주요순환계질환Ⅰ특정치료비(상급종합병원,권역심뇌혈관질환센터)(각연간',               field03: 600, field04: 320, field05: 500, field06: 320, field07: 600, field08: 320 },
  { id: 182, field01: '182', field02: '암(4대유사암제외)진단후특정치료비(암전문의료기관(상급종합 병원))(진',               field03: 100, field04: 28,  field05: 100, field06: 28,  field07: 100, field08: 28  },
  { id: 292, field01: '292', field02: '주요뇌혈관질환(90일면책)진단비(간편)',                                            field03: 100, field04: 28,  field05: 100, field06: 28,  field07: 100, field08: 28  },
  { id: 598, field01: '598', field02: '암(갑상선암및전립선암제외)다빈치로봇수술비(1회한)(갱신형)(CLA07606)',               field03: 500, field04: 948, field05: 300, field06: 558, field07: 200, field08: 294 },
  { id: 601, field01: '601', field02: '뇌혈관질환수술비(수술1회당)',                                                     field03: 10,  field04: 68,  field05: 20,  field06: 136, field07: 30,  field08: 204 },
  { id: 602, field01: '602', field02: '뇌혈관질환수술비(수술1회당)(갱신형)',                                             field03: 10,  field04: 13,  field05: 20,  field06: 26,  field07: 30,  field08: 39  },
  { id: 605, field01: '605', field02: '허혈성심장질환수술비(수술1회당)',                                                 field03: 10,  field04: 66,  field05: 20,  field06: 132, field07: 30,  field08: 198 },
  { id: 612, field01: '612', field02: '상해종합병원1인실입원비(1일이상30일한도)',                                        field03: 1,   field04: 37,  field05: 2,   field06: 74,  field07: 3,   field08: 111 },
  { id: 619, field01: '619', field02: '상해중환자실입원비(1일이상10일한도)',                                             field03: 1,   field04: 87,  field05: 2,   field06: 174, field07: 3,   field08: 261 },
];

const ACTIVE_BG   = 'var(--color-primary-50)';
const INACTIVE_BG = 'var(--color-secondary-50)';

type PlanKey = 'A' | 'B' | 'C';

type PlanBoxRect = {
  left: number;
  width: number;
};

const PLAN_COLS: Array<{
  key: PlanKey;
  leftField: keyof DummyDataType;
  rightField: keyof DummyDataType;
}> = [
  { key: 'A', leftField: 'field03', rightField: 'field04' },
  { key: 'B', leftField: 'field05', rightField: 'field06' },
  { key: 'C', leftField: 'field07', rightField: 'field08' },
];

export const Ltpz068 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [selectedPlan, setSelectedPlan] = React.useState<PlanKey>('A');
  const [planBoxRects, setPlanBoxRects] = React.useState<Partial<Record<PlanKey, PlanBoxRect>>>({});
  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);

  const updatePlanBoxRects = React.useCallback(() => {
    const api = gridApiRef.current;

    if (!api) {
      return;
    }

    const columns = api.getAllDisplayedColumns();
    const nextRects: Partial<Record<PlanKey, PlanBoxRect>> = {};

    PLAN_COLS.forEach(({ key, leftField, rightField }) => {
      const leftColumn = columns.find((column) => column.getColId() === leftField);
      const rightColumn = columns.find((column) => column.getColId() === rightField);

      if (!leftColumn || !rightColumn) {
        return;
      }

      const left = leftColumn.getLeft() ?? 0;
      const right = (rightColumn.getLeft() ?? 0) + rightColumn.getActualWidth();

      nextRects[key] = {
        left,
        width: right - left,
      };
    });

    setPlanBoxRects(nextRects);
  }, []);

  const schedulePlanBoxRectsUpdate = React.useCallback(() => {
    window.requestAnimationFrame(() => {
      updatePlanBoxRects();
    });
  }, [updatePlanBoxRects]);

  const handleGridReady = React.useCallback((event: GridReadyEvent<DummyDataType>) => {
    gridApiRef.current = event.api;
    schedulePlanBoxRectsUpdate();
  }, [schedulePlanBoxRectsUpdate]);

  const handleFirstDataRendered = React.useCallback((_: FirstDataRenderedEvent<DummyDataType>) => {
    schedulePlanBoxRectsUpdate();
  }, [schedulePlanBoxRectsUpdate]);

  const handleDisplayedColumnsChanged = React.useCallback((_: DisplayedColumnsChangedEvent<DummyDataType>) => {
    schedulePlanBoxRectsUpdate();
  }, [schedulePlanBoxRectsUpdate]);

  const handleGridSizeChanged = React.useCallback((_: GridSizeChangedEvent<DummyDataType>) => {
    schedulePlanBoxRectsUpdate();
  }, [schedulePlanBoxRectsUpdate]);

  React.useEffect(() => {
    if (open) {
      schedulePlanBoxRectsUpdate();
    }
  }, [open, schedulePlanBoxRectsUpdate]);

  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(() => {
    return [
      {
        headerName: '순번',
        field: 'field01',
        width: 60,
        editable: false,
        autoHeight: true,
        cellClass: 'text-center px-0!',
      },
      {
        headerName: '담보명',
        field: 'field02',
        flex: 1,
        autoHeight: true,
        editable: false,
        cellClass: 'text-left',
      },
      ...PLAN_COLS.flatMap(({ leftField, rightField }): ColDef<DummyDataType>[] => [
        {
          headerName: '가입금액(만원)',
          field: leftField,
          width: 100,
          autoHeight: true,
          editable: false,
          cellClass: 'text-center px-0!',
        },
        {
          headerName: '보험료(원)',
          field: rightField,
          width: 100,
          autoHeight: true,
          editable: false,
          cellClass: 'text-center px-0!',
        },
      ]),
    ];
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

        <DialogSection className="grid-rows-[auto_1fr]">
          <TableFold>
            <Grow className="w-full relative mt-10">
              <Grow className="absolute top-[-2.5rem] left-[0rem]">
                <Typo variant={'body-lg'} className="font-bold">AI의 해결안을 적용하면 인수지침 위배 항목이 자동 해소됩니다.</Typo>
              </Grow>

              {/* A안 / B안 / C안 상단 탭 */}
              <Grow className="flex flex-row w-[60rem] absolute top-[-4rem] right-0 items-start gap-0">
                {PLAN_COLS.map(({ key: plan }) => {
                  const isActive = selectedPlan === plan;
                  const bg = isActive ? ACTIVE_BG : INACTIVE_BG;
                  return (
                    <div
                      key={plan}
                      className="flex flex-col w-[20rem] cursor-pointer"
                      onClick={() => setSelectedPlan(plan)}
                    >
                      {/* 탭 헤더 */}
                      <Grow
                        className="flex flex-row items-center justify-between h-[4rem] py-2 px-4 rounded-t-[1rem]"
                        style={{ backgroundColor: bg }}
                      >
                        <Typo className="text-[1.4rem] font-bold text-white">
                          {plan}안
                        </Typo>
                        <RadioGroup
                          value={isActive ? plan : ''}
                          onValueChange={() => setSelectedPlan(plan)}
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                          <RadioGroupItem
                            color="primary"
                            id={`plan-${plan}`}
                            size="lg"
                            value={plan}
                            variant="default"
                          />
                        </RadioGroup>
                      </Grow>
                    </div>
                  );
                })}
              </Grow>

              {/* 그리드 */}
              <div className="ag-theme-alpine relative z-10 w-[60rem]">
                
                <Grow className="pointer-events-none absolute inset-0 z-20">
                  {PLAN_COLS.map(({ key }) => {
                    const borderColor = selectedPlan === key
                      ? 'var(--color-primary-50)'
                      : 'var(--color-secondary-50)';
                    const rect = planBoxRects[key];

                    if (!rect) {
                      return null;
                    }

                    return (
                      <div
                        key={`plan-box-${key}`}
                        className="absolute top-0 bottom-0 border-[0.3rem]"
                        style={{
                          left: `${rect.left}px`,
                          width: `${rect.width}px`,
                          borderColor,
                        }}
                      />
                    );
                  })}
                </Grow>
                <AgGridReact<DummyDataType>
                  onGridReady={handleGridReady}
                  onFirstDataRendered={handleFirstDataRendered}
                  onDisplayedColumnsChanged={handleDisplayedColumnsChanged}
                  onGridSizeChanged={handleGridSizeChanged}
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: false,
                    resizable: false,
                  }}
                  enableCellSpan={true}
                  domLayout="autoHeight"
                />
              </div>

            </Grow>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <Gcol className="w-full" gap={0}>
            <Grow placement={'ee'} gap={2} className="w-full pb-5 px-6">
              <Grow>
                <Button variant={'contained'} size={'xl'}>
                  적용
                </Button>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </Grow>
            </Grow>
            <DialogBottomInfo />
          </Gcol>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};