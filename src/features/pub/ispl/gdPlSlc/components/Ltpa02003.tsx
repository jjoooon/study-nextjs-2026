/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Grid, Typo, Divider } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { AiSpinner, PuzzleSpinner, Spinner } from '@common/SpinnerRoot';
import { HeaderWithUnit } from '@grid/HeadRenderers';
import {
  Ai2Icon,
  SelectDropIcon,
  SearchIcon,
  ResetIcon,
  AdderIcon,
  ArrowNext,
  KebabIcon,
  PaperIcon,
  FolderSearch,
  AiIcon,
  ArrowIcon,
} from '@icons';
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
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import Image from 'next/image';
import { useState } from 'react';
import * as React from 'react';
import { AiBotIcon } from '@/shared/components/features/AiBotIcon';
import { withPublicUrl } from '@/shared/utils/url/publicUrl';

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
  field5?: string;
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
    field1:
      '한화 시그니처 여성 간편건강보험4.0 2604한화 시그니처 여성 간편건강보험4.0 2604한화 시그니처 여성 간편건강보험4.0 2604한화 시그니처 여성 간편건강보험4.0 2604한화 시그니처 여성 간편건강보험4.0 2604',
    field2: ['납입면제형', '납입후 50%해약환급금지급형', '3N5간편고지형'],
    field3: ['20년납', '100세만기'],
    field5: '3.10.5간편고지형(고당지뇌심관폐추가고지)',
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
    field2: ['납입면제형', '납입후 50%해약환급금지급형[할증운영상품]'],
    field3: ['20년납', '100세만기'],
    field5: '3.10.5간편고지형(고당지뇌심관폐추가고지)',
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
    field5: '3.10.5간편고지형(고당지뇌심관폐추가고지)',
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
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

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
    {
      value: '1',
      label: (
        <Grow className="flex-wrap gap-y-0 ga-x-1" placement="ss">
          <span>
            <b className="text-[var(--color-primary-50)]">기계약 유지</b>하고, <b>부족한 담보를 중심</b>으로 한 설계
          </span>
        </Grow>
      ),
    },
    {
      value: '2',
      label: (
        <Grow>
          <span>
            기계약과의 누적을{' '}
            <b>
              체크하지 <span className="text-[var(--color-primary-50)]">않은</span> 설계
            </b>
          </span>
        </Grow>
      ),
    },
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
      headerComponent: HeaderWithUnit,
      headerComponentParams: {
        label: '가입금액',
        unit: '(만원)',
      },
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(84),
      cellClass: 'text-right',
      headerClass: '!text-[1.1rem] leading-[2.6rem]',
      valueFormatter: numberValueFormatter<DummyDataListDetailType>,
    },
    {
      headerName: '보험료(원)',
      headerComponent: HeaderWithUnit,
      headerComponentParams: {
        label: '보험료',
        unit: '(원)',
      },
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

    // 3) 보장분석 / 병력사항 (등록/미등록 상황에 따라 분기)
    if (customerType === 'recent') {
      if (selectedAnalysisValue) {
        tags.push('보장분석');
      }
    } else {
      const hasMedicalHistory = medicalHistoryList.some((item) => item.disease.trim() !== '');
      if (hasMedicalHistory) {
        tags.push('병력사항');
      }
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
    }, 2000);

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
    <Grid className="w-full grid-rows-[auto_minmax(0,1fr)] px-[1rem]" gap={3}>
      <Grow variant={'box-round'} className="w-full gap-[0.8rem] relative" placement="ss">
        <Typo
          tag="h3"
          variant={'heading-sm'}
          className="shrink-0 text-[var(--color-text-blue-gray)] h-[2.8rem] flex items-center"
        >
          선택항목
        </Typo>
        <Grow placement="bwc" gap={6}>
          <Grow className="w-full">
            <button
              type="button"
              className="w-full p-1 min-h-[2.8rem] h-auto flex justify-between items-center gap-[0.6rem]"
              onClick={() => setIsFilterOptionOpen((prev) => !prev)}
              aria-expanded={isFilterOptionOpen}
            >
              <span className="w-[100%] flex items-center font-normal flex-wrap gap-1.5 py-0.5 ">
                {selectedTags.length > 0 ? (
                  <Grow placement="sc" gap={0.5} className="flex-wrap items-center">
                    {selectedTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#817772] text-white font-bold min-h-[2.2rem] text-[1.2rem] leading-none shrink-0"
                      >
                        {tag}
                      </span>
                    ))}
                  </Grow>
                ) : (
                  <Typo tag="div" variant={'body-md'} className="min-h-[2.2rem] flex items-start gap-1">
                    <KebabIcon />
                    아래 영역에서 항목을 선택하시면, 더 정확한 추천을 받아볼 수 있습니다.
                  </Typo>
                )}
              </span>
              <SelectDropIcon color="var(--color-gray-50)" className={isFilterOptionOpen ? 'rotate-[180deg]' : ''} />
            </button>
          </Grow>
        </Grow>
      </Grow>

      {isFilterOptionOpen ? (
        <Grid className="grid-cols-[32rem_1fr] grid-rows-[1fr_auto] w-full gap-3">
          {/* 바로 추천 */}
          <Gcol
            placement="bws"
            className="p-[3.2rem] border border-[var(--color-primary-50)] border-[0.3rem] rounded-[1rem]"
          >
            <Gcol placement="ss">
              <img src="/images/Ltpa020/icon_ai.png" alt="" style={{ width: '3.2rem' }} />
              <Typo
                tag="h3"
                className="text-[2.2rem] font-bold text-[var(--color-gray-70)] font-noto leading-[1.3] mb-[2rem]"
              >
                추가 입력없이 빠르게 <br />
                <b className="text-[var(--color-primary-50)]">
                  고객 정보만으로 <br />
                  바로 추천받으세요!
                </b>
              </Typo>
              <Typo variant={'body-md'} color="gray" className="mb-[0.6rem]">
                고객의 나이ㆍ성별ㆍ직업만으로 AI가 <br />
                기본 설계안을 만들어서 추천합니다.
              </Typo>
              <Typo variant={'body-md'} color="primary" className="font-bold mb-[0.6rem] mb-[3.2rem]">
                ※ 오른쪽 조건은 입력하지 않아도 됩니다.
              </Typo>
              <Button
                variant="contained"
                className="min-h-[4.4rem] w-full rounded-[0.4rem] text-[1.5rem] font-bold gap-1"
                onClick={() => {
                  setDataNone(false);
                  setIsFilterOptionOpen(false);
                  setLoadingAI(true);
                }}
              >
                지금 바로 추천받기
                <ArrowIcon color="#fff" size={16} className="rotate-180" />
              </Button>
            </Gcol>
            <Gcol placement="cc">
              <img src="/images/Ltpa020/img.png" alt="" style={{ width: '24rem' }} />
            </Gcol>
          </Gcol>

          {/* 선택 추천 */}
          <Gcol placement="ss" variant="box-round" className="px-[3.2rem] pt-[3.2rem] pb-[2rem] gap-y-[2rem]">
            <Grow className="w-full" placement="bwe">
              <Typo tag="h3" variant={'heading-lg'}>
                더 정확하게 추천받고 싶다면 <br />
                아래 내용을 선택하세요.
              </Typo>
              <Button
                color="coolgray-light"
                onClick={() => setIsGuideOpen(true)}
                variant="contained"
                className="text-[1.3rem] h-[3.6rem] px-[1rem]"
              >
                <PaperIcon />
                추천설계 이용가이드
              </Button>
            </Grow>

            <Grid className="w-full grid-cols-[minmax(0,10fr)_13fr_minmax(0,10fr)] gap-2">
              {/* 상품유형 */}
              <Gcol gap={4} placement="ss" className="bg-[#fff] rounded-[0.6rem] p-4">
                <Typo tag="h4" variant={'heading-md'}>
                  상품유형
                </Typo>
                <Gcol placement="ss" gap={2}>
                  <RadioGroup
                    variant="tab"
                    width={'full'}
                    value={isProductOptionOpen}
                    defaultValue={isProductOptionOpen}
                    onValueChange={(value) => setIsProductOptionOpen(value)}
                    className="w-full bg-[var(--color-gray-5)] rounded-[0.6rem] grid grid-cols-2 border-b-0! border-none!"
                  >
                    {[
                      { value: '상품옵션', label: '상품옵션' },
                      { value: '상품선택', label: '상품선택' },
                    ].map((opt, idx) => (
                      <RadioGroupItem
                        key={'po' + idx}
                        value={opt.value}
                        size={'lg'}
                        className="w-full h-[3.4rem] rounded-[0.6rem]! text-[1.2rem] font-bold transition-all flex items-center justify-center cursor-pointer border border-transparent text-[#6B7280] bg-transparent transition-none!  hover:bg-transparent hover:text-[var(--color-primary-50)] hover:border-0 data-[state=checked]:bg-white! data-[state=checked]:text-[#414141]! data-[state=checked]:border-[var(--color-gray-30)]! data-[state=checked]:shadow-[0_0.2rem_0.4rem_0_#273D751A]! data-[state=checked]:border-t-[0.1rem]! data-[state=checked]:border-l-[0.1rem]! data-[state=checked]:border-r-[0.1rem]! data-[state=checked]:border-b-[0.1rem]! data-[state=checked]:-mb-0!"
                      >
                        {opt.label}
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                  <Gcol className="px-1 w-full" placement="ss">
                    {isProductOptionOpen === '상품옵션' ? (
                      <Gcol className="px-2 gap-0">
                        {/* 일반고지/간편고지 */}
                        <RadioGroup
                          width={'full'}
                          value={simpleType}
                          onValueChange={handleOnChangeNcMttTpcd}
                          className="w-full flex flex-col items-start py-4 gap-2 border-b border-dashed border-[#D8D8D8]"
                        >
                          {[
                            { value: '일반고지', label: '일반고지' },
                            { value: '간편고지', label: '간편고지' },
                          ].map((opt) => (
                            <RadioGroupItem key={opt.value} value={opt.value} size={'lg'}>
                              {opt.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                        {/* 무해지 */}
                        <RadioGroup
                          width={'full'}
                          value={noRefundValue}
                          onValueChange={handleOnChangeNcnYn}
                          className="w-full flex flex-col items-start py-4 border-b border-dashed border-[#D8D8D8]"
                        >
                          {[
                            { value: '무해지형', label: '무해지형' },
                            { value: '기본형', label: '기본형' },
                          ].map((opt) => (
                            <RadioGroupItem key={opt.value} value={opt.value} size={'lg'}>
                              {opt.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                        {/* 납면 */}
                        <RadioGroup
                          width={'full'}
                          value={premiumWaiverValue}
                          onValueChange={handleOnChangePymXmpYn}
                          className="w-full flex flex-col items-start py-4 border-b border-dashed border-[#D8D8D8]"
                        >
                          {[
                            { value: '납입면제형', label: '납입면제형' },
                            { value: '납입면제미운영형', label: '납입면제미운영형' },
                          ].map((opt) => (
                            <RadioGroupItem key={opt.value} value={opt.value} size={'lg'}>
                              {opt.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                        {/* 만기 */}
                        <RadioGroup
                          width={'full'}
                          value={maturityValue}
                          onValueChange={handleOnChangeNdFlgcd}
                          className="w-full flex flex-col items-start pt-[1.6rem] pb-[0.2rem]"
                        >
                          {[
                            { value: '세만기', label: '세만기' },
                            { value: '연만기', label: '연만기' },
                          ].map((opt) => (
                            <RadioGroupItem key={opt.value} value={opt.value} size={'lg'}>
                              {opt.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </Gcol>
                    ) : (
                      <Gcol className="w-full pt-[0.8rem]" placement="ss">
                        <Grid className="grid-cols-[1fr_auto] gap-1 items-center w-full pb-[1.2rem] border-b border-dashed border-[#D8D8D8]">
                          <Input
                            size={'xl'}
                            placeholder="상품명 검색"
                            value={productSearchName}
                            onChange={(e) => setProductSearchName(e.target.value)}
                          />
                          <Button
                            variant={'outlined'}
                            color={'gray-light'}
                            size={'xl'}
                            only={'icon'}
                            aria-label="상품 검색"
                            className="border-[#D8D8D8]"
                          >
                            <SearchIcon color="var(--color-primary-50)" />
                          </Button>
                        </Grid>
                        <Typo
                          tag="p"
                          variant={'body-xs'}
                          className="text-[var(--color-gray-70)] text-[1.2rem] leading-[1.8rem] pt-[1rem] break-all"
                        >
                          N종, 납입중50%해약환급금지급형
                          <span className="text-[var(--color-gray-50)] select-none mx-[0.6rem]">•</span>
                          납입면제 운영형
                          <span className="text-[var(--color-gray-50)] select-none mx-[0.6rem]">•</span>
                          3N52간편고지형Ⅲ
                        </Typo>
                      </Gcol>
                    )}
                  </Gcol>
                </Gcol>
                {/* <Gcol placement="ss" gap={1}>
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
                        고혈압 있어요
                      </Checkbox>
                      <Checkbox
                        checked={isDiabetesChecked}
                        onCheckedChange={(checked) => setIsDiabetesChecked(checked === true)}
                        value="2"
                        variant="button"
                        className="w-full"
                      >
                        당뇨 있어요
                      </Checkbox>
                    </Grid>
                    <Typo icon="info">추가고지형 있는 상품인 경우에만 적용됩니다.</Typo>
                  </Gcol>
                </Gcol> */}
              </Gcol>

              {/* 설계유형 or 보장패키지 */}
              <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={2}>
                <Gcol placement="ss" className="bg-[#fff] rounded-[0.6rem] p-3 w-full" gap={5}>
                  <Gcol placement="ss">
                    <Typo tag="h4" variant={'heading-md'}>
                      보장패키지
                    </Typo>
                    <Typo variant={'body-sm'} color="blueGray">
                      보장패키지 선택 시, 담보군이 포함된 <br />
                      설계안을 찾습니다.
                    </Typo>
                  </Gcol>
                  <Button
                    variant={'contained'}
                    color="coolgray"
                    size={'xl'}
                    className="text-[1.3rem] h-[3.6rem] w-full px-[1rem] bg-[var(--color-blue-gray-60)]"
                    onClick={() => setIsCoveragePackage((prev) => !prev)}
                  >
                    <PaperIcon />
                    보장패키지 선택
                  </Button>
                </Gcol>

                <Gcol placement="ss" className="bg-[#fff] rounded-[0.6rem] p-3 w-full" gap={2}>
                  {customerType === 'recent' ? (
                    <Gcol placement="ss" gap={3}>
                      <Gcol placement="ss">
                        <Typo tag="h4" variant={'heading-md'}>
                          설계유형
                        </Typo>
                        <Typo variant={'body-sm'} color="blueGray">
                          보장분석 진행하면 기계약을 확인할 수 있습니다.
                        </Typo>
                      </Gcol>
                      <Gcol placement="ss" gap={5}>
                        <RadioGroup
                          width={'full'}
                          className="gap-[0.6rem] flex-col"
                          value={selectedAnalysisValue}
                          onValueChange={handleOnChangeLackAmtCcFlgcd}
                        >
                          {analysisOptionList.map((opt) => (
                            <RadioGroupItem
                              key={opt.value}
                              value={opt.value}
                              variant="button"
                              size={'xl'}
                              disabled={!lastInquiryDate}
                              className="!w-full !text-left whitespace-normal h-auto items-center break-keep rounded-[0.6rem]"
                            >
                              {opt.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>

                        <Grow gap={2}>
                          {lastInquiryDate && (
                            <Typo tag="b" variant={'heading-sm'}>
                              {lastInquiryDate}
                            </Typo>
                          )}
                          {lastInquiryDate ? (
                            <>
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
                              <Button
                                variant={'text'}
                                color={'link'}
                                className="font-bold"
                                onClick={() => setLastInquiryDate('2026-08-01')}
                              >
                                보장분석 조회
                                <ArrowIcon className="rotate-180" />
                              </Button>
                            </>
                          )}
                        </Grow>
                      </Gcol>
                    </Gcol>
                  ) : (
                    <Gcol placement="ss" gap={5}>
                      <Gcol placement="ss">
                        <Typo tag="h4" variant={'heading-md'}>
                          병력사항
                        </Typo>
                        <Typo variant={'body-sm'} color="blueGray">
                          질병정보를 이용해 예상고지유형을 확인합니다.
                        </Typo>
                      </Gcol>
                      <ul className="w-full">
                        {medicalHistoryList.map((item, idx) => (
                          <li
                            key={idx}
                            className="grid grid-cols-[1fr_auto] items-center gap-2 w-full border-b border-dashed border-[#D8D8D8] h-[3.2rem]"
                          >
                            <Typo tag="b" variant="heading-sm" color="secondary" tooltip="1">
                              {item.disease}
                            </Typo>
                            <span className="text-[1.2rem] shrink-0">{item.period}</span>
                          </li>
                        ))}
                      </ul>
                      <Grow gap={1} placement="ec" className="w-full">
                        <Button
                          size={'lg'}
                          color={'secondary'}
                          className="font-[700]!"
                          onClick={() =>
                            setMedicalHistoryList([
                              { disease: '척추관협착증척추관협착증척추관협착증척추관협착증', period: '기간 무관' },
                              { disease: '척추관협착증', period: '10년내' },
                              { disease: '척추관협착증', period: '10년내' },
                              { disease: '척추관협착증', period: '10년내' },
                            ])
                          }
                        >
                          입력/수정
                        </Button>
                        <Button
                          variant={'outlined'}
                          color={'gray-light'}
                          size={'lg'}
                          className="font-normal"
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
                    </Gcol>
                  )}
                </Gcol>
              </Grid>

              {/* 희망담보 */}
              <Gcol placement="ss" className="bg-[#fff] rounded-[0.6rem] p-3 w-full" gap={5}>
                <Gcol placement="ss">
                  <Typo tag="h4" variant={'heading-md'}>
                    희망담보
                  </Typo>
                  <Typo variant={'body-sm'} color="blueGray">
                    선택한 담보 위주로 설계
                  </Typo>
                </Gcol>
                <Gcol placement="ss" gap={0}>
                  <div className="w-full flex flex-col items-start py-3 border-b border-dashed border-[#D8D8D8]">
                    <Checkbox
                      value="사망/후유"
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
                  </div>

                  <Gcol
                    className="w-full flex flex-col items-start py-3 border-b border-dashed border-[#D8D8D8]"
                    placement="ss"
                    gap={3}
                  >
                    <Checkbox
                      value="진단비"
                      checked={selectedCoverageValues.includes('진단비')}
                      onCheckedChange={handleDiagnosisToggle}
                    >
                      진단비
                    </Checkbox>
                    <Grow placement="sc" className="pl-[1rem]" gap={3}>
                      <div className="w-[0.8rem] h-[0.8rem] border-l-[0.1rem] border-b-[0.1rem] border-l-[var(--color-secondary-60)] border-b-[var(--color-secondary-60)] rounded-[0_0_0_0.2rem]"></div>
                      <Checkbox
                        checked={coverageSubValues.includes('진단비-암')}
                        onCheckedChange={(checked) => handleSubCoverageToggle('진단비-암', checked)}
                      >
                        암
                      </Checkbox>
                      <Checkbox
                        checked={coverageSubValues.includes('진단비-뇌')}
                        onCheckedChange={(checked) => handleSubCoverageToggle('진단비-뇌', checked)}
                      >
                        뇌
                      </Checkbox>
                      <Checkbox
                        checked={coverageSubValues.includes('진단비-심')}
                        onCheckedChange={(checked) => handleSubCoverageToggle('진단비-심', checked)}
                      >
                        심장
                      </Checkbox>
                    </Grow>
                  </Gcol>
                  <div className="w-full flex flex-col items-start py-3 border-b border-dashed border-[#D8D8D8]">
                    <Checkbox
                      value="입원/통원"
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
                  </div>
                  <Gcol
                    className="w-full flex flex-col items-start py-3 border-b border-dashed border-[#D8D8D8]"
                    placement="ss"
                  >
                    <Checkbox
                      value="수술/치료"
                      checked={selectedCoverageValues.includes('수술/치료')}
                      onCheckedChange={handleSurgeryToggle}
                    >
                      수술/치료
                    </Checkbox>
                    <Grow placement="sc" className="pl-[1rem]" gap={3}>
                      <div className="w-[0.8rem] h-[0.8rem] border-l-[0.1rem] border-b-[0.1rem] border-l-[var(--color-secondary-60)] border-b-[var(--color-secondary-60)] rounded-[0_0_0_0.2rem]"></div>
                      <Checkbox
                        checked={coverageSubValues.includes('수술치료-암')}
                        onCheckedChange={(checked) => handleSubCoverageToggle('수술치료-암', checked)}
                      >
                        암
                      </Checkbox>
                      <Checkbox
                        checked={coverageSubValues.includes('수술치료-뇌')}
                        onCheckedChange={(checked) => handleSubCoverageToggle('수술치료-뇌', checked)}
                      >
                        뇌
                      </Checkbox>
                      <Checkbox
                        checked={coverageSubValues.includes('수술치료-심')}
                        onCheckedChange={(checked) => handleSubCoverageToggle('수술치료-심', checked)}
                      >
                        심장
                      </Checkbox>
                    </Grow>
                  </Gcol>
                  <div className="w-full flex flex-col items-start py-3 border-b border-dashed border-[#D8D8D8]">
                    <Checkbox
                      value="골절/화상"
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
                  </div>
                  <div className="w-full flex flex-col items-start py-3 border-b border-dashed border-[#D8D8D8]">
                    <Checkbox
                      value="검사/지원"
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
                  </div>
                </Gcol>
              </Gcol>
            </Grid>

            <Grow className="w-full" placement="cc" gap={2}>
              <Button
                variant="outlined"
                color="gray"
                aria-label="초기화"
                className="w-auto min-h-[4.4rem] px-5 rounded-[0.4rem] text-[1.5rem] gap-1"
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
                선택 초기화
              </Button>
              <Button
                variant="contained"
                className="w-auto min-h-[4.4rem] px-5 rounded-[0.4rem] text-[1.5rem] font-bold gap-1"
                onClick={() => {
                  setDataNone(false);
                  setIsFilterOptionOpen(false);
                  setLoadingAI(true);
                }}
              >
                선택조건 반영하여 추천받기
                <ArrowIcon color="#fff" size={16} className="rotate-180" />
              </Button>
            </Grow>
          </Gcol>

          {/* 안내 */}
          <Grow className="col-span-2 pb-[1.8rem] pt-[0.4rem]" placement="sc">
            <Typo icon="ref" variant={'body-md'} color={'gray'}>
              AI가 최근 데이터와 입력하신 정보를 분석하여 최적의 설계를 제안합니다. <b>편리한 설계의 출발점</b>으로 추천설계를 활용해 보세요.
            </Typo>
          </Grow>
        </Grid>
      ) : (
        <>
          <Grid
            className="w-full h-full grid-rows-[minmax(0,1fr)] grid-cols-[minmax(67rem,3fr)_minmax(41.3rem,2fr)] gap-4 items-stretch overflow-hidden"
            gap={3}
          >
            {/* 리스트 */}
            {loadingAI ? (
              <div className="relative w-full h-full after:content-[''] after:block after:absolute after:pointer-events-none after:bottom-0 after:left-0 after:w-[100%] after:h-[3.4rem] after:bg-gradient-to-b after:from-transparent after:to-[#FFF] after:z-10">
                <div className="relative overflow-y-auto w-full h-full">
                  <Gcol
                    className="absolute top-0 left-0 w-full h-full after:content-[''] after:block after:w-full after:min-h-[1.6rem]"
                    gap={3}
                    placement="ss"
                  >
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Grid
                        key={i}
                        className="w-full px-[2.4rem] py-[1.6rem] grid-cols-[1fr_auto] gap-4  bg-white rounded-[1rem] shadow-[0_0.2rem_0.4rem_0_rgba(0,0,0,0.1)] min-h-[18rem]"
                      >
                        <AiSpinner size={'10rem'} />
                      </Grid>
                    ))}
                  </Gcol>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full after:content-[''] after:block after:absolute after:pointer-events-none after:bottom-0 after:left-0 after:w-[100%] after:h-[3.4rem] after:bg-gradient-to-b after:from-transparent after:to-[#FFF] after:z-10">
                <div className="relative overflow-y-auto w-full h-full">
                  <Gcol
                    className="absolute top-0 left-0 w-full h-full after:content-[''] after:block after:w-full after:min-h-[1.6rem]"
                    gap={3}
                    placement="ss"
                  >
                    {dataList.map((item, idx) => {
                      return (
                        <Grid
                          key={item.id}
                          className="w-full px-[2.4rem] py-[1.6rem] grid-cols-[1fr_41.4rem] gap-4  bg-white rounded-[1rem] border border-[var(--color-gray-10)] shadow-[0_0.2rem_0.4rem_0_rgba(0,0,0,0.1)]"
                        >
                          <Gcol gap={2} placement="bws" className="pt-1">
                            <Gcol className="gap-y-3" placement="ss">
                              <Typo tag="h3" variant="heading-lg" className="break-all" tooltip="2">
                                {item.field1}
                              </Typo>
                              <Typo
                                tag="p"
                                variant="body-sm"
                                className="text-[var(--color-blue-gray-60)] break-all leading-[2rem]"
                              >
                                {item.field2.map((v, idx) => (
                                  <React.Fragment key={`field2-${idx}`}>
                                    {idx > 0 && (
                                      <span className="text-[var(--color-gray-30)] mx-[0.4rem] select-none">•</span>
                                    )}
                                    {v}
                                  </React.Fragment>
                                ))}
                                {item.field3 && item.field3.length > 0 && (
                                  <>
                                    {item.field2 && item.field2.length > 0 && (
                                      <span className="text-[var(--color-gray-30)] mx-[0.4rem] select-none">•</span>
                                    )}
                                    <span className="inline-flex items-center text-[var(--color-information-50)]">
                                      {item.field3.map((v, idx) => (
                                        <React.Fragment key={`field3-${idx}`}>
                                          {idx > 0 && (
                                            <span className="text-[var(--color-gray-30)] mx-[0.4rem] select-none">
                                              •
                                            </span>
                                          )}
                                          {v}
                                        </React.Fragment>
                                      ))}
                                    </span>
                                  </>
                                )}
                              </Typo>
                            </Gcol>
                            {item.field5 && (
                              <Grow placement="ss">
                                <Typo
                                  tag="p"
                                  variant="body-sm"
                                  className="py-[0.5rem] px-[1rem] rounded-[0.6rem] bg-[var(--color-information-5)] text-[var(--color-gray-100)]"
                                >
                                  {item.field5}
                                </Typo>
                              </Grow>
                            )}
                          </Gcol>
                          {/* 생성중 */}
                          {idx === 1 && (
                            <Grow gap={3}>
                              <Grid
                                key={idx}
                                className={`relative grid-rows-[minmax(0,1fr)_auto] w-full h-[14.8rem] rounded-[1rem] overflow-hidden gap-0 border-[0.1rem] border-[var(--color-primary-10)] bg-[var(--color-primary-5)]`}
                              >
                                <Grow className="h-full" placement="cc">
                                  <Spinner />
                                </Grow>
                                <Grow className="w-full h-[4rem] bg-[#fff] px-4" placement="cc">
                                  <Typo tag="span" variant={'body-md'}>
                                    추천설계를 생성중입니다.
                                  </Typo>
                                </Grow>
                              </Grid>
                            </Grow>
                          )}
                          {/* 오류 */}
                          {idx === 2 && (
                            <Grow gap={3}>
                              <Grid
                                key={idx}
                                className={`relative grid-rows-[minmax(0,1fr)_auto] w-full h-[14.8rem] rounded-[1rem] overflow-hidden gap-0 border-[0.1rem] border-[var(--color-gray-10)]`}
                              >
                                <Gcol className="w-full gap-2.5 bg-[#fff]" placement="cc">
                                  <FolderSearch size={40} />
                                  <Typo tag="span" variant={'body-md'} color={'gray'}>
                                    아쉽게도 적정한 설계를 찾지 못했어요.
                                  </Typo>
                                </Gcol>
                              </Grid>
                            </Grow>
                          )}
                          {/* 정상출력 */}
                          {idx === 0 && (
                            <Grow gap={3}>
                              {item.field4.map((v, idx) => {
                                const planKey = `${item.id}-${idx}`;
                                const isSelected = selectedPlanKey === planKey;
                                return (
                                  <Grid
                                    key={idx}
                                    className={`relative grid-rows-[minmax(0,1fr)_auto] flex-1 w-[100%] h-[14.8rem] rounded-[1rem] overflow-hidden gap-0 border-[0.1rem] border-[var(--color-gray-10)] ${
                                      isSelected
                                        ? 'border-[#FF5C2E] bg-[var(--color-primary-10)] shadow-[0_0.4rem_0.8rem_0_rgba(255,92,46,0.20)]'
                                        : 'bg-[var(--color-primary-5)]'
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
                                      <span
                                        className={`ltpa020-plan-icon ${isSelected ? 'is-selected' : ''}`}
                                        aria-hidden="true"
                                      />

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
                                          variant="heading-lg"
                                          className={isSelected ? 'text-white' : 'text-[var(--color-primary-50)]'}
                                        >
                                          {v.field1.toLocaleString()}원
                                        </Typo>
                                      </Gcol>
                                    </button>
                                    <Grow className="w-full h-[4rem] bg-[#fff] px-4" placement="sc">
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
                                        <span>비교하기</span>
                                      </Checkbox>
                                    </Grow>
                                  </Grid>
                                );
                              })}
                            </Grow>
                          )}
                        </Grid>
                      );
                    })}
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
                <Grow
                  className="relative px-[1.6rem] py-[1.7rem] gap-[0.2rem] rounded-t-[1rem] items-end"
                  placement="ss"
                  style={{
                    backgroundImage: `url(${withPublicUrl('/images/Ltpa020/cand_on_bg_big.png')}), linear-gradient(358deg,#FF5C2E 9.4%,#FF8D02 97.24%)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '10rem, cover',
                    backgroundPosition: '98% -6%',
                  }}
                >
                  <Gcol placement="ss" className="min-w-0 flex-1">
                    <Typo tag="p" variant="body-sm" className="text-white opacity-80">
                      보장내용 확인
                    </Typo>
                    <Typo
                      tag="strong"
                      variant="heading-lg"
                      weight="bold"
                      className="text-white leading-[1.2]"
                      tooltip={2}
                    >
                      {selectedPlanInfo?.product.field1}
                    </Typo>
                  </Gcol>
                  <Button
                    color="secondary"
                    onClick={() => setIsGuideOpen(true)}
                    only="default"
                    variant="contained"
                    className="w-[7.2rem] h-[3.8rem] text-[1.1rem] px-[1.1rem]"
                  >
                    추천설계<br></br> 이용가이드
                  </Button>
                </Grow>

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
                      className={`${isAiReasonExpanded ? 'max-h-[100%] overflow-y-auto' : 'max-h-[3.4rem] overflow-y-hidden'} h-full pr-[0.2rem] text-[1.1rem] leading-[1.5] transition-all`}
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
                  className="relative px-[1.6rem] py-[1.2rem] gap-[0.2rem] rounded-b-0"
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

                <Gcol className="overflow-y-auto gap-4 px-[4rem] pb-5 " placement="ss">
                  {/* 타임라인 / 가이드 스텝 3단계 */}
                  <div className="relative gap-0 h-full w-full">
                    <Grow
                      placement="bwc"
                      className="w-full border-b-[0.1rem] border-[var(--color-gray-10)] border-dashed"
                    >
                      <Typo tag="div" variant={'heading-xl'}>
                        <span className="text-[var(--color-primary-50)]">편리한 설계의 출발점으로</span>
                        <br />
                        추천설계를 활용해 보세요.
                      </Typo>
                      <AiSpinner size={'9rem'} className="w-auto translate-x-[2rem]" />
                    </Grow>
                    <ol className="flex flex-col gap-[2.4rem] py-[2.4rem]">
                      <li className="relative z-1 flex items-start gap-3 w-full">
                        <div className="shrink-0 flex items-center justify-center font-bold text-[2rem] leading-none">
                          01.
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                          <strong className="font-bold text-[1.5rem]">보장내용 상세보기</strong>
                          <p className="text-[1.3rem] leading-[150%] break-keep text-[var(--color-blue-gray-60)]">
                            <b className="text-[var(--color-information-50)]">추천결과 카드를 선택</b>하여,
                            <br /> 자세한 보장내용과 보험료를 확인해 보세요.
                          </p>
                        </div>
                      </li>
                      <li className="relative z-1 flex items-start gap-3 w-full">
                        <div className="shrink-0 flex items-center justify-center font-bold text-[2rem] leading-none">
                          02.
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                          <strong className="font-bold text-[1.5rem]">추천설계 비교하기</strong>
                          <p className="text-[1.3rem] leading-[150%] break-keep text-[var(--color-blue-gray-60)]">
                            카드별 ‘비교하기’ 체크하신 후, <br />
                            <b className="text-[var(--color-information-50)]">[추천설계비교]를 클릭하여 비교</b>해
                            보세요. <br />
                            3개까지 가능해요.
                          </p>
                        </div>
                      </li>
                      <li className="relative z-1 flex items-start gap-3 w-full">
                        <div className="shrink-0 flex items-center justify-center font-bold text-[2rem] leading-none">
                          03.
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                          <strong className="font-bold text-[1.5rem]">설계 생성하기</strong>
                          <p className="text-[1.3rem] leading-[150%] break-keep text-[var(--color-blue-gray-60)]">
                            원하는 <b className="text-[var(--color-information-50)]">추천결과를 선택 후 [설계생성]</b>을
                            눌러보세요.
                            <br />
                            최대 3개까지 자동으로 설계가 생성됩니다. <br />
                            가입설계 화면에서 담보 조정 등으로 <br />
                            최적의 설계를 진행하세요.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
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
          {/* {isFilterOptionOpen && <div className="absolute w-full h-full top-0 left-0 z-10 backdrop-blur-xs"></div>} */}
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
      <Dialog open={isGuideOpen} onOpenChange={setIsGuideOpen}>
        <DialogContent showCloseButton resizable={true} size="sm">
          <DialogHeader>
            <DialogTitle>
              <Typo tag={'strong'} variant={'heading-lg'}>
                추천설계 이용가이드
              </Typo>
            </DialogTitle>
          </DialogHeader>

          <DialogSection className="w-full flex flex-col gap-4">
            {/* 유의사항 안내 박스 */}
            <Gcol variant="box-warning" placement="ss" className="w-full" gap={1}>
              <Typo icon="warning" variant="body-sm" weight="bold">
                유의사항
              </Typo>
              <BulletList size="sm" type="dot" className="w-full">
                <BulletListItem size="sm">
                  <Typo tag="strong" variant="body-sm" color="primary" weight="bold">
                    편리한 설계의 출발점
                  </Typo>
                  으로 추천설계를 활용해 보세요.
                </BulletListItem>
                <BulletListItem size="sm">
                  추천설계는 입력하신 사항과 AI 학습데이터를 종합 분석하여,{' '}
                  <Typo tag="strong" variant="body-sm" color="primary" weight="bold">
                    설계의 방향을 찾아드리는 참고안
                  </Typo>{' '}
                  입니다.
                </BulletListItem>
                <BulletListItem size="sm">
                  다양한 조건, 이용 시점 등 여러 요인에 따라 추천설계 결과는 달라질 수 있습니다.
                </BulletListItem>
              </BulletList>
            </Gcol>

            {/* 가이드 스텝 목록 */}
            <ol className="flex flex-col gap-[2.4rem]">
              <li className="relative z-1 flex items-start gap-3 w-full">
                <div className="shrink-0 flex items-center justify-center font-bold text-[2rem] leading-none">01.</div>
                <div className="flex flex-col gap-1 w-full">
                  <strong className="font-bold text-[1.3rem]">보장내용 상세보기</strong>
                  <p className="text-[1.3rem] leading-[150%] break-keep text-[var(--color-blue-gray-60)]">
                    <b className="text-[var(--color-information-50)]">추천결과 카드를 선택</b>하여,
                    <br /> 자세한 보장내용과 보험료를 확인해 보세요.
                  </p>
                </div>
              </li>
              <li className="relative z-1 flex items-start gap-3 w-full">
                <div className="shrink-0 flex items-center justify-center font-bold text-[2rem] leading-none">02.</div>
                <div className="flex flex-col gap-1 w-full">
                  <strong className="font-bold text-[1.3rem]">추천설계 비교하기</strong>
                  <p className="text-[1.3rem] leading-[150%] break-keep text-[var(--color-blue-gray-60)]">
                    카드별 ‘비교하기’ 체크하신 후, <br />
                    <b className="text-[var(--color-information-50)]">[추천설계비교]를 클릭하여 비교</b>해 보세요.
                    3개까지 가능해요.
                  </p>
                </div>
              </li>
              <li className="relative z-1 flex items-start gap-3 w-full">
                <div className="shrink-0 flex items-center justify-center font-bold text-[2rem] leading-none">03.</div>
                <div className="flex flex-col gap-1 w-full">
                  <strong className="font-bold text-[1.3rem]">설계 생성하기</strong>
                  <p className="text-[1.3rem] leading-[150%] break-keep text-[var(--color-blue-gray-60)]">
                    원하는 <b className="text-[var(--color-information-50)]">추천결과를 선택 후 [설계생성]</b>을
                    눌러보세요.
                    <br />
                    최대 3개까지 자동으로 설계가 생성됩니다. <br />
                    가입설계 화면에서 담보 조정 등으로 최적의 설계를 진행하세요.
                  </p>
                </div>
              </li>
            </ol>
          </DialogSection>

          <DialogFooter>
            <DialogFooterArea>
              <Grow placement="ee">
                <DialogClose asChild>
                  <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                    닫기
                  </Button>
                </DialogClose>
              </Grow>
            </DialogFooterArea>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
