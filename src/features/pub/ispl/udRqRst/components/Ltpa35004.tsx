'use client';

import { Grow, Gcol, Grid, Typo } from '@atoms';
import { BulletItem, BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { LayoutScrollItem, LayoutScrollWrap } from '@common/LayoutScroll';
import { TabPager } from '@common/TabPager';

import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { LayoutMain, LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350MainBody } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Textarea } from '@uiux/Textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { useMemo, useState, useRef, useEffect } from 'react';
import { createTooltipValueGetter } from '@/shared/components/agGridUtils/AgGridUtils';
import { CircleCheckStepIcon, ArrowIcon, TimeRecordIcon } from '@/shared/components/icons';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';
import { useTabs } from '@/shared/hooks/useTabs';

import '@/shared/lib/agGridPub';

ModuleRegistry.registerModules([AllCommunityModule]);

interface TabDataType {
  id: string | number;
  name?: string;
  age?: string | number;
  gender?: string;
  value: string;
  error?: boolean;
  info: string[];
}
const TabData: TabDataType[] = [
  {
    id: 1,
    name: '홍길동',
    age: '1',
    gender: '여',
    value: 'tab1',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
  },
  {
    id: 2,
    name: '목적물',
    age: '1',
    gender: '',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 3,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 4,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 5,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 6,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 7,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 8,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 9,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 10,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 11,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 12,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 13,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 14,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 15,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 16,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 17,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 18,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 19,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 20,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 21,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
];

// 첫번째 agGrid
type AgGridRow = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
};
const DummyData: AgGridRow[] = [
  {
    id: 1,
    field01: '1',
    field02: '특인대상',
    field03: '담보 가입한도 조정대상: 척추염좌',
  },
  {
    id: 2,
    field01: '2',
    field02: '참고사항',
    field03: '5년이내 치료내용이 확인 되었습니다.(담당: 장기 U/W파트)',
  },
  {
    id: 3,
    field01: '3',
    field02: '인수기준',
    field03: '[후유합계(80%)(2107)[전체누적][인수한도: 3000만]]',
  },
  {
    id: 4,
    field01: '4',
    field02: '인수기준',
    field03: '100',
  },
  {
    id: 5,
    field01: '5',
    field02: '인수기준',
    field03:
      '[후유합계(80%)(2107)[전체누적][인수한도: 3000만]][후유합계(80%)(2107)[전체누적][인수한도: 3000만]][후유합계(80%)(2107)[전체누적][인수한도: 3000만]]',
  },
  {
    id: 6,
    field01: '6',
    field02: '인수기준',
    field03: '100',
  },
];

// 두번째 agGrid
type AgGridRow2 = {
  id: number;
  field01: string;
};
const DummyData2: AgGridRow2[] = [
  {
    id: 1,
    field01:
      '보통약관(상해80%이상후유장해)(간편) 보통약관(상해80%이상후유장해)(간편) 보통약관(상해80%이상후유장해)(간편) 보통약관(상해80%이상후유장해)(간편) 보통약관(상해80%이상후유장해)(간편) 보통약관(상해80%이상후유장해)(간편) 보통약관(상해80%이상후유장해)(간편)',
  },
  {
    id: 2,
    field01: '보험료납입면제대상보장(5대유사)(간편)',
  },
  {
    id: 3,
    field01: '상해사망(간편)',
  },
  {
    id: 4,
    field01: '상해후유장해(3-100%)',
  },
  {
    id: 5,
    field01: '질병사항(간편)',
  },
  {
    id: 6,
    field01: '질병사항(간편)',
  },
];

export function Ltpa35004() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // 버튼으로 이동 중인지 여부 (smooth 스크롤 중 handleScroll 간섭 방지)
  const isScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 내부 콘텐츠(자식) 높이 기준으로 totalPages 계산
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const calcPages = () => {
      const totalPageCount = Math.max(1, Math.ceil(el.scrollHeight / el.clientHeight));
      setTotalPages(totalPageCount);
    };

    const inner = el.firstElementChild;
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(calcPages);
    });

    if (inner) observer.observe(inner);
    observer.observe(el);
    requestAnimationFrame(() => requestAnimationFrame(calcPages));

    return () => observer.disconnect();
  }, []);

  // 스크롤 위치 → 현재 페이지 계산
  const calcCurrentPage = (el: HTMLDivElement) => {
    const pageSize = el.clientHeight;
    const totalPageCount = Math.max(1, Math.ceil(el.scrollHeight / pageSize));
    const isAtEnd = el.scrollTop + pageSize >= el.scrollHeight - 2;
    const currentPage = isAtEnd ? totalPageCount : Math.min(totalPageCount, Math.floor(el.scrollTop / pageSize) + 1);
    return { currentPage, totalPageCount };
  };

  // 수동 스크롤 시 페이지 계산 (버튼 이동 중에는 무시)
  const handleScroll = () => {
    if (isScrollingRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const { currentPage, totalPageCount } = calcCurrentPage(el);
    setTotalPages(totalPageCount);
    setPage(currentPage);
  };

  // 버튼 클릭: 즉시 page 반영 + smooth 스크롤, 스크롤 끝나면 lock 해제
  const scrollToPage = (nextPage: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const pageSize = el.clientHeight;
    const totalPageCount = Math.max(1, Math.ceil(el.scrollHeight / pageSize));
    const safePage = Math.max(1, Math.min(nextPage, totalPageCount));

    // 즉시 state 반영
    setPage(safePage);
    setTotalPages(totalPageCount);

    // smooth 스크롤 중 handleScroll 차단
    isScrollingRef.current = true;
    el.scrollTo({ top: pageSize * (safePage - 1), behavior: 'smooth' });

    // scrollend 이벤트가 없는 환경 대비: 150ms 후 lock 해제
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  };

  // 1) INLINED STATE (default)
  const [isHeightExpanded] = useState(false);
  const [gridKey] = useState(0);
  const [gridKey2] = useState(0);

  // 2) Tabs/rowData 분기
  const tabListData = TabData;
  const stringifiedTabs: TabDataType[] = tabListData.map((item) => ({
    ...item,
    value: String(item.id),
  }));
  const { tabs: Tabs, active: TabActive, setActive: TabSetActive } = useTabs<TabDataType>(stringifiedTabs);

  // 3) Grid data
  const [rowData] = useState<AgGridRow[]>(DummyData);
  const [rowData2] = useState<AgGridRow2[]>(DummyData2);

  // 첫번째 agGrid 컬럼
  const columnDefs = useMemo<ColDef<AgGridRow>[]>(
    () => [
      {
        headerName: '순번',
        field: 'id',
        width: 60,
        cellClass: 'text-center',
        autoHeight: true,
      },
      {
        headerName: '심사구분',
        field: 'field02',
        flex: 1,
        autoHeight: true,
        cellClass: 'editable-cell text-center',
        cellStyle: (params) => (params.value === '인수기준' ? { color: 'var(--color-danger-50)' } : undefined),
      },
      {
        headerName: '세부내용',
        field: 'field03',
        flex: 1,
        autoHeight: true,
        cellClass: 'editable-cell text-left',
        tooltipValueGetter: createTooltipValueGetter<AgGridRow>({ field: 'field03' }),
      },
    ],
    []
  );

  // 두번째 agGrid 컬럼
  const columnDefs2 = useMemo<ColDef<AgGridRow2>[]>(
    () => [
      {
        headerName: '담보명',
        field: 'field01',
        flex: 1,
        cellClass: 'editable-cell text-left',
        autoHeight: true,
        tooltipValueGetter: createTooltipValueGetter<AgGridRow2>({ field: 'field01' }),
      },
    ],
    []
  );

  const [testError, setTestError] = useState(false);

  return (
    <LayoutTemplateLTPA350MainBody
      mainBody={
        <form
          id="page2-MainForm"
          className="w-full h-full"
          onSubmit={(event) => {
            event.preventDefault();
            setTestError(!testError);
          }}
          noValidate
        >
          <LayoutMain className="grid grid-rows-[auto_1fr_auto] gap-[1rem] h-full">
            <TabPager
              data={Tabs}
              active={TabActive}
              setActive={TabSetActive}
              visibleCount={5}
              error={testError}
              errorMsg="입력하세요."
              getValue={(tab) => String(tab.id)}
              renderTab={(tab) => (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex items-center">
                      <span className="max-w-20 truncate block">{tab.name}</span>
                      <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={8}>
                    <BulletList className="gap-[0.5rem]">
                      {tab.info.map((info: string, index: number) => (
                        <BulletListItem key={index} type="dot">
                          {info}
                        </BulletListItem>
                      ))}
                    </BulletList>
                  </TooltipContent>
                </Tooltip>
              )}
              renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => (
                <Button
                  variant={'none'}
                  key={String(tab.id)}
                  onClick={() => {
                    setActive(String(tab.id));
                    const idx = data.findIndex((t) => String(t.id) === String(tab.id));
                    if (idx !== -1) {
                      const page = Math.floor(idx / visibleCount);
                      setVisibleStart(page * visibleCount);
                    }
                  }}
                >
                  <span className="flex items-start gap-2 w-full">
                    <span className="block">{tab.name}</span>
                    <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                  </span>
                </Button>
              )}
            >
              <Gcol variant={'box-round-b'} placement={'ss'} className={`w-full ${!isHeightExpanded ? '' : 'hidden'}`}>
                <FormTable
                  caption="취급자 정보"
                  variant={'head'}
                  cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}
                  className="w-full"
                >
                  <FormRow className="w-full">
                    <FormCell title={'동시설계'} tdStyle={{ flex: 1 }} tdClassName="w-full justify-between gap-4">
                      <RadioGroup
                        className="gap-2"
                        errorMsg="하나를 선택해주세요."
                        errorPs="bl"
                        onValueChange={() => {}}
                      >
                        <RadioGroupItem color="primary" id="radio1" size="md" value="LA260112297637" variant="button">
                          LA260112297637
                        </RadioGroupItem>
                        <RadioGroupItem color="primary" id="radio2" size="md" value="LA260112297660" variant="button">
                          LA260112297660
                        </RadioGroupItem>
                      </RadioGroup>
                      <Grow className="flex items-center gap-1">
                        <Button variant={'outlined'} color={'gray'} size={'md'}>
                          보장패키지
                        </Button>
                        <Button variant={'outlined'} color={'gray'} size={'md'}>
                          적부결과
                        </Button>
                        <Button variant={'outlined'} color={'gray'} size={'md'}>
                          누적위험
                        </Button>
                        <Button variant={'outlined'} color={'gray'} size={'md'}>
                          위험체크리스트
                        </Button>
                        <Button variant={'outlined'} color={'gray'} size={'md'}>
                          공장업종확인
                        </Button>
                        <Button variant={'outlined'} color={'gray'} size={'md'}>
                          재물실사보고서
                        </Button>
                      </Grow>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'심사구분'} className="w-full">
                      <Input aria-label="신계약" width={70} value={'신계약'} size={'md'} readOnly />
                      <NativeSelect aria-label="설계심사" width={140} size={'md'} readOnly={false} required={false}>
                        {[{ label: '설계심사', value: 'planA' }].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <Input aria-label="심사요청불가" width={110} size={'md'} value={'심사요청불가'} readOnly />
                      <Input aria-label="" width={80} size={'md'} value={''} readOnly />
                      <Checkbox>사후적부 대체</Checkbox>
                    </FormCell>
                    <FormCell title={'심사처리자'} className="w-full">
                      <Input aria-label="" width={70} value={''} size={'md'} readOnly />
                      <Input aria-label="" width={70} value={''} size={'md'} readOnly />
                      <Input aria-label="" width={70} value={''} size={'md'} readOnly />
                    </FormCell>
                    <FormCell title={'심사상태'} className="w-full">
                      <Input aria-label="" width={70} value={''} size={'md'} readOnly />
                      <Checkbox>심사자배정</Checkbox>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </Gcol>
            </TabPager>

            <LayoutMainBody className="h-full overflow-hidden">
              <LayoutScrollWrap>
                <LayoutScrollItem>
                  <Grow placement="ss" className="w-full h-full overflow-x-hidden" gap={6}>
                    <Gcol className="w-[calc(100%-30.7rem)] h-full">
                      <Gcol className="w-full h-full grid-rows-[auto_1fr]">
                        <Grow placement={'bwc'} className="gap-1 w-full pb-1">
                          <Grow className="gap-1.5">
                            <Typo variant="heading-md">지침세부내용</Typo>
                          </Grow>
                          <Grow className="gap-2.5">
                            <Button variant={'outlined'} color={'gray'} size={'md'}>
                              지침확인
                            </Button>
                          </Grow>
                        </Grow>
                        <div className="ag-theme-alpine min-h-[18.4rem]">
                          <AgGridReact<AgGridRow>
                            key={gridKey}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            getRowId={(params) => String(params.data.id)}
                            singleClickEdit={true}
                            rowSelection={{
                              mode: 'multiRow' as const,
                              checkboxes: false,
                              headerCheckbox: false,
                              enableClickSelection: false,
                              enableSelectionWithoutKeys: true,
                            }}
                            suppressRowHoverHighlight={false}
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                            domLayout="normal"
                          />
                        </div>
                      </Gcol>
                      <Gcol className="grid-rows-[auto_1fr] flex-1 h-full">
                        <Grow placement={'bwc'} className="gap-1 w-full pb-1">
                          <Grow className="gap-1.5">
                            <Typo variant="heading-md">조건부 특약 가입</Typo>
                          </Grow>
                          <Grow className="gap-1">
                            <Button variant={'outlined'} color={'gray'} size={'md'}>
                              상세
                            </Button>
                            <Button variant={'outlined'} color={'gray'} size={'md'}>
                              무담보이력
                            </Button>
                          </Grow>
                        </Grow>
                        <div className="ag-theme-alpine min-h-[18.4rem] w-full">
                          <AgGridReact<AgGridRow2>
                            rowData={rowData2}
                            columnDefs={columnDefs2}
                            getRowId={(params) => String(params.data.id)}
                            singleClickEdit={true}
                            rowSelection={{
                              mode: 'multiRow' as const,
                              checkboxes: true,
                              headerCheckbox: true,
                              enableClickSelection: false,
                              enableSelectionWithoutKeys: true,
                            }}
                            selectionColumnDef={{
                              width: 60,
                              cellClass: 'text-center p-0!',
                              cellClassRules: {
                                'pointer-events-none': (params) => !!params.data?.locked,
                              },
                            }}
                            suppressRowHoverHighlight={false}
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                      </Gcol>
                    </Gcol>
                    <Gcol className="w-[30.7rem] min-w-[30.7rem] h-full gap-0">
                      <Grow
                        className="w-full h-[4.1rem] px-2.5 py-5 bg-[var(--color-secondary-50)] rounded-t-lg"
                        placement="bwc"
                        variant="default"
                      >
                        <strong className="text-[1.4rem] text-white">심사결과안내</strong>
                        <Button
                          variant={'outlined'}
                          color={'secondary'}
                          size={'md'}
                          className="border-[var(--color-secondary-50)] text-black"
                        >
                          이력상세
                        </Button>
                      </Grow>
                      <div
                        ref={scrollRef}
                        className="flex flex-col relative w-full tracking-[-0.13rem] w-full h-[41.9rem] border-l border-r border-[var(--color-gray-20)] overflow-y-scroll items-end justify-between gap-0"
                        onScroll={handleScroll}
                      >
                        <Gcol className="py-2 gap-4">
                          {/* 심부산 */}
                          <Gcol className="px-3 gap-2">
                            <Typo tag="strong" variant={'body-sm'} weight="bold" className="w-full flex justify-end">
                              심부산GA지점 박하늘별(6012345)
                            </Typo>
                            <Gcol
                              className="w-[21rem] ml-auto rounded-lg bg-[var(--color-blue-gray-10)] py-2 px-3 align-start justify-start text-left"
                              gap="2"
                            >
                              <Gcol placement="ss">
                                <Typo variant="body-xs" className="justify-start text-[1.1rem]" weight="bold">
                                  심사의뢰
                                </Typo>
                                <BulletItem
                                  before="ⓐ"
                                  className="whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-50)]"
                                  color="default"
                                  onClick={() => {}}
                                  size="md"
                                  type="dash"
                                >
                                  고지보완 중 당뇨는 정상수치로 돌아와 이상없습니다
                                </BulletItem>
                              </Gcol>
                              <Typo
                                variant="body-xs"
                                className="w-full flex justify-start items-center text-[var(--color-gray-50)] align-left "
                              >
                                <TimeRecordIcon />
                                2026-02-19 09:32:00
                              </Typo>
                            </Gcol>
                          </Gcol>
                          {/* UW심사팀 */}
                          <Gcol className="px-3 gap-2">
                            <Typo tag="strong" variant={'body-sm'} weight="bold" className="w-full flex justify-start">
                              UW심사팀 이한화(6020236)
                            </Typo>
                            <Gcol className="ml-auto rounded-lg bg-[var(--color-warning-10)] py-2 px-3 align-start justify-start text-left gap-2">
                              <Gcol>
                                <Grow className="w-full justify-between">
                                  <Typo
                                    variant="body-xs"
                                    className="w-full justify-between align-center text-[1.1rem]"
                                    weight="bold"
                                  >
                                    결제완료 / 특별인수조건부인수
                                  </Typo>
                                  <Button
                                    color="primary"
                                    onClick={() => {}}
                                    only="default"
                                    size="sm"
                                    variant="outlined"
                                    className="text-[1.1rem] leading-[2.2rem]"
                                  >
                                    상세보기
                                  </Button>
                                </Grow>
                                <BulletItem
                                  className="whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-70)] leading-[1.7rem]"
                                  color="default"
                                  onClick={() => {}}
                                  size="md"
                                  type="dash"
                                  before={undefined}
                                >
                                  고지유형:1형(일반고지형)
                                </BulletItem>
                                <Gcol placement="ss" className="gap-0.5 pl-2">
                                  <Typo
                                    variant="body-xs"
                                    className="w-full justify-between align-center text-[var(--color-gray-70)] leading-[1.7rem]"
                                  >
                                    ▶조건부인수
                                  </Typo>
                                  <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">
                                    ○부담보심사[갑상선 (11개월) 유방(유선 포함)(11개월)]
                                  </Typo>
                                  <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">
                                    ○표준하체(할증)
                                  </Typo>
                                  <BulletItem
                                    before="ⓐ"
                                    className="whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-70)] leading-[1.7rem]"
                                    color="default"
                                    onClick={() => {}}
                                    size="md"
                                    type="ref"
                                  >
                                    <span className="inline-block align-top leading-[1.7rem]"></span>
                                    계약자에게 보장제한 설정범위 및 사유(피보험자의 과거병력)을 설명해주시기 바랍니다.
                                  </BulletItem>
                                  <Grow className="gap-1 justify-start">
                                    <Grow className="gap-0.5 aligin-center">
                                      <CircleCheckStepIcon />
                                      <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">
                                        감역
                                      </Typo>
                                    </Grow>
                                    <Grow className="gap-0.5">
                                      <CircleCheckStepIcon />
                                      <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">
                                        할증
                                      </Typo>
                                    </Grow>
                                  </Grow>
                                </Gcol>
                              </Gcol>
                              <Typo
                                variant="body-xs"
                                className="w-full flex justify-start items-center text-[var(--color-gray-50)] align-left"
                              >
                                <TimeRecordIcon />
                                2026-02-19 09:32:00
                              </Typo>
                            </Gcol>
                          </Gcol>
                          {/* 심부산 */}
                          <Gcol className="px-3 gap-2">
                            <Typo tag="strong" variant={'body-sm'} weight="bold" className="w-full flex justify-end">
                              심부산GA지점 박하늘별(6012345)
                            </Typo>
                            <Gcol
                              className="w-[21rem] ml-auto rounded-lg bg-[var(--color-blue-gray-10)] py-2 px-3 align-start justify-start text-left"
                              gap="2"
                            >
                              <Gcol placement="ss">
                                <Typo variant="body-xs" className="justify-start text-[1.1rem]" weight="bold">
                                  심사의뢰
                                </Typo>
                                <BulletItem
                                  before="ⓐ"
                                  className="whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-50)]"
                                  color="default"
                                  onClick={() => {}}
                                  size="md"
                                  type="dash"
                                >
                                  고지보완 중 당뇨는 정상수치로 돌아와 이상없습니다
                                </BulletItem>
                              </Gcol>
                              <Typo
                                variant="body-xs"
                                className="w-full flex justify-start items-center text-[var(--color-gray-50)] align-left"
                              >
                                <TimeRecordIcon />
                                2026-02-19 09:32:00
                              </Typo>
                            </Gcol>
                          </Gcol>
                          {/* UW심사팀 */}
                          <Gcol className="px-3 gap-2">
                            <Typo tag="strong" variant={'body-sm'} weight="bold" className="w-full flex justify-start">
                              UW심사팀 이한화(6020236)
                            </Typo>
                            <Gcol className="ml-auto rounded-lg bg-[var(--color-warning-10)] py-2 px-3 align-start justify-start text-left gap-2">
                              <Gcol>
                                <Grow className="w-full justify-between">
                                  <Typo
                                    variant="body-xs"
                                    className="w-full justify-between align-center text-[1.1rem]"
                                    weight="bold"
                                  >
                                    결제완료 / 특별인수조건부인수
                                  </Typo>
                                  <Button
                                    color="primary"
                                    onClick={() => {}}
                                    only="default"
                                    size="sm"
                                    variant="outlined"
                                    className="text-[1.1rem] leading-[2.2rem]"
                                  >
                                    상세보기
                                  </Button>
                                </Grow>
                                <BulletItem
                                  className="whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-70)] leading-[1.7rem]"
                                  color="default"
                                  onClick={() => {}}
                                  size="md"
                                  type="dash"
                                  before={undefined}
                                >
                                  고지유형:1형(일반고지형)
                                </BulletItem>
                                <Gcol placement="ss" className="gap-0.5 pl-2">
                                  <Typo
                                    variant="body-xs"
                                    className="w-full justify-between align-center text-[var(--color-gray-70)] leading-[1.7rem]"
                                  >
                                    ▶조건부인수
                                  </Typo>
                                  <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">
                                    ○부담보심사[갑상선 (11개월) 유방(유선 포함)(11개월)]
                                  </Typo>
                                  <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">
                                    ○표준하체(할증)
                                  </Typo>
                                  <BulletItem
                                    before="ⓐ"
                                    className="whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-70)] leading-[1.7rem]"
                                    color="default"
                                    onClick={() => {}}
                                    size="md"
                                    type="ref"
                                  >
                                    <span className="inline-block align-top leading-[1.7rem]"></span>
                                    계약자에게 보장제한 설정범위 및 사유(피보험자의 과거병력)을 설명해주시기 바랍니다.
                                  </BulletItem>
                                  <Grow className="gap-1 justify-start">
                                    <Grow className="gap-0.5 aligin-center">
                                      <CircleCheckStepIcon />
                                      <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">
                                        감역
                                      </Typo>
                                    </Grow>
                                    <Grow className="gap-0.5">
                                      <CircleCheckStepIcon />
                                      <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">
                                        할증
                                      </Typo>
                                    </Grow>
                                  </Grow>
                                </Gcol>
                              </Gcol>
                              <Typo
                                variant="body-xs"
                                className="w-full flex justify-start items-center  text-[var(--color-gray-50)] align-left"
                              >
                                <TimeRecordIcon />
                                2026-02-19 09:32:00
                              </Typo>
                            </Gcol>
                          </Gcol>
                          {/* 심부산 */}
                          <Gcol className="px-3 gap-2">
                            <Typo tag="strong" variant={'body-sm'} weight="bold" className="w-full flex justify-end">
                              심부산GA지점 박하늘별(6012345)
                            </Typo>
                            <Gcol
                              className="w-[21rem] ml-auto rounded-lg bg-[var(--color-blue-gray-10)] py-2 px-3 align-start justify-start text-left"
                              gap="2"
                            >
                              <Gcol placement="ss">
                                <Typo variant="body-xs" className="justify-start text-[1.1rem]" weight="bold">
                                  심사의뢰
                                </Typo>
                                <BulletItem
                                  before="ⓐ"
                                  className="whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-50)]"
                                  color="default"
                                  onClick={() => {}}
                                  size="md"
                                  type="dash"
                                >
                                  고지보완 중 당뇨는 정상수치로 돌아와 이상없습니다
                                </BulletItem>
                              </Gcol>
                              <Typo
                                variant="body-xs"
                                className="w-full flex justify-start items-center text-[var(--color-gray-50)] align-left"
                              >
                                <TimeRecordIcon />
                                2026-02-19 09:32:00
                              </Typo>
                            </Gcol>
                          </Gcol>
                          {/* UW심사팀 */}
                          <Gcol className="px-3 gap-2">
                            <Typo tag="strong" variant={'body-sm'} weight="bold" className="w-full flex justify-start">
                              UW심사팀 이한화(6020236)
                            </Typo>
                            <Gcol className="ml-auto rounded-lg bg-[var(--color-warning-10)] py-2 px-3 align-start justify-start text-left gap-2">
                              <Gcol>
                                <Grow className="w-full justify-between">
                                  <Typo
                                    variant="body-xs"
                                    className="w-full justify-between align-center text-[1.1rem]"
                                    weight="bold"
                                  >
                                    결제완료 / 특별인수조건부인수
                                  </Typo>
                                  <Button
                                    color="primary"
                                    onClick={() => {}}
                                    only="default"
                                    size="sm"
                                    variant="outlined"
                                    className="text-[1.1rem] leading-[2.2rem]"
                                  >
                                    상세보기
                                  </Button>
                                </Grow>
                                <BulletItem
                                  className="whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-70)] leading-[1.7rem]"
                                  color="default"
                                  onClick={() => {}}
                                  size="md"
                                  type="dash"
                                  before={undefined}
                                >
                                  고지유형:1형(일반고지형)
                                </BulletItem>
                                <Gcol placement="ss" className="gap-0.5 pl-2">
                                  <Typo
                                    variant="body-xs"
                                    className="w-full justify-between align-center text-[var(--color-gray-70)] leading-[1.7rem]"
                                  >
                                    ▶조건부인수
                                  </Typo>
                                  <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">
                                    ○부담보심사[갑상선 (11개월) 유방(유선 포함)(11개월)]
                                  </Typo>
                                  <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">
                                    ○표준하체(할증)
                                  </Typo>
                                  <BulletItem
                                    before="ⓐ"
                                    className="whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-70)] leading-[1.7rem]"
                                    color="default"
                                    onClick={() => {}}
                                    size="md"
                                    type="ref"
                                  >
                                    <span className="inline-block align-top leading-[1.7rem]"></span>
                                    계약자에게 보장제한 설정범위 및 사유(피보험자의 과거병력)을 설명해주시기 바랍니다.
                                  </BulletItem>
                                  <Grow className="gap-1 justify-start">
                                    <Grow className="gap-0.5 aligin-center">
                                      <CircleCheckStepIcon />
                                      <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">
                                        감역
                                      </Typo>
                                    </Grow>
                                    <Grow className="gap-0.5">
                                      <CircleCheckStepIcon />
                                      <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">
                                        할증
                                      </Typo>
                                    </Grow>
                                  </Grow>
                                </Gcol>
                              </Gcol>
                              <Typo
                                variant="body-xs"
                                className="w-full flex justify-start items-center  text-[var(--color-gray-50)] align-left"
                              >
                                <TimeRecordIcon />
                                2026-02-19 09:32:00
                              </Typo>
                            </Gcol>
                          </Gcol>
                        </Gcol>
                      </div>
                      {/* 페이지 버튼 */}
                      <Gcol className="items-end gap-2 absolute bottom-[13.8rem] right-3 z-50">
                        <Button
                          variant="outlined"
                          color="link"
                          only="icon"
                          className="w-[4rem] h-[3.7rem] bg-[#EFF8FF]"
                        >
                          <Typo variant="body-lg">
                            <b>{page}</b>/{totalPages}
                          </Typo>
                        </Button>
                        <Grow>
                          <Button
                            variant="outlined"
                            color="gray"
                            only="icon"
                            size="md"
                            onClick={() => scrollToPage(page - 1)}
                            disabled={page <= 1}
                          >
                            <ArrowIcon className="rotate-90" />
                          </Button>
                          <Button
                            variant="outlined"
                            color="gray"
                            only="icon"
                            size="md"
                            onClick={() => scrollToPage(page + 1)}
                            disabled={page >= totalPages}
                          >
                            <ArrowIcon className="rotate-270" />
                          </Button>
                        </Grow>
                      </Gcol>
                      {/* 요청자 의견 */}
                      <Gcol className="shrink-0 w-full h-[13.2rem] py-2.5 px-3 bg-[var(--color-gray-15)] border-t-1 border-[var(--color-gray-20)]">
                        <Grow placement="bwc">
                          <b className="text-[1.1rem]">요청자 의견</b>
                          <Button>심사요청</Button>
                        </Grow>
                        <Textarea
                          placeholder="계약자에게 보장제한 설정범위 및 사유(피보험자의 과거병력)을 설명해주시기 바랍니다."
                          variant="default"
                          className="w-full text-[1.1rem] !text-[var(--color-gray-50)]"
                          resize={false}
                        />
                      </Gcol>
                    </Gcol>
                  </Grow>
                </LayoutScrollItem>
              </LayoutScrollWrap>
            </LayoutMainBody>

            <LayoutMainFoot>
              <MainBottom variant="box">
                <MainBottomItem>
                  <Grow className="gap-1">
                    <Button variant={'outlined'} color={'gray'} size={'xl'}>
                      이미지스캔
                    </Button>
                    <Button variant={'outlined'} color={'gray'} size={'xl'}>
                      건축물대장조회스캔
                    </Button>
                    <Button variant={'outlined'} color={'gray'} size={'xl'}>
                      사진/서류 알림톡
                    </Button>
                    <Button variant={'outlined'} color={'gray'} size={'xl'}>
                      체크리스트 알림톡
                    </Button>
                    <Button variant={'outlined'} color={'gray'} size={'xl'}>
                      진단/적부이력
                    </Button>
                    <Button variant={'outlined'} color={'gray'} size={'xl'}>
                      외부심사결과지요청$
                    </Button>
                    <Button variant={'outlined'} color={'gray'} size={'xl'}>
                      진단적부예외
                    </Button>
                  </Grow>
                  <Grow className="gap-1">
                    <Button variant={'outlined'} color={'gray'} size={'xl'}>
                      현장소통
                    </Button>
                    <Button variant={'outlined'} color={'gray'} size={'xl'}>
                      조건부수용
                    </Button>
                    <Button variant={'outlined'} color={'gray'} size={'xl'}>
                      긴급심사요청
                    </Button>
                    <Button variant={'outlined'} color={'gray'} size={'xl'}>
                      청약후심사요청
                    </Button>
                  </Grow>
                </MainBottomItem>
              </MainBottom>
            </LayoutMainFoot>
          </LayoutMain>
        </form>
      }
    />
  );
}
