/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import Image from 'next/image';
import { useState } from 'react';
import * as React from 'react';
import { withPublicUrl } from '@/shared/utils/url/publicUrl';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Grid, Typo, Divider } from '@atoms';
import { BulletItem } from '@common/BulletList';
import { AiSpinner, PuzzleSpinner } from '@common/SpinnerRoot';
import {
  Ai2Icon,
  SelectDropIcon,
  SearchIcon,
  ResetIcon,
  AdderIcon,
  ArrowNext,
  KebabIcon,
  QuestionMark,
  PaperIcon,
  AiIcon,
} from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

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
const coverageDummyList = [
  { id: 1, field1: '보통약관(상해사망)', field2: '5000', field3: '700' },
  { id: 2, field1: '보험료납입면제대상보장(6대사유Ⅱ)', field2: '10', field3: '154' },
  { id: 3, field1: '보장보험료50%납입지원Ⅱ(4대유사암)', field2: '5', field3: '2769' },
  { id: 4, field1: '4대유사암진단비', field2: '2400', field3: '3132' },
  { id: 5, field1: '4대유사암진단비(기타피부암)', field2: '600', field3: '240' },
  { id: 6, field1: '4대유사암진단비(제자리암)', field2: '600', field3: '1248' },
  { id: 7, field1: '4대유사암진단비(경계성종양)', field2: '600', field3: '228' },
  { id: 8, field1: '4대유사암진단비(갑상선암)', field2: '600', field3: '1416' },
  { id: 9, field1: '여성통합암(4대유사암제외)진단비Ⅱ', field2: '39000', field3: '31440' },
  { id: 10, field1: '여성통합암(4대유사암제외)진단비Ⅱ(대장암)', field2: '3000', field3: '4200' },
  { id: 11, field1: '여성통합암(4대유사암제외)진단비Ⅱ(특정소화기관암)', field2: '3000', field3: '7050' },
  { id: 12, field1: '여성통합암(4대유사암제외)진단비Ⅱ(유방암)', field2: '3000', field3: '8700' },
  { id: 13, field1: '여성통합암(4대유사암제외)진단비Ⅱ(자궁관련암)', field2: '3000', field3: '2400' },
  { id: 14, field1: '여성통합암(4대유사암제외)진단비Ⅱ(난소암)', field2: '3000', field3: '900' },
  { id: 15, field1: '여성통합암(4대유사암제외)진단비Ⅱ(특정여성생식기관암)', field2: '3000', field3: '120' },
  { id: 16, field1: '여성통합암(4대유사암제외)진단비Ⅱ(비뇨기관암(요로암))', field2: '3000', field3: '1050' },
  { id: 17, field1: '여성통합암(4대유사암제외)진단비Ⅱ(폐암)', field2: '3000', field3: '3060' },
  { id: 18, field1: '여성통합암(4대유사암제외)진단비Ⅱ(특정호흡기및흉곽내기관암)', field2: '3000', field3: '270' },
  { id: 19, field1: '여성통합암(4대유사암제외)진단비Ⅱ(눈,뇌,중추신경계통및내분비선암)', field2: '3000', field3: '330' },
  { id: 20, field1: '여성통합암(4대유사암제외)진단비Ⅱ(입술,구강및인두암)', field2: '3000', field3: '390' },
  {
    id: 21,
    field1: '여성통합암(4대유사암제외)진단비Ⅱ(뼈,관절,악성흑색종,중피성및연조직암)',
    field2: '3000',
    field3: '510',
  },
  { id: 22, field1: '여성통합암(4대유사암제외)진단비Ⅱ(림프및조혈관련특정암)', field2: '3000', field3: '2460' },
  {
    id: 23,
    field1: '암(4대유사암제외)특정치료비(암전문의료기관Ⅱ(상급종합병원등))(각연간1회한)',
    field2: '9000',
    field3: '36000',
  },
  {
    id: 24,
    field1: '암(4대유사암제외)특정치료비(수술)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '2000',
    field3: '12040',
  },
  {
    id: 25,
    field1: '암(4대유사암제외)특정치료비(항암방사선치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '2000',
    field3: '8140',
  },
  {
    id: 26,
    field1: '암(4대유사암제외)특정치료비(항암약물치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '2000',
    field3: '14980',
  },
  {
    id: 27,
    field1: '암(4대유사암제외)특정치료비(중환자실치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '1000',
    field3: '680',
  },
  {
    id: 28,
    field1: '암(4대유사암제외)특정치료비(호스피스완화의료치료)(암전문의료기관Ⅱ(상급종합병원등))(연간1회한)',
    field2: '2000',
    field3: '160',
  },
];
const dummyDataList: DummyDataListType[] = [
  {
    id: 1,
    field1: '한화 시그니처 여성 건강보험4.0 2604',
    field2: ['납입면제형', '납입후50%해약환급금지급형'],
    field3: ['20년납', '100세만기'],
    field4: [
      {
        field1: 103695,
        field2:
          '고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: coverageDummyList,
      },
      {
        field1: 121375,
        field2:
          '02 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: coverageDummyList,
      },
      {
        field1: 159000,
        field2:
          '03 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: coverageDummyList,
      },
    ],
  },
  {
    id: 2,
    field1: '한화 더건강한 한아름종합보험 2604',
    field2: ['납입면제형', '납입후50%해약환급금지급형[할증운영상품]'],
    field3: ['20년납', '100세만기'],
    field4: [
      {
        field1: 89230,
        field2:
          '고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: coverageDummyList,
      },
      {
        field1: 172000,
        field2:
          '02 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: coverageDummyList,
      },
      {
        field1: 182000,
        field2:
          '03 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: coverageDummyList,
      },
    ],
  },
  {
    id: 3,
    field1: '한화 더 경증 간편건강보험(연만기 갱신형)',
    field2: ['해약환급금미지급형', '3.10.5간편고지형'],
    field3: ['20년납', '100세만기'],
    field4: [
      {
        field1: 98000,
        field2:
          '고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: coverageDummyList,
      },
      {
        field1: 108000,
        field2:
          '02 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: coverageDummyList,
      },
      {
        field1: 128000,
        field2:
          '03 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.  <br />현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다. 고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다. <br />목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
        field3: coverageDummyList,
      },
    ],
  },
];

export type LoadingAI = 'type1' | 'type2' | 'type3' | 'type4' | null;

export function Ltpa02002({ userType }: { userType: string }) {
  // 1. Hooks & Refs
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const prevComparedKeysRef = React.useRef<string[]>([]);

  // 2. States (기능 및 비즈니스 영역별로 그룹화)
  // 2-1. 데이터 로딩 및 결과 관련 상태
  const [dataNone, setDataNone] = useState<boolean>(true);
  const [dataList, setDataList] = React.useState<DummyDataListType[]>([]);
  const [loadingAI, setLoadingAI] = React.useState<boolean>(true);
  const [selectedPlanKey, setSelectedPlanKey] = useState<string | null>('1-0');
  const [comparedPlanKeys, setComparedPlanKeys] = useState<string[]>([]);

  // 2-2. 필터 / 아코디언 / 화면 제어 관련 상태
  const [isFilterOptionOpen, setIsFilterOptionOpen] = useState<boolean>(true);
  const [isProductOptionOpen, setIsProductOptionOpen] = useState<string>('상품옵션');
  const [isAiReasonExpanded, setIsAiReasonExpanded] = useState<boolean>(false);

  // 2-3. 추가 정보 / 보장 분석 / 특징 조건 관련 상태
  const [lastInquiryDate, setLastInquiryDate] = useState('');
  const [isCoveragePackage, setIsCoveragePackage] = useState(false);
  const [selectedCoverageValues, setSelectedCoverageValues] = useState<string[]>([]);
  const [coverageSubValues, setCoverageSubValues] = useState<string[]>([]);
  const [selectedAnalysisValue, setSelectedAnalysisValue] = useState('');

  const [simpleType, setSimpleType] = useState<string>('');
  const [noRefundValue, setNoRefundValue] = useState<string>('');
  const [premiumWaiverValue, setPremiumWaiverValue] = useState<string>('');
  const [maturityValue, setMaturityValue] = useState<string>('');

  const [productSearchName, setProductSearchName] = useState<string>('');
  const [isHypertensionChecked, setIsHypertensionChecked] = useState<boolean>(false);
  const [isDiabetesChecked, setIsDiabetesChecked] = useState<boolean>(false);

  const [medicalHistoryList, setMedicalHistoryList] = useState<Array<{ disease: string; period: string }>>([
    { disease: '', period: '' },
    { disease: '', period: '' },
    { disease: '', period: '' },
    { disease: '', period: '' },
  ]);

  // 2-4. 애니메이션 제어 관련 상태
  const [animateCardPhase, setAnimateCardPhase] = useState<'idle' | 'appear' | 'fall'>('idle');
  const [isButtonShaking, setIsButtonShaking] = useState<boolean>(false);

  // 3. Constants & Options (상수 정의)
  const customerType = userType;

  const analysisOptionList = [
    { value: '기계약 유지(부족자금)', label: '기계약 유지(부족자금)' },
    { value: '일부 리모델링', label: '일부 리모델링' },
    { value: '기계약 전체 누적해소', label: '기계약 전체 누적해소' },
  ] as const;

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

  // 4. Derived Values (상태나 프롭으로부터 유도되는 변수)
  const handleDiagnosisToggle = (checked: boolean | 'indeterminate') => {
    const isChecked = checked === true;
    const subItems = ['진단비-암', '진단비-뇌', '진단비-심', '진단비-기타'];

    setSelectedCoverageValues((prev) =>
      isChecked ? (prev.includes('진단비') ? prev : [...prev, '진단비']) : prev.filter((v) => v !== '진단비')
    );

    setCoverageSubValues((prev) =>
      isChecked ? Array.from(new Set([...prev, ...subItems])) : prev.filter((v) => !subItems.includes(v))
    );
  };

  const handleSurgeryToggle = (checked: boolean | 'indeterminate') => {
    const isChecked = checked === true;
    const subItems = ['수술치료-암', '수술치료-뇌', '수술치료-심', '수술치료-기타'];

    setSelectedCoverageValues((prev) =>
      isChecked ? (prev.includes('수술/치료') ? prev : [...prev, '수술/치료']) : prev.filter((v) => v !== '수술/치료')
    );

    setCoverageSubValues((prev) =>
      isChecked ? Array.from(new Set([...prev, ...subItems])) : prev.filter((v) => !subItems.includes(v))
    );
  };

  const handleSubCoverageToggle = (value: string, checked: boolean | 'indeterminate') => {
    const isChecked = checked === true;
    setCoverageSubValues((prev) => {
      const next = isChecked ? (prev.includes(value) ? prev : [...prev, value]) : prev.filter((v) => v !== value);

      const diagnosisSubs = ['진단비-암', '진단비-뇌', '진단비-심', '진단비-기타'];
      const hasDiagnosisSub = diagnosisSubs.some((item) => next.includes(item));
      setSelectedCoverageValues((coveragePrev) =>
        hasDiagnosisSub
          ? coveragePrev.includes('진단비')
            ? coveragePrev
            : [...coveragePrev, '진단비']
          : coveragePrev.filter((v) => v !== '진단비')
      );

      const surgerySubs = ['수술치료-암', '수술치료-뇌', '수술치료-심', '수술치료-기타'];
      const hasSurgerySub = surgerySubs.some((item) => next.includes(item));
      setSelectedCoverageValues((coveragePrev) =>
        hasSurgerySub
          ? coveragePrev.includes('수술/치료')
            ? coveragePrev
            : [...coveragePrev, '수술/치료']
          : coveragePrev.filter((v) => v !== '수술/치료')
      );

      return next;
    });
  };

  const getSelectedTags = () => {
    const tags: string[] = [];

    // 1) 상품관련 (상품옵션 vs 상품선택 OR 조건)
    if (isProductOptionOpen === '상품선택') {
      if (productSearchName.trim()) {
        tags.push(productSearchName.trim());
      }
    } else {
      if (simpleType) tags.push(simpleType);
      if (noRefundValue) tags.push(noRefundValue);
      if (premiumWaiverValue) tags.push(premiumWaiverValue);
      if (maturityValue) tags.push(maturityValue);
    }

    // 2) 추가고지: 고혈압, 당뇨 -> '고혈압, 당뇨' 합침
    const noticeItems: string[] = [];
    if (isHypertensionChecked) noticeItems.push('고혈압');
    if (isDiabetesChecked) noticeItems.push('당뇨');
    if (noticeItems.length > 0) {
      tags.push(noticeItems.join(', '));
    }

    // 3) 보장분석 / 병력사항
    if (selectedAnalysisValue) {
      tags.push(selectedAnalysisValue);
    }
    const hasMedicalHistory = medicalHistoryList.some((item) => item.disease.trim() !== '');
    if (hasMedicalHistory) {
      tags.push('병력사항');
    }

    // 4) 담보군
    if (isCoveragePackage) {
      tags.push('보장패키지');
    }
    const hasCoverageChecked = selectedCoverageValues.length > 0 || coverageSubValues.length > 0;
    if (hasCoverageChecked) {
      tags.push('담보');
    }

    return tags;
  };

  const selectedTags = getSelectedTags();

  // 5. Helper Functions
  const getSelectedPlanInfo = () => {
    if (!selectedPlanKey) return null;
    const [productId, planIndex] = selectedPlanKey.split('-').map(Number);
    const product = dummyDataList.find((item) => item.id === productId);
    if (!product) return null;
    const plan = product.field4[planIndex];
    return { product, plan };
  };

  const selectedPlanInfo = getSelectedPlanInfo();

  // 6. Effects
  // 6-1. 비교하기 체크 애니메이션 효과
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

  // 6-2. 로딩 지연 효과 및 자동 완료 처리 (2초 후 로딩 종료 및 기존 데이터 표시)
  React.useEffect(() => {
    if (!loadingAI) return;

    const timer = setTimeout(() => {
      setDataList(dummyDataList);
      setLoadingAI(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [loadingAI]);

  const handleOnChangeNcMttTpcd = (value: string) => {
    setSimpleType(value);
  };
  const handleOnChangeNcnYn = (value: string) => {
    setNoRefundValue(value);
  };
  const handleOnChangePymXmpYn = (value: string) => {
    setPremiumWaiverValue(value);
  };
  const handleOnChangeNdFlgcd = (value: string) => {
    setMaturityValue(value);
  };
  const handleOnChangeLackAmtCcFlgcd = (value: string) => {
    setSelectedAnalysisValue(value);
  };

  return (
    <Grid className="w-full grid-rows-[auto_minmax(0,1fr)] relative z-0" gap={3}>
      <div className="w-full px-[1rem]">
        <Grow variant={'box-round'} className="w-full gap-[0.8rem] relative z-20" placement="ss">
          <Typo
            tag="h3"
            variant={'heading-sm'}
            className="shrink-0 text-[var(--color-text-blue-gray)] h-[3rem] flex items-center"
          >
            {selectedTags.length > 0 ? '상품특징' : '검색정보'}
          </Typo>
          <Grow placement="bwc" gap={6}>
            <Grow className="w-full">
              <button
                type="button"
                className="w-full p-1 min-h-[3.3rem] h-auto border-b border-b-[var(--color-gray-30)] flex justify-between items-center gap-[0.6rem]"
                onClick={() => setIsFilterOptionOpen((prev) => !prev)}
                aria-expanded={isFilterOptionOpen}
              >
                <span className="w-[100%] flex items-center font-normal flex-wrap gap-1.5 py-0.5 ">
                  {selectedTags.length > 0 ? (
                    <Grow placement="sc" gap={0.5} className="flex-wrap items-center">
                      {selectedTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--color-gray-90)] text-white font-bold min-h-[2.2rem] text-[1.2rem] leading-none shrink-0"
                        >
                          {tag}
                        </span>
                      ))}
                    </Grow>
                  ) : (
                    <Typo tag="div" variant={'body-md'} className="min-h-[2.2rem] flex items-start gap-1">
                      <KebabIcon />
                      상세 검색을 선택하시면 더 정확한 추천 결과를 받아볼 수 있습니다.
                    </Typo>
                  )}
                </span>
                <SelectDropIcon color="var(--color-gray-50)" className={isFilterOptionOpen ? 'rotate-[180deg]' : ''} />
              </button>
            </Grow>
            <Grow>
              <Button
                variant="contained"
                color="coolgray"
                size={'lg'}
                onClick={() => {
                  setDataNone(false);
                  setIsFilterOptionOpen(false);
                  setLoadingAI(true);
                }}
              >
                설계추천
              </Button>
              <Button
                variant="outlined"
                color="gray"
                size={'lg'}
                only="icon"
                aria-label="초기화"
                onClick={() => {
                  setSimpleType('');
                  setNoRefundValue('');
                  setPremiumWaiverValue('');
                  setMaturityValue('');
                  setProductSearchName('');
                  setIsHypertensionChecked(false);
                  setIsDiabetesChecked(false);
                  setMedicalHistoryList([
                    { disease: '', period: '' },
                    { disease: '', period: '' },
                    { disease: '', period: '' },
                    { disease: '', period: '' },
                  ]);
                  setSelectedAnalysisValue('');
                  setIsCoveragePackage(false);
                  setSelectedCoverageValues([]);
                  setCoverageSubValues([]);
                }}
              >
                <ResetIcon />
              </Button>
            </Grow>
          </Grow>
          {isFilterOptionOpen && (
            <Grid
              variant="box-round-b"
              className="absolute top-[calc(100%-.6rem)] left-0 w-full bg-[var(--color-blue-gray-10)] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.1)] pt-2.5 pb-[2.5rem] grid-cols-[1fr_1fr_1fr] gap-[2.4rem] z-10 pl-[6.7rem]! pr-[13.4rem]! justify-stretch! "
              placement="ss"
            >
              {/* 상품특징 */}
              <Gcol gap={2} placement="ss">
                <Gcol placement="ss" gap={1}>
                  <Typo tag="h4" variant={'heading-sm'} color={'blueGray'}>
                    상품관련
                  </Typo>
                  <Gcol placement="ss" className="bg-[#fff] rounded-[0.6rem] p-3" gap={2}>
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
                          variant="noCheckButton"
                          size={'lg'}
                          className="w-full text-left"
                        >
                          {opt.label}
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                    <Gcol className="bg-[var(--color-gray-5)] rounded-[0.4rem] p-2 w-full" placement="ss">
                      {isProductOptionOpen === '상품옵션' ? (
                        <>
                          {/* 간편고지/일반고지 */}
                          <RadioGroup
                            width={'full'}
                            value={simpleType}
                            onValueChange={handleOnChangeNcMttTpcd}
                            className="gap-[0.4rem] w-full grid grid-cols-[1fr_1fr] items-start"
                          >
                            {[
                              { value: '간편고지형', label: '간편고지형' },
                              { value: '일반고지형', label: '일반고지형' },
                            ].map((opt) => (
                              <RadioGroupItem
                                key={opt.value}
                                value={opt.value}
                                variant="button"
                                size={'lg'}
                                className="w-full text-left"
                              >
                                {opt.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                          {/* 무해지 */}
                          <RadioGroup
                            width={'full'}
                            value={noRefundValue}
                            onValueChange={handleOnChangeNcnYn}
                            className="gap-[0.4rem] w-full grid grid-cols-[1fr_1fr] items-start"
                          >
                            {[
                              { value: '무해지형', label: '무해지형' },
                              { value: '기본형', label: '기본형' },
                            ].map((opt) => (
                              <RadioGroupItem
                                key={opt.value}
                                value={opt.value}
                                variant="button"
                                size={'lg'}
                                className="w-full text-left"
                              >
                                {opt.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                          {/* 납면 */}
                          <RadioGroup
                            width={'full'}
                            value={premiumWaiverValue}
                            onValueChange={handleOnChangePymXmpYn}
                            className="gap-[0.4rem] w-full grid grid-cols-[1fr_1fr] items-start"
                          >
                            {[
                              { value: '납입면제형', label: '납입면제형' },
                              { value: '납입면제미운영형', label: '납입면제미운영형' },
                            ].map((opt) => (
                              <RadioGroupItem
                                key={opt.value}
                                value={opt.value}
                                variant="button"
                                size={'lg'}
                                className="w-full text-left tracking-[-0.14rem]"
                              >
                                {opt.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                          {/* 만기 */}
                          <RadioGroup
                            width={'full'}
                            value={maturityValue}
                            onValueChange={handleOnChangeNdFlgcd}
                            className="gap-[0.4rem] w-full grid grid-cols-[1fr_1fr] items-start"
                          >
                            {[
                              { value: '세만기', label: '세만기' },
                              { value: '연만기', label: '연만기' },
                            ].map((opt) => (
                              <RadioGroupItem
                                key={opt.value}
                                value={opt.value}
                                variant="button"
                                size={'lg'}
                                className="w-full text-left"
                              >
                                {opt.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </>
                      ) : (
                        <>
                          <Gcol placement="ss" gap={1}>
                            <Grid className="grid-cols-[1fr_auto] gap-1 items-center w-full">
                              <Input
                                size={'sm'}
                                placeholder="상품명 검색"
                                value={productSearchName}
                                onChange={(e) => setProductSearchName(e.target.value)}
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
                        </>
                      )}
                    </Gcol>
                  </Gcol>
                </Gcol>
                <Gcol placement="ss" gap={1}>
                  <Typo tag="h4" variant={'heading-sm'} color={'blueGray'}>
                    추가고지
                  </Typo>
                  <Gcol placement="ss" className="bg-[#fff] rounded-[0.6rem] p-3" gap={2}>
                    <Grid className="grid-cols-[1fr_1fr] w-full gap-1">
                      <Checkbox
                        checked={isHypertensionChecked}
                        onCheckedChange={(checked) => setIsHypertensionChecked(checked === true)}
                        value="1"
                        variant="button"
                        className="w-full"
                      >
                        고혈압
                      </Checkbox>
                      <Checkbox
                        checked={isDiabetesChecked}
                        onCheckedChange={(checked) => setIsDiabetesChecked(checked === true)}
                        value="2"
                        variant="button"
                        className="w-full"
                      >
                        당뇨
                      </Checkbox>
                    </Grid>
                    <Typo icon="info">추가고지형 있는 상품인 경우에만 적용됩니다.</Typo>
                  </Gcol>
                </Gcol>
              </Gcol>

              {/* 보장분석 or 고지유형 */}
              {customerType === 'recent' ? (
                // 20260810 - 구조 수정
                // 등록고객
                <Gcol placement="ss" gap={1}>
                  <Grow gap={0}>
                    <Typo tag="h4" variant={'heading-sm'} color={'blueGray'}>
                      보장분석
                    </Typo>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant={'none'} size={'md'} only={'icon'}>
                          <QuestionMark color="var(--color-gray-60)" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="start" sideOffset={0}>
                        <dl className="flex flex-col gap-2 divide-y-1 divide-[var(--color-gray-10)] gap-2">
                          <div className="pb-1">
                            <dt className="text-[1.2rem] font-bold text-[#000]">기계약 유지(부족자금)</dt>
                            <dd>
                              <BulletItem type="dot" size="sm">
                                기계약 해약 없이 부족자금에 맞춘 설계
                              </BulletItem>
                            </dd>
                          </div>
                          <div className="pb-1">
                            <dt className="text-[1.2rem] font-bold text-[#000]">일부 리모델링</dt>
                            <dd>
                              <BulletItem type="dot" size="sm">
                                보장분석 컨설팅 저장된 정보 이용
                              </BulletItem>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-[1.2rem] font-bold text-[#000]">기계약 전체 누적해소</dt>
                            <dd>
                              <BulletItem type="dot" size="sm">
                                기계약 해약을 전제로 설계 진행
                              </BulletItem>
                            </dd>
                          </div>
                        </dl>
                      </TooltipContent>
                    </Tooltip>
                  </Grow>
                  <Gcol placement="ss" className="bg-[#fff] rounded-[0.6rem] p-3" gap={2}>
                    <Grow gap={2}>
                      {lastInquiryDate && (
                        <Typo tag="b" variant={'heading-sm'}>
                          {lastInquiryDate}
                        </Typo>
                      )}
                      {lastInquiryDate ? (
                        <>
                          <Typo variant={'body-md'}>보장분석 진행했습니다.</Typo>
                          <Button
                            variant={'contained'}
                            size={'sm'}
                            color={'coolgray-light'}
                            onClick={() => setLastInquiryDate('')}
                          >
                            재조회
                          </Button>
                        </>
                      ) : (
                        <>
                          <Typo variant={'body-md'}>보장분석 진행 시, 정확한 추천이 가능합니다.</Typo>
                          <Button
                            variant={'contained'}
                            size={'sm'}
                            color={'coolgray-light'}
                            onClick={() => setLastInquiryDate('2026-08-01')}
                          >
                            조회
                          </Button>
                        </>
                      )}
                    </Grow>

                    <RadioGroup
                      width={'full'}
                      className="gap-[0.4rem] [&>div]:w-full"
                      value={selectedAnalysisValue}
                      onValueChange={handleOnChangeLackAmtCcFlgcd}
                    >
                      {analysisOptionList.map((opt) => (
                        <RadioGroupItem
                          key={opt.value}
                          value={opt.value}
                          variant="button"
                          size={'md'}
                          disabled={!lastInquiryDate}
                          className="!w-full !text-left"
                        >
                          {opt.label}
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  </Gcol>
                </Gcol>
              ) : (
                <Gcol placement="ss" gap={1}>
                  <Typo tag="h4" variant={'heading-sm'} color={'blueGray'}>
                    병력사항
                  </Typo>
                  <Gcol placement="ss" className="bg-[#fff] rounded-[0.6rem] p-3" gap={2}>
                    <Grid className="grid-cols-[1fr_6.4rem] w-full" gap={1}>
                      <Typo className="text-center">질병명</Typo>
                      <Typo className="text-center">기간</Typo>
                      {medicalHistoryList.map((item, idx) => (
                        <React.Fragment key={idx}>
                          <Input
                            size={'sm'}
                            value={item.disease}
                            readOnly={true}
                            onChange={(e) => {
                              const val = e.target.value;
                              setMedicalHistoryList((prev) => {
                                const next = [...prev];
                                next[idx] = { ...next[idx], disease: val };
                                return next;
                              });
                            }}
                          />
                          <Input
                            size={'sm'}
                            value={item.period}
                            readOnly={true}
                            onChange={(e) => {
                              const val = e.target.value;
                              setMedicalHistoryList((prev) => {
                                const next = [...prev];
                                next[idx] = { ...next[idx], period: val };
                                return next;
                              });
                            }}
                          />
                        </React.Fragment>
                      ))}
                    </Grid>
                    <Grow gap={1} placement="ec" className="w-full">
                      <Grow gap={1} placement="ec">
                        <Button
                          size={'md'}
                          className="w-full font-normal"
                          onClick={() =>
                            setMedicalHistoryList([
                              { disease: '척추관협착증', period: '무관' },
                              { disease: '', period: '' },
                              { disease: '', period: '' },
                              { disease: '', period: '' },
                            ])
                          }
                        >
                          입력/수정
                        </Button>
                        <Button
                          variant={'outlined'}
                          color={'gray-light'}
                          size={'md'}
                          className="w-full font-normal"
                          onClick={() =>
                            setMedicalHistoryList([
                              { disease: '', period: '' },
                              { disease: '', period: '' },
                              { disease: '', period: '' },
                              { disease: '', period: '' },
                            ])
                          }
                        >
                          <ResetIcon size={16} color={'var(--color-gray-60)'} />
                          초기화
                        </Button>
                      </Grow>
                    </Grow>
                  </Gcol>
                </Gcol>
              )}

              {/* 담보군 */}
              <Gcol placement="ss" gap={1}>
                <Typo tag="h4" variant={'heading-sm'} color={'blueGray'}>
                  담보군
                </Typo>
                <Gcol placement="ss" className="bg-[#fff] rounded-[0.6rem] p-3 w-full" gap={2}>
                  <Grow className="w-full">
                    <Button
                      variant={'contained'}
                      color={isCoveragePackage ? 'primary' : 'coolgray-light'}
                      size={'lg'}
                      className="w-full"
                      onClick={() => setIsCoveragePackage((prev) => !prev)}
                    >
                      <PaperIcon />
                      보장패키지
                    </Button>
                  </Grow>
                  <Divider dir="row" color="gray-light" className="w-full" />
                  <Gcol className="gap-1 w-full" placement="ss">
                    <Checkbox
                      value="사망/후유"
                      variant="button"
                      className="w-[9.2rem]"
                      checked={selectedCoverageValues.includes('사망/후유')}
                      onCheckedChange={(checked) => {
                        setSelectedCoverageValues((prev) => {
                          const nextChecked = checked === true;
                          if (nextChecked) {
                            return prev.includes('사망/후유') ? prev : [...prev, '사망/후유'];
                          }
                          return prev.filter((value) => value !== '사망/후유');
                        });
                      }}
                    >
                      사망/후유
                    </Checkbox>
                    <Grow className="w-full" placement="sc">
                      <Checkbox
                        value="진단비"
                        variant="button"
                        className="w-[9.2rem]"
                        checked={selectedCoverageValues.includes('진단비')}
                        onCheckedChange={handleDiagnosisToggle}
                      >
                        진단비
                      </Checkbox>
                      <Grow variant="box" className="h-[2.8rem] py-0 px-2 rounded-[0.4rem] gap-3 w-full" placement="sc">
                        <Checkbox
                          size="sm"
                          checked={coverageSubValues.includes('진단비-암')}
                          onCheckedChange={(checked) => handleSubCoverageToggle('진단비-암', checked)}
                        >
                          암
                        </Checkbox>
                        <Checkbox
                          size="sm"
                          checked={coverageSubValues.includes('진단비-뇌')}
                          onCheckedChange={(checked) => handleSubCoverageToggle('진단비-뇌', checked)}
                        >
                          뇌
                        </Checkbox>
                        <Checkbox
                          size="sm"
                          checked={coverageSubValues.includes('진단비-심')}
                          onCheckedChange={(checked) => handleSubCoverageToggle('진단비-심', checked)}
                        >
                          심장
                        </Checkbox>
                        <Checkbox
                          size="sm"
                          checked={coverageSubValues.includes('진단비-기타')}
                          onCheckedChange={(checked) => handleSubCoverageToggle('진단비-기타', checked)}
                        >
                          기타
                        </Checkbox>
                      </Grow>
                    </Grow>
                    <Checkbox
                      value="입원/통원"
                      variant="button"
                      className="w-[9.2rem]"
                      checked={selectedCoverageValues.includes('입원/통원')}
                      onCheckedChange={(checked) => {
                        setSelectedCoverageValues((prev) => {
                          const nextChecked = checked === true;
                          if (nextChecked) {
                            return prev.includes('입원/통원') ? prev : [...prev, '입원/통원'];
                          }
                          return prev.filter((value) => value !== '입원/통원');
                        });
                      }}
                    >
                      입원/통원
                    </Checkbox>
                    <Grow className="w-full" placement="sc">
                      <Checkbox
                        value="수술/치료"
                        variant="button"
                        className="w-[9.2rem]"
                        checked={selectedCoverageValues.includes('수술/치료')}
                        onCheckedChange={handleSurgeryToggle}
                      >
                        수술/치료
                      </Checkbox>
                      <Grow variant="box" className="h-[2.8rem] py-0 px-2 rounded-[0.4rem] gap-3 w-full" placement="sc">
                        <Checkbox
                          size="sm"
                          checked={coverageSubValues.includes('수술치료-암')}
                          onCheckedChange={(checked) => handleSubCoverageToggle('수술치료-암', checked)}
                        >
                          암
                        </Checkbox>
                        <Checkbox
                          size="sm"
                          checked={coverageSubValues.includes('수술치료-뇌')}
                          onCheckedChange={(checked) => handleSubCoverageToggle('수술치료-뇌', checked)}
                        >
                          뇌
                        </Checkbox>
                        <Checkbox
                          size="sm"
                          checked={coverageSubValues.includes('수술치료-심')}
                          onCheckedChange={(checked) => handleSubCoverageToggle('수술치료-심', checked)}
                        >
                          심장
                        </Checkbox>
                        <Checkbox
                          size="sm"
                          checked={coverageSubValues.includes('수술치료-기타')}
                          onCheckedChange={(checked) => handleSubCoverageToggle('수술치료-기타', checked)}
                        >
                          기타
                        </Checkbox>
                      </Grow>
                    </Grow>
                    <Checkbox
                      value="골절/화상"
                      variant="button"
                      className="w-[9.2rem]"
                      checked={selectedCoverageValues.includes('골절/화상')}
                      onCheckedChange={(checked) => {
                        setSelectedCoverageValues((prev) => {
                          const nextChecked = checked === true;
                          if (nextChecked) {
                            return prev.includes('골절/화상') ? prev : [...prev, '골절/화상'];
                          }
                          return prev.filter((value) => value !== '골절/화상');
                        });
                      }}
                    >
                      골절/화상
                    </Checkbox>
                    <Checkbox
                      value="검사/지원"
                      variant="button"
                      className="w-[9.2rem]"
                      checked={selectedCoverageValues.includes('검사/지원')}
                      onCheckedChange={(checked) => {
                        setSelectedCoverageValues((prev) => {
                          const nextChecked = checked === true;
                          if (nextChecked) {
                            return prev.includes('검사/지원') ? prev : [...prev, '검사/지원'];
                          }
                          return prev.filter((value) => value !== '검사/지원');
                        });
                      }}
                    >
                      검사/지원
                    </Checkbox>
                  </Gcol>
                </Gcol>
              </Gcol>
            </Grid>
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
              onClick={() => {
                setDataNone(false);
              }}
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
          <Grid
            className="w-[calc(100vw + 2rem)] h-full grid-rows-[minmax(0,1fr)] grid-cols-[minmax(64rem,2fr)_minmax(48rem,1fr)] gap-4 items-stretch overflow-hidden bg-[var(--color-gray-5)] p-[2rem] "
            gap={3}
          >
            {/* 리스트 */}
            {loadingAI ? (
              <div className="relative w-full h-full after:content-[''] after:block after:absolute after:pointer-events-none after:bottom-0 after:left-0 after:w-[100%] after:h-[3.4rem] after:bg-gradient-to-b after:from-transparent after:to-[#F4F4F4] after:z-10">
                <div className="relative overflow-y-auto w-full h-full gray-scroll">
                  <Gcol
                    className="absolute top-0 left-0 w-full h-full after:content-[''] after:block after:w-full after:min-h-[1.6rem]"
                    gap={3}
                    placement="ss"
                  >
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Grid
                        key={i}
                        className="w-full px-[2.4rem] py-[1.6rem] grid-cols-[1fr_auto] gap-4 place-items-center bg-white rounded-[3.2rem_0.6rem] shadow-[0_0.2rem_0.4rem_0_rgba(0,0,0,0.1)] min-h-[19.1rem]"
                      >
                        <AiSpinner size={'10rem'} />
                      </Grid>
                    ))}
                  </Gcol>
                </div>
              </div>
            ) : (
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
                        className="w-full px-[2.4rem] py-[1.6rem] grid-cols-[1fr_auto] gap-4 place-items-center bg-white rounded-[3.2rem_0.6rem] shadow-[0_0.2rem_0.4rem_0_rgba(0,0,0,0.1)] min-h-[19.1rem]"
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
                              <React.Fragment key={idx}>
                                {idx > 0 && <Divider variant="dot" color="gray-dark" />}
                                <Typo tag="p" variant="body-sm">
                                  {v}
                                </Typo>
                              </React.Fragment>
                            ))}
                          </Grow>
                          <Grow placement="ss">
                            {item.field3.map((v, idx) => (
                              <Grow
                                key={idx}
                                className="py-[0.5rem] px-2 rounded-[0.6rem] bg-[var(--color-warning-5)]"
                                placement="ss"
                              >
                                <Typo tag="p" variant="body-sm">
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
                                className={`relative grid-rows-[minmax(0,1fr)_auto] w-[13rem] h-[15.9rem] rounded-[1rem] overflow-hidden transition-all gap-0 border-[0.2rem] ${
                                  isSelected
                                    ? 'border-[#FF5C2E] bg-[var(--color-primary-10)] shadow-[0_0.4rem_0.8rem_0_rgba(255,92,46,0.20)]'
                                    : 'border-transparent bg-[var(--color-primary-5)] shadow-[inset_0_0_0_0.1rem_rgba(0,0,0,0.1)]'
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
                                    <circle
                                      cx="30.5"
                                      cy="29.5"
                                      r="9.5"
                                      fill={isSelected ? 'rgba(255, 255, 255, 0.3)' : 'var(--color-primary-20)'}
                                    />
                                    <path
                                      d="M18.9854 22.4062C19.7586 22.4062 20.3857 23.0334 20.3857 23.8066C20.3857 24.5798 19.7585 25.207 18.9854 25.207H11.8066C11.0335 25.207 10.4063 24.5798 10.4062 23.8066C10.4062 23.0334 11.0334 22.4062 11.8066 22.4062H18.9854Z"
                                      fill={isSelected ? '#FFFFFF' : '#61554F'}
                                    />
                                    <path
                                      d="M22.6484 16.3994C23.4215 16.3996 24.0479 17.0267 24.0479 17.7998C24.0479 18.5729 23.4215 19.2 22.6484 19.2002H11.8066C11.0334 19.2002 10.4062 18.573 10.4062 17.7998C10.4062 17.0266 11.0334 16.3994 11.8066 16.3994H22.6484Z"
                                      fill={isSelected ? '#FFFFFF' : '#61554F'}
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M23.8057 4C25.5194 4.00002 27.1515 4.73281 28.29 6.01367L32.9844 11.2949C33.9606 12.3932 34.5 13.8118 34.5 15.2812V31C34.5 34.3137 31.8137 37 28.5 37H11.5L11.1914 36.9922C8.02111 36.8316 5.5 34.2102 5.5 31V10C5.5 6.68629 8.18629 4 11.5 4H23.8057ZM11.5 6.59961C9.62223 6.59961 8.09961 8.12223 8.09961 10V31C8.09961 32.8778 9.62223 34.4004 11.5 34.4004H28.5C30.3778 34.4004 31.9004 32.8778 31.9004 31V15.2998H28.5C25.5729 15.2998 23.2002 12.9271 23.2002 10V6.59961H11.5ZM25.7998 10C25.7998 11.4912 27.0088 12.7002 28.5 12.7002H30.7549L26.3467 7.74121C26.1814 7.55526 25.9979 7.38952 25.7998 7.24609V10Z"
                                      fill={isSelected ? '#FFFFFF' : '#61554F'}
                                    />
                                  </svg>
                                  <Gcol placement="ss" gap={0}>
                                    <Typo
                                      tag="p"
                                      variant="body-sm"
                                      className={isSelected ? 'text-white' : 'text-[var(--color-gray-70)]'}
                                    >
                                      예상보험료
                                    </Typo>
                                    <Typo
                                      tag="p"
                                      variant="heading-xl"
                                      className={isSelected ? 'text-white' : 'text-[var(--color-primary-50)]'}
                                    >
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
            )}
            {/* 상세 */}
            {loadingAI ? (
              <Gcol className="h-full max-h-[59.6rem]" placement="cc">
                <PuzzleSpinner />
              </Gcol>
            ) : selectedPlanInfo ? (
              <Grid
                className="w-full h-full rounded-[1rem] border border-[#FF5C2E] bg-white shadow-[0_0.2rem_0.2rem_0_rgba(255,92,46,0.2)] overflow-hidden grid-rows-[auto_minmax(0,1fr)_auto] max-h-[59.6rem]"
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

                <Grid className="px-[1rem] pb-0 pt-[0.8rem] gap-[0.8rem] grid-rows-[auto_minmax(0,1fr)]">
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
                  className="w-full bg-[var(--color-warning-5)] h-[3rem] px-4 shadow-[0_-0.1rem_0.8rem_0_rgba(0,0,0,0.1)] class-expected-premium-bar"
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
            ) : (
              /* 추천설계 사용 가이드 (플랜 미선택 시 노출) */
              <Grid
                className="w-full h-full rounded-[1rem] border border-[#FF5C2E] bg-white shadow-[0_0.2rem_0.2rem_0_rgba(255,92,46,0.2)] overflow-hidden grid-rows-[auto_minmax(0,1fr)] max-h-[59.6rem]"
                gap={0}
              >
                <Gcol
                  className="relative px-[1.6rem] py-[1.2rem] gap-[0.2rem] rounded-b-[1rem]"
                  placement="ss"
                  style={{
                    backgroundImage: `url(${withPublicUrl('/images/Ltpa020/cand_on_bg.png')}), linear-gradient(358deg,#FF5C2E 9.4%,#FF8D02 97.24%)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '10rem, cover',
                    backgroundPosition: '96% 107%',
                  }}
                >
                  <Typo
                    tag="strong"
                    variant="heading-sm"
                    weight="bold"
                    className="text-white flex items-center gap-1.5 text-[1.5rem]"
                  >
                    <Ai2Icon size={20} color="white" />
                    추천설계 사용 가이드
                  </Typo>
                </Gcol>

                <Gcol className="overflow-y-auto gap-4 px-6 pb-5 pt-[5vh]" placement="sc">
                  {/* 타임라인 / 가이드 스텝 3단계 */}
                  <Gcol className="relative gap-0 h-full" placement="sc">
                    <div className="h-[10rem] overflow-hidden">
                      <Image src={withPublicUrl('/images/Ltpa020/info.png')} alt="" width={110} height={127} />
                    </div>
                    <ol className="flex flex-col gap-2 pb-5 ltpa020-guide-line">
                      <li className="relative z-1 flex items-start gap-3 w-full">
                        <div className="shrink-0 w-[1.8rem] h-[1.8rem] rounded-[0.4rem] bg-[#009443] text-white flex items-center justify-center font-bold text-[1.1rem] leading-none mt-2">
                          1
                        </div>
                        <div className="flex flex-col gap-1 bg-[#F4F4F5] py-[0.8rem] px-[1.2rem] rounded-[1rem] w-full">
                          <span className="font-bold text-[#00AA4D] text-[1.2rem]">보장내용 상세보기</span>
                          <p className="text-[1.2rem] text-[#000] leading-[1.45] break-keep">
                            추천결과 카드를 선택하여,
                            <br /> 자세한 보장내용과 보험료를 확인해 보세요.
                          </p>
                        </div>
                      </li>
                      <li className="relative z-1 flex items-start gap-3 w-full">
                        {/* Step 2: 추천설계 비교하기 */}
                        <div className="shrink-0 w-[1.8rem] h-[1.8rem] rounded-[0.4rem] bg-[#338CF5] text-white flex items-center justify-center font-bold text-[1.1rem] leading-none mt-2">
                          2
                        </div>
                        <div className="flex flex-col gap-1 bg-[#F4F4F5] py-[0.8rem] px-[1.2rem] rounded-[1rem] w-full">
                          <span className="font-bold text-[#006FF2] text-[1.2rem]">추천설계 비교하기</span>
                          <p className="text-[1.2rem] text-[#000] leading-[1.45] break-keep">
                            카드별 &apos;비교하기&apos; 체크하신 후,
                            <br /> [추천설계비교]를 클릭하여 비교해 보세요. 3개까지 가능해요.
                          </p>
                        </div>
                      </li>
                      <li className="relative z-1 flex items-start gap-3 w-full">
                        {/* Step 3: 설계 진행하기 */}
                        <div className="shrink-0 w-[1.8rem] h-[1.8rem] rounded-[0.4rem] bg-[#FF5C2E] text-white flex items-center justify-center font-bold text-[1.1rem] leading-none mt-2">
                          3
                        </div>
                        <div className="flex flex-col gap-1 bg-[#F4F4F5] py-[0.8rem] px-[1.2rem] rounded-[1rem] w-full">
                          <span className="font-bold text-[#FF5C2E] text-[1.2rem]">설계 진행하기</span>
                          <p className="text-[1.2rem] text-[#000] leading-[1.45] break-keep">
                            아래의 [설계생성]을 클릭하면 가입설계 탭이 열립니다.
                            <br /> 여기에서 담보 조정 등으로 최적의 설계를 진행하시기 바랍니다.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </Gcol>
                </Gcol>
              </Grid>
            )}
          </Grid>
          <Grow gap={1} className="w-full min-h-[3.2rem] pb-2.5 px-2" placement="ec">
            <Button
              variant={'outlined'}
              color={'gray'}
              size={'xl'}
              disabled={comparedPlanKeys.length === 0}
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
              <AiIcon size={18} color={'#006FF2'} color2={'#A683FF'} />
              추천설계비교({comparedPlanKeys.length})
            </Button>
            <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
              설계생성({comparedPlanKeys.length})
              <ArrowNext size={16} />
            </Button>
          </Grow>
        </>
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
