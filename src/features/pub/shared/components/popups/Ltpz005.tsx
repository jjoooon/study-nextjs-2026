'use client';

import '@/shared/lib/agGridPub';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import type { ValueFormatterParams, ValueParserParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { TableMore } from '@/shared/components/common/TablePagination';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/uiux/Dialog';
import { useTabs } from '@/shared/hooks/useTabs';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, createTooltipValueGetter, useAgGridInfiniteAppend } from '@aggrid';
import { Divider, Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { RecommendCard } from '@common/RecommendCard';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import {
  AiIcon,
  CircleCheckIcon,
  CommonIcon,
  CumulativeIcon,
  InfoToastIcon,
  JobIcon,
  NotificationIcon,
  UwIcon,
} from '@icons';
import { Button } from '@uiux/Button';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

type CheckTab = {
  name: string;
  value: string;
  label: string;
  state: 'green' | 'yellow' | 'red';
};

export type Ltpz005TabValue = 'common' | 'accum' | 'job' | 'expected-uw';

type Ltpz005Props = PopupBaseProps & {
  initialActiveTab?: Ltpz005TabValue;
};

type GroupTabItem = {
  id: number;
  age: string;
  gender: string;
  name: string;
  value: string;
};

type ExpectedUwRecommendItem = {
  id: number;
  title: string;
  plan: string;
  term: string;
  detail: string;
};
// 공통
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
};
// 공통
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '설계',
    field02: '인수제한',
    field03: '[CHL적립보험료기준011] 보장성기준(환급률 100%이하)을 준수해야 합니다.',
  },
  {
    id: 2,
    field01: '설계',
    field02: '인수금지',
    field03:
      '[손실유의계약04] [심사요청불가][부실유의] 적립보험료(29052333원) 가 영업보험료(30000000원) 의 50%(15000000원)를 초과할 경우 부실유의계약 대상입니다.',
  },
  {
    id: 3,
    field01: '설계',
    field02: '인수기준',
    field03:
      '[손실유의계약03] [손실유의계약분류][5년초과만기/세만기] 적립보험료(29052333원) 가 영업보험료(30000000원)의 50%(15000000원) 이상일 경우 손실계약으로 분류될 수 있습니다.',
  },
  {
    id: 4,
    field01: '설계',
    field02: '참고사항',
    field03: '[유사암진단비가입조건99] 4대유사암진단비 간의 가입금액은 같아야 합니다.',
  },

  // [홍길순] 파트
  {
    id: 5,
    field01: '홍길순',
    field02: '인수기준',
    field03:
      '[8738720][상아내_6] [간병인사용질병입원비(요양병원)(180일한도)(면체누적)] 4만원 이상 가입 시, [간병인사용질병입원비(요양병원제외)(180일한도)(전체누적)] 4만원 가입필요',
  },
  {
    id: 6,
    field01: '홍길순',
    field02: '인수기준',
    field03: '[청약포인트001] 청약포인트 : -347.63',
  },
  {
    id: 7,
    field01: '홍길순',
    field02: '인수기준',
    field03:
      '[남성통합암관계001] 통합암 가입관계는 [(소화기관) >= (입술/구강/인두=호흡기=요로암=눈/뇌=남성생식기관) >= (뼈/관절/피부=혈액/림프및조혈)] 이어야 합니다.',
  },
  {
    id: 8,
    field01: '홍길순',
    field02: '청약완료불가',
    field03:
      '[SILSON035] [가족일상생활중배상책임III(대물20만원(누수50만원)공제)(갱신형)] 실손 보험계약 정보조회결과 일상생활배상책임이 중복됩니다. 일상생활배상책임은 청약완료 처리시에도 중복되는 경우 청약완료가 불가합니다.',
  },
  {
    id: 9,
    field01: '홍길순',
    field02: '청약완료불가',
    field03:
      '[보장자산수입요구00] [보장자산가이드라인] 상해급여/질병급여/상해비급여/질병비급여 1천만원 초과 가입 시 최종적으로 보장자산가이드라인(사망1억 수납완료, 운전자보험 제외) 충족 시 청약 가능합니다.',
  },
  {
    id: 10,
    field01: '홍길순',
    field02: '청약완료불가',
    field03:
      '[SILSON002] [특약형 실손의료비(질병비급여)(갱신형)] 실손 보험계약 정보조회결과 질병입원의료비(4세대 급여,비급여포함)가 중복됩니다. 질병입원의료비는 청약완료 처리시에도 중복되는 경우 청약완료가 불가합니다.(단, 실손전환/재개전환은 제외)',
  },
  {
    id: 11,
    field01: '홍길순',
    field02: '진단대상',
    field03:
      '[CJ진단비기준006] [진단C][담당:장기U/W파트] 진단상품 40세 이하 진단대상 진단기준누적금액 전체누적 인수한도 1억1천만원을 49000만원 초과하여 진단심사대상 입니다.',
  },
  {
    id: 12,
    field01: '홍길순',
    field02: '진단대상',
    field03:
      '[질병20진단심사001] [진단B][담당:장기U/W파트] 20세이상 피보험자가 실손의료비(질병급여/비급여), 노후실손의료비(질병형) 담보 가입시에는 진단심사 대상입니다.',
  },
  {
    id: 13,
    field01: '홍길순',
    field02: '자동심사',
    field03:
      '[SILSON002] [기본형 실손의료비(상해급여)(갱신형)] 실손보험계약 정보조회결과(단체)상해입원의료비(4세대 급여,비급여포함)가 중복됩니다. 실손보험계약중복가입에 대한 청약서 자필서명 수령(중복가입확인서) 또는 녹취(TM 계피동일)를 반드시 하셔야 합니다.',
  },
  {
    id: 14,
    field01: '홍길순',
    field02: '참고사항',
    field03: '[모집자등급표시003] 모집자인수그룹 : 화이트그룹',
  },
  {
    id: 15,
    field01: '홍길순',
    field02: '참고사항',
    field03:
      '[실손진단심사필수01] [진단심사 필수] 20세 이상 피보험자는 진단심사 진행이 필수입니다. (참고) 보장자산가이드라인 충족 시 최대 5천만원, 미충족 시 1천만원까지 가입 가능',
  },

  // [이혜인] 파트
  {
    id: 16,
    field01: '이혜인',
    field02: '인수기준',
    field03:
      '[남성통합암관계001] 통합암 가입관계는 [(소화기관) >= (입술/구강/인두=호흡기=요로암=눈/뇌=남성생식기관) >= (뼈/관절/피부=혈액/림프및조혈)] 이어야 합니다.',
  },
  {
    id: 17,
    field01: '이혜인',
    field02: '청약완료불가',
    field03:
      '[SILSON035] [가족일상생활중배상책임III(대물20만원(누수50만원)공제)(갱신형)] 실손 보험계약 정보조회결과 일상생활배상책임이 중복됩니다. 일상생활배상책임은 청약완료 처리시에도 중복되는 경우 청약완료가 불가합니다.',
  },
  {
    id: 18,
    field01: '이혜인',
    field02: '자동심사',
    field03:
      '[SILSON002] [기본형 실손의료비(상해급여)(갱신형)] 실손보험계약 정보조회결과(단체)상해입원의료비(4세대 급여,비급여포함)가 중복됩니다. 실손보험계약중복가입에 대한 청약서 자필서명 수령(중복가입확인서) 또는 녹취(TM 계피동일)를 반드시 하셔야 합니다.',
  },
  {
    id: 19,
    field01: '이혜인',
    field02: '참고사항',
    field03: '[모집자등급표시003] 모집자인수그룹 : 화이트그룹',
  },

  // [목적물1] 파트
  {
    id: 20,
    field01: '목적물1',
    field02: '인수기준',
    field03: '[재물담보별인수한도030_21 풍수재(비특수 건물)] 담보는 10억까지만 가입 검토 가능합니다.',
  },
  {
    id: 21,
    field01: '목적물1',
    field02: '일반심사',
    field03:
      '[CJF계약자주택01] 계약자별 주택물건 화재손해 가입금액 합계 20억초과(소재지 무관, 모든 목적물 합산) 본사 일반심사 대상입니다.',
  },
  {
    id: 22,
    field01: '목적물1',
    field02: '참고사항',
    field03:
      '[특별관리보험금004] 최근 5년이내 보험금지급액(추산 포함) 100만원 미만 : 재물보험금지급건수 1건, 재물보험금지급금액 45557원',
  },

  // [목적물2] 파트
  {
    id: 23,
    field01: '목적물2',
    field02: '특인대상',
    field03:
      '[심사전결주택증권002] 주택업종 1급 위험함 가입금액기준 30억원초과일 경우 본사 특인대상입니다. [위험체크리스트]를 첨부하여 특인요청 바랍니다.',
  },
  {
    id: 24,
    field01: '목적물2',
    field02: '일반심사',
    field03:
      '[CJF계약자주택01] 계약자별 주택물건 화재손해 가입금액 합계 20억초과(소재지 무관, 모든 목적물 합산) 본사 일반심사 대상입니다.',
  },
  {
    id: 25,
    field01: '목적물2',
    field02: '참고사항',
    field03: '[목적물담보코드001] 목적물담보코드001',
  },
];

// 누적
type DummyDataType2 = {
  id: number;
  accumName: string | number;
  accumType: string | number;
  pseudoAccumAmount: string | number;
  totalAmount: string | number;
  limitAmount: string | number;
  guaranteeName: string | number;
  designAmount: string | number;
  multiplier: string | number;
  appliedAmount: string | number;
  excessAmount: string | number;
};

type DummyDataType3 = DummyDataType2;

type DummyDataType4 = DummyDataType2;

// 직업
type JobDataType = {
  id: number;
  targetStatus: string;
  policyNumber: string;
  changedDesignNumber: string;
  beforeInjuryGrade: string;
  beforeJobName: string;
  afterInjuryGrade: string;
  afterJobName: string;
};

type ExpectedUwAmountRow = {
  id: number;
  coverageName: string;
  amount: string;
};

type ExpectedUwSingleRow = {
  id: number;
  coverageName: string;
};

// 누적 인수기준
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    accumName: '암(유사암제외)진단비(암진단비)',
    accumType: '증권',
    pseudoAccumAmount: '-',
    totalAmount: '30,000',
    limitAmount: '10,000',
    guaranteeName: '암(유사암제외)진단비(암진단비)',
    designAmount: '10,000',
    multiplier: '1.0',
    appliedAmount: '10,000',
    excessAmount: '20,000',
  },
  {
    id: 2,
    accumName: '암(유사암제외)진단비(암진단비)',
    accumType: '증권',
    pseudoAccumAmount: '-',
    totalAmount: '30,000',
    limitAmount: '10,000',
    guaranteeName: '암(유사암제외)진단비(암진단비)(갱신형)',
    designAmount: '10,000',
    multiplier: '1.0',
    appliedAmount: '10,000',
    excessAmount: '20,000',
  },
  {
    id: 3,
    accumName: '암(유사암제외)진단비(암진단비)',
    accumType: '증권',
    pseudoAccumAmount: '-',
    totalAmount: '30,000',
    limitAmount: '10,000',
    guaranteeName: '-여성통합암(4대유사암제외)진단비II(특정소화기관암)',
    designAmount: '10,000',
    multiplier: '1.0',
    appliedAmount: '10,000',
    excessAmount: '20,000',
  },
  {
    id: 4,
    accumName: '유사암진단비(기타피부암)',
    accumType: '전체',
    pseudoAccumAmount: '12,300',
    totalAmount: '14,300',
    limitAmount: '13,000',
    guaranteeName: '-4대유사암(기타피부암)',
    designAmount: '800',
    multiplier: '2.5',
    appliedAmount: '2,000',
    excessAmount: '1,300',
  },
  {
    id: 5,
    accumName: '유사암진단비',
    accumType: '전체',
    pseudoAccumAmount: '2,300',
    totalAmount: '4,300',
    limitAmount: '3,000',
    guaranteeName: '-4대유사암(기타피부암)',
    designAmount: '800',
    multiplier: '2.5',
    appliedAmount: '2,000',
    excessAmount: '0',
  },
];

// 누적 청약완료불가(당수누적)
const DummyData3: DummyDataType3[] = [
  {
    id: 101,
    accumName: '상해입원일당(당수누적)',
    accumType: '당수',
    pseudoAccumAmount: '7,500',
    totalAmount: '9,000',
    limitAmount: '8,000',
    guaranteeName: '상해입원일당(1일이상,180일한도)',
    designAmount: '1,000',
    multiplier: '1.0',
    appliedAmount: '1,000',
    excessAmount: '1,000',
  },
  {
    id: 102,
    accumName: '질병입원일당(당수누적)',
    accumType: '당수',
    pseudoAccumAmount: '7,500',
    totalAmount: '6,000',
    limitAmount: '6,000',
    guaranteeName: '질병입원일당(1일이상,180일한도)',
    designAmount: '800',
    multiplier: '1.0',
    appliedAmount: '800',
    excessAmount: '0',
  },
];

// 누적 청약완료불가(업계누적)
const DummyData4: DummyDataType4[] = [
  {
    id: 201,
    accumName: '암진단비(손생보)',
    accumType: '-',
    pseudoAccumAmount: '15,000',
    totalAmount: '20,000',
    limitAmount: '18,000',
    guaranteeName: '암진단비(유사암제외)',
    designAmount: '3,000',
    multiplier: '1.0',
    appliedAmount: '3,000',
    excessAmount: '2,000',
  },
  {
    id: 202,
    accumName: '암진단비(손생보)',
    accumType: '-',
    pseudoAccumAmount: '15,000',
    totalAmount: '20,000',
    limitAmount: '18,000',
    guaranteeName: '유사암진단비(기타피부암)',
    designAmount: '1,000',
    multiplier: '1.0',
    appliedAmount: '1,000',
    excessAmount: '2,000',
  },
];

// 직업
const JobDummyData: JobDataType[] = [
  {
    id: 1,
    targetStatus: '변경대상',
    policyNumber: 'LA12345678',
    changedDesignNumber: '계약변경설계이동',
    beforeInjuryGrade: '1급',
    beforeJobName: '회사 사무직 종사자',
    afterInjuryGrade: '1급',
    afterJobName: '-',
  },
  {
    id: 2,
    targetStatus: '변경대상',
    policyNumber: 'LA12345678',
    changedDesignNumber: '계약변경설계이동',
    beforeInjuryGrade: '2급',
    beforeJobName: '회사 사무직 종사자',
    afterInjuryGrade: '2급',
    afterJobName: '회사 사무직 종사자',
  },
  {
    id: 3,
    targetStatus: '변경대상',
    policyNumber: 'LA12345678',
    changedDesignNumber: '계약변경설계이동',
    beforeInjuryGrade: '1급',
    beforeJobName: '회사 사무직 종사자',
    afterInjuryGrade: '1급',
    afterJobName: '-',
  },
  {
    id: 4,
    targetStatus: '변경대상',
    policyNumber: 'LA12345678',
    changedDesignNumber: '계약변경설계이동',
    beforeInjuryGrade: '2급',
    beforeJobName: '회사 사무직 종사자',
    afterInjuryGrade: '2급',
    afterJobName: '-',
  },
  {
    id: 5,
    targetStatus: '변경대상',
    policyNumber: 'LA12345678',
    changedDesignNumber: '계약변경설계이동',
    beforeInjuryGrade: '1급',
    beforeJobName: '회사 사무직 종사자',
    afterInjuryGrade: '1급',
    afterJobName: '-',
  },
  {
    id: 6,
    targetStatus: '변경대상',
    policyNumber: 'LA12345678',
    changedDesignNumber: '계약변경설계이동',
    beforeInjuryGrade: '2급',
    beforeJobName: '회사 사무직 종사자',
    afterInjuryGrade: '2',
    afterJobName: '-',
  },
];

//제한담보
const expectedUwLimitedCoverageData: ExpectedUwAmountRow[] = [
  {
    id: 1,
    coverageName: '보험료압입명제대상보장(8대사유)보험료압입명제대상보장(8대사유)',
    amount: '10,000',
  },
  {
    id: 2,
    coverageName: '보험료압입명제대상보장(8대사유)',
    amount: '-',
  },
  {
    id: 3,
    coverageName: '보험료압입명제대상보장(8대사유)',
    amount: '-',
  },
  {
    id: 4,
    coverageName: '보험료압입명제대상보장(8대사유)',
    amount: '-',
  },
  {
    id: 5,
    coverageName: '보험료압입명제대상보장(8대사유)',
    amount: '-',
  },
  {
    id: 6,
    coverageName: '보험료압입명제대상보장(8대사유)',
    amount: '-',
  },
];

// 보험료 할증
const expectedUwPremiumSurchargeData: ExpectedUwSingleRow[] = [
  {
    id: 1,
    coverageName: '보험료압입명제대상보장(8대사유)1보험료압입명제대상보장(8대사유)',
  },
  {
    id: 2,
    coverageName: '보험료압입명제대상보장(8대사유)1',
  },
  {
    id: 3,
    coverageName: '보험료압입명제대상보장(8대사유)1',
  },
  {
    id: 4,
    coverageName: '보험료압입명제대상보장(8대사유)',
  },
  {
    id: 5,
    coverageName: '보험료압입명제대상보장(8대사유)',
  },
  {
    id: 6,
    coverageName: '보험료압입명제대상보장(8대사유)',
  },
];

//부 담보(부위/질병)
const expectedUwExclusionCoverageData: ExpectedUwAmountRow[] = [
  {
    id: 1,
    coverageName: '보험료압입명제대상보장(8대사유)보험료압입명제대상보장(8대사유)',
    amount: '10,000',
  },
  {
    id: 2,
    coverageName: '보험료압입명제대상보장(8대사유)',
    amount: '-',
  },
  {
    id: 3,
    coverageName: '보험료압입명제대상보장(8대사유)',
    amount: '-',
  },
  {
    id: 4,
    coverageName: '보험료압입명제대상보장(8대사유)',
    amount: '-',
  },
  {
    id: 5,
    coverageName: '보험료압입명제대상보장(8대사유)',
    amount: '-',
  },
  {
    id: 6,
    coverageName: '보험료압입명제대상보장(8대사유)',
    amount: '-',
  },
];
const expectedUwRecommendData: ExpectedUwRecommendItem[] = [
  {
    id: 1,
    title: '한화 시그니처 여성 간편건강보험4.0',
    plan: '납입면제형 · 기본형 · 3N5간편고지형',
    term: '20년납/100세만기',
    detail: '9형(355간편고지형(고혈압및당뇨추가고지))(올인원플랜)(1.7.8.9형)(15~89세)...',
  },
  {
    id: 2,
    title: '한화 시그니처 여성 간편건강보험4.0',
    plan: '납입면제형 · 기본형 · 3N5간편고지형',
    term: '20년납/100세만기',
    detail: '9형(355간편고지형(고혈압및당뇨추가고지))(올인원플랜)(1.7.8.9형)(15~89세)...',
  },
  {
    id: 3,
    title: '한화 시그니처 여성 간편건강보험4.0',
    plan: '납입면제형 · 기본형 · 3N5간편고지형',
    term: '20년납/100세만기',
    detail: '9형(355간편고지형(고혈압및당뇨추가고지))(올인원플랜)(1.7.8.9형)(15~89세)...',
  },
];

const CHECK_TABS: CheckTab[] = [
  { name: '공통', value: 'common', label: '공통', state: 'green' },
  { name: '누적', value: 'accum', label: '누적', state: 'red' },
  { name: '직업', value: 'job', label: '직업', state: 'yellow' },
  { name: '예상 UW', value: 'expected-uw', label: '예상 UW', state: 'yellow' },
];

function formatAmountWithComma(value: unknown): string {
  const normalized = String(value ?? '')
    .replace(/,/g, '')
    .trim();

  if (normalized === '') {
    return '';
  }

  const digitsOnly = normalized.replace(/[^0-9]/g, '');

  if (digitsOnly === '') {
    return '';
  }

  return Number(digitsOnly).toLocaleString('ko-KR');
}

function designAmountValueFormatter(params: ValueFormatterParams): string {
  return formatAmountWithComma(params.value);
}

function designAmountValueParser(params: ValueParserParams): string {
  return formatAmountWithComma(params.newValue);
}

export const Ltpz005 = ({ open, onOpenChange, initialActiveTab = 'common' }: Ltpz005Props) => {
  const { tabs, active, setActive } = useTabs(CHECK_TABS);
  const [groupTabValue, setGroupTabValue] = React.useState<string>('tab1');
  const [accumOptionValue, setAccumOptionValue] = React.useState<string>('option1');
  const [aiReasonOpen, setAiReasonOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setActive(initialActiveTab);
  }, [initialActiveTab, open, setActive]);

  const getTabIcon = (value: CheckTab['value']) => {
    if (value === 'common') return <CommonIcon />;
    if (value === 'accum') return <CumulativeIcon />;
    if (value === 'job') return <JobIcon />;
    return <UwIcon />;
  };

  const getStateIcon = (state: CheckTab['state']) => {
    if (state === 'green') return <CircleCheckIcon size={20} />;
    if (state === 'red') return <InfoToastIcon size={20} color={'#E43939'} />;
    return <InfoToastIcon size={20} color={'#FFB800'} />;
  };

  // 공통
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '설계',
      field: 'field01',
      width: 100,
      spanRows: true,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '인수제한',
      field: 'field02',
      width: 100,
      spanRows: true,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '위배내용',
      field: 'field03',
      flex: 1,
      cellClass: 'flex! items-center! justify-start! whitespace-normal!',
      autoHeight: true,
    },
  ];

  // 누적 인수기준
  const columnDefs2: (ColDef<DummyDataType2> | ColGroupDef<DummyDataType2>)[] = [
    {
      headerName: '누적명',
      field: 'accumName',
      width: 200,
      spanRows: true,
      cellClass: 'flex! items-center! justify-center!',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'accumName' }),
    },
    {
      headerName: '누적유형',
      field: 'accumType',
      width: 80,
      spanRows: true,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '기누적금액(원)',
      field: 'pseudoAccumAmount',
      width: 90,
      spanRows: true,
      cellClass: 'flex! items-center! justify-end!',
      cellRenderer: (params: { value: string | number }) => {
        const rawValue = String(params.value ?? '').trim();
        const numericValue = Number(rawValue.replace(/,/g, ''));

        if (!Number.isNaN(numericValue) && numericValue !== 0) {
          return (
            <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
              {params.value}
            </Button>
          );
        }
        return params.value;
      },
    },
    {
      headerName: '합계(원)',
      field: 'totalAmount',
      width: 80,
      spanRows: true,
      cellClass: 'flex! items-center! justify-end!',
    },
    {
      headerName: '한도(원)',
      field: 'limitAmount',
      width: 80,
      spanRows: true,
      cellClass: 'flex! items-center! justify-end!',
    },
    {
      headerName: '담보명',
      field: 'guaranteeName',
      flex: 1,
      cellClass: 'flex! items-center! justify-start!',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'guaranteeName' }),
    },
    {
      headerName: '설계금액(원)',
      field: 'designAmount',
      width: 80,
      cellClass: 'text-right bg-[#EFF8FF]',
      editable: true,
      valueFormatter: designAmountValueFormatter,
      valueParser: designAmountValueParser,
    },
    {
      headerName: '배수',
      field: 'multiplier',
      width: 40,
      cellClass: 'text-center',
    },
    {
      headerName: '반영금액(원)',
      field: 'appliedAmount',
      width: 80,
      cellClass: 'text-right',
    },
    {
      headerName: '초과금액',
      field: 'excessAmount',
      flex: 1,
      spanRows: true,
      cellClass: 'flex! items-center! justify-end! border-r-0',
      cellStyle: { borderRight: 'none' },
      cellRenderer: (params: { value: string | number }) => {
        const rawValue = String(params.value ?? '').trim();
        const numericValue = Number(rawValue.replace(/,/g, ''));

        if (!Number.isNaN(numericValue) && numericValue === 0) {
          return `${rawValue}(누적해소)`;
        }

        return params.value;
      },
    },
  ];

  // 직업
  const jobColumnDefs: (ColDef<JobDataType> | ColGroupDef<JobDataType>)[] = [
    {
      headerName: '대상여부',
      field: 'targetStatus',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '증권번호',
      field: 'policyNumber',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '변경설계번호',
      field: 'changedDesignNumber',
      width: 140,
      cellClass: 'text-center',
      cellRenderer: (params: { value: string | number }) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          {params.value}
        </Button>
      ),
    },
    {
      headerName: '변경전 직업정보',
      headerClass: 'border-r-1 border-[#E5E5E5]',
      children: [
        {
          headerName: '상해급수',
          field: 'beforeInjuryGrade',
          minWidth: 100,
          flex: 1,
          cellClass: 'text-center',
        },
        {
          headerName: '직업',
          field: 'beforeJobName',
          minWidth: 180,
          flex: 1,
          cellClass: 'text-center',
        },
      ],
    },
    {
      headerName: '변경후 직업정보',
      headerClass: 'border-r-0!',
      children: [
        {
          headerName: '상해급수',
          field: 'afterInjuryGrade',
          minWidth: 100,
          flex: 1,
          cellClass: 'text-center',
        },
        {
          headerName: '직업',
          field: 'afterJobName',
          minWidth: 180,
          flex: 1,
          headerClass: 'border-r-0!',
          cellStyle: { borderRight: 'none' },
          cellClass: 'text-center border-r-0!',
        },
      ],
    },
  ];

  // 제한담보
  const expectedUwAmountColumnDefs: (ColDef<ExpectedUwAmountRow> | ColGroupDef<ExpectedUwAmountRow>)[] = [
    {
      headerName: '제한 담보명',
      field: 'coverageName',
      flex: 1,
      cellClass: 'justify-start!',
      tooltipValueGetter: createTooltipValueGetter<ExpectedUwAmountRow>({ field: 'coverageName' }),
    },
    {
      headerName: '가입금액(원)',
      field: 'amount',
      width: 100,
      cellClass: 'justify-end! text-right',
      cellRenderer: (params: { value: string | number }) => {
        const value = String(params.value ?? '');

        if (value === '-') {
          return <div className="w-full text-center">-</div>;
        }

        return value;
      },
    },
  ];

  // 보험표 할증
  const expectedUwSingleColumnDefs: (ColDef<ExpectedUwSingleRow> | ColGroupDef<ExpectedUwSingleRow>)[] = [
    {
      headerName: '담보명',
      field: 'coverageName',
      flex: 1,
      cellClass: 'justify-start! border-r-0!',
      tooltipValueGetter: createTooltipValueGetter<ExpectedUwSingleRow>({ field: 'coverageName' }),
      headerClass: 'border-r-0!',
      cellStyle: { borderRight: 'none' },
    },
  ];

  // 공통
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  // 직업
  const [jobRowData] = React.useState<JobDataType[]>(JobDummyData);
  const [expectedUwLimitedCoverageRowData] = React.useState<ExpectedUwAmountRow[]>(expectedUwLimitedCoverageData);
  const [expectedUwPremiumSurchargeRowData] = React.useState<ExpectedUwSingleRow[]>(expectedUwPremiumSurchargeData);
  const [expectedUwExclusionCoverageRowData] = React.useState<ExpectedUwAmountRow[]>(expectedUwExclusionCoverageData);

  // 누적
  const selectedAccumRowData: DummyDataType2[] =
    accumOptionValue === 'option2' ? DummyData3 : accumOptionValue === 'option3' ? DummyData4 : DummyData2;

  // 누적
  const groupTabs: GroupTabItem[] = [
    {
      id: 1,
      age: '32',
      gender: '여',
      name: '홍길준',
      value: 'tab1',
    },
    {
      id: 2,
      age: '27',
      gender: '남',
      name: '홍길동',
      value: 'tab2',
    },
    {
      id: 3,
      age: '3',
      gender: '여',
      name: '빛나리',
      value: 'tab3',
    },
  ];

  // 누적
  const accumRadioItemClassName =
    'h-[3rem]! rounded-full! border-transparent! bg-[#E5E5E5]! px-[0.8rem]! py-[0.4rem]! text-[1.2rem]! font-bold! leading-normal! tracking-[-0.13rem]! text-[#777777]! data-[state=checked]:border-transparent! data-[state=checked]:bg-[#414141]! data-[state=checked]:text-white! data-[state=checked]:shadow-none!';

  {
    /* M2. 수정 */
  }
  const pageSize = 5;
  const { loadedCount, totalCount, dataSource, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: DummyData,
    pageSize,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl" className="max-h-[calc(100vh-4rem)] h-full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              꼭 확인해야 할 일
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTRZ005)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_minmax(0,1fr)] min-h-0">
          <Gcol className="w-full" gap={4}>
            <Grow variant={'box-info-line'} className="w-full" placement="se">
              <Typo tag="strong" variant={'body-lg'}>
                한화시그니처여성 건강 보험 3.0 무배당
              </Typo>
              <Divider variant={'dot'} />
              <Typo tag="span" variant={'body-lg'}>
                납입면제 강화형
              </Typo>
              <Divider variant={'dot'} />
              <Typo tag="span" variant={'body-lg'}>
                기본형
              </Typo>
            </Grow>
            <Grow className="grid w-full grid-cols-4 gap-2">
              {tabs.map((tab) => {
                const isActive = active === tab.value;
                return (
                  <Button
                    key={tab.value}
                    variant="outlined"
                    color="gray-light"
                    className={`w-full! h-[5.2rem]! rounded-[1rem]! px-[1.2rem]! ${
                      isActive
                        ? 'border-[0.2rem] border-[#FF5C2E] shadow-[0_0.2rem_2rem_rgba(255,92,46,0.20)]'
                        : 'shadow-[0_0.2rem_0.4rem_rgba(0,0,0,0.10)]'
                    }`}
                    onClick={() => setActive(tab.value)}
                  >
                    <Grow placement="bwc" className="w-full">
                      <Grow>
                        {getTabIcon(tab.value)}
                        <Typo tag="strong" variant={'body-lg'} weight="bold" className="text-gray-500">
                          {tab.label}
                        </Typo>
                      </Grow>
                      {getStateIcon(tab.state)}
                    </Grow>
                  </Button>
                );
              })}
            </Grow>
          </Gcol>
          <Gcol className="w-full min-h-0 overflow-y-auto" placement="ss">
            {active === 'common' ? (
              <Gcol className="w-full">
                <Typo tag={'strong'} variant={'heading-md'}>
                  확인사항
                </Typo>
                <Gcol className="w-full flex">
                  <TableFold>
                    <TableFoldHead title="필수지침"></TableFoldHead>
                    <TableFoldBody>
                      <div className="ag-theme-alpine min-h-[24rem]">
                        <AgGridReact<DummyDataType>
                          getRowId={(params) => String(params.data.id)}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          rowData={rowData}
                          columnDefs={columnDefs}
                          defaultColDef={{
                            sortable: true,
                            resizable: true,
                          }}
                          rowClassRules={{}}
                          enableCellSpan={true}
                          domLayout="autoHeight"
                          animateRows={false}
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>
                </Gcol>
              </Gcol>
            ) : active === 'accum' ? (
              <Gcol className="w-full" gap={2}>
                <Grow className="w-full bg-[#374151]" variant={'box-round'} placement="sc">
                  <NotificationIcon />
                  <Typo tag={'strong'} variant={'body-md'} className="text-white">
                    청약완료불가(당사누적) 및 청약완료불가(업계누적)은 청약완료 전 까지만 해소하면 됩니다.
                  </Typo>
                </Grow>
                <TabPager
                  active={groupTabValue}
                  data={groupTabs}
                  setActive={setGroupTabValue}
                  visibleCount={5}
                  getValue={(tab) => String(tab.value)}
                  renderTab={(tab) => (
                    <Typo tag={'strong'} variant={'body-md'}>
                      {`${tab.name} ${tab.age}세(${tab.gender})`}
                    </Typo>
                  )}
                >
                  <div className="w-full mt-1">
                    <RadioGroup
                      className="gap-1"
                      errorMsg="하나를 선택해주세요."
                      errorPs="bl"
                      onValueChange={setAccumOptionValue}
                      value={accumOptionValue}
                      width="auto"
                    >
                      {[
                        {
                          value: 'option1',
                          label: '인수기준(3)',
                        },
                        {
                          value: 'option2',
                          label: '청약완료불가(당수누적)(4)',
                        },
                        {
                          value: 'option3',
                          label: '청약완료불가(업계누적)(1)',
                        },
                      ].map((option) => (
                        <RadioGroupItem
                          key={option.value}
                          className={accumRadioItemClassName}
                          size="lg"
                          value={option.value}
                          variant="chipBox"
                          width="auto"
                        >
                          {option.label}
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  </div>
                </TabPager>
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={selectedAccumRowData}
                    columnDefs={columnDefs2}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                    }}
                    rowClassRules={{}}
                    enableCellSpan={true}
                    domLayout="autoHeight"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div>
              </Gcol>
            ) : active === 'job' ? (
              <Gcol className="w-full" gap={5}>
                <Gcol variant={'box-info'} placement={'ss'} className="w-full">
                  {/* M1. 텍스트 수정 */}
                  <Typo variant={'body-sm'} icon={'info'}>
                    고객 직업정보(상해급수)가 불일치 할 경우 <b>신계약 체결이 불가능</b>합니다. 해당 신계약 청약완료
                    이전에 기계약의 작업변경을 완료하시기 바랍니다.
                  </Typo>
                  {/* M1. 텍스트 수정 */}
                  <Typo variant={'body-sm'} icon={'info'}>
                    <b>신계약 청약서 발행 이전에 기계약의 직업변경 배서(청약중 이후)를 진행</b>바랍니다.
                  </Typo>
                </Gcol>
                <Gcol className="w-full" gap={2}>
                  <FormTable caption="고객정보 테이블" cols={['w-[12rem]', 'flex-1', 'w-[14.9rem]', 'flex-1']}>
                    <FormRow>
                      <FormCell title={'고객명'}>김한화</FormCell>
                      <FormCell title={'직업정보(현재 설계기준)'}>2급/제품 및 광고영업원</FormCell>
                    </FormRow>
                  </FormTable>
                  {/* M2. 수정 */}
                  <div className="ag-theme-alpine min-h-[24rem]">
                    <AgGridReact<JobDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={jobRowData}
                      columnDefs={jobColumnDefs}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                        suppressMovable: true,
                      }}
                      // getRowStyle={(params) => ({
                      //   backgroundColor: (params.node.rowIndex ?? 0) % 2 === 1 ? '#F4F4F4' : '#FFFFFF',
                      // })}
                      headerHeight={30}
                      groupHeaderHeight={30}
                      rowHeight={30}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      rowModelType="infinite"
                      cacheBlockSize={pageSize}
                      maxBlocksInCache={2}
                      datasource={dataSource}
                    />
                  </div>
                  {/* M2. 수정 */}
                  <TableMore
                    loadedCount={loadedCount}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onLoadAll={handleLoadAll}
                    onLoadNext={handleLoadNext}
                  />

                  <Gcol variant={'box-detail'} placement={'ss'} className="w-full">
                    <Typo variant={'body-sm'} icon={'detail'} color={'gray'}>
                      신규설계의 직업정보가 정확할 경우: 기계약 직업 변경배서 진행(변경설계가 청약중 이후이고 변경후
                      직업정보(상해급수)가 일치하여야 신계약 청약서 발행가능함)
                    </Typo>
                    <Typo variant={'body-sm'} icon={'detail'} color={'gray'}>
                      기계약의 직업정보가 정확할 경우: 고객정보화면의 직업정보 변경 후 피보험자를 다시 불러온 후 신계약
                      설계 진행
                    </Typo>
                    <BulletList>
                      <BulletListItem size={'sm'} type="dash">
                        직업정보는 현재기분[2026.01.01] 기준으로 표기되고 있습니다. (구 직업코드의 경우 현재 기준으로
                        매핑한 결과로 비교함)
                      </BulletListItem>
                      <BulletListItem size={'sm'} type="dash">
                        변경대상의 경우 계약변경설계화면으로 이동하여 진행바랍니다.(계약변경설계이동 클릭시
                        변경설계화면으로 이동)
                      </BulletListItem>
                      <BulletListItem size={'sm'} type="dash">
                        상해급수가 동일하더라도 고객님의 정확한 직업정보의 관리를 위하려 재확인 바랍니다.
                      </BulletListItem>
                      {/* M2. 수정 */}
                      <BulletListItem className="mt-2" size={'sm'} type="dotBig">
                        관련문서: [대내-150-1552]직업정보(상해급수) 일지 관련 신계약 프로세스 변경통보, 장기계약관리파트
                      </BulletListItem>
                    </BulletList>
                  </Gcol>
                </Gcol>
              </Gcol>
            ) : (
              <Gcol className="w-full" gap={5}>
                <Grow
                  variant={'box-round'}
                  className="w-full bg-[#374151] px-[2rem] py-[1.6rem] flex items-center gap-[2.4rem]"
                >
                  <div className="w-[18rem] flex flex-col gap-1">
                    <Typo tag={'p'} variant={'body-lg'} className="text-white">
                      알릴사항
                    </Typo>
                    <Typo tag={'strong'} variant={'heading-lg'} className="text-[#FF5C2E] text-right">
                      미입력
                    </Typo>
                  </div>

                  <Divider className="h-[4rem] bg-[gray] opacity-20" />

                  <div className="w-[18rem] flex flex-col gap-1">
                    <Typo tag={'p'} variant={'body-lg'} className="text-white">
                      고지
                    </Typo>
                    <Typo tag={'strong'} variant={'heading-lg'} className="text-white text-right">
                      고지필요
                    </Typo>
                  </div>

                  <Divider className="h-[4rem] bg-[gray] opacity-20" />

                  <Gcol className="flex-1" gap={1}>
                    <Typo tag={'p'} variant={'body-lg'} className="w-full text-white justify-start">
                      담보별 상세
                    </Typo>
                    <div className="w-full flex items-center justify-end">
                      <Grow className="flex gap-1 items-center">
                        <Typo tag={'span'} variant={'body-xs'} className="text-[#D8DBE0]">
                          거절 · 감액 · 연기
                        </Typo>
                        <Typo tag={'strong'} variant={'heading-lg'} className="text-[#FF5C2E]">
                          15개
                        </Typo>
                      </Grow>

                      <Divider className="mx-[1.2rem] h-[1.6rem] bg-[gray] opacity-20" />

                      <div className="flex gap-[1.2rem]">
                        <div className="flex gap-1 items-end">
                          <Typo tag={'span'} variant={'body-xs'} className="text-[#D8DBE0]">
                            서류
                          </Typo>
                          <Typo tag={'strong'} variant={'body-sm'} className="text-white">
                            11개
                          </Typo>
                        </div>
                        <div className="flex gap-1 items-end">
                          <Typo tag={'span'} variant={'body-xs'} className="text-[#D8DBE0]">
                            진단/적부
                          </Typo>
                          <Typo tag={'strong'} variant={'body-sm'} className="text-white">
                            7개
                          </Typo>
                        </div>
                        <div className="flex gap-1 items-end">
                          <Typo tag={'span'} variant={'body-xs'} className="text-[#D8DBE0]">
                            할증
                          </Typo>
                          <Typo tag={'strong'} variant={'body-sm'} className="text-white">
                            10개
                          </Typo>
                        </div>
                        <div className="flex gap-1 items-end">
                          <Typo tag={'span'} variant={'body-xs'} className="text-[#D8DBE0]">
                            부담보
                          </Typo>
                          <Typo tag={'strong'} variant={'body-sm'} className="text-white">
                            12개
                          </Typo>
                        </div>
                        <div className="flex gap-1 items-end">
                          <Typo tag={'span'} variant={'body-xs'} className="text-[#D8DBE0]">
                            인수
                          </Typo>
                          <Typo tag={'strong'} variant={'body-sm'} className="text-white">
                            5개
                          </Typo>
                        </div>
                      </div>
                    </div>
                  </Gcol>
                </Grow>
                <Gcol className="w-full" placement="ss">
                  <Grow className="w-full" gap={5}>
                    <TableFold>
                      <TableFoldHead title="제한담보" className="justify-start">
                        <Typo variant={'body-lg'} color={'primary'} weight={'bold'}>
                          15개
                        </Typo>
                      </TableFoldHead>
                      <TableFoldBody>
                        {/* 제한담보 */}
                        <div
                          className="ag-theme-alpine"
                          style={{
                            height: expectedUwLimitedCoverageRowData.length >= 4 ? '15rem' : 'auto',
                            overflow: expectedUwLimitedCoverageRowData.length >= 4 ? 'hidden' : 'visible',
                          }}
                        >
                          <AgGridReact<ExpectedUwAmountRow>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={expectedUwLimitedCoverageRowData}
                            columnDefs={expectedUwAmountColumnDefs}
                            defaultColDef={{
                              sortable: true,
                              resizable: true,
                              suppressMovable: true,
                              cellClass: 'flex! items-center!',
                            }}
                            headerHeight={28}
                            rowHeight={30}
                            domLayout={expectedUwLimitedCoverageRowData.length >= 4 ? 'normal' : 'autoHeight'}
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                      </TableFoldBody>
                    </TableFold>
                    <TableFold>
                      <TableFoldHead title="보험료 할증" className="justify-start">
                        <Typo variant={'body-lg'} color={'primary'} weight={'bold'}>
                          15개
                        </Typo>
                      </TableFoldHead>
                      <TableFoldBody>
                        {/* 보험료 할증 */}
                        <div
                          className="ag-theme-alpine"
                          style={{
                            height: expectedUwPremiumSurchargeRowData.length >= 4 ? '15rem' : 'auto',
                            overflow: expectedUwPremiumSurchargeRowData.length >= 4 ? 'hidden' : 'visible',
                          }}
                        >
                          <AgGridReact<ExpectedUwSingleRow>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={expectedUwPremiumSurchargeRowData}
                            columnDefs={expectedUwSingleColumnDefs}
                            defaultColDef={{
                              sortable: true,
                              resizable: true,
                              suppressMovable: true,
                              cellClass: 'flex! items-center!',
                            }}
                            headerHeight={28}
                            rowHeight={30}
                            domLayout={expectedUwPremiumSurchargeRowData.length >= 4 ? 'normal' : 'autoHeight'}
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                      </TableFoldBody>
                    </TableFold>
                    <TableFold>
                      <TableFoldHead title="부 담보(부위/질병)" className="justify-start">
                        <Typo variant={'body-lg'} color={'primary'} weight={'bold'}>
                          15개
                        </Typo>
                      </TableFoldHead>
                      <TableFoldBody>
                        {/* 부 담보(부위/질병) */}
                        <div
                          className="ag-theme-alpine"
                          style={{
                            height: expectedUwExclusionCoverageRowData.length >= 4 ? '15rem' : 'auto',
                            overflow: expectedUwExclusionCoverageRowData.length >= 4 ? 'hidden' : 'visible',
                          }}
                        >
                          <AgGridReact<ExpectedUwAmountRow>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={expectedUwExclusionCoverageRowData}
                            columnDefs={expectedUwAmountColumnDefs}
                            defaultColDef={{
                              sortable: true,
                              resizable: true,
                              suppressMovable: true,
                              cellClass: 'flex! items-center!',
                            }}
                            headerHeight={28}
                            rowHeight={30}
                            domLayout={expectedUwExclusionCoverageRowData.length >= 4 ? 'normal' : 'autoHeight'}
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                      </TableFoldBody>
                    </TableFold>
                  </Grow>
                  <Grow className="w-full">
                    <Gcol>
                      <Gcol className="w-full">
                        <Grow className="w-full" placement="ec">
                          <Button color="primary" onClick={() => {}} only="default" size="md" variant="contained">
                            설계반영
                          </Button>
                        </Grow>
                        <Gcol variant={'box-info'} placement={'ss'} className="w-full">
                          <BulletList>
                            <BulletListItem size={'sm'}>
                              설계반영 클릭시 자동 처리됩니다. 이외의 사항은 심상요청이후 재확인바랍니다.
                            </BulletListItem>
                            <BulletListItem size={'sm'}>고지필요대상 : 알릴 사항 자동입력</BulletListItem>
                            <BulletListItem size={'sm'}>제한담보 : 일괄조정 & 연관담보 동시 조정</BulletListItem>
                          </BulletList>
                        </Gcol>
                      </Gcol>
                    </Gcol>
                  </Grow>
                </Gcol>
                <Gcol>
                  <TableFold>
                    <TableFoldHead title="대안설계"></TableFoldHead>
                    <TableFoldBody>
                      <Grow className="w-full mb-[1rem]" gap={5}>
                        {expectedUwRecommendData.map((item) => (
                          <RecommendCard
                            key={item.id}
                            onAiReasonClick={() => setAiReasonOpen(true)}
                            title={item.title}
                            plan={item.plan}
                            term={item.term}
                            detail={item.detail}
                          />
                        ))}
                        <Dialog open={aiReasonOpen} onOpenChange={setAiReasonOpen}>
                          <DialogTrigger asChild className="hidden"></DialogTrigger>
                          <DialogContent showCloseButton resizable={false} size="md">
                            <DialogHeader>
                              <DialogTitle>제목</DialogTitle>
                            </DialogHeader>

                            <DialogSection className="p-0 flex items-center justify-center">
                              <div
                                className="relative bg-[url('/images/Ltpa005/ai_box_img.jpg')] bg-center bg-no-repeat"
                                style={{ width: '50rem', height: '19rem', backgroundSize: '50.6rem 18.8rem' }}
                              >
                                <Typo
                                  tag={'p'}
                                  variant={'body-lg'}
                                  className="absolute right-[1rem] top-[1rem]"
                                  style={{ width: '33rem' }}
                                >
                                  고객님의 보장 내용을 분석해보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소
                                  부족한 것으로 확인됩니다.
                                  <br />
                                  <br /> 목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.
                                  <br />
                                  <br /> 현재 조건에서 보장과 보험료 균형을 고려한 추천설계입니다.
                                </Typo>
                              </div>
                            </DialogSection>
                            <DialogFooter>
                              <Gcol className="w-full" gap={0}>
                                <Grow placement={'ec'} gap={2} className="w-full pb-5 px-6">
                                  <Grow>
                                    <DialogClose asChild>
                                      <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                                        닫기
                                      </Button>
                                    </DialogClose>
                                  </Grow>
                                </Grow>
                              </Gcol>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </Grow>
                    </TableFoldBody>
                  </TableFold>
                </Gcol>
              </Gcol>
            )}
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              {active === 'common' ? (
                <>
                  <Button variant={'contained'} size={'xl'}>
                    저장
                  </Button>
                  <DialogClose asChild>
                    <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                      닫기
                    </Button>
                  </DialogClose>
                </>
              ) : active === 'accum' ? (
                <>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>
                    <AiIcon color={'#545454'} color2={'#545454'} />
                    AI인수한도해소
                  </Button>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>
                    타사정액담보해약확인서 등록
                  </Button>
                  <Button variant={'contained'} size={'xl'}>
                    보험료지침(지침)
                  </Button>
                  <DialogClose asChild>
                    <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                      닫기
                    </Button>
                  </DialogClose>
                </>
              ) : active === 'job' ? (
                <>
                  <Button variant={'contained'} size={'xl'}>
                    재조회
                  </Button>
                  <DialogClose asChild>
                    <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                      닫기
                    </Button>
                  </DialogClose>
                </>
              ) : (
                <>
                  <Button variant={'contained'} size={'xl'}>
                    설계생성
                  </Button>
                  <DialogClose asChild>
                    <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                      닫기
                    </Button>
                  </DialogClose>
                </>
              )}
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
