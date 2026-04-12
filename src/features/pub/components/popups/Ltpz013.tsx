'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { RecommendCard } from '@common/RecommendCard';
import { BadgeCheckIcon, CalendarIcon, CircleCheckIcon, FixingPinIcon, NoteIcon, ShieldIcon } from '@icons';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

ModuleRegistry.registerModules([AllCommunityModule]);
// ag-theme-alpine div의 스크롤 동기화를 위한 Context
type TableScrollSyncContextType = {
  register: (ref: React.RefObject<HTMLDivElement | null>) => void;
  unregister: (ref: React.RefObject<HTMLDivElement | null>) => void;
  syncScroll: (source: HTMLDivElement, scrollTop: number) => void;
};

const TableScrollSyncContext = React.createContext<TableScrollSyncContextType | null>(null);

function TableScrollSyncProvider({ children }: { children: React.ReactNode }) {
  const refs = React.useRef<React.RefObject<HTMLDivElement | null>[]>([]);
  const isSyncing = React.useRef(false);

  const register = React.useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    if (!refs.current.includes(ref)) {
      refs.current.push(ref);
    }
  }, []);
  const unregister = React.useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    refs.current = refs.current.filter((r) => r !== ref);
  }, []);
  const syncScroll = React.useCallback((source: HTMLDivElement, scrollTop: number) => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    refs.current.forEach((ref) => {
      const div = ref.current;
      if (div && div !== source) {
        div.scrollTop = scrollTop;
      }
    });
    setTimeout(() => {
      isSyncing.current = false;
    }, 0);
  }, []);
  return (
    <TableScrollSyncContext.Provider value={{ register, unregister, syncScroll }}>
      {children}
    </TableScrollSyncContext.Provider>
  );
}

type ComparisonRow = {
  id: number;
  coverage: string;
  amount: string;
  premium: string;
};

type CompareCardProps = {
  mode: 'base' | 'compare';
  compareLabel?: string;
  statusText?: '인수가능' | '조건인수가능';
  total: TotalRow;
};

type CompareSelectForm = {
  planType: string;
  underwritingPlan: string;
  paymentTerm: string;
  maturityTerm: string;
  renewalTerm: string;
  noticeType: string;
};

type SelectOption = {
  id: string;
  value: string;
  label: string;
};

type TotalRow = {
  totalCost: number;
  percent: number;
};

const comparisonRows: ComparisonRow[] = [
  { id: 1, coverage: '보통약관(상해80%이상후유장해)', amount: '3,000', premium: '3,000' },
  { id: 2, coverage: '보험료납입면제대상보장(5대유사)', amount: '10', premium: '10' },
  { id: 3, coverage: '상해사망(간편)', amount: '15,000', premium: '15,000' },
  { id: 4, coverage: '상해후유장해(3-100%)', amount: '10,000', premium: '10,000' },
  { id: 5, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 6, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 7, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 8, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 9, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 10, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 11, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 12, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 13, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 14, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 15, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 16, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
];
const cardTotals = {
  base: {
    totalCost: 70001,
    percent: 39.4,
  },
  compare1: {
    totalCost: 70001,
    percent: 39.4,
  },
  compare2: {
    totalCost: 70001,
    percent: 39.4,
  },
  compare3: {
    totalCost: 70001,
    percent: 39.4,
  },
};

const comparisonColumnDefs: ColDef<ComparisonRow>[] = [
  {
    headerName: '담보명',
    field: 'coverage',
    flex: 1,
  },
  {
    headerName: '가입금액(원)',
    field: 'amount',
    width: 70,
    cellClass: 'text-right',
  },
  {
    headerName: '보험료(원)',
    field: 'premium',
    width: 70,
    cellClass: 'text-right',
  },
];

function getComparisonHeaderCellStyle(column: ColDef<ComparisonRow>): React.CSSProperties {
  if (typeof column.width === 'number') {
    const width = `${column.width}px`;

    return {
      flex: '0 0 auto',
      minWidth: width,
      width,
    };
  }

  if (typeof column.flex === 'number') {
    return {
      flex: `${column.flex} ${column.flex} 0%`,
      minWidth: 0,
    };
  }

  return {
    flex: '1 1 0%',
    minWidth: 0,
  };
}

const planTypeOptions: SelectOption[] = [
  { id: 'planType-1', value: 'planType-1', label: '납입면제 강화형, 납입후 50% 해약환급 금지급형' },
];

const underwritingPlanOptions: SelectOption[] = [
  { id: 'underwritingPlan-1', value: 'underwritingPlan-1', label: '비대면진단심사플랜(20~40세)' },
];

const paymentTermOptions: SelectOption[] = [{ id: 'paymentTerm-1', value: 'paymentTerm-1', label: '20년납' }];
const maturityTermOptions: SelectOption[] = [{ id: 'maturityTerm-1', value: 'maturityTerm-1', label: '100세만기' }];
const renewalTermOptions: SelectOption[] = [{ id: 'renewalTerm-1', value: 'renewalTerm-1', label: '갱신 20년' }];

const noticeTypeOptions: SelectOption[] = [{ id: 'noticeType-1', value: 'noticeType-1', label: '1형(일반고지형)' }];

function CompareDesignCard({ mode, compareLabel, statusText = '인수가능', total }: CompareCardProps) {
  const isCompare = mode === 'compare';
  const [compareForm, setCompareForm] = React.useState<CompareSelectForm>({
    planType: planTypeOptions[0]?.value ?? '',
    underwritingPlan: underwritingPlanOptions[0]?.value ?? '',
    paymentTerm: paymentTermOptions[0]?.value ?? '',
    maturityTerm: maturityTermOptions[0]?.value ?? '',
    renewalTerm: renewalTermOptions[0]?.value ?? '',
    noticeType: noticeTypeOptions[0]?.value ?? '',
  });

  const setCompareField = React.useCallback((field: keyof CompareSelectForm, value: string) => {
    setCompareForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  // ag-theme-alpine div ref 및 스크롤 동기화
  const scrollDivRef = React.useRef<HTMLDivElement>(null);
  const scrollSync = React.useContext(TableScrollSyncContext);
  React.useEffect(() => {
    if (!scrollSync) return;
    scrollSync.register(scrollDivRef);
    return () => scrollSync.unregister(scrollDivRef);
  }, [scrollSync]);
  React.useEffect(() => {
    if (!scrollSync) return;
    const div = scrollDivRef.current;
    if (!div) return;
    const handleScroll = () => {
      if (!scrollSync) return;
      scrollSync.syncScroll(div, div.scrollTop);
    };
    div.addEventListener('scroll', handleScroll);
    return () => div.removeEventListener('scroll', handleScroll);
  }, [scrollSync]);
  const compareFooter = (
    <Grow className="w-full px-[1.6rem] py-[1rem]" placement="bwc" gap={0}>
      <Typo tag={'p'} variant={'body-md'} weight={'bold'} className="text-white">
        보험료(환급률)
      </Typo>
      <Grow className="text-white" placement="ec" gap={0.2}>
        <Typo tag={'p'} variant={'body-lg'} weight={'bold'} className="text-white">
          {total.totalCost.toLocaleString()}
        </Typo>
        <Typo tag={'span'} variant={'body-md'} className="text-white">
          원
        </Typo>
        <Typo tag={'span'} variant={'body-md'} className="text-white">
          ({total.percent}%)
        </Typo>
      </Grow>
    </Grow>
  );

  const baseFooter = (
    <Grow className="w-full px-[1.6rem] py-[1rem]  " placement="bwc" gap={0}>
      <Typo tag={'p'} variant={'body-md'} weight={'bold'} className="text-white">
        보험료(환급률)
      </Typo>
      <Grow className="text-white" placement="ec" gap={0.2}>
        <Typo tag={'p'} variant={'body-lg'} weight={'bold'} className="text-white">
          {total.totalCost.toLocaleString()}
        </Typo>
        <Typo tag={'span'} variant={'body-md'} className="text-white">
          원
        </Typo>
        <Typo tag={'span'} variant={'body-md'} className="text-white">
          ({total.percent}%)
        </Typo>
      </Grow>
    </Grow>
  );

  const footerByMode: Record<CompareCardProps['mode'], React.ReactNode> = {
    base: baseFooter,
    compare: compareFooter,
  };

  return (
    <Grow className="w-full gap-[2rem]!">
      <RecommendCard
        variant={'free'}
        className={`w-[31.2rem] ${isCompare ? '[&>div]:bg-[#006FF2]!' : undefined}`}
        footer={footerByMode[mode]}
      >
        {isCompare ? (
          <Grow className="w-full" placement="bwe">
            <Checkbox
              color="primary"
              errorMsg="선택은 필수입니다."
              errorPs="bl"
              onCheckedChange={() => {}}
              size="lg"
              variant="noneText"
            >
              선택
            </Checkbox>
            <Button variant="outlined" size="sm" color="gray-light" onClick={() => {}}>
              변경
            </Button>
          </Grow>
        ) : (
          <Grow
            className="w-full h-[4rem] rounded-t-[0.8rem] bg-[#FF5C2E] absolute top-0 left-0 px-[1.6rem]"
            placement="sc"
          >
            <FixingPinIcon />
            <Typo tag={'p'} variant={'body-md'} weight={'bold'} className="text-white">
              기준설계
            </Typo>
          </Grow>
        )}

        <div className="w-full">
          {isCompare ? (
            <Grow className="w-full" placement="sc" gap={1}>
              <Typo tag={'p'} variant={'body-sm'} weight={'bold'} className="text-[#006FF2]">
                {compareLabel}
              </Typo>
              <Grow
                className={`rounded-full px-[0.6rem] py-[0.2rem] ${statusText === '조건인수가능' ? 'bg-[#FEF4D4]' : 'bg-[#E0EFFF]'}`}
                placement="sc"
                gap={1}
              >
                <CircleCheckIcon color={statusText === '조건인수가능' ? '#FFB800' : '#006FF2'} />
                <Typo
                  tag={'span'}
                  variant={'body-xs'}
                  weight={'bold'}
                  className={statusText === '조건인수가능' ? 'text-[#FF8D02]' : 'text-[#006FF2]'}
                >
                  {statusText}
                </Typo>
              </Grow>
            </Grow>
          ) : null}

          <Typo
            tag={'strong'}
            variant={'body-xl'}
            className={`${isCompare ? 'mt-[0.4rem]' : 'mt-[3.6rem]'} block text-[#000]`}
          >
            한화 시그니처 여성 건강보험4.0 2504
          </Typo>
        </div>

        {isCompare ? (
          <Gcol className="w-full rounded-[0.8rem] border border-[#CBE3FF] bg-[#EFF8FF] p-[1.2rem] gap-[0.4rem]">
            <NativeSelect
              aria-label="납입면제 설정 선택"
              size="sm"
              value={compareForm.planType}
              onChange={(e) => setCompareField('planType', e.target.value)}
            >
              {planTypeOptions.map((option) => (
                <NativeSelectOption key={option.id} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>

            <NativeSelect
              aria-label="심사플랜 선택"
              size="sm"
              value={compareForm.underwritingPlan}
              onChange={(e) => setCompareField('underwritingPlan', e.target.value)}
            >
              {underwritingPlanOptions.map((option) => (
                <NativeSelectOption key={option.id} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>

            <Grow className="w-full flex gap-[0.4rem]!" placement="ss">
              <NativeSelect
                className="w-full"
                aria-label="납입기간 선택"
                size="sm"
                value={compareForm.paymentTerm}
                onChange={(e) => setCompareField('paymentTerm', e.target.value)}
              >
                {paymentTermOptions.map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>

              <NativeSelect
                className="w-full"
                aria-label="만기 선택"
                size="sm"
                value={compareForm.maturityTerm}
                onChange={(e) => setCompareField('maturityTerm', e.target.value)}
              >
                {maturityTermOptions.map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>

              <NativeSelect
                className="w-full"
                aria-label="갱신주기 선택"
                size="sm"
                value={compareForm.renewalTerm}
                onChange={(e) => setCompareField('renewalTerm', e.target.value)}
              >
                {renewalTermOptions.map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Grow>

            <NativeSelect
              aria-label="고지형태 선택"
              size="sm"
              value={compareForm.noticeType}
              onChange={(e) => setCompareField('noticeType', e.target.value)}
            >
              {noticeTypeOptions.map((option) => (
                <NativeSelectOption key={option.id} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Gcol>
        ) : (
          <Gcol
            className="w-full min-h-[15.6rem] rounded-[0.8rem] border border-[#FFCCBE] bg-[#FFF7F4] p-[1.2rem] gap-[0.8rem]"
            placement="cs"
          >
            <Typo tag={'p'} variant={'body-md'} className="flex items-start gap-1">
              <ShieldIcon className="w-[1.3rem] ml-[0.2rem] mt-[0.3rem]" />
              납입면제 강화형, 납입후 50% 해약환급금지급형
            </Typo>
            <Typo tag={'p'} variant={'body-md'} className="flex items-center gap-1">
              <NoteIcon size={16} color="#4B5563" className="-ml-px" />
              비대면진단심사플랜(20~40세)
            </Typo>
            <Typo tag={'p'} variant={'body-md'} className="flex items-center gap-1">
              <CalendarIcon size={14} color="#4B5563" /> 20년납 · 100세만기 · 갱신 20년
            </Typo>
            <Typo tag={'p'} variant={'body-md'} className="flex items-center gap-1">
              <BadgeCheckIcon size={14} color="#4B5563" /> 1형(일반 고지 형)
            </Typo>
          </Gcol>
        )}

        <div
          ref={scrollDivRef}
          className="ag-theme-alpine no-header w-full min-h-132 mt-[1.2rem] max-h-132 overflow-y-auto relative [&_.ag-header]:!hidden [&_.ag-header-viewport]:!hidden [&_.ag-header-row]:!h-0 [&_.ag-header]:!min-h-0"
        >
          <div className="sticky top-0 z-10 flex h-[3rem] w-full border-b border-[#D9E2EC] bg-[var(--color-gray-5)] border-t-[0.2rem] border-t-[#000]">
            {comparisonColumnDefs.map((column, index) => {
              const key = column.field ?? column.headerName ?? `column-${index}`;

              return (
                <div
                  key={key}
                  className={`flex h-full items-center border-r border-[#D9E2EC] px-0 justify-center last:border-r-0`}
                  style={getComparisonHeaderCellStyle(column)}
                >
                  <Typo tag={'span'} variant={'body-md'} weight={'bold'} className="text-[#344054]">
                    {column.headerName}
                  </Typo>
                </div>
              );
            })}
          </div>
          <AgGridReact<ComparisonRow>
            getRowId={(params) => String(params.data.id)}
            noRowsOverlayComponent={AgGridEmptyComponent}
            rowData={comparisonRows}
            columnDefs={comparisonColumnDefs}
            headerHeight={0}
            groupHeaderHeight={0}
            defaultColDef={{
              suppressMovable: true,
              sortable: false,
              resizable: false,
            }}
            domLayout="autoHeight"
          />
        </div>
      </RecommendCard>
      {/* 여기 부분에 들어가게 */}
    </Grow>
  );
}

export const Ltpz013 = ({ open, onOpenChange }: PopupBaseProps) => {
  return (
    <TableScrollSyncProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent showCloseButton resizable={true} size="2xl">
          <DialogHeader>
            <DialogTitle>
              <Typo tag={'strong'} variant={'heading-lg'}>
                상품비교설계
              </Typo>
              <Typo tag={'p'} variant={'body-xl'}>
                (LTPZ013)
              </Typo>
            </DialogTitle>
          </DialogHeader>

          <DialogSection>
            <div className="h-full overflow-x-auto overflow-y-hidden pb-2">
              <Grow className="relative h-full min-w-max items-start" gap={6} placement="ss">
                <CompareDesignCard mode="base" total={cardTotals.base} />
                <CompareDesignCard
                  mode="compare"
                  compareLabel="비교설계1"
                  statusText="인수가능"
                  total={cardTotals.compare1}
                />
                <CompareDesignCard
                  mode="compare"
                  compareLabel="비교설계2"
                  statusText="인수가능"
                  total={cardTotals.compare2}
                />
                <CompareDesignCard
                  mode="compare"
                  compareLabel="비교설계3"
                  statusText="조건인수가능"
                  total={cardTotals.compare3}
                />
              </Grow>
            </div>
          </DialogSection>

          <DialogFooter>
            <DialogFooterArea>
              <Grow>
                <Button variant={'contained'} size={'xl'}>
                  설계생성
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
    </TableScrollSyncProvider>
  );
};
