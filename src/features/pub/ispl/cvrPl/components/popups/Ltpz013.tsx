/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { CalendarIcon2, CheckboxIcon, CircleCheckIcon, FixingPinIcon, NoteIcon, ShieldIcon } from '@icons';
import { Badge } from '@uiux/Badge';
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
import type { BodyScrollEvent, ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

type OptionType = { 옵션1: string } | { 옵션2: string } | { 옵션3: string[] } | { 옵션4: string };

type InfoDataType = {
  id: number;
  담보명: string;
  가능: string;
  옵션: OptionType[];
};
const InfoData: InfoDataType = {
  id: 1,
  담보명: '한화 시그니처 여성 건강보험4.0 2504',
  가능: '인수가능',
  옵션: [
    { 옵션1: '납입면제 강화형, 납입후 50% 해약환급금지급형 해약환급금지급형' },
    { 옵션2: '비대면진단심사플랜(20~40세)' },
    { 옵션3: ['20년납', '100세만기', '갱신 20년'] },
    { 옵션4: '1형(일반 고지 형)' },
  ],
};
type SelectOptionType = {
  value: string;
  label: string;
}[];
const selectOption1: SelectOptionType = [
  { value: '옵션1', label: '납입면제 강화형, 납입후 50% 해약환급금지급형 해약환급금지급형' },
  { value: '옵션2', label: '2납입면제 강화형, 납입후 50% 해약환급금지급형 해약환급금지급형' },
];
const selectOption2: SelectOptionType = [
  { value: '옵션1', label: '비대면진단심사플랜(20~40세)' },
  { value: '옵션2', label: '2비대면진단심사플랜(20~40세)' },
];
const selectOption3: SelectOptionType = [
  { value: '옵션1', label: '20년납' },
  { value: '옵션2', label: '30년납' },
];
const selectOption4: SelectOptionType = [
  { value: '옵션1', label: '100세만기' },
  { value: '옵션2', label: '200세만기' },
];
const selectOption5: SelectOptionType = [
  { value: '옵션1', label: '갱신 20년' },
  { value: '옵션2', label: '갱신 30년' },
];
const selectOption6: SelectOptionType = [
  { value: '옵션1', label: '1형(일반고지형)' },
  { value: '옵션2', label: '2형(갱신형)' },
];

type DummyDataType = {
  id: number;
  field1: string;
  field2: number;
  field3: number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field1: '보통약관(상해80%이상후유장해)',
    field2: 13000,
    field3: 3000,
  },
  { id: 2, field1: '보험료납입면제대상보장(5대유사)', field2: 10, field3: 10 },
  { id: 3, field1: '상해사망(간편)', field2: 15000, field3: 15000 },
  { id: 4, field1: '상해후유장해(3-100%)', field2: 10000, field3: 10000 },
  { id: 5, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 6, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 7, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 8, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 9, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 10, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 11, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 12, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 13, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 14, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 15, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
  { id: 16, field1: '질병사망(간편)', field2: 10000, field3: 10000 },
];

function CardBox({
  children,
  bottom,
  color,
  className,
}: {
  children: React.ReactNode;
  bottom: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <Grid
      placement="ss"
      data-recommend-item="true"
      className={`group gap-0 rounded-[1rem] after:content-[''] after:rounded-[1rem] after:absolute after:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] after:w-full after:h-full after:pointer-events-none after:top-0 after:left-0 shadow-[0_0.2rem_0.2rem_0_rgba(0,0,0,0.1)] overflow-hidden relative w-auto min-w-[31.2rem] grid-rows-[1fr_auto] ${className || ''}`}
      style={{
        background: color
          ? `linear-gradient(to bottom, white, ${color})`
          : `linear-gradient(to bottom, white, var(--color-secondary-40))`,
      }}
    >
      <Grid
        className="bg-[#fff] group-[.card-selected]:bg-[linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%)] group-[.card-selected]:[background-repeat:no-repeat] group-[.card-selected]:[background-position:right_top,left_top] rounded-b-[1rem] p-[1rem] gap-2 w-full p-0 shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.1)] group-[.card-selected]:text-white gap-0 grid-rows-[1fr_auto]"
        placement="ss"
      >
        {children}
      </Grid>
      <Grow placement="bwc" className="px-[1.6rem] h-[4rem] text-white">
        <b>보험료(환급률)</b>
        {bottom}
      </Grow>
    </Grid>
  );
}

const Ltpz013 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  // AG Grid 내부 스크롤(Body viewport) 동기화
  const gridContainerRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const isSyncingBodyScroll = React.useRef(false);

  const setGridBodyScrollTop = React.useCallback((container: HTMLDivElement, top: number) => {
    const viewport = container.querySelector('.ag-body-viewport');

    if (!(viewport instanceof HTMLDivElement)) {
      return;
    }

    if (Math.abs(viewport.scrollTop - top) > 1) {
      viewport.scrollTop = top;
    }
  }, []);

  const handleGridBodyScroll = React.useCallback(
    (sourceIndex: number, event: BodyScrollEvent<DummyDataType>) => {
      if (isSyncingBodyScroll.current || event.direction !== 'vertical') {
        return;
      }

      isSyncingBodyScroll.current = true;

      gridContainerRefs.current.forEach((container, index) => {
        if (!container || index === sourceIndex) {
          return;
        }

        setGridBodyScrollTop(container, event.top);
      });

      requestAnimationFrame(() => {
        isSyncingBodyScroll.current = false;
      });
    },
    [setGridBodyScrollTop]
  );

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 10,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field1' }),
      colSpan: (params) => {
        // 합계 행이면 이름+서브레이블 합치기
        if (params.data?.id === 0) return 2;
        return 1;
      },
    },
    {
      headerName: '가입금액(만원)',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      valueFormatter: numberValueFormatter,
      colSpan: (params) => {
        // 합계 행이면 숨김
        if (params.data?.id === 0) return 0;
        return 1;
      },
      cellClass: (params) => {
        if (params.data?.id === 0) return 'hidden';
        return 'text-right';
      },
    },
    {
      headerName: '보험료(원)',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(65),
      valueFormatter: numberValueFormatter,
      cellClass: (params) => {
        if (params.data?.id === 0) return 'text-right font-bold bg-gray-100';
        return 'text-right';
      },
      editable: false,
    },
  ];

  return (
    <Dialog open>
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
          <Grid className="w-full h-full grid-cols-[auto_1fr] gap-3">
            {/* 기준설계 */}
            <Grid className="h-full pb-[1.8rem] grid-rows-[1fr] max-w-[31.2rem]">
              <CardBox
                bottom={
                  <div>
                    <b>70,000</b>원(39.4%)
                  </div>
                }
              >
                <Grid className="grid-rows-[auto_1fr]">
                  <Grow className="bg-[var(--color-primary-50)] text-white w-full h-[3.8rem] items-center justify-start p-[1.6rem] font-[700]">
                    <FixingPinIcon className="" />
                    기준설계
                  </Grow>
                  <Grid className="p-[1.6rem] gap-5 grid-rows-[auto_1fr]" placement="ss">
                    <Gcol className="gap-2" placement="ss">
                      <Gcol placement="ss">
                        <Typo tag="h3" variant={'body-xl'} weight={'bold'} className="">
                          {InfoData.담보명}
                        </Typo>
                      </Gcol>
                      <Gcol
                        variant="box-warning"
                        placement="ss"
                        className="border border-[var(--color-primary-15)] gap-1 min-h-[14.4rem]"
                      >
                        {InfoData.옵션.map((option, index) => {
                          const optionKey = `옵션${index + 1}` as keyof typeof option;
                          return (
                            <Grow key={index} placement="ss" className="text-[1.3rem]">
                              {index === 0 && (
                                <ShieldIcon
                                  color={'var(--color-blue-gray-60)'}
                                  className="translate-y-[0.2rem] shrink-0"
                                  size={16}
                                />
                              )}
                              {index === 1 && (
                                <NoteIcon
                                  color={'var(--color-blue-gray-60)'}
                                  className="translate-y-[0.2rem] shrink-0"
                                  size={16}
                                />
                              )}
                              {index === 2 && (
                                <CalendarIcon2
                                  color={'var(--color-blue-gray-60)'}
                                  className="translate-y-[0.2rem] shrink-0"
                                  size={16}
                                />
                              )}
                              {index === 3 && (
                                <CheckboxIcon
                                  color={'var(--color-blue-gray-60)'}
                                  className="translate-y-[0.2rem] shrink-0"
                                  size={16}
                                />
                              )}
                              {option[optionKey as keyof typeof option]}
                            </Grow>
                          );
                        })}
                      </Gcol>
                    </Gcol>
                    <div
                      className="ag-theme-alpine w-full min-h-[20.8rem] "
                      ref={(el) => {
                        gridContainerRefs.current[0] = el;
                      }}
                    >
                      <AgGridReact<DummyDataType>
                        // 합계 행 설정
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={{
                          suppressMovable: true,
                          sortable: false,
                          resizable: true,
                        }}
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                        onBodyScroll={(event) => {
                          handleGridBodyScroll(0, event);
                        }}
                        animateRows={false}
                      />
                    </div>
                  </Grid>
                </Grid>
              </CardBox>
            </Grid>

            <Grow placement="ss" className="overflow-y-hidden overflow-x-auto w-full flex-row pr-[1.6rem]" gap={3}>
              {[...Array(3)].map((_, i) => (
                <CardBox
                  color="var(--color-information-50)"
                  bottom={
                    <div>
                      <b>70,000</b>원(39.4%)
                    </div>
                  }
                  key={i}
                >
                  <Gcol className="p-[1.6rem] gap-5" placement="ss">
                    <Gcol className="gap-2" placement="ss">
                      <Grow placement="bwc" className="w-full">
                        <Checkbox aria-label="선택"></Checkbox>
                        <Button variant={'outlined'} color={'gray'} size={'sm'}>
                          변경
                        </Button>
                      </Grow>
                      <Gcol placement="ss">
                        <Typo
                          tag="div"
                          variant={'body-sm'}
                          weight={'bold'}
                          color={'information'}
                          className="flex gap-1 items-center"
                        >
                          비교설계{i + 1}
                          <Badge color="blue" className="h-[2.2rem] rounded-full text-[1.1rem] leading-[1] px-[0.6rem]">
                            <CircleCheckIcon size={12} color="var(--color-information-50)" />
                            인수가능
                          </Badge>
                        </Typo>
                        <Typo tag="h3" variant={'body-xl'} weight={'bold'}>
                          {InfoData.담보명}
                        </Typo>
                      </Gcol>
                      <Gcol variant="box-info" placement="ss" className="border border-[var(--color-information-15)]">
                        <NativeSelect size="md" readOnly>
                          {selectOption1.map((option, index) => {
                            return (
                              <NativeSelectOption key={index} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            );
                          })}
                        </NativeSelect>
                        <NativeSelect size="md" readOnly>
                          {selectOption2.map((option, index) => {
                            return (
                              <NativeSelectOption key={index} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            );
                          })}
                        </NativeSelect>
                        <Grow>
                          <NativeSelect size="md">
                            {selectOption3.map((option, index) => {
                              return (
                                <NativeSelectOption key={index} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              );
                            })}
                          </NativeSelect>
                          <NativeSelect size="md">
                            {selectOption4.map((option, index) => {
                              return (
                                <NativeSelectOption key={index} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              );
                            })}
                          </NativeSelect>
                          <NativeSelect size="md" readOnly>
                            {selectOption5.map((option, index) => {
                              return (
                                <NativeSelectOption key={index} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              );
                            })}
                          </NativeSelect>
                        </Grow>
                        <NativeSelect size="md" readOnly>
                          {selectOption6.map((option, index) => {
                            return (
                              <NativeSelectOption key={index} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            );
                          })}
                        </NativeSelect>
                      </Gcol>
                    </Gcol>
                    <div
                      className="ag-theme-alpine w-full min-h-[20.8rem] "
                      ref={(el) => {
                        gridContainerRefs.current[i + 1] = el;
                      }}
                    >
                      <AgGridReact<DummyDataType>
                        // 합계 행 설정
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={{
                          suppressMovable: true,
                          sortable: true,
                          resizable: true,
                        }}
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                        onBodyScroll={(event) => {
                          handleGridBodyScroll(i + 1, event);
                        }}
                        animateRows={false}
                      />
                    </div>
                  </Gcol>
                </CardBox>
              ))}
            </Grow>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                설계생성(0)
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

export default Ltpz013;
