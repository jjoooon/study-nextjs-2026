'use client';

import { useReducer, useState, type ReactNode, useCallback } from 'react';

// Layout Components
import { LayoutMain, LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { LayoutScrollWrap, LayoutScrollItem } from '@common/LayoutScroll';

// Atomic Components
import { Grow, Gcol, Typo } from '@atoms';

// UIUX Components
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Badge } from '@uiux/Badge';


// Common Components
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { DatePickerInput } from '@common/DatePicker';
import { TabPager } from '@common/TabPager';
import { KeyValueItem } from '@common/KeyValueList';
import { TableTooltip } from '@/shared/components/tooltip/TableTooltip';
import { MainBottom, MainBottomItem } from '@features/MainFoot';

// Feature Components
import { LTPA350Step1 as MainFoot } from '@features/MainFoot';

// Icons
import { SearchIcon, PlusIcon } from '@icons';

// Hooks
import { useTabs } from '@/shared/hooks/useTabs';

// Data

import type { LTPA350Step1DataType } from '@/features/pub/proto/data/LTPA350Step1Data';
import { InputCombo } from '@/shared/components/common/InputCombo';

// Types

// Props Type
type LTPA350Step1Props = {
  data?: LTPA350Step1DataType;
  selectedPlanId?: number | null;
  onSelectPlan?: (planId: number) => void;
  className?: string;
  children?: ReactNode;
};

// State & Reducer Types
type ContractFormState = {
  insuranceStartDate: string;
  maturityValue: string;
  paymentPeriodValue: string;
  paymentCycleValue: string;
  renewalCycleValue: string;
  notificationTypeValue: string;
};

type ContractFormField = keyof ContractFormState;
type ContractFormAction = {
  type: 'setField';
  field: ContractFormField;
  value: string;
};
type InsuredPersonFormItem = {
  driveType: string;
  motorcycle: string;
  isDiscountApplied: boolean;
  relationWithContractor: string;
};

type PropertyAddressSelection = {
  home: boolean;
  office: boolean;
};

type GroupInsuredFormItem = {
  driveType: string;
};

const COMMON_RELATION_OPTIONS = [
  { value: '본인', id: 'relation-self', label: '본인' },
  { value: '자녀', id: 'relation-child', label: '자녀' },
  { value: '고용주', id: 'relation-employer', label: '고용주' },
] as const;

const PROPERTY_RELATION_OPTIONS = [
  { value: '고용주(사업주)', id: 'property-relation-employer', label: '고용주(사업주)' },
  { value: '고용인(종업원)', id: 'property-relation-employee', label: '고용인(종업원)' },
] as const;

const PROPERTY_ACTUAL_LOSS_TYPE_OPTIONS = [
  { value: '실손전부보상', id: 'property-actual-loss-full', label: '실손전부보상' },
] as const;


// --- Constants ---
{/* 인보험 */ }
const PERSONAL_INSURANCE_STEP1_DATA = {
  ContractorInfo: {
    insStartDate: '2026-03-04',   // 보험시기
    insStartPeriod: '2026-01-30', // 보험기간 start
    insEndPeriod: '2046-03-04',   // 보험기간 end
    expiryDate: '80',             // 만기 (option value 기준)
    payPeriod: '10',              // 납기
    payCycle: 'month',            // 납입주기
    renewCycle: '3',              // 갱신주기
    noticeType: 'type1',          // 고지 유형
  },
  InsuredPerson: [
    {
      type: 'default',
      tabName: '김한화Tab',
      name: '김한화',
      juminNumber: '900101-1******',
      age: 36,
      gender: '남',
      ageStandardDate: '2026-03-09',
      ageDDay: 'D-31',
      designAgreeDate: '2026-03-09',
      designAgreeDDay: 'D-20',
      jobCode: '52111',
      jobName: '소규모 상점 경영 및 일선 관리 종사원',
      jobGrade: '2급',
      driveType: 'private',
      motorcycle: 'nondriver',
      relationWithContractor: '본인', //주피관계
      actualLossSimulDesignNo: 'LA260219319244',
      premium: 33301,
      isDiscountApplied: 'Y',
    },
    {
      type: 'default',
      tabName: '이영희Tab',
      name: '이영희',
      juminNumber: '880520-2******',
      age: 38,
      gender: '여',
      ageStandardDate: '2026-05-20',
      ageDDay: 'D-68',
      designAgreeDate: '2026-03-10',
      designAgreeDDay: 'D-19',
      jobCode: '02111',
      jobName: '일반 사무 행정 전문가',
      jobGrade: '1급',
      driveType: 'private',
      motorcycle: 'nondriver',
      relationWithContractor: '본인', //주피관계
      actualLossSimulDesignNo: 'LA260310452133',
      premium: 28500,
      isDiscountApplied: 'N',
    },
    {
      type: 'child',
      tabName: '박지성Tab',
      name: '박지성',
      juminNumber: '021115-3******',
      age: 24,
      gender: '남',
      ageStandardDate: '2026-11-15',
      ageDDay: 'D-247',
      designAgreeDate: '2026-03-12',
      designAgreeDDay: 'D-17',
      jobCode: '74112',
      jobName: '전기 및 전자 설비 설치원',
      jobGrade: '3급',
      driveType: 'nondriver',
      motorcycle: 'drives',
      relationWithContractor: '본인', //주피관계
      actualLossSimulDesignNo: 'LA260312987412',
      premium: 45200,
      isDiscountApplied: 'Y',
    },
  ],
  Policyholder: {
    name: '김한화',                         // 계약자 이름
    juminNumber: '900101-1******',         // 계약자 주민등록번호
    infoAcquisitionPath: 'selection',      // 개인정보취득경로
    Relationship: '본인',                  // 계약자와의 관계
    addresses: '경기도 부천시 원미구 역곡동',  // 주소
    workAddress: '경상남도 진주시 (하대동)',  // 근무지 주소
    contact: '010-1234-5678',               // 연락처
    isBusinessOwner: 'Y',                   // 사업자 여부
    email: 'qwer@hwgi.kr',                  // 이메일
    electronicNoticeAgree: 'Y',             // 전자적 안내 동의 여부
    taxFreeType: 'nonemonthly',             // 보험차익비과세
    designAmount: 33301,                    // 설계금액
    remainingLimit: 100000000,              // 잔여한도
  },
};

{/* 태아보험 */ }
const CHILD_FETUS_INSURANCE_STEP1_DATA = {
  ContractorInfo: {
    insStartDate: '2026-01-30',   // 보험시기
    insStartPeriod: '2026-01-30', // 보험기간 start
    insEndPeriod: '2126-01-30',   // 보험기간 end
    expiryDate: '100',            // 만기 (option value 기준)
    payPeriod: '10',              // 납기
    payCycle: 'month',            // 납입주기
    renewCycle: '20',             // 갱신주기
    baby: 'Y',                    // 태아 가입 여부
    multiFetus: 'N',              // 다태아 여부
    advanceCommission: 'N',       // 수수료선지급 여부
    contract: 'Y',                // 계약전환
  },
  InsuredPerson: [
    {
      type: 'child',
      tabName: '최한화Tab',                         // tab 이름
      name: '태아',                               // 피보험자 이름
      juminNumber: '220101-3******',             // 주민등록번호
      age: 0,                                    // 나이
      gender: '남',                               // 성별
      ageStandardDate: '2026-03-09',             // 상령일
      ageDDay: 'D-31',                           // 상령일 D-Day
      jobCode: 'B6100',                          // 직업코드
      jobName: '미취학아동',                      // 직업명
      jobGrade: '1급',                            // 직업급수
      driveType: 'nondriver',                    // 운전형태
      motorcycle: 'nondriver',                   // 이륜차
      relationWithContractor: '자녀',           // 주피와 관계
      actualLossSimulDesignNo: '',               // (실손)동시설계 번호
      premium: 0,                               // 보험료
      isDiscountApplied: 'Y',                    // 할인적용 여부
      weeksOfPregnancy: 20,                      // 임신 주수 (태아 전용)
      dueDate: '2026-08-20',                     // 출산예정일 (태아 전용)
    },
  ],
  Policyholder: {
    name: '이한화',
    juminNumber: '910101-2******',
    Relationship: '본인',                  // 계약자와의 관계
    infoAcquisitionPath: '자녀',           // 개인정보취득경로
    addresses: '경남 진주시 하대동',
    workAddress: '경남 진주시 시청역',
    contact: '010-9876-5432',
    isBusinessOwner: 'N',
    email: 'endlskieio@naver.com',
    electronicNoticeAgree: 'N',
    taxFreeType: 'monthly',
    designAmount: 111,
    remainingLimit: 4298928,
  },
};

{/* 재물보험 */ }
const PROPERTY_INSURANCE_STEP1_DATA = {
  ContractorInfo: {
    insStartDate: '2026-01-31',
    insStartPeriod: '2026-01-31',
    insEndPeriod: '2126-01-31',
    expiryDate: '05',
    payPeriod: 'Y',
    groupHandling: 'Y',
    payCycle: 'year',
    renewCycle: '3',
  },
  InsuredPerson: [
    {
      type: 'default',
      tabName: '이영희Tab',
      name: '이영희',
      juminNumber: '880520-2******',
      age: 38,
      gender: '여',
      ageStandardDate: '2026-05-20',
      ageDDay: 'D-68',
      designAgreeDate: '2026-03-10',
      designAgreeDDay: 'D-19',
      jobCode: '02111',
      jobName: '일반 사무 행정 전문가',
      jobGrade: '3급',
      driveType: 'private',
      motorcycle: 'nondriver',
      relationWithContractor: '고용인(종업원)', //주피관계
    },
    {
      type: 'property', // 목적물
      tabName: '목적물Tab', //텝이름
      name: '최한화',       // 이름
      juminNumber: '880520-2******', // 주민번호
      age: 35,  // 나이
      gender: '남', // 성별
      isContractor: 'Y', //계약자와 동일
      isHome: 'Y', // 자택
      isOffice: 'N', // 직장
      propertyName: '목적물', // 목적물 이름
      location: '경기도 부천시 원미구 역곡동', // 소재지
      businessType: '060400', // 가입업종
      businessName: '(4)학원(기우너 및 교육목적의 가죽목공방)', // 가입업종명
      ratingBusinessType: '060400', // 요율적용업종
      ratingBusinessName: '(4)학원(기우너 및 교육목적의 가죽목공방)', // 요율적용업종명
      buildingGrade: '3', // 건물급수
      appliedBuildingGrade: '3', // 적용건물급수
      aboveGroundFloors: 3, // 건물상세 지상
      belowGroundFloors: 1, // 건물상세 지하
      buildingWidth: 1.00, // 건물 폭
      actualLossType: '실손전부보상', // 실손보상구분
      hasFireExtinguisher: 'Y', // 소화기 보유 여부
      isSpecialBuilding: 'N', // 특수건물 여부
      isMultipleComplexBuilding: 'Y', // 복합건물 여부
    },
  ],
  Policyholder: {
    name: '김한화',
    juminNumber: '920101-1******',
    infoAcquisitionPath: 'selection',
    Relationship: '본인',                  // 계약자와의 관계
    addresses: '경기도 부천시 원미구 역곡동1',
    workAddress: '경상남도 진주시 (하대동) 1',
    contact: '011-1234-5678',
    isBusinessOwner: 'Y',
    email: 'qwer@hwgi.kr',
    electronicNoticeAgree: 'Y',
    taxFreeType: 'nonemonthly',
    designAmount: 33301,
    remainingLimit: 100000000,
  },
};

{/* 단체보험 */ }
const GROUP_INSURANCE_STEP1_DATA = {
  ContractorInfo: {
    insStartDate: '2026-03-04',           // 보험시기
    insStartPeriod: '2026-01-30',         // 보험기간 start
    insEndPeriod: '2046-03-04',           // 보험기간 end
    expiryDate: '07',                     // 만기 (option value 기준)
    payPeriod: '05',                      // 납기
    payCycle: 'month',                    // 납입주기
    groupCategory: '피보험자단계(개별요율)', // 단체구분
    groupType: 'type2',                   // 단체유형
    totalCount: 100,                      // 총인원
    enrolledCount: 80,                    // 가입인원
    enrolledPercent: 20,                  // 가입비율
  },
  GroupInfo: [
    {
      groupName: '그룹명0',                // 그룹명
      age: 10,                           // 보험나이
      gender: '남',                      // 성별  
      member: 100,                       // 인원
      jobCode: '74112',                  // 직업코드
      jobName: '전기 및 전자 설비 설치원',  // 직업명
      jobGrade: '3급',                   // 직업등급
      driveType: 'nondriver',            // 운전형태
      insuredShip: '고용인(종업원)',       // 고용인
    },
    {
      groupName: '그룹명1',                // 그룹명
      age: 10,                           // 보험나이
      gender: '남',                      // 성별  
      member: 100,                       // 인원
      jobCode: '74112',                  // 직업코드
      jobName: '전기 및 전자 설비 설치원',  // 직업명
      jobGrade: '3급',                   // 직업등급
      driveType: 'nondriver',            // 운전형태
      insuredShip: '고용인(종업원)',       // 고용인
    },
    {
      groupName: '그룹명2',                // 그룹명
      age: 10,                           // 보험나이
      gender: '남',                      // 성별  
      member: 100,                       // 인원
      jobCode: '74112',                  // 직업코드
      jobName: '전기 및 전자 설비 설치원',  // 직업명
      jobGrade: '3급',                   // 직업등급
      driveType: 'nondriver',            // 운전형태
      insuredShip: '고용인(종업원)',       // 고용인
    }
  ],
  Policyholder: {
    name: '김한화',                         // 계약자 이름
    juminNumber: '900101-1******',         // 계약자 주민등록번호
    infoAcquisitionPath: '단체계약',      // 개인정보취득경로
    Relationship: '본인',                  // 계약자와의 관계
    addresses: '경기도 부천시 원미구 역곡동',  // 주소
    workAddress: '경상남도 진주시 (하대동)',  // 근무지 주소
    contact: '010-1234-5678',               // 연락처
    isBusinessOwner: 'Y',                   // 사업자 여부
    email: 'qwer@hwgi.kr',                  // 이메일
    electronicNoticeAgree: 'Y',             // 전자적 안내 동의 여부
    taxFreeType: 'nonemonthly',             // 보험차익비과세
    designAmount: 33301,                    // 설계금액
    remainingLimit: 100000000,              // 잔여한도
  },
}

{/* 연금저축보험 */ }
const PENSION_SAVINGS_INSURANCE_STEP1_DATA = {
  ContractorInfo: {
    insStartDate: '2026-03-04',   // 보험시기
    insStartPeriod: '2026-01-30', // 보험기간 start
    insEndPeriod: '2046-03-04',   // 보험기간 end
    pensionAge: 55,             // 개시연령
    payoutTerm: 10,             // 지급기간
    receiveMode: 'monthly',     // 수령방법
    payoutType: '정액형',        // 연금지급형
    payPeriod: 10,              // 납기
    payCycle: 'month',          // 납입주기
  },
  Policyholder: {
    name: '김한화',                         // 계약자 이름
    juminNumber: '900101-1******',         // 계약자 주민등록번호
    infoAcquisitionPath: '단체계약',      // 개인정보취득경로
    Relationship: '본인',                  // 계약자와의 관계
    addresses: '경기도 부천시 원미구 역곡동',  // 주소
    workAddress: '경상남도 진주시 (하대동)',  // 근무지 주소
    contact: '010-1234-5678',               // 연락처
    isBusinessOwner: 'Y',                   // 사업자 여부
    email: 'qwer@hwgi.kr',                  // 이메일
    electronicNoticeAgree: 'Y',             // 전자적 안내 동의 여부
    taxFreeType: 'nonemonthly',             // 보험차익비과세
    designAmount: 33301,                    // 설계금액
    remainingLimit: 100000000,              // 잔여한도
  },
}

const INSURANCE_STEP1_DATA_BY_PRODUCT = {
  personal: PERSONAL_INSURANCE_STEP1_DATA,
  childFetus: CHILD_FETUS_INSURANCE_STEP1_DATA,
  property: PROPERTY_INSURANCE_STEP1_DATA,
  pensionSavings: PENSION_SAVINGS_INSURANCE_STEP1_DATA,
} as const;

type PropertyInsuredDefaultPerson = {
  type: 'default';
  name: string;
  juminNumber: string;
  age: number;
  gender: string;
  ageStandardDate: string;
  ageDDay: string;
  designAgreeDate: string;
  designAgreeDDay: string;
  jobCode: string;
  jobName: string;
  jobGrade: string;
  relationWithContractor?: string;
  insuredShip?: string;
};
type PropertyOwnerPerson = {
  type: 'property';
  name: string;
  juminNumber: string;
  age: number;
  gender: string;
  isContractor: string;
  location: string;
  propertyName: string;
  businessType: string;
  businessName: string;
  ratingBusinessType: string;
  ratingBusinessName: string;
  buildingGrade: string;
  appliedBuildingGrade: string;
  aboveGroundFloors: number;
  belowGroundFloors: number;
  buildingWidth: number;
  actualLossType: string;
  hasFireExtinguisher: string;
  isSpecialBuilding: string;
  isMultipleComplexBuilding: string;
};

function isPropertyInsuredDefaultPerson(person: unknown): person is PropertyInsuredDefaultPerson {
  return typeof person === 'object' && person !== null && 'type' in person && person.type === 'default';
}

function isPropertyOwnerPerson(person: unknown): person is PropertyOwnerPerson {
  return typeof person === 'object' && person !== null && 'type' in person && person.type === 'property';
}

const personalInsuranceStep1Data = INSURANCE_STEP1_DATA_BY_PRODUCT.personal;

const CONTRACTOR_INFO = personalInsuranceStep1Data.ContractorInfo;
const POLICYHOLDER = personalInsuranceStep1Data.Policyholder;


// --- Initial State ---
const INITIAL_INSURED_FORM: Record<string, InsuredPersonFormItem> = Object.fromEntries(
  personalInsuranceStep1Data.InsuredPerson.map((person, i) => [
    `tab${i + 1}`,
    {
      driveType: person.driveType ?? '',
      motorcycle: person.motorcycle ?? '',
      isDiscountApplied: person.isDiscountApplied === 'Y',
      relationWithContractor: person.relationWithContractor ?? '',
    },
  ])
);

const INITIAL_CONTRACT_FORM_STATE: ContractFormState = {
  insuranceStartDate: CONTRACTOR_INFO.insStartDate,
  maturityValue: CONTRACTOR_INFO.expiryDate || '',
  paymentPeriodValue: CONTRACTOR_INFO.payPeriod || '',
  paymentCycleValue: CONTRACTOR_INFO.payCycle || '',
  renewalCycleValue: CONTRACTOR_INFO.renewCycle || '',
  notificationTypeValue: CONTRACTOR_INFO.noticeType || '',
};

// --- Reducer ---
function contractFormReducer(state: ContractFormState, action: ContractFormAction): ContractFormState {
  switch (action.type) {
    case 'setField':
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
}

export function LTPA350Step1({
  data: _data,
  selectedPlanId: _selectedPlanId,
  onSelectPlan: _onSelectPlan,
  className,
}: LTPA350Step1Props) {
  // ---------------------------------------------------------------------------
  // 1) Data source
  // ---------------------------------------------------------------------------
  const rangeValue = {
    from: CONTRACTOR_INFO.insStartPeriod,
    to: CONTRACTOR_INFO.insEndPeriod,
  };

  const childRangeValue = {
    from: CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.insStartPeriod,
    to: CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.insEndPeriod,
  };

  const propertyRangeValue = {
    from: PROPERTY_INSURANCE_STEP1_DATA.ContractorInfo.insStartPeriod,
    to: PROPERTY_INSURANCE_STEP1_DATA.ContractorInfo.insEndPeriod,
  };

  const groupRangeValue = {
    from: GROUP_INSURANCE_STEP1_DATA.ContractorInfo.insStartPeriod,
    to: GROUP_INSURANCE_STEP1_DATA.ContractorInfo.insEndPeriod,
  };

  const pensionRangeValue = {
    from: PENSION_SAVINGS_INSURANCE_STEP1_DATA.ContractorInfo.insStartPeriod,
    to: PENSION_SAVINGS_INSURANCE_STEP1_DATA.ContractorInfo.insEndPeriod,
  };

  // ---------------------------------------------------------------------------
  // 2) State & Reducer
  // ---------------------------------------------------------------------------
  const [contractForm, dispatchContractForm] = useReducer(contractFormReducer, INITIAL_CONTRACT_FORM_STATE);
  const [insuredForm, setInsuredForm] = useState<Record<string, InsuredPersonFormItem>>(INITIAL_INSURED_FORM);
  const [policyholderIsBusinessOwner, setPolicyholderIsBusinessOwner] = useState(POLICYHOLDER.isBusinessOwner === 'Y');
  const [taxFreeChecked, setTaxFreeChecked] = useState(false);
  const [taxFreeTypeValue, setTaxFreeTypeValue] = useState(POLICYHOLDER.taxFreeType ?? '');
  const [infoAcquisitionValue, setInfoAcquisitionValue] = useState(POLICYHOLDER.infoAcquisitionPath ?? '');
  const [contractorRelationshipValue, setContractorRelationshipValue] = useState(POLICYHOLDER.Relationship ?? '');

  // 어린이(태아) 상태
  const [childContractForm, dispatchChildContractForm] = useReducer(contractFormReducer, {
    insuranceStartDate: CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.insStartDate,
    maturityValue: CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.expiryDate || '',
    paymentPeriodValue: CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.payPeriod || '',
    paymentCycleValue: CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.payCycle || '',
    renewalCycleValue: CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.renewCycle || '',
    notificationTypeValue: '',
  });
  const [childInsuredForm, setChildInsuredForm] = useState<Record<string, InsuredPersonFormItem>>(
    Object.fromEntries(
      CHILD_FETUS_INSURANCE_STEP1_DATA.InsuredPerson.map((person, i) => [
        `tab${i + 1}`,
        {
          driveType: person.driveType ?? '',
          motorcycle: person.motorcycle ?? '',
          isDiscountApplied: person.isDiscountApplied === 'Y',
          relationWithContractor: person.relationWithContractor ?? '',
        },
      ])
    )
  );
  const [childPolicyholderIsBusinessOwner, setChildPolicyholderIsBusinessOwner] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.isBusinessOwner === 'Y'
  );
  const [childTaxFreeChecked, setChildTaxFreeChecked] = useState(false);
  const [childTaxFreeTypeValue, setChildTaxFreeTypeValue] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.taxFreeType ?? ''
  );
  const [childInfoAcquisitionValue, setChildInfoAcquisitionValue] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.infoAcquisitionPath ?? ''
  );
  const [childContractorRelationshipValue, setChildContractorRelationshipValue] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.Relationship ?? ''
  );
  const [childBabyChecked, setChildBabyChecked] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.baby === 'Y'
  );
  const [childMultiFetusChecked, setChildMultiFetusChecked] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.multiFetus === 'Y'
  );
  const [childAdvanceCommissionChecked, setChildAdvanceCommissionChecked] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.advanceCommission === 'Y'
  );
  const [childContractConversionChecked, setChildContractConversionChecked] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.contract === 'Y'
  );

  // 재물보험 상태
  const [propertyContractForm, dispatchPropertyContractForm] = useReducer(contractFormReducer, {
    insuranceStartDate: PROPERTY_INSURANCE_STEP1_DATA.ContractorInfo.insStartDate,
    maturityValue: PROPERTY_INSURANCE_STEP1_DATA.ContractorInfo.expiryDate || '',
    paymentPeriodValue: PROPERTY_INSURANCE_STEP1_DATA.ContractorInfo.payPeriod || '',
    paymentCycleValue: PROPERTY_INSURANCE_STEP1_DATA.ContractorInfo.payCycle || '',
    renewalCycleValue: PROPERTY_INSURANCE_STEP1_DATA.ContractorInfo.renewCycle || '',
    notificationTypeValue: '',
  });
  const [propertyInsuredForm, setPropertyInsuredForm] = useState<Record<string, InsuredPersonFormItem>>(
    Object.fromEntries(
      PROPERTY_INSURANCE_STEP1_DATA.InsuredPerson.map((person, i) => [
        `tab${i + 1}`,
        {
          driveType: person.driveType ?? '',
          motorcycle: person.motorcycle ?? '',
          isDiscountApplied: false,
          relationWithContractor:
            'relationWithContractor' in person
              ? (person.relationWithContractor ?? '')
              : '',
        },
      ])
    )
  );
  const [propertyGroupHandlingChecked, setPropertyGroupHandlingChecked] = useState(
    PROPERTY_INSURANCE_STEP1_DATA.ContractorInfo.groupHandling === 'Y'
  );
  const [propertyPolicyholderIsBusinessOwner, setPropertyPolicyholderIsBusinessOwner] = useState(
    PROPERTY_INSURANCE_STEP1_DATA.Policyholder.isBusinessOwner === 'Y'
  );
  const [propertyTaxFreeChecked, setPropertyTaxFreeChecked] = useState(false);
  const [propertyTaxFreeTypeValue, setPropertyTaxFreeTypeValue] = useState(
    PROPERTY_INSURANCE_STEP1_DATA.Policyholder.taxFreeType ?? ''
  );
  const [propertyInfoAcquisitionValue, setPropertyInfoAcquisitionValue] = useState(
    PROPERTY_INSURANCE_STEP1_DATA.Policyholder.infoAcquisitionPath ?? ''
  );
  const [propertyContractorRelationshipValue, setPropertyContractorRelationshipValue] = useState(
    PROPERTY_INSURANCE_STEP1_DATA.Policyholder.Relationship ?? ''
  );
  const [propertyActualLossTypeByTab, setPropertyActualLossTypeByTab] = useState<Record<string, string>>(
    Object.fromEntries(
      PROPERTY_INSURANCE_STEP1_DATA.InsuredPerson.map((person, i) => [
        `tab${i + 1}`,
        'actualLossType' in person ? (person.actualLossType ?? '') : '',
      ])
    )
  );
  const [propertyOwnerSameAsContractor, setPropertyOwnerSameAsContractor] = useState<Record<string, boolean>>(
    Object.fromEntries(
      PROPERTY_INSURANCE_STEP1_DATA.InsuredPerson.map((person, i) => [
        `tab${i + 1}`,
        person.type === 'property' ? person.isContractor === 'Y' : false,
      ])
    )
  );
  const [propertyLocationByTab, setPropertyLocationByTab] = useState<Record<string, string>>(
    Object.fromEntries(
      PROPERTY_INSURANCE_STEP1_DATA.InsuredPerson.map((person, i) => [
        `tab${i + 1}`,
        person.type === 'property' ? (person.location ?? '') : '',
      ])
    )
  );
  const [propertyAddressSelectionByTab, setPropertyAddressSelectionByTab] = useState<Record<string, PropertyAddressSelection>>(
    Object.fromEntries(
      PROPERTY_INSURANCE_STEP1_DATA.InsuredPerson.map((person, i) => [
        `tab${i + 1}`,
        person.type === 'property'
          ? {
            home: person.isHome === 'Y',
            office: person.isOffice === 'Y',
          }
          : {
            home: false,
            office: false,
          },
      ])
    )
  );
  const [propertyHasFireExtinguisherByTab, setPropertyHasFireExtinguisherByTab] = useState<Record<string, boolean>>(
    Object.fromEntries(
      PROPERTY_INSURANCE_STEP1_DATA.InsuredPerson.map((person, i) => [
        `tab${i + 1}`,
        person.type === 'property' ? person.hasFireExtinguisher === 'Y' : false,
      ])
    )
  );
  const [propertyIsSpecialBuildingByTab, setPropertyIsSpecialBuildingByTab] = useState<Record<string, boolean>>(
    Object.fromEntries(
      PROPERTY_INSURANCE_STEP1_DATA.InsuredPerson.map((person, i) => [
        `tab${i + 1}`,
        person.type === 'property' ? person.isSpecialBuilding === 'Y' : false,
      ])
    )
  );
  const [propertyIsMultipleComplexBuildingByTab, setPropertyIsMultipleComplexBuildingByTab] = useState<Record<string, boolean>>(
    Object.fromEntries(
      PROPERTY_INSURANCE_STEP1_DATA.InsuredPerson.map((person, i) => [
        `tab${i + 1}`,
        person.type === 'property' ? person.isMultipleComplexBuilding === 'Y' : false,
      ])
    )
  );

  // 단체보험 상태
  const [groupContractForm, dispatchGroupContractForm] = useReducer(contractFormReducer, {
    insuranceStartDate: GROUP_INSURANCE_STEP1_DATA.ContractorInfo.insStartDate,
    maturityValue: GROUP_INSURANCE_STEP1_DATA.ContractorInfo.expiryDate || '',
    paymentPeriodValue: GROUP_INSURANCE_STEP1_DATA.ContractorInfo.payPeriod || '',
    paymentCycleValue: GROUP_INSURANCE_STEP1_DATA.ContractorInfo.payCycle || '',
    renewalCycleValue: '',
    notificationTypeValue: '',
  });
  const [groupInsuredForm, setGroupInsuredForm] = useState<Record<string, GroupInsuredFormItem>>(
    Object.fromEntries(
      GROUP_INSURANCE_STEP1_DATA.GroupInfo.map((item, i) => [
        `tab${i + 1}`,
        { driveType: item.driveType ?? '' },
      ])
    )
  );
  const [groupPolicyholderIsBusinessOwner, setGroupPolicyholderIsBusinessOwner] = useState(
    GROUP_INSURANCE_STEP1_DATA.Policyholder.isBusinessOwner === 'Y'
  );
  const [groupTaxFreeChecked, setGroupTaxFreeChecked] = useState(false);
  const [groupTaxFreeTypeValue, setGroupTaxFreeTypeValue] = useState(
    GROUP_INSURANCE_STEP1_DATA.Policyholder.taxFreeType ?? ''
  );
  const [groupInfoAcquisitionValue, setGroupInfoAcquisitionValue] = useState(
    GROUP_INSURANCE_STEP1_DATA.Policyholder.infoAcquisitionPath ?? ''
  );
  const [groupContractorRelationshipValue, setGroupContractorRelationshipValue] = useState(
    GROUP_INSURANCE_STEP1_DATA.Policyholder.Relationship ?? ''
  );

  // 연금/저축보험 상태
  const [pensionInsuranceStartDate, setPensionInsuranceStartDate] = useState(
    PENSION_SAVINGS_INSURANCE_STEP1_DATA.ContractorInfo.insStartDate
  );
  const [pensionAgeValue, setPensionAgeValue] = useState(
    String(PENSION_SAVINGS_INSURANCE_STEP1_DATA.ContractorInfo.pensionAge)
  );
  const [pensionPayoutTermValue, setPensionPayoutTermValue] = useState(
    String(PENSION_SAVINGS_INSURANCE_STEP1_DATA.ContractorInfo.payoutTerm)
  );
  const [pensionReceiveModeValue, setPensionReceiveModeValue] = useState(
    PENSION_SAVINGS_INSURANCE_STEP1_DATA.ContractorInfo.receiveMode ?? ''
  );
  const [pensionPayoutTypeValue, setPensionPayoutTypeValue] = useState(
    PENSION_SAVINGS_INSURANCE_STEP1_DATA.ContractorInfo.payoutType ?? ''
  );
  const [pensionPayPeriodValue, setPensionPayPeriodValue] = useState(
    String(PENSION_SAVINGS_INSURANCE_STEP1_DATA.ContractorInfo.payPeriod)
  );
  const [pensionPayCycleValue, setPensionPayCycleValue] = useState(
    PENSION_SAVINGS_INSURANCE_STEP1_DATA.ContractorInfo.payCycle ?? ''
  );
  const [pensionPolicyholderIsBusinessOwner, setPensionPolicyholderIsBusinessOwner] = useState(
    PENSION_SAVINGS_INSURANCE_STEP1_DATA.Policyholder.isBusinessOwner === 'Y'
  );
  const [pensionTaxFreeChecked, setPensionTaxFreeChecked] = useState(false);
  const [pensionTaxFreeTypeValue, setPensionTaxFreeTypeValue] = useState(
    PENSION_SAVINGS_INSURANCE_STEP1_DATA.Policyholder.taxFreeType ?? ''
  );
  const [pensionInfoAcquisitionValue, setPensionInfoAcquisitionValue] = useState(
    PENSION_SAVINGS_INSURANCE_STEP1_DATA.Policyholder.infoAcquisitionPath ?? ''
  );
  const [pensionContractorRelationshipValue, setPensionContractorRelationshipValue] = useState(
    PENSION_SAVINGS_INSURANCE_STEP1_DATA.Policyholder.Relationship ?? ''
  );
  const [simpleInsuredBirthDate, setSimpleInsuredBirthDate] = useState('');
  const [simpleChildInsuredBirthDate, setSimpleChildInsuredBirthDate] = useState('');
  const [simplePropertyInsuredBirthDate, setSimplePropertyInsuredBirthDate] = useState('');

  // ---------------------------------------------------------------------------
  // 3) Tabs
  // ---------------------------------------------------------------------------
  const {
    tabs,
    active: tabValue,
    setActive: setTabValue,
    handleRemove: handleRemoveTab,
  } = useTabs(
    personalInsuranceStep1Data.InsuredPerson.map((person, i) => ({
      value: `tab${i + 1}`,
      label: person.tabName,
      error: false,
    }))
  );

  const currentPersonIndex = personalInsuranceStep1Data.InsuredPerson.findIndex((_, i) => `tab${i + 1}` === tabValue);
  const currentPerson = personalInsuranceStep1Data.InsuredPerson[currentPersonIndex >= 0 ? currentPersonIndex : 0]!;

  // 어린이(태아) 탭
  const {
    tabs: childTabs,
    active: childTabValue,
    setActive: setChildTabValue,
    handleRemove: handleRemoveChildTab,
  } = useTabs(
    CHILD_FETUS_INSURANCE_STEP1_DATA.InsuredPerson.map((person, i) => ({
      value: `tab${i + 1}`,
      label: person.tabName,
      error: false,
    }))
  );

  const childCurrentPersonIndex = CHILD_FETUS_INSURANCE_STEP1_DATA.InsuredPerson.findIndex((_, i) => `tab${i + 1}` === childTabValue);
  const childCurrentPerson = CHILD_FETUS_INSURANCE_STEP1_DATA.InsuredPerson[childCurrentPersonIndex >= 0 ? childCurrentPersonIndex : 0]!;

  // 재물보험 탭
  const {
    tabs: propertyTabs,
    active: propertyTabValue,
    setActive: setPropertyTabValue,
    handleRemove: handleRemovePropertyTab,
  } = useTabs(
    PROPERTY_INSURANCE_STEP1_DATA.InsuredPerson.map((person, i) => ({
      value: `tab${i + 1}`,
      label: person.tabName,
      error: false,
    }))
  );

  const propertyCurrentPersonIndex = PROPERTY_INSURANCE_STEP1_DATA.InsuredPerson.findIndex((_, i) => `tab${i + 1}` === propertyTabValue);
  const propertyCurrentPerson = PROPERTY_INSURANCE_STEP1_DATA.InsuredPerson[propertyCurrentPersonIndex >= 0 ? propertyCurrentPersonIndex : 0]!;
  const propertyCurrentDefaultPerson = isPropertyInsuredDefaultPerson(propertyCurrentPerson) ? propertyCurrentPerson : null;
  const propertyCurrentOwnerPerson = isPropertyOwnerPerson(propertyCurrentPerson) ? propertyCurrentPerson : null;
  const isPropertyInsuredTab = propertyCurrentDefaultPerson !== null;
  const isPropertyOwnerTab = propertyCurrentOwnerPerson !== null;

  // 단체보험 탭
  const {
    tabs: groupTabs,
    active: groupTabValue,
    setActive: setGroupTabValue,
    handleRemove: handleRemoveGroupTab,
  } = useTabs(
    GROUP_INSURANCE_STEP1_DATA.GroupInfo.map((item, i) => ({
      value: `tab${i + 1}`,
      label: item.groupName,
      error: false,
    }))
  );

  const groupCurrentItemIndex = GROUP_INSURANCE_STEP1_DATA.GroupInfo.findIndex((_, i) => `tab${i + 1}` === groupTabValue);
  const groupCurrentItem = GROUP_INSURANCE_STEP1_DATA.GroupInfo[groupCurrentItemIndex >= 0 ? groupCurrentItemIndex : 0]!;

  // ---------------------------------------------------------------------------
  // 4) Handlers
  // ---------------------------------------------------------------------------
  const handleContractFieldChange = useCallback((field: ContractFormField, value: string) => {
    dispatchContractForm({ type: 'setField', field, value });
  }, []);

  const handleTodayClick = useCallback(() => {
    handleContractFieldChange('insuranceStartDate', new Date().toISOString().slice(0, 10));
  }, [handleContractFieldChange]);

  const updateInsuredField = useCallback((tab: string, field: keyof InsuredPersonFormItem, value: string | boolean) => {
    setInsuredForm((prev) => ({ ...prev, [tab]: { ...prev[tab]!, [field]: value } }));
  }, []);

  const handleSimpleInsuredBirthDateChange = useCallback((_: unknown, formattedValue?: string) => {
    setSimpleInsuredBirthDate(formattedValue ?? '');
  }, []);

  // 어린이(태아) 핸들러
  const handleChildContractFieldChange = useCallback((field: ContractFormField, value: string) => {
    dispatchChildContractForm({ type: 'setField', field, value });
  }, []);

  const handleChildTodayClick = useCallback(() => {
    handleChildContractFieldChange('insuranceStartDate', new Date().toISOString().slice(0, 10));
  }, [handleChildContractFieldChange]);

  const updateChildInsuredField = useCallback((tab: string, field: keyof InsuredPersonFormItem, value: string | boolean) => {
    setChildInsuredForm((prev) => ({ ...prev, [tab]: { ...prev[tab]!, [field]: value } }));
  }, []);

  const handleSimpleChildInsuredBirthDateChange = useCallback((_: unknown, formattedValue?: string) => {
    setSimpleChildInsuredBirthDate(formattedValue ?? '');
  }, []);

  // 재물보험 핸들러
  const handlePropertyContractFieldChange = useCallback((field: ContractFormField, value: string) => {
    dispatchPropertyContractForm({ type: 'setField', field, value });
  }, []);

  const handlePropertyTodayClick = useCallback(() => {
    handlePropertyContractFieldChange('insuranceStartDate', new Date().toISOString().slice(0, 10));
  }, [handlePropertyContractFieldChange]);

  const updatePropertyInsuredField = useCallback((tab: string, field: keyof InsuredPersonFormItem, value: string | boolean) => {
    setPropertyInsuredForm((prev) => ({ ...prev, [tab]: { ...prev[tab]!, [field]: value } }));
  }, []);

  const handleSimplePropertyInsuredBirthDateChange = useCallback((_: unknown, formattedValue?: string) => {
    setSimplePropertyInsuredBirthDate(formattedValue ?? '');
  }, []);

  const handlePropertyActualLossTypeChange = useCallback((tab: string, value: string) => {
    setPropertyActualLossTypeByTab((prev) => ({
      ...prev,
      [tab]: value,
    }));
  }, []);

  const handlePropertyHasFireExtinguisherChange = useCallback((tab: string, checked: boolean) => {
    setPropertyHasFireExtinguisherByTab((prev) => ({ ...prev, [tab]: checked }));
  }, []);

  const handlePropertyIsSpecialBuildingChange = useCallback((tab: string, checked: boolean) => {
    setPropertyIsSpecialBuildingByTab((prev) => ({ ...prev, [tab]: checked }));
  }, []);

  const handlePropertyIsMultipleComplexBuildingChange = useCallback((tab: string, checked: boolean) => {
    setPropertyIsMultipleComplexBuildingByTab((prev) => ({ ...prev, [tab]: checked }));
  }, []);

  const handlePropertyOwnerSameAsContractorChange = useCallback((tab: string, checked: boolean) => {
    setPropertyOwnerSameAsContractor((prev) => ({
      ...prev,
      [tab]: checked,
    }));

    if (!checked) {
      setPropertyAddressSelectionByTab((prev) => ({
        ...prev,
        [tab]: {
          home: false,
          office: false,
        },
      }));
    }
  }, []);

  const handlePropertyOwnerAddressSelectionChange = useCallback((tab: string, source: 'home' | 'office', checked: boolean) => {
    setPropertyAddressSelectionByTab((prev) => ({
      ...prev,
      [tab]: {
        home: source === 'home' ? checked : (prev[tab]?.home ?? false),
        office: source === 'office' ? checked : (prev[tab]?.office ?? false),
      },
    }));
  }, []);

  const handlePropertyOwnerAddressImport = useCallback((tab: string) => {
    const selection = propertyAddressSelectionByTab[tab] ?? { home: false, office: false };

    let nextLocation = '';
    if (selection.home) {
      nextLocation = PROPERTY_INSURANCE_STEP1_DATA.Policyholder.addresses;
    } else if (selection.office) {
      nextLocation = PROPERTY_INSURANCE_STEP1_DATA.Policyholder.workAddress;
    }

    setPropertyLocationByTab((prev) => ({
      ...prev,
      [tab]: nextLocation,
    }));
  }, [propertyAddressSelectionByTab]);

  // 단체보험 핸들러
  const handleGroupContractFieldChange = useCallback((field: ContractFormField, value: string) => {
    dispatchGroupContractForm({ type: 'setField', field, value });
  }, []);

  const handleGroupTodayClick = useCallback(() => {
    handleGroupContractFieldChange('insuranceStartDate', new Date().toISOString().slice(0, 10));
  }, [handleGroupContractFieldChange]);

  const updateGroupInsuredField = useCallback((tab: string, field: keyof GroupInsuredFormItem, value: string) => {
    setGroupInsuredForm((prev) => ({ ...prev, [tab]: { ...prev[tab]!, [field]: value } }));
  }, []);

  // 연금/저축보험 핸들러
  const handlePensionInsuranceStartDateChange = useCallback((date: string) => {
    setPensionInsuranceStartDate(date);
  }, []);

  const handlePensionTodayClick = useCallback(() => {
    setPensionInsuranceStartDate(new Date().toISOString().slice(0, 10));
  }, []);

  return (
    // ---------------------------------------------------------------------------
    // 5) Render
    // ---------------------------------------------------------------------------
    <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem]">
      <LayoutMainBody>
        <LayoutScrollWrap>
          <LayoutScrollItem>
            <Gcol placement={'ss'} className="w-full gap-[1.2rem]">

              {/* 인보험 */}
              <Typo variant={'heading-md'}>인보험(확인용 타이틀 추후 삭제)</Typo>
              <Grow placement={'ss'} className="w-full">
                <FormTable caption="보험정보"cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]','min-w-[32.6rem] flex-1']}>
                  <FormRow>
                    <FormCell title={'보험시기'}>
                      <DatePickerInput
                        value={contractForm.insuranceStartDate}
                        mode={'single'}
                        width={'9rem'}
                        onChange={(_, formattedValue) => handleContractFieldChange('insuranceStartDate', formattedValue ?? '')}
                      />
                      <Button
                        color={'secondary'}
                        onClick={handleTodayClick}
                        only={'default'}
                        size={'lg'}
                        variant={'outlined'}
                      >
                        오늘
                      </Button>
                    </FormCell>
                    <FormCell title={'보험기간'}>
                      <DatePickerInput readOnly mode={'range'} width={'9rem'} rangeValue={rangeValue} />
                    </FormCell>
                  </FormRow>

                  <FormRow>
                    <FormCell title={'만기'} colSpan={3}>
                      <RadioGroup
                        value={contractForm.maturityValue}
                        onValueChange={(value) => handleContractFieldChange('maturityValue', value)}
                        className="flex-row gap-3"
                      >
                        {[
                          { value: '80', id: 'insurance-period-80', label: '80세' },
                          { value: '90', id: 'insurance-period-90', label: '90세' },
                          { value: '100', id: 'insurance-period-100-a', label: '100세' },
                          { value: '110', id: 'insurance-period-100-b', label: '110세' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'납기'} colSpan={3}>
                      <RadioGroup
                        value={contractForm.paymentPeriodValue}
                        onValueChange={(value) => handleContractFieldChange('paymentPeriodValue', value)}
                        className="flex-row gap-3"
                      >
                        {[
                          { value: '10', id: 'payment-period-10', label: '10년납' },
                          { value: '15', id: 'payment-period-15', label: '15년납' },
                          { value: '20', id: 'payment-period-20', label: '20년납' },
                          { value: '25', id: 'payment-period-25', label: '25년납' },
                          { value: '30', id: 'payment-period-30', label: '30년납' },
                          { value: 'life', id: 'payment-period-lifetime', label: '전기납' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>

                  <FormRow>
                    <FormCell title={'납입주기'}>
                      <RadioGroup
                        value={contractForm.paymentCycleValue}
                        onValueChange={(value) => handleContractFieldChange('paymentCycleValue', value)}
                        className="flex-row gap-3"
                      >
                        {[
                          { value: 'month', id: 'payment-cycle-monthly', label: '월납' },
                          { value: 'quarter', id: 'payment-cycle-quarterly', label: '3개월' },
                          { value: 'semiannual', id: 'payment-cycle-semiannual', label: '6개월' },
                          { value: 'year', id: 'payment-cycle-annual', label: '연납' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                    <FormCell title={'갱신주기'}>
                      <RadioGroup
                        value={contractForm.renewalCycleValue}
                        onValueChange={(value) => handleContractFieldChange('renewalCycleValue', value)}
                        className="flex-row gap-3"
                      >
                        {[
                          { value: '3', id: 'renewal-period-3', label: '3년' },
                          { value: '10', id: 'renewal-period-10', label: '10년' },
                          { value: '20', id: 'renewal-period-20', label: '20년' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>

                  <FormRow>
                    <FormCell title={'고지유형'} colSpan={3}>
                      <RadioGroup
                        value={contractForm.notificationTypeValue}
                        onValueChange={(value) => handleContractFieldChange('notificationTypeValue', value)}
                        width={'full'}
                        className="grid grid-cols-3 gap-x-6 gap-y-2 w-full"
                      >
                        {[
                          { value: 'type1', id: 'notification-type-1', label: '1형(일반고지형)', justifyStart: true },
                          { value: 'type2', id: 'notification-type-2', label: '2형(건강고지형II(6년))', justifyStart: true },
                          { value: 'type3', id: 'notification-type-3', label: '3형(건강고지형II(7년))', justifyStart: true },
                          { value: 'type4', id: 'notification-type-4', label: '4형(건강고지형II(8년))', justifyStart: true },
                          { value: 'type5', id: 'notification-type-5', label: '5형(건강고지형II(9년))', justifyStart: true },
                          { value: 'type6', id: 'notification-type-6', label: '6형(건강고지형II(10년))', justifyStart: true },
                        ].map((option) => (
                          <RadioGroupItem
                            key={option.id}
                            className={option.justifyStart ? 'justify-start' : undefined}
                            value={option.value}
                            id={option.id}
                          >
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </Grow>
              <Gcol placement="ss" className={'w-full'}>
                <TabPager
                  variant={'default'}
                  data={tabs}
                  active={tabValue}
                  setActive={setTabValue}
                  renderButtons={
                    <Grow gap={2.5}>
                      <Button color={'gray'} size={'md'} variant={'outlined'}>
                        피보험자
                        <PlusIcon color={'#61554F'} />
                      </Button>
                    </Grow>
                  }
                  removable
                  onRemove={handleRemoveTab}
                  visibleCount={5}
                  getValue={(tab) => String(tab.value)}
                  renderTab={(tab) => tab.label}
                >
                  <div className="w-full h-full relative">
                    <Gcol placement={'ss'}>
                      <FormTable caption="행/열 병합 케이스" lineTop={false} cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]','min-w-[32.6rem] flex-1']}>
                        {/* 상세 화면 전용 */}
                        <FormRow>
                          <FormCell colSpan={3} title={'피보험자'} titleVariant="section">
                            <Grow className="flex-nowrap w-full" placement={'bwc'}>
                              <Grow>
                                <Input aria-label="피보험자명" width={'7.6rem'} value={currentPerson.name} readOnly />
                                <Input aria-label="주민등록번호 마스킹" width={'12rem'} value={currentPerson.juminNumber} readOnly />
                                <Button aria-label="피보험자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                  <SearchIcon color={'var(--color-primary-50)'} />
                                </Button>
                                <Input aria-label="피보험자 나이" width={'4.6rem'} value={`${currentPerson.age}세`} readOnly />
                                <Input aria-label="피보험자 성별" width={'3.2rem'} value={currentPerson.gender} readOnly />
                              </Grow>
                              <Grow gap={2}>
                                <KeyValueItem label={'상령일'}>
                                  <Grow gap={1}>
                                    <Typo weight={'bold'}>
                                      {currentPerson.ageStandardDate}
                                    </Typo>
                                    <Badge color={'blue'} size={'md'} variant={'contained'}>{currentPerson.ageDDay}</Badge>
                                  </Grow>
                                </KeyValueItem>
                                <KeyValueItem label={'설계동의'}>
                                  <Grow gap={1}>
                                    <Typo weight={'bold'}>
                                      {currentPerson.designAgreeDate}
                                    </Typo>
                                    <Badge color={'red'} size={'md'} variant={'contained'}>{currentPerson.designAgreeDDay}</Badge>
                                  </Grow>
                                </KeyValueItem>
                                <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => { }}>
                                  알림톡발송
                                </Button>
                              </Grow>
                            </Grow>
                          </FormCell>
                        </FormRow>
                        {/* //상세 화면 전용 */}
                        {/* 간편 화면 전용 */}
                        <FormRow>
                          <FormCell title="피보험자" titleVariant="section">
                            <InputCombo
                              clear
                              onChange={() => { }}
                              options={[
                                {
                                  label: <div>박은빈</div>,
                                  value: ''
                                },
                                {
                                  label: <div>김민지</div>,
                                  value: 'LA24094848896'
                                },
                                {
                                  label: <div>이도현</div>,
                                  value: 'LA25094848897'
                                },
                                {
                                  label: <div>최수영</div>,
                                  value: 'LA25094848898'
                                },
                                {
                                  label: <div>박보검</div>,
                                  value: 'LA25094848899'
                                },
                                {
                                  label: <div>한지민</div>,
                                  value: 'LA25094848900'
                                }
                              ]}
                              placeholder=""
                              popoverPlacement="bottom"
                              required
                              size="lg"
                              value=""
                              variant="default"
                              width={'7.6rem'}
                            />
                            <Button aria-label="피보험자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                            <RadioGroup className='flex-row gap-3'>
                              <RadioGroupItem value="man" id="man" checked>남</RadioGroupItem>
                              <RadioGroupItem value="woman" id="woman">여</RadioGroupItem>
                            </RadioGroup>
                          </FormCell>
                          <FormCell title="연령">
                            <Grow gap={3}>
                              <Grow>
                                <Input aria-label="피보험자 나이" width={'4.6rem'} value={''} required />세
                              </Grow>
                              <DatePickerInput
                                value={simpleInsuredBirthDate}
                                mode={'single'}
                                width={'9rem'}
                                onChange={handleSimpleInsuredBirthDateChange}
                                required
                              />
                            </Grow>
                          </FormCell>
                        </FormRow>
                        {/* //간편 화면 전용 */}
                        <FormRow>
                          <FormCell title="직업" colSpan={3}>
                            <Grow className="gap-1 flex-nowrap w-full" placement={'ss'}>
                              <Input aria-label="직업코드" width={'7.6rem'} value={currentPerson.jobCode} readOnly />
                              <Input aria-label="직업분류" width={'27.4rem'} value={currentPerson.jobName} readOnly />
                              <Button aria-label="피보험자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <Input aria-label="피보험자 나이" width={'2xs'} value={currentPerson.jobGrade} readOnly />
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="운전형태">
                            <RadioGroup
                              value={insuredForm[tabValue]?.driveType ?? ''}
                              onValueChange={(v) => updateInsuredField(tabValue, 'driveType', v)}
                              className='flex-row gap-3'
                            >
                              {[
                                { value: 'private', id: 'driving-type-private', label: '자가용' },
                                { value: 'commercial', id: 'driving-type-commercial', label: '영업용' },
                                { value: 'nondriver', id: 'driving-type-nondriver', label: '비운전자' },
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                          <FormCell title="이륜차">
                            <RadioGroup
                              value={insuredForm[tabValue]?.motorcycle ?? ''}
                              onValueChange={(v) => updateInsuredField(tabValue, 'motorcycle', v)}
                              className='flex-row gap-3'
                            >
                              {[
                                { value: 'drives', id: 'motorcycle-drives', label: '운전함' },
                                { value: 'nondriver', id: 'motorcycle-nondriver', label: '운전안함' }
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="주피와 관계">
                            <Input aria-label="피보험자명" width={'7.6rem'} value={currentPerson.name} readOnly />는 계약자의
                            <NativeSelect
                              aria-label="계약자와의 관계 선택"
                              width={'15.8rem'}
                              required
                              value={insuredForm[tabValue]?.relationWithContractor ?? ''}
                              onChange={(e) => updateInsuredField(tabValue, 'relationWithContractor', e.target.value)}
                            >
                              {COMMON_RELATION_OPTIONS.map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="(실손)동시설계">
                            <Input aria-label="코드" width={'13rem'} value={currentPerson.actualLossSimulDesignNo} readOnly />
                            <Input aria-label="코드" width={'13rem'} value={String(currentPerson.premium)} commaAmount readOnly />
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'할인적용'} colSpan={3}>
                            <Checkbox
                              color="primary"
                              checked={insuredForm[tabValue]?.isDiscountApplied ?? false}
                              onCheckedChange={(c) => updateInsuredField(tabValue, 'isDiscountApplied', c === true)}
                              size="md"
                              variant="default"
                            >
                              가족연계할인
                            </Checkbox>
                            <Button aria-label="피보험자 검색" variant="outlined" only="icon" size="lg" color="gray-light">
                              <SearchIcon color="var(--color-primary-50)" />
                            </Button>
                          </FormCell>
                        </FormRow>
                      </FormTable>

                      {/* 간편 화면 미노출 */}
                      <FormTable caption="계약자 정보" cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]','min-w-[32.6rem] flex-1']}>
                        <FormRow>
                          <FormCell title={'계약자'} titleVariant="section" colSpan={3}>
                            <Grow>
                              <Input aria-label="계약자명" width="7.6rem" value={POLICYHOLDER.name} readOnly />
                              <Input aria-label="주민등록번호 마스킹" width="12rem" value={POLICYHOLDER.juminNumber} readOnly />
                              <Button aria-label="피보험자 검색" variant="outlined" only="icon" color="gray-light" size="lg">
                                <SearchIcon color="var(--color-primary-50)" />
                              </Button>
                              <Checkbox
                                color="primary"
                                checked={policyholderIsBusinessOwner}
                                onCheckedChange={(c) => setPolicyholderIsBusinessOwner(c === true)}
                                size="md"
                                variant="default"
                              >
                                개인사업자
                              </Checkbox>
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="계약자와 관계">
                            <Input aria-label="피보험자명" width={'7.6rem'} value={currentPerson.name} readOnly />는 계약자의
                            <NativeSelect
                              aria-label="계약자와의 관계 선택"
                              width={'15.8rem'}
                              required
                              value={contractorRelationshipValue}
                              onChange={(e) => setContractorRelationshipValue(e.target.value)}
                            >
                              {COMMON_RELATION_OPTIONS.map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="개인정보취득경로">
                            <NativeSelect
                              aria-label="개인정보취득경로 선택"
                              width="20rem"
                              required
                              value={infoAcquisitionValue}
                              onChange={(e) => setInfoAcquisitionValue(e.target.value)}
                            >
                              {[
                                { value: 'selection', id: 'personalinfo-1', label: '고객직접선택' },
                                { value: 'selection2', id: 'personalinfo-2', label: '선택' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="자택(소재지)" colSpan={3}>
                            {POLICYHOLDER.addresses}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="직장(본사)" colSpan={3}>
                            {POLICYHOLDER.workAddress}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="연락처">
                            <Grow placement='bwc'>
                              <Grow>{POLICYHOLDER.contact}</Grow>
                              <Grow>
                                <KeyValueItem label="전자적안내동의">
                                  <Grow placement='sc' gap="0">
                                    <Badge color="green" size="md" variant="ghost">{POLICYHOLDER.electronicNoticeAgree}</Badge>
                                    <TableTooltip />
                                  </Grow>
                                </KeyValueItem>
                              </Grow>
                            </Grow>
                          </FormCell>
                          <FormCell title="이메일">
                            {POLICYHOLDER.email}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="보험차익비과세">
                            <Checkbox
                              color="primary"
                              checked={taxFreeChecked}
                              onCheckedChange={(c) => setTaxFreeChecked(c === true)}
                              size="md"
                              variant="default"
                            >
                              가입
                            </Checkbox>
                            <NativeSelect
                              aria-label="비과세 유형 선택"
                              width="17rem"
                              value={taxFreeTypeValue}
                              onChange={(e) => setTaxFreeTypeValue(e.target.value)}
                            >
                              {[
                                { value: 'monthly', id: 'monthly-payment-monthly', label: '월납식비과세' },
                                { value: 'nonemonthly', id: 'monthly-payment-nonemonthly', label: '비월납식비과세' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="설계금액/잔여한도">
                            <Input aria-label="설계금액" width="7.1rem" value={String(POLICYHOLDER.designAmount)} commaAmount readOnly />
                            /
                            <Input aria-label="잔여한도" width="7.1rem" value={String(POLICYHOLDER.remainingLimit)} commaAmount readOnly />
                            <Button color="secondary" size='lg' variant="outlined" onClick={() => { }}>
                              조회
                            </Button>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                      {/* //간편 화면 미노출 */}
                    </Gcol>
                  </div>
                </TabPager>
              </Gcol>
              {/*// 인보험 */}

              {/* 어린이(태아) */}
              <Typo variant={'heading-md'}>어린이(태아)(확인용 타이틀 추후 삭제)</Typo>
              <Grow placement={'ss'} className={'w-full'}>
                <FormTable caption="보험정보" cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1']}>
                  <FormRow>
                    <FormCell title={'보험시기'}>
                      <DatePickerInput
                        value={childContractForm.insuranceStartDate}
                        mode={'single'}
                        width={'9rem'}
                        onChange={(_, formattedValue) => handleChildContractFieldChange('insuranceStartDate', formattedValue ?? '')}
                      />
                      <Button color={'secondary'} onClick={handleChildTodayClick} only={'default'} size={'lg'} variant={'outlined'}>
                        오늘
                      </Button>
                    </FormCell>
                    <FormCell title={'보험기간'}>
                      <DatePickerInput readOnly mode={'range'} width={'9rem'} rangeValue={childRangeValue} />
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'만기'} colSpan={3}>
                      <RadioGroup
                        value={childContractForm.maturityValue}
                        onValueChange={(value) => handleChildContractFieldChange('maturityValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: '100', id: 'child-insurance-period-100', label: '100세만기' },
                          { value: '90', id: 'child-insurance-period-90', label: '90세만기' },
                          { value: '80', id: 'child-insurance-period-80', label: '80세만기' },
                          { value: '55', id: 'child-insurance-period-55', label: '55세만기' },
                          { value: '30', id: 'child-insurance-period-30', label: '30세만기' },
                          { value: '20', id: 'child-insurance-period-20', label: '20세만기' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'납기'} colSpan={3}>
                      <RadioGroup
                        value={childContractForm.paymentPeriodValue}
                        onValueChange={(value) => handleChildContractFieldChange('paymentPeriodValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: '10', id: 'child-payment-period-10', label: '10년납' },
                          { value: '15', id: 'child-payment-period-15', label: '15년납' },
                          { value: '20', id: 'child-payment-period-20', label: '20년납' },
                          { value: '25', id: 'child-payment-period-25', label: '25년납' },
                          { value: '30', id: 'child-payment-period-30', label: '30년납' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'납입주기'}>
                      <RadioGroup
                        value={childContractForm.paymentCycleValue}
                        onValueChange={(value) => handleChildContractFieldChange('paymentCycleValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: 'month', id: 'child-payment-cycle-monthly', label: '월납' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                    <FormCell title={'갱신주기'}>
                      <RadioGroup
                        value={childContractForm.renewalCycleValue}
                        onValueChange={(value) => handleChildContractFieldChange('renewalCycleValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: '20', id: 'child-renewal-period-20', label: '20년' },
                          { value: '10', id: 'child-renewal-period-10', label: '10년' },
                          { value: '3', id: 'child-renewal-period-3', label: '3년' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'태아여부'} >
                      <Grow className='flex gap-3'>
                        <Checkbox
                          color="primary"
                          checked={childBabyChecked}
                          onCheckedChange={(c) => setChildBabyChecked(c === true)}
                          size="md"
                          variant="default"
                        >
                          가입
                        </Checkbox>
                        <Checkbox
                          color="primary"
                          checked={childMultiFetusChecked}
                          onCheckedChange={(c) => setChildMultiFetusChecked(c === true)}
                          size="md"
                          variant="default"
                        >
                          다태아
                        </Checkbox>
                        <Checkbox
                          color="primary"
                          checked={childAdvanceCommissionChecked}
                          onCheckedChange={(c) => setChildAdvanceCommissionChecked(c === true)}
                          size="md"
                          variant="default"
                        >
                          수수료선지급
                        </Checkbox>
                      </Grow>
                    </FormCell>
                    <FormCell title={'계약전환'}>
                      <Checkbox
                        color="primary"
                        checked={childContractConversionChecked}
                        onCheckedChange={(c) => setChildContractConversionChecked(c === true)}
                        size="md"
                        variant="default"
                      >
                        신청
                      </Checkbox>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </Grow>
              <Grow placement="ss" className={'w-full'}>
                <TabPager
                  variant={'default'}
                  data={childTabs}
                  active={childTabValue}
                  setActive={setChildTabValue}
                  renderButtons={
                    <Grow>
                      <Button color={'gray'} size={'md'} variant={'outlined'}>
                        피보험자
                        <PlusIcon color={'#61554F'} />
                      </Button>
                    </Grow>
                  }
                  removable
                  onRemove={handleRemoveChildTab}
                  visibleCount={5}
                  getValue={(tab) => String(tab.value)}
                  renderTab={(tab) => tab.label}
                >
                  <div className="w-full h-full relative">
                    <Gcol placement={'ss'}>
                      <FormTable caption="피보험자 정보" lineTop={false} cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]','min-w-[32.6rem] flex-1']}>
                        <FormRow>
                          <FormCell colSpan={3} title={'피보험자'} titleVariant="section">
                            <Grow className="flex-nowrap w-full" placement={'bwc'}>
                              <Grow>
                                <Input aria-label="피보험자명" width={'7.6rem'} value={childCurrentPerson?.name ?? ''} readOnly />
                                <Input aria-label="주민등록번호 마스킹" width={'12rem'} value={childCurrentPerson?.juminNumber ?? ''} readOnly />
                                <Button aria-label="피보험자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                  <SearchIcon color={'var(--color-primary-50)'} />
                                </Button>
                                <Input aria-label="피보험자 나이" width={'4.6rem'} value={`${childCurrentPerson?.age ?? 0}세`} readOnly />
                                <Input aria-label="피보험자 성별" width={'3.2rem'} value={childCurrentPerson?.gender ?? ''} readOnly />
                              </Grow>
                              <Grow gap={2}>
                                <KeyValueItem label={'상령일'}>
                                  <Grow gap={1}>
                                    <Typo weight={'bold'}>{childCurrentPerson?.ageStandardDate ?? ''}</Typo>
                                    <Badge color={'blue'} size={'md'} variant={'contained'}>{childCurrentPerson?.ageDDay ?? ''}</Badge>
                                  </Grow>
                                </KeyValueItem>
                                <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => { }}>
                                  알림톡발송
                                </Button>
                              </Grow>
                            </Grow>
                          </FormCell>
                        </FormRow>
                        {/* 간편 화면 전용 */}
                        <FormRow>
                          <FormCell title="피보험자" titleVariant="section">
                            <InputCombo
                              clear
                              onChange={() => { }}
                              options={[
                                {
                                  label: <div>박은빈</div>,
                                  value: ''
                                },
                                {
                                  label: <div>김민지</div>,
                                  value: 'LA24094848896'
                                },
                                {
                                  label: <div>이도현</div>,
                                  value: 'LA25094848897'
                                },
                                {
                                  label: <div>최수영</div>,
                                  value: 'LA25094848898'
                                },
                                {
                                  label: <div>박보검</div>,
                                  value: 'LA25094848899'
                                },
                                {
                                  label: <div>한지민</div>,
                                  value: 'LA25094848900'
                                }
                              ]}
                              placeholder=""
                              popoverPlacement="bottom"
                              required
                              size="lg"
                              value=""
                              variant="default"
                              width={'7.6rem'}
                            />
                            <Button aria-label="피보험자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                            <RadioGroup className='flex-row gap-3'>
                              <RadioGroupItem value="man" id="man" checked>남</RadioGroupItem>
                              <RadioGroupItem value="woman" id="woman">여</RadioGroupItem>
                            </RadioGroup>
                          </FormCell>
                          <FormCell title="연령">
                            <Grow gap={3}>
                              <Grow>
                                <Input aria-label="피보험자 나이" width={'4.6rem'} value={''} required />세
                              </Grow>
                              <DatePickerInput
                                value={simpleChildInsuredBirthDate}
                                mode={'single'}
                                width={'9rem'}
                                onChange={handleSimpleChildInsuredBirthDateChange}
                                required
                              />
                            </Grow>
                          </FormCell>
                        </FormRow>
                        {/* //간편 화면 전용 */}
                        <FormRow>
                          <FormCell title="직업" colSpan={3}>
                            <Grow className="gap-1 flex-nowrap w-full" placement={'ss'}>
                              <Input aria-label="직업코드" width={'7.6rem'} value={childCurrentPerson?.jobCode ?? ''} readOnly />
                              <Input aria-label="직업분류" width={'27.4rem'} value={childCurrentPerson?.jobName ?? ''} readOnly />
                              <Button aria-label="직업 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <Input aria-label="직업급수" width={'2xs'} value={childCurrentPerson?.jobGrade ?? ''} readOnly />
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="운전형태">
                            <RadioGroup
                              value={childInsuredForm[childTabValue]?.driveType ?? ''}
                              onValueChange={(v) => updateChildInsuredField(childTabValue, 'driveType', v)}
                              className='flex-row gap-3'
                            >
                              {[
                                { value: 'private', id: 'child-driving-type-private', label: '자가용' },
                                { value: 'commercial', id: 'child-driving-type-commercial', label: '영업용' },
                                { value: 'nondriver', id: 'child-driving-type-nondriver', label: '비운전자' },
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                          <FormCell title="이륜차">
                            <RadioGroup
                              value={childInsuredForm[childTabValue]?.motorcycle ?? ''}
                              onValueChange={(v) => updateChildInsuredField(childTabValue, 'motorcycle', v)}
                              className='flex-row gap-3'
                            >
                              {[
                                { value: 'drives', id: 'child-motorcycle-drives', label: '운전함' },
                                { value: 'nondriver', id: 'child-motorcycle-nondriver', label: '운전안함' },
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="주피와 관계">
                            <Input aria-label="피보험자명" width={'7.6rem'} value={childCurrentPerson?.name ?? ''} readOnly />는 계약자의
                            <NativeSelect
                              aria-label="계약자와의 관계 선택"
                              width={'15.8rem'}
                              required
                              value={childInsuredForm[childTabValue]?.relationWithContractor ?? ''}
                              onChange={(e) => updateChildInsuredField(childTabValue, 'relationWithContractor', e.target.value)}
                            >
                              {COMMON_RELATION_OPTIONS.map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="(실손)동시설계">
                            <Input aria-label="설계번호" width={'13rem'} value={childCurrentPerson?.actualLossSimulDesignNo ?? ''} readOnly />
                            <Input aria-label="보험료" width={'13rem'} value={String(childCurrentPerson?.premium ?? 0)} commaAmount readOnly />
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="할인적용">
                            <Checkbox
                              color="primary"
                              checked={childInsuredForm[childTabValue]?.isDiscountApplied ?? false}
                              onCheckedChange={(c) => updateChildInsuredField(childTabValue, 'isDiscountApplied', c === true)}
                              size="md"
                              variant="default"
                            >
                              가족연계할인
                            </Checkbox>
                            <Button aria-label="검색" variant="outlined" only="icon" size="lg" color="gray-light">
                              <SearchIcon color="var(--color-primary-50)" />
                            </Button>
                          </FormCell>
                          <FormCell title="임신주수">
                            <Input aria-label="임신주수" width={'5rem'} value={String(childCurrentPerson?.weeksOfPregnancy ?? '')} required />
                            주 (출산예정일)

                            <DatePickerInput
                              value={childCurrentPerson.dueDate}
                              mode={'single'}
                              width={'9rem'}
                              onChange={(_, formattedValue) => handleChildContractFieldChange('insuranceStartDate', formattedValue ?? '')}
                              required
                            />)
                          </FormCell>
                        </FormRow>
                      </FormTable>

                      {/* 간편 화면 미노출 */}
                      <FormTable caption="계약자 정보" cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]','min-w-[32.6rem] flex-1']}>
                        <FormRow>
                          <FormCell title={'계약자'} titleVariant="section" colSpan={3}>
                            <Grow>
                              <Input aria-label="계약자명" width="7.6rem" value={CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.name} readOnly />
                              <Input aria-label="주민등록번호 마스킹" width="12rem" value={CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.juminNumber} readOnly />
                              <Button aria-label="계약자 검색" variant="outlined" only="icon" color="gray-light" size="lg">
                                <SearchIcon color="var(--color-primary-50)" />
                              </Button>
                              <Checkbox
                                color="primary"
                                checked={childPolicyholderIsBusinessOwner}
                                onCheckedChange={(c) => setChildPolicyholderIsBusinessOwner(c === true)}
                                size="md"
                                variant="default"
                              >
                                개인사업자
                              </Checkbox>
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="계약자와 관계">
                            <Input aria-label="피보험자명" width={'7.6rem'} value={childCurrentPerson?.name ?? ''} readOnly />는 계약자의
                            <NativeSelect
                              aria-label="계약자와의 관계 선택"
                              width={'15.8rem'}
                              required
                              value={childContractorRelationshipValue}
                              onChange={(e) => setChildContractorRelationshipValue(e.target.value)}
                            >
                              {COMMON_RELATION_OPTIONS.map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="개인정보취득경로">
                            <NativeSelect
                              aria-label="개인정보취득경로 선택"
                              width="20rem"
                              required
                              value={childInfoAcquisitionValue}
                              onChange={(e) => setChildInfoAcquisitionValue(e.target.value)}
                            >
                              {[
                                { value: 'selection', id: 'child-personalinfo-1', label: '고객직접선택' },
                                { value: 'selection2', id: 'child-personalinfo-2', label: '선택' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="자택(소재지)" colSpan={3}>
                            {CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.addresses}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="직장(본사)" colSpan={3}>
                            {CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.workAddress}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="연락처">
                            <Grow placement='bwc'>
                              <Grow>{CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.contact}</Grow>
                              <Grow>
                                <KeyValueItem label="전자적안내동의">
                                  <Grow placement='sc' gap="0">
                                    <Badge color="green" size="md" variant="ghost">{POLICYHOLDER.electronicNoticeAgree}</Badge>
                                    <TableTooltip />
                                  </Grow>
                                </KeyValueItem>
                              </Grow>
                            </Grow>
                          </FormCell>
                          <FormCell title="이메일">
                            {CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.email}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="보험차익비과세">
                            <Checkbox
                              color="primary"
                              checked={childTaxFreeChecked}
                              onCheckedChange={(c) => setChildTaxFreeChecked(c === true)}
                              size="md"
                              variant="default"
                            >
                              가입
                            </Checkbox>
                            <NativeSelect
                              aria-label="비과세 유형 선택"
                              width="17rem"
                              value={childTaxFreeTypeValue}
                              onChange={(e) => setChildTaxFreeTypeValue(e.target.value)}
                            >
                              {[
                                { value: 'monthly', id: 'child-monthly-payment-monthly', label: '월납식비과세' },
                                { value: 'nonemonthly', id: 'child-monthly-payment-nonemonthly', label: '비월납식비과세' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="설계금액/잔여한도">
                            <Input aria-label="설계금액" width="7.1rem" value={String(CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.designAmount)} commaAmount readOnly />
                            /
                            <Input aria-label="잔여한도" width="7.1rem" value={String(CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.remainingLimit)} commaAmount readOnly />
                            <Button color="secondary" size='lg' variant="outlined" onClick={() => { }}>
                              조회
                            </Button>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                      {/*// 간편 화면 미노출 */}
                    </Gcol>
                  </div>
                </TabPager>
              </Grow>
              {/*// 어린이(태아) */}

              {/* 재물보험 */}
              <Typo variant={'heading-md'}>재물보험(확인용 타이틀 추후 삭제)</Typo>
              <Grow placement={'ss'} className={'w-full'}>
                <FormTable caption="재물보험 정보" cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1']}>
                  <FormRow>
                    <FormCell title={'보험시기'}>
                      <DatePickerInput
                        value={propertyContractForm.insuranceStartDate}
                        mode={'single'}
                        width={'9rem'}
                        onChange={(_, formattedValue) => handlePropertyContractFieldChange('insuranceStartDate', formattedValue ?? '')}
                      />
                      <Button color={'secondary'} onClick={handlePropertyTodayClick} only={'default'} size={'lg'} variant={'outlined'}>
                        오늘
                      </Button>
                    </FormCell>
                    <FormCell title={'보험기간'}>
                      <DatePickerInput readOnly mode={'range'} width={'9rem'} rangeValue={propertyRangeValue} />
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'만기'} colSpan={3}>
                      <RadioGroup
                        value={propertyContractForm.maturityValue}
                        onValueChange={(value) => handlePropertyContractFieldChange('maturityValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: '03', id: 'child-insurance-period-03', label: '03세 만기' },
                          { value: '05', id: 'child-insurance-period-05', label: '05세 만기' },
                          { value: '07', id: 'child-insurance-period-07', label: '07세 만기' },
                          { value: '10', id: 'child-insurance-period-10', label: '10세 만기' },
                          { value: '15', id: 'child-insurance-period-15', label: '15세 만기' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'납기'}>
                      <RadioGroup
                        value={propertyContractForm.paymentPeriodValue}
                        onValueChange={(value) => handlePropertyContractFieldChange('paymentPeriodValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: 'Y', id: 'property-payment-period-full', label: '전기납' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                    <FormCell title={'단체취급'}>
                      <Checkbox
                        color="primary"
                        checked={propertyGroupHandlingChecked}
                        onCheckedChange={(c) => setPropertyGroupHandlingChecked(c === true)}
                        size="md"
                        variant="default"
                      ></Checkbox>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'납입주기'}>
                      <RadioGroup
                        value={propertyContractForm.paymentCycleValue}
                        onValueChange={(value) => handlePropertyContractFieldChange('paymentCycleValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: 'month', id: 'property-payment-cycle-monthly', label: '월납' },
                          { value: 'year', id: 'property-payment-cycle-yearly', label: '연납' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                    <FormCell title={'갱신주기'}>
                      <RadioGroup
                        value={propertyContractForm.renewalCycleValue}
                        onValueChange={(value) => handlePropertyContractFieldChange('renewalCycleValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: '3', id: 'property-renewal-cycle-3', label: '3년' },
                          { value: '5', id: 'property-renewal-cycle-5', label: '5년' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>

                </FormTable>
              </Grow>
              <Grow placement={'ss'} className={'w-full'}>
                <TabPager
                  variant={'default'}
                  data={propertyTabs}
                  active={propertyTabValue}
                  setActive={setPropertyTabValue}
                  renderButtons={
                    <Grow>
                      <Button color={'gray'} size={'md'} variant={'outlined'}>
                        피보험자
                        <PlusIcon color={'#61554F'} />
                      </Button>
                      <Button color={'gray'} size={'md'} variant={'outlined'}>
                        목적물
                        <PlusIcon color={'#61554F'} />
                      </Button>
                    </Grow>
                  }
                  removable
                  onRemove={handleRemovePropertyTab}
                  visibleCount={5}
                  getValue={(tab) => String(tab.value)}
                  renderTab={(tab) => tab.label}
                >
                  <div className="w-full h-full relative">
                    <Gcol placement={'ss'}>
                      {isPropertyInsuredTab && propertyCurrentDefaultPerson && (
                        <FormTable caption="피보험자 정보" lineTop={false} cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]','min-w-[32.6rem] flex-1']}>
                          <FormRow>
                            <FormCell colSpan={3} title={'피보험자'} titleVariant="section">
                              <Grow className="flex-nowrap w-full" placement={'bwc'}>
                                <Grow>
                                  <Input aria-label="피보험자명" width={'7.6rem'} value={propertyCurrentDefaultPerson.name} readOnly />
                                  <Input aria-label="주민등록번호 마스킹" width={'12rem'} value={propertyCurrentDefaultPerson.juminNumber} readOnly />
                                  <Button aria-label="피보험자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                    <SearchIcon color={'var(--color-primary-50)'} />
                                  </Button>
                                  <Input aria-label="피보험자 나이" width={'4.6rem'} value={`${propertyCurrentDefaultPerson.age}세`} readOnly />
                                  <Input aria-label="피보험자 성별" width={'3.2rem'} value={propertyCurrentDefaultPerson.gender} readOnly />
                                </Grow>
                                <Grow gap={2}>
                                  <KeyValueItem label={'상령일'}>
                                    <Grow gap={1}>
                                      <Typo weight={'bold'}>
                                        {propertyCurrentDefaultPerson.ageStandardDate}
                                      </Typo>
                                      <Badge color={'blue'} size={'md'} variant={'contained'}>{propertyCurrentDefaultPerson.ageDDay}</Badge>
                                    </Grow>
                                  </KeyValueItem>
                                  <KeyValueItem label={'설계동의'}>
                                    <Grow gap={1}>
                                      <Typo weight={'bold'}>
                                        {propertyCurrentDefaultPerson.designAgreeDate}
                                      </Typo>
                                      <Badge color={'red'} size={'md'} variant={'contained'}>{propertyCurrentDefaultPerson.designAgreeDDay}</Badge>
                                    </Grow>
                                  </KeyValueItem>
                                  <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => { }}>
                                    알림톡발송
                                  </Button>
                                </Grow>
                              </Grow>
                            </FormCell>
                          </FormRow>
                          {/* 간편 화면 전용 */}
                          <FormRow>
                            <FormCell title="피보험자" titleVariant="section">
                              <InputCombo
                                clear
                                onChange={() => { }}
                                options={[
                                  {
                                    label: <div>박은빈</div>,
                                    value: ''
                                  },
                                  {
                                    label: <div>김민지</div>,
                                    value: 'LA24094848896'
                                  },
                                  {
                                    label: <div>이도현</div>,
                                    value: 'LA25094848897'
                                  },
                                  {
                                    label: <div>최수영</div>,
                                    value: 'LA25094848898'
                                  },
                                  {
                                    label: <div>박보검</div>,
                                    value: 'LA25094848899'
                                  },
                                  {
                                    label: <div>한지민</div>,
                                    value: 'LA25094848900'
                                  }
                                ]}
                                placeholder=""
                                popoverPlacement="bottom"
                                required
                                size="lg"
                                value=""
                                variant="default"
                                width={'7.6rem'}
                              />
                              <Button aria-label="피보험자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <RadioGroup className='flex-row gap-3'>
                                <RadioGroupItem value="man" id="man" checked>남</RadioGroupItem>
                                <RadioGroupItem value="woman" id="woman">여</RadioGroupItem>
                              </RadioGroup>
                            </FormCell>
                            <FormCell title="연령">
                              <Grow gap={3}>
                                <Grow>
                                  <Input aria-label="피보험자 나이" width={'4.6rem'} value={''} required />세
                                </Grow>
                                <DatePickerInput
                                  value={simplePropertyInsuredBirthDate}
                                  mode={'single'}
                                  width={'9rem'}
                                  onChange={handleSimplePropertyInsuredBirthDateChange}
                                  required
                                />
                              </Grow>
                            </FormCell>
                          </FormRow>
                          {/* //간편 화면 전용 */}
                          <FormRow>
                            <FormCell title="직업" colSpan={3}>
                              <Grow className="gap-1 flex-nowrap w-full" placement={'ss'}>
                                <Input aria-label="직업코드" width={'7.6rem'} value={propertyCurrentDefaultPerson.jobCode} readOnly />
                                <Input aria-label="직업분류" width={'27.4rem'} value={propertyCurrentDefaultPerson.jobName} readOnly />
                                <Button aria-label="직업 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                  <SearchIcon color={'var(--color-primary-50)'} />
                                </Button>
                                <Input aria-label="직업급수" width={'2xs'} value={propertyCurrentDefaultPerson.jobGrade} readOnly />
                              </Grow>
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title="운전형태">
                              <RadioGroup
                                value={propertyInsuredForm[propertyTabValue]?.driveType ?? ''}
                                onValueChange={(v) => updatePropertyInsuredField(propertyTabValue, 'driveType', v)}
                                className='flex-row gap-3'
                              >
                                {[
                                  { value: 'private', id: 'property-driving-type-private', label: '자가용' },
                                  { value: 'commercial', id: 'property-driving-type-commercial', label: '영업용' },
                                  { value: 'nondriver', id: 'property-driving-type-nondriver', label: '비운전자' },
                                ].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                            </FormCell>
                            <FormCell title="이륜차">
                              <RadioGroup
                                value={propertyInsuredForm[propertyTabValue]?.motorcycle ?? ''}
                                onValueChange={(v) => updatePropertyInsuredField(propertyTabValue, 'motorcycle', v)}
                                className='flex-row gap-3'
                              >
                                {[
                                  { value: 'drives', id: 'property-motorcycle-drives', label: '운전함' },
                                  { value: 'nondriver', id: 'property-motorcycle-nondriver', label: '운전안함' },
                                ].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title="주피와 관계" colSpan={3}>
                              <Input aria-label="피보험자명" width={'7.6rem'} value={propertyCurrentDefaultPerson.name} readOnly />는 계약자의
                              <NativeSelect
                                aria-label="계약자와의 관계 선택"
                                width={'15.8rem'}
                                required
                                value={propertyInsuredForm[propertyTabValue]?.relationWithContractor ?? ''}
                                onChange={(e) => updatePropertyInsuredField(propertyTabValue, 'relationWithContractor', e.target.value)}
                              >
                                {[
                                  { value: '고용주(사업주)', id: 'property-contractor-info-employer', label: '고용주(사업주)' },
                                  { value: '고용인(종업원)', id: 'property-contractor-info-employee', label: '고용인(종업원)' },
                                ].map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </FormCell>
                          </FormRow>
                        </FormTable>
                      )}

                      {isPropertyOwnerTab && propertyCurrentOwnerPerson && (
                        <FormTable caption="목적물 소유자 정보" lineTop={false} cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]','min-w-[32.6rem] flex-1']}>
                          <FormRow>
                            <FormCell colSpan={3} title={'소유자'} titleVariant="section">
                              <Grow className="flex-nowrap w-full" placement={'bwc'}>
                                <Grow>
                                  <Input aria-label="소유자명" width={'7.6rem'} value={propertyCurrentOwnerPerson.name} readOnly />
                                  <Input aria-label="주민등록번호 마스킹" width={'12rem'} value={propertyCurrentOwnerPerson.juminNumber} readOnly />
                                  <Button aria-label="소유자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                    <SearchIcon color={'var(--color-primary-50)'} />
                                  </Button>
                                  <Input aria-label="소유자 나이" width={'4.6rem'} value={`${propertyCurrentOwnerPerson.age}세`} readOnly />
                                  <Input aria-label="소유자 성별" width={'3.2rem'} value={propertyCurrentOwnerPerson.gender} readOnly />
                                </Grow>
                                <Grow gap={2}>
                                  <Checkbox
                                    color="primary"
                                    checked={propertyOwnerSameAsContractor[propertyTabValue] ?? false}
                                    onCheckedChange={(c) => handlePropertyOwnerSameAsContractorChange(propertyTabValue, c === true)}
                                    size="md"
                                    variant="default"
                                  >
                                    계약자와 동일
                                  </Checkbox>
                                  <Grow>
                                    (
                                    <Checkbox
                                      color="primary"
                                      checked={propertyAddressSelectionByTab[propertyTabValue]?.home ?? false}
                                      onCheckedChange={(c) => handlePropertyOwnerAddressSelectionChange(propertyTabValue, 'home', c === true)}
                                      size="md"
                                      variant="default"
                                      disabled={!(propertyOwnerSameAsContractor[propertyTabValue] ?? false)}
                                    >
                                      자택
                                    </Checkbox>
                                    <Checkbox
                                      color="primary"
                                      checked={propertyAddressSelectionByTab[propertyTabValue]?.office ?? false}
                                      onCheckedChange={(c) => handlePropertyOwnerAddressSelectionChange(propertyTabValue, 'office', c === true)}
                                      size="md"
                                      variant="default"
                                      disabled={!(propertyOwnerSameAsContractor[propertyTabValue] ?? false)}
                                    >
                                      직장
                                    </Checkbox>
                                    <Button
                                      color={'secondary'}
                                      size={'lg'}
                                      variant={'contained'}
                                      disabled={
                                        !(propertyOwnerSameAsContractor[propertyTabValue] ?? false)
                                      }
                                      onClick={() => handlePropertyOwnerAddressImport(propertyTabValue)}
                                    >
                                      가져오기
                                    </Button>
                                    )
                                  </Grow>
                                </Grow>
                              </Grow>
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title="소재지" colSpan={3}>
                              <Input aria-label="목적물명" width={'7.6rem'} value={propertyCurrentOwnerPerson.propertyName} readOnly />
                              <Button aria-label="목적물 주소찾기" variant={'outlined'} size={'lg'} color={'gray-light'}>
                                주소찾기
                              </Button>
                              <Input aria-label="목적물 소재지" width={'26rem'} value={propertyLocationByTab[propertyTabValue] ?? ''} readOnly />
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title="가입업종">
                              <Input aria-label="가입업종코드" width={'7.6rem'} value={propertyCurrentOwnerPerson.businessType} readOnly />
                              <Button aria-label="가입업종 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <Input aria-label="가입업종명" width={'26rem'} value={propertyCurrentOwnerPerson.businessName} readOnly />
                            </FormCell>
                            <FormCell title="건물급수">
                              <Input aria-label="건물급수" width={'5rem'} value={propertyCurrentOwnerPerson.buildingGrade} readOnly /> 급 (적용급수
                              <Input aria-label="적용급수" width={'5rem'} value={propertyCurrentOwnerPerson.appliedBuildingGrade} readOnly /> 급)
                              <Button aria-label="건물구조입력" variant={'outlined'} size={'lg'} color={'gray-light'}>
                                건물구조입력
                              </Button>
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title="요율적용업종">
                              <Input aria-label="요율적용업종코드" width={'7.6rem'} value={propertyCurrentOwnerPerson.ratingBusinessType} readOnly />
                              <Input aria-label="요율적용업종명" width={'27.4rem'} value={propertyCurrentOwnerPerson.ratingBusinessName} readOnly />
                            </FormCell>
                            <FormCell title="건물상세">
                              지상 <Input aria-label="건물 지상층" width={'5rem'} value={String(propertyCurrentOwnerPerson.aboveGroundFloors)} readOnly /> 층 / 지하
                              <Input aria-label="건물 지하층" width={'5rem'} value={String(propertyCurrentOwnerPerson.belowGroundFloors)} readOnly /> 층 /
                              <Input aria-label="건물 폭" width={'5rem'} value={String(propertyCurrentOwnerPerson.buildingWidth)} readOnly /> ㎡
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title="실손보상구분">
                              <NativeSelect
                                aria-label="실손보상구분"
                                width={'20rem'}
                                required
                                value={propertyActualLossTypeByTab[propertyTabValue] ?? ''}
                                onChange={(e) => handlePropertyActualLossTypeChange(propertyTabValue, e.target.value)}
                              >
                                {PROPERTY_ACTUAL_LOSS_TYPE_OPTIONS.map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                                ))}
                              </NativeSelect>
                              <Button aria-label="알림톡발송" variant={'outlined'} size={'lg'} color={'gray-light'}>
                                알림톡발송
                              </Button>
                              <Checkbox
                                color="primary"
                                checked={propertyHasFireExtinguisherByTab[propertyTabValue] ?? false}
                                onCheckedChange={(c) => handlePropertyHasFireExtinguisherChange(propertyTabValue, c === true)}
                                size="md"
                                variant="default"
                              >
                                소화기 있음
                              </Checkbox>
                            </FormCell>
                            <FormCell title="기타상세">
                              <Grow gap={3}>
                                <Checkbox
                                  color="primary"
                                  checked={propertyIsSpecialBuildingByTab[propertyTabValue] ?? false}
                                  onCheckedChange={(c) => handlePropertyIsSpecialBuildingChange(propertyTabValue, c === true)}
                                  size="md"
                                  variant="default"
                                >
                                  <Button aria-label="특수건물" variant={'outlined'} size={'lg'} color={'gray-light'}>특수건물</Button>
                                </Checkbox>
                                <Checkbox
                                  color="primary"
                                  checked={propertyIsMultipleComplexBuildingByTab[propertyTabValue] ?? false}
                                  onCheckedChange={(c) => handlePropertyIsMultipleComplexBuildingChange(propertyTabValue, c === true)}
                                  size="md"
                                  variant="default"
                                >
                                  <Button aria-label="복합건물" variant={'outlined'} size={'lg'} color={'gray-light'}>복합건물</Button>
                                </Checkbox>
                              </Grow>
                            </FormCell>
                          </FormRow>
                        </FormTable>
                      )}

                      {/* 간편 화면 미노출 */}
                      <FormTable caption="계약자 정보" cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]','min-w-[32.6rem] flex-1']}>
                        <FormRow>
                          <FormCell title={'계약자'} titleVariant="section">
                            <Grow>
                              <Input aria-label="계약자명" width="7.6rem" value={PROPERTY_INSURANCE_STEP1_DATA.Policyholder.name} readOnly />
                              <Input aria-label="주민등록번호 마스킹" width="12rem" value={PROPERTY_INSURANCE_STEP1_DATA.Policyholder.juminNumber} readOnly />
                              <Button aria-label="계약자 검색" variant="outlined" only="icon" color="gray-light" size="lg">
                                <SearchIcon color="var(--color-primary-50)" />
                              </Button>
                              <Checkbox
                                color="primary"
                                checked={propertyPolicyholderIsBusinessOwner}
                                onCheckedChange={(c) => setPropertyPolicyholderIsBusinessOwner(c === true)}
                                size="md"
                                variant="default"
                              >
                                개인사업자
                              </Checkbox>
                            </Grow>
                          </FormCell>
                          <FormCell title="개인정보취득경로" colSpan={isPropertyOwnerTab ? 3 : undefined}>
                            <NativeSelect
                              aria-label="개인정보취득경로 선택"
                              width="20rem"
                              required
                              value={propertyInfoAcquisitionValue}
                              onChange={(e) => setPropertyInfoAcquisitionValue(e.target.value)}
                            >
                              {[
                                { value: 'selection', id: 'property-personalinfo-1', label: '고객직접선택' },
                                { value: 'selection2', id: 'property-personalinfo-2', label: '선택' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          {isPropertyInsuredTab && propertyCurrentDefaultPerson ? (
                            <FormCell title="계약자와 관계" colSpan={3}>
                              <Input aria-label="피보험자명" width={'7.6rem'} value={propertyCurrentDefaultPerson.name} readOnly />는 계약자의
                              <NativeSelect
                                aria-label="계약자와의 관계 선택"
                                width={'15.8rem'}
                                required
                                value={propertyContractorRelationshipValue}
                                onChange={(e) => setPropertyContractorRelationshipValue(e.target.value)}
                              >
                                {PROPERTY_RELATION_OPTIONS.map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </FormCell>
                          ) : null}
                        </FormRow>
                        <FormRow>
                          <FormCell title="자택(소재지)" colSpan={3}>
                            {PROPERTY_INSURANCE_STEP1_DATA.Policyholder.addresses}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="직장(본사)" colSpan={3}>
                            {PROPERTY_INSURANCE_STEP1_DATA.Policyholder.workAddress}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="연락처">
                            <Grow placement='bwc'>
                              <Grow>{PROPERTY_INSURANCE_STEP1_DATA.Policyholder.contact}</Grow>
                              <Grow>
                                <KeyValueItem label="전자적안내동의">
                                  <Grow placement='sc' gap="0">
                                    <Badge color="green" size="md" variant="ghost">{PROPERTY_INSURANCE_STEP1_DATA.Policyholder.electronicNoticeAgree}</Badge>
                                    <TableTooltip />
                                  </Grow>
                                </KeyValueItem>
                              </Grow>
                            </Grow>
                          </FormCell>
                          <FormCell title="이메일">
                            {PROPERTY_INSURANCE_STEP1_DATA.Policyholder.email}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="보험차익비과세">
                            <Checkbox
                              color="primary"
                              checked={propertyTaxFreeChecked}
                              onCheckedChange={(c) => setPropertyTaxFreeChecked(c === true)}
                              size="md"
                              variant="default"
                            >
                              가입
                            </Checkbox>
                            <Button color="secondary" size="lg" variant="outlined" onClick={() => { }}>
                              알림톡발송
                            </Button>
                          </FormCell>
                          <FormCell title="설계금액/잔여한도">
                            <Input aria-label="설계금액" width="7.1rem" value={String(PROPERTY_INSURANCE_STEP1_DATA.Policyholder.designAmount)} commaAmount readOnly />
                            /
                            <Input aria-label="잔여한도" width="7.1rem" value={String(PROPERTY_INSURANCE_STEP1_DATA.Policyholder.remainingLimit)} commaAmount readOnly />
                            <Button color="secondary" size='lg' variant="outlined" onClick={() => { }}>
                              조회
                            </Button>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                      {/*// 간편 화면 미노출 */}
                    </Gcol>
                  </div>
                </TabPager>
              </Grow>
              {/*// 재물보험 */}

              {/* 단체보험 */}
              <Typo variant={'heading-md'}>단체보험(확인용 타이틀 추후 삭제)</Typo>
              <Grow placement={'ss'} className={'w-full'}>
                <FormTable caption="보험정보" cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1']}>
                  <FormRow>
                    <FormCell title={'보험시기'}>
                      <DatePickerInput
                        value={groupContractForm.insuranceStartDate}
                        mode={'single'}
                        width={'9rem'}
                        onChange={(_, formattedValue) => handleGroupContractFieldChange('insuranceStartDate', formattedValue ?? '')}
                      />
                      <Button color={'secondary'} onClick={handleGroupTodayClick} only={'default'} size={'lg'} variant={'outlined'}>
                        오늘
                      </Button>
                    </FormCell>
                    <FormCell title={'보험기간'}>
                      <DatePickerInput readOnly mode={'range'} width={'9rem'} rangeValue={groupRangeValue} />
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'만기'} colSpan={3}>
                      <RadioGroup
                        value={groupContractForm.maturityValue}
                        onValueChange={(value) => handleGroupContractFieldChange('maturityValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: '03', id: 'group-insurance-period-03', label: '03년' },
                          { value: '05', id: 'group-insurance-period-05', label: '05년' },
                          { value: '07', id: 'group-insurance-period-07', label: '07년' },
                          { value: '10', id: 'group-insurance-period-10', label: '10년' },
                          { value: '15', id: 'group-insurance-period-15', label: '15년' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'납기'} colSpan={3}>
                      <RadioGroup
                        value={groupContractForm.paymentPeriodValue}
                        onValueChange={(value) => handleGroupContractFieldChange('paymentPeriodValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: '03', id: 'group-payment-period-03', label: '03년납' },
                          { value: '05', id: 'group-payment-period-05', label: '05년납' },
                          { value: '07', id: 'group-payment-period-07', label: '07년납' },
                          { value: '10', id: 'group-payment-period-10', label: '10년납' },
                          { value: 'all', id: 'group-payment-period-all', label: '전기납' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'납입주기'} colSpan={3}>
                      <RadioGroup
                        value={groupContractForm.paymentCycleValue}
                        onValueChange={(value) => handleGroupContractFieldChange('paymentCycleValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: 'month', id: 'group-payment-cycle-monthly', label: '월납' },
                          { value: 'quarter', id: 'group-payment-cycle-quarterly', label: '3개월' },
                          { value: 'semiannual', id: 'group-payment-cycle-semiannual', label: '6개월' },
                          { value: 'year', id: 'group-payment-cycle-annual', label: '연납' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>

                  </FormRow>
                  <FormRow>
                    <FormCell title={'단체구분'}>
                      <RadioGroup
                        value={GROUP_INSURANCE_STEP1_DATA.ContractorInfo.groupCategory}
                        onValueChange={() => { }} className='flex-row gap-3'>
                        {[
                          { value: '피보험자단계(개별요율)', id: 'group-category-1', label: '피보험자단계(개별요율)' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                    <FormCell title={'단체유형'}>
                      <Grow placement='bwc' gap={3}>
                        <RadioGroup
                          value={GROUP_INSURANCE_STEP1_DATA.ContractorInfo.groupType}
                          onValueChange={() => { }}
                          className='flex-row gap-3'
                        >
                          {[
                            { value: 'type1', id: 'group-type-1', label: '1종(급여단체)' },
                            { value: 'type2', id: 'group-type-2', label: '2종(비급여단체)' },
                            { value: 'type3', id: 'group-type-3', label: '3종(임의단체)' },
                          ].map((option) => (
                            <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </Grow>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'총인원수'}>
                      <Input aria-label="총인원" width={'6rem'} value={String(GROUP_INSURANCE_STEP1_DATA.ContractorInfo.totalCount)} />명(전체 근로자 수)
                    </FormCell>
                    <FormCell title={'인원현황'}>
                      <Grow className='flex-nowrap'>
                        <Input aria-label="가입인원" width={'6rem'} value={String(GROUP_INSURANCE_STEP1_DATA.ContractorInfo.enrolledCount)} readOnly /> 명 / 가입비율
                        <Input aria-label="가입비율" width={'6rem'} value={`${GROUP_INSURANCE_STEP1_DATA.ContractorInfo.enrolledPercent}`} readOnly />%
                      </Grow>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </Grow>
              <Gcol placement="ss" className={'w-full'}>
                <TabPager
                  variant={'default'}
                  data={groupTabs}
                  active={groupTabValue}
                  setActive={setGroupTabValue}
                  removable
                  onRemove={handleRemoveGroupTab}
                  visibleCount={5}
                  getValue={(tab) => String(tab.value)}
                  renderTab={(tab) => tab.label}
                  renderButtons={
                    <Grow>
                      <Button color={'gray'} size={'md'} variant={'outlined'}>
                        그룹추가
                        <PlusIcon color={'#61554F'} />
                      </Button>
                      <Button color={'gray'} size={'md'} variant={'outlined'}>
                        단쳬입력
                        <PlusIcon color={'#61554F'} />
                      </Button>
                      <Button color={'gray'} size={'md'} variant={'outlined'}>
                        단체규약
                        <PlusIcon color={'#61554F'} />
                      </Button>
                    </Grow>
                  }
                >
                  <div className="w-full h-full relative">
                    <Gcol placement={'ss'}>
                      <FormTable caption="그룹 정보" lineTop={false} cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]','min-w-[32.6rem] flex-1']}>
                        <FormRow>
                          <FormCell title={'그룹명'} titleVariant="section">
                            <Input aria-label="그룹명" width={'12rem'} value={groupCurrentItem.groupName} />
                            <Grow className="flex-nowrap w-full" placement={'bwc'}>
                            </Grow>
                          </FormCell>
                          <FormCell title="보험나이">
                            <Input aria-label="보험나이" width={'5rem'} value={`${groupCurrentItem.age}`} />세
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="성별">
                            <RadioGroup
                              value={groupCurrentItem.gender}
                              onValueChange={() => { }}
                              className='flex-row gap-3'
                            >
                              {[
                                { value: '남', id: 'group-gender-male', label: '남' },
                                { value: '여', id: 'group-gender-female', label: '여' },
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                          <FormCell title="인원">
                            <Input aria-label="인원" width={'5rem'} value={`${groupCurrentItem.member}`} />명
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="직업" colSpan={3}>
                            <Grow className="gap-1 flex-nowrap w-full" placement={'ss'}>
                              <Input aria-label="직업코드" width={'7.6rem'} value={groupCurrentItem.jobCode} readOnly />
                              <Input aria-label="직업분류" width={'27.4rem'} value={groupCurrentItem.jobName} readOnly />
                              <Button aria-label="직업 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <Input aria-label="직업등급" width={'2xs'} value={groupCurrentItem.jobGrade} readOnly />
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="운전형태" colSpan={3}>
                            <RadioGroup
                              value={groupInsuredForm[groupTabValue]?.driveType ?? ''}
                              onValueChange={(v) => updateGroupInsuredField(groupTabValue, 'driveType', v)}
                              className='flex-row gap-3'
                            >
                              {[
                                { value: 'private', id: 'group-driving-type-private', label: '자가용' },
                                { value: 'commercial', id: 'group-driving-type-commercial', label: '영업용' },
                                { value: 'nondriver', id: 'group-driving-type-nondriver', label: '비운전자' },
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>

                        </FormRow>
                      </FormTable>

                      <FormTable caption="계약자 정보" cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1']}>
                        <FormRow>
                          <FormCell title={'계약자'} titleVariant="section" colSpan={3}>
                            <Grow>
                              <Input aria-label="계약자명" width="7.6rem" value={GROUP_INSURANCE_STEP1_DATA.Policyholder.name} readOnly />
                              <Input aria-label="주민등록번호 마스킹" width="12rem" value={GROUP_INSURANCE_STEP1_DATA.Policyholder.juminNumber} readOnly />
                              <Button aria-label="계약자 검색" variant="outlined" only="icon" color="gray-light" size="lg">
                                <SearchIcon color="var(--color-primary-50)" />
                              </Button>
                              <Checkbox
                                color="primary"
                                checked={groupPolicyholderIsBusinessOwner}
                                onCheckedChange={(c) => setGroupPolicyholderIsBusinessOwner(c === true)}
                                size="md"
                                variant="default"
                              >
                                개인사업자
                              </Checkbox>
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="계약자와 관계">
                            <Input aria-label="계약자" width={'14rem'} value={groupCurrentItem.groupName} readOnly />는 계약자의
                            <NativeSelect
                              aria-label="계약자와 관계 선택"
                              width={'14rem'}
                              required
                              value={groupContractorRelationshipValue}
                              onChange={(e) => setGroupContractorRelationshipValue(e.target.value)}
                            >
                              {PROPERTY_RELATION_OPTIONS.map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="개인정보취득경로">
                            <NativeSelect
                              aria-label="개인정보취득경로 선택"
                              width="20rem"
                              readOnly
                              value={groupInfoAcquisitionValue}
                              onChange={(e) => setGroupInfoAcquisitionValue(e.target.value)}
                            >
                              {[
                                { value: '단체계약', id: 'group-personalinfo-1', label: '단체계약' },
                                { value: 'selection', id: 'group-personalinfo-2', label: '고객직접선택' },
                                { value: 'selection2', id: 'group-personalinfo-3', label: '선택' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="자택(소재지)" colSpan={3}>
                            {GROUP_INSURANCE_STEP1_DATA.Policyholder.addresses}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="직장(본사)" colSpan={3}>
                            {GROUP_INSURANCE_STEP1_DATA.Policyholder.workAddress}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="연락처">
                            <Grow placement='bwc'>
                              <Grow>{GROUP_INSURANCE_STEP1_DATA.Policyholder.contact}</Grow>
                              <Grow>
                                <KeyValueItem label="전자적안내동의">
                                  <Grow placement='sc' gap="0">
                                    <Badge color="green" size="md" variant="ghost">{GROUP_INSURANCE_STEP1_DATA.Policyholder.electronicNoticeAgree}</Badge>
                                    <TableTooltip />
                                  </Grow>
                                </KeyValueItem>
                              </Grow>
                            </Grow>
                          </FormCell>
                          <FormCell title="이메일">
                            {GROUP_INSURANCE_STEP1_DATA.Policyholder.email}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="보험차익비과세">
                            <Checkbox
                              color="primary"
                              checked={groupTaxFreeChecked}
                              onCheckedChange={(c) => setGroupTaxFreeChecked(c === true)}
                              size="md"
                              variant="default"
                            >
                              가입
                            </Checkbox>
                            <Button color="secondary" size="lg" variant="outlined" onClick={() => { }}>
                              알림톡발송
                            </Button>
                          </FormCell>
                          <FormCell title="설계금액/잔여한도">
                            <Input aria-label="설계금액" width="7.1rem" value={String(GROUP_INSURANCE_STEP1_DATA.Policyholder.designAmount)} commaAmount readOnly />
                            /
                            <Input aria-label="잔여한도" width="7.1rem" value={String(GROUP_INSURANCE_STEP1_DATA.Policyholder.remainingLimit)} commaAmount readOnly />
                            <Button color="secondary" size='lg' variant="outlined" onClick={() => { }}>
                              조회
                            </Button>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </Gcol>
                  </div>
                </TabPager>
              </Gcol>
              {/*// 단체보험 */}

              {/* 연금/저축보험 */}
              <Typo variant={'heading-md'}>연금/저축보험(확인용 타이틀 추후 삭제)</Typo>
              <Grow placement={'ss'} className={"w-full"}>
                <FormTable caption="보험정보" cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1']}>
                  <FormRow>
                    <FormCell title={'보험시기'}>
                      <DatePickerInput
                        value={pensionInsuranceStartDate}
                        mode={'single'}
                        width={'9rem'}
                        onChange={(_, formattedValue) => handlePensionInsuranceStartDateChange(formattedValue ?? '')}
                      />
                      <Button color={'secondary'} onClick={handlePensionTodayClick} only={'default'} size={'lg'} variant={'outlined'}>
                        오늘
                      </Button>
                    </FormCell>
                    <FormCell title={'보험기간'}>
                      <DatePickerInput readOnly mode={'range'} width={'9rem'} rangeValue={pensionRangeValue} />
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'개시연령'}>
                      <NativeSelect
                        aria-label="개시연령 선택"
                        width="13rem"
                        value={pensionAgeValue}
                        onChange={(e) => setPensionAgeValue(e.target.value)}
                      >
                        {[
                          { value: '50', id: 'pension-age-50', label: '50세' },
                          { value: '55', id: 'pension-age-55', label: '55세' },
                          { value: '60', id: 'pension-age-60', label: '60세' },
                          { value: '65', id: 'pension-age-65', label: '65세' },
                        ].map((option) => (
                          <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                    <FormCell title={'지급기간'}>
                      <NativeSelect
                        aria-label="지급기간 선택"
                        width="13rem"
                        value={pensionPayoutTermValue}
                        onChange={(e) => setPensionPayoutTermValue(e.target.value)}
                      >
                        {[
                          { value: '5', id: 'pension-payout-5', label: '5년' },
                          { value: '10', id: 'pension-payout-10', label: '10년' },
                          { value: '15', id: 'pension-payout-15', label: '15년' },
                          { value: '20', id: 'pension-payout-20', label: '20년' },
                        ].map((option) => (
                          <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'수령방법'}>
                      <RadioGroup
                        value={pensionReceiveModeValue}
                        onValueChange={(value) => setPensionReceiveModeValue(value)}
                        className="flex-row gap-3"
                      >
                        {[
                          { value: 'annual', id: 'receive-mode-annual', label: '연1회' },
                          { value: 'monthly', id: 'receive-mode-monthly', label: '매월' },
                          { value: 'quarterly', id: 'receive-mode-quarterly', label: '3개월마다' },
                          { value: 'semiannual', id: 'receive-mode-semiannual', label: '6개월마다' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                    <FormCell title={'연금지급형'}>
                      <RadioGroup
                        value={pensionPayoutTypeValue}
                        onValueChange={(value) => setPensionPayoutTypeValue(value)}
                        className="flex-row gap-3"
                      >
                        {[
                          { value: '정액형', id: 'payout-type-fixed', label: '정액형' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'납기'} colSpan={3}>
                      <RadioGroup
                        value={pensionPayPeriodValue}
                        onValueChange={(value) => setPensionPayPeriodValue(value)}
                        className="flex-row gap-3"
                      >
                        {[
                          { value: '5', id: 'pension-pay-period-5', label: '05년납' },
                          { value: '10', id: 'pension-pay-period-10', label: '10년납' },
                          { value: '15', id: 'pension-pay-period-15', label: '15년납' },
                          { value: '20', id: 'pension-pay-period-20', label: '20년납' },
                          { value: '25', id: 'pension-pay-period-25', label: '25년납' },
                          { value: '30', id: 'pension-pay-period-30', label: '30년납' },
                          { value: 'continuous', id: 'pension-pay-period-continuous', label: '전기납' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'납입주기'} colSpan={3}>
                      <RadioGroup
                        value={pensionPayCycleValue}
                        onValueChange={(value) => setPensionPayCycleValue(value)}
                        className="flex-row gap-3"
                      >
                        {[
                          { value: 'month', id: 'pension-cycle-monthly', label: '월납' },
                          { value: 'quarter', id: 'pension-cycle-quarterly', label: '3개월' },
                          { value: 'semiannual', id: 'pension-cycle-semiannual', label: '6개월' },
                          { value: 'year', id: 'pension-cycle-annual', label: '연납' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </Grow>
              <Grow placement={'ss'} className={'w-full'}>
                <FormTable caption="계약자 정보" cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1']}>
                  <FormRow>
                    <FormCell title={'계약자'} titleVariant="section" colSpan={3}>
                      <Grow>
                        <Input aria-label="계약자명" width="7.6rem" value={PENSION_SAVINGS_INSURANCE_STEP1_DATA.Policyholder.name} readOnly />
                        <Input aria-label="주민등록번호 마스킹" width="12rem" value={PENSION_SAVINGS_INSURANCE_STEP1_DATA.Policyholder.juminNumber} readOnly />
                        <Button aria-label="계약자 검색" variant="outlined" only="icon" color="gray-light" size="lg">
                          <SearchIcon color="var(--color-primary-50)" />
                        </Button>
                        <Checkbox
                          color="primary"
                          checked={pensionPolicyholderIsBusinessOwner}
                          onCheckedChange={(c) => setPensionPolicyholderIsBusinessOwner(c === true)}
                          size="md"
                          variant="default"
                        >
                          개인사업자
                        </Checkbox>
                      </Grow>
                    </FormCell>

                  </FormRow>
                  <FormRow>
                    <FormCell title="주피와 관계">
                      <Input aria-label="피보험자명" width={'7.6rem'} value={currentPerson.name} readOnly />는 계약자의
                      <NativeSelect
                        aria-label="주피와 관계 선택"
                        width={'15.8rem'}
                        required
                        value={pensionContractorRelationshipValue}
                        onChange={(e) => setPensionContractorRelationshipValue(e.target.value)}
                      >
                        {COMMON_RELATION_OPTIONS.map((option) => (
                          <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                    <FormCell title="개인정보취득경로">
                      <NativeSelect
                        aria-label="개인정보취득경로 선택"
                        width="20rem"
                        required
                        value={pensionInfoAcquisitionValue}
                        onChange={(e) => setPensionInfoAcquisitionValue(e.target.value)}
                      >
                        {[
                          { value: 'selection2', id: 'pension-personalinfo-3', label: '선택' },
                          { value: 'selection', id: 'pension-personalinfo-2', label: '고객직접선택' },
                        ].map((option) => (
                          <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title="자택(소재지)" colSpan={3}>
                      {PENSION_SAVINGS_INSURANCE_STEP1_DATA.Policyholder.addresses}
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title="직장(본사)" colSpan={3}>
                      {PENSION_SAVINGS_INSURANCE_STEP1_DATA.Policyholder.workAddress}
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title="연락처">
                      <Grow placement='bwc'>
                        <Grow>{PENSION_SAVINGS_INSURANCE_STEP1_DATA.Policyholder.contact}</Grow>
                        <Grow>
                          <KeyValueItem label="전자적안내동의">
                            <Grow placement='sc' gap="0">
                              <Badge color="green" size="md" variant="ghost">{PENSION_SAVINGS_INSURANCE_STEP1_DATA.Policyholder.electronicNoticeAgree}</Badge>
                              <TableTooltip />
                            </Grow>
                          </KeyValueItem>
                        </Grow>
                      </Grow>
                    </FormCell>
                    <FormCell title="이메일">
                      {PENSION_SAVINGS_INSURANCE_STEP1_DATA.Policyholder.email}
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title="보험차익비과세">
                      <Checkbox
                        color="primary"
                        checked={pensionTaxFreeChecked}
                        onCheckedChange={(c) => setPensionTaxFreeChecked(c === true)}
                        size="md"
                        variant="default"
                      >
                        가입
                      </Checkbox>
                      <NativeSelect
                        aria-label="비과세 유형 선택"
                        width="17rem"
                        value={pensionTaxFreeTypeValue}
                        onChange={(e) => setPensionTaxFreeTypeValue(e.target.value)}
                      >
                        {[
                          { value: 'monthly', id: 'pension-monthly-payment-monthly', label: '연금저축' },
                          { value: 'nonemonthly', id: 'pension-monthly-payment-nonemonthly', label: '비월납식비과세' },
                        ].map((option) => (
                          <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <Button color="secondary" size="lg" variant="outlined" onClick={() => { }}>
                        알림톡발송
                      </Button>
                    </FormCell>
                    <FormCell title="설계금액/잔여한도">
                      <Input aria-label="설계금액" width="7.1rem" value={String(PENSION_SAVINGS_INSURANCE_STEP1_DATA.Policyholder.designAmount)} commaAmount readOnly />
                      /
                      <Input aria-label="잔여한도" width="7.1rem" value={String(PENSION_SAVINGS_INSURANCE_STEP1_DATA.Policyholder.remainingLimit)} commaAmount readOnly />
                      <Button color="secondary" size='lg' variant="outlined" onClick={() => { }}>
                        조회
                      </Button>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </Grow>

              {/*// 연금/저축보험 */}
            </Gcol>
          </LayoutScrollItem>
        </LayoutScrollWrap>
      </LayoutMainBody>
      <LayoutMainFoot>
        <MainBottom>
          <MainBottomItem>
            <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => console.log('동영상매뉴얼')}>
              동영상매뉴얼
            </Button>
            <Grow gap={1}>
              <Button
                type="submit"
                form={'page2-MainForm'}
                variant={'contained'}
                color={'primary'}
                size={'xl'}
                onClick={() => console.log('저장')}
              >
                저장
              </Button>
            </Grow>
          </MainBottomItem>
        </MainBottom>
      </LayoutMainFoot>
    </LayoutMain>
  );
}