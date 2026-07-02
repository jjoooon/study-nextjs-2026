/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import Image from 'next/image';
import { useState } from 'react';
import * as React from 'react';
import { Ltpa120 } from '@/features/pub/shared/components/popups/Ltpa120';
import { withPublicUrl } from '@/shared/utils/url/publicUrl';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Grid, Typo, Divider } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Ai2Icon, SelectDropIcon, SearchIcon, ResetIcon, AdderIcon, ArrowNext } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

import '@/shared/lib/agGridPub';

type DummyDataListDetailType = {
  id: string | number;
  field1: string;
  field2: string;
  field3: string;
};
type DummyDataListType = {
  id: number;
  field1: string;
  field2: string[];
  field3: string[];
  field4: {
    field1: number;
    field2: string;
    field3: {
      id: number;
      field1: string;
      field2: string;
      field3: string;
    }[];
  }[];
};
const dummyDataList: DummyDataListType[] = [
  {
    id: 1,
    field1: '1한화 시그니처 여성 간편건강보험 4.0한화 시그니처 여성 간편건',
    field2: ['납입면제형', '기본형', '23N5간편 고지형'],
    field3: ['20년납', '100세만기'],
    field4: [
      {
        field1: 98000,
        field2:
          '고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: [
          {
            id: 1,
            field1: '보통약관(상해사망)',
            field2: '3000',
            field3: '0',
          },
          {
            id: 2,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '0',
          },
          {
            id: 3,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
          {
            id: 4,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
        ],
      },
      {
        field1: 152000,
        field2:
          '02 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: [
          {
            id: 1,
            field1: '보통약관(상해사망)',
            field2: '3000',
            field3: '100',
          },
          {
            id: 2,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
          {
            id: 3,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '0',
          },
          {
            id: 4,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
        ],
      },
      {
        field1: 159000,
        field2:
          '03 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: [
          {
            id: 1,
            field1: '보통약관(상해사망)',
            field2: '3000',
            field3: '100',
          },
          {
            id: 2,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
          {
            id: 3,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
          {
            id: 4,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    field1: '한화 시그니처 여성 간편건강보험',
    field2: ['납입면제형납입면제형', '기본형', '23N5간편 고지형', '23N5간편 고지형'],
    field3: ['20년납', '100세만기'],
    field4: [
      {
        field1: 98000,
        field2:
          '고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: [
          {
            id: 1,
            field1: '보통약관(상해사망)',
            field2: '3000',
            field3: '0',
          },
          {
            id: 2,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '0',
          },
          {
            id: 3,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
          {
            id: 4,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
        ],
      },
      {
        field1: 152000,
        field2:
          '02 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: [
          {
            id: 1,
            field1: '보통약관(상해사망)',
            field2: '3000',
            field3: '100',
          },
          {
            id: 2,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
          {
            id: 3,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '0',
          },
          {
            id: 4,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
        ],
      },
      {
        field1: 159000,
        field2:
          '03 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: [
          {
            id: 1,
            field1: '보통약관(상해사망)',
            field2: '3000',
            field3: '100',
          },
          {
            id: 2,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
          {
            id: 3,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
          {
            id: 4,
            field1: '한화 더 경증 간편건강보험간(연만기 갱신형)2601 ',
            field2: '3000',
            field3: '100',
          },
        ],
      },
    ],
  },
];

export function Ltpa02002({
  dataNone,
  userType,
  setDataNone,
}: {
  userType: string;
  dataNone: boolean;
  setDataNone: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const dataList = dummyDataList;
  const columnDefs4: ColDef<DummyDataListDetailType>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 10,
      headerClass: '!text-[1.1rem] leading-[2.6rem]',
      tooltipValueGetter: createTooltipValueGetter<DummyDataListDetailType>({ field: 'field1' }),
    },
    {
      headerName: '가입금액(만원)',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellClass: 'text-right',
      headerClass: '!text-[1.1rem] leading-[2.6rem]',
      valueFormatter: numberValueFormatter<DummyDataListDetailType>,
    },
    {
      headerName: '보험료(원)',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-right',
      headerClass: '!text-[1.1rem] leading-[2.6rem]',
      valueFormatter: numberValueFormatter<DummyDataListDetailType>,
    },
  ];

  const customerType = userType;
  const [isAmountInputVisible, setIsAmountInputVisible] = useState<boolean>(false);
  const [isFilterOptionOpen, setIsFilterOptionOpen] = useState<boolean>(false);
  const [isProductOptionOpen, setIsProductOptionOpen] = useState<string>('상품옵션');
  const coverageOptions = [
    { value: '사망/후유', label: '사망/후유' },
    { value: '진단비', label: '진단비' },
    { value: '입원/통원', label: '입원/통원' },
    { value: '수술/치료', label: '수술/치료' },
    { value: '골절/화상', label: '골절/화상' },
    { value: '검사/지원', label: '검사/지원' },
  ] as const;
  type CoverageOptionValue = (typeof coverageOptions)[number]['value'];
  const [selectedCoverageValues, setSelectedCoverageValues] = useState<CoverageOptionValue[]>([]);
  const selectedCoverageSummary =
    selectedCoverageValues.length === 0
      ? '선택'
      : selectedCoverageValues.length === 1
        ? selectedCoverageValues[0]
        : `${selectedCoverageValues[0]} 외 ${selectedCoverageValues.length - 1}개`;
  // 보장분석
  const AnalysisOptions = [
    { value: '보장분석 부족자금', label: '보장분석 부족자금' },
    { value: '기계약 누적해소', label: '기계약 누적해소' },
    { value: '기계약 유지', label: '기계약 유지' },
  ] as const;
  type AnalysisOptionValue = (typeof AnalysisOptions)[number]['value'];
  type AnalysisOptionValueWithEmpty = '' | AnalysisOptionValue;
  const [selectedAnalysisValue, setSelectedAnalysisValue] = useState<AnalysisOptionValueWithEmpty>('');
  const selectedAnalysisSummary = selectedAnalysisValue ? selectedAnalysisValue : '선택';
  // 상품특징
  type ApplyOptionValue = '' | '적용' | '미적용';
  type MaturityOptionValue = '' | '세만기' | '연만기';
  const [noRefundValue, setNoRefundValue] = useState<ApplyOptionValue>('');
  const [premiumWaiverValue, setPremiumWaiverValue] = useState<ApplyOptionValue>('');
  const [maturityValue, setMaturityValue] = useState<MaturityOptionValue>('');
  const productFeatureSummaryValues = [
    noRefundValue === '적용' ? '무해지' : '',
    premiumWaiverValue === '적용' ? '납면' : '',
    maturityValue,
  ].filter((value) => value.length > 0);
  const selectedProductFeatureSummary =
    productFeatureSummaryValues.length > 0 ? productFeatureSummaryValues.join(', ') : '선택';
  const [simpleType, setSimpleType] = useState<string>(''); // '표준' | '간편' | ''
  const [additionalDiseases, setAdditionalDiseases] = useState<string[]>([]); // ['고혈압', ...]
  const [hospitalInputs, setHospitalInputs] = useState<string[]>(['', '', '', '', '']);
  // 고지유형 요약
  const hasHospitalInput = hospitalInputs.some((v) => v.trim() !== '');
  const selectedNoticeSummary =
    [simpleType, ...additionalDiseases, hasHospitalInput ? '입원수술' : ''].filter(Boolean).join(', ') || '선택';

  // dataNone, setDataNone은 부모에서 props로 받음
  const [selectedPlanKey, setSelectedPlanKey] = useState<string | null>('1-0');
  const [comparedPlanKeys, setComparedPlanKeys] = useState<string[]>([]);
  const [isAiReasonExpanded, setIsAiReasonExpanded] = useState<boolean>(false);

  // 비교하기 체크 애니메이션 페이즈 상태 및 효과
  const [animateCardPhase, setAnimateCardPhase] = useState<'idle' | 'appear' | 'fall'>('idle');
  const [isButtonShaking, setIsButtonShaking] = useState<boolean>(false);
  const prevComparedKeysRef = React.useRef<string[]>([]);

  React.useEffect(() => {
    const prevKeys = prevComparedKeysRef.current;
    const currentKeys = comparedPlanKeys;
    const hasNewChecked = currentKeys.some((key) => !prevKeys.includes(key));

    let fallTimer: NodeJS.Timeout | undefined;
    let shakeStartTimer: NodeJS.Timeout | undefined;
    let shakeEndTimer: NodeJS.Timeout | undefined;
    let idleTimer: NodeJS.Timeout | undefined;

    if (hasNewChecked) {
      setAnimateCardPhase('appear');

      fallTimer = setTimeout(() => {
        setAnimateCardPhase('fall');
      }, 50);

      shakeStartTimer = setTimeout(() => {
        setIsButtonShaking(true);
      }, 300);

      shakeEndTimer = setTimeout(() => {
        setIsButtonShaking(false);
      }, 500);

      idleTimer = setTimeout(() => {
        setAnimateCardPhase('idle');
      }, 550);
    } else {
      setAnimateCardPhase('idle');
      setIsButtonShaking(false);
    }

    prevComparedKeysRef.current = currentKeys;

    return () => {
      if (fallTimer) clearTimeout(fallTimer);
      if (shakeStartTimer) clearTimeout(shakeStartTimer);
      if (shakeEndTimer) clearTimeout(shakeEndTimer);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [comparedPlanKeys]);

  // 선택된 플랜 정보 가져오기
  const getSelectedPlanInfo = () => {
    if (!selectedPlanKey) return null;
    const [productId, planIndex] = selectedPlanKey.split('-').map(Number);
    const product = dummyDataList.find((item) => item.id === productId);
    if (!product) return null;
    const plan = product.field4[planIndex];
    return { product, plan };
  };

  const selectedPlanInfo = getSelectedPlanInfo();
  return (
    <Grid className="w-full grid-rows-[auto_1fr]" gap={3}>
      <div className="w-full px-[1rem]">
        <Grow variant={'box-round'} className="w-full gap-[2rem] relative z-20" placement="ss">
          <Typo tag="h3" variant={'heading-sm'} className="shrink-0 text-[var(--color-text-blue-gray)]">
            추가정보
          </Typo>

          <Gcol placement="ss" gap={2}>
            <Typo tag="div" variant={'body-md'} className="var(--color-text-blue-gray) flex items-start gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <g clipPath="url(#clip0_1945_92923)">
                  <path
                    d="M0 2.24795C0 1.0094 1.12076 0 2.50202 0H12.498C13.8792 0 15 1.0094 15 2.24795V15.752C15 16.9961 13.8792 18 12.498 18H2.50202C1.12076 18 0 16.9906 0 15.752V2.24795Z"
                    fill="#D8DBE0"
                  />
                  <path
                    opacity="0.4"
                    d="M3 3.82001C3 3.3711 3.38656 3.00488 3.86041 3.00488H11.1396C11.6134 3.00488 12 3.3711 12 3.82001C12 4.26892 11.6134 4.63513 11.1396 4.63513H3.86041C3.38656 4.63513 3 4.26892 3 3.82001Z"
                    fill="#6B7280"
                  />
                  <path
                    opacity="0.4"
                    d="M3 7.06927C3 6.62037 3.38656 6.25415 3.86041 6.25415H11.1396C11.6134 6.25415 12 6.62037 12 7.06927C12 7.51818 11.6134 7.8844 11.1396 7.8844H3.86041C3.38656 7.8844 3 7.51818 3 7.06927Z"
                    fill="#6B7280"
                  />
                  <path
                    opacity="0.4"
                    d="M3 13.8151C3 13.3662 3.38656 13 3.86041 13H7.13959C7.61344 13 8 13.3662 8 13.8151C8 14.264 7.61344 14.6302 7.13959 14.6302H3.86041C3.38656 14.6302 3 14.264 3 13.8151Z"
                    fill="#6B7280"
                  />
                  <path
                    d="M17.1437 17.4588C17.1437 17.7556 16.8819 18 16.5639 18H12.5798C12.2619 18 12 17.7556 12 17.4588V9.20105H17.1437V17.4588Z"
                    fill="#338CF5"
                  />
                  <path
                    d="M17.1437 17.4574C17.1437 17.7542 16.8819 17.9986 16.5639 17.9986H12.5798C12.2619 17.9986 12 17.7542 12 17.4574V16.3983H17.1437V17.4574Z"
                    fill="#003D85"
                  />
                  <path
                    d="M14.2321 6.17458C14.4067 5.94181 14.7496 5.94181 14.9179 6.17458L17.1437 9.20069H12L14.2321 6.17458Z"
                    fill="#FEF4D4"
                  />
                  <path
                    d="M14.918 6.17458C14.7496 5.94181 14.4067 5.94181 14.2321 6.17458L13.6086 7.0184H15.5352L14.9117 6.17458H14.918Z"
                    fill="#6B7280"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1945_92923">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              추가정보를 입력하면 보다 정확한 추천 결과를 받아보실 수 있습니다. 추가정보를 선택적으로 입력 가능합니다.
            </Typo>
            <Grow placement="bwc" gap={6}>
              <FormTable
                caption=""
                cols={['w-[4rem]', 'w-[30%]', 'w-[6rem]', 'w-[30%]', 'w-[6rem]', 'w-[30%]']}
                variant={'none'}
              >
                <FormRow className="items-start!">
                  <FormCell title={'상품특징'}>
                    <button
                      type="button"
                      className="w-full p-1 h-[2.8rem] border-b border-b-[var(--color-gray-30)] flex justify-between items-center gap-[0.6rem]"
                      onClick={() => setIsFilterOptionOpen((prev) => !prev)}
                      aria-expanded={isFilterOptionOpen}
                    >
                      <span className="w-[100%] flex items-center font-normal">{selectedProductFeatureSummary}</span>
                      <SelectDropIcon
                        color="var(--color-gray-50)"
                        className={isFilterOptionOpen ? 'rotate-[180deg]' : ''}
                      />
                    </button>
                  </FormCell>

                  {customerType === 'recent' ? (
                    <FormCell title={'보장분석'}>
                      <button
                        type="button"
                        className="w-full p-1 h-[2.8rem] border-b border-b-[var(--color-gray-30)] flex justify-between items-center gap-[0.6rem]"
                        onClick={() => setIsFilterOptionOpen((prev) => !prev)}
                        aria-expanded={isFilterOptionOpen}
                      >
                        <span className="w-[100%] flex items-center font-normal">{selectedAnalysisSummary}</span>
                        <SelectDropIcon
                          color="var(--color-gray-50)"
                          className={isFilterOptionOpen ? 'rotate-[180deg]' : ''}
                        />
                      </button>
                    </FormCell>
                  ) : (
                    <FormCell title={'고지유형'}>
                      <button
                        type="button"
                        className="w-full p-1 h-[2.8rem] border-b border-b-[var(--color-gray-30)] flex justify-between items-center gap-[0.6rem]"
                        onClick={() => setIsFilterOptionOpen((prev) => !prev)}
                        aria-expanded={isFilterOptionOpen}
                      >
                        <span className="w-[100%] flex items-center font-normal">{selectedNoticeSummary}</span>
                        <SelectDropIcon
                          color="var(--color-gray-50)"
                          className={isFilterOptionOpen ? 'rotate-[180deg]' : ''}
                        />
                      </button>
                    </FormCell>
                  )}

                  <FormCell title={'담보군'} className="items-center! min-h-[2.8rem]! pt-[0.6rem]">
                    <button
                      type="button"
                      className="w-full p-1 h-[2.8rem] border-b border-b-[var(--color-gray-30)] flex justify-between items-center gap-[0.6rem]"
                      onClick={() => setIsFilterOptionOpen((prev) => !prev)}
                      aria-expanded={isFilterOptionOpen}
                    >
                      <span className="w-[100%] flex items-center font-normal">{selectedCoverageSummary}</span>
                      <SelectDropIcon
                        color="var(--color-gray-50)"
                        className={isFilterOptionOpen ? 'rotate-[180deg]' : ''}
                      />
                    </button>
                  </FormCell>
                </FormRow>
              </FormTable>
              <Grow>
                <Button variant="contained" color="coolgray" size={'lg'}>
                  설계추천
                </Button>
                <Button variant="outlined" color="gray" size={'lg'} only="icon" aria-label="초기화">
                  <ResetIcon />
                </Button>
              </Grow>
            </Grow>
          </Gcol>
          {isFilterOptionOpen && (
            <Grow
              variant="box-round-b"
              className="absolute top-[calc(100%-.6rem)] left-0 w-full bg-[var(--color-blue-gray-10)] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.1)] py-2.5 gap-[7rem] z-10 pl-[13.2rem]! pr-[13.4rem]! justify-stretch! "
              placement="ss"
            >
              {/* 상품특징 */}
              <Gcol variant={'box-line'} placement="ss" className="!p-[1.2rem]" gap={3}>
                <RadioGroup
                  width={'full'}
                  className="gap-[0.4rem] w-full grid grid-cols-[1fr_1fr] items-start"
                  defaultValue={isProductOptionOpen}
                  onValueChange={(value) => setIsProductOptionOpen(value)}
                >
                  {[
                    { value: '상품옵션', label: '상품옵션' },
                    { value: '상품선택', label: '상품선택' },
                  ].map((opt, idx) => (
                    <RadioGroupItem
                      key={'po' + idx}
                      value={opt.value}
                      variant="button"
                      size={'md'}
                      className="w-full text-left"
                    >
                      {opt.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
                <FormTable variant={'none'} lineTop={false} caption="" cols={['w-[6rem]', 'w-auto']}>
                  {isProductOptionOpen === '상품옵션' ? (
                    <>
                      <FormRow>
                        <FormCell title={'무해지'}>
                          <RadioGroup
                            value={noRefundValue}
                            onValueChange={(value) => setNoRefundValue(value as ApplyOptionValue)}
                            className="grid grid-cols-[1fr_1fr] w-[16rem]"
                          >
                            {[
                              { value: '적용', label: '적용' },
                              { value: '미적용', label: '미적용' },
                            ].map((opt) => (
                              <RadioGroupItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title={'납면'}>
                          <RadioGroup
                            value={premiumWaiverValue}
                            onValueChange={(value) => setPremiumWaiverValue(value as ApplyOptionValue)}
                            className="grid grid-cols-[1fr_1fr] w-[16rem]"
                          >
                            {[
                              { value: '적용', label: '적용' },
                              { value: '미적용', label: '미적용' },
                            ].map((opt) => (
                              <RadioGroupItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title={'만기'}>
                          <RadioGroup
                            value={maturityValue}
                            onValueChange={(value) => setMaturityValue(value as MaturityOptionValue)}
                            className="grid grid-cols-[1fr_1fr] w-[16rem]"
                          >
                            {[
                              { value: '세만기', label: '세만기' },
                              { value: '연만기', label: '연만기' },
                            ].map((opt) => (
                              <RadioGroupItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    </>
                  ) : (
                    <>
                      <FormRow>
                        <FormCell title={'상품명'} className="align-top !pt-[0.3rem]">
                          <Gcol placement="ss" gap={1}>
                            <Grid className="grid-cols-[1fr_auto] gap-1 items-center w-full">
                              <Input
                                size={'sm'}
                                placeholder="상품명 검색"
                                value={'한화 3N5 더 간편건강보험(연만기 갱신형)2601'}
                              />
                              <Button
                                variant={'outlined'}
                                color={'gray-light'}
                                size={'md'}
                                only={'icon'}
                                aria-label="상품 검색"
                              >
                                <SearchIcon color="var(--color-primary-50)" />
                              </Button>
                            </Grid>
                            <Typo tag="p" variant={'body-xs'} className="text-[var(--color-gray-70)]">
                              납입중50%해약환급금지급형, 납입면제 운영형, 3N52간편고지형Ⅲ
                            </Typo>
                          </Gcol>
                        </FormCell>
                      </FormRow>
                    </>
                  )}
                </FormTable>
              </Gcol>

              {/* 보장분석 or 고지유형 */}
              {customerType === 'recent' ? (
                <Gcol variant={'box-line'} placement="ss" className="!p-[1.2rem] translate-x-[0.6rem]">
                  <RadioGroup
                    width={'full'}
                    className="gap-[0.4rem] [&>div]:w-full"
                    value={selectedAnalysisValue}
                    onValueChange={(value) => setSelectedAnalysisValue(value as AnalysisOptionValue)}
                  >
                    {AnalysisOptions.map((opt) => (
                      <RadioGroupItem
                        key={opt.value}
                        value={opt.value}
                        variant="button"
                        size={'md'}
                        className="!w-full !text-left"
                      >
                        {opt.label}
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                </Gcol>
              ) : (
                <Gcol variant={'box-line'} placement="ss" className="!p-[1.2rem] translate-x-[0.6rem]">
                  <FormTable variant={'none'} lineTop={false} caption="" cols={['w-[6rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'간편'}>
                        <RadioGroup
                          width={'full'}
                          value={simpleType}
                          onValueChange={(value) => setSimpleType(value)}
                          className="grid grid-cols-[1fr_1fr] w-full gap-0"
                        >
                          {[
                            { value: '표준', label: '표준' },
                            { value: '간편', label: '간편' },
                          ].map((opt) => (
                            <RadioGroupItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'추가질병'}>
                        <CheckboxGroup
                          className="grid grid-cols-[1fr_1fr] w-full gap-0"
                          value={additionalDiseases}
                          onValueChange={(values) => setAdditionalDiseases(values)}
                        >
                          {[
                            { value: '고혈압', label: '고혈압' },
                            { value: '당뇨', label: '당뇨' },
                          ].map((opt) => (
                            <CheckboxGroupItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </CheckboxGroupItem>
                          ))}
                        </CheckboxGroup>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={null} colSpan={2} className="!pt-0">
                        <Gcol placement="ss">
                          <Typo variant={'heading-md'} className="text-[var(--color-blue-gray-50)]">
                            입원수술
                          </Typo>
                          <Grid className="grid-cols-[auto_auto_1fr] gap-1 items-center w-full">
                            {[0, 1, 2, 3].map((idx) => (
                              <>
                                <Input
                                  key={idx}
                                  size={'sm'}
                                  width={86}
                                  placeholder="질병명검색"
                                  value={hospitalInputs[idx]}
                                  onChange={(e) => {
                                    const next = [...hospitalInputs];
                                    next[idx] = e.target.value;
                                    setHospitalInputs(next);
                                  }}
                                />
                                <Button
                                  variant={'outlined'}
                                  color={'gray-light'}
                                  size={'md'}
                                  only={'icon'}
                                  aria-label="질병 검색"
                                >
                                  <SearchIcon color="var(--color-primary-50)" />
                                </Button>
                                <Input size={'sm'} readOnly after="년 내" />
                              </>
                            ))}
                          </Grid>
                        </Gcol>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Gcol>
              )}

              {/* 담보군 */}
              <Gcol variant={'box-line'} className="gap-[0.4rem]" placement="ss">
                <Grid
                  className={`${isAmountInputVisible ? 'grid-cols-[auto_1fr]' : 'grid-cols-[1fr_1fr]'} grid-rows-[1fr] gap-1 w-full`}
                >
                  {coverageOptions.map((opt) => (
                    <React.Fragment key={opt.value}>
                      <Checkbox
                        value={opt.value}
                        variant="button"
                        className="w-full"
                        size={'md'}
                        checked={selectedCoverageValues.includes(opt.value)}
                        onCheckedChange={(checked) => {
                          setSelectedCoverageValues((prev) => {
                            const nextChecked = checked === true;
                            if (nextChecked) {
                              return prev.includes(opt.value) ? prev : [...prev, opt.value];
                            }
                            return prev.filter((value) => value !== opt.value);
                          });
                        }}
                      >
                        {opt.label}
                      </Checkbox>
                      {isAmountInputVisible && (
                        <Input after="만원" placeholder="가입금액" className="" commaAmount size={'md'} align="right" />
                      )}
                    </React.Fragment>
                  ))}
                </Grid>

                <Checkbox
                  checked={isAmountInputVisible}
                  onCheckedChange={(checked) => setIsAmountInputVisible(checked === true)}
                >
                  금액입력
                </Checkbox>
              </Gcol>
            </Grow>
          )}
        </Grow>
      </div>

      {dataNone ? (
        <Gcol className="h-full gap-2.5 " placement="cc">
          <div className="w-[24.8rem]">
            <Image
              src={withPublicUrl('/images/Ltpa020/pro100.jpg')}
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
        <Grid className="w-full grid-rows-[1fr_auto]" gap={0}>
          <Grid
            className="w-[calc(100vw + 2rem)] h-full grid-rows-[1fr] grid-cols-[2fr_1fr] min-[1600px]:grid-cols-[1fr_1fr] gap-4 items-stretch overflow-hidden bg-[var(--color-gray-5)] p-[2rem] "
            gap={3}
          >
            {/* 리스트 */}
            <div className="relative w-full h-full after:content-[''] after:block after:absolute after:pointer-events-none after:bottom-0 after:left-0 after:w-[100%] after:h-[3.4rem] after:bg-gradient-to-b after:from-transparent after:to-[#F4F4F4] after:z-10">
              <div className="relative overflow-y-auto w-full h-full gray-scroll">
                <Gcol
                  className="absolute top-0 left-0 w-full h-full after:content-[''] after:block after:w-full after:min-h-[1.6rem]"
                  gap={3}
                  placement="ss"
                >
                  {dataList.map((item) => (
                    <Grid
                      key={item.id}
                      className="w-full px-[2.4rem] py-[1.6rem] grid-cols-[1fr_auto] gap-4 place-items-center bg-white rounded-[3.2rem_0.6rem] shadow-[0_0.2rem_0.4rem_0_rgba(0,0,0,0.1)]"
                    >
                      <Gcol gap={2} placement="ss">
                        <Typo tag="h3" variant="heading-xl" className="break-keep pb-[0.4rem]">
                          {item.field1}
                        </Typo>
                        <Grow
                          className="py-[0.5rem] px-2 rounded-[0.6rem] bg-[var(--color-information-5)] flex-wrap gap-x-[0.4rem] gap-y-[0.2rem]"
                          placement="sc"
                        >
                          {item.field2.map((v, idx) => (
                            <>
                              {idx > 0 && <Divider variant="dot" color="gray-dark" />}
                              <Typo key={idx} tag="p" variant="body-sm">
                                {v}
                              </Typo>
                            </>
                          ))}
                        </Grow>
                        <Grow placement="ss">
                          {item.field3.map((v, idx) => (
                            <Grow
                              key={idx}
                              className="py-[0.5rem] px-2 rounded-[0.6rem] bg-[var(--color-warning-5)]"
                              placement="ss"
                            >
                              <Typo key={idx} tag="p" variant="body-sm">
                                {v}
                              </Typo>
                            </Grow>
                          ))}
                        </Grow>
                      </Gcol>
                      <Grow>
                        {item.field4.map((v, idx) => {
                          const planKey = `${item.id}-${idx}`;
                          const isSelected = selectedPlanKey === planKey;
                          return (
                            <Grid
                              key={idx}
                              className={`grid-rows-[1fr_auto] w-[13rem] h-[15.9rem] rounded-[1rem] overflow-hidden transition-shadow gap-0 ${
                                isSelected
                                  ? 'bg-[var(--color-primary-10)] after:pointer-events-none after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-[1rem] after:border-[0.2rem] after:border-[var(--color-primary-50)] shadow-[0_0.4rem_0.8rem_0_rgba(255,92,46,0.20)] [&>button_*]:text-white [&>button_path]:fill-white [&>button_path]:fill-white'
                                  : 'bg-[var(--color-primary-5)] shadow-[inset_0_0_0_0.1rem_rgba(0,0,0,0.1)]'
                              }`}
                              style={
                                isSelected
                                  ? {
                                      backgroundImage: `url(${withPublicUrl('/images/Ltpa020/cand_on_bg.png')}), linear-gradient(358deg,#FF5C2E 9.4%,#FF8D02 97.24%)`,
                                      backgroundRepeat: 'no-repeat',
                                      backgroundPosition: 'calc(100% + 120%) -4%',
                                      backgroundSize: '10rem, cover',
                                    }
                                  : undefined
                              }
                            >
                              <button
                                type="button"
                                className="p-[1.2rem] h-full flex flex-col justify-between items-start"
                                onClick={() => setSelectedPlanKey(isSelected ? null : planKey)}
                                aria-pressed={isSelected}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="40"
                                  height="40"
                                  viewBox="0 0 40 40"
                                  fill="none"
                                >
                                  <circle cx="30.5" cy="29.5" r="9.5" fill="var(--color-primary-20)" />
                                  <path
                                    d="M18.9854 22.4062C19.7586 22.4062 20.3857 23.0334 20.3857 23.8066C20.3857 24.5798 19.7585 25.207 18.9854 25.207H11.8066C11.0335 25.207 10.4063 24.5798 10.4062 23.8066C10.4062 23.0334 11.0334 22.4062 11.8066 22.4062H18.9854Z"
                                    fill="#61554F"
                                  />
                                  <path
                                    d="M22.6484 16.3994C23.4215 16.3996 24.0479 17.0267 24.0479 17.7998C24.0479 18.5729 23.4215 19.2 22.6484 19.2002H11.8066C11.0334 19.2002 10.4062 18.573 10.4062 17.7998C10.4062 17.0266 11.0334 16.3994 11.8066 16.3994H22.6484Z"
                                    fill="#61554F"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M23.8057 4C25.5194 4.00002 27.1515 4.73281 28.29 6.01367L32.9844 11.2949C33.9606 12.3932 34.5 13.8118 34.5 15.2812V31C34.5 34.3137 31.8137 37 28.5 37H11.5L11.1914 36.9922C8.02111 36.8316 5.5 34.2102 5.5 31V10C5.5 6.68629 8.18629 4 11.5 4H23.8057ZM11.5 6.59961C9.62223 6.59961 8.09961 8.12223 8.09961 10V31C8.09961 32.8778 9.62223 34.4004 11.5 34.4004H28.5C30.3778 34.4004 31.9004 32.8778 31.9004 31V15.2998H28.5C25.5729 15.2998 23.2002 12.9271 23.2002 10V6.59961H11.5ZM25.7998 10C25.7998 11.4912 27.0088 12.7002 28.5 12.7002H30.7549L26.3467 7.74121C26.1814 7.55526 25.9979 7.38952 25.7998 7.24609V10Z"
                                    fill="#61554F"
                                  />
                                </svg>
                                <Gcol placement="ss" gap={0}>
                                  <Typo tag="p" variant="body-sm" className="text-[var(--color-gray-70)]">
                                    예상보험료
                                  </Typo>
                                  <Typo tag="p" variant="heading-xl" className="text-[var(--color-primary-50)]">
                                    {v.field1.toLocaleString()}원
                                  </Typo>
                                </Gcol>
                              </button>
                              <Grow className="w-full h-[4rem] bg-[var(--color-secondary-50)]" placement="cc">
                                <Checkbox
                                  checked={comparedPlanKeys.includes(planKey)}
                                  onCheckedChange={(checked) => {
                                    const isChecked = checked === true;
                                    setComparedPlanKeys((prev) => {
                                      if (isChecked) {
                                        return prev.includes(planKey) ? prev : [...prev, planKey];
                                      }
                                      return prev.filter((key) => key !== planKey);
                                    });
                                  }}
                                >
                                  <span className="text-[#FFF]">비교하기</span>
                                </Checkbox>
                              </Grow>
                            </Grid>
                          );
                        })}
                      </Grow>
                    </Grid>
                  ))}
                </Gcol>
              </div>
            </div>
            {/* 상세 */}
            <Grid
              className="w-full h-full rounded-[1rem] border border-[#FF5C2E] bg-white shadow-[0_0.2rem_0.2rem_0_rgba(255,92,46,0.2)] overflow-hidden grid-rows-[auto_1fr_auto]"
              gap={0}
            >
              <Gcol
                className="relative px-[1.6rem] py-[1rem] gap-[0.2rem] rounded-b-[1rem] "
                placement="ss"
                style={{
                  backgroundImage: `url(${withPublicUrl('/images/Ltpa020/cand_on_bg.png')}), linear-gradient(358deg,#FF5C2E 9.4%,#FF8D02 97.24%)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '10rem, cover',
                  backgroundPosition: '96% -6%',
                }}
              >
                <Typo tag="p" variant="body-sm" className="text-white opacity-80">
                  보장내용 확인
                </Typo>
                <Typo tag="strong" variant="body-md" weight="bold" className="text-white">
                  {selectedPlanInfo?.product.field1}
                </Typo>
              </Gcol>

              <Grid className="px-[1rem] pb-0 pt-[0.8rem] gap-[0.8rem] grid-rows-[auto_1fr]">
                <Grow
                  className="grid grid-cols-[6.7rem_1fr] place-items-start gap-2 w-full bg-[var(--color-information-10)] p-2.5 rounded-[1rem] h-full"
                  placement="ss"
                >
                  <Button
                    variant={'outlined'}
                    color={'link'}
                    onClick={() => setIsAiReasonExpanded((prev) => !prev)}
                    className="group w-full rounded-[1rem] w-full rounded-[0.6rem] border border-[var(--color-information-50)] bg-white px-[0.6rem] py-[0.6rem] h-auto"
                  >
                    <Gcol
                      placement="ss"
                      gap={0}
                      className="text-[var(--color-information-50)] font-bold leading-none text-[1.1rem]"
                    >
                      <Grow placement="sc" gap={0} className="leading-none">
                        AI <Ai2Icon size={10} color="var(--color-information-50)" />
                      </Grow>
                      <div className="leading-none">추천이유</div>
                    </Gcol>
                    <SelectDropIcon
                      className={`text-[var(--color-information-50)] transition-transform ${isAiReasonExpanded ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </Button>
                  <div
                    className={`${isAiReasonExpanded ? 'max-h-[100%]' : 'max-h-[3.4rem]'} h-full overflow-y-auto pr-[0.2rem] text-[1.1rem] leading-[1.5] transition-all`}
                    dangerouslySetInnerHTML={{ __html: selectedPlanInfo?.plan.field2 ?? '' }}
                  />
                </Grow>
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataListDetailType>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={selectedPlanInfo?.plan.field3 ?? []}
                    columnDefs={columnDefs4}
                    domLayout="normal"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                    headerHeight={23}
                  />
                </div>
              </Grid>
              <Grow
                className="w-full bg-[var(--color-warning-5)] h-[3rem] px-4 shadow-[0_-0.1rem_0.8rem_0_rgba(0,0,0,0.1)]"
                placement="ec"
              >
                <AdderIcon />
                <Typo tag={'span'} variant={'body-sm'} color={'gray'}>
                  예상보험료
                </Typo>
                <Typo tag={'strong'} variant={'heading-lg'} color={'primary'}>
                  {selectedPlanInfo?.plan.field1.toLocaleString()}원
                </Typo>
              </Grow>
            </Grid>
          </Grid>
          <Grow gap={1} className="w-full min-h-[3.2rem] pt-2 pb-2.5" placement="ec">
            <Button
              variant={'outlined'}
              color={'gray'}
              size={'xl'}
              style={
                isButtonShaking
                  ? {
                      animation: 'button-shake 0.2s ease-in-out',
                    }
                  : undefined
              }
            >
              <Image
                src={withPublicUrl('/images/Ltpa020/card.png')}
                alt="카드"
                width={40}
                height={40}
                className="absolute pointer-events-none"
                style={{
                  transform: animateCardPhase === 'appear' ? 'translateY(-5rem)' : 'translateY(-2rem)',
                  opacity: animateCardPhase === 'appear' ? 1 : 0,
                  transition: animateCardPhase === 'fall' ? 'transform 0.3s ease-in, opacity 0.3s ease-in' : 'none',
                }}
              />
              추천설계비교({comparedPlanKeys.length})
            </Button>
            <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
              설계생성({comparedPlanKeys.length})
              <ArrowNext size={16} />
            </Button>
            <Ltpa120 />
          </Grow>
        </Grid>
      )}
      <style>{`
        @keyframes button-shake {
          0%, 100% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(-1px, 1px) scale(0.98); }
          40% { transform: translate(1px, -1px) scale(1.01); }
          60% { transform: translate(-1px, -1px) scale(0.99); }
          80% { transform: translate(1px, 1px) scale(1.01); }
        }
      `}</style>
    </Grid>
  );
}
