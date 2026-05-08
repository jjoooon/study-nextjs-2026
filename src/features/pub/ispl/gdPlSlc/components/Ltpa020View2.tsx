'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import Image from 'next/image';
import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import useMounted from '@/shared/hooks/useMounted';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { AdderIcon, AdderIcon2, Ai2Icon, SelectDropIcon, PaperIcon, ArrowDoubleIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';

import '@/shared/lib/agGridPub';

type DummyDataListDetailType = {
  id: string;
  field1: string;
  field2: string;
  field3: string;
};
type DummyDataListType = {
  id: number;
  field1: string;
  field2: string[];
  field3: string[];
  field4: string[];
  field5: number;
  ai: string;
  detail: DummyDataListDetailType[];
};
const dummyDataList: DummyDataListType[] = [
  {
    id: 1,
    field1: '1한화 시그니처 여성 간편건강보험 4.0한화 시그니처 여성 간편건',
    field2: ['납입면제형', '기본형', '23N5간편 고지형'],
    field3: ['20년납', '100세만기'],
    field4: ['1형(355간편고지형)(올인원플랜)(1~4형)(15~89세)', '1형(355간편고지형)(올인원플랜)(1~4형)(15~89세)'],
    field5: 15000,
    ai: '고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
    detail: [
      {
        id: 'a1',
        field1: '보통약관(상해사망)',
        field2: '3000',
        field3: '100',
      },
      {
        id: 'a2',
        field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
        field2: '3000',
        field3: '100',
      },
      {
        id: 'a3',
        field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
        field2: '3000',
        field3: '100',
      },
      {
        id: 'a4',
        field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
        field2: '3000',
        field3: '100',
      },
    ],
  },
  {
    id: 2,
    field1:
      '2한화 시그니처 여성 간편건강보험 4.0한화 시그니처 여성 간편건강보험 4.0한화 시그니처 여성 간편건강보험 4.0',
    field2: ['납입면제형', '기본형', '23N5간편 고지형'],
    field3: ['20년납', '100세만기'],
    field4: [
      '1형(355간편고지형)(올인원플랜)(1~4형)(15~89세)1형(355간편고지형)(올인원플랜)(1~4형)(15~89세)1형(355간편고지형)(올인원플랜)(1~4형)(15~89세)',
      '1형(355간편고지형)(올인원플랜)(1~4형)(15~89세)',
    ],
    field5: 15000,
    ai: '고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
    detail: [
      {
        id: 'a1',
        field1: '2보통약관(상해사망)',
        field2: '3000',
        field3: '100',
      },
      {
        id: 'a2',
        field1: '2한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
        field2: '3000',
        field3: '100',
      },
    ],
  },
  {
    id: 3,
    field1: '3한화 시그니처 여성 간편건강보험 4.0한화',
    field2: ['납입면제형', '기본형', '23N5간편 고지형'],
    field3: ['20년납', '100세만기'],
    field4: [
      '1형(355간편고지형)(올인원플랜)(1~4형)(15~89세)1형(355간편고지형)(올인원플랜)(1~4형)(15~89세)1형(355간편고지형)(올인원플랜)(1~4형)(15~89세)',
      '1형(355간편고지형)(올인원플랜)(1~4형)(15~89세)',
    ],
    field5: 15000,
    ai: '고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
    detail: [
      {
        id: 'a1',
        field1: '3보통약관(상해사망)',
        field2: '3000',
        field3: '100',
      },
      {
        id: 'a2',
        field1: '3한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
        field2: '3000',
        field3: '100',
      },
    ],
  },
  {
    id: 4,
    field1: '4한화 시그니처 여성 간편건강보험 4.0 - 추천안 4',
    field2: ['납입면제형', '기본형', '23N5간편 고지형'],
    field3: ['20년납', '100세만기'],
    field4: ['4형(355간편고지형)(올인원플랜)(1~4형)(15~89세)', '4형(355간편고지형)(올인원플랜)(1~4형)(15~89세)'],
    field5: 18000,
    ai: '추천안 4입니다. <br />고객 조건에 맞춰 주요 담보를 균형 있게 구성했습니다.',
    detail: [
      { id: 'a4-1', field1: '4보통약관(상해사망)', field2: '4000', field3: '120' },
      { id: 'a4-2', field1: '4질병사망(간편)', field2: '3000', field3: '90' },
    ],
  },
  {
    id: 5,
    field1: '5한화 시그니처 여성 간편건강보험 4.0 - 추천안 5',
    field2: ['납입면제형', '기본형', '23N5간편 고지형'],
    field3: ['20년납', '100세만기'],
    field4: ['5형(355간편고지형)(올인원플랜)(1~4형)(15~89세)', '5형(355간편고지형)(올인원플랜)(1~4형)(15~89세)'],
    field5: 21000,
    ai: '추천안 5입니다. <br />보험료와 보장 범위를 함께 고려한 구성입니다.',
    detail: [
      { id: 'a5-1', field1: '5보통약관(상해사망)', field2: '5000', field3: '140' },
      { id: 'a5-2', field1: '5질병사망(간편)', field2: '3500', field3: '100' },
    ],
  },
  {
    id: 6,
    field1: '6한화 시그니처 여성 간편건강보험 4.0 - 추천안 6',
    field2: ['납입면제형', '기본형', '23N5간편 고지형'],
    field3: ['20년납', '100세만기'],
    field4: ['6형(355간편고지형)(올인원플랜)(1~4형)(15~89세)', '6형(355간편고지형)(올인원플랜)(1~4형)(15~89세)'],
    field5: 19500,
    ai: '추천안 6입니다. <br />핵심 담보를 우선 강화한 설계입니다.',
    detail: [
      { id: 'a6-1', field1: '6보통약관(상해사망)', field2: '4200', field3: '115' },
      { id: 'a6-2', field1: '6질병사망(간편)', field2: '3200', field3: '95' },
    ],
  },
  {
    id: 7,
    field1: '7한화 시그니처 여성 간편건강보험 4.0 - 추천안 7',
    field2: ['납입면제형', '기본형', '23N5간편 고지형'],
    field3: ['20년납', '100세만기'],
    field4: ['7형(355간편고지형)(올인원플랜)(1~4형)(15~89세)', '7형(355간편고지형)(올인원플랜)(1~4형)(15~89세)'],
    field5: 23000,
    ai: '추천안 7입니다. <br />치료비 중심으로 보장을 확장했습니다.',
    detail: [
      { id: 'a7-1', field1: '7보통약관(상해사망)', field2: '5200', field3: '150' },
      { id: 'a7-2', field1: '7질병사망(간편)', field2: '3800', field3: '110' },
    ],
  },
  {
    id: 8,
    field1: '8한화 시그니처 여성 간편건강보험 4.0 - 추천안 8',
    field2: ['납입면제형', '기본형', '23N5간편 고지형'],
    field3: ['20년납', '100세만기'],
    field4: ['8형(355간편고지형)(올인원플랜)(1~4형)(15~89세)', '8형(355간편고지형)(올인원플랜)(1~4형)(15~89세)'],
    field5: 17500,
    ai: '추천안 8입니다. <br />예산 내에서 효율적인 담보 구성을 제안합니다.',
    detail: [
      { id: 'a8-1', field1: '8보통약관(상해사망)', field2: '3900', field3: '105' },
      { id: 'a8-2', field1: '8질병사망(간편)', field2: '3000', field3: '88' },
    ],
  },
  {
    id: 9,
    field1: '9한화 시그니처 여성 간편건강보험 4.0 - 추천안 9',
    field2: ['납입면제형', '기본형', '23N5간편 고지형'],
    field3: ['20년납', '100세만기'],
    field4: ['9형(355간편고지형)(올인원플랜)(1~4형)(15~89세)', '9형(355간편고지형)(올인원플랜)(1~4형)(15~89세)'],
    field5: 26000,
    ai: '추천안 9입니다. <br />고액 보장 담보를 중심으로 강화했습니다.',
    detail: [
      { id: 'a9-1', field1: '9보통약관(상해사망)', field2: '6000', field3: '170' },
      { id: 'a9-2', field1: '9질병사망(간편)', field2: '4200', field3: '120' },
    ],
  },
  {
    id: 10,
    field1: '10한화 시그니처 여성 간편건강보험 4.0 - 추천안 10',
    field2: ['납입면제형', '기본형', '23N5간편 고지형'],
    field3: ['20년납', '100세만기'],
    field4: ['10형(355간편고지형)(올인원플랜)(1~4형)(15~89세)', '10형(355간편고지형)(올인원플랜)(1~4형)(15~89세)'],
    field5: 24000,
    ai: '추천안 10입니다. <br />보장/보험료 밸런스를 기준으로 최종 제안한 설계입니다.',
    detail: [
      { id: 'a10-1', field1: '10보통약관(상해사망)', field2: '5600', field3: '160' },
      { id: 'a10-2', field1: '10질병사망(간편)', field2: '4000', field3: '115' },
    ],
  },
];

export function Ltpa020View2({
  dataNone,
  setDataNone,
}: {
  dataNone: boolean;
  setDataNone: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const columnDefs4: ColDef<DummyDataListDetailType>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 1,
      tooltipValueGetter: createTooltipValueGetter<DummyDataListDetailType>({ field: 'field1' }),
    },
    {
      headerName: '가입금액(만원)',
      field: 'field2',
      width: 80,
      cellClass: 'text-right',
    },
    {
      headerName: '보험료(원)',
      field: 'field3',
      width: 70,
      cellClass: 'text-right',
    },
  ];

  const [listSelected, setListSelected] = useState<number | null>(dummyDataList[0]?.id ?? null);
  const [showMoreButton, setShowMoreButton] = useState<boolean>(true);
  const listScrollRef = useRef<HTMLDivElement | null>(null);
  const scrollAnimRef = useRef<number | null>(null);

  const selectedRecommendPlan = dummyDataList.find((item) => item.id === listSelected) ?? dummyDataList[0];
  const selectedAiReasonLines = (selectedRecommendPlan?.ai ?? '')
    .split('<br />')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const updateMoreButtonVisibility = useCallback(() => {
    const container = listScrollRef.current;
    if (!container) {
      return;
    }

    const isAtEnd = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
    setShowMoreButton(!isAtEnd);
  }, []);

  const handleMoreRecommendClick = useCallback(() => {
    const container = listScrollRef.current;
    if (!container) {
      return;
    }

    const items = Array.from(container.querySelectorAll<HTMLElement>('.card-selected'));

    if (items.length === 0) {
      return;
    }

    const itemHeight = items[0]?.offsetHeight ?? 0;
    if (itemHeight <= 0) {
      return;
    }

    const viewportTop = container.scrollTop;
    const maxScrollTop = Math.max(container.scrollHeight - container.clientHeight, 0);
    const visibleItemCount = Math.max(1, Math.floor(container.clientHeight / itemHeight));
    const step = visibleItemCount * (itemHeight + 12);
    const targetTop = Math.min(viewportTop + step, maxScrollTop);

    if (scrollAnimRef.current !== null) {
      cancelAnimationFrame(scrollAnimRef.current);
    }

    const startTop = container.scrollTop;
    const distance = targetTop - startTop;
    const duration = 420;
    const startTime = performance.now();
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      container.scrollTop = startTop + distance * eased;

      if (progress < 1) {
        scrollAnimRef.current = requestAnimationFrame(animate);
        return;
      }

      scrollAnimRef.current = null;
      updateMoreButtonVisibility();
    };

    scrollAnimRef.current = requestAnimationFrame(animate);
  }, [updateMoreButtonVisibility]);

  useEffect(() => {
    updateMoreButtonVisibility();
  }, [updateMoreButtonVisibility]);

  useMounted(() => {
    return () => {
      if (scrollAnimRef.current !== null) {
        cancelAnimationFrame(scrollAnimRef.current);
      }
    };
  });

  // dataNone, setDataNone은 부모에서 props로 받음

  return (
    <Grid className="w-full h-full grid-cols-[1fr_auto] gap-4 items-stretch overflow-hidden" gap={1.2}>
      {dataNone ? (
        <Gcol className="h-full gap-2.5 " placement="cc">
          <div className="w-[24.8rem]">
            <Image
              src="/images/Ltpa020/pro100.jpg"
              alt="설명"
              fill
              style={{ objectFit: 'cover' }}
              onClick={() => setDataNone(false)}
              className="relative!"
            />
          </div>
          <p className="text-center text-[1.3rem] font-bold text-[var(--color-secondary-70)]">
            상품을 추천할 고객과 조건을 선택하고
            <br />
            <b className="text-[var(--color-primary-50)]">최적의 상품 플랜</b>을 확인하세요!
          </p>
        </Gcol>
      ) : (
        <>
          {/* 리스트 */}
          <div className="relative w-full h-full min-h-0">
            <div
              className="h-full min-h-0 relative overflow-y-auto"
              ref={listScrollRef}
              onScroll={updateMoreButtonVisibility}
            >
              <Grid className="grid-cols-3 gap-[1.2rem] w-full">
                {dummyDataList.map((item) => (
                  <Gcol
                    data-recommend-item="true"
                    className={`group bg-[var(--color-secondary-40)] rounded-[1rem] after:content-[''] after:rounded-[1rem] after:absolute after:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] after:w-full after:h-full after:pointer-events-none after:top-0 after:left-0 shadow-[0_0.2rem_0.2rem_0_rgba(0,0,0,0.1)] overflow-hidden relative ${listSelected === item.id ? 'card-selected' : ''}`}
                    key={item.id}
                  >
                    <div className="absolute top-[1rem] right-[1rem] z-10">
                      <Checkbox size="xl" color="secondary"></Checkbox>
                    </div>
                    <Gcol
                      className="bg-[#fff] group-[.card-selected]:bg-[url(/images/Ltpa020/cand_on_bg.png),linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%)] group-[.card-selected]:[background-repeat:no-repeat] group-[.card-selected]:[background-position:right_top,left_top]   rounded-b-[1rem] p-[1rem] gap-2 w-full px-[1.6rem] pt-[2rem] pb-[1rem] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.1)] group-[.card-selected]:text-white"
                      placement="ss"
                    >
                      <h3 className="truncate w-[calc(100%-2.4rem)] text-[1.5rem] font-bold">{item.field1}</h3>
                      <div className="w-full flex gap-1 text-[1.1rem] text-[var(--color-gray-70)] group-[.card-selected]:text-white">
                        {item?.field2.join(' · ') ?? ''}
                      </div>
                      <Grow placement="bwc">
                        <div className="w-full flex gap-1 text-[1.1rem] text-[var(--color-gray-70)] group-[.card-selected]:text-white">
                          {item?.field3.join(' / ') ?? ''}
                        </div>

                        <Grow className="shrink-0">
                          <AdderIcon
                            color={listSelected === item.id ? 'var(--color-primary-70)' : '#FFAC27'}
                            color2={listSelected === item.id ? 'var(--color-primary-50)' : '#FFCF64'}
                            color3={listSelected === item.id ? 'var(--color-primary-20)' : '#FFE8AE'}
                          />
                          <strong className="text-[1.5rem] font-bold text-[var(--color-primary-50)] group-[.card-selected]:text-white">
                            {item.field5.toLocaleString()}원
                          </strong>
                        </Grow>
                      </Grow>
                      <Gcol
                        variant={'box-round'}
                        className="w-full h-fit gap-1 px-[1rem] py-[0.8rem] min-h-[5.4rem]"
                        placement="ss"
                      >
                        <BulletList className="w-full">
                          {item.field4.map((text, index) => (
                            <BulletListItem key={index} size="xs" className="leading-[1.2] text-[var(--color-gray-70)]">
                              <div className="truncate w-[calc(100%-0.6rem)]">{text}</div>
                            </BulletListItem>
                          ))}
                        </BulletList>
                      </Gcol>
                    </Gcol>
                    <Grow>
                      <Button
                        variant={'none'}
                        className="text-[#fff] font-bold pt-[0.8rem] pb-[1rem] h-[auto] text-[1.3rem]"
                        onClick={() => setListSelected(item.id)}
                      >
                        <PaperIcon size={16} color={'var(--color-white)'} />
                        보장내용 확인
                      </Button>
                    </Grow>
                  </Gcol>
                ))}
              </Grid>
            </div>
            {showMoreButton && (
              <div className="absolute bottom-0 right-0 z-10 w-full h-[2.7rem] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,#fff_100%)] flex items-center justify-center">
                <Button
                  type="button"
                  className="mb-2 bg-[var(--color-warning-10)] rounded-full text-[var(--color-primary-50)] gap1.5 h-[2.5rem] border-0 px-[0.6rem] hover:bg-[var(--color-warning-20)]"
                  onClick={handleMoreRecommendClick}
                >
                  <ArrowDoubleIcon />
                  추천설계 더보기
                  <ArrowDoubleIcon />
                </Button>
              </div>
            )}
          </div>
          {/* 상세 */}
          <Grid
            className="shrink-0 w-[29.4rem] h-full rounded-[1rem] border border-[#FF5C2E] bg-white shadow-[0_2px_2px_0_rgba(255,92,46,0.2)] overflow-hidden grid-rows-[auto_1fr]"
            gap={0}
          >
            <Gcol
              className="relative px-[1.6rem] py-[1rem] gap-[0.2rem] bg-[url(/images/Ltpa020/cand_on_bg.png),linear-gradient(358deg,#FF5C2E_9.4%,#FF8D02_97.24%)] [background-repeat:no-repeat] [background-position:right_top,left_top] rounded-b-[1rem]"
              placement="ss"
            >
              <Typo tag="strong" variant="body-md" weight="bold" className="text-white">
                {selectedRecommendPlan?.field1 ?? ''}
              </Typo>
              <Typo tag="p" variant="body-sm" className="text-white">
                {selectedRecommendPlan?.field2.join(' · ') ?? ''}
              </Typo>

              <Grow className="w-full" placement="ec" gap={1}>
                <AdderIcon2 size={14} />
                <Typo tag="p" variant="body-xs" weight={'normal'} className="text-white">
                  예상보험료
                </Typo>
                <Typo tag="p" variant="body-xs" weight={'bold'} className="text-white">
                  {selectedRecommendPlan?.field5.toLocaleString()}원
                </Typo>
              </Grow>
            </Gcol>

            <Grid className="px-[1rem] pb-[1rem] pt-[0.8rem] gap-[0.8rem] grid-rows-[auto_1fr]">
              <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                className="w-full bg-[var(--color-information-10)] p-2.5 rounded-[1rem]"
              >
                <AccordionItem value="item-1" className="flex flex-col gap-2">
                  <AccordionTrigger className="group w-full rounded-[1rem]">
                    <Grow
                      className="w-full rounded-[1.2rem] border border-[var(--color-information-50)] bg-white px-[0.8rem] py-[0.2rem] h-[2.4rem]"
                      placement="bwe"
                    >
                      <Grow gap={0.2} placement="sc">
                        <Ai2Icon size={10} color="var(--color-information-50)" />
                        <Typo tag="p" variant="body-xs" weight="bold" className="text-[var(--color-information-50)]">
                          AI 추천이유
                        </Typo>
                      </Grow>
                      <SelectDropIcon className="text-[var(--color-information-50)] transition-transform group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0 " />
                    </Grow>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="max-h-[9.2rem] overflow-y-auto pr-[0.2rem] text-[1.1rem] leading-[1.5]">
                      {selectedAiReasonLines.map((text, index) => (
                        <React.Fragment key={`${text}-${index}`}>
                          {text}
                          {index < selectedAiReasonLines.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataListDetailType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={selectedRecommendPlan?.detail ?? []}
                  columnDefs={columnDefs4}
                  domLayout="normal"
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
